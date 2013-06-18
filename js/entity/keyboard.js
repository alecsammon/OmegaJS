define(['omega/entity', 'omegaCore'], function(e, o) {

    'use strict';

    return e.extends({
        init: function() {
            o.bind('KeyDown', function(e){ 
                this.trigger('KeyDown', e);
            }, this);
        }
    });
});
