"use strict";
var Utils = require('./Utils');
var Draw = require('./Draw');
var Render = require('./Render');
var Events = require('./Events');

var Application = function(application) {
  window[application] = new Graph(application);
  return window[application];
};

function Graph(application) {
  this.application = application;
  // Parameters
  this.type = 'line';
  this.size = { width: 400, height: 400 };
  this.padding = { x: 100, y: 120 };
  this.range = { min: 0, max: 0 };
  this.points = [];
  this.labels = {
    row: [],
    column: [],
    series: [],
    increment: 10,
    prefix: '',
    suffix: ''
  }
  this.rowPositions = [];
  this.columnPositions = [];
  this.font = {
    family: 'monospace',
    size: 12
  }
  // Pie
  this.percentages = [];
  // Options
  this.colors = ['#2388F2', '#F65237', '#0DEFA5', '#9B7CF3'];
  this.horizontal = false;
  this.shadow = true;
  this.prefix = '';
  this.containerId;
  this.container;
  this.showGraphLines = true;
  this.svg;

  this.Events = new Events();
}

/**
 * Calculation 
 *
 */
Graph.prototype.makeLineBarCalculations = function() {
  this.widthOffset = this.padding.x - 20;
  this.heightOffset = 20;
  this.range = Utils.getMinMax(this.points);
  this.labels.row = Utils.getPointIncrements(
    this.range.max,
    this.labels.increment
  );
};

Graph.prototype.makePieDoughnutCalculations = function() {
  this.range = Utils.getMinMax(this.points);
  this.percentages = Utils.getSetPercentages(this.points);
  this.degrees = Utils.getDegrees(this.percentages, 360);
};

Graph.prototype.makeDialCalculations = function() {
  this.range = Utils.getMinMax(this.points);
  this.percentages = Utils.getPercentages(this.points);
  this.degrees = Utils.getDegrees(this.percentages, 260);
};

/**
 * Build
 *
 */
Graph.prototype.lineBuildSvg = function() {
  // Calculation
  this.makeLineBarCalculations();
  this.rowPositions = Utils.calculateRowPositions(
    this.labels.row,
    this.size.height
  );
  this.columnPositions = Utils.calculateColumnPositions(
    this.labels.column,
    this.size.width
  );

  // Render
  var graphLines = Render.graphLines(
    this.containerId,
    this.columnPositions,
    this.rowPositions,
    this.size,
    this.showGraphLines
  );
  var columnLabelText = Render.columnLabelText(
    this.containerId,
    this.columnPositions,
    this.labels.column,
    '',
    '',
    this.font,
    this.size
  );
  var rowLabelText = Render.rowLabelText(
    this.containerId,
    this.rowPositions,
    this.labels.row,
    this.labels.suffix,
    this.labels.prefix,
    this.font,
    this.size
  );
  var seriesLabelText = Render.seriesLabelText(
    this.containerId,
    this.labels.series,
    this.font,
    this.size,
    this.colors
  );
  var sets = Render.lineSets(
    this,
    this.containerId,
    this.columnPositions,
    this.labels.row[0],
    this.points,
    this.range,
    this.size,
    this.colors
  );

  // Group
  var children = [];

  children = Utils.buildOrUpdateGroupConcat(
    children,
    graphLines,
    this.containerId + '-group-0',
    this.widthOffset,
    this.heightOffset,
    Draw.group
  );
  children = Utils.buildOrUpdateGroupConcat(
    children,
    columnLabelText,
    this.containerId + '-group-1',
    this.widthOffset,
    this.heightOffset,
    Draw.group
  );
  children = Utils.buildOrUpdateGroupConcat(
    children,
    rowLabelText,
    this.containerId + '-group-2',
    0,
    this.heightOffset,
    Draw.group
  );
  children = Utils.buildOrUpdateGroupConcat(
    children,
    seriesLabelText,
    this.containerId + '-group-3',
    this.padding.x,
    this.padding.y,
    Draw.group
  );
  children = Utils.buildOrUpdateGroupConcat(
    children,
    sets,
    this.containerId + '-group-4',
    this.widthOffset,
    this.heightOffset,
    Draw.group
  );

  // Return
  this.svg = Render.svg(
    this.containerId,
    this.container,
    this.font.size,
    this.size,
    this.padding
  );

  // Add children
  if(children.length) {
    Utils.appendChildren(this.svg, children);
  }
};

