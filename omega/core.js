define([
  'omega/device',
  'omega/obj',
  'omega/pulse',
  'omega/performance'
], function (device, Obj, pulse, performance) {

  'use strict';

  var stage = new Obj(document.createElement('div')),
      attr = {width: 0, height: 0, scale: 1},
      entities = {},
      nextId = 1,
      binds = {},
      container,
    
      init = function (elem, width, height, fps) {
        var scale = getScaling(width, height);
        attr = {width: width, height: height, scale: scale};

        // the container
        container = (new Obj(elem))
                .setStyles({
          width: width * attr.scale + 'px',
          height: height * attr.scale + 'px',
          display: 'block'
        });

        stage.setStyles({
          transformOrigin: '0 0',
          transform: 'scale(' + attr.scale + ')',
          width: width + 'px',
          height: height + 'px',
        });

        attr.left = container.elem.offsetLeft;
        attr.top = container.elem.offsetTop;
        //stage.lock();
 
        pulse.bind(function (fps) {          
          trigger('EnterFrame', fps, performance.now());
          trigger('RenderStart', performance.now());
          container.elem.innerHTML = stage.elem.outerHTML;
          trigger('LeaveFrame', performance.now());
        }).start(fps);
      },

      /**
       * this.register
       *
       * Registers an entity to omega core
       * and generates a new uuid for the entity
       *
       * @param {Entity}
       *
       * @return integer
       */
      register = function (entity) {
        entities[nextId] = entity;
        entity.uuid = nextId;
        ++nextId;
      },

      /**
       * this.unRegister
       *
       * Removes this entity from the list of entities
       * and removes all binds for an entity
       *
       * @param {Entity}
       */
      unRegister = function (entity) {
        for (var action in binds) {
          unbind(action, entity);
        }

        delete entities[entity.uuid];
      },

      /**
       * this.endScene
       *
       * Destroys all entities
       */
      endScene = function () {
        for (var i in entities) {
          entities[i].destroy();
        }
      },

      trigger = function (action, args) {
        if (binds[action]) {
          for (var i in binds[action].entities) {
            binds[action].entities[i].call.call(binds[action].entities[i].entity, args);
          }

          for (var j = 0, bl = binds[action].other.length; j < bl; ++j) {
            binds[action].other[j].call.call(binds[action].other[j].context, args);
          }
        }
      },

      bind = function (action, call, context) {
        if (!binds[action]) {
          binds[action] = {entities:{}, other:[]};
        }
 
        if(context && context.uuid) {
          binds[action].entities[context.uuid] = {call: call, entity: context};
        } else {
          binds[action].other[binds[action].other.length] = {call: call, context: context};
        }
      },

      unbind = function (action, entity) {
        delete binds[action].entities[entity.uuid];
      },

      getScaling = function (width, height) {
        var scale = Math.min(
                window.innerWidth / (width + 2),
                window.innerHeight / (height + 2)
                );

        if (!device.isTouchDevice()) {
          scale = Math.min(scale, 1);
        }

        return scale;
      };

  // ---

  return {
    init: function (container, width, height, fps) {
      init(container, width, height, fps);
      return this;
    },
            
    register: function (entity) {
      register(entity);
      return this;
    },
            
    unRegister: function (entity) {
      unRegister(entity);
      return this;
    },
            
    addElemToStage: function (elem) {
      stage.appendChild(elem);
      return this;
    },
            
    removeElemFromStage: function (elem) {
      stage.removeChild(elem);
      return this;
    },
            
    getAttr: function () {
      return attr;
    },
            
    trigger: function (action, args) {
      trigger(action, args);
      return this;
    },
            
    bind: function (action, call, context) {
      bind(action, call, context);
      return this;
    },
            
    unbind: function (action, context) {
      unbind(action, context);
      return this;
    },
            
    endScene: function () {
      endScene();
      return this;
    }
  };
});
