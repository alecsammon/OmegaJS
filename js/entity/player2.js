define(['omega/entity', 'entity/player'], function(e, player) {

    'use strict';

    return e.extends({
        init: function() {
            this.depends(player).setStyle('background', 'green');
        }
    });
});
