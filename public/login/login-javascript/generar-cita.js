//llamamos el html
const formulario = document.querySelector('form');
const mensaje = document.querySelector('#mensaje');

//generamos la cita del paciente
const token =localStorage.getItem('token');
const uidCita = localStorage.getItem('uid');

let url =`http://localhost:8080/api/citas/${uidCita}`;


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
        headers: {'Content-Type':'application/json','x-token':token}
    })
    .then( res => res.json())
    .then((data) =>{
        const {msg,errors,alerta} = data
        // validar que no exista ningun error al entrar
        if(msg){
            location.href = '../index.html';
            return alert(msg);
        }

        if(errors){

            for(error of errors){
                mensaje.style.color= '#f14';
                mensaje.style.display='';
                 mensaje.innerHTML = error.msg;
                return setTimeout(() =>{
                    mensaje.style.display='none';
                },5000);                
            }
        }
        if(alerta){
            mensaje.style.color= '#f14';
            mensaje.style.display='';
             mensaje.innerHTML = alerta;
            return setTimeout(() =>{
                mensaje.style.display='none';
            },5000);
        }


        //mostrar que la cita  fue creada correctamente
            mensaje.style.color= '#1f4';
            mensaje.style.display='';
            mensaje.innerHTML = 'Cita creada';
            return setTimeout(() =>{
                mensaje.style.display='none';
            },3000);
        


        
    })
    .catch(err =>{
        console.log(err);
    });
        
});





    

