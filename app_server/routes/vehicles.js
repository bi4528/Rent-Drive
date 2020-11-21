var express = require('express');
var router = express.Router();

const ctrlVehicle = require("../controllers/vehicle")


router.get('/other',ctrlVehicle.vehicleprofile);
router.get('/edit',ctrlVehicle.editvehicleprofile);
router.post('/', ctrlVehicle.submitcar);
router.post('/other',ctrlVehicle.vehicleprofile_book);

router
    .route('/publish')
    .get(ctrlVehicle.publish)
    .post(ctrlVehicle.submitcar);

module.exports = router;