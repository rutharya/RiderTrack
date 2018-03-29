var mocha = require('mocha');
var assert = require('assert');
var Event = require('../models/events');

describe('Creating event', function () {
    it('Save Event to MongoDB', function () {
        // var user = new User({
        //     name : 'Juma Allan'
        // });
        var date = new Date('2018-02-25T00:00:00.000Z');
        var startTime = new Date('2018-02-25T05:00:00.000Z');
        var endTime = new Date('2018-02-25T05:00:00.0000Z');
        var event = new Event({
                name: 'ASU Tempe Trekking',
                image: 'https://s-media-cache-ak0.pinimg.com/originals/48/51/6a/48516a2b7d82b4755063e4c737d764b2.jpg',
                description: 'ASU Trekking at Arizona State University at A Mountain Tempe ASU',
                date: date,
                location: 'A-Mountain',
                startTime: startTime,
                endTime: endTime,
                trackFile: 'https://abc123.gpx',
                track: {
                    elevation: 34,
                    length: 13.2,
                    difficulty: 'Beginner'
                },
                eventRiders: [],
                raceWinners: [],
                statusOfRace:'',
                startLocation:{
                    lat:12.239,
                    lng:23.244
                },
                endLocation:{
                    lat:23.344,
                    lng:11.324
                }
            });
        event.save().then(function (done) {

            assert(event.isNew === false);
            done(null,event);

        });
    });
});