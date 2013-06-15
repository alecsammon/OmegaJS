require(['js/require.config.js'], function (js) {
  'use strict';
  
  require([
      'sizzle',
      'omegaCore', 
      'entity/player'
    ], function (s, o, player) {
      var container = s('.omegajs')[0];
      
      o.init(container, 800, 600); 

      var p1 = new player({x:0, w:150, h:150});
      var p2 = new player({x:10, w:100, h:100});
      var p3 = new player({x:20, w:50, h:50});
      //p.bind('EnterFrame', function(){ console.log('test'); });
  });
  
});
