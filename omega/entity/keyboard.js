define(['omega/entity', 'omega/core'], function (e, o) {

  'use strict';

  return e.extend({
    init: function () {
      o.bind('KeyDown', function (e) {
        this.trigger('KeyDown', e);
      }, this);
    }
  });
});
