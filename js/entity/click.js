define(['omega/entity'], function(e) {

    'use strict';

    return e.extends({
        init: function() {
            var self = this;
            this.elem.onclick = function(e){ self.trigger('Click', e); }
        }
    });
});
