define([
  'omega/entity', 
  'omega/entity/dom', 
], function (e, dom) {

  'use strict';
  
  var groups = {};

  return e.extend({
    name: 'Collision',
            
    init: function () { 
      this.depends(dom);
      
      this.bind('EnterFrame', function() {
        this.checkGroups();
      })
    },
    
    addCollisionGroup: function (group) { 
      groups[group] = groups[group] || {};
      groups[group][this.uuid] = this;
    },
            
    checkGroups: function () {
      for (var g in groups) {
        for (var e in groups[g]) {         
          if(this.uuid !== groups[g][e].uuid) {
            if(
                  this.y + this.h > groups[g][e].y && this.y <= groups[g][e].y
                  && this.x + this.w > groups[g][e].x && this.x <= groups[g][e].x          
            ) {
              this.trigger('Collision', {with: groups[g][e].y});
            }
          }
        }
      }
    },
            
    destroy: function() {
      for (var g in groups) {
        for (var e in groups[g]) {   
          if(this.uuid === groups[g][e].uuid) {
            delete groups[g][e];
          }
        }
      }
    }
  });

});
