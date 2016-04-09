angular.module('thedebate.controllers.debates.index', [
  'ui.router'
])
  .controller('DebatesIndexController', function($scope, $state, debates) {
    $scope.debates = debates.data;
  });