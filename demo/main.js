var colors = ['#2388F2', '#F65237', '#0DEFA5', '#9B7CF3'];
var seriesLabels = ['scan', 'delete', 'upload'];

/*
var labelsLine = ['1 dec', '2 dec', '3 dec', '4 dec', '5 dec', '6 dec', '7 dec'];
var pointsLine = [
  [2000, 5500, 4500, 5400, 3600, 4400, 4000],
  [1000, 3200, 1600, 3000, 4400, 3800, 6000],
  [600, 2100, 1500, 3600, 2800, 6000, 7000]
];

var graphLine = new Graph('GraphLine');
graphLine.setContainer('graph-line');
graphLine.setType('line');
graphLine.setSize(350, 150);
graphLine.setFontFamily('Open Sans');
graphLine.setLabels(labelsLine);
graphLine.setIncrement(1000);
graphLine.setPrefix('$');
graphLine.setPoints(pointsLine);
graphLine.setSeriesLabels(seriesLabels);
graphLine.setColors(colors);
graphLine.setGraphLines(true);
graphLine.setPadding(140, 120);
graphLine.render();

var labelsBar = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var pointsBar = [[1], [2], [3], [4], [3], [6], [4], [3], [5], [6], [4], [3]];
var graphBar = new Graph('GraphBar');
graphBar.setContainer('graph-bar');
graphBar.setType('bar');
graphBar.setSize(350, 150);
graphBar.setFontFamily('Open Sans');
graphBar.setLabels(labelsBar);
graphBar.setIncrement(2);
graphBar.setPoints(pointsBar);
graphBar.setShadow(false);
graphBar.setGraphLines(true);
graphBar.setPadding(140, 120);
graphBar.render();
*/

var labelsBarMulti = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
var pointsBarMulti = [
  [1500, 500, 800],
  [700, 500, 600],
  [800, 500, 300],
  [1650, 800, 400],
  [1500, 1000, 500],
];
var graphBarMulti = new Graph('GraphBarMulti');
graphBarMulti.setContainer('graph-bar-multi');
graphBarMulti.setType('bar');
graphBarMulti.setSize(300, 150);
graphBarMulti.setFontFamily('Open Sans');
graphBarMulti.setLabels(labelsBarMulti);
graphBarMulti.setIncrement(500);
graphBarMulti.setPoints(pointsBarMulti);
graphBarMulti.setSeriesLabels(seriesLabels);
graphBarMulti.setColors(colors);
graphBarMulti.setGraphLines(true);
graphBarMulti.setPadding(140, 120);
graphBarMulti.render();

var labelsBarMultiStack = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
var pointsBarMultiStack = [
  [[500, 1000, 1300]],
  [[700, 500, 600]],
  [[200, 800]],
  [[450]],
  [[1200]]
];
var graphBarMultiStack = new Graph('GraphBarMultiStack');
graphBarMultiStack.setContainer('graph-bar-multi-stack');
graphBarMultiStack.setType('bar');
graphBarMultiStack.setSize(300, 150);
graphBarMultiStack.setFontFamily('Open Sans');
graphBarMultiStack.setLabels(labelsBarMultiStack);
graphBarMultiStack.setIncrement(500);
graphBarMultiStack.setPoints(pointsBarMultiStack);
graphBarMultiStack.setSeriesLabels(seriesLabels);
graphBarMultiStack.setColors(colors);
graphBarMultiStack.setGraphLines(true);
graphBarMultiStack.setPadding(140, 120);
graphBarMultiStack.render();

