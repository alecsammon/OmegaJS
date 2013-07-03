OmegaJS - A Javascript game engine
==================================

## Introduction

Omega allows you to quickly build web games using JavaScript. It provides a **pulse** that provides your framerate, and a **stage** that redraws evevery time the pulse fires. It also provides a way of creating new **entities** and for those entities to inherit **behaviour**.

-----------------------------------------------

## Default Behaviours

An overview of the default behaviours that come bundled with Omega. The API of each behavoiur is in the comments of the behaviour.

### Animate

Allows you to create animations by changing the class names of an entity. CSS rules can then be used to change the background image for each frame of the animation.

### Collision

Detects a collision between 2 entities. Entities can be belong to multiple collision groups.

### Delay

Fires a callback after a number of frames have passed. You should use this instead of setTimeout/setInterval.

### DOM

Creates a 2D dom object on the stage, which can have an x and y position (measured from the bottom left of the stage) and a width and a height.The entity can also be set styles and classes. You should add this behaviour to all your entities.

### Fourway

Simple method of attaching arrow key events to move your entity up, down, left and right

### Keyboard

Detects keyboard events and triggers these on the entity

### Mouse

Detects mouse events and triggers these on the entity

### Follow

Simple method for making an entity follow the mouse 

-----------------------------------------------

## Debug

Omega has a built in debug toolbar. This allows you to quickly see the performance of your game, and identify any performance problems.
```JavaScript
require([
    'omega/core',
    'omega/debug/core'
  ], function (Ω, Debug) {
    var container = document.getElementById('omegajs'),
        width = 800,
        height = 600,
        fps = 30;

    Ω.init(container, width, height, fps);
    new Debug();
});
```
-----------------------------------------------

## Testing

sudo npm install -g grunt-cli
- grunt jslint
- grunt csslint
- grunt test

-----------------------------------------------

### built using

- RequireJS - http://requirejs.org (MIT or new BSD)
- MD5 - http://pajhome.org.uk/crypt/md5/ (BSD)
- jQuery - http://jquery.com (MIT)
- Flot - http://www.flotcharts.org/ (MIT)

### @todo

- components
 - velocity
 - wind
 - gravity
 - timing
 - sound
 - preloader

