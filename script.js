document.addEventListener('DOMContentLoaded', () => {
  const todoInput = document.getElementById("to-do");
  const addTaskButton = document.getElementById("add-task-btn");
  const todoList = document.getElementById("todo-list");

  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  tasks.forEach(task => renderTask(task));

  addTaskButton.addEventListener('click', () => {
    const taskText = todoInput.value.trim();
    if (taskText === "") return;

    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };

    tasks.push(newTask);
    saveTasks();
    renderTask(newTask);
    todoInput.value = "";
    console.log(tasks);
  });

  function renderTask(task) {
    const li = document.createElement('li');
    li.setAttribute('data-id', task.id);
    if (task.completed) li.classList.add('completed');

    const span = document.createElement('span');
    span.textContent = task.text;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.style.backgroundColor = 'red';
    deleteBtn.style.height = '35px';
    deleteBtn.style.width = '80px';
    deleteBtn.style.borderRadius = '6px';
    deleteBtn.style.padding = '10px 20px';
    deleteBtn.style.border = 'none';
    deleteBtn.style.fontSize = '16px';
    deleteBtn.style.color = 'white';
    deleteBtn.style.cursor = 'pointer';
    deleteBtn.style.transition = 'background-color 0.3s ease';
    deleteBtn.addEventListener('click', () => {
      li.remove();
      removeTask(task.id);
    });
li.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') return;

  const currentTask = tasks.find(t => t.id === task.id);
  if (currentTask) {
    currentTask.completed = !currentTask.completed;
    li.classList.toggle('completed');
    saveTasks();
  }
});


    li.appendChild(span);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);
  }

  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  window.removeTask = function(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
  }
});
