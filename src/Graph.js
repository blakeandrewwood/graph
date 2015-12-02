"use strict";
var Utils = require('./Utils');
var Render = require('./Render');

var Graph = function() {
	
	// Parameters
	this.container = '';
	this.type = 'line';
	this.size = { width: 400, height: 400 };
	this.increment = 0;
	this.range = { min: 0, max: 0 };
	this.points = [];

	this.labels = {
		row: [],
		column: [],
		positions: {
			row: [],
			column: []
		},
		increment: 1,
		prefix: '',
		suffix: '',
		fontFamily: 'monospace',
		fontSize: 12,
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
		this.makeLineBarCalculations();
		// Calculate grid positions
		this.labels.positions.row = Utils.calculateRowPositions(this.labels.row, this.size.height);
		this.labels.positions.column = Utils.calculateColumnPositions(this.labels.column, this.size.width);
		// Render text
		var columnLabelText = Render.columnLabelText(this.labels, this.labels.column, this.size);
		var rowLabelText = Render.rowLabelText(this.labels, this.labels.row, this.size);
		// Render sets
		var sets = Render.lineSets(this.labels, this.points, this.range, this.size, this.colors);
		// Render graph
		var graphLines = Render.graphLines(this.labels, this.size);
		this.svg = Render.svg(graphLines, sets, rowLabelText, columnLabelText, null, this.labels.fontSize, this.size, this.padding);
	}

	this.barMakeSvg = function() {
		if(!this.horizontal) {
			this.barVerticalSvg();
		} else {
			this.barHorizontalSvg();
		}
	}

	this.barVerticalSvg = function() {
		this.makeLineBarCalculations();

		// Calculate grid positions
		this.labels.positions.row = Utils.calculateRowPositions(this.labels.row, this.size.height);
		this.labels.positions.column = Utils.calculateColumnPositions(this.labels.column, this.size.width);
		// Render text
		var columnLabelText = Render.columnLabelText(this.labels, this.labels.column, this.size);
		var rowLabelText = Render.rowLabelText(this.labels, this.labels.row, this.size);
		// Render sets
		var sets = Render.barSets(this.labels, this.points, this.size, this.horizontal, this.colors, this.shadow);
		// Render graph
		var graphLines = Render.graphLines(this.labels, this.size);
		this.svg = Render.svg(graphLines, sets, rowLabelText, columnLabelText, null, this.labels.fontSize, this.size, this.padding);
	}

	this.barHorizontalSvg = function() {
		this.makeLineBarCalculations();
		// Calculate grid positions
		this.labels.positions.row = Utils.calculateRowPositions(this.labels.column, this.size.height);
		this.labels.positions.column = Utils.calculateColumnPositions(this.labels.row, this.size.width);
		// Render text
		this.labels.row.reverse();
		var columnLabelText = Render.columnLabelText(this.labels, this.labels.row, this.size);
		var rowLabelText = Render.rowLabelText(this.labels, this.labels.column, this.size);
		// Render sets
		var sets = Render.barSets(this.labels, this.points, this.size, this.horizontal, this.colors, this.shadow);
		// Render graph
		var graphLines = Render.graphLines(this.labels, this.size);
		this.svg = Render.svg(graphLines, sets, rowLabelText, columnLabelText, null, this.labels.fontSize, this.size, this.padding);
	}

	this.pieMakeSvg = function() {
		this.makePieDoughnutCalculations();
		var sets = Render.pieSets(this.degrees, this.size, this.colors, this.shadow);
		this.svg = Render.svg(null, sets, null, null, null, this.labels.fontSize, this.size, this.padding);
	}

	this.doughnutMakeSvg = function() {
		this.makePieDoughnutCalculations();
		// Render text
		var centerLabelText = Render.centerLabelText('50', this.labels, this.size, this.padding);
		// Render sets
		var sets = Render.doughnutSets(this.degrees, this.size, this.colors, this.shadow);
		this.svg = Render.svg(null, sets, null, null, centerLabelText, this.labels.fontSize, this.size, this.padding);
	}

	this.dialMakeSvg = function() {
		this.makeDialCalculations();
		// Render text
		var centerLabelText = Render.centerLabelText('50', this.labels, this.size, this.padding);
		// Render sets
		var sets = Render.dialSets(this.degrees, this.percentages, this.size, this.colors, this.shadow);
		this.svg = Render.svg(null, sets, null, null, centerLabelText, this.labels.fontSize, this.size, this.padding);
	}

	/**
	 * Render
	 *
	 */
	this.render = function() {
		this.padding = { x: 120, y: 50 };
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
		this.labels.fontFamily = fontFamily;
	};

	this.setFontSize = function(fontSize) {
		this.labels.fontSize = fontSize;
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