Graph.prototype.barBuildSvg = function() {
  // Calculation
  this.makeLineBarCalculations();
  var columnLabels = this.labels.column;
  var rowLabels = this.labels.row;

  // Calculation Vertical
  if(this.horizontal) {
    columnLabels = this.labels.row;
    rowLabels = this.labels.column;
    this.labels.row.reverse();
  }

  this.rowPositions = Utils.calculateRowPositions(
    rowLabels,
    this.size.height
  );
  this.columnPositions = Utils.calculateColumnPositions(
    columnLabels,
    this.size.width
  );

  // Render
  var graphLines = Render.graphLines(
    this.containerId,
    this.columnPositions,
    this.rowPositions,
    this.size,
    this.showGraphLines
  );
  var columnLabelText = Render.columnLabelText(
    this.containerId,
    this.columnPositions,
    columnLabels,
    '',
    '',
    this.font,
    this.size
  );
  var rowLabelText = Render.rowLabelText(
    this.containerId,
    this.rowPositions,
    rowLabels,
    this.labels.suffix,
    this.labels.prefix,
    this.font,
    this.size
  );
  var seriesLabelText = Render.seriesLabelText(
    this.containerId,
    this.labels.series,
    this.font,
    this.size,
    this.colors
  );
  var sets = Render.barSets(
    this,
    this.containerId,
    this.columnPositions,
    this.rowPositions,
    this.labels.row,
    this.points,
    this.size,
    this.horizontal,
    this.colors,
    this.shadow
  );

  // Group
  var children = [];
  children = Utils.buildOrUpdateGroupConcat(
    children,
    graphLines,
    this.containerId + '-group-0',
    this.widthOffset,
    this.heightOffset,
    Draw.group
  );
  children = Utils.buildOrUpdateGroupConcat(
    children,
    columnLabelText,
    this.containerId + '-group-1',
    this.widthOffset,
    this.heightOffset,
    Draw.group
  );
  children = Utils.buildOrUpdateGroupConcat(
    children,
    rowLabelText,
    this.containerId + '-group-2',
    0,
    this.heightOffset,
    Draw.group
  );
  children = Utils.buildOrUpdateGroupConcat(
    children,
    seriesLabelText,
    this.containerId + '-group-3',
    this.padding.x,
    this.padding.y,
    Draw.group
  );
  children = Utils.buildOrUpdateGroupConcat(
    children,
    sets,
    this.containerId + '-group-4',
    this.widthOffset,
    this.heightOffset,
    Draw.group
  );

  // Return
  this.svg = Render.svg(
    this.containerId,
    this.container,
    this.font.size,
    this.size,
    this.padding
  );

  // Add children
  if(children.length) {
    Utils.appendChildren(this.svg, children);
  }
};

Graph.prototype.pieBuildSvg = function() {
  // Calculation
  this.makePieDoughnutCalculations();

  // Render
  var bottomLeftLabelText = Render.bottomLeftLabelText(
    this.containerId,
    this.labels.series,
    this.font,
    this.size,
    this.colors
  );
  var sets = Render.pieSets(
    this,
    this.containerId,
    this.degrees,
    this.size,
    this.colors,
    this.shadow
  );

  // Group
  var children = [];
  children = Utils.buildOrUpdateGroupConcat(
    children,
    bottomLeftLabelText,
    this.containerId + '-group-0',
    0,
    this.padding.y,
    Draw.group
  );
  children = Utils.buildOrUpdateGroupConcat(
    children,
    sets,
    this.containerId + '-group-1',
    this.padding.x/2,
    this.padding.y/2,
    Draw.group
  );

  // Return
  this.svg = Render.svg(
    this.containerId,
    this.container,
    this.font.size,
    this.size,
    this.padding
  );

  // Add children
  if(children.length) {
    Utils.appendChildren(this.svg, children);
  }
};

