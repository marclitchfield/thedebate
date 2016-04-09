angular.module('thedebate.controllers.responses.default', [
  'ui.router'
])
  .controller('ResponsesDefaultController', function($scope, $state, $stateParams, statement) {
    $scope.$state = $state;
    $scope.responseType = '';

    $scope.toggle = function(type) {
      return ($scope.responseType && $scope.responseType === type) ? '' : type;
    };

    $scope.statement = statement.data;
    $scope.responseType = $stateParams.type;

    if (!$stateParams.type) {
      $scope.responses = $scope.statement.responses;
    } else {
      $scope.responses = $scope.statement.responses.filter(function(response) {
        return response.type === $stateParams.type;
      });
    }

    $state.go('responses.index');
  });