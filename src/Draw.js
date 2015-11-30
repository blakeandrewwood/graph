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

Draw.prototype.path = function(attributes, vectors) {
	attributes = Utils.attributesToString(attributes);
	var d = '';
	vectors.forEach(function(vector, index, array) {
		d += vector.type;
		if(vector.values) {
			vector.values.map(function(value) {
				d += value + ' ';
			});
		}
	});
	var path = '<path ' + attributes + ' d="' + d + '" />';
	return path;
}

Draw.prototype.filterShadow = function(id, stdDeviation) {
	var filterAttributes = Utils.attributesToString({
		id: id, width: '200%', height: '200%'
	});
	var feOffsetAttributes = Utils.attributesToString({
		result: 'offOut', in: 'SourceAlpha', dx: 0, dy: 0 
	});
	var feGaussianBlurAttributes = Utils.attributesToString({
		result: 'blurOut', in: 'offOut'
	});
	var feBlendAttributes = Utils.attributesToString({
		in: 'SourceGraphic', in2: 'blurOut', mode: 'normal' 
	});
	var filter = [
		'<defs>',
			'<filter ' + filterAttributes + '>',
				'<feOffset ' + feOffsetAttributes + ' />',
				'<feGaussianBlur ' + feGaussianBlurAttributes + ' stdDeviation="' + stdDeviation + '" />',
				'<feBlend ' + feBlendAttributes + ' />',
			'</filter>',
		'</defs>'
	]; 
	return filter;
}


module.exports = new Draw();
