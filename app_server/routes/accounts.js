var express = require('express');
var router = express.Router();

const ctrlAccount = require('../controllers/account');

router.get('/register',ctrlAccount.register);
router.get('/login',ctrlAccount.login);
router.get('/forgotpassword',ctrlAccount.forgotpassword);

module.exports = router;