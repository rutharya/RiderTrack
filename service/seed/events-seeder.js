var Event = require('../models/events');

var mongoose = require('mongoose');


// mongoose.connect('mongodb://localhost:27017/ridertrack');
// console.log("Connected to MongoDb database");

var events = [
    new Event({
            name: "Hawaii Trekking",
            image: "https://www.topfivebuzz.com/wp-content/uploads/2017/07/trekking-essentials.jpg",
            description: "Hawaii Trekking at Hawaii University at A Mountain Tempe ASU",
            date: new Date("2018-07-21"),
            location: "A-Mountain",
            startTime: new Date("2018-07-21T15:00:00Z"),
            endTime: new Date("2018-07-21T18:00:00Z"),
            track: {
                "elevation": 34,
                "length": 13.2,
                "difficulty": "Beginner"
            },
            eventRiders: [],
            raceWinners: [],
            statusOfRace:"",
            startLocation:{
                lat:12.239,
                "lng":23.244
            },
            endLocation:{
                lat:23.344,
                lng:11.324
            }

    }),


    new Event({
        name : "Tucson Marathon",
        image : "http://www.parcjeandrapeau.com/medias/images/header/marathon-et-demi-marathon-oasis-rock-n-roll-de-montreal.jpg",
        description : "San Jose Downtown Marathon",
        date : new Date("2017-10-21"),
        location : "DownTown Tucson",
        startTime: new Date("2017-10-21T07:00:00Z"),
        endTime: new Date("2017-10-21T01:00:00Z"),
        track: {
            "elevation": 34,
            "length": 13.2,
            "difficulty": "Beginner"
        },
        eventRiders: [],
        raceWinners: [],
        statusOfRace:"",
        startLocation:{
            lat:12.239,
            "lng":23.244
        },
        endLocation:{
            lat:23.344,
            lng:11.324
        }

    }),

new Event({
        name : "Oregon Rowing",
        image : "https://fwmdocks.com/wp-content/uploads/2017/01/FWM-Rowing-807x356-1.jpg",
        description : "Rowing event in Oregon from 5:00 PM",
        date : new Date("2018-03-21"),
        location : "DownTown San Jose",
        startTime: new Date("2018-03-21T15:00:00Z"),
        endTime: new Date("2018-03-21T18:00:00Z"),
        track: {
            "elevation": 34,
            "length": 13.2,
            "difficulty": "Beginner"
        },
        eventRiders: [],
        raceWinners: [],
        statusOfRace:"",
        startLocation:{
            lat:12.239,
            "lng":23.244
        },
        endLocation:{
            lat:23.344,
            lng:11.324
    }

}),
new Event({
        name : "San Jose Marathon",
        image : "http://www.parcjeandrapeau.com/medias/images/header/marathon-et-demi-marathon-oasis-rock-n-roll-de-montreal.jpg",
        description : "San Jose Downtown Marathon",
        date : new Date("2019-01-11"),
        location : "A-Mountain",
        startTime: new Date("2019-01-11T15:00:00Z"),
        endTime: new Date("2019-01-11T18:00:00Z"),
        track: {
            "elevation": 34,
            "length": 13.2,
            "difficulty": "Beginner"
        },
        eventRiders: [],
        raceWinners: [],
        statusOfRace:"",
        startLocation:{
            lat:12.239,
            "lng":23.244
        },
        endLocation:{
            lat:23.344,
            lng:11.324
        }

}),
new Event({
        name : "Seattle Marathon",
        image : "http://www.parcjeandrapeau.com/medias/images/header/marathon-et-demi-marathon-oasis-rock-n-roll-de-montreal.jpg",
        description : "Seattle Downtown Marathon Seattle Downtown Marathon",
        date : new Date("2016-12-28"),
        location : "DownTown San Jose",
        startTime: new Date("2016-12-28T13:00:00Z"),
        endTime: new Date("2016-12-28T17:00:00Z"),
        track: {
            "elevation": 34,
            "length": 13.2,
            "difficulty": "Beginner"
        },
        eventRiders: [],
        raceWinners: [],
        statusOfRace:"",
        startLocation:{
            lat:12.239,
            "lng":23.244
        },
        endLocation:{
            lat:23.344,
            lng:11.324
        }

}),

new Event({
        name : "San Jose Marathon",
        image : "https://s-media-cache-ak0.pinimg.com/originals/48/51/6a/48516a2b7d82b4755063e4c737d764b2.jpg",
        description : "San Jose Downtown Marathon",
        date : new Date("2018-09-07"),
        location : "A-Mountain",
        startTime: new Date("2018-09-07T09:00:00Z"),
        endTime: new Date("2018-09-07T12:00:00Z"),
        track: {
            "elevation": 34,
            "length": 13.2,
            "difficulty": "Beginner"
        },
        eventRiders: [],
        raceWinners: [],
        statusOfRace:"",
        startLocation:{
            lat:12.239,
            "lng":23.244
        },
        endLocation:{
            lat:23.344,
            lng:11.324
        }

}),

new Event({
        name : "Washington Trekking",
        image : "https://alhujjattravels.com/wp-content/uploads/2017/04/treking-1.jpg",
        description : "Washington Downtown Marathon",
        date : new Date("2018-12-05"),
        location : "A-Mountain",
        startTime: new Date("2018-12-05T10:00:00Z"),
        endTime: new Date("2018-12-05T15:00:00Z"),
        track: {
            "elevation": 34,
            "length": 13.2,
            "difficulty": "Beginner"
        },
        eventRiders: [],
        raceWinners: [],
        statusOfRace:"",
        startLocation:{
            lat:12.239,
            "lng":23.244
        },
        endLocation:{
            lat:23.344,
            lng:11.324
        }

}),

new Event({
        name : "San Francisco Marathon",
        image : "http://thehotzoneusa.com/wp-content/uploads/2014/11/14803118587_20f2a571fc_o.jpg",
        description : "California Trekking at California State University at abcd Mountain",
        date : new Date("2018-12-21"),
        location : "DownTown San Jose",
        startTime: new Date("2018-12-21T15:00:00Z"),
        endTime: new Date("2018-12-21T18:00:00Z"),
        track: {
            "elevation": 34,
            "length": 13.2,
            "difficulty": "Hard"
        },
        eventRiders: [],
        raceWinners: [],
        statusOfRace:"",
        startLocation:{
            lat:12.239,
            "lng":23.244
        },
        endLocation:{
            lat:23.344,
            lng:11.324
        }

}),

new Event({
        name : "San Mateo Marathon",
        image : "https://www.topfivebuzz.com/wp-content/uploads/2017/07/trekking-essentials.jpg",
        description : "San Mateo Downtown Marathon",
        date : new Date("2018-12-21"),
        location : "A-Mountain",
        startTime: new Date("2018-12-21T11:00:00Z"),
        endTime: new Date("2018-12-21T15:00:00Z"),
        track: {
            "elevation": 34,
            "length": 13.2,
            "difficulty": "Beginner"
        },
        eventRiders: [],
        raceWinners: [],
        statusOfRace:"",
        startLocation:{
            lat:12.239,
            "lng":23.244
        },
        endLocation:{
            lat:23.344,
            lng:11.324
        }

}),

new Event({
       name : "ASU Tempe Trekking",
       image : "https://s-media-cache-ak0.pinimg.com/originals/48/51/6a/48516a2b7d82b4755063e4c737d764b2.jpg",
       description : "A Mountain Tempe ASU ASU Trekking at Arizona State University at A Mountain Tempe ASU",
       date : new Date("2018-02-13"),
       location : "DownTown San Jose",
        startTime: new Date("2018-02-13T11:00:00Z"),
        endTime: new Date("2018-02-13T18:00:00Z"),
        track: {
            "elevation": 34,
            "length": 13.2,
            "difficulty": "Beginner"
        },
        eventRiders: [],
        raceWinners: [],
        statusOfRace:"",
        startLocation:{
            lat:12.239,
            "lng":23.244
        },
        endLocation:{
            lat:23.344,
            lng:11.324
        }

}),

new Event({
      name : "San Jose Marathon",
      image : "https://s-media-cache-ak0.pinimg.com/originals/48/51/6a/48516a2b7d82b4755063e4c737d764b2.jpg",
      description : "San Jose Downtown Marathon",
      date : new Date("2018-01-25"),
      location : "A-Mountain",
        startTime: new Date("2018-01-25T15:00:00Z"),
        endTime: new Date("2018-01-25T18:00:00Z"),
        track: {
            "elevation": 34,
            "length": 13.2,
            "difficulty": "Beginner"
        },
        eventRiders: [],
        raceWinners: [],
        statusOfRace:"",
        startLocation:{
            lat:12.239,
            "lng":23.244
        },
        endLocation:{
            lat:23.344,
            lng:11.324
        }

}),

new Event({
       name : "Sacramento Marathon",
       image : "http://www.parcjeandrapeau.com/medias/images/header/marathon-et-demi-marathon-oasis-rock-n-roll-de-montreal.jpg",
       description : "Sacramento Mountains California Sacramento Mountains California at 3:00 PM",
       date : new Date("2018-07-04"),
       location : "Sacramento Mountains California",
        startTime: new Date("2018-07-04T14:00:00Z"),
        endTime: new Date("2018-07-04T18:00:00Z"),
        track: {
            "elevation": 34,
            "length": 13.2,
            "difficulty": "Beginner"
        },
        eventRiders: [],
        raceWinners: [],
        statusOfRace:"",
        startLocation:{
            lat:12.239,
            "lng":23.244
        },
        endLocation:{
            lat:23.344,
            lng:11.324
        }

}),

new Event({
        name : "Indore Marathon", image : "http://thehotzoneusa.com/wp-content/uploads/2014/11/14803118587_20f2a571fc_o.jpg",
        description : "Indore India Marathon",
        date : new Date("2018-12-21"),
        location : "Vijay Nagar",
        startTime: new Date("2018-12-21T15:00:00Z"),
        endTime: new Date("2018-12-21T18:00:00Z"),
        track: {
            "elevation": 34,
            "length": 13.2,
            "difficulty": "Beginner"
        },
        eventRiders: [],
        raceWinners: [],
        statusOfRace:"",
        startLocation:{
            lat:12.239,
            "lng":23.244
        },
        endLocation:{
            lat:23.344,
            lng:11.324
        }

}),

new Event({
        name : "Phoenix Rowing",
        image : "https://fwmdocks.com/wp-content/uploads/2017/01/FWM-Rowing-807x356-1.jpg",
        description : "Phoenix Rowing at Lake Pleasant this December",
        date : new Date("2017-07-21"),
        location : "A-Mountain",
        startTime: new Date("2017-07-21T15:00:00Z"),
        endTime: new Date("2017-07-21T18:00:00Z"),
        track: {
            "elevation": 34,
            "length": 13.2,
            "difficulty": "Beginner"
        },
        eventRiders: [],
        raceWinners: [],
        statusOfRace:"",
        startLocation:{
            lat:12.239,
            "lng":23.244
        },
        endLocation:{
            lat:23.344,
            lng:11.324
        }

}),

new Event({
        name : "Arizona Trekking",
        image : "https://s-media-cache-ak0.pinimg.com/originals/48/51/6a/48516a2b7d82b4755063e4c737d764b2.jpg",
        description : "Arizona Trekking at Downtown Phoenix",
        date: new Date("2018-07-21"),
        location : "DownTown San Jose",
        startTime: new Date("2018-07-21T09:00:00Z"),
        endTime: new Date("2018-07-21T01:00:00Z"),
        track: {
            "elevation": 34,
            "length": 13.2,
            "difficulty": "Hard"
        },
        eventRiders: [],
        raceWinners: [],
        statusOfRace:"",
        startLocation:{
            lat:12.239,
            "lng":23.244
        },
        endLocation:{
            lat:23.344,
            lng:11.324
        }

}),

new Event({
      name : "San Jose Marathon",
      image : "https://s-media-cache-ak0.pinimg.com/originals/48/51/6a/48516a2b7d82b4755063e4c737d764b2.jpg",
      description : "San Jose Downtown Marathon",
      date : new Date("2018-09-21"),
      location : "A-Mountain",
        startTime: new Date("2018-09-21T15:00:00Z"),
        endTime: new Date("2018-09-21T7:00:00Z"),
        track: {
            "elevation": 34,
            "length": 13.2,
            "difficulty": "Beginner"
        },
        eventRiders: [],
        raceWinners: [],
        statusOfRace:"",
        startLocation:{
            lat:12.239,
            "lng":23.244
        },
        endLocation:{
            lat:23.344,
            lng:11.324
        }

}),

new Event({
      name : "ASU Tempe Trekking",
      image : "https://fwmdocks.com/wp-content/uploads/2017/01/FWM-Rowing-807x356-1.jpg",
      description : "ASU Trekking at Arizona State University at A Mountain Tempe ASU Marathon San Jose Downtown Marathon",
      date : new Date("2017-12-21"),
      location : "DownTown San Jose",
        startTime: new Date("2017-12-21T15:00:00Z"),
        endTime: new Date("2017-12-21T18:00:00Z"),
        track: {
            "elevation": 34,
            "length": 13.2,
            "difficulty": "Intermediate"
        },
        eventRiders: [],
        raceWinners: [],
        statusOfRace:"",
        startLocation:{
            lat:12.239,
            "lng":23.244
        },
        endLocation:{
            lat:23.344,
            lng:11.324
        }

}),

new Event({
        name : "Mesa Marathon",
        image : "https://s-media-cache-ak0.pinimg.com/originals/48/51/6a/48516a2b7d82b4755063e4c737d764b2.jpg",
        description : "Mesa Downtown Marathon",
        date : new Date("2017-07-21"),
        location : "A-Mountain",
        startTime: new Date("2017-07-21T15:00:00Z"),
        endTime: new Date("2017-07-21T18:00:00Z"),
        track: {
            "elevation": 34,
            "length": 13.2,
            "difficulty": "Beginner"
        },
        eventRiders: [],
        raceWinners: [],
        statusOfRace:"",
        startLocation:{
            lat:12.239,
            "lng":23.244
        },
        endLocation:{
            lat:23.344,
            lng:11.324
        }

}),

new Event({
        name : "New York Trekking",
        image : "https://alhujjattravels.com/wp-content/uploads/2017/04/treking-1.jpg",
        description : "New York Winter Trek",
        date : new Date("2018-08-21"),
        location : "DownTown San Jose",
        startTime: new Date("2018-08-21T15:00:00Z"),
        endTime: new Date("2018-08-21T18:00:00Z"),
        track: {
            "elevation": 34,
            "length": 13.2,
            "difficulty": "Beginner"
        },
        eventRiders: [],
        raceWinners: [],
        statusOfRace:"",
        startLocation:{
            lat:12.239,
            "lng":23.244
        },
        endLocation:{
            lat:23.344,
            lng:11.324
        }

}),

new Event({
        name : "San Jose Marathon",
        image : "https://s-media-cache-ak0.pinimg.com/originals/48/51/6a/48516a2b7d82b4755063e4c737d764b2.jpg",
        description : "San Jose Downtown Marathon",
        date : new Date("2018-02-04"),
        location : "A-Mountain",
        startTime: new Date("2018-02-04T15:00:00Z"),
        endTime: new Date("2018-02-04T18:00:00Z"),
        track: {
            "elevation": 34,
            "length": 13.2,
            "difficulty": "Intermediate"
        },
        eventRiders: [],
        raceWinners: [],
        statusOfRace:"",
        startLocation:{
            lat:12.239,
            "lng":23.244
        },
        endLocation:{
            lat:23.344,
            lng:11.324
        }

}),

new Event({
       name : "Nevada Trekking",
       image : "https://s-media-cache-ak0.pinimg.com/originals/48/51/6a/48516a2b7d82b4755063e4c737d764b2.jpg",
       description : "Nevada Trek near Las Vegas",
       date : new Date("2018-12-21"),
       location : "DownTown San Jose",
        startTime: new Date("2018-02-04T15:00:00Z"),
        endTime: new Date("2018-02-04T18:00:00Z"),
        track: {
            "elevation": 34,
            "length": 13.2,
            "difficulty": "Beginner"
        },
        eventRiders: [],
        raceWinners: [],
        statusOfRace:"",
        startLocation:{
            lat:12.239,
            "lng":23.244
        },
        endLocation:{
            lat:23.344,
            lng:11.324
        }

}),

new Event({
       name : "San Jose Marathon",
       image : "http://thehotzoneusa.com/wp-content/uploads/2014/11/14803118587_20f2a571fc_o.jpg",
       description : "San Jose Downtown Marathon",
       date : new Date("2018-07-21"),
       location : "A-Mountain",
        startTime: new Date("2018-07-21T12:00:00Z"),
        endTime: new Date("2018-07-21T14:00:00Z"),
        track: {
            "elevation": 34,
            "length": 13.2,
            "difficulty": "Beginner"
        },
        eventRiders: [],
        raceWinners: [],
        statusOfRace:"",
        startLocation:{
            lat:12.239,
            "lng":23.244
        },
        endLocation:{
            lat:23.344,
            lng:11.324
        }

}),
new Event({
       name : "Seattle Marathon",
       image : "http://www.parcjeandrapeau.com/medias/images/header/marathon-et-demi-marathon-oasis-rock-n-roll-de-montreal.jpg",
       description : "Seattle Marathon Downtown Marathon Seattle Marathon Downtown Marathon Seattle Marathon Downtown Marathon Seattle Marathon Downtown Marathon ",
       date : new Date("2018-11-22"),
       location : "DownTown San Jose",
        startTime: new Date("2018-11-22T15:00:00Z"),
        endTime: new Date("2018-11-22T18:00:00Z"),
        track: {
            "elevation": 34,
            "length": 13.2,
            "difficulty": "Hard"
        },
        eventRiders: [],
        raceWinners: [],
        statusOfRace:"",
        startLocation:{
            lat:12.239,
            "lng":23.244
        },
        endLocation:{
            lat:23.344,
            lng:11.324
        }

}),
new Event({
        name : "Phoenix Marathon" ,
        image : "https://www.topfivebuzz.com/wp-content/uploads/2017/07/trekking-essentials.jpg",
        description : "Phoenix Downtown Marathon",
        date : new Date("2017-05-18"),
        location : "DownTown San Jose",
        startTime: new Date("2017-05-18T15:00:00Z"),
        endTime: new Date("2017-05-18T18:00:00Z"),
        track: {
            "elevation": 34,
            "length": 13.2,
            "difficulty": "Beginner"
        },
        eventRiders: [],
        raceWinners: [],
        statusOfRace:"",
        startLocation:{
            lat:12.239,
            "lng":23.244
        },
        endLocation:{
            lat:23.344,
            lng:11.324
        }

})

];

var seed_events = function(next){
    var done = 0;
    for(var i=0; i<events.length; i++){
        events[i].save(function(err,result) {
            done++;
            if(done === events.length){
                //exit();
                next(null,done);

            }
        });
    }

}

module.exports = {
    seed_events
}


// var done = 0;
// for(var i=0; i<events.length; i++){
//     events[i].save(function(err,result) {
//         done++;
//         if(done === events.length){
//             exit();
//         }
//     });
// }
//
// function exit() {
//     console.log("Disconnected from Mongodb");
//     mongoose.disconnect();
// }
