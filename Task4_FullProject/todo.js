const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");

// Get saved tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("anuTasks")) || [];

// Display saved tasks
displayTasks();

addButton.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    tasks.push(taskText);

    saveTasks();
    displayTasks();

    taskInput.value = "";
    taskInput.focus();
}

function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function (task, index) {

        const listItem = document.createElement("li");
        listItem.className = "task-item";

        const taskText = document.createElement("span");
        taskText.className = "task-text";
        taskText.textContent = task;

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function () {
            deleteTask(index);
        });

        listItem.appendChild(taskText);
        listItem.appendChild(deleteButton);

        taskList.appendChild(listItem);
    });
}

function deleteTask(index) {
    tasks.splice(index, 1);

    saveTasks();
    displayTasks();
}

function saveTasks() {
    localStorage.setItem("anuTasks", JSON.stringify(tasks));
}
