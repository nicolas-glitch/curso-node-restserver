// traer todo el html




const url = 'http://localhost:8080/api/novedades';
const token = localStorage.getItem('token');
const paciente = localStorage.getItem('paciente');
fetch(url, {
    method: 'GET',
    headers: {'x-token': token,'paciente': paciente}
})
.then( res => res.json())
.then((data) =>{
    const {citas, novedades} = data;
    for(let i=0; i<citas.length;i++){
        const numeroCita = document.querySelector(`#numeroCitas${i+1}`);
        numeroCita.innerHTML= citas[i].especialidad;
    }
    
    
    for(let i=0; i<novedades.length;i++){
        const novedad = document.querySelector(`#novedad${i+1}`);
        novedad.innerHTML=novedades[i].observacion;

    }
})
.catch(err =>{
    console.log(err);
});
    