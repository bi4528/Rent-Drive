var nodemailer = require('nodemailer');
const axios = require('axios');
var apiParametri = {
    streznik: 'http://localhost:' + (process.env.PORT || 3000)
};
if (process.env.NODE_ENV === 'production') {
    apiParametri.streznik = 'https://rent&drive.herokuapp.com'; //POPRAVI CE NI PRAVILNO IME
}

const mainController = require('./main');


var dataJSON = require('../models/avti-seznam.json');
var usersJSON = require('../models/users.json');
var fs = require('fs');

/* GET profile.hbs */
const login = (req, res) => {
    res.render('login', {
        layout: 'account-layout.hbs'
    });
};

const user_login = (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    axios.get(apiParametri.streznik + '/api/users/check/exists', {
            params: {
                email: email,
                password: password
            }
        })
        .then((response) => {
            if (response.data != null) {
                req.session.user_id = response.data;
                console.log(req.session);
                res.redirect('/');

            } else {
                show_login_failed(req, res, "Uporabnik ni bil najden.");
            }
        })
        .catch((error) => {
            console.log(error);
            show_login_failed(req, res, "Napaka na strani APIja.")
        });
};

function show_login_failed(req, res, message) {
    res.render('login', {
        layout: 'account-layout.hbs',
        alert_error: message
    });
}

const user_register = (req, res) => {
    check_if_email_exists(req, res, function (exists, error) {

        if (error) {
            show_register_failed(req, res, "Napaka na strani streznika.");
        } else if (!exists) {
            axios.post(apiParametri.streznik + '/api/users', {
                    params: {
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        email: req.body.email,
                        password: req.body.password,
                        firstname: req.body.firstname,
                    }
                })
                .then((response) => {
                    if (response.data != null) {
                        console.log(response.data);
                        req.session.user_id = response.data._id;
                        res.redirect('/');
                    } else {
                        show_register_failed(req, res, "Error mail or password not correct");
                    }
                })
                .catch((error) => {
                    console.log(error);
                    show_register_failed(req, res, "Napaka med ustvarjaljem uporabnika.");
                });
        } else {
            show_register_failed(req, res, "Uporabnik s tem mailom ze obstaja.");
        }
    });
};

function show_register_failed(req, res, message) {
    res.render('register', {
        layout: 'account-layout.hbs',
        alert_error: message
    });
}

const check_if_email_exists = (req, res, callback) => {
    axios.get(apiParametri.streznik + '/api/users/check/exists_mail', {
            params: {
                email: req.body.email
            }
        })
        .then((odgovor) => {
            callback(odgovor.data, null);
        })
        .catch((error) => {
            callback(null, error);
        });
};

const user_logout = (req, res) => {
    if (req.session) {
        req.session.destroy(function (err) {
            if (err) {
                show_failed_logout(req, res, "Napaka pri reset seje");
            } else {
                res.redirect('/');
            }
        });
    } else {
        show_failed_logout(req, res, "Seja uporabnika ne obstaja");
    }
};

function show_failed_logout(req, res, message) {
    res.render('profile', {
        alert_error: message
    });
}

const register = (req, res) => {
    res.render('register', {
        layout: 'account-layout.hbs'
    });
};

const forgotpassword = (req, res) => {
    res.render('forgotpassword', {
        layout: 'account-layout.hbs'
    });
};

const forgot_password_recover = (req, res) => {
    const email_recover_password = req.body.email


    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'skupina01.sp@gmail.com',
            pass: 'lavbicsp'
        }
    });

    var mailOptions = {
        from: 'skupina01.sp@gmail.com',
        to: email_recover_password,
        subject: 'Recover Password - Rent&Drive',
        text: 'Click on this link generate reset password link'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            login(req, res);
        }
    });
}


const logged_user_profile = (req, res) => {
    profile(req, res);
};

