define([
  'omega/entity',
  'boxy/entity/box',
  'omega/behaviour/dom'
],
function (e, box, dom) {

  'use strict';

  var Box2 = e.extend({
    init: function (color) {
      this.has(dom(300, 0, 100, 100), box({}, color));

      this.bind('Click', function () {
        new Box2('orange');
        this.destroy();
      });
    }
  });

  return Box2;
});
