define([
  'omega/core',
  'omega/performance'
], function (o, performance) {

  'use strict';
  
  return function() {
    var data = [];
    var $flot = $('#omegajs').after('<div id="flot"></div>');
    $('#flot').height(200);
 
    var plot = $.plot('#flot', [data], {
                 series: {
                   shadowSize: 0
                 },
                 yaxis: {
                   min: 0,
                   max: 100
                 },
                 xaxis: {
                  show: false
                 }
               });

    var next = 0;
    o.bind('EnterFrame', function(fps, time) {
      if(data.length > 60) {
        data.shift(1);
      }
      ++next;
      data[data.length] = [next, fps];
      plot.setData([data]);
      plot.setupGrid();
      plot.draw();
      //console.log(fps);
    });
  }
});
