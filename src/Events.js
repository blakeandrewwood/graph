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
  var tooltipText = document.getElementById(tooltipId + '-text');
  if(!tooltip) {
    this.createTooltip(container, tooltipId, fontFamily);
  }
  var object = {
    container: container,
    svg: svg,
    tooltipId: tooltipId,
    tooltip: tooltip,
    tooltipText: tooltipText,
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
  var d = application.labels.positions.column.length - 1;
  // Percent between two nodes
  var p = nx/(application.size.width/d);
  // Index
  var index = Math.floor(p);
  var nums = [application.points[i][index], application.points[i][index + 1]];
  var number = Math.floor(((nums[1] - nums[0]) * (p % 1)) + nums[0]);
  var textFinal = application.labels.prefix + (number.toString()) + application.labels.suffix;
  if(!isNaN(number)) {
    this.updateTooltip(svg, x, y, color, textFinal);
  }
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
  var textFinal = application.labels.prefix + (number.toString()) + application.labels.suffix;
  if(!isNaN(number)) {
    this.updateTooltip(svg, x, y, color, textFinal);
  }
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
  var textFinal = application.labels.prefix + (number.toString()) + application.labels.suffix;
  if(!isNaN(number)) {
    this.updateTooltip(svg, x, y, color, textFinal);
  }
};

Events.prototype.createTooltip = function(container, id, fontFamily) {
  var tooltip = Render.tooltip(id, fontFamily);
  Utils.appendChild(container, tooltip);
};

Events.prototype.updateTooltip = function(svg, x, y, color, value) {
  Utils.showElement(svg.tooltip);
  svg.tooltip.style.background = color;
  svg.tooltipText.innerHTML = value;
  Utils.setDivPosition(svg.tooltip, x + 10, y + 10);
};

Events.prototype.onMouseOut = function(evt, application) {
  var svg = this.getSvg(application.containerId);
  if(svg.tooltip) {
    Utils.hideElement(svg.tooltip);
  }
};

module.exports = Events;
