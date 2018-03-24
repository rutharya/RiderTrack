var express = require('express');
var router = express.Router();
var passport = require('passport');
var auth = require('../config/auth');
var bodyParser = require('body-parser');

var User = require('../models/rider');

<<<<<<< HEAD
var events = require('./events');
var eventTracking = require('./eventTracking');

/* GET home page. */
router.get('/', function (req, res, next) {

    // res.render('index', { title: 'Express' });
    res.render('index');
});

router.use('/users', require('./users'));
router.use('/tracking/',require('./savemyloc'));

=======
//var events = require('./events');
//
// /* GET home page. */
// router.get('/', function(req, res, next) {
//
//   // res.render('index', { title: 'Express' });
//   res.render('index');
// });

router.use('/users', require('./users'));
router.use('/events', require('./events'));
>>>>>>> PPE

// //ruthar: route working - gets a user given the jwt token in header
// router.get('/user', auth.required, function(req, res, next){
//   User.findById(req.payload.id).then(function(user){
//     if(!user){ return res.sendStatus(401); }
//
//     return res.json({user: user.toAuthJSON()});
//   }).catch(next);
// });
//
// router.use(bodyParser.json());
//ruthar: route to login a user is working.
// router.post('/users/login', function(req, res, next){
//   console.log('login attempted: by app');
//   console.log(req.body);
//
//   if(!req.body.email){
//     return res.status(422).json({errors: {email: "can't be blank"}});
//   }
//
//   if(!req.body.password){
//     return res.status(422).json({errors: {password: "can't be blank"}});
//   }
//   passport.authenticate('local', {session: false}, function(err, user, info){
//     if(err){ return next(err); }
//     if (!user) return done(null, false, { message: 'Incorrect username.' });
//     if(user){
//       user.token = user.generateJWT();
//       return res.json({user: user.toAuthJSON()});
//     } else {
//       return res.status(422).json(info);
//     }
//   })(req, res, next);
// });

// router.post('/users/login', function(req, res, next){
//   console.log('LOGIN: /user/login');
//   console.log(req.body);
//   console.log(req.user);
//   if(!req.body.email){
//     return res.status(422).json({errors: {email: "can't be blank"}});
//   }
//
//   if(!req.body.password){
//     return res.status(422).son({errors: {password: "can't be blank"}});
//   }
//   passport.authenticate('local', {failureRedirect:'/login',session: false}, function(err, user, info){
//     //onSuccessRedirect:'/dashboard',
//     if(err){ return next(err); }
//
//     if(user){
//       user.token = user.generateJWT();
//       res.set('Authorization','Bearer '+user.token);
//       //return res.redirect('/dashboard2')
//
//       return res.json({user: user.toAuthJSON()});
//     }else {
//       return res.status(422).json(info);
//     }
//   })(req, res, next);
// });
router.post('/users/login2', function(req, res, next){
  console.log('LOGIN: /user/login2');
  if(!req.body.email){
    return res.status(422).json({errors: {email: "can't be blank"}});
  }

  if(!req.body.password){
    return res.status(422).son({errors: {password: "can't be blank"}});
  }
  passport.authenticate('local', {failureRedirect:'/login',session: false}, function(err, user, info){
    //onSuccessRedirect:'/dashboard',
    if(err){ return next(err); }

    if(user){
      user.token = user.generateJWT();
      res.set('Authorization','Bearer '+user.token);
      //return res.redirect('/dashboard2')

      return res.redirect('/dashboard/'+user.id);
    }else {
      return res.status(422).json(info);
    }
  })(req, res, next);
});



//ruthar: route working - creates a new user.
// router.post('/users', function(req, res, next){
//   console.log(req.body);
//   var user = new User();
//   user.username = req.body.username;
//   user.email = req.body.email;
//   user.setPassword(req.body.password);
//   user.save().then(function(){
//     return res.json({user: user.toAuthJSON()});
//   }).catch(next);
// });

router.post('/auth',
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });


router.get('/asdf',auth.required,function(req,res,next){
    var result = {};
    result.asfd = "asdfaasdfa";
    res.send(result);
});

router.get('/statistics',auth.required,function(req,res,next){
  var data = {};
  data.temp_max = 24;
  data.temp_min = 5;
  var main = {};
  main.dt = 1520538960;
  main.main = data;
  res.send(main);
  // res.json({
  //   'main':{
  //     'temp_max':24,
  //     'temp_min':5
  //   },
  //   'dt':1520538960
  // })
});


