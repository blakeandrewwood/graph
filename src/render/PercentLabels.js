'use strict';
var Draw = require('../Draw'); 
var Render = require('./Render'); 
var Utils = require('../Utils');
var Math = require('../Math');

function PercentLabels() {}

PercentLabels.create = function(config) {
  //
  // Container
  var container = {
    defs: [],
    elements: []
  };

  //
  // Elements
  var ratio = Draw.element('text', {
    x: config.positions.size.x/2,
    y: config.positions.size.y,
    fill: '#888',
    fontSize: config.settings.fontSize,
    fontFamily: config.settings.fontFamily,
    textAnchor: 'middle'
  });
  var text = config.data.series[0][0] + ' / ' + config.data.series[0][1];
  Utils.appendChild(ratio, document.createTextNode(text));
  container.elements.push(ratio);

  var percent = Draw.element('text', {
    x: config.positions.size.x/1.95,
    y: config.positions.size.y/1.8, 
    fill: '#fff',
    fontSize: config.positions.size.y/8,
    fontFamily: config.settings.fontFamily,
    textAnchor: 'middle'
  });
  var text = Math.round(Math.getPercentages(config.data.series)*100) + '%';
  Utils.appendChild(percent, document.createTextNode(text));
  container.elements.push(percent);

  //
  // Return
  return container;
};

module.exports = PercentLabels;
