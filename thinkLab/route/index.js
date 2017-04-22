'use strict'

const path = require('path'),
    express = require('express');

module.exports = function(app) {
    app.use('/user', require('../api/user'));
    app.use('/course', require('../api/course'));
    app.use('/record', require('../api/record'));
}