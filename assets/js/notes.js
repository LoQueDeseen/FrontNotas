

async function loadNotes(){

   let requestC = await fetch("http://localhost:5088/api/categories");
   let responseC= await requestC.json();

    let category = responseC[0];
    console.log(category.id);

    let request = await fetch("http://localhost:5088/api/notes");
    let response = await request.json();

    let filterCategorie = response.filter(e => e.idCategory == category.id && e.status != "Oculta");
    console.log(filterCategorie);

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
                            <h3>${element.title}</h3>
                            <p>${element.body}</p>
                        </div>
                        <div class="card-footer">
                            <button class="btn  btn-success"><i class="bi bi-pencil-square"></i></button>
                             <span>${element.create_at}</span>
                        </div>
                    </div>`;
        listNotes.innerHTML += nota;
    });
}

window.addEventListener("DOMContentLoaded", loadNotes);