// To be used in the dashboard page depicting user overall statistics
router.get('/userstatistics', auth.required, function(req,res,next){
    User.findById(req.payload.id).then(function(user){
        if(!user){ return res.sendStatus(401); }
        return res.json({statistics: user.statistics});
    }).catch(next);
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


router.get('/dashboard2',auth.required,function(req,res,next){
  res.redirect('/dashboard/'+req.payload.id);
});

router.get('/authsuc', function (req, res, next) {
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


router.get('/dashboard', function (req, res, next) {
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

router.get('/tracking', function (req, res, next) {
    function rendercall(jsonDoc) {
        res.render('tracking', {
            locArray: jsonDoc
        });
    }
    var id = req.query.id;
    if (id === undefined) {
        console.log("vfbfdbfbgnfnfgn");
    }
    else{
        console.log(id);
        var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
        var request = new XMLHttpRequest();
        request.open('GET', "http://localhost:3000/getLastLocation", true);
        request.setRequestHeader('_id', id);
        request.send();
        request.onreadystatechange = function () {
            getData(request)
        };
        function getData(request) {
            if ((request.readyState == 4) && (request.status == 200)) {
                var jsonDocument = JSON.parse(request.responseText);
                console.log(jsonDocument);
                rendercall(jsonDocument);
            }
        }
    }

})
router.get('/profile', function (req, res, next) {
    res.render('profile', {title: 'My Profile'});
})

router.get('/credentials', function (req, res, next) {
    res.render('credentials', {title: 'My Credentials'});
})

router.get('/events', function (req, res, next) {
    res.render('events');
})

router.get('/login', function (req, res, next) {
    res.render('login');
})

router.get('/ridertracking', function (req, res, next) {
    function rendercall(jsonDoc) {
        res.render('ridertracking', {
            locArray: jsonDoc
        });
    }
    var eventid = req.query.eventid;
    var riderid = req.query.riderid;
    if (eventid === undefined) {
        console.log("vfbfdbfbgnfnfgn");
    }
    else{
        console.log("In rider tracking")
        console.log(eventid);
        console.log(riderid);
        var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
        var request = new XMLHttpRequest();
        request.open('GET', "http://localhost:3000/getRiderLocation", true);
        request.setRequestHeader('eventid', eventid);
        request.setRequestHeader('riderid',riderid);
        request.send();
        request.onreadystatechange = function () {
            getData(request)
        };

        function getData(request) {
            if ((request.readyState == 4) && (request.status == 200)) {
                var jsonDocument = JSON.parse(request.responseText);
                console.log(jsonDocument);

                rendercall(jsonDocument);
            }
        }
    }

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
            rendercall(name, description, location, date);
        }
    }

    res.redirect("/");
});

router.get('/createevent', function (req, res, next) {
    function rendercall(name, description, location, date) {
        console.log("hdgg  " + name);
        res.render('createevent', {
            title: 'Create Event',
            name: name,
            description: description,
            location: location,
            date: date
        });
    }

    var id = req.query.id;
    var name, description, location, date;
    if (id === undefined) {
        console.log("vfbfdbfbgnfnfgn");
        name = 'Enter Event Name';
        description = 'Enter Event Description';
        location = 'Enter Event Location';
        date = 'mm/dd/yyyy'
        // res.render('createevent', {title: 'Create Event', name: 'Enter Event Name', description: 'Enter Event Description', location: 'Enter Event Location'});
        rendercall(name, description, location, date);
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
                rendercall(name, description, location, date);
            }
        }

    }


})


router.get('/manageevent', function (req, res, next) {
    res.render('manageevent', {title: 'Manage Event'});
});

router.get('/createevent', function (req, res, next) {
    res.render('createevent', {title: 'Create Event'});
})


router.get('users/forgotpwd', function(req,res,next){
  res.render('forgotpwd');
});

router.post('/users/forgotpwd',function(req,res,next){
  //

})

// router.get('/getAllEvents',events.getAllEvents)
// router.post('/saveEvent',events.saveEvent)
// router.get('/getEventById',events.getEventById)
// router.delete('/deleteEventById',events.deleteEventById)

router.get('/getLastLocation', eventTracking.getLastLocation)
router.get('/getRiderLocation', eventTracking.getRiderLocation)
router.post('/clientGpsStats', eventTracking.clientGpsStats)
module.exports = router;
