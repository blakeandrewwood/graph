"use strict";
var Utils = require('./Utils');
var Draw = require('./Draw');

function Render() {}

Render.prototype.columnLabelText = function(labels, columnLabels, font, size) {
	var render = '';
	columnLabels.forEach(function(label, index, array) {
		var x = labels.positions.column[index];
		var text = labels.prefix + label + labels.suffix;
		var textSvg = Draw.text({
			x: x,
			y: size.height,
			fill: '#888',
			fontSize: font.size,
			fontFamily: font.family,
			textAnchor: 'middle'
		}, text);
		render += textSvg;
	});
	return render;
};

Render.prototype.rowLabelText = function(labels, rowLabels, font, size) {
	var render = '';
	rowLabels.forEach(function(label, index, array) {
		var y = labels.positions.row[index] + (font.size / 2);
		var text = labels.prefix + label + labels.suffix;
		var textSvg = Draw.text({
			x: 0,
			y: y,
			fill: '#888',
			fontSize: font.size,
			fontFamily: font.family,
			textAnchor: 'right'
		}, text);
		render += textSvg;
	});
	return render;
};

Render.prototype.bottomLeftLabelText = function(labels, font, size, colors) {
	var render = '';
	labels.forEach(function(label, index, array) {
		// Flip text
		var a = (font.size * 1.4);
		var b = (labels.length - 1);
		var c = (a * b) - (a * index);
		// Reverse y position
		var y = Utils.reversePosY(c, 0, size.height);
		var textSvg = Draw.text({
			x: 0,
			y: y,
			fill: colors[index],
			fontSize: font.size,
			fontFamily: font.family,
			textAnchor: 'right'
		}, label);
		render += textSvg;
	});
	return render;
};

Render.prototype.bottomCenterLabelText = function(text, font, size, color) {
	var render = '';
	var x = size.width / 2;
	var y = Utils.reversePosY(0, 0, size.height);
	var textSvg = Draw.text({
		x: x,
		y: y,
		fill: color,
		fontSize: font.size,
		fontFamily: font.family,
		textAnchor: 'middle'
	}, text);
	render += textSvg;
	return render;
};

Render.prototype.centerLabelText = function(text, font, size, color) {
	var render = '';
	var x = size.width / 2;
	var y = (font.size / 2) + (size.height / 2);
	var textSvg = Draw.text({
		x: x,
		y: y,
		fill: color,
		fontSize: font.size,
		fontFamily: font.family,
		textAnchor: 'middle'
	}, text);
	render += textSvg;
	return render;
};

Render.prototype.graphLines = function(labels, size) {
	var lines = '';
	labels.positions.column.map(function(x) {
		var line = Draw.line({
			x1: x,
			y1: 0,
			x2: x,
			y2: size.height,
			stroke: '#ccc',
			strokeDasharray: '5, 5'
		});
		lines += line;
	});
	labels.positions.row.map(function(y) {
		var line = Draw.line({
			x1: 0,
			y1: y,
			x2: size.width,
			y2: y,
			stroke: '#ccc',
			strokeDasharray: '5, 5'
		});
		lines += line;
	});
	return lines;
};

Render.prototype.lineSets = function(labels, sets, range, size, colors) {
	var paths = [];
	sets.forEach(function(set, index, array) {
		var newSet = [];
		set.forEach(function(y, index, array) {
			var type = (index > 0) ? '' : 'M';
			newSet.push({type: type, values: [labels.positions.column[index], Utils.calculateY(y, labels.row[0], size.height)]});
		});
		var path = Draw.path({ fill: 'transparent', stroke: colors[index], strokeWidth: '6', strokeLinecap: 'round' }, newSet);
		paths.push(path);
	});
	return paths;
};

Render.prototype.barSets = function(labels, sets, size, horizontal, colors, shadow) {
	var paths = [];
	sets.forEach(function(set, i, array) {
		var index = 0;
		set.sort(Utils.sortDesc);
		set.forEach(function(point, j, array) {
			var strokeWidth = 16;
			var gutter = -(strokeWidth / 4);
			var offset = ((strokeWidth + gutter) * (set.length - 1)) / 2;
			var attributes = {fill: 'transparent', stroke: colors[index], strokeWidth: strokeWidth, strokeLinecap: 'round'};

			//
			// Vertical 
			//
			if(!horizontal) {
				var max = labels.row[0];
				var shadowOffset = -(strokeWidth / 3);
				var shadowAttributes = {transform: 'translate(' + shadowOffset + ', 0)', opacity: '0.15', fill: 'transparent', stroke: '#000', strokeWidth: strokeWidth, strokeLinecap: 'round'};
				var x = (labels.positions.column[i] + (j * (strokeWidth + gutter))) - offset;
				// Normal
				if(typeof point === 'number') {
					var newSet = [
						{type: 'M', values: [x, Utils.calculateY(0, max, size.height)]},
						{type: '', values: [x, Utils.calculateY(point, max, size.height) + (strokeWidth / 2)]}
					];
					if(shadow) paths.push(Draw.path(shadowAttributes, newSet));
					paths.push(Draw.path(attributes, newSet));
					index++;
				}
				// Stacked
				else if(typeof point === 'object') {
					point.sort(Utils.sortDesc);
					point.map(function(y1) {
						// Update stroke color since index increases
						attributes.stroke = colors[index];
						var newSet = [
							{ type: 'M', values: [x, Utils.calculateY(0, max, size.height)] },
							{ type: '', values: [x, Utils.calculateY(y1, max, size.height) + (strokeWidth / 2)] }
						];
						if(shadow) {
							paths.push(Draw.path(shadowAttributes, newSet));
						}
						paths.push(Draw.path(attributes, newSet));
						index++;
					});
				}
			}

			//
			// Horizontal
			//
			else {
				var max = labels.row[labels.row.length - 1];
				var shadowOffset = (strokeWidth / 3);
				var shadowAttributes = {transform: 'translate(' + shadowOffset + ', 0)', opacity: '0.15', fill: 'transparent', stroke: '#000', strokeWidth: strokeWidth, strokeLinecap: 'round'};
				var y = (labels.positions.row[i] + (j * (strokeWidth + gutter))) - offset;
				// Normal
				if(typeof point === 'number') {
					var newSet = [
						{ type: 'M', values: [Utils.calculateX(0, max, size.width), y] },
						{ type: '', values: [Utils.calculateX(point, max, size.width) - (strokeWidth / 2), y] }
					];
					if(shadow) paths.push(Draw.path(shadowAttributes, newSet));
					paths.push(Draw.path(attributes, newSet));
					index++;
				}
				// Stacked
				else if(typeof point === 'object') {
					point.sort(Utils.sortDesc);
					point.map(function(x1) {
						// Update stroke color since index increases
						attributes.stroke = colors[index];
						var newSet = [
							{ type: 'M', values: [Utils.calculateX(0, max, size.width), y] },
							{ type: '', values: [Utils.calculateX(x1, max, size.width) - (strokeWidth / 2), y] }
						];
						if(shadow) paths.push(Draw.path(shadowAttributes, newSet));
						paths.push(Draw.path(attributes, newSet));
						index++;
					});
				}
			}

		});
	});
	return paths;
};

