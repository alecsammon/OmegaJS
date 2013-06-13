define(['omega/entity', 'omega/pulse', 'omegaCore'], function(e, pulse, Ω) {

    'use strict';

    return e.extends({
        _left: true,
        _up: true,
        
        w: 100,
        h: 100,        
        
        init: function() {
            this.setStyles({
                background: 'blue',
                position: 'absolute',
                border: '1px solid #FFFFFF',
                color: '#FFFFFF'
            });            
                        
            this.bind('EnterFrame', function() {
                this.elem.innerHTML = 'FPS:' + pulse.getFps();
                this.move();
            });
        },
                
                
        move: function() {
            if (this.x > Ω.width - this.w) {
                this._left = false;
            } else if (this.x < 0) {
                this._left = true;
            }
            this.x += (this._left) ? 4 : -4;

            if (this.y > Ω.height - this.h) {
                this._up = false;
            } else if (this.y < 0) {
                this._up = true;
            }
            this.y += (this._up) ? 4 : -4;
        }
    });
});
