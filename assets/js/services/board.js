'use strict';

angular
.module('--ckgammonApp.services')
.factory('Board', [ 'Type', function(Type) {

  var NUM_CHECKERS = 15;

  var board = {
    data: [ ],
    existsCheckers: false,
    moveOwner: false,
    first: undefined,
    isMoving: true,
    win: undefined,
    lastMove: undefined,
    moves: [ ],
    moveFromHead: false,
    one: {
      head: {
        regionIndex: 0,
        cellIndex: 0
      },
      house: {
        regionIndex: 3,
        inHouse: false
      },
      thrown: [ ]
    },
    two: {
      head: {
        regionIndex: 2,
        cellIndex: 0
      },
      house: {
        regionIndex: 1,
        inHouse: false
      },
      thrown: [ ]
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
    if(board.moveOwner == Type.playerTwoType) {
      rIdx = rIdx % 4;
    }
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
        board.getCell(board.one.head.regionIndex, board.one.head.cellIndex),
        Type.playerOneType,
        NUM_CHECKERS
      );
      board.addCheckers(
        board.getCell(board.two.head.regionIndex, board.two.head.cellIndex),
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

  board.checkInHouse = function() {
    var num = 0,
        who,
        rh;
    if(board.moveOwner == Type.playerOneType) {
      who = 'one';
      rh  = board.one.house.regionIndex;
    }
    else if(board.moveOwner == Type.playerTwoType) {
      who = 'two';
      rh  = board.two.house.regionIndex;
    }
    else {
      return false;
    }
    if(!board[who].house.inHouse) {
      for(var i = 0; i < 6; i++) {
        var c = board.getCell(rh, i).checkers;
        if(c.length && c[c.length - 1] == board.moveOwner) {
          num += c.length;
        }
      }
      if(num == NUM_CHECKERS) {
        board[who].house.inHouse = true;
      }
    }
  };

  board.getPlayerMoveOwner = function() {
    if(board.moveOwner == Type.playerOneType) {
      return 'one';
    }
    else if(board.moveOwner == Type.playerTwoType) {
      return 'two';
    }
    return false;
  };

  board.throwAnyChecker = function() {
    var rh;
    if(board.moveOwner == Type.playerOneType) {
      rh  = board.one.house.regionIndex;
    }
    else if(board.moveOwner == Type.playerTwoType) {
      rh  = board.two.house.regionIndex;
    }
    else {
      return false;
    }
    for(var i = 0; i < 6; i++) {
      var c = board.getCell(rh, i).checkers;
      if(c.length && c[c.length - 1] == board.moveOwner) {
        var moveIdx = -1;
        for(var k in board.moves) {
          if(board.moves[k] >= 6 - i) {
            moveIdx = k;
            break;
          }
        }
        if(board.existsCorrectMovesFrom(rh, i) || moveIdx !== -1) {
          if(board.throwChecker(i)) {
            return true;
          }
        }
      }
    }
    return false;
  };

  board.throwChecker = function(scIdx) {
    var who, rh;
    if(board.moveOwner == Type.playerOneType) {
      who = 'one';
      rh  = board.one.house.regionIndex;
    }
    else if(board.moveOwner == Type.playerTwoType) {
      who = 'two';
      rh  = board.two.house.regionIndex;
    }
    else {
      return false;
    }
    scIdx = +scIdx;
    var moveIdx = -1;
    for(var i in board.moves) {
      if(board.moves[i] >= 6 - scIdx) {
        moveIdx = i;
        break;
      }
    }
    if(moveIdx === -1) {
      return false;
    }
    var s = board.getCell(rh, scIdx);
    board.moves.splice(moveIdx, 1);
    board[who].thrown.push(s.checkers.pop());

    board.checkWin();
    if((!board.moves.length || !board.existsCorrectMovesAtHouse()) && !board.win) {
      board.moveOwner = Type.getOppositeType(board.moveOwner);
      board.isMoving = false;
    }
    return board[who].thrown;
  };

  board.checkWin = function() {
    var who = board.getPlayerMoveOwner();
    if(board[who].thrown.length == NUM_CHECKERS) {
      if(board.lastMove) {
        board.win = 'draw';
      }
      else {
        if(board.first != board.moveOwner) {
          board.win = board.moveOwner;
        }
      }
    }
    else if(board.lastMove) {
      board.win = Type.getOppositeType(board.moveOwner);
    }
    if(board[who].thrown.length == NUM_CHECKERS &&
       board.first == board.moveOwner && !board.win) {
      board.lastMove = true;
    }
  };

  board.move = function(srIdx, scIdx, erIdx, ecIdx) {
    var t = board.getCell(+erIdx, +ecIdx);
    for(var k in board.moves) {
      var s = board.getCell(+srIdx, +scIdx),
          e = board.getCell(+srIdx, (+scIdx) + (+board.moves[k]));
      if(e && (!e.checkers.length ||
         e.checkers[e.checkers.length - 1] == board.moveOwner)) {
        if(board.moveOwner == Type.playerTwoType) {
          if(srIdx == 1 && erIdx == 2) {
            continue;
          }
        }
        if(t == e) {
          if(board.moveOwner == Type.playerOneType) {
            if(s == board.getCell(board.one.head.regionIndex, board.one.head.cellIndex)) {
              if(!board.moveFromHead) {
                board.moveFromHead = true;
              }
              else {
                continue;
              }
            }
          }
          else if(board.moveOwner == Type.playerTwoType) {
            if(s == board.getCell(board.two.head.regionIndex, board.two.head.cellIndex)) {
              if(!board.moveFromHead) {
                board.moveFromHead = true;
              }
              else {
                continue;
              }
            }
          }
          board.moves.splice(k, 1);
          e.checkers.push(s.checkers.pop());
          board.checkInHouse();
          board.checkWin();
          var existsMoves;
          if((board.moveOwner == Type.playerOneType && board.one.house.inHouse) ||
             (board.moveOwner == Type.playerTwoType && board.two.house.inHouse)) {
            existsMoves = board.existsCorrectMovesAtHouse();
          }
          else {
            existsMoves = board.existsCorrectMoves();
          }
          if((!board.moves.length || !existsMoves) && !board.win) {
            board.moveOwner = Type.getOppositeType(board.moveOwner);
            board.isMoving = false;
            board.moveFromHead = false;
          }
          return true;
        }
      }
    }
    return false;
  };

  board.existsCorrectMovesAtHouse = function() {
    var rh;
    if(board.moveOwner == Type.playerOneType) {
      rh  = board.one.house.regionIndex;
    }
    else if(board.moveOwner == Type.playerTwoType) {
      rh  = board.two.house.regionIndex;
    }
    else {
      return false;
    }
    for(var i = 0; i < 6; i++) {
      var c = board.getCell(rh, i).checkers;
      if(c.length && c[c.length - 1] == board.moveOwner) {
        var moveIdx = -1;
        for(var k in board.moves) {
          if(board.moves[k] >= 6 - i) {
            moveIdx = k;
            break;
          }
        }
        if(board.existsCorrectMovesFrom(rh, i) || moveIdx !== -1) {
          return true;
        }
      }
    }
    return false;
  };

  board.existsCorrectMovesFrom = function(rIdx, cIdx) {
    for(var k in board.moves) {
      var s = board.getCell(rIdx, cIdx),
          e = board.getCell(rIdx, cIdx + board.moves[k]);
      if(board.moveOwner == Type.playerTwoType) {
        if(rIdx == 1 && cIdx + board.moves[k] > 5) {
          continue;
        }
      }
      if(e && (!e.checkers.length ||
         e.checkers[e.checkers.length - 1] == board.moveOwner)) {
        if(board.moveOwner == Type.playerOneType) {
          if(s == board.getCell(board.one.head.regionIndex, board.one.head.cellIndex) &&
             board.moveFromHead) {
            continue;
          }
        }
        else if(board.moveOwner == Type.playerTwoType) {
          if(s == board.getCell(board.two.head.regionIndex, board.two.head.cellIndex) &&
             board.moveFromHead) {
            continue;
          }
        }
        return true;
      }
    }
    return false;
  };

  board.existsCorrectMoves = function() {
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

  board.getAvailableMoves = function() {
    var who = board.getPlayerMoveOwner(),
        ret = [ ];
    if(!who) {
      return ret;
    }
    for(var i = 0; i < 4; i++) {
      for(var j = 0; j < 6; j++) {
        var c = board.getCell(i, j).checkers;
        if(c.length && c[c.length - 1] == board.moveOwner) {

          for(var k in board.moves) {
            var s = board.getCell(i, j),
                e = board.getCell(i, j + board.moves[k]);
            if(board.moveOwner == Type.playerTwoType) {
              if(i == 1 && j + board.moves[k] > 5) {
                continue;
              }
            }
            if(e && (!e.checkers.length ||
               e.checkers[e.checkers.length - 1] == board.moveOwner)) {
              if(board.moveOwner == Type.playerOneType) {
                if(s == board.getCell(board.one.head.regionIndex, board.one.head.cellIndex) &&
                   board.moveFromHead) {
                  continue;
                }
              }
              else if(board.moveOwner == Type.playerTwoType) {
                if(s == board.getCell(board.two.head.regionIndex, board.two.head.cellIndex) &&
                   board.moveFromHead) {
                  continue;
                }
              }
              ret.push({
                from: {
                  regionIndex: i,
                  cellIndex: j,
                  checkers: s.checkers.length
                },
                to: {
                  regionIndex: i + Math.floor((j + board.moves[k]) / 6),
                  cellIndex: (j + board.moves[k]) % 6,
                  checkers: e.checkers.length
                },
                move: board.moves[k]
              });
              if(board.moveOwner == Type.playerTwoType) {
                ret[ret.length - 1].to.regionIndex %= 4;
              }
            }
          }

        }
      }
    }
    return ret;
  };

  board.discardMoves = function() {
    board.moves = [ ];
    board.isMoving = false;
    board.moveOwner = Type.getOppositeType(board.moveOwner);
  };

  board.setMoves = function(dices) {
    board.moves = [ ];
    if(dices[0] == dices[1]) {
      for(var i = 0; i < 4; i++) {
        board.moves.push(dices[0]);
      }
    }
    else {
      board.moves.push(dices[0]);
      board.moves.push(dices[1]);
    }
    board.moves.sort(function(lhs, rhs) {
      return (+lhs) - (+rhs);
    });
    board.moveFromHead = false;
    var existsMoves;
    if((board.moveOwner == Type.playerOneType && board.one.house.inHouse) ||
       (board.moveOwner == Type.playerTwoType && board.two.house.inHouse)) {
      existsMoves = board.existsCorrectMovesAtHouse();
    }
    else {
      existsMoves = board.existsCorrectMoves();
    }
    if(!existsMoves) {
      board.checkWin();
      if(!board.win) {
        board.discardMoves();
      }
    }
    return board.moves;
  };

  return board;

}]);
