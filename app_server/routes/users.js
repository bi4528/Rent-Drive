var express = require('express');
var router = express.Router();

const ctrlUser = require("../controllers/user")

/* GET users listing. */

router.get('/register',ctrlUser.register);
router.post('/register',ctrlUser.register_attempt);
router.get('/login',ctrlUser.login);
router.post('/login',ctrlUser.login_attempt);
router.get('/forgotpassword',ctrlUser.forgotpassword);
router.post('/forgotpassword', ctrlUser.forgot_password_recover);
router.get('/my', ctrlUser.profile);
router.post('/my/edit', ctrlUser.edit_profile_action);
router.get('/edit', ctrlUser.edit_profile);
router.get('/other', ctrlUser.tuji_profile);
    
module.exports = router;
