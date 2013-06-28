var core = function () {
  'use strict';
  
  this.Given(/^I have started the game$/, function (callback) {
    var container = document.getElementById('omega');
    requirejs('omega/core').init(container, 800, 600);
    callback();
  });

  this.When(/^I view the page$/, function (callback) {
    callback();
  });

  this.Then(/^I should see the stage element$/, function (callback) {
    var childElementCount = document.getElementById('omega').childNodes.length;
    childElementCount.should.equal(1);
    callback();
  });
};

module.exports = core;
