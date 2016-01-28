'use strict';
var Utils = require('./Utils');

function Draw() {}

Draw.element = function(tag, attributes) {
  var element = document.createElementNS('http://www.w3.org/2000/svg', tag);
  Utils.setElementAttributes(element, attributes);
  return element;
};

module.exports = Draw;
