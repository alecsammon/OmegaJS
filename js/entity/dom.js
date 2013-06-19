define(['omega/entity', 'omegaCore', 'omega/device'], function (e, o, device) {

    'use strict';

    return e.extend({

        /**
         * The 'x' (horizontal) offset of this entity
         * Measured from the bottom left of the object
         * Relative to the bottom left of the stage
         * You should use "this.x" to set and read it
         */
        _x: 0,

        /**
         * The 'y' (vertical) offset of this entity
         * Measured from the bottom left of the object
         * Relative to the bottom left of the stage
         * You should use "this.y" to set and read it
         */
        _y: 0,

        /**
         * The height of this entity
         * You should use "this.h" to set and read it
         */
        _h: 0,

        /**
         * The width of this entity
         * You should use "this.w" to set and read it
         */
        _w: 0,

        // ---

        /**
         * The dom element
         */
        elem: null,

        /**
         * If the dom element can move out of the stage
         */
        _boundStage: false,
        
        // ---

        /**
         * Create a new dom entity
         *
         * @param obj args
         * {
         *  x: [int] (opt)
         *  y: [int] (opt)
         *  h: [int] (opt)
         *  w: [int] (opt)
         * }
         *
         * @returns this
         */
        init: function (args) {
            this.elem = document.createElement('div');
            o.addElemToStage(this.elem);

            var watchAttr = function (propName, style) {
                Object.defineProperty(this, propName, {
                    set: function (value) {
                        if (this._boundStage) {
                          if (propName === 'x') {
                            value = Math.min(Math.max(value, 0), o.getAttr().width - this.w);
                          } else if (propName === 'y') {
                            value = Math.min(Math.max(value, 0), o.getAttr().height - this.h);
                          }
                        }

                        this['_' + propName] = value;
                        this.setStyle(style, value + 'px');
                      },
                    get: function () {
                        return this['_' + propName];
                      }
                  });
              };

            watchAttr.call(this, 'y', 'bottom');
            watchAttr.call(this, 'x', 'left');
            watchAttr.call(this, 'w', 'width');
            watchAttr.call(this, 'h', 'height');

            this.x = (args && args.x) ? args.x : 0;
            this.y = (args && args.y) ? args.y : 0;
            this.w = (args && args.w) ? args.w : 0;
            this.h = (args && args.h) ? args.h : 0;

            return this;
          },

        boundStage: function (value) {
          this._boundStage = (typeof value === 'undefined' || value);
          return this;
        },

        nudge: function (x, y) {
          this.x += x;
          this.y += y;
        },

        /**
         * Set a single CSS style#
         *
         * @param string styleType
         * @param string style
         *
         * @returns this
         */
        setStyle: function (styleType, style) {
            switch (styleType) {
            case 'TransformOrigin':
            case 'Transform':
              this.elem.style[device.getCssPrefix() + styleType] = style;
              break;
            default:
              this.elem.style[styleType] = style;
            }
            return this;
          },

        /**
         * Set multiple styles
         *
         * @param obj styles
         * {
         *  background: [string] (opt)
         *  border: [string] (opt)
         *  ...
         *  ...
         * }
         *
         * @returns this
         */
        setStyles: function (styles) {
            for (var key in styles) {
              this.setStyle(key, styles[key]);
            }
            return this;
          }

      });
  });
