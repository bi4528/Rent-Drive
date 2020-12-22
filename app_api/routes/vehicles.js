var express = require('express');
var router = express.Router();
const jwt = require('express-jwt');
const authentication = jwt({
    secret: process.env.JWT_PASSWORD,
    userProperty: 'payload',
    algorithms: ['HS256']
});

const multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './app_public/src/assets/uploads/');
        //cb(null, './public/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
        //cb(null, Date.now() + path.extname(file.originalname));
    }
});
var upload = multer({
    storage: storage
});

const ctrlVehicles = require('../controllers/vehicle');
const ctrlReviews = require('../controllers/review');

/* Vehicles */
router.get('', ctrlVehicles.vehiclesAll);
router.post('', authentication, ctrlVehicles.vehiclesUpload);
router.post('/imagesUpload', authentication, upload.array('files'), ctrlVehicles.imagesUpload);
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
