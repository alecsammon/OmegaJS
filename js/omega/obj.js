define(['omegaLib/device'], function (device) {

  'use strict';

  var object = function(elem) {
      this.elem = elem;
      
      this.bind = function(name, callback) {
          this.elem[name] = callback;
      }
      
      this.setStyle = function(styleType, style) {                      
          switch(styleType) {
            case 'TransformOrigin':
            case 'Transform':
                this.elem.style[device.getCssPrefix()+styleType] = style;
                break;
            default:
                this.elem.style[styleType] = style;
          }          
      }
      
      this.setStyles = function(styles) {
        for (var key in styles){
            if (typeof styles[key] !== 'function') {
                 this.setStyle(key, styles[key]);
            }
        }
      }
      
      this.appendChild = function(child) {
        this.elem.appendChild(child.elem);
      }        
  };
  
  return object;
});
