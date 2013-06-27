define([
  'omega/entity',
  'boxy/entity/box',
  'omega/entity/dom'
],
        function (e, Box, Dom) {

          'use strict';

          var Box2 = e.extend({
            name: 'Box2',
            
            init: function (color) {
              var dom = Dom(300, 0, 100, 100);
              this.depends(dom, Box({}, color));

              this.bind('Click', function () {
                new Box2('orange');
                this.destroy();
              });
            },
            
            destroy: function() {
              alert('test');
            }
          });

          return Box2;
        });
