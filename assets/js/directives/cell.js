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
             data.cellIndex != undefined && data.index != undefined &&
             $attrs.regionIndex != undefined && $attrs.index != undefined &&
             Board.isMoving && Board.moveOwner && data.type == Board.moveOwner) {
            var cellCheckers = Board.getCell(+$attrs.regionIndex, +$attrs.index).checkers;
            //if(!cellCheckers.length || cellCheckers[cellCheckers.length - 1] == data.type) {
            if(Board.canMove(data.regionIndex, data.cellIndex, $attrs.regionIndex, $attrs.index)) {
            //if(Board.canMove(srIdx, scIdx, erIdx, ecIdx)) {
              cellCheckers.push(data.type);
              Board.getCell(+data.regionIndex, +data.cellIndex).checkers.splice(+data.index, 1);
              $scope.$emit('board:updated', Board.data);
            }
          }
        }
      });

    }
  };
}]);
