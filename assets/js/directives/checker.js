'use strict';

angular
.module('--ckgammonApp.directives')
.directive('checker', [ 'Checker', 'Board', function(Checker, Board) {
  return {
    restrict: 'E',
    link: function($scope, $element, $attrs) {

      $scope.$watch(
        function() { return [ Board.moveOwner, Board.isMoving ] },
        function() {
          $attrs.draggable = false;
          $element.removeAttr('draggable');
          if(Board.isMoving && Board.moveOwner && $attrs.type == Board.moveOwner) {
            $attrs.draggable = true;
            $element.attr('draggable', true);
          }
        },
        true
      );

      $element.bind('dragstart', function(e) {
        if(Board.isMoving && Board.moveOwner && $attrs.type == Board.moveOwner) {
          Checker.setDragging({
            regionIndex: $attrs.regionIndex,
            cellIndex: $attrs.cellIndex,
            index: $attrs.index,
            type: $attrs.type
          });
          $element.addClass('dragstart');
        }
        else {
          Checker.setDragging(undefined);
        }
      });

      $element.bind('dragend', function(e) {
        $element.removeClass('dragstart');
      });

    }
  };
}]);
