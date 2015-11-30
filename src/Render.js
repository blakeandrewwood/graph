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

Render.prototype.lineSets = function(columnPositions, sets, yMax, height, colors) {
	var paths = [];
	sets.forEach(function(set, index, array) {
		var newSet = [];
		set.forEach(function(y, index, array) {
			var type = (index > 0) ? '' : 'M';
			newSet.push({type: type, values: [columnPositions[index], Utils.calculateY(y, yMax, height)]});
		});
		var path = Draw.path({ fill: 'transparent', stroke: colors[index], strokeWidth: '6', strokeLinecap: 'round' }, newSet);
		paths.push(path);
	});
	return paths;
};

Render.prototype.barSets = function(columnPositions, sets, yMax, height, colors) {
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
					{type: 'M', values: [x, Utils.calculateY(0, yMax, height)]},
					{type: '', values: [x, Utils.calculateY(y, yMax, height) + (strokeWidth / 2)]}
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
						{ type: 'M', values: [x, Utils.calculateY(0, yMax, height)] },
						{ type: '', values: [x, Utils.calculateY(y1, yMax, height) + (strokeWidth / 2)] }
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

Render.prototype.barSetsHorizontal = function(columnPositions, sets, xMax, width, colors) {
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
					{ type: 'M', values: [Utils.calculateX(0, xMax, width), y] },
					{ type: '', values: [Utils.calculateX(x, xMax, width) - (strokeWidth / 2), y] }
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
						{ type: 'M', values: [Utils.calculateX(0, xMax, width), y] },
						{ type: '', values: [Utils.calculateX(x1, xMax, width) - (strokeWidth / 2), y] }
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

Render.prototype.pieSets = function(sets, width, height, colors, shadow) {
	var slices = [];
	var center = { x: (width / 2), y: (height / 2) };
	var radius = (height / 2);
	sets.sort(Utils.sortDesc);
	var lastEndAngle = 0;
	sets.forEach(function(set, index, array) {
		var attributes = { fill: colors[index] };
		var sliceOffset = ((index > 0) ? lastEndAngle : 0);
		var rotation = -90 + sliceOffset;
		var startAngle = 0 + rotation;
		var endAngle = set + rotation;
		lastEndAngle += set;
		var splitAngle = 180 + rotation;
		var x1 = Utils.calculateAngleX(center.x, radius, startAngle);
		var y1 = Utils.calculateAngleY(center.y, radius, startAngle);
		var vectors = [
			{type: 'M', values: [center.x, center.y]},
			{type: '',  values: [x1, y1]}
		];
		var angles = [];
		// If angle is larger than 180, add a arch at 180 degrees
		if(set > 180) {
			angles.push(splitAngle);
		}
		angles.push(endAngle);
		angles.map(function(angle) {
			var x2 = Utils.calculateAngleX(center.x, radius, angle);
			var y2 = Utils.calculateAngleY(center.y, radius, angle);
			vectors.push({type: 'A', values: [radius, radius, 0, 0, 1]});
			vectors.push({type: '',  values: [x2, y2]});
		});
		vectors.push({type: 'Z'});
		slices.push(Draw.path(attributes, vectors));
	});

	// Compose
	var paths = []
	var group = Draw.group({}, slices);
	paths.push(Draw.filterShadow('pie-shadow', 8));
	paths.push(Draw.group({filter: 'url(#pie-shadow)', opacity: 0.2}, group));
	paths.push(group);

	// Return
	return paths;
};

Render.prototype.doughnutSets = function(sets, width, height, colors) {
	var center = { x: (width / 2), y: (height / 2) };
	var radius1 = (height / 2);
	var radius2 = radius1 - 40;
	var attributes = { fill: 'yellow', stroke: 'yellow', strokeWidth: '2' };
	var x1 = Utils.calculateAngleX(center.x, radius1, 0);
	var y1 = Utils.calculateAngleY(center.y, radius1, 0);
	var x2 = Utils.calculateAngleX(center.x, radius1, 180);
	var y2 = Utils.calculateAngleY(center.y, radius1, 180);
	var x3 = Utils.calculateAngleX(center.x, radius2, 0);
	var y3 = Utils.calculateAngleY(center.y, radius2, 0);
	var x4 = Utils.calculateAngleX(center.x, radius2, 180);
	var y4 = Utils.calculateAngleY(center.y, radius2, 180);
	var vectors = [
		{type: 'M', values: [x1, y1]},
		{type: 'A', values: [radius1, radius1, 0, 0, 1]},
		{type: '', values: [x2, y2]},
		{type: 'A', values: [radius1, radius1, 0, 0, 1]},
		{type: '', values: [x1, y1]},
		{type: 'Z'},
		{type: 'M', values: [x3, y3]},
		{type: 'A', values: [radius2, radius2, 0, 0, 0]},
		{type: '', values: [x4, y4]},
		{type: 'A', values: [radius2, radius2, 0, 0, 0]},
		{type: '', values: [x3, y3]},
		{type: 'Z'},
	];

	// Compose
	var paths = [];
	var doughnut = Draw.path(attributes, vectors);
	paths.push(Draw.clipPath('doughnut-clip', doughnut));
	paths.push(Draw.filterShadow('doughnut-shadow', 8));
	var pie = this.pieSets(sets, width, height, colors, false);
	var group = Draw.group({clipPath: 'url(#doughnut-clip)'}, pie);
	var shadow = Draw.group({filter: 'url(#doughnut-shadow)', opacity: 0.2}, group);
	paths.push(shadow);
	paths.push(group);

	// Return
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
