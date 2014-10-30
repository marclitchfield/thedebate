angular.module('thedebate.controllers.responses', [
  'ui.router',
  'thedebate.directives.debate',
  'thedebate.directives.statement',
  'thedebate.directives.statement-chain',
  'thedebate.fixtures'
])
  .config(function($stateProvider) {
    $stateProvider
      .state('responses', {
        url: '/statement/:id',
        templateUrl: 'templates/pages/responses.tpl.html',
        controller: function($scope, $stateParams, fixtures) {
          $scope.statement = fixtures.statements[$stateParams.id];
        }
      })
      .state('responses.index', {
        url: '/responses',
        templateUrl: 'templates/controllers/responses/index.tpl.html'
      })
      .state('responses.new', {
        url: '/responses/new',
        templateUrl: 'templates/controllers/responses/new.tpl.html'
      });
  });