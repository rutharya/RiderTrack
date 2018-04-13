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
    email: 'admin@admin.com ',
    password: 'admin'
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
        elevation: 34,
        length: 13.2,
        difficulty: "Beginner"
    },
    eventRiders: [],
    raceWinners: [],
    statusOfRace:"",
    startLocation:{
        lat:12.239,
        long:23.244
    },
    endLocation:{
        lat:23.344,
        long:11.324
    }

});


// describe('Events', function() {
//     before(function (done) {
//         Event.remove({}, function (err) {
//             done();
//         });
//     });
// });



describe('/GET events', function () {
    it('Gets all the events', function (done) {

        chai.request(server)
            .get('/events/')
            .end(function (err,res) {
                res.should.have.status(200);
                res.body.should.be.a('array');
                console.log("length is " + res.body.length);
               // res.body.length.should.not.be.eql(0);
                done();
            });

    });
});
//
// describe('/save events', function () {
//     it('Save event to database', function (done) {
//
//         chai.request(server)
//             .post('/events/save')
//             .send(event)
//             .end(function (err,res) {
//                     console.log("result in test is");
//                     console.log(res);
//                     res.should.have.status(200);
//                     res.body.should.be.a('object');
//                     done();
//             });
//
//     });
// });

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

// describe('login, create new event and register for event', function () {
//
//     it('Logging in, creating new event and registering event test - should give successful' +
//         ' registration message', function (done) {
//
//         authenticatedUser
//             .post('/users/login')
//             .send(userCredentials)
//             .end(function (err, res) {
//
//                 var token = res.body.user.token;
//
//
//                 chai.request(server)
//                     .post('/events/save')
//                     .send(event)
//                     .end(function (err,res) {
//                         console.log("event id is"+ res.body['Saved Event ID']);
//                         chai.request(server)
//                             .post('/events/register')
//                             .set('Content-Type','application/x-www-form-urlencoded')
//                             .set('Authorization','Bearer '+token)
//                             .send({eventId: res.body['Saved Event ID']})
//                             .end(function(err,res){
//                                 res.should.have.status(200);
//                                 res.body.status.msg.should.be.eql('Successfully registered to event2');
//                             });
//                     });
//             });
//         done();
//     });
//
//
// });
//
describe('login, go to /events and register for 1 event', function () {

    it('Logging in, creating new event and registering event test - ' +
        'should give already registered status', function (done) {

        authenticatedUser
            .post('/users/login')
            .send(userCredentials)
            .end(function (err, res) {

                var event_id = '';
                var token = res.body.user.token;
                console.log("token is " + token);

                chai.request(server)
                    .get('/events/')
                    .end(function (err, res) {
                        event_id = res.body[0]._id;
                        chai.request(server)
                            .post('/events/register')
                            .set('Content-Type','application/x-www-form-urlencoded')
                            .set('Authorization','Bearer '+token)
                            .send({eventId:event_id})
                            .end(function(err,res){
                                res.should.have.status(200);
                                res.body.status.msg.should.be.eql('already registered to event!!');
                            });
                    });

            });
        done();
    });


});

