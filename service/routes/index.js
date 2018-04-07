var express = require('express');
var router = express.Router();
var passport = require('passport');
var auth = require('../config/auth');
var bodyParser = require('body-parser');

var User = require('../models/rider');
var Activity = require('../models/activity');

// /* GET home page. */
//HOME ROUTE COMMENTED OUT because We are serving Angular code from /dist.
// router.get('/', function(req, res, next) {
//   // res.render('index', { title: 'Express' });
//   res.render('index');
// });

router.use('/users', require('./users'));
router.use('/events', require('./events'));
router.use('/activities', require('./activity'));
router.use('/profiles',require('./profiles'));



router.get('/dashboard',function(req,res,next){
 res.render('dashboard');
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



router.get('/userstatistics',auth.required, function(req, res, next){
    console.log("Inside get user stats");
    var riderid, stats;

    if(!req.payload){
        res.render('error',{message:'invalid headers'});
    }

    User.findById(req.payload.id).then(function(user){
        if(!user){ return res.sendStatus(401); }
        console.log("Rider selected:"+user._id);
        riderid = user._id;

       calculateUserStats(user._id, function (result) {

           for (var prop in result) {
               console.log(prop + " = " + result[prop]);
           }
           stats =  {
               avgspeed: result['avgspeed'],
               maxspeed: result['maxspeed'],
               totaldistance: result['totaldistance'],
               longestdistance: result['longestdistance'],
               maxelevation: result['maxelevation'],
               averageelevation: result['averageelevation'],
               totalmovingtime: result['totalmovingtime'],
               longestmovingtime: result['longestmovingtime'],
               participationcount: result['participationcount'],
               wincount: user.statistics.wincount

           }

           user.statistics = stats;
           User.update(
               { "_id": riderid },
               { "$set": {"statistics": stats} },
               { "multi": false },
               function(err,numAffected) {
                   if (err) {console.log("update failed:"+err); throw err;}
                   console.log("Inserted succesfully to rider  with id:"+riderid);
                   return res.json({statistics: user.statistics});
               }
           );
       });

    }).catch(next);
});





// Router method to get latest activity for a rider.
router.get('/getLatestEvent', auth.required, function (req, res, next) {
    console.log("Inside get last event");
    var riderid;
    if(!req.payload){
        res.render('error',{message:'invalid headers'});
    }
    User.findById(req.payload.id).then(function (user) {
        if(!user){ return res.sendStatus(401); }
        console.log("Rider selected:"+user._id);
        riderid = user._id;
        // Get latest activity by natural sorting, and limiting
        var q = Activity.find({riderid: riderid}).limit(1).sort({$natural:-1});
        q.exec(function(err, activity) {
           if(err){
               console.log("Error occured"+err);
               res.send("Error");
           }
           else{
               
               console.log("Activity found"+activity._id);
               res.send(activity);
           }
        });

    }).catch(next);



})







// Function to calculate Event stats including: average speed, current elevation, distance from start, and elapsed time in terms of milliseconds
// Output: Average Speed, Current Distance from starting point of race, current altitude, and elapsed time.

function calculateUserStats(riderid, fn){

    console.log("Inside calculate stats function");
    // Added query to calculate average speed and elevationgain. Yet to caclulate distance and eventduration.

    Activity.aggregate([
        {$match: {riderid: riderid}},
        {$group:
                {
                    _id:null, totaldistance: {$sum: "$racestats.totaldistance"}, longestdistance: {$max: "$racestats.totaldistance"},
                    totalmovingtime: {$sum: "$racestats.elapsedtime"}, longestmovingtime: {$max: "$racestats.elapsedtime"},
                    averageelevation: {$avg: "$racestats.averageelevation"}, maxelevation: {$max: "$racestats.maxelevation"},
                    avgspeed: {$avg: "$racestats.averagespeed"}, maxspeed: {$max: "$racestats.maxspeed"},
                    participationcount: {$sum: 1}


                }

        },
        {$project:
                {
                    totaldistance:1, longestdistance:1, totalmovingtime:1, longestmovingtime:1, averageelevation:1, maxelevation:1, avgspeed:1, maxspeed:1, participationcount:1
                }
        }
    ], function (err,result){
        if (err) {
            console.log(err);
        }
        else {
            console.log(result[0]);
            fn(result[0]);
        }

    });
}


// router.get('/getAllEvents',events.getAllEvents)
// router.post('/saveEvent',events.saveEvent)
// router.get('/getEventById',events.getEventById)
// router.delete('/deleteEventById',events.deleteEventById)

// router.get('/getLastLocation', eventTracking.getLastLocation)
// router.get('/getRiderLocation', eventTracking.getRiderLocation)
// router.post('/clientGpsStats', eventTracking.clientGpsStats)
module.exports = router;
