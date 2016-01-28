'use strict';
var Math = require('../Math');
var Utils = require('../Utils');

function Bar() {}

Bar.calculate = function(config) {
  var positionSeries = [];
  config.data.series.forEach(function(set, i) {
    var positionSet = [];
    set.forEach(function(y, j) {
      //
      // [[0, 1], 0, 1, 2]
      if(typeof y.length === 'number') {
        var ySet = [];
        y.map(function(y1) {
          var yn;
          yn = Math.calculateY(y1, config.data.max, config.positions.size.y);
          yn = Math.round(yn);
          yn = yn + (config.settings.strokeWidth/2);
          ySet.push(yn);
        }, this);
        positionSet.push(ySet);
      } 
      //
      // [0, 1, 0, 1, 2]
      else {
        var yn;
        yn = Math.calculateY(y, config.data.max, config.positions.size.y);
        yn = Math.round(yn);
        yn = yn + (config.settings.strokeWidth/2);
        positionSet.push(yn);
      }
    });
    positionSeries.push(positionSet);
  });
  return positionSeries;
};

Bar.createAttribute = function(config, y, index, color, stacked, j, setLength) {
  var x;
  if(stacked) {
    x = config.positions.axis.x[index];
  }
  else {
    var strokeWidth = config.settings.strokeWidth; 
    var gutter = -(strokeWidth / 4);
    var offset = ((strokeWidth + gutter) * (setLength - 1)) / 2;
    x = config.positions.axis.x[index] + (j * (strokeWidth + gutter)) - offset;
  }
  var y1 = Math.calculateY(0, config.data.max, config.positions.size.y);
  var y2 = y;
  var vectors = [
    {type: 'M', values: [x, y1]},
    {type: '',  values: [x, y2]}
  ];
  var d = Utils.buildPathString(vectors);
  var attribute = {
    d: d,
    stroke: color,
    strokeWidth: config.settings.strokeWidth,
    strokeLinecap: 'round',
    dataPoint: y2
  };
  return attribute;
}

Bar.create = function(config) {
  var attributes = [];
  config.positions.series.forEach(function(set, index) {
    var colorIndex = 0;
    set.forEach(function(y, j) {
      //
      // [[0, 1], 0, 1, 2]
      if(typeof y.length === 'number') {
        var subAttributes = [];
        y.map(function(y1) {
          var attribute = this.createAttribute(config, y1, index, config.settings.colors[colorIndex], true);
          subAttributes.push(attribute);
          colorIndex++;
        }, this);
        subAttributes.sort(Math.sortByPointAsc);
        subAttributes.map(function(attribute) {
          attributes.push(attribute);
        });
      }
      //
      // [0, 1, 0, 1, 2]
      else {
        var attribute = this.createAttribute(
          config,
          y,
          index,
          config.settings.colors[colorIndex],
          false,
          j,
          set.length
        );
        attributes.push(attribute);
        colorIndex++;
      }
    }, this);
  }, this);
  return attributes;
};

module.exports = Bar;