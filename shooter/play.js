require(['shooter/require.config.js'], function () {
  'use strict';

  require([
    'omega/core',
    'omega/pulse',
    'shooter/entity/player',
    'shooter/entity/enemy',
    'omega/debug/core'
  ], function (o, pulse, Player, Enemy, Debug) {
    var x = 0;

    o.init(document.getElementById('omegajs'), 1000, 600, 30);
    new Debug(document.getElementById('omegajs'));

    // new object
    new Player();

    //new Enemy();

    pulse.bind(function () {
      --x;
      if (x < 0) {
        new Enemy();
        x = 5;
      }
    });

  });
});
