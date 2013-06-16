require(['js/require.config.js'], function (js) {
  'use strict';
  
  require([
      'omegaCore', 
      'entity/player',
      'entity/player2', 
      'omega/entity'
    ], function (o, player, player2, e) {
      var container = document.getElementById('omegajs');
      
      o.init(container, 800, 600); 

      var p1 = new player({x:0, w:150, h:150});

   //   var p2 = new player2({x:10, w:100, h:100});
    
    //var y = new (e.extends(player))({x: 20, w:50, h:50});
  //   var x = new (e.extends({
   //                 init:function(){ 
    //                   this.depends(player);
    //                }
    //  }))({x:20, w:50, h:50});
    //  var p3 = new player({x:20, w:50, h:50});
      //p.bind('EnterFrame', function(){ console.log('test'); });
  });
  
});
