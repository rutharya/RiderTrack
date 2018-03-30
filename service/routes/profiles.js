var User = require('../models/rider'); //mongoose data model.
var express = require('express');
var router = express.Router();
var passport = require('passport');
var auth = require('../config/auth');
var bodyParser = require('body-parser');

//preloading user prfile on routes with :username
//ruthar: we then just selectively return data based on the request. 
router.param('username', function(req, res, next, username){
    User.findOne({username: username}).then(function(user){
      if (!user) { return res.status(404).json({errors:{ user: "user not found"} }); }
  
      req.profile = user;
  
      return next();
    }).catch(next);
  });


  router.get('/:username', auth.optional, function(req, res, next){
    if(req.payload){
      User.findById(req.payload.id).then(function(user){
        if(!user){ return res.json({profile: req.profile.toProfileJSON(false)}); }
  
        return res.json({profile: req.profile.toProfileJSON(user)});
      });
    } else {
      return res.json({profile: req.profile.toProfileJSON(false)});
    }
  });


  router.post('/:username/follow', auth.required, function(req, res, next){
    var profileId = req.profile._id;
  
    User.findById(req.payload.id).then(function(user){
      if (!user) { return res.sendStatus(401); }
  
      return user.follow(profileId).then(function(){
        return res.json({profile: req.profile.toProfileJSON(user)});
      });
    }).catch(next);
  });


  router.delete('/:username/follow', auth.required, function(req, res, next){
    var profileId = req.profile._id;
  
    User.findById(req.payload.id).then(function(user){
      if (!user) { return res.sendStatus(401); }
  
      return user.unfollow(profileId).then(function(){
        return res.json({profile: req.profile.toProfileJSON(user)});
      });
    }).catch(next);
  });
  
  module.exports = router;
  