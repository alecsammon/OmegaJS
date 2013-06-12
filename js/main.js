require(['js/require.config.js'], function () {
  'use strict';
  
  require([
      'omegaCore', 
      'entity/player' 
    ], function (Ω, player) {
      Ω.init('omegajs', 800, 600);   
      var p = new player();  
      
      
      //p.bind('EnterFrame', function(){ console.log('test'); });
  });
  
});