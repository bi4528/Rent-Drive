var express = require('express');
var router = express.Router();
const ctrlRented = require('../controllers/rented');


/* Vehicles */

router.post('/', ctrlRented.create_rented);
router.get('/', ctrlRented.get_all_rented);
router.get('/today', ctrlRented.get_all_rented_today);
router.get('/today-expired', ctrlRented.get_all_expired_rents_today);
module.exports = router;
