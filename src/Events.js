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

Events.prototype.getNormalizedX = function(x, paddingX, cssPaddingX) {
	return ((x + cssPaddingX) - paddingX);
};

Events.prototype.getNormalizedY = function(y, paddingY, cssPaddingY) {
	return ((y - cssPaddingY) - paddingY);
};

Events.prototype.onMouseOver = function(evt, application, index, rowMax) {
	var svg = this.getSvg(application.containerId);
	var color = application.colors[index];
	// Get position
	var containerPosition = svg.container.getBoundingClientRect();
	var svgPosition = svg.svg.getBoundingClientRect();
	var x = ((evt.clientX) - containerPosition.left);
	var y = ((evt.clientY) - containerPosition.top);

	// Render
	if(!svg.tooltip) {
		var tooltipId = application.containerId + '-tooltip';
		var tooltip = Render.tooltip(tooltipId, x, y, color);
		Utils.setDivPosition(tooltip, x + 10, y + 10);
		Utils.appendChild(svg.container, tooltip);
	}

	// Update
	else {
		var width = application.size.width;
		var height = application.size.height;
		var padding = application.padding;
		var cssPadding = { x: 20, y: 20 };
		var nx = this.getNormalizedX(x, padding.x, cssPadding.x);
		var ny = this.getNormalizedY(y, padding.y, cssPadding.y);
		var d = window.columnPositions.length - 1;
		var p = (nx + cssPadding.x)/(width/d);
		var i = Math.floor(p);
		var cx = window.columnPositions[i] - cssPadding.x;
		var cy = Utils.calculateY(window.sets[index][i], rowMax, height);
		var nums = [window.sets[index][i], window.sets[index][i + 1]];
		var number = Math.floor(((nums[1] - nums[0]) * (p % 1)) + nums[0]);

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
