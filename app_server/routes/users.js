var express = require('express');
var router = express.Router();

const ctrlUser = require("../controllers/user")

/* GET users listing. */

router.get('/profile', ctrlUser.profile);
router.get('/edit_profile', ctrlUser.edit_profile);
router.get('/tuji_profile', ctrlUser.tuji_profile);
    
module.exports = router;
