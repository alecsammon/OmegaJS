define([
  'omega/core',
  'omega/entity', 
  'omega/entity/dom', 
  'omega/entity/fourway',
  'shooter/entity/bullet',
  'omega/entity/animate'
], function (o, e, dom, fourway, Bullet, animate) {

  'use strict';

  return e.extend({
    name: 'Player',
            
    init: function () {    
      var count = 20; 
      
      this.depends(dom(o.getAttr().width/2-30, 20, 60, 45), fourway(5, 5), animate)
          .boundStage()
          .addClass('player')
          .animate(0, 2);

      this.bind('EnterFrame', function() {   
        if(this.isKeyDown(37) || this.isKeyDown(39)) {
          this.addClass('horz');
        } else {
          this.removeClass('horz');
        }
      });
      
      this.bind('EnterFrame', function() {        
        if(this.isKeyDown(17)) {  // ctrl       
          ++count;
          if(count >= 20) {
            new Bullet(this.x+22, this.y+45);
            count = 0;
          }     
        } else {
          count = 20;
        }        
      });
    }
  });

});
