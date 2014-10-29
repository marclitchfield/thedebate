angular.module('thedebate.directives.statement-chain', [
  'thedebate.services.recursion',
  'thedebate.directives.statement'
])
  .directive('statementChain', function(RecursionService) {
    return {
      restrict: 'E',
      templateUrl: 'templates/directives/statement-chain.tpl.html',
      scope: {
        statement: '=model'
      },
      compile: function(element) {
        return RecursionService.compile(element);
      }      
    };
  });