define(['omega/entity', 'omega/entity/dom', 'omega/core'], function (e, dom, o) {

  'use strict';

  return e.extend({
    init: function () {
      this.depends(dom);

      var self = this;
      var trigger = function (action, e) {
        self.trigger(action, {
          x: (e.clientX - o.getAttr().left) / o.getAttr().scale,
          y: (o.getAttr().height - e.clientY - o.getAttr().top) / o.getAttr().scale
        });
      };

      this.elem.onclick = function (e) {
        trigger('Click', e);
      };
      this.elem.onmousedown = function (e) {
        trigger('MouseDown', e);
        trigger('StartDrag', e);
      };
      this.elem.onmouseup = function (e) {
        trigger('MouseUp', e);
      };
      this.elem.onmousemove = function (e) {
        trigger('MouseMove', e);
      };

      this.initDrag();
    },
    initDrag: function () {
      this.bind('MouseDown', function (e) {
        this.dragOffset = {x: this.x - e.x, y: this.y - e.y};

        o.bind('MouseMove', function (e) {
          e.newX = this.dragOffset.x + e.x;
          e.newY = this.dragOffset.y + e.y;
          this.trigger('Dragging', e);
        }, this);

        o.bind('MouseUp', function (e) {
          o.unbind('MouseMove', this);
          this.trigger('StopDrag', e);
        }, this);
      });
    }
  });
});
