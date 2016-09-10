const express = require('express');
const app = express();
const userCtrl = require('./server-sql/controllers/user-controller');
const actCtrl = require('./server-sql/controllers/act-controller');
const uaCtrl = require('./server-sql/controllers/ua-controller')
const bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.json());

app.get('/', function(req, res){
  res.sendFile(__dirname + '/client/index.html');
})

app.get('/user/:username/:password', userCtrl.show, userCtrl.conn); //to get a single user's profile'
// app.get('/someshit/', userCtrl.conn); //to get a single user's profile'

app.get('/test', userCtrl.index); //full list of users, not needed for front-end
app.post('/user/add', userCtrl.add, (req, res) => { res.end() });//to add a single user

app.get('/activities', actCtrl.index); //full list of activities, for user to choose from
app.post('/activity/add', actCtrl.add, (req, res) => { res.end() });//to add a new activity

app.get('/useractivities', uaCtrl.index, (req, res) => { res.end() });//to view all joins between users & activities
app.post('/useractivity/add', uaCtrl.add, (req, res) => { res.end() });//to add a new activity TO a User
// app.put('/useractivity/close', uaCtrl.close, (req, res) => {res.end() }); // to mark activity as done

app.get('/activity/', uaCtrl.add, (req, res) => { res.end() });//to add a new activity TO a User


app.use(express.static(path.join(__dirname + '/client/')));

app.listen(3000, () => {
  console.log('listening on port 3000')
});