'use strict';

angular
.module('--ckgammonApp.directives')
.directive('thrownZone', [ 'Board', 'Checker', function(Board, Checker) {
  return {
    restrict: 'E',
    scope: {
      type: '='
    },
    templateUrl: 'partials/directives/thrown-zone.html',
    link: function($scope, $element) {

      $element.bind('dragover', function(e) {
        e.preventDefault();
        return false;
      });

      $element.bind('dragenter', function(e) {
        if(Checker.dragging && Checker.dragging.type == Board.moveOwner &&
           $scope.type == Board.moveOwner) {
          $element.addClass('dragover');
        }
      });

      $element.bind('dragleave', function(e) {
        $element.removeClass('dragover');
      });

      $element.bind('drop', function(e) {
        $element.removeClass('dragover');
        if(Checker.dragging) {
          var data = Checker.dragging;
          if(data && data.type != undefined && data.regionIndex != undefined &&
             data.cellIndex != undefined && $scope.type != undefined &&
             Board.isMoving && Board.moveOwner && data.type == Board.moveOwner &&
             $scope.type == Board.moveOwner) {
            var thrown = Board.throwChecker(data.cellIndex);
            if(thrown !== false) {
              $scope.data = thrown;
              $scope.$emit('board:updated', Board.data);
            }
          }
        }
      });

    }
  };
}]);
