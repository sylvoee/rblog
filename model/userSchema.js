let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    name: String,
    email: String,
    password: String,
    createAt: { type: Date, default: Date.now }
});

//creating a Model

let userModel = mongoose.model('User', userSchema);
// exporting the user model
module.exports = userModel;