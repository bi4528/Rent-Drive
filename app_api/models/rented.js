const mongoose = require('mongoose');
const User = mongoose.model('User');
//const vehicleSchema = mongoose.model('Vehicle').schema;
const Vehicle = mongoose.model('Vehicle');

const rentedSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.ObjectId, ref: User},
    vehicle: {type: mongoose.Schema.ObjectId, ref: Vehicle},
    dates: {
        type: [Date],
        required: true
    }
});

mongoose.model('Rented', rentedSchema, 'Renteds');