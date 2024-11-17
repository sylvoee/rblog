
module.exports = registerUser = (req,res)=>{
    const {name,email,password,status} = req.body
    //making instance of the userModel
    
    //hashing password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    
    try {
      let aUser = new userModel ({name, email,password: hash,status});
    aUser.save();
    res.send("registered");
    
    } catch(error) {
      console.log(error)
    }
    
    
    }