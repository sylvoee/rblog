var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let = require('mongoose');
var indexRouter = require('./routes/index');
const { default: mongoose } = require('mongoose');


var app = express();
 mongoose.connect('mongodb://127.0.0.1:27017/test')
  .then(() => console.log('Connected!'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// server
PORT = 3000;
app.listen(PORT, ()=>{
  console.log("App is running on Port " + PORT);
});

module.exports = app;
