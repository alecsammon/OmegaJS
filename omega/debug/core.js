define([
  'omega/core',
  'omega/performance',
  'omega/pulse',
  'jquery',
  'flot'
], function (o, performance, pulse) {

  'use strict';

  var secondsOfData = 10,
      updatesPerSecond = 5,
      dataLength = (1000 / pulse.getTargetFps()) * secondsOfData; // points on graph (length of each frame * duration of output)

  var debug = {
    init: function (container) {
      var fpsData = [],
          percentageEnterFrameData = [],
          percentageRenderData = [],
          entityData = [],
          next = dataLength,
          frameStart,
          enterFrames = [],
          percentageEnterFrame,
          percentageRender;

      for (var i = 0; i < dataLength; ++i) {
        fpsData[i] = [i, -1];
        percentageEnterFrameData[i] = [i, -1];
        percentageRenderData[i] = [i, -1];
        entityData[i] = [i, -1];
      }

      var $debug = $('<div id="omega_debug"></div>');
      $debug.insertAfter($(container)).width(o.getAttr().width * o.getAttr().scale);

      $debug.append('<div class="plot fps"></div>');
      var fpsPlot = $.plot('#omega_debug .fps', [], {
        series: {shadowSize: 0, clickable: false, hoverable: false, lines: { lineWidth: 1}},
        yaxis: {min: 0, max: pulse.getTargetFps() * 1.5, labelWidth: 20, ticks: 5},
        xaxis: {show: false},
        legend: {position: 'nw'}
      });

      $debug.append('<div class="plot time"></div>');
      var timePlot = $.plot('#omega_debug .time', [], {
        series: {shadowSize: 0, clickable: false, hoverable: false, lines: { fill: true,  lineWidth: 1}},
        yaxis: {min: 0, max: 100, labelWidth: 20, tickSize: 25},
        xaxis: {show: false},
        legend: {position: 'nw'}
      });

      $debug.append('<div class="plot entity"></div>');
      var entityPlot = $.plot('#omega_debug .entity', [], {
        series: {shadowSize: 0, clickable: false, hoverable: false, lines: { lineWidth: 1}},
        yaxis: {min: 0, max: 20, labelWidth: 20, ticks: 5},
        xaxis: {show: false},
        legend: {position: 'nw'}
      });

      frameStart = performance.now();
      var lastFrameDuration = 1000 / pulse.getTargetFps(),
           renderStart = performance.now() + (1000 / pulse.getTargetFps()),
           frameend = performance.now() + (1000 / pulse.getTargetFps());

      pulse.bind(function () {
        lastFrameDuration = performance.now() - frameStart;
        frameStart = performance.now();

        enterFrames[enterFrames.length] = lastFrameDuration;
        if (enterFrames.length > pulse.getTargetFps() * 2) {
          enterFrames.shift();
        }
      });

      o.bind('RenderStart', function () {
        renderStart = performance.now();
        percentageEnterFrame = (renderStart - frameStart) / lastFrameDuration * 100;
      });

      o.bind('RenderEnd', function () {
        frameend = performance.now();
        percentageRender = (frameend - renderStart) / lastFrameDuration * 100;
      });

      entityPlot.getOptions().grid.markings = [];
      o.bind('Collision', function() {
        entityPlot.getOptions().grid.markings[entityPlot.getOptions().grid.markings.length] = { color: '#ffffff', lineWidth: 1, xaxis: {from: next, to: next, lineWidth: 1}};
      });

      setInterval(function () {
        var fps,
            sum = 0;

        for (var i = 0, il = enterFrames.length; i < il; ++i) {
          sum += enterFrames[i];
        }
        fps = 1000 / (sum / enterFrames.length);

        fpsData.shift();
        fpsData[fpsData.length] = [next, fps];

        fpsPlot.setData([
          {data: [[next - dataLength + 1, pulse.getTargetFps()], [next, pulse.getTargetFps()]], label: 'Target FPS (' + pulse.getTargetFps()  + ')'},
          {data: fpsData, label: 'Actual FPS (' + (Math.round(fps*10)/10).toFixed(1) + ')'}
        ]);

        fpsPlot.setupGrid();
        fpsPlot.draw();

        // ---

        percentageEnterFrameData.shift();
        percentageEnterFrameData[percentageEnterFrameData.length] = [next, percentageEnterFrame];

        percentageRenderData.shift();
        percentageRenderData[percentageRenderData.length] = [next, percentageRender + percentageEnterFrame];

        timePlot.setData([
          {data: percentageEnterFrameData, label: 'Frame ready (' + (Math.round(percentageEnterFrame * 10)/10).toFixed(1) + '%)'},
          {data: percentageRenderData, label: 'Frame rendered (' + (Math.round((percentageRender + percentageEnterFrame)*10)/10).toFixed(1) + '%)'}
        ]);

        timePlot.setupGrid();
        timePlot.draw();

        // ---

        entityData.shift();
        entityData[entityData.length] = [next, Object.keys(o.getEntities()).length];

        if (Object.keys(o.getEntities()).length > 20) {
          entityPlot.getAxes().yaxis.options.max = null;
        }

        entityPlot.setData([
          {data: entityData, label: 'Entities (' + Object.keys(o.getEntities()).length + ')'},
        ]);

        entityPlot.setupGrid();
        entityPlot.draw();

        // ---

        ++next;
      }, 1000 / updatesPerSecond);
    }
  };

  return function (container) {
    return debug.init(container);
  };
});
