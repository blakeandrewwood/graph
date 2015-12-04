"use strict";
var Draw = require('./Draw');

function Events() {}

Events.prototype.onMouseOver = function(evt, moduleName) {

	var tooltipId = moduleName.id + '-tooltip';
	var tooltip = moduleName.getElementById(tooltipId);
	if(!tooltip) {
		moduleName.innerHTML += Draw.rect({id: tooltipId, x: 0, y: 0, width: 100, height: 100, fill: 'red'});
		evt.target.setAttribute('stroke', 'green');
		console.log(evt.target)
	}

};

Events.prototype.onMouseOut = function(evt, moduleName) {

	var tooltipId = moduleName.id + '-tooltip';
	var tooltip = moduleName.getElementById(tooltipId);
	if(tooltip) {
		moduleName.removeChild(tooltip);
		evt.target.setAttribute('opacity', '1');
	}

};

module.exports = Events;
