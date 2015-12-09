"use strict";
var Utils = require('./Utils');
var Draw = require('./Draw');

function Render() {}

/**
 * Text
 *
 */
Render.prototype.columnLabelText = function(containerId, positions, labels, suffix, prefix, font, size) {
  var textAttributes = [];

  // Text
  labels.forEach(function(label, index) {
    var id = containerId + '-column-label-' + index;
    var x = positions[index];
    var y = size.height + (font.size * 2.6);
    var attributes = {
      id: id,
      x: x,
      y: y,
      fill: '#888',
      fontSize: font.size,
      fontFamily: font.family,
      textAnchor: 'middle',
      dataText: prefix + label + suffix
    };
    textAttributes.push(attributes);
  });

  // Build or Update
  var elements = [];
  textAttributes.map(function(attributes) {
    var element = Utils.buildOrUpdate(attributes, Draw.text);
    var exists = document.getElementById(attributes.id);
    if(!exists) {
      var text = document.createTextNode(attributes.dataText);
      element.appendChild(text);
      elements.push(element);
    }
  });

  // Return
  return elements;
};

Render.prototype.rowLabelText = function(containerId, positions, labels, suffix, prefix, font, size) {
  var textAttributes = [];

  // Text
  labels.forEach(function(label, index) {
    var id = containerId + '-row-label-' + index;
    var x = 0;
    var y = positions[index] + (font.size / 2);
    var attributes = {
      id: id,
      x: x,
      y: y,
      fill: '#888',
      fontSize: font.size,
      fontFamily: font.family,
      textAnchor: 'start',
      dataText: prefix + label + suffix
    };
    textAttributes.push(attributes);
  });

  // Build or Update
  var elements = [];
  textAttributes.map(function(attributes) {
    var element = Utils.buildOrUpdate(attributes, Draw.text);
    var exists = document.getElementById(attributes.id);
    if(!exists) {
      var text = document.createTextNode(attributes.dataText);
      element.appendChild(text);
      elements.push(element);
    }
  });

  // Return
  return elements;
};

Render.prototype.seriesLabelText = function(containerId, labels, font, size, colors) {
  // Text
  var id = containerId + '-series-label-0';
  var dx = 10;
  var x = size.width - dx ;
  var y = size.height - (font.size * 0.2);
  var attributes = {
    id: id,
    x: x,
    y: y,
    fill: '#888',
    fontSize: font.size,
    fontFamily: font.family,
    textAnchor: 'end'
  };

  // Build or Update
  var elements = [];
  var element = Utils.buildOrUpdate(attributes, Draw.text);
  var exists = document.getElementById(attributes.id);
  if(!exists) {
    labels.forEach(function(label, index) {
      var tspanText = Draw.tspan({ dx: dx, fill: colors[index] });
      tspanText.appendChild(document.createTextNode(label));
      element.appendChild(tspanText);
    });
    elements.push(element);
  }

  // Return
  return elements;
};

Render.prototype.bottomLeftLabelText = function(containerId, labels, font, size, colors) {
  var textAttributes = [];

  // Text
  labels.forEach(function(label, index) {
    var id = containerId + '-series-label-' + index;
    // Flip text
    var a = (font.size * 1.4);
    var b = (labels.length - 1);
    var c = (a * b) - (a * index);
    // Reverse y position
    var x = 0;
    var y = Utils.reversePosY(c, 0, size.height);
    var attributes = {
      id: id,
      x: x,
      y: y,
      fill: colors[index],
      fontSize: font.size,
      fontFamily: font.family,
      textAnchor: 'start',
      dataText: label
    };
    textAttributes.push(attributes);
  });

  // Build or Update
  var elements = [];
  textAttributes.map(function(attributes) {
    var element = Utils.buildOrUpdate(attributes, Draw.text);
    var exists = document.getElementById(attributes.id);
    if(!exists) {
      var text = document.createTextNode(attributes.dataText);
      element.appendChild(text);
      elements.push(element);
    }
  });

  // Return
  return elements;
};

