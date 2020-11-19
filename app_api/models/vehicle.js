const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
});

mongoose.model('Vehicle', vehicleSchema, 'Vehicles');