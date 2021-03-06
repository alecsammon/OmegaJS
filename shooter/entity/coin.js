define([
  'omega/core',
  'omega/entity',
  'omega/behaviour/dom',
  'omega/behaviour/collision',
  'omega/behaviour/text',
  'omega/behaviour/delay'
], function (o, e, dom, collision, text, delay) {

  'use strict';

  return e.extend({
    init: function (x, y) {
      this.has(dom(x, y, 20, 20), collision, text, delay).addClass('coin');
      this.content = '$';
      this.addCollision('c');

      this.bind('Collision', function () {
        this.destroy();
      });

      this.delay(120, function() {
        this.destroy();
      });
    }
  });

});
