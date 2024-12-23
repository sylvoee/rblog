

module.exports = home = (req, res) =>{
  console.log(req.session.user + " is login" );
  res.render('index', {msg : "Hey front end", aUser : req.session.user});
}