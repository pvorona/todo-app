import angular from 'angular';
import stringUtils from './string-utils';

export default angular
  .module('stringUtils', [])
  .constant('stringUtils', stringUtils)
  .name;
