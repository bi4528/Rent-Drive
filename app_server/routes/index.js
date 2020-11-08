var express = require('express');
var router = express.Router();

/* GET home page. */
const ctrlMain = require('../controllers/main');

router.get('/', ctrlMain.home);
router.get('/publish', ctrlMain.publish);
router.get('/search', ctrlMain.search);
router.get('/review', ctrlMain.review);

module.exports = router;
