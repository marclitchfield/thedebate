angular.module('thedebate.directives.debate', [])
  .directive('debate', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/directives/debate.tpl.html',
      scope: {
        debate: '=model'
      }
    };
  });