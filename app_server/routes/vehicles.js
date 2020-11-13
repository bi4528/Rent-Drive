var express = require('express');
var router = express.Router();

const ctrlVehicle = require("../controllers/vehicle")

router.get('/other',ctrlVehicle.vehicleprofile);

router.get('/publish', ctrlVehicle.publish);
router.post('/', ctrlVehicle.submitcar);

module.exports = router;