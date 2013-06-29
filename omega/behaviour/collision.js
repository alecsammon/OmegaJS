define([
  'omega/core',
  'omega/entity',
  'omega/behaviour/dom'
], function (o, e, dom) {

  'use strict';

  var groups = {},
      checkCollision = function (a, b) {
        return (
              a.uuid !== b.uuid &&
              a.y + a.h > b.y && a.y < b.y + b.h &&
              a.x + a.w > b.x && a.x < b.x + b.w
        );
      };

  o.bind('EnterFrame', function() {
    var collisions = [];
    for (var g in groups) {
      for (var a in groups[g]) {
        for (var b in groups[g]) {
          if(checkCollision(groups[g][a], groups[g][b])) {
            collisions.push({g: g, a: groups[g][a], b: groups[g][b]});
          }
        }
      }
    }

    for (var i = 0, il = collisions.length; i < il; ++i) {
      collisions[i].a.trigger('Collision', {group: collisions[i].g, into: collisions[i].b});
    }
  });

  // ---

  return e.extend({
    init: function () {
      this.has(dom);
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

    addCollision: function (newGroups) {
      if(typeof newGroups === 'string') {
        newGroups = [newGroups];
      }

      for (var i = 0, il = newGroups.length; i < il; ++i) {
        groups[newGroups[i]] = groups[newGroups[i]] || {};
        groups[newGroups[i]][this.uuid] = this;
      }
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

      return this;
    }
  });

});
