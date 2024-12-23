
var express = require('express');
var router = express.Router();

const userController = require('./controllers/userControler')
const blogController = require('./controllers/blogController');
const homeController = require('./controllers/homeController');


/* GET home page. */
router.get('/', home);

// router.get('/about', function(req, res, next) {
//   res.render('about');
// });

router.get('/all-users', allUsers);
// get register 
router.get('/register', register);

// post register 
router.post('/register-user', registerUser);

// get login 
router.get('/login', login);

// post login
router.post('/login-user', loginUser);
router.get('/logout',logout);

// register router
router.post('/post-blog', postBlog);
router.get('/all-blogs', allBlog);
router.put('/edit-blog', editBlog);
router.get('/a-blog/:id', aBlog);




module.exports = router;
