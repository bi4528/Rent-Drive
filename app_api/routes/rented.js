var express = require('express');
var router = express.Router();
const ctrlRented = require('../controllers/rented');

/* Vehicles */
router.post('', ctrlRented.rentedCreate);

module.exports = router;
