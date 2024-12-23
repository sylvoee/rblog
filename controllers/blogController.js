let userModel = require('../model/userSchema') ;
let blogModel = require('../model/blogSchema');
let bcrypt = require('bcrypt');


module.exports = postBlog = (req, res) =>{
 const{title, description, image} = req.body ;
 

 let createUser = new blogModel({title : title , description : description, image:image, user : req.session.user}) ;
 createUser.save().then( (data)=>{
  // res.send("Post succcessful");
  res.send(req.session.user);
  
 } );
}



// fetch all blog post
module.exports = allBlog = async (req , res) =>{
  console.log("User session " +   req.session.user);
    try {
        let allBlog = await blogModel.find({}).populate('user').exec() ;
        res.send( {fam : req.session.user} ) ;
       } catch (error) {
        console.log(error);
       }


}



  // to edit a blog
  module.exports = editBlog =  async(req,res)=>{
    //res.send(req.params.id);
    console.log("  sessions " + req.session.name  );
    
    // let {title,description,image, ID}= req.body;
    
    // try {
    //   let editR = await blogModel.findByIdAndUpdate( ID ,   {
    //     title,
    //     description,
    //     image
        
    //     })
    
    //     res.send(" Blog post was edited sucessfully")
    
    // } catch (error) {
    //   console.log(error)
    // }

    }



 

// to print out a blog
module.exports = aBlog = async(req,res)=>{
    let ID = req.params.Id 
   // Select * from users
  try {
    let aBlog = await blogModel.findById(ID).exec();
    res.send(aBlog);
  } catch (error) {
    console.log(error);
  }
  }

