'use strict';
var EventEmitter = require('../EventEmitter'); 

function Render() {}

Render.renderElements = function(attributes, elements, drawType, drawFunc, EventEmitter) {
  var size = attributes.length;
  attributes.forEach(function(attribute, index) {
    var element = drawFunc(drawType, attribute);

    //
    // Events
    if(EventEmitter) {
      element.addEventListener('mousemove', function(e) {
        EventEmitter.mousemove(e);
      });
      element.addEventListener('mouseout', function(e) {
        EventEmitter.mouseout(e);
      });
    }

    elements.push(element);
  });
};

Render.removeElements = function(elements) {
  elements.map(function(element) {
    element.remove();
  });
  elements.splice(0, elements.length);
};

Render.renderClipPath = function(attributes, elements, drawFunc) {
  this.removeElements(elements);
  var size = attributes.length;
  attributes.forEach(function(attribute, index) {
    var defs = drawFunc('defs', {});
    var clipPath = drawFunc('clipPath', attribute.parent);
    var path = drawFunc('path', attribute.child);
    clipPath.appendChild(path);
    defs.appendChild(clipPath);
    elements.push(defs);
  });
};


module.exports = Render;