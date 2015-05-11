'use strict';

angular
.module('--ckgammonApp.services')
.factory('Board', [ function() {

  var NUM_CHECKERS = 15;

  var board = {
    data: [ ]
  };


  board.makeCell = function(color) {
    return {
      color: color,
      checkers: [ ]
    };
  };

  board.makeRegion = function(type) {
    var region = [ ];
    for(var i = 0; i < 3; i++) {
      region.push(board.makeCell('black'));
      region.push(board.makeCell('red'));
    }
    if(type == 'top') {
      region.push(region.shift());
    }
    return region;
  };

  board.addCheckers = function(cell, color, number) {
    for(var i = 0; i < number; i++) {
      cell.checkers.push(color);
    }
  }

  board.getRegion = function(idx) {
    if(idx == 0) {
      return board.data[2];
    }
    else if(idx == 1) {
      return board.data[3];
    }
    else if(idx == 2) {
      return board.data[1];
    }
    else if(idx == 3) {
      return board.data[0];
    }
    return undefined
  };

  board.getCell = function(rIdx, cIdx) {
    if(rIdx == 2 || rIdx == 3) {
      return board.getRegion(rIdx)[5 - cIdx];
    }
    else if(rIdx == 0 || rIdx == 1) {
      return board.getRegion(rIdx)[cIdx];
    }
    return undefined;
  };

  board.init = function() {
    board.data = [
      board.makeRegion('top'),
      board.makeRegion('top'),
      board.makeRegion('bottom'),
      board.makeRegion('bottom')
    ];

    board.addCheckers(board.getCell(0, 0), 'red', NUM_CHECKERS);
    board.addCheckers(board.getCell(2, 0), 'black', NUM_CHECKERS);

    return board.data;
  };

  return board;

}]);
