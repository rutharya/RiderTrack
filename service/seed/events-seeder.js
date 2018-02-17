var Product = require('/Users/pranjali/Desktop/Event_push/RiderTrack/service/models/events.js');

var mongoose = require('mongoose');

mongoose.connect('localhost:27017/ridertrack');
console.log("Connected to MongoDb database");

var events = [
    new Event({
        name : "ASU Tempe Trekking", 
        image : "https://s-media-cache-ak0.pinimg.com/originals/48/51/6a/48516a2b7d82b4755063e4c737d764b2.jpg", 
        description : "ASU Trekking at Arizona State University at A Mountain Tempe ASU", 
        date : "02-10-2017", 
        location : "A-Mountain", 
        time : "03:00 pm - 06:00 pm"
    }),
    
    new Event({
        name : "San Jose Marathon", 
        image : "http://www.parcjeandrapeau.com/medias/images/header/marathon-et-demi-marathon-oasis-rock-n-roll-de-montreal.jpg", 
        description : "San Jose Downtown Marathon", 
        date : "10-21-2017", 
        location : "DownTown San Jose", 
        time : "09:00 am - 01:00 pm"
    }),

new Event({
        name : "Oregon Rowing", 
        image : "https://fwmdocks.com/wp-content/uploads/2017/01/FWM-Rowing-807x356-1.jpg", 
        description : "San Jose Downtown MarathonSan Jose Downtown Marathon San Jose Downtown Marathon", 
        date : "03-21-2018", 
        location : "DownTown San Jose", 
        time : "05:00 pm - 07:00 pm"
    }),
new Event({
        name : "San Jose Marathon", 
        image : "https://s-media-cache-ak0.pinimg.com/originals/48/51/6a/48516a2b7d82b4755063e4c737d764b2.jpg", 
        description : "San Jose Downtown Marathon", 
        date : "12-21-2018", 
        location : "A-Mountain", 
        time : "03:00 pm - 06:00 pm"
    }),
new Event({
        name : "Seattle Marathon", 
        image : "http://www.parcjeandrapeau.com/medias/images/header/marathon-et-demi-marathon-oasis-rock-n-roll-de-montreal.jpg", 
        description : "Seattle Downtown Marathon Seattle Downtown Marathon", 
        date : "03-21-2017", 
        location : "DownTown San Jose", 
        time : "02:00 pm - 05:00 pm"
    }),

new Event({
        name : "San Jose Marathon", 
        image : "https://s-media-cache-ak0.pinimg.com/originals/48/51/6a/48516a2b7d82b4755063e4c737d764b2.jpg",
        description : "San Jose Downtown Marathon", 
        date : "12-21-2018", 
        location : "A-Mountain", 
        time : "03:00 pm - 06:00 pm"
    }),

new Event({
        name : "San Jose Trekking", 
        image : "https://alhujjattravels.com/wp-content/uploads/2017/04/treking-1.jpg", 
        description : "San Jose Downtown Marathon", 
        date : "12-21-2018", 
        location : "A-Mountain", 
        time : "03:00 pm - 06:00 pm"
    }),

new Event({
        name : "San Jose Marathon", 
        image : "http://thehotzoneusa.com/wp-content/uploads/2014/11/14803118587_20f2a571fc_o.jpg", 
        description : "California Trekking at California State University at abcd Mountain San Jose California Trekking at California State University at abcd Mountain San Jose", 
        date : "12-21-2018", 
        location : "DownTown San Jose", 
        time : "07:00 am - 11:00 am"
    }),

new Event({
        name : "San Jose Marathon", 
        image : "https://s-media-cache-ak0.pinimg.com/originals/48/51/6a/48516a2b7d82b4755063e4c737d764b2.jpg", 
        description : "San Jose Downtown Marathon", 
        date : "12-21-2018", 
        location : "A-Mountain", 
        time : "03:00 pm - 06:00 pm"
    }),

new Event({
       name : "ASU Tempe Trekking", 
       image : "https://s-media-cache-ak0.pinimg.com/originals/48/51/6a/48516a2b7d82b4755063e4c737d764b2.jpg", 
       description : "ASU Trekking at Arizona State University at A Mountain Tempe ASUASU Trekking at Arizona State University at A Mountain Tempe ASUASU Trekking at Arizona State University at A Mountain Tempe ASU", 
       date : "12-21-2018",
       location : "DownTown San Jose", 
       time : "03:00 pm - 06:00 pm" 
    }),

new Event({
      name : "San Jose Marathon", 
      image : "https://s-media-cache-ak0.pinimg.com/originals/48/51/6a/48516a2b7d82b4755063e4c737d764b2.jpg", 
      escription : "San Jose Downtown Marathon", 
      date : "12-21-2018", 
      location : "A-Mountain", 
      time : "03:00 pm - 06:00 pm"  
    }),

new Event({
       name : "Sacramento Marathon", 
       image : "http://www.parcjeandrapeau.com/medias/images/header/marathon-et-demi-marathon-oasis-rock-n-roll-de-montreal.jpg", 
       description : "San Jose Downtown Marathon San Jose Downtown Marathon San Jose Downtown Marathon", 
       date : "12-21-2018", 
       location : "DownTown San Jose", 
       time : "03:00 pm - 06:00 pm" 
    }),

new Event({
        name : "Indore Marathon", image : "http://thehotzoneusa.com/wp-content/uploads/2014/11/14803118587_20f2a571fc_o.jpg", 
        description : "Indore India Marathon", 
        date : "12-21-2018", 
        location : "Vijay Nagar", 
        time : "03:00 pm - 06:00 pm"
    }),

new Event({
        name : "Phoenix Rowing", 
        image : "https://fwmdocks.com/wp-content/uploads/2017/01/FWM-Rowing-807x356-1.jpg", 
        description : "San Jose Downtown Marathon", 
        date : "12-21-2017", 
        location : "A-Mountain", 
        time : "03:00 pm - 06:00 pm"
    }),

new Event({
        name : "Arizona Trekking",
        image : "https://s-media-cache-ak0.pinimg.com/originals/48/51/6a/48516a2b7d82b4755063e4c737d764b2.jpg", 
        description : "San Jose Downtown Marathon San Jose Downtown Marathon San Jose Downtown Marathon San Jose Downtown Marathon San Jose Downtown Marathon San Jose Downtown Marathon", 
        date : "12-21-2017", 
        location : "DownTown San Jose", 
        time : "03:00 pm - 06:00 pm"
    }),

new Event({
      name : "San Jose Marathon", 
      image : "https://s-media-cache-ak0.pinimg.com/originals/48/51/6a/48516a2b7d82b4755063e4c737d764b2.jpg", 
      escription : "San Jose Downtown Marathon", 
      date : "12-21-2017", 
      location : "A-Mountain", 
      time : "03:00 pm - 06:00 pm"  
    }),

new Event({
      name : "ASU Tempe Trekking", 
      image : "https://fwmdocks.com/wp-content/uploads/2017/01/FWM-Rowing-807x356-1.jpg", 
      description : "ASU Trekking at Arizona State University at A Mountain Tempe ASU Marathon San Jose Downtown Marathon", 
      date : "12-21-2017", 
      location : "DownTown San Jose", 
      time : "03:00 pm - 06:00 pm"  
    }),

new Event({
        name : "San Jose Marathon", 
        image : "https://s-media-cache-ak0.pinimg.com/originals/48/51/6a/48516a2b7d82b4755063e4c737d764b2.jpg", 
        description : "San Jose Downtown Marathon", 
        date : "12-21-2017", 
        location : "A-Mountain", 
        time : "03:00 pm - 06:00 pm"
    }),

new Event({
        name : "ASU Tempe Trekking", 
        image : "https://alhujjattravels.com/wp-content/uploads/2017/04/treking-1.jpg", 
        description : "San Jose Downtown Marathon San Jose Downtown Marathon San Jose Downtown Marathon San Jose Downtown Marathon San Jose Downtown Marathon San Jose Downtown Marathon", 
        date : "12-21-2017", 
        location : "DownTown San Jose", 
        time : "03:00 pm - 06:00 pm"
    }),

new Event({
        name : "San Jose Marathon", 
        image : "https://s-media-cache-ak0.pinimg.com/originals/48/51/6a/48516a2b7d82b4755063e4c737d764b2.jpg", 
        description : "San Jose Downtown Marathon", 
        date : "12-21-2017", 
        location : "A-Mountain", 
        time : "03:00 pm - 06:00 pm"
    }),

new Event({
       name : "San Jose Marathon", 
       image : "https://s-media-cache-ak0.pinimg.com/originals/48/51/6a/48516a2b7d82b4755063e4c737d764b2.jpg", 
       description : "San Jose Downtown Marathon San Jose Downtown Marathon San Jose Downtown Marathon San Jose Downtown Marathon San Jose Downtown Marathon", 
       date : "12-21-2017", 
       location : "DownTown San Jose", 
       time : "03:00 pm - 06:00 pm" 
    }),

new Event({
       name : "San Jose Marathon", 
       image : "http://thehotzoneusa.com/wp-content/uploads/2014/11/14803118587_20f2a571fc_o.jpg", 
       description : "San Jose Downtown Marathon", 
       date : "12-21-2017", 
       location : "A-Mountain", 
       time : "03:00 pm - 06:00 pm" 
    }),
new Event({
       name : "Seattle Marathon", 
       image : "http://www.parcjeandrapeau.com/medias/images/header/marathon-et-demi-marathon-oasis-rock-n-roll-de-montreal.jpg", 
       description : "San Jose Downtown Marathon San Jose Downtown Marathon San Jose Downtown Marathon San Jose Downtown Marathon ", 
       date : "12-21-2017", 
       location : "DownTown San Jose", 
       time : "03:00 pm - 06:00 pm"
    }),
new Event({
        name : "San Jose Marathon" , 
        image : "https://s-media-cache-ak0.pinimg.com/originals/48/51/6a/48516a2b7d82b4755063e4c737d764b2.jpg", 
        description : "San Jose Downtown Marathon", 
        date : "12-21-2018", 
        location : "DownTown San Jose", 
        time : "03:00 pm - 06:00 pm" 
    })

];

var done = 0;
for(var i=0; i<events.length; i++){
    events[i].save(function(err,result) {
        done++;
        if(done === events.length){
            exit();
        }
    });
}

function exit() {
    console.log("Disconnected from Mongodb");
    mongoose.disconnect();
}
