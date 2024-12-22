const userModel = require("../model/userSchema");
const bcrypt = require('bcrypt');


module.exports = getRegister = (req, res) => {
    res.render('register');
}

module.exports = postRegister = async(req, res) => {
    let error = [];

    const { name, email, password, confirmPassword } = req.body;

    // check for undefined
    if (typeof name != 'undefined' || typeof email != 'undefined' ||
        typeof password != 'undefined' || typeof confirmPassword != 'undefined') {

        // to check if field is empty
        if (name.toString().length == 0 || email.toString().length == 0 || password.toString().length == 0) {
            // pusth errror to the error array
            error.push("No field should be empty");
        }

        // makingsure the email field contains '@'
        if (email.toString().includes('@') == false) {
            error.push("invalid email");
        }

        // to enter a password character that is more than 7
        if (password.length < 8) {
            error.push("Password character should be a minimum of eight");
        }

        // To check to see if EMAIL already exist
        let user = await userModel.findOne({ email: email })
        if (user) {
            error.push(email + " already exist");
            console.log(email + " already exist");
        }

        // make sure password and confirm password are the same
        if (password != confirmPassword) {
            error.push("confirm password, not the same as password");

        }
    } else {
        console.log("bad input");

    }


    // sinking record inti the database
    if (error.length < 1) {

        if (typeof password != 'undefined') {
            try {
                // making an instance and saving the data
                const hashPassword = bcrypt.hashSync(password, 10);
                let aUser = new userModel({
                    name,
                    email,
                    password: hashPassword,

                });



                aUser.save();
                res.send("User registered successfully");
            } catch (error) {
                console.log(error);
            }
        }
    } else {
        res.send(error);
    }

}