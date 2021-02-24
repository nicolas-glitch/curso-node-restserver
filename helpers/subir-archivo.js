const path = require('path');
const {v4:uuidv4}= require('uuid');  


const subirArchivo = (files,terminoValido = ['jpg','png','gif'],carpeta ='') =>{
    return new Promise((resolve,reject) =>{



    const {archivo} = files;
    
    const nombreCortado = archivo.name.split('.');
    const termino = nombreCortado[nombreCortado.length-1];
    

    

       
    if(!terminoValido.includes(termino)){
        return reject(`el termino ${termino}, no es permitido, por favor intente con ${terminoValido}`);
    }

    const nombreId = uuidv4() + '.' + termino;

    const uploadPath = path.join(__dirname,'../uploads/',carpeta,nombreId);
    archivo.mv(uploadPath, (err) => {
      if (err){
        return reject(err);
      }
        
  
      resolve(nombreId);
    });
    })
}

module.exports={
    subirArchivo
}