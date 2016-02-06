'use strict';

var express = require('express');
var controller = require('./document.controller');
var multiparty = require('connect-multiparty');
var auth = require('../../auth/auth.service');

var router = express.Router();
var uploadOptions = {autoFile: true, uploadDir: 'client/assets/uploads/'};

router.get('/', auth.isAuthenticated(), controller.index);
router.post('/upload', multiparty(uploadOptions),controller.upload);
router.delete('/:id', controller.destroy);

module.exports = router;
