'use strict';

angular
.module('--ckgammonApp.services')
.factory('Board', [ 'Type', function(Type) {

  var NUM_CHECKERS = 15;

  var board = {
    data: [ ],
    existsCheckers: false,
    moveOwner: false,
    isMoving: undefined,
    moves: [ ],
    moveFromHead: false,
    head: {
      one: {
        regionIndex: 0,
        cellIndex: 0
      },
      two: {
        regionIndex: 2,
        cellIndex: 0
      }
    }
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
  };

  board.indexToRegion = function(index) {
    var obj = {
      0: 3,
      1: 2,
      2: 0,
      3: 1
    };
    if(board.moveOwner == Type.playerTwoType) {
      obj = {
        0: 1,
        1: 0,
        2: 3,
        3: 2
      }
    }
    return obj[index];
  };

  board.indexToCell = function(rIndex, index) {
    if(board.moveOwner == Type.playerTwoType) {
      if(rIndex == 2 || rIndex == 3) {
        return index;
      }
      else if(rIndex == 0 || rIndex == 1) {
        return 5 - index;
      }
    }
    if(rIndex == 2 || rIndex == 3) {
      return 5 - index;
    }
    else if(rIndex == 0 || rIndex == 1) {
      return index;
    }
    return undefined;
  };

  board.getRegionIndex = function(idx) {
    var obj = {
      0: 2,
      1: 3,
      2: 1,
      3: 0
    };
    return obj[idx];
  };

  board.getCellIndex = function(rIdx, cIdx) {
    rIdx = +rIdx;
    cIdx = +cIdx;
    if(rIdx == 2 || rIdx == 3) {
      return 5 - cIdx;
    }
    else if(rIdx == 0 || rIdx == 1) {
      return cIdx;
    }
    return undefined;
  };

  board.getRegion = function(idx) {
    var rIdx = board.getRegionIndex(+idx);
    if(rIdx != undefined) {
      return board.data[rIdx];
    }
    return undefined
  };

  board.getCell = function(rIdx, cIdx) {
    rIdx = +rIdx;
    cIdx = +cIdx;
    rIdx += Math.floor(cIdx / 6);
    cIdx = cIdx % 6;
    cIdx = board.getCellIndex(rIdx, cIdx);
    var region = board.getRegion(rIdx);
    if(cIdx != undefined && region != undefined) {
      return region[cIdx];
    }
    return undefined;
  };

  board.initCheckers = function() {
    for(var i = 0; i < 4; i++) {
      for(var j = 0; j < 6; j++) {
        board.getCell(i, j).checkers = [ ];
      }
    }
    if(Type.playerOneType && Type.playerTwoType) {
      board.addCheckers(
        board.getCell(board.head.one.regionIndex, board.head.one.cellIndex),
        Type.playerOneType,
        NUM_CHECKERS
      );
      board.addCheckers(
        board.getCell(board.head.two.regionIndex, board.head.two.cellIndex),
        Type.playerTwoType,
        NUM_CHECKERS
      );
      board.existsCheckers = true;
    }
  };

  board.init = function() {
    board.data = [
      board.makeRegion('top'),
      board.makeRegion('top'),
      board.makeRegion('bottom'),
      board.makeRegion('bottom')
    ];
    board.initCheckers();
    return board.data;
  };

  board.IndexFromOneToTwo = function(rIdx) {
    var obj = {
      0: 2,
      1: 3,
      2: 0,
      3: 1
    };
    return obj[rIdx];
  };

  board.canMove = function(srIdx, scIdx, erIdx, ecIdx) { // bug
    if(board.moveOwner == Type.playerTwoType) {
      srIdx = board.IndexFromOneToTwo(+srIdx);
      erIdx = board.IndexFromOneToTwo(+erIdx);
    }
    var t = board.getCell(+erIdx, +ecIdx);
    for(var k in board.moves) {
      var sr = board.moveOwner == Type.playerTwoType ? board.IndexFromOneToTwo(+srIdx) : +srIdx,
          pt = board.getCell(sr, (+scIdx) + (+board.moves[k])),
          st = board.getCell(+srIdx, (+scIdx) + (+board.moves[k]));
      if(pt && (!pt.checkers.length ||
         pt.checkers[pt.checkers.length - 1] == board.moveOwner)) {
        if(t == st) {
          return true;
        }
      }
    }
    return false;
  };

  board.existsCorrectMovesFrom = function(rIdx, cIdx) { // Invalid for player two
    for(var k in board.moves) {
      var t = board.getCell(rIdx, cIdx + board.moves[k]);
      if(t && (!t.checkers.length ||
         t.checkers[t.checkers.length - 1] == board.moveOwner)) {
        return true;
      }
    }
    return false;
  };

  board.existsCorrectMoves = function() { // Invalid for player two
    for(var i = 0; i < 4; i++) {
      for(var j = 0; j < 6; j++) {
        var c = board.getCell(i, j).checkers;
        if(c.length && c[c.length - 1] == board.moveOwner) {
          if(board.existsCorrectMovesFrom(i, j)) {
            return true;
          }
        }
      }
    }
    return false;
  };

  board.discardMoves = function() {
    board.moves = [ ];
    board.isMoving = false;
    board.moveOwner = Type.getOppositeType(board.moveOwner);
  };

  board.setMoves = function(dices) {
    if(dices[0] == dices[1]) {
      for(var i = 0; i < 4; i++) {
        board.moves.push(dices[0]);
      }
    }
    else {
      board.moves.push(dices[0]);
      board.moves.push(dices[1]);
    }
    board.moveFromHead = false;
    if(!board.existsCorrectMoves()) {
      board.discardMoves();
    }
    return board.moves;
  };

  return board;

}]);
