document.addEventListener('DOMContentLoaded', () => {
    const tasks = ["Exercise", "DSA", "Try Something New", "Aim Training"];
    const taskList = document.getElementById('task-list');
    const syncButton = document.getElementById('sync-button');
    const newTaskInput = document.getElementById('new-task-input');
    const addTaskButton = document.getElementById('add-task-button');
    const currentDate = new Date().toISOString().split('T')[0];

    // Load tasks from local storage
    const storedTasks = JSON.parse(localStorage.getItem(currentDate)) || tasks.map(task => ({ name: task, done: false }));

    // Render tasks
    function renderTasks() {
        taskList.innerHTML = '';
        storedTasks.forEach((task, index) => {
            const li = document.createElement('li');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.done;
            checkbox.addEventListener('change', () => {
                task.done = checkbox.checked;
                localStorage.setItem(currentDate, JSON.stringify(storedTasks));
            });
            li.appendChild(checkbox);

            const taskText = document.createElement('span');
            taskText.textContent = task.name;
            taskText.addEventListener('click', () => {
                const newTaskName = prompt('Edit task:', task.name);
                if (newTaskName !== null && newTaskName.trim() !== '') {
                    task.name = newTaskName.trim();
                    localStorage.setItem(currentDate, JSON.stringify(storedTasks));
                    renderTasks();
                }
            });
            li.appendChild(taskText);

            taskList.appendChild(li);
        });
    }

    renderTasks();

    // Add new task
    addTaskButton.addEventListener('click', () => {
        const newTaskName = newTaskInput.value.trim();
        if (newTaskName) {
            storedTasks.push({ name: newTaskName, done: false });
            localStorage.setItem(currentDate, JSON.stringify(storedTasks));
            renderTasks();
            newTaskInput.value = '';
        }
    });

    // Sync tasks to local storage (no Firebase)
    syncButton.addEventListener('click', () => {
        localStorage.setItem(currentDate, JSON.stringify(storedTasks));
        alert('Tasks saved locally!');
    });
});
