define(['omega/entity', 'entity/dom'], function(e, dom) {

    'use strict';

    return e.extends({
        init: function() {
            this.depends(dom);
            var self = this;
            this.elem.onclick = function(e){ self.trigger('Click', e); }
        }
    });
});
