var User = require('../models/rider'); //mongoose data model.
var Activity = require('../models/activity');
var Events = require('../models/events');
var express = require('express');
var router = express.Router();
var passport = require('passport');
var auth = require('../config/auth');
var bodyParser = require('body-parser');
var mailer = require('../../tools/sendInvites');
var os = require("os");
var ObjectId = require('mongodb').ObjectId;


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




module.exports = router;
