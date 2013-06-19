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
      case 'TransformOrigin':
      case 'Transform':
        this.elem.style[device.getCssPrefix() + styleType] = style;
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
  };
});
