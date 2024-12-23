var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let = require('mongoose');
let routes = require('./routes');
const { default: mongoose } = require('mongoose');
let gitignore = require(`gitignore`);
require('dotenv').config();
let bodyParser = require('body-parser')
let mongoStore = require('connect-mongo');
let expressSession = require('express-session');


var app = express();

mongoose.connect(process.env.DBURL).then(() => console.log('Database Connected!'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




// require dot-env
require('dotenv').config();



// connect o databse and create database
try {
    mongoose.connect(process.env.DBURL).then((e) => {
        console.log("Connected to database");
    });
} catch (error) {
    console.log("Poor connection..." + error);
}

app.use(cookieParser())

// set up auth

app.set('trust proxy', 1) // trust first proxy
app.use(expressSession({
    secret: 'a secrete',
    resave: false,
    store: mongoStore.create({
        mongoUrl: process.env.DBURL,
        collectionName: 'sessionStore',
        useUnifiedTopology: true
    }, (err, suc) => {
        if (err) { console.log(err) }
        if (suc) {
            console.log("db SUCESSFULLY CONNECTED")
        }
    }),
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 60


    }
}))



app.use('/', routes);

// server
PORT = 3000;
app.listen(PORT, () => {
    console.log("App is running on Port " + PORT);
});

module.exports = app;