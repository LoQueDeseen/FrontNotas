console.log("Funciona!");
let selectCategorias = document.getElementById("selectCategoria");
let ListaDecategorias = [];
let categoryName = document.getElementById("categoryName");

function guardarValorSeleccionado() {
    let selectedCategoryId = selectCategoria.value;
    localStorage.setItem('selectedCategoryId', selectedCategoryId);
}

function restaurarValorSeleccionado() {
    let selectedCategoryId = localStorage.getItem('selectedCategoryId');
    if (selectedCategoryId) {
        selectCategoria.value = selectedCategoryId;
    }
}

selectCategoria.addEventListener('change', guardarValorSeleccionado);




////////////////INICIO DEL CRUD/////////


let promesaListarCategories = fetch("http://localhost:5088/api/categories")
.then(response =>{
    return response.json()
})
.then(data =>{

    


 data.forEach( function (element){
    let title = element.Name;
    let body  = element.Status;
    //console.log(element);
    ListaDecategorias.push(element);


    selectCategoria.innerHTML +=`<option value="${element.id}">${element.name}</option>`
    
 });

})



//Crear categorísas

let BotonCrearCategoria= document.getElementById("guardar");


BotonCrearCategoria.addEventListener('click',  ()=> {
    let nombre = document.getElementById("nombreCategoria");
    
    let date =  new Date();
    console.log (date);
    

    let category = {
        Name: nombre.value,
        Status: "visible",
        Create_at:date,
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

//Fin de crear categorías

//Actualizar nombre de categoría

let BotonEditarNombreCategoria= document.getElementById("guardarNuevoNombreCategoria");


BotonEditarNombreCategoria.addEventListener('click',  ()=> {
    let nombre = document.getElementById("nuevoNombreCategoria");
    
    let date =  new Date();
    console.log ("select :"+selectCategorias.value);
    

    let category = {
        Id: selectCategorias.value,
        Name: nombre.value,
        Status: "visible",
        Create_at:date,
        Update_at:date
    };

    console.log(category);
    console.log("categoria"+category);
    
    let promesaEditarCategorie =  fetch(`http://localhost:5088/api/Categories/${selectCategorias.value}`, 
    {
        method: 'PUT',
    body: JSON.stringify(category),
    headers: {'Content-Type':'application/json'}} )
    .then(r => { r.json()}).catch(errors => console.log(errors))

});

//eliminar categoria
let EliminarCategorie= document.getElementById("eliminarCategorie");


EliminarCategorie.addEventListener('click',  ()=> {
  
    
    let promesaEliminarCategorie =  fetch(`http://localhost:5088/api/Categories/${selectCategorias.value}`, 
    {method: 'DELETE'})
    .then(r => { r.json()
        location.reload();
    
    })

});

 //FIN DEL CRUD

 //MANTENER EL VALUE DEL SELECT //

 



window.onload = restaurarValorSeleccionado;

