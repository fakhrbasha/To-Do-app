// 686d7e1834a1869ccb28c5e6 apiKey

let inputTask = document.getElementById("task");
let btn = document.getElementById("btn");

btn.addEventListener("click", function () {
    addTodo();
});

async function addTodo() {
    console.log(inputTask.value);
    let data = {
        title: inputTask.value,
        apiKey: "686d7e1834a1869ccb28c5e6",
    };
    let response = await fetch("https://todos.routemisr.com/api/v1/todos", {
        method: "post",
        body: JSON.stringify(data),
        headers: { "content-type": "application/json" },
        cache: 'default'
    });
    let dataa = await response.json();
    console.log(dataa);
    if (dataa.message == "success") {
        getAllTodo();
    }
}
async function getAllTodo() {
    var response = await fetch(
        "https://todos.routemisr.com/api/v1/todos/686d7e1834a1869ccb28c5e6"
    );
    var data = await response.json();
    console.log(data);
    display(data.todos);
}
function display(allTasks) {
    var content = ``;
    for (var i = 0; i < allTasks.length; i++) {
        content += `
 <div class="${allTasks[i].completed ? 'bg-danger' : ''} tasks my-3 rounded text-light d-flex justify-content-between w-75 m-auto px-3 py-2 align-items-center">
 <div class="task">
     <p class="${allTasks[i].completed ? 'text-decoration-line-through' : ''} task-text m-0 p-0">${allTasks[i].title}</p>
 </div>
 <div>
    <i onclick="taskCompleted('${allTasks[i]._id}')" class="fa-regular fa-circle-check"></i>
     <i onclick="deleteTodo('${allTasks[i]._id}')" class="fa-solid fa-trash mx-2"></i>
 </div> 
 </div>

`;
    }
    document.getElementById("tasks").innerHTML = content;
}
getAllTodo()


async function taskCompleted(todo_id) {
    console.log(todo_id)
    let obj = {
        todoId: todo_id
    }

    let response = await fetch('https://todos.routemisr.com/api/v1/todos', {
        method: 'put',
        body: JSON.stringify(obj),
        headers: { 'content-type': 'application/json' }
    })

    let result = await response.json()
    if (result.message == 'success') {
        getAllTodo()
    }
}


async function deleteTodo(todo_id) {
    let obj = {
        todoId: todo_id
    }

    var response = await fetch('https://todos.routemisr.com/api/v1/todos', {
        method: 'delete',
        body: JSON.stringify(obj),
        headers: { 'content-type': 'application/json' }
    })

    var result = await response.json()
    if (result.message == 'success') {
        getAllTodo()
    }
}