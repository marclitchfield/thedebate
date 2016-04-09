angular.module('thedebate.directives.statement', [
  'thedebate.directives.score-indicator'
])
  .directive('statement', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/directives/statement.tpl.html',
      scope: {
        statement: '=model',
        current: '='
      },
      controller: function($scope, $rootScope, $http) {
        $scope.stopPropagationIfCurrent = function($event) {
          if ($scope.current) {
            if ($event.stopPropagation) { $event.stopPropagation(); }
            if ($event.preventDefault) { $event.preventDefault(); }
          }
        };

        $scope.upvote = function($event) {
          $http.post('/api/statement/' + $scope.statement.id + '/upvote', {}).success(function(statement) {
            $scope.statement = statement;
            $scope.statement.upvoted = !$scope.statement.upvoted;
            $rootScope.$broadcast('updateStatement', statement);
            if (statement.chain) {
              statement.chain.forEach(function(item) {
                $rootScope.$broadcast('updateStatement', item);
              });
            }
          });
          
          if ($event.stopPropagation) { $event.stopPropagation(); }
          if ($event.preventDefault) { $event.preventDefault(); }
        };

        $scope.$on('updateStatement', function(event, statement) {
          if ($scope.statement.id === statement.id) {
            $scope.statement.score = statement.score;
            $scope.statement.scores = statement.scores;
            $scope.statement.tag = statement.tag;
            $scope.statement.inactive = statement.inactive;
          }
        });
      }

    };
  });