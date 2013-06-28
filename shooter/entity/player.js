define([
  'omega/core',
  'omega/entity',
  'omega/entity/dom',
  'omega/entity/fourway',
  'shooter/entity/bullet',
  'omega/entity/animate',
  'omega/entity/collision'
], function (o, e, dom, fourway, Bullet, animate, collision) {

  'use strict';

  return e.extend({
    init: function () {
      var count = 20;

      this.depends(dom(o.getAttr().width / 2 - 30, 20, 60, 45), fourway(5, 5), animate, collision)
          .boundStage()
          .addClass('player').addClass('sprite');

      this.animate(0, 2);

      this.addCollisionGroup('b');

      this.bind('Collision', function () {
        this.addClass('destroy');
        this.disableFourway();
        this.unbind('EnterFrame', 'Skew');
        this.animate(0, 6, 1, 4, function () {
          this.destroy();
        });
      });

      this.bind('EnterFrame', function () {
        if (this.isKeyDown(37) || this.isKeyDown(39)) {
          this.addClass('horz');
        } else {
          this.removeClass('horz');
        }
      }, 'Skew');

      this.bind('EnterFrame', function () {
        if (this.isKeyDown(17)) {  // ctrl
          ++count;
          if (count >= 20) {
            new Bullet(this.x + 22, this.y + 45);
            count = 0;
          }
        } else {
          count = 20;
        }
      });
    }
  });

});
