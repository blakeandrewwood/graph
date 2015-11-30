"use strict";
var Utils = require('./Utils');

function Draw() {}

/**
 * Basics
 *
 */
Draw.prototype.text = function(attributes, children) {
	attributes = Utils.attributesToString(attributes);
	var text = '<text ' + attributes + '>' + children + '</text>';
	return text;
};

Draw.prototype.line = function(attributes) {
	attributes = Utils.attributesToString(attributes);
	var line = '<line ' + attributes + '/>';
	return line;
};

Draw.prototype.circle = function(attributes) {
	attributes = Utils.attributesToString(attributes);
	var circle = '<circle ' + attributes + '/>';
	return circle;
};

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
	var path = '<path ' + attributes + ' d="' + d.trim() + '" />';
	return path;
};

/**
 * Assets 
 *
 */
Draw.prototype.dash = function(attributes) {
	var vectors = [
		{type: 'M', values: [0, 0]},
		{type: '', values: [-2.6, 0]},
		{type: '', values: [-3.8, -20]},
		{type: '', values: [3.8, -20]},
		{type: '', values: [2.6, 0]},
		{type: 'Z'},
	];
	var dash = this.path(attributes, vectors);
	return dash;
};

/**
 * Definitions 
 *
 */
Draw.prototype.filterShadow = function(id, stdDeviation) {
	var filterAttributes = Utils.attributesToString({
		id: id, width: '200%', height: '200%'
	});
	var feGaussianBlurAttributes = Utils.attributesToString({
		in: 'SourceAlpha', result: 'blurOut'
	});
	var feOffsetAttributes = Utils.attributesToString({
		in: 'blurOut', result: 'offOut', dx: 0, dy: 0
	});
	var feBlendAttributes = Utils.attributesToString({
		in: 'offOut', mode: 'normal' 
	});
	var filter = [
		'<defs>',
			'<filter ' + filterAttributes + '>',
				'<feGaussianBlur ' + feGaussianBlurAttributes + ' stdDeviation="' + stdDeviation + '" />',
				'<feOffset ' + feOffsetAttributes + ' />',
				'<feBlend ' + feBlendAttributes + ' />',
			'</filter>',
		'</defs>'
	]; 
	return filter;
};

Draw.prototype.clipPath = function(id, path) {
	var clipPathAttributes = Utils.attributesToString({ id: id });
	var clipPath = [
		'<defs>',
			'<clipPath ' + clipPathAttributes + '>',
				path,
			'</clipPath>',
		'</defs>'
	]; 
	return clipPath;
};

Draw.prototype.group = function(attributes, children) {
	var groupAttributes = Utils.attributesToString(attributes);
	var group = [
		'<g ' + groupAttributes + '>',
			children,
		'</g>'
	];
	return group;
};


module.exports = new Draw();
