/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var University = require('../api/university/university.model');
var Scores = require('../api/scores/scores.model');

User.find({}).removeAsync()
  .then(function() {
    User.createAsync({
      provider: 'local',
      name: 'Test User',
      email: 'test@test.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@admin.com',
      password: 'admin'
    })
    .then(function() {
      console.log('finished populating users');
    });
  });


/*
University.find({}).removeAsync()
  .then(function() {
    University.createAsync({
      name:'Stanford University', 
      location: 'California',
      deadline: '12/8/15',
      fees: {
        amount:75,
        currency:"€"
      },
      program: 'MS in CS',
      requirements: [{
        gre:{
          verbal: 154,
          quant: 165,
          awa: 4.5
        },
        toefl:{
          min: 100,
          reading: 25,
          listening: 25,
          speaking: 25,
          writing: 25
        },
        gpa:{
          min: 3.2
        },
        recommendations:{
          count: 3
        }
      }],
      documents: {
        docs:[
          'Transcript',
          'SOP',
          'Resume'
        ],
        done:[
          'Transcript',
          'SOP'
        ]
      },
      portal: {
        link: 'http://cse.stanford.com',
        username: 'kediamanav',
        password: 'password'
      },
      rate: 50
    }, {
      name:'MIT', 
      location: 'Boston', 
      deadline: '12/10/15',
      fees: {
        amount:75,
        currency:"€"
      },
      program: 'MS in CS',
      requirements: [{
        gre:{
          verbal: 154,
          quant: 165,
          awa: 4.5
        },
        toefl:{
          min: 100,
          reading: 25,
          listening: 25,
          speaking: 25,
          writing: 25
        },
        gpa:{
          min: 3.2
        },
        recommendations:{
          count: 3
        }
      }],
      documents: {
        docs:[
          'Transcript',
          'SOP',
          'Resume'
        ],
        done:[
          'Transcript',
          'Resume'
        ]
      },
      portal: {
        link: 'http://cse.mit.com',
        username: 'kediamanav',
        password: 'password'
      },
      rate: 10
    }, {
      name:'Illinois', 
      location: 'Chicago', 
      deadline: '12/15/15',
      fees: {
        amount:90,
        currency:"€"
      },
      program: 'MS in CS',
      requirements: [{
        gre:{
          verbal: 154,
          quant: 165,
          awa: 4.5
        },
        toefl:{
          min: 100,
          reading: 25,
          listening: 25,
          speaking: 25,
          writing: 25
        },
        gpa:{
          min: 3.2
        },
        recommendations:{
          count: 3
        }
      }],
      documents: {
        docs:[
          'Transcript',
          'SOP',
          'Resume'
        ],
        done:[
          'Transcript',
          'Resume'
        ]
      },
      portal: {
        link: 'http://cse.uiuc.com',
        username: 'kediamanav',
        password: 'password'
      },
      rate: 35
    }, {
      name:'Georgia Tech', 
      location: 'Atlanta', 
      deadline: '2/1/16',
      fees: {
        amount:75,
        currency:'$'
      },
      program: 'MS in CS',
      requirements: [{
        gre:{
          verbal: 154,
          quant: 165,
          awa: 4.5
        },
        toefl:{
          min: 100,
          reading: 25,
          listening: 25,
          speaking: 25,
          writing: 25
        },
        gpa:{
          min: 3.2
        },
        recommendations:{
          count: 3
        }
      }],
      documents: {
        docs:[
          'Transcript',
          'SOP',
          'Resume',
          'Diversity Essay'
        ],
        done:[
          'Transcript',
          'Resume',
          'SOP'
        ]
      },
      portal: {
        link: 'http://cc.gatech.edu',
        username: 'kediamanav',
        password: 'password'
      },
      rate: 40
    }, {
      name:'UT Austin', 
      location: 'Texas', 
      deadline: '12/12/15',
      fees: {
        amount:75,
        currency:'$'
      },
      program: 'MS in CS',
      requirements: [{
        gre:{
          verbal: 154,
          quant: 165,
          awa: 4.5
        },
        toefl:{
          min: 100,
          reading: 25,
          listening: 25,
          speaking: 25,
          writing: 25
        },
        gpa:{
          min: 3.2
        },
        recommendations:{
          count: 3
        }
      }],
      documents: {
        docs:[
          'Transcript',
          'SOP',
          'Resume',
          'Diversity Essay'
        ],
        done:[
          'Transcript',
          'Resume',
          'SOP'
        ]
      },
      portal: {
        link: 'http://cse.austin.com',
        username: 'kediamanav',
        password: 'password'
      },
      rate: 70,
    })
    .then(function() {
      console.log('finished populating products');
    });
  });*/