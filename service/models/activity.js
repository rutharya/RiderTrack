var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var activitySchema = new Schema({
    riderid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rider',
        required:true
    },
    eventid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required:true
    },
    latestcoordinates:{
        lat : Number,
        long : Number
    },
    gps_stats:[new Schema({
      timestamp: Date,
      lat : Number,
      long : Number,
      speed: Number,
      distLeft: Number,
      altitude: Number
    },{_id:false})],
    currentRace: [{
        type: String
        //TODO: extract the GPS co-ordinates from GPS_Stats in the middleware
    }],
     // Flag indicating the race completion status
    completed:{
        type:Boolean,
        default: false
    },

    // Race Statistics compiled after race completion
    racestats:{
        averagespeed: {
            type: Number,
            min:0,
            max: 100
        },
        maxspeed: {
            type: Number,
            min: 0,
            max: 100
        },
        totaldistance: Number,
        elevationgain: Number,
        maxelevationgain: Number,
    }
});

var UserParticipation = mongoose.model('Activity', activitySchema);
module.exports = UserParticipation;
