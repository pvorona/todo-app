import angular from 'angular';
import todo from './todo';
import keyCodes from '../key-codes';
import stringUtils from '../string-utils';
import decorators from '../decorators';
import storage from '../storage';
import tutorial from '../tutorial';

export default angular
  .module('todo', [
    storage,
    keyCodes,
    stringUtils,
    decorators,
    tutorial
  ])
  .component('todo', todo)
  .name;
