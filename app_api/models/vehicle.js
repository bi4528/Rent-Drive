const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    comment: String,
    rating: String,
    username: String,
    user_id: String,
    img: String
});

const vehicleSchema = new mongoose.Schema({
    images: [String],
    owner_id: String,
    make: String,
    model: String,
    typeoffuel: String,
    category: String,
    hp: Number,
    maxspeed: Number,
    acceleration: Number,
    consumption: Number,
    seats: Number,
    doors: Number,
    AirConditioning: String,
    Navigation: String,
    USB: String,
    AUX: String,
    parkingsensors: String,
    autopilot: String,
    bluetooth: String,
    accessibility: String,
    description: String,
    price: Number,
    country: String,
    city: String,
    addres: String,
    zip: Number,
    date: [String],
    reviews: [reviewSchema],
    profile_picture: String,
	username: String,
    email: String,
    number: String,
    location: String,
    luggage: Number,
    minage: Number
});


mongoose.model('Vehicle', vehicleSchema, 'Vehicles');