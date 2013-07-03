var core = function () {
  'use strict';
  var game,
      height = 800,
      width = 600,
      scale = 1;
  
  this.Given(/^I have a small screen$/, function(callback) {
    window.innerHeight = 400;
    scale = 0.66445182724;
    callback();
  });

  this.Given(/^I have started the game$/, function (callback) {
    var container = document.getElementById('omega');
    requirejs('omega/core').init(container, height, width);
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
    // check game
    game.style.width.should.equal((scale*height)+'px');
    game.style.height.should.equal((scale*width)+'px'); 
    
    // check stage
    game.childNodes[0].style.width.should.equal(height+'px');
    game.childNodes[0].style.height.should.equal(width+'px'); 
    callback();   
  });
  
};

module.exports = core;

