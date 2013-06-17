define([
    'omega/device',
    'omega/obj',
    'omega/pulse'
], function(device, obj, pulse) {

    'use strict';
    
    var stage = new obj(document.createElement('div')),
        attr = {width: 0, height: 0},
        entities = [],
        binds = {},

        init = function(container, width, height) {
                var scale = getScaling(width, height);
                attr = {width: width * scale, height: height * scale};

                (new obj(container))
                    .appendChild(stage.elem)
                    .setStyles({
                        width: width * scale + 'px',
                        height: height * scale + 'px',
                        position: 'relative',
                        overflow: 'hidden'
                    });

                stage.setStyles({
                    transformOrigin: '0 0',
                    transform: 'scale(' + scale + ')',
                    width: width + 'px',
                    height: height + 'px',
                });

                attr.left = stage.elem.parentNode.offsetLeft;
                attr.top = stage.elem.parentNode.offsetTop;

                initMouse();                
                //stage.lock();
                pulse.bind(function(args){ trigger('EnterFrame', args); }).start();
            },

        initMouse = function() {
            var triggerMouse = function(action, e) {
                    trigger(action, {
                        x: e.x-attr.left,
                        y: attr.height-e.y-attr.top
                    });
                };

            stage.elem.onclick = function(e) { triggerMouse('Click', e); };
            stage.elem.onmousedown = function(e) { triggerMouse('MouseDown', e); };
            stage.elem.onmouseup = function(e) { triggerMouse('MouseUp', e); };
            stage.elem.onmousemove = function(e) { triggerMouse('MouseMove', e); };
        },

        register = function(entity) {
            entities.push(entity);
            return entities.length;
        },

        trigger = function(action, args) {
            if (binds[action]) {
                for(var i in binds[action]) {
                    for(var j = 0; j<binds[action][i].length; ++j) {
                           binds[action][i][j].call.call(binds[action][i][j].context, args);
                    }
                }
            }
        },


        bind = function(action, call, context) {

                if (!binds[action]) {
                    binds[action] = {};
                }
                if(!binds[action][context.uuid]) {
                    binds[action][context.uuid] = [];
                }

                binds[action][context.uuid].push({call:call, context:context});


        },

        unbind = function(action, context) {
            delete binds[action][context.uuid];
        },

        getScaling = function(width, height) {
            var scale = Math.min(
                    window.innerWidth / (width + 2),
                    window.innerHeight / (height + 2)
                    );

            if (!device.isTouchDevice()) {
                scale = Math.min(scale, 1);
            }

            return scale;
        }

    return {

        init: function(container, width, height) {
            init(container, width, height);
            return this;
        },

        register: function(entity) {
            return register(entity);
        },

        addElemToStage: function(elem) {
            stage.appendChild(elem);
        },

        getAttr: function() { 
            return attr;
        },
 
        trigger: function(action, args) {
           trigger(action, args);
           return this;
        },

        bind: function(action, call, context) {
           bind(action, call, context);
           return this;
        },

        unbind: function(action, context) {
           unbind(action, context);
           return this;
        }

     
    };
});
