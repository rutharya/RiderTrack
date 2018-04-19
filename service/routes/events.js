var Event = require('../models/events'); //mongoose data model.
var Rider = require('../models/rider');
var chalk = require('chalk');
var Activity = require('../models/activity');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var auth = require('../config/auth');
var bodyParser = require('body-parser');


/**
 * GET /events/ ->Returns all the events
 * @method GET
 * @returns Events[]
 */
router.get('/',function(req,res){
    console.log(chalk.green('Events Request Recieved: <GET> /EVENTS/:'));
    Event.find({},function(err,events){
        res.send(events);
    });
});

router.post('/save', function (req, res) {
    console.log('POST /events/save');
    console.log(req.body);
    if(!req.body){
        res.render('error',{message:'invalid body'});
    }
    else if(!req.body.name || !req.body.description || !req.body.date || !req.body.location || !req.body.startTime || !req.body.endTime || !req.body.trackFile || !req.body.image){
        res.render('error',{message:'events required fields missing'});
    }
    else if(req.body.name === "" || req.body.description === "" || req.body.date === "" || req.body.location === "" || req.body.startTime === "" || req.body.endTime === "" || req.body.trackFile === "" || req.body.image === ""){
        res.render('error',{message:'empty events fields'});
    }
    //var event = new Event(req.body);
    var event = new Event({
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        date: req.body.date,
        location: req.body.location,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        trackFile: req.body.trackFile,
        track: {
            elevation: req.body.elevation,
            length: req.body.length,
            difficulty: req.body.difficulty
        }
    });
    console.log(event);
    event.save(function(err,result){
        console.log(err);
        console.log(result);
        if(err) return res.status(422).json({errors: {event: "Events not found"}});
        return res.send({"Saved Event ID": result._id})
    });
    //     if (err) return res.status(422).json({errors: {event: "Events not found"}});
    //     console.log('User Event saved successfully!');
    //     res.send({"Saved Event ID": event._id})
    //
    // });
})

/**
 * GET /events/register -> Get array of event_ID's user has registered for.
 * @method GET
 * @requires JWT_authentication Token
 * @returns USER_REGISTERED_EventIDS[]
 */
router.get('/register', auth.required, function (req, res,next) {
    Rider.findById(req.payload.id).then(function(user){
        if(!user){ return res.sendStatus(401); }
        return res.json(user.getRegisteredEvents());
      }).catch(next);
});

/**
 * GET /events/registered_events -> Gets array of Events that user is registered to.
 * @method GET
 * @requires JWT_authentication Token
 * @returns USER_REGISTERED_Events[]
 */
router.get('/registered_events',auth.required,function(req,res,next){
    Rider.findById(req.payload.id).then(function(user){
        if(!user){ return res.sendStatus(401); }
        var response = [];
        Event.find({_id: {$in: user.registeredEvents}}, function (err, events) {
            if (err) {
              // do error handling
              return;
            }
            return res.send(events);
        });
      }).catch(next);
})

/**
 * POST /events/unregister -> Get current Logged in User
 * @method POST
 * @requires JWT_authentication Token
 * @returns API_Response
 */
router.post('/unregister',auth.required,function(req,res,next){
    console.log(chalk.green('de-Register to event Request Recieved: <POST> /EVENTS/UNREGISTER:'));
    console.log(chalk.yellow('Body: ', JSON.stringify(req.body)));
    if(!req.body.eventId || req.body.eventId === ""){
        return res.status(422).json({result: false, status: {msg: 'eventId is missing'}});
    }
    console.log('DELETE /events/register');
    Rider.findById(req.payload.id).then(function(user){
        if(!user){ return res.sendStatus(401); }
        if(user.isParticipant(req.body.eventId)){
            console.log(chalk.red('Unregistering from User collection: '));
            user.registeredEvents.splice(user.registeredEvents.indexOf(req.body.eventId), 1);
        }
        else{
            return res.status(422).json({
                result: false,
                status: {msg: "user not registered to this event"}
            });
        }
        Event.findOne({_id:req.body.eventId}).then(function(event){
            if(!event){ return res.status(422).json({
                result: false,
                status: { msg: "event not found. please create event"}
            })}
            if(event.eventRiders.indexOf(user._id)>=0){
                console.log(chalk.red('Unregistering from Event collection: '));
                event.eventRiders.splice(event.eventRiders.indexOf(user._id),1);
            }else{
                return res.status(422).json({
                    result: false,
                    status: {msg: "user not registered to this event"}
                });
            }
            event.save(function(err){
                console.log(err);
                if(err) return res.status(500).json({result: false, status: {err: err}});
                user.save(function(err) {
                    return res.json({result: true, status:{msg:"Successfully un-registered from event"}});
                  });
            })
        })
        // return res.json(user.getRegisteredEvents());
      }).catch(next);

})

/**
 * POST /events/register -> REGISTER to an event, given its ID.
 * @method POST
 * @requires JWT_authentication Token
 * @param eventId as req.body.eventId
 * @returns API_Response
 */
router.post('/register',auth.required,function(req,res,next){
    console.log(chalk.green('REGISTER to event Request Recieved: <POST> /EVENTS/REGISTER:'));
    console.log(chalk.yellow('Body: ', JSON.stringify(req.body)));
    if(!req.body.eventId || req.body.eventId === ""){
        return res.status(422).json({result: false, status: {msg: 'eventId is missing'}});
    }
    Rider.findById(req.payload.id).then(function(user){
        if(!user){ return res.sendStatus(401); }
        //1. if already registered
        console.log(chalk.red('is participant?'));
        console.log(chalk.green(user.isParticipant(req.body.eventId)));
        if(user.isParticipant(req.body.eventId)){
            return res.status(200).json({result:false, status: {msg: "already registered to event!!"}});
        }
        Event.findOne({_id: req.body.eventId}).then(function(event){
            if(!event){ return res.status(500).json({result: false,status: { msg: "event not found. please create event"}})}
            if(event.eventRiders.indexOf(user._id)>=0){
                //already registered...
                return res.status(200).json({result:false, status: { msg: "already registered to event!!"}})
            }
            else{
                event.eventRiders.push(user._id);
                user.registeredEvents.push(event._id);
            }

            event.save(function(err){
                console.log(chalk.cyan('added rider id to eventRiders, saving  event.(2)'))
                if(err) return res.status(500).json({result: false, status: {msg: err}});
                user.save(function(err) {
                    console.log(chalk.cyan('added event id to registeredEvents, saving user.'))
                    return res.json({result: true, status:{msg:"Successfully registered to event."}});
                  });
            })
        })
    }).catch(next);
});

/**
 * GET /events/:ID -> get event by id
 * @method GET
 * @param eventID required as url parameter /events/<<EVENT_ID>>
 * @returns Event.toJSON()
 */
router.get('/:eventId',function(req,res,next){
    console.log(chalk.green('Login Request Recieved: <POST> /USERS/LOGIN:'));
    console.log(chalk.yellow('EVENT_ID: ', JSON.stringify(req.params.eventId)));
    Event.findOne({_id:req.params.eventId}).then(function(event){
        if(!event) res.status(404).json({result:false,status: { msg: "event not found"}});
        res.send(event);
    }).catch(next);
})


module.exports = router;
