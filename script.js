const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');
const displaySection = document.getElementById('displaySection');
const itemsLeft = document.getElementById('itemsLeft');
const filterAllBtn = document.getElementById('filterAllBtn');
const filterActiveBtn = document.getElementById('filterActiveBtn');
const filterCompletedBtn = document.getElementById('filterCompletedBtn');

let filter = 'all';

function createTodo() {
  const todoText = todoInput.value.trim();
  if (todoText === '') {
    return;
  }

  const todoItem = document.createElement('div');
  todoItem.className = 'todo-item';

  const radioBtn = document.createElement('input');
  radioBtn.type = 'radio';
  radioBtn.addEventListener('change', () => {
    updateItemsLeftText();
  });
  todoItem.appendChild(radioBtn);

  const label = document.createElement('label');
  label.textContent = todoText;
  todoItem.appendChild(label);

  const removeBtn = document.createElement('span');
  removeBtn.className = 'remove';
  removeBtn.textContent = 'X';
  removeBtn.addEventListener('click', () => {
    todoItem.remove();
    updateItemsLeftText();
    updateLocalStorage();
  });
  todoItem.appendChild(removeBtn);

  todoList.appendChild(todoItem);

  todoInput.value = '';
  displaySection.style.display = 'block';
  updateItemsLeftText();
  updateLocalStorage();
  filterTodos();
}

function updateItemsLeftText() {
  const itemsCount = todoList.childElementCount;
  const completedCount = document.querySelectorAll('.todo-item input[type="radio"]:checked').length;
  const itemsLeftCount = itemsCount - completedCount;
  itemsLeft.textContent = `Items left: ${itemsLeftCount}`;
}

function updateLocalStorage() {
  const todoItems = Array.from(todoList.children).map((item) => item.querySelector('label').textContent);
  localStorage.setItem('todoItems', JSON.stringify(todoItems));
}

function getTodoItemsFromLocalStorage() {
  const todoItems = JSON.parse(localStorage.getItem('todoItems'));
  if (todoItems && todoItems.length) {
    todoItems.forEach((itemText) => {
      const todoItem = document.createElement('div');
      todoItem.className = 'todo-item';

      const radioBtn = document.createElement('input');
      radioBtn.type = 'radio';
      radioBtn.addEventListener('change', () => {
        updateItemsLeftText();
      });
      todoItem.appendChild(radioBtn);

      const label = document.createElement('label');
      label.textContent = itemText;
      todoItem.appendChild(label);

      const removeBtn = document.createElement('span');
      removeBtn.className = 'remove';
      removeBtn.textContent = 'X';
      removeBtn.addEventListener('click', () => {
        todoItem.remove();
        updateItemsLeftText();
        updateLocalStorage();
      });
      todoItem.appendChild(removeBtn);

      todoList.appendChild(todoItem);
    });
    displaySection.style.display = 'block';
  }
  updateItemsLeftText();
  filterTodos();
}

function filterTodos() {
  const todos = Array.from(todoList.children);
  todos.forEach((todo) => {
    switch (filter) {
      case 'all':
        todo.style.display = 'flex';
        break;
      case 'active':
        const radioBtn = todo.querySelector('input[type="radio"]');
        todo.style.display = radioBtn.checked ? 'none' : 'flex';
        break;
      case 'completed':
        const radioBtnCompleted = todo.querySelector('input[type="radio"]:checked');
        todo.style.display = radioBtnCompleted ? 'flex' : 'none';
        break;
    }
  });
}

filterAllBtn.addEventListener('click', () => {
  filter = 'all';
  filterAllBtn.classList.add('active');
  filterActiveBtn.classList.remove('active');
  filterCompletedBtn.classList.remove('active');
  filterTodos();
});

filterActiveBtn.addEventListener('click', () => {
  filter = 'active';
  filterAllBtn.classList.remove('active');
  filterActiveBtn.classList.add('active');
  filterCompletedBtn.classList.remove('active');
  filterTodos();
});

filterCompletedBtn.addEventListener('click', () => {
  filter = 'completed';
  filterAllBtn.classList.remove('active');
  filterActiveBtn.classList.remove('active');
  filterCompletedBtn.classList.add('active');
  filterTodos();
});

todoInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    createTodo();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  getTodoItemsFromLocalStorage();
});
