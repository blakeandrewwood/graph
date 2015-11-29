"use strict";
var Utils = require('./Utils');
var Draw = require('./Draw');

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

Render.prototype.lineSets = function(columnPositions, sets, yMax, height) {
	var colors = ['#2388F2', '#F65237', '#0DEFA5', '#9B7CF3'];
	var paths = [];
	sets.forEach(function(set, index, array) {
		var newSet = [];
		set.forEach(function(y, index, array) {
			newSet.push([columnPositions[index], Utils.calculateY(y, yMax, height)]);
		});
		var path = Draw.path({ fill: 'transparent', stroke: colors[index], strokeWidth: '6', strokeLinecap: 'round' }, newSet);
		paths.push(path);
	});
	return paths;
};

Render.prototype.barSets = function(columnPositions, sets, yMax, height) {
	var colors = ['#2388F2', '#F65237', '#0DEFA5', '#9B7CF3'];
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
					[x, Utils.calculateY(0, yMax, height)],
					[x, Utils.calculateY(y, yMax, height) + (strokeWidth / 2)]
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
						[x, Utils.calculateY(0, yMax, height)],
						[x, Utils.calculateY(y1, yMax, height) + (strokeWidth / 2)]
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

Render.prototype.barSetsHorizontal = function(columnPositions, sets, xMax, width) {
	var colors = ['#2388F2', '#F65237', '#0DEFA5', '#9B7CF3'];
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
					[Utils.calculateX(0, xMax, width), y],
					[Utils.calculateX(x, xMax, width) - (strokeWidth / 2), y]
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
						[Utils.calculateX(0, xMax, width), y],
						[Utils.calculateX(x1, xMax, width) - (strokeWidth / 2), y]
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
