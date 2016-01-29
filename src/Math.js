'use strict';

Math.getRange = function(minMax) {
  var range = [];
  var increment = minMax.max / 4;
  for(var i = 0, num = 0; (num = i*increment) <= minMax.max; i++) {
    range.push(Math.floor(num));
  }
  return range;
};

Math.calculateAxisXPositions = function(config) {
  var positions = [];
  if(config.labels.length > 1) {
    var size = config.width / (config.labels.length - 1);
    config.labels.forEach(function(label, index) {
      positions.push(Math.round((size * index)));
    });
  } 
  else {
    positions.push(Math.round(width / 2));
  }
  return positions;
};

Math.calculateAxisYPositions = function(config) {
  var positions = [];
  if(config.labels.length > 1) {
    var size = config.height / (config.labels.length - 1);
    config.labels.forEach(function(label, index) {
      
      //
      //
      var y;
      // If horizontal bar, center row positions
      if(config.type === 'bar' && config.orientation === 'horizontal') {
        y = ((config.strokeWidth * index) * 2.5) + (config.strokeWidth * (config.labels.length - 1));
      }
      // If not horizontal bar, span row positions
      else {
        y = Math.round((size * index));
      }
      positions.push(y);

    });
  } 
  else {
    positions.push(Math.round(height / 2));
  }
  return positions;
};

Math.flattenSet = function(sets) {
  var array = [];
  sets.map(function(set) {
    set.map(function(a) {
      // If stacked point
      if(typeof a === 'object') {
        a.map(function(b) {
          array.push(b);
        });
      }
      // If single point
      else {
        array.push(a);
      }
    });
  });
  return array;
};

Math.getMinMax = function(sets) {
  var flatten = this.flattenSet(sets);
  var range  = {
    min: Array.min(flatten),
    max: Array.max(flatten)
  };
  return range;
};

Math.calculateY = function(y, yMax, height) {
  var calculatedY = this.normalizeY(y, yMax, height);
  return this.reversePosY(calculatedY, 0, height);
}

Math.calculateX = function(x, xMax, width) {
  return this.normalizeX(x, xMax, width);
}

Math.normalizeY = function(y, yMax, height) {
  return (height/yMax) * y;
}

Math.normalizeX = function(x, xMax, width) {
  return (width/xMax) * x;
}

Math.reversePosY = function(x, xMin, xMax) {
  return (xMax + xMin) - x;
}

Math.reversePosX = function(y, yMin, yMax) {
  return (yMax + yMin) - y;
}

Array.max = function(array) {
  return Math.max.apply(Math, array);
};

Array.min = function(array) {
  return Math.min.apply(Math, array);
};

Math.sortByPointAsc = function(a, b) {
  return a.dataPoint-b.dataPoint;
};

Math.sortByPointDesc = function(a, b) {
  return b.dataPoint-a.dataPoint;
};

Math.calculateAngleX = function(rx, radius, angle) {
  return rx + (radius * Math.cos(Math.PI * (angle / 180)));
}

Math.calculateAngleY = function(ry, radius, angle) {
  return ry + (radius * Math.sin(Math.PI * (angle / 180)));
}

Math.getSetPercentages = function(points) {
  var percentages = [];
  var flatten = this.flattenSet(points);
  var sum = flatten.reduce(function(pv, cv) {
    return pv + cv;
  }, 0);
  points.map(function(point) {
    percentages.push((point[0] / sum));
  });
  return percentages;
};

Math.getPercentages = function(points) {
  var percentages = [];
  var flatten = this.flattenSet(points);
  percentages.push(flatten[0] / flatten[1]);
  return percentages;
};

Math.getDegrees = function(percentages, angle) {
  var degrees = [];
  percentages.map(function(percent) {
    degrees.push(percent * angle);
  });
  return degrees;
};

module.exports = Math;
