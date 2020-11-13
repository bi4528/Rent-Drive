var express = require('express');
var router = express.Router();


/* GET home page. */
const ctrlReview = require('../controllers/review');

router.get('/', ctrlReview.review);
module.exports = router;
