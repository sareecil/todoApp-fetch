const urlPrefix = 'https://todorestapi-20432433159e.herokuapp.com/api/';

const usersOp = document.querySelector(".usersOp")
const todoForm = document.querySelector(".todoForm");
const todoAddInput = document.querySelector(".todoAdd");
const tasks = document.querySelector(".tasks");
const actorId = document.querySelector("#actorId");
const assigneeId = document.querySelector("#assigneeId");


let todos = [];
let users = [];

// fetch(urlPrefix + "todos/")
//     .then(x => x.json())
//     .then(json => {
//         todos = json;
//         // console.log(todos);
//         for (const todo of todos) {
//             tasks.innerHTML += `
//             <li class="task">
//                 <label class="taskInput">${todo.title}</label>
//                 <button class="destroy">X</button>
//                 <input class="edit" value="${todo.title}">
//             </li>`
//         }
//         addTodo()
//     })

async function loadData() {
    todos = await fetch(urlPrefix + "todos/").then(x => x.json())
    users = await fetch(urlPrefix + "users/").then(x => x.json());
    render()
    bindClick()
}

function render() {
    for (const user of users) {
        actorId.innerHTML += `<option value="${user.id}">${user.username}</option>`
        assigneeId.innerHTML += `<option value="${user.id}">${user.username}</option>`
    }

    for (const todo of todos) {
        tasks.innerHTML += `
        <li class="task">
            <label>
                <input class="toggle">
                <span class="todoTitle">${todo.title}</span>
                <button data-todoId="${todo.id}" class="destroy">X</button>
                <button data-todoId="${todo.id}" class="detail">Detail</button>
            </label>
        </li>
        `
    }
    bindClick();
}

function addTodo(e) {
    e.preventDefault();
    let data = {
        title: todoAddInput.value,
        completed: false,
        actor: actorId.value,
        assignee: assigneeId.value
    };
    
    fetch('https://todorestapi-20432433159e.herokuapp.com/api/todos/create/', {
        method: "POST",
        headers:{
            'Content-type': 'application/json;'
        },
        body:JSON.stringify(data)
    })
    .then(x => x.json())
    .then(data => {
        tasks.innerHTML += `
        <li class="task">
            <label class="taskInput">${data.title}</label>
            <button class="destroy">X</button>
            <input class="edit" value="${data.id}">
            <button data-todoId="${data.id}" class="detail">Detail</button>
        </li>
    `
        todoAddInput.value = "";
    })
   
    bindClick();
}

todoForm.addEventListener("submit", addTodo)

for (const filter of document.querySelectorAll(".filters input")) {
    filter.addEventListener("click", function() {
        tasks.classList.value = "tasks " + this.value;
    });
}

// async function findTodo(id) {
//     const response = await fetch(`${urlPrefix}${id}/`).then(x => x.json())
//     return response;
// }

function completedTodo() {
    this.parentElement.classList.toggle("completed")
}

function removeTodo() {
    this.parentElement.parentElement.remove()   
}

function renderDetailPage(userName, userMail) {
    const user = userName.map(x => `
    <div class="userInfo">
        <h5>Username:${x.username}</h5>
        <p>UserMail: ${x.email}</p>
    </div>`
    );
   
}
 
function handleHomePageClick() {
    e.preventDefault();
    const userName = fetch(urlPrefix + "users/" + `${id}`).then(x => x.json());
    const userMail = fetch(`${urlPrefix}users/${email}`).then(x => x.json());
    console.log(userName);
    console.log(userMail);
    // renderDetailPage(userName, userMail);
}

function bindClick(){
    for (const btn of document.querySelectorAll(".todoTitle")) {
        btn.addEventListener("click", completedTodo) 
    }

    for (const btn of document.querySelectorAll(".destroy")) {
        btn.addEventListener("click", removeTodo)
    }

    document.querySelectorAll(".detail")
    .forEach(x => x.addEventListener("click", handleHomePageClick))

}

loadData()
