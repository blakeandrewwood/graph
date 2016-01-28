'use strict';

function Labels() {}

Labels.createX = function(config) {
  var labels = [];
  config.data.axisLabels.x.forEach(function(label, index) {
    labels.push({
      cx: config.positions.axis.x[index],
      cy: config.positions.size.y,
      r: 5,
      fill: '#aaa'
    });
  });
  return labels;
};

Labels.createY = function(config) {
  var labels = [];
  config.data.axisLabels.y.forEach(function(label, index) {
    labels.push({
      cx: 0,
      cy: config.positions.axis.y[index],
      r: 5,
      fill: '#aaa'
    });
  });
  return labels;
};

Labels.create = function(config) {
  var attributes = {
    x: this.createX(config),
    y: this.createY(config)
  }
  return attributes;
};

module.exports = Labels;