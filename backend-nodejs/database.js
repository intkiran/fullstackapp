// Bring Mongoose into the app
var mongoose = require("mongoose");
path = require("path");
const express = require("express");

// Build the connection string
var dbURI = "mongodb://localhost:27017/products";

// Create the database connection
//see: http://stackoverflow.com/a/26164828
var connectionWithRetry = () => {
  return mongoose.connect(dbURI, error => {
    if (error) {
      console.error(
        "Failed to connect to mongo on startup - retrying in 5 sec",
        error
      );
      if (
        mongoose.connection.readyState != 1 &&
        mongoose.connection.readyState != 2
      ) {
        setTimeout(connectionWithRetry, 5000);
      }
    }
  });
};
connectionWithRetry();
// CONNECTION EVENTS
// When successfully opened
mongoose.connection.on("open", function(callback) {
  console.log("Mongoose default connection open to " + dbURI);
});

// When successfully connected
mongoose.connection.on("connected", function() {
  console.log("Mongoose default connection connected to " + dbURI);
});

// When successfully reconnected
mongoose.connection.on("reconnected", function() {
  console.log("Mongoose default connection reconnected!");
});

// If the connection throws an error
mongoose.connection.on("error", function(err) {
  console.log("Mongoose default connection error: " + err);
  mongoose.connection.readyState = 0; // force...
});

// When the connection is disconnected
mongoose.connection.on("disconnected", function() {
  console.log("Mongoose default connection disconnected");
  mongoose.connection.readyState = 0; // force...
});

// any other clean ups
mongoose.connection.on("close", function() {
  console.log("Mongoose default connection closed");
});

// If the Node process ends, close the Mongoose connection
process.on("SIGINT", function() {
  mongoose.connection.close(function() {
    console.log(
      "Mongoose default connection disconnected through app termination"
    );
    process.exit(0);
  });
});

module.exports = mongoose;