Render.prototype.bottomCenterLabelText = function(containerId, text, font, size, color) {
  // Text
  var id = containerId + '-bottom-center-label-0';
  var x = size.width / 2;
  var y = Utils.reversePosY(0, 0, size.height);
  var attributes = {
    id: id,
    x: x,
    y: y,
    fill: color,
    fontSize: font.size,
    fontFamily: font.family,
    textAnchor: 'middle'
  };

  // Build or Update
  var elements = [];
  var element = Utils.buildOrUpdate(attributes, Draw.text);
  var exists = document.getElementById(attributes.id);
  if(!exists) {
    var text = document.createTextNode(text);
    element.appendChild(text);
    elements.push(element);
  }

  // Return
  return elements;
};

Render.prototype.centerLabelText = function(containerId, text, font, size, color) {
  // Text
  var id = containerId + '-center-label-0';
  var x = size.width / 2;
  var y = (font.size / 2) + (size.height / 2);
  var attributes = {
    id: id,
    x: x,
    y: y,
    fill: color,
    fontSize: font.size,
    fontFamily: font.family,
    textAnchor: 'middle'
  };

  // Build or Update
  var elements = [];
  var element = Utils.buildOrUpdate(attributes, Draw.text);
  var exists = document.getElementById(attributes.id);
  if(!exists) {
    var text = document.createTextNode(text);
    element.appendChild(text);
    elements.push(element);
  }

  // Return
  return elements;
};

/**
 * Sets 
 *
 */
Render.prototype.lineSets = function(application, containerId, columnPositions, rowMax, sets, range, size, colors) {
  var lineAttributes = [];

  // Lines
  sets.forEach(function(set, i, array) {
    var newSet = [];
    set.forEach(function(point, j, array) {
      var type = (j > 0) ? '' : 'M';
      newSet.push({
        type: type,
        values: [columnPositions[j],
        Utils.calculateY(point, rowMax, size.height)]
      });
    });
    var id = containerId + '-line-' + i;
    var d = Utils.buildPathString(newSet);
    var attributes = {
      id: id,
      d: d,
      stroke: colors[i],
      strokeWidth: 6,
      strokeLinecap: 'round',
      fill: 'none',
      dataIndex: i
    };
    lineAttributes.push(attributes);
  });

  // Build or Update
  var elements = [];
  lineAttributes.map(function(attributes) {
    var element = Utils.buildOrUpdate(attributes, Draw.path);
    var exists = document.getElementById(attributes.id);
    if(!exists) {
      // Events
      element.addEventListener('mousemove', function(evt) {
        application.Events.onMouseOverLine(evt, application, attributes.dataIndex, rowMax);
      });
      element.addEventListener('mouseout', function(evt) {
        application.Events.onMouseOut(evt, application);
      });
      elements.push(element);
    }
  });

  return elements;
};

Render.prototype.barSets = function(application, containerId, columnPositions, rowPositions, labels, sets, size, horizontal, colors, shadow) {
  // Containers
  var barAttributes = [];
  var barShadowAttributes = [];
  var barStackedAttributes = [];
  var barStackedShadowAttributes = [];
  var barSetsBuildAttributes = this.barSetsBuildAttributes;
  // Build sets
  sets.forEach(function(set, i, array) {
    var index = 0;
    set.forEach(function(point, j, array) {
      // Normal
      if(typeof point === 'number') {
        // Build bar
        var bar = barSetsBuildAttributes(containerId, i, j, null, index, size,
          labels, colors, horizontal, rowPositions, columnPositions, set, point);
        // Append 
        barAttributes.push(bar.attributes);
        barShadowAttributes.push(bar.shadowAttributes)
        index++;
      }
      // Stacked
      else if(typeof point === 'object') {
        point.forEach(function(y1, k, array) {
          // Build bar
          var bar = barSetsBuildAttributes(containerId, i, j, k, index, size,
            labels, colors, horizontal, rowPositions, columnPositions, set, y1);
          // Append 
          barStackedAttributes.push(bar.attributes);
          barStackedShadowAttributes.push(bar.shadowAttributes)
          index++;
        });
      }
    });
  });
  // Sort bars and shadow by point
  // for correct display order.
  barStackedAttributes.sort(Utils.sortByPointDesc);
  barStackedShadowAttributes.sort(Utils.sortByPointDesc);
  // Build or Update
  var elements = [];
  var bars = this.barSetsBuildOrUpdate(application, barAttributes, barShadowAttributes, shadow);
  var stackedBars = this.barSetsBuildOrUpdate(application, barStackedAttributes, barStackedShadowAttributes, shadow);
  elements = elements.concat(bars);
  elements = elements.concat(stackedBars);
  return elements;
};

