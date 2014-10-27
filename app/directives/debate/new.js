angular.module('thedebate.directives.debateNew', [])
  .directive('debateNew', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/directives/debate/new.tpl.html'
    };
  });