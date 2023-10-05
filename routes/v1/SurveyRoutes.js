var express = require('express');
var router = express.Router();
const {authToken,authCredentials}=require("../../middlewares/Auth/authSession")
const surveyController=require("../../controllers/surveyController")
const validateSurvey=require("../../validators/survey")

router.get('/',authToken,surveyController.getSurvey);
router.post('/create',validateSurvey("create"),authToken,surveyController.createSurvey );
router.delete('/delete',authToken,surveyController.deleteSurvey );
router.put('/update',authToken,surveyController.updateSurvey);
module.exports = router