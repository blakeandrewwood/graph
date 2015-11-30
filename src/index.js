var Graph = require('./Graph');

/*
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
var containerBar = document.getElementById('graph-bar');
var graphBar = new Graph(containerBar);
graphBar.setType('bar');
graphBar.setSize(350, 150);
graphBar.setLabels(labelsBar);
graphBar.setIncrement(1);
graphBar.setPoints(pointsBar);
graphBar.render();

var labelsBarMulti = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
var pointsBarMulti = [
	[1350, 1000, 800],
	[700, 500, 600],
	[200, 800],
	[1650, [500, 100]],
	[[1500, 1000, 500]],
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
	[[500, 1000, 1300]],
	[[700, 500, 600]],
	[[200, 800]],
	[[450]],
	[[1200]]
];
var containerBarMultiStack = document.getElementById('graph-bar-multi-stack');
var graphBarMultiStack = new Graph(containerBarMultiStack);
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
var containerBarMultiStackHorizontal = document.getElementById('graph-bar-multi-stack-horizontal');
var graphBarMultiStackHorizontal = new Graph(containerBarMultiStackHorizontal);
graphBarMultiStackHorizontal.setType('bar');
graphBarMultiStackHorizontal.setHorizontal(true);
graphBarMultiStackHorizontal.setSize(300, 150);
graphBarMultiStackHorizontal.setLabels(labelsBarMultiStackHorizontal);
graphBarMultiStackHorizontal.setIncrement(500);
graphBarMultiStackHorizontal.setPoints(pointsBarMultiStackHorizontal);
graphBarMultiStackHorizontal.render();
*/

var labelsPie = ['Oracle', 'Azure', 'Joyent', 'IBM'];
var pointsPie = [
	[700],
	[500],
	[400],
	[200]
];
var containerPie = document.getElementById('graph-pie');
var graphPie = new Graph(containerPie);
graphPie.setType('pie');
graphPie.setSize(300, 150);
graphPie.setLabels(labelsPie);
graphPie.setPoints(pointsPie);
graphPie.render();

var labelsDoughnut = ['Oracle', 'Azure', 'Joyent', 'IBM'];
var pointsDoughnut = [
	[700],
	[500],
	[400],
	[200]
];
var containerDoughnut = document.getElementById('graph-doughnut');
var graphDoughnut = new Graph(containerDoughnut);
graphDoughnut.setType('doughnut');
graphDoughnut.setSize(300, 150);
graphDoughnut.setLabels(labelsDoughnut);
graphDoughnut.setPoints(pointsDoughnut);
graphDoughnut.render();

/*
window.addEventListener('resize', function(event) {
	var width = window.innerWidth;
	var height = window.innerHeight;
	g.setSize(width, height);
	g.render();
});
*/