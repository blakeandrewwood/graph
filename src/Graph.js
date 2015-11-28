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

	this.columnLabels = [];
	this.columnLabelPositions = [];
	this.rowLabels = [];
	this.rowLabelPositions = [];

	this.stack = false;
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
		this.columnLabelPositions = Utils.calculateColumnPositions(this.labels, this.size.width);
		this.pointIncrements = Utils.getPointIncrements(this.max.y, this.increment);
		this.rowLabelPositions = Utils.calculateRowPositions(this.pointIncrements, this.size.height);
	}

	this.lineMakeSvg = function() {
		var columnLabelText = Render.columnLabelText(this.labels, this.columnLabelPositions, this.textSize, this.size.width, this.size.height);
		var rowLabelText = Render.rowLabelText(this.pointIncrements, this.rowLabelPositions, this.textSize, this.size.width, this.size.height);
		var sets = Render.lineSets(this.columnLabelPositions, this.points, this.max.y, this.size.height);
		var graphLines = Render.graphLines(this.columnLabelPositions, this.pointIncrements, this.rowLabelPositions, this.size.width, this.size.height);
		this.svg = Render.svg(graphLines, sets, rowLabelText, columnLabelText, this.textSize, this.size.width, this.size.height);
	}

	this.barMakeSvg = function() {
		var columnLabelText = Render.columnLabelText(this.labels, this.columnLabelPositions, this.textSize, this.size.width, this.size.height);
		var rowLabelText = Render.rowLabelText(this.pointIncrements, this.rowLabelPositions, this.textSize, this.size.width, this.size.height);
		var sets = Render.barSets(this.columnLabelPositions, this.points, this.max.y, this.size.height, this.stack);
		var graphLines = Render.graphLines(this.columnLabelPositions, this.pointIncrements, this.rowLabelPositions, this.size.width, this.size.height);
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

	this.setStack = function(bool) {
		this.stack = bool;
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