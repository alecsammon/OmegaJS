define([
  'omega/entity',
  'omega/entity/dom'
], function (e, dom) {

  'use strict';

  var groups = {};

  return e.extend({
    collision: {
      groups: {}
    },

    init: function () {
      var collisions = [];
      this.collision = {groups: {}};

      this.depends(dom);

      var checkCollision = function (a, b) {
        return (
              a.y + a.h > b.y && a.y < b.y + b.h &&
              a.x + a.w > b.x && a.x < b.x + b.w
        );
      };

      var checkGroups = function () {
        for (var g in this.collision.groups) {
          for (var e in groups[g]) {
            if (this.uuid !== groups[g][e].uuid) {
              if(checkCollision(this, groups[g][e], g)) {
                collisions.push({group: g, into : groups[g][e]});
              }
            }
          }
        }
      };

      this.bind('EnterFrame', function () {
        collisions = [];
        checkGroups.call(this);
      });

      this.bind('LeaveFrame', function () {
        for (var i = 0, il = collisions.length; i < il; ++i) {
          this.trigger('Collision', collisions[i]);
        }
      });
    },

    destroy: function () {
      for (var g in groups) {
        for (var e in groups[g]) {
          if (this.uuid === groups[g][e].uuid) {
            delete groups[g][e];
          }
        }
      }
    },

    // ---

    addCollisionGroup: function (group) {
      groups[group] = groups[group] || {};
      groups[group][this.uuid] = this;
      this.collision.groups[group] = true;
      return this;
    },

    removeCollision: function () {
      for (var g in groups) {
        for (var e in groups[g]) {
          if (this.uuid === groups[g][e].uuid) {
            delete groups[g][e];
          }
        }
      }

      this.collision.groups = {};
      return this;
    }
  });

});
