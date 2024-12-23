const userModel = require("../model/userSchema");
const bcrypt = require('bcrypt');


module.exports = getRegister = (req, res) => {
    res.send("Login is " + req.session.setLogin + " user : " + req.session.user);
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

    } //  post login controller
module.exports = postLogin = async(req, res, next) => {
    // res.status(200).send('login reached');
    const { email, password, status } = req.body;

    // if already login, pls redirect
    if (req.session.setLogin == true) {
        res.redirect('/');
    } else {


        if (password.length < 1 || email.length < 1) {
            console.log("email/password must not be empty");
            res.status(200).send("email/password must not be empty");

        } else {

            let data = await userModel.findOne({ email }).exec();

            await bcrypt.compare(password, data.password, (err, isMatch) => {
                if (isMatch) {
                    let { _id, name, email, status } = data;
                    let newData = { _id, name, email, status };
                    req.session.setLogin = true;
                    req.session.user = newData;
                    console.log(req.session);
                    res.status(200).send({ isLogin: req.session.setLogin, user: req.session.user });


                } else {
                    res.status(200).send("email or/and password does not exist");
                    console.log("email or/and password does not exist");
                }
            });

        }

    }

}

// logout controller
module.exports = logout = (req, res) => {
    req.session.setLogin = false;
    req.session.destroy(() => {
        //  res.cookie({maxAge: 0});
        res.redirect('/');
        console.log("You are Logout");
    });


}