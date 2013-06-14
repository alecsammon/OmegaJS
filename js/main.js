require(['js/require.config.js'], function (js) {
  'use strict';
  
  require([
      'sizzle',
      'omegaCore', 
      'entity/player'
    ], function (s, o, player) {
      var container = s('.omegajs')[0];
      
      o.init(container, 800, 600); 



          
      var p = new player();
      var p2 = new player();

     
p.x = 300;
p2.x = 10; 
      
      //p.bind('EnterFrame', function(){ console.log('test'); });
  });
  
});
