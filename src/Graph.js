"use strict";
var Utils = require('./Utils');
var Draw = require('./Draw');
var Render = require('./Render');

var Graph = function() {
	
	// Parameters
	this.container = '';
	this.type = 'line';
	this.size = { width: 400, height: 400 };
	this.range = { min: 0, max: 0 };
	this.points = [];

	this.labels = {
		row: [],
		column: [],
		positions: {
			row: [],
			column: []
		},
		increment: 10,
		prefix: '',
		suffix: ''
	}

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
	this.svg = '';
	
	/**
	 * Setup 
	 *
	 */
	this.makeLineBarCalculations = function() {
		this.range = Utils.getMinMax(this.points);
		this.labels.row = Utils.getPointIncrements(this.range.max, this.labels.increment);
	}

	this.makePieDoughnutCalculations = function() {
		this.range = Utils.getMinMax(this.points);
		this.percentages = Utils.getSetPercentages(this.points);
		this.degrees = Utils.getDegrees(this.percentages, 360);
	}

	this.makeDialCalculations = function() {
		this.range = Utils.getMinMax(this.points);
		this.percentages = Utils.getPercentages(this.points);
		this.degrees = Utils.getDegrees(this.percentages, 260);
	}

	this.lineMakeSvg = function() {
		// Calculation
		this.makeLineBarCalculations();
		this.labels.positions.row = Utils.calculateRowPositions(this.labels.row, this.size.height);
		this.labels.positions.column = Utils.calculateColumnPositions(this.labels.column, this.size.width);

		// Render text
		var graphLines = Render.graphLines(this.labels, this.size);
		var columnLabelText = Render.columnLabelText(this.labels, this.labels.column, this.font, this.size);
		var rowLabelText = Render.rowLabelText(this.labels, this.labels.row, this.font, this.size);
		var sets = Render.lineSets(this.labels, this.points, this.range, this.size, this.colors);

		// Group
		var children = [];
		children.push(Draw.group({ transform: 'translate('+this.widthOffset/2+','+this.heightOffset/2+')' }, graphLines));
		children.push(Draw.group({ transform: 'translate('+0+','+this.heightOffset/2+')' }, rowLabelText));
		children.push(Draw.group({ transform: 'translate('+this.widthOffset/2+','+this.heightOffset+')' }, columnLabelText));
		children.push(Draw.group({ transform: 'translate('+this.widthOffset/2+','+this.heightOffset/2+')' }, sets));

		// Return
		this.svg = Render.svg(children, this.font.size, this.size, this.padding);
	}

	this.barMakeSvg = function() {
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

		this.labels.positions.column = Utils.calculateColumnPositions(columnLabels, this.size.width);
		this.labels.positions.row = Utils.calculateRowPositions(rowLabels, this.size.height);

		// Render
		var graphLines = Render.graphLines(this.labels, this.size);
		var columnLabelText = Render.columnLabelText(this.labels, columnLabels, this.font, this.size);
		var rowLabelText = Render.rowLabelText(this.labels, rowLabels, this.font, this.size);
		var sets = Render.barSets(this.labels, this.points, this.size, this.horizontal, this.colors, this.shadow);

		// Group
		var children = [];
		children.push(Draw.group({ transform: 'translate('+this.widthOffset/2+','+this.heightOffset/2+')' }, graphLines));
		children.push(Draw.group({ transform: 'translate('+0+','+this.heightOffset/2+')' }, rowLabelText));
		children.push(Draw.group({ transform: 'translate('+this.widthOffset/2+','+this.heightOffset+')' }, columnLabelText));
		children.push(Draw.group({ transform: 'translate('+this.widthOffset/2+','+this.heightOffset/2+')' }, sets));

		// Return
		this.svg = Render.svg(children, this.font.size, this.size, this.padding);
	}

	this.pieMakeSvg = function() {
		// Calculation
		this.makePieDoughnutCalculations();

		// Render
		var bottomLeftLabelText = Render.bottomLeftLabelText(this.labels.column, this.font, this.size, this.colors);
		var sets = Render.pieSets(this.degrees, this.size, this.colors, this.shadow);

		// Group
		var children = [];
		children.push(Draw.group({ transform: 'translate('+this.widthOffset/2+','+this.heightOffset/2+')' }, sets));
		children.push(Draw.group({ transform: 'translate('+0+','+this.heightOffset+')' }, bottomLeftLabelText));

		// Return
		this.svg = Render.svg(children, this.font.size, this.size, this.padding);
	}

	this.doughnutMakeSvg = function() {
		// Calculation
		this.makePieDoughnutCalculations();

		// Render
		var bottomLeftLabelText = Render.bottomLeftLabelText(this.labels.column, this.font, this.size, this.colors);
		var centerLabelText = Render.centerLabelText('50', this.font, this.size, '#000');
		var sets = Render.doughnutSets(this.degrees, this.size, this.colors, this.shadow);

		// Group
		var children = [];
		children.push(Draw.group({ transform: 'translate('+this.widthOffset/2+','+this.heightOffset/2+')' }, sets));
		children.push(Draw.group({ transform: 'translate('+0+','+this.heightOffset+')' }, bottomLeftLabelText));
		children.push(Draw.group({ transform: 'translate('+this.widthOffset/2+','+this.heightOffset/2+')' }, centerLabelText));

		// Return
		this.svg = Render.svg(children, this.font.size, this.size, this.padding);
	}

	this.dialMakeSvg = function() {
		// Calculation
		this.makeDialCalculations();

		// Render
		var centerLabelText = Render.centerLabelText((this.percentages[0] * 100), this.font, this.size, '#fff');
		var bottomCenterLabelText = Render.bottomCenterLabelText(this.points[0][0] + '/' + this.points[0][1], this.font, this.size, '#000');
		var sets = Render.dialSets(this.degrees, this.percentages, this.size, this.colors, this.shadow);

		// Group
		var children = [];
		children.push(Draw.group({ transform: 'translate('+this.widthOffset/2+','+this.heightOffset/2+')' }, sets));
		children.push(Draw.group({ transform: 'translate('+this.widthOffset/2+','+this.heightOffset/2+')' }, centerLabelText));
		children.push(Draw.group({ transform: 'translate('+this.widthOffset/2+','+this.heightOffset+')' }, bottomCenterLabelText));

		// Return 
		this.svg = Render.svg(children, this.font.size, this.size, this.padding);
	}

	/**
	 * Render
	 *
	 */
	this.render = function() {
		this.padding = { x: 120, y: 50 };
		this.widthOffset = (this.font.size / 2) + this.padding.x;
		this.heightOffset = (this.font.size / 2) + this.padding.y;
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
			case 'doughnut':
				this.doughnutMakeSvg();
				break;
			case 'dial':
				this.dialMakeSvg();
				break;
		}
		this.container.innerHTML = this.svg;
	};
	
	/**
	 * Setters 
	 *
	 */
	this.setContainer = function(container) {
		this.container = container;
	};

	this.setType = function(type) {
		this.type = type;
	};

	this.setSize = function(width, height) {
		this.size.width = width;
		this.size.height = height;
	};

	this.setLabels = function(labels) {
		this.labels.column = labels;
	};
	
	this.setPoints = function(points) {
		this.points = points;
	};
	
	this.setIncrement = function(increment) {
		this.labels.increment = increment;
	};

	this.setHorizontal = function(bool) {
		this.horizontal = bool;
	};

	this.setShadow = function(bool) {
		this.shadow = bool;
	};

	this.setColors= function(colors) {
		this.colors = colors;
	};

	this.setPrefix = function(prefix) {
		this.labels.prefix = prefix;
	};

	this.setSuffix = function(suffix) {
		this.labels.suffix = suffix;
	};

	this.setFontFamily = function(fontFamily) {
		this.font.family = fontFamily;
	};

	this.setFontSize = function(fontSize) {
		this.font.size = fontSize;
	};
	
	// Return
	return this;
};

module.exports = Graph;