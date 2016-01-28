'use strict';
var Draw = require('./Draw'); 
var Utils = require('./Utils');
var cMath = require('./Math');
var Grid = require('./render/Grid');
var Labels = require('./render/Labels');
var Bar = require('./render/Bar');
var Line = require('./render/Line');
var Pie = require('./render/Pie');
var Doughnut = require('./render/Doughnut');
var Render = require('./render/Render');

function DOM() {
  this.container = null;
  this.attributes = {
    svg: null,
    grid: {
      x: [],
      y: []
    },
    axisLabels: {
      x: [],
      y: []
    },
    seriesLabels: {
      x: [],
      y: []
    },
    dataObjects: []
  };
  this.elements = {
    svg: null,
    grid: {
      x: [],
      y: []
    },
    axisLabels: {
      x: [],
      y: []
    },
    seriesLabels: {
      x: [],
      y: []
    },
    dataObjects: [],
    groups: []
  };
}

DOM.prototype.createSvg = function(attributes) {
  this.attributes.svg = attributes;
};

DOM.prototype.createGrid = function(positions) {
  this.attributes.grid = Grid.create(positions);
};

DOM.prototype.createLabels = function(config) {
  this.attributes.axisLabels = Labels.create(config);
};

/**
 * Lines 
 *
 */
DOM.prototype.createBars = function(config) {
  this.attributes.dataObjects = Bar.create(config);
};

DOM.prototype.createLine = function(config) {
  this.attributes.dataObjects = Line.create(config);
};

DOM.prototype.createPie = function(config) {
  this.attributes.dataObjects = Pie.create(config);
};

DOM.prototype.createDoughnut = function(config) {
  this.attributes.dataObjects = Doughnut.create(config);
};

/**
 * Render
 *
 */
DOM.prototype.renderInitialize = function(config) {
  this.container = document.getElementById(config.container);
  if(!this.elements.svg) {
    this.elements.svg = Draw.element('svg', this.attributes.svg);
    Utils.appendChild(this.container, this.elements.svg);
  }
  else {
    Utils.setElementAttributes(this.elements.svg, this.attributes.svg);
  }
};

DOM.prototype.renderAllElements = function() {
  Render.renderElements(this.attributes.grid.x, this.elements.grid.x, 'line', Draw.element);
  Render.renderElements(this.attributes.grid.y, this.elements.grid.y, 'line', Draw.element);
  Render.renderElements(this.attributes.axisLabels.x, this.elements.axisLabels.x, 'circle', Draw.element);
  Render.renderElements(this.attributes.axisLabels.y, this.elements.axisLabels.y, 'circle', Draw.element);
  Render.renderElements(this.attributes.dataObjects, this.elements.dataObjects, 'path', Draw.element);
};

DOM.prototype.renderGroups = function(config) {

  //
  //
  var textSize = 5;
  var offset = {
    x: config.positions.padding.x - textSize,
    y: textSize
  }
  var g0 = Draw.element('g', {
    transform: 'translate(' + offset.x + ', ' + offset.y + ')'
  });

  //
  //
  Utils.appendChildren(g0, this.elements.grid.x);
  Utils.appendChildren(g0, this.elements.grid.y);
  Utils.appendChildren(g0, this.elements.axisLabels.x);
  Utils.appendChildren(g0, this.elements.axisLabels.y);
  Utils.appendChildren(g0, this.elements.dataObjects);

  //
  Render.removeElements(this.elements.groups);
  this.elements.groups.push(g0);
};

DOM.prototype.render = function(config) {

  //
  // Initialize
  this.renderInitialize(config);
  this.renderAllElements();
  this.renderGroups(config);

  // Add to svg
  Utils.appendChildren(this.elements.svg, this.elements.groups);
};

module.exports = DOM;