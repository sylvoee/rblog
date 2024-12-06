const mongoose = require('mongoose');

let blogSchema = new mongoose.Schema({
    id: {type:mongoose.Schema.Types.ObjectId},
    title : String,
    description : String,
    image:String,
    createdAt : {type: Date, default: Date.now}
});

//making a model
let userModel = mongoose.model('blog', blogSchema);
module.exports = userModel ;