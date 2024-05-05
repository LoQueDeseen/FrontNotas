const btnCreate = document.getElementById("btn-Create");

const date = new Date();

//Cargar Notas 
async function loadNotes(categoria){
  console.log(categoria);

   let requestC = await fetch("http://localhost:5088/api/categories");
   let responseC= await requestC.json();

   let request = await fetch("http://localhost:5088/api/notes");
   let response = await request.json();

   let filterCategory = null;

   let titleCategory = document.getElementById("categoryName");
   let idCategory = document.getElementById("categoryId");
   let categoriaActiva = null;

   if(categoria == 0){
      //traer la primera de las categories si no hay nada 
     console.log("Esta vacia");
     categoriaActiva = responseC[0];
     filterCategory = response.filter(e => e.idCategory == categoriaActiva.id && e.status != "Oculta");
     
     titleCategory.innerText = categoriaActiva.name;
     idCategory.value = categoriaActiva.id;

    }else{

      console.log("Esta llena");

      categoriaActiva = responseC.find(c => c.id === categoria);
      console.log(categoriaActiva);

      filterCategory = response.filter(e => e.idCategory == categoriaActiva.id && e.status != "Oculta");
      console.log(filterCategory);
      titleCategory.innerText = categoriaActiva.name;
      idCategory.value = categoriaActiva.id;
     
   }
   


    generateContent(filterCategory);
}


//Generar contenido de las notas
function generateContent(data){
    let totalNotes = data.length;
    
    let spanTotal = document.getElementById("totalNotes");
    let listNotes = document.getElementById("lista-notas");
    listNotes.innerHTML = "";

    spanTotal.innerText = totalNotes;
    
    data.forEach(element => {
        
        let nota = `<div class="nota pegatina">
                        <h3 class="card-title">${element.title}</h3>
                        <div class="card-body">
                            <p>${element.body}</p>
                            <div class="d-flex">
                            <span class="fecha float-end">${element.create_at}</span>
                            </div>
                        </div>
                        <div class="card-footer ">
                            <button class="btn btn-sm btn-primary" onclick="editNote(${element.id});"><i class="fa-solid fa-pencil"></i>Edit</button>
                            <button class="btn btn-sm btn-danger" onclick="deleteNote(${element.id});"><i class="fa-solid fa-trash"></i>Delete</button>
                        </div>
                    </div>`;
        listNotes.innerHTML += nota;
    });
}


btnCreate.addEventListener("click", addNote);

async function addNote(){
  let input_title = document.formNote.title.value;
  let input_content = document.formNote.content.value;
  let input_category = document.formNote.categoryId.value;

  if(input_title != ""  && input_content !=""){
    
    let nota = {
      Title: input_title,
      Body: input_content,
      Status: "Activa",
      Create_at: date,
      Updated_at :null,
      idCategory: parseInt(input_category)
      
    }
    console.log(nota);

    let request = await fetch("http://localhost:5088/api/Notes", {
      method: "POST",
      body: JSON.stringify(nota),
      headers: { "Content-Type": "application/json" },
    });
  
    if(request.status == 200 || request.ok == true){
      loadNotes();
    }else{
      console.log("Error al crear la nota, intente más tarde!");
    }
   
}else{
  let message = "Los campos obligatorios están vacios";
  console.log(message);
  }
}


function deleteNote(id){

  console.log("ocultar"+id);
}


function editNote(id) {
  console.log("editar"+id);
}


// llamar la funcoin cuando cargue el DOM
window.addEventListener("DOMContentLoaded", loadNotes(0));


// Modal notas 
let modal = document.getElementById("myModal");
let btnModal = document.getElementById("btnModal");
let span = document.getElementsByClassName("close")[0];

btnModal.onclick = function () {
  modal.style.display = "block";
};

span.addEventListener("click", closeModal)

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}; 


function closeModal(){
  modal.style.display = "none";
}