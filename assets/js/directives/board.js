'use strict';

angular
.module('--ckgammonApp.directives')
.directive('board', function() {
  return {
    restrict: 'E',
    templateUrl: 'partials/directives/board.html',
    link: function($scope) {
      $scope.quarters = [
        [ 'red', 'black', 'red', 'black', 'red', 'black' ],
        [ 'red', 'black', 'red', 'black', 'red', 'black' ],
        [ 'black', 'red', 'black', 'red', 'black', 'red' ],
        [ 'black', 'red', 'black', 'red', 'black', 'red' ]
      ];
    }
  };
});
