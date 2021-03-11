//los html
const formulario = document.querySelector('form');
const mensaje = document.querySelector('#mensaje');

let url ='http://localhost:8080/api/usuarios';



mensaje.style.display='none';
formulario.addEventListener('submit', ev =>{
    ev.preventDefault();
    
    const formData = {};

    for( let info of formulario.elements){
        if(info.name.length > 0);
        formData[info.name] = info.value;
    }
    

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {'Content-Type':'application/json'}
    })
    .then( res => res.json())
    .then((data) =>{
        const {errors,usuario,token} = data
        // validar que no exista ningun error al entrar
        if(errors){
            for(error of errors){
                mensaje.style.color= '#f14';
                mensaje.style.display='';
                 mensaje.innerHTML = error.msg;
                return setTimeout(ev =>{
                    mensaje.style.display='none';
                },3000)
            }
        }
        else if(data.msg){
                mensaje.style.color= '#f14';
                mensaje.style.display='';
                mensaje.innerHTML = data.msg;
                return setTimeout(() =>{
                    mensaje.style.display='none';
                },3000);
        }
        //mostrar que el usuario fue creado correctamente
            mensaje.style.color= '#1f4';
            mensaje.style.display='';
            mensaje.innerHTML = 'usuario creado';
            return setTimeout(() =>{
                mensaje.style.display='none';
            },3000);
        


        
    })
    .catch(err =>{
        console.log(err);
    });
        
});


    

