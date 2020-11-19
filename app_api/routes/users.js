var express = require('express');
var router = express.Router();

const ctrlUser = require("../controllers/user")

router.get('/', ctrlUser.get_all_users);
router.put('/:idUser',ctrlUser.updated_profile_data);
router.post('/', ctrlUser.create_new_user);
router.delete('/:idUser', ctrlUser.remove_user);
router.get('/:idUser', ctrlUser.get_user_data);
router.get('/exists', ctrlUser.check_if_user_exists);
router.get('/exists_mail', ctrlUser.check_if_mail_exists);

module.exports = router;
