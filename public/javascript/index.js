//los html
const enlace1 = document.querySelector('a');
const enlaces = document.querySelectorAll('a');
const formulario = document.querySelector('form');

let url = (window.location.hostname.includes('localhost'))
? 'http://localhost:8080/api/usuarios'
: 'https://restserver2-node.herokuapp.com/api/';
enlaces.forEach( enlace =>{
    if(enlace1 === enlace){
        return;
    };
        enlace.addEventListener('click', ev =>{
            ev.preventDefault();
            if(ev){
                enlace.innerHTML = 'cree una cuenta';
                setTimeout(ev =>{
                 enlace.innerHTML = 'error' 
                }, 3000);
                
            }
    });
});

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
        console.log(data);
    })
    .catch(err =>{
        console.log(err);
    })
});
    

