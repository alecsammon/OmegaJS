define(['omega/entity', 'omega/core', 'omega/device'], function (e, o, device) {

  'use strict';

  return e.extend({
    /**
     * this.x
     *
     * The 'x' (horizontal) offset of this entity
     * Measured from the bottom left of the object
     * Relative to the bottom left of the stage
     *
     * @var integer
     */

    /**
     * this.y
     *
     * The 'y' (vertical) offset of this entity
     * Measured from the bottom left of the object
     * Relative to the bottom left of the stage
     *
     * @var integer
     */

    /**
     * this.h
     *
     * The height of this entity
     *
     * @var integer
     */

    /**
     * this.w
     *
     * The width of this entity
     *
     * @var integer
     */

    // ---

    /**
     * this.elem
     *
     * The dom element
     *
     * @var {element}
     */
    elem: null,
    
    classNames: {},
    
    style: {},

    // ---

    /**
     * "Private" properties of this element
     */
    dom: {
      x: 0,
      y: 0,
      h: 0,
      w: 0,
      boundStage: false
    },

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
    init: function (x, y, w, h) {
      var dom = {};

      var watchAttr = function (propName, style) {
        var obj = this;

        Object.defineProperty(obj, propName, {
          set: function (value) {
            if (obj.dom.boundStage) {
              if (propName === 'x') {
                value = Math.min(Math.max(value, 0), o.getAttr().width - obj.dom.w);
              } else if (propName === 'y') {
                value = Math.min(Math.max(value, 0), o.getAttr().height - obj.dom.h);
              }
            }
            // tbh I have no idea why I need to do this
            // FF baulks if you don't!
            dom[propName] = value;
            obj.dom = dom;
            obj.setStyle(style, value + 'px');

            if (propName === 'y' && value > o.getAttr().height) {
              obj.trigger('ExitFrame', 'top');
            } else if (propName === 'y' && value < -obj.dom.h) {
              obj.trigger('ExitFrame', 'bottom');
            } else if (propName === 'x' && value > o.getAttr().width) {
              obj.trigger('ExitFrame', 'right');
            } else if (propName === 'x' && value < -obj.dom-w) {
              obj.trigger('ExitFrame', 'left');
            }
          },
          get: function () {
            if (obj && obj.dom) {
              return obj.dom[propName];
            }
          }
        });
        return obj;
      };

      watchAttr.call(this, 'y', 'bottom');
      watchAttr.call(this, 'x', 'left');
      watchAttr.call(this, 'w', 'width');
      watchAttr.call(this, 'h', 'height');

      this.w = w ? w : 0;
      this.h = h ? h : 0;
      this.x = x ? x : 0;
      this.y = y ? y : 0;

      return this;
    },

    boundStage: function (value) {
      this.dom.boundStage = (typeof value === 'undefined' || value);
      return this;
    },
            
    string: function  () {
      var style = '';//left:'+this.x+'px, bottom: '+this.y+'px; height: '+20+'px; width: '+20+'px';
      var className = '';
      
      for(var i in this.style) {
        style += i.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()+':'+this.style[i]+';';
      }
      
      
      for(var i in this.classNames) {
        className += ' '+i;
      }      
      
      
      return '<div class="'+className+'" style="'+style+'"></div>';
    },

    nudge: function (x, y) {
      this.x += x;
      this.y += y;
    },

    /**
     * Set a single CSS style
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
        this.style[device.getCssPrefix() + styleType] = style;
        break;
      default:
        this.style[styleType] = style;
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
    },

    addClass: function (className) {
      this.classNames[className] = true;
      return this;
    },

    removeClass: function (className) {
      delete this.classNames[className];
      return this;
    }

  });
});
