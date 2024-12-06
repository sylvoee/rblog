
var express = require('express');
var router = express.Router();

const userController = require('./controllers/userControler')
const blogController = require('./controllers/blogController')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hello Express' });
});

// router.get('/about', function(req, res, next) {
//   res.render('about');
// });

// get register 
router.get('/register', register);

// post register 
router.post('/register-user', registerUser);

// get login 
router.get('/login', login);

// post login
router.post('/login-user', loginUser);
router.get('/logout',logout);




module.exports = router;
