//los html
const nombreUsuario = document.querySelector('#nombre');
const rolUsuario = document.querySelector('#rol');
const boton = document.querySelector('#boton');
const texto = document.querySelector('.texto');
//extrayendo la informacion que esta en el localStorage


//buscamos el id de la cita
let urlGet = `http://localhost:8080/api/novedades/cita`;

boton.addEventListener('click', ev =>{
    ev.preventDefault();
    localStorage.setItem('novedades', texto.value);
    const novedades= localStorage.getItem('novedades');
    const uid = localStorage.getItem('uid');
    fetch(urlGet, {
        method: 'GET',
        headers: {'especialidad': novedades, 'paciente': uid}
    })
    .then( res => res.json())
    .then((data) =>{
        console.log(data);
        if(data.msg){
            location.href= './login-paciente.html';
            return alert(data.msg);
        }else{
            const {_id} = data.cita;
            localStorage.setItem('_idCita',_id);
            location.href='./generar-novedad.html'
            
            
        }
    })
    .catch(err =>{
        console.log(err);
    });
})





















const nombre=localStorage.getItem('nombre');
const rol   =localStorage.getItem('rol');
const  uid  =localStorage.getItem('uid');
const token =localStorage.getItem('token');

let url =`http://localhost:8080/api/citas/${uid}`;


    

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
        const {usuario,total,citas} = data;
        // asignamos las citas
        for(let i=1; i<=total;i++){
            // requerimos todo el html
            let cita = document.querySelector(`#cita${i}`);
            let nombreCita = document.querySelector(`#nombre${i}`);
            let fechaCita = document.querySelector(`#fecha${i}`);
            let especialidadCita = document.querySelector(`#especialidad${i}`);
            let numeroPaciente = document.querySelector(`#numero${i}`);

            
            // nombramos todo los innerHTML
            cita.innerHTML = `cita número ${i}`
            nombreCita.innerHTML = nombre;
            fechaCita.innerHTML = citas[i-1].fecha;
            especialidadCita.innerHTML = citas[i-1].especialidad;
            numeroPaciente.innerHTML = usuario.numeroPaciente;
        }    
        nombreUsuario.innerHTML = usuario.nombre;
        rolUsuario.innerHTML = usuario.rol;
        
    })
    .catch(err =>{
        console.log(err);
    });
        



    

