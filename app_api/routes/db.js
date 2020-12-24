var express = require('express');
var router = express.Router();

/* GET home page. */
const ctrlDb = require('../controllers/db');

router.route('')
    .post( ctrlDb.addSampleData)
    .delete( ctrlDb.deleteAllData)

module.exports = router;
