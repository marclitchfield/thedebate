angular.module('thedebate.directives.statementNew', [])
  .directive('statementNew', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/directives/statement/new.tpl.html'
    };
  });