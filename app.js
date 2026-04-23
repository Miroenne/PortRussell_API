var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongodb = require('./db/mongoose.js');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var catwaysRouter = require('./routes/catways');

const cors = require('cors');

mongodb.initClientDbConnection();

var app = express();

app.use(cors({
    exposedHeaders: ['Authorization'],
    origin: "*"
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catways', catwaysRouter);


module.exports = app;
