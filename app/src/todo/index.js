import angular from 'angular';
import todo from './todo';
import keyCodes from '../key-codes';
import stringUtils from '../string-utils';
import decorators from '../decorators';
import storage from '../storage';

export default angular
  .module('todo', [
    storage,
    keyCodes,
    stringUtils,
    decorators
  ])
  .component('todo', todo)
  .name;
