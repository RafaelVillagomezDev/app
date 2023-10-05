const surveyService = require("../services/surveyServices");
const db = require("../connection/bd");
const {validationResult} = require('express-validator');
const promisePool = db.pool.promise();
const { handleHttpError } = require("../utils/handleError");


const getUserSurveys = async (req, res,next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }
    const query = surveyService.getSurveys();
    const result = await promisePool.query(query);
    res.send({
       status:200,
       data:result[0]
    });
  } catch (error) {
    
    handleHttpError(res,"Error al obtener encuestas")
    return
  }
};



module.exports = {
  getUserSurveys,
  
};
