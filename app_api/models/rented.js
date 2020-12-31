const mongoose = require('mongoose');
const User = mongoose.model('User');
//const vehicleSchema = mongoose.model('Vehicle').schema;
const Vehicle = mongoose.model('Vehicle');

const rentedSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    vehicle_id: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    date_from: {
        type: Date,
        required: true
    },
    date_to: {
        type: Date,
        required: true
    }
});

mongoose.model('Rented', rentedSchema, 'Renteds');
