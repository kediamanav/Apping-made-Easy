'use strict';

var app = require('../../app');
var request = require('supertest');

var newUniversity;

describe('University API:', function() {

  describe('GET /api/universities', function() {
    var universitys;

    beforeEach(function(done) {
      request(app)
        .get('/api/universities')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          universitys = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      universitys.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/universities', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/universities')
        .send({
          name: 'New University',
          info: 'This is the brand new university!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newUniversity = res.body;
          done();
        });
    });

    it('should respond with the newly created university', function() {
      newUniversity.name.should.equal('New University');
      newUniversity.info.should.equal('This is the brand new university!!!');
    });

  });

  describe('GET /api/universities/:id', function() {
    var university;

    beforeEach(function(done) {
      request(app)
        .get('/api/universities/' + newUniversity._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          university = res.body;
          done();
        });
    });

    afterEach(function() {
      university = {};
    });

    it('should respond with the requested university', function() {
      university.name.should.equal('New University');
      university.info.should.equal('This is the brand new university!!!');
    });

  });

  describe('PUT /api/universities/:id', function() {
    var updatedUniversity

    beforeEach(function(done) {
      request(app)
        .put('/api/universities/' + newUniversity._id)
        .send({
          name: 'Updated University',
          info: 'This is the updated university!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedUniversity = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedUniversity = {};
    });

    it('should respond with the updated university', function() {
      updatedUniversity.name.should.equal('Updated University');
      updatedUniversity.info.should.equal('This is the updated university!!!');
    });

  });

  describe('DELETE /api/universities/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/universities/' + newUniversity._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when university does not exist', function(done) {
      request(app)
        .delete('/api/universities/' + newUniversity._id)
        .expect(404)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
