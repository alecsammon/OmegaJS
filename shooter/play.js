require(['shooter/require.config.js'], function () {
  'use strict';

  require([
    'omega/core',
    'omega/pulse',
    'shooter/entity/player',
    'shooter/entity/enemy'
  ], function (o, pulse, Player, Enemy) {
    var x = 0;

    o.init(document.getElementById('omegajs'), 800, 600, 40);

    // new object
    new Player();

    //new Enemy();

    pulse.bind(function () {
      ++x;
      if (x > 60) {
        new Enemy();
        x = 0;
      }
    });

  });
});
