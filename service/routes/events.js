var Event = require('../models/events'); //mongoose data model.
var Rider = require('../models/rider'); 
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


// router.get('/getRegisteredEvents', function (req, res) {
//     query = Rider.find({"_id": "5ab6d22c13ea4b31c1a649ce"})
//     query.exec(function (err, rider) {
//         if (err) return handleError(err);
//       var result = {}
//       var key = "events"
//       result[key] = []
//       var regEvents = rider[0].registeredEvents //This contains the list of all events Object Ids
//         regEvents.forEach(function(value){ // for loop to fetch all the registered events one by one
//           query = Event.find({"_id": value})
//           query.exec(function(err, events){
//             result[key].push(events[0])  // pushing the values to an object
//           })
//         });

//         //cannot fetch the result values to send
//         res.send(result)

//     })
// })

router.get('/getRegisteredEvents', function (req, res) {
    console.log("In functions")
    query = Rider.find({"_id": "5ab6d22c13ea4b31c1a649ce"})
    query.exec(function (err, rider) {
        if (err) return handleError(err);
      var result = {}
      var key = "events"
      result[key] = []
      var regEvents = rider[0].registeredEvents 
        var len = 0
        for(var i = 0; i< regEvents.length; i++){
          query = Event.find({"_id": regEvents[i]})
          query.exec(function(err, events){
            if(err) return handleError(err);
            len++;
            result[key].push(events[0])  // pushing the values to an object
            if(len === regEvents.length){
              res.send(result)
            }
          })
        }
    })
})

// router.get('/getRegisteredEvents', function (req, res) {
//     query = Rider.find({"_id": "5ab6d22c13ea4b31c1a649ce"})
//     query.exec(function (err, rider) {
//         if (err) return handleError(err);
//         console.log("Calling function")
//         getRiderRegisteredEvents(rider, function(err, data){
//             console.log("Inside callback")
//             console.log("Data " +  data)
//         })
//         console.log("After callback")
//         res.send(rider[0])
//     })
// })

// function getRiderRegisteredEvents(rider, callback){
//     console.log("Inside function " + rider[0].registeredEvents[0])
//     query = Rider.find({"_id": rider[0].registeredEvents[0]})
//     query.exec(function(err, event){
//         if(err){console.log(err.message)}
//         else{
//             callback(err, event)
//         }
//     })


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
