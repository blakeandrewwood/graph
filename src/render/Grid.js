'use strict';
var Draw = require('../Draw'); 
var Render = require('./Render'); 

function Grid() {}

Grid.createX = function(positions) {
  var lines = [];
  positions.axis.x.map(function(x) {
    lines.push({
      x1: x,
      y1: 0,
      x2: x,
      y2: positions.size.y,
      strokeDasharray: '5, 5',
      strokeWidth: '2',
      stroke: '#eee'
    });
  });
  return lines;
};

Grid.createY = function(positions) {
  var lines = [];
  positions.axis.y.map(function(y) {
    lines.push({
      x1: 0,
      y1: y,
      x2: positions.size.x,
      y2: y,
      strokeDasharray: '5, 5',
      strokeWidth: '2',
      stroke: '#eee'
    });
  });
  return lines;
};

Grid.create = function(config) {
  var attributes = {
    x: this.createX(config.positions),
    y: this.createY(config.positions)
  }

  //
  // Container
  var container = {
    defs: [],
    elements: []
  };

  //
  // Elements
  var lines = [];
  Render.renderElements(attributes.x, lines, 'line', Draw.element);
  Render.renderElements(attributes.y, lines, 'line', Draw.element);
  container.elements = lines;

  //
  // Return
  return container;
};

module.exports = Grid;