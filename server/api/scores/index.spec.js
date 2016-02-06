'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var scoresCtrlStub = {
  index: 'scoresCtrl.index',
  show: 'scoresCtrl.show',
  create: 'scoresCtrl.create',
  update: 'scoresCtrl.update',
  destroy: 'scoresCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var scoresIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './scores.controller': scoresCtrlStub
});

describe('Scores API Router:', function() {

  it('should return an express router instance', function() {
    scoresIndex.should.equal(routerStub);
  });

  describe('GET /api/scores', function() {

    it('should route to scores.controller.index', function() {
      routerStub.get
                .withArgs('/', 'scoresCtrl.index')
                .should.have.been.calledOnce;
    });

  });

  describe('GET /api/scores/:id', function() {

    it('should route to scores.controller.show', function() {
      routerStub.get
                .withArgs('/:id', 'scoresCtrl.show')
                .should.have.been.calledOnce;
    });

  });

  describe('POST /api/scores', function() {

    it('should route to scores.controller.create', function() {
      routerStub.post
                .withArgs('/', 'scoresCtrl.create')
                .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/scores/:id', function() {

    it('should route to scores.controller.update', function() {
      routerStub.put
                .withArgs('/:id', 'scoresCtrl.update')
                .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/scores/:id', function() {

    it('should route to scores.controller.update', function() {
      routerStub.patch
                .withArgs('/:id', 'scoresCtrl.update')
                .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/scores/:id', function() {

    it('should route to scores.controller.destroy', function() {
      routerStub.delete
                .withArgs('/:id', 'scoresCtrl.destroy')
                .should.have.been.calledOnce;
    });

  });

});
