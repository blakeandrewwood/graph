'use strict';
var ErrorHandling = require('./ErrorHandling'); 
var DOM = require('./DOM'); 
var cMath = require('./Math');
var Bar = require('./render/Bar');
var Line = require('./render/Line');
var Pie = require('./render/Pie');
var Doughnut = require('./render/Doughnut');

function Graph(config) {

  ErrorHandling.validateConfig(config);

  // Settings
  this.settings = {
    container: null,
    type: null,
    colors: [],
    orientation: null,
    strokeWidth: 4
  };

  // Data
  this.data = {
    axisLabels: {
      x: [],
      y: []
    },
    seriesLabels: [],
    series: []
  }

  // Positions
  this.positions = {
    size: {
      x: 0,
      y: 0
    },
    padding: {
      x: 0,
      y: 0
    },
    axis: {
      x: [],
      y: []
    },
    seriesLabels: [],
    series: []
  };

  // Dom
  this.DOM = new DOM();

  //
  //
  this.render(config);
}

Graph.prototype.setup = function(config) {

  //
  //
  if(config.container)
    this.settings.container = config.container;

  //
  //
  if(config.type)
    this.settings.type = config.type;
  if(config.colors)
    this.settings.colors = config.colors;
  if(config.orientation)
    this.settings.orientation = config.orientation;

  //
  //
  if(config.padding){
    if(config.padding.x)
      this.positions.padding.x = config.padding.x;
    if(config.padding.y)
      this.positions.padding.y = config.padding.y;
  }

  //
  //
  if(config.width)
    this.positions.size.x = config.width;
  if(config.height)
    this.positions.size.y = config.height;

  //
  // Set series 
  if(config.series) {
    this.data.series = config.series;
  }

  // ---Calculate
  // Get min max values
  var minMax = Math.getMinMax(this.data.series);
  this.data.min = minMax.min;
  this.data.max = minMax.max;

  // ---Calculate
  // Set range
  this.data.range = Math.getRange({
    min: this.data.min,
    max: this.data.max
  }); 

  //
  // Set orientation settings 
  if(config.axisLabels) {

    // Set axisLabels to appropriate axis 
    if(this.settings.type === 'bar' && this.settings.orientation == 'horizontal') {
      this.data.axisLabels.x = this.data.range;
      this.data.axisLabels.y = config.axisLabels;
    } else {
      this.data.axisLabels.x = config.axisLabels;
      this.data.axisLabels.y = this.data.range;
    }
    
  }

  // ---Calculate
  // Calculate axis positions
  this.positions.axis.x = Math.calculateAxisXPositions({
    labels: this.data.axisLabels.x,
    width: this.positions.size.x
  });
  this.positions.axis.y = Math.calculateAxisYPositions({
    labels: this.data.axisLabels.y,
    height: this.positions.size.y
  });

  // ---Calculate
  // Calculate series positions 
  this.positions.series = [];

  /*
  this.positions.series = Bar.calculate({
    settings: this.settings,
    data: this.data,
    positions: this.positions
  });

  this.positions.series = Line.calculate({
    settings: this.settings,
    data: this.data,
    positions: this.positions
  });

  this.positions.series = Pie.calculate({
    settings: this.settings,
    data: this.data,
    positions: this.positions
  });
  */

  this.positions.series = Doughnut.calculate({
    settings: this.settings,
    data: this.data,
    positions: this.positions
  });

  //
  //
  if(config.seriesLabels)
    this.data.seriesLabels = config.seriesLabels;

};

Graph.prototype.render = function(config) {
  this.setup(config);
  this.DOM.createSvg({
    width: this.positions.size.x + this.positions.padding.x,
    height: this.positions.size.y + this.positions.padding.y 
  });

  /*
  this.DOM.createGrid(this.positions);
  this.DOM.createLabels({
    positions: this.positions,
    data: this.data
  });
  */

  /*
  this.DOM.createBars({
    positions: this.positions,
    data: this.data,
    settings: this.settings
  });

  this.DOM.createLine({
    positions: this.positions,
    data: this.data,
    settings: this.settings
  });

  this.DOM.createPie({
    positions: this.positions,
    data: this.data,
    settings: this.settings
  });
  */

  this.DOM.createDoughnut({
    positions: this.positions,
    data: this.data,
    settings: this.settings
  });

  this.DOM.render({
    container: this.settings.container,
    positions: this.positions
  });
};

Graph.prototype.update = function(config) {
  this.render(config);
};

module.exports = Graph;