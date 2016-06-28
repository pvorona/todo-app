import angular from 'angular';
import storage from './storage';

export default angular
  .module('todo.storage', [])
  .service('storage', storage)
  .name;
