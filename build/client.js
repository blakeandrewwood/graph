/******/ (function(modules) { // webpackBootstrap
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

	var Graph = __webpack_require__(1);

	var labelsLine = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
	var pointsLine = [
		[10, 50, 150, 175, 130],
		[20, 80, 100, 150, 175],
		[5,  30,  40,  80,  50],
		[15, 70,  70,  50,  60],
		[0,  40,  80,  90,  90]
	];
	var containerLine = document.getElementById('graph-line');
	var graphLine = new Graph(containerLine);
	graphLine.setType('line');
	graphLine.setSize(300, 150);
	graphLine.setLabels(labelsLine);
	graphLine.setIncrement(50);
	graphLine.setPoints(pointsLine);
	graphLine.render();

	var labelsBar = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	var pointsBar = [
		[1],
		[2],
		[3],
		[4],
		[3],
		[6],
		[4],
		[3],
		[6],
		[6],
		[4],
		[3]
	];
	var containerBar = document.getElementById('graph-bar');
	var graphBar = new Graph(containerBar);
	graphBar.setType('bar');
	graphBar.setSize(350, 150);
	graphBar.setLabels(labelsBar);
	graphBar.setIncrement(1);
	graphBar.setPoints(pointsBar);
	graphBar.render();

	var labelsBarMulti = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
	var pointsBarMulti = [
		[1350, 1000, 800],
		[700, 500, 600],
		[200, 800],
		[1650, [500, 100]],
		[[1500, 1000, 500]],
	];
	var containerBarMulti = document.getElementById('graph-bar-multi');
	var graphBarMulti = new Graph(containerBarMulti);
	graphBarMulti.setType('bar');
	graphBarMulti.setSize(300, 150);
	graphBarMulti.setLabels(labelsBarMulti);
	graphBarMulti.setIncrement(500);
	graphBarMulti.setPoints(pointsBarMulti);
	graphBarMulti.render();

	var labelsBarMultiStack = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
	var pointsBarMultiStack = [
		[[500, 1000, 1300]],
		[[700, 500, 600]],
		[[200, 800]],
		[[450]],
		[[1200]]
	];
	var containerBarMultiStack = document.getElementById('graph-bar-multi-stack');
	var graphBarMultiStack = new Graph(containerBarMultiStack);
	graphBarMultiStack.setType('bar');
	graphBarMultiStack.setSize(300, 150);
	graphBarMultiStack.setLabels(labelsBarMultiStack);
	graphBarMultiStack.setIncrement(500);
	graphBarMultiStack.setPoints(pointsBarMultiStack);
	graphBarMultiStack.render();

	var labelsBarMultiStackHorizontal = ['Tom', 'Kelly', 'Rob', 'Owen'];
	var pointsBarMultiStackHorizontal = [
		[[450, 1000, 1350, 200]],
		[[700, 500, 1000, 300]],
		[[200, 800, 700]],
		[[450, 100]]
	];
	var containerBarMultiStackHorizontal = document.getElementById('graph-bar-multi-stack-horizontal');
	var graphBarMultiStackHorizontal = new Graph(containerBarMultiStackHorizontal);
	graphBarMultiStackHorizontal.setType('bar');
	graphBarMultiStackHorizontal.setHorizontal(true);
	graphBarMultiStackHorizontal.setSize(300, 150);
	graphBarMultiStackHorizontal.setLabels(labelsBarMultiStackHorizontal);
	graphBarMultiStackHorizontal.setIncrement(500);
	graphBarMultiStackHorizontal.setPoints(pointsBarMultiStackHorizontal);
	graphBarMultiStackHorizontal.render();

	var labelsPie = ['Oracle', 'Azure', 'Joyent', 'IBM'];
	var pointsPie = [
		[450],
		[700],
		[200],
		[450]
	];
	var containerPie = document.getElementById('graph-pie');
	var graphPie = new Graph(containerPie);
	graphPie.setType('pie');
	graphPie.setSize(300, 150);
	graphPie.setLabels(labelsPie);
	graphPie.setPoints(pointsPie);
	graphPie.render();

	/*
	window.addEventListener('resize', function(event) {
		var width = window.innerWidth;
		var height = window.innerHeight;
		g.setSize(width, height);
		g.render();
	});
	*/

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Utils = __webpack_require__(2);
	var Render = __webpack_require__(3);

	var Graph = function(container) {
		
		// Parameters
		this.container = container;
		this.type = 'line';
		this.size = { width: 400, height: 400 };
		this.increment = 0;
		this.textSize = 12;
		this.range = { min: 0, max: 0 };
		this.labels = [];
		this.points = [];
		this.pointIncrements = [];
		this.columnLabelPositions = [];
		this.rowLabelPositions = [];
		this.colors = [];
		this.horizontal = false;
		this.svg = '';
		
		/**
		 * Setup 
		 *
		 */
		this.makeCalculations = function() {
			this.range = Utils.getMinMax(this.points);
			this.pointIncrements = Utils.getPointIncrements(this.range.max, this.increment);
		}

		this.lineMakeSvg = function() {
			this.makeCalculations();
			// Calculate grid positions
			this.columnLabelPositions = Utils.calculateColumnPositions(this.labels, this.size.width);
			this.rowLabelPositions = Utils.calculateRowPositions(this.pointIncrements, this.size.height);
			// Render text
			var columnLabelText = Render.columnLabelText(this.labels, this.columnLabelPositions, this.textSize, this.size.width, this.size.height);
			var rowLabelText = Render.rowLabelText(this.pointIncrements, this.rowLabelPositions, this.textSize, this.size.width, this.size.height);
			// Render sets
			var sets = Render.lineSets(this.columnLabelPositions, this.points, this.range.max, this.size.height, this.colors);
			// Render graph
			var graphLines = Render.graphLines(this.columnLabelPositions, this.rowLabelPositions, this.size.width, this.size.height);
			this.svg = Render.svg(graphLines, sets, rowLabelText, columnLabelText, this.textSize, this.size.width, this.size.height);
		}

		this.barMakeSvg = function() {
			if(!this.horizontal) {
				this.barVerticalSvg();
			} else {
				this.barHorizontalSvg();
			}
		}

		this.barVerticalSvg = function() {
			this.makeCalculations();
			// Calculate grid positions
			this.columnLabelPositions = Utils.calculateColumnPositions(this.labels, this.size.width);
			this.rowLabelPositions = Utils.calculateRowPositions(this.pointIncrements, this.size.height);
			// Render text
			var columnLabelText = Render.columnLabelText(this.labels, this.columnLabelPositions, this.textSize, this.size.width, this.size.height);
			var rowLabelText = Render.rowLabelText(this.pointIncrements, this.rowLabelPositions, this.textSize, this.size.width, this.size.height);
			// Render sets
			var sets = Render.barSets(this.columnLabelPositions, this.points, this.pointIncrements[0], this.size.height, this.colors);
			// Render graph
			var graphLines = Render.graphLines(this.columnLabelPositions, this.rowLabelPositions, this.size.width, this.size.height);
			this.svg = Render.svg(graphLines, sets, rowLabelText, columnLabelText, this.textSize, this.size.width, this.size.height);
		}

		this.barHorizontalSvg = function() {
			this.makeCalculations();
			// Calculate grid positions
			this.columnLabelPositions = Utils.calculateColumnPositions(this.pointIncrements, this.size.width);
			this.rowLabelPositions = Utils.calculateRowPositions(this.labels, this.size.height);
			// Render text
			var columnLabelText = Render.columnLabelText(this.pointIncrements.reverse(), this.columnLabelPositions, this.textSize, this.size.width, this.size.height);
			var rowLabelText = Render.rowLabelText(this.labels, this.rowLabelPositions, this.textSize, this.size.width, this.size.height);
			// Render sets
			var sets = Render.barSetsHorizontal(this.rowLabelPositions, this.points, this.pointIncrements[this.pointIncrements.length - 1], this.size.width, this.colors);
			// Render graph
			var graphLines = Render.graphLines(this.columnLabelPositions, this.rowLabelPositions, this.size.width, this.size.height);
			this.svg = Render.svg(graphLines, sets, rowLabelText, columnLabelText, this.textSize, this.size.width, this.size.height);
		}

		this.pieMakeSvg = function() {
			this.range = Utils.getMinMax(this.points);
			var sets = Render.pieSets(this.points, this.range, this.size.width, this.size.height, this.colors);
			this.svg = Render.svg(null, sets, null, null, this.textSize, this.size.width, this.size.height);
		}

		/**
		 * Render
		 *
		 */
		this.render = function() {
			this.colors = ['#2388F2', '#F65237', '#0DEFA5', '#9B7CF3'];
			switch(this.type) {
				case 'line':
					this.lineMakeSvg();
					break;
				case 'bar':
					this.barMakeSvg();
					break;
				case 'pie':
					this.pieMakeSvg();
					break;
			}
			this.container.innerHTML = this.svg;
		};
		
		/**
		 * Setters 
		 *
		 */
		this.setType = function(type) {
			this.type = type;
		};

		this.setSize = function(width, height) {
			this.size.width = width;
			this.size.height = height;
		};

		this.setLabels = function(labels) {
			this.labels = labels;
		};
		
		this.setPoints = function(points) {
			this.points = points;
		};
		
		this.setIncrement = function(increment) {
			this.increment = increment;
		};

		this.setHorizontal = function(bool) {
			this.horizontal = bool;
		};
		
		// Return
		return this;
	};

	Array.max = function(array) {
		return Math.max.apply(Math, array);
	};

	Array.min = function(array) {
		return Math.min.apply(Math, array);
	};

	module.exports = Graph;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	function Utils() {}

	Utils.prototype.attributesToString = function(attributes) {
		var string = '';
		for(var attribute in attributes) {
			var attr = attribute.replace(/[A-Z]/g, function(v) {
				return '-' + v.toLowerCase();
			});
			string += attr + '="' + attributes[attribute] + '" '; 
		}
		return string;
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
	}

	Utils.prototype.getMinMax = function(points) {
		var range = {};
		var flatten = this.flattenPoints(points);
		range.min = Array.min(flatten);
		range.max = Array.max(flatten);
		return range;
	}

	Utils.prototype.calculateColumnPositions = function(labels, width) {
		var positions = [];
		var size = 	width / (labels.length - 1);
		labels.forEach(function(label, index, array) {
			var x = Math.round((size * index));
			positions.push(x);
		});
		return positions;
	};

	Utils.prototype.calculateRowPositions = function(labels, height) {
		var positions = [];
		var size = 	height / (labels.length - 1);
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

	module.exports = new Utils();

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Utils = __webpack_require__(2);
	var Draw = __webpack_require__(4);

	function Render() {}

	Render.prototype.columnLabelText = function(labels, labelPositions, textSize, width, height) {
		var render = '';
		labels.forEach(function(label, index, array) {
			var x = labelPositions[index] + (textSize / 2);
			var text = Draw.text({x: x, y: height, fontSize: textSize, fontFamily: 'monospace', textAnchor: 'middle' }, label);
			render += text;
		});
		return render;
	};

	Render.prototype.rowLabelText = function(labels, labelPositions, textSize, width, height) {
		var render = '';
		labels.forEach(function(label, index, array) {
			var y = labelPositions[index] + (textSize / 2);
			var text = Draw.text({x: 0, y: y, fontSize: textSize, fontFamily: 'monospace', textAnchor: 'right'}, label);
			render += text;
		});
		return render;
	};

	Render.prototype.graphLines = function(labelPositions, pointPositions, width, height) {
		var lines = '';
		labelPositions.forEach(function(label, index, array) {
			var x = labelPositions[index];
			var line = Draw.line({x1: x, y1: 0, x2: x, y2: height, stroke: '#ccc', strokeDasharray: '5, 5'});
			lines += line;
		});
		pointPositions.forEach(function(item, index, array) {
			var y = pointPositions[index];
			var line = Draw.line({x1: 0, y1: y, x2: width, y2: y, stroke: '#ccc', strokeDasharray: '5, 5'});
			lines += line;
		});
		return lines;
	};

	Render.prototype.lineSets = function(columnPositions, sets, yMax, height, colors) {
		var paths = [];
		sets.forEach(function(set, index, array) {
			var newSet = [];
			set.forEach(function(y, index, array) {
				var type = (index > 0) ? '' : 'M';
				newSet.push({type: type, values: [columnPositions[index], Utils.calculateY(y, yMax, height)]});
			});
			var path = Draw.path({ fill: 'transparent', stroke: colors[index], strokeWidth: '6', strokeLinecap: 'round' }, newSet);
			paths.push(path);
		});
		return paths;
	};

	Render.prototype.barSets = function(columnPositions, sets, yMax, height, colors) {
		var paths = [];
		sets.forEach(function(set, i, array) {
			var index = 0;
			set.sort(Utils.sortDesc);
			set.forEach(function(y, j, array) {
				var strokeWidth = 16;
				var gutter = -(strokeWidth / 4);
				var shadowOffset = -(strokeWidth / 3);
				var offset = ((strokeWidth + gutter) * (set.length - 1)) / 2;
				var shadowAttributes = {transform: 'translate(' + shadowOffset + ', 0)', opacity: '0.15', fill: 'transparent', stroke: '#000', strokeWidth: strokeWidth, strokeLinecap: 'round'};
				var attributes = {fill: 'transparent', stroke: colors[index], strokeWidth: strokeWidth, strokeLinecap: 'round'};
				var x = (columnPositions[i] + (j * (strokeWidth + gutter))) - offset;
				// Normal
				if(typeof y === 'number') {
					var newSet = [
						{type: 'M', values: [x, Utils.calculateY(0, yMax, height)]},
						{type: '', values: [x, Utils.calculateY(y, yMax, height) + (strokeWidth / 2)]}
					];
					paths.push(Draw.path(shadowAttributes, newSet));
					paths.push(Draw.path(attributes, newSet));
					index++;
				}
				// Stacked
				else if(typeof y === 'object') {
					y.sort(Utils.sortDesc);
					y.map(function(y1) {
						// Update stroke color since index increases
						attributes.stroke = colors[index];
						var newSet = [
							{ type: 'M', values: [x, Utils.calculateY(0, yMax, height)] },
							{ type: '', values: [x, Utils.calculateY(y1, yMax, height) + (strokeWidth / 2)] }
						];
						paths.push(Draw.path(shadowAttributes, newSet));
						paths.push(Draw.path(attributes, newSet));
						index++;
					});
				}
			});
		});
		return paths;
	};

	Render.prototype.barSetsHorizontal = function(columnPositions, sets, xMax, width, colors) {
		var paths = [];
		sets.forEach(function(set, i, array) {
			var index = 0;
			set.sort(Utils.sortDesc);
			set.forEach(function(x, j, array) {
				var strokeWidth = 16;
				var gutter = -(strokeWidth / 4);
				var shadowOffset = (strokeWidth / 3);
				var offset = ((strokeWidth + gutter) * (set.length - 1)) / 2;
				var shadowAttributes = {transform: 'translate(' + shadowOffset + ', 0)', opacity: '0.15', fill: 'transparent', stroke: '#000', strokeWidth: strokeWidth, strokeLinecap: 'round'};
				var attributes = {fill: 'transparent', stroke: colors[index], strokeWidth: strokeWidth, strokeLinecap: 'round'};
				var y = (columnPositions[i] + (j * (strokeWidth + gutter))) - offset;
				// Normal
				if(typeof x === 'number') {
					var newSet = [
						{ type: 'M', values: [Utils.calculateX(0, xMax, width), y] },
						{ type: '', values: [Utils.calculateX(x, xMax, width) - (strokeWidth / 2), y] }
					];
					paths.push(Draw.path(shadowAttributes, newSet));
					paths.push(Draw.path(attributes, newSet));
					index++;
				}
				// Stacked
				else if(typeof x === 'object') {
					x.sort(Utils.sortDesc);
					x.map(function(x1) {
						// Update stroke color since index increases
						attributes.stroke = colors[index];
						var newSet = [
							{ type: 'M', values: [Utils.calculateX(0, xMax, width), y] },
							{ type: '', values: [Utils.calculateX(x1, xMax, width) - (strokeWidth / 2), y] }
						];
						paths.push(Draw.path(shadowAttributes, newSet));
						paths.push(Draw.path(attributes, newSet));
						index++;
					});
				}
			});
		});
		return paths;
	};

	Render.prototype.pieSets = function(sets, range, width, height, colors) {
		var paths = [];
		var sets = [180, 90, 45, 45];

		var center = { x: (width / 2), y: (height / 2) };
		var radius = (height / 2);
		paths.push(Draw.circle({ cx: center.x, cy: center.y, r: radius, fill: 'red' }));

		sets.forEach(function(set, index, array) {
			var attributes = { fill: colors[index] };
			var sliceOffset = ((index > 0) ? sets[index - 1] : 0);
			var rotation = - (sliceOffset + 90);
			var startAngle = 0 + rotation;
			var endAngle = set + rotation;
			var splitAngle = 180 + rotation;
			var x1 = Utils.calculateAngleX(center.x, radius, startAngle);
			var y1 = Utils.calculateAngleY(center.y, radius, startAngle);
			var vectors = [
				{type: 'M', values: [center.x, center.y]},
				{type: '',  values: [x1, y1]}
			];
			var angles = [];
			// If angle is larger than 180, add a arch at 180 degrees
			if(endAngle > 180) {
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

			paths.push(Draw.path(attributes, vectors));
		});
		return paths;
	};

	Render.prototype.svg = function(graph, sets, pointText, labelText, textSize, width, height) {
		var widthOffset = (textSize / 2) + 120;
		var heightOffset = (textSize / 2) + 50;
		var width = width + widthOffset;
		var height = height + heightOffset;
		var attributes = Utils.attributesToString({ width: width, height: height });
		var svg = [
			'<svg style="border: 1px solid #ccc;" ' + attributes + '>',
				'<g transform="translate('+(widthOffset/2)+','+(heightOffset/2)+')">'+graph+'</g>',
				'<g transform="translate('+(widthOffset/2)+','+(heightOffset/2)+')">'+sets+'</g>',
				'<g transform="translate('+0+','+(heightOffset/2)+')">'+pointText+'</g>',
				'<g transform="translate('+(widthOffset/2)+','+(heightOffset)+')">'+labelText+'</g>',
			'</svg>'
		];
		return svg;
	};

	module.exports = new Render();


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Utils = __webpack_require__(2);

	function Draw() {}

	Draw.prototype.text = function(attributes, children) {
		attributes = Utils.attributesToString(attributes);
		var text = '<text ' + attributes + '>' + children + '</text>';
		return text;
	}

	Draw.prototype.line = function(attributes) {
		attributes = Utils.attributesToString(attributes);
		var line = '<line ' + attributes + '/>';
		return line;
	}

	Draw.prototype.circle = function(attributes) {
		attributes = Utils.attributesToString(attributes);
		var circle = '<circle ' + attributes + '/>';
		return circle;
	}

	Draw.prototype.path = function(attributes, vectors) {
		attributes = Utils.attributesToString(attributes);
		var d = '';
		vectors.forEach(function(vector, index, array) {
			d += vector.type;
			if(vector.values) {
				vector.values.map(function(value) {
					d += value + ' ';
				});
			}
		});
		var path = '<path ' + attributes + ' d="' + d + '" />';
		return path;
	}

	module.exports = new Draw();


/***/ }
/******/ ]);