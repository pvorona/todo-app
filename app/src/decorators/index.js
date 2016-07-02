import angular from 'angular';
import decorators from './decorators';

export default angular
  .module('decorators', [])
  .constant('decorators', decorators)
  .name;
