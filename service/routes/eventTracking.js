var express = require('express');
var mongoose = require('mongoose');
var Event = require('../models/events');
var activity = require('../models/activity');

var ObjectId = require('mongodb').ObjectId;
var router = express.Router();

exports.getLastLocation = function(req,res){
    console.log("In getLastLocation");
    var arrayLastLocation = [];
    var eventId;
    var eventLength;
    var i;
    query = Event.find({"_id": req.headers._id})
    query.exec(function (err, events) {
        if (err) return handleError(err);

        for(i=0; i<events[0].eventRiders.length; ++i){
            eventLength = events[0].eventRiders.length;

            query = activity.find({"riderid": ObjectId(events[0].eventRiders[i].toString()), "eventid": ObjectId(events[0]._id.toString())})
            eventId = events[0].eventRiders[i];
            query.exec(function (err, activity) {
                if (err) return handleError(err);
                //console.log(activity[0].latestcoordinates);
                arrayLastLocation.push({"rider": eventId, "coordinates": activity[0].latestcoordinates});
                console.log(arrayLastLocation);
                console.log(eventLength);
                console.log(i);
                if(arrayLastLocation.length === eventLength){
                    res.send(arrayLastLocation);
                }
            });
        }
    });

}