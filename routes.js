var express = require('express');
var router = express.Router();
let homeController = require('./controllers/homeControllers');
let userController = require('./controllers/userController'); /* GET home page. */
let blogController = require('./controllers/blogController');


router.get('/', home);

router.get('/register', getRegister);
router.post('/post-user', postRegister);
router.post('/login-user', postLogin);
router.get('/logout', logout);


router.post('/post-blog', postBlog);
router.get('/all-blogs', allBlog);
router.put('/edit-blog', editBlog);
router.get('/a-blog/:id', aBlog);
router.delete('/d-blog', deleteBlog);



module.exports = router;