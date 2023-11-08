const todoInput = document.getElementById('todo');
const dateInput = document.getElementById('date');
const addButton = document.getElementById('add-todo');
const alertMessageBox = document.getElementById('alert-message-box');
const tableBody = document.getElementById('tbody')
const deleteAllButton = document.getElementById('delete-all')

const showAlert = (message, type) => {
    alertMessageBox.innerHTML = '';
    const alertMessage = document.createElement('p');
    alertMessage.innerText = message

    alertMessage.classList.add(`show-alert-${type}`)

    alertMessageBox.append(alertMessage)

    setTimeout(() => {
        alertMessage.style.display = 'none';
    }, 3000);
}

const todos = JSON.parse(localStorage.getItem('todos')) || []

const addTodoHandler = () => {
    const todoData = {
        task: todoInput.value,
        date: dateInput.value,
        status: 'pending'
    }

    if (todoData.task && todoData.date) {
        todos.push(todoData)
        saveToLocalStorage();
        todoInput.value = ''
        dateInput.value = ''
        showAlert("todo added", "success")
        showTodos();
    } else {
        showAlert("please enter value", "error")
    }
}

const showTodos = () => {
    tableBody.innerHTML = ''
    todos.forEach((todo) => {
        tableBody.innerHTML += `<tr>
            <td>${todo.task}</td>
            <td>${todo.date}</td>
            <td>${todo.status}</td>
            <td>
                <button class='Edit'>Edit</button>
                <button class='Do'>Do</button>
                <button class='Delete'>Delete</button>
            </td>
            </tr>`
    })
};

showTodos()

const saveToLocalStorage = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
};

const deleteAll = () => {
    localStorage.removeItem("todos");
    window.location.reload()
}

addButton.addEventListener('click', addTodoHandler)
deleteAllButton.addEventListener('click', deleteAll)
