'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var DocumentSchema = new Schema({
  user_id:{type: String, required:true},
  file_name: {type: String, required:true},
  imageBin: { data: Buffer, contentType: String },
  imageUrl: String,
});

module.exports = mongoose.model('Document', DocumentSchema);