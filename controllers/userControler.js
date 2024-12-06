
let userModel = require('../model/userSchema') 
let bcrypt = require('bcrypt');

//register
module.exports = register = (req,res)=>{
    res.render("register");
  }

module.exports = registerUser = (req,res)=>{
    const {name,email,password,status} = req.body
    //making instance of the userModel
    
    //hashing password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    
    try {
      let aUser = new userModel ({name, email,password: hash,status});
    aUser.save();
    res.render("/login");
    
    } catch(error) {
      console.log(error)
    }
    
    
    } 
    
    //login
    module.exports = login = (req,res)=>{
        res.render("login");
      }

      //post login
      module.exports = loginUser = async(req,res) => {
        const {email, password} = req.body;
        let aUser = await  userModel.findOne({email}).exec();
        console.log(aUser);

        //comparing the password
        const match = await bcrypt.compare(password, aUser.password);

        if(match) {
            console.log("password matches")
            //store or create session

            req.session.user = aUser;
            console.log("This is session" + req.session.user);
            res.render('index', {greet: "Hello from backend", loginUser: req.session.user});

        } else{
            console.log("password or/and email is/are incorrect")
        }

        }
        // logout controller
module.exports = logout = (req, res)=>{
    req.session.setLogin = false ;
    req.session.destroy(()=>{
    //  res.cookie({maxAge: 0});
        res.redirect('/');
        console.log("You are Logout");
    });
   
    
  }
        