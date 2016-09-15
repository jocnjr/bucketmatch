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

function findByAct(req, res, next) { // finds all users by activity
  Activity.sequelize.query('SELECT "activityId" FROM "useractivities" WHERE "userId" =\'' + req.params.userId + '\'')
  .then((queryData) => {
    UserActivity.sequelize.query('SELECT DISTINCT useractivities."userId" FROM useractivities WHERE useractivities."activityId" IN (5,6,8)')

  })
  .then((queryData) => {
    UserActivity.sequelize.query('SELECT username FROM users WHERE _ID IN (2,3,4)')
  });
}

module.exports = { index, add, findbyact };
