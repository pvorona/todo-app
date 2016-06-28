import angular from 'angular';
import example from './example';

export default angular
  .module('example', [])
  .component('example', example)
  .name;
