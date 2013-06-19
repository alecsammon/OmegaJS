define(['omega/entity', 'entity/player'], function (e, player) {

  'use strict';

  return e.extend({
    init: function () {
      this.depends(player);
    }
  });
});
