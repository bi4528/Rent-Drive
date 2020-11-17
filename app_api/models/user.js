const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    }, lastname: {
        type: String,
        required: true
    }, phone_number: {
        type: String,
        required: true
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
    }
});

const favouriteSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    vehicle_id: {
        type: String,
        required: true
    }
});

mongoose.model('User', userSchema, 'Users');
mongoose.model('Favourite', favouriteSchema, 'Favourites');