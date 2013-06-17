define(['omega/entity', 'omegaCore', 'entity/dom', 'entity/click'], function(e, o, dom, click) {

    'use strict';

    return e.extends({
        _left: true,
        _up: true,

        init: function(args) {
            var d = dom(args);
            this.depends(dom(args), click)
               .setStyles({
                    background: 'blue',
                    border: '1px solid #FFFFFF',
                    color: '#FFFFFF'
                })
                .bind('Click', function(e) {
                    this._left = !this._left;
                    this._up = !this._up;
                })
                .bind('EnterFrame', function(fps) {
                    this.text = 'FPS:' + fps + "<br />UUID:" + this.uuid;
                    this.move();
                })
                .bind('Dragging', function(e) {
                    this.x = e.newX;
                    this.y = e.newY;
                });
        },

        move: function() {
            if (this.x > o.getAttr().width - this.w) {
                this._left = false;
            } else if (this.x < 0) {
                this._left = true;
            }
            this.x += (this._left) ? this.uuid : -this.uuid;

            if (this.y > o.getAttr().height - this.h) {
                this._up = false;
            } else if (this.y < 0) {
                this._up = true;
            }
            this.y += (this._up) ? this.uuid : -this.uuid;
        }
    });

});
