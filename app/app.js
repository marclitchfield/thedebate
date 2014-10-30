angular.module('thedebate', [
  'thedebate.controllers.debates',
  'thedebate.controllers.statements',
  'thedebate.controllers.responses',
  'thedebate.controllers.objections',
  'thedebate.templates',
  'ui.router'
])
  .config(function($locationProvider) {
    $locationProvider.html5Mode(true);
  });
