define(['omega/core', 'omega/lib/md5'], function (o, h) {

  'use strict';

  return {
    /**
     * this.initArgs
     * The arguments passed to intialise this entity
     * Cascades through all depends()
     * @var array
     */
    initArgs: [],

    destroyList: [],

    /**
     * this.uuid
     * A unique identifier for this entitiy
     * @var integer
     */
    uuid: null,

    /**
     * Shorthand for createing a new entity
     * e.create([], arg1, arg2,....);
     *
     * @param array depends
     * @param mixed arg1 {optional}
     * @param mixed arg2 {optional}
     *
     * @return {Entity}
     */
    create: function () {
      var depends = arguments[0],
              returnE = this.extend({
        init: function () {

          this.depends.apply(this, depends);
        }
      });

      var args = [];
      delete arguments[0];
      for (var i in arguments) {
        args[args.length] = arguments[i];
      }

      var EntityConstructor = function (args) {
        return returnE.apply(this, args);
      };

      EntityConstructor.prototype = returnE.prototype;
      return new EntityConstructor(args);
    },

    extend: function (e) {
      var EntityType = function () {
      },
              key,
              init = true,
              returnE;

      for (key in e) {
        if (EntityType.prototype[key]) {
          throw 'Trying to overwrite ' + key;
        }

        if (typeof e[key] === 'function' && key !== 'destroy') {
          EntityType.prototype[key] = e[key];
        }
      }

      for (key in this) {
        if (EntityType.prototype[key]) {
          throw 'Trying to overwrite ' + key;
        }

        if (typeof this[key] === 'function' && key !== 'extend') {
          EntityType.prototype[key] = this[key];
        }
      }

      if (e.destroy) {
        EntityType.prototype.destroyList = EntityType.prototype.destroyList || [];
        EntityType.prototype.destroyList[EntityType.prototype.destroyList.length] = e.destroy;
      }

      returnE = function () {
        if (!(this instanceof returnE)) {
          init = false;
          var EntityConstructor = function (args) {
            return returnE.apply(this, args);
          };
          EntityConstructor.prototype = returnE.prototype;
          return new EntityConstructor(arguments);
        }

        var entity = new EntityType();

        for (var key in e) {
          if (typeof e[key] !== 'function') {
            entity[key] = e[key];
          }
        }

        entity.extendList = [];
        entity.binds = {};
        entity.hash = this.hash;
        entity.initArgs = arguments;

        if (init !== false && typeof entity.init === 'function') {
          o.register(entity);
          entity.init.apply(entity, arguments);
          o.bind('EnterFrame', function (args) {
            entity.trigger('EnterFrame', args);
          }, entity);
        }

        return entity;
      };

      returnE.prototype.hash = h.hash(JSON.stringify(e, function (key, value) {
        if (typeof value === 'function') {
          return value + ''; // force to a string
        }
        return value;
      }, ''));

      // return the constructor for our new entity
      return returnE;
    },

    /**
     * this.depends
     *
     * Takes an array of entities to attach to this entity
     * This entity will gain all properties of the passed entities
     *
     * @param array
     */
    depends: function () {
      for (var i = 0, il = arguments.length; i < il; i++) {
        this.depend(arguments[i]);
      }

      return this;
    },

    /**
     * this.depend
     *
     * Takes a single entity and attaches all its propeties to this entity
     *
     * @param {Entity}
     */
    depend: function (on) {
      var objHash,
              args,
              newE,
              ignoredProperties = ['extendList', 'initArgs', 'binds'];

      if (typeof on === 'function') {
        objHash = on.prototype.hash;
      } else if (typeof on === 'object') {
        objHash = on.hash;
      } else {
        // at the moment must supply object or function
        // could supply a string which is loaded by require
        // however this would break minification
        throw 'Must pass an object or a function. Got a ' + typeof on;
      }

      if (!objHash) {
        throw 'Entity has not method hash - are you sure it\'s an entity?';
      }

      // check if this object had already been included
      // return if it has - only need to attach once
      for (var j = 0, jl = this.extendList.length; j < jl; j++) {
        if (this.extendList[j] === objHash) {
          return;
        }
      }

      if (typeof on === 'function') {
        newE = on();
        args = (this.initArgs) ? this.initArgs : {};
      } else {
        newE = on;
        args = newE.initArgs;
      }

      // attach all the propeties
      for (var key in newE) {
        if (ignoredProperties.indexOf(key) === -1) {
          this[key] = newE[key];
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
          this.binds[action].unnamed[i].call(this, args);
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
      if (name) {
        delete this.binds[action].named[name];
      } else {
        delete this.binds[action].unnamed;
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
      this.binds = {};

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
