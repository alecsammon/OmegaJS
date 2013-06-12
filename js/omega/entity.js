define(['omegaCore', 'omega/obj'], function (Ω, obj) {

  'use strict';

  return {
      extends: function(e) {
         var test = new obj(document.createElement('div'));
         this.extend(e, test);
         
         this.extend(e, this);          
         Ω.addEntity(e);
                   
         return function(){ 
            if(typeof e.init === 'function') {
                e.init.apply(e, arguments);
            }
            return e; 
         }; 
      },
      
      bind: function(event, callback) {
        Ω.bind(event, callback, this); 
        return this;
      },
              
      trigger: function(event) {
        Ω.trigger(event);
        return this;
      },
              
      extend: function(obj, using) {
        var key;
        for (key in using) {
            if (obj !== using[key]) { //handle circular reference
                obj[key] = using[key];
            }
        }
        
        return obj;
      }
  };
});
