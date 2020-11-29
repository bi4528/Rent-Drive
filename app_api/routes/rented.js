var express = require('express');
var router = express.Router();
const ctrlRented = require('../controllers/rented');


/* Vehicles */

router.post('/', ctrlRented.create_rented);
router.get('/', ctrlRented.get_all_rented);

module.exports = router;
