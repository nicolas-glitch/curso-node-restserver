

//los html
const nombreUsuario = document.querySelector('#nombre');
const rolUsuario = document.querySelector('#rol');
const boton = document.querySelector('#boton');
const texto = document.querySelector('.texto');
const botonObservacion = document.querySelector('#botonObservacion');
const textoObservacion = document.querySelector('#textoObservacion');
//extrayendo la informacion que esta en el localStorage
const token =localStorage.getItem('token');
const nombre= localStorage.getItem('nombre');
const rol= localStorage.getItem('rol');



//extrayendo la informacion que esta en el localStorage

//buscamos el id del paciente
let urlGet = `http://localhost:8080/api/citas`;

boton.addEventListener('click', ev =>{
    ev.preventDefault();
    localStorage.setItem('paciente', texto.value);
    const paciente= localStorage.getItem('paciente');
    fetch(urlGet, {
        method: 'GET',
        headers: {'nombre': paciente}
    })
    .then( res => res.json())
    .then((data) =>{
        console.log(data);
        if(data.msg){
            location.href= './login-administrador.html';
            return alert(data.msg);
        }else{
            const {uid} = data.usuarioCitado;
            localStorage.removeItem('nombre');
            localStorage.removeItem('rol');
            localStorage.setItem('uid',uid);
            location.href='./generar-cita.html'
            
            
        }
    })
    .catch(err =>{
        console.log(err);
    });
})









nombreUsuario.innerHTML = nombre;
rolUsuario.innerHTML = rol;
let url =`http://localhost:8080/api/usuarios`;


    

    fetch(url, {
        method: 'GET',
        headers: {'x-token': token}
    })
    .then( res => res.json())
    .then((data) =>{
        if(data.msg){
            location.href = '../index.html';
            return alert(data.msg);
        }
        //destructuramos la data
        const {usuario,total,usuarios} = data;
        // asignamos las citas
        for(let i=1; i<=total;i++){
            // requerimos todo el html
            let nombreUsuario = document.querySelector(`#nombre${i}`);
            let numeroUsuario = document.querySelector(`#numeroPaciente${i}`);
            
            
            // nombramos todo los innerHTML
            nombreUsuario.innerHTML = usuarios[i-1].nombre;
            numeroUsuario.innerHTML = usuarios[i-1].numeroPaciente;

        }
    })
    .catch(err =>{
        console.log(err);
    });
        



    

    let urlNov = `http://localhost:8080/api/citas`;

    botonObservacion.addEventListener('click', ev =>{
        ev.preventDefault();
        localStorage.setItem('paciente', textoObservacion.value);
        const paciente= localStorage.getItem('paciente');
        fetch(urlNov, {
            method: 'GET',
            headers: {'nombre': paciente}
        })
        .then( res => res.json())
        .then((data) =>{
            if(data.msg){
                ev.preventDefault();
                localStorage.removeItem('paciente');
                return alert(data.msg);                
            }
            location.href = './mostrar-novedades.html'
            
        })
        .catch(err =>{
            console.log(err);
        });
    })
    