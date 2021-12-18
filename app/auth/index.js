'use strict'

const passport = require('passport');
const config = require('../config');
const FacebookStrategy = require('passport-facebook').Strategy;
const h = require('../helpers')

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id)
  });

  passport.deserializeUser((id, done) => {
    h.findById(id)
    .then(user => done(null, user))
    .catch(error => console.log('Error when deserializing the user'))
  })

  let authProcessor = (accessToken, refreshToken, profile, done) => {
    // find user in the local db using profile.id
    // id found return the user dat using the done()
    // if the user is not found, create
    h.findOne(profile.id)
    .then(result => {
      if(result){
        done(null)
        console.log(profileId);
      }else{
        // create a new user and return\
        console.log(profile);
        h.createNewUser(profile)
        .then(newChatUser => done(null, newChatUser))
        .catch(error => console.log('Create a New USer failed: ', error));
      }
    });
  };
  passport.use(new FacebookStrategy(config.fb, authProcessor));
}
