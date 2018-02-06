//TODO: move mongodb configuration to config file - appconfig.js
const assert = require('assert');
const MongoClient = require('mongodb').MongoClient;
const test = require('assert');
// Connection url
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'ridertrack';

var checkConnection = function() {
  // Use connect method to connect to the server
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    console.log("Connected successfully to mongodb server");
    console.log('db - ', db.s.databaseName);
    client.close();
  });
}

var insertUsers = function(db, callback) {
  var newUsers = [{
    email: "admin@ridertrack.com",
    username: "admin",
    firstName: "admin",
    lastName: "admin",
    password: "admin",
    repeatPassword: "admin"
  }, {
    email: "user@ridertrack.com",
    username: "user",
    firstName: "fname",
    lastName: "lname",
    password: "pwd",
    repeatPassword: "pwd"
  }]

  // Get the users collection
  const collection = db.collection('users');
  // Insert some users
  collection.insertMany(newUsers, function(err, result) {
    assert.equal(err, null);
    assert.equal(2, result.result.n); //2 records were inserted
    console.log("Inserted 2 users into the collection");
    callback(result);
  });
}

function insertMockData() {
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    insertUsers(db, function() {
      client.close();
    });
    //insert into other collections here.
    // insertUsers(db, function() {
    //   client.close();
    // });
  });
}

//TODO: export this module to be used by other routes
insertMockData();
