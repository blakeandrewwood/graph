'use strict';
var Draw = require('../Draw'); 
var Render = require('./Render'); 
var Utils = require('../Utils');

function SeriesLabels() {}

SeriesLabels.createSeries = function(config) {
  var labels = [];
  config.data.seriesLabels.forEach(function(label, index) {

    //
    //
    var attributes = {
      fill: config.settings.colors[index],
      fontSize: config.settings.fontSize,
      fontFamily: config.settings.fontFamily
    };

    //
    //
    if(config.settings.type === 'pie' || config.settings.type === 'doughnut') {
      attributes.x = 0;
      attributes.dy = -20;
      attributes.textAnchor = 'start';
    } else {
      attributes.dx = 10;
    }

    //
    //
    labels.push(attributes);

  });
  return labels;
};

SeriesLabels.create = function(config) {
  var attributes = this.createSeries(config);

  //
  // Container
  var container = {
    defs: [],
    elements: []
  };

  //
  // Elements
  var labelsSeries = [];
  Render.renderElements(attributes, labelsSeries, 'tspan', Draw.element);

  var textAttribute;
  switch(config.settings.type) {
    case 'doughnut':
    case 'pie': {
      textAttribute = {
        x: 0,
        y: 0,
        textAnchor: 'start'
      }
      break;
    }
    case 'line':
    case 'bar': {
      textAttribute = {
        x: config.positions.size.x,
        y: config.positions.size.y + 40,
        textAnchor: 'end'
      }
      break;
    }
  }

  //
  // Text Container
  var textContainer = Draw.element('text', textAttribute);
  labelsSeries.forEach(function(label, index) {
    var text = config.data.seriesLabels[index];
    Utils.appendChild(label, document.createTextNode(text));
    Utils.appendChild(textContainer, label);
  });

  container.elements.push(textContainer);

  //
  // Return
  return container;
};

module.exports = SeriesLabels;
