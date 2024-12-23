let bodyParser = require('body-parser')
    // import express
let express = require('express');
let mongoose = require('mongoose');
// fire up the express
let app = express();
let route = require('./route');
let path = require('path');
let expressSession = require('express-session');
let MongoStore = require('connect-mongo')
let cookieParser = require('cookie-parser'); 
const dotgit = require('dotgitignore')();
require('dotenv').config();

// require dot-env
require('dotenv').config();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// set up static files
app.use(express.static(path.join(__dirname, 'public')));

// connect o databse and create database
mongoose.connect(process.env.DBURL).then((e) => {
    console.log("Connected to database");
});

app.use(cookieParser())

  // set up auth
  app.set('trust proxy', 1) // trust first proxy
  app.use(expressSession({
    secret: process.env.SESSION_SECRETE,
    resave: false,
    store: MongoStore.create({ mongoUrl: process.env.DBURL, collectionName: 'sessionStore',
     useUnifiedTopology: true 
    }),
    saveUninitialized:true  ,
    cookie: { 
      maxAge: 25200000 }
  }))

// accept jSON data
app.use(express.json());

// create application/json parser
app.use(bodyParser.urlencoded({ extended: false }))

// middle ware 
app.use('/', route);

// settin up the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})


module.exports = app;