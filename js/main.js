require(['js/require.config.js'], function () {
  'use strict';

  require([
      'omegaCore',
      'entity/player',
      'entity/player2',
      'omega/entity'
    ], function (o, Player, Player2, e) {

      o.init(document.getElementById('omegajs'), 800, 600);

      // new object
      new Player({x: 0, w: 150, h: 150}, 'red');

      // another new object
      new Player2({x: 10, w: 100, h: 100}, 'green');

      // quick setup
      var c = e.create([Player], {x: 20, w: 50, h: 50});
      c.setStyle('backgroundColor', 'blue');

      // long!
      //var d = new (e.extend({init:function(){ this.depends(player); }}))({x:20, w:50, h:50});
      //d.setStyle('backgroundColor', 'yellow');
    });
});
