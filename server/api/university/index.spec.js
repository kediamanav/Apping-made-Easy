'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var universityCtrlStub = {
  index: 'universityCtrl.index',
  show: 'universityCtrl.show',
  create: 'universityCtrl.create',
  update: 'universityCtrl.update',
  destroy: 'universityCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var universityIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './university.controller': universityCtrlStub
});

describe('University API Router:', function() {

  it('should return an express router instance', function() {
    universityIndex.should.equal(routerStub);
  });

  describe('GET /api/universities', function() {

    it('should route to university.controller.index', function() {
      routerStub.get
                .withArgs('/', 'universityCtrl.index')
                .should.have.been.calledOnce;
    });

  });

  describe('GET /api/universities/:id', function() {

    it('should route to university.controller.show', function() {
      routerStub.get
                .withArgs('/:id', 'universityCtrl.show')
                .should.have.been.calledOnce;
    });

  });

  describe('POST /api/universities', function() {

    it('should route to university.controller.create', function() {
      routerStub.post
                .withArgs('/', 'universityCtrl.create')
                .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/universities/:id', function() {

    it('should route to university.controller.update', function() {
      routerStub.put
                .withArgs('/:id', 'universityCtrl.update')
                .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/universities/:id', function() {

    it('should route to university.controller.update', function() {
      routerStub.patch
                .withArgs('/:id', 'universityCtrl.update')
                .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/universities/:id', function() {

    it('should route to university.controller.destroy', function() {
      routerStub.delete
                .withArgs('/:id', 'universityCtrl.destroy')
                .should.have.been.calledOnce;
    });

  });

});
