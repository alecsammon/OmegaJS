GLOBAL.requirejs = require('requirejs');
GLOBAL.requirejs.config({
  baseUrl: __dirname,
  nodeRequire: require,
  paths: {
    omega: '../../omega/'
  }
});

document = require('jsdom').jsdom('<html><head></head><body><div id="omega"></div></body></html>');
window = document.createWindow();

window.performance = {};
window.performance.now = function() {
  var now = process.hrtime();
  return (now[0]+'.'+now[1]);
};
