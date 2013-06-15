define([
    'omega/device',
    'omega/obj',
    'omega/pulse'
], function(device, obj, pulse) {

    'use strict';
    
    var stage = new obj(document.createElement('div')),
    container =  null,
    attr = {width: 0, height: 0},
    entities = [],

    init = function(container, width, height) {
            container = new obj(container);

            var scale = getScaling(width, height);
            attr.width = width * scale;
            attr.height = height * scale;

            container.appendChild(stage);

            container.setStyles({
                width: width * scale + 'px',
                height: height * scale + 'px'
            });

            stage.setStyles({
                transformOrigin: '0 0',
                transform: 'scale(' + scale + ')',
                width: width + 'px',
                height: height + 'px',
                backgroundColor: 'red'
            });

            stage.lock();

            pulse.start();
            pulse.bind(function(args){ trigger('EnterFrame', args); });

        },

        register = function(entity) {
            entities.push(entity);
            return entities.length;
        },

        trigger = function(action, args) {
           for (var i in entities) {
               entities[i].trigger(action, args);
            }
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
                
        getScaling: function(width, height) {
            return getScaling(width, height);
        },

        addElemToStage: function(elem) {
            stage.appendChild(elem);
        },

        getWidth: function() {
            return attr.width;
        },

        getHeight: function() {
            return attr.height;
        },
 
        trigger: function(action, args) {
           trigger(action, args);
           return this;
        }

 

     
    };
});
