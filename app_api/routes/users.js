var express = require('express');
var router = express.Router();

const jwt = require('express-jwt');
const authentication = jwt({
    secret: process.env.JWT_PASSWORD,
    userProperty: 'payload',
    algorithms: ['HS256']
});
const authentication_recover_password = jwt({
    secret: process.env.JWT_PASSWORD_RECOVER,
    userProperty: 'payload',
    algorithms: ['HS256']
});


const ctrlUser = require("../controllers/user")

router.route('/')
    .get(ctrlUser.get_all_users)
    .post(ctrlUser.create_new_user);

router.route('/:idUser')
    .put(authentication, ctrlUser.updated_profile_data)
    .get(ctrlUser.get_user_data)
    .delete(authentication, ctrlUser.remove_user);

router.route('/:idUser/favourite_vehicles')
    .get(ctrlUser.get_favourite_vehicles)
    .post(authentication, ctrlUser.toggle_favourite_vehicle);

router.delete('/:idUser/favourite_vehicles/:idFavouriteVehicle', authentication, ctrlUser.remove_favourite_vehicle);

router.route('/:idUser/vehicles')
    .get(ctrlUser.get_vehicles_of_user);

router.get('/find/:emailUser', ctrlUser.get_user_data_by_email);
router.post('/recover_password/:idUser', authentication_recover_password, ctrlUser.reset_password);
router.post('/login', ctrlUser.login);

router.get('/check/exists', ctrlUser.check_if_user_exists);
router.get('/check/exists_mail/:email', ctrlUser.check_if_mail_exists);
router.get('/forgotpassword/:email', ctrlUser.send_email_forgot_password);
router.get('/:idUser/rents', authentication, ctrlUser.get_rents_of_user);

module.exports = router;