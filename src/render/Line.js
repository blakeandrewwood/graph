'use strict';
var Math = require('../Math');
var Utils = require('../Utils');

function Line() {}

Line.calculate = function(config) {
  var positionSeries = [];
  config.data.series.forEach(function(set, i) {
    var positionSet = [];
    set.forEach(function(y, j) {
      var yn = Math.calculateY(y, config.data.max, config.positions.size.y);
      positionSet.push(yn);
    });
    positionSeries.push(positionSet);
  });
  return positionSeries;
};

Line.create = function(config) {
  var attributes = [];
  config.positions.series.forEach(function(set, i) {
    var vectors = [];
    set.forEach(function(y, j) {
      var vector = {
        type: '',
        values: []
      };
      if(j === 0 ){
        vector.type = 'M';
      }
      var x = config.positions.axis.x[j];
      vector.values.push(x, y);
      vectors.push(vector);
    });
    var d = Utils.buildPathString(vectors);
    var color = config.settings.colors[i];
    var attribute = {
      d: d,
      stroke: color,
      fill: 'transparent',
      strokeWidth: config.settings.strokeWidth,
      strokeLinecap: 'round',
    };
    attributes.push(attribute);
  }, this);
  return attributes;
};

module.exports = Line;