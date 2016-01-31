'use strict';
var ErrorHandling = require('./ErrorHandling'); 
var DOM = require('./DOM'); 
var cMath = require('./Math');
var Bar = require('./render/Bar');
var Line = require('./render/Line');
var Pie = require('./render/Pie');
var Doughnut = require('./render/Doughnut');
var Dial = require('./render/Dial');
var EventEmitter = require('./EventEmitter'); 

function Graph(config) {

  ErrorHandling.validateConfig(config);

  // Settings
  this.settings = {
    container: null,
    type: null,
    colors: [],
    orientation: null,
    strokeWidth: 5, 
    fontSize: 12,
    fontFamily: 'Open Sans',
    shadow: false,
    showAxis: true 
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

  // EventEmitter
  this.EventEmitter = new EventEmitter(this);

  // Dom
  this.DOM = new DOM();

  //
  //
  this.render(config);
}

Graph.prototype.setup = function(config) {

  //
  //
  if(typeof config.container !== 'undefined')
    this.settings.container = config.container;
  if(typeof config.type !== 'undefined')
    this.settings.type = config.type;
  if(typeof config.colors !== 'undefined')
    this.settings.colors = config.colors;
  if(typeof config.showAxis !== 'undefined')
    this.settings.showAxis = config.showAxis;
  if(typeof config.showAxis !== 'undefined')
    this.settings.shadow = config.shadow;
  if(typeof config.orientation !== 'undefined')
    this.settings.orientation = config.orientation;
  if(typeof config.fontFamily !== 'undefined')
    this.settings.fontFamily = config.fontFamily;
  if(typeof config.fontSize !== 'undefined')
    this.settings.fontSize = config.fontSize;
  if(typeof config.strokeWidth !== 'undefined')
    this.settings.strokeWidth = config.strokeWidth;
  if(typeof config.padding !== 'undefined') {
    if(typeof config.padding.x !== 'undefined')
      this.positions.padding.x = config.padding.x;
    if(typeof config.padding.y !== 'undefined')
      this.positions.padding.y = config.padding.y;
  }
  if(typeof config.width !== 'undefined')
    this.positions.size.x = config.width;
  if(typeof config.height !== 'undefined')
    this.positions.size.y = config.height;
  if(typeof config.series !== 'undefined')
    this.data.series = config.series;

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
  // Set axisLabels to appropriate axis 
  if(this.settings.type === 'bar' && this.settings.orientation === 'horizontal') {
    this.data.axisLabels.x = this.data.range;
    this.data.axisLabels.y = config.axisLabels;
  } else {
    this.data.axisLabels.x = config.axisLabels;
    this.data.axisLabels.y = this.data.range;
    this.data.axisLabels.y.reverse();
  }

  // ---Calculate
  // Calculate axis positions
  if(this.settings.type === 'bar' || this.settings.type === 'line') {

    this.positions.axis.x = Math.calculateAxisXPositions({
      labels: this.data.axisLabels.x,
      width: this.positions.size.x
    });

    this.positions.axis.y = Math.calculateAxisYPositions({
      type: this.settings.type, 
      orientation: this.settings.orientation, 
      strokeWidth: this.settings.strokeWidth,
      labels: this.data.axisLabels.y,
      height: this.positions.size.y
    });
    
  }

  // ---Calculate
  // Calculate series positions 
  this.positions.series = [];

  switch(this.settings.type) {
    case 'bar': {
      this.positions.series = Bar.calculate({
        settings: this.settings,
        data: this.data,
        positions: this.positions
      });
      break;
    }
    case 'line': {
      this.positions.series = Line.calculate({
        settings: this.settings,
        data: this.data,
        positions: this.positions
      });
      break;
    }
    case 'pie': {
      this.positions.series = Pie.calculate({
        settings: this.settings,
        data: this.data,
        positions: this.positions
      });
      break;
    }
    case 'doughnut': {
      this.positions.series = Doughnut.calculate({
        settings: this.settings,
        data: this.data,
        positions: this.positions
      });
      break;
    }
    case 'dial': {
      this.positions.series = Dial.calculate({
        settings: this.settings,
        data: this.data,
        positions: this.positions
      });
      break;
    }
  }

  //
  //
  if(config.seriesLabels)
    this.data.seriesLabels = config.seriesLabels;

};

Graph.prototype.render = function(config) {
  this.setup(config);
  this.DOM.createSvg(config, {
    width: this.positions.size.x + this.positions.padding.x,
    height: this.positions.size.y + this.positions.padding.y 
  });

  if(this.settings.type === 'line' || this.settings.type === 'bar' ) {
    if(this.settings.showAxis) {
      this.DOM.createGrid({
        positions: this.positions
      });
    }
    this.DOM.createLabels({
      settings: this.settings,
      positions: this.positions,
      data: this.data
    });
  }

  if(this.settings.type !== 'dial') {
    this.DOM.createSeriesLabels({
      settings: this.settings,
      positions: this.positions,
      data: this.data
    });
  }

  if(this.settings.type === 'dial') {
    this.DOM.createPercentLabels({
      settings: this.settings,
      positions: this.positions,
      data: this.data
    });
  }

  switch(this.settings.type) {
    case 'bar': {
      this.DOM.createBars({
        positions: this.positions,
        data: this.data,
        settings: this.settings,
        EventEmitter: this.EventEmitter
      });
      break;
    }
    case 'line': {
      this.DOM.createLine({
        positions: this.positions,
        data: this.data,
        settings: this.settings,
        EventEmitter: this.EventEmitter
      });
      break;
    }
    case 'pie': {
      this.DOM.createPie({
        positions: this.positions,
        data: this.data,
        settings: this.settings,
        EventEmitter: this.EventEmitter
      });
      break;
    }
    case 'doughnut': {
      this.DOM.createDoughnut({
        positions: this.positions,
        data: this.data,
        settings: this.settings,
        EventEmitter: this.EventEmitter
      });
      break;
    }
    case 'dial': {
      this.DOM.createDial({
        positions: this.positions,
        data: this.data,
        settings: this.settings
      });
      break;
    }
  }

  this.DOM.render({
    settings: this.settings,
    positions: this.positions
  });
};

Graph.prototype.update = function(config) {
  this.render(config);
};

module.exports = Graph;