const mongoose = require('mongoose');

let blogSchema = new mongoose.Schema({
    id: {type:mongoose.Schema.Types.ObjectId},
    title : String,
    description : String,
    image:String,

    user : {
    ref : 'User',
    required: true,
    type:mongoose.Schema.Types.ObjectId
},

    createdAt : {type: Date, default: Date.now}
});

//making a model
let blogModel = mongoose.model('Blog', blogSchema);
module.exports = blogModel ;