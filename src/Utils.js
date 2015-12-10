"use strict";

function Utils() {}

/**
 * Element 
 *
 */
Utils.prototype.setElementAttributes = function(element, attributes) {
  for(var attribute in attributes) {
    var attr = attribute.replace(/[A-Z]/g, function(v) {
      return '-' + v.toLowerCase();
    });
    element.setAttribute(attr, attributes[attribute]);
  }
};

Utils.prototype.styleToString = function(attributes) {
  var string = '';
  for(var attribute in attributes) {
    var attr = attribute.replace(/[A-Z]/g, function(v) {
      return '-' + v.toLowerCase();
    });
    string += (attr + ':' + attributes[attribute] + ';');
  }
  return string;
};

Utils.prototype.appendChild = function(element, child) {
  element.appendChild(child);
};

Utils.prototype.appendChildren = function(element, children) {
  children.map(function(child) {
    element.appendChild(child);
  });
};

Utils.prototype.setDivPosition = function(element, x, y) {
  element.style.position = 'absolute';
  element.style.left = x + 'px';
  element.style.top = y + 'px';
};

Utils.prototype.getElementOffset = function(element) {
  var box = element.getBoundingClientRect();
  var body = document.body;
  var docElement = document.documentElement;
  var scrollTop = window.pageYOffset || docElement.scrollTop || body.scrollTop;
  var scrollLeft = window.pageXOffset || docElement.scrollLeft || body.scrollLeft;
  var clientTop = docElement.clientTop || body.clientTop || Math.abs(body.getBoundingClientRect().top) || 0;
  var clientLeft = docElement.clientLeft || body.clientLeft || Math.abs(body.getBoundingClientRect().left) || 0;
  var top = box.top + scrollTop - clientTop;
  var left = box.left + scrollLeft - clientLeft;
  return { top: Math.round(top), left: Math.round(left) }
};

Utils.prototype.showElement = function(element) {
  element.style.display = 'block';
};

Utils.prototype.hideElement = function(element) {
  element.style.display = 'none';
};

/**
 * Build or Update 
 *
 */
Utils.prototype.buildOrUpdate = function(attributes, drawFunction) {
  var element = document.getElementById(attributes.id);
  if(!element) {
    element = drawFunction(attributes);
  } else {
    this.setElementAttributes(element, attributes);
  }
  return element;
};

Utils.prototype.buildOrUpdateShadow = function(attributes, id, stdDeviation, group, drawFunction, drawFilterFunction) {
  var shadow = {};
  shadow.element = document.getElementById(attributes.id);
  if(!shadow.element) {
    shadow = drawFunction(attributes, id, stdDeviation, group, drawFilterFunction);
  } else {
    this.setElementAttributes(shadow.element, attributes);
  }
  return shadow;
};

Utils.prototype.buildOrUpdateGroup = function(attributes, children, drawFunction) {
  var element = this.buildOrUpdate(attributes, drawFunction);
  var exists = document.getElementById(attributes.id);
  if(!exists) {
    this.appendChildren(element, children);
  }
  return element;
};

Utils.prototype.buildOrUpdateGroupConcat = function(array, group, id, x, y, drawFunction) {
  var children = array;
  var transform = 'translate(' + x + ', ' + y + ')';
  var attributes = {
    id: id,
    transform: transform
  };
  var group = this.buildOrUpdateGroup(attributes, group, drawFunction);
  var exists = document.getElementById(attributes.id);
  if(!exists) {
    children.push(group);
  }
  return children;
};

/**
 * Data 
 *
 */
Utils.prototype.buildPathString = function(vectors) {
  var d = '';
  vectors.forEach(function(vector, index, array) {
    d += vector.type;
    if(vector.values) {
      vector.values.map(function(value) {
        d += value + ' ';
      });
    }
  });
  return d.trim();
};

Utils.prototype.flattenPoints = function(points) {
  var yArray = [];
  points.map(function(point) {
    point.map(function(y) {
      // If stacked point
      if(typeof y === 'object') {
        y.map(function(y1) {
          yArray.push(y1);
        });
      }
      // If single point
      else {
        yArray.push(y);
      }
    });
  });
  return yArray;
};

Utils.prototype.getPointIncrements = function(yMax, increment) {
  var numItems = Math.ceil(yMax / increment) + 1;
  var items = [];
  for(var i = 0; i < numItems; i++) {
    items.push(i * increment);
  }
  items.reverse();
  return items;
};

Utils.prototype.getSetPercentages = function(points) {
  var percentages = [];
  var flatten = this.flattenPoints(points);
  var sum = flatten.reduce(function(pv, cv) {
    return pv + cv;
  }, 0);
  points.map(function(point) {
    percentages.push((point[0] / sum));
  });
  return percentages;
};

Utils.prototype.getPercentages = function(points) {
  var percentages = [];
  var flatten = this.flattenPoints(points);
  percentages.push(flatten[0] / flatten[1]);
  return percentages;
};

Utils.prototype.getDegrees = function(percentages, angle) {
  var degrees = [];
  percentages.map(function(percent) {
    degrees.push(percent * angle);
  });
  return degrees;
};

Utils.prototype.getMinMax = function(points) {
  var range = {};
  var flatten = this.flattenPoints(points);
  range.min = Array.min(flatten);
  range.max = Array.max(flatten);
  return range;
};

/**
 * Math 
 *
 */
Utils.prototype.calculateColumnPositions = function(labels, width) {
  var positions = [];
  var size =  width / (labels.length - 1);
  labels.forEach(function(label, index, array) {
    var x = Math.round((size * index));
    positions.push(x);
  });
  return positions;
};

Utils.prototype.calculateRowPositions = function(labels, height, horizontal, strokeWidth) {
  var positions = [];
  var size =  height / (labels.length - 1);
  labels.forEach(function(label, index, array) {
    var y;

    // If not horizontal bar, span row positions
    if(!horizontal) {
      y = Math.round((size * index));
    }

    // If horizontal bar, center row positions
    else {
      y = ((strokeWidth * index) * 2) + ((height/2) - ((strokeWidth * (labels.length - 1))));
    }
    
    positions.push(y);
  }, this);
  return positions;
};

Utils.prototype.calculateY = function(y, yMax, height) {
  var calculatedY = this.normalizeY(y, yMax, height);
  return this.reversePosY(calculatedY, 0, height);
}

Utils.prototype.calculateX = function(x, xMax, width) {
  return this.normalizeX(x, xMax, width);
}

Utils.prototype.normalizeY = function(y, yMax, height) {
  return (height/yMax) * y;
}

Utils.prototype.normalizeX = function(x, xMax, width) {
  return (width/xMax) * x;
}

Utils.prototype.reversePosY = function(x, xMin, xMax) {
  return (xMax + xMin) - x;
}

Utils.prototype.reversePosX = function(y, yMin, yMax) {
  return (yMax + yMin) - y;
}

Utils.prototype.calculateAngleX = function(rx, radius, angle) {
  return rx + (radius * Math.cos(Math.PI * (angle / 180)));
}

Utils.prototype.calculateAngleY = function(ry, radius, angle) {
  return ry + (radius * Math.sin(Math.PI * (angle / 180)));
}

Utils.prototype.sortDesc = function(a, b) {
  return b-a;
}

Utils.prototype.sortByPointDesc = function(a, b) {
  return b.dataPoint-a.dataPoint;
}

Array.max = function(array) {
  return Math.max.apply(Math, array);
};

Array.min = function(array) {
  return Math.min.apply(Math, array);
};

module.exports = new Utils();