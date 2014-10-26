angular.module('thedebate.directives.debate', [])
  .directive('debate', function() {
    return {
      restrict: 'E',
      templateUrl: 'directives/templates/debate.tpl.html'
    };
  });