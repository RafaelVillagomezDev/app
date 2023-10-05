var express = require('express');
var router = express.Router();
const {authToken}=require("../../middlewares/Auth/authSession")
const surveyController=require("../../controllers/surveyController")


router.get('/', authToken,surveyController.getUserSurveys);
module.exports = router