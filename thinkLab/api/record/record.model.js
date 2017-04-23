'use strict'

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var Record = new Schema({
    userId: {type: String},
    courseList: [{type: ObjectId}],
    studentList: [{type: ObjectId}],
    createdOn: {type: Number, default: new Date().getTime()},
})

module.exports = mongoose.model('Record', Record);