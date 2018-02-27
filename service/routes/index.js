var express = require('express');
var router = express.Router();
var passport = require('passport');
var auth = require('../config/auth');

var User = require('../models/rider');

var events = require('./events');

/* GET home page. */
router.get('/', function(req, res, next) {

  // res.render('index', { title: 'Express' });
  res.render('index');
});

//ruthar: route working - gets a user given the jwt token in header
router.get('/user', auth.required, function(req, res, next){
  User.findById(req.payload.id).then(function(user){
    if(!user){ return res.sendStatus(401); }

    return res.json({user: user.toAuthJSON()});
  }).catch(next);
});

//ruthar: route to login a user is working.
router.post('/users/login', function(req, res, next){
  if(!req.body.email){
    return res.status(422).json({errors: {email: "can't be blank"}});
  }

  if(!req.body.password){
    return res.status(422).json({errors: {password: "can't be blank"}});
  }
  passport.authenticate('local', {session: false}, function(err, user, info){
    if(err){ return next(err); }

    if(user){
      user.token = user.generateJWT();
      return res.json({user: user.toAuthJSON()});
    } else {
      return res.status(422).json(info);
    }
  })(req, res, next);
});

//ruthar: route working - creates a new user.
router.post('/users', function(req, res, next){
  var user = new User();
  user.username = req.body.username;
  user.email = req.body.email;
  user.setPassword(req.body.password);
  user.save().then(function(){
    return res.json({user: user.toAuthJSON()});
  }).catch(next);
});

router.post('/auth',
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });


router.get('/dashboard',function(req,res,next){
 res.render('dashboard');
     // User.findById(req.session.userId)
     //     .exec(function (error, user) {
     //         if (error) {
     //             return next(error);
     //         } else {
     //             if (user === null) {
     //                 var err = new Error('Not authorized! Go back!');
     //                 err.status = 400;
     //                 return next(err);
     //             } else {
     //                 return res.send('<h1>Name: </h1>' + user.firstName + user.lastName + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>')
     //             }
     //         }
     //    });
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

router.post('/submit-event', function (req, res, next) {
    console.log(req.body);
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var request = new XMLHttpRequest();
    request.open('POST', "http://localhost:3000/saveEvent", true);
    request.setRequestHeader('_id', id);
    request.send();
    request.onreadystatechange = function () {
        getData(request)
    };

    function getData(request) {
        if ((request.readyState == 4) && (request.status == 200)) {
            var jsonDocument = JSON.parse(request.responseText);
            console.log(jsonDocument[0].name);
            name = jsonDocument[0].name;
            description = jsonDocument[0].description;
            location = jsonDocument[0].location;
            date = jsonDocument[0].date;
            rendercall(name,description,location, date);
        }
    }
    res.redirect("/");
});

router.get('/createevent',function(req,res,next){
    function rendercall(name, description, location, date){
        console.log("hdgg  "+name);
        res.render('createevent', {title: 'Create Event', name: name, description: description, location: location, date: date});
    }
    var id = req.query.id;
    var name,description, location, date;
    if(id === undefined){
        console.log("vfbfdbfbgnfnfgn");
        name = 'Enter Event Name';
        description = 'Enter Event Description';
        location = 'Enter Event Location';
        date = 'mm/dd/yyyy'
        // res.render('createevent', {title: 'Create Event', name: 'Enter Event Name', description: 'Enter Event Description', location: 'Enter Event Location'});
        rendercall(name,description,location, date);
    }
    else {
        console.log(id);
        var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
        var request = new XMLHttpRequest();
        request.open('GET', "http://localhost:3000/getEventById", true);
        request.setRequestHeader('_id', id);
        request.send();
        request.onreadystatechange = function () {
            getData(request)
        };

        function getData(request) {
            if ((request.readyState == 4) && (request.status == 200)) {
                var jsonDocument = JSON.parse(request.responseText);
                console.log(jsonDocument[0].name);
                name = jsonDocument[0].name;
                description = jsonDocument[0].description;
                location = jsonDocument[0].location;
                date = jsonDocument[0].date;
                rendercall(name,description,location, date);
            }
        }

    }


})


router.get('/manageevent',function(req,res,next){
    res.render('manageevent', {title: 'Manage Event'});
});

router.get('/createevent',function(req,res,next){
    res.render('createevent', {title: 'Create Event'});
})


router.get('/getAllEvents',events.getAllEvents)
router.post('/saveEvent',events.saveEvent)
router.get('/getEventById',events.getEventById)
router.delete('/deleteEventById',events.deleteEventById)

module.exports = router;
