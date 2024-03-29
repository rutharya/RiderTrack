var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var chalk = require('chalk');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var cors = require('cors');
var routes = require('./routes')
var index = require('./routes/index');
var test = require('./routes/test'); //test route -> testing protected resources
var savemyloc = require('./routes/savemyloc');
var events = require('./routes/events');

var passport = require('passport');
require('./config/passport');
require('./db/db');
var app = express();
app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
const port = process.env.PORT || 3000;

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//app.use(cookieParser());
app.use(express.static(__dirname + '/dist'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('express-session')({ secret: 'ridertrackapp', resave: true, saveUninitialized: true }));

// bug fix for issue 14
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, HEAD, OPTIONS");
  next();
});


app.use(passport.initialize());
app.use(passport.session());
app.use('/', express.static('./dist',{redirect: false}));
app.use('/api',index);
app.use('/test',test);
// app.use('/tracking',savemyloc);
// app.use('/users', users);

app.get('*', function (req, res, next) {
  res.sendFile(path.resolve('./service/dist/index.html'));
});


//ruthar: this code is commented out since we are handling errors form the service via the error handler below,
//and serving /index.html or error routes from angular.
//ruthar: Please dont remove the commented out lines as this can be used as reference. 
// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// error handler
app.use(function(err, req, res, next) {
  console.log(req.body);
  console.log(chalk.red('error handler in app.js called'));
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
  res.status(err.status || 500);
  res.send({result:false,status: {msg: err}});
});


module.exports = app;
