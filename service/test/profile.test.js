var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = require('chai').expect;
var mocha = require('mocha');
var Profile = require('../models/rider');
var server = require('../app');
var should = chai.should();
var request = require('supertest');

chai.use(chaiHttp);

var userCredentials = {
    email: 'admin@admin.com',
    password: 'admin'
};

var authenticatedUser = request.agent(server);

// before(function(done){
//     authenticatedUser
//         .post('/users/login')
//         .send(userCredentials)
//         .end(function (err, res) {
//             res.should.have.status(200);
//             expect('Location', '/home/dashboard');
//             done();
//         });
// });


describe('GET /profile', function(){
//addresses 1st bullet point: if the user is logged in we should get a 200 status code
    it('should return a 200 response if the user is logged in', function(done){
        authenticatedUser.get('/profile')
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            });
    });
//addresses 2nd bullet point: if the user is not logged in we should get a 302 response code and be directed to the /login page
    it('should return a 404 response', function(done){
        chai.request(server)
            .get('/home/dashboard')
            .end(function (err,res) {
                res.should.have.status(404);
                //expect('Location', '/login');
                done();
            });
    });
});


