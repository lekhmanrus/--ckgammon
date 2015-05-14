'use strict';

angular
.module('--ckgammonApp.directives')
.directive('dice', [ 'Dice', function(Dice) {
  return {
    restrict: 'E',
    templateUrl: 'partials/directives/dice.html',
    link: function($scope, $element) {

      /*$scope.roll = function() {
        console.log(1);
        var rot = Dice.roll();
        console.log('value', Dice.value);
        var transform = [
          'rotateX(', rot.x, 'deg) ',
          'rotateY(', rot.y, 'deg) ',
          'rotateZ(', rot.z, 'deg)'
        ].join('');
        $element.css('transform', transform);
      };*/

      $element.children('#dice').children('.side')
      .bind('click', function(e) {
        e.preventDefault();
        var rot = Dice.roll();
        console.log('value', Dice.value);
        var transform = [
          'rotateX(', rot.x, 'deg) ',
          'rotateY(', rot.y, 'deg) ',
          'rotateZ(', rot.z, 'deg)'
        ].join('');
        $element.children('#dice').css('transform', transform);
      });

    }
  };
}]);
