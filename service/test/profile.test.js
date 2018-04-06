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
    email: 'a@gmail.com',
    password: 'superdragon'
}

var authenticatedUser = request.agent(server);

describe('Login function testing', function () {
   it('Sees if credential is valid',function (done) {
        authenticatedUser
            .post('/users/login')
            .send(userCredentials)
            .end(function (err, res) {
                res.should.have.status(200);
                expect('Location', '/home/dashboard');
                done();
            });
    });
});


