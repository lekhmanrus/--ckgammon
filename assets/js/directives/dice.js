'use strict';

angular
.module('--ckgammonApp.directives')
.directive('dice', [ 'DicePaths', function(DicePaths) {
  return {
    restrict: 'E',
    templateUrl: 'partials/directives/dice.html',
    link: function($scope, $element, $attrs) {

      $scope.$watch($attrs.value, function(value) {
        if(value) {
          var path  = Math.floor(Math.random() * DicePaths[value].length),
              rot   = DicePaths[value][path],
              shuf  = 3;
          for(var i in rot) {
            rot[i] += Math.floor(Math.random() * shuf) * 360;
          }
          var transform = [
            'rotateX(', rot.x, 'deg) ',
            'rotateY(', rot.y, 'deg) ',
            'rotateZ(', rot.z, 'deg)'
          ].join('');
          $element.children('#dice').css('transform', transform);
        }
      });

    }
  };
}]);
