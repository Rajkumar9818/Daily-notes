showNotes();
//if user add a notes ,add it to local storage;
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function (e) {
    let addText = document.getElementById('addText');
    let editTitles = document.getElementById('editTitles');
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    data = [];
    if (addText.value != "" && editTitles.value != "") {
        data.push(addText.value);
        data.push(editTitles.value);
        notesObj.push(data);
        localStorage.setItem("notes", JSON.stringify(notesObj));
    }
    else {
        if (addText.value == "" && editTitles.value == "") {
            alert("Enter both title and data");
        }
        else if (addText.value == "")
            alert("Enter data");
        else {
            alert("Enter Titles");
        }

    }
    addText.value = "";
    editTitles.value = "";

    showNotes();

})





// function to show notes on local Storage;
function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
            <div  class="notesCard my-2 mx-2 card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">Title : ${element[1]}</h5>
              <p class="card-Text">${element[0]}</p>
              <button id="${index}"onClick=" deleteNotes(this.id)" class="btn btn-primary"> Delete notes </button>
            </div>
          </div> `;
    });
    let notesElm = document.getElementById("notes")
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `Noting to show  use "Add section " to add notes`;
    }

}
// for deleting the notes;
function deleteNotes(index) {
    
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}
let search = document.getElementById('searchText');
search.addEventListener("input", function () {
    let inputVal = search.value.toLowerCase();
    let notesCard = document.getElementsByClassName('notesCard');
    Array.from(notesCard).forEach(function (element) {
        let cardText = element.getElementsByTagName("h5")[0].innerText;
        let cardText1 = element.getElementsByTagName("p")[0].innerText;
        cardText = cardText + cardText1;
        if (cardText.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
});