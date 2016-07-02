import './example.scss';
import template from './example.html';
import keyCodes from './key-codes';
import stringUtils from './string-utils';
import {not} from './decorators';

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
    isEditing,
    clearInput,
    isClearingKey,
    beautify,
    todos: storage.todos
  });

  function createTodo (todo) {
    beautify(todo);
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
    if (isEmpty(todo)) {
      removeTodo(todo);
    } else {
      todo.editing = false;
    }
  }

  function isEmpty (todo) {
    return stringUtils.isEmpty(todo.title);
  }

  function isEditing () {
    return vm.todos.some(todo => todo.editing);
  }

  function isClearingKey (keyCode) {
    return keyCode === keyCodes.ESC;
  }

  function saveTodos () {
    storage.todos = vm.todos
      .filter(not(isEmpty))
      .map(todo => ({title: todo.title, completed: todo.completed}));
  }

  function beautify (todo) {
    trim(todo);
    collapseWhitespaces(todo);
    capitalizeFirstLetter(todo);
  }

  function collapseWhitespaces (todo) {
    todo.title = stringUtils.collapseWhitespaces(todo.title);
  }

  function capitalizeFirstLetter (todo) {
    todo.title = stringUtils.capitalizeFirstLetter(todo.title);
  }

  function trim (todo) {
    todo.title = stringUtils.trim(todo.title);
  }
}
