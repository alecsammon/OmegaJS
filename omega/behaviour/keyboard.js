define(['omega/entity', 'omega/core'], function (e, o) {

  'use strict';

  var triggerKey = function (action, e) {
          o.trigger(action, {
            keyCode: e.keyCode,
            shiftKey: e.shiftKey,
            ctrlKey: e.ctrlKey,
            altKey: e.altKey
          });
        };

  window.onkeydown = function (e) {
    triggerKey('KeyDown', e);
  };

  window.onkeyup = function (e) {
    triggerKey('KeyUp', e);
  };

  // ---

  return e.extend({
    keyboard: {keys: {}},

    init: function () {
      o.bind('KeyDown', function (e) {
        this.keyboard.keys[e.keyCode] = true;
        this.trigger('KeyDown', e);
      }, this);

      o.bind('KeyUp', function (e) {
        this.keyboard.keys[e.keyCode] = false;
        this.trigger('KeyUp', e);
      }, this);
    },

    isKeyDown: function (keyCode) {
      return (this.keyboard.keys[keyCode]);
    }
  });
});
