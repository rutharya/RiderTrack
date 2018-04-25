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
        lng : Number
    },
    gps_stats:[new Schema({
      timestamp: Date,
      lat : Number,
      lng : Number,
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
        averagespeed: Number,
        maxspeed: Number,
        lastspeed:Number,
        totaldistance: Number,
        currentelevation: Number,
        maxelevation: Number,
        averageelevation: Number,
        elapsedtime: Number

    }
});


activitySchema.methods.isCompleted = function () {
    if(this.completed){
        return true;
    }
    return false;
};

var activity = mongoose.model('activity', activitySchema);

module.exports = activity;
