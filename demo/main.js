'use strict';
var colors = ['#2388F2', '#F65237', '#0DEFA5', '#9B7CF3'];

var graph = new Graph({
  container: 'graph',
  type: 'pie',
  width: 400,
  height: 300,
  padding: {
    x: 40,
    y: 40
  },
  colors: colors,
  axisLabels: ['Sun', 'Mon', 'Tue', 'Wed'],
  seriesLabels: ['Capture', 'Upload', 'Delete', 'Fetch'],
  series: [
    [200],
    [300],
    [400],
    [100]
  ]
});

/*
var graph = new Graph({
  container: 'graph',
  type: 'bar',
  orientaion: 'vertical',
  width: 400,
  height: 300,
  padding: {
    x: 40,
    y: 40
  },
  colors: colors,
  axisLabels: ['Sun', 'Mon', 'Tue'],
  seriesLabels: ['Capture', 'Upload', 'Delete'],
  series: [
    [[1000, 2000, 3000]],
    [2000, 1000, 4000],
    [4000, 2000, 1000],
  ]
});

setTimeout(function() {
  graph.update({
    width: 500,
    height: 300,
    axisLabels: ['Sun', 'Mon', 'Tue', 'Wed'],
    series: [
      [2000, 5500, 4500],
      [1000, 3200, 1600],
      [600, 2100, 1500],
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

/*
window.addEventListener('resize', handleResize);
function handleResize() {
  graph.update({
    width: window.innerWidth,
    height: window.innerHeight,
  });
};
*/
