'use strict';

angular
.module('--ckgammonApp.services')
.factory('Dice', [ 'DicePaths', function(DicePaths) {

  var value = undefined;

  var roll = function() {
    value = Math.floor(Math.random() * 6) + 1;
    var path = Math.floor(Math.random() * DicePaths[value].length),
        rot  = DicePaths[value][path],
        shuf = 3;
    for(var i in rot) {
      rot[i] += Math.floor(Math.random() * shuf) * 360;
    }
    return rot;
  };

  return {

    get value() {
      if(!value) {
        roll();
      }
      return value;
    },

    roll: roll

  };

}]);