var labelsBarMultiStackHorizontal = ['Tom', 'Kelly', 'Rob', 'Owen'];
var pointsBarMultiStackHorizontal = [
  [[450, 800, 1100, 200]],
  [[700, 1000, 1400, 500]],
  [[200, 800, 700]],
  [[700, 400]]
];
var seriesLabelsLineBarMultiStackHorizontal = ['scan', 'delete', 'upload', 'transfer'];
var graphBarMultiStackHorizontal = new Graph('GraphBarMultiStackHorizontal');
graphBarMultiStackHorizontal.setContainer('graph-bar-multi-stack-horizontal');
graphBarMultiStackHorizontal.setType('bar');
graphBarMultiStackHorizontal.setHorizontal(true);
graphBarMultiStackHorizontal.setSize(300, 150);
graphBarMultiStackHorizontal.setFontFamily('Open Sans');
graphBarMultiStackHorizontal.setLabels(labelsBarMultiStackHorizontal);
graphBarMultiStackHorizontal.setIncrement(400);
graphBarMultiStackHorizontal.setPoints(pointsBarMultiStackHorizontal);
graphBarMultiStackHorizontal.setSeriesLabels(seriesLabelsLineBarMultiStackHorizontal);
graphBarMultiStackHorizontal.setColors(colors);
graphBarMultiStackHorizontal.setGraphLines(true);
graphBarMultiStackHorizontal.setPadding(140, 120);
graphBarMultiStackHorizontal.render();

/*
var labelsPie = ['Oracle', 'Azure', 'Joyent', 'IBM'];
var pointsPie = [
  [700],
  [500],
  [400],
  [200]
];
var graphPie = new Graph('GraphPie');
graphPie.setContainer('graph-pie');
graphPie.setType('pie');
graphPie.setPrefix('$');
graphPie.setSize(150, 150);
graphPie.setFontSize(14);
graphPie.setFontFamily('Open Sans');
graphPie.setSeriesLabels(labelsPie);
graphPie.setPoints(pointsPie);
graphPie.setColors(['#1CB8F1', '#08ECEF', '#6CF1B2', '#2388F2']);
graphPie.render();

var labelsDoughnut = ['Oracle', 'Azure', 'Joyent', 'IBM'];
var pointsDoughnut = [
  [100],
  [200],
  [400],
  [400]
];
var graphDoughnut = new Graph('GraphDoughnut');
graphDoughnut.setContainer('graph-doughnut');
graphDoughnut.setType('doughnut');
graphDoughnut.setSize(150, 150);
graphDoughnut.setFontSize(14);
graphDoughnut.setFontFamily('Open Sans');
graphDoughnut.setSeriesLabels(labelsDoughnut);
graphDoughnut.setPoints(pointsDoughnut);
graphDoughnut.setColors(['#1CB8F1', '#08ECEF', '#6CF1B2', '#2388F2']);
graphDoughnut.render();

var labelsDial = [];
var pointsDial = [[75, 100]];
var graphDial = new Graph('GraphDial');
graphDial.setContainer('graph-dial');
graphDial.setType('dial');
graphDial.setSize(140, 120);
graphDial.setFontSize(16);
graphDial.setFontFamily('Open Sans');
graphDial.setLabels(labelsDial);
graphDial.setPoints(pointsDial);
graphDial.setColors(['#1CB8F1', '#08ECEF', '#6CF1B2', '#2388F2']);
graphDial.render();
*/

/*
window.addEventListener('resize', handleResize);
function handleResize() {
  graphLine.setSize(window.innerWidth - 200, window.innerHeight - 200);
  graphLine.render();

  graphBar.setSize(window.innerWidth - 200, window.innerHeight - 200);
  graphBar.render();

  graphBarMulti.setSize(window.innerWidth - 200, window.innerHeight - 200);
  graphBarMulti.render();

  graphBarMultiStack.setSize(window.innerWidth - 200, window.innerHeight - 200);
  graphBarMultiStack.render();

  graphBarMultiStackHorizontal.setSize(window.innerWidth - 200, window.innerHeight - 200);
  graphBarMultiStackHorizontal.render();

  graphPie.setSize(window.innerWidth - 200, window.innerHeight - 200);
  graphPie.render();

  graphDoughnut.setSize(window.innerWidth - 200, window.innerHeight - 200);
  graphDoughnut.render();

  graphDial.setSize(window.innerWidth - 200, window.innerHeight - 200);
  graphDial.render();
}
*/

