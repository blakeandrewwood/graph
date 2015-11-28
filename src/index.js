var Graph = require('./Graph');

var labelsLine = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
var pointsLine = [
	[10, 50, 150, 175, 130],
	[20, 80, 100, 150, 175],
	[5,  30,  40,  80,  50],
	[15, 70,  70,  50,  60],
	[0,  40,  80,  90,  90]
];
var containerLine = document.getElementById('graph-line');
var graphLine = new Graph(containerLine);
graphLine.setType('line');
graphLine.setSize(300, 150);
graphLine.setLabels(labelsLine);
graphLine.setIncrement(50);
graphLine.setPoints(pointsLine);
graphLine.render();

var labelsBar = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
var pointsBar = [
	[1],
	[2],
	[3],
	[4],
	[3]
];
var containerBar = document.getElementById('graph-bar');
var graphBar = new Graph(containerBar);
graphBar.setType('bar');
graphBar.setSize(300, 150);
graphBar.setLabels(labelsBar);
graphBar.setIncrement(1);
graphBar.setPoints(pointsBar);
graphBar.render();

var labelsBarMulti = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
var pointsBarMulti = [
	[1350, 1000, 800],
	[700, 500, 600],
	[200, 800],
	[450],
	[1800]
];
var containerBarMulti = document.getElementById('graph-bar-multi');
var graphBarMulti = new Graph(containerBarMulti);
graphBarMulti.setType('bar');
graphBarMulti.setSize(300, 150);
graphBarMulti.setLabels(labelsBarMulti);
graphBarMulti.setIncrement(500);
graphBarMulti.setPoints(pointsBarMulti);
graphBarMulti.render();

var labelsBarMultiStack = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
var pointsBarMultiStack = [
	[500, 1000, 1300],
	[700, 500, 600],
	[200, 800],
	[450],
	[1200]
];
var containerBarMultiStack = document.getElementById('graph-bar-multi-stack');
var graphBarMultiStack = new Graph(containerBarMultiStack);
graphBarMultiStack.setType('bar');
graphBarMultiStack.setStack(true);
graphBarMultiStack.setSize(300, 150);
graphBarMultiStack.setLabels(labelsBarMultiStack);
graphBarMultiStack.setIncrement(500);
graphBarMultiStack.setPoints(pointsBarMultiStack);
graphBarMultiStack.render();

var labelsBarMultiStackHorizontal = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
var pointsBarMultiStackHorizontal = [
	[450, 1000, 1350],
	[700, 500, 600],
	[200, 800],
	[450],
	[2400]
];
var containerBarMultiStackHorizontal = document.getElementById('graph-bar-multi-stack-horizontal');
var graphBarMultiStackHorizontal = new Graph(containerBarMultiStackHorizontal);
graphBarMultiStackHorizontal.setType('bar');
graphBarMultiStackHorizontal.setStack(true);
graphBarMultiStackHorizontal.setHorizontal(true);
graphBarMultiStackHorizontal.setSize(300, 150);
graphBarMultiStackHorizontal.setLabels(labelsBarMultiStackHorizontal);
graphBarMultiStackHorizontal.setIncrement(500);
graphBarMultiStackHorizontal.setPoints(pointsBarMultiStackHorizontal);
graphBarMultiStackHorizontal.render();

/*
window.addEventListener('resize', function(event) {
	var width = window.innerWidth;
	var height = window.innerHeight;
	g.setSize(width, height);
	g.render();
});
*/