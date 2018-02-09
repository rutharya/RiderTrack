var mongoose = require('mongoose');
var RiderSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    username:{
      type:String,
      unique:true,
      required:true,
      trim:true
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    repeatPassword: {
        type: String,
        required: true,
    },
    height: Number,
    weight: Number,
    gender: String,
    pastevents: [{
        pasteventdate: Date,
        pasteventlocation: String,
        movingtime: Date,
        activity: String,
        distance: Number
    }],
    statistcs: {
        avgspeed: Number,
        wins: Number,
        mostparticipatedactivity: String
    }

});
var Rider = mongoose.model('Rider', RiderSchema);
module.exports = Rider;
