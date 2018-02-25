var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userParticipationSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rider'
    },
    events:[{event_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
      }],
    current_race:[{
      event_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
      }
      lat : Number,
      long : Number,
      timestamp: Date,
      speed: Number,
      distLeft: Number,
      altitude: Number
    }],
    recentEvents: [{
      //Decide the granulaity and then use this for live tracking
      event_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
      }
      lat : Number,
      long : Number,
      timestamp: Date
    }]
});

var userParticipation = mongoose.model('userParticipation', userParticipationSchema);
module.exports = UserParticipation;
