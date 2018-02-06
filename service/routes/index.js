var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  // res.render('index', { title: 'Express' });
  res.render('index');
});

router.post('/', function (req, res, next) {
     // confirm that user typed same password twice
     if (req.body.password !== req.body.repeatPassword) {
         var err = new Error('Passwords do not match.');
         err.status = 400;
         res.send("passwords dont match");
         return next(err);
     }

     if (req.body.email &&
         req.body.firstName &&
         req.body.lastName &&
        req.body.password &&
         req.body.passwordConf) {

        var userData = {
             email: req.body.email,
             firstName: req.body.firstName,
             lastName: req.body.lastName,
             password: req.body.password,
             repeatPassword: req.body.repeatPassword,
         }

         User.create(userData, function (error, user) {
             if (error) {
                return next(error);
             } else {
                 req.session.userId = user._id;
                 return res.redirect('/dashboard');
             }
         });

     } else if (req.body.logemail && req.body.logpassword) {
         User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
             if (error || !user) {
                 var err = new Error('Wrong email or password.');
                 err.status = 401;
                 return next(err);
             } else {
                 req.session.userId = user._id;
                 return res.redirect('/dashboard');
             }
         });
     } else {
         var err = new Error('All fields required.');
         err.status = 400;
        return next(err);
     }
 })


router.get('/dashboard',function(req,res,next){
 res.render('dashboard');
     User.findById(req.session.userId)
         .exec(function (error, user) {
             if (error) {
                 return next(error);
             } else {
                 if (user === null) {
                     var err = new Error('Not authorized! Go back!');
                     err.status = 400;
                     return next(err);
                 } else {
                     return res.send('<h1>Name: </h1>' + user.firstName + user.lastName + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>')
                 }
             }
        });
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


router.get('/logout', function (req, res, next) {
    if (req.session) {
        // delete session object
        req.session.destroy(function (err) {
            if (err) {
                return next(err);
            } else {
                return res.redirect('/');
            }
        });
    }
});


module.exports = router;
