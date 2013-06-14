define(['omegaCore', 'md5', 'omega/pulse'], function(o, h, pulse) {

    'use strict';
    return {
        extends: function(e) {
           var self = this;
           return function() {
               var temp = self.extend({}, self, e);

               temp.extendsList = [];
               temp.binds = {};

               if (!this.disableInit && typeof temp.init === 'function') {
                   temp.init.apply(temp, arguments);
               }

               return temp;
           };
        },

        extend: function(obj) {
            var key, i;

            for (i = 1; i < arguments.length; i++) {
                for (key in arguments[i]) {
                    if (obj !== arguments[i][key] //handle circular reference
                       && key !== 'extends')
                    { 
                        obj[key] = arguments[i][key];
                    }
                }
            }

            return obj;
        },
        
        depends: function(e) {
            for (var i = 0; i < arguments.length; i++) {
                var alreadyInitialised = false;

                arguments[i].prototype.disableInit = true;
                var newE = new arguments[i]();

                var objHash = h.hash(JSON.stringify(newE, function(key, value) {
                    if (key === 'elem' || key === 'extends' || key === 'extendsList' || key === 'depends') {
                        return undefined;
                    }
                    if (typeof value === 'function') {
                        return value + ''; // implicitly `toString` it
                    }
                    return value;
                }, ''));

                for (var j = 0; j < this.extendsList.length; j++) {
                    if (this.extendsList[j] === objHash) {
                        alreadyInitialised = true;
                    }
                }
                
                if (!alreadyInitialised) {
                    this.extendsList.push(objHash);

                    this.extend(this, newE);
                    this.init();
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
            if(action === 'EnterFrame') {
	        pulse.bind(call, this);
            } else {
                if (!this.binds[action]) {
                    this.binds[action] = [];
                }

                this.binds[action].push(call);
            }
            return this;
        },

        unbind: function(action) {
            delete this.binds[action];
            return this;
        },

/*
        bind: function(event, callback) {
            o.bind(event, callback, this);
            return this;
        },

        trigger: function(event) {
            o.trigger(event);
            return this;
        },

        unbind: function(event) {
            o.unbind(event, this);
            return this;
        }*/
    };



});
