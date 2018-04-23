var User = require('../models/rider'); //mongoose data model.
var Event = require('../models/events');
var chalk = require('chalk');
var express = require('express');
var router = express.Router();
var passport = require('passport');
var auth = require('../config/auth');
var bodyParser = require('body-parser');
var mailer = require('../../tools/sendInvites');
var os = require("os");

//get the information about the current logged-in user.

/**
 * GET /users/ -> Get current Logged in User
 * @method GET
 * @requires JWT_authentication Token
 * @returns USER.toAuthJSON()
 */
router.get('/', auth.required, function (req, res, next) {
    console.log(chalk.green('Request Recieved: <GET> /USERS/:\n'));
    User.findById(req.payload.id).then(function (user) {
        if (!user) {
            return res.sendStatus(401);
        }
        return res.json({user: user.toAuthJSON()});
    }).catch(next);
});


/**
 * GET /users/username/:riderId -> get the username for the riderID
 * @method GET
 * @returns UserName for the userID. 
 */
router.get('/username/:riderId',function(req,res,next){
    console.log(req.params.riderId);
    User.findOne({_id:req.params.riderId}).then(function(rider){
        if(!rider) res.status(404).json({result:false,status: { msg: "rider not found"}});
        res.send(rider);
    }).catch(next);
})

/**
 * PUT /users/ -> update user profile data
 * @method PUT
 * @requires JWT_authentication TOKEN
 * @returns USER.toAuthJSON
 */
//update profile information of the user.
router.put('/', auth.required, function (req, res, next) {
    console.log(chalk.green('Request Recieved: <PUT> /USERS/:\n'));
    console.log(chalk.yellow('Body: ', JSON.stringify(req.body)));
    User.findById(req.payload.id).then(function (user) {
        if (!user) {
            return res.sendStatus(401);
        }
        // only update fields that were actually passed...
        //username shouldnt be passed??
        if ((typeof req.body.username !== 'undefined') && (!(req.body.username === ''))) {
            user.username = req.body.username;
        }
        if ((typeof req.body.firstName !== 'undefined') && (!(req.body.firstName === ''))) {
                user.firstName = req.body.firstName;
        }
        if ((typeof req.body.lastName !== 'undefined') && (!(req.body.lastName === ''))) {
            user.lastName = req.body.lastName;
        }
        if ((typeof req.body.email !== 'undefined') && (!(req.body.email === ''))) {
            user.email = req.body.email;
        }
        if ((typeof req.body.height !== 'undefined') && (!(req.body.height === ''))) {
            user.height = req.body.height;
        }
        if ((typeof req.body.weight !== 'undefined') && (!(req.body.weight === ''))) {
            user.weight = req.body.weight;
        }
        if ((typeof req.body.gender !== 'undefined') && (!(req.body.gender === ''))) {
            user.gender = req.body.gender;
        }
        if ((typeof req.body.bio !== 'undefined') && (!(req.body.bio === ''))) {
            user.bio = req.body.bio;
        }
        if ((typeof req.body.phoneNo !== 'undefined') && (!(req.body.phoneNo === ''))) {
            user.phoneNo = req.body.phoneNo;
        }
        if ((typeof req.body.address !== 'undefined') && (!(req.body.address === ''))) {
            user.address = req.body.address;
        }
        if ((typeof req.body.image !== 'undefined') && (!(req.body.image === ''))) {
            user.image = req.body.image;
        }
        console.log('user ??');
        console.log(user);
        return user.save().then(function () {
            return res.json({user: user.toAuthJSON()});
        });
    }).catch(next);
});

/**
 * POST /users/ -> create a new user.
 * @method POST
 * @param username required as req.body.username
 * @param password required as req.body.password
 * @returns USER.toAuthJSON()
 */
router.post('/', function (req, res, next) {
    console.log(chalk.green('Request Recieved: <POST> /USERS:\n'));
    console.log(chalk.yellow('Body: ', JSON.stringify(req.body)));
    if (!req.body.username || req.body.username === '') {
        return res.status(422).json({result: false, status: {msg: 'username is missing'}});
    }
    if (!req.body.email || req.body.email === '') {
        return res.status(422).json({result: false, status: {msg: 'email is missing'}});
    }
    if (!req.body.password || req.body.password === '') {
        return res.status(422).json({result: false, status: {msg: 'password is missing'}});
    }
    var user = new User();
    user.username = req.body.username;
    user.email = req.body.email;
    //set admin as true only if the data is set.
    user.admin = false;
    if(typeof req.body.admin !== 'undefined' && req.body.admin !== '' )
    {
       //if admin value in post body is set, this value gets updated. 
      user.admin = req.body.admin;
   }
   //calling mongoose setPassword method -> generates salt and hashes the pwd and stores in db.
    user.setPassword(req.body.password);
    // TODO: (ruthar) check the response (do we really need to send back so much info about user from just login?)
    user.save().then(function () {
        return res.json({
            user: user.toAuthJSON()
        });
    }).catch(next);
});

