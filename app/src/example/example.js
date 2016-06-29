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
    saveTodo,
    toggleCompleted,
    clearInput,
    isClearingKey,
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

  function removeTodo (index) {
    vm.todos.splice(index, 1);
    saveTodos();
  }

  function toggleCompleted (todo) {
    todo.completed = !todo.completed;
    saveTodos();
  }

  function saveTodo (index) {
    if (vm.todos[index].title.length === 0)
      removeTodo(index);
    else
      saveTodos();
  }

  function isClearingKey (keyCode) {
    return keyCode === 27;
  }

  function saveTodos () {
    storage.todos = vm.todos;
  }

  function collapseWhitespaces (todo) {
    todo.title = todo.title.replace(/\s+/g, ' ');
  }

  function capitalizeFirstLetter (todo) {
    todo.title = todo.title.charAt(0).toUpperCase() + todo.title.substr(1);
  }
}
