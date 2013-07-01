require.config({
  paths: {
    omega: '../omega/',
    jquery: '../omega/lib/jquery',
    flot: '../omega/lib/jquery.flot',
    shooter: './'
  },
  shim: {
      flot  : ["jquery"]
  }  
});
