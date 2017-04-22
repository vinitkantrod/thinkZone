'use strict'

var path = require('path'),
    request = require('request'),
    config = require('../../config');
var Promise = require('bluebird'),
    record = require('./record.model'),
    course = require('../course/course.model'),
    mongoose = require('mongoose');

function sendRespond(errStatus, errMessage, data) {
    var info = {
        info: {
            status: errStatus,
            message: errMessage
        },
        data: data
    };
    return info
}

function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function(err) {
        res.status(statusCode).json(sendRespond('error',err.message,null));
    }
}

function responseWithResult(res, statusCode) {
    statusCode = statusCode || 200;
    return function(data){
        res.status(statusCode).json(sendRespond('success','created', data))
    }
}

exports.createRecord = function(req, res) {
    console.log(req.body);
    return record.createAsync(req.body)
        .then(responseWithResult(res, 201))
        .catch(handleError(req.body, 404))
}

exports.fetchRecord = function(req, res) {
    var userId = req.params.userid;
    console.log(userId);
    record.findOneAsync({userId: userId})
        .then((recordData) => {
            console.log("recordData : ", recordData);
            var courseId = recordData.courseList;
            var courseData = courseId.map(function(x){
                return mongoose.Types.ObjectId(x);
            });
            console.log(courseData);
            var query = {_id:{$in: courseData}};
            course.findAsync(query)
                .then(responseWithResult(res, 201))
                .catch(handleError(req.body, 404))
        })
}