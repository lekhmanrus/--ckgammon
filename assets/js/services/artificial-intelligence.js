'use strict';

angular
.module('--ckgammonApp.services')
.factory('ArtificialIntelligence', [ function() {

  var rate = {
    one: {
      section: [
        [ 1,  2,  3,  4,  5,  6  ],
        [ 7,  8,  9,  10, 11, 12 ],
        [ 13, 14, 15, 16, 17, 18 ],
        [ 19, 20, 21, 22, 23, 24 ]
      ],
      checker: [
        [  8,   7,   6,   5,   4,   3  ],
        [  0,  -1,  -2,  -3,  -4,  -5  ],
        [ -15, -15, -15, -15, -15, -15 ],
        [ -50, -50, -50, -50, -50, -50 ]
      ]
    },
    two: {
      section: [
        [ 13, 14, 15, 16, 17, 18 ],
        [ 19, 20, 21, 22, 23, 24 ],
        [ 1,  2,  3,  4,  5,  6  ],
        [ 7,  8,  9,  10, 11, 12 ]
      ],
      checker: [
        [ -15, -15, -15, -15, -15, -15 ],
        [ -50, -50, -50, -50, -50, -50 ],
        [  8,   7,   6,   5,   4,   3  ],
        [  0,  -1,  -2,  -3,  -4,  -5  ]
      ]
    }
  };

  /*var rank = [
    [  15,  15,  15,  15,  15,  15 ],
    [ -15, -15, -15, -15, -15, -15 ],
    [  25,  25,  25,  25,  25,  25 ],
    [  25,  0,   0,   0,   0,   0 ]
  ];*/

  return {

    getNextMove: function(moves, player) {
      for(var i in moves) {
        var m = moves[i];
        m.rank  = rate[player].section[m.to.regionIndex][m.to.cellIndex];
        m.rank += rate[player].checker[m.from.regionIndex][m.from.cellIndex];
        //m.rank -= m.to.checkers;
        //m.rank  = rank[m.to.regionIndex][m.to.cellIndex];
        //m.rank -= m.to.checkers * 25;
      }
      moves.sort(function(lhs, rhs) {
        return rhs.rank - lhs.rank;
      });
      //console.log('m', moves);
      //console.log('gm', moves[0]);
      return moves[0];
    }

  };

}]);
