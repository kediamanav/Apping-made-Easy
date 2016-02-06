/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/universities              ->  index
 * POST    /api/universities              ->  create
 * GET     /api/universities/:id          ->  show
 * PUT     /api/universities/:id          ->  update
 * DELETE  /api/universities/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var University = require('./university.model');

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    console.log(err);
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(function(updated) {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(function() {
          res.status(204).end();
        });
    }
  };
}

// Gets a list of Universitys
exports.index = function(req, res) {
  console.log("IN LIST FUNCTION");
  University.findAsync({'user_id':req.user._id})
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single University from the DB
exports.show = function(req, res) {
  console.log("IN SHOW FUNCTION");
  University.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new University in the DB
exports.create = function(req, res) {
  console.log("IN CREATTE FUNCTION");
  University.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing University in the DB
exports.update = function(req, res) {
  console.log("IN THIS FUNCTION");
  if (req.body._id) {
    delete req.body._id;
  }
  console.log(req.body);

  University.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a University from the DB
exports.destroy = function(req, res) {
  University.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
