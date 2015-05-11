'use strict';

angular
.module('--ckgammonApp.directives')
.directive('checker', [ function() {
  return {
    restrict: 'E',
    link: function($scope, $element, $attrs) {

      $attrs.draggable = true;
      $element.attr('draggable', true);

      $element.bind('dragstart', function(e) {
        var dt = (e.dataTransfer || e.originalEvent.dataTransfer);
        dt.effectAllowed = 'move';
        var data = {
          regionIndex: $attrs.regionIndex,
          cellIndex: $attrs.cellIndex,
          index: $attrs.index,
          type: $attrs.type
        }
        dt.setData('text/json', JSON.stringify(data));
        $element.addClass('dragstart');
      });

      $element.bind('dragend', function(e) {
        $element.removeClass('dragstart');
      });

    }
  };
}]);
