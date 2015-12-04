"use strict";
var Utils = require('./Utils');
var Draw = require('./Draw');

function Render() {}

/**
 * Text
 *
 */
Render.prototype.columnLabelText = function(labels, columnLabels, font, size) {
	var elements = [];
	columnLabels.forEach(function(label, index, array) {
		var x = labels.positions.column[index];
		var textSvg = Draw.text({
			x: x,
			y: size.height,
			fill: '#888',
			fontSize: font.size,
			fontFamily: font.family,
			textAnchor: 'middle'
		});
		var text = labels.prefix + label + labels.suffix;
		textSvg.innerHTML = text;
		elements.push(textSvg);
	});
	return elements;
};

Render.prototype.rowLabelText = function(labels, rowLabels, font, size) {
	var elements = [];
	rowLabels.forEach(function(label, index, array) {
		var y = labels.positions.row[index] + (font.size / 2);
		var textSvg = Draw.text({
			x: 0,
			y: y,
			fill: '#888',
			fontSize: font.size,
			fontFamily: font.family,
			textAnchor: 'right'
		});
		var text = labels.prefix + label + labels.suffix;
		textSvg.innerHTML = text;
		elements.push(textSvg);
	});
	return elements;
};

Render.prototype.bottomLeftLabelText = function(labels, font, size, colors) {
	var elements = []; 
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
		});
		var text = label;
		textSvg.innerHTML = text;
		elements.push(textSvg);
	});
	return elements;
};

Render.prototype.bottomCenterLabelText = function(text, font, size, color) {
	var elements = []; 
	var x = size.width / 2;
	var y = Utils.reversePosY(0, 0, size.height);
	var textSvg = Draw.text({
		x: x,
		y: y,
		fill: color,
		fontSize: font.size,
		fontFamily: font.family,
		textAnchor: 'middle'
	});
	textSvg.innerHTML = text;
	elements.push(textSvg);
	return elements;
};

Render.prototype.centerLabelText = function(text, font, size, color) {
	var elements = []; 
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
	textSvg.innerHTML = text;
	elements.push(textSvg);
	return elements;
};

/**
 * Sets 
 *
 */
Render.prototype.lineSets = function(columnPositions, rowMax, sets, range, size, colors) {
	var elements = [];
	sets.forEach(function(set, i, array) {
		var newSet = [];
		set.forEach(function(point, j, array) {
			var type = (j > 0) ? '' : 'M';
			newSet.push({
				type: type,
				values: [columnPositions[j],
				Utils.calculateY(point, rowMax, size.height)]
			});
		});
		var d = Utils.buildPathString(newSet);
		var path = Draw.path({
			d: d,
			stroke: colors[i],
			strokeWidth: 6,
			strokeLinecap: 'round',
			fill: 'transparent'
		});
		elements.push(path);
	});
	return elements;
};

Render.prototype.graphLines = function(labels, size) {
	var elements = [];
	labels.positions.column.map(function(x) {
		var line = Draw.line({
			x1: x,
			y1: 0,
			x2: x,
			y2: size.height,
			stroke: '#ccc',
			strokeDasharray: '5, 5'
		});
		elements.push(line);
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
		elements.push(line);
	});
	return elements;
};

