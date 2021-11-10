const addTodoEl = document.querySelector('.add-todo');
const modalContainerEl = document.querySelector('.modal-container');
const closeModalEl = document.querySelector('.close-modal');
const btnAddTodoEl = document.querySelector('.btn-add');

const allTodoCountEl = document.getElementById('all-todos-count');
const completedTodoCountEl = document.getElementById('completed-todo-count');

const modalNotificationEl = document.querySelector('.modal .notification');
const sidebarNotificationEl = document.querySelector('.sidebar .notification');

const completedTodoEl = document.querySelector('.category ul:last-child');

const BASE_URL = 'http://localhost:5000/api';

// * GET ALL TODO ITEMS
const getAllTodoItems = async (url = BASE_URL) => {
  try {
    const res = await axios.get(url);
    const data = await res.data.todoList;

    setTodoToUi(data);
  } catch (err) {
    console.log(err);
  }
};

// * ADD NEW TODO METHOD
const createNewTodo = async (title, desc, due) => {
  try {
    const res = await axios.post(BASE_URL, {
      title,
      desc,
      due,
    });
    const { msg } = res.data;

    showNotification(msg, 'success');

    console.log(msg);
  } catch (err) {
    console.log(err);
  }
};

// * DELETE TODO METHOD
const deleteTodo = async (todoId) => {
  try {
    const res = await axios.delete(`${BASE_URL}/${todoId}`);
    const { msg } = res.data;
    showNotification(msg, 'success', sidebarNotificationEl);
  } catch (err) {
    console.log(err);
    showNotification(err, 'success', sidebarNotificationEl);
  }
};

// * UPDATE TODO METHOD
const updateTodo = async (todoId, title, desc, completed) => {
  try {
    const res = await axios.patch(`${BASE_URL}/${todoId}`, {
      title,
      desc,
      completed,
    });
    const { success, msg } = res.data;

    if (success === false) {
      showNotification(msg, 'danger');
      return;
    }
    showNotification(msg, 'success');
  } catch (err) {
    console.log(err);
  }
};

// * DISPLAY TODO ITEMS TO UI
const setTodoToUi = (todoList) => {
  let completedTodoCount = 0;

  const tableEl = document.querySelector('tbody');

  tableEl.innerHTML = '';

  todoList.forEach((todo) => {
    const { _id: id, title, desc, completed } = todo;

    if (completed === true) {
      completedTodoCount += 1;
    }

    const todoItem = `
    <tr class="single-todo">
    <td></td>
    <td class="todo-title">${title}</td>
    <td class="action-icons">
      <i class="fa fa-edit"></i>
      <i class="fa fa-trash"></i>
      <input type="hidden" id="todo-id" value="${id}" />
      <input type="hidden" id="todo-desc" value="${desc}" />
      <input type="hidden" id="todo-completed" value=${completed} />
    </td>

  </tr>
    `;
    tableEl.innerHTML += todoItem;
  });

  allTodoCountEl.textContent = todoList.length;
  completedTodoCountEl.textContent = completedTodoCount;
};

// * SHOW NOTIFICATION METHOD
const showNotification = (msg, alertType, element = modalNotificationEl) => {
  element.classList.add(alertType);
  if (alertType === 'success') {
    element.innerHTML = `
            <i class="fas fa-check-circle fa-lg"></i>
            <label>${msg}</label>
        `;
  }
  if (alertType === 'danger') {
    element.innerHTML = `
        <i class="fas fa-exclamation-circle fa-lg"></i>
        <label>${msg}</label>
    `;
  }

  setTimeout(() => {
    element.classList.remove(alertType);
    element.innerHTML = '';
  }, 2000);
};

getAllTodoItems();

// ! EVENT LISTENERS OR HANDLERS

//  * SHOW MODAL EVENT HANDLER
addTodoEl.onclick = (e) => {
  modalContainerEl.classList.add('show');
};

//  * CLOSE MODAL EVENT HANDLER
closeModalEl.onclick = (e) => {
  modalContainerEl.classList.remove('show');

  document.querySelector('#title').value = '';
  document.querySelector('#desc').value = '';
  btnAddTodoEl.textContent = 'add todo';
  document.querySelector('.add-todo-modal .title-2').textContent =
    'add new todo ';

  const isCompletedEl = document.querySelector('.isCompleted');
  isCompletedEl.innerHTML = '';

  getAllTodoItems();
};

//  * SPECIFIC TODO EVENT HANDLER
document.querySelector('tbody').onclick = (e) => {
  if (e.target.classList.contains('fa-edit')) {
    const todoTitle = e.target.parentElement.previousElementSibling.textContent;

    const todoIdEl = e.target.nextElementSibling.nextElementSibling;
    const todoDescEl = todoIdEl.nextElementSibling;
    // const todoDueEl = todoDescEl.nextElementSibling;
    const todoCompletedEl = todoDescEl.nextElementSibling;

    const isCompletedEl = document.querySelector('.isCompleted');

    isCompletedEl.innerHTML = `
        <label for="isCompleted">Mark as complete</label>
        <input
            type="checkbox"
            name="isCompleted"
            id="isCompleted"
        />
        `;

    modalContainerEl.classList.add('show');

    let bool;

    document.querySelector('#title').value = todoTitle;
    document.querySelector('#id').value = todoIdEl.value;
    document.querySelector('#desc').value = todoDescEl.value;

    if (todoCompletedEl.value === 'true') {
      bool = true;
    }
    if (todoCompletedEl.value === 'false') {
      bool = false;
    }

    document.querySelector('#isCompleted').checked = bool;

    btnAddTodoEl.textContent = 'update todo';
    document.querySelector('.add-todo-modal .title-2').textContent =
      'update todo item';

    return;
  }

  //  * DELETE SPECIFIC TODO EVENT HANDLER
  if (e.target.classList.contains('fa-trash')) {
    const todoId = e.target.nextElementSibling.value;

    deleteTodo(todoId);
    getAllTodoItems();

    return;
  }
};

// * ADD NEW TODO EVENT HANDLER
btnAddTodoEl.addEventListener('click', (e) => {
  e.preventDefault();

  // * UPDATING A TODO
  if (e.target.textContent === 'update todo') {
    const todoId = document.getElementById('id').value;
    const todoTitle = document.getElementById('title').value;
    const todoDesc = document.getElementById('desc').value;
    const todoCompleted = document.getElementById('isCompleted').checked;

    updateTodo(todoId, todoTitle, todoDesc, todoCompleted);

    return;
  }

  // * ADDING NEW TODO
  const title = document.getElementById('title').value;
  const desc = document.getElementById('desc').value;
  const due = document.getElementById('due').value;

  createNewTodo(title, desc, due);

  // resetting inputs
  document.getElementById('title').value = '';
  document.getElementById('desc').value = '';
});

// * GET COMPLETED TODO EVENT HANDLER

// completedTodoEl.addEventListener('click', (e) => {
//     const url = `${BASE_URL}?completed=true`;
//     getAllTodoItems(url);
// });
