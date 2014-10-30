angular.module('thedebate.controllers.debates', [
  'ui.router',
  'thedebate.directives.debate',
  'thedebate.fixtures'
])
  .config(function($stateProvider) {
    $stateProvider
      .state('debates', {
        url: '/',
        templateUrl: 'templates/controllers/debates/index.tpl.html',
        controller: function($scope, fixtures) {
          $scope.debates = _.values(fixtures.debates);
        }
      })
      .state('debates-new', {
        url: '/debates/new',
        templateUrl: 'templates/controllers/debates/new.tpl.html',
        controller: function($scope) {
          $scope.foo = 'bar';
        }
      });
  });