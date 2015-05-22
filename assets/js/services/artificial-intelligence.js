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

  return {

    getNextMove: function(moves, player) {
      for(var i in moves) {
        var m = moves[i];
        m.rank  = rate[player].section[m.to.regionIndex][m.to.cellIndex];
        m.rank += rate[player].checker[m.from.regionIndex][m.from.cellIndex];
      }
      moves.sort(function(lhs, rhs) {
        return rhs.rank - lhs.rank;
      });
      return moves[0];
    }

  };

}]);