Render.prototype.barSets = function(labels, sets, size, horizontal, colors, shadow) {
	var elements = [];
	sets.forEach(function(set, i, array) {
		var index = 0;
		set.sort(Utils.sortDesc);
		set.forEach(function(point, j, array) {

			var strokeWidth = 16;
			var gutter = -(strokeWidth / 4);
			var offset = ((strokeWidth + gutter) * (set.length - 1)) / 2;
			var attributes = {fill: 'transparent', stroke: colors[index], strokeWidth: strokeWidth, strokeLinecap: 'round'};
			var shadowOffset = -(strokeWidth / 3);
			var shadowAttributes = {opacity: '0.15', fill: 'transparent', stroke: '#000', strokeWidth: strokeWidth, strokeLinecap: 'round'};
			var max;

			// Normal
			if(typeof point === 'number') {
				var newSet = [];
				if(!horizontal) { 
					shadowAttributes.transform = 'translate(' + shadowOffset + ', 0)';
					max = labels.row[0];
					var x = (labels.positions.column[i] + (j * (strokeWidth + gutter))) - offset;
					newSet.push({type: 'M', values: [x, Utils.calculateY(0, max, size.height)]});
					newSet.push({type: '', values: [x, Utils.calculateY(point, max, size.height) + (strokeWidth / 2)]});
				} 
				else {
					shadowAttributes.transform = 'translate(' + -shadowOffset + ', 0)';
					max = labels.row[labels.row.length - 1];
					var y = (labels.positions.row[i] + (j * (strokeWidth + gutter))) - offset;
					newSet.push({ type: 'M', values: [Utils.calculateX(0, max, size.width), y] });
					newSet.push({ type: '', values: [Utils.calculateX(point, max, size.width) - (strokeWidth / 2), y] });
				}

				// d
				var d = Utils.buildPathString(newSet);
				// Shadow
				if(shadow) { 
					shadowAttributes.d = d;
					var shadowPath = Draw.path(shadowAttributes, newSet);
					elements.push(shadowPath);
				}
				// Path
				attributes.d = d;
				var path = Draw.path(attributes, newSet);
				elements.push(path);

				index++;
			}
			// Stacked
			else if(typeof point === 'object') {
				point.sort(Utils.sortDesc);
				point.map(function(y1) {

					// Update stroke color since index increases
					attributes.stroke = colors[index];

					var newSet = [];
					if(!horizontal) { 
						shadowAttributes.transform = 'translate(' + shadowOffset + ', 0)';
						max = labels.row[0];
						var x = (labels.positions.column[i] + (j * (strokeWidth + gutter))) - offset;
						newSet.push({ type: 'M', values: [x, Utils.calculateY(0, max, size.height)] });
						newSet.push({ type: '', values: [x, Utils.calculateY(y1, max, size.height) + (strokeWidth / 2)] });
					} 
					else {
						shadowAttributes.transform = 'translate(' + -shadowOffset + ', 0)';
						max = labels.row[labels.row.length - 1];
						var y = (labels.positions.row[i] + (j * (strokeWidth + gutter))) - offset;
						newSet.push({ type: 'M', values: [Utils.calculateX(0, max, size.width), y] });
						newSet.push({ type: '', values: [Utils.calculateX(y1, max, size.width) - (strokeWidth / 2), y] });
					}

					// d
					var d = Utils.buildPathString(newSet);
					// Shadow
					if(shadow) { 
						shadowAttributes.d = d;
						var shadowPath = Draw.path(shadowAttributes, newSet);
						elements.push(shadowPath);
					}
					// Path
					attributes.d = d;
					var path = Draw.path(attributes, newSet);
					elements.push(path);

					index++;
				});
			}

		});
	});
	return elements;
};

Render.prototype.pieSets = function(sets, size, colors, shadow) {
	
	var slices = [];
	var center = { x: (size.width / 2), y: (size.height / 2) };
	var radius = (size.height / 2);
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

		attributes.d = Utils.buildPathString(vectors);
		slices.push(Draw.path(attributes));
	});

	// Compose
	var elements = []
	var group = Draw.group({}, slices);
	/*
	if(shadow) paths.push(Draw.filterShadow('pie-shadow', 8));
	paths.push(Draw.group({filter: 'url(#pie-shadow)', opacity: 0.15}, group));
	*/
	elements.push(group);

	// Return
	return elements;
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
	var elements = [];
	var attributes = {
		d: Utils.buildPathString(vectors)
	};
	var doughnut = Draw.path(attributes);

	var defs = Draw.defs();
	var clipPath = Draw.clipPath('doughnut-clip', doughnut);
	var shadowFilter = Draw.filterShadow('doughnut-shadow', 8);
	Utils.appendChild(defs, clipPath);
	//Utils.appendChild(defs, shadowFilter);
	elements.push(defs);

	var pie = this.pieSets(sets, size, colors, false);
	var group = Draw.group({clipPath: 'url(#doughnut-clip)', filter: 'url(#doughnut-shadow)'}, pie);
	//if(shadow) elements.push(Draw.group({filter: 'url(#doughnut-shadow)', opacity: 0.15}, [group]));
	elements.push(group);

	// Return
	return elements;
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
	var children = [];
	
	/*
	paths.push(Draw.filterShadow('dial-shadow', 6));
	var dial = Draw.circle({ cx: center.x, cy: center.y, r: radius, fill: colors[0] });
	if(shadow) paths.push(Draw.group({filter: 'url(#doughnut-shadow)', opacity: 0.15}, dial));
	paths.push(dial);
	paths.push(dot);
	paths.push(dashes);
	*/

	var group = Draw.group({}, dashes);
	var dial = Draw.circle({ cx: center.x, cy: center.y, r: radius, fill: colors[0] });
	var dot = Draw.circle({cx: cx, cy: cy, r: 5, fill: '#fff'});
	children.push(dial);
	children.push(dot);
	children.push(group);

	return children;
};

Render.prototype.svg = function(container, fontSize, size, padding) {
	var widthOffset = (fontSize / 2) + padding.x;
	var heightOffset = (fontSize / 2) + padding.y;
	var width = size.width + widthOffset;
	var height = size.height + heightOffset;
	var attributes = {
		width: width,
		height: height 
	};
	var svg  = Draw.svg(attributes);
	return svg;
};

module.exports = new Render();
