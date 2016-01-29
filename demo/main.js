'use strict';
var colors = ['#2388F2', '#F65237', '#0DEFA5', '#9B7CF3'];

var graph = new Graph({
  container: 'graph-0',
  type: 'line',
  width: 200,
  height: 100,
  padding: {
    x: 80,
    y: 80
  },
  colors: colors,
  fontFamily: 'Open Sans',
  fontSize: 10,
  strokeWidth: 4,
  axisLabels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  seriesLabels: ['Capture', 'Upload', 'Delete'],
  series: [
    [10, 20, 23, 60, 53, 68],
    [12, 23, 40, 34, 30, 29],
    [20, 20, 10, 33, 42, 42],
  ]
});

var graph = new Graph({
  container: 'graph-1',
  type: 'bar',
  orientation: 'vertical',
  width: 200,
  height: 100,
  shadow: true,
  padding: {
    x: 80,
    y: 80
  },
  colors: colors,
  fontFamily: 'Open Sans',
  fontSize: 10,
  strokeWidth: 10,
  axisLabels: ['Sun', 'Mon', 'Tue'],
  seriesLabels: ['Capture', 'Upload', 'Delete'],
  series: [
    [[10, 20], 23],
    [12, 23, 40],
    [20, 20, 10]
  ]
});

var graph = new Graph({
  container: 'graph-2',
  type: 'pie',
  width: 200,
  height: 100,
  shadow: true,
  padding: {
    x: 80,
    y: 80
  },
  colors: colors,
  fontFamily: 'Open Sans',
  fontSize: 10,
  strokeWidth: 12,
  axisLabels: ['Sun', 'Mon', 'Tue'],
  seriesLabels: ['Capture', 'Upload', 'Delete'],
  series: [
    [10],
    [12],
    [20]
  ]
});

var graph = new Graph({
  container: 'graph-3',
  type: 'doughnut',
  width: 200,
  height: 100,
  shadow: true,
  padding: {
    x: 80,
    y: 80
  },
  colors: colors,
  fontFamily: 'Open Sans',
  fontSize: 10,
  strokeWidth: 12,
  axisLabels: ['Sun', 'Mon', 'Tue'],
  seriesLabels: ['Capture', 'Upload', 'Delete'],
  series: [
    [10],
    [12],
    [20]
  ]
});

var graph = new Graph({
  container: 'graph-4',
  type: 'bar',
  orientation: 'horizontal',
  width: 200,
  height: 100,
  shadow: true,
  padding: {
    x: 80,
    y: 80
  },
  colors: colors,
  fontFamily: 'Open Sans',
  fontSize: 10,
  strokeWidth: 10,
  axisLabels: ['Sun', 'Mon', 'Tue'],
  seriesLabels: ['Capture', 'Upload', 'Delete'],
  series: [
    [[10, 20, 23]],
    [[12, 23, 40]],
    [[20, 20, 10]]
  ]
});

var graph = new Graph({
  container: 'graph-5',
  type: 'dial',
  width: 200,
  height: 100,
  shadow: true,
  padding: {
    x: 80,
    y: 80
  },
  colors: colors,
  fontFamily: 'Open Sans',
  fontSize: 10,
  strokeWidth: 12,
  axisLabels: ['Sun', 'Mon', 'Tue'],
  seriesLabels: ['Capture', 'Upload', 'Delete'],
  series: [
    [476, 1324],
  ]
});

/*
var index = 0;
var seriesLabels = [];
var series = [
  [],
  [],
  []
];
setInterval(function() {
  seriesLabels.push(index);
  series[0].push(Math.floor(Math.random() * 100) + 1);
  series[1].push(Math.floor(Math.random() * 100) + 1);
  series[2].push(Math.floor(Math.random() * 100) + 1);
  console.log(series);
  graph.update({
    axisLabels: seriesLabels,
    series: series
  });
  index++;
}, 1000);
*/

/*
setTimeout(function() {
  graph.update({
    width: 500,
    height: 300,
    axisLabels: ['Sun', 'Mon', 'Tue', 'Wed'],
    series: [
      [2000, 5500, 4500],
      [1000, 3200, 1600],
      [600, 2100, 15000],
      [2000, 5500, 4500],
    ]
  });
}, 2000);

setTimeout(function() {
  graph.update({
    width: 500,
    height: 300,
    axisLabels: ['1 dec', '2 dec', '3 dev', '4 dec', '5 dec'],
    series: [
      [2000, 5500, 4500],
      [1000, 3200, 1600],
      [600, 2100, 1500],
      [1000, 3200, 1600],
      [1000, 3200, 1600]
    ]
  });
}, 4000);
*/

/*
window.addEventListener('resize', handleResize);
function handleResize() {
  graph.update({
    width: window.innerWidth,
    height: window.innerHeight,
  });
};
*/
