require(['js/require.config.js'], function () {
  'use strict';
  
  require([
      'omega', 
      'entity/player' 
    ], function (Ω, player) {
      Ω.init('omegajs', 800, 600);   
      var p = new player('dd');  
      
      
      //p.bind('EnterFrame', function(){ console.log('test'); });
  });
  
});