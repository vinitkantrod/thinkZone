'use strict';

var express = require('express');
var config = require('../../config');

var controller = require('./course.controller');

var router = express.Router();

router.post('/create', controller.createCourse);
// router.update('/activate/:id', controller.updateCourse);

module.exports = router;