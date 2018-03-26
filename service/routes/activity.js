var express = require('express');
var router = express.Router();
var auth = require('../config/auth');
var passport = require('passport');

var User = require('../models/rider');
var Event = require('../models/events');
var Activity = require('../models/activity');





// Method to get event stats
router.get('/getEventStats',auth.required, function(req, res, next){
    console.log("Inside get event stats");
    var riderid, eventid, selectedactivity;
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
                var gps_data = calculateStats();


                Activity.update(
                    { "_id": activity._id },
                    { "$set": { "completed": true , "racestats": gps_data} },
                    { "multi": false },
                    function(err,numAffected) {
                        if (err) {console.log("update failed:"+err); throw err;}
                        console.log("Inserted succesfully to activity with id:"+activity._id );
                        res.send(activity);
                    }
                );





            });


        }).catch(next);



    }).catch(next);



});


// var calculateStats = function(activity){
//
//    Activity.aggregate([
//        {
//          $match: {
//              "id": {activity._id}
//          }
//        },
//    ])
// }
//


module.exports = router;
