require(['js/require.config.js'], function (js) {
  'use strict';
  
  require([
      'omegaCore', 
      'entity/player',
      'entity/player2', 
      'omega/entity'
    ], function (o, player, player2, e) {
      
      o.init(document.getElementById('omegajs'), 800, 600); 

      // new object
      var p1 = new player({x:0, w:150, h:150});

      // another new object
      var p2 = new player2({x:10, w:100, h:100});
   
      // quick setup
      var a = e.create([player], {x: 20, w:50, h:50});
      a.setStyle('backgroundColor', 'red');

      // long!
      var x = new (e.extends({init:function(){ this.depends(player); }}))({x:20, w:50, h:50});
      x.setStyle('backgroundColor', 'yellow');
  });
  
});
