var express = require('express');
var router = express.Router();
const ctrlRented = require('../controllers/rented');

const jwt = require('express-jwt');
const authentication = jwt({
    secret: process.env.JWT_PASSWORD,
    userProperty: 'payload',
    algorithms: ['HS256']
});
const authentication_recover_password = jwt({
    secret: process.env.JWT_PASSWORD_RECOVER,
    userProperty: 'payload',
    algorithms: ['HS256']
});

/* Vehicles */

router.post('/', ctrlRented.create_rented);
router.get('/', ctrlRented.get_all_rented);
router.get('/today', ctrlRented.get_all_rented_today);
router.get('/today-expired', ctrlRented.get_all_expired_rents_today);
router.delete('/:idRented', ctrlRented.remove_rented);
module.exports = router;
