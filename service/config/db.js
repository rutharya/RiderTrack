// Bring Mongoose into the app
var mongoose = require( 'mongoose' );

// Build the connection string
var dbURI = 'mongodb://localhost/ridertrack';

// Create the database connection
mongoose.connect(dbURI);

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + dbURI);
});

// If the connection throws an error
//TODO: logger
mongoose.connection.on('error',function (err) {
  console.log('Mongoose default connection error: ' + err);
});

// log when connection is disconnected
//TODO: log data using a logger - save it in persistent storage
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});

// close connection if node process terminates
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  }); 
});
