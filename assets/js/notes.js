const btnCreate = document.getElementById("btn-Create");
const btnupdate = document.getElementById("btn-Update");
let input_id = document.formNote.idNota;
let input_title = document.formNote.title;
let input_content = document.formNote.content;
let input_category = document.formNote.categoryId;
const date = new Date();

btnupdate.style.display = "none";

//Cargar Notas
async function loadNotes(categoria) {
  

  let requestC = await fetch("http://localhost:5088/api/categories");
  let responseC = await requestC.json();

  let request = await fetch("http://localhost:5088/api/notes");
  let response = await request.json();

  let filterCategory = null;

  let titleCategory = document.getElementById("categoryName");
  let idCategory = document.getElementById("categoryId");
  let categoriaActiva = null;

  if (categoria == 0) {
    //traer la primera de las categories si no hay nada
    categoriaActiva = responseC[0];
    filterCategory = response.filter(
      (e) => e.idCategory == categoriaActiva.id && e.status != "Oculta"
    );

    titleCategory.innerText = categoriaActiva.name;
    idCategory.value = categoriaActiva.id;
  } else {

    categoriaActiva = responseC.find((c) => c.id === categoria);
    console.log(categoriaActiva);

    filterCategory = response.filter(
      (e) => e.idCategory == categoriaActiva.id && e.status != "Oculta"
    );
    console.log(filterCategory);
    titleCategory.innerText = categoriaActiva.name;
    idCategory.value = categoriaActiva.id;
  }

  generateContent(filterCategory);
}

//Generar contenido de las notas
function generateContent(data) {
  let totalNotes = data.length;

  let spanTotal = document.getElementById("totalNotes");
  let listNotes = document.getElementById("lista-notas");
  listNotes.innerHTML = "";

  spanTotal.innerText = totalNotes;

  data.forEach((element) => {
    let nota = `<div class="nota pegatina">
                        <h3 class="card-title">${element.title}</h3>
                        <div class="card-body">
                            <p>${element.body}</p>
                            <div class="d-flex">
                            </div>
                            </div>
                            <div class="card-footer ">
                            <div class="row">
                            <div class="card-btns col-md-6">
                              <button class="btn btn-sm btn-primary" onclick="modalEditar(${element.id});"><i class="bi bi-pencil-square"></i></button>
                              <button class="btn btn-sm btn-secondary" onclick="deleteNote(${element.id});"><i class="bi bi-eye-slash"></i></button>

                            </div>
                            <div class="col-md-6">
                              <span class="fecha float-end">${element.create_at}</span>
                            </div>
                          </div>
                        </div>
                    </div>`;
    listNotes.innerHTML += nota;
  });
}

btnCreate.addEventListener("click", addNote);

//funcionalidad para agregar nota
async function addNote() {
  
  console.log(input_category.value);

  if (input_title.value != "" && input_content.value != "") {

    let nota = {
      Title: input_title.value,
      Body: input_content.value,
      Status: "Activa",
      Create_at: date,
      Updated_at: null,
      idCategory: parseInt(input_category.value),
    };
    console.log(nota);

    let request = await fetch("http://localhost:5088/api/Notes", {
      method: "POST",
      body: JSON.stringify(nota),
      headers: { "Content-Type": "application/json" },
    });

    let response = await request.json();
    console.log(response);

    if (request.status == 200 || request.ok == true) {
      restauarModal();
      closeModal();
      loadNotes(response.idCategory);
    } else {
      console.log("Error al crear la nota, intente más tarde!");
    }
  } else {
    let message = "Los campos obligatorios están vacios";
    console.log(message);
  }
}

//funcionalida para abrir modal de notas
async function modalEditar(id) {
  console.log("editar" + id);
  restauarModal();
  modal.style.display = "block";
  btnupdate.style.display = "block";
  btnCreate.style.display = "none";

  try{
    let request = await fetch(`http://localhost:5088/api/Notes/${id}`);
    let response = await request.json();

    input_id.value = response.id;
    input_title.value = response.title;
    input_category.value = response.idCategory;
    input_content.value = response.body;

  console.log(response);
  }catch(Error){
    console.log("Error: "+ Error);
  }

}

btnupdate.addEventListener("click", editNote);

async function editNote(){

  console.log("cvamos a editar lanota");
  let idNote = input_id.value;
  if (input_title.value != "" && input_content.value != "") {
    let nota = {
      id: idNote,
      Title: input_title.value,
      Body: input_content.value,
      Status: "Activa",
      Create_at: date,
      Updated_at: date,
      idCategory: parseInt(input_category.value),
    };
    console.log(nota);

    let request = await fetch(`http://localhost:5088/api/Notes/${idNote}`, {
      method: "PUT",
      body: JSON.stringify(nota),
      headers: { "Content-Type": "application/json" },
    });

    if (request.status == 200 || request.ok == true) {
      restauarModal();
      closeModal();
      loadNotes(parseInt(input_category.value));
    } else {
      console.log("Error al editarla nota, intente más tarde!");
    }
  } else {
    let message = "Los campos obligatorios están vacios";
    console.log(message);
  }
}

//funcionalida de ocultar notas
async function deleteNote(id) {
  console.log("ocultar" + id);

  let request = await fetch(`http://localhost:5088/apiNotes/${id}`);
  // .then(r => r.json()).then(data => console.log(data));
  let response =  await request.json();

  console.log(response);
  let nota = {
    // Id: response.id,
    Title: response.title,
    Body: response.content,
    Status: "Oculta",
    Create_at: response.create_at,
    Updated_at: date,
    idCategory: response.idCategory

  };

  try {
    
    let requestUpdate = await fetch(
      `http://localhost:5088/api/Notes/editNote/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(nota),
        headers: { "Content-Type": "application/json" },
      });
  
    let responseUpdate = requestUpdate.json();
  
    console.log(responseUpdate);
    if (requestUpdate.status == 200 || requestUpdate.ok) {
      // refrescar las notas
      loadNotes(response.idCategory);
    } else {
      console.log("Error al ocultar la nota");
    }

  } catch (error) {
      console.log(error);
  }

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

span.addEventListener("click", closeModal);

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

function closeModal() {
  modal.style.display = "none";
  restauarModal();
}


function restauarModal(){

  input_title.value = "";
  input_category.value = "";
  input_content.value = "";
}