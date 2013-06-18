define(['omega/entity', 'omegaCore', 'entity/dom', 'entity/mouse', 'entity/keyboard'], function(e, o, dom, mouse, keyboard) {

    'use strict';

    return e.extends({
        _left: true,
        _up: true,

        init: function() {
            //var d = dom(args);           
            
            //his.depends(d);
            //this.depends(dom(args), mouse)
            
            this.depends(dom, mouse, keyboard)
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
                    //this.move();
                })
                .bind('Dragging', function(e) {
                    this.x = e.newX;
                    this.y = e.newY;
                })
                .bind('KeyDown', function(e){ 
                switch(e.keyCode) {
                    case 37: if(this.x > 0){--this.x}; break;
                    case 38: if(this.y < o.getAttr().height - this.h) { ++this.y }; break;
                    case 39: if(this.x < o.getAttr().width - this.w) { ++this.x }; break;
                    case 40: if(this.y > 0){--this.y}; break;                   
                } 
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
