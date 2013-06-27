define([
  'omega/core',
  'omega/entity', 
  'omega/entity/dom', 
  'omega/entity/collision' 
], function (o, e, dom, collision) {

  'use strict';

  return e.extend({
    name: 'Enemy',
            
    init: function () {        
      var x = Math.random()*o.getAttr().width;
      
      this.depends(dom(x, o.getAttr().height, 30, 32), collision);
      this.addClass('enemy');
      this.addCollisionGroup('a');
      
      this.bind('EnterFrame', function() {   
        --this.y;
      });
    }
  });

});
