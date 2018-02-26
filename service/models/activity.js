var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var activitySchema = new Schema({
    riderid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rider'
    },
    eventid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    },
    latestcoordinates:{
        lat : Number,
        lng : Number
    },
    gps_stats:[{
      timestamp: Date,
      lat : Number,
      lng : Number,
      speed: Number,
      distLeft: Number,
      altitude: Number
    }],
    currentRace: [{
        type: String
        //TODO: extract the GPS co-ordinates from GPS_Stats in the middleware
    }]
});

var UserParticipation = mongoose.model('Activity', activitySchema);
module.exports = UserParticipation;