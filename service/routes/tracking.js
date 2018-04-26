var User = require('../models/rider'); //mongoose data model.
var Activity = require('../models/activity');
var Events = require('../models/events');
var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');
var chalk = require('chalk');
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

  /**
   * @method POST
   * @param eventId required as req.body.eventId
   * @param lat required as req.body.lat
   * @param lng required as req.body.lng
   * @returns 
   */
router.post('/saveloc',auth.required,function(req,res,next){
  console.log(chalk.green('Request Recieved: <POST> /tracking/saveloc:\n'));
  console.log(chalk.yellow('Body: ', JSON.stringify(req.body)));
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
          if(err){
            return res.status(500).json({result: false, status: {msg: err}});
          }
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
                console.log('checking for req.body.completed');
                console.log(req.body.completed);
                if ((typeof req.body.completed !== 'undefined') && (!(req.body.completed === ''))) {
                  user_activiy.completed = true;
                  console.log('trigger calculate stats here');
                  calculateEventStats(user_activiy._id);
                  user_activiy.save(function(err,result){
                    if(err) { return res.status(501).json({
                      result:false,
                      status: {
                        msg: 'error saving activity'
                      }
                    })}

                    console.log(chalk.blue('saved activity.'))
                    //id?
                    console.log(result._id);
                    return res.status(200).json({result:true, data:result});
                    // calculateEventStats(result._id);
                  })
              }else{
                //completed not set.
                console.log('before save');
                user_activiy.save(function(err,result){
                  if(err){return res.status(422).json({
                    result: false,
                    status: {msg: err}
                });}
                  return res.send({result:true,data:result})
                });
              }
          }
          else{
            //activity already exists.
            console.log('activity already exists ',activity);
            cache.get(req.payload.id,function(err,athlete_gps_data){
              if(athlete_gps_data !== null){
                console.log('cache hit!!');
                console.log('checking for req.body.completed');
                console.log(req.body.completed);
                if ((typeof req.body.completed !== 'undefined') && (!(req.body.completed === ''))) {
                  activity.completed = true;
                  //purge cache and save it to db and send data back.
                  var ath_gps_cache2 = JSON.parse(athlete_gps_data);
                  ath_gps_cache2.push(user_gps_data);
                  activity.set({latestcoordinates:{
                    lat: req.body.lat,
                    lng:req.body.lng
                  }});
                  activity.set({gps_stats:ath_gps_cache2});
                  cache.del(req.payload.id);
                  activity.save(function(err, updatedData){
                    if (err) return res.status(422).json({
                      result: false,
                      status: {msg: err}
                  });
                    console.log('updatedData -' + updatedData);
                    console.log('flushing data to db from cache.')
                      return res.send({result:true,status:{msg: "saved to db"},data:activity})
                  });
                  console.log('trigger calculate stats here');

              }
              else{
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
              }
              }else{
                //data not found in cache but useractivity exists.
                console.log('data not found in cache, but activity log for event exists in activities collection');
                if ((typeof req.body.completed !== 'undefined') && (!(req.body.completed === ''))) {
                  activity.completed = true;
                  //cache redundant at this point... just append gps to activity and save it. 
                  activity.gps_stats.push(user_gps_data);
                  activity.save(function (err, updatedData) {
                    if (err) return res.status(422).json({
                      result: false,
                      status: {msg: err}
                  });
                    console.log('updatedData -' + updatedData);
                    // TODO: respond with activity completed?
                      return res.send({result:true,status:{msg: "saved to db"},data:activity})
                      })
                }
                else {
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
              }
            })
          }//end of else
        })
      }
})


/*
* Function to calculate event stats on marking of activity flag complete
* */

function calculateEventStats(activityid){
    Activity.findOne({_id:activityid}).then(function(activity){
        console.log("Calling stats after finish for activity:"+activityid);
        if(!activity || activity === null) {
        }
        else{
            var stats = null;
            calculateStats(activity._id, function(result){
                console.log("Result of calculate stats for event is"+result);
                if(result === "Error"){
                    console.log("No activity for the user");

                }


                // Assigning the result of stats calculation
                stats =  {
                    maxspeed: result['maxspeed'],
                    averagespeed: result['averagespeed'],
                    lastspeed: result['lastspeed'],
                    totaldistance: result['totaldistance'],
                    elapsedtime: result['elapsedtime'],
                    currentelevation: result['currentelevation'],
                    maxelevation: result['maxelevation'],
                    averageelevation: result['averageelevation']

                }

                activity.racestats = stats;

                Activity.update(
                    { "_id": activity._id },
                    { "$set": { "racestats": stats} },
                    { "multi": false },
                    function(err) {

                        if(err){
                            console.log("Error storing stats");
                        }
                        else{
                            console.log("Saved to db for activity"+activityid);
                        }
                    });
            });

        }
    });

}


// Function to calculate Event stats including: average speed, current elevation, distance from start, and elapsed time in terms of milliseconds
// Output: Average Speed, Current Distance from starting point of race, current altitude, and elapsed time.

function calculateStats(activityid, fn){

    console.log("Inside calculate stats function");
    // Added query to calculate average speed and elevationgain. Yet to caclulate distance and eventduration.

    Activity.aggregate([ { $match: { _id:activityid }}, {$unwind: "$gps_stats"},
        { $group: { _id: null, averagespeed: { $avg: "$gps_stats.speed" }, maxspeed: {$max: "$gps_stats.speed"}, maxelevation: {$max: "$gps_stats.altitude"},
                averageelevation: {$avg:"$gps_stats.altitude"},
                first: { $first: "$gps_stats" },
                last: { $last: "$gps_stats" },
            }},
        { $project: {
                elapsedtime: {
                    $subtract: [ "$last.timestamp", "$first.timestamp"]
                },
                averagespeed:1, maxspeed:1, averageelevation:1, maxelevation:1, totaldistance: {$subtract: ["$last.distLeft",0]}, lastspeed:{$subtract: ["$last.speed",0]}, currentelevation: { $subtract: [ "$last.altitude", 0 ]}
            }}
    ], function (err,result){
        if (err) {
            console.log(err);
            fn("Error");
        }
        else {
            if(result === null){
                console.log("Error");
                fn("Error");
            }
            console.log(result[0]);
            fn(result[0]);
        }

    });
}

module.exports = router;
