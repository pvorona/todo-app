import angular from 'angular';
import example from './example';
import storage from '../storage';

export default angular
  .module('example', [storage])
  .component('example', example)
  .name;
