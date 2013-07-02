define(['omega/performance'], function (performance) {

  'use strict';

  var targetFps,
      frameDurations = [],
      framestart = performance.now(),
      binds = [],
      actualFps = 0,
      
      bind = function (call, context) {
        binds[binds.length] = {call: call, context: context};
      },

      pulse = function () {
        var length = frameDurations.length;

        frameDurations[length] = performance.now() - framestart;

        var sum = 0;
        for (var i = 0; i < length; i++) {
          sum += frameDurations[i];
        }

        var avg = sum / length;

        if (length > targetFps * 2) {
          frameDurations.shift();
        }

        var frameOffset = 1000 / targetFps,
            tweak;
    
        if (avg > 1000 / targetFps) {
          tweak = -Math.min(Math.ceil(avg - frameOffset), 50);
        } else {
          tweak = Math.min(Math.ceil(frameOffset - avg), 50);
        }

        setTimeout(function () {
          pulse();
          actualFps = Math.round(1000 / avg);
          // loop through binds backwards
          // so binds attached later get called first
          // this is so the debugger works!
          for (var i = binds.length-1; i >= 0; --i) {
            binds[i].call.call(binds[i].context, actualFps);
          }
          
        }, frameOffset + tweak);

        framestart = performance.now();
      };

  return {
    
    /**
     * Start the heartbeat
     * 
     * @param integer fps
     * 
     * @returns Pulse
     */
    start: function (fps) {
      targetFps = fps;
      pulse();
      return this;
    },

    /**
     * Add a bind to get called on each pulse
     * 
     * @param callback call
     * @param object   context
     * 
     * @return Pulse
     */
    bind: function (call, context) {
      bind(call, context);
      return this;
    },
            
    /**
     * Get the target FPS
     * 
     * @returns integer
     */
    getTargetFps: function() {
      return targetFps;
    }
  };
});

