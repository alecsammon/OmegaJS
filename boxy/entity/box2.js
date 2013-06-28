define([
  'omega/entity',
  'boxy/entity/box',
  'omega/entity/dom'
],
function (e, box, dom) {

  'use strict';

  var Box2 = e.extend({
    init: function (color) {
      this.depends(dom(300, 0, 100, 100), box({}, color));

      this.bind('Click', function () {
        new Box2('orange');
        this.destroy();
      });
    }
  });

  return Box2;
});
