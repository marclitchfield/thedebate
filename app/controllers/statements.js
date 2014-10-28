angular.module('thedebate.controllers.statements', [
  'ui.router',
  'thedebate.directives.statement'
])
  .config(function($stateProvider) {
    $stateProvider
      .state('statements', {
        url: '/debate/:id/statements',
        templateUrl: 'templates/controllers/statements/index.tpl.html',
        controller: function($scope, $stateParams) {
          $scope.debate = {
            id: $stateParams.id,
            title: 'debate ' + $stateParams.id,
            score: 785,
            statements: [
              {id:1,score:994,body:'statement 1'},
              {id:2,score:824,body:'statement 2'},
              {id:3,score:122,body:'statement 3'},
              {id:4,score:80, body:'statement 4'},
              {id:5,score:71, body:'statement 5'}
            ]
          };
        }
      })
      .state('statements-new', {
        url: '/debate/{id}/statements/new',
        templateUrl: 'templates/controllers/statements/new.tpl.html',
        controller: function($scope) {
          $scope.newStatement = {};
        }
      });
  });