define(['omega/device'], function(device) {

    'use strict';

    /**
     * Provides a stardard way of getting performance.now across browsers
     * @see http://gent.ilcore.com/2012/06/better-timer-for-javascript.html
     **/
    window.performance = window.performance || {};
    performance.now = (function() {
        return performance.now       ||
             performance.mozNow    ||
             performance.msNow     ||
             performance.oNow      ||
             performance.webkitNow ||
             function() { return new Date().getTime(); };
    })();

    return {
        now: function() {
  		return performance.now();
        }
    }

});
