var express = require('express');
var router = express.Router();


/* GET home page. */
const ctrlNearby = require('../controllers/nearby');

router.get('/weather', ctrlNearby.weather);
router.get('/locations', ctrlNearby.locations);

module.exports = router;
