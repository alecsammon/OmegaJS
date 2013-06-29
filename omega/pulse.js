define(['omega/performance'], function (performance) {

  'use strict';

  var targetFps = 60,
      frameDurations = [],
      framestart = performance.now(),
      binds = [],
      actualFps = 0,
      
      bind = function (call, context) {
        binds[binds.length] = {call: call, context: context};
      },

      pulse = function () {
        var tweak,
            length = frameDurations.length,
            frameOffset = 1000 / targetFps;

        frameDurations[length] = performance.now() - framestart;

        var sum = 0;
        for (var i = 0; i < length; i++) {
          sum += frameDurations[i];
        }

        var avg = sum / length;

        if (length > targetFps * 2) {
          frameDurations.shift();
        }

        if (avg > 1000 / targetFps) {
          tweak = -Math.min(Math.ceil(avg - frameOffset), 50);
        } else {
          tweak = Math.min(Math.ceil(frameOffset - avg), 50);
        }

        setTimeout(function () {
          pulse();
          actualFps = Math.round(1000 / avg);

          for (var i = 0, il = binds.length; i < il; i++) {
            binds[i].call.call(binds[i].context, actualFps);
          }
        }, frameOffset + tweak);

        framestart = performance.now();
      };

  return {
    start: function (fps) {
      targetFps = fps;
      pulse();
      return this;
    },

    bind: function (call, context) {
      bind(call, context);
      return this;
    }
  };
});

