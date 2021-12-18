'use strict'

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const config = require('../config');
const db = require('../db');

if(process.env.NODE_ENV === 'production'){
  // Initialize session with setting for production
  module.exports = session({
    secret: config.sessionSecret,
    resave: false,
    saveUnitialialized: false,
    store: new MongoStore({
      mongooseConnection: db.Mongoose.connection
    })
  })
}else{
  // Initialize session with setting for development
  module.exports = session({
    secret: config.sessionSecret,
    resave: false,
    saveUnitialialized: true
  })
}
