angular.module('thedebate.controllers.statements.default', [
  'ui.router'
])
  .controller('StatementsDefaultController', function($scope, $state, $stateParams, $http, debate) {
    $scope.$state = $state;
    $scope.debate = debate.data;
    $state.go('statements.index');
  });