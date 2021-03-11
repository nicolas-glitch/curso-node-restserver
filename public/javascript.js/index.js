//los html
const formulario = document.querySelector('form');
const mensaje = document.querySelector('#mensaje');

let url ='http://localhost:8080/api/login';



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
        //validar que es el usuario logeado, si administrador o paciente
        const {rol,nombre,uid} = usuario;
        //redirigir a cada usuario a su lugar asignado
        if(rol === 'ADMINISTRADOR'){
            mensaje.style.color= '#1f3';
            mensaje.style.display='';
             mensaje.innerHTML = 'ingresando...';
             localStorage.setItem('nombre',nombre);
             localStorage.setItem('rol',rol);
             localStorage.setItem('token',token);
            return setTimeout(ev =>{
               location.href = './login/login-administrador.html' 
            },2000);
        }
        else if(rol==="PACIENTE"){
            mensaje.style.color= '#1f3';
            mensaje.style.display='';
             mensaje.innerHTML = 'ingresando...';
             localStorage.setItem('nombre',nombre);
             localStorage.setItem('rol',rol);
             localStorage.setItem('uid',uid)
             localStorage.setItem('token',token);             
            return setTimeout(()=>{
               location.href = './login/login-paciente.html' 
            },2000);
        }

        
    })
    .catch(err =>{
        console.log(err);
    });
        
});


    

