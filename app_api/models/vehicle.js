const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    comment: String,
    rating: String,
    username: String,
    img: String
});

const vehicleSchema = new mongoose.Schema({
    images: [String],
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
    AirConditioning: Number,
    Navigation: Number,
    USB: Number,
    AUX: Number,
    parkingsensors: Number,
    autopilot: Number,
    bluetooth: Number,
    accessibility: Number,
    description: String,
    price: Number,
    image: String,
    city: String,
    addres: String,
    zip: Number,
    date: [String],
    reviews: [reviewSchema],
    avatar: String,
	username: String,
    email: String,
    number: String,
    avg_rating: Number,
    location: String,
    luggage: Number,
    minage: Number
});


mongoose.model('Vehicle', vehicleSchema, 'Vehicles');