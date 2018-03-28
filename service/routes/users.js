var User = require('../models/rider'); //mongoose data model.
var express = require('express');
var router = express.Router();
var passport = require('passport');
var auth = require('../config/auth');
var bodyParser = require('body-parser');
var mailer = require('../../tools/sendInvites');

//get the information about the current logged-in user.
router.get('/me', auth.required, function(req, res, next){
  User.findById(req.payload.id).then(function(user){
    if(!user){ return res.sendStatus(401); }

    return res.json({user: user.userProfile()});
  }).catch(next);
});

//update profile information of the user.
router.put('/profile', auth.required, function(req, res, next){
  User.findById(req.payload.id).then(function(user){
    if(!user){ return res.sendStatus(401); }

    // only update fields that were actually passed...
    if(typeof req.body.username !== 'undefined'){
      user.username = req.body.username;
    }
    if(typeof req.body.email !== 'undefined'){
      user.email = req.body.email;
    }
    if(typeof req.body.height !== 'undefined'){
      user.height = req.body.height;
    }
    if(typeof req.body.weight !== 'undefined'){
      user.weight = req.body.weight;
    }
    if(typeof req.body.gender !== 'undefined'){
      user.gender = req.body.gender;
    }
    if(typeof req.body.phoneNo !== 'undefined'){
      user.phoneNo = req.body.phoneNo;
    }
    if(typeof req.body.address !== 'undefined'){
      user.address = req.body.address;
    }

    return user.save().then(function(){
      return res.json({user: user.toAuthJSON()});
    });
  }).catch(next);
});

//create a new user.
router.post('/', function(req, res, next) {
  console.log('POST: /users: ');
  console.log('req body: ', req.body);
  if(!req.body.username || req.body.username===''){
    return res.status(422).json({errors: {username: "username misssing"}});
  }
  if(!req.body.email || req.body.email===''){
     return res.status(422).json({errors: {email: "can't be blank"}});
   }

   if(!req.body.password || req.body.password===''){
     return res.status(422).son({errors: {password: "can't be blank"}});
   }
  var user = new User();
  user.username = req.body.username;
  user.email = req.body.email;
  user.setPassword(req.body.password);
  user.save().then(function() {
    return res.json({
      user: user.toAuthJSON()
    });
  }).catch(next);
});

//ruthar: login user
router.post('/login', function(req, res, next) {
  console.log('login attempted: by app');
  console.log(req.body);

  if (!req.body.email) {
    return res.status(422).json({
      errors: {
        email: "can't be blank"
      }
    });
  }

  if (!req.body.password) {
    return res.status(422).json({
      errors: {
        password: "can't be blank"
      }
    });
  }
  passport.authenticate('local', { session: false  }, function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) return res.status(422).json({errors: {user: "user not found"}});
    if (user) {
      user.token = user.generateJWT();
      return res.json({user: user.toAuthJSON()});
    } else {
      return res.status(422).json(info);
    }
  })(req, res, next);
});


router.post('/forgotpwd', function(req, res, next) {
  if (!req.body.email || req.body.email == " ") {
    return res.status(422).json({
      errors: {
        email: "can't be blank"
      }
    });
  }
  User.findOne({ email: req.body.email }, function(err, user) {
    if (err) {res.status(422).json({errors: {email: "user with email not found"}});}
    if (!user) {
      return res.status(422).son({errors: {user: "user not found"}});
      //TODO: - return a proper json to angular to interpret properly in UI
      //return res.redirect('/forgot');
    }
    console.log('here');
    //found user
    user.resetPasswordToken = user.generateJWT();
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    user.save(function(err) {
      return res.json({result: "OK", status:{msg:"user password resent token written to db", token: user.resetPasswordToken}});
    });
    mailer(user.email,'GO TO : http://localhost:3000/users/'+user.resetPasswordToken);
    console.log('go to :localhost:3000/users/',user.resetPasswordToken);
  });
})

router.get('/:token', function(req, res) {
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
    if (!user) {
      return res.status(422).json({errors: {user: "user not found"}});
    }
    //found --
    console.log('user successfully found -> render the proper form to reset password');
    // return res.json({result: "OK", status:{msg:"can post to this route to change password."}});
    return res.render('reset_pwd',{user: user});
  });
});

router.post('/:token',function(req,res){
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
          return res.status(422).json({errors: {user: "user not found"}});
        }
        user.setPassword(req.body.password);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        user.save(function(err) {
          return res.json({result: "OK", status:{msg:"user password written to db"}})
        });
      });
});

module.exports = router;
