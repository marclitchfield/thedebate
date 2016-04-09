angular.module('thedebate.controllers.responses.objections.junk', [])
  .controller('JunkObjectionController', function($scope) {
    $scope.junkChecked = false;
    $scope.newResponse.objection.body = '';

    $scope.newResponse.objection.valid = function() {
      return $scope.junkChecked && $scope.newResponse.objection.body;
    };
  });