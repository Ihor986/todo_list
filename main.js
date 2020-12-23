const adminLog = 'testuser@todo.com';
const adminPass = '12345678';
const docLogin = document.querySelector('#login');
const docTodo = document.querySelector('#todo');
const docModalEdit = document.querySelector('#modalEdit');
const docoMdalDelete = document.querySelector('#modalDelete');
const wrongValue = document.querySelectorAll('.wrongValue');
const presenter = document.querySelector('#presenter');
const searchRequest = document.querySelector('#search');
const emailValue = document.querySelector('#email');
const passlValue = document.querySelector('#password');
const updatedTodoTask = document.querySelector('#editTodo');
let todoList = JSON.parse(localStorage.getItem("todoList")) || [];
emailValue.onfocus = function () {
    wrongValue[0].style.display = 'none';
}
passlValue.onfocus = function () {
    wrongValue[1].style.display = 'none';
}
function setItemToLS() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
}
function loginInline() {
    docLogin.style.display = 'inline';
    docTodo.style.display = 'none';
    docModalEdit.style.display = 'none';
    docoMdalDelete.style.display = 'none';
}
function todoInline() {
    docLogin.style.display = 'none';
    docTodo.style.display = 'inline';
    docModalEdit.style.display = 'none';
    docoMdalDelete.style.display = 'none';
}
function modalEditInline() {
    updatedTodoTask.value = '';
    docLogin.style.display = 'none';
    docTodo.style.display = 'none';
    docModalEdit.style.display = 'inline';
    docoMdalDelete.style.display = 'none';
}
function modalDeleteInline() {
    docLogin.style.display = 'none';
    docTodo.style.display = 'none';
    docModalEdit.style.display = 'none';
    docoMdalDelete.style.display = 'inline';
} 
function wrongValueInline() {
    wrongValue[0].style.display = 'inline';
    wrongValue[1].style.display = 'inline';
} 
function pageRefresh() {
    presenter.innerHTML = '';
    clearInputs();
    for (const todo of todoList) {
    appEndNewTodo(todo);
    }
}
function showTodo() {
    todoInline();
    pageRefresh();  
} 
function login() {
    // showTodo();
    // return;
    const log = document.querySelector('#email'); 
    const pass = document.querySelector('#password'); 
    sortByDoneDec();
    log.value === adminLog & pass.value === adminPass ? showTodo() : wrongValueInline();
    log.value = '';
    pass.value = '';
}
function addTodo() {
    const newTodo = {
        id: new Date().getTime(),
        date: (new Date()).toLocaleDateString().split("/"),
        time: (new Date()).toLocaleTimeString().slice(0,5).split("/"),
        priority:1,
        task: document.querySelector('#newTodo').value,
        isDone: false,
    };
    todoList.push(newTodo);
    setItemToLS();
    clearInputs();
    document.querySelector('#newTodo').value = '';
    searchRequest.value = '';
    appEndNewTodo(newTodo);
}
function clearInputs() {
    document.querySelector('#newTodo').value = '';
    searchRequest.value = '';
}
function sortByDateInc() {   
    todoList.sort((a, b) => a.id > b.id ? 1 : -1);
    pageRefresh();
}
function sortByDateDec() {
    todoList.sort((a, b) => a.id > b.id ? -1 : 1);
    pageRefresh();
}
function sortByPriorityInc() {
    todoList.sort((a, b) => a.isDone > b.isDone ? -1 : 1);
    todoList.sort((a, b) => a.priority > b.priority ? 1 : -1);
    pageRefresh();
}
function sortByPriorityDec() {
    todoList.sort((a, b) => a.isDone > b.isDone ? 1 : -1);
    todoList.sort((a, b) => a.priority > b.priority ? -1 : 1);
    pageRefresh();
}
function sortByDoneDec() {
    todoList.sort((a, b) => a.id > b.id ? -1 : 1);
    todoList.sort((a, b) => a.priority > b.priority ? -1 : 1);
    todoList.sort((a, b) => a.isDone > b.isDone ? 1 : -1);
    pageRefresh();
}
function search() {
    presenter.innerHTML = '';
    const request = searchRequest.value;
    for (const todo of todoList) {
        if (todo.task.toLowerCase().includes(request.toLowerCase())) {
                appEndNewTodo(todo);
        }   
    }
}
function appEndNewTodo (newTodo) {
    const todoBlock = document.createElement('div');
    todoBlock.setAttribute('class', 'todoBlock');
    todoBlock.setAttribute('id', newTodo.id );
    presenter.append(todoBlock);

    const dateTimeBlock = document.createElement('div');
    dateTimeBlock.setAttribute('class','dateTimeBlock');
    todoBlock.append(dateTimeBlock);
    const dateBlock = document.createElement('div');
    dateBlock.setAttribute('class','dateBlock');
    dateBlock.innerText = newTodo.date;
    dateTimeBlock.append(dateBlock);
    const timeBlock = document.createElement('div');
    timeBlock.setAttribute('class','timeBlock');
    timeBlock.innerText = newTodo.time;
    dateTimeBlock.append(timeBlock);

    const priorityBlock = document.createElement('div');
    priorityBlock.setAttribute('class','priorityBlock');
    priorityBlock.innerText = newTodo.priority;
    todoBlock.append(priorityBlock);

    const priorityChangeBlock = document.createElement('div');
    priorityChangeBlock.setAttribute('class','priorityChangeBlock');
    todoBlock.append(priorityChangeBlock);
    const increasePriority = document.createElement('button');
    increasePriority.setAttribute('class','increasePriority');
    increasePriority.innerText = "+ 1";
    priorityChangeBlock.append(increasePriority);
    increasePriority.onclick = function () {
        newTodo.priority++;
        if (newTodo.priority > 5) {
            newTodo.priority = 5;
        }
        search();
        setItemToLS();
    }
    const loweringPriority = document.createElement('button');
    loweringPriority.setAttribute('class','loweringPriority');
    loweringPriority.innerText = "- 1";
    priorityChangeBlock.append(loweringPriority);
    loweringPriority.onclick = function () {
        newTodo.priority--;
        if (newTodo.priority < 1) {
            newTodo.priority = 1;
        }
        search();
        setItemToLS();
    }
    const taskBlock = document.createElement('div');
    taskBlock.setAttribute('class','taskBlock');
    taskBlock.innerText = newTodo.task;
    todoBlock.append(taskBlock);

    const editBlock = document.createElement('button');
    editBlock.setAttribute('class', 'editBlock');
    editBlock.innerText = "edit";
    todoBlock.append(editBlock);
    editBlock.onclick = function () { 
        modalEditInline();
        document.querySelector('#editItem').onclick = function () {
            newTodo.task = updatedTodoTask.value;
            setItemToLS();
            showTodo();    
        }
    }
    function doneChangeAttribute() {
    if (newTodo.isDone === true) {
        isDoneBlock.removeAttribute('class');
        isDoneBlock.setAttribute('class', 'isDoneBlock');
        taskBlock.removeAttribute('class');
        taskBlock.setAttribute('class', 'doneTaskBlock');
        isDoneBlock.innerText = "done"; 
        } else {
        isDoneBlock.removeAttribute('class');
        isDoneBlock.setAttribute('class', 'isntDoneBlock');
        taskBlock.removeAttribute('class');
        taskBlock.setAttribute('class', 'taskBlock');
        isDoneBlock.innerText = "not done";
        }  
    }
    const isDoneBlock = document.createElement('button');
    isDoneBlock.setAttribute('class', 'isDoneBlock');
    if (newTodo.isDone === true) {
        doneChangeAttribute();
    } else {
        doneChangeAttribute();
    }
    todoBlock.append(isDoneBlock);
    isDoneBlock.onclick = function () { 
        if (newTodo.isDone === true) {
            newTodo.isDone = false;
            doneChangeAttribute();
        } else {
            newTodo.isDone = true;
            doneChangeAttribute();
        }
        setItemToLS();
    }
    const isdeleteBlock = document.createElement('button');
    isdeleteBlock.setAttribute('class', 'isdeleteBlock');
    isdeleteBlock.innerText = "delete";
    todoBlock.append(isdeleteBlock);
    isdeleteBlock.onclick = function () {
        modalDeleteInline();
        document.querySelector('#deleteItem').onclick = function () {
        todoBlock.remove();
        const indexOfTodoList = todoList.indexOf(newTodo);
        todoList.splice(indexOfTodoList, 1);
        setItemToLS();
        showTodo();
        }
    }       
}