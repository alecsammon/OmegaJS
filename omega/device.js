define([], function () {

  'use strict';

  var getUserAgent = function () {
    return (navigator && navigator.userAgent) ? navigator.userAgent.toLowerCase() : null;
  };

  return {
    getCssPrefix: function () {
      var ua = getUserAgent(),
              match = /(webkit)[ \/]([\w.]+)/.exec(ua) ||
              /(o)pera(?:.*version)?[ \/]([\w.]+)/.exec(ua) ||
              /(ms)ie ([\w.]+)/.exec(ua) ||
              /(moz)illa(?:.*? rv:([\w.]+))?/.exec(ua) || [],
              prefix;

      match = (match[1] || match[0]);

      switch (match) {
      case 'moz':
        prefix = 'Moz';
        break;
      case 'o':
        prefix = 'O';
        break;
      default:
        prefix = match;
      }

      return prefix;
    },

    isTouchDevice: function () {
      return ('ontouchstart' in document.documentElement);
    }
  };
});
