angular.module('thedebate', [
  'thedebate.routes.debates',
  'thedebate.routes.statements',
  'thedebate.routes.responses',
  'thedebate.templates',
  'ui.router'
])
  .config(function($locationProvider) {
    $locationProvider.html5Mode(true);
  });
