// Express
var express = require('express');
var app = express();

// Dependencies
var http = require('http');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var multer  = require('multer');

// Actual Server
var server = http.createServer(app);
var io = require('socket.io')(server);
global.io = io;

console.log('Server listening on port 3030');
server.listen(3030);

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs'); // hogan.js

// Static
app.use(favicon(__dirname + '/public/dist/favicon.ico'));
app.use(multer());
app.use(express.static(path.join(__dirname, 'public/dist')));

// Routes
var routes = require('./routes/routes'); 
app.use(routes);

// development error handler will print stacktrace
if (app.get('env') === 'development') {
    app.use(logger('dev'));
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

//  production error handler no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
module.exports.io = io;
