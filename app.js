var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
//var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var admin = require('./routes/admin');
var api = require('./routes/default/api');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public',express.static(path.join(__dirname, 'public')));
app.use('/api', api);
app.use('/index', index);
app.use('/admin', admin);




app.listen(4000, '127.0.0.1');
