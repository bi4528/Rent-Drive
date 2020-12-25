const mongoose = require('mongoose');
const Vehicle = mongoose.model('Vehicle');
const User = mongoose.model('User');
const Review = mongoose.model('Review');
const Rented = mongoose.model('Rented');
const vehiclesData = require('../models/vehicles-test.json');
const usersData = require('../models/users-test.json');
const rentedData = require('../models/rented-test.json');

var userArray = new Array();
var vehicleArray = new Array();

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

    var message = "Sample data is successfully added.";
    var barrier = new Latch(usersData.length);

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


            User
                .findOne({email: userData.email})
                .exec((error, foundUser) => {
                    if (!foundUser) {
                        user.save(user, (error, upo) => {

                            if (error) {
                                message = error;
                            }
                            else{
                                //console.log("napravio");
                                userArray.push(upo);
                            }
                            end();
                        });

                    } else
                        end();
                });

        }
    });

    barrier.await(function () {
        addVehicles();
        res.status(200).json({"message": message});
    });

};


const addVehicles = () => {
    var barrier = new Latch(vehiclesData.length);
    barrier.async(function (end) {
        for (var vehicleData of vehiclesData) {
            var x = Math.floor(Math.random() * userArray.length);
            const vehicle = new Vehicle();
            vehicle.images = vehicleData.images;
            vehicle.owner_id = userArray[x]._id;
            vehicle.make = vehicleData.make;
            vehicle.model = vehicleData.model;
            vehicle.typeoffuel = vehicleData.typeoffuel;
            vehicle.category = vehicleData.category;
            vehicle.hp = vehicleData.hp;
            vehicle.maxspeed = vehicleData.maxspeed;
            vehicle.acceleration = vehicleData.acceleration;
            vehicle.consumption = vehicleData.consumption;
            vehicle.seats = vehicleData.seats;
            vehicle.doors = vehicleData.doors;
            vehicle.AirConditioning = vehicleData.AirConditioning;
            vehicle.Navigation = vehicleData.Navigation;
            vehicle.USB = vehicleData.USB;
            vehicle.AUX = vehicleData.AUX;
            vehicle.parkingsensors = vehicleData.parkingsensors;
            vehicle.autopilot = vehicleData.autopilot;
            vehicle.bluetooth = vehicleData.bluetooth;
            vehicle.accessibility = vehicleData.accessibility;
            vehicle.description = vehicleData.description;
            vehicle.price = vehicleData.price;
            vehicle.country = vehicleData.country;
            vehicle.city = vehicleData.city;
            vehicle.addres = vehicleData.addres;
            vehicle.zip = vehicleData.zip;
            vehicle.date = vehicleData.date;
            vehicle.reviews = vehicleData.reviews;
            for (var review of vehicle.reviews) {
                var y = Math.floor(Math.random() * userArray.length);
                if (x == y){
                    y = (y + 1) %  userArray.length;
                }
                review.user_id = userArray[y]._id;
                review.username = userArray[y].username;
                review.img = userArray[y].profile_picture;
            }
            vehicle.luggage = vehicleData.luggage;
            vehicle.minage = vehicleData.minage;

            vehicle.save(vehicle, (error, upo) => {
                if (error) {
                    message = error;
                }
                else {
                    console.log(upo);
                    vehicleArray.push(upo);
                }
                end();
            });

        }

    });

    barrier.await(function () {
        addRented();
    });
}

const addRented = () => {
    var barrier = new Latch(rentedData.length);

    barrier.async(function (end) {

        for (var rentData of rentedData) {
            var x = Math.floor(Math.random() * userArray.length);
            var y = Math.floor(Math.random() * vehicleArray.length);
            if (vehicleArray[y].owner_id == userArray[x]._id){
                x = (x + 1) %  userArray.length;
            }
            const rent = new Rented();
            rent.date_from = rentData.dateFrom;
            rent.date_to = rentData.dateTo;
            rent.vehicle_id = vehicleArray[y]._id;
            rent.user_id = userArray[x]._id;

            rent.save(rent, (error, upo) => {
                if (error) {
                    message = error;
                }
                //end();
            });
        }
    })

    barrier.await();
}

const deleteAllData = (req, res) => {
    userArray.splice(0, userArray.length);
    vehicleArray.splice(0, vehicleArray.length);
    Rented.collection.drop();
    Vehicle.collection.drop();
    User.collection.remove( { is_admin : false });
    res.status(200).json({"sporočilo": "Vsebina podatkovne baze je bila uspešno izbrisana."});
};

module.exports = {
    addSampleData,
    deleteAllData
}
