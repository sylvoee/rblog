var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/register', function(req, res, next) {
  res.render('register')
})

router.post('/register', (req, res)=>{
  res.send("post, method, working")

})


module.exports = router;
