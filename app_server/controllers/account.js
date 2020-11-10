const login = (req, res) => {
    res.render('login', {layout:'account-layout.hbs'});
};

const register = (req, res) => {
    res.render('register', {layout:'account-layout.hbs'});
};

const forgotpassword = (req, res) => {
    res.render('forgotpassword', {layout:'account-layout.hbs'});
};

module.exports = {
    login,
    register,
    forgotpassword
};