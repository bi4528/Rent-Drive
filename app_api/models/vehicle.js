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
    accerelation: Number,
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
    description: String,
    price: Number,
    image: String,
    city: String,
    addres: String,
    zip: Number,
    number: String,
    date: [String],
    reviews: [reviewSchema]
});


mongoose.model('Vehicle', vehicleSchema, 'Vehicles');