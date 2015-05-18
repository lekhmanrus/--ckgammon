'use strict';

angular
.module('--ckgammonApp.controllers')
.controller('MainController', [ '$scope', '$timeout', 'Type', 'Board', 'Dice', function($scope, $timeout, Type, Board, Dice) {

  var playerDice = undefined,
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
  };

  initDices();

  var oppositeDices = {
    red: 'black',
    black: 'red'
  };

  $scope.roll = function(dice) {
    if(!$scope.dices[dice].value && !$scope.dices[oppositeDices[dice]].rolled) {
      playerDice = dice;
      $scope.dices[dice].value = Dice.roll();
      $scope.dices[dice].rolled = true;
      $timeout(function() {
        $scope.dices[oppositeDices[dice]].value = Dice.roll();
      }, animationTime);
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
          Board.moveOwner = Type.playerOneType;
        }
        else {
          Board.moveOwner = Type.playerTwoType;
        }
        $timeout(function() {
          $scope.statusDices = false;
          Board.isMoving = false
        }, animationTime);
      }
    }
  });

  $scope.$watch(function() { return Board.isMoving; }, function(val) {
    if(val !== undefined) {
      $scope.statusDiceGroup = !val;
    }
  });

  $scope.diceGroupValues = [ undefined, undefined ];

  $scope.rollGroup = function() {
    $scope.diceGroupValues = [ undefined, undefined ];
    $timeout(function() {
      $scope.diceGroupValues[0] = Dice.roll();
      $scope.diceGroupValues[1] = Dice.roll();
    });
    $timeout(function() {
      Board.isMoving = true;
      Board.setMoves($scope.diceGroupValues);
    }, animationTime + 500);
  };

  $scope.statusDices = true;
  $scope.statusDiceGroup = false;
  $scope.statusNewGameDialog = true;
  $scope.statusNewGameDialogClose = false;

  $scope.showNewGameDialog = function() {
    $scope.statusNewGameDialog = true;
  };

  $scope.hideNewGameDialog = function() {
    $scope.statusNewGameDialog = false;
  };

  $scope.colors = Type.data;

  $scope.chooseColor = function(color) {
    Type.setPlayerOneType(color);
    Board.initCheckers();
    $scope.statusNewGameDialog = false;
    $scope.statusNewGameDialogClose = Board.existsCheckers;
    $scope.statusDices = true;
    $scope.statusDiceGroup = false;
    Board.isMoving = undefined
    initDices();
  };

}]);
