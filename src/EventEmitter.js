'use strict';
var Utils = require('./Utils'); 
var Draw = require('./Draw'); 
var Render = require('./render/Render'); 

function EventEmitter(application) {
  this.application = application;
}

EventEmitter.prototype.getLineSet = function(index) {
  return this.application.data.series[index];
};

EventEmitter.prototype.getLinePointPosition = function(index, i) {
  return {
    x: this.application.positions.axis.x[i],
    y: this.application.positions.series[index][i]
  }
};

EventEmitter.prototype.showLineBulb = function(position, color) {
  var size = this.application.settings.strokeWidth * 1.1;
  this.application.DOM.showLineBulb(position, color, size);
};

EventEmitter.prototype.hideLineBulb = function(position, color) {
  this.application.DOM.hideLineBulb();
};

EventEmitter.prototype.getTooltip = function() {
  return this.application.DOM.elements.tooltip;
};

EventEmitter.prototype.hideTooltip = function(tooltip) {
  var tooltip = this.getTooltip();
  var style = Utils.styleToString({
    display: 'none'
  });
  Utils.setElementAttributes(tooltip, {
    style: style
  });
};

EventEmitter.prototype.getSeriesLabel = function(index) {
  return this.application.data.seriesLabels[index];
};

EventEmitter.prototype.updateTooltip = function(config) {
  var tooltip = this.getTooltip();
  var style = Utils.styleToString({
    position: 'absolute',
    left: config.x + 'px',
    top: config.y + 'px',
    background: config.color,
    padding: '0px 10px',
    pointerEvents: 'none',
    fontSize: '12px',
    fontFamily: 'Open Sans',
    color: '#fff'
  });
  Utils.setElementAttributes(tooltip, {
    style: style
  });
  tooltip.children[0].innerHTML = config.text;
  tooltip.children[1].innerHTML = (config.seriesLabel) ? config.seriesLabel : '';
};


EventEmitter.prototype.getInfo = function(evt) {
  // Svg offset
  var svgOffset = Utils.getElementOffset(this.application.DOM.elements.svg);
  // Offset
  var offsetX = (this.application.positions.padding.x - this.application.settings.fontSize) - this.application.settings.strokeWidth;
  var offsetY = this.application.settings.fontSize;
  // Make calculations
  var padding = this.application.positions.padding;
  var x = (evt.clientX - (svgOffset.left - 20));
  var y = (evt.clientY - (svgOffset.top - 20));
  // Calculate difference
  var nx = (evt.clientX - svgOffset.left) - (offsetX);
  var ny = (evt.clientY - svgOffset.top) - (offsetY); 
  // Percent between two nodes
  var d = this.application.data.axisLabels.x.length - 1;
  var p = nx/(this.application.positions.size.x/d);
  // Index
  var i = Math.round(p);
  return {
    x: x,
    y: y,
    i: i
  }
};

EventEmitter.prototype.mousemoveLine = function(evt) {
  var element = evt.target;
  var index = element.getAttribute('data-series-index');
  var color = element.getAttribute('data-color');
  var info = this.getInfo(evt);
  var set = this.getLineSet(index);
  var px = set[info.i];
  var position = this.getLinePointPosition(index, info.i);
  this.showLineBulb(position, color);
  this.updateTooltip({
    x: info.x,
    y: info.y,
    color: color,
    text: px,
    seriesLabel: this.getSeriesLabel(index)
  });
};

EventEmitter.prototype.mouseoutLine = function(evt) {
  this.hideLineBulb();
};

EventEmitter.prototype.mousemoveBar = function(evt) {
  var element = evt.target;

  var i = element.getAttribute('data-index-i');
  var k = element.getAttribute('data-index-k');
  var j = element.getAttribute('data-index-j');
  var color = element.getAttribute('data-color');

  var info = this.getInfo(evt);

  var point;
  if(typeof this.application.data.series[i][j] === 'object') {
    point = this.application.data.series[i][j][k];
  } else {
    point = this.application.data.series[i][j];
  }

  this.updateTooltip({
    x: info.x,
    y: info.y,
    color: color,
    text: point,
    seriesLabel: this.getSeriesLabel(j)
  });
};

EventEmitter.prototype.mousemovePie = function(evt) {
  var element = evt.target;
  var index = element.getAttribute('data-series-index');
  var color = element.getAttribute('data-color');
  var info = this.getInfo(evt);
  var point = this.application.data.series[index][0];

  this.updateTooltip({
    x: info.x,
    y: info.y,
    color: color,
    text: point,
    seriesLabel: this.getSeriesLabel(index)
  });
};

EventEmitter.prototype.mousemove = function(evt) {
  switch(this.application.settings.type) {
    case 'line':
      this.mousemoveLine(evt);
      break;
    case 'bar':
      this.mousemoveBar(evt);
      break;
    case 'doughnut':
    case 'pie':
      this.mousemovePie(evt);
      break;
  }
};

EventEmitter.prototype.mouseout = function(evt) {
  this.hideTooltip();
  switch(this.application.settings.type) {
    case 'line':
      this.mouseoutLine(evt);
      break;
  }
};

module.exports = EventEmitter;