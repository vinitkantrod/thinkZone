'use strict'

var path = require('path'),
    request = require('request'),
    config = require('../../config');
var Promise = require('bluebird'),
    user = require('./user.model');

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

exports.createUser = function(req, res) {
    console.log(req.body);
    if (req.body.userName) {
        console.log("UserName inside loop : ", req.body.userName);
        return user.findOneAsync({userName: req.body.userName})
            .then(function(dbRes){
                console.log("respp ::: ",dbRes);
                if (!dbRes){
                    return user.createAsync(req.body)
                        .then(responseWithResult(res, 201))
                        .catch(handleError(req.body, 404))
                }
                responseWithResult(res, 200)(dbRes)
            })
            .catch(handleError(req.body, 404))
    } else {
        return handleError(req.body, 404);
    }
}