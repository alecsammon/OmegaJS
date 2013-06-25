define([
  'omega/entity',
  'boxy/entity/box',
  'omega/entity/dom'
],
        function (e, Box, Dom) {

          'use strict';

          var Box2 = e.extend({
            init: function (color) {
              var dom = Dom({x: 300, w: 100, h: 100});
              this.depends(dom, Box({}, color || 'green'));

              this.bind('Click', function () {
                new Box2('orange');
                this.destroy();
              });
            }
          });

          return Box2;
        });
