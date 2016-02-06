/**
 * University model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var University = require('./university.model');
var UniversityEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
UniversityEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  University.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    UniversityEvents.emit(event + ':' + doc._id, doc);
    UniversityEvents.emit(event, doc);
  }
}

module.exports = UniversityEvents;
