'use strict';

var express = require('express');
var config = require('../../config');

var controller = require('./user.controller');

var router = express.Router();

router.post('/create', controller.createUser);

module.exports = router;