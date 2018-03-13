var mongoose = require('mongoose');
var db = require('../config/db');
var uniqueValidator = require('mongoose-unique-validator');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var secret = require('../config/appConfig').secret;

var RiderSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        lowercase:true,
        required: [true, "can't be blank"],
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        index:true,
        trim: true
    },
    username:{
      type:String,
      unique:true,
      required: [true, "can't be blank"],
      lowercase:true,
      trim:true,
      match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
      index:true
    },
    firstName: {
        type: String,
        // required: true,
        trim: true
    },
    lastName: {
        type: String,
        // required: true,
        trim: true
    },
    // password: {
    //     type: String,
    //     required: true,
    // },
    // repeatPassword: {
    //     type: String,
    //     required: true,
    // },
    height: Number,
    weight: Number,
    gender: String,
    phoneNo: String,
    address: String,
    pastevents: [{
        // pasteventdate: Date,
        // pasteventlocation: String,
        // movingtime: Date,
        // activity: String,
        // distance: Number
        // //TODO: add a reference to event -> with event id.
        // //ref:'events'
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }],
    statistcs: {
        avgspeed: Number,
        wins: Number,
        mostparticipatedactivity: String
    },
    hash: String,
    salt: String

});


RiderSchema.plugin(uniqueValidator, {message: 'is already taken.'});

RiderSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

RiderSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

RiderSchema.methods.generateJWT = function() {
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    id: this._id,
    username: this.username,
    exp: parseInt(exp.getTime() / 1000),
  }, secret);
};

RiderSchema.methods.toAuthJSON = function(){
  return {
    username: this.username,
    email: this.email,
    token: this.generateJWT(),
  };
};

RiderSchema.methods.getid = function(){
  return user._id;
}

var Rider = mongoose.model('Rider', RiderSchema);

module.exports = Rider;
