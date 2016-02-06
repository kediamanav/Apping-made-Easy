'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var documentCtrlStub = {
  index: 'documentCtrl.index',
  show: 'documentCtrl.show',
  create: 'documentCtrl.create',
  update: 'documentCtrl.update',
  destroy: 'documentCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var documentIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './document.controller': documentCtrlStub
});

describe('Document API Router:', function() {

  it('should return an express router instance', function() {
    documentIndex.should.equal(routerStub);
  });

  describe('GET /api/documents', function() {

    it('should route to document.controller.index', function() {
      routerStub.get
                .withArgs('/', 'documentCtrl.index')
                .should.have.been.calledOnce;
    });

  });

  describe('GET /api/documents/:id', function() {

    it('should route to document.controller.show', function() {
      routerStub.get
                .withArgs('/:id', 'documentCtrl.show')
                .should.have.been.calledOnce;
    });

  });

  describe('POST /api/documents', function() {

    it('should route to document.controller.create', function() {
      routerStub.post
                .withArgs('/', 'documentCtrl.create')
                .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/documents/:id', function() {

    it('should route to document.controller.update', function() {
      routerStub.put
                .withArgs('/:id', 'documentCtrl.update')
                .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/documents/:id', function() {

    it('should route to document.controller.update', function() {
      routerStub.patch
                .withArgs('/:id', 'documentCtrl.update')
                .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/documents/:id', function() {

    it('should route to document.controller.destroy', function() {
      routerStub.delete
                .withArgs('/:id', 'documentCtrl.destroy')
                .should.have.been.calledOnce;
    });

  });

});
