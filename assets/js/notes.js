const btnCreate = document.getElementById("btn-Create");

const date = new Date();

//Cargar Notas 
async function loadNotes(){

   let requestC = await fetch("http://localhost:5088/api/categories");
   let responseC= await requestC.json();

    let category = responseC[0];
  
    let request = await fetch("http://localhost:5088/api/notes");
    let response = await request.json();

    let filterCategorie = response.filter(e => e.idCategory == category.id && e.status != "Oculta");

    let titleCategory = document.getElementById("categoryName");
    let idCategory = document.getElementById("categoryId");

    titleCategory.innerText = category.name;
    idCategory.value = category.id;


    generateContent(filterCategorie);
}


//Generar contenido de las notas
function generateContent(data){
    let totalNotes = data.length;
    
    let spanTotal = document.getElementById("totalNotes");
    let listNotes = document.getElementById("lista-notas");

    spanTotal.innerText = totalNotes;
    
    data.forEach(element => {
        
        let nota = `<div class="nota pegatina">
                        <div class="card-body">
                            <h3 class="card-title">${element.title}</h3>
                            <p>${element.body}</p>
                        </div>
                        <div class="card-footer">
                            <button class="btn  btn-primary"><i class="fa-solid fa-pencil"></i>Edit</button>
                             <span class="fecha">${element.create_at}</span>
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
  
   console.log(request);   
}else{
  let message = "Los campos obligatorios están vacios";
  console.log(message);
  }



}


// llamar la funcoin cuando cargue el DOM
window.addEventListener("DOMContentLoaded", loadNotes);


// Modal notas 
let modal = document.getElementById("myModal");
let btnModal = document.getElementById("btnModal");
let span = document.getElementsByClassName("close")[0];

btnModal.onclick = function () {
  modal.style.display = "block";
};

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}; 