/**
 * POST /users/login -> login existing user
 * @method POST
 * @param username required as req.body.username
 * @param email required as req.body.email
 * @param password required as req.body.password
 * @returns USER.toAuthJSON()
 */
router.post('/login', function (req, res, next) {
    console.log(chalk.green('Login Request Recieved: <POST> /USERS/LOGIN:'));
    console.log(chalk.yellow('Body: ', JSON.stringify(req.body)));
    if (!req.body.email) {
        return res.status(422).json({result: false, status: {msg: 'email is missing'}});
    }
    if (!req.body.password) {
        return res.status(422).json({result: false, status: {msg: 'password is missing'}});
    }
    passport.authenticate('local', {session: false}, function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) return res.status(422).json({result: false, status: {msg: 'username/password mismatch.'}});
        if (user) {
            user.token = user.generateJWT();
            return res.json({user: user.toAuthJSON()});
        } else {
            //TODO: (ruthar) not sure if this line of code ever runs??
            return res.status(422).json({result: false, status: {msg: 'username/password mismatch.'}});
        }
    })(req, res, next);
});

/**
 * POST /users/forgotpwd -> 
 * @method POST
 * @param password required as req.body.password
 * @returns json if mail is sent or not.
 */
router.post('/forgotpwd', function (req, res, next) {
    console.log(chalk.green('Forgot Password Request Recieved: <POST> /USERS/forgotpwd:'));
    console.log(chalk.yellow('Body: ', JSON.stringify(req.body)));
    console.log(req.body);
    //TODO: do we addd email validators here?
    if (!req.body.email || req.body.email === '' || req.body.email=== ' ') {
        return res.status(422).json({result: false, status: {msg: 'email is missing'}});
    }
    User.findOne({email: req.body.email}, function (err, user) {
        if (err) {
            return res.status(422).json({result: false, status: {msg: 'user with that email not found!!'}, err: err});
        }
        if (!user) {
            return res.status(422).json({result: false,status: {msg: 'user with that email not found!!'}});
        }
        //found user
        user.resetPasswordToken = user.generateJWT();
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    
        user.save(function (err) {
            //TODO: replce the json response with a valid html response or a mailer?
            return res.json({
                result: true,
                status: { msg: "user password resent token written to db"}, 
                data: user.resetPasswordToken
            });
        });
        // var data = ['User Password Reset Mail',`
        // <html>
        // <head>
        // <title>User Password Reset Mail</title>
        // </head>
        // <body>
        // <h3>Hello ${user.username},</h3>
        // <p>Use this Link below to reset your password : your link will be active for <em>1 hour</em>.</p>
        // <p style="color:blue">${process.env.HOST}/api/users/${user.resetPasswordToken}</p>
        // <br/>
        // <p style="color:red">This is an automatically generated mail from Ridertrack. Please ignore if you have not opted to reset your password</p>
        // </body>
        // </html>`];
        console.log(chalk.blue(data));
        mailer(user.email, data);
        console.log(chalk.yellow('EMAIL SENT to user.'));
        // console.log('GO TO : ' + process.env.HOST + '/users/' + user.resetPasswordToken);
    });
})

/**
 * GET /users/:TOKEN -> Dynamic route to reset password
 * @method GET
 * @returns USER.toAuthJSON()
 */
router.get('/:token', function (req, res) {
    console.log(chalk.green('Navigated from Mail to Dynamic route: <GET> /USERS/<<TOKEN>>'));
    console.log(chalk.yellow('Body: ', JSON.stringify(req.body)));
    User.findOne({resetPasswordToken: req.params.token, resetPasswordExpires: {$gt: Date.now()}}, function (err, user) {
        if (!user) {
            return res.status(422).json({result:false,status: {msg: "user not found"}});
        }
        //found --
        console.log('user successfully found -> render the proper form to reset password');
        // return res.json({result: "OK", status:{msg:"can post to this route to change password."}});
        return res.render('reset_pwd', {user: user});
    });
});

/**
 * POST /users/:TOKEN -> Dynamic route to accept Form data and reset password
 * @method POST
 * @param password required as req.body.password
 * @returns json if password is reset. 
 */
router.post('/:token', function (req, res) {
    console.log(chalk.green('Password Reset Data sent to Dynamic route: <POST> /USERS/<<TOKEN>>'));
    console.log(chalk.yellow('Body: ', JSON.stringify(req.body)));
    User.findOne({resetPasswordToken: req.params.token, resetPasswordExpires: {$gt: Date.now()}}, function (err, user) {
        if (!user) {
            return res.status(422).json({errors: {user: "user not found"}});
        }
        user.setPassword(req.body.password);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        user.save(function (err) {
            // TODO: (ruthar) TRY Disable express error routing and make it return angular code)
            res.redirect(200,'/login');
            //this is a temporary fix for now. 
            //option 2 - > let ejs trigger the toastr and then redirect to angular. 
            //option 3 -> redirect to /login and let angular take care of the rest when the express server is configured.
            // return res.json({result: true, status: {msg: "user password written to db"}})
        });
    });
});




module.exports = router;
