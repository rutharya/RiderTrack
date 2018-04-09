var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventsSchema = new Schema({
	name: {type:String, required:true},
    image: {type:String, required: true},
    description: {type:String,required:true},
    date: {type:Date,required:true},
    location: {type:String, required:true},
    startTime:{type:Date, required:true},
    endTime:{type:Date, required:true},
    trackFile: {type:String, required:true},
    track: {
        elevation: Number,
        length: Number,
        difficulty: String
    },
    eventRiders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Rider'
        }
    ],
    raceWinners: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Rider'
        }
    ],
    statusOfRace: String,
    startLocation: {
	    lat: Number,
        long: Number
    },
    endLocation: {
        lat: Number,
        long: Number
    }
});

eventsSchema.methods.isParticipant = function(riderId){
  return this.eventRiders.indexOf(riderId);
}
var Event = mongoose.model('Event', eventsSchema);
module.exports = Event;