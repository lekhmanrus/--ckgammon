'use strict';

angular
.module('--ckgammonApp.directives')
.directive('board', [ '$timeout', 'Board', function($timeout, Board) {
  return {
    restrict: 'E',
    templateUrl: 'partials/directives/board.html',
    link: function($scope) {

      $scope.getRegionIndex = Board.indexToRegion;
      $scope.getCellIndex = Board.indexToCell;

      $scope.board = Board.init();
      
      $scope.$on('board:updated', function(e, data) {
        $timeout(function() {
          $scope.board = data;
        });
      });

    }
  };
}]);
