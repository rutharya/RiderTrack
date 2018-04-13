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


// /tracking/?_id = q34513413;
router.get('/:id',function(req,res,next){
  // var eventId = req.params.id;
  Activity.find({"eventId": req.params.id}).then(function(activity){
    res.json(activity);
    console.log(activity);
    if(activity.length == 0){
      return res.status(422).json({Result: false, status: { msg: 'user has not particiapted in any activity'}});
    }
    else {
      res.json(activity);
    }
  }).catch(next);


});

module.exports = router;
