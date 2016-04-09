angular.module('thedebate.controllers.responses.objections.edit', [])
  .controller('EditObjectionController', function($scope) {
    $scope.newResponse.objection.body = $scope.statement.body;

    $scope.newResponse.objection.valid = function() {
      return $scope.newResponse.objection.body && $scope.newResponse.objection.body !== $scope.statement.body;
    };
  });