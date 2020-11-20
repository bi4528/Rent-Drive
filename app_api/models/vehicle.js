const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    make: String,
    model: String,
    description: String,
    price: Number,
    image: String,
    category: String,
    city: String,
    date: [Date]
});

mongoose.model('Vehicle', vehicleSchema, 'Vehicles');