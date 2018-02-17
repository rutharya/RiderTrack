var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventsSchema = new Schema({
	name: {type:String, required:true},
    image: {type:String, required:true},
    description: {type:String,required:true},
    date: {type:String,required:true},
    location: {type:String, required:true},
    time:{type:String, required:true}
});
var Event = mongoose.model('Event', eventsSchema);
module.exports = Event;