const form = document.getElementById('task-form');
const titleInput = document.getElementById('task-title');
const descInput = document.getElementById('task-desc');
const taskList = document.getElementById('task-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = `task ${task.completed ? 'completed' : ''}`;
    li.innerHTML = `
      <strong>${task.title}</strong>
      <p>${task.desc || ''}</p>
      <div class="actions">
        <button class="done">${task.completed ? 'Undo' : 'Done'}</button>
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
      </div>
    `;

    // Events
    li.querySelector('.delete').onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };

    li.querySelector('.done').onclick = () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    };

    li.querySelector('.edit').onclick = () => {
      const newTitle = prompt('Edit Title:', task.title);
      const newDesc = prompt('Edit Description:', task.desc);
      if (newTitle !== null) {
        tasks[index].title = newTitle;
        tasks[index].desc = newDesc;
        saveTasks();
        renderTasks();
      }
    };

    taskList.appendChild(li);
  });
}

form.onsubmit = (e) => {
  e.preventDefault();
  const title = titleInput.value.trim();
  const desc = descInput.value.trim();
  if (!title) return;

  tasks.unshift({ title, desc, completed: false });
  saveTasks();
  renderTasks();
  form.reset();
};

renderTasks();
