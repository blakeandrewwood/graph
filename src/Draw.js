'use strict';
var Utils = require('./Utils');

function Draw() {}

Draw.element = function(tag, attributes, format) {
  var element = document.createElementNS('http://www.w3.org/2000/svg', tag);
  Utils.setElementAttributes(element, attributes, format);
  return element;
};

module.exports = Draw;