Render.prototype.pieSets = function(sets, size, colors, shadow) {
	
	var slices = [];
	var center = { x: (size.width / 2), y: (size.height / 2) };
	var radius = (size.height / 2);
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
	if(shadow) paths.push(Draw.filterShadow('pie-shadow', 8));
	paths.push(Draw.group({filter: 'url(#pie-shadow)', opacity: 0.15}, group));
	paths.push(group);

	// Return
	return paths;
};

Render.prototype.doughnutSets = function(sets, size, colors, shadow) {

	// Basic calculation
	var center = { x: (size.width / 2), y: (size.height / 2) };
	var radius1 = (size.height / 2);
	var radius2 = radius1 - 40;
	var x1 = Utils.calculateAngleX(center.x, radius1, 0);
	var y1 = Utils.calculateAngleY(center.y, radius1, 0);
	var x2 = Utils.calculateAngleX(center.x, radius1, 180);
	var y2 = Utils.calculateAngleY(center.y, radius1, 180);
	var x3 = Utils.calculateAngleX(center.x, radius2, 0);
	var y3 = Utils.calculateAngleY(center.y, radius2, 0);
	var x4 = Utils.calculateAngleX(center.x, radius2, 180);
	var y4 = Utils.calculateAngleY(center.y, radius2, 180);

	// Create vectors
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
	var doughnut = Draw.path({}, vectors);
	paths.push(Draw.clipPath('doughnut-clip', doughnut));
	paths.push(Draw.filterShadow('doughnut-shadow', 8));
	var pie = this.pieSets(sets, size, colors, false);
	var group = Draw.group({clipPath: 'url(#doughnut-clip)'}, pie);
	
	if(shadow) paths.push(Draw.group({filter: 'url(#doughnut-shadow)', opacity: 0.15}, group));
	paths.push(group);

	// Return
	return paths;
};

Render.prototype.dialSets = function(sets, percentage, size, colors, shadow) {

	// Basic Calculation
	var center = { x: (size.width / 2), y: (size.height / 2) };
	var radius = (size.height / 3.2);

	// Create dot
	var degree = (sets) - 220;
	var dotRadius = radius - 15;
	var cx = Utils.calculateAngleX(center.x, dotRadius, degree);
	var cy = Utils.calculateAngleY(center.y, dotRadius, degree);
	var dot = Draw.circle({cx: cx, cy: cy, r: 5, fill: '#fff'});

	// Create dash
	var dashes = [];
	var dashRadius = radius + 15;
	var rotation = -150;
	for(var i = 0; i < 260; i += 20) {
		var opacity = ((i / 260) > percentage) ? 0.2 : 1.0;
		var x = Utils.calculateAngleX(center.x, dashRadius, i - rotation);
		var y = Utils.calculateAngleY(center.y, dashRadius, i - rotation);
		var dash = Draw.dash({
			transform: 'translate(' + x + ', ' + y + ') rotate(' + (i - 120) + ', 0, 0)',
			fill: colors[0],
			opacity: opacity
		});
		dashes.push(dash);
	}

	// Compose
	var paths = [];
	paths.push(Draw.filterShadow('dial-shadow', 6));
	var dial = Draw.circle({ cx: center.x, cy: center.y, r: radius, fill: colors[0] });
	if(shadow) paths.push(Draw.group({filter: 'url(#doughnut-shadow)', opacity: 0.15}, dial));
	paths.push(dial);
	paths.push(dot);
	paths.push(dashes);

	return paths;
};

Render.prototype.svg = function(children, fontSize, size, padding) {
	var widthOffset = (fontSize / 2) + padding.x;
	var heightOffset = (fontSize / 2) + padding.y;
	var width = size.width + widthOffset;
	var height = size.height + heightOffset;
	var attributes = Utils.attributesToString({ width: width, height: height });
	var svg = ['<svg ' + attributes + '>', children, '</svg>'];
	return svg;
};

module.exports = new Render();
