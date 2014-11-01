angular.module('thedebate.routes.responses', [
  'ui.router',
  'thedebate.directives.debate',
  'thedebate.directives.statement',
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
        templateUrl: 'templates/routes/responses/index.tpl.html'
      })
      .state('responses.new', {
        url: '/responses/new',
        templateUrl: 'templates/routes/responses/new.tpl.html',
        controller: function($scope) {
          $scope.newResponse = {};
        }
      });
  });