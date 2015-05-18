'use strict';

angular
.module('--ckgammonApp.services')
.factory('Dice', [ function() {

  var value = undefined;

  var roll = function() {
    return value = Math.floor(Math.random() * 6) + 1;;
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
