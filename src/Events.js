"use strict";
var Draw = require('./Draw');
var Render = require('./Render');
var Utils = require('./Utils');

function Events() {}

Events.prototype.getSvg = function(containerId) {
	var container = document.getElementById(containerId);
	var svg = container.getElementsByTagName('svg')[0];
	var tooltipId = containerId + '-tooltip';
	var tooltip = document.getElementById(tooltipId);
	var object = {
		container: container,
		svg: svg,
		tooltipId: tooltipId,
		tooltip: tooltip
	}
	return object;
};

Events.prototype.onMouseOver = function(evt, application, index, rowMax) {
	var svg = this.getSvg(application.containerId);
	var color = application.colors[index];

	// Get position
	var containerOffset = Utils.getElementOffset(svg.container);
	var svgOffset = Utils.getElementOffset(svg.svg);

	// Make calculations
	var width = application.size.width;
	var height = application.size.height;
	var padding = application.padding;
	var x = evt.clientX - containerOffset.left;
	var y = evt.clientY - containerOffset.top;
	var nx = (evt.clientX - svgOffset.left) - (padding.x/2);
	var ny = (evt.clientY - svgOffset.top) - (padding.y/2); 
	var d = application.labels.positions.column.length - 1;

	// Percent between two nodes
	var p = nx/(width/d);

	// Index
	var i = Math.floor(p);

	// Calculate difference
	var nums = [application.points[index][i], application.points[index][i + 1]];
	var number = Math.floor(((nums[1] - nums[0]) * (p % 1)) + nums[0]);

	// Render
	if(!svg.tooltip) {
		var tooltipId = application.containerId + '-tooltip';
		var tooltip = Render.tooltip(tooltipId, x, y, color);
		Utils.setDivPosition(tooltip, x + 10, y + 10);
		Utils.appendChild(svg.container, tooltip);
	}

	// Update
	else {
		var textStyle = Utils.styleToString({
			padding: '0',
			margin: '0',
			fontFamily: application.font.family
		});
		if(!isNaN(number)) {
			var text = application.labels.prefix + (number.toString()) + application.labels.suffix;
			svg.tooltip.innerHTML = '<p style="' + textStyle + '">' + text + '</p>';
		}
		Utils.setDivPosition(svg.tooltip, x + 10, y + 10);
	}
};

Events.prototype.onMouseOut = function(evt, application) {
	var svg = this.getSvg(application.containerId);
	if(svg.tooltip) {
		svg.tooltip.remove();
	}
};

module.exports = Events;
