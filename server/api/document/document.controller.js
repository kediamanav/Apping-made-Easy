/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/documents              ->  index
 * POST    /api/documents              ->  create
 * GET     /api/documents/:id          ->  show
 * PUT     /api/documents/:id          ->  update
 * DELETE  /api/documents/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var path=require('path');

var Document = require('./document.model');

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  console.log("Inside handle error");
  return function(err) {
    console.log(err);
    res.status(statusCode).send(err);
  };
}

function saveFile(res, file) {
  console.log("save file");
  return function(entity){
    console.log("save file");
    var newPath = '/assets/uploads/' + path.basename(file.path);
    entity.imageUrl = newPath;
    return entity.saveAsync().spread(function(updated) {
      console.log(updated);
      return updated;
    });
  }
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
      console.log("entity not found");
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

// Gets a list of Documents
exports.index = function(req, res) {
  console.log("in get index");
  Document.findAsync({'user_id':req.user._id})
    .then(responseWithResult(res))
    .catch(handleError(res));
};


// Deletes a Document from the DB
exports.destroy = function(req, res) {
  console.log("in destroy document");
  Document.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};


// Uploads a new Product's image in the DB
exports.upload = function(req, res) {
  console.log("inside the upload function");
  var file = req.files.file;
  var user_id = req.body.user_id;
  var file_name = req.body.file_name;

  console.log(user_id);
  console.log(file_name);

  if(!file){
    return handleError(res)('File not provided');
  };

  Document.createAsync({user_id: user_id, file_name: file_name})
    .then(saveFile(res, file))
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};