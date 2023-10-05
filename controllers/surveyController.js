const surveyService = require("../services/surveyServices");
const db = require("../connection/bd");
const {matchedData,validationResult} = require('express-validator');
const promisePool = db.pool.promise();
const { handleHttpError } = require("../utils/handleError");
const { v4:uuidv4 } = require('uuid');

const getSurvey = async (req, res,next) => {
  try {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }
    const query = surveyService.getSurvey();
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


const createSurvey=async (req, res,next) => {
  try {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }
    console.log(req)
    req = matchedData(req);
    
    const newReq={...req,Id_encuesta:uuidv4()}
    const { id_encuesta,dni, producto, mantenimiento, tipo_mantenimiento,estado,id_subproducto} = newReq;
    console.log(newReq)
    const queryCreate = surveyService.createSurvey();
    const result = await promisePool.query(queryCreate,[id_encuesta,dni,producto,mantenimiento,tipo_mantenimiento,estado,id_subproducto]);
    
    if(result[0].affectedRows>0){
      res.send({
        status:200,
        data:"encuesta creada satifactoriamente"
     });
    }
  
  } catch (error) {
    console.log(error)
    handleHttpError(res,"Error al crear encuestas")
    return
  }
};



const deleteSurvey=async (req, res,next) => {
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

const updateSurvey=async (req, res,next) => {
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
  getSurvey,
  createSurvey,
  deleteSurvey,
  updateSurvey
};
