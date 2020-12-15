const mongoose = require('mongoose');
const User = mongoose.model('User');
const Vehicle = mongoose.model('Vehicle');
const Rented = mongoose.model('Rented');
const passport = require('passport');


const get_all_users = (req, res) => {
    User.find({}, function (error, user) {

        if (!user) {
            return res.status(404).json({
                "message": "User not found."
            });
        } else if (error) {
            return res.status(500).json(error);
        } else {
            res.status(200).json(user);
        }
    });
};

const create_new_user = (req, res) => {

    var firstname = req.body.firstname || req.body.params.firstname;
    var username = req.body.username || req.body.params.username;
    var lastname = req.body.lastname || req.body.params.lastname;
    var phone_number = (req.body.phone_number != '' ? req.body.phone_number : null) || ((req.body.params != null && req.body.params.phone_number != '') ? req.body.params.phone_number : null);
    var email = req.body.email || req.body.params.email;
    var location = (req.body.location != '' ? req.body.location : null) || ((req.body.params != null && req.body.params.location != '') ? req.body.params.location : null);
    var password = req.body.password || req.body.params.password;
    var profile_picture = (req.body.profile_picture != '' ? req.body.profile_picture : null) || ((req.body.params != null && req.body.params.profile_picture != '') ? req.body.params.profile_picture : null);
    var favourite_vehicles_ids = (req.body.favourite_vehicles_ids != [] ? req.body.favourite_vehicles_ids : []) || ((req.body.params != null && req.body.params.favourite_vehicles_ids != []) ? req.body.params.favourite_vehicles_ids : []);

    console.log(username);
    console.log(firstname);
    console.log(lastname);
    console.log(email);
    console.log(phone_number);
    console.log(password);

    if (!validate_no_spaces(username)) {
        res.status(404).json({
            "message": "Username must be one word."
        });
    } else if (!validate_first_name(firstname)) {
        res.status(404).json({
            "message": "Firstname is not correct."
        });
    } else if (!validate_last_name(lastname)) {
        res.status(404).json({
            "message": "Lastname is not correct."
        });
    } else if (phone_number != null && !validate_phone_number(phone_number)) {
        res.status(404).json({
            "message": "Phone number is not correct."
        });
    } else if (!validate_email(email)) {
        res.status(404).json({
            "message": "Email is not correct."
        });
    } else if (!validate_password(password)) {
        res.status(404).json({
            "message": "Password is not correct."
        });
    } else {
        console.log("Hello form api2");

        const new_user = new User();
        console.log(1);
        new_user.username = username;
        console.log(1);
        new_user.firstname = firstname;
        console.log(1);
        new_user.lastname = lastname;
        console.log(1);
        new_user.phone_number = phone_number;
        console.log(1);
        new_user.email = email;
        console.log(1);
        new_user.location = location;
        console.log(1);
        new_user.setPassword(password);
        new_user.profile_picture = profile_picture;
        new_user.favourite_vehicles_ids = favourite_vehicles_ids;

        new_user.save(error => {
            if (error) {
                if (error.name == "MongoError" && error.code == 11000) {
                    res.status(409).json({
                        "message": "User with that email already exists"
                    });
                } else {
                    res.status(500).json(error);
                }
            } else {
                res.status(200).json({
                    "token": new_user.generateJwt()
                });
            }
        });
        
    }
};

const login = (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            "message": "Zahtevani so vsi podatki"
        });
    }
    passport.authenticate('local', (error, user, informations) => {
        if (error)
            return res.status(500).json(error);
        if (user) {
            res.status(200).json({
                "token": user.generateJwt()
            });
        } else {
            console.log(informations);
            res.status(401).json(informations);
        }
    })(req, res);
};


const remove_user = (req, res) => {
    User.findByIdAndRemove(req.params.idUser).exec((error) => {
        if (error) {
            return res.status(500).json(error);
        } else {
            return res.status(204).json(null);
        }
    });
};

const get_user_data = (req, res) => {
    User.findById(req.params.idUser).exec((error, user) => {
        if (!user) {
            return res.status(404).json({
                "message": "User not found."
            });
        } else if (error) {
            return res.status(500).json(error);
        } else {
            if (user.profile_picture == null) {
                user.profile_picture = "/images/avatarUser.png";
            }
            res.status(200).json(user);
        }
    });
};

const get_user_data_by_email = (req, res) => {
    console.log("Fetch user by mail");
    console.log(req.params);
    User.find({
            email: req.params.emailUser
        })
        .exec((error, users) => {
            if (!users || users.length == 0) {
                return res.status(404).json({
                    "message": "User not found."
                });
            } else if (error) {
                return res.status(500).json(error);
            } else {
                var user = users[0]
                if (user.profile_picture == null) {
                    user.profile_picture = "/images/avatarUser.png";
                }
                res.status(200).json(user);
            }
        });
};



