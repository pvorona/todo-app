import './todo.scss';
import template from './todo.html';

const keys = {
  todos: 'todos',
  draft: 'todo',
  tutorial: 'tutorial'
};

controller.$inject = ['$element', 'storage', 'keyCodes', 'stringUtils', 'decorators', 'tutorialTodo', 'tutorialTodos'];

function controller ($element, storage, keyCodes, stringUtils, {not}, tutorialTodo, tutorialTodos) {
  const vm = this;

  Object.assign(vm, {
    createTodo,
    removeTodo,
    saveTodos,
    saveDraft,
    clearTodo,
    toggleCompleted,
    startEditing,
    endEditing,
    isEditing,
    isClearingKey,
    beautify,
    todos: storage.getItem(keys.todos),
    todo: storage.getItem(keys.draft)
  });

  activate();

  function activate () {
    if (!storage.getItem(keys.tutorial).length) {
      showTutorial();
      storage.setItem(keys.tutorial, 'shown');
    }
    if (vm.todo.title) focusNewTodoInput();
  }

  function showTutorial () {
    vm.todo = tutorialTodo;
    vm.todos = tutorialTodos;
  }

  function focusNewTodoInput () {
    $element[0].querySelector('.js-new-todo-input-focus').focus();
  }

  function createTodo (todo) {
    beautify(todo);
    addTodo(todo);
    clearTodo();
  }

  function clearInput () {
    vm.todo = '';
  }

  function clearTodo () {
    clearInput();
    clearDraft();
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

  function saveDraft (title) {
    storage.setItem(keys.draft, {title});
  }

  function clearDraft () {
    storage.removeItem(keys.draft);
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

  function isEditing () {
    return vm.todos.some(todo => todo.editing);
  }

  function isClearingKey (keyCode) {
    return keyCode === keyCodes.ESC;
  }

  function saveTodos () {
    const todos = vm.todos
      .filter(not(isEmpty))
      .map(pickPropsToSave);

    storage.setItem(keys.todos, todos);
  }

  function pickPropsToSave (todo) {
    return {title: todo.title, completed: todo.completed};
  }

  function beautify (todo) {
    trim(todo);
    collapseWhitespaces(todo);
    capitalizeFirstLetter(todo);
  }

  function isEmpty (todo) {
    return stringUtils.isEmpty(todo.title);
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

export default {
  controller,
  template
};
