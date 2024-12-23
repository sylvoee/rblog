
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
  res.send("User registered successfully");
  console.log(req.session.user);
    
    } catch(error) {
      console.log(error)
    }
    
    
    } 
    
    //login
    module.exports = login = (req,res)=>{
        res.render("login");
      }

  //  post login controller
module.exports = loginUser = async (req, res, next)=>{
  // res.status(200).send('login reached');
  const{email, password, status} = req.body;

  // if already login, pls redirect
  if(req.session.setLogin == true){
    res.redirect('/');
  }else{

    
  if( password.length < 1 || email.length < 1){
    console.log("email/password must not be empty");
    res.status(200).send("email/password must not be empty");

  }else{
   
    let data = await userModel.findOne({email}).exec();
     
    await bcrypt.compare(password, data.password, (err, isMatch)=>{
        if(isMatch){
           req.session.setLogin = true;
            req.session.user = data;
            // console.log(req.session);
            res.status(200).send({isLogin: req.session.setLogin, user: req.session.user } );
            console.log(isMatch);
            
        }else{
            res.status(200).send("email or/and password does not exist");
                   console.log("email or/and password does not exist");
        }
    });
  
  }
     
  }
 
}

        module.exports = allUsers = async (req,res) =>{
          try {
              let allBlog = await userModel.find({}).exec();
              res.send(allBlog);
             } catch (error) {
              console.log(err);
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
        