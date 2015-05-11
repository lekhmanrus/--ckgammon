'use strict';

angular
.module('--ckgammonApp.directives')
.directive('board', [ '$timeout', 'Board', function($timeout, Board) {
  return {
    restrict: 'E',
    templateUrl: 'partials/directives/board.html',
    link: function($scope) {
      $scope.board = Board.init();
      $scope.$on('board:updated', function(e, data) {
        $timeout(function() {
          $scope.board = data;
        });
        console.log('board:updated', data);
      });
    }
  };
}]);
