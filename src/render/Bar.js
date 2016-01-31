'use strict';
var Math = require('../Math');
var Utils = require('../Utils');
var Draw = require('../Draw'); 
var Render = require('./Render'); 

function Bar() {}

Bar.calculatePoint = function(config) {
  var p;
  if(config.point > 0) {
    //
    // Calculate normalized y
    p = (config.orientation === 'vertical') 
    ? Math.round(Math.calculateY(config.point, config.max, config.size.y))
    : Math.round(Math.calculateX(config.point, config.max, config.size.x));
    // If greater than 10% of max, reduce the height for round linecap
    // top to meet exact point
    if((config.point / config.max) > 0.1) {
      p = p + (config.strokeWidth / 2);
    }
  } else {
    //
    //
    p = (config.orientation === 'vertical')
    ? Math.calculateY(0, config.max, config.size.y)
    : Math.calculateX(0, config.max, config.size.y);
  }
  return p;
}

Bar.calculate = function(config) {
  var positionSeries = [];
  config.data.series.forEach(function(set, i) {
    var positionSet = [];
    set.forEach(function(point, j) {
      //
      // [[0, 1], 0, 1, 2]
      if(typeof point.length === 'number') {
        var pointSet = [];
        point.map(function(subPoint) {
          //
          // Calculate
          var p = this.calculatePoint({
            point: subPoint,
            max: config.data.max,
            strokeWidth: config.settings.strokeWidth,
            size: config.positions.size,
            orientation: config.settings.orientation 
          });
          pointSet.push(p);

        }, this);
        positionSet.push(pointSet);
      } 
      //
      // [0, 1, 0, 1, 2]
      else {
        //
        // Calculate
        var p = this.calculatePoint({
          point: point,
          max: config.data.max,
          strokeWidth: config.settings.strokeWidth,
          size: config.positions.size,
          orientation: config.settings.orientation 
        });
        positionSet.push(p);
      }
    }, this);
    positionSeries.push(positionSet);
  }, this);
  return positionSeries;
};

Bar.createAttribute = function(config, x, y, index, j, k, color, stacked, setLength) {

  if(config.settings.orientation === 'vertical') {
    var y1 = Math.calculateY(0, config.data.max, config.positions.size.y);
    var y2 = y;
    var vectors = [
      {type: 'M', values: [x, y1]},
      {type: '',  values: [x, y2]}
    ];
  } else {
    var y1 = Math.calculateX(0, config.data.max, config.positions.size.x);
    var y2 = y;
    var vectors = [
      {type: 'M', values: [y1, x]},
      {type: '',  values: [y2, x]}
    ];
  }

  var d = Utils.buildPathString(vectors);
  var attribute = {
    d: d,
    stroke: color,
    strokeWidth: config.settings.strokeWidth,
    strokeLinecap: 'round',
    dataPoint: y2,
    dataIndexI: index,
    dataIndexJ: j,
    dataIndexK: k,
    dataColor: color
  };
  return attribute;
}

Bar.calculateX = function(config, index, stacked, j, setLength) {
  var x;
  var strokeWidth = config.settings.strokeWidth; 
  var gutter = -(strokeWidth / 4);
  var offset = ((strokeWidth + gutter) * (setLength - 1)) / 2;
  var t = (config.settings.orientation === 'vertical') 
  ? config.positions.axis.x[index]
  : config.positions.axis.y[index];
  x = t + (j * (strokeWidth + gutter)) - offset;
  return x;
};

Bar.create = function(config) {
  var attributes = [];
  var shadowAttributes = [];
  config.positions.series.forEach(function(set, i) {
    var colorIndex = 0;
    set.forEach(function(y, j) {
      //
      // [[0, 1], 0, 1, 2]
      if(typeof y.length === 'number') {
        var subAttributes = [];
        var shadowSubAttributes = [];
        y.forEach(function(y1, k) {

          var xN = this.calculateX(config, i, false, j, set.length);
          var attributeN = this.createAttribute(
            config,
            xN,
            y1,
            i, j, k,
            config.settings.colors[colorIndex],
            true
          );
          subAttributes.push(attributeN);

          var xS;
          if(config.settings.orientation === 'vertical') {
            xS = xN - config.settings.strokeWidth/3;
          } else {
            xS = xN;
            y1 += config.settings.strokeWidth/3;
          }

          var attributeS = this.createAttribute(
            config,
            xS,
            y1,
            i, j, k,
            'rgba(0, 0, 0, 0.2)',
            true
          );
          shadowSubAttributes.push(attributeS);

          colorIndex++;

        }, this);

        //
        // Sort based on orientation
        if(config.settings.orientation === 'vertical') {
          subAttributes.sort(Math.sortByPointAsc);
          shadowSubAttributes.sort(Math.sortByPointAsc);
        } else {
          subAttributes.sort(Math.sortByPointDesc);
          shadowSubAttributes.sort(Math.sortByPointDesc);
        }

        // Push all
        subAttributes.map(function(attribute) {
          attributes.push(attribute);
        });

        // Push all
        shadowSubAttributes.map(function(attribute) {
          shadowAttributes.push(attribute);
        });
      }
      //
      // [0, 1, 0, 1, 2]
      else {

        //
        // Normal
        var xN = this.calculateX(config, i, false, j, set.length);
        var attributeN = this.createAttribute(
          config,
          xN,
          y,
          i, j, null,
          config.settings.colors[colorIndex],
          false,
          set.length
        );
        attributes.push(attributeN);

        var xS = xN - config.settings.strokeWidth/3;
        var attributeS = this.createAttribute(
          config,
          xS,
          y,
          i, j, null,
          'rgba(0, 0, 0, 0.2)',
          false,
          set.length
        );
        shadowAttributes.push(attributeS);

        //
        //
        colorIndex++;
      }
    }, this);
  }, this);

  //
  // Container
  var container = {
    defs: [],
    elements: []
  };

  //
  // Elements
  var bar = Draw.element('g', {});
  var tempA = [];
  var tempB = [];
  Render.renderElements(attributes, tempA, 'path', Draw.element, config.EventEmitter);
  Render.renderElements(shadowAttributes, tempB, 'path', Draw.element);

  //
  // Reorder
  var bars = [];
  tempA.forEach(function(element, index) {
    bars.push(tempB[index]);
    bars.push(element);
  });

  Utils.appendChildren(bar, bars);
  container.elements.push(bar);

  //
  // Return
  return container;
};

module.exports = Bar;