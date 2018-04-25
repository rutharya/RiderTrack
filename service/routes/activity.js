var express = require('express');
var router = express.Router();
var auth = require('../config/auth');
var passport = require('passport');

var User = require('../models/rider');
var Event = require('../models/events');
var Activity = require('../models/activity');





/*
* Route to get event specific stats
* Input params: Rider id, and event id as riderid and eventid
* Output: Event_Stats
* */

router.get('/getEventStats',function(req, res, next){
    console.log("Inside get event stats");
    var riderid, eventid, selectedactivity;
    console.log(req.query.riderid+" and "+req.query.eventid)

    if(!req.query.eventid || req.query.eventid === ""){
        return res.status(422).json({result: false, status: {msg: 'eventId is missing'}});
    }
    else if(!req.query.riderid || req.query.riderid === ""){
        return res.status(422).json({result: false, status: {msg: 'riderid is missing'}});
    }
    User.findById(req.query.riderid).then(function(user){
        if(!user){ return res.sendStatus(401); }
        console.log("Rider selected:"+user._id);
        riderid = user._id;
        Event.findById(req.query.eventid).then(function(events){
            if(!events || events === null) {return res.sendStatus(401);}
            eventid = events._id;
            console.log("event selected:"+events._id);

            Activity.findOne({"riderid": riderid, "eventid":eventid}).then(function(activity){
                if(!activity || activity === null) {
                    return res.status(422).json({
                        result: false,
                        status: {msg: "no activity in the event for this rider"}
                    });
                }
                selectedactivity = activity;
                console.log("Acitivty selected"+activity);
                console.log("Result is:"+selectedactivity.racestats);
                if(selectedactivity.racestats['maxspeed'] != null || selectedactivity.racestats['maxspeed'] != undefined){

                    console.log("already calculated");
                    return res.json({statistics: activity.racestats});
                }
                else {
                        console.log("Calculating stats");
                    calculateStats(activity._id, function(result){
                        console.log("Result of calculate stats for event is"+result);
                        if(result === "Error"){
                            console.log("No activity for the user");
                            return res.status(422).json({
                                result: false,
                                status: {msg: "no activity in the event for this rider"}
                            });
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
                                    return res.status(500).json({
                                        result: false,
                                        status: {msg: "failed to calculate stats"}
                                    });
                                }
                                else{
                                    return res.json({statistics:activity.racestats});
                                }
                            });
                    });

                }
            });
        }).catch(next);
    }).catch(next);
});



function calculateEventStats(activityid){
    Activity.findOne({_id:activityid}).then(function(activity){
        if(!activity || activity === null) {
            return res.status(422).json({
                result: false,
                status: {msg: "no activity in the event for this rider"}
            });
        }
        else{
            var stats = null;
            calculateStats(activity._id, function(result){
                console.log("Result of calculate stats for event is"+result);
                        if(result === "Error"){
                            console.log("No activity for the user");
                            return res.status(422).json({
                                result: false,
                                status: {msg: "no activity in the event for this rider"}
                            });
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
                                    return res.status(500).json({
                                        result: false,
                                        status: {msg: "failed to calculate stats"}
                                    });
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
