define([
  'omega/entity', 
  'omega/entity/dom', 
], function (e, dom) {

  'use strict';

  return e.extend({
    name: 'Animate',
            
    init: function () { 
      this.depends(dom);
    },
    
    animate: function (from, to, loop) {      
      var a = from, 
          count = 0,
          loop = loop ? loop : -1;
      
      this.bind('EnterFrame', function() {
        if(loop !== -1) {
          ++count;
          if(count > loop) {
            this.unbind('EnterFrame', 'animation');
          }
        }
        
        this.removeClass('anim_'+a);
        ++a;
        if(a > to) {
          a = from;
        }
        this.addClass('anim_'+a);
      }, 'animation');
    }
  });

});
