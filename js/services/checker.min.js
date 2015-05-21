'use strict';

angular
.module('--ckgammonApp.services')
.factory('Checker', [ function() {

  var dragging = undefined;

  return {

    get dragging() {
      return dragging;
    },

    setDragging: function(pDragging) {
      return dragging = pDragging;
    }

  };

}]);
