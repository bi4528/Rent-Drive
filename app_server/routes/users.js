var express = require('express');
var router = express.Router();

const ctrlUser = require("../controllers/user")

/* GET users listing. */

router.get('/register',ctrlUser.register);
router.get('/login',ctrlUser.login);
router.get('/forgotpassword',ctrlUser.forgotpassword);
router.get('/my', ctrlUser.profile);
router.post('/my/edit', ctrlUser.edit_profile_action);
router.get('/edit', ctrlUser.edit_profile);
router.get('/other', ctrlUser.tuji_profile);
    
module.exports = router;
