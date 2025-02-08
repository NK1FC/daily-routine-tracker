document.addEventListener('DOMContentLoaded', () => {
    const tasks = ["Exercise", "DSA", "Try Something New", "Aim Training"];
    const taskList = document.getElementById('task-list');
    const syncButton = document.getElementById('sync-button');
    const newTaskInput = document.getElementById('new-task-input');
    const addTaskButton = document.getElementById('add-task-button');
    const datePicker = document.getElementById('date-picker');
    const currentDate = new Date().toISOString().split('T')[0];

    datePicker.value = currentDate;

    // Load tasks from local storage
    function loadTasks(date) {
        const storedTasks = JSON.parse(localStorage.getItem(date)) || [];
        renderTasks(storedTasks, date);
    }

    // Render tasks
    function renderTasks(storedTasks, date) {
        taskList.innerHTML = '';
        if (storedTasks.length === 0) {
            const noDataMessage = document.createElement('li');
            noDataMessage.textContent = 'No data';
            taskList.appendChild(noDataMessage);
        } else {
            storedTasks.forEach((task, index) => {
                const li = document.createElement('li');
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.checked = task.done;
                checkbox.addEventListener('change', () => {
                    task.done = checkbox.checked;
                    localStorage.setItem(date, JSON.stringify(storedTasks));
                });
                li.appendChild(checkbox);

                const taskText = document.createElement('span');
                taskText.textContent = task.name;
                taskText.addEventListener('click', () => {
                    const newTaskName = prompt('Edit task:', task.name);
                    if (newTaskName !== null && newTaskName.trim() !== '') {
                        task.name = newTaskName.trim();
                        localStorage.setItem(date, JSON.stringify(storedTasks));
                        renderTasks(storedTasks, date);
                    }
                });
                li.appendChild(taskText);

                taskList.appendChild(li);
            });
        }
    }

    loadTasks(currentDate);

    // Add new task
    addTaskButton.addEventListener('click', () => {
        const newTaskName = newTaskInput.value.trim();
        const selectedDate = datePicker.value;
        const storedTasks = JSON.parse(localStorage.getItem(selectedDate)) || [];
        if (newTaskName) {
            storedTasks.push({ name: newTaskName, done: false });
            localStorage.setItem(selectedDate, JSON.stringify(storedTasks));
            renderTasks(storedTasks, selectedDate);
            newTaskInput.value = '';
        }
    });

    // Sync tasks to local storage (no Firebase)
    syncButton.addEventListener('click', () => {
        const selectedDate = datePicker.value;
        const storedTasks = JSON.parse(localStorage.getItem(selectedDate)) || [];
        localStorage.setItem(selectedDate, JSON.stringify(storedTasks));
        alert('Tasks saved locally!');
    });

    // Load tasks when date changes
    datePicker.addEventListener('change', () => {
        const selectedDate = datePicker.value;
        loadTasks(selectedDate);
    });
});
