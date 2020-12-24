const mongoose = require('mongoose');
const Vehicle = mongoose.model('Vehicle');
const User = mongoose.model('User');
const vehiclesData = require('../models/vehicles-test.json');

const addSampleData = (req, res) => {
    TODO
};

const deleteAllData = (req, res) => {
    TODO
};

module.exports = {
    addSampleData,
    deleteAllData
}