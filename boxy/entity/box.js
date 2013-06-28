define([
  'omega/core',
  'omega/entity',
  'omega/entity/dom',
  'omega/entity/mouse',
  'omega/entity/keyboard',
  'omega/entity/text',
  'omega/entity/fourway'
], function (o, e, dom, mouse, keyboard, text, fourway) {

  'use strict';

  return e.extend({
    _left: true,
    _up: true,
    _freeze: false,

    init: function (color) {
      var colors = ['blue', 'red', 'green', 'yellow'];

      this.depends(dom, mouse, keyboard, text, fourway)
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

        if (this.isKeyDown(17)) {
          this.setStyle('backgroundColor', colors[Math.round(Math.random() * colors.length)]);
        }

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
