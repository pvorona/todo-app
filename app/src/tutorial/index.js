import angular from 'angular';
import tutorialTodo from './tutorial-todo.json';
import tutorialTodos from './tutorial-todos.json';

export default angular
  .module('tutorial', [])
  .constant('tutorialTodos', tutorialTodos)
  .constant('tutorialTodo', tutorialTodo)
  .name;
