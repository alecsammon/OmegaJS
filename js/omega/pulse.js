define([], function () {
    return {
        fps: 60,
        frameDurations: [],
        framestart: performance.now(),
        binds: [],
        
        start: function() {
            this.pulse();
            
            return this;
        },
                
        trigger: function(action) {
            for (var i = 0; i < this.binds[action].length; i++) {
                this.binds[action][i]();
              }
              
              return this;
        },        
                
        bind: function(action, call) {
            if(!this.binds[action]) {
                this.binds[action] = [];
            }
            
            this.binds[action].push(call);
            
            return this;
        },
                
        pulse: function() {
            var tweak;
            
            this.frameDurations.push(performance.now() - this.framestart);

            if (this.frameDurations.length > 20) {
                this.frameDurations.shift();
            }

            var sum = 0;
            for (var i = 0; i < this.frameDurations.length; i++) {
                sum += this.frameDurations[i];
            }

            var avg = sum / this.frameDurations.length;

            if (avg > 1000 / this.fps) {
                tweak = Math.min(Math.ceil(avg - 1000 / this.fps), 5);
            } else {
                tweak = -Math.min(Math.ceil(1000 / this.fps - avg), 5);
            }

            this.actualFps = Math.round(1000 / avg);

            self = this;
            setTimeout(function() {
                self.pulse().trigger('EnterFrame');
            }, (1000 / this.fps) - tweak);

            this.framestart = performance.now();
            
            return this;
        }
    };
});

