define([
  'omega/entity',
  'omega/core',
  'omega/behaviour/mouse',
  'omega/behaviour/dom'
], function (e, o, mouse, dom) {

  'use strict';

  return e.extend({
    follow: {
      x: 1,
      y: 1
    },

    init: function (x, y) {
      var mousePos = {};

      this.has(mouse, dom);

      o.bind('MouseMove', function(e) {
        mousePos = e;
      });

      this.follow.x = (typeof x !== 'undefined') ? x : 1;
      this.follow.y = (typeof y !== 'undefined') ? y : this.follow.x;

      this.bind('EnterFrame', function () {
        if (mousePos.x && this.x + (this.w/2) > mousePos.x) {
          this.nudge(-this.follow.x, 0);
        }

        if (mousePos.y && this.y + (this.h/2) < mousePos.y) {
          this.nudge(0, this.follow.y);
        }

        if (mousePos.x && this.x + (this.w/2) < mousePos.x) {
          this.nudge(this.follow.x, 0);
        }

        if (mousePos.y && this.y + (this.h/2) > mousePos.y) {
          this.nudge(0, -this.follow.y);
        }
      });
    },

    disableFollow: function () {
      this.follow.x = 0;
      this.follow.y = 0;

      return this;
    }
  });
});
