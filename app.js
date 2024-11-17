const dotgit = require('dotgitignore')();

let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let  mongoose = require('mongoose');

let route = require('./route');


let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//connect database
const dburl = 'mongodb://localhost:27017/Blogdb'
 mongoose.connect(dburl).then((err)=>{
  console.log("database connected");
 });



app.use('/', route);




//SERVER
let PORT = 3000;
app.listen(PORT,()=>{
  console.log("App is running on PORT" + PORT)
});

module.exports = app;


