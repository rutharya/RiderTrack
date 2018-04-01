var Event = require('../models/events'); //mongoose data model.
var Rider = require('../models/rider');
var Activity = require('../models/activity');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var auth = require('../config/auth');
var bodyParser = require('body-parser');



router.get('/',function(req,res){
    console.log('GET: /events/');
    Event.find({},function(err,events){
        res.send(events);
    });
});

router.post('/save', function (req, res) {
    console.log('POST /events/save');
    //console.log(req.body.name);
    if(!req.body){
        res.render('error',{message:'invalid body'});
    }
    else if(!req.body.name || !req.body.description || !req.body.date || !req.body.location || !req.body.startTime || !req.body.endTime ){
        res.render('error',{message:'events required fields missing'});
    }
    else if(req.body.name === "" || req.body.description === "" || req.body.location === "" || req.body.startTime === "" || req.body.endTime === "" ){
        res.render('error',{message:'empty events fields'});
    }
    //var event = new Event(req.body);
    var event = new Event({
        name: req.body.name,
        description: req.body.description,
        // image: req.body.image,
        date: req.body.date,
        location: req.body.location,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        // trackFile: req.body.trackFile,
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

router.get('/register', auth.required, function (req, res,next) {
    Rider.findById(req.payload.id).then(function(user){
        if(!user){ return res.sendStatus(401); }
        return res.json(user.getRegisteredEvents());
      }).catch(next);
});

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

router.delete('/register',auth.required,function(req,res,next){
    if(!req.body.eventId || req.body.eventId === ""){
        return res.status(422).json({
            errors: {
              eventId: "can't be blank"
            }
          });
    }
    console.log('DELETE /events/register');
    Rider.findById(req.payload.id).then(function(user){
        if(!user){ return res.sendStatus(401); }
        if(user.isParticipant(req.body.eventId)){
            user.registeredEvents.splice(user.registeredEvents.indexOf(req.body.eventId), 1);
        }
        else{
            return res.status(422).json({
                Result: false,
                status: {msg: "user not registered to this event"}
            });
        }
        Event.findOne({_id:req.body.eventId}).then(function(event){
            if(!event){ return res.status(422).json({
                Result: false,
                status: { msg: "event not found. please create event"}
            })}
            if(event.eventRiders.indexOf(user._id)>=0){
                event.eventRiders.splice(event.eventRiders.indexOf(user._id),1); 
            }else{
                return res.status(422).json({
                    Result: false,
                    status: {msg: "user not registered to this event"}
                });
            }
            event.save(function(err){
                console.log(err);
                if(err) return res.status(500).json({Result: false, status: {err: err}});
                user.save(function(err) {
                    return res.json({result: "OK", status:{msg:"Successfully un-registered from event"}});
                  });
            })
        })
        // return res.json(user.getRegisteredEvents());
      }).catch(next);

})
router.post('/register',auth.required,function(req,res,next){
    console.log('here');
    console.log(req.body);
    console.log(req.body.eventId);    
    if(!req.body.eventId || req.body.eventId === ""){
        return res.status(422).json({
            errors: {
              eventId: "can't be blank"
            }
          });
    }
    Rider.findById(req.payload.id).then(function(user){
        if(!user){ return res.sendStatus(401); }
        //1. if already registered
        console.log('is participant?')
        console.log(user.isParticipant(req.body.eventId));
        if(user.isParticipant(req.body.eventId)){
            return res.status(200).json({Result:false, status: {msg: "already registered to event!!"}});
        }
        Event.findOne({_id: req.body.eventId}).then(function(event){
            if(!event){ return res.status(422).json({
                Results: false,
                status: { msg: "event not found. please create event"}
            })}
            if(event.eventRiders.indexOf(user._id)>=0){
                //already registered...
                return res.status(200).json({Result:false, status: { msg: "already registered to event!!1"}})
            }
            else{
                event.eventRiders.push(user._id);
                user.registeredEvents.push(event._id);
            }
            //TODO: (ruthar) this next 3 lines of code will be replaced when all events have startTime and endTime values.
            var time = new Date();
            event.startTime = time.getTime();
            event.endTime= time.getTime();
            //TODO: replace above 3 lines.
            event.save(function(err){
                console.log(err);
                if(err) return res.status(500).json({Result: false, status: {err: err}});
                user.save(function(err) {
                    return res.json({result: "OK", status:{msg:"Successfully registered to event2"}});
                  });
            })
        })
    }).catch(next);
});

router.get('/:eventId',function(req,res,next){
    console.log(req.params.eventId);
    Event.findOne({_id:req.params.eventId}).then(function(event){
        if(!event) res.status(404).json({Result:false,status: { msg: "event not found"}});
        res.send(event);
    }).catch(next);
})


module.exports = router;
