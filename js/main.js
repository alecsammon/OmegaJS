require(['js/require.config.js'], function () {
  'use strict';
  
  require([
      'sizzle',
      'omegaCore', 
      'entity/player' 
    ], function (s, Ω, player) {
      var container = s('.omegajs')[0];
      Ω.init(container, 800, 600);   
      var p = new player();  
      
      
      //p.bind('EnterFrame', function(){ console.log('test'); });
  });
  
});
