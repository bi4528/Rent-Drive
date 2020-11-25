const mongoose = require('mongoose');

const rentedSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    }, lastname: {
        type: String,
        required: true
    }, email: {
        type: String,
        required: true
    }, make: {
        type: String,
        required: true
    }, model: {
        type: String,
        required: true
    }, dates: {
        type: [Date],
        required: true
    }
});

mongoose.model('Rented', rentedSchema, 'Renteds');