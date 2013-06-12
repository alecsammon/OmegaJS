define([
    'sizzle', 
    'omegaLib/device',
    'omegaLib/obj',
    'omegaLib/pulse'
], function (s, device, obj, pulse) {

  'use strict';

  var Ω = {
    stage: new obj(document.createElement('div')),
    container: null,
    
    init: function(classname, width, height) {
        this.container = new obj(s('.'+classname)[0]);
        
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
                
        //this.lockStage();        
        pulse.bind('EnterFrame', function(){ Ω.trigger('EnterFrame'); }).start();
    },
                    
    trigger: function(e) {
        console.log(pulse.actualFps);
    },
    
    lockStage: function() {
        this.stage.bind('onselectstart', function(){ return false; });
        this.stage.bind('oncontextmenu', function(){ return false; });
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
    }
        
  };
  
  return Ω;
});
