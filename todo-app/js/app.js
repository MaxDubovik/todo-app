const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

addTaskBtn.addEventListener('click', addTask);

function addTask() {

  const taskText = taskInput.value.trim();
  if (taskText === '') return;

  const li = document.createElement('li');
  li.textContent = taskText;

  // удаление по клику
  li.addEventListener('click', () => {
    li.classList.toggle('completed');
  });

  // ПКМ - удаление
  li.addEventListener('contextmenu', (e) => {
    e.preventDefault;
    li.remove();
  });

  taskList.appendChild(li);
  taskInput.value = '';
}