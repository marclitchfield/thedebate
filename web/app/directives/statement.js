angular.module('thedebate.directives.statement', [
  'thedebate.directives.score-indicator'
])
  .directive('statement', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/directives/statement.tpl.html',
      scope: {
        statement: '=model'
      },
      controller: function($scope) {
        $scope.upvote = function($event) {
          $scope.statement.upvoted = !$scope.statement.upvoted;
          if ($event.stopPropagation) { $event.stopPropagation(); }
          if ($event.preventDefault) { $event.preventDefault(); }
        };
      }
    };
  });