'use strict';

var express = require('express');
var controller = require('./scores.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.post('/', controller.create);
router.put('/', controller.update);

module.exports = router;
