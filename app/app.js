angular.module('the-debate', [
  'thedebate.controllers.debates',
  'thedebate.controllers.statements',
  'thedebate.controllers.responses',
  'thedebate.templates',
  'ui.router'
])
  .config(function($locationProvider) {
    $locationProvider.html5Mode(true);
  });
