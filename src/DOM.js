'use strict';
var Draw = require('./Draw'); 
var Utils = require('./Utils');
var cMath = require('./Math');
var Grid = require('./render/Grid');
var Labels = require('./render/Labels');
var SeriesLabels = require('./render/SeriesLabels');
var PercentLabels = require('./render/PercentLabels');
var Bar = require('./render/Bar');
var Line = require('./render/Line');
var Pie = require('./render/Pie');
var Doughnut = require('./render/Doughnut');
var Dial = require('./render/Dial');
var Tooltip = require('./render/Tooltip');
var Render = require('./render/Render');

function DOM() {
  this.container = null;
  this.elements = {
    svg: null,
    tooltip: null,
    lineBulb: null,
    grid: [],
    axisLabels: [],
    seriesLabels: [],
    percentLabels: [],
    dataObjects: [],
    defs: [],
    groups: []
  };
}

/**
 * Reset 
 *
 */
DOM.prototype.resetAll = function(config) {
  Render.removeElements(this.elements.grid);
  Render.removeElements(this.elements.axisLabels);
  Render.removeElements(this.elements.dataObjects);
  Render.removeElements(this.elements.groups);
};

/**
 * Create 
 *
 */
DOM.prototype.createSvg = function(config, attributes) {
  this.resetAll();
  this.container = document.getElementById(config.container);
  if(!this.elements.svg) {
    this.elements.svg = Draw.element('svg', attributes);
    Utils.appendChild(this.container, this.elements.svg);
    //
    // Make tooltip
    this.elements.tooltip = Tooltip.create(config).elements[0];
    //
    // Make bulb
    this.elements.lineBulb = Draw.element('circle', {
      style: 'pointer-events: none;'
    });
    this.container.appendChild(this.elements.tooltip);
  }
  else {
    Utils.setElementAttributes(this.elements.svg, attributes);
  }
};

DOM.prototype.createGrid = function(config) {
  var container = Grid.create(config);
  this.elements.defs = this.elements.defs.concat(container.defs);
  this.elements.grid = this.elements.grid.concat(container.elements);
};

DOM.prototype.createLabels = function(config) {
  var container = Labels.create(config);
  this.elements.defs = this.elements.defs.concat(container.defs);
  this.elements.axisLabels.x = container.elements.x; 
  this.elements.axisLabels.y = container.elements.y; 
};

DOM.prototype.createSeriesLabels = function(config) {
  var container = SeriesLabels.create(config);
  this.elements.defs = this.elements.defs.concat(container.defs);
  this.elements.seriesLabels = container.elements; 
};

DOM.prototype.createPercentLabels = function(config) {
  var container = PercentLabels.create(config);
  this.elements.defs = this.elements.defs.concat(container.defs);
  this.elements.percentLabels = container.elements; 
};

/**
 * Lines 
 *
 */
DOM.prototype.createBars = function(config) {
  var container = Bar.create(config);
  this.elements.defs = this.elements.defs.concat(container.defs);
  this.elements.dataObjects = this.elements.dataObjects.concat(container.elements);
};

DOM.prototype.createLine = function(config) {
  var container = Line.create(config);
  this.elements.defs = this.elements.defs.concat(container.defs);
  this.elements.dataObjects = this.elements.dataObjects.concat(container.elements);
};

DOM.prototype.createPie = function(config) {
  var container = Pie.create(config);
  this.elements.defs = this.elements.defs.concat(container.defs);
  this.elements.dataObjects = this.elements.dataObjects.concat(container.elements);
};

DOM.prototype.createDoughnut = function(config) {
  var container = Doughnut.create(config);
  this.elements.defs = this.elements.defs.concat(container.defs);
  this.elements.dataObjects = this.elements.dataObjects.concat(container.elements);
};

DOM.prototype.createDial = function(config) {
  var container = Dial.create(config);
  this.elements.defs = this.elements.defs.concat(container.defs);
  this.elements.dataObjects = this.elements.dataObjects.concat(container.elements);
};

/**
 * Line bulb 
 *
 */
DOM.prototype.showLineBulb = function(position, color, size) {
  Utils.setElementAttributes(this.elements.lineBulb, {
    cx: position.x,
    cy: position.y,
    r: size,
    fill: color
  });
};

DOM.prototype.hideLineBulb = function() {
  Utils.setElementAttributes(this.elements.lineBulb, {
    r: 0
  });
};


/**
 * Render
 *
 */
DOM.prototype.renderGroups = function(config) {
  //
  // Group Attribute

  //
  //
  var groups = [];
  switch(config.settings.type) {
    case 'bar':
    case 'line': {

      //
      //
      var offsetX = (config.positions.padding.x - config.settings.fontSize) - config.settings.strokeWidth;
      var offsetY = config.settings.fontSize;

      //
      //
      var g0 = Draw.element('g', {
        transform: 'translate(' + offsetX + ', ' + offsetY + ')'
      });
      var g1 = Draw.element('g', {
        transform: 'translate(' + offsetX + ', ' + (+offsetY + 20) + ')'
      });
      var g2 = Draw.element('g', {
        transform: 'translate(' + config.settings.fontSize + ', ' + offsetY + ')'
      });

      //
      //
      Utils.appendChildren(g0, this.elements.grid);
      Utils.appendChildren(g0, this.elements.dataObjects);
      Utils.appendChild(g0, this.elements.lineBulb);
      Utils.appendChildren(g1, this.elements.axisLabels.x);
      Utils.appendChildren(g2, this.elements.axisLabels.y);
      Utils.appendChildren(g1, this.elements.seriesLabels);

      //
      //
      groups.push(g0, g1, g2);
      break;
    }
    case 'pie':
    case 'doughnut': {

      //
      //
      var offsetX = config.positions.padding.x/2;
      var offsetY = config.positions.padding.y/2;

      var offsetTextX = (config.positions.padding.x -
        config.settings.fontSize) - config.settings.strokeWidth;
      var offsetTextY = config.settings.fontSize;

      //
      //
      var g0 = Draw.element('g', {
        transform: 'translate(' + offsetX + ', ' + offsetY + ')'
      });
      var g1 = Draw.element('g', {
        transform: 'translate(' + 0 + ', ' + 
          ((config.positions.size.y + config.positions.padding.y) -
            config.settings.fontSize/2) + ')'
      });

      //
      //
      Utils.appendChildren(g0, this.elements.dataObjects);
      Utils.appendChildren(g1, this.elements.seriesLabels);

      //
      //
      groups.push(g0, g1);
      break;
    }
    case 'dial': {

      //
      //
      var offsetX = config.positions.padding.x/2;
      var offsetY = config.positions.padding.y/2;

      //
      //
      var g0 = Draw.element('g', {
        transform: 'translate(' + offsetX + ', ' + offsetY + ')'
      });

      //
      //
      Utils.appendChildren(g0, this.elements.dataObjects);
      Utils.appendChildren(g0, this.elements.percentLabels);

      //
      //
      groups.push(g0);
      break;

    }
  }

  //
  // Push all groups
  groups.map(function(group) {
    this.elements.groups.push(group);
  }, this);

};

DOM.prototype.render = function(config) {

  //
  // Initialize
  this.renderGroups(config);

  // Add to svg
  Utils.appendChildren(this.elements.svg, this.elements.defs);
  Utils.appendChildren(this.elements.svg, this.elements.groups);
};

module.exports = DOM;