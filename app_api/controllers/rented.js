const mongoose = require('mongoose');
const Rented = mongoose.model('Rented');
const Vehicle = mongoose.model('Vehicle');
const User = mongoose.model('User');

const create_rented = (req, res) => {
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
                    console.log("Error! Rented car wasn't saved successfully!!");
                    res.status(404).json(renta);
                } else {
                    console.log("Rented car saved successfully!");
                    res.status(200).json(renta);
                }
            });
        } else if (error) {
            return res.status(500).json(error);
        } else {
            return res.status(404).json({
                "message": "Car is already booked."
            });
        }
    });
    /*
    Rented.create({
        user_id: req.body.params.my_id,
        vehicle_id: req.body.params.vehicle_id,
        date_from: req.body.params.date_from,
        date_to: req.body.params.date_to
    }, (err, data) => {
        if (err) {
            res.status(400).json(err);
        } else {
            res.status(201).json(data);

        }
    });*/
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
    Rented.findByIdAndRemove(req.params.idRented).exec((error) => {
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
