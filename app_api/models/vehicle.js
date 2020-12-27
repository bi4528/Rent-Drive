const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *  schemas:
 *   Reviews:
 *    description: How reviews are saved
 *    type: object
 *    properties:
 *     comment:
 *      type: string
 *      example: Very satisfied with the car, i recommend it!
 *     rating:
 *      type: string
 *      example: ★★★★☆
 *     username:
 *      type: string
 *      example: Josh Smith
 *     user_id:
 *      type: string
 *     img:
 *      type: string
 */

const reviewSchema = new mongoose.Schema({
    comment: String,
    rating: String,
    username: String,
    user_id: String,
    img: String
});

const vehicleSchema = new mongoose.Schema({
    images: [String],
    owner_id: {
        type: String,
        required: true
    },
    make: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    typeoffuel: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    hp: {
        type: Number,
        required: true
    },
    maxspeed: {
        type: Number,
        required: true
    },
    acceleration: {
        type: Number,
        required: true
    },
    consumption: {
        type: Number,
        required: true
    },
    seats: {
        type: Number,
        required: true
    },
    doors: {
        type: Number,
        required: true
    },
    AirConditioning: String,
    Navigation: String,
    USB: String,
    AUX: String,
    parkingsensors: String,
    autopilot: String,
    bluetooth: String,
    accessibility: String,
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    country: {
        type: String
    },
    city: {
        type: String,
        required: true
    },
    addres: {
        type: String,
        required: true
    },
    zip: {
        type: Number,
        required: true
    },
    date: {
        type: [String],
        required: true
    },
    reviews: [reviewSchema],
    luggage: {
        type: Number,
        required: true
    },
    minage: {
        type: Number,
        required: true
    }
});


mongoose.model('Vehicle', vehicleSchema, 'Vehicles');
mongoose.model('Review', reviewSchema, 'Reviews');
