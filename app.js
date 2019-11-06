var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');



var app = express();
require("dotenv").config();
// set default enviroment 
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
require('./routes')(app);


module.exports = app;
