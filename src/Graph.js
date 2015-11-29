"use strict";
var Utils = require('./Utils');
var Render = require('./Render');

var Graph = function(container) {
	
	// Parameters
	this.container = container;

	this.type = 'line';
	this.size = { width: 400, height: 400 };
	this.increment = 0;
	this.textSize = 12;
	this.max = {x: 0, y: 0};
	this.min = {x: 0, y: 0};

	this.labels = [];
	this.points = [];
	this.pointIncrements = [];

	this.columnLabelPositions = [];
	this.rowLabelPositions = [];

	this.horizontal = false;
	this.svg = '';
	
	/**
	 * Setup 
	 *
	 */
	this.makeCalculations = function() {
		var flatten = Utils.flattenPoints(this.points);
		this.min.y = Array.min(flatten);
		this.max.y = Array.max(flatten);
		this.pointIncrements = Utils.getPointIncrements(this.max.y, this.increment);
	}

	this.lineMakeSvg = function() {
		// Calculate grid positions
		this.columnLabelPositions = Utils.calculateColumnPositions(this.labels, this.size.width);
		this.rowLabelPositions = Utils.calculateRowPositions(this.pointIncrements, this.size.height);
		// Render text and set
		var columnLabelText = Render.columnLabelText(this.labels, this.columnLabelPositions, this.textSize, this.size.width, this.size.height);
		var rowLabelText = Render.rowLabelText(this.pointIncrements, this.rowLabelPositions, this.textSize, this.size.width, this.size.height);
		var sets = Render.lineSets(this.columnLabelPositions, this.points, this.max.y, this.size.height);
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
		// Calculate grid positions
		this.columnLabelPositions = Utils.calculateColumnPositions(this.labels, this.size.width);
		this.rowLabelPositions = Utils.calculateRowPositions(this.pointIncrements, this.size.height);
		// Render text and set
		var columnLabelText = Render.columnLabelText(this.labels, this.columnLabelPositions, this.textSize, this.size.width, this.size.height);
		var rowLabelText = Render.rowLabelText(this.pointIncrements, this.rowLabelPositions, this.textSize, this.size.width, this.size.height);
		var sets = Render.barSets(this.columnLabelPositions, this.points, this.pointIncrements[0], this.size.height);
		var graphLines = Render.graphLines(this.columnLabelPositions, this.rowLabelPositions, this.size.width, this.size.height);
		this.svg = Render.svg(graphLines, sets, rowLabelText, columnLabelText, this.textSize, this.size.width, this.size.height);
	}

	this.barHorizontalSvg = function() {
		// Calculate grid positions
		this.columnLabelPositions = Utils.calculateColumnPositions(this.pointIncrements, this.size.width);
		this.rowLabelPositions = Utils.calculateRowPositions(this.labels, this.size.height);
		// Render text and set
		var columnLabelText = Render.columnLabelText(this.pointIncrements.reverse(), this.columnLabelPositions, this.textSize, this.size.width, this.size.height);
		var rowLabelText = Render.rowLabelText(this.labels, this.rowLabelPositions, this.textSize, this.size.width, this.size.height);
		var sets = Render.barSetsHorizontal(this.rowLabelPositions, this.points, this.pointIncrements[this.pointIncrements.length - 1], this.size.width);
		var graphLines = Render.graphLines(this.columnLabelPositions, this.rowLabelPositions, this.size.width, this.size.height);
		this.svg = Render.svg(graphLines, sets, rowLabelText, columnLabelText, this.textSize, this.size.width, this.size.height);
	}

	/**
	 * Render
	 *
	 */
	this.render = function() {
		this.makeCalculations();
		switch(this.type) {
			case 'line':
				this.lineMakeSvg();
				break;
			case 'bar':
				this.barMakeSvg();
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