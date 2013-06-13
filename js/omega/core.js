define([
    'omega/device',
    'omega/obj',
    'omega/pulse'
], function (device, obj, pulse) {

  'use strict';

  var Ω = {
    stage: new obj(document.createElement('div')),
    container: null,
    binds: [],
    
    init: function(container, width, height) {
        this.container = new obj(container);
        
        var scale = this.getScaling(width, height);
        
        this.container.appendChild(this.stage);
        
        this.container.setStyles({
                    width: width*scale+'px',
                    height: height*scale+'px'            
                });
            
        this.stage.setStyles({
                    transformOrigin: '0 0',
                    transform: 'scale('+scale+')',
                    width: width+'px',
                    height: height+'px',
                    backgroundColor: 'red'
                });
              
        this.stage.lock();
        
        pulse.bind(function(){ Ω.trigger('EnterFrame'); }).start();
    },
                 
    trigger: function(action) {
        if(this.binds[action]) {
            for (var i = 0; i < this.binds[action].length; i++) {
                this.binds[action][i]['call'].call(this.binds[action][i]['context']);
              }
        }

          return this;
    },        

    bind: function(action, call, context) {
        if(!this.binds[action]) {
            this.binds[action] = [];
        }

        this.binds[action].push({'call':call, 'context':context});

        return this;
    },
    
            
    getScaling: function(width, height) {
        var scale = Math.min(
                window.innerWidth/(width+2),
                window.innerHeight/(height+2)
            );
                
        if(!device.isTouchDevice()) {
            scale = Math.min(scale, 1);
        }
        
        return scale;
    },
            
    addEntity: function(e) {
        this.stage.appendChild(e);
    }
        
  };
  
  return Ω;
});
