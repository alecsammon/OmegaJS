define(['omegaCore', 'md5'], function(o, h) {

    'use strict';
    return {
        initArgs: [],

        create: function(depends, args) {
            return new (this.extend({
                          init:function(){
                              this.depends.apply(this, depends);
                          }}))(args);
        },

        extend: function(e) {
            var entityType = function () {};
            
            for (var key in e) {
                if(entityType.prototype[key]) {
                    throw 'Trying to overwrite '+key
                }

                if(typeof e[key] === 'function') {
                 entityType.prototype[key] = e[key];
                }
            }

            for (var key in this) {
                if(entityType.prototype[key]) {
                    throw 'Trying to overwrite '+key
                }

                if(typeof this[key] === 'function' && key !== 'extend') {
                    entityType.prototype[key] = this[key];
                }
            }

            var init = true;
            

            var returnE = function() {
                if(!(this instanceof returnE)){
                    init = false;
                     var entity = function(args) {
                         return returnE.apply(this, args);
                     }
                     entity.prototype = returnE.prototype;
                     return new entity(arguments);
                }

                var entity = new entityType();

                for (var key in e) {
                    if(typeof e[key] !== 'function') {
                        entity[key] = e[key];
                    }
                }
                            
                entity.extendList = [];
                entity.binds = {};
                entity.hash = this.hash;   
                entity.initArgs = arguments;     

                if (init !== false && typeof entity.init === 'function') {
                    entity.init.apply(entity, arguments);   
                    entity.uuid = o.register(entity);
                    o.bind('EnterFrame', function(args){ entity.trigger('EnterFrame', args); }, entity);
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

                for (var j = 0; j < this.extendList.length; j++) {
                    if (this.extendList[j] === objHash) {
                        alreadyInitialised = true;
                    }
                }
                if(!alreadyInitialised) {
                   if(typeof arguments[i] === 'function') {
                        var newE = arguments[i]()
                        var args = this.initArgs;
                    } else {
                        var newE = arguments[i];
                        var args = newE.initArgs;
                    }
     
                    this.extendList.push(objHash);
                    for(var key in newE) {
                        if(key !== 'extendList' && key !== 'initArgs' && key !== 'binds') {
                            this[key] = newE[key];
                        }
                    }
                    
                    this.init.apply(this, args);
               }
            }
            
            return this;    
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
