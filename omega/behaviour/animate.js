define([
  'omega/entity',
  'omega/behaviour/dom'
], function (e, dom) {

  'use strict';

  return e.extend({
    init: function () {
      this.has(dom);
    },

    animate: function (from, to, loop, frames, callback) {
      var a = from,
          frameCount = 0,
          count = 0;

      loop = loop ? loop : -1;
      frames = frames ? frames : 1;

      var endAnimation = function () {
        this.unbind('EnterFrame', 'animation');
        callback.call(this);
      };

      this.bind('EnterFrame', function () {
        ++frameCount;
        if (frameCount >= frames) {
          this.removeClass('anim_' + a);
          ++a;

          if (a > to) {
            a = from;
            this.addClass('anim_' + a);

            ++count;
            if (count >= loop && loop !== -1) {
              endAnimation.call(this);
            }
          } else {
            this.addClass('anim_' + a);
          }
          frameCount = 0;
        }
      }, 'animation');

      return this;
    }
  });

});
