define(['omega/entity', 'omega/core'], function (e, o) {

  'use strict';

  return e.extend({
    name: 'keyboard',
    
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
