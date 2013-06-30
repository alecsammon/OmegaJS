define(['omega/entity'], function (e) {

  'use strict';

  // ---

  return e.extend({

    init: function () {
      this.delays = {};

      this.bind('EnterFrame', function() {
        for(var key in this.delays) {
          --this.delays[key].frames;
          if (this.delays[key].frames <= 0) {
            this.delays[key].call.call(this);
          }
        }
      });
    },

    delay: function(frames, call) {
      this.delays[Object.keys(this.delays).length] = {frames: frames, call: call};
    }

  });
});
