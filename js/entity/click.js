define(['omega/entity', 'entity/dom', 'omegaCore'], function(e, dom, o) {

    'use strict';

    return e.extends({
        init: function() {
            this.depends(dom);

            var self = this;
            var trigger = function(action, e) {
                var event = {
                    x: e.x-o.getAttr().left,
                    y: o.getAttr().height-e.y-o.getAttr().top
                };

                self.trigger(action, event);
            }

            this.elem.onclick = function(e) { trigger('Click', e); }; 
            this.elem.onmousedown = function(e) { trigger('MouseDown', e); self.startDrag() };
            this.elem.onmouseup = function(e) { trigger('MouseUp', e); };
            this.elem.onmousemove = function(e) { trigger('MouseMove', e); };

            this.bind('Dragging', function(e){ console.log(e); });
        },
 
        startDrag: function() {
            this.trigger('StartDrag');
            o.bind('MouseMove', function(e){ this.trigger('Dragging', e); }, this);
            o.bind('MouseUp', function(){ this.stopDrag(); }, this);
        },

        stopDrag: function() {
            this.trigger('StopDrag');
            o.unbind('MouseMove', this);
        }
    });
});
