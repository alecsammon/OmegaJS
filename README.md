OmegaJS - A Javascript game engine
==================================

Introduction
------------

Omega allows you to quickly build web games using JavaScript. It provides a *pulse* that provides your framerate, and a *stage* that redraws evevery time the pulse fires. It also provides a way of creating new *entities* and for those entities to inherit *behaviour*.

Bundled with Omega are a number of behavoiurs.

Behaviours
==========
An overview of the default behaviours that come bundled with Omega. The API of each behavoiur is in the comments of the behaviour.

DOM
---
Creates a 2D dom object on the stage, which can have an x and y position (measured from the bottom left of the stage) and a width and a height.The entity can also be set styles and classes.

Collision
--------- 
Detects collision between 2 entities. Entities can be belong to multiple collision groups.

Mouse
-----
Detects mouse movements and clicks and triggers events on the entity

Keyboard
--------
Detects keyboard events and triggers these on the entity

Fourway
-------
Simple method of attaching arrow key events to move your entity up, down, left and right

Animate
-------
Allows you to create animations by changing the class names of an entity. CSS rules can then be used to change the background image for each frame of the animation

Delay
-----
Fires a callback after a number of frames have passed. You should use this instead of setTimeout/setInterval

Text
----
Adds text to the entity

-----------------------------------------------

built using
-----------
RequireJS - http://requirejs.org
MD5 - http://pajhome.org.uk/crypt/md5/
jQuery - http://jquery.com
Flot - http://github.com/flot/flot

@todo
-----
- components
 - velocity
 - wind
 - gravity

Testing
-------
sudo npm install -g grunt-cli
- grunt jslint
- grunt csslint
- grunt test
