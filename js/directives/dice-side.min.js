'use strict';

angular
.module('--ckgammonApp.directives')
.directive('diceSide', [ 'DicePaths', function(DicePaths) {
  return {
    restrict: 'E',
    scope: {
      value: '='
    },
    templateUrl: 'partials/directives/dice-side.html'
  };
}]);
