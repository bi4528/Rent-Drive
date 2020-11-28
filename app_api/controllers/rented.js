const mongoose = require('mongoose');
const Rented = mongoose.model('Rented');
const Vehicle = mongoose.model('Vehicle');
const User = mongoose.model('User');

const rentedCreate = (req, res) => {
    console.log("Rented cars upload");
    console.log(req.body);
    Rented.create({
        user: req.body.user_id,
        vehicle: req.body.vehicle_id,
        dates: [req.body.date]
    }, (err, data) => {
        if (err) {
            res.status(400).json(err);
        } else {
            res.status(201).json(data);

        }
    });
};

module.exports = {
    rentedCreate
}