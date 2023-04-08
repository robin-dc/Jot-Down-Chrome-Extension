const bookmarkBtn = document.querySelector(".bookmark-btn");
const noteBtn = document.querySelector(".note-btn");
const bookmarkUI = document.querySelector(".bookmark");
const notesUI = document.querySelector(".notes");
const title = document.getElementById("tab");
const noteList = document.getElementById("note-list");
const bookmarkList = document.getElementById("bookmark-list");
const input = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const tabBtn = document.getElementById("tab-btn");

bookmarkBtn.addEventListener("click", function(){
    bookmarkBtn.classList.add("active");
    noteBtn.classList.remove("active");
    bookmarkUI.classList.add("active");
    notesUI.classList.remove("active");
    title.textContent = "BookMark";
})
noteBtn.addEventListener("click", function(){
    noteBtn.classList.add("active");
    bookmarkBtn.classList.remove("active");
    notesUI.classList.add("active");
    bookmarkUI.classList.remove("active");
    title.textContent = "NotePad";
})

let notesArray = []
let tabArray = []

let notesLocalStorage = JSON.parse(localStorage.getItem("notes"))
let bookmarkLocalStorage = JSON.parse(localStorage.getItem("tabs"))

if(notesLocalStorage){
    notesArray = notesLocalStorage
    renderNotes(notesLocalStorage)
}

if(bookmarkLocalStorage){
    tabArray = bookmarkLocalStorage
    renderLinks(bookmarkLocalStorage)
}
input.addEventListener('keypress', function(e){
    if(e.key === "Enter"){
        addNote()
    }
})
inputBtn.addEventListener("click", function(e){
    if(input.value == ""){
        return;
    }
    else{
        addNote()
    }

})
function addNote(){
    notesArray.push(input.value)
    localStorage.setItem("notes", JSON.stringify(notesArray))
    renderNotes(notesArray)
    input.value = ""
}

function renderNotes(array){
    let notes = ""
    for(let i = 0; i < array.length; i++){
        notes += `<li><p>${array[i]}</p></li>`
    }
    noteList.innerHTML = notes
}

tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        tabArray.push(
            {title:tabs[0].title,
             link:tabs[0].url}
            )
        localStorage.setItem("tabs", JSON.stringify(tabArray))
        renderLinks(tabArray)
    })
})

function renderLinks(array){
    let links = ""
    for(let i = 0; i < array.length; i++){
        links += `<li><a href="${array[i].link}" target="_blank">${array[i].title}</a></li>`
    }
    bookmarkList.innerHTML = links
}
