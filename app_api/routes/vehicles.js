var express = require('express');
var router = express.Router();
const jwt = require('express-jwt');
const authentication = jwt({
    secret: process.env.JWT_PASSWORD,
    userProperty: 'payload',
    algorithms: ['HS256']
});
const ctrlVehicles = require('../controllers/vehicle');
const ctrlReviews = require('../controllers/review');

/* Vehicles */
router.get('', ctrlVehicles.vehiclesAll);
router.post('', authentication, ctrlVehicles.vehiclesUpload);
router.get('/length', ctrlVehicles.returnLength);
router.get('/:id', ctrlVehicles.vehiclesFind);
router.put('/:id', authentication, ctrlVehicles.vehiclesUpdate);
router.delete('/:id', authentication, ctrlVehicles.vehiclesDelete);

/* Reviews */
router.get('/:id/reviews/', ctrlReviews.reviewsAll);
router.post('/:id/reviews/', authentication, ctrlReviews.reviewsUpload);
router.get('/:idVehicle/reviews/:idReview', ctrlReviews.reviewsFind);
router.delete('/:idVehicle/reviews/:idReview', authentication, ctrlReviews.reviewsDelete);


module.exports = router;
