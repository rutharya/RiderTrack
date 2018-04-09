var chai = require('chai');
var chaiHttp = require('chai-http');
var mocha = require('mocha');
var Event = require('../models/events');
var server = require('../app');
var should = chai.should();
var request = require('supertest');
var expect = require('chai').expect;

chai.use(chaiHttp);

var userCredentials = {
    email: 'a@gmail.com',
    password: 'superdragon'
};

var authenticatedUser = request.agent(server);


var event =new Event({
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

});


describe('Events', function() {
    beforeEach(function (done) {
        Event.remove({}, function (err) {
            done();
        });

        authenticatedUser
            .post('/users/login')
            .send(userCredentials)
            .end(function (err, res) {
                res.should.have.status(200);
                //console.log(res);
                expect('Location', '/home/dashboard');
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

describe('login, go to /events, register for event - check status', function () {


    describe('Login ', function () {
        it('Logging in for register event test', function (done) {

            authenticatedUser
                .post('/users/login')
                .send(userCredentials)
                .end(function (err, res) {

                    var event_id = '';
                    var token = res.body.user.token;
                    console.log('token is '+token);
                    chai.request(server)
                        .get('/events/')
                        .end(function (err, res) {
                            event_id = res.body[0]._id;
                        });


                    chai.request(server)
                        .post('/events/register')
                        .send({eventId:event_id})
                        .set('Authorization','Bearer'+token)
                        .set('Content-Type','application/x-www-form-urlencoded')
                        .end(function(err,res){
                          //  res.should.have.status(200);
                        });
                });
            done();
        });
    });


});
