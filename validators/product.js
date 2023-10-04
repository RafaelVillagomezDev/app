const {body}= require('express-validator');

function validateProduct(method){
   switch (method) {
       case 'create': {
        return [ 
            body('producto','producto invalido').custom(value=>{
                const valueRol = (value=="luz"|| value=="gas" || value=="dual") ? true:false
                return valueRol
            }).escape().toUpperCase().trim().isLength({min:3,max:20}),

          ]   
       }
     }
}

function validateSubproduct(method){
    switch (method) {
        case 'create': {
         return [ 
             body('subproducto','subproducto invalido').matches(/^[A-Z\s]+$/).toUpperCase().escape().trim().isLength({max:30}),
 
           ]   
        }
      }
 }

module.exports={validateProduct,validateSubproduct}