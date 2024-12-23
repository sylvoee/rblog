let userModel = require('../model/userSchema');
let blogModel = require('../model/blogSchema');
let bcrypt = require('bcrypt');


module.exports = postBlog = (req, res) => {
    const { title, description, category, image } = req.body;

    let createUser = new blogModel({ title: title, description: description, category, image: image, user: req.session.user._id });
    createUser.save().then((data) => {
        res.send("Post succcessful");


    });
}



// fetch all blog post
module.exports = allBlog = async(req, res) => {
    try {
        let allBlogs = await blogModel.find({}).populate({ path: 'user', select: 'name email' }).exec();
        res.send(allBlogs);
    } catch (error) {
        console.log(error);
    }


}



// to edit a blog
module.exports = editBlog = async(req, res) => {

    let { title, description, image, id } = req.body;

    try {
        let editR = await blogModel.findByIdAndUpdate(id, {
            title,
            description,
            image

        })

        res.send(" Blog post sucessfully edited")

    } catch (error) {
        console.log(error)
    }

}


// to print out a blog
module.exports = aBlog = async(req, res) => {
    let ID = req.params.id
    console.log(ID)
        // Select * from users
    try {
        let blog = await blogModel.findById(ID).populate({
            path: 'user',
            select: 'name email'
        }).exec();
        res.send(blog);
    } catch (error) {
        console.log(error);
    }
}


// deleting a post
module.exports = deleteBlog = async(req, res) => {
    const { id, imageName, commentID } = req.body;
    let success = await blogModel.findByIdAndDelete(id);
    if (!success) {
        res.send("unable to delete");
    }
    if (success) {
        console.log("blog post deleted");
    }


}