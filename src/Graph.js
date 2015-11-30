"use strict";
var Utils = require('./Utils');
var Render = require('./Render');

var Graph = function() {
	
	// Parameters
	this.container = '';
	this.type = 'line';
	this.size = { width: 400, height: 400 };
	this.increment = 0;
	this.textSize = 12;
	this.range = { min: 0, max: 0 };
	this.labels = [];
	this.points = [];

	// Line, Bar
	this.pointIncrements = [];

	// Pie
	this.percentages = [];

	// Options
	this.columnLabelPositions = [];
	this.rowLabelPositions = [];
	this.colors = ['#2388F2', '#F65237', '#0DEFA5', '#9B7CF3'];
	this.horizontal = false;
	this.shadow = true;
	this.svg = '';
	
	/**
	 * Setup 
	 *
	 */
	this.makeLineBarCalculations = function() {
		this.range = Utils.getMinMax(this.points);
		this.pointIncrements = Utils.getPointIncrements(this.range.max, this.increment);
	}

	this.makePieDoughnutCalculations = function() {
		this.range = Utils.getMinMax(this.points);
		this.percentages = Utils.getPercentages(this.points);
		this.degrees = Utils.getDegrees(this.percentages);
	}

	this.lineMakeSvg = function() {
		this.makeLineBarCalculations();
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
		this.makeLineBarCalculations();
		// Calculate grid positions
		this.columnLabelPositions = Utils.calculateColumnPositions(this.labels, this.size.width);
		this.rowLabelPositions = Utils.calculateRowPositions(this.pointIncrements, this.size.height);
		// Render text
		var columnLabelText = Render.columnLabelText(this.labels, this.columnLabelPositions, this.textSize, this.size.width, this.size.height);
		var rowLabelText = Render.rowLabelText(this.pointIncrements, this.rowLabelPositions, this.textSize, this.size.width, this.size.height);
		// Render sets
		var sets = Render.barSets(this.columnLabelPositions, this.points, this.pointIncrements[0], this.size, this.horizontal, this.colors, this.shadow);
		// Render graph
		var graphLines = Render.graphLines(this.columnLabelPositions, this.rowLabelPositions, this.size.width, this.size.height);
		this.svg = Render.svg(graphLines, sets, rowLabelText, columnLabelText, this.textSize, this.size.width, this.size.height);
	}

	this.barHorizontalSvg = function() {
		this.makeLineBarCalculations();
		// Calculate grid positions
		this.columnLabelPositions = Utils.calculateColumnPositions(this.pointIncrements, this.size.width);
		this.rowLabelPositions = Utils.calculateRowPositions(this.labels, this.size.height);
		// Render text
		var columnLabelText = Render.columnLabelText(this.pointIncrements.reverse(), this.columnLabelPositions, this.textSize, this.size.width, this.size.height);
		var rowLabelText = Render.rowLabelText(this.labels, this.rowLabelPositions, this.textSize, this.size.width, this.size.height);
		// Render sets
		var sets = Render.barSets(this.rowLabelPositions, this.points, this.pointIncrements[this.pointIncrements.length - 1], this.size, this.horizontal, this.colors, this.shadow);
		// Render graph
		var graphLines = Render.graphLines(this.columnLabelPositions, this.rowLabelPositions, this.size.width, this.size.height);
		this.svg = Render.svg(graphLines, sets, rowLabelText, columnLabelText, this.textSize, this.size.width, this.size.height);
	}

	this.pieMakeSvg = function() {
		this.makePieDoughnutCalculations();
		var sets = Render.pieSets(this.degrees, this.size.width, this.size.height, this.colors, this.shadow);
		this.svg = Render.svg(null, sets, null, null, this.textSize, this.size.width, this.size.height);
	}

	this.doughnutMakeSvg = function() {
		this.makePieDoughnutCalculations();
		var sets = Render.doughnutSets(this.degrees, this.size.width, this.size.height, this.colors, this.shadow);
		this.svg = Render.svg(null, sets, null, null, this.textSize, this.size.width, this.size.height);
	}

	/**
	 * Render
	 *
	 */
	this.render = function() {
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

	this.setShadow = function(bool) {
		this.shadow = bool;
	};

	this.setColors= function(colors) {
		this.colors = colors;
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