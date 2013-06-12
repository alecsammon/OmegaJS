define(['omegaLib/entity'], function (e) {

  'use strict';
  
  return e.extends({
        init: function(data) {            
            this.setStyles({
                width: '100px',
                height: '100px',
                background: 'blue',
                position: 'absolute'
            });
            
            this.bind('EnterFrame', function(){
                this.setStyles({
                    bottom: '10px'
                });
            });
        }
  });
});
