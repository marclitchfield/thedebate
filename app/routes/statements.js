angular.module('thedebate.routes.statements', [
  'ui.router',
  'thedebate.directives.debate',
  'thedebate.directives.statement',
  'thedebate.fixtures'
])
  .config(function($stateProvider) {
    $stateProvider
      .state('statements', {
        url: '/debate/:id',
        templateUrl: 'templates/pages/statements.tpl.html',
        controller: function($scope, $stateParams, fixtures) {
          $scope.debate = fixtures.debates.all[$stateParams.id];
        }
      })
      .state('statements.index', {
        url: '/statements',
        templateUrl: 'templates/routes/statements/index.tpl.html'
      })
      .state('statements.new', {
        url: '/statements/new',
        templateUrl: 'templates/routes/statements/new.tpl.html',
        controller: function($scope) {
          $scope.newStatement = {};
        }
      });
  });