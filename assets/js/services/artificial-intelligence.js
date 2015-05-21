'use strict';

angular
.module('--ckgammonApp.services')
.factory('ArtificialIntelligence', [ function() {

  var rate = {
    section: [
      [ 13, 14, 15, 16, 17, 18 ],
      [ 19, 20, 21, 22, 23, 24 ],
      [ 1,  2,  3,  4,  5,  6  ],
      [ 7,  8,  9,  10, 11, 12 ]
    ],
    checker: [
      [ -15, -15, -15, -15, -15, -15 ],
      [ -50, -50, -50, -50, -50, -50 ],
      [  0,   7,   6,   5,   4,   3  ],
      [  0,  -1,  -2,  -3,  -4,  -5  ]
    ]
  };

  return {

    getNextMove: function(moves) {
      for(var i in moves) {
        var m = moves[i];
        m.rank  = rate.section[m.to.regionIndex][m.to.cellIndex];
        m.rank += rate.checker[m.to.regionIndex][m.to.cellIndex];
        m.rank -= m.to.checkers;
      }
      moves.filter(function(lhs, rhs) {
        return lhs.rank - rhs.rank;
      });
      //console.log('m', moves);
      //console.log('gm', moves[0]);
      return moves[0];
    }

  };

}]);
