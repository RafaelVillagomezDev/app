var express = require('express');
var router = express.Router();
const userController=require("../../controllers/userControllers")
const validateAuth=require("../../validators/auth")
const validateRol=require("../../validators/rol")
const {validateProduct,validateSubproduct}=require("../../validators/product")
const {validateSurvey}=require("../../validators/survey")
// In src/controllers/userController.js

/* GET home page. */
router.get('/', validateSurvey("create"),userController.getAllUsers);

router.post('/data', userController.getOneUser);



router.patch('/:userId', userController.updateOneUser);

router.delete('/:userId', userController.deleteOneUser);



module.exports = router