var core = function () {
  'use strict';
  var game;
  
  this.Given(/^I have started the game$/, function (callback) {
    var container = document.getElementById('omega');
    requirejs('omega/core').init(container, 800, 600);
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
    game.style.width.should.equal('800px');
    game.style.height.should.equal('600px'); 
    
    // check stage
    game.childNodes[0].style.width.should.equal('800px');
    game.childNodes[0].style.height.should.equal('600px'); 
    callback();   
  });
  
};

module.exports = core;

