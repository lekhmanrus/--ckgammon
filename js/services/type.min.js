'use strict';

angular
.module('--ckgammonApp.services')
.factory('Type', [ function() {

  var oppositeTypes = {
    red: 'black',
    black: 'red'
  };

  var type = {
    data: [ 'red', 'black' ],
    playerOneType: undefined,
    playerTwoType: undefined
  };

  type.getOppositeType = function(pType) {
    return oppositeTypes[pType];
  };

  type.setPlayerOneType = function(pType) {
    type.playerOneType = pType;
    type.playerTwoType = type.getOppositeType(pType);
  };

  return type;

}]);
