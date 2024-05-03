console.log("Funciona!");

let selectCategorias = document.getElementById("selectCategoria")

let promesaListarCategories = fetch("http://localhost:5088/api/categories")
.then(response =>{
    return response.json()
})
.then(data =>{


 data.forEach( function (element){
    let title = element.Name;
    let body  = element.Status;
    console.log(element);

    selectCategoria.innerHTML +=`<option value="">${element.name}</option>`
    
 });

})


let BotonCrearCategoria= document.getElementById("guardar");
console.log("boton"+BotonCrearCategoria);

BotonCrearCategoria.addEventListener('click',  ()=> {
    let nombre = document.getElementById("nombreCategoria")
    let estado = document.getElementById("estadoCategoria")
    

    let category = {
        Name: nombre.value,
        Status: estado.value ,
        Create_at:null,
        Update_at:null
    };

    console.log(category);
    console.log("categoria"+category);
    
    let promesaCrearCategorie =  fetch("http://localhost:5088/api/Categories", 
    {
        method: 'POST',
    body: JSON.stringify(category),
    headers: {'Content-Type':'application/json'}} )
    .then(r => { r.json()}).catch(errors => console.log(errors))

});
