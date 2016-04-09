angular.module('thedebate.controllers.statements.new', [
  'ui.router'
])
  .controller('StatementsNewController', function($scope, $state, $http) {
    $scope.body = '';

    $scope.cancel = function() {
      $state.go('statements.index');
    };

    $scope.submit = function() {
      $http.post('/api/statements', { 
        body: $scope.body, 
        debate: {id:$scope.debate.id, title:$scope.debate.title},
        score: 0, 
        scores: {
          support: 0, 
          opposition: 0, 
          objection: 0
        }
      }).success(function() {
        $state.go('statements.index', { id: $scope.debate.id }, {reload:true});
      });
    };
  });