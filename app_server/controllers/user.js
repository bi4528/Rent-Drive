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
    mail = req.params.mail;
    password = req.params.password;

    axios
        .get(apiParametri.streznik + '/api/user/check_login', {
            params: req.params
        })
        .then((user_id) => {
            if (user_id && user_id != null) {
                req.session.user_id= user_id;
                mainController.home(req, res);
            } else {
                res.send(500).json("Error mail or password not correct");
            }
        })
        .catch(() => {
            res.send(500).json("Error mail or password not correct");
        });
};

const user_register = (req, res) => {

    check_if_email_exists(req, res, function(exists){
        if(!exists){
            axios.post(apiParametri.streznik + '/api/users/', {
                    params: req.params
                })
                .then((user) => {
                    if (user != null) {
                        req.session.user_id = user.id;
                        mainController.home(req, res);
                    } else {
                        res.send(500).json("Error mail or password not correct");
                    }
                })
                .catch(() => {
                    res.send(500).json("Error while creating new user");
                });
        } else {
            //IZPISI NAPAKO
        }
    });

    
};

const check_if_email_exists = (req, res, callback) => {
    axios.get(apiParametri.streznik + '/api/user/check_mail', {
            params: req.params
        })
        .then((exists) => {
            callback(exists);
        })
        .catch(() => {
            res.send(500).json("Mail already exists");
        });
};

const user_logout = (req, res) => {
    if (req.session) {
        req.session.destroy(function (err) {
            if (err) {
                res.send(500).json("Cannot destroy session");
            } else {
                mainController.home(req, res);
            }
        });
    } else {
        res.send(200).json("No session logged");
    }
};

const login_attempt = (req, res) => {
    //console.log(usersJSON.users);
    var success = false;
    for (var i = 0; i < usersJSON.users.length; i++) {
        //console.log(usersJSON.users[i].email);
        //console.log(usersJSON.users[i].password);
        if(usersJSON.users[i].email == req.body.email && usersJSON.users[i].password==req.body.password) {
            success = true;
            break;
        }
    }
    if (success) res.render('home', dataJSON);
    else {
        res.render('login',  {layout: 'account-layout.hbs', failed_login: true});
    } 
};

const register = (req, res) => {
    res.render('register', {
        layout: 'account-layout.hbs'
    });
};

const register_attempt = (req,res) => {
    usersJSON.users.push(JSON.parse(JSON.stringify(req.body)));
    console.log(usersJSON.users);
    fs.writeFile('app_server/models/users.json', JSON.stringify(usersJSON,null,'\t'), function (err) {
        if (err) throw err;
    });
    res.render('login', {
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

const profile = (req, res) => {
    axios.get(apiParametri.streznik + '/api/users/' + req.body.idUser, {
            params: req.params
        })
        .then((user) => {
            axios.get(apiParametri.streznik + '/api/users/' + req.body.idUser + '/vehicles', {
                    params: req.params
                })
                .then((vehicles) => {

                    vehicles = vehicles.map(function (vehicle) {
                        return { name: vehicle.model + " " + vehicle.make, image: vehicle.image }
                    });

                    axios.get(apiParametri.streznik + '/api/users/' + req.body.idUser + '/favourite_vehicles', {
                            params: req.params
                        })
                        .then((favourite_vehicles) => {
                            favourite_vehicles = favourite_vehicles.map(function (favourite_vehicle) {
                                return {
                                    name: favourite_vehicle.model + " " + favourite_vehicle.make,
                                    image: favourite_vehicle.image
                                }
                            });

                            res.render('profile', {
                                firstname: user.firstname,
                                lastname: user.lastname,
                                mail: user.email,
                                phone_number: user.phone_number,
                                location: user.location,
                                profile_picture: user.profile_picture,

                                owned_cars: vehicles,
                                favourite_cars: favourite_vehicles

                            });
                        })
                        .catch(() => {
                            res.send(500).json("Error while searching user");
                        });
            })
            .catch(() => {
                res.send(500).json("Error while searching user");
            });
            
        })
        .catch(() => {
            res.send(500).json("Error while searching user");
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

module.exports = {
    login,
    login_attempt,
    register,
    register_attempt,
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
    confirm
};