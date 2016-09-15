"use strict";
const database = require('../models/database');

const sequelize = database.sequelize;
const User = database.User;

function index(req, res) {
  User.findAll({}).then((users) => {
    return res.json(users);
  });
}

function add(req, res, next) { // create a new user record
  User.create(req.body)
    .then((data) => {
      console.log('inside then - add function', data);
      next();
    })
    .catch(err => {
      console.error(err);
      return res.json({
        error: "User with that username already exists"
      });
    });
}

function show(req, res, next) { // to get the logged in user's profile'
  User.findOne({ where: { username: req.params.username, password: req.params.password } }, err => {
    if (err) console.error(err);
  })
  .then((user) => {
    if (user === null) {
      return res.status(200).send(null);
    } else {
      req.user = user;
    }
    next();
  });
}

function conn(req, res) {
  User.sequelize.query('SELECT "actname" from "activities" join "useractivities" on ' +
      '("useractivities"."activityId" = "activities"."_id") join "users" on ' +
      '("users"."_id" = "useractivities"."userId") where "username" =\'' + req.params.username + '\'')
    .then((data) => {
      const output = {
        activities: data[0],
        user: req.user
      };
      return res.json(output);
    });
}

function profile(req, res, next) {
  User.findOne({
      where: {
        username: req.params.username
      }
    }, err => {
      if (err) console.error(err);
    })
    .then((user) => {
      const userprofile = {
        "username": user.username,
        "profilepic": user.profilepic,
        "bio": user.bio
      };
      if (user === null) {
        res.status(500).send(null);
      } else {
        res.json(userprofile);
      }
      next();
    });
}

function addBio(req, res, next) {
  User.update(
  {
    bio: req.body.bio
  },
  {
    where: { username : req.body.username }
  })
  .then(function () {
     next();
  });
}

function addBioImage(req, res, next) {
  User.update(
  {
    profilepic: req.body.profilepic
  },
  {
    where: { username : req.body.username }
  })
  .then(function () {
     next();
  });
}

module.exports = {
  index,
  add,
  show,
  conn,
  profile,
  addBio,
  addBioImage
};
