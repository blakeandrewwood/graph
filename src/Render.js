"use strict";
var Utils = require('./Utils');
var Draw = require('./Draw');

function Render() {}

Render.prototype.columnLabelText = function(labels, labelPositions, textSize, width, height) {
	var render = '';
	labels.forEach(function(label, index, array) {
		var x = labelPositions[index] + (textSize/2);
		var text = Draw.text({x: x, y: height, fontSize: textSize, fontFamily: 'monospace', textAnchor: 'middle' }, label);
		render += text;
	});
	return render;
};

Render.prototype.rowLabelText = function(labels, labelPositions, textSize, width, height) {
	var render = '';
	labels.forEach(function(label, index, array) {
		// Text
		var y = labelPositions[index] + (textSize/2);
		var text = Draw.text({x: 0, y: y, fontSize: textSize, fontFamily: 'monospace', textAnchor: 'right'}, label);
		render += text;
	});
	return render;
};

Render.prototype.graphLines = function(labelPositions, pointIncrements, pointPositions, width, height) {
	var lines = '';
	labelPositions.forEach(function(label, index, array) {
		var x = labelPositions[index];
		var line = Draw.line({x1: x, y1: 0, x2: x, y2: height, stroke: '#ccc', strokeDasharray: '5, 5'});
		lines += line;
	});
	pointIncrements.forEach(function(item, index, array) {
		var y = pointPositions[index];
		var line = Draw.line({x1: 0, y1: y, x2: width, y2: y, stroke: '#ccc', strokeDasharray: '5, 5'});
		lines += line;
	});
	return lines;
};

Render.prototype.lineSets = function(columnPositions, sets, yMax, height) {
	var colors = ['#2388F2', '#F65237', '#0DEFA5', '#9B7CF3'];
	var paths = [];
	sets.forEach(function(set, index, array) {
		var newSet = [];
		set.forEach(function(y, index, array) {
			newSet.push([columnPositions[index], Utils.calculateY(y, yMax, height)]);
		});
		var path = Draw.path({ fill: 'transparent', stroke: colors[index], strokeWidth: '8', strokeLinecap: 'round' }, newSet);
		paths.push(path);
	});
	return paths;
};

Render.prototype.barSets = function(columnPositions, sets, yMax, height, stack) {
	var colors = ['#2388F2', '#F65237', '#0DEFA5', '#9B7CF3'];
	var paths = [];
	sets.forEach(function(set, i, array) {
		var sortedSet = set.sort(function(a, b){return b-a});
		sortedSet.forEach(function(y, j, array) {
			var newSet = [];
			var strokeWidth = 16;
			var gutter = -(strokeWidth / 4);
			var shadowOffset = -(strokeWidth / 3);
			var offset = ((strokeWidth + gutter) * (set.length - 1)) / 2;
			var x = (stack) ? columnPositions[i] : (columnPositions[i] + (j * (strokeWidth + gutter))) - offset;
			newSet.push([x, Utils.calculateY(0, yMax, height)]);
			newSet.push([x, Utils.calculateY(set[j], yMax, height) + (strokeWidth / 2)]);
			var shadow = Draw.path({ transform: 'translate(' + shadowOffset + ', 0)', opacity: '0.15', fill: 'transparent', stroke: '#000', strokeWidth: strokeWidth, strokeLinecap: 'round' }, newSet);
			var path = Draw.path({ fill: 'transparent', stroke: colors[j], strokeWidth: strokeWidth, strokeLinecap: 'round' }, newSet);
			paths.push(shadow);
			paths.push(path);
		});
	});
	return paths;
};

Render.prototype.svg = function(graph, sets, pointText, labelText, textSize, width, height) {
	var offset = (textSize / 2) + 50;
	var width = width + offset;
	var height = height + offset;
	var attributes = Utils.attributesToString({ width: width, height: height });
	var svg = [
		'<svg style="border: 1px solid #ccc;" ' + attributes + '>',
			'<g transform="translate(' + (offset/2) + ',' + (offset/2) + ')">' + graph + '</g>',
			'<g transform="translate(' + (offset/2) + ',' + (offset/2) + ')">' + sets + '</g>',
			'<g transform="translate(' + 0 + ',' + (offset/2) + ')">' + pointText + '</g>',
			'<g transform="translate(' + (offset/2) + ',' + (offset) + ')">' + labelText + '</g>',
		'</svg>'
	];
	return svg;
};

module.exports = new Render();
