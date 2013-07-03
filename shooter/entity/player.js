define([
  'omega/core',
  'omega/entity',
  'omega/behaviour/dom',
  'omega/behaviour/fourway',
  'shooter/entity/bullet',
  'omega/behaviour/animate',
  'omega/behaviour/collision',
  'omega/behaviour/mouse',
  'omega/behaviour/follow'
], function (o, e, dom, fourway, Bullet, animate, collision, mouse, follow) {

  'use strict';

  return e.extend({
    init: function () {
      var count = 0,
          alive = true,
          mouseDown = false;

      o.bind('MouseDown', function(){
        mouseDown = true;
      });

      o.bind('MouseUp', function(){
        mouseDown = false;
      });

      this.has(dom(o.getAttr().width / 2 - 30, 20, 60, 45), fourway(12), follow(12), animate, collision, mouse)
          .boundStage()
          .addClass('player')
          .addClass('sprite')
          .animate(0, 2)
          .addCollision('b')
          .addCollision('c')
          .bind('Collision', function (args) {
            if(args.into.name === 'Enemy') {
              alive = false;
              this.addClass('destroy')
                .removeCollision()
                .disableFourway()
                .disableFollow()
                .unbind('EnterFrame', 'Skew')
                .removeClass('horz')
                .animate(0, 6, 1, 4, function () {
                  this.destroy();
                });
            }
          })
          .bind('EnterFrame', function () {
            if (this.isKeyDown(37) || this.isKeyDown(39)) {
              this.addClass('horz');
            } else {
              this.removeClass('horz');
            }
          }, 'Skew')
          .bind('EnterFrame', function () {
            if (alive && (this.isKeyDown(17) || mouseDown)) {  // ctrl
              --count;
              if (count <= 0) {
                new Bullet(this.x + 22, this.y + 45);
                count = 5;
              }
            } else {
              count = 0;
            }
          });
    }
  });

});
