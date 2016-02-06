'use strict';

var app = require('../../app');
var request = require('supertest');

var newScores;

describe('Scores API:', function() {

  describe('GET /api/scores', function() {
    var scoress;

    beforeEach(function(done) {
      request(app)
        .get('/api/scores')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          scoress = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      scoress.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/scores', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/scores')
        .send({
          name: 'New Scores',
          info: 'This is the brand new scores!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newScores = res.body;
          done();
        });
    });

    it('should respond with the newly created scores', function() {
      newScores.name.should.equal('New Scores');
      newScores.info.should.equal('This is the brand new scores!!!');
    });

  });

  describe('GET /api/scores/:id', function() {
    var scores;

    beforeEach(function(done) {
      request(app)
        .get('/api/scores/' + newScores._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          scores = res.body;
          done();
        });
    });

    afterEach(function() {
      scores = {};
    });

    it('should respond with the requested scores', function() {
      scores.name.should.equal('New Scores');
      scores.info.should.equal('This is the brand new scores!!!');
    });

  });

  describe('PUT /api/scores/:id', function() {
    var updatedScores

    beforeEach(function(done) {
      request(app)
        .put('/api/scores/' + newScores._id)
        .send({
          name: 'Updated Scores',
          info: 'This is the updated scores!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedScores = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedScores = {};
    });

    it('should respond with the updated scores', function() {
      updatedScores.name.should.equal('Updated Scores');
      updatedScores.info.should.equal('This is the updated scores!!!');
    });

  });

  describe('DELETE /api/scores/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/scores/' + newScores._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when scores does not exist', function(done) {
      request(app)
        .delete('/api/scores/' + newScores._id)
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
