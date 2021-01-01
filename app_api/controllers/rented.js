const mongoose = require('mongoose');
const Rented = mongoose.model('Rented');
const Vehicle = mongoose.model('Vehicle');
const User = mongoose.model('User');

const create_rented = (req, res) => {
    var d1 = req.body.date_from;
    var d2 = req.body.date_to;

    if (d1 > d2){
        return res.status(400).json({
            "message": "Bad time period selected!"
        });
    }
    else{
        User.find({
            _id: req.body.user_id
        }, function (error, odg){
            if (odg == undefined || odg.length == 0) {
                return res.status(404).json({
                    "message": "User not found!"
                });
            } else if (error) {
                return res.status(500).json(error);
            }
            else{
                Vehicle.find({
                    _id: req.body.vehicle_id
                }, function (error, odg){
                    if (odg == undefined || odg.length == 0) {
                        return res.status(404).json({
                            "message": "Vehicle not found!"
                        });
                    } else if (error) {
                        return res.status(500).json(error);
                    }
                    else{
                        Rented.find({

                            vehicle_id: req.body.vehicle_id,
                            date_from: { $lte: req.body.date_to },
                            date_to: { $gte: req.body.date_from }

                        }, function (error, renta) {
                            if (renta == undefined || renta.length == 0) {

                                Rented.create({
                                    user_id: req.body.user_id,
                                    vehicle_id: req.body.vehicle_id,
                                    date_from: req.body.date_from,
                                    date_to: req.body.date_to
                                }, (err, data) => {
                                    if (err) {
                                        //console.log(err.errors.date_from);
                                        if (err.errors.date_from && err.errors.date_to){
                                            res.status(400).json({
                                                "message": "Dates evaluated to a falsy values"
                                            });
                                        }
                                        else if (err.errors.date_from){
                                            res.status(400).json({
                                                "message": "Date_from evaluated to a falsy value"
                                            });
                                        }
                                        else if (err.errors.date_to){
                                            res.status(400).json({
                                                "message": "Date_to evaluated to a falsy value"
                                            });
                                        }
                                        else {
                                            //console.log("Error! Rented car wasn't saved successfully!!");
                                            res.status(500).json(err);
                                        }
                                    } else {
                                        //console.log("Rented car saved successfully!");
                                        return res.status(200).json(data);
                                    }
                                });
                            } else if (error) {
                                return res.status(500).json(error);
                            } else {
                                return res.status(409).json({
                                    "message": "Car is already booked."
                                });
                            }
                        });
                    }
                });
            }

        });
    }
};

const get_all_rented = (req, res) => {
    Rented.find({}, function (error, renta) {

        if (!renta) {
            return res.status(404).json({
                "message": "User not found."
            });
        } else if (error) {
            return res.status(500).json(error);
        } else {
            res.status(200).json(renta);
        }
    });
};

//match: { 'locations.properties.timeStamp': { $gt: startDate, $lt: endDate    }}


const get_all_rented_today = (req, res) => {

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    Rented.find({

        date_from: { $lte: today },
        date_to: { $gte: today }


    }, function (error, renta) {

        if (!renta) {
            return res.status(404).json({
                "message": "Rented cars not found at the given time."
            });
        } else if (error) {
            return res.status(500).json(error);
        } else {
            res.status(200).json(renta);
        }
    });
};

//send riew
const get_all_expired_rents_today = (req, res) => {

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    Rented.find({

        date_to: { $eq:  today }


    }, function (error, renta) {

        if (!renta) {
            return res.status(404).json({
                "message": "Rented cars not found at the given time."
            });
        } else if (error) {
            return res.status(500).json(error);
        } else {
            res.status(200).json(renta);
        }
    });
};

const remove_rented = (req, res) => {
    Rented.findByIdAndRemove(req.params.idRented).exec((error, odg) => {
        if (error) {
            return res.status(500).json(error);
        } else {
            return res.status(204).json(null);
        }
    });
};

module.exports = {
    create_rented,
    remove_rented,
    get_all_rented,
    get_all_rented_today,
    get_all_expired_rents_today
}
