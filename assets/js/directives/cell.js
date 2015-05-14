'use strict';

angular
.module('--ckgammonApp.directives')
.directive('cell', [ 'Board', function(Board) {
  return {
    restrict: 'E',
    link: function($scope, $element, $attrs) {

      $element.bind('dragover', function(e) {
        if(e.preventDefault) {
          e.preventDefault();
        }
        var dt = (e.dataTransfer || e.originalEvent.dataTransfer);
        dt.dropEffect = 'move';
        return false;
      });

      $element.bind('dragenter', function(e) {
        $element.addClass('dragover');
      });

      $element.bind('dragleave', function(e) {
        $element.removeClass('dragover');
      });

      $element.bind('drop', function(e) {
        var dt = (e.dataTransfer || e.originalEvent.dataTransfer);
        dt.effectAllowed = 'move';
        $element.removeClass('dragover');
        var data = JSON.parse(dt.getData('text/json'));
        if(data && data.type != undefined && data.regionIndex != undefined &&
           data.cellIndex != undefined && data.index != undefined &&
           $attrs.regionIndex != undefined && $attrs.index != undefined) {
          Board.data[+$attrs.regionIndex][+$attrs.index].checkers.push(data.type);
          Board.data[+data.regionIndex][+data.cellIndex].checkers.splice(+data.index, 1);
          $scope.$emit('board:updated', Board.data);
        }
      });

    }
  };
}]);
