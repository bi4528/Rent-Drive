var express = require('express');
var router = express.Router();

const ctrlVehicle = require("../controllers/vehicle")

router.get('/other',ctrlVehicle.vehicleprofile);

module.exports = router;