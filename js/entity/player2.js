define(['omega/entity', 'entity/player'], function(e, player) {

    'use strict';

    return e.extends({

        init: function(args) {
            this.depends(player)
               .setStyles({
                    background: 'red',
                    border: '1px solid #FFFFFF',
                    color: '#FFFFFF'
                });
        },

    });

});
