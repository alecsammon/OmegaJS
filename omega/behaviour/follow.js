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

    /**
     * this.init
     * Entity will follow the mouse
     *
     * @param integer {optional} Maximium pixels the entity will move in the x direction per frame (-1 = always under mouse)
     * @param integer {optional} As above, but for y. If undefined will take the value for x
     */
    init: function (x, y) {
      var mousePos = {};

      this.has(mouse, dom);

      o.bind('MouseMove', function(e) {
        mousePos = e;
      });

      this.follow.x = (typeof x !== 'undefined') ? x : -1;
      this.follow.y = (typeof y !== 'undefined') ? y : this.follow.x;

      this.bind('EnterFrame', function () {
        if(this.follow.x === -1) {
          this.x = mousePos.x - (this.w/2);
        } else {
          var centerX = this.x + (this.w/2);
          if (mousePos.x && centerX > mousePos.x) {
            this.nudge(-this.follow.x, 0);
          }

          if (mousePos.x && centerX < mousePos.x) {
            this.nudge(this.follow.x, 0);
          }
        }

        if(this.follow.y === -1) {
          this.y = mousePos.y - (this.h/2);
        } else {
          if (mousePos.y && this.y + (this.h/2) < mousePos.y) {
            this.nudge(0, this.follow.y);
          }

          if (mousePos.y && this.y + (this.h/2) > mousePos.y) {
            this.nudge(0, -this.follow.y);
          }
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
