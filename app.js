let tasks = [];

function addTask() {
    const taskInput = document.getElementById("new-task");
    const taskText = taskInput.value.trim();

    if (taskText) {
        tasks.push({ text: taskText, done: false });
        taskInput.value = '';
        displayTasks();
    }
}

function displayTasks(filter = 'all') {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = '';

    tasks
        .filter(task => {
            if (filter === 'done') return task.done;
            if (filter === 'todo') return !task.done;
            return true;
        })
        .forEach((task, index) => {
            const li = document.createElement("li");
            li.className = task.done ? 'done' : '';
            li.innerHTML = `
                <span>${task.text}</span>
                <div>
                    <button onclick="toggleTask(${index})">
                        <img src="check-icon.png" alt="Done">
                    </button>
                    <button onclick="editTask(${index})">
                        <img src="edit-icon.png" alt="Edit">
                    </button>
                    <button onclick="deleteTask(${index})">
                        <img src="delete-icon.png" alt="Delete">
                    </button>
                </div>
            `;
            taskList.appendChild(li);
        });
}

function toggleTask(index) {
    tasks[index].done = !tasks[index].done;
    displayTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    displayTasks();
}

function deleteDoneTasks() {
    tasks = tasks.filter(task => !task.done);
    displayTasks();
}

function deleteAllTasks() {
    tasks = [];
    displayTasks();
}

function editTask(index) {
    const newTask = prompt("Edit your task:", tasks[index].text);
    if (newTask !== null) {
        tasks[index].text = newTask.trim();
        displayTasks();
    }
}

function filterTasks(filter) {
    displayTasks(filter);
}
