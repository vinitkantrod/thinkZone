'use strict'

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var User = new Schema({
    firstName: {type: String},
    lastName: {type: String},
    password: {type: String},
    roles: [{type: String, required: true}],
    createdOn: {type: Number, default: new Date().getTime()},
    age: {type: Number},
    location: [{type: String}],
    email: {type: String},
    mobile: {type: String},
    active: {type: Boolean},
    userName: {type: String}
})

module.exports = mongoose.model('User', User);