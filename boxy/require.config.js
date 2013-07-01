require.config({
  paths: {
    omega: '../omega/',
    boxy: './',
    jquery: '../omega/lib/jquery',
    flot: '../omega/lib/jquery.flot'
  },
  shim: {
    flot  : ['jquery']
  }
});
