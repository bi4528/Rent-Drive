var express = require('express');
var router = express.Router();

const ctrlUser = require("../controllers/user")

/* GET users listing. */

router.get('/register', ctrlUser.register);
router.post('/register', ctrlUser.user_register);
router.get('/login', ctrlUser.login);
router.post('/login', ctrlUser.user_login);
router.get('/logout', ctrlUser.user_logout);
router.get('/delete', ctrlUser.user_delete);
//router.post('/register',ctrlUser.register_attempt);
//router.post('/login',ctrlUser.login_attempt);
router.get('/forgotpassword',ctrlUser.forgotpassword);
router.post('/forgotpassword', ctrlUser.forgot_password_recover);
router.get('/resetpassword', ctrlUser.resetpassword);
router.post('/resetpassword', ctrlUser.resetpassword_submit);
router.get('/profiles/:idUser', ctrlUser.profile);
router.get('/my', ctrlUser.logged_user_profile);
router.put('/edit', ctrlUser.edit_profile_action);
router.get('/edit', ctrlUser.edit_profile);
router.get('/book', ctrlUser.book);
router.get('/confirm', ctrlUser.confirm);
router.get('/users/delete/vehicles/:idVehicle', ctrlUser.remove_user_vehicle);
    
module.exports = router;
