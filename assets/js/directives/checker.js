'use strict';

angular
.module('--ckgammonApp.directives')
.directive('checker', function() {
  return {
    restrict: 'E',
    templateUrl: 'partials/directives/checker.html',
    link: function($scope, $element, $attrs) {
      $attrs.draggable = true;
      $element.attr('draggable', true);
    }
  };
});
