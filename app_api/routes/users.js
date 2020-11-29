var express = require('express');
var router = express.Router();

const ctrlUser = require("../controllers/user")

router.get('/', ctrlUser.get_all_users);
router.put('/:idUser', ctrlUser.updated_profile_data);
router.get('/find/:emailUser', ctrlUser.get_user_data_by_email);
router.post('/recover_password/:idUser', ctrlUser.reset_password);
router.post('/', ctrlUser.create_new_user);
router.delete('/:idUser', ctrlUser.remove_user);
router.get('/:idUser', ctrlUser.get_user_data);
router.get('/check/exists', ctrlUser.check_if_user_exists);
router.get('/check/exists_mail', ctrlUser.check_if_mail_exists);
router.post('/:idUser/favourite_vehicle', ctrlUser.add_favourite_vehicle);
router.delete('/:idUser/favourite_vehicle/:idFavouriteVehicle', ctrlUser.remove_favourite_vehicle);
router.get('/:idUser/vehicles', ctrlUser.get_vehicles_of_user);
router.get('/:idUser/favourite_vehicles', ctrlUser.get_favourite_vehicles);

module.exports = router;
