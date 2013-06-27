define([
  'omega/entity', 
  'omega/entity/dom'
], function (e, dom) {

  'use strict';
  
  var groups = {};

  return e.extend({
    name: 'Collision',
            
    collision: {
      groups: {},
      collisions: []
    },
                  
    init: function () { 
      this.collision = {
        groups: {},
        collisions: []
      };
      this.depends(dom);
      
      this.bind('EnterFrame', function() {
        this.collision.collisions = [];
        this.checkGroups();
      });
      
      this.bind('LeaveFrame', function() {      
        for (var i = 0, il = this.collision.collisions.length; i < il; ++i) {
          this.trigger('Collision', this.collision.collisions[i]);
        }   
      });      
    },
    
    addCollisionGroup: function (group) { 
      groups[group] = groups[group] || {};
      groups[group][this.uuid] = this;
      this.collision.groups[group] = true;
    },
            
    removeCollision: function () { 
      for (var g in groups) {
        for (var e in groups[g]) {   
          if(this.uuid === groups[g][e].uuid) {
            delete groups[g][e];
          }
        }
      }
      
      this.collision.groups = {};      
    },            
            
    checkGroups: function () {
      for (var g in this.collision.groups) {
        for (var e in groups[g]) {     
          if(this.uuid !== groups[g][e].uuid) {
            if(
                  this.y + this.h > groups[g][e].y && this.y < groups[g][e].y + groups[g][e].h
                  && this.x + this.w > groups[g][e].x && this.x < groups[g][e].x + groups[g][e].w
            ) {
                this.collision.collisions.push({group: g, with: groups[g][e]});
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
