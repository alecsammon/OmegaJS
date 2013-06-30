define(['omega/core', 'omega/lib/md5'], function (o, h) {

  'use strict';

  return {
    /**
     * this.initArgs
     * The arguments passed to intialise this entity
     * Cascades through all has()
     * @var array
     */
    initArgs: [],

    /**
     * this.destroyList
     * A list of methods to call when the entity is destroyed
     * Used for removing binds, dom elements....
     * @var array
     */
    destroyList: [],

    /**
     * this.uuid
     * A unique identifier for this entitiy
     * @var integer
     */
    uuid: null,

    extendList: [],
    binds: {},

    // ---

    /**
     * Shorthand for createing a new entity
     * e.create([], arg1, arg2,....);
     *
     * @param array has 
     * @param mixed arg1 {optional}
     * @param mixed arg2 {optional}
     *
     * @return {Entity}
     */
    create: function () {
      var has = arguments[0],
        returnE = this.extend({
          init: function () {
            this.has.apply(this, has);
          }
        }),
        args = [];

      delete arguments[0];
      for (var i in arguments) {
        args[args.length] = arguments[i];
      }

      // ---

      var EntityConstructor = function (args) {
        return returnE.apply(this, args);
      };

      EntityConstructor.prototype = returnE.prototype;
      return new EntityConstructor(args);
    },

    cloneObject: function(obj) {
      if(!obj || typeof(obj) !== 'object') {
        return obj;
      }

      var cloned = obj.constructor();
      for(var key in obj) {
        cloned[key] = this.cloneObject(obj[key]);
      }

      return cloned;
    },

    extend: function (e) {
      var EntityType = function () {},
          key,
          init = true,
          returnE;

      // add properties of entity description to new entity
      for (key in e) {
        if (typeof e[key] === 'function') {
          EntityType.prototype[key] = e[key];
        }
      }

      // add properties of this to new entity
      for (key in this) {
        if (typeof this[key] === 'function') {
          EntityType.prototype[key] = this[key];
        }
      }

      if(e.destroy) {
        this.destroyList[this.destroyList.length] = e.destroy;
      }

      var that = this;

      // create the new entity constructor
      returnE = function () {
        // if not called with new - then create but do not call the initialised (yet)
        if (!(this instanceof returnE)) {
          init = false;
          var EntityConstructor = function (args) {
            return returnE.apply(this, args);
          };
          EntityConstructor.prototype = returnE.prototype;
          return new EntityConstructor(arguments);
        }

        // the new entity
        var entity = new EntityType(),
            args,
            key;

        for (key in e) {
          entity[key] = entity.cloneObject(e[key]);
        }

        for (key in that) {
          entity[key] = entity.cloneObject(that[key]);
        }

        // enables an object to be passed as first argument
        // this is then cascaded up through all the behavious
        entity.initArgs = Array.prototype.slice.call(arguments);
        if (!init && typeof entity.initArgs[0] === 'object') {
          entity.initArgs.shift();
        }

        // basic properties of the entity
        entity.hash = this.hash;
        delete entity.uuid;

        if (init) {
          o.register(entity);

          args = Array.prototype.slice.call(arguments);
          if (typeof arguments[0] === 'object') {
            args.shift();
          }

          entity.init.apply(entity, args);

          o.bind('EnterFrame', function (args) {
            entity.trigger('EnterFrame', args);
          }, entity);
        }

        return entity;
      };

      // create a hash of the entity/behaviour
      // used to prevent a behaviour being attached twice
      returnE.prototype.hash = h.hash(JSON.stringify(e, function (key, value) {
        return (typeof value === 'function') ? value + '' : value;
      }, ''));

      // return the constructor for our new entity
      return returnE;
    },

    /**
     * this.has
     *
     * Takes an array of entities to attach to this entity
     * This entity will gain all properties of the passed entities
     *
     * @param array
     */
    has: function () {
      for (var i = 0, il = arguments.length; i < il; i++) {
        this.include(arguments[i]);
      }

      return this;
    },

    /**
     * this.include
     *
     * Takes a single entity and attaches all its propeties to this entity
     *
     * @param {Entity}
     */
    include: function (on) {
      var objHash = on.prototype ? on.prototype.hash : on.hash,
          args,
          newE,
          ignoredProperties = ['extendList', 'initArgs', 'binds', 'destroyList'];

      // check if this object had already been included
      // return if it has - only need to attach once
      if (this.extendList.indexOf(objHash) !== -1) {
        return;
      }

      if (typeof on === 'function') {
        newE = on();
        if (this.initArgs && this.initArgs[0]) {
          for (var i in newE) {
            if (this.initArgs[0][i]) {
              args = this.initArgs[0][i];
            }
          }
        }
      } else {
        newE = on;
        args = newE.initArgs;
      }

      // attach all the propeties of this to the entity
      for (var key in newE) {
        if (ignoredProperties.indexOf(key) === -1) {
          this[key] = this.cloneObject(newE[key]);
        }
      }

      // initialise the object
      this.init.apply(this, args);

      // add it to the list of already attached entities
      this.extendList[this.extendList.length] = objHash;

      return this;
    },

    trigger: function (action, args) {
      if (this.binds[action] && this.binds[action].unnamed) {
        for (var i in this.binds[action].unnamed) {
          if (this.binds[action] && this.binds[action].unnamed) {
            this.binds[action].unnamed[i].call(this, args);
          }
        }
      }

      if (this.binds[action] && this.binds[action].named) {
        for (var j in this.binds[action].named) {
          this.binds[action].named[j].call(this, args);
        }
      }

      return this;
    },

    bind: function (action, call, name) {
      this.binds[action] = this.binds[action] || [];

      if (name) {
        this.binds[action].named = this.binds[action].named || {};
        this.binds[action].named[name] = call;
      } else {
        this.binds[action].unnamed = this.binds[action].unnamed || [];
        this.binds[action].unnamed[this.binds[action].unnamed.length] = call;
      }

      return this;
    },

    unbind: function (action, name) {
      if (this.binds[action]) {
        if (name) {
          delete this.binds[action].named[name];
        } else {
          delete this.binds[action].unnamed;
        }
      }

      return this;
    },

    /**
     * this.destroy
     *
     * Destroy this entity
     * Calls the destroy method on all attached entities
     * And unregisters if from core
     */
    destroy: function () {
      for (var i = 0, il = this.destroyList.length; i < il; ++i) {
        this.destroyList[i].call(this);
      }

      o.unRegister(this);

      for (var j in this) {
        this[j] = null;
        delete this[j];
      }

      this.binds = {};
    }
  };
});
