define(['omega/entity', 'omegaCore', 'entity/dom', 'entity/click'], function(e, o, dom, click) {

    'use strict';


    return e.extends({
        _left: true,
        _up: true,

        init: function() {
            this.depends(dom, click);

            this.bind('Click', function(e) {
                this._left = !this._left;
                this._up = !this._up;
            })

            this.bind('EnterFrame', function(fps) {
                this.elem.innerHTML = 'FPS:' + fps;
                this.move();
            });
        },

        move: function() {
            if (this.x > o.width - this.w) {
                this._left = false;
            } else if (this.x < 0) {
                this._left = true;
            }
            this.x += (this._left) ? 4 : -4;

            if (this.y > o.height - this.h) {
                this._up = false;
            } else if (this.y < 0) {
                this._up = true;
            }
            this.y += (this._up) ? 4 : -4;
        }
    });

});
