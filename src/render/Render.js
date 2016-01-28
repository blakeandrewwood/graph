'use strict';

function Render() {}

Render.renderElements = function(attributes, elements, drawType, drawFunc) {
  this.removeElements(elements);
  var size = attributes.length;
  attributes.forEach(function(attribute, index) {
    var element = drawFunc(drawType, attribute);
    elements.push(element);
  });
};

Render.removeElements = function(elements) {
  elements.map(function(element) {
    element.remove();
  });
  elements.splice(0, elements.length);
};


module.exports = Render;