'use strict';
var Math = require('../Math');
var Utils = require('../Utils');

function Pie() {}

Pie.calculate = function(config) {
  var positionSeries = [];
  var percentage = Math.getSetPercentages(config.data.series); 
  var degrees = Math.getDegrees(percentage, 360); 
  return degrees;
};

Pie.createSliceAttribute = function() {
};

Pie.create = function(config) {
  var slicesAttributes = [];
  var center = {
    x: config.positions.size.x/2,
    y: config.positions.size.y/2
  };
  var radius = center.y;
  var lastEndAngle = 0;
  var colors = config.settings.colors;
  config.positions.series.forEach(function(set, i) {
    var attributes = {
      fill: colors[i]
    };
    var sliceOffset = ((i > 0) ? lastEndAngle : 0);
    var rotation = -90 + sliceOffset;
    var startAngle = 0 + rotation;
    var endAngle = set + rotation;
    lastEndAngle += set;
    var splitAngle = 180 + rotation;
    var x1 = Math.calculateAngleX(center.x, radius, startAngle);
    var y1 = Math.calculateAngleY(center.y, radius, startAngle);
    var vectors = [
      {type: 'M', values: [center.x, center.y]},
      {type: '',  values: [x1, y1]}
    ];
    var angles = [];
    // If angle is larger than 180, add a arch at 180 degrees
    if(set > 180) {
      angles.push(splitAngle);
    }
    angles.push(endAngle);
    angles.map(function(angle) {
      var x2 = Math.calculateAngleX(center.x, radius, angle);
      var y2 = Math.calculateAngleY(center.y, radius, angle);
      vectors.push({type: 'A', values: [radius, radius, 0, 0, 1]});
      vectors.push({type: '',  values: [x2, y2]});
    });
    vectors.push({type: 'Z'});
    attributes.dataPoint = y1;
    attributes.dataIndex = i;
    attributes.d = Utils.buildPathString(vectors);
    slicesAttributes.push(attributes);
  });
  return slicesAttributes;
};

module.exports = Pie;