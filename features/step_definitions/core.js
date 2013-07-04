var core = function () {
  'use strict';
  var game,
      width = 800,
      height = 600;
  
  this.Given(/^I have a small screen$/, function(callback) {
    window.innerHeight = 400;
    callback();
  });

  this.Given(/^I have started the game$/, function (callback) {
    var container = document.getElementById('omega');
    requirejs('omega/core').init(container, width, height);
    callback();
  });

  this.When(/^I view the page$/, function (callback) {
    game = document.getElementById('omega');
    callback();
  });

  this.Then(/^I should see the stage element$/, function (callback) {
    var childElementCount = game.childNodes.length;
    childElementCount.should.equal(1);
    callback();
  });
  
  this.Then(/^I should see the stage element with the correct dimensions$/, function(callback) {
    var scale = (window.innerHeight > height) ? 1 : window.innerHeight/(height+2);
    // check game
    game.style.width.should.equal(scale*width+'px');
    game.style.height.should.equal(scale*height+'px'); 
    
    // check stage
    game.childNodes[0].style.width.should.equal(width+'px');
    game.childNodes[0].style.height.should.equal(height+'px'); 
    callback();   
  });
  
};

module.exports = core;

