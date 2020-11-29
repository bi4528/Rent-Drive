var express = require('express');
var router = express.Router();


/* GET home page. */
const ctrlMain = require('../controllers/main');

router.get('/', ctrlMain.home);
router.get('/home', ctrlMain.home);
router.get('/search', ctrlMain.search);
router.get('/nearby', ctrlMain.nearby);
router.get('/db', ctrlMain.db);
router.get('/dbadd', ctrlMain.dbadd);
router.get('/dbdel', ctrlMain.dbdel);
router.get('/rented/:id/delete', ctrlMain.rentDelete);

module.exports = router;
