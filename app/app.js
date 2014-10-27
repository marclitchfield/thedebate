angular.module('the-debate', [
  'thedebate.controllers.debates',
  'thedebate.templates',
  'ui.router'
])
  .config(function($locationProvider) {
    $locationProvider.html5Mode(true);
  });
