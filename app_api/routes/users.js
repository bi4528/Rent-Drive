var express = require('express');
var router = express.Router();

const jwt = require('express-jwt');
const authentication = jwt({
    secret: process.env.JWT_PASSWORD,
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

router.route('/:idUser/favourite_vehicle')
    .post(authentication, ctrlUser.toggle_favourite_vehicle)
    .get(ctrlUser.get_favourite_vehicles);

router.delete(authentication, '/:idUser/favourite_vehicle/:idFavouriteVehicle', ctrlUser.remove_favourite_vehicle);

router.route('/:idUser/vehicles')
    .get('/:idUser/vehicles', ctrlUser.get_vehicles_of_user);

router.get('/find/:emailUser', ctrlUser.get_user_data_by_email);
router.post('/recover_password/:idUser', ctrlUser.reset_password);
router.post('/login', ctrlUser.login);

router.get('/check/exists', ctrlUser.check_if_user_exists);
router.get('/check/exists_mail', ctrlUser.check_if_mail_exists);
router.get(authentication, '/:idUser/rents', ctrlUser.get_rents_of_user);

module.exports = router;