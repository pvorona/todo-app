import angular from 'angular';
import keyCodes from './key-codes';

export default angular
  .module('keyCodes', [])
  .constant('keyCodes', keyCodes)
  .name;
