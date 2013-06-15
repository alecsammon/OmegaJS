require(['js/require.config.js'], function (js) {
  'use strict';
  
  require([
      'sizzle',
      'omegaCore', 
      'entity/player'
    ], function (s, o, player) {
      var container = s('.omegajs')[0];
      
      o.init(container, 800, 600); 

      var p = new player({x:300, w:150, h:150});
     // var p2 = new player({x:10});
      
      //p.bind('EnterFrame', function(){ console.log('test'); });
  });
  
});
