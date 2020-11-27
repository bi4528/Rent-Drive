var express = require('express');
var router = express.Router();
const path = require('path');
const multer = require('multer');

const ctrlVehicle = require("../controllers/vehicle");

//var upload = multer({ dest: 'public/uploads/' });

/*
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/');
      //cb(null, './public/uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
      //cb(null, Date.now() + path.extname(file.originalname));
    }
});
var upload = multer({ storage: storage });
*/


router.get('/other',ctrlVehicle.vehicleprofile);
router.get('/edit',ctrlVehicle.editvehicleprofile);
router.post('/other',ctrlVehicle.vehicleprofile_book);

router
    .route('/publish')
    .get(ctrlVehicle.publish)
    .post(ctrlVehicle.submitcar);
    //.post(upload.array('carphotos',3), ctrlVehicle.submitcar);

router
    .route('/:id/reviews')
    .get(ctrlVehicle.review)
    .post(ctrlVehicle.postReview);

router.get('/:id', ctrlVehicle.vehicleprofile2);
router.get('/:id/edit',ctrlVehicle.editvehicleprofile);
router.post('/:id',ctrlVehicle.editvehicleprofile_submit)

module.exports = router;