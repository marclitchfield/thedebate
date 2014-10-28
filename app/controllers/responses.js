angular.module('thedebate.controllers.responses', [
  'ui.router',
  'thedebate.directives.statement'
])
  .config(function($stateProvider) {
    $stateProvider
      .state('responses', {
        url: '/statement/:id/responses',
        templateUrl: 'templates/controllers/responses/index.tpl.html',
        controller: function($scope, $stateParams) {
          $scope.statement = {
            id: $stateParams.id,
            debate: {
              id: 1,
              score: 888,
              title: 'debate 1'
            },
            body: 'context statement ' + $stateParams.id,
            score: 785,
            support: 1,
            opposition: 2,
            objection: 3,
            responses: [
              {id:1,score:994,body:'response 1'},
              {id:2,score:824,body:'response 2'},
              {id:3,score:122,body:'response 3'},
              {id:4,score:80, body:'response 4'},
              {id:5,score:71, body:'response 5'}
            ]
          };
        }
      });
  });