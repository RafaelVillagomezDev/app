/*
 Funcion : recoge una regex y el un valor a testear
 return params: true/false
*/

const testRegex=(regex,value)=>{
    let regexTest= new RegExp(regex);
    if(regexTest.test(value)){
        return true
    }else {
        return false
    }


}
/*
 Funcion: recibe el email despues de haber pasado las correspondientes validaciones
 return: true o false
 extra: Esta funcion la usaremos para decidir el rol del usuario
*/

const validateRol=(email)=>{
    const dominioEmail=email.split("@")[1]
    return dominioEmail=="accom.com"?true:false
}


module.exports={testRegex,validateRol}