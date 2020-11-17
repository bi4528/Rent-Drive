var express = require('express');
var router = express.Router();

const ctrlUser = require("../controllers/user")

router.put('/:idUser',ctrlUser.updated_profile_data);
router.post('/:idUser', ctrlUser.create_new_user);
router.delete('/:idUser', ctrlUser.remove_user);
router.get('/:idUser', ctrlUser.get_user_data);
router.get('/check_login', ctrlUser.check_if_user_exists);
router.get('/check_mail', ctrlUser.check_if_mail_exists);

module.exports = router;