const updated_profile_data = (req, res) => {
    console.log(req.body.params);
    var username = req.body.params.username;
    var firstname = req.body.params.firstname;
    var lastname = req.body.params.lastname;
    var phone_number = req.body.params.phone_number;
    var email = req.body.params.email;
    var location = req.body.params.location;
    var password = req.body.params.password;
    var profile_picture = req.body.params.profile_picture;

    if (!req.body.params.idUser) {
        return res.status(404).json({
            "message": "No given user id"
        });
    } else if (!validate_no_spaces(username)) {
        console.log("Hello");
        res.status(404).json({
            "message": "Username must be one word."
        });
    } else if (!validate_first_name(firstname)) {
        res.status(404).json({
            "message": "Firstname is not correct."
        });
    } else if (!validate_last_name(lastname)) {
        res.status(404).json({
            "message": "Lastname is not correct."
        });
    } else if (phone_number != null && phone_number != "" && !validate_phone_number(phone_number)) {
        res.status(404).json({
            "message": "Phone number is not correct."
        });
    } else if (!validate_email(email)) {
        res.status(404).json({
            "message": "Email is not correct."
        });
    } else if (!validate_password(password)) {
        res.status(404).json({
            "message": "Password is not correct."
        });
    } else {
        User.findById(req.body.params.idUser).exec((error, user) => {

            if (!user) {
                return res.status(404).json({
                    "message": "No user found!"
                });
            } else if (error) {
                console.log(error);
                return res.status(500).json(error);
            } else {
                user.firstname = firstname;
                user.username = username;
                user.lastname = lastname;
                user.email = email;
                user.phone_number = phone_number;
                user.location = location;
                user.password = password;
                if (profile_picture != null) user.profile_picture = profile_picture;

                user.save((error, user) => {

                    if (error) {
                        res.status(404).json(error);
                    } else {
                        res.status(200).json(true);
                    }
                });
            }
        });
    }
};

const check_if_user_exists = (req, res) => {
    User.find({
        email: req.query.email,
        password: req.query.password
    }).limit(1).exec((napaka, users) => {
        if (napaka) {
            return res.status(500).json(napaka);
        } else if (!users || !users[0]) {
            return res.status(200).json(null);
        } else {
            res.status(200).json(users[0]._id);
        }
    });
};

const check_if_mail_exists = (req, res) => {

    User.find({
        email: req.query.email
    }).exec((napaka, user) => {
        if (napaka) {
            return res.status(500).json(napaka);
        } else {
            return res.status(200).json(user != null ? user.length > 0 : false);
        }
    });
};

const toggle_favourite_vehicle = (req, res) => {
    User.findById(req.params.idUser).exec((error, user) => {
        if (!user) {
            return res.status(404).json({
                "message": "User not found3."
            });
        } else if (error) {
            return res.status(500).json(error);
        } else {
            if (user.favourite_vehicles_ids.includes(req.body.favourite_vehicles_id)) {
                user.favourite_vehicles_ids.remove(req.body.favourite_vehicles_id);
            } else {
                user.favourite_vehicles_ids.push(req.body.favourite_vehicles_id);
            }
            user.save((error, user) => {
                if (error) {
                    res.status(404).json(error);
                } else {
                    res.status(200).json(true);
                }
            });
        }
    });
};

const remove_favourite_vehicle = (req, res) => {
    User.findById(req.params.idUser).exec((error, user) => {
        if (!user) {
            return res.status(404).json({
                "message": "User not found4."
            });
        } else if (error) {
            return res.status(500).json(error);
        }
        user.favourite_vehicles_ids.remove(req.body.favourite_vehicles_id);
        user.save((error, user) => {
            if (error) {
                res.status(404).json(error);
            } else {
                res.status(200).json(user);
            }
        });
    });
};

const get_favourite_vehicles = (req, res) => {
    User.findById(req.params.idUser).select('favourite_vehicles_ids').exec((error, user) => {
        if (!user) {
            return res.status(404).json({
                "message": "User not found."
            });
        } else if (error) {
            return res.status(500).json(error);
        }

        Vehicle.find({
            _id: {
                $in: user.favourite_vehicles_ids
            }
        }).exec((error, vehicles) => {
            if (!vehicles) {
                return res.status(404).json({
                    "message": "Favourite vehicles not found."
                });
            } else if (error) {
                return res.status(500).json(error);
            } else {
                return res.status(200).json(vehicles);
            }
        });
    });
};

const get_vehicles_of_user = (req, res) => {


    Vehicle.find({
        owner_id: {
            $in: req.params.idUser
        }
    }).exec((error, vehicles) => {
        if (!vehicles) {
            return res.status(404).json({
                "message": "Vehicles not found."
            });
        } else if (error) {
            return res.status(500).json(error);
        } else {
            res.status(200).json(vehicles);
        }
    });
};

