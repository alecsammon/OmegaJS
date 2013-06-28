define([
  'omega/core',
  'omega/entity',
  'omega/entity/dom',
  'omega/entity/animate',
  'omega/entity/collision'
], function (o, e, dom, animate, collision) {

  'use strict';

  return e.extend({
    init: function () {
      var x = 10 + Math.random() * (o.getAttr().width - 20);

      this.depends(dom(x, o.getAttr().height, 30, 32), collision, animate);
      this.addClass('enemy').addClass('sprite');
      this.addCollisionGroup('a');
      this.addCollisionGroup('b');

      this.bind('Collision', function () {

        this.removeCollision();
        this.addClass('destroy');
        this.unbind('EnterFrame', 'Fly');

        this.animate(0, 5, 1, 4, function () {
          this.destroy();
        });

      });

      this.bind('EnterFrame', function () {
        --this.y;
      }, 'Fly');
    }
  });

});
