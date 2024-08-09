
//var moment = require('moment');
let records = [];
const input = document.getElementById('myInput');
const button = document.getElementById('button');
const toDoList = document.getElementById("todo-list");
//const dateDIV = document.getElementById("dateDIV");

button.addEventListener('click', function(){
    fun1();
});


function fun1(){
    note = input.value;
    //time = timeStuff();
    const record = {
        'id': localStorage.length,
        'note': note,
    //    'date': time,
    };
    localStorage.setItem(record.id,record.note);  
    printNote(record.id, record.note);          
}

/*function timeStuff(){
    var myDate = new Date();
    var betterDate = moment(myDate).format("l");
    var time = moment(myDate).format("LTS");
    var timeDate = betterDate+" "+time;
    return timeDate;
}*/

document.getElementById("myScript").addEventListener("load",printNotes);

function printNotes(){
    for(let i = 0 ; i < localStorage.length ; i++){
        let key = localStorage.key(i);
        let idOutput = parseInt(key)+1;
        let noteOutput = localStorage.getItem(key);
        let div = makeDiv();
        const editButton = makeEditButton();
        const deleteButton = makeDeleteButton();
        let num = i + 1;
        div.innerHTML = '<p class="hidden">'+ idOutput +'</p><p class="num">'+ num + '</p> <p class="note">'+noteOutput+'</p>';
        div.appendChild(editButton);
        div.appendChild(deleteButton);
    }
}

function printNote(id,note){
    const editButton = makeEditButton();
    const deleteButton = makeDeleteButton();
    let div = makeDiv();
    newID = localStorage.length;
    div.innerHTML = '<p class="num">'+ newID + '</p> <p class="note">'+note+'</p>';
    div.appendChild(editButton);
    div.appendChild(deleteButton);
}

toDoList.addEventListener('click', (e) =>{
    if(e.target.classList.contains('edit-btn')){
        const toDoItem = e.target.parentNode;
        const toDoText = toDoItem.querySelector('.note');
        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.value = toDoText.textContent;
        editInput.class= "toDoItem";
        toDoItem.replaceChild(editInput,toDoText);
        editInput.addEventListener('blur',()=>{
            const newTodoText = editInput.value;
            const newTodoTextP = document.createElement('p');
            newTodoTextP.className = 'note';
            newTodoTextP.textContent = newTodoText;
            toDoItem.replaceChild(newTodoTextP,editInput);
            key = (parseInt(toDoItem.querySelector("p").textContent))-1;
            localStorage.setItem(key,newTodoTextP.textContent);            
        });

    }
});

toDoList.addEventListener('click', (e)=>{
    if(e.target.classList.contains('delete-btn')){
        const toDoItem = e.target.parentNode;
        const deleteID = parseInt(toDoItem.querySelector('p').textContent)-1;
        localStorage.removeItem(deleteID);
        toDoItem.remove();

    }

})

function makeDiv(){
    let div = document.createElement("div");
    div.className = 'toDoItem';
    toDoList.appendChild(div);
    return div;

}

function makeEditButton(){
    const editButton = document.createElement('button');
    editButton.className = 'edit-btn';
    editButton.textContent = 'Edit';
    return editButton;
}

function makeDeleteButton(){
    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-btn';
    deleteButton.textContent = 'Delete';
    return deleteButton;
}