Graph.prototype.doughnutBuildSvg = function() {
  // Calculation
  this.makePieDoughnutCalculations();

  // Render
  var bottomLeftLabelText = Render.bottomLeftLabelText(
    this.containerId,
    this.labels.series,
    this.font,
    this.size,
    this.colors
  );
  var sets = Render.doughnutSets(
    this,
    this.containerId,
    this.degrees,
    this.size,
    this.colors,
    this.shadow
  );

  // Group
  var children = [];
  children = Utils.buildOrUpdateGroupConcat(
    children,
    bottomLeftLabelText,
    this.containerId + '-group-0',
    0,
    this.padding.y,
    Draw.group
  );
  children = Utils.buildOrUpdateGroupConcat(
    children,
    sets,
    this.containerId + '-group-1',
    this.padding.x/2,
    this.padding.y/2,
    Draw.group
  );

  // Return
  this.svg = Render.svg(
    this.containerId,
    this.container,
    this.font.size,
    this.size,
    this.padding
  );

  // Add children
  if(children.length) {
    Utils.appendChildren(this.svg, children);
  }
};

Graph.prototype.dialBuildSvg = function() {
  // Calculation
  this.makeDialCalculations();

  // Render
  /*
  */
  var centerLabelText = Render.centerLabelText(
    this.containerId,
    (this.percentages[0] * 100),
    this.font,
    this.size,
    '#fff'
  );
  var sets = Render.dialSets(
    this.containerId,
    this.degrees,
    this.percentages,
    this.size,
    this.colors,
    this.shadow
  );
  var bottomCenterLabelText = Render.bottomCenterLabelText(
    this.containerId,
    this.points[0][0] + '/' + this.points[0][1],
    this.font,
    this.size,
    '#000'
  );

  // Group
  var children = [];
  children = Utils.buildOrUpdateGroupConcat(
    children,
    sets,
    this.containerId + '-group-0',
    this.padding.x/2,
    this.padding.y/2,
    Draw.group
  );
  children = Utils.buildOrUpdateGroupConcat(
    children,
    centerLabelText,
    this.containerId + '-group-1',
    this.padding.x/2,
    this.padding.y/2,
    Draw.group
  );
  children = Utils.buildOrUpdateGroupConcat(
    children,
    bottomCenterLabelText,
    this.containerId + '-group-2',
    this.padding.x/2,
    this.padding.y,
    Draw.group
  );

  // Return
  this.svg = Render.svg(
    this.containerId,
    this.container,
    this.font.size,
    this.size,
    this.padding
  );

  // Add children
  if(children.length) {
    Utils.appendChildren(this.svg, children);
  }
};

/**
 * Main Render 
 *
 */
Graph.prototype.render = function() {
  switch(this.type) {
    case 'line':
      this.lineBuildSvg();
      break;
    case 'bar':
      this.barBuildSvg();
      break;
    case 'pie':
      this.pieBuildSvg();
      break;
    case 'doughnut':
      this.doughnutBuildSvg();
      break;
    case 'dial':
      this.dialBuildSvg();
      break;
  }
  Utils.appendChild(this.container, this.svg);
};

/**
 * Setters
 *
 */
Graph.prototype.setContainer = function(container) {
  this.containerId = container; 
  this.container = document.getElementById(container);
};

Graph.prototype.setType = function(type) {
  this.type = type;
};

Graph.prototype.setSize = function(width, height) {
  this.size.width = width;
  this.size.height = height;
};

Graph.prototype.setPadding = function(x, y) {
  this.padding = { x: x, y: y };
};

Graph.prototype.setLabels = function(labels) {
  this.labels.column = labels;
};

Graph.prototype.setSeriesLabels = function(labels) {
  this.labels.series = labels;
};

Graph.prototype.setPoints = function(points) {
  this.points = points;
};

Graph.prototype.setIncrement = function(increment) {
  this.labels.increment = increment;
};

Graph.prototype.setHorizontal = function(bool) {
  this.horizontal = bool;
};

Graph.prototype.setShadow = function(bool) {
  this.shadow = bool;
};

Graph.prototype.setColors= function(colors) {
  this.colors = colors;
};

Graph.prototype.setPrefix = function(prefix) {
  this.labels.prefix = prefix;
};

Graph.prototype.setSuffix = function(suffix) {
  this.labels.suffix = suffix;
};

Graph.prototype.setFontFamily = function(fontFamily) {
  this.font.family = fontFamily;
};

Graph.prototype.setFontSize = function(fontSize) {
  this.font.size = fontSize;
};

Graph.prototype.setGraphLines = function(bool) {
  this.showGraphLines = bool;
};

module.exports = Application;
