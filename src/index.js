var Graph = require('./Graph');

var labelsLine = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
var pointsLine = [
	[10, 50, 150, 175, 130],
	[20, 80, 100, 150, 175],
	[5,  30,  40,  80,  50],
	[15, 70,  70,  50,  60],
	[0,  40,  80,  90,  90]
];
var graphLine = new Graph();
graphLine.setContainer(document.getElementById('graph-line'));
graphLine.setType('line');
graphLine.setSize(300, 150);
graphLine.setLabels(labelsLine);
graphLine.setIncrement(50);
graphLine.setPoints(pointsLine);
graphLine.render();

var labelsBar = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var pointsBar = [
	[1],
	[2],
	[3],
	[4],
	[3],
	[6],
	[4],
	[3],
	[6],
	[6],
	[4],
	[3]
];
var graphBar = new Graph();
graphBar.setContainer(document.getElementById('graph-bar'));
graphBar.setType('bar');
graphBar.setSize(350, 150);
graphBar.setLabels(labelsBar);
graphBar.setIncrement(1);
graphBar.setPoints(pointsBar);
graphBar.setShadow(false);
graphBar.render();

var labelsBarMulti = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
var pointsBarMulti = [
	[1350, 1000, 800],
	[700, 500, 600],
	[500, 800],
	[1650, [800, 400]],
	[[1500, 1000, 500]],
];
var graphBarMulti = new Graph();
graphBarMulti.setContainer(document.getElementById('graph-bar-multi'));
graphBarMulti.setType('bar');
graphBarMulti.setSize(300, 150);
graphBarMulti.setLabels(labelsBarMulti);
graphBarMulti.setIncrement(500);
graphBarMulti.setPoints(pointsBarMulti);
graphBarMulti.render();

var labelsBarMultiStack = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
var pointsBarMultiStack = [
	[[500, 1000, 1300]],
	[[700, 500, 600]],
	[[200, 800]],
	[[450]],
	[[1200]]
];
var graphBarMultiStack = new Graph();
graphBarMultiStack.setContainer(document.getElementById('graph-bar-multi-stack'));
graphBarMultiStack.setType('bar');
graphBarMultiStack.setSize(300, 150);
graphBarMultiStack.setLabels(labelsBarMultiStack);
graphBarMultiStack.setIncrement(500);
graphBarMultiStack.setPoints(pointsBarMultiStack);
graphBarMultiStack.render();

var labelsBarMultiStackHorizontal = ['Tom', 'Kelly', 'Rob', 'Owen'];
var pointsBarMultiStackHorizontal = [
	[[450, 1000, 1350, 200]],
	[[700, 500, 1000, 300]],
	[[200, 800, 700]],
	[[450, 100]]
];
var graphBarMultiStackHorizontal = new Graph();
graphBarMultiStackHorizontal.setContainer(document.getElementById('graph-bar-multi-stack-horizontal'));
graphBarMultiStackHorizontal.setType('bar');
graphBarMultiStackHorizontal.setHorizontal(true);
graphBarMultiStackHorizontal.setSize(300, 150);
graphBarMultiStackHorizontal.setLabels(labelsBarMultiStackHorizontal);
graphBarMultiStackHorizontal.setIncrement(500);
graphBarMultiStackHorizontal.setPoints(pointsBarMultiStackHorizontal);
graphBarMultiStackHorizontal.render();

var labelsPie = ['Oracle', 'Azure', 'Joyent', 'IBM'];
var pointsPie = [
	[700],
	[500],
	[400],
	[200]
];
var graphPie = new Graph();
graphPie.setContainer(document.getElementById('graph-pie'));
graphPie.setType('pie');
graphPie.setSize(300, 150);
graphPie.setLabels(labelsPie);
graphPie.setPoints(pointsPie);
graphPie.setColors(['#1CB8F1', '#08ECEF', '#6CF1B2', '#2388F2']);
graphPie.render();

var labelsDoughnut = ['Oracle', 'Azure', 'Joyent', 'IBM'];
var pointsDoughnut = [
	[700],
	[500],
	[400],
	[200]
];
var graphDoughnut = new Graph();
graphDoughnut.setContainer(document.getElementById('graph-doughnut'));
graphDoughnut.setType('doughnut');
graphDoughnut.setSize(300, 150);
graphDoughnut.setLabels(labelsDoughnut);
graphDoughnut.setPoints(pointsDoughnut);
graphDoughnut.setColors(['#1CB8F1', '#08ECEF', '#6CF1B2', '#2388F2']);
graphDoughnut.render();

/*
window.addEventListener('resize', function(event) {
	var width = window.innerWidth;
	var height = window.innerHeight;
	graphDoughnut.setSize(width, height);
	graphDoughnut.render();
});
*/
