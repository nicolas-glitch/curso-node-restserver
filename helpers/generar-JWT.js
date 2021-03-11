const jwt = require('jsonwebtoken');



const generarJWT = (uid='') =>{

    return new Promise((resolve,reject) =>{

        const payload = {uid};

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY,{
            expiresIn : '1d'
        },(err,token)=>{
            if(err){
                console.log(err);
                reject('el token no pudo se generado');
            }else{
                resolve(token);
            }
        })

    })
}



module.exports={
    generarJWT
}