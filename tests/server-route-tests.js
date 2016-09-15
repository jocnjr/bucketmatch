const request = require('supertest');
const expect = require('chai').expect;

const PORT = process.env.PORT || 3000;
const HOST = `http://localhost:${PORT}`

require('../server.js');

describe('Server route', function() {
  describe('GET /', function() {
    it('should respond with html', function(done) {

    });

    it('should respond with a 200 status', function(done) {

    });
  });

  describe('GET /user/:username/:password', function() {
    it('should respond with nothing when username and password are not found in the database', function(done) {

    });

    it('should respond with JSON object with properties "activities" and "user" if username and password are found in the database', function(done) {

    });
  });

  describe('GET /userinfo/:username', function() {
    it('should respond with status 500 and no data if the username does not match a database record', function(done) {
      request(HOST)
        .get('/userinfo/unexistentuser')
        .expect(500, done);        
    });

    it('should respond with a JSON object with properties "username", "profilepic", and "bio" if the username matches a database record', function(done) {
      request(HOST)
        .get('/userinfo/joe')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(function(res) {
          expect(res.body).to.have.property('username');
          expect(res.body).to.have.property('profilepic');
          expect(res.body).to.have.property('bio');                    
        })
        .expect(200, done);   
    });
  });
});
