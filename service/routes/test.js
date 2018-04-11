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
var Rider = require('../models/rider');

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
    var eventId;
    var eventLength;
    var i;
    //console.log(req.query._id);
    //console.log(req.headers._id);
    Events.findOne({_id: req.query._id}).then(function (events) {
    //Events.findOne({_id: req.headers._id}).then(function (events) {
        if (!events) console.log("Error!!!");
        //console.log(events);
        eventLength = events.eventRiders.length;
        for(i=0; i<events.eventRiders.length; ++i){

            //query activity table to get latest coordinates
            query = Activity.find({"riderid": ObjectId(events.eventRiders[i]), "eventid": ObjectId(events._id)});
            query.exec(function (err, activity) {
                //console.log(activity);
                if (err) return handleError(err);
                if(!activity) console.log("Activity not found");

                //query Rider table to get Rider name
                Rider.findOne({_id: ObjectId(activity[0].riderid)}).then(function (riders) {
                    if(!riders) console.log("ERROR!!!");
                    arrayLastLocation.push({"riderId": activity[0].riderid, "riderName":riders.firstName + " " + riders.lastName, "coordinates": activity[0].latestcoordinates});
                    if(arrayLastLocation.length === eventLength){
                        res.send(arrayLastLocation);
                    }
                });
            });
        }
    })
    /*var latestcoordinates = {"lat": 33.43, "lng": -111.92};
    arrayLastLocation.push({"riderId": "5a9973e10af19f11a392b666", "riderName":"Rutuja Faldu", "coordinates": latestcoordinates});
    latestcoordinates = {"lat": 33.23, "lng": -111.78};
    arrayLastLocation.push({"riderId": "5a9973e10af19f11a392b666", "riderName":"Himani Shah", "coordinates": latestcoordinates});
    latestcoordinates = {"lat": 33.41, "lng": -111.82};
    arrayLastLocation.push({"riderId": "5a9973e10af19f11a392b666", "riderName":"Tom", "coordinates": latestcoordinates});
    latestcoordinates = {"lat": 33.21, "lng": -111.87};
    arrayLastLocation.push({"riderId": "5a9973e10af19f11a392b666", "riderName":"Charlie", "coordinates": latestcoordinates});
    res.send(arrayLastLocation);*/
});


router.post('/saveActivity',function (req,res) {
    console.log(" In Save Activity");
    console.log(req.body.lng);
    var user_activiy = new Activity({
        eventid: new mongoose.Types.ObjectId(req.body.eventid.toString()),
        riderid: new mongoose.Types.ObjectId(req.body.riderid.toString()),
        lastestcoordinates:{
            lat: req.body.lat,
            lng: req.body.lng
        },
        gps_stats:[{
            timestamp: Date.now(),
            lat: req.body.lat,
            lng: req.body.lng,
            speed: 0,
            distLeft: 123,
            altitude: 234
        },
        {
            timestamp: Date.now(),
            lat: req.body.lat1,
            lng: req.body.lng1,
            speed: 0,
            distLeft: 123,
            altitude: 234
        }
        ],
        completed: false
    });
    user_activiy.save(function (err){
        if(err) res.send("Error!!!")
        res.send("ok");
    })
    //res.send("ok")
})


router.get('/getRiderLocation',function(req,res){
    console.log("In getRiderLocation");
    var i;
    var arrayRiderLocation = [];
    console.log("eventid: "+req.query.eventid)
    console.log("riderid: "+req.query.riderid)

    //query = Activity.find({"eventid": ObjectId(req.headers.eventid), "riderid": ObjectId(req.headers.riderid)})
    query = Activity.find({"eventid": ObjectId(req.query.eventid), "riderid": ObjectId(req.query.riderid)})
    query.exec(function (err, activity) {
        if (err) res.send("Error!!!");
        if(!activity) {
            return res.sendStatus(401);
        }
        //console.log(activity);
        //console.log(activity[0].gps_stats)
        for(i=0; i<activity[0].gps_stats.length; ++i){

            arrayRiderLocation.push({"lat":activity[0].gps_stats[i].lat, "lng":activity[0].gps_stats[i].lng, "timestamp":activity[0].gps_stats[i].timestamp});
            if(arrayRiderLocation.length === activity[0].gps_stats.length){
                res.send(arrayRiderLocation);
            }
        }

    });
});


module.exports = router;
