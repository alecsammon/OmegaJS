require(['boxy/require.config.js'], function () {
  'use strict';

  require([
    'omega/core',
    'boxy/entity/box',
    'boxy/entity/box2',
    'omega/entity',
    'omega/debug/core'
  ], function (o, Box, Box2, e, Debug) {
    o.init(document.getElementById('omegajs'), 800, 600, 30);
    // new Debug();
    // setTimeout(function() { o.endScene();}, 5000);
    
    // new object
    new Box({dom: [0, 0, 120, 120]}, 'red');
    new Box({dom: [0, 10, 100, 100]}, 'orange');

    // another new object
    new Box2('green');

    // quick setup
    var c = e.create([Box], {dom: [20, 0, 50, 50]});
    c.setStyle('backgroundColor', 'blue');

    // long!
    var d = new (e.extend({init: function () {
        this.has(Box);
      }}))({dom: [20, 0, 50, 50]});
    d.setStyle('backgroundColor', 'yellow');
  });
});
