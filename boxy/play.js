require(['boxy/require.config.js'], function () {
  'use strict';

  require([
    'omega/core',
    'boxy/entity/box',
    'boxy/entity/box2',
    'omega/entity'
  ], function (o, Box, Box2, e) {
    o.init(document.getElementById('omegajs'), 800, 600);

    // new object
    //new Box({x: 0, w: 150, h: 150}, 'red');

    // another new object
    new Box2();

    // quick setup
    var c = e.create([Box], {x: 20, w: 50, h: 50});
    c.setStyle('backgroundColor', 'blue');


    //setTimeout(function() { o.endScene();}, 5000);

    // long!
    //var d = new (e.extend({init: function () {
    //    this.depends(Box);
    //  }}))({x: 20, w: 50, h: 50});
    //d.setStyle('backgroundColor', 'yellow');
  });
});
