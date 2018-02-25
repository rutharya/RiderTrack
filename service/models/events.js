var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventsSchema = new Schema({
	name: {type:String, required:true},
    image: {type:String, required:true},
    description: {type:String,required:true},
    date: {type:Date,required:true},
    location: {type:String, required:true},
    time:{type:String, required:true},
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
    totalDist: Number,
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
var Event = mongoose.model('Event', eventsSchema);
module.exports = Event;