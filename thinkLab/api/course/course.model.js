'use strict'

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var Course = new Schema({
    category: [{type: String}],
    teachersList: [{type: String}],
    adminId: {type: String},
    langauge: [{type: String, required: true}],
    createdOn: {type: Number, default: new Date().getTime()},
    duration: {type: Number, default: 24*60*7},
    startDate: {type: Number},
    endDate: {type: Number},
    timings: [{type: Number}],
    active: {type: Boolean}
})

module.exports = mongoose.model('Course', Course);