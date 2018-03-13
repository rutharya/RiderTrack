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
    }]
}, {collection : 'activity'});

<<<<<<< HEAD
var activity = mongoose.model('activity', activitySchema);
module.exports = activity;
=======
var UserParticipation = mongoose.model('Activity', activitySchema);
module.exports = UserParticipation;
>>>>>>> caching
