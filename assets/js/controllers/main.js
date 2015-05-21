'use strict';

angular
.module('--ckgammonApp.controllers')
.controller('MainController', [ '$scope', '$timeout', 'ArtificialIntelligence', 'Type', 'Board', 'Dice', function($scope, $timeout, AI, Type, Board, Dice) {

  var playerDice = undefined,
      playerOpposite = undefined,
      animationTime = 1500;

  var initDices = function() {
    $scope.dices = {
      red: {
        value: undefined,
        rolled: undefined
      },
      black: {
        value: undefined,
        rolled: undefined
      }
    };
    playerDice = undefined;
    playerOpposite = undefined;
  };

  initDices();

  var oppositeDices = {
    red: 'black',
    black: 'red'
  };

  $scope.roll = function(dice) {
    if(!$scope.dices[dice].value && (!$scope.dices[oppositeDices[dice]].rolled || playerOpposite)) {
      if(!playerOpposite) {
        playerDice = dice;
        $scope.dices[dice].value = Dice.roll();
        $scope.dices[dice].rolled = true;
        $timeout(function() {
          if($scope.usersData.two.type != 'human') {
            $scope.dices[oppositeDices[dice]].value = Dice.roll();
          }
          else {
            playerOpposite = true;
          }
        }, animationTime);
      }
      else {
        $scope.dices[dice].value = Dice.roll();
      }
      playerOpposite = false;
    }
  };

  $scope.$watch('[dices.red.value, dices.black.value]', function() {
    if($scope.dices.red.value && $scope.dices.black.value) {
      if($scope.dices.red.value == $scope.dices.black.value) {
        $timeout(function() {
          initDices();
        }, animationTime);
      }
      else {
        if($scope.dices[playerDice].value > $scope.dices[oppositeDices[playerDice]].value) {
          Board.moveOwner = Board.first = Type.playerOneType;
        }
        else {
          Board.moveOwner = Board.first = Type.playerTwoType;
        }
        $timeout(function() {
          $scope.statusDices = false;
          Board.isMoving = false
        }, animationTime);
      }
    }
  });

  var moveAI = function() {
    $timeout(function() {
      var moves = Board.getAvailableMoves();
      if(moves.length > 0) {
        var move = AI.getNextMove(moves);
        if(Board.move(move.from.regionIndex, move.from.cellIndex, move.to.regionIndex, move.to.cellIndex)) {
          if(Board.moves.length > 0) {
            moveAI();
          }
        }
        else {
          console.log('AI selecting move error...');
        }
      }
    }, 500);
  };

  $scope.$watchCollection(
    function() { return [ Board.isMoving, Board.moveOwner ]; },
    function(values) {
      console.log(values);
      $scope.statusDiceGroup = !values[0];
      if(!values[0] && values[1]) {
        if($scope.usersData.two.type == 'ai' &&
           values[1] == $scope.usersData.two.color) {
          $scope.rollGroup(moveAI);
        }
      }
    }
  );

  $scope.$watch(function() { return Board.one.house.inHouse; }, function(val) {
    $scope.statusPlayerOneHouse = val;
  });

  $scope.$watch(function() { return Board.two.house.inHouse; }, function(val) {
    $scope.statusPlayerTwoHouse = val;
  });

  $scope.$watch(function() { return Board.win; }, function(val) {
    if(val != undefined) {
      if($scope.usersData.one.color == val) {
        $scope.win = 'one';
      }
      else if($scope.usersData.two.color == val) {
        $scope.win = 'two';
      }
      else {
        $scope.win = val;
      }
      $scope.statusNewGameDialogClose = false;
      $scope.showNewGameDialog();
    }
  });

  $scope.diceGroupValues = [ undefined, undefined ];

  var lockDiceGroup = false;

  $scope.rollGroup = function(cb) {
    if(!lockDiceGroup) {
      lockDiceGroup = true;
      $scope.diceGroupValues = [ undefined, undefined ];
      $timeout(function() {
        $scope.diceGroupValues[0] = Dice.roll();
        $scope.diceGroupValues[1] = Dice.roll();
      });
      $timeout(function() {
        Board.isMoving = true;
        Board.setMoves($scope.diceGroupValues);
        (cb || angular.noop)();
        lockDiceGroup = false;
      }, animationTime + 500);
    }
  };

  $scope.statusDices = true;
  $scope.statusDiceGroup = false;
  $scope.statusNewGameDialog = true;
  $scope.statusNewGameDialogClose = false;
  $scope.statusPlayerOneHouse = false;
  $scope.statusPlayerTwoHouse = false;
  $scope.win = false;

  $scope.showNewGameDialog = function() {
    $scope.statusNewGameDialog = true;
  };

  $scope.hideNewGameDialog = function() {
    $scope.statusNewGameDialog = false;
  };

  $scope.colors = Type.data;

  $scope.usersData = {
    one: {
      name: 'L',
      color: undefined
    },
    two: {
      name: 'KIRA',
      color: undefined,
      type: 'ai'
    }
  };

  $scope.chooseColor = function(color) {
    $scope.usersData.one.color = color;
    $scope.usersData.two.color = Type.getOppositeType(color);
  };

  $scope.$watch('usersData.two.type', function(val) {
    $scope.usersData.two.type = val;
  });

  $scope.newGame = function() {
    Type.setPlayerOneType($scope.usersData.one.color);
    Board.initCheckers();
    $scope.statusNewGameDialog = false;
    $scope.statusNewGameDialogClose = Board.existsCheckers;
    $scope.statusDices = true;
    $scope.statusDiceGroup = false;
    Board.isMoving = true;
    Board.moveOwner = false;
    Board.first = undefined;
    Board.win = undefined;
    Board.lastMove = undefined;
    Board.one.house.inHouse = false;
    Board.two.house.inHouse = false;
    $scope.statusPlayerOneHouse = false;
    $scope.statusPlayerTwoHouse = false;
    Board.one.thrown = [ ];
    Board.two.thrown = [ ];
    $scope.win = false;
    initDices();
  };

  $scope.isDisabled = function() {
    return !($scope.usersData.one.color && $scope.usersData.two.color &&
             $scope.usersData.one.name && $scope.usersData.two.name &&
             $scope.usersData.two.type);
  };

}]);
