'use strict'
const config = require('../config');
const Mongoose = require('mongoose').connect(config.dbURI,{ useNewUrlParser: true, useUnifiedTopology: true }, () => console.log(" Mongoose is connected to MongoDB..."));
// const Mongoose = require('mongoose').connect(config.dbURI);

// Log an error is the connection fails
Mongoose.connection.on('error', error => {
  console.log("MongoDB Error: ", error);
});

// create a schema that defines the structure for storing data
const chatUser = new Mongoose.Schema({
  profileId: String,
  fullName: String,
  profilePic: String
})

// turn the schema into a useable model
let userModel = Mongoose.model('chatUser', chatUser);

module.exports = {
  Mongoose,
  userModel
}
