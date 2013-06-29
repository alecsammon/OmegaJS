define([
  'omega/core',
  'omega/entity',
  'shooter/entity/coin',
  'omega/behaviour/dom',
  'omega/behaviour/animate',
  'omega/behaviour/collision'
], function (o, e, Coin, dom, animate, collision) {

  'use strict';

  return e.extend({
    name: 'Enemy',

    init: function () {
      var speed = (Math.random() * 5) + 5,
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
                  .animate(0, 5, 1, 2, function () {
                    this.destroy();
                  });

              new Coin(this.x, this.y);
            }
          })
          .bind('EnterFrame', function () {
            this.y -= speed;
          }, 'Fly')
          .bind('ExitFrame', function() {
            this.destroy();
          });
    }
  });

});
