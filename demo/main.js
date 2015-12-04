var labelsLine = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
var pointsLine = [
	[10, 50, 150, 175, 130],
	[20, 150, 100, 150, 175],
	[5,  30,  40,  80,  50],
	[15, 70,  50,  50,  60],
	[0,  40,  80,  90,  90]
];
var graphLine = new Graph();
graphLine.setContainer(document.getElementById('graph-line'));
graphLine.setType('line');
graphLine.setSize(300, 150);
graphLine.setFontFamily('Open Sans');
graphLine.setLabels(labelsLine);
graphLine.setIncrement(50);
graphLine.setPoints(pointsLine);
graphLine.render();

var labelsBar = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var pointsBar = [[1], [2], [3], [4], [3], [6], [4], [3], [5], [6], [4], [3]];
var graphBar = new Graph();
graphBar.setContainer(document.getElementById('graph-bar'));
graphBar.setType('bar');
graphBar.setSize(350, 150);
graphBar.setFontFamily('Open Sans');
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
graphBarMulti.setFontFamily('Open Sans');
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
graphBarMultiStack.setFontFamily('Open Sans');
graphBarMultiStack.setLabels(labelsBarMultiStack);
graphBarMultiStack.setIncrement(500);
graphBarMultiStack.setPoints(pointsBarMultiStack);
graphBarMultiStack.render();

var labelsBarMultiStackHorizontal = ['Tom', 'Kelly', 'Rob', 'Owen'];
var pointsBarMultiStackHorizontal = [
	[[450, 800, 1100, 200]],
	[[700, 1000, 1400, 500]],
	[[200, 800, 700]],
	[[700, 400]]
];
var graphBarMultiStackHorizontal = new Graph();
graphBarMultiStackHorizontal.setContainer(document.getElementById('graph-bar-multi-stack-horizontal'));
graphBarMultiStackHorizontal.setType('bar');
graphBarMultiStackHorizontal.setHorizontal(true);
graphBarMultiStackHorizontal.setSize(300, 150);
graphBarMultiStackHorizontal.setFontFamily('Open Sans');
graphBarMultiStackHorizontal.setLabels(labelsBarMultiStackHorizontal);
graphBarMultiStackHorizontal.setIncrement(400);
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
graphPie.setSize(150, 150);
graphPie.setFontSize(14);
graphPie.setFontFamily('Open Sans');
graphPie.setLabels(labelsPie);
graphPie.setPoints(pointsPie);
graphPie.setColors(['#1CB8F1', '#08ECEF', '#6CF1B2', '#2388F2']);
graphPie.render();

var labelsDoughnut = ['Oracle', 'Azure', 'Joyent', 'IBM'];
var pointsDoughnut = [
	[200],
	[200],
	[400],
	[400]
];
var graphDoughnut = new Graph();
graphDoughnut.setContainer(document.getElementById('graph-doughnut'));
graphDoughnut.setType('doughnut');
graphDoughnut.setSize(150, 150);
graphDoughnut.setFontSize(14);
graphDoughnut.setFontFamily('Open Sans');
graphDoughnut.setLabels(labelsDoughnut);
graphDoughnut.setPoints(pointsDoughnut);
graphDoughnut.setColors(['#1CB8F1', '#08ECEF', '#6CF1B2', '#2388F2']);
graphDoughnut.render();

var labelsDial = [];
var pointsDial = [[75, 100]];
var graphDial = new Graph();
graphDial.setContainer(document.getElementById('graph-dial'));
graphDial.setType('dial');
graphDial.setSize(150, 150);
graphDial.setFontSize(16);
graphDial.setFontFamily('Open Sans');
graphDial.setLabels(labelsDial);
graphDial.setPoints(pointsDial);
graphDial.setColors(['#1CB8F1', '#08ECEF', '#6CF1B2', '#2388F2']);
graphDial.render();

/*
Array.max = function(array) {
	return Math.max.apply(Math, array);
};

var labelMove = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
var pointsMove = [
	[10, 50, 150, 175, 130],
	[20, 150, 100, 150, 175],
	[5,  30,  40,  80,  50],
	[15, 70,  50,  50,  60],
	[0,  40,  80,  90,  90]
];
var graphMove = new Graph();
graphMove.setContainer(document.getElementById('graph-move'));
graphMove.setType('line');
graphMove.setSize(300, 150);
graphMove.setFontFamily('Open Sans');


var lastY = 20;
var points = [
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
];
var labels = [0, 0, 0, 0, 0];
var index = 0;
var yMax = [20, 20, 20, 20];
var yMin = [0, 0, 0, 0];
var y = [20, 20, 20, 20];
graphMove.setIncrement(20);
graphMove.render();

setInterval(function() {

	y[0] = Math.floor(Math.random() * (yMax[0] - yMin[0] + 1) + yMin[0]) * 1.0;
	y[1] = Math.floor(Math.random() * (yMax[1] - yMin[1] + 1) + yMin[1]) * 1.0;
	y[2] = Math.floor(Math.random() * (yMax[2] - yMin[2] + 1) + yMin[2]) * 1.0;
	y[3] = Math.floor(Math.random() * (yMax[3] - yMin[3] + 1) + yMin[3]) * 1.0;

	index++;
	//points[0].shift();
	points[0].push(y[0]);
	yMax[0] = y[0] + 10;
	yMin[0] = y[0] - 6;
	//points[1].shift();
	points[1].push(y[1]);
	yMax[1] = y[1] + 10;
	yMin[1] = y[1] - 2;
	points[2].push(y[2]);
	yMax[2] = y[2] + 10;
	yMin[2] = y[2] - 1;
	points[3].push(y[3]);
	yMax[3] = y[3] + 10;
	yMin[3] = y[3] - 2;

	if(labels.length > 12) {
		labels.shift();
		points[0].shift();
		points[1].shift();
		points[2].shift();
		points[3].shift();
	}

	labels.push(index);
	graphMove.setPoints(points);
	graphMove.setLabels(labels);
	graphMove.render();

	graphMove.setIncrement(Array.max(y) / 2);

}, 1000);
*/


/*
window.addEventListener('resize', function(event) {
	var width = window.innerWidth;
	var height = window.innerHeight;
	graphDoughnut.setSize(width, height);
	graphDoughnut.render();
});
*/


