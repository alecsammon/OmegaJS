require(['shooter/require.config.js'], function () {
  'use strict';

  require([
    'omega/core',
    'omega/pulse',
    'shooter/entity/player',
    'shooter/entity/enemy',
    'omega/debug/core'
  ], function (o, pulse, Player, Enemy, Debug) {
    o.init(document.getElementById('omegajs'), 1000, 600, 30);
    new Debug();

    // new object
    new Player();
    
    var x = 0;
    pulse.bind(function () {
      --x;
      if (x < 0) {
        new Enemy();
        x = 5;
      }
    });
  });
});
