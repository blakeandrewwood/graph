'use strict';
var Math = require('../Math');
var Utils = require('../Utils');
var Draw = require('../Draw'); 
var Render = require('./Render'); 
var Defs = require('./Defs'); 

function Dial() {}

Dial.calculate = function(config) {
  var positionSeries = [];
  var percentage = Math.getPercentages(config.data.series); 
  var degrees = Math.getDegrees(percentage, 260); 
  return degrees;
};

Dial.createDialAttribute = function(config) {
  var x1 = Math.calculateAngleX(config.center.x, config.radius, 0);
  var y1 = Math.calculateAngleY(config.center.y, config.radius, 0);
  var x2 = Math.calculateAngleX(config.center.x, config.radius, 180);
  var y2 = Math.calculateAngleY(config.center.y, config.radius, 180);
  var x3 = Math.calculateAngleX(config.center.x, config.radius, 0);
  var y3 = Math.calculateAngleY(config.center.y, config.radius, 0);
  var vectors = [
    {type: 'M', values: [config.center.x, config.center.y]},
    {type: '',  values: [x1, y1]},
    {type: 'A', values: [config.radius, config.radius, 0, 0, 1]},
    {type: '',  values: [x2, y2]},
    {type: 'A', values: [config.radius, config.radius, 0, 0, 1]},
    {type: '',  values: [x3, y3]},
    {type: 'Z',  values: []},
  ];
  var attributes = {
    d: Utils.buildPathString(vectors),
    fill: config.color 
  };
  return attributes;
};

Dial.createDashAttributes = function(config) {
  var dashRadius = config.radius + 15;
  var dashAttributes = [];
  for(var i = 0; i < 260; i += 20) {
    var opacity = ((i / 260) >= config.percentage) ? 0.2 : 1.0;
    var x = Math.calculateAngleX(config.center.x, dashRadius, i - config.rotation);
    var y = Math.calculateAngleY(config.center.y, dashRadius, i - config.rotation);
    var attributes = {
      transform: 'translate(' + x + ', ' + y + ') rotate(' + (i - 120) + ', 0, 0)',
      fill: config.color,
      opacity: opacity
    };
    var scale = config.radius/50;
    var vectors = [
      {type: 'M', values: [ 0.0*scale,   0.0*scale]},
      {type: '', values:  [-2.6*scale,   0.0*scale]},
      {type: '', values:  [-3.8*scale, -20.0*scale]},
      {type: '', values:  [ 3.8*scale, -20.0*scale]},
      {type: '', values:  [ 2.6*scale,   0.0*scale]},
      {type: 'Z'},
    ];
    attributes.d = Utils.buildPathString(vectors);
    dashAttributes.push(attributes);
  }
  return dashAttributes;
};

Dial.createDotAttributes = function(config) {
  var dotRadius = config.radius / 8;
  var dotRadiusPos = config.radius - (dotRadius*2.5);
  var degree = (config.degree) - 220;
  var center = {
    x: Math.calculateAngleX(config.center.x, dotRadiusPos, degree),
    y: Math.calculateAngleY(config.center.y, dotRadiusPos, degree)
  }
  var attribute = this.createDialAttribute({
    center: center,
    radius: dotRadius,
    color: config.color 
  });
  return attribute;
};

Dial.create = function(config) {
  var center = {
    x: config.positions.size.x/2,
    y: config.positions.size.y/2
  };
  var radius = config.positions.size.y/3.2;
  var rotation = -150;
  var percentage = Math.getPercentages(config.data.series); 
  var attributes = [];
  var dashAttributes = this.createDashAttributes({
    center: center,
    rotation: rotation,
    radius: radius,
    percentage: percentage,
    color: config.settings.colors[0]
  });
  var dialAttributes = this.createDialAttribute({
    center: center,
    radius: radius,
    color: config.settings.colors[0]
  });
  var dotAttributes = this.createDotAttributes({
    center: center,
    radius: radius,
    degree: config.positions.series[0],
    color: '#fff'
  });

  //
  // Container
  var container = {
    defs: [],
    elements: []
  };

  //
  // Shadow
  container.defs = Defs.createShadow();

  //
  // Elements 
  var dial = [];
  Render.renderElements([dialAttributes], dial, 'path', Draw.element);
  var dash = [];
  Render.renderElements(dashAttributes, dash, 'path', Draw.element);
  var dot = [];
  Render.renderElements([dotAttributes], dot, 'path', Draw.element);
  var group = Draw.element('g', {
    filter: 'url(#shadow)'
  });
  Utils.appendChildren(group, dial);
  Utils.appendChildren(group, dash);
  Utils.appendChildren(group, dot);
  container.elements.push(group);

  //
  // Return 
  return container;
};

module.exports = Dial;