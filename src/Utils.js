"use strict";

function Utils() {}

Utils.prototype.attributesToString = function(attributes) {
	var string = '';
	for(var attribute in attributes) {
		var attr = attribute.replace(/[A-Z]/g, function(v) {
			return '-' + v.toLowerCase();
		});
		string += attr + '="' + attributes[attribute] + '" '; 
	}
	return string;
};

Utils.prototype.flattenPoints = function(points) {
	var yArray = [];
	points.forEach(function(point, index, array) {
		point.forEach(function(y, index, array) {
			yArray.push(y);
		});
	});
	return yArray;
};

Utils.prototype.getPointIncrements = function(yMax, increment) {
	var numItems = Math.ceil(yMax / increment) + 1;
	var items = [];
	for(var i = 0; i < numItems; i++) {
		items.push(i * increment);
	}
	items.reverse();
	return items;
}

Utils.prototype.calculateColumnPositions = function(labels, width) {
	var positions = [];
	var size = 	width / (labels.length - 1);
	labels.forEach(function(label, index, array) {
		var x = Math.round((size * index));
		positions.push(x);
	});
	return positions;
};

Utils.prototype.calculateRowPositions = function(pointIncrements, height) {
	var positions = [];
	pointIncrements.forEach(function(item, index, array) {
		var y = this.calculateY(item, pointIncrements[0], height);
		positions.push(y);
	}, this);
	return positions;
};

Utils.prototype.calculateY = function(y, yMax, height) {
	var calculatedY = this.normalizeY(y, yMax, height);
	return this.reversePosY(calculatedY, 0, height);
}

Utils.prototype.normalizeY = function(y, yMax, height) {
	return (height/yMax) * y;
}

Utils.prototype.normalizeX = function(x, xMax, width) {
	return (width/xMax) * x;
}

Utils.prototype.reversePosY = function(x, xMin, xMax) {
	return (xMax + xMin) - x;
}

Utils.prototype.reversePosX = function(y, yMin, yMax) {
	return (yMax + yMin) - y;
}

module.exports = new Utils();