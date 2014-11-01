angular.module('thedebate.directives.statement', [])
  .directive('statement', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/directives/statement.tpl.html',
      scope: {
        statement: '=model'
      },
      controller: function($scope) {
        $scope.supportWidth = width($scope.statement.support);
        $scope.oppositionWidth = width($scope.statement.opposition);
        $scope.objectionWidth = width($scope.statement.objection);

        console.log('scores', $scope.statement.support, $scope.statement.opposition, $scope.statement.objection);
        console.log('widths', $scope.supportWidth, $scope.oppositionWidth, $scope.objectionWidth);

        function width(score) {
          return Math.min(100, 5 * Math.log((score || 0) + 1)) + '%';
        }  
      }
    };
  });