// Requirements
var express = require('express'); // Framework
var path = require('path'); // Work with folders
var favicon = require('serve-favicon'); // Favicon handler
var logger = require('morgan'); // Logging 
var multer  = require('multer'); // File upload handler

// Includes
var routes = require('./routes/index'); 

// Init app
var app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs'); // hogan.js

app.use(favicon(__dirname + '/public/dist/favicon.ico'));
app.use(logger('dev'));
app.use(multer());
app.use(express.static(path.join(__dirname, 'public/dist')));
app.use(routes);

// development error handler will print stacktrace
if (app.get('env') === 'development') {
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

// Run app on port 3000
app.listen(3030);

console.log("Listening on port 3030");

module.exports = app;
