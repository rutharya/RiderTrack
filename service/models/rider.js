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
        lowercase: true,
        required: [true, "can't be blank"],
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        index: true,
        trim: true
    },
    username: {
        type: String,
        unique: true,
        required: [true, "can't be blank"],
        lowercase: true,
        trim: true,
        match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
        index: true
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
    bio: String,
    phoneNo: String,
    address: String,
    image: String,
    following: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    registeredEvents: [{
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
    statistics: {

        participationcount: Number,
        avgspeed: {
            type: Number,
        },
        maxspeed: {
            type: Number,
        },
        totaldistance: {
            type: Number,
            min: 0
        },
        longestdistance: {
            type: Number,
            min: 0
        },
        maxelevation: {
            type: Number
        },
        averageelevation: {
            type: Number
        },
        wincount: {
            type: Number,
        },
        totalmovingtime: {
            type: Number
        },
        longestmovingtime: {
            type: Number
        }

    },
    hash: String,
    salt: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date

});


RiderSchema.plugin(uniqueValidator, {message: 'is already taken.'});

RiderSchema.methods.validPassword = function (password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

RiderSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

RiderSchema.methods.generateJWT = function () {
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 1); //expiry set to 1 day for now-> to test if expiry works

    return jwt.sign({
        id: this._id,
        username: this.username,
        exp: parseInt(exp.getTime() / 1000),
    }, secret);
};


RiderSchema.methods.toAuthJSON = function () {
    return {
        username: this.username,
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        height: this.height,
        weight: this.weight,
        gender: this.gender,
        bio: this.bio,
        phoneNo: this.phoneNo,
        address: this.address,
        image: this.image,
        token: this.generateJWT(),
    };
}

RiderSchema.methods.toProfileJSON = function (user) {
    return {
        username: this.username,
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        //TODO: is it a privacy concern to return PII (phone number, ht,wt, and address)
        following: user ? user.isFollowing(this._id) : false
    };
};

RiderSchema.methods.userProfile = function () {
    return {
        username: this.username,
        email: this.email,
        height: this.height,
        weight: this.weight,
        gender: this.gender,
        phoneNo: this.phoneNo,
        address: this.address,
        image: this.image
    }
}


RiderSchema.methods.follow = function (id) {
    if (this.following.indexOf(id) === -1) {
        this.following.push(id);
    }
    return this.save();
}

RiderSchema.methods.unfollow = function (id) {
    this.following.remove(id);
    return this.sace();
}

RiderSchema.methods.getid = function () {
    return user._id;
}

RiderSchema.methods.getRegisteredEvents = function () {
    return {
        registeredEvents: this.registeredEvents
    }
}

RiderSchema.methods.isParticipant = function (eventId) {
    console.log('in is participant');
    console.log(this.registeredEvents);
    console.log(eventId);
    console.log(this.registeredEvents.indexOf(eventId));
    if (this.registeredEvents.indexOf(eventId) >= 0) {
        return true;
    }
    else {
        return false;
    }
}

var Rider = mongoose.model('Rider', RiderSchema);

module.exports = Rider;
