/**
 * Document model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Document = require('./document.model');
var DocumentEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
DocumentEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Document.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    DocumentEvents.emit(event + ':' + doc._id, doc);
    DocumentEvents.emit(event, doc);
  }
}

module.exports = DocumentEvents;
