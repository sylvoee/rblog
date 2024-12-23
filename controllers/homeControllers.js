module.expors = home = (req, res) => {
    // res.render('index', {});
    if (typeof req.session.setLogin != 'undefined') {
        res.render('index', { isLogin: req.session.setLogin, user: req.session.user });
    } else {
        res.render('index', { msg: "Home Page" });
    }
}