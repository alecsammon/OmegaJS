define(['omegaCore', 'omega/obj'], function(Ω, obj) {

    'use strict';

    var entity = {
        x: 0,
        y: 0,
        
        watchAttr: function(propName, style) {
            Object.defineProperty(this, propName, {
                set: function(value) {
                    this['_'+propName]= value;
                    this.setStyle(style, value+'px');
                },
                get: function() {
                    return this['_'+propName];
                }
            });   
            
            return this;
        },
        
        watch: function() {
            this.watchAttr('y', 'bottom').watchAttr('x', 'left').watchAttr('w', 'width').watchAttr('h', 'height');
        },
        
        extends: function(e) {
            var w = e.w,
                h = e.h;                    
            
            var test = new obj(document.createElement('div'));
            this.extend(e, test);
            
            this.extend(e, this);
            Ω.addEntity(e);                
            e.watch();
       
            e.w = w;
            e.h = h;
            
            return function() {
                if (typeof e.init === 'function') {
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


    return entity;

});
