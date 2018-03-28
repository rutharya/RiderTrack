//testing mongodb and redis cache against local environment and production using mongoAtlas and redis on <PLATFORM>??.
/*
/test/
Requirements:
1. insert/ create admin and athelete_1 user.  ->can it be
2.
*/
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var auth = require('../config/auth');
var Activity = require('../models/activity');
var Events = require('../models/events');
var ObjectId = require('mongodb').ObjectId;

var seeder = require('../seed/events-seeder');

router.get('/',auth.required,function(req,res,next){
  res.send("hello from a protected route");

});

var cache = require('../config/cache');

router.get('/cache',auth.required,function(req,res,next){
  var user_activiy = new Activity({
    eventid: new mongoose.Types.ObjectId("5a93c9800ecea5074f46b794"),
    riderid: new mongoose.Types.ObjectId("5a93d8b4504b58089d41071d"),
    lastestcoordinates:{
      lat: 123,
      long: 456
    },
    gps_stats:[{
      timestamp: Date.now(),
      lat: 234,
      long: 456,
      speed: 0,
      distLeft: 123,
      altitude: 234
    }]
  });
  //returning the cached response.
  cache.get(req.payload.id,function(err,atheleteCached){
    if(atheleteCached !== null){
      console.log('cache hit!! yaaay!!');

      res.json(JSON.parse(atheleteCached.toString()));
    //  next(null,atheleteCached);
    }
    else{
      console.log('not found in cache');
      //get data from db, load it, return the response.
      cache.set(req.payload.id,JSON.stringify(user_activiy),function(){
        res.json(user_activiy);
        //next(null,user_activiy)
      })
    }
  })

});

router.get('/seedevents',function(req,res,next){
  seeder.seed_events(function(err,done){
    if(err){ res.render('error',{message:err});}
    res.json({'msg':done})
  })
})

router.get('/getLastLocation',function(req,res){
    console.log("In getLastLocation");
    var arrayLastLocation = [];
    /*var eventId;
    var eventLength;
    var i;
    console.log(req.query._id);
    query = Events.find({"_id": req.query._id});
    //console.log(query);
    query.exec(function (err, events) {
        if (err) return handleError(err);
        console.log("AAA"+events);
        for(i=0; i<events[0].eventRiders.length; ++i){
            eventLength = events[0].eventRiders.length;
            console.log()
            query2 = Activity.find({"riderid": ObjectId(events[0].eventRiders[i].toString()), "eventid": ObjectId(events[0]._id.toString())});
            query2.exec(function (err, activity) {
                console.log("executing 2nd query");
                console.log(activity);
                if (err) return handleError(err);
                arrayLastLocation.push({"rider": activity[0].riderid, "coordinates": activity[0].latestcoordinates});
                if(arrayLastLocation.length === eventLength){
                    res.send(arrayLastLocation);
                }
            });
        }
    });*/
    var latestcoordinates = {"lat": 90.8, "lng": 70.8};
    arrayLastLocation.push({"rider": "5a9973e10af19f11a392b666", "coordinates": latestcoordinates});
    res.send(arrayLastLocation);
});



router.get('/getLastLocation',function(req,res){
    console.log("In getLastLocation");
    var arrayLastLocation = [];
    /*var eventId;
    var eventLength;
    var i;
    console.log(req.query._id);
    query = Events.find({"_id": req.query._id});
    //console.log(query);
    query.exec(function (err, events) {
        if (err) return handleError(err);
        console.log("AAA"+events);
        for(i=0; i<events[0].eventRiders.length; ++i){
            eventLength = events[0].eventRiders.length;
            console.log()
            query2 = Activity.find({"riderid": ObjectId(events[0].eventRiders[i].toString()), "eventid": ObjectId(events[0]._id.toString())});
            query2.exec(function (err, activity) {
                console.log("executing 2nd query");
                console.log(activity);
                if (err) return handleError(err);
                arrayLastLocation.push({"rider": activity[0].riderid, "coordinates": activity[0].latestcoordinates});
                if(arrayLastLocation.length === eventLength){
                    res.send(arrayLastLocation);
                }
            });
        }
    });*/
    var latestcoordinates = {"lat": 90.8, "lng": 70.8};
    arrayLastLocation.push({"rider": "5a9973e10af19f11a392b666", "coordinates": latestcoordinates});
    res.send(arrayLastLocation);
});

router.get('/getRiderLocation',function(req,res){
    console.log("In getRiderLocation");
    var i;
    var arrayRiderLocation = [];

    query = Activity.find({"eventid": req.headers.eventid, "riderid": req.headers.riderid})
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
});


module.exports = router;
