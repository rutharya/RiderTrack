var express = require('express');
var Event = require('../models/events');

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
    if (err) throw err;
    console.log('User Event saved successfully!');
      res.send({"Saved Event ID" : event._id })

    });
}

