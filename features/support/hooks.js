var myHooks = function () {
  this.After(function(callback) {
    window.innerHeight = 768;
    // Don't forget to tell Cucumber when you're done:
    callback();
  });
};

module.exports = myHooks;