angular.module('thedebate.directives.statement-chain', [
  'thedebate.directives.statement'
])
  .directive('statementChain', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/directives/statement-chain.tpl.html',
      scope: {
        statement: '=model'
      }
    };
  });