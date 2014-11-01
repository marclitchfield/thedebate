angular.module('thedebate.routes.objections', [
  'ui.router',
  'thedebate.directives.debate',
  'thedebate.directives.statement',
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
        templateUrl: 'templates/routes/objections/index.tpl.html'
      })
      .state('objections.new', {
        url: '/objections/new',
        templateUrl: 'templates/routes/objections/new.tpl.html'
      });
  });