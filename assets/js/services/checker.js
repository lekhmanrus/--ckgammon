'use strict';

angular
.module('--ckgammonApp.services')
.service('Checker', [ function() {
  return function(type) {
    return { type: type };
  };
}]);
