var express = require('express');
var router = express.Router();


/* GET home page. */
const ctrlReview = require('../controllers/review');

router.get('/:idReview', ctrlReview.review);
router.get('/car/:idCar', ctrlReview.reviewOfCar);
router.get('/user/:idUser', ctrlReview.reviewofuser);
module.exports = router;
