const mongoose = require('mongoose');
const Vehicle = mongoose.model('Vehicle');
const User = mongoose.model('User');
const vehiclesData = require('../models/vehicles-test.json');
const usersData = require('../models/users-test.json');

function Latch(limit) {
    this.limit = limit;
    this.count = 0;
    this.waitBlock = function () {
    };
};

Latch.prototype.async = function (fn, ctx) {
    var _this = this;
    setTimeout(function () {
        fn.call(ctx, function () {
            _this.count = _this.count + 1;
            if (_this.limit <= _this.count) {
                _this.waitBlock.call(_this.waitBlockCtx);
            }
        });
    }, 0);
};

Latch.prototype.await = function (callback, ctx) {
    this.waitBlock = callback;
    this.waitBlockCtx = ctx;
};

const addSampleData = (req, res) => {
    //TODO
    console.log("test 33");
    var message = "Sample data is successfully added.";
    var barrier = new Latch(usersData.length + vehiclesData.length);

    barrier.async(function (end) {
        for (var userData of usersData) {
            const user = new User();
            user.username = userData.username;
            user.firstname = userData.firstname;
            user.lastname = userData.lastname;
            user.phone_number = userData.phone_number;
            user.email = userData.email;
            user.profile_picture = userData.profile_picture;
            user.location = userData.location;
            user.favourite_vehicles_ids = userData.favourite_vehicles_ids;
            user.is_admin = userData.is_admin;

            user.setPassword(userData.password);
            user.checkPassword(userData.password);
            user.generateJwt();
            console.log(user);

            User
                .findOne({email: userData.email})
                .exec((error, foundUser) => {
                    if (!foundUser) {
                        user.save(user, (error, upo) => {
                            if (error) {
                                message = error;
                                console.log(message);
                            }
                            end();
                        });
                    } else
                        end();
                });

        }
    });

    barrier.async(function (end) {
        for (var vehicleData of vehiclesData) {
            const user = new User();
            user.username = userData.username;
            user.firstname = userData.firstname;
            user.lastname = userData.lastname;
            user.phone_number = userData.phone_number;
            user.email = userData.email;
            user.profile_picture = userData.profile_picture;
            user.location = userData.location;
            user.favourite_vehicles_ids = userData.favourite_vehicles_ids;
            user.is_admin = userData.is_admin;

            user.setPassword(userData.password);
            user.checkPassword(userData.password);
            user.generateJwt();
            console.log(user);

            User
                .findOne({email: userData.email})
                .exec((error, foundUser) => {
                    if (!foundUser) {
                        user.save(user, (error, upo) => {
                            if (error) {
                                message = error;
                                console.log(message);
                            }
                            end();
                        });
                    } else
                        end();
                });

        }
    });

    barrier.await(function () {
        res.status(200).json({"message": message});
    });

};

const deleteAllData = (req, res) => {
    Vehicle.collection.drop();
    User.collection.drop();
    res.status(200).json({"sporočilo": "Vsebina podatkovne baze je bila uspešno izbrisana."});
};

module.exports = {
    addSampleData,
    deleteAllData
}
