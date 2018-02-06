//TODO: move mongodb configuration to config file - appconfig.js
const assert = require('assert');
const MongoClient = require('mongodb').MongoClient;
const test = require('assert');
var mongoose = require('mongoose');
// Connection url
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'ridertrack';

var UserSchema = require('../models/user');

var checkConnection = function() {
  mongoose.connect('mongodb://localhost/ridertrack', function(err) {
      if (err) throw err;
      console.log('Successfully connected');
      var newUser = new UserSchema({
        email: "admin@ridertrack.com",
        username: "admin",
        firstName: "admin",
        lastName: "admin",
        password: "admin",
        repeatPassword: "admin"
      })
      newUser.save(function(err) {
        if (err) throw err;
        console.log('user successfully saved.');
      })
    });
}

checkConnection();
