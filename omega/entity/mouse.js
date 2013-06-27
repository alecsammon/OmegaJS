define(['omega/entity', 'omega/entity/dom', 'omega/core'], function (e, dom, o) {

  'use strict';

  return e.extend({ 
    init: function () {
      this.depends(dom);

      this.elem.addEventListener('click', this, false);
      this.elem.addEventListener('mousedown', this, false);
      this.elem.addEventListener('mouseup', this, false);
      this.elem.addEventListener('mousemove', this, false);

      var dragOffset = {};
      this.bind('MouseDown', function (e) {
        this.trigger('StartDrag', e);
        dragOffset = {x: this.x - e.x, y: this.y - e.y};

        o.bind('MouseMove', function (e) {
          e.newX = dragOffset.x + e.x;
          e.newY = dragOffset.y + e.y;
          this.trigger('Dragging', e);
        }, this);

        o.bind('MouseUp', function (e) {
          o.unbind('MouseMove', this);
          this.trigger('StopDrag', e);
        }, this);
      });
    },

    destroy: function() {
      this.elem.removeEventListener('click', this);
      this.elem.removeEventListener('mousedown', this);
      this.elem.removeEventListener('mouseup', this);
      this.elem.removeEventListener('mousemove', this);
    },

    handleEvent: function(e) {
      var action;
      switch(e.type) {
      case 'click':
        action = 'Click';
        break;
      case 'mousedown':
        action = 'MouseDown';
        break;
      case 'mouseup':
        action = 'MouseUp';
        break;
      case 'mousemove':
        action = 'MouseMove';
        break;
      }

      this.trigger(action, {
        x: (e.clientX - o.getAttr().left) / o.getAttr().scale,
        y: (o.getAttr().height - e.clientY - o.getAttr().top) / o.getAttr().scale
      });
    }

  });
});
