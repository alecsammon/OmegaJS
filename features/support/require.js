var requirejs = require('requirejs');
requirejs.config({
  baseUrl: __dirname,
  nodeRequire: require,
  paths: {
    omega: '../../omega/'
  }
});

GLOBAL.requirejs = requirejs;

