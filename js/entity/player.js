define(['omega/entity', 'omega/pulse'], function (e, pulse) {

  'use strict';
  
  return e.extends({
        init: function() {            
            this.setStyles({
                width: '100px',
                height: '100px',
                background: 'blue',
                position: 'absolute',
                border: '1px solid #FFFFFF',
                color: '#FFFFFF'
            });
            
            this.bind('EnterFrame', function(){
                this.elem.innerHTML = 'FPS:'+pulse.getFps();
                this.setStyles({
                    bottom: '10px'
                });
            });
        }
  });
});
