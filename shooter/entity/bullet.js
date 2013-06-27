define([
  'omega/core', 
  'omega/entity', 
  'omega/entity/dom', 
  'omega/entity/collision'
], function (o, e, dom, collision) {

  'use strict';

  return e.extend({
    name: 'Bullet',
            
    init: function (x, y) {         
      this.depends(dom(x, y, 17, 15), collision).addClass('bullet');
      
      this.addCollisionGroup('a');
      
         
      this.bind('Collision', function() {
        this.destroy();
      });
      
      this.bind('EnterFrame', function() {
        this.y += 7;
        if(this.y > o.getAttr().height) {
          this.destroy();
        }
      });
    }
  });

});
