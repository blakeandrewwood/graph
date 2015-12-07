"use strict";
var Utils = require('./Utils');

function Draw() {}

/**
 * Svg Basics
 *
 */
Draw.prototype.text = function(attributes) {
  var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  Utils.setElementAttributes(text, attributes);
  return text;
};

Draw.prototype.tspan = function(attributes) {
  var tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
  Utils.setElementAttributes(tspan, attributes);
  return tspan;
};

Draw.prototype.line = function(attributes) {
  var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  Utils.setElementAttributes(line, attributes);
  return line;
};

Draw.prototype.circle = function(attributes) {
  var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  Utils.setElementAttributes(circle, attributes);
  return circle;
};

Draw.prototype.rect = function(attributes) {
  var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  Utils.setElementAttributes(rect, attributes);
  return rect;
};

Draw.prototype.path = function(attributes) {
  var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  Utils.setElementAttributes(path, attributes);
  return path;
};

Draw.prototype.svg = function(attributes) {
  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  Utils.setElementAttributes(svg, attributes);
  return svg;
};

Draw.prototype.group = function(attributes, children) {
  var g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  Utils.setElementAttributes(g, attributes);
  Utils.appendChildren(g, children);
  return g;
};

/**
 * Element Basics
 *
 */
Draw.prototype.div = function(attributes) {
  var div = document.createElement('div');
  Utils.setElementAttributes(div, attributes);
  return div;
};

Draw.prototype.p = function(attributes) {
  var p = document.createElement('p');
  Utils.setElementAttributes(p, attributes);
  return p;
};

/**
 * Assets 
 *
 */
Draw.prototype.dash = function(attributes) {
  var vectors = [
    {type: 'M', values: [0, 0]},
    {type: '', values: [-2.6, 0]},
    {type: '', values: [-3.8, -20]},
    {type: '', values: [3.8, -20]},
    {type: '', values: [2.6, 0]},
    {type: 'Z'},
  ];
  attributes.d = Utils.buildPathString(vectors);
  var dash = this.path(attributes);
  return dash;
};

Draw.prototype.shadow = function(attributes, id, stdDeviation, group) {
  var object = {
    def: null,
    element: null,
  }
  object.def = this.filterShadow(id, stdDeviation);
  var shadowGroup = group.cloneNode(true);
  attributes.filter = 'url(#' + id + ')';
  Utils.setElementAttributes(shadowGroup, attributes);
  object.element = shadowGroup;
  return object;
};

/**
 * Defs 
 *
 */
Draw.prototype.defs = function() {
  var defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
  return defs;
};

Draw.prototype.clipPath = function(id, path) {
  var clipPath = document.createElementNS('http://www.w3.org/2000/svg', 'clipPath');
  Utils.setElementAttributes(clipPath, {id: id});
  Utils.appendChild(clipPath, path);
  return clipPath;
};

Draw.prototype.filterShadow = function(id, stdDeviation) {
  var filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
  var feGaussianBlur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
  var feBlend = document.createElementNS('http://www.w3.org/2000/svg', 'feBlend');
  Utils.setElementAttributes(filter, {id: id, width: '200%', height: '200%'});
  Utils.setElementAttributes(feGaussianBlur, {in: 'SourceAlpha', result: 'blurOut'});
  feGaussianBlur.setAttribute('stdDeviation', stdDeviation);
  Utils.setElementAttributes(feBlend, {in: 'blurOut', mode: 'normal'});
  Utils.appendChild(filter, feGaussianBlur);
  Utils.appendChild(filter, feBlend);
  return filter;
};


module.exports = new Draw();
