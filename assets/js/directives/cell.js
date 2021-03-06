'use strict';

angular
.module('--ckgammonApp.directives')
.directive('cell', [ 'Board', 'Checker', function(Board, Checker) {
  return {
    restrict: 'E',
    link: function($scope, $element, $attrs) {

      $element.bind('dragover', function(e) {
        e.preventDefault();
        return false;
      });

      $element.bind('dragenter', function(e) {
        if(Checker.dragging) {
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
             data.cellIndex != undefined &&
             $attrs.regionIndex != undefined && $attrs.index != undefined &&
             Board.isMoving && Board.moveOwner && data.type == Board.moveOwner) {
            if(Board.move(data.regionIndex, data.cellIndex, $attrs.regionIndex, $attrs.index)) {
              $scope.$emit('board:updated', Board.data);
            }
          }
        }
      });

    }
  };
}]);
