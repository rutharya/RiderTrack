var User = require('../models/rider'); //mongoose data model.
var Activity = require('../models/activity');
var Events = require('../models/events');
var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');

var auth = require('../config/auth');
var bodyParser = require('body-parser');
var mailer = require('../../tools/sendInvites');
var os = require("os");
var ObjectId = require('mongodb').ObjectId;


var cache = require('../config/cache');
var CACHE_MAX = 3;

// /tracking/?_id = q34513413;
router.get('/event/:eventid',function(req,res,next){
  // var eventId = req.params.id;
  Activity.find({"eventid": ObjectId(req.params.eventid)}).then(function(activities){
    console.log(activities);
    if(activities.length == 0){
      return res.status(422).json({result: false, status: { msg: 'user has not particiapted in any activity'}});
    }
    else {
      res.json({result:true,status:{msg:'data sent back'},activities: activities});
    }
  }).catch(next);


});
router.get('/eventDMASS/:eventid',function(req,res,next){
    // var eventId = req.params.id;
    Activity.find({"eventid": ObjectId(req.params.eventid)}).select({ 'riderid': 1, 'eventid': 1,'_id':0, 'latestcoordinates':1}).then(function(activities){
      console.log(activities);
      if(activities.length == 0){
        return res.status(422).json({result: false, status: { msg: 'user has not particiapted in any activity'}});
      }
      else {
        res.json(activities);
      }
    }).catch(next);
  
  });

router.get('/rider/:eventid',function(req,res,next){
    // var eventId = req.params.id;
    console.log('inside rideer event');
    console.log(req.params.eventid);
    console.log(req.query.riderid);
    Activity.findOne({"eventid": ObjectId(req.params.eventid),"riderid":ObjectId(req.query.riderid)}).then(function(activity){
      console.log(activity);
      if(!activity){
        return res.status(422).json({result: false, status: { msg: 'user has not particiapted in any activity'}});
      }
      else {
        res.json(activity);
      }
    }).catch(next);
  });

router.post('/saveloc',auth.required,function(req,res,next){
    var appuser;
    var now = Date.now();
    var event_id = new mongoose.Types.ObjectId(req.body.eventid);
    console.log(typeof event_id);
    console.log(event_id);
    console.log('POST /savemyloc call recieved at :' + now);
    if(!req.body){
      return res.status(422).json({
        result: false,
        status: {msg: "Request body not present"}
    });
    }
    else if(!req.body.lat || !req.body.lng || !req.body.eventid){
      return res.status(422).json({
        result: false,
        status: {msg: "invalid lat/lng or eventid"}
    });
    }
    else if(req.body.lat === "" || req.body.lng === "" || req.body.eventid === "" ){
      return res.status(422).json({
        result: false,
        status: {msg: "invalid lat/lng eventid"}
    });
    }
    else{
        Activity.findOne({eventid:event_id,riderid:req.payload.id},function(err,activity){
          if(activity && activity.isCompleted()){
            return res.status(422).json({
              result: false,
              status: {msg: 'activity is already marked completed'}
          });
          }
          if(err){res.render('error',{message:err});}
          //1. user activity does not exist.
          var user_gps_data = {
            timestamp: Date.now(),
            lat: req.body.lat,
            lng: req.body.lng,
            speed: 0,
            distLeft: 0,
            altitude: 0
          };
          //adding capability to for task #95
          if(typeof req.body.speed !== 'undefined'){
            user_gps_data.speed = req.body.speed;
          }
          if(typeof req.body.alt !== 'undefined'){
            user_gps_data.altitude = req.body.alt;
          }if(typeof req.body.distLeft !== 'undefined'){
            user_gps_data.distLeft = req.body.distLeft;
          }
          if(activity === null){ //db returns null when it doesnt find any data.
            console.log('activity is null');
            //1.1create a new activity and store the data.
            //TODO: this is the first time the user has hit the start button and started braodcasting.
            //figure out pre processing thats required - based on time.
                var user_activiy = new Activity({
                  eventid: req.body.eventid,
                  riderid: req.payload.id,
                  latestcoordinates:{
                    lat: req.body.lat,
                    lng: req.body.lng
                  },
                  gps_stats:[user_gps_data],
                  currentRace:null
                });
                console.log(user_activiy);
                if ((typeof req.body.completed !== 'undefined') && (!(req.body.completed === ''))) {
                  user_activiy.completed = true;
                  console.log('trigger calculate stats here');
              }
                user_activiy.save(function(err,result){
                  if(err){return res.status(422).json({
                    result: false,
                    status: {msg: err}
                });}
                  return res.send({result:true,data:result})
                });
          }
          else{
            //activity already exists.
            console.log('activity already exists ',activity);
            cache.get(req.payload.id,function(err,athlete_gps_data){
              if(athlete_gps_data !== null){
                console.log('cache hit!!');
                //gps data found in cache ->
                //TODO: what should be returned ??
                var ath_gps_cache = JSON.parse(athlete_gps_data);
                if(ath_gps_cache.length < CACHE_MAX){
                  ath_gps_cache.push(user_gps_data);
                  cache.set(req.payload.id,JSON.stringify(ath_gps_cache),function(){
                    //res.json(ath_gps);
                    console.log('cache set updated - length is lesser than 3');
                    return res.send({result:true,data:ath_gps_cache})
                  })
                }
                else{
                  console.log('items in cache exceeds max ammount - 3');
                  ath_gps_cache.push(user_gps_data);
                  //setting the latest coordinates
                  activity.set({latestcoordinates:{
                    lat: req.body.lat,
                    lng:req.body.lng
                  }})
                  activity.set({gps_stats:ath_gps_cache});
                  cache.del(req.payload.id); //delete cache data -> we are storing it to db
                  activity.save(function (err, updatedData) {
                        if (err) return res.status(422).json({
                          result: false,
                          status: {msg: err}
                      });
                        console.log('updatedData -' + updatedData);
                          return res.send({result:true,status:{msg: "saved to db"},data:activity})
                          })
                      }
              }else{
                //data not found in cache but useractivity exists.
                console.log('data not found in cache, but activity log for event exists in activities collection');
                //var gps_data = activity.gps_stats;
                if(activity.gps_stats.length < CACHE_MAX){
                activity.gps_stats.push(user_gps_data);
                }
                else{
                  // activity.gps_stats =[];
                  activity.gps_stats.push(user_gps_data);
                }
                // gps_data.push(user_gps_data);
                cache.set(req.payload.id,JSON.stringify(activity.gps_stats),function(){
                  //cache has been set
                  console.log('cache set ');
                  res.json({result:true,status:{msg: "returning from cache"},data:activity}); //response data sent back
                })
              }
            })
          }//end of else
        })
      }
})




module.exports = router;
