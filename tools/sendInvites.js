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

var riderTrackMailer = function(email,text){
  var mailOptions = {
      from: 'ridertrackproject@gmail.com',
      to: email,
      subject: text[0],
      html: text[1]
  };
  transporter.sendMail(mailOptions, function(error, info){
      if (error) {
          console.log(error);
      } else {
          console.log('Email sent: ' + info.response);
      }
  });
}

module.exports = riderTrackMailer;
