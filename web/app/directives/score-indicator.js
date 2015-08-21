angular.module('thedebate.directives.score-indicator', [])
  .directive('scoreIndicator', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/directives/score-indicator.tpl.html',
      scope: {
        scores: '='
      },
      controller: function($scope) {
        var total = $scope.scores.support + $scope.scores.opposition + $scope.scores.objection;
        $scope.supportPercentage = total ? (100 * $scope.scores.support / total) : 0;
        $scope.oppositionPercentage = total ? (100 * $scope.scores.opposition / total) : 0;
        $scope.objectionPercentage = total ? (100 * $scope.scores.objection / total) : 0;
      }
    };
  });