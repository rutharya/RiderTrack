var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ridertrackproject@gmail.com',
        pass: 'ridertrack5'
    }
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/send', function(req, res, next) {
    var mailOptions = {
        from: 'ridertrackproject@gmail.com',
        to: req.body.email,
        subject: 'Sending Email using Node.js',
        text: 'Welcome to Rider Track Event'
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    //res.render('index', { title: 'Rutuja' });
    res.send('Email Sent');
});
module.exports = router;
