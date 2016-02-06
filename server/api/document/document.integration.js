'use strict';

var app = require('../../app');
var request = require('supertest');

var newDocument;

describe('Document API:', function() {

  describe('GET /api/documents', function() {
    var documents;

    beforeEach(function(done) {
      request(app)
        .get('/api/documents')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          documents = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      documents.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/documents', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/documents')
        .send({
          name: 'New Document',
          info: 'This is the brand new document!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newDocument = res.body;
          done();
        });
    });

    it('should respond with the newly created document', function() {
      newDocument.name.should.equal('New Document');
      newDocument.info.should.equal('This is the brand new document!!!');
    });

  });

  describe('GET /api/documents/:id', function() {
    var document;

    beforeEach(function(done) {
      request(app)
        .get('/api/documents/' + newDocument._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          document = res.body;
          done();
        });
    });

    afterEach(function() {
      document = {};
    });

    it('should respond with the requested document', function() {
      document.name.should.equal('New Document');
      document.info.should.equal('This is the brand new document!!!');
    });

  });

  describe('PUT /api/documents/:id', function() {
    var updatedDocument

    beforeEach(function(done) {
      request(app)
        .put('/api/documents/' + newDocument._id)
        .send({
          name: 'Updated Document',
          info: 'This is the updated document!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedDocument = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedDocument = {};
    });

    it('should respond with the updated document', function() {
      updatedDocument.name.should.equal('Updated Document');
      updatedDocument.info.should.equal('This is the updated document!!!');
    });

  });

  describe('DELETE /api/documents/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/documents/' + newDocument._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when document does not exist', function(done) {
      request(app)
        .delete('/api/documents/' + newDocument._id)
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
