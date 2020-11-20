var express = require('express');
var router = express.Router();
const ctrlVehicles = require('../controllers/vehicle');
const ctrlReviews = require('../controllers/review');

/* Vehicles */
router.get('/', ctrlVehicles.vehiclesAll);
router.post('/', ctrlVehicles.vehiclesUpload);
router.get('/:id', ctrlVehicles.vehiclesFind);
router.put('/:id', ctrlVehicles.vehiclesUpdate);
router.delete('/:id', ctrlVehicles.vehiclesDelete);

router.get('/:id/reviews/', ctrlReviews.reviewsAll);
router.post('/:id/reviews/', ctrlReviews.reviewsUpload);
router.get('/:idVehicle/reviews/:idReview', ctrlReviews.reviewsFind);
router.put('/:idVehicle/reviews/:idReview', ctrlReviews.reviewsDelete);


module.exports = router;
