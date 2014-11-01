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
        $scope.oppositionWith = width($scope.statement.opposition);
        $scope.objectionWidth = width($scope.statement.objection);

        function width(score) {
          return 14 * Math.log((score || 0) + 1) + '%;';
        }  
      }
    };
  });