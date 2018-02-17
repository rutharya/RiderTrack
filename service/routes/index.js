var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var auth = require('../config/auth');

var SUser = require('../models/rider');
var User = mongoose.model('Rider');



var events = require('./events');

/* GET home page. */
router.get('/', function(req, res, next) {

  // res.render('index', { title: 'Express' });
  res.render('index');
});

router.get('/user', auth.required, function(req, res, next){
  User.findById(req.payload.id).then(function(user){
    if(!user){ return res.sendStatus(401); }
  
    return res.json({user: user.toAuthJSON()});
  }).catch(next);
});

router.post('/users/login', function(req, res, next){
  if(!req.body.email){
    return res.status(422).json({errors: {email: "can't be blank"}});
  }

  if(!req.body.password){
    return res.status(422).json({errors: {password: "can't be blank"}});
  }
  passport.authenticate('local', {session: false}, function(err, user, info){
    if(err){ return next(err); }
    console.log('here22');
    console.log(user);
    if(user){
      user.token = user.generateJWT();
      return res.json({user: user.toAuthJSON()});
    } else {
      return res.status(422).json(info);
    }
  })(req, res, next);
});

router.post('/users', function(req, res, next){
  console.log('here we are');
  var user = new User();
  user.username = req.body.username;
  user.email = req.body.email;
  user.setPassword(req.body.password);
  console.log(user);
  user.save().then(function(){
    console.log('here');
    return res.json({user: user.toAuthJSON()});
  }).catch(next);
});

router.post('/auth',
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

router.get('/authsuc',function(req,res,next){
  res.send('auth successfully completed');
})

router.post('/', function (req, res, next) {
     // confirm that user typed same password twice
     if (req.body.password !== req.body.repeatPassword) {
         var err = new Error('Passwords do not match.');
         err.status = 400;
         res.send("passwords dont match");
         return next(err);
     }

     if (req.body.email &&
         req.body.firstName &&
         req.body.lastName &&
        req.body.password &&
         req.body.passwordConf) {

        var userData = {
             email: req.body.email,
             firstName: req.body.firstName,
             lastName: req.body.lastName,
             password: req.body.password,
             repeatPassword: req.body.repeatPassword,
         }

         User.create(userData, function (error, user) {
             if (error) {
                return next(error);
             } else {
                 req.session.userId = user._id;
                 return res.redirect('/dashboard');
             }
         });

     } else if (req.body.logemail && req.body.logpassword) {
         User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
             if (error || !user) {
                 var err = new Error('Wrong email or password.');
                 err.status = 401;
                 return next(err);
             } else {
                 req.session.userId = user._id;
                 return res.redirect('/dashboard');
             }
         });
     } else {
         var err = new Error('All fields required.');
         err.status = 400;
        return next(err);
     }
 })


router.get('/dashboard',function(req,res,next){
 res.render('dashboard');
     User.findById(req.session.userId)
         .exec(function (error, user) {
             if (error) {
                 return next(error);
             } else {
                 if (user === null) {
                     var err = new Error('Not authorized! Go back!');
                     err.status = 400;
                     return next(err);
                 } else {
                     return res.send('<h1>Name: </h1>' + user.firstName + user.lastName + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>')
                 }
             }
        });
  })

router.get('/tracking',function(req,res,next){
  res.render('tracking');
})
router.get('/profile',function(req,res,next){
  res.render('profile', {title: 'My Profile'});
})

router.get('/credentials',function(req,res,next){
    res.render('credentials', {title: 'My Credentials'});
})

router.get('/events',function(req,res,next){
  res.render('events');
})

router.get('/login',function(req,res,next){
    res.render('login');
})


router.get('/logout', function (req, res, next) {
    if (req.session) {
        // delete session object
        req.session.destroy(function (err) {
            if (err) {
                return next(err);
            } else {
                return res.redirect('/');
            }
        });
    }
});


router.get('/getAllEvents',events.getAllEvents)
router.post('/saveEvent',events.saveEvent)
router.get('/getEventById',events.getEventById)
router.delete('/deleteEventById',events.deleteEventById)

module.exports = router;
