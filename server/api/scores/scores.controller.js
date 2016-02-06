/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/scores              ->  index
 * POST    /api/scores              ->  create
 * GET     /api/scores/:id          ->  show
 * PUT     /api/scores/:id          ->  update
 * DELETE  /api/scores/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Scores = require('./scores.model');

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    console.log(err);
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  //console.log(res);
  //console.log(statusCode);
  return function(entity) {
    if (entity) {
      console.log(entity);
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

// Gets a list of Scoress
exports.index = function(req, res) {
  console.log("in index");
  Scores.findAsync({'user_id':req.user._id})
    .then(responseWithResult(res))
    .catch(handleError(res));
};

/*
// Gets a single Scores from the DB
exports.show = function(req, res) {
  console.log("in show");
  Scores.findAsync({'user_id':req.user._id})
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};*/

// Creates a new Scores in the DB
exports.create = function(req, res) {
  console.log("In create");
  Scores.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};


// Updates an existing Scores in the DB
exports.update = function(req, res) {
  console.log("inside update");

  Scores.findByIdAsync(req.body._id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};


/*
// Deletes a Scores from the DB
exports.destroy = function(req, res) {
  Scores.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
*/