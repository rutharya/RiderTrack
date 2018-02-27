var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');

var auth = require('../config/auth');

var User = require('../models/rider');
var Activity = require('../models/activity');
var Events = require('../models/events');



router.get('/', auth.required, function(req, res, next) {
  User.findById(req.payload.id).then(function(user) {
    if (!user) {
      return res.sendStatus(401);
    }
    //user.id -> user id
    //next query the userEvents and return all the past gps data for a run.
    res.send({id: user.id});

  });
})

router.post('/',auth.required,function(req,res,next){
    var appuser;
    var now = Date.now();
    var event_id = new mongoose.Types.ObjectId(req.body.eventid);
    console.log(typeof event_id);
    console.log(event_id);
    console.log('POST /savemyloc call recieved at :' + now);
    if(!req.body){
      res.render('error',{message:'invalid body'});
    }
    else if(!req.body.lat || !req.body.lng || !req.body.eventid){
      res.render('error',{message:'invalid lat/lng'});
    }
    else if(req.body.lat === "" || req.body.lng === "" || req.body.eventid === "" ){
      res.render('error',{message:'empty lat,lng or eventid'});
    }
    else{
        Activity.findOne({eventid:event_id},function(err,activity){
          if(err){res.render('error',{message:err});}
          if(activity === null){
            console.log('activity is null');
            //create a new activity and store the data.
                var user_activiy = new Activity({
                  eventid: req.body.eventid,
                  riderid: req.payload.id,
                  lastestcoordinates:{
                    lat: req.body.lat,
                    long: req.body.lng
                  },
                  gps_stats:[{
                    timestamp: Date.now(),
                    lat: req.body.lat,
                    long: req.body.lng,
                    speed: 0,
                    distLeft: 123,
                    altitude: 234
                  }]
                });
                user_activiy.save(function(err,result){
                  if(err){res.render('error',{message:err});}
                  return res.send({result:"OK",data:result})
                });
          }
          else{
            console.log('activity is ',activity);
          }
        })
          // //if event does not exist -> create new activiyScneha() -> with the current gps data.
          // Activity.findOne({event_id: req.body.eventid},function(err,result){
          //   if(err){res.render('error',{message:err});}
          //   else if(result === null){
          //     //else -> find event by id -> inject gps data to it... // is there any way to aggregate this data???
          //     //event exists -> result has the event data
          //     var user_activiy = new Activity({
          //       eventid: req.body.eventid,
          //       riderid: req.payload.id,
          //       lastestcoordinates:{
          //         lat: req.body.lat,
          //         long: req.body.lng
          //       },
          //       gps_stats:[{
          //         timestamp: Date.now(),
          //         lat: req.body.lat,
          //         long: req.body.lng,
          //         speed: 0,
          //         distLeft: 123,
          //         altitude: 234
          //       }]
          //     });
          //     console.log(user_activiy);
          //     user_activiy.save().then(function(err,result){
          //       if(err){res.render('error',{message:err});}
          //       return res.send({result:"OK",data:result})
          //     }).catch(next);
          //   }
          //   else{
          //     //user data for that event already exists -> we need to append the data.
          //   }
          //   })
        }
})

module.exports = router;
