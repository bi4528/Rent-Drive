const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({});

mongoose.model('Review', reviewSchema, 'Reviews');