require(['js/require.config.js'], function (player) {
  'use strict';
  
  require([
      'omega', 
      'entity/player' 
    ], function (Ω, player) {
      Ω.init('omegajs', 800, 600);      
      new player;
  });
  
});