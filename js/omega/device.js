define([], function () {

  'use strict';

  var device = {
     
    getUserAgent: function() {        
        return navigator.userAgent.toLowerCase();
    },
    
    getCssPrefix: function() {
       var ua = navigator.userAgent.toLowerCase(),
            match = /(webkit)[ \/]([\w.]+)/.exec(ua) ||
                /(o)pera(?:.*version)?[ \/]([\w.]+)/.exec(ua) ||
                /(ms)ie ([\w.]+)/.exec(ua) ||
                /(moz)illa(?:.*? rv:([\w.]+))?/.exec(ua) || [],
           prefix;
   
        match = (match[1] || match[0]);
    
        switch(match) {
            case 'moz':
                prefix = 'Moz';
                break;
            case 'o':
                prefix = 'O';
                break;      
            default:
                prefix = match;            
        }
        
        return prefix;    
    },
        
    isTouchDevice: function () {
        return 'ontouchstart' in document.documentElement;
    }
  };
  
  return device;
});
