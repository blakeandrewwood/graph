"use strict";
var Draw = require('./Draw');
var Render = require('./Render');
var Utils = require('./Utils');

function Events() {}

Events.prototype.getSvg = function(containerId, fontFamily) {
  var container = document.getElementById(containerId);
  var svg = container.getElementsByTagName('svg')[0];
  var tooltipId = containerId + '-tooltip';
  var tooltip = document.getElementById(tooltipId);
  var tooltipTextLines = [
    document.getElementById(tooltipId + '-text-line-0'),
    document.getElementById(tooltipId + '-text-line-1')
  ]
  if(!tooltip) {
    this.createTooltip(container, tooltipId, fontFamily);
  }
  var object = {
    container: container,
    svg: svg,
    tooltipId: tooltipId,
    tooltip: tooltip,
    tooltipTextLines: tooltipTextLines,
  }
  return object;
};

Events.prototype.onMouseOverLine = function(evt, application, i, rowMax) {
  var svg = this.getSvg(application.containerId, application.font.family);
  var color = application.colors[i];
  // Get position
  var containerOffset = Utils.getElementOffset(svg.container);
  var svgOffset = Utils.getElementOffset(svg.svg);
  // Make calculations
  var padding = application.padding;
  var x = evt.clientX - containerOffset.left;
  var y = evt.clientY - containerOffset.top;
  // Calculate difference
  var nx = (evt.clientX - svgOffset.left) - (padding.x/2);
  var ny = (evt.clientY - svgOffset.top) - (padding.y/2); 
  var d = application.columnPositions.length - 1;
  // Percent between two nodes
  var p = nx/(application.size.width/d);
  // Index
  var index = Math.floor(p);
  var nums = [application.points[i][index], application.points[i][index + 1]];
  var number = Math.floor(((nums[1] - nums[0]) * (p % 1)) + nums[0]);

  // Build text
  var text = this.buildTextLines(application.labels, number, i);
  this.updateTooltip(svg, x, y, color, text);
};

Events.prototype.onMouseOverBar = function(evt, application, i, value) {
  var svg = this.getSvg(application.containerId, application.font.family);
  var color = application.colors[i];
  // Get position
  var containerOffset = Utils.getElementOffset(svg.container);
  var svgOffset = Utils.getElementOffset(svg.svg);
  // Make calculations
  var x = evt.clientX - containerOffset.left;
  var y = evt.clientY - containerOffset.top;
  // Render
  var number = value;

  // Build text
  var text = this.buildTextLines(application.labels, number, i);
  this.updateTooltip(svg, x, y, color, text);
};

Events.prototype.onMouseOverPie = function(evt, application, i) {
  var svg = this.getSvg(application.containerId, application.font.family);
  var color = application.colors[i];
  // Get position
  var containerOffset = Utils.getElementOffset(svg.container);
  var svgOffset = Utils.getElementOffset(svg.svg);
  // Make calculations
  var x = evt.clientX - containerOffset.left;
  var y = evt.clientY - containerOffset.top;
  var number = application.points[i];

  // Build text
  var text = this.buildTextLines(application.labels, number, i);
  this.updateTooltip(svg, x, y, color, text);
};

Events.prototype.buildTextLines = function(labels, value, index) {
  var lines = [];
  lines[0] = labels.prefix + (value.toString()) + labels.suffix;
  lines[1] = (labels.series.length) ? labels.series[index] : '';
  return lines;
};

Events.prototype.createTooltip = function(container, id, fontFamily) {
  var tooltip = Render.tooltip(id, fontFamily);
  Utils.appendChild(container, tooltip);
};

Events.prototype.updateTooltip = function(svg, x, y, color, textLines) {
  if(svg.tooltip) {
    for(var i in svg.tooltipTextLines) {
      svg.tooltipTextLines[i].innerHTML = textLines[i];
    }
    svg.tooltip.style.background = color;
    Utils.setDivPosition(svg.tooltip, x + 10, y + 10);
    Utils.showElement(svg.tooltip);
  }
};

Events.prototype.onMouseOut = function(evt, application) {
  var svg = this.getSvg(application.containerId);
  if(svg.tooltip) {
    Utils.hideElement(svg.tooltip);
  }
};

module.exports = Events;
