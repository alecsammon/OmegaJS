define([
  'omega/device',
  'omega/obj',
  'omega/pulse'
], function (device, Obj, pulse) {

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
        container = (new Obj(elem)).setStyles({
          width: width * attr.scale + 'px',
          height: height * attr.scale + 'px'
        });

        stage.addClass('stage').setStyles({
          width: width + 'px',
          height: height + 'px',
          transform: 'scale(' + attr.scale + ')'
        });

        attr.left = container.elem.offsetLeft;
        attr.top = container.elem.offsetTop;
        //stage.lock();

        container.appendChild(stage.elem);

        if(device.isTouchDevice()) {
          // have to create a layer on top of the stage, otherwise touch events do not always fire
          var overlay = new Obj(document.createElement('div'));
          overlay.addClass('overlay').setStyles({
            width: width * attr.scale + 'px',
            height: height * attr.scale + 'px',
          });
            
          container.appendChild(overlay.elem);

          // prevent defaults
          window.addEventListener('touchstart', function (e) { e.preventDefault(); });
          window.addEventListener('touchend', function (e) { e.preventDefault(); });
          window.addEventListener('touchcancel', function (e) { e.preventDefault(); });
          window.addEventListener('touchleave', function (e) { e.preventDefault(); });
          window.addEventListener('touchmove', function (e) { e.preventDefault(); });
        }

        pulse.bind(function (fps)  {
          trigger('EnterFrame', fps);
          trigger('RenderStart');
          var contents = '';
          for (var i in entities) {
            contents += entities[i].string();
          }

          stage.elem.innerHTML = contents;

          trigger('RenderEnd');
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
            for(var j = 0, jl = binds[action].entities[i].length; j < jl; ++j) {
              binds[action].entities[i][j].call.call(binds[action].entities[i][j].entity, args);
            }
          }

          for (var k = 0, bl = binds[action].other.length; k < bl; ++k) {
            binds[action].other[k].call.call(binds[action].other[k].context, args);
          }
        }
      },

      bind = function (action, call, context) {
        if (!binds[action]) {
          binds[action] = {entities:{}, other:[]};
        }

        if(context && context.uuid) {
          if (!binds[action].entities[context.uuid]) {
            binds[action].entities[context.uuid] = [];
          }

          binds[action].entities[context.uuid].push({call: call, entity: context});
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
    },

    getEntities: function() {
      return entities;
    },

    getContainer: function() {
      return container;
    }
  };
});
