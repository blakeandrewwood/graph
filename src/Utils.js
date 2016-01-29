'use strict';

function Utils() {}

Utils.setElementAttributes = function(element, attributes, format) {
  for(var attribute in attributes) {
    var attr = attribute;
    if(!format) {
      attr = attribute.replace(/[A-Z]/g, function(v) {
        return '-' + v.toLowerCase();
      });
    }
    element.setAttribute(attr, attributes[attribute]);
  }
};

Utils.styleToString = function(attributes) {
  var string = '';
  for(var attribute in attributes) {
    var attr = attribute.replace(/[A-Z]/g, function(v) {
      return '-' + v.toLowerCase();
    });
    string += (attr + ':' + attributes[attribute] + ';');
  }
  return string;
};

Utils.getElementOffset = function(element) {
  var box = element.getBoundingClientRect();
  var body = document.body;
  var docElement = document.documentElement;
  var scrollTop = window.pageYOffset || docElement.scrollTop || body.scrollTop;
  var scrollLeft = window.pageXOffset || docElement.scrollLeft || body.scrollLeft;
  var clientTop = docElement.clientTop || body.clientTop || Math.abs(body.getBoundingClientRect().top) || 0;
  var clientLeft = docElement.clientLeft || body.clientLeft || Math.abs(body.getBoundingClientRect().left) || 0;
  var top = box.top + scrollTop - clientTop;
  var left = box.left + scrollLeft - clientLeft;
  return { top: Math.round(top), left: Math.round(left) }
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
