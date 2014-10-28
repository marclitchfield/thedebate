angular.module('thedebate.directives.statement', [])
  .directive('statement', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/directives/statement.tpl.html'
    };
  });