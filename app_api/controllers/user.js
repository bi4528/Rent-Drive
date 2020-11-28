var nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Vehicle = mongoose.model('Vehicle');
const validate = require('./../../public/javascripts/validate');

const get_all_users = (req, res) => {
    User.find({}, function(error, user) {
        
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
    
    var firstname = req.body.params.firstname;
    var lastname = req.body.params.lastname;
    var phone_number = req.body.params.phone_number;
    var email = req.body.params.email;
    var location = req.body.params.location;
    var password = req.body.params.password;
    var profile_picture = req.body.params.profile_picture;
    var favourite_vehicles_ids = req.body.params.favourite_vehicles_ids;

    if (!validate.validate_first_name(firstname)) {
        res.status(404).json({
            "message": "Firstname is not correct."
        });
    } else if (!validate.validate_last_name(lastname)) {
        res.status(404).json({
            "message": "Lastname is not correct."
        });
    } else if (phone_number != null && !validate.validate_phone_number(phone_number)) {
        res.status(404).json({
            "message": "Phone number is not correct."
        });
    } else if (!validate.validate_email(email)) {
        res.status(404).json({
            "message": "Email is not correct."
        });
    } else if (!validate.validate_password(password)) {
        res.status(404).json({
            "message": "Password is not correct."
        });
    } else {
        User.create({
            firstname : firstname,
            lastname : lastname,
            phone_number : phone_number,
            email : email,
            location : location,
            password : password,
            profile_picture : profile_picture,
            favourite_vehicles_ids : favourite_vehicles_ids
        }, (error, user) => {
            if (error) {
                console.log(error);
                res.status(400).json(error);
            } else {
                res.status(201).json(user);
            }
        });
    }
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
                "message": "User not found2."
            });
        } else if (error) {
            return res.status(500).json(error);
        }
        res.status(200).json(user);
    });
};

const updated_profile_data = (req, res) => {
    console.log(req.body.params);

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
    }
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
            user.lastname = lastname;
            user.email = email;
            user.phone_number = phone_number;
            user.location = location;
            user.password = password;
            user.profile_picture = profile_picture;

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

const add_favourite_vehicle = (req, res) => {
    User.findById(req.params.idUser).exec((error, user) => {
        if (!user) {
            return res.status(404).json({
                "message": "User not found3."
            });
        } else if (error) {
            return res.status(500).json(error);
        } else {
            user.favourite_vehicles_ids.push(req.body.favourite_vehicles_id);
            user.save((error, user) => {
                if (error) {
                    res.status(404).json(error);
                } else {
                    res.status(200).json(user);
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
            id: {
                $in: user.favourite_vehicles_ids
            }
        }).exec((error, vehicles) => {
            if (!vehicles) {
                return res.status(404).json({
                    "message": "Favourite vehicles not found."
                });
            } else if (error) {
                return res.status(500).json(error);
            }
            res.status(200).json(vehicles);
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

module.exports = {
    get_user_data,
    remove_user,
    create_new_user,
    updated_profile_data,
    check_if_user_exists,
    check_if_mail_exists,
    get_all_users,
    add_favourite_vehicle,
    remove_favourite_vehicle,
    get_favourite_vehicles,
    get_vehicles_of_user
};