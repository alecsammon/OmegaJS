define([
  'omega/core',
  'omega/entity',
  'omega/behaviour/dom',
  'omega/behaviour/collision'
], function (o, e, dom, collision) {

  'use strict';

  return e.extend({
    init: function (x, y) {
      this.has(dom(x, y, 17, 15), collision).addClass('bullet').addClass('sprite');

      this.addCollisionGroup('a');


      this.bind('Collision', function () {
        this.destroy();
      });

      this.bind('EnterFrame', function () {
        this.y += 7;
        if (this.y > o.getAttr().height) {
          this.destroy();
        }
      });
    }
  });

});
