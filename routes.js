var express = require('express');
var router = express.Router();
let homeController = require('./controllers/homeControllers');
let userController = require('./controllers/userController'); /* GET home page. */
router.get('/', home);

router.get('/register', getRegister);
router.post('/post-user', postRegister);



module.exports = router;