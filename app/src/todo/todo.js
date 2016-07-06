import './todo.scss';
import template from './todo.html';
import storageKeys from './todo-storage-keys';

controller.$inject = ['$element', 'storage', 'keyCodes', 'stringUtils', 'decorators', 'tutorialTodo', 'tutorialTodos'];

function controller ($element, storage, keyCodes, {capitalizeFirstLetter, collapseWhitespaces, trim, isEmpty: isEmptyString}, {not, compose, picking, setting}, tutorialTodo, tutorialTodos) {
  const vm = this;

  const beautify = setting('title', picking('title', compose(capitalizeFirstLetter, collapseWhitespaces, trim)));
  const isEmpty = picking('title', isEmptyString);

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
    maybeBlur,
    beautify,
    todos: storage.getItem(storageKeys.todos),
    todo: storage.getItem(storageKeys.draft)
  });

  activate();

  function activate () {
    if (!storage.getItem(storageKeys.tutorial).length) {
      showTutorial();
      storage.setItem(storageKeys.tutorial, 'shown');
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
    storage.setItem(storageKeys.draft, {title});
  }

  function clearDraft () {
    storage.removeItem(storageKeys.draft);
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

  function maybeBlur (event) {
    const {target, keyCode} = event;
    if (keyCode === keyCodes.ENTER) target.blur();
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

    storage.setItem(storageKeys.todos, todos);
  }

  function pickPropsToSave (todo) {
    return {title: todo.title, completed: todo.completed};
  }
}

export default {
  controller,
  template
};
