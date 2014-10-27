angular.module('thedebate.directives.statementItem', [])
  .directive('statementItem', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/directives/statement/item.tpl.html'
    };
  });