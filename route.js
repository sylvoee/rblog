
let userModel = require('./model/userSchema') 
let bcrypt = require('bcrypt');

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hello Express' });
});

// router.get('/about', function(req, res, next) {
//   res.render('about');
// });

// get register 
router.get('/register', (req,res)=>{
  res.render("register");
});

// post register 
router.post('/register-user', );

module.exports = router;
