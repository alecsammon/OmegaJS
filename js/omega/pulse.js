define(['omega/performance'], function(performance) {

    var fps = 60,
        frameDurations = [],
        framestart = performance.now(),
        binds = [],
        actualFps = 0,

        bind = function(callback) {
            console.log(performance.now());
            binds.push(callback);
        },

        pulse = function() {
            var tweak;

            frameDurations.push(performance.now() - framestart);

            if (frameDurations.length > 20) {
                frameDurations.shift();
            }

            var sum = 0;
            for (var i = 0; i < frameDurations.length; i++) {
                sum += frameDurations[i];
            }

            var avg = sum / frameDurations.length;

            if (avg > 1000 / fps) {
                tweak = Math.min(Math.ceil(avg - 1000 / fps), 5);
            } else {
                tweak = -Math.min(Math.ceil(1000 / fps - avg), 5);
            }

            actualFps = Math.round(1000 / avg);

            setTimeout(function() {
                for (var i = 0; i < binds.length; i++) {
                    binds[i]();
                }

                pulse();

            }, (1000 / fps) - tweak);

            framestart = performance.now();
        }

    return {
        start: function() {
            pulse();
            return this;
        },
        bind: function(callback) {
            bind(callback);
            return this;
        },
        getFps: function() {
            return actualFps;
        }
    };
});

