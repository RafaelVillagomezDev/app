
const db = require("../connection/bd");
const {matchedData,validationResult} = require('express-validator');
const promisePool = db.pool.promise();
const { handleHttpError } = require("../utils/handleError");
const { encrypt } = require("../utils/handlePassword");
const authService = require("../services/authServices");
const {validateRol}=require("../utils/handleRegex")
const {tokenSign}=require("../utils/handeJwt")

const registerAuthUser=async (req,res,next)=>{
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          res.status(422).json({ errors: errors.array() });
          return;
        }

        req=matchedData(req)

        const passwordHash=await encrypt(req.password)

        const dataBody={...req,password:passwordHash}
        const {email,name_user,surname,password}=dataBody
        const queryRegister = authService.createUser(dataBody);
        let data=null
        let rol="user"
        if(validateRol(email)){
            rol="admin"
            data= await promisePool.query(queryRegister,[email,rol,name_user,surname,password]);
        }else{
            data= await promisePool.query(queryRegister,[email,rol,name_user,surname,password]);
        }
       
        const token=await tokenSign(data[0])
        

        res.status(201).send({
            status:200,
            token:token,
            data:data[0]

        })
    }catch(error){
        handleHttpError(res,"Error al registrar usuario")
    }
   
}

module.exports={
    registerAuthUser
}