const profile = (req, res) => {
    const is_user_logged = req.session.user_id != null;
    var idUser = req.body.idUser != null ? req.body.idUser : req.session.user_id;
    console.log(idUser);

    axios.get(apiParametri.streznik + '/api/users/' + idUser, {
            params: req.body.params
        })
        .then((response) => {
            console.log(response.data);
            var user = response.data;
            axios.get(apiParametri.streznik + '/api/users/' + idUser + '/vehicles', {
                    params: req.body.params
                })
                .then((response) => {
                    var vehicles = response.data;
                    vehicles = vehicles.map(function (vehicle) {
                        return {
                            name: vehicle.model + " " + vehicle.make,
                            image: vehicle.image,
                            show_controls: true
                        }
                    });
                    console.log(vehicles);

                    axios.get(apiParametri.streznik + '/api/users/' + idUser + '/favourite_vehicles', {
                            params: req.params
                        })
                        .then((response) => {
                            var favourite_vehicles = response.data;
                            favourite_vehicles = favourite_vehicles.map(function (favourite_vehicle) {
                                return {
                                    name: favourite_vehicle.model + " " + favourite_vehicle.make,
                                    image: favourite_vehicle.image
                                }
                            });

                            console.log(favourite_vehicles);


                            res.render('profile', {
                                firstname: user.firstname,
                                lastname: user.lastname,
                                mail: user.email,
                                phone_number: user.phone_number,
                                location: user.location,
                                profile_picture: user.profile_picture ? user.profile_picture : "/images/avatarUser.png",
                                owned_cars: vehicles.length > 0 ? vehicles : [{
                                    name: "Add a vehicle",
                                    image: "/images/car_1.jpg",
                                    show_controls: false
                                }],
                                favourite_cars: favourite_vehicles.length > 0 ? favourite_vehicles : [{
                                    name: "Like a vehicle",
                                    image: "/images/car_1.jpg"
                                }],

                                user_logged: is_user_logged


                            });
                        })
                        .catch((error) => {
                            console.log(error);
                            res.sendStatus(500).json("Error while searching favourite vehicles of user");
                        });
                })
                .catch((error) => {
                    console.log(error);
                    res.sendStatus(500).json("Error while searching vehicles of user");
                });

        })
        .catch((error) => {
            console.log(error);
            res.sendStatus(500).json("Error while searching user");
        });

};

const edit_profile_action = (req, res) => {
    console.log(req);
};


const edit_profile = (req, res) => {

    res.render('edit_profile', {
        firstname: 'Tone',
        lastname: 'Bine',
        mail: 'josh_smith@gmail.com',
        phone_number: '+38670789654',
        location: 'Koper, Slovenia',
        profile_picture: '/images/car_1.jpg',

        owned_cars: [{
                name: 'ferrari',
                image: '/images/car_2.jpg'
            },
            {
                name: 'mustang',
                image: "/images/car_3.jpg"
            }
        ],
        favourite_cars: [{
                name: 'ferrari',
                image: '/images/car_2.jpg'
            },
            {
                name: 'mustang',
                image: "/images/car_3.jpg"
            }
        ]

    });
};

const tuji_profile = (req, res) => {
    res.render('tuji_profile', {
        firstname: 'Tone',
        lastname: 'Bine',
        mail: 'josh_smith@gmail.com',
        phone_number: '+38670789654',
        location: 'Koper, Slovenia',
        profile_picture: '/images/car_1.jpg',

        owned_cars: [{
                name: 'ferrari',
                image: '/images/car_2.jpg'
            },
            {
                name: 'mustang',
                image: "/images/car_3.jpg"
            }
        ],
        favourite_cars: [{
                name: 'ferrari',
                image: '/images/car_2.jpg'
            },
            {
                name: 'mustang',
                image: "/images/car_3.jpg"
            }
        ]

    });
};

const book = (req, res) => {
    res.render('book', {
        layout: 'layout.hbs'
    });
};

const confirm = (req, res) => {
    res.render('confirm', {
        layout: 'account-layout.hbs'
    });
};

const resetpassword = (req, res) => {
    res.render('resetpassword', {
        layout: 'account-layout.hbs'
    });
};

const resetpassword_submit = (req, res) => {
    console.log(req);
    res.render('login', {
        layout: 'account-layout.hbs'
    });
};

const user_delete = (req, res) => {
    const user_id = req.session.user_id;
    console.log("User delete");
    console.log(user_id);
    axios.delete(apiParametri.streznik + '/api/users/' + user_id, {
            params: {
                idUser: user_id
            }
        })
        .then((response) => {
            user_logout(req, res);
        })
        .catch((error) => {
            console.log(error);
            show_failed_delete_user(req, res, "Error while deleting user");
        });
}

function show_failed_delete_user(req, res, message) {
    res.send("profile", {
        alert_error: message
    });
}

module.exports = {
    login,
    register,
    forgotpassword,
    resetpassword,
    resetpassword_submit,
    profile,
    edit_profile,
    tuji_profile,
    edit_profile_action,
    forgot_password_recover,
    user_login,
    user_logout,
    user_register,
    book,
    confirm,
    logged_user_profile,
    user_delete
};