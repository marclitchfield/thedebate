angular.module('thedebate.directives.score-indicator', [])
  .directive('scoreIndicator', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/directives/score-indicator.tpl.html',
      scope: {
        score: '='
      },
      controller: function($scope) {
        $scope.scoreWidth = Math.min(100, 5 * Math.log(($scope.score || 0) + 1)) + '%';
      }
    };
  });