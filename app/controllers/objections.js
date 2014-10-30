angular.module('thedebate.controllers.objections', [
  'ui.router',
  'thedebate.directives.debate',
  'thedebate.directives.statement',
  'thedebate.directives.statement-chain',
  'thedebate.fixtures'
])
  .config(function($stateProvider) {
    $stateProvider
      .state('objections', {
        url: '/statement/:id',
        templateUrl: 'templates/pages/responses.tpl.html',
        controller: function($scope, $stateParams, fixtures) {
          $scope.statement = fixtures.statements[$stateParams.id];
        }
      })
      .state('objections.index', {
        url: '/objections',
        templateUrl: 'templates/controllers/objections/index.tpl.html'
      })
      .state('objections.new', {
        url: '/objections/new',
        templateUrl: 'templates/controllers/objections/new.tpl.html'
      });
  });