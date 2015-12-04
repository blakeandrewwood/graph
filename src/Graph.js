"use strict";
var Utils = require('./Utils');
var Draw = require('./Draw');
var Render = require('./Render');
var Events = require('./Events');
window.Events = new Events();

function Graph(moduleName) {
	// Module name
	this.moduleName = moduleName;
	// Parameters
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
	this.moduleName = moduleName;
	this.container;
	this.svg;
}

Graph.prototype.makeLineBarCalculations = function() {
	this.range = Utils.getMinMax(this.points);
	this.labels.row = Utils.getPointIncrements(this.range.max, this.labels.increment);
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

Graph.prototype.lineMakeSvg = function() {
	this.makeLineBarCalculations();
	this.labels.positions.row = Utils.calculateRowPositions(this.labels.row, this.size.height);
	this.labels.positions.column = Utils.calculateColumnPositions(this.labels.column, this.size.width);

	var graphLines = Render.graphLines(this.labels, this.size);
	var columnLabelText = Render.columnLabelText(this.labels, this.labels.column, this.font, this.size);
	var rowLabelText = Render.rowLabelText(this.labels, this.labels.row, this.font, this.size);
	var sets = Render.lineSets(this.labels.positions.column, this.labels.row[0], this.points, this.range, this.size, this.colors);

	var children = [];
	var g1 = Draw.group({ transform: 'translate('+this.widthOffset/2+','+this.heightOffset/2+')' }, graphLines);
	var g2 = Draw.group({ transform: 'translate('+this.widthOffset/2+','+this.heightOffset/2+')' }, sets);
	var g3 = Draw.group({ transform: 'translate('+this.widthOffset/2+','+this.heightOffset+')' }, columnLabelText);
	var g4 = Draw.group({ transform: 'translate('+0+','+this.heightOffset/2+')' }, rowLabelText);
	children.push(g1);
	children.push(g2);
	children.push(g3);
	children.push(g4);
	var g = Draw.group({}, children);

	this.svg = Render.svg(this.container, this.font.size, this.size, this.padding);
	Utils.appendChild(this.svg, g);
};

Graph.prototype.barMakeSvg = function() {
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

	var children = [];
	var g1 = Draw.group({ transform: 'translate('+this.widthOffset/2+','+this.heightOffset/2+')' }, graphLines);
	var g2 = Draw.group({ transform: 'translate('+this.widthOffset/2+','+this.heightOffset/2+')' }, sets);
	var g3 = Draw.group({ transform: 'translate('+this.widthOffset/2+','+this.heightOffset+')' }, columnLabelText);
	var g4 = Draw.group({ transform: 'translate('+0+','+this.heightOffset/2+')' }, rowLabelText);
	children.push(g1);
	children.push(g2);
	children.push(g3);
	children.push(g4);
	var g = Draw.group({}, children);

	this.svg = Render.svg(this.container, this.font.size, this.size, this.padding);
	Utils.appendChild(this.svg, g);
};

Graph.prototype.pieMakeSvg = function() {
	// Calculation
	this.makePieDoughnutCalculations();

	// Render
	var bottomLeftLabelText = Render.bottomLeftLabelText(this.labels.column, this.font, this.size, this.colors);
	var sets = Render.pieSets(this.degrees, this.size, this.colors, this.shadow);

	// Group
	var children = [];
	var g1 = Draw.group({ transform: 'translate('+0+','+this.heightOffset+')' }, bottomLeftLabelText);
	var g2 = Draw.group({ transform: 'translate('+this.widthOffset/2+','+this.heightOffset/2+')' }, sets);
	children.push(g1);
	children.push(g2);
	var g = Draw.group({}, children);

	// Return
	this.svg = Render.svg(this.container, this.font.size, this.size, this.padding);
	Utils.appendChild(this.svg, g);
};

Graph.prototype.doughnutMakeSvg = function() {
	// Calculation
	this.makePieDoughnutCalculations();

	// Render
	var bottomLeftLabelText = Render.bottomLeftLabelText(this.labels.column, this.font, this.size, this.colors);
	//var centerLabelText = Render.centerLabelText('50', this.font, this.size, '#000');
	var sets = Render.doughnutSets(this.degrees, this.size, this.colors, this.shadow);

	// Group
	var children = [];
	var g1 = Draw.group({ transform: 'translate('+0+','+this.heightOffset+')' }, bottomLeftLabelText);
	var g2 = Draw.group({ transform: 'translate('+this.widthOffset/2+','+this.heightOffset/2+')' }, sets);
	children.push(g1);
	children.push(g2);
	var g = Draw.group({}, children);

	// Return
	this.svg = Render.svg(children, this.font.size, this.size, this.padding);
	Utils.appendChild(this.svg, g);
};

Graph.prototype.dialMakeSvg = function() {
	// Calculation
	this.makeDialCalculations();

	// Render
	//var centerLabelText = Render.centerLabelText((this.percentages[0] * 100), this.font, this.size, '#fff');
	//var bottomCenterLabelText = Render.bottomCenterLabelText(this.points[0][0] + '/' + this.points[0][1], this.font, this.size, '#000');
	var sets = Render.dialSets(this.degrees, this.percentages, this.size, this.colors, this.shadow);

	// Group
	var children = [];
	var g1 = Draw.group({ transform: 'translate('+this.widthOffset/2+','+this.heightOffset/2+')' }, sets);
	children.push(g1);
	var g = Draw.group({}, children);

	// Return 
	this.svg = Render.svg(children, this.font.size, this.size, this.padding);
	Utils.appendChild(this.svg, g);
};

/**
 * Main Render 
 *
 */
Graph.prototype.render = function() {
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
	Utils.appendChild(this.container, this.svg);
};

/**
 * Setters
 *
 */
Graph.prototype.setContainer = function(container) {
	this.container = document.getElementById(container);
};

Graph.prototype.setType = function(type) {
	this.type = type;
};

Graph.prototype.setSize = function(width, height) {
	this.size.width = width;
	this.size.height = height;
};

Graph.prototype.setLabels = function(labels) {
	this.labels.column = labels;
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

module.exports = Graph;
