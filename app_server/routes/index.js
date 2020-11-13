var express = require('express');
var router = express.Router();


/* GET home page. */
const ctrlMain = require('../controllers/main');

router.get('/', ctrlMain.home);
router.get('/search', ctrlMain.search);
module.exports = router;
