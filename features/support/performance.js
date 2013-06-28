window.performance = {};
window.performance.now = function() {
  var now = process.hrtime();
  return (now[0]+'.'+now[1]);
};