const reset_password = (req, res) => {

    const password = req.body.params.password;
    const password_repeated = req.body.params.password_repeated;
    const email = req.body.params.email;

    if (password != password_repeated) {
        res.status(404).json({
            "message": "Passwords are not equal."
        });
    } else if (!validate_password(password_repeated)) {
        res.status(404).json({
            "message": "Repeated password not valid."
        });
    } else if (!validate_password(password)) {
        res.status(404).json({
            "message": "Password not valid."
        });
    } else if (!validate_email(email)) {
        res.status(404).json({
            "message": "Email not valid."
        });
    } else {


        User.findById(req.params.idUser).exec((error, user) => {
            if (!user) {
                return res.status(404).json({
                    "message": "User not found."
                });
            } else if (error) {
                return res.status(500).json(error);
            } else {
                user.password = password;

                user.save((error, _) => {

                    if (error) {
                        res.status(404).json(error);
                    } else {

                        res.status(200).json(true);
                    }
                });
            }
        });
    }
};

const get_rents_of_user = (req, res) => {

    Rented.find({
        user_id: req.params.idUser
    }).exec((error, rents) => {
        if (!rents) {
            return res.status(404).json({
                "message": "Rents not found."
            });
        } else if (error) {
            return res.status(500).json(error);
        } else {
            res.status(200).json(rents);
        }
    });
};



module.exports = {
    get_user_data,
    remove_user,
    create_new_user,
    updated_profile_data,
    check_if_user_exists,
    check_if_mail_exists,
    get_all_users,
    toggle_favourite_vehicle,
    remove_favourite_vehicle,
    get_favourite_vehicles,
    get_vehicles_of_user,
    reset_password,
    get_user_data_by_email,
    get_rents_of_user,
    login
};

const email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const password_regex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
const make_regex = /\b[a-z]+\b/i;
const word_regex = /\b[a-z || A-Z]+\b/;
const phone_regex = /((?:\+|00)[17](?: |\-)?|(?:\+|00)[1-9]\d{0,2}(?: |\-)?|(?:\+|00)1\-\d{3}(?: |\-)?)?(0\d|\([0-9]{3}\)|[1-9]{0,3})(?:((?: |\-)[0-9]{2}){4}|((?:[0-9]{2}){4})|((?: |\-)[0-9]{3}(?: |\-)[0-9]{4})|([0-9]{7}))/;
const no_spaces = /^\S*$/;

function validate_first_name(name) {
    return validate_not_empty_string(name) && validate_word(name);
}

function validate_username(name) {
    return validate_not_empty_string(name);
}

function validate_phone_number(number) {
    return validate_not_empty_string(number) && phone_regex.test(number);
}


function validate_last_name(name) {
    return validate_not_empty_string(name) && validate_word(name);
}


function validate_word(name) {
    return name != null && word_regex.test(name);
}


function validate_not_empty_string(name) {
    return name != null && name.length > 0;
}

function validate_location(location) {
    return validate_not_empty_string(location);
}

function validate_email(email) {
    return validate_not_empty_string(email) && email_regex.test(email.toLowerCase())
}


/*
(?=.*[a-z])	The string must contain at least 1 lowercase alphabetical character
(?=.*[A-Z])	The string must contain at least 1 uppercase alphabetical character
(?=.*[0-9])	The string must contain at least 1 numeric character
(?=.*[!@#$%^&*])	The string must contain at least one special character, but we are escaping reserved RegEx characters to avoid conflict
(?=.{8,})	The string must be eight characters or longer
*/


function validate_password(password) {
    return validate_not_empty_string(password) && password_regex.test(password);
}

function validate_vehicle_speed(speed) {
    return parseInt(speed) > 0;
}

function validate_vehicle_number_of_doors(number_of_doors) {
    return number_of_doors > 0;
}

function validate_vehicle_age(age) {
    return age >= 0;
}

function validate_vehicle_luggage(l) {
    return l >= 0;
}



function validate_vehicle_price_per_day(price_per_day) {
    return price_per_day >= 0;
}

function validate_vehicle_make(make) {
    return make_regex.test(make);
}

function validate_vehicle_horespower(hp) {
    return /\b[0-9]+\b/.test(hp) && parseInt(hp) > 0;
}

function validate_acceleration(time) {
    return /\b([0-9]+.[0-9]+|[0-9]+,[0-9]+|[0-9]+)\b/.test(time);
}

function validate_vehicle_doors_seats(speed) {
    return parseInt(speed) > 0 && parseInt(speed) < 7;
}

function validate_vehicle_price_per_day(price) {
    return parseInt(price) > 0 && parseInt(price) < 5000;
}

function validate_phone(phone) {
    return /\b[0-9]+\b/.test(phone);
}

function validate_dates(date1, date2) {
    var date1 = new Date(date1);
    var date2 = new Date(date2);
    return date2 >= date1;
}

function validate_no_spaces(word) {
    return no_spaces.test(word);
}