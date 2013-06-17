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
            this.elem.onmousedown = function(e) { trigger('MouseDown', e); trigger('StartDrag', e); };
            this.elem.onmouseup = function(e) { trigger('MouseUp', e); };
            this.elem.onmousemove = function(e) { trigger('MouseMove', e); };

            this.bind('MouseDown', function(e) {
                this.dragOffset = {x:this.x-e.x, y:this.y-e.y};
                o.bind('MouseMove', function(e) {
                        e.newX = this.dragOffset.x + e.x;
                        e.newY = this.dragOffset.y + e.y;
                        this.trigger('Dragging', e);
                    }, this);
                o.bind('MouseUp', function(e){ o.unbind('MouseMove', this); this.trigger('StopDrag', e); }, this);
            });
        },
    });
});
