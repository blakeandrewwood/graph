'use strict';

function Utils() {}

Utils.setElementAttributes = function(element, attributes) {
  for(var attribute in attributes) {
    var attr = attribute.replace(/[A-Z]/g, function(v) {
      return '-' + v.toLowerCase();
    });
    element.setAttribute(attr, attributes[attribute]);
  }
};

Utils.appendChild = function(element, child) {
  element.appendChild(child);
};

Utils.appendChildren = function(element, children) {
  children.map(function(child) {
    element.appendChild(child);
  });
};

Utils.buildPathString = function(vectors) {
  var d = '';
  vectors.forEach(function(vector, index, array) {
    d += vector.type;
    if(vector.values) {
      vector.values.map(function(value) {
        d += value + ' ';
      });
    }
  });
  return d.trim();
};

module.exports = Utils;
