"use strict";
const database = require('../models/database');

const sequelize = database.sequelize;
const UserActivity = database.UserActivity;
const Activity = database.Activity;

function index(req, res) { // displays all activities associated with users? for devs not production
  UserActivity.findAll({}).then((uas) => {
    return res.json(uas);
  });
}

function add(req, res, next) { // associates a user and a activity
  const {activityId, userId} = req.body;
  console.log('inside add func ua ',req.body);
  UserActivity.create({activityId, userId})
    .then(useractivity => {
      next();
    })
    .catch(err => {
      console.error(err);
      return res.status(200).json({
        error: 'You already have that activity on your bucketlist'
      });
    });
}

function findbyact(req, res, next) { // finds all users by activity
  Activity.sequelize.query('SELECT "username" from "users" join "useractivities" on ' +
  '("useractivities"."userId" = "users"."_id") join "activities" on ("activities"."_id" = ' +
  '"useractivities"."activityId") where "actname" =\'' + req.params.actname + '\'')
  .then((data) => {
    const output = { users: data[0] };
    return res.json(output);
    next();
  });
}

module.exports = { index, add, findbyact };
