var express = require('express');
var Event = require('../models/events');
var Activity = require('../models/activity');
var Rider = require('../models/rider');

var router = express.Router();


exports.getAllEvents = function(req,res){
        
	console.log("In getAllEvents");
  query = Event.find({})
 // query.exec()
  query.exec(function (err, events) {
  if (err) return handleError(err);
  res.send(events)
  });
}

exports.saveEvent = function(req,res){

  console.log('In saveEvent')
  var event = new Event(req.body)

  event.save(function(err) {
      if (err) return handleError(err);
    console.log('User Event saved successfully!');
      res.send({"Saved Event ID" : event._id })

    });
}

exports.getEventById = function(req,res){

console.log("In getEventById");
  query = Event.find({"_id": req.headers._id})
  query.exec(function (err, events) {
  if (err) return handleError(err);
  console.log(events)
  res.send(events)
})
};

exports.deleteEventById = function(req,res){
  
console.log("In deleteEventById");
  query = Event.find({"_id": req.headers._id}).deleteMany()
  query.exec(function (err, events) {
  if (err) return handleError(err);
  console.log(events)
  res.send(events)
})
};

 // "Event_Id" : id,
 //                  "Rider_Id" : "Test123"
exports.addRiderToEvent = function(req,res){
console.log("In addRiderToEvent");
var registered = "alreadyRegistered"; //Not required to register ,, already registered
var obj = new Activity({eventid : req.body.eventid, riderid : req.body.riderid})
query = Event.find({"_id":req.body.eventid},{"eventRiders":1})
query.exec(function (err, res1) {
  if (err) return handleError(err);
   if(res1[0].eventRiders.indexOf(req.body.riderid)<0){
    
    var user_activity = new Activity({
                  eventid: req.body.eventid,
                  riderid: req.body.riderid
                });
user_activity.save(function(err,result){
                  if(err){res.render('error',{message:err});}
                  
                });
query = Event.update({
    "_id": req.body.eventid
}, {
    $push: {
    "eventRiders":  req.body.riderid

    }
})
query.exec(function(err,result){
  if (err) return handleError(err);

})


query = Rider.update({
    "_id": req.body.riderid
}, {
    $push: {
        "registeredEvents":  req.body.eventid

    }
})
query.exec(function(err,result){
  if (err) return handleError(err);
})
registered = "newRegistration" //Now registered
   } 
   res.send({result: registered})
  });


};


