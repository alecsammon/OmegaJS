define(['omega/entity', 'omegaCore', 'entity/dom', 'entity/mouse', 'entity/keyboard', 'entity/text'], function (e, o, dom, mouse, keyboard, text) {

  'use strict';

  return e.extend({
    _left: true,
    _up: true,
    _freeze: false,

    init: function (args, color) {
      //var d = dom(args);

      //his.depends(d);
      //this.depends(dom(args), mouse)

      this.depends(dom, mouse, keyboard, text)
         .setStyles({
          background: color,
          border: '1px solid #FFFFFF',
          color: '#FFFFFF'
        })
        .bind('Click', function () {
          this._left = !this._left;
          this._up = !this._up;
        })
        .bind('EnterFrame', function (fps) {
          this.text = 'FPS:' + fps + '<br />UUID:' + this.uuid;
          this.move();
        })
        .bind('MouseDown', function () {
          this._freeze = true;
        })
        .bind('MouseUp', function () {
          this._freeze = false;
        })
        .bind('Dragging', function (e) {
          this.x = e.newX;
          this.y = e.newY;
        })
        .bind('KeyDown', function (e) {
          switch (e.keyCode) {
          case 37:
            this.nudge(-1, 0);
            break;
          case 38:
            this.nudge(0, 1);
            break;
          case 39:
            this.nudge(1, 0);
            break;
          case 40:
            this.nudge(0, -1);
            break;
          }
        })
        .boundStage();
    },
            
    move: function () {
      if (!this._freeze) {
        if (this.x >= o.getAttr().width - this.w) {
          this._left = false;
        } else if (this.x <= 0) {
          this._left = true;
        }
        this.x += (this._left) ? this.uuid : -this.uuid;

        if (this.y >= o.getAttr().height - this.h) {
          this._up = false;
        } else if (this.y <= 0) {
          this._up = true;
        }
        this.y += (this._up) ? this.uuid : -this.uuid;
      }
    }
  });

});
