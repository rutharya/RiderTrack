var chai = require('chai');
var chaiHttp = require('chai-http');
var mocha = require('mocha');
var Event = require('../models/events');
var server = require('../app');
var should = chai.should();

chai.use(chaiHttp);


var date1       = new Date('2018-04-25T00:00:00.000Z');
var startTime   = new Date('2018-04-25T05:00:00.000Z');
var endTime     = new Date('2018-04-26T05:00:00.000Z');

var event = new Event({
    name: 'Seattle Area111',
    image: 'https://s-media-cache-ak0.pinimg.com/originals/48/51/6a/48516a2b7d82b4755063e4c737d764b2.jpg',
    description: 'ASU Trekking at Arizona State University at A Mountain Tempe ASU',
    date: date1,
    location: 'A-Mountain',
    startTime: startTime,
    endTime: endTime,
    trackFile: 'https://abc123.gpx',
    track: {
        elevation: 40,
        length: 12.2,
        difficulty: 'Beginner'
    },
    eventRiders: [],
    raceWinners: [],
    statusOfRace:'',
    startLocation: {
        lat:12.239,
        long:23.244
    },
    endLocation: {
        lat:23.344,
        long:11.324
    }
});


describe('Events', function() {
    beforeEach(function (done) {
        Event.remove({}, function (err) {
            done();
        });
    });
});


describe('/GET events', function () {
    it('Gets all the events', function (done) {

        chai.request(server)
            .get('/events/')
            .end(function (err,res) {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.not.be.eql(0);
                // console.log(res);
                done();
            });

    });
});

describe('/save events', function () {
    it('Save event to database', function (done) {

        chai.request(server)
            .post('/events/save')
            .send(event)
            .end(function (err,res) {
                res.should.have.status(200);
                res.body.should.be.a('object');
                //res.body.event.should.have.property('date');
                //  console.log(res);
                done();
            });

    });
});

describe('/eventId events', function () {
    it('Get event with that id from the database', function (done) {

        event.save(function (err,event) {
            chai.request(server)
                .get('/events/'+ event.id)
                .send(event)
                .end(function(err,res){
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id').eql(event.id);
                    done();
                });
        });
    });
});


describe('/events/register events', function () {
    it('Register event', function (done) {

        event.save(function (err,event) {
            chai.request(server)
                .get('/events/register'+ event.id).
            send(event)
                .end(function(err,res){

                    done();
                });
        });
    });
});
