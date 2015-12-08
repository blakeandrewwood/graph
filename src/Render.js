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
    var id = containerId + '-column-label-' + index;
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
  var textAttributes = [];

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
  textAttributes.push(attributes);

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

Render.prototype.bottomLeftLabelText = function(labels, font, size, colors) {
  var elements = []; 
  labels.forEach(function(label, index, array) {
    // Flip text
    var a = (font.size * 1.4);
    var b = (labels.length - 1);
    var c = (a * b) - (a * index);
    // Reverse y position
    var x = 0;
    var y = Utils.reversePosY(c, 0, size.height);
    var textSvg = Draw.text({
      x: x,
      y: y,
      fill: colors[index],
      fontSize: font.size,
      fontFamily: font.family,
      textAnchor: 'right'
    });
    var text = document.createTextNode(label);
    textSvg.appendChild(text);
    elements.push(textSvg);
  });
  return elements;
};

Render.prototype.bottomCenterLabelText = function(text, font, size, color) {
  var elements = []; 
  var x = size.width / 2;
  var y = Utils.reversePosY(0, 0, size.height);
  var textSvg = Draw.text({
    x: x,
    y: y,
    fill: color,
    fontSize: font.size,
    fontFamily: font.family,
    textAnchor: 'middle'
  });
  var text = document.createTextNode(text);
  textSvg.appendChild(text);
  elements.push(textSvg);
  return elements;
};

Render.prototype.centerLabelText = function(text, font, size, color) {
  var elements = []; 
  var x = size.width / 2;
  var y = (font.size / 2) + (size.height / 2);
  var textSvg = Draw.text({
    x: x,
    y: y,
    fill: color,
    fontSize: font.size,
    fontFamily: font.family,
    textAnchor: 'middle'
  });
  var text = document.createTextNode(text);
  textSvg.appendChild(text);
  elements.push(textSvg);
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

Render.prototype.barSets = function(application, columnPositions, rowPositions, labels, sets, size, horizontal, colors, shadow) {
  var elements = [];
  sets.forEach(function(set, i, array) {
    var index = 0;
    set.sort(Utils.sortDesc);
    set.forEach(function(point, j, array) {
      var strokeWidth = 16;
      var gutter = -(strokeWidth / 4);
      var offset = ((strokeWidth + gutter) * (set.length - 1)) / 2;
      var shadowOffset = -(strokeWidth / 3);
      var max;
      var attributes = {
        fill: 'transparent',
        stroke: colors[index],
        strokeWidth: strokeWidth,
        strokeLinecap: 'round'
      };
      var shadowAttributes = {
        opacity: '0.15',
        fill: 'transparent',
        stroke: '#000',
        strokeWidth: strokeWidth,
        strokeLinecap: 'round'
      };
      // Normal
      if(typeof point === 'number') {
        var newSet = [];
        if(!horizontal) { 
          shadowAttributes.transform = 'translate(' + shadowOffset + ', 0)';
          max = labels[0];
          var x = (columnPositions[i] + (j * (strokeWidth + gutter))) - offset;
          newSet.push({type: 'M', values: [x, Utils.calculateY(0, max, size.height)]});
          newSet.push({type: '', values: [x, Utils.calculateY(point, max, size.height) + (strokeWidth / 2)]});
        } 
        else {
          shadowAttributes.transform = 'translate(' + -shadowOffset + ', 0)';
          max = labels[labels.length - 1];
          var y = (rowPositions[i] + (j * (strokeWidth + gutter))) - offset;
          newSet.push({ type: 'M', values: [Utils.calculateX(0, max, size.width), y] });
          newSet.push({ type: '', values: [Utils.calculateX(point, max, size.width) - (strokeWidth / 2), y] });
        }
        // d
        var d = Utils.buildPathString(newSet);
        // Shadow
        if(shadow) { 
          shadowAttributes.d = d;
          var shadowPath = Draw.path(shadowAttributes, newSet);
          elements.push(shadowPath);
        }
        // Path
        attributes.d = d;
        var path = Draw.path(attributes, newSet);
        elements.push(path);
        // Events
        path.addEventListener('mousemove', function(evt) {
          application.Events.onMouseOverBar(evt, application, 0, point);
        });
        path.addEventListener('mouseout', function(evt) {
          application.Events.onMouseOut(evt, application);
        });
        index++;
      }
      // Stacked
      else if(typeof point === 'object') {
        point.sort(Utils.sortDesc);
        point.forEach(function(y1, k, array) {
          // Update stroke color since index increases
          attributes.stroke = colors[index];
          var newSet = [];
          if(!horizontal) { 
            shadowAttributes.transform = 'translate(' + shadowOffset + ', 0)';
            max = labels[0];
            var x = (columnPositions[i] + (j * (strokeWidth + gutter))) - offset;
            newSet.push({ type: 'M', values: [x, Utils.calculateY(0, max, size.height)] });
            newSet.push({ type: '', values: [x, Utils.calculateY(y1, max, size.height) + (strokeWidth / 2)] });
          } 
          else {
            shadowAttributes.transform = 'translate(' + (-shadowOffset) + ', 0)';
            max = labels[labels.length - 1];
            var y = (rowPositions[i] + (j * (strokeWidth + gutter))) - offset;
            newSet.push({ type: 'M', values: [Utils.calculateX(0, max, size.width), y] });
            newSet.push({ type: '', values: [Utils.calculateX(y1, max, size.width) - (strokeWidth / 2), y] });
          }
          // d
          var d = Utils.buildPathString(newSet);
          // Shadow
          if(shadow) { 
            shadowAttributes.d = d;
            var shadowPath = Draw.path(shadowAttributes, newSet);
            elements.push(shadowPath);
          }
          // Path
          attributes.d = d;
          var path = Draw.path(attributes, newSet);
          elements.push(path);
          // Events
          path.addEventListener('mousemove', function(evt) {
            application.Events.onMouseOverBar(evt, application, 0, y1);
          });
          path.addEventListener('mouseout', function(evt) {
            application.Events.onMouseOut(evt, application);
          });
          index++;
        });
      }
    });
  });
  return elements;
};

Render.prototype.pieSets = function(application, sets, size, colors, shadow) {
  var slices = [];
  var center = { x: (size.width / 2), y: (size.height / 2) };
  var radius = (size.height / 2);
  var lastEndAngle = 0;
  sets.forEach(function(set, index, array) {
    var attributes = { fill: colors[index] };
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
    attributes.d = Utils.buildPathString(vectors);
    var path = Draw.path(attributes);
    // Events
    path.addEventListener('mousemove', function(evt) {
      application.Events.onMouseOverPie(evt, application, index, y1);
    });
    path.addEventListener('mouseout', function(evt) {
      application.Events.onMouseOut(evt, application);
    });
    slices.push(path);
  });
  // Compose
  var elements = []
  var group = Draw.group({}, slices);
  if(shadow) {
    var defs = Draw.defs();
    var shadow = Draw.shadow({opacity: 0.15}, 'pie-shadow', 8, group);
    Utils.appendChild(defs, shadow.def);
    elements.push(defs);
    elements.push(shadow.element);
  }
  elements.push(group);
  // Return
  return elements;
};

Render.prototype.doughnutSets = function(application, sets, size, colors, shadow) {
  // Basic calculation
  var center = { x: (size.width / 2), y: (size.height / 2) };
  var radius1 = (size.height / 2);
  var radius2 = radius1 - 40;
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
  // Compose
  var elements = [];
  var attributes = {
    d: Utils.buildPathString(vectors)
  };
  var doughnut = Draw.path(attributes);
  // Clip path
  var defs = Draw.defs();
  var clipPath = Draw.clipPath('doughnut-clip', doughnut);
  Utils.appendChild(defs, clipPath);
  var pie = this.pieSets(application, sets, size, colors, false)[0];
  Utils.setElementAttributes(pie, {clipPath: 'url(#doughnut-clip)'});
  var group = Draw.group({}, [pie]);
  // Shadow
  if(shadow) {
    var shadow = Draw.shadow({opacity: 0.15}, 'doughnut-shadow', 8, group);
    Utils.appendChild(defs, shadow.def);
    elements.push(shadow.element);
  }
  elements.push(defs);
  elements.push(pie);
  // Return
  return elements;
};

Render.prototype.dialSets = function(sets, percentage, size, colors, shadow) {
  // Basic Calculation
  var center = { x: (size.width / 2), y: (size.height / 2) };
  var radius = (size.height / 3.2);
  // Create dot
  var degree = (sets) - 220;
  var dotRadius = radius - 15;
  var cx = Utils.calculateAngleX(center.x, dotRadius, degree);
  var cy = Utils.calculateAngleY(center.y, dotRadius, degree);
  // Create dash
  var dashes = [];
  var dashRadius = radius + 15;
  var rotation = -150;
  for(var i = 0; i < 260; i += 20) {
    var opacity = ((i / 260) > percentage) ? 0.2 : 1.0;
    var x = Utils.calculateAngleX(center.x, dashRadius, i - rotation);
    var y = Utils.calculateAngleY(center.y, dashRadius, i - rotation);
    var dash = Draw.dash({
      transform: 'translate(' + x + ', ' + y + ') rotate(' + (i - 120) + ', 0, 0)',
      fill: colors[0],
      opacity: opacity
    });
    dashes.push(dash);
  }
  // Compose
  var elements = [];
  var group = Draw.group({}, dashes);
  var dial = Draw.circle({ cx: center.x, cy: center.y, r: radius, fill: colors[0] });
  var dot = Draw.circle({cx: cx, cy: cy, r: 5, fill: '#fff'});
  // Shadow
  if(shadow) {
    var defs = Draw.defs();
    var shadow = Draw.shadow({opacity: 0.15}, 'pie-shadow', 8, dial);
    Utils.appendChild(defs, shadow.def);
    elements.push(defs);
    elements.push(shadow.element);
  }
  elements.push(dial);
  elements.push(dot);
  elements.push(group);
  return elements;
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
  var pStyle = Utils.styleToString({ padding: '0', margin: '0' });
  var element = Draw.div({ id: id, style: divStyle });
  var p = Draw.p({ id: id + '-text', style: pStyle });
  Utils.appendChild(element, p);
  return element;
};

Render.prototype.graphLines = function(containerId, columnPositions, rowPositions, size) {
  var lines = [];

  // Vertical
  columnPositions.forEach(function(x, index) {
    var id = containerId + '-graph-line-vertical-' + index;
    var lineAttributes = {
      id: id,
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
