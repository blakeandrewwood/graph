'use strict';
var Utils = require('../Utils'); 
var Draw = require('../Draw'); 
var Render = require('./Render'); 

function Tooltip() {}

Tooltip.create = function(config) {
  //
  // Container
  var container = {
    defs: [],
    elements: []
  };

  //
  // Elements
  var div = document.createElement('div');
  var style = Utils.styleToString({
    position: 'absolute',
    left: 0,
    right: 0,
    padding: '10px'
  });
  Utils.setElementAttributes(div, {
    style: style
  });
  var p0 = document.createElement('p');
  var p1 = document.createElement('p');
  div.appendChild(p0);
  div.appendChild(p1);
  container.elements.push(div);

  //
  // Return
  return container;
};

module.exports = Tooltip;