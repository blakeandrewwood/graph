'use strict';
var Draw = require('../Draw'); 
var Render = require('./Render'); 
var Utils = require('../Utils');

function Labels() {}

Labels.createX = function(config) {
  var labels = [];
  config.data.axisLabels.x.forEach(function(label, index) {
    labels.push({
      x: config.positions.axis.x[index],
      y: config.positions.size.y + 10,
      fill: '#888',
      fontSize: config.settings.fontSize,
      fontFamily: config.settings.fontFamily,
      textAnchor: 'middle',
      dataText: 'foo' 
    });
  });
  return labels;
};

Labels.createY = function(config) {
  var labels = [];
  config.data.axisLabels.y.forEach(function(label, index) {
    labels.push({
      x: 0,
      y: config.positions.axis.y[index] + (12/2),
      fill: '#888',
      fontSize: config.settings.fontSize,
      fontFamily: config.settings.fontFamily,
      textAnchor: 'right',
      dataText: 'foo' 
    });
  });
  return labels;
};

Labels.create = function(config) {
  var attributes = {
    x: this.createX(config),
    y: this.createY(config)
  };

  //
  // Container
  var container = {
    defs: [],
    elements: []
  };

  //
  // Elements

  // Labels x
  var labelsAxisX = [];
  Render.renderElements(attributes.x, labelsAxisX, 'text', Draw.element);
  labelsAxisX.forEach(function(label, index) {
    var text = config.data.axisLabels.x[index];
    Utils.appendChild(label, document.createTextNode(text));
  });

  // Labels y
  var labelsAxisY = [];
  Render.renderElements(attributes.y, labelsAxisY, 'text', Draw.element);
  labelsAxisY.forEach(function(label, index) {
    var text = config.data.axisLabels.y[index];
    // Cut the string if long
    if(text.length > 8) {
      text = text.substring(0, 8) + '...';
    }
    Utils.appendChild(label, document.createTextNode(text));
  });

  container.elements = {
    x: labelsAxisX,
    y: labelsAxisY
  };

  //
  // Return
  return container;
};

module.exports = Labels;