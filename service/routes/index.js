var express = require('express');
var router = express.Router();
var passport = require('passport');
var auth = require('../config/auth');
var bodyParser = require('body-parser');
var User = require('../models/rider');
var Activity = require('../models/activity');
var Event = require('../models/events');
var swaggerUi = require('swagger-ui-express');
var swaggerDocument = require('../swagger.json');

// /* GET home page. */
//HOME ROUTE COMMENTED OUT because We are serving Angular code from /dist.
// router.get('/', function(req, res, next) {
//   // res.render('index', { title: 'Express' });
//   res.render('index');
// });
// router.use('/api', require('./api'));
router.use('/users', require('./users'));
router.use('/events', require('./events'));
router.use('/loc',require('./savemyloc'));
router.use('/activities', require('./activity'));
router.use('/profiles',require('./profiles'));
router.use('/tracking',require('./tracking'));
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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

/*
* Function to calculate and return user level stats on user dashboard
* Requires user payload for JWT token.
* Returns User level stats
* */

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

            console.log("Result is:"+result);
            if(result === "Error" || result == undefined){
                return res.status(422).json({
                    result: false,
                    status: {msg: "Unable to calculate reace stats"}
                });
            }

            user.statistics =  {
                avgspeed: result['avgspeed'],
                maxspeed: result['maxspeed'],
                totaldistance: result['totaldistance'],
                longestdistance: result['longestdistance'],
                maxelevation: result['maxelevation'],
                averageelevation: result['averageelevation'],
                totalmovingtime: result['totalmovingtime'],
                longestmovingtime: result['longestmovingtime'],
                participationcount: result['participationcount'],
                wincount: user.statistics.wincount,

            }

            User.update(
                { "_id": riderid },
                { "$set": {"statistics": stats} },
                { "multi": false },
                function(err,numAffected) {
                    if (err) {console.log("update failed:"+err); return res.send([]);}
                    console.log("Inserted succesfully to rider  with id:"+riderid);
                    return res.json({statistics: user.statistics});
                }
            );
        });

    }).catch(next);
});







/*
* Router method to fetch the latest activity of the rider
* Params required auth token
* */
router.get('/getLatestEvent', auth.required, function (req, res, next) {
    console.log("Inside get last event");
    var riderid, activityselected, eventid,result;
    if(!req.payload){
        return res.send('error',{message:'invalid headers'});
    }
    User.findById(req.payload.id).then(function (user) {
        if(!user){ return res.sendStatus(401); }
        console.log("Rider selected:"+user._id);
        riderid = user._id;
        // Get latest activity by natural sorting, and limiting
        var q = Activity.find({riderid: user._id, completed: true}).limit(1).sort({$natural:-1});
        q.exec(function(err, activity) {
            if(err){
                console.log("Error occured"+err);
                return res.send([]);
            }
            else{
                console.log("Activity returned"+activity);
                if(activity === null || activity == undefined)
                {return res.sendStatus(401);}
                activityselected = activity[0];
                if(activityselected == undefined) return res.send([]);
                eventid = activityselected.eventid;
                Event.findById({_id: eventid}).then(function (events) {
                    if(!events) {return res.sendStatus(401);}
                    else if(events === null || events == undefined) return res.send([]);
                    else{

                        result = {
                            activity: activityselected,
                            eventinfo: {
                                eventname: events.name,
                                eventlocation: events.location,
                                eventdate: events.date
                            }
                        }
                        res.send(result);

                    }
                });



            }
        });
    }).catch(next);
});

/*
* Router method to get datapoints to plot in user dashboard charts
* Params required auth token
* */
router.get('/userdatapoints',auth.required,function(req,res,next){
    console.log("Inside userdatapoints");
    var riderid;
    if(!req.payload){
        res.render('error',{message:'invalid headers'});
    }

    User.findById(req.payload.id).then(function(user){
        if(!user){ return res.sendStatus(401); }
        riderid = user._id;
        console.log("rider selected"+riderid);

        Activity.aggregate([

            {$match: {riderid: riderid}},
            { "$group": { "_id": null, distance:{$push:"$racestats.totaldistance"}, speed:{$push: "$racestats.averagespeed"}, altitude:{$push: "$racestats.averageelevation"} } },
            { "$project":{speed:true,distance:true, altitude:true,_id:false}}
        ] ,function (err,result){
            if (err) {
                console.log(err);
                res.send([]);
            }
            else {
                if(result === null){
                    console.log("No data for the user");
                    res.send([]);
                }
                console.log(result);
                res.send(result);
            }

        });



    }).catch(next);
});






// Function to calculate Event stats including: average speed, current elevation, distance from start, and elapsed time in terms of milliseconds
// Output: Average Speed, Current Distance from starting point of race, current altitude, and elapsed time.

function calculateUserStats(riderid, fn){

    console.log("Inside calculate stats function");
    // Added query to calculate average speed and elevationgain. Yet to caclulate distance and eventduration.

    Activity.aggregate([
        {$match: {riderid: riderid,completed:true}},
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
            fn("Error");
        }
        else {
            if(result === null) {
                console.log("No events for the user");
                fn("Error");

            }
            else {
                console.log(result[0]);
                fn(result[0]);
            }
        }

    });
}

module.exports = router;
