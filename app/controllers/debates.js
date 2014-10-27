angular.module('thedebate.controllers.debates', [
  'ui.router',
  'thedebate.directives.debateItem',
  'thedebate.directives.debateNew',
])
  .config(function($stateProvider) {
    $stateProvider
      .state('debates', {
        url: '/',
        templateUrl: 'templates/controllers/debates/index.tpl.html',
        controller: function($scope) {
          $scope.debates = [
            {id:1,score:994,title:'debate 1'},
            {id:2,score:824,title:'debate 2'},
            {id:3,score:122,title:'debate 3'},
            {id:4,score:80, title:'debate 4'},
            {id:5,score:71, title:'debate 5'}
          ];
        }
      });
  });