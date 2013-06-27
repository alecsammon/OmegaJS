define([
  'omega/entity', 
  'omega/entity/keyboard'
], function (e, keyboard) {

  'use strict';

  return e.extend({
    name: 'fourway',
    
    fourway: {
      x: 1,
      y: 1
    },

    init: function (x, y) {    
      this.depends(keyboard);
      var fourway = {};
      fourway.x = (typeof x !== 'undefined') ? x : 1;
      fourway.y = (typeof y !== 'undefined') ? y : fourway.x;
      
      this.fourway = fourway;
      
      this.bind('EnterFrame', function () {
        if(this.isKeyDown(37)) {
            this.nudge(-this.fourway.x, 0);          
        }

        if(this.isKeyDown(38)) {
            this.nudge(0, this.fourway.y);          
        }

        if(this.isKeyDown(39)) {
            this.nudge(this.fourway.x, 0);          
        }

        if(this.isKeyDown(40)) {
            this.nudge(0, -this.fourway.y);          
        }  
      });
    },
            
    disableFourway: function() {
      this.fourway.x = 0;
      this.fourway.y = 0;
    }
  });
});
