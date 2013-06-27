define([
  'omega/entity',
  'omega/entity/dom',
], function (e, dom) {

  'use strict';

  return e.extend({
    init: function () {
      this.depends(dom);
    },

    animate: function (from, to, loop, frames, callback) {
      var a = from,
              delay = 0,
              count = 0,
              loop = loop ? loop : -1,
              frames = frames ? frames : 1;

      this.bind('EnterFrame', function () {
        ++delay;
        if (delay >= frames) {
          this.removeClass('anim_' + a);
          ++a;
          this.addClass('anim_' + a);
          if (a > to) {
            a = from;
            if (loop !== -1) {
              ++count;
              if (count >= loop) {
                this.unbind('EnterFrame', 'animation');
                if (callback) {
                  callback.call(this);
                }
              }
            }

          }


          delay = 0;
        }
      }, 'animation');
    }
  });

});
