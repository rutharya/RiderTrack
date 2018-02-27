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


module.exports = router;
