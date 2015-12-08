(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Graph"] = factory();
	else
		root["Graph"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Utils = __webpack_require__(1);
	var Draw = __webpack_require__(2);
	var Render = __webpack_require__(3);
	var Events = __webpack_require__(4);

	var Application = function(application) {
	  window[application] = new Graph(application);
	  return window[application];
	};

	function Graph(application) {
	  this.application = application;
	  // Parameters
	  this.type = 'line';
	  this.size = { width: 400, height: 400 };
	  this.padding = { x: 100, y: 120 };
	  this.range = { min: 0, max: 0 };
	  this.points = [];
	  this.labels = {
	    row: [],
	    column: [],
	    series: [],
	    increment: 10,
	    prefix: '',
	    suffix: ''
	  }
	  this.rowPositions = [];
	  this.columnPositions = [];
	  this.font = {
	    family: 'monospace',
	    size: 12
	  }
	  // Pie
	  this.percentages = [];
	  // Options
	  this.colors = ['#2388F2', '#F65237', '#0DEFA5', '#9B7CF3'];
	  this.horizontal = false;
	  this.shadow = true;
	  this.prefix = '';
	  this.containerId;
	  this.container;
	  this.showGraphLines = true;
	  this.svg;

	  this.Events = new Events();
	}

	/**
	 * Calculation 
	 *
	 */
	Graph.prototype.makeLineBarCalculations = function() {
	  this.range = Utils.getMinMax(this.points);
	  this.labels.row = Utils.getPointIncrements(
	    this.range.max,
	    this.labels.increment
	  );
	};

	Graph.prototype.makePieDoughnutCalculations = function() {
	  this.range = Utils.getMinMax(this.points);
	  this.percentages = Utils.getSetPercentages(this.points);
	  this.degrees = Utils.getDegrees(this.percentages, 360);
	};

	Graph.prototype.makeDialCalculations = function() {
	  this.range = Utils.getMinMax(this.points);
	  this.percentages = Utils.getPercentages(this.points);
	  this.degrees = Utils.getDegrees(this.percentages, 260);
	};

	/**
	 * Build
	 *
	 */
	Graph.prototype.lineBuildSvg = function() {
	  // Calculation
	  this.makeLineBarCalculations();
	  this.rowPositions = Utils.calculateRowPositions(
	    this.labels.row,
	    this.size.height
	  );
	  this.columnPositions = Utils.calculateColumnPositions(
	    this.labels.column,
	    this.size.width
	  );

	  // Render
	  var graphLines = Render.graphLines(
	    this.containerId,
	    this.columnPositions,
	    this.rowPositions,
	    this.size
	  );
	  var columnLabelText = Render.columnLabelText(
	    this.containerId,
	    this.columnPositions,
	    this.labels.column,
	    '',
	    '',
	    this.font,
	    this.size
	  );
	  var rowLabelText = Render.rowLabelText(
	    this.containerId,
	    this.rowPositions,
	    this.labels.row,
	    this.labels.suffix,
	    this.labels.prefix,
	    this.font,
	    this.size
	  );
	  var seriesLabelText = Render.seriesLabelText(
	    this.containerId,
	    this.labels.series,
	    this.font,
	    this.size,
	    this.colors
	  );
	  var sets = Render.lineSets(
	    this,
	    this.containerId,
	    this.columnPositions,
	    this.labels.row[0],
	    this.points,
	    this.range,
	    this.size,
	    this.colors
	  );

	  // Group
	  var children = [];
	  children = Utils.buildOrUpdateGroupConcat(
	    children,
	    graphLines,
	    this.containerId + '-group-0',
	    this.padding.x/2,
	    this.padding.y/2,
	    Draw.group
	  );
	  children = Utils.buildOrUpdateGroupConcat(
	    children,
	    columnLabelText,
	    this.containerId + '-group-1',
	    this.padding.x/2,
	    this.padding.y/2,
	    Draw.group
	  );
	  children = Utils.buildOrUpdateGroupConcat(
	    children,
	    rowLabelText,
	    this.containerId + '-group-2',
	    0,
	    this.padding.y/2,
	    Draw.group
	  );
	  children = Utils.buildOrUpdateGroupConcat(
	    children,
	    seriesLabelText,
	    this.containerId + '-group-3',
	    this.padding.x,
	    this.padding.y,
	    Draw.group
	  );
	  children = Utils.buildOrUpdateGroupConcat(
	    children,
	    sets,
	    this.containerId + '-group-4',
	    this.padding.x/2,
	    this.padding.y/2,
	    Draw.group
	  );

	  // Return
	  this.svg = Render.svg(
	    this.containerId,
	    this.container,
	    this.font.size,
	    this.size,
	    this.padding
	  );

	  // Add children
	  if(children.length) {
	    Utils.appendChildren(this.svg, children);
	  }
	};

	Graph.prototype.barBuildSvg = function() {
	  // Calculation
	  this.makeLineBarCalculations();
	  var columnLabels = this.labels.column;
	  var rowLabels = this.labels.row;

	  // Calculation Vertical
	  if(this.horizontal) {
	    columnLabels = this.labels.row;
	    rowLabels = this.labels.column;
	    this.labels.row.reverse();
	  }

	  this.rowPositions = Utils.calculateRowPositions(
	    rowLabels,
	    this.size.height
	  );
	  this.columnPositions = Utils.calculateColumnPositions(
	    columnLabels,
	    this.size.width
	  );

	  // Render
	  var graphLines = Render.graphLines(
	    this.containerId,
	    this.columnPositions,
	    this.rowPositions,
	    this.size
	  );
	  var columnLabelText = Render.columnLabelText(
	    this.containerId,
	    this.columnPositions,
	    columnLabels,
	    '',
	    '',
	    this.font,
	    this.size
	  );
	  var rowLabelText = Render.rowLabelText(
	    this.containerId,
	    this.rowPositions,
	    rowLabels,
	    this.labels.suffix,
	    this.labels.prefix,
	    this.font,
	    this.size
	  );
	  var seriesLabelText = Render.seriesLabelText(
	    this.containerId,
	    this.labels.series,
	    this.font,
	    this.size,
	    this.colors
	  );
	  var sets = Render.barSets(
	    this,
	    this.containerId,
	    this.columnPositions,
	    this.rowPositions,
	    this.labels.row,
	    this.points,
	    this.size,
	    this.horizontal,
	    this.colors,
	    this.shadow
	  );

	  // Group
	  var children = [];
	  children = Utils.buildOrUpdateGroupConcat(
	    children,
	    graphLines,
	    this.containerId + '-group-0',
	    this.padding.x/2,
	    this.padding.y/2,
	    Draw.group
	  );
	  children = Utils.buildOrUpdateGroupConcat(
	    children,
	    columnLabelText,
	    this.containerId + '-group-1',
	    this.padding.x/2,
	    this.padding.y/2,
	    Draw.group
	  );
	  children = Utils.buildOrUpdateGroupConcat(
	    children,
	    rowLabelText,
	    this.containerId + '-group-2',
	    0,
	    this.padding.y/2,
	    Draw.group
	  );
	  children = Utils.buildOrUpdateGroupConcat(
	    children,
	    seriesLabelText,
	    this.containerId + '-group-3',
	    this.padding.x,
	    this.padding.y,
	    Draw.group
	  );
	  children = Utils.buildOrUpdateGroupConcat(
	    children,
	    sets,
	    this.containerId + '-group-4',
	    this.padding.x/2,
	    this.padding.y/2,
	    Draw.group
	  );

	  // Return
	  this.svg = Render.svg(
	    this.containerId,
	    this.container,
	    this.font.size,
	    this.size,
	    this.padding
	  );

	  // Add children
	  if(children.length) {
	    Utils.appendChildren(this.svg, children);
	  }
	};

	Graph.prototype.pieBuildSvg = function() {
	  // Calculation
	  this.makePieDoughnutCalculations();

	  // Render
	  var bottomLeftLabelText = Render.bottomLeftLabelText(
	    this.containerId,
	    this.labels.column,
	    this.font,
	    this.size,
	    this.colors
	  );
	  var sets = Render.pieSets(
	    this,
	    this.containerId,
	    this.degrees,
	    this.size,
	    this.colors,
	    this.shadow
	  );

	  // Group
	  var children = [];
	  children = Utils.buildOrUpdateGroupConcat(
	    children,
	    bottomLeftLabelText,
	    this.containerId + '-group-0',
	    0,
	    this.padding.y,
	    Draw.group
	  );
	  children = Utils.buildOrUpdateGroupConcat(
	    children,
	    sets,
	    this.containerId + '-group-1',
	    this.padding.x/2,
	    this.padding.y/2,
	    Draw.group
	  );

	  // Return
	  this.svg = Render.svg(
	    this.containerId,
	    this.container,
	    this.font.size,
	    this.size,
	    this.padding
	  );

	  // Add children
	  if(children.length) {
	    Utils.appendChildren(this.svg, children);
	  }
	};

	Graph.prototype.doughnutBuildSvg = function() {
	  // Calculation
	  this.makePieDoughnutCalculations();

	  // Render
	  var bottomLeftLabelText = Render.bottomLeftLabelText(
	    this.containerId,
	    this.labels.column,
	    this.font,
	    this.size,
	    this.colors
	  );
	  var sets = Render.doughnutSets(
	    this,
	    this.containerId,
	    this.degrees,
	    this.size,
	    this.colors,
	    this.shadow
	  );

	  // Group
	  var children = [];
	  children = Utils.buildOrUpdateGroupConcat(
	    children,
	    bottomLeftLabelText,
	    this.containerId + '-group-0',
	    0,
	    this.padding.y,
	    Draw.group
	  );
	  children = Utils.buildOrUpdateGroupConcat(
	    children,
	    sets,
	    this.containerId + '-group-1',
	    this.padding.x/2,
	    this.padding.y/2,
	    Draw.group
	  );

	  // Return
	  this.svg = Render.svg(
	    this.containerId,
	    this.container,
	    this.font.size,
	    this.size,
	    this.padding
	  );

	  // Add children
	  if(children.length) {
	    Utils.appendChildren(this.svg, children);
	  }
	};

	Graph.prototype.dialBuildSvg = function() {
	  // Calculation
	  this.makeDialCalculations();

	  // Render
	  /*
	  */
	  var centerLabelText = Render.centerLabelText(
	    this.containerId,
	    (this.percentages[0] * 100),
	    this.font,
	    this.size,
	    '#fff'
	  );
	  var sets = Render.dialSets(
	    this.containerId,
	    this.degrees,
	    this.percentages,
	    this.size,
	    this.colors,
	    this.shadow
	  );
	  var bottomCenterLabelText = Render.bottomCenterLabelText(
	    this.containerId,
	    this.points[0][0] + '/' + this.points[0][1],
	    this.font,
	    this.size,
	    '#000'
	  );

	  // Group
	  var children = [];
	  children = Utils.buildOrUpdateGroupConcat(
	    children,
	    sets,
	    this.containerId + '-group-0',
	    this.padding.x/2,
	    this.padding.y/2,
	    Draw.group
	  );
	  children = Utils.buildOrUpdateGroupConcat(
	    children,
	    centerLabelText,
	    this.containerId + '-group-1',
	    this.padding.x/2,
	    this.padding.y/2,
	    Draw.group
	  );
	  children = Utils.buildOrUpdateGroupConcat(
	    children,
	    bottomCenterLabelText,
	    this.containerId + '-group-2',
	    this.padding.x/2,
	    this.padding.y,
	    Draw.group
	  );

	  // Return
	  this.svg = Render.svg(
	    this.containerId,
	    this.container,
	    this.font.size,
	    this.size,
	    this.padding
	  );

	  // Add children
	  if(children.length) {
	    Utils.appendChildren(this.svg, children);
	  }
	};

	/**
	 * Main Render 
	 *
	 */
	Graph.prototype.render = function() {
	  switch(this.type) {
	    case 'line':
	      this.lineBuildSvg();
	      break;
	    case 'bar':
	      this.barBuildSvg();
	      break;
	    case 'pie':
	      this.pieBuildSvg();
	      break;
	    case 'doughnut':
	      this.doughnutBuildSvg();
	      break;
	    case 'dial':
	      this.dialBuildSvg();
	      break;
	  }
	  Utils.appendChild(this.container, this.svg);
	};

	/**
	 * Setters
	 *
	 */
	Graph.prototype.setContainer = function(container) {
	  this.containerId = container; 
	  this.container = document.getElementById(container);
	};

	Graph.prototype.setType = function(type) {
	  this.type = type;
	};

	Graph.prototype.setSize = function(width, height) {
	  this.size.width = width;
	  this.size.height = height;
	};

	Graph.prototype.setPadding = function(x, y) {
	  this.padding = { x: x, y: y };
	};

	Graph.prototype.setLabels = function(labels) {
	  this.labels.column = labels;
	};

	Graph.prototype.setSeriesLabels = function(labels) {
	  this.labels.series = labels;
	};

	Graph.prototype.setPoints = function(points) {
	  this.points = points;
	};

	Graph.prototype.setIncrement = function(increment) {
	  this.labels.increment = increment;
	};

	Graph.prototype.setHorizontal = function(bool) {
	  this.horizontal = bool;
	};

	Graph.prototype.setShadow = function(bool) {
	  this.shadow = bool;
	};

	Graph.prototype.setColors= function(colors) {
	  this.colors = colors;
	};

	Graph.prototype.setPrefix = function(prefix) {
	  this.labels.prefix = prefix;
	};

	Graph.prototype.setSuffix = function(suffix) {
	  this.labels.suffix = suffix;
	};

	Graph.prototype.setFontFamily = function(fontFamily) {
	  this.font.family = fontFamily;
	};

	Graph.prototype.setFontSize = function(fontSize) {
	  this.font.size = fontSize;
	};

	Graph.prototype.setGraphLines = function(bool) {
	  this.showGraphLines = bool;
	};

	module.exports = Application;


/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	function Utils() {}

	/**
	 * Element 
	 *
	 */
	Utils.prototype.setElementAttributes = function(element, attributes) {
	  for(var attribute in attributes) {
	    var attr = attribute.replace(/[A-Z]/g, function(v) {
	      return '-' + v.toLowerCase();
	    });
	    element.setAttribute(attr, attributes[attribute]);
	  }
	};

	Utils.prototype.styleToString = function(attributes) {
	  var string = '';
	  for(var attribute in attributes) {
	    var attr = attribute.replace(/[A-Z]/g, function(v) {
	      return '-' + v.toLowerCase();
	    });
	    string += (attr + ':' + attributes[attribute] + ';');
	  }
	  return string;
	};

	Utils.prototype.appendChild = function(element, child) {
	  element.appendChild(child);
	};

	Utils.prototype.appendChildren = function(element, children) {
	  children.map(function(child) {
	    element.appendChild(child);
	  });
	};

	Utils.prototype.setDivPosition = function(element, x, y) {
	  element.style.position = 'absolute';
	  element.style.left = x + 'px';
	  element.style.top = y + 'px';
	};

	Utils.prototype.getElementOffset = function(element) {
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

	Utils.prototype.showElement = function(element) {
	  element.style.display = 'block';
	};

	Utils.prototype.hideElement = function(element) {
	  element.style.display = 'none';
	};

	/**
	 * Build or Update 
	 *
	 */
	Utils.prototype.buildOrUpdate = function(attributes, drawFunction) {
	  var element = document.getElementById(attributes.id);
	  if(!element) {
	    element = drawFunction(attributes);
	  } else {
	    this.setElementAttributes(element, attributes);
	  }
	  return element;
	};

	Utils.prototype.buildOrUpdateShadow = function(attributes, id, stdDeviation, group, drawFunction, drawFilterFunction) {
	  var shadow = {};
	  shadow.element = document.getElementById(attributes.id);
	  if(!shadow.element) {
	    shadow = drawFunction(attributes, id, stdDeviation, group, drawFilterFunction);
	  } else {
	    this.setElementAttributes(shadow.element, attributes);
	  }
	  return shadow;
	};

	Utils.prototype.buildOrUpdateGroup = function(attributes, children, drawFunction) {
	  var element = this.buildOrUpdate(attributes, drawFunction);
	  var exists = document.getElementById(attributes.id);
	  if(!exists) {
	    this.appendChildren(element, children);
	  }
	  return element;
	};

	Utils.prototype.buildOrUpdateGroupConcat = function(array, group, id, x, y, drawFunction) {
	  var children = array;
	  var transform = 'translate(' + x + ', ' + y + ')';
	  var attributes = {
	    id: id,
	    transform: transform
	  };
	  var group = this.buildOrUpdateGroup(attributes, group, drawFunction);
	  var exists = document.getElementById(attributes.id);
	  if(!exists) {
	    children.push(group);
	  }
	  return children;
	};

	/**
	 * Data 
	 *
	 */
	Utils.prototype.buildPathString = function(vectors) {
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

	Utils.prototype.flattenPoints = function(points) {
	  var yArray = [];
	  points.map(function(point) {
	    point.map(function(y) {
	      // If stacked point
	      if(typeof y === 'object') {
	        y.map(function(y1) {
	          yArray.push(y1);
	        });
	      }
	      // If single point
	      else {
	        yArray.push(y);
	      }
	    });
	  });
	  return yArray;
	};

	Utils.prototype.getPointIncrements = function(yMax, increment) {
	  var numItems = Math.ceil(yMax / increment) + 1;
	  var items = [];
	  for(var i = 0; i < numItems; i++) {
	    items.push(i * increment);
	  }
	  items.reverse();
	  return items;
	};

	Utils.prototype.getSetPercentages = function(points) {
	  var percentages = [];
	  var flatten = this.flattenPoints(points);
	  var sum = flatten.reduce(function(pv, cv) {
	    return pv + cv;
	  }, 0);
	  points.map(function(point) {
	    percentages.push((point[0] / sum));
	  });
	  return percentages;
	};

	Utils.prototype.getPercentages = function(points) {
	  var percentages = [];
	  var flatten = this.flattenPoints(points);
	  percentages.push(flatten[0] / flatten[1]);
	  return percentages;
	};

	Utils.prototype.getDegrees = function(percentages, angle) {
	  var degrees = [];
	  percentages.map(function(percent) {
	    degrees.push(percent * angle);
	  });
	  return degrees;
	};

	Utils.prototype.getMinMax = function(points) {
	  var range = {};
	  var flatten = this.flattenPoints(points);
	  range.min = Array.min(flatten);
	  range.max = Array.max(flatten);
	  return range;
	};

	/**
	 * Math 
	 *
	 */
	Utils.prototype.calculateColumnPositions = function(labels, width) {
	  var positions = [];
	  var size =  width / (labels.length - 1);
	  labels.forEach(function(label, index, array) {
	    var x = Math.round((size * index));
	    positions.push(x);
	  });
	  return positions;
	};

	Utils.prototype.calculateRowPositions = function(labels, height) {
	  var positions = [];
	  var size =  height / (labels.length - 1);
	  labels.forEach(function(label, index, array) {
	    var y = Math.round((size * index));
	    positions.push(y);
	  }, this);
	  return positions;
	};

	Utils.prototype.calculateY = function(y, yMax, height) {
	  var calculatedY = this.normalizeY(y, yMax, height);
	  return this.reversePosY(calculatedY, 0, height);
	}

	Utils.prototype.calculateX = function(x, xMax, width) {
	  return this.normalizeX(x, xMax, width);
	}

	Utils.prototype.normalizeY = function(y, yMax, height) {
	  return (height/yMax) * y;
	}

	Utils.prototype.normalizeX = function(x, xMax, width) {
	  return (width/xMax) * x;
	}

	Utils.prototype.reversePosY = function(x, xMin, xMax) {
	  return (xMax + xMin) - x;
	}

	Utils.prototype.reversePosX = function(y, yMin, yMax) {
	  return (yMax + yMin) - y;
	}

	Utils.prototype.calculateAngleX = function(rx, radius, angle) {
	  return rx + (radius * Math.cos(Math.PI * (angle / 180)));
	}

	Utils.prototype.calculateAngleY = function(ry, radius, angle) {
	  return ry + (radius * Math.sin(Math.PI * (angle / 180)));
	}

	Utils.prototype.sortDesc = function(a, b) {
	  return b-a;
	}

	Array.max = function(array) {
	  return Math.max.apply(Math, array);
	};

	Array.min = function(array) {
	  return Math.min.apply(Math, array);
	};

	module.exports = new Utils();

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Utils = __webpack_require__(1);

	function Draw() {}

	/**
	 * Svg Basics
	 *
	 */
	Draw.prototype.text = function(attributes) {
	  var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
	  Utils.setElementAttributes(text, attributes);
	  return text;
	};

	Draw.prototype.tspan = function(attributes) {
	  var tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
	  Utils.setElementAttributes(tspan, attributes);
	  return tspan;
	};

	Draw.prototype.line = function(attributes) {
	  var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
	  Utils.setElementAttributes(line, attributes);
	  return line;
	};

	Draw.prototype.circle = function(attributes) {
	  var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
	  Utils.setElementAttributes(circle, attributes);
	  return circle;
	};

	Draw.prototype.rect = function(attributes) {
	  var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
	  Utils.setElementAttributes(rect, attributes);
	  return rect;
	};

	Draw.prototype.path = function(attributes) {
	  var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
	  Utils.setElementAttributes(path, attributes);
	  return path;
	};

	Draw.prototype.svg = function(attributes) {
	  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	  Utils.setElementAttributes(svg, attributes);
	  return svg;
	};

	Draw.prototype.group = function(attributes) {
	  var g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
	  Utils.setElementAttributes(g, attributes);
	  return g;
	};

	/**
	 * Element Basics
	 *
	 */
	Draw.prototype.div = function(attributes) {
	  var div = document.createElement('div');
	  Utils.setElementAttributes(div, attributes);
	  return div;
	};

	Draw.prototype.p = function(attributes) {
	  var p = document.createElement('p');
	  Utils.setElementAttributes(p, attributes);
	  return p;
	};

	/**
	 * Assets 
	 *
	 */
	Draw.prototype.shadow = function(attributes, id, stdDeviation, group, drawFilterFunction) {
	  var object = {
	    def: null,
	    element: null,
	  }
	  object.def = drawFilterFunction(id, stdDeviation);
	  var shadowGroup = group.cloneNode(true);
	  attributes.filter = 'url(#' + id + ')';
	  Utils.setElementAttributes(shadowGroup, attributes);
	  object.element = shadowGroup;
	  return object;
	};

	/**
	 * Defs 
	 *
	 */
	Draw.prototype.defs = function(attributes) {
	  var defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
	  if(attributes) {
	    Utils.setElementAttributes(defs, attributes);
	  }
	  return defs;
	};

	Draw.prototype.clipPath = function(id, path) {
	  var clipPath = document.createElementNS('http://www.w3.org/2000/svg', 'clipPath');
	  Utils.setElementAttributes(clipPath, {id: id});
	  Utils.appendChild(clipPath, path);
	  return clipPath;
	};

	Draw.prototype.filterShadow = function(id, stdDeviation) {
	  var filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
	  var feGaussianBlur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
	  var feBlend = document.createElementNS('http://www.w3.org/2000/svg', 'feBlend');
	  Utils.setElementAttributes(filter, {id: id, width: '150%', height: '150%'});
	  Utils.setElementAttributes(feGaussianBlur, {in: 'SourceAlpha', result: 'blurOut'});
	  feGaussianBlur.setAttribute('stdDeviation', stdDeviation);
	  Utils.setElementAttributes(feBlend, {in: 'blurOut', mode: 'normal'});
	  Utils.appendChild(filter, feGaussianBlur);
	  Utils.appendChild(filter, feBlend);
	  return filter;
	};


	module.exports = new Draw();


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Utils = __webpack_require__(1);
	var Draw = __webpack_require__(2);

	function Render() {}

	/**
	 * Text
	 *
	 */
	Render.prototype.columnLabelText = function(containerId, positions, labels, suffix, prefix, font, size) {
	  var textAttributes = [];

	  // Text
	  labels.forEach(function(label, index) {
	    var id = containerId + '-column-label-' + index;
	    var x = positions[index];
	    var y = size.height + (font.size * 2.6);
	    var attributes = {
	      id: id,
	      x: x,
	      y: y,
	      fill: '#888',
	      fontSize: font.size,
	      fontFamily: font.family,
	      textAnchor: 'middle',
	      dataText: prefix + label + suffix
	    };
	    textAttributes.push(attributes);
	  });

	  // Build or Update
	  var elements = [];
	  textAttributes.map(function(attributes) {
	    var element = Utils.buildOrUpdate(attributes, Draw.text);
	    var exists = document.getElementById(attributes.id);
	    if(!exists) {
	      var text = document.createTextNode(attributes.dataText);
	      element.appendChild(text);
	      elements.push(element);
	    }
	  });

	  // Return
	  return elements;
	};

	Render.prototype.rowLabelText = function(containerId, positions, labels, suffix, prefix, font, size) {
	  var textAttributes = [];

	  // Text
	  labels.forEach(function(label, index) {
	    var id = containerId + '-row-label-' + index;
	    var x = 0;
	    var y = positions[index] + (font.size / 2);
	    var attributes = {
	      id: id,
	      x: x,
	      y: y,
	      fill: '#888',
	      fontSize: font.size,
	      fontFamily: font.family,
	      textAnchor: 'start',
	      dataText: prefix + label + suffix
	    };
	    textAttributes.push(attributes);
	  });

	  // Build or Update
	  var elements = [];
	  textAttributes.map(function(attributes) {
	    var element = Utils.buildOrUpdate(attributes, Draw.text);
	    var exists = document.getElementById(attributes.id);
	    if(!exists) {
	      var text = document.createTextNode(attributes.dataText);
	      element.appendChild(text);
	      elements.push(element);
	    }
	  });

	  // Return
	  return elements;
	};

	Render.prototype.seriesLabelText = function(containerId, labels, font, size, colors) {
	  // Text
	  var id = containerId + '-series-label-0';
	  var dx = 10;
	  var x = size.width - dx ;
	  var y = size.height - (font.size * 0.2);
	  var attributes = {
	    id: id,
	    x: x,
	    y: y,
	    fill: '#888',
	    fontSize: font.size,
	    fontFamily: font.family,
	    textAnchor: 'end'
	  };

	  // Build or Update
	  var elements = [];
	  var element = Utils.buildOrUpdate(attributes, Draw.text);
	  var exists = document.getElementById(attributes.id);
	  if(!exists) {
	    labels.forEach(function(label, index) {
	      var tspanText = Draw.tspan({ dx: dx, fill: colors[index] });
	      tspanText.appendChild(document.createTextNode(label));
	      element.appendChild(tspanText);
	    });
	    elements.push(element);
	  }

	  // Return
	  return elements;
	};

	Render.prototype.bottomLeftLabelText = function(containerId, labels, font, size, colors) {
	  var textAttributes = [];

	  // Text
	  labels.forEach(function(label, index) {
	    var id = containerId + '-series-label-' + index;
	    // Flip text
	    var a = (font.size * 1.4);
	    var b = (labels.length - 1);
	    var c = (a * b) - (a * index);
	    // Reverse y position
	    var x = 0;
	    var y = Utils.reversePosY(c, 0, size.height);
	    var attributes = {
	      id: id,
	      x: x,
	      y: y,
	      fill: colors[index],
	      fontSize: font.size,
	      fontFamily: font.family,
	      textAnchor: 'start',
	      dataText: label
	    };
	    textAttributes.push(attributes);
	  });

	  // Build or Update
	  var elements = [];
	  textAttributes.map(function(attributes) {
	    var element = Utils.buildOrUpdate(attributes, Draw.text);
	    var exists = document.getElementById(attributes.id);
	    if(!exists) {
	      var text = document.createTextNode(attributes.dataText);
	      element.appendChild(text);
	      elements.push(element);
	    }
	  });

	  // Return
	  return elements;
	};

	Render.prototype.bottomCenterLabelText = function(containerId, text, font, size, color) {
	  // Text
	  var id = containerId + '-bottom-center-label-0';
	  var x = size.width / 2;
	  var y = Utils.reversePosY(0, 0, size.height);
	  var attributes = {
	    id: id,
	    x: x,
	    y: y,
	    fill: color,
	    fontSize: font.size,
	    fontFamily: font.family,
	    textAnchor: 'middle'
	  };

	  // Build or Update
	  var elements = [];
	  var element = Utils.buildOrUpdate(attributes, Draw.text);
	  var exists = document.getElementById(attributes.id);
	  if(!exists) {
	    var text = document.createTextNode(text);
	    element.appendChild(text);
	    elements.push(element);
	  }

	  // Return
	  return elements;
	};

	Render.prototype.centerLabelText = function(containerId, text, font, size, color) {
	  // Text
	  var id = containerId + '-center-label-0';
	  var x = size.width / 2;
	  var y = (font.size / 2) + (size.height / 2);
	  var attributes = {
	    id: id,
	    x: x,
	    y: y,
	    fill: color,
	    fontSize: font.size,
	    fontFamily: font.family,
	    textAnchor: 'middle'
	  };

	  // Build or Update
	  var elements = [];
	  var element = Utils.buildOrUpdate(attributes, Draw.text);
	  var exists = document.getElementById(attributes.id);
	  if(!exists) {
	    var text = document.createTextNode(text);
	    element.appendChild(text);
	    elements.push(element);
	  }

	  // Return
	  return elements;
	};

	/**
	 * Sets 
	 *
	 */
	Render.prototype.lineSets = function(application, containerId, columnPositions, rowMax, sets, range, size, colors) {
	  var lineAttributes = [];

	  // Lines
	  sets.forEach(function(set, i, array) {
	    var newSet = [];
	    set.forEach(function(point, j, array) {
	      var type = (j > 0) ? '' : 'M';
	      newSet.push({
	        type: type,
	        values: [columnPositions[j],
	        Utils.calculateY(point, rowMax, size.height)]
	      });
	    });
	    var id = containerId + '-line-' + i;
	    var d = Utils.buildPathString(newSet);
	    var attributes = {
	      id: id,
	      d: d,
	      stroke: colors[i],
	      strokeWidth: 6,
	      strokeLinecap: 'round',
	      fill: 'none',
	      dataIndex: i
	    };
	    lineAttributes.push(attributes);
	  });

	  // Build or Update
	  var elements = [];
	  lineAttributes.map(function(attributes) {
	    var element = Utils.buildOrUpdate(attributes, Draw.path);
	    var exists = document.getElementById(attributes.id);
	    if(!exists) {
	      // Events
	      element.addEventListener('mousemove', function(evt) {
	        application.Events.onMouseOverLine(evt, application, attributes.dataIndex, rowMax);
	      });
	      element.addEventListener('mouseout', function(evt) {
	        application.Events.onMouseOut(evt, application);
	      });
	      elements.push(element);
	    }
	  });

	  return elements;
	};

	Render.prototype.barSets = function(application, containerId, columnPositions, rowPositions, labels, sets, size, horizontal, colors, shadow) {
	  var barAttributes = [];
	  var barShadowAttributes = [];

	  //////////////////////
	  sets.forEach(function(set, i, array) {
	    var index = 0;
	    set.sort(Utils.sortDesc);
	    set.forEach(function(point, j, array) {

	      var strokeWidth = 16;
	      var gutter = -(strokeWidth / 4);
	      var offset = ((strokeWidth + gutter) * (set.length - 1)) / 2;
	      var shadowOffset = -(strokeWidth / 3);
	      var max;

	      // Normal
	      if(typeof point === 'number') {

	        var attributes = {
	          id: containerId + '-bar-' + i + '-' + j,
	          fill: 'transparent',
	          stroke: colors[index],
	          strokeWidth: strokeWidth,
	          strokeLinecap: 'round'
	        };
	        var shadowAttributes = {
	          id: containerId + '-bar-shadow-' + i + '-' + j,
	          opacity: '0.15',
	          fill: 'transparent',
	          stroke: '#000',
	          strokeWidth: strokeWidth,
	          strokeLinecap: 'round'
	        };

	        var newSet = [];
	        if(!horizontal) { 
	          shadowAttributes.transform = 'translate(' + shadowOffset + ', 0)';
	          max = labels[0];
	          var x = (columnPositions[i] + (j * (strokeWidth + gutter))) - offset;
	          newSet.push({type: 'M', values: [x, Utils.calculateY(0, max, size.height)]});
	          newSet.push({type: '', values: [x, Utils.calculateY(point, max, size.height) + (strokeWidth / 2)]});
	        } 
	        else {
	          shadowAttributes.transform = 'translate(' + (-shadowOffset) + ', 0)';
	          max = labels[labels.length - 1];
	          var y = (rowPositions[i] + (j * (strokeWidth + gutter))) - offset;
	          newSet.push({ type: 'M', values: [Utils.calculateX(0, max, size.width), y] });
	          newSet.push({ type: '', values: [Utils.calculateX(point, max, size.width) - (strokeWidth / 2), y] });
	        }

	        // Point
	        attributes.dataPoint = point;

	        // d
	        var d = Utils.buildPathString(newSet);
	        attributes.d = d;
	        shadowAttributes.d = d;

	        // Shadow
	        barAttributes.push(attributes);
	        barShadowAttributes.push(shadowAttributes)
	        index++;
	      }

	      // Stacked
	      else if(typeof point === 'object') {
	        point.sort(Utils.sortDesc);
	        point.forEach(function(y1, k, array) {

	          var attributes = {
	            id: containerId + '-bar-' + i + '-' + j + '-' + k,
	            fill: 'transparent',
	            stroke: colors[index],
	            strokeWidth: strokeWidth,
	            strokeLinecap: 'round'
	          };
	          var shadowAttributes = {
	            id: containerId + '-bar-shadow-' + i + '-' + j + '-' + k,
	            opacity: '0.15',
	            fill: 'transparent',
	            stroke: '#000',
	            strokeWidth: strokeWidth,
	            strokeLinecap: 'round'
	          };

	          var newSet = [];
	          if(!horizontal) { 
	            shadowAttributes.transform = 'translate(' + shadowOffset + ', 0)';

	            max = labels[0];

	            var x = (columnPositions[i] + (j * (strokeWidth + gutter))) - offset;
	            newSet.push({ type: 'M', values: [x, Utils.calculateY(0, max, size.height)] });
	            newSet.push({ type: '', values: [x, Utils.calculateY(y1, max, size.height) + (strokeWidth / 2)] });
	          } 
	          else {
	            shadowAttributes.transform = 'translate(' + (-shadowOffset) + ', 0)';
	            max = labels[labels.length - 1];
	            var y = (rowPositions[i] + (j * (strokeWidth + gutter))) - offset;
	            newSet.push({ type: 'M', values: [Utils.calculateX(0, max, size.width), y] });
	            newSet.push({ type: '', values: [Utils.calculateX(y1, max, size.width) - (strokeWidth / 2), y] });
	          }

	          // Point
	          attributes.dataPoint = y1;

	          // d
	          var d = Utils.buildPathString(newSet);
	          attributes.d = d;
	          shadowAttributes.d = d;


	          // Shadow
	          barAttributes.push(attributes);
	          barShadowAttributes.push(shadowAttributes)
	          index++;
	        });
	      }

	    });
	  });
	  //////////////////////

	  // Build or Update
	  var elements = [];
	  barAttributes.forEach(function(attributes, index) {
	    var element = Utils.buildOrUpdate(attributes, Draw.path);
	    var elementShadow = Utils.buildOrUpdate(barShadowAttributes[index], Draw.path);
	    var exists = document.getElementById(attributes.id);
	    if(!exists) {
	      // Events
	      element.addEventListener('mousemove', function(evt) {
	        application.Events.onMouseOverBar(evt, application, 0, attributes.dataPoint);
	      });
	      element.addEventListener('mouseout', function(evt) {
	        application.Events.onMouseOut(evt, application);
	      });
	      if(shadow) {
	        elements.push(elementShadow);
	      }
	      elements.push(element);
	    }
	  });

	  return elements;
	};

	Render.prototype.pieSets = function(application, containerId, sets, size, colors, shadow) {
	  var slicesAttributes = [];
	  var center = { x: (size.width / 2), y: (size.height / 2) };
	  var radius = (size.height / 2);
	  var lastEndAngle = 0;
	  sets.forEach(function(set, index, array) {
	    var attributes = {
	      id: containerId + '-pie-slice-' + index,
	      fill: colors[index]
	    };
	    var sliceOffset = ((index > 0) ? lastEndAngle : 0);
	    var rotation = -90 + sliceOffset;
	    var startAngle = 0 + rotation;
	    var endAngle = set + rotation;
	    lastEndAngle += set;
	    var splitAngle = 180 + rotation;
	    var x1 = Utils.calculateAngleX(center.x, radius, startAngle);
	    var y1 = Utils.calculateAngleY(center.y, radius, startAngle);
	    var vectors = [
	      {type: 'M', values: [center.x, center.y]},
	      {type: '',  values: [x1, y1]}
	    ];

	    var angles = [];
	    // If angle is larger than 180, add a arch at 180 degrees
	    if(set > 180) {
	      angles.push(splitAngle);
	    }
	    angles.push(endAngle);
	    angles.map(function(angle) {
	      var x2 = Utils.calculateAngleX(center.x, radius, angle);
	      var y2 = Utils.calculateAngleY(center.y, radius, angle);
	      vectors.push({type: 'A', values: [radius, radius, 0, 0, 1]});
	      vectors.push({type: '',  values: [x2, y2]});
	    });
	    vectors.push({type: 'Z'});
	    attributes.dataPoint = y1;
	    attributes.dataIndex = index;
	    attributes.d = Utils.buildPathString(vectors);
	    slicesAttributes.push(attributes);
	  });

	  // Build or Update
	  var elements = [];

	  // Normal
	  var groupAttributes = { id: containerId + '-pie-0' };
	  var group = Utils.buildOrUpdate(groupAttributes, Draw.group);
	  // Shadow
	  var shadowGroupAttributes = { id: containerId + '-pie-shadow-0' };
	  var shadowGroup = Utils.buildOrUpdate(shadowGroupAttributes, Draw.group);

	  slicesAttributes.map(function(attributes) {
	    // Normal
	    var element = Utils.buildOrUpdate(attributes, Draw.path);
	    // Shadow
	    var shadowAttributes = Object.assign({}, attributes);
	    shadowAttributes.id = attributes.id + '-shadow';
	    var shadowElement = Utils.buildOrUpdate(shadowAttributes, Draw.path);
	    // Check if exists
	    var exists = document.getElementById(attributes.id);
	    if(!exists) {
	      // Events
	      element.addEventListener('mousemove', function(evt) {
	        application.Events.onMouseOverPie(evt, application, attributes.dataIndex, attributes.dataPoint);
	      });
	      element.addEventListener('mouseout', function(evt) {
	        application.Events.onMouseOut(evt, application);
	      });
	      Utils.appendChild(group, element);
	      Utils.appendChild(shadowGroup, shadowElement);
	    }
	  });

	  // Build or Update Shadow
	  var defs = Draw.defs();
	  var shadowId = containerId + '-pie-shadow-0';
	  var shadowAttributes = {id: shadowId, opacity: 0.15};
	  var shadow = Utils.buildOrUpdateShadow(shadowAttributes, 'pie-shadow', 8, shadowGroup, Draw.shadow, Draw.filterShadow);
	  var shadowExists = document.getElementById(shadowAttributes.id);
	  if(!shadowExists && shadow) {
	    Utils.appendChild(defs, shadow.def);
	    elements.push(defs);
	    elements.push(shadow.element);
	  } 

	  // Group
	  var groupExists = document.getElementById(groupAttributes.id);
	  if(!groupExists) {
	    elements.push(group);
	  }

	  return elements;
	};

	Render.prototype.doughnutSets = function(application, containerId, sets, size, colors, shadow) {
	  // Basic calculation
	  var center = { x: (size.width / 2), y: (size.height / 2) };
	  var radius1 = (size.height / 2);
	  var radius2 = radius1 - 40;
	  var x1 = Utils.calculateAngleX(center.x, radius1, 0);
	  var y1 = Utils.calculateAngleY(center.y, radius1, 0);
	  var x2 = Utils.calculateAngleX(center.x, radius1, 180);
	  var y2 = Utils.calculateAngleY(center.y, radius1, 180);
	  var x3 = Utils.calculateAngleX(center.x, radius2, 0);
	  var y3 = Utils.calculateAngleY(center.y, radius2, 0);
	  var x4 = Utils.calculateAngleX(center.x, radius2, 180);
	  var y4 = Utils.calculateAngleY(center.y, radius2, 180);
	  // Create vectors
	  var vectors = [
	    {type: 'M', values: [x1, y1]},
	    {type: 'A', values: [radius1, radius1, 0, 0, 1]},
	    {type: '', values: [x2, y2]},
	    {type: 'A', values: [radius1, radius1, 0, 0, 1]},
	    {type: '', values: [x1, y1]},
	    {type: 'Z'},
	    {type: 'M', values: [x3, y3]},
	    {type: 'A', values: [radius2, radius2, 0, 0, 0]},
	    {type: '', values: [x4, y4]},
	    {type: 'A', values: [radius2, radius2, 0, 0, 0]},
	    {type: '', values: [x3, y3]},
	    {type: 'Z'},
	  ];
	  // Compose
	  var elements = [];

	  // Clip Path
	  var attributes = {
	    id: containerId + '-dougnut-clipmask-0',
	    d: Utils.buildPathString(vectors)
	  };
	  var doughnutClip = Utils.buildOrUpdate(attributes, Draw.path);

	  // Normal group
	  var groupAttributes = {
	    id: containerId + '-dougnut-group-0',
	  }
	  var group = Utils.buildOrUpdate(groupAttributes, Draw.group);

	  // Shadow group
	  var shadowGroupAttributes = {
	    id: containerId + '-dougnut-shadow-group-0',
	  }
	  var shadowGroup = Utils.buildOrUpdate(shadowGroupAttributes, Draw.group);
	  var shadowDoughnutAttributes = Object.assign({}, attributes);
	  shadowDoughnutAttributes.id = containerId + '-shadow-doughnut-0';
	  shadowDoughnutAttributes.fill = 'red';
	  var shadowDoughnut = Utils.buildOrUpdate(shadowDoughnutAttributes, Draw.path);

	  // Pie shape
	  var pie = this.pieSets(application, containerId, sets, size, colors, false)[2];

	  var defsAttributes = {
	    id: containerId + '-dougnut-defs-0'
	  };
	  var defs = Utils.buildOrUpdate(defsAttributes, Draw.defs);
	  var defsExists = document.getElementById(defsAttributes.id);

	  if(!defsExists) {
	    var clipPath = Draw.clipPath('doughnut-clip', doughnutClip);
	    Utils.appendChild(defs, clipPath);
	    Utils.setElementAttributes(pie, {clipPath: 'url(#doughnut-clip)'});
	    Utils.appendChild(group, pie)
	    elements.push(defs);
	    Utils.appendChild(shadowGroup, shadowDoughnut);
	  }

	  // Shadow
	  var shadowId = containerId + '-doughnut-shadow-0';
	  var shadowAttributes = { id: shadowId, opacity: 0.15 };
	  var shadow = Utils.buildOrUpdateShadow(shadowAttributes, 'dougnut-shadow', 8, shadowGroup, Draw.shadow, Draw.filterShadow);
	  var shadowExists = document.getElementById(shadowAttributes.id);
	  if(!shadowExists) {
	    Utils.appendChild(defs, shadow.def);
	    elements.push(shadow.element);
	  }

	  elements.push(group);
	  return elements;
	};

	Render.prototype.dialSets = function(containerId, sets, percentage, size, colors, shadow) {
	  // Basic Calculation
	  var center = { x: (size.width / 2), y: (size.height / 2) };
	  var radius = (size.height / 3.2);
	  // Create dot
	  var degree = (sets) - 220;
	  var dotRadius = radius - 15;
	  var cx = Utils.calculateAngleX(center.x, dotRadius, degree);
	  var cy = Utils.calculateAngleY(center.y, dotRadius, degree);
	  // Create dash
	  var dashRadius = radius + 15;
	  var rotation = -150;

	  var dashAttributes = [];
	  for(var i = 0; i < 260; i += 20) {
	    var id = containerId + '-dash-' + (i/20);
	    var opacity = ((i / 260) > percentage) ? 0.2 : 1.0;
	    var x = Utils.calculateAngleX(center.x, dashRadius, i - rotation);
	    var y = Utils.calculateAngleY(center.y, dashRadius, i - rotation);
	    var attributes = {
	      id: id,
	      transform: 'translate(' + x + ', ' + y + ') rotate(' + (i - 120) + ', 0, 0)',
	      fill: colors[0],
	      opacity: opacity
	    };
	    var vectors = [
	      {type: 'M', values: [0, 0]},
	      {type: '', values: [-2.6, 0]},
	      {type: '', values: [-3.8, -20]},
	      {type: '', values: [3.8, -20]},
	      {type: '', values: [2.6, 0]},
	      {type: 'Z'},
	    ];
	    attributes.d = Utils.buildPathString(vectors);
	    dashAttributes.push(attributes);
	  }

	  // Build or Update
	  var elements = [];
	  dashAttributes.map(function(attributes) {
	    var element = Utils.buildOrUpdate(attributes, Draw.path);
	    var exists = document.getElementById(attributes.id);
	    if(!exists) {
	      elements.push(element);
	    }
	  });


	  // Dial
	  var dialAttributes = {
	    id: containerId + '-dial-0',
	    cx: center.x,
	    cy: center.y,
	    r: radius,
	    fill: colors[0] 
	  };
	  var dial = Utils.buildOrUpdate(dialAttributes, Draw.circle);
	  
	  var shadowGroupAttributes = {
	    id: containerId + '-dial-shadow-group-0'
	  };
	  var shadowGroup = Utils.buildOrUpdate(shadowGroupAttributes, Draw.group);
	  var shadowGroupExists = document.getElementById(shadowGroupAttributes.id);

	  // Shadow
	  var shadowElementAttributes = Object.assign({}, dialAttributes);
	  shadowElementAttributes.id = containerId + '-dial-shadow-element-0';
	  var shadowElement = Utils.buildOrUpdate(shadowElementAttributes, Draw.circle);

	  // Defs
	  var defsAttributes = { id: containerId + '-defs-0' };
	  var defs = Utils.buildOrUpdate(defsAttributes, Draw.defs);
	  var defsExists = document.getElementById(defsAttributes.id);
	  if(!defsExists) {
	    elements.push(defs);
	    Utils.appendChild(shadowGroup, shadowElement);
	  }

	  // Shadow
	  var shadowId = containerId + '-dial-shadow-0';
	  var shadowAttributes = {id: shadowId, opacity: 0.15};
	  var shadow = Utils.buildOrUpdateShadow(shadowAttributes, 'dial-shadow', 8, shadowGroup, Draw.shadow, Draw.filterShadow);
	  var shadowExists = document.getElementById(shadowAttributes.id);
	  if(!shadowExists && shadow) {
	    Utils.appendChild(defs, shadow.def);
	    elements.push(shadow.element);
	  } 

	  // Dial
	  var dialExists = document.getElementById(dialAttributes.id);
	  if(!dialExists) {
	    elements.push(dial);
	  }

	  // Dot
	  var dotAttributes = {
	    id: containerId + '-dial-dot-0',
	    cx: cx,
	    cy: cy,
	    r: 5,
	    fill: '#fff'
	  };
	  var dot = Utils.buildOrUpdate(dotAttributes, Draw.circle);
	  var dotExists = document.getElementById(dotAttributes.id);
	  if(!dotExists) {
	    elements.push(dot);
	  }

	  return elements;
	};

	Render.prototype.tooltip = function(id, fontFamily) {
	  var divStyle = Utils.styleToString({
	    position: 'absolute',
	    padding: '10px 20px',
	    margin: 'none',
	    color: '#fff',
	    fontSize: '16px',
	    fontFamily: fontFamily,
	    boxShadow: '4px 4px 0 rgba(0, 0, 0, 0.2)'
	  });
	  var pStyle = Utils.styleToString({ padding: '0', margin: '0' });
	  var element = Draw.div({ id: id, style: divStyle });
	  var p = Draw.p({ id: id + '-text', style: pStyle });
	  Utils.appendChild(element, p);
	  return element;
	};

	Render.prototype.graphLines = function(containerId, columnPositions, rowPositions, size) {
	  var lines = [];

	  // Vertical
	  columnPositions.forEach(function(x, index) {
	    var id = containerId + '-graph-line-vertical-' + index;
	    var lineAttributes = {
	      id: id,
	      x1: x,
	      y1: 0,
	      x2: x,
	      y2: size.height,
	      stroke: '#ccc',
	      strokeDasharray: '5, 5'
	    }
	    lines.push(lineAttributes);
	  });

	  // Horizontal
	  rowPositions.forEach(function(y, index) {
	    var id = containerId + '-graph-line-horizontal-' + index;
	    var lineAttributes = {
	      id: id,
	      x1: 0,
	      y1: y,
	      x2: size.width,
	      y2: y,
	      stroke: '#ccc',
	      strokeDasharray: '5, 5'
	    }
	    lines.push(lineAttributes);
	  });

	  // Build or Update
	  var elements = [];
	  lines.map(function(attributes) {
	    var element = Utils.buildOrUpdate(attributes, Draw.line);
	    var exists = document.getElementById(attributes.id);
	    if(!exists) {
	      elements.push(element);
	    }
	  });

	  // Return
	  return elements;
	};

	Render.prototype.svg = function(containerId, container, fontSize, size, padding) {
	  var id = containerId + '-svg';
	  var width = size.width + padding.x;
	  var height = size.height + padding.y;
	  var attributes = {
	    id: id,
	    xmlns: 'http://www.w3.org/2000/svg',
	    version: '1.1',
	    width: width,
	    height: height
	  };

	  // Build or Update
	  var element = Utils.buildOrUpdate(attributes, Draw.svg);

	  // Return
	  return element;
	};

	module.exports = new Render();


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Draw = __webpack_require__(2);
	var Render = __webpack_require__(3);
	var Utils = __webpack_require__(1);

	function Events() {}

	Events.prototype.getSvg = function(containerId, fontFamily) {
	  var container = document.getElementById(containerId);
	  var svg = container.getElementsByTagName('svg')[0];
	  var tooltipId = containerId + '-tooltip';
	  var tooltip = document.getElementById(tooltipId);
	  var tooltipText = document.getElementById(tooltipId + '-text');
	  if(!tooltip) {
	    this.createTooltip(container, tooltipId, fontFamily);
	  }
	  var object = {
	    container: container,
	    svg: svg,
	    tooltipId: tooltipId,
	    tooltip: tooltip,
	    tooltipText: tooltipText,
	  }
	  return object;
	};

	Events.prototype.onMouseOverLine = function(evt, application, i, rowMax) {
	  var svg = this.getSvg(application.containerId, application.font.family);
	  var color = application.colors[i];
	  // Get position
	  var containerOffset = Utils.getElementOffset(svg.container);
	  var svgOffset = Utils.getElementOffset(svg.svg);
	  // Make calculations
	  var padding = application.padding;
	  var x = evt.clientX - containerOffset.left;
	  var y = evt.clientY - containerOffset.top;
	  // Calculate difference
	  var nx = (evt.clientX - svgOffset.left) - (padding.x/2);
	  var ny = (evt.clientY - svgOffset.top) - (padding.y/2); 
	  var d = application.columnPositions.length - 1;
	  // Percent between two nodes
	  var p = nx/(application.size.width/d);
	  // Index
	  var index = Math.floor(p);
	  var nums = [application.points[i][index], application.points[i][index + 1]];
	  var number = Math.floor(((nums[1] - nums[0]) * (p % 1)) + nums[0]);
	  var textFinal = application.labels.prefix + (number.toString()) + application.labels.suffix;
	  if(!isNaN(number)) {
	    this.updateTooltip(svg, x, y, color, textFinal);
	  }
	};

	Events.prototype.onMouseOverBar = function(evt, application, i, value) {
	  var svg = this.getSvg(application.containerId, application.font.family);
	  var color = application.colors[i];
	  // Get position
	  var containerOffset = Utils.getElementOffset(svg.container);
	  var svgOffset = Utils.getElementOffset(svg.svg);
	  // Make calculations
	  var x = evt.clientX - containerOffset.left;
	  var y = evt.clientY - containerOffset.top;
	  // Render
	  var number = value;
	  var textFinal = application.labels.prefix + (number.toString()) + application.labels.suffix;
	  if(!isNaN(number)) {
	    this.updateTooltip(svg, x, y, color, textFinal);
	  }
	};

	Events.prototype.onMouseOverPie = function(evt, application, i) {
	  var svg = this.getSvg(application.containerId, application.font.family);
	  var color = application.colors[i];
	  // Get position
	  var containerOffset = Utils.getElementOffset(svg.container);
	  var svgOffset = Utils.getElementOffset(svg.svg);
	  // Make calculations
	  var x = evt.clientX - containerOffset.left;
	  var y = evt.clientY - containerOffset.top;
	  var number = application.points[i];
	  var textFinal = application.labels.prefix + (number.toString()) + application.labels.suffix;
	  if(!isNaN(number)) {
	    this.updateTooltip(svg, x, y, color, textFinal);
	  }
	};

	Events.prototype.createTooltip = function(container, id, fontFamily) {
	  var tooltip = Render.tooltip(id, fontFamily);
	  Utils.appendChild(container, tooltip);
	};

	Events.prototype.updateTooltip = function(svg, x, y, color, value) {
	  if(svg.tooltip) {
	    Utils.showElement(svg.tooltip);
	    svg.tooltip.style.background = color;
	    svg.tooltipText.innerHTML = value;
	    Utils.setDivPosition(svg.tooltip, x + 10, y + 10);
	  }
	};

	Events.prototype.onMouseOut = function(evt, application) {
	  var svg = this.getSvg(application.containerId);
	  if(svg.tooltip) {
	    Utils.hideElement(svg.tooltip);
	  }
	};

	module.exports = Events;


/***/ }
/******/ ])
});
;