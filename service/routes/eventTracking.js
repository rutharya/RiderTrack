var express = require('express');
var Event = require('../models/events');
var Activity = require('../models/activity');

var router = express.Router();

exports.getLastLocation = function(req,res){
    console.log("In getLastLocation");
    queryEventid = Event.find({})

}