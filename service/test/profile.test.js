var chai = require('chai');
var chaiHttp = require('chai-http');
var mocha = require('mocha');
var Profile = require('../models/rider');
var server = require('../app');
var should = chai.should();

chai.use(chaiHttp);

describe('Profile', function() {
    beforeEach(function (done) {
        Profile.remove({}, function (err) {
            done();
        });
    });
});

describe('/GET profile', function () {
    it('Gets all the profiles', function (done) {

        chai.request(server)
            .get('/username/')
            .end(function (err,res,) {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.not.be.eql(0);
                // console.log(res);
                done();
            });
    });
});


