var Event = require('../models/events'); //mongoose data model.
var express = require('express');
var router = express.Router();
var passport = require('passport');
var auth = require('../config/auth');
var bodyParser = require('body-parser');


router.get('/getAllEvents', function (req, res) {
    console.log("In getAllEvents");
    query = Event.find({})
    // query.exec()
    query.exec(function (err, events) {
        if (err) return res.status(422).json({errors: {event: "Events not found"}});
        res.send(events)
    });
})

router.post('/save', function (req, res) {
    console.log('In saveEvent')
    var event = new Event(req.body)

    event.save(function (err) {
        if (err) return handleError(err);
        console.log('User Event saved successfully!');
        res.send({"Saved Event ID": event._id})

    });
})

router.get('/getEventById', function (req, res) {
    console.log("In getEventById");
    query = Event.find({"_id": req.headers._id})
    query.exec(function (err, events) {
        if (err) return handleError(err);
        console.log(events)
        res.send(events)
    })
})


// exports.saveEvent = function(req,res){
//
//   console.log('In saveEvent')
//   var event = new Event(req.body)
//
//   event.save(function(err) {
//       if (err) return handleError(err);
//     console.log('User Event saved successfully!');
//       res.send({"Saved Event ID" : event._id })
//
//     });
// }
//
// exports.getEventById = function(req,res){
//
// console.log("In getEventById");
//   query = Event.find({"_id": req.headers._id})
//   query.exec(function (err, events) {
//   if (err) return handleError(err);
//   console.log(events)
//   res.send(events)
// })
// };
//
// exports.deleteEventById = function(req,res){
//
// console.log("In deleteEventById");
//   query = Event.find({"_id": req.headers._id}).deleteMany()
//   query.exec(function (err, events) {
//   if (err) return handleError(err);
//   console.log(events)
//   res.send(events)
// })
// };
//
//
//

module.exports = router;
