const userModel = require("../model/userSchema");

module.exports = getRegister = (req, res) => {
    res.render('register');
}

module.exports = postRegister = (req, res) => {

    const { name, email, password, confirmPasword } = req.body;
    let aUser = new userModel({
        name,
        email,
        password,
        confirmPasword
    });

    aUser.save();
    res.send("User registered successfully");

}