import './example.scss';
import template from './example.html';

export default {
  controller,
  template
};

controller.$inject = ['storage'];

function controller (storage) {
  const vm = this;

  Object.assign(vm, {
    createTodo,
    removeTodo,
    saveTodos,
    toggleCompleted,
    startEditing,
    endEditing,
    clearInput,
    isClearingKey,
    capitalizeFirstLetter,
    collapseWhitespaces,
    todos: storage.todos
  });

  function createTodo (todo) {
    capitalizeFirstLetter(todo);
    collapseWhitespaces(todo);
    addTodo(todo);
    clearInput();
  }

  function clearInput () {
    vm.todo = '';
  }

  function addTodo (todo) {
    vm.todos.push(todo);
    saveTodos();
  }

  function removeTodo (todo) {
    const index = vm.todos.indexOf(todo);
    vm.todos.splice(index, 1);
    saveTodos();
  }

  function toggleCompleted (todo) {
    todo.completed = !todo.completed;
    saveTodos();
  }

  function startEditing (todo) {
    todo.editing = true;
  }

  function endEditing (todo) {
    if (todo.title.length === 0) {
      removeTodo(todo);
    } else {
      todo.editing = false;
    }
  }

  function isClearingKey (keyCode) {
    return keyCode === 27;
  }

  function saveTodos () {
    storage.todos = vm.todos.map(todo => ({title: todo.title, completed: todo.completed}));
  }

  function collapseWhitespaces (todo) {
    todo.title = todo.title.replace(/\s+/g, ' ');
  }

  function capitalizeFirstLetter (todo) {
    todo.title = todo.title.charAt(0).toUpperCase() + todo.title.substr(1);
  }
}
