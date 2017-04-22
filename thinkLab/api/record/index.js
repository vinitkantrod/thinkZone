'use strict';

var express = require('express');
var config = require('../../config');

var controller = require('./record.controller');

var router = express.Router();

router.post('/create', controller.createRecord);
router.get('/fetch/:userid', controller.fetchRecord);

module.exports = router;