var Event = require('../models/events'); //mongoose data model.
var Rider = require('../models/rider');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var auth = require('../config/auth');
var bodyParser = require('body-parser');


router.get('/getAllEvents', function (req, res) {
    console.log("In getAllEvents");
    query = Event.find({})
    // query.exec()
    query.exec(function (err, events) {
        if (err) return res.status(422).json({errors: {event: "Events not found"}});
        res.send(events)
    });
})

router.post('/save', function (req, res) {
    console.log('In saveEvent');
    //console.log(req.body.name);
    if(!req.body){
        res.render('error',{message:'invalid body'});
    }
    else if(!req.body.name || !req.body.description || !req.body.image || !req.body.date || !req.body.location || !req.body.startTime || !req.body.endTime || !req.body.trackFile){
        res.render('error',{message:'events required fields missing'});
    }
    else if(req.body.name === "" || req.body.description === "" || req.body.image === "" || req.body.location === "" || req.body.startTime === "" || req.body.endTime === "" || req.body.trackFile === ""){
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
    // console.log(event);
    console.log('asdfasdf')
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

router.get('/getEventById', function (req, res) {
    console.log("In getEventById");
    query = Event.find({"_id": req.headers._id})
    query.exec(function (err, events) {
        if (err) return handleError(err);
        console.log(events)
        res.send(events)
    })
})


router.get('/getRegisteredEvents', auth.required, function (req, res) {
    console.log("In functions")
   // query = Rider.find({"_id":  "5ab81ebc4dc05739f18791e3" }) //userId:      "5ab81ebc4dc05739f18791e3"
    query = Rider.find({"_id":  req.payload.id })
    console.log( req.payload.id)
    query.exec(function (err, rider) {
        if (err) return handleError(err);
        var result = {}
        var key = "events"
        result[key] = []
        var regEvents = rider[0].registeredEvents
        var len = 0
        for(var i = 0; i< regEvents.length; i++){
            query = Event.find({"_id": regEvents[i]})
            query.exec(function(err, events){
                if(err) return handleError(err);
                len++;
                result[key].push(events[0])  // pushing the values to an object
                if(len === regEvents.length){
                    res.send(result)
                }
            })
        }
    })
})





// exports.saveEvent = function(req,res){
//
//   console.log('In saveEvent')
//   var event = new Event(req.body)
//
//   event.save(function(err) {
//       if (err) return handleError(err);
//     console.log('User Event saved successfully!');
//       res.send({"Saved Event ID" : event._id })
//
//     });
// }
//
// exports.getEventById = function(req,res){
//
// console.log("In getEventById");
//   query = Event.find({"_id": req.headers._id})
//   query.exec(function (err, events) {
//   if (err) return handleError(err);
//   console.log(events)
//   res.send(events)
// })
// };
//
// exports.deleteEventById = function(req,res){
//
// console.log("In deleteEventById");
//   query = Event.find({"_id": req.headers._id}).deleteMany()
//   query.exec(function (err, events) {
//   if (err) return handleError(err);
//   console.log(events)
//   res.send(events)
// })
// };
//
//
//

module.exports = router;
