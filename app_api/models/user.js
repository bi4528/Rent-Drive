const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    }, lastname: {
        type: String,
        required: true
    }, phone_number: {
        type: String
    }, email: {
        type: String,
        required: true
    }, password: {
        type: String,
        required: true
    }, profile_picture: {
        type: String
    }, location: {
        type: String
    }, favourite_vehicles_ids: {
        type: [String]
    }
});

mongoose.model('User', userSchema, 'Users');