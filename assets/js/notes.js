

async function loadNotes(){

   let requestC = await fetch("http://localhost:5088/api/categories");
   let responseC= await requestC.json();

    let category = responseC[0];
    

    let request = await fetch("http://localhost:5088/api/notes");
    let response = await request.json();

    let filterCategorie = response.filter(e => e.idCategory == category.id && e.status != "Oculta");

    let titleCategory = document.getElementById("categoryName");

    titleCategory.innerText = category.name;


    generateContent(filterCategorie);
}

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