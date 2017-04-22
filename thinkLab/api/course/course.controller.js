'use strict'

var path = require('path'),
    request = require('request'),
    config = require('../../config');
var Promise = require('bluebird'),
    course = require('./course.model'),
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

exports.createCourse = function(req, res) {
    console.log(req.body);
    return course.createAsync(req.body)
        .then(responseWithResult(res, 201))
        .catch(handleError(req.body, 404))
}

exports.updateCourse = function(req, res) {
    courseId = req.params
    console.log(courseId);
    return course.findOneAsyn({_id: mongoose.Types.ObjectId(courseId)})
        .then((dbRes) => {
            console.log(dbRes);
            dbRes.active = true;
            course.saveAsync(dbRes)
                .then(responseWithResult(res, 201))
                .catch(handleError(req.body, 404))
        })
        .catch(handleError(req.body, 404))
}