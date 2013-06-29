define(['omega/entity', 'omega/behaviour/dom', 'omega/core'], function (e, dom, o) {

  'use strict';

  var triggerMouse = function (action, e) {
          o.trigger(action, {
            x: (e.clientX - o.getAttr().left) / o.getAttr().scale,
            y: (o.getAttr().height - e.clientY - o.getAttr().top) / o.getAttr().scale
          });
        };

  window.onmousedown = function (e) {
    triggerMouse('MouseDown', e);
  };

  window.onmouseup = function (e) {
    triggerMouse('MouseUp', e);
  };

  window.onmousemove = function (e) {
    triggerMouse('MouseMove', e);
  };

  return e.extend({
    init: function () {
      var mouseDown = false;
      this.has(dom);

      var isPointOverEntity = function(e, entity) {
        return (
          e.x >= entity.x && e.x <= entity.x + entity.w &&
          e.y >= entity.y && e.y <= entity.y + entity.h
        );
      };

      o.bind('MouseDown', function(e) {
        if(isPointOverEntity(e, this)) {
          mouseDown = true;
          this.trigger('MouseDown', e);
        }
      }, this);

      o.bind('MouseUp', function(e) {
        if (isPointOverEntity(e, this) && mouseDown) {
          this.trigger('Click', e);
        }
 
        if (isPointOverEntity(e, this) || mouseDown) {
          this.trigger('MouseUp', e);
          mouseDown = false;
        }
      }, this);

      o.bind('MouseMove', function(e) {
        if(isPointOverEntity(e, this)) {
          this.trigger('MouseMove', e);
        }
      }, this);

      var dragOffset = {};
      this.bind('MouseDown', function (e) {
        this.trigger('StartDrag', e);
        dragOffset = {x: this.x - e.x, y: this.y - e.y};

        o.bind('MouseMove', function (e) {
          e.newX = dragOffset.x + e.x;
          e.newY = dragOffset.y + e.y;
          this.trigger('Dragging', e);
        }, this);

        this.bind('MouseUp', function (e) {
          o.unbind('MouseMove', this);
          this.trigger('StopDrag', e);
        });
      });
    }

  });
});
