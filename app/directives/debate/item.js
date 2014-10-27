angular.module('thedebate.directives.debateItem', [])
  .directive('debateItem', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/directives/debate/item.tpl.html'
    };
  });