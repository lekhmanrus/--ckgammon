'use strict';

angular
.module('--ckgammonApp.services')
.factory('ArtificialIntelligence', [ function() {

  var rate = {
    one: {
      to: [
        [  0, 1,  1,  1,  1,  1  ],
        [  2, 3,  4,  5,  6,  7  ],
        [ 11, 12, 13, 14, 15, 16 ],
        [ 21, 22, 23, 24, 25, 26 ]
      ],
      from: [
        [ 100,   5,   4,   3,   2,   1 ],
        [  10,  15,  15,  15,  15,  15 ],
        [ -75, -75, -75, -75, -75, -75 ],
        [ -99, -99, -99, -99, -99, -99 ]
      ]
    },
    two: {
      to: [
        [ 15, 16, 17, 18, 19, 20 ],
        [ 23, 24, 25, 26, 27, 28 ],
        [  0,  3,  3,  3,  3,  3 ],
        [  3,  4,  5,  6,  7,  8 ]
      ],
      from: [
        [  -50,  -55,  -60,  -65,  -70,  -75 ],
        [ -125, -125, -125, -125, -125, -125 ],
        [  100,   12,   11,   10,    9,    8 ],
        [   7,    21,   21,   21,   21,   21 ]
      ]
    }
  };

  return {

    getNextMove: function(moves, player) {
      for(var i in moves) {
        var m = moves[i];
        m.rank  = rate[player].to[m.to.regionIndex][m.to.cellIndex];
        m.rank += m.from.checkers * 75;
        var tmp = 0;
        if(!(rate[player].from[m.from.regionIndex][m.from.cellIndex] == 100 && m.from.checkers == 1)) {
          tmp = rate[player].from[m.from.regionIndex][m.from.cellIndex];
          m.rank += rate[player].from[m.from.regionIndex][m.from.cellIndex];
        }
        else {
          tmp = 75;
          m.rank += 75;
        }
        //m.rank += rate[player].from[m.to.regionIndex][m.to.cellIndex];
        m.rank -= m.to.checkers * 75;
        console.log(
          player,
          'from ' + rate[player].from[m.from.regionIndex][m.from.cellIndex] + ': ', m.from.regionIndex, m.from.cellIndex,
          'fch: ', m.from.checkers, '(' + m.from.checkers * 75 + ')',
          'to ' + rate[player].to[m.to.regionIndex][m.to.cellIndex] + ': ', m.to.regionIndex, m.to.cellIndex,
          'tch: ', m.to.checkers, '(' + m.to.checkers * 75 + ')',
          'rank: ', m.rank, ' = ' + rate[player].to[m.to.regionIndex][m.to.cellIndex] + ' + ' + m.from.checkers * 75 + ' + ' + tmp + ' - ' + m.to.checkers * 75
        );
      }
      moves.sort(function(lhs, rhs) {
        return (+rhs.rank) - (+lhs.rank);
      });
      return moves[0];
    }

  };

}]);
