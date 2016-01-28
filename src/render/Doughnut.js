'use strict';
var Pie = require('./Pie');
var Math = require('../Math');
var Utils = require('../Utils');

function Doughnut() {}

Doughnut.calculate = function(config) {
  var positionSeries = [];
  var percentage = Math.getSetPercentages(config.data.series); 
  var degrees = Math.getDegrees(percentage, 360); 
  return degrees;
};

Doughnut.createShape = function(config) {
  // Basic calculation
  var center = {
    x: config.positions.size.x/2,
    y: config.positions.size.y/2
  };
  var radius1 = center.y;
  var radius2 = radius1 - (Math.floor(config.positions.size.y/3.8));
  var x1 = Math.calculateAngleX(center.x, radius1, 0);
  var y1 = Math.calculateAngleY(center.y, radius1, 0);
  var x2 = Math.calculateAngleX(center.x, radius1, 180);
  var y2 = Math.calculateAngleY(center.y, radius1, 180);
  var x3 = Math.calculateAngleX(center.x, radius2, 0);
  var y3 = Math.calculateAngleY(center.y, radius2, 0);
  var x4 = Math.calculateAngleX(center.x, radius2, 180);
  var y4 = Math.calculateAngleY(center.y, radius2, 180);
  // Create vectors
  var vectors = [
    {type: 'M', values: [x1, y1]},
    {type: 'A', values: [radius1, radius1, 0, 0, 1]},
    {type: '', values: [x2, y2]},
    {type: 'A', values: [radius1, radius1, 0, 0, 1]},
    {type: '', values: [x1, y1]},
    {type: 'Z'},
    {type: 'M', values: [x3, y3]},
    {type: 'A', values: [radius2, radius2, 0, 0, 0]},
    {type: '', values: [x4, y4]},
    {type: 'A', values: [radius2, radius2, 0, 0, 0]},
    {type: '', values: [x3, y3]},
    {type: 'Z'},
  ];
  var d = Utils.buildPathString(vectors);
  var attributes = { d: d };
  return attributes;
};

Doughnut.create = function(config) {
  var doughnutAttributes = this.createShape(config);
  var pieAttributes = Pie.create(config);
  return [doughnutAttributes];
};

module.exports = Doughnut;