Render.prototype.barSetsBuildAttributes = function(containerId, i, j, k, index,
  size, labels, colors, horizontal, rowPositions, columnPositions, set, point) {
  var strokeWidth = 16;
  var gutter = -(strokeWidth / 4);
  var offset = ((strokeWidth + gutter) * (set.length - 1)) / 2;
  var shadowOffset = -(strokeWidth / 3);
  var max;
  var l = (k) ? k : ''; 
  var id = containerId + '-bar-' + i + '-' + j + l;
  var idShadow = containerId + '-bar-shadow-' + i + '-' + j + l;
  var attributes = {
    id: id, 
    fill: 'transparent',
    stroke: colors[index],
    strokeWidth: strokeWidth,
    strokeLinecap: 'round',
    dataIndex: index
  };
  var shadowAttributes = {
    id: idShadow,
    opacity: '0.14',
    fill: 'transparent',
    stroke: '#000',
    strokeWidth: strokeWidth,
    strokeLinecap: 'round'
  };
  var newSet = [];
  if(!horizontal) { 
    shadowAttributes.transform = 'translate(' + shadowOffset + ', 0)';
    max = labels[0];
    var x = (columnPositions[i] + (j * (strokeWidth + gutter))) - offset;
    newSet.push({type: 'M', values: [x, Utils.calculateY(0, max, size.height)]});
    newSet.push({type: '', values: [x, Utils.calculateY(point, max, size.height) + (strokeWidth / 2)]});
  } 
  else {
    shadowAttributes.transform = 'translate(' + (-shadowOffset) + ', 0)';
    max = labels[labels.length - 1];
    var y = (rowPositions[i] + (j * (strokeWidth + gutter))) - offset;
    newSet.push({ type: 'M', values: [Utils.calculateX(0, max, size.width), y] });
    newSet.push({ type: '', values: [Utils.calculateX(point, max, size.width) - (strokeWidth / 2), y] });
  }
  // Point
  attributes.dataPoint = point;
  shadowAttributes.dataPoint = point;
  // d
  var d = Utils.buildPathString(newSet);
  attributes.d = d;
  shadowAttributes.d = d;
  return { attributes: attributes, shadowAttributes: shadowAttributes };
};

// TODO: Move to own class
Render.prototype.barSetsBuildOrUpdate = function(application, attributes, shadowAttributes, shadow) {
  var elements = [];
  attributes.forEach(function(attributes, index) {
    var element = Utils.buildOrUpdate(attributes, Draw.path);
    var elementShadow = Utils.buildOrUpdate(shadowAttributes[index], Draw.path);
    var exists = document.getElementById(attributes.id);
    if(!exists) {
      // Events
      element.addEventListener('mousemove', function(evt) {
        application.Events.onMouseOverBar(evt, application, attributes.dataIndex, attributes.dataPoint);
      });
      element.addEventListener('mouseout', function(evt) {
        application.Events.onMouseOut(evt, application);
      });
      if(shadow) {
        elements.push(elementShadow);
      }
      elements.push(element);
    }
  });
  return elements;
};

