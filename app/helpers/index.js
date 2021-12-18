'use strict';

const router = require('express').Router();
const db = require('../db');

let _registerRoutes = (routes, method) => {
  for(let key in routes){
    if(typeof routes[key] === 'object' && routes[key] !== null && !(routes[key] instanceof Array)){
      _registerRoutes(routes[key], key);
    }else{
      // register the routes
      if(method === 'get'){
        router.get(key, routes[key]);
      }else if(method === 'post'){
        router.post(key, routes[key]);
      }else{
        router.use(routes[key]);
      }
    }
  }
}

let route = routes => {
  _registerRoutes(routes);
  return router;
}

// Find single user based on a key
let findOne = profileID => {
  return db.userModel.findOne({
    'profileId' : profileID
  })
}

// create a new user and return the instanceof
let createNewUser = profile => {
  console.log('creating new user==================================');
  return new Promise((resolve, reject) => {
    let newChatUser = new db.userModel({
      profileId: profile.id,
      fullName: profile.displayName,
      profilePic: profile.photos[0].value || ''
    });

    newchatUser.save(error => {
      if(error){
        reject(error);
      }else{
        resolve(newChatUser);
      }
    })
  });
}

// use promisified find by // IDEA:
let findById = id => {
  return new Promise((resolve, reject) => {
    db.userModel.findById(id, (error, user) => {
      if(error){
        reject(error);
      }else{
        resolve(user);
      }
    });
  });
}

module.exports = {
  route,
  findOne,
  createNewUser,
  findById
}
