const mongoose = require('mongoose');
const Rented = mongoose.model('Rented');
const Vehicle = mongoose.model('Vehicle');
const User = mongoose.model('User');

const create_rented = (req, res) => {
    console.log("Rented cars upload");
    console.log(req.body);
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
    });
};

const get_all_rented = (req, res) => {
    Rented.find({}, function (error, user) {

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

module.exports = {
    create_rented,
    get_all_rented
}