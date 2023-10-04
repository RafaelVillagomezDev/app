const {body}= require('express-validator');
const {testRegex}=require("../utils/handleRegex")
function validateSurvey(method){
   switch (method) {
       case 'create': {
        return [ 
            body('dni','dni o nie invalido ').custom(value=>{
                 const regexDni='^[0-9]{8}[A-Z]$'
                 const regexNie='^[XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE]$'
                 const dniCheck=testRegex(regexDni,value) || testRegex(regexNie,value)?true:false
                 return dniCheck
            }).escape().trim(),
            body('mantenimiento','mantenimiento opciones invalido').custom(value=>{
                const valueMaintenance = (value=="si"|| value=="no") ? true:false
                return valueMaintenance
           }).escape().trim(),
           body('tipo_mantenimiento',' tipo de mantenimiento invalido').trim().escape().isLength({max:20}).matches(/^[A-Za-z\s]+$/),
           body('estado','invalid state').custom(value=>{
            const valueState = (value=="vendido"|| value=="en proceso" || value=="no vendido" ||value=="no válido" ) ? true:false
            return valueState
       }).escape().trim(),
          ]   
       }
     }
}

module.exports={validateSurvey}