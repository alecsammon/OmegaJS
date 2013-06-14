define([
    'omega/device',
    'omega/obj',
    'omega/pulse'
], function(device, obj, pulse) {

    'use strict';

    return {
        stage: new obj(document.createElement('div')),
        container: null,
        
        init: function(container, width, height) {
            pulse.start();
            this.container = new obj(container);

            var scale = this.getScaling(width, height);
            this.width = width * scale;
            this.height = height * scale;

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
        }

     
    };
});
