var nodemailer = require('nodemailer');
const axios = require('axios');
const multer = require("multer");

var apiParametri = {
    streznik: 'http://localhost:' + (process.env.PORT || 3000)
};
if (process.env.NODE_ENV === 'production') {
    apiParametri.streznik = 'https://rentdrive-sp.herokuapp.com/'; //POPRAVI CE NI PRAVILNO IME
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
    check_if_email_exists(req, res, req.body.email, function (exists, error) {

        if (error) {
            show_register_failed(req, res, "Napaka na strani streznika.");
        } else if (exists == false) {
            axios.post(apiParametri.streznik + '/api/users', {
                    params: {
                        username: req.body.username,
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        email: req.body.email,
                        password: req.body.password,
                        profile_picture: 'avatarUser.png',
                    }
                })
                .then((response) => {
                    if (response.data != null) {

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

const check_if_email_exists = (req, res, email, callback) => {
    axios.get(apiParametri.streznik + '/api/users/check/exists_mail', {
            params: {
                email: email
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
    const email_recover_password = req.body.email;

    check_if_email_exists(req, res, email_recover_password, function(exists, error) {
        if(error) {
            show_error_forgot_password(req, res, "Error while checking mail.");
        } else if (exists == null || exists == false) {
            show_error_forgot_password(req, res, "No user with that mail found.");
        } else {
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
                text: 'Click on http://localhost:3000/users/' + email_recover_password + '/resetpassword or https://rentdrive-sp.herokuapp.com/users/' + email_recover_password + '/resetpassword'
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                    show_error_forgot_password(req, res, "Error while sending mail.");
                } else {
                    console.log('Email sent: ' + info.response);
                    login(req, res);
                }
            });
        }
    })
}

function show_error_forgot_password(req, res, message) {
    res.render('forgotpassword', {
        layout: 'account-layout.hbs',
        alert_error: message
    })
}


const logged_user_profile = (req, res) => {
    profile(req, res);
};

const profile = (req, res) => {

    var idUser = req.params.idUser != null ? req.params.idUser : req.session.user_id;

    axios.get(apiParametri.streznik + '/api/users/' + idUser, {
            params: req.body.params
        })
        .then((response) => {

            var user = response.data;
            console.log(user);
            axios.get(apiParametri.streznik + '/api/users/' + idUser + '/vehicles', {
                    params: req.body.params
                })
                .then((response) => {
                    var vehicles = response.data;
                    vehicles = vehicles.map(function (vehicle) {
                        return {
                            name: vehicle.model + " " + vehicle.make,
                            image: vehicle.images[0],
                            id: vehicle._id,
                            show_controls: idUser == req.session.user_id
                        }
                    });

                    axios.get(apiParametri.streznik + '/api/users/' + idUser + '/favourite_vehicles', {
                            params: req.params
                        })
                        .then((response) => {
                            var favourite_vehicles = response.data;
                            favourite_vehicles = favourite_vehicles.map(function (favourite_vehicle) {
                                return {
                                    name: favourite_vehicle.model + " " + favourite_vehicle.make,
                                    image: favourite_vehicle.images[0],
                                    id: favourite_vehicle._id
                                }
                            });
                            console.log(favourite_vehicles);
                            
                            axios
                                .get(apiParametri.streznik + '/api/rented')
                                .then((odgovor) => {
                                    show_profile(req, res, user, vehicles, favourite_vehicles, odgovor.data);                                    
                                })
                                .catch((err) => {
                                    console.log(err);
                                });
                            
                            //show_profile(req, res, user, vehicles, favourite_vehicles);

                        })
                        .catch((error) => {
                            console.log(error);
                            show_failed_profile(req, res, "Error while searching favourite vehicles of user");
                        });
                })
                .catch((error) => {
                    console.log(error);
                    show_failed_profile(req, res, "Error while searching vehicles of user");
                });

        })
        .catch((error) => {
            console.log(error);
            show_failed_profile(req, res, "Error while searching user");
        });

};

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const edit_profile_action = (req, res) => {
    console.log(req.body);
    var upload = multer({
        storage: storage
    }).array('profile_picture', 1);
    upload(req, res, function (error) {

        if (error) {
            console.log(error);
            show_failed_edit_profile(req, res, "Unable to upload profile picture");
        } else if (req.files.length > 0) {
            req.body.profile_picture = req.files[0].filename;
            save_new_user_data(req, res);
        } else {
            save_new_user_data(req, res);
        }
    });

};

function save_new_user_data(req, res) {

    const user_id = req.session.user_id;
    axios.put(apiParametri.streznik + '/api/users/' + user_id, {
            params: {
                idUser: user_id,
                username: req.body.username,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.mail,
                password: req.body.password,
                location: req.body.location,
                phone_number: req.body.phone_number,
                profile_picture: req.body.profile_picture
            }
        })
        .then((response) => {
            if (response.data != null && response.data == true) {
                res.redirect('/users/my');
            } else {
                show_failed_edit_profile(req, res, "Sprememba podatkov ni bila uspešna.");
            }
        })
        .catch((error) => {
            console.log(error);
            show_failed_edit_profile(req, res, "Napaka med spreminjanjem podatkov uporabnika.");
        });
}

function show_failed_edit_profile(req, res, message) {
    const is_user_logged = req.session.user_id != null;
    res.render('edit_profile', {
        user_logged: is_user_logged,
        alert_error: message
    });
}

function show_profile(req, res, user, vehicles, favourite_vehicles, rented) {
    const is_user_logged = req.session.user_id != null;
    my_rented=[];
    for(let i=0; i<rented.length; i++){
        if(rented[i].user_id==user._id){
            rented[i].date_from=rented[i].date_from.substring(0,10);
            rented[i].date_to=rented[i].date_to.substring(0,10);
            my_rented.push(rented[i]);
        }
    }

    res.render('profile', {
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        mail: user.email,
        phone_number: user.phone_number,
        location: user.location,
        profile_picture: user.profile_picture ? user.profile_picture : "avatarUser.png",
        owned_cars: vehicles.length > 0 ? vehicles : [{
            name: "Add a vehicle",
            image: "car_1.jpg",
            show_controls: false
        }],
        favourite_cars: favourite_vehicles.length > 0 ? favourite_vehicles : [{
            name: "Like a vehicle",
            image: "car_1.jpg"
        }],
        my_rents: my_rented,
        user_logged: is_user_logged,
        is_profile_of_logged_user: req.session.user_id == user._id
    });
}

function show_failed_profile(req, res, message) {
    const is_user_logged = req.session.user_id != null;
    res.render('profile', {
        user_logged: is_user_logged,
        alert_error: message
    });
}


const edit_profile = (req, res) => {

    var idUser = req.body.idUser != null ? req.body.idUser : req.session.user_id;

    axios.get(apiParametri.streznik + '/api/users/' + idUser, {
            params: req.body.params
        })
        .then((response) => {

            const user = response.data;
            show_edit_profile(req, res, user);
        })
        .catch((error) => {
            console.log(error);
            show_failed_edit_profile(req, res, "Error while searching user");
        });
};

function show_edit_profile(req, res, user) {
    const user_id = req.session.user_id;
    res.render('edit_profile', {
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        mail: user.email,
        password: user.password,
        phone_number: user.phone_number,
        location: user.location,
        profile_picture: user.profile_picture ? user.profile_picture : "/images/avatarUser.png",
        user_logged: user_id != null,
        is_profile_of_logged_user: user_id == user._id
    });
}

const book = (req, res) => {
    res.render('book', {
        layout: 'layout.hbs'
    });
};

const confirm = (req, res) => {

    const user_id = req.session.user_id;

    axios.post(apiParametri.streznik + '/api/rented', {
            params: {
                my_id: req.body.my_id,
                vehicle_id: req.body.vehicle_id,
                date_from: req.body.date_from,
                date_to: req.body.date_to
            }
        })
        .then((response) => {
            if (response.data != null) {

                axios.get(apiParametri.streznik + '/api/users/' + req.body.my_id, {
                        params: {
                            my_id: req.body.my_id,
                            vehicle_id: req.body.vehicle_id,
                            date_from: req.body.date_from,
                            date_to: req.body.date_to
                        }
                    })
                    .then((response) => {

                        const email_to_send = response.data.email;

                        var transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                user: 'skupina01.sp@gmail.com',
                                pass: 'lavbicsp'
                            }
                        });

                        var mailOptions = {
                            from: 'skupina01.sp@gmail.com',
                            to: email_to_send,
                            subject: 'Confirm booking - Rent&Drive',
                            text: 'Thank you for choosing Rent&Drive. Rentan avto: https://rentdrive-sp.herokuapp.com/vehicles/' + req.body.vehicle_id + '.You can login by clicking https: //rentdrive-sp.herokuapp.com/users/login'
                        };

                        transporter.sendMail(mailOptions, function (error, info) {
                            if (error) {
                                console.log(error);
                                show_error_forgot_password(req, res, "Error while sending mail.");
                            } else {
                                console.log('Email sent: ' + info.response);
                            }
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                        //show_register_failed(req, res, "Napaka med ustvarjanjem.");
                        res.render('confirm', {
                            layout: 'account-layout.hbs',
                            confirm1: "Car is already booked!"
                        });
                    });

                res.render('confirm', {
                    layout: 'account-layout.hbs',
                    confirm1: "Your reservation has been processed successfully!"
                });
            } else {
                //show_register_failed(req, res, "Error mail or password not correct");
            }
        })
        .catch((error) => {
            console.log(error);
            //show_register_failed(req, res, "Napaka med ustvarjanjem.");
            res.render('confirm', {
                layout: 'account-layout.hbs',
                confirm1: "Car is already booked!"
            });
        });
};

const resetpassword = (req, res) => {
    res.render('resetpassword', {
        layout: 'account-layout.hbs',
        email: req.params.emailUser
    });
};

const resetpassword_submit = (req, res) => {
    console.log(req.body);

    const email = req.body.email;
    const password = req.body.password;
    const password_repeated = req.body.password_repeated;

    console.log(apiParametri.streznik + '/api/recover_password/' + email);

    
    axios.get(apiParametri.streznik + '/api/users/find/' + email, {
            params: {
                email: email
            }
        })
        .then((response) => {
            console.log(response.data);
            if (response.data != null) {
                const user = response.data;
                axios.post(apiParametri.streznik + '/api/users/recover_password/' + user._id, {
                        params: {
                            email: email,
                            password: password,
                            password_repeated: password_repeated
                        }
                    })
                    .then((response) => {
                        console.log(response.data);
                        if (response.data != null && response.data == true) {
                            res.render('login', {
                                layout: 'account-layout.hbs'
                            });
                        } else {
                            show_reset_password_failed(req, res, "Password not reset");
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        show_reset_password_failed(req, res, "Error while reseting password");
                    });
            } else {
                show_reset_password_failed(req, res, "Password not reset");
            }
        })
        .catch((error) => {
            console.log(error);
            show_reset_password_failed(req, res, "Error while reseting password");
        });
    

};

function show_reset_password_failed(req, res, message) {
    res.render('resetpassword', {
        layout: 'account-layout.hbs',
        email: req.body.email,
        alert_error: message
    });
}

const user_delete = (req, res) => {
    const user_id = req.session.user_id;

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

function show_failed_delete_user(req, res, message) {
    res.send("profile", {
        alert_error: message
    });
}

const remove_user_vehicle = (req, res) => {


    const vehicle_id = req.params.idVehicle;

    axios.delete(apiParametri.streznik + '/api/vehicles/' + vehicle_id, {
            params: {
                idVehicle: vehicle_id
            }
        })
        .then((response) => {
            profile(req, res);
        })
        .catch((error) => {
            console.log(error);
            show_failed_delete_vehicle(req, res, "Error while deleting vehicle");
        });
}

function show_failed_delete_vehicle(req, res, message) {
    const user_id = req.session.user_id;
    res.render('profile', {
        user_logged: user_id != null,
        alert_error: message
    })
}


module.exports = {
    login,
    register,
    forgotpassword,
    resetpassword,
    resetpassword_submit,
    profile,
    edit_profile,
    edit_profile_action,
    forgot_password_recover,
    user_login,
    user_logout,
    user_register,
    book,
    confirm,
    logged_user_profile,
    user_delete,
    remove_user_vehicle
};