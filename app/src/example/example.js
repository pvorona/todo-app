import './example.scss';
import template from './example.html';

export default {
  controller,
  template
};

function controller () {
  const vm = this;

  Object.assign(vm, {
    createTodo,
    removeTodo,
    clearInput,
    todos: []
  });

  function createTodo (todo) {
    addTodo(todo);
    clearInput();
  }

  function clearInput () {
    vm.todo = '';
  }

  function addTodo (todo) {
    vm.todos.push(todo);
  }

  function removeTodo (index) {
    vm.todos.splice(index, 1);
  }
}
