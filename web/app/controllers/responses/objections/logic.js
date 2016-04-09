angular.module('thedebate.controllers.responses.objections.logic', [])
  .controller('LogicObjectionController', function($scope) {
    $scope.newResponse.objection.body = '';
    
    $scope.newResponse.objection.valid = function() {
      return $scope.newResponse.objection.body && $scope.newResponse.objection.logic.fallacy;
    };
  });