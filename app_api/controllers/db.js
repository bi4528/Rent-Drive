const mongoose = require('mongoose');
const Vehicle = mongoose.model('Vehicle');
const User = mongoose.model('User');
const vehiclesData = require('../models/vehicles-test.json');

const addSampleData = (req, res) => {
    TODO
};

const deleteAllData = (req, res) => {
   Vehicle.collection.drop();
   User.collection.drop();
   res.status(200).json({"sporočilo": "Vsebina podatkovne baze je bila uspešno izbrisana."})
};

module.exports = {
    addSampleData,
    deleteAllData
}