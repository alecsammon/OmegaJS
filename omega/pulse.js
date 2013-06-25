define(['omega/performance'], function (performance) {

  'use strict';

  var targetFps = 30,
          frameDurations = [],
          framestart = performance.now(),
          binds = [],
          actualFps = 0,
          bind = function (call, context) {
    binds[binds.length] = {call: call, context: context};
  },
          pulse = function () {
    var tweak;

    frameDurations[frameDurations.length] = performance.now() - framestart;

    if (frameDurations.length > 20) {
      frameDurations.shift();
    }

    var sum = 0;
    for (var i = 0, il = frameDurations.length; i < il; i++) {
      sum += frameDurations[i];
    }

    var avg = sum / frameDurations.length;

    if (avg > 1000 / targetFps) {
      tweak = -Math.min(Math.ceil(avg - 1000 / targetFps), 10);
    } else {
      tweak = Math.min(Math.ceil(1000 / targetFps - avg), 10);
    }

    actualFps = Math.round(1000 / avg);

    setTimeout(function () {
      for (var i = 0, il = binds.length; i < il; i++) {
        binds[i].call.call(binds[i].context, actualFps);
      }

      pulse();

    }, (1000 / targetFps) + tweak);

    framestart = performance.now();
  };

  return {
    start: function () {
      pulse();
      return this;
    },
    bind: function (call, context) {
      bind(call, context);
      return this;
    },
    getFps: function () {
      return actualFps;
    }
  };
});

