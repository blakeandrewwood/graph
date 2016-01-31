'use strict';
var Math = require('../Math');
var Utils = require('../Utils');
var Draw = require('../Draw'); 

function Defs() {}

Defs.createClipPath = function(shape) {
  var defs = {
    parent: {
      id: 'clip'
    },
    child: shape
  };
  return defs;
};

Defs.createShadow = function() {
  var defs = Draw.element('defs', {});
  var filter = Draw.element('filter', {
    id: 'shadow',
    height: '180%'
  });
  var feGaussianBlur = Draw.element('feGaussianBlur', {
    in: 'SourceAlpha',
    stdDeviation: '12'
  }, true);
  var feOffset = Draw.element('feOffset', {
    dx: '0',
    dy: '0',
    result: 'offsetBlur'
  }, true);
  var feComponentTransfer = Draw.element('feComponentTransfer', {});
  var feFuncA = Draw.element('feFuncA', {
    type: 'linear',
    slope: '0.3'
  });
  var feMerge = Draw.element('feMerge', {});
  var feMergeNode1 = Draw.element('feMergeNode', {});
  var feMergeNode2 = Draw.element('feMergeNode', {
    in: 'SourceGraphic'
  });
  Utils.appendChild(defs, filter);
  Utils.appendChild(filter, feGaussianBlur);
  Utils.appendChild(filter, feOffset);
  Utils.appendChild(filter, feComponentTransfer);
  Utils.appendChild(feComponentTransfer, feFuncA);
  Utils.appendChild(filter, feMerge);
  Utils.appendChild(feMerge, feMergeNode1);
  Utils.appendChild(feMerge, feMergeNode2);
  return defs;
};

module.exports = Defs;
