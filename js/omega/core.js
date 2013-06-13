define([
    'omega/device',
    'omega/obj',
    'omega/pulse'
], function(device, obj, pulse) {

    'use strict';

    return {
        stage: new obj(document.createElement('div')),
        container: null,
        binds: {},
        init: function(container, width, height) {
            this.container = new obj(container);

            var scale = this.getScaling(width, height);
            this.width = width;
            this.height = height;

            this.container.appendChild(this.stage);

            this.container.setStyles({
                width: width * scale + 'px',
                height: height * scale + 'px'
            });

            this.stage.setStyles({
                transformOrigin: '0 0',
                transform: 'scale(' + scale + ')',
                width: width + 'px',
                height: height + 'px',
                backgroundColor: 'red'
            });

            this.stage.lock();

            self = this;
            pulse.bind(function() {
                self.trigger('EnterFrame');
            }).start();
        },
        trigger: function(action) {
            if (this.binds[action]) {
                for (var i in this.binds[action]) {
                    for (var j in this.binds[action][i]) {
                        this.binds[action][i][j]['call'].call(this.binds[action][i][j]['context']);
                    }
                }
            }


            return this;
        },
        bind: function(action, call, context) {
            if (!this.binds[action]) {
                this.binds[action] = {};
            }

            if (!this.binds[action][context]) {
                this.binds[action][context] = [];
            }

            this.binds[action][context].push({call: call, context: context});

            return this;
        },
        unbind: function(action, context) {
            delete this.binds[action][context];
        },
        getScaling: function(width, height) {
            var scale = Math.min(
                    window.innerWidth / (width + 2),
                    window.innerHeight / (height + 2)
                    );

            if (!device.isTouchDevice()) {
                scale = Math.min(scale, 1);
            }

            return scale;
        },
        addEntity: function(e) {
            this.stage.appendChild(e);
        }

    };
});
