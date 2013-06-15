define(['omegaCore', 'md5'], function(o, h) {

    'use strict';
    return {
        extends: function(e) {
            var entityType = function () {};
            
            for (var key in e) {
                if(typeof e[key] === 'function') {
                 entityType.prototype[key] = e[key];
                }
            }

            for (var key in this) {
                if(typeof this[key] === 'function' && key !== 'extends') {
                    entityType.prototype[key] = this[key];
                }
            }

            var returnE = function(args, init) {
                if(!(this instanceof returnE)){
                    throw 'You must create this object with "new"';
                }

                var entity = new entityType();

                for (var key in e) {
                    if(typeof e[key] !== 'function') {
                        entity[key] = e[key];
                    }
                }

                entity.initArgs = args;
                entity.extendsList = [];
                entity.binds = {};
                entity.hash = this.hash;

                if (init !== false && typeof entity.init === 'function') {
                    entity.init(args);           
                    entity.uuid = o.register(entity);
                 }

                return entity;
            };

            returnE.prototype.hash = h.hash(JSON.stringify(e, function(key, value) {
                    if(typeof value === 'function') {
                        return value+'';
                    }
                    return value;
                }, ''));

            return returnE;
        },

        depends: function() {
            for (var i = 0; i < arguments.length; i++) {
                if(typeof arguments[i] === 'function') {
                    var objHash = arguments[i].prototype.hash;;
                } else {
                    var objHash = arguments[i].hash;
                }

                var alreadyInitialised = false;

                for (var j = 0; j < this.extendsList.length; j++) {
                    if (this.extendsList[j] === objHash) {
                        alreadyInitialised = true;
                    }
                }
                if(!alreadyInitialised) {
                   if(typeof arguments[i] === 'function') {
                        var newE = new arguments[i](null, false);
                        var args = this.initArgs;
                    } else {
                        var newE = arguments[i];
                        var args = newE.initArgs;
                    }
 
                    this.extendsList.push(objHash);
                    for(var key in newE) {
                        if(key !== 'extendsList') {
                        this[key] = newE[key];
                        }
                    }
                    this.init(args);
               }
            }
            
        },

        trigger: function(action, args, context) {
            if(typeof context === 'undefined') {
                context = this;
            }
            if (this.binds[action]) {
                for (var i in this.binds[action]) {
                   this.binds[action][i].call(context, args);
                }
            }


            return this;
        },


        bind: function(action, call) {
                if (!this.binds[action]) {
                    this.binds[action] = [];
                }

                this.binds[action].push(call);
            return this;
        },

        unbind: function(action) {
            delete this.binds[action];
            return this;
        },
    };



});
