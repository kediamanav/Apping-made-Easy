'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var ScoresSchema = new Schema({
  user_id:{type: String, required:true},
  gpa:{
    total: {type:Number, min:0, max:100}
  },
  gre:{
    present: {type:Boolean, required:true},
    verbal: {type:Number, min:130, max:170},
    quant: {type:Number, min:130, max:170},
    awa: {type:Number, min:0, max:6}
  },
  gre_subject:{
    present: {type:Boolean, required:true},
    total: {type:Number, min:200, max:990},
    subject: {type:String},
    subtotal: {type:Number, min:20, max:99}
  },
  gmat:{
    present: {type:Boolean, required:true},
    total: {type:Number, min:200, max:800},
    verbal: {type:Number, min:0, max:60},
    quant: {type:Number, min:0, max:60},
    reading: {type:Number, min:1, max:8},
    awa: {type:Number, min:0, max:6}
  },
  lsat:{
    present: {type:Boolean, required:true},
    total: {type:Number, min:120, max:180},
  },
  toefl:{
    present: {type:Boolean, required:true},
    total: {type:Number, min:0, max:120},
    reading: {type:Number, min:0, max:30},
    listening: {type:Number, min:0, max:30},
    speaking: {type:Number, min:0, max:30},
    writing: {type:Number, min:0, max:30}
  },
  ielts:{
    present: {type:Boolean, required:true},
    total: {type:Number, min:1, max:9},
    reading: {type:Number, min:1, max:9},
    listening: {type:Number, min:1, max:9},
    speaking: {type:Number, min:1, max:9},
    writing: {type:Number, min:1, max:9}
  }
});

module.exports = mongoose.model('Scores', ScoresSchema);
