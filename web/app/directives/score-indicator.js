angular.module('thedebate.directives.score-indicator', [])
  .directive('scoreIndicator', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/directives/score-indicator.tpl.html',
      scope: {
        scores: '='
      },
      controller: function($scope) {
        $scope.percentage = function() {
          var total = $scope.scores.support + $scope.scores.opposition + $scope.scores.objection;
          return {
            support: total ? (100 * $scope.scores.support / total) : 0,
            opposition: total ? (100 * $scope.scores.opposition / total) : 0,
            objection: total ? (100 * $scope.scores.objection / total) : 0
          };
        };
      }
    };
  });