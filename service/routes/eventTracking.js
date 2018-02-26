var express = require('express');
var Event = require('../models/events');
var Activity = require('../models/activity');
var ObjectId = require('mongodb').ObjectId;
var router = express.Router();

exports.getLastLocation = function(req,res){
    console.log("In getLastLocation");
    query = Event.find({"_id": req.headers._id})
    query.exec(function (err, events) {
        if (err) return handleError(err);
        // console.log(events);
        // console.log(events[0].eventRiders[0]);
        for(var i=0; i<events[0].eventRiders.length; ++i){
            console.log(new ObjectId(events[0].eventRiders[i]));
            console.log(events[0]._id);
            query = Activity.find({"riderid": ObjectId(events[0].eventRiders[i].toString()), "eventid": ObjectId(events[0]._id.toString())})
            //query = Activity.find({"eventid": "5a935ad85790cf3c536a2fb6"});
            query.exec(function (err, activity) {
                if (err) return handleError(err);
                console.log(activity);
            })
        }
    })
}