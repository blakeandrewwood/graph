'use strict';

function ErrorHandling() {}

ErrorHandling.validateConfig = function(config){

  // Check if container is set
  if(typeof config.container !== 'string')
    throw new Error('Container for chart has not been set.');

  // Check if width is set
  if(typeof config.width !== 'number')
    throw new Error('Width of chart has not been set.');

  // Check if height is set
  if(typeof config.height !== 'number')
    throw new Error('Height of chart has not been set.');

  // Check if padding x is set
  if(typeof config.padding.x !== 'number')
    throw new Error('Width padding of chart has not been set.');

  // Check if padding y is set
  if(typeof config.padding.y !== 'number')
    throw new Error('Height padding of chart has not been set.');

  // Check if type is set
  switch(config.type) {
    case 'line': {
      break;
    }
    case 'bar': {
      // Check if orientaion is set
      switch(config.orientaion) {
        case 'vertical':
        case 'horizontal':
          break;
        default:
          throw new Error('Orientation has not been set.');
          break;
      }
      break;
    }
    case 'pie': {
      break;
    }
    case 'doughnut': {
      break;
    }
    case 'dial': {
      break;
    }
    default:
      throw new Error('Type of chart unknown.');
      break;
  }

  // Check if colors are set
  if(typeof config.colors !== 'object')
    throw new Error('Chart colors have not been set.');

  // Check if axis labels are set
  if(typeof config.axisLabels !== 'object')
    throw new Error('Axis labels have not been set.');

  // Check if series labels are set
  if(typeof config.seriesLabels !== 'object')
    throw new Error('Series labels have not been set.');

  // Check if series are set
  if(typeof config.series !== 'object')
    throw new Error('Series have not been set.');

};

module.exports = ErrorHandling;
