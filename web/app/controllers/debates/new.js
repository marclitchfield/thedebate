angular.module('thedebate.controllers.debates.new', [
  'ui.router'
])
  .controller('DebatesNewController', function($scope, $state, $http) {
    $scope.title = '';

    $scope.cancel = function() {
      $state.go('debates.index');
    };
              
    $scope.submit = function() {
      $http.post('/api/debates', { title: $scope.title, score: 0 }).success(function() {
        $state.go('debates.index', {}, {reload: true});
      });
    };
  });