Render.prototype.pieSets = function(application, containerId, sets, size, colors, shadow) {
  var slicesAttributes = [];
  var center = { x: (size.width / 2), y: (size.height / 2) };
  var radius = (size.height / 2);
  var lastEndAngle = 0;
  sets.forEach(function(set, index, array) {
    var attributes = {
      id: containerId + '-pie-slice-' + index,
      fill: colors[index]
    };
    var sliceOffset = ((index > 0) ? lastEndAngle : 0);
    var rotation = -90 + sliceOffset;
    var startAngle = 0 + rotation;
    var endAngle = set + rotation;
    lastEndAngle += set;
    var splitAngle = 180 + rotation;
    var x1 = Utils.calculateAngleX(center.x, radius, startAngle);
    var y1 = Utils.calculateAngleY(center.y, radius, startAngle);
    var vectors = [
      {type: 'M', values: [center.x, center.y]},
      {type: '',  values: [x1, y1]}
    ];

    var angles = [];
    // If angle is larger than 180, add a arch at 180 degrees
    if(set > 180) {
      angles.push(splitAngle);
    }
    angles.push(endAngle);
    angles.map(function(angle) {
      var x2 = Utils.calculateAngleX(center.x, radius, angle);
      var y2 = Utils.calculateAngleY(center.y, radius, angle);
      vectors.push({type: 'A', values: [radius, radius, 0, 0, 1]});
      vectors.push({type: '',  values: [x2, y2]});
    });
    vectors.push({type: 'Z'});
    attributes.dataPoint = y1;
    attributes.dataIndex = index;
    attributes.d = Utils.buildPathString(vectors);
    slicesAttributes.push(attributes);
  });


  //
  // TODO: Refactor & Cleanup
  //

  // Build or Update
  var elements = [];
  // Normal
  var groupAttributes = { id: containerId + '-pie-0' };
  var group = Utils.buildOrUpdate(groupAttributes, Draw.group);
  // Shadow
  var shadowGroupAttributes = { id: containerId + '-pie-shadow-0' };
  var shadowGroup = Utils.buildOrUpdate(shadowGroupAttributes, Draw.group);
  slicesAttributes.map(function(attributes) {
    // Normal
    var element = Utils.buildOrUpdate(attributes, Draw.path);
    // Shadow
    var shadowAttributes = attributes;
    shadowAttributes.id = attributes.id + '-shadow';
    var shadowElement = Utils.buildOrUpdate(shadowAttributes, Draw.path);
    // Check if exists
    var exists = document.getElementById(attributes.id);
    if(!exists) {
      // Events
      element.addEventListener('mousemove', function(evt) {
        application.Events.onMouseOverPie(evt, application, attributes.dataIndex, attributes.dataPoint);
      });
      element.addEventListener('mouseout', function(evt) {
        application.Events.onMouseOut(evt, application);
      });
      Utils.appendChild(group, element);
      Utils.appendChild(shadowGroup, shadowElement);
    }
  });
  // Build or Update Shadow
  var defs = Draw.defs();
  var shadowId = containerId + '-pie-shadow-0';
  var shadowAttributes = {id: shadowId, opacity: 0.15};
  var shadow = Utils.buildOrUpdateShadow(shadowAttributes, 'pie-shadow', 8, shadowGroup, Draw.shadow, Draw.filterShadow);
  var shadowExists = document.getElementById(shadowAttributes.id);
  if(!shadowExists && shadow) {
    Utils.appendChild(defs, shadow.def);
    elements.push(defs);
    elements.push(shadow.element);
  } 
  // Group
  var groupExists = document.getElementById(groupAttributes.id);
  if(!groupExists) {
    elements.push(group);
  }
  return elements;

  //
  //
  //
};

