define(['omega'], function (Ω) {

  'use strict';

  return {
      bind: function(event, callback) {
        Ω.bind(event, callback);          
      },
              
      trigger: function(event) {
        Ω.trigger(event);
      },
              
      extends: function(obj) {
        var key;
        for (key in this) {
            if (obj !== this[key]) { //handle circular reference
                obj[key] = this[key];
            }
        }
        
        return obj;
      }
  };
});
