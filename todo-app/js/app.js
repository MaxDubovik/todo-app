const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

let tasks = [];

// загружаем задачи при старте
loadTasks();

addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTask();
})

function addTask() {

  const taskText = taskInput.value.trim();
  if (taskText === '') return;

  const newTask = {
    text: taskText,
    completed: false
  }

  tasks.push(newTask);
  saveTasks();
  renderTasks();

  taskInput.value = '';
}

function renderTasks() {
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.textContent = task.text;

    if (task.completed) {
      li.classList.add('completed');
    }

    // отмена выполнения
    li.addEventListener('click', () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    })

    // удаление по ПКМ
    li.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    })

    taskList.appendChild(li);
  })
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const saved = localStorage.getItem('tasks');
  if (saved) {
    tasks = JSON.parse(saved);
    renderTasks();
  }
}