Render.prototype.doughnutSets = function(application, containerId, sets, size, colors, shadow) {
  // Basic calculation
  var center = { x: (size.width / 2), y: (size.height / 2) };
  var radius1 = (size.height / 2);
  var radius2 = radius1 - (Math.floor(size.height/4.4));
  var x1 = Utils.calculateAngleX(center.x, radius1, 0);
  var y1 = Utils.calculateAngleY(center.y, radius1, 0);
  var x2 = Utils.calculateAngleX(center.x, radius1, 180);
  var y2 = Utils.calculateAngleY(center.y, radius1, 180);
  var x3 = Utils.calculateAngleX(center.x, radius2, 0);
  var y3 = Utils.calculateAngleY(center.y, radius2, 0);
  var x4 = Utils.calculateAngleX(center.x, radius2, 180);
  var y4 = Utils.calculateAngleY(center.y, radius2, 180);
  // Create vectors
  var vectors = [
    {type: 'M', values: [x1, y1]},
    {type: 'A', values: [radius1, radius1, 0, 0, 1]},
    {type: '', values: [x2, y2]},
    {type: 'A', values: [radius1, radius1, 0, 0, 1]},
    {type: '', values: [x1, y1]},
    {type: 'Z'},
    {type: 'M', values: [x3, y3]},
    {type: 'A', values: [radius2, radius2, 0, 0, 0]},
    {type: '', values: [x4, y4]},
    {type: 'A', values: [radius2, radius2, 0, 0, 0]},
    {type: '', values: [x3, y3]},
    {type: 'Z'},
  ];

  //
  // TODO: Refactor & Cleanup
  //

  // Compose
  var elements = [];
  // Clip Path
  var attributes = {
    id: containerId + '-dougnut-clipmask-0',
    d: Utils.buildPathString(vectors)
  };
  var doughnutClip = Utils.buildOrUpdate(attributes, Draw.path);
  // Normal group
  var groupAttributes = {
    id: containerId + '-dougnut-group-0',
  }
  var group = Utils.buildOrUpdate(groupAttributes, Draw.group);
  // Shadow group
  var shadowGroupAttributes = {
    id: containerId + '-dougnut-shadow-group-0',
  }
  var shadowGroup = Utils.buildOrUpdate(shadowGroupAttributes, Draw.group);
  var shadowDoughnutAttributes = attributes;
  shadowDoughnutAttributes.id = containerId + '-shadow-doughnut-0';
  shadowDoughnutAttributes.fill = 'red';
  var shadowDoughnut = Utils.buildOrUpdate(shadowDoughnutAttributes, Draw.path);
  // Pie shape
  var pie = this.pieSets(application, containerId, sets, size, colors, false)[2];
  var defsAttributes = {
    id: containerId + '-dougnut-defs-0'
  };
  var defs = Utils.buildOrUpdate(defsAttributes, Draw.defs);
  var defsExists = document.getElementById(defsAttributes.id);
  if(!defsExists) {
    var clipPath = Draw.clipPath('doughnut-clip', doughnutClip);
    Utils.appendChild(defs, clipPath);
    Utils.setElementAttributes(pie, {clipPath: 'url(#doughnut-clip)'});
    Utils.appendChild(group, pie)
    elements.push(defs);
    Utils.appendChild(shadowGroup, shadowDoughnut);
  }
  // Shadow
  var shadowId = containerId + '-doughnut-shadow-0';
  var shadowAttributes = { id: shadowId, opacity: 0.15 };
  var shadow = Utils.buildOrUpdateShadow(shadowAttributes, 'dougnut-shadow', 8, shadowGroup, Draw.shadow, Draw.filterShadow);
  var shadowExists = document.getElementById(shadowAttributes.id);
  if(!shadowExists) {
    Utils.appendChild(defs, shadow.def);
    elements.push(shadow.element);
  }
  elements.push(group);
  return elements;

  //
  //
  //
};

Render.prototype.dialSets = function(containerId, sets, percentage, size, colors, shadow) {
  // Basic Calculation
  var center = { x: (size.width / 2), y: (size.height / 2) };
  var radius = (size.height / 3.2);
  // Create dot
  var degree = (sets) - 220;
  var dotRadius = radius - 15;
  var cx = Utils.calculateAngleX(center.x, dotRadius, degree);
  var cy = Utils.calculateAngleY(center.y, dotRadius, degree);
  // Create dash
  var dashRadius = radius + 15;
  var rotation = -150;

  var dashAttributes = [];
  for(var i = 0; i < 260; i += 20) {
    var id = containerId + '-dash-' + (i/20);
    var opacity = ((i / 260) > percentage) ? 0.2 : 1.0;
    var x = Utils.calculateAngleX(center.x, dashRadius, i - rotation);
    var y = Utils.calculateAngleY(center.y, dashRadius, i - rotation);
    var attributes = {
      id: id,
      transform: 'translate(' + x + ', ' + y + ') rotate(' + (i - 120) + ', 0, 0)',
      fill: colors[0],
      opacity: opacity
    };
    var vectors = [
      {type: 'M', values: [0, 0]},
      {type: '', values: [-2.6, 0]},
      {type: '', values: [-3.8, -20]},
      {type: '', values: [3.8, -20]},
      {type: '', values: [2.6, 0]},
      {type: 'Z'},
    ];
    attributes.d = Utils.buildPathString(vectors);
    dashAttributes.push(attributes);
  }

  //
  // TODO: Refactor & Cleanup
  //

  // Build or Update
  var elements = [];
  dashAttributes.map(function(attributes) {
    var element = Utils.buildOrUpdate(attributes, Draw.path);
    var exists = document.getElementById(attributes.id);
    if(!exists) {
      elements.push(element);
    }
  });
  // Dial
  var dialAttributes = {
    id: containerId + '-dial-0',
    cx: center.x,
    cy: center.y,
    r: radius,
    fill: colors[0] 
  };
  var dial = Utils.buildOrUpdate(dialAttributes, Draw.circle);
  var shadowGroupAttributes = {
    id: containerId + '-dial-shadow-group-0'
  };
  var shadowGroup = Utils.buildOrUpdate(shadowGroupAttributes, Draw.group);
  var shadowGroupExists = document.getElementById(shadowGroupAttributes.id);
  // Shadow
  var shadowElementAttributes = dialAttributes;
  shadowElementAttributes.id = containerId + '-dial-shadow-element-0';
  var shadowElement = Utils.buildOrUpdate(shadowElementAttributes, Draw.circle);
  // Defs
  var defsAttributes = { id: containerId + '-defs-0' };
  var defs = Utils.buildOrUpdate(defsAttributes, Draw.defs);
  var defsExists = document.getElementById(defsAttributes.id);
  if(!defsExists) {
    elements.push(defs);
    Utils.appendChild(shadowGroup, shadowElement);
  }
  // Shadow
  var shadowId = containerId + '-dial-shadow-0';
  var shadowAttributes = {id: shadowId, opacity: 0.15};
  var shadow = Utils.buildOrUpdateShadow(shadowAttributes, 'dial-shadow', 8, shadowGroup, Draw.shadow, Draw.filterShadow);
  var shadowExists = document.getElementById(shadowAttributes.id);
  if(!shadowExists && shadow) {
    Utils.appendChild(defs, shadow.def);
    elements.push(shadow.element);
  } 
  // Dial
  var dialExists = document.getElementById(dialAttributes.id);
  if(!dialExists) {
    elements.push(dial);
  }
  // Dot
  var dotAttributes = {
    id: containerId + '-dial-dot-0',
    cx: cx,
    cy: cy,
    r: 5,
    fill: '#fff'
  };
  var dot = Utils.buildOrUpdate(dotAttributes, Draw.circle);
  var dotExists = document.getElementById(dotAttributes.id);
  if(!dotExists) {
    elements.push(dot);
  }
  return elements;

  //
  //
  //
};

Render.prototype.tooltip = function(id, fontFamily) {
  var divStyle = Utils.styleToString({
    position: 'absolute',
    padding: '10px 20px',
    margin: 'none',
    color: '#fff',
    fontSize: '16px',
    fontFamily: fontFamily,
    boxShadow: '4px 4px 0 rgba(0, 0, 0, 0.2)'
  });
  var pStyle = Utils.styleToString({
    padding: '0',
    margin: '0'
  });
  var element = Draw.div({
    id: id,
    style: divStyle
  });
  var p0 = Draw.p({
    id: id + '-text-line-0',
    style: pStyle
  });
  var p1 = Draw.p({
    id: id + '-text-line-1',
    style: pStyle
  });
  Utils.appendChild(element, p0);
  Utils.appendChild(element, p1);
  return element;
};

Render.prototype.graphLines = function(containerId, columnPositions, rowPositions, size, show) {
  var lines = [];

  // Vertical
  columnPositions.forEach(function(x, index) {
    var id = containerId + '-graph-line-vertical-' + index;
    var lineAttributes = {
      id: id,
      opacity: (show) ? 1 : 0, 
      x1: x,
      y1: 0,
      x2: x,
      y2: size.height,
      stroke: '#ccc',
      strokeDasharray: '5, 5'
    }
    lines.push(lineAttributes);
  });

  // Horizontal
  rowPositions.forEach(function(y, index) {
    var id = containerId + '-graph-line-horizontal-' + index;
    var lineAttributes = {
      id: id,
      opacity: (show) ? 1 : 0, 
      x1: 0,
      y1: y,
      x2: size.width,
      y2: y,
      stroke: '#ccc',
      strokeDasharray: '5, 5'
    }
    lines.push(lineAttributes);
  });

  // Build or Update
  var elements = [];
  lines.map(function(attributes) {
    var element = Utils.buildOrUpdate(attributes, Draw.line);
    var exists = document.getElementById(attributes.id);
    if(!exists) {
      elements.push(element);
    }
  });

  // Return
  return elements;
};

Render.prototype.svg = function(containerId, container, fontSize, size, padding) {
  var id = containerId + '-svg';
  var width = size.width + padding.x;
  var height = size.height + padding.y;
  var attributes = {
    id: id,
    xmlns: 'http://www.w3.org/2000/svg',
    version: '1.1',
    width: width,
    height: height
  };

  // Build or Update
  var element = Utils.buildOrUpdate(attributes, Draw.svg);

  // Return
  return element;
};

module.exports = new Render();