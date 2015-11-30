"use strict";
var Utils = require('./Utils');

function Draw() {}

Draw.prototype.text = function(attributes, children) {
	attributes = Utils.attributesToString(attributes);
	var text = '<text ' + attributes + '>' + children + '</text>';
	return text;
}

Draw.prototype.line = function(attributes) {
	attributes = Utils.attributesToString(attributes);
	var line = '<line ' + attributes + '/>';
	return line;
}

Draw.prototype.circle = function(attributes) {
	attributes = Utils.attributesToString(attributes);
	var circle = '<circle ' + attributes + '/>';
	return circle;
}

Draw.prototype.path = function(attributes, points) {
	attributes = Utils.attributesToString(attributes);
	var d = 'M';
	points.forEach(function(point, index, array) {
		if(d === '') {
			d += 'M ';
		} else {
			d += ' ';
		}
		d += point[0] + ' ' + point[1];
	});
	var path = '<path ' + attributes + ' d="' + d + '" />';
	return path;
}

Draw.prototype.pathRaw = function(attributes, vectors) {
	attributes = Utils.attributesToString(attributes);
	var d = '';
	vectors.forEach(function(vector, index, array) {
		d += vector.type;
		vector.values.map(function(value) {
			d += value + ' ';
		});
	});
	d += 'Z';
	var path = '<path ' + attributes + ' d="' + d + '" />';
	return path;
}

module.exports = new Draw();
