define([
  'omega/entity',
  'omega/behaviour/keyboard',
  'omega/behaviour/dom'
], function (e, keyboard, dom) {

  'use strict';

  return e.extend({
    fourway: {
      x: 1,
      y: 1
    },

    init: function (x, y) {
      this.has(keyboard, dom);
      this.fourway.x = (typeof x !== 'undefined') ? x : 1;
      this.fourway.y = (typeof y !== 'undefined') ? y : this.fourway.x;

      this.bind('EnterFrame', function () {
        if (this.isKeyDown(37)) {
          this.nudge(-this.fourway.x, 0);
        }

        if (this.isKeyDown(38)) {
          this.nudge(0, this.fourway.y);
        }

        if (this.isKeyDown(39)) {
          this.nudge(this.fourway.x, 0);
        }

        if (this.isKeyDown(40)) {
          this.nudge(0, -this.fourway.y);
        }
      });
    },

    disableFourway: function () {
      this.fourway.x = 0;
      this.fourway.y = 0;

      return this;
    }
  });
});
