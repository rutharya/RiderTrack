//TODO: move mongodb configuration to config file - appconfig.js
const assert = require('assert');
const MongoClient = require('mongodb').MongoClient;
const test = require('assert');
var mongoose = require('mongoose');
// // Connection url
// const url = 'mongodb://localhost:27017';
// // Database Name
// const dbName = 'ridertrack';


var db = require('../config/db');

var UserSchema = require('../models/rider');


//v2 -> mongoose connection through db.js in configs.
//TODO: move mongoose configurations to environment variables.
var check = function(){
  UserSchema.findOne(function(err,data){
    if(err) console.log(err);
    console.log(data);
  })
}

check();

//v1
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


//v1
var findOne = function(){
  //console.log(UserSchema);
  mongoose.connect('mongodb://localhost/ridertrack', function(err) {
      if (err) throw err;
      console.log('Successfully connected');
      UserSchema.findOne(function(err,data){
        if(err) console.log(err);
        console.log(data);
      })
    })

}

//findOne();
// setTimeout(function() {
//   mongoose.connect('mongodb://localhost/myapp');
// }, 60000);

//checkConnection();
