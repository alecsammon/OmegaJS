define(['omega/core', 'omega/entity', 'omega/entity/dom', 'omega/entity/mouse', 'omega/entity/keyboard', 'omega/entity/text'], function (o, e, dom, mouse, keyboard, text) {

  'use strict';

  return e.extend({
    _left: true,
    _up: true,
    _freeze: false,
    init: function (args, color) {
      this.depends(dom, mouse, keyboard, text)
              .setStyles({
        border: '1px solid #FFFFFF',
        color: '#FFFFFF'
      })
              .bind('Click', function () {
        this._left = !this._left;
        this._up = !this._up;
      })
              .bind('EnterFrame', function (fps) {
        this.content = 'FPS:' + fps + '<br />UUID:' + this.uuid;
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
            this.nudge(-10, 0);
            break;
          case 38:
            this.nudge(0, 10);
            break;
          case 39:
            this.nudge(10, 0);
            break;
          case 40:
            this.nudge(0, -10);
            break;
        }
      })
              .boundStage();

      if (color) {
        this.setStyle('backgroundColor', color);
      }
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
