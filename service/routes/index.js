var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  // res.render('index', { title: 'Express' });
  res.render('index');
});

router.get('/dashboard',function(req,res,next){
  res.render('dashboard');
})

router.get('/tracking',function(req,res,next){
  res.render('tracking');
})

router.get('/profile',function(req,res,next){
  res.render('profile', {title: 'My Profile'});
})

router.get('/credentials',function(req,res,next){
    res.render('credentials', {title: 'My Credentials'});
})

router.get('/events',function(req,res,next){
  res.render('events');
})

router.get('/login',function(req,res,next){
    res.render('login');
})

module.exports = router;
