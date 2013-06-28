define([
  'omega/core',
  'omega/entity',
  'omega/behaviour/dom',
  'omega/behaviour/animate',
  'omega/behaviour/collision'
], function (o, e, dom, animate, collision) {

  'use strict';

  return e.extend({
    name: 'Enemy',

    init: function () {
      var speed = (Math.random() * 3) + 1,
          x = 10 + Math.random() * (o.getAttr().width - 52);

      this.has(dom(x, o.getAttr().height, 29, 31), collision, animate)
          .addClass('enemy').addClass('sprite')
          .addCollision(['a', 'b'])
          .animate(0, 2, -1, 2)
          .bind('Collision', function (args) {
            if(args.into.name !== 'Enemy') {
              this.removeCollision()
                  .addClass('destroy')
                  .unbind('EnterFrame', 'Fly')
                  .animate(0, 5, 1, 3, function () {
                    this.destroy();
                  });
            }
          })
          .bind('EnterFrame', function () {
            this.y -= speed;
          }, 'Fly');
    }
  });

});
