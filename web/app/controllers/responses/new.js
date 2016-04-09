angular.module('thedebate.controllers.responses.new', [
  'ui.router'
])
  .controller('ResponsesNewController', function($scope, $state, $stateParams, $http) {
    $scope.newResponse = {
      type: $stateParams.type,
      support: { body: '' },
      opposition: { body: '' },
      objection: { body: '', type: '', valid: function() { return false; } }
    };

    $scope.cancel = function() {
      $state.go('responses.index');
    };

    $scope.submit = function() {
      $http.post('/api/statement/' + $stateParams.id + '/responses', { 
        body: $scope.newResponse[$scope.newResponse.type].body,
        debate: {id:$scope.statement.debate.id,title:$scope.statement.debate.title},
        parent: {id:$scope.statement.id,body:$scope.statement.body},
        type: $scope.newResponse.type,
        objection: $scope.newResponse.objection
      }).then(function() {
        $state.go('responses.index', { id: $scope.statement.id, type: $scope.newResponse.type }, {reload: true});
      });
    };

    $scope.valid = function() {
      if (!$scope.newResponse.type) {
        return false;
      }

      if ($scope.newResponse.type === 'objection') {
        return $scope.newResponse.objection.valid();
      }

      return !!$scope.newResponse[$scope.newResponse.type].body;
    };
  });