define(['omega/device'], function (device) {

  'use strict';

  return function (elem) {
    this.elem = elem;

    this.lock = function () {
      this.elem.onselectstart = function () {
        return false;
      };
      this.elem.oncontextmenu = function () {
        return false;
      };

      return this;
    };

    this.setStyle = function (styleType, style) {
      switch (styleType) {
      case 'transformOrigin':
      case 'transform':
        this.elem.style['-' + device.getCssPrefix() + '-' + styleType] = style;
        break;
      default:
        this.elem.style[styleType] = style;
      }
      return this;
    };

    this.setStyles = function (styles) {
      for (var key in styles) {
        if (typeof styles[key] !== 'function') {
          this.setStyle(key, styles[key]);
        }
      }

      return this;
    };

    this.appendChild = function (child) {
      this.elem.appendChild(child);
      return this;
    };

    this.removeChild = function (child) {
      this.elem.removeChild(child);
      return this;
    };

    this.addClass = function (className) {
      if(this.elem.classList) {
        this.elem.classList.add(className);
      } else {
        this.elem.className = this.elem.className + ' className';
      }
      return this;
    };

    this.removeClass = function (className) {
      if(this.elem.classList) {
        this.elem.classList.remove(className);
      } else {
        this.elem.className = this.elem.className.replace(new RegExp('\\b' + className + '\\b'),'');
      }
      return this;
    };
  };
});
