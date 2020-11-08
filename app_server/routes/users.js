var express = require('express');
var router = express.Router();

const ctrlUser = require("../controllers/user")

/* GET users listing. */

router.get('/my', ctrlUser.profile);
router.get('/edit', ctrlUser.edit_profile);
router.get('/other', ctrlUser.tuji_profile);
    
module.exports = router;
