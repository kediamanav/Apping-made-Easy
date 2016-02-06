'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var Exams = new Schema({
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
  /*
  sat1:{
    present: {type:Boolean, required:true},
    total: {type:Number, min:400, max:1600},
    verbal: {type:Number, min:200, max:800},
    maths: {type:Number, min:200, max:800}
  }*/
});


var UniversitySchema = new Schema({
  user_id:{type: String, required:true},
  name: { type: String, required: true},
  location: { type: String,},
  deadline: { type: String, required: true},
  fees: { 
  	amount:{type: Number},
  	currency:{type:String}
  },
  program: { type: String, required: true},
  exam: {type: Exams},
  documents: {
  	docs: [{type: String}], 
  	done: [{type: String}]
  },
  recommenders: {
    name: [{type: String}], 
    done: [{type: String}]
  },
  portal: { 
  	link: {type: String},
  	username: { type: String},
  	password: { type: String}
  },
  rate: { type: Number},
  tasks: {
  	task:[{type:String}],
  	done:[{type:String}]	
  },
  contact_email:{type:String},
  finished:{type:Boolean, required:true}
});



module.exports = mongoose.model('University', UniversitySchema);