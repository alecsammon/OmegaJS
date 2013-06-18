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
      var a = new player({x:0, w:150, h:150});

      // another new object
      //var b = new player2({x:10, w:100, h:100}, null, true);
   
      // quick setup
      //var c = e.create([player], {x: 20, w:50, h:50});
      //c.setStyle('backgroundColor', 'red');

      // long!
      //var d = new (e.extends({init:function(){ this.depends(player); }}))({x:20, w:50, h:50});
      //d.setStyle('backgroundColor', 'yellow');
  });
  
});
