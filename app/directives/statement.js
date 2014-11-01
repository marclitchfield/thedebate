angular.module('thedebate.directives.statement', [
  'thedebate.directives.score-indicator'
])
  .directive('statement', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/directives/statement.tpl.html',
      scope: {
        statement: '=model'
      }
    };
  });