var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
//var users = require('./routes/users');

/**
 *
 * Route imports
 */

//var signup=require('./routes/signup');

var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
/*
** Development Settings
*/

if(app.get('env')==='development') {
    app.use(express.static(path.join(__dirname,'../client')));
    app.use(express.static(path.join(__dirname,'../client/.tmp')));
    app.use(express.static(path.join(__dirname,'../client/app')));


}

/*
 * Production settings
 */

if (app.get('env')=== 'production') {
    app.use(express.static(path.join(__dirname,'/dist')));

}

/**
 * Routes
 */

var router=require('./router') (app);

    //Error handling
app.use(function(err,req,res,next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
