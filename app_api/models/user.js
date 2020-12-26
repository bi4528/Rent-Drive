const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    phone_number: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    consendedValue: {
        type: String,
        required: true
    },
    randomValue: {
        type: String,
        required: true
    },
    profile_picture: {
        type: String
    },
    location: {
        type: String
    },
    favourite_vehicles_ids: {
        type: [String]
    },
    is_admin: {
        type: Boolean,
        required: true
    }
});

userSchema.methods.setPassword = function (geslo) {
    this.randomValue = crypto.randomBytes(16).toString('hex');
    this.consendedValue = crypto
        .pbkdf2Sync(geslo, this.randomValue, 1000, 64, 'sha512')
        .toString('hex');
};

userSchema.methods.checkPassword = function (geslo) {
    let zgoscenaVrednost = crypto
        .pbkdf2Sync(geslo, this.randomValue, 1000, 64, 'sha512')
        .toString('hex');
    return this.consendedValue == zgoscenaVrednost;
};

userSchema.methods.generateJwt = function () {
    const datumPoteka = new Date();
    datumPoteka.setDate(datumPoteka.getDate() + 7); //tle bi lahko spremenili da seja potece hitreje nego kot 7 dni

    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        is_admin: this.is_admin,
        exp: parseInt(datumPoteka.getTime() / 1000, 10)
    }, process.env.JWT_PASSWORD);
};


mongoose.model('User', userSchema, 'Users');