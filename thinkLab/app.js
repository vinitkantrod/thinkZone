const express = require('express'),
    http = require('http'),
    path = require('path'),
    logger = require('morgan'),
    favicon = require('favicon'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    config = require('./config'),
    mongoose = require('mongoose');

mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err){
    console.log('MongoDB connection Error : ', err);
    process.exit(-1);
})

var app = express();
var server = http.createServer(app);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

require('./route/index')(app);

function startServer() {
    server.listen(config.port, config.ip, function () {
        console.log('server listening on %d, in %s mode', config.port, app.get('env'));
    });
}

startServer();