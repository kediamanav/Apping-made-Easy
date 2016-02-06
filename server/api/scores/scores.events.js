/**
 * Scores model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Scores = require('./scores.model');
var ScoresEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ScoresEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Scores.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    ScoresEvents.emit(event + ':' + doc._id, doc);
    ScoresEvents.emit(event, doc);
  }
}

module.exports = ScoresEvents;
