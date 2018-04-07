var express = require('express');
var router = express.Router();
var auth = require('../config/auth');
var passport = require('passport');

var User = require('../models/rider');
var Event = require('../models/events');
var Activity = require('../models/activity');




// Method to get event stats for a rider
router.get('/getEventStats',auth.required, function(req, res, next){
    console.log("Inside get event stats");
    var riderid, eventid, selectedactivity;

    if(!req.payload){
        res.render('error',{message:'invalid headers'});
    }
    else if(!req.query.eventid){
        res.render('error',{message:'Missing parameter eventid'});
    }
    else if(req.query.eventid === ""){
        res.render('error',{message:'Event id is blank'});
    }

    User.findById(req.payload.id).then(function(user){
        if(!user){ return res.sendStatus(401); }
        console.log("Rider selected:"+user._id);
        riderid = user._id;

        Event.findById(req.query.eventid).then(function(events){
            if(!events) {return res.sendStatus(401);}
            eventid = events._id;
            console.log("event selected:"+events._id);

            Activity.findOne({"riderid": riderid, "eventid":eventid}).then(function(activity){
                if(!activity) {
                    return res.sendStatus(401);
                }
                selectedactivity = activity;
                console.log(activity);

                // Event stats are not calculated, hence calculate them.
                    var stats = null;
                    console.log("calculating statistics");
                    //var stats = calculateStats(activity._id);
                    calculateStats(activity._id, function(result){
                        for (var prop in result) {
                            console.log(prop + " = " + result[prop]);
                        }
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
                            { "$set": { "completed": true , "racestats": stats} },
                            { "multi": false },
                            function(err,numAffected) {
                                if (err) {console.log("update failed:"+err); throw err;}
                                console.log("Inserted succesfully to activity with id:"+activity._id );
                                return res.json({statistics: activity.racestats});
                            }
                        );
                    });
            });
        }).catch(next);
    }).catch(next);
});


router.get('/eventplotpoints',auth.required,function(req,res,next){
    var riderid, eventid;
    if(!req.payload){
        res.render('error',{message:'invalid headers'});
    }
    else if(!req.query.eventid){
        res.render('error',{message:'Missing parameter eventid'});
    }
    else if(req.query.eventid === ""){
        res.render('error',{message:'Event id is blank'});
    }

    User.findById(req.payload.id).then(function(user){
        if(!user){ return res.sendStatus(401); }
        riderid = user._id;
        console.log("rider selected"+riderid);

        Event.findById(req.query.eventid).then(function (events) {
            if(!events) {return res.sendStatus(401);}
            eventid = events._id;
            console.log("event selected:"+eventid);
            Activity.aggregate([
                {$match: {eventid: eventid, riderid: riderid}},
                { "$unwind": "$gps_stats" },
                { "$group": { "_id": null, speed:{$push:"$gps_stats.speed"}, distance:{$push: "$gps_stats.distLeft"}, altitude:{$push: "$gps_stats.altitude"} } },
                { "$project":{speed:true,distance:true, altitude:true,_id:false}}
            ], function (err, result) {
                if(err) res.send(err);
                else {
                    console.log(result);
                    res.send(result);
                }

            });
        });


    }).catch(next);
})



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
            }
            else {
                console.log(result[0]);
                fn(result[0]);
            }

        });
}





module.exports = router;
