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
            // console.log(eventId);
            query.exec(function (err, activity) {
                if (err) return handleError(err);
                arrayLastLocation.push({"rider": activity[0].riderid, "coordinates": activity[0].latestcoordinates});
                //console.log(arrayLastLocation);

                if(arrayLastLocation.length === eventLength){
                    res.send(arrayLastLocation);
                }
            });
        }
    });

}

exports.getRiderLocation =function(req,res){
    console.log("In getRiderLocation");
    var i;
    var arrayRiderLocation = [];

    query = activity.find({"eventid": req.headers.eventid, "riderid": req.headers.riderid})
    query.exec(function (err, activity) {
        if (err) return handleError(err);
        // console.log(activity);
        console.log(activity[0].gps_stats)
        for(i=0; i<activity[0].gps_stats.length; ++i){

            arrayRiderLocation.push({"lat":activity[0].gps_stats[i].lat, "lng":activity[0].gps_stats[i].lng, "timestamp":activity[0].gps_stats[i].timestamp});
            if(arrayRiderLocation.length === activity[0].gps_stats.length){
                res.send(arrayRiderLocation);
            }
        }

    });
}

exports.clientGpsStats = function(req,res) {

    console.log('In client Gps Stats')
    var arrayGPS = [];
    var coordinate = req.body;
    var eventid = req.headers.eventid;
    var riderid = req.headers.riderid;
    //console.log(coordinate);
    query = activity.find({"eventid": eventid, "riderid": riderid})
    query.exec(function (err, activity1) {
        if (err) return handleError(err);
        arrayGPS = activity1[0].gps_stats;

        console.log(coordinate);
        arrayGPS.push(coordinate);
        console.log(arrayGPS);

        query = activity.update({"eventid": eventid, "riderid": riderid}, {$set:{"gps_stats": arrayGPS}})
        query.exec(function (err, activities) {
            if (err) return handleError(err);
            res.send("Location coordinates pushed");
        })

    });
}