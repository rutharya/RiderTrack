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

                // Check if statistics is already calculated. If the user is clicking the button for the first time or not.
                if(activity.racestats.totaldistance != null){

                    console.log("Stats already calculated");
                    return res.json({statistics: activity.racestats});

                }

                // Event stats are not calculated, hence calculate them.
                else{
                    console.log("calculating statistics");
                    var stats = calculateStats(activity._id);


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
                }

            });


        }).catch(next);



    }).catch(next);



});



function calculateStats(activityid){

    console.log("Inside calculate stats function");
    // Added query to calculate average speed and elevationgain. Yet to caclulate distance and eventduration.
    Activity.aggregate([ { $match: { _id:activityid }}, {$unwind: "$gps_stats"},
        { $group: { _id: null, averagespeed: { $avg: "$gps_stats.speed" },totaldistance: {$max: "$gps_stats.distLeft"},
                first: { $first: "$gps_stats" },
                last: { $last: "$gps_stats" },
                }},
        { $project: {
                datediff: {
                    $subtract: [ "$last.timestamp", "$first.timestamp" ]
                },
                averagespeed:1, totaldistance:1, elevationgain: { $subtract: [ "$last.altitude", 0 ]}
            }}
        ], function (err,result){
        if (err) {
            console.log(err);
        }
        console.log(result);
        //return result.average;
    });
return{
    averagespeed: 12,
    totaldistance: 34,
    elevationgain: 10,
    eventduration: {
        timehours: 1,
        timeminutes: 25,
        timeseconds: 22
    }
}

}




module.exports = router;
