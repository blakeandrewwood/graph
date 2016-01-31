!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.Graph=e():t.Graph=e()}(this,function(){return function(t){function e(i){if(s[i])return s[i].exports;var n=s[i]={exports:{},id:i,loaded:!1};return t[i].call(n.exports,n,n.exports,e),n.loaded=!0,n.exports}var s={};return e.m=t,e.c=s,e.p="",e(0)}([function(t,e,s){"use strict";function i(t){n.validateConfig(t),this.settings={container:null,type:null,colors:[],orientation:null,strokeWidth:5,fontSize:12,fontFamily:"Open Sans",shadow:!1,showAxis:!0},this.data={axisLabels:{x:[],y:[]},seriesLabels:[],series:[]},this.positions={size:{x:0,y:0},padding:{x:0,y:0},axis:{x:[],y:[]},seriesLabels:[],series:[]},this.EventEmitter=new p(this),this.DOM=new a,this.render(t)}var n=s(1),a=s(2),o=(s(5),s(12)),r=s(13),l=s(14),c=s(16),h=s(17),p=s(8);i.prototype.setup=function(t){t.container&&(this.settings.container=t.container),t.type&&(this.settings.type=t.type),t.colors&&(this.settings.colors=t.colors),t.showAxis&&(this.settings.showAxis=t.showAxis),t.shadow&&(this.settings.shadow=t.shadow),t.orientation&&(this.settings.orientation=t.orientation),t.fontFamily&&(this.settings.fontFamily=t.fontFamily),t.fontSize&&(this.settings.fontSize=t.fontSize),t.strokeWidth&&(this.settings.strokeWidth=t.strokeWidth),t.padding&&(t.padding.x&&(this.positions.padding.x=t.padding.x),t.padding.y&&(this.positions.padding.y=t.padding.y)),t.width&&(this.positions.size.x=t.width),t.height&&(this.positions.size.y=t.height),t.series&&(this.data.series=t.series);var e=Math.getMinMax(this.data.series);switch(this.data.min=e.min,this.data.max=e.max,this.data.range=Math.getRange({min:this.data.min,max:this.data.max}),"bar"===this.settings.type&&"horizontal"===this.settings.orientation?(this.data.axisLabels.x=this.data.range,this.data.axisLabels.y=t.axisLabels):(this.data.axisLabels.x=t.axisLabels,this.data.axisLabels.y=this.data.range,this.data.axisLabels.y.reverse()),("bar"===this.settings.type||"line"===this.settings.type)&&(this.positions.axis.x=Math.calculateAxisXPositions({labels:this.data.axisLabels.x,width:this.positions.size.x}),this.positions.axis.y=Math.calculateAxisYPositions({type:this.settings.type,orientation:this.settings.orientation,strokeWidth:this.settings.strokeWidth,labels:this.data.axisLabels.y,height:this.positions.size.y})),this.positions.series=[],this.settings.type){case"bar":this.positions.series=o.calculate({settings:this.settings,data:this.data,positions:this.positions});break;case"line":this.positions.series=r.calculate({settings:this.settings,data:this.data,positions:this.positions});break;case"pie":this.positions.series=l.calculate({settings:this.settings,data:this.data,positions:this.positions});break;case"doughnut":this.positions.series=c.calculate({settings:this.settings,data:this.data,positions:this.positions});break;case"dial":this.positions.series=h.calculate({settings:this.settings,data:this.data,positions:this.positions})}t.seriesLabels&&(this.data.seriesLabels=t.seriesLabels)},i.prototype.render=function(t){switch(this.setup(t),this.DOM.createSvg(t,{width:this.positions.size.x+this.positions.padding.x,height:this.positions.size.y+this.positions.padding.y}),("line"===this.settings.type||"bar"===this.settings.type)&&(this.settings.showAxis&&this.DOM.createGrid({positions:this.positions}),this.DOM.createLabels({settings:this.settings,positions:this.positions,data:this.data})),"dial"!==this.settings.type&&this.DOM.createSeriesLabels({settings:this.settings,positions:this.positions,data:this.data}),"dial"===this.settings.type&&this.DOM.createPercentLabels({settings:this.settings,positions:this.positions,data:this.data}),this.settings.type){case"bar":this.DOM.createBars({positions:this.positions,data:this.data,settings:this.settings,EventEmitter:this.EventEmitter});break;case"line":this.DOM.createLine({positions:this.positions,data:this.data,settings:this.settings,EventEmitter:this.EventEmitter});break;case"pie":this.DOM.createPie({positions:this.positions,data:this.data,settings:this.settings,EventEmitter:this.EventEmitter});break;case"doughnut":this.DOM.createDoughnut({positions:this.positions,data:this.data,settings:this.settings,EventEmitter:this.EventEmitter});break;case"dial":this.DOM.createDial({positions:this.positions,data:this.data,settings:this.settings})}this.DOM.render({settings:this.settings,positions:this.positions})},i.prototype.update=function(t){this.render(t)},t.exports=i},function(t,e){"use strict";function s(){}s.validateConfig=function(t){if("string"!=typeof t.container)throw new Error("Container for chart has not been set.");if("number"!=typeof t.width)throw new Error("Width of chart has not been set.");if("number"!=typeof t.height)throw new Error("Height of chart has not been set.");if("number"!=typeof t.padding.x)throw new Error("Width padding of chart has not been set.");if("number"!=typeof t.padding.y)throw new Error("Height padding of chart has not been set.");switch(t.type){case"line":break;case"bar":switch(t.orientation){case"vertical":case"horizontal":break;default:throw new Error("Orientation has not been set.")}break;case"pie":break;case"doughnut":break;case"dial":break;default:throw new Error("Type of chart unknown.")}if("object"!=typeof t.colors)throw new Error("Chart colors have not been set.");if("object"!=typeof t.axisLabels)throw new Error("Axis labels have not been set.");if("object"!=typeof t.seriesLabels)throw new Error("Series labels have not been set.");if("object"!=typeof t.series)throw new Error("Series have not been set.")},t.exports=s},function(t,e,s){"use strict";function i(){this.container=null,this.elements={svg:null,tooltip:null,lineBulb:null,grid:[],axisLabels:[],seriesLabels:[],percentLabels:[],dataObjects:[],defs:[],groups:[]}}var n=s(3),a=s(4),o=(s(5),s(6)),r=s(9),l=s(10),c=s(11),h=s(12),p=s(13),u=s(14),d=s(16),f=s(17),g=s(18),m=s(7);i.prototype.resetAll=function(t){m.removeElements(this.elements.grid),m.removeElements(this.elements.axisLabels),m.removeElements(this.elements.dataObjects),m.removeElements(this.elements.groups)},i.prototype.createSvg=function(t,e){this.resetAll(),this.container=document.getElementById(t.container),this.elements.svg?a.setElementAttributes(this.elements.svg,e):(this.elements.svg=n.element("svg",e),a.appendChild(this.container,this.elements.svg),this.elements.tooltip=g.create(t).elements[0],this.elements.lineBulb=n.element("circle",{style:"pointer-events: none;"}),this.container.appendChild(this.elements.tooltip))},i.prototype.createGrid=function(t){var e=o.create(t);this.elements.defs=this.elements.defs.concat(e.defs),this.elements.grid=this.elements.grid.concat(e.elements)},i.prototype.createLabels=function(t){var e=r.create(t);this.elements.defs=this.elements.defs.concat(e.defs),this.elements.axisLabels.x=e.elements.x,this.elements.axisLabels.y=e.elements.y},i.prototype.createSeriesLabels=function(t){var e=l.create(t);this.elements.defs=this.elements.defs.concat(e.defs),this.elements.seriesLabels=e.elements},i.prototype.createPercentLabels=function(t){var e=c.create(t);this.elements.defs=this.elements.defs.concat(e.defs),this.elements.percentLabels=e.elements},i.prototype.createBars=function(t){var e=h.create(t);this.elements.defs=this.elements.defs.concat(e.defs),this.elements.dataObjects=this.elements.dataObjects.concat(e.elements)},i.prototype.createLine=function(t){var e=p.create(t);this.elements.defs=this.elements.defs.concat(e.defs),this.elements.dataObjects=this.elements.dataObjects.concat(e.elements)},i.prototype.createPie=function(t){var e=u.create(t);this.elements.defs=this.elements.defs.concat(e.defs),this.elements.dataObjects=this.elements.dataObjects.concat(e.elements)},i.prototype.createDoughnut=function(t){var e=d.create(t);this.elements.defs=this.elements.defs.concat(e.defs),this.elements.dataObjects=this.elements.dataObjects.concat(e.elements)},i.prototype.createDial=function(t){var e=f.create(t);this.elements.defs=this.elements.defs.concat(e.defs),this.elements.dataObjects=this.elements.dataObjects.concat(e.elements)},i.prototype.showLineBulb=function(t,e,s){a.setElementAttributes(this.elements.lineBulb,{cx:t.x,cy:t.y,r:s,fill:e})},i.prototype.hideLineBulb=function(){a.setElementAttributes(this.elements.lineBulb,{r:0})},i.prototype.renderGroups=function(t){var e=[];switch(t.settings.type){case"bar":case"line":var s=t.positions.padding.x-t.settings.fontSize-t.settings.strokeWidth,i=t.settings.fontSize,o=n.element("g",{transform:"translate("+s+", "+i+")"}),r=n.element("g",{transform:"translate("+s+", "+(+i+20)+")"}),l=n.element("g",{transform:"translate("+t.settings.fontSize+", "+i+")"});a.appendChildren(o,this.elements.grid),a.appendChildren(o,this.elements.dataObjects),a.appendChild(o,this.elements.lineBulb),a.appendChildren(r,this.elements.axisLabels.x),a.appendChildren(l,this.elements.axisLabels.y),a.appendChildren(r,this.elements.seriesLabels),e.push(o,r,l);break;case"pie":case"doughnut":var s=t.positions.padding.x/2,i=t.positions.padding.y/2,o=(t.positions.padding.x-t.settings.fontSize-t.settings.strokeWidth,t.settings.fontSize,n.element("g",{transform:"translate("+s+", "+i+")"})),r=n.element("g",{transform:"translate(0, "+(t.positions.size.y+t.positions.padding.y-t.settings.fontSize/2)+")"});a.appendChildren(o,this.elements.dataObjects),a.appendChildren(r,this.elements.seriesLabels),e.push(o,r);break;case"dial":var s=t.positions.padding.x/2,i=t.positions.padding.y/2,o=n.element("g",{transform:"translate("+s+", "+i+")"});a.appendChildren(o,this.elements.dataObjects),a.appendChildren(o,this.elements.percentLabels),e.push(o)}e.map(function(t){this.elements.groups.push(t)},this)},i.prototype.render=function(t){this.renderGroups(t),a.appendChildren(this.elements.svg,this.elements.defs),a.appendChildren(this.elements.svg,this.elements.groups),console.log(this.elements.svg)},t.exports=i},function(t,e,s){"use strict";function i(){}var n=s(4);i.element=function(t,e,s){var i=document.createElementNS("http://www.w3.org/2000/svg",t);return n.setElementAttributes(i,e,s),i},t.exports=i},function(t,e){"use strict";function s(){}s.setElementAttributes=function(t,e,s){for(var i in e){var n=i;s||(n=i.replace(/[A-Z]/g,function(t){return"-"+t.toLowerCase()})),t.setAttribute(n,e[i])}},s.styleToString=function(t){var e="";for(var s in t){var i=s.replace(/[A-Z]/g,function(t){return"-"+t.toLowerCase()});e+=i+":"+t[s]+";"}return e},s.getElementOffset=function(t){var e=t.getBoundingClientRect(),s=document.body,i=document.documentElement,n=window.pageYOffset||i.scrollTop||s.scrollTop,a=window.pageXOffset||i.scrollLeft||s.scrollLeft,o=i.clientTop||s.clientTop||Math.abs(s.getBoundingClientRect().top)||0,r=i.clientLeft||s.clientLeft||Math.abs(s.getBoundingClientRect().left)||0,l=e.top+n-o,c=e.left+a-r;return{top:Math.round(l),left:Math.round(c)}},s.appendChild=function(t,e){t.appendChild(e)},s.appendChildren=function(t,e){e.map(function(e){t.appendChild(e)})},s.buildPathString=function(t){var e="";return t.forEach(function(t,s,i){e+=t.type,t.values&&t.values.map(function(t){e+=t+" "})}),e.trim()},t.exports=s},function(t,e){"use strict";Math.getRange=function(t){for(var e=[],s=t.max/4,i=0,n=0;(n=i*s)<=t.max;i++)e.push(Math.floor(n));return e},Math.calculateAxisXPositions=function(t){var e=[];if(t.labels.length>1){var s=t.width/(t.labels.length-1);t.labels.forEach(function(t,i){e.push(Math.round(s*i))})}else e.push(Math.round(width/2));return e},Math.calculateAxisYPositions=function(t){var e=[];if(t.labels.length>1){var s=t.height/(t.labels.length-1);t.labels.forEach(function(i,n){var a;a="bar"===t.type&&"horizontal"===t.orientation?t.strokeWidth*n*2.5+t.strokeWidth*(t.labels.length-1):Math.round(s*n),e.push(a)})}else e.push(Math.round(height/2));return e},Math.flattenSet=function(t){var e=[];return t.map(function(t){t.map(function(t){"object"==typeof t?t.map(function(t){e.push(t)}):e.push(t)})}),e},Math.getMinMax=function(t){var e=this.flattenSet(t),s={min:Array.min(e),max:Array.max(e)};return s},Math.calculateY=function(t,e,s){var i=this.normalizeY(t,e,s);return this.reversePosY(i,0,s)},Math.calculateX=function(t,e,s){return this.normalizeX(t,e,s)},Math.normalizeY=function(t,e,s){return s/e*t},Math.normalizeX=function(t,e,s){return s/e*t},Math.reversePosY=function(t,e,s){return s+e-t},Math.reversePosX=function(t,e,s){return s+e-t},Array.max=function(t){return Math.max.apply(Math,t)},Array.min=function(t){return Math.min.apply(Math,t)},Math.sortByPointAsc=function(t,e){return t.dataPoint-e.dataPoint},Math.sortByPointDesc=function(t,e){return e.dataPoint-t.dataPoint},Math.calculateAngleX=function(t,e,s){return t+e*Math.cos(Math.PI*(s/180))},Math.calculateAngleY=function(t,e,s){return t+e*Math.sin(Math.PI*(s/180))},Math.getSetPercentages=function(t){var e=[],s=this.flattenSet(t),i=s.reduce(function(t,e){return t+e},0);return t.map(function(t){e.push(t[0]/i)}),e},Math.getPercentages=function(t){var e=[],s=this.flattenSet(t);return e.push(s[0]/s[1]),e},Math.getDegrees=function(t,e){var s=[];return t.map(function(t){s.push(t*e)}),s},t.exports=Math},function(t,e,s){"use strict";function i(){}var n=s(3),a=s(7);i.createX=function(t){var e=[];return t.axis.x.map(function(s){e.push({x1:s,y1:0,x2:s,y2:t.size.y,strokeDasharray:"5, 5",strokeWidth:"2",stroke:"#eee"})}),e},i.createY=function(t){var e=[];return t.axis.y.map(function(s){e.push({x1:0,y1:s,x2:t.size.x,y2:s,strokeDasharray:"5, 5",strokeWidth:"2",stroke:"#eee"})}),e},i.create=function(t){var e={x:this.createX(t.positions),y:this.createY(t.positions)},s={defs:[],elements:[]},i=[];return a.renderElements(e.x,i,"line",n.element),a.renderElements(e.y,i,"line",n.element),s.elements=i,s},t.exports=i},function(t,e,s){"use strict";function i(){}s(8);i.renderElements=function(t,e,s,i,n){t.length;t.forEach(function(t,a){var o=i(s,t);n&&(o.addEventListener("mousemove",function(t){n.mousemove(t)}),o.addEventListener("mouseout",function(t){n.mouseout(t)})),e.push(o)})},i.removeElements=function(t){t.map(function(t){t.remove()}),t.splice(0,t.length)},i.renderClipPath=function(t,e,s){this.removeElements(e);t.length;t.forEach(function(t,i){var n=s("defs",{}),a=s("clipPath",t.parent),o=s("path",t.child);a.appendChild(o),n.appendChild(a),e.push(n)})},t.exports=i},function(t,e,s){"use strict";function i(t){this.application=t}var n=s(4);s(3),s(7);i.prototype.getLineSet=function(t){return this.application.data.series[t]},i.prototype.getLinePointPosition=function(t,e){return{x:this.application.positions.axis.x[e],y:this.application.positions.series[t][e]}},i.prototype.showLineBulb=function(t,e){var s=1.1*this.application.settings.strokeWidth;this.application.DOM.showLineBulb(t,e,s)},i.prototype.hideLineBulb=function(t,e){this.application.DOM.hideLineBulb()},i.prototype.getTooltip=function(){return this.application.DOM.elements.tooltip},i.prototype.hideTooltip=function(t){var t=this.getTooltip(),e=n.styleToString({display:"none"});n.setElementAttributes(t,{style:e})},i.prototype.getSeriesLabel=function(t){return this.application.data.seriesLabels[t]},i.prototype.updateTooltip=function(t){var e=this.getTooltip(),s=n.styleToString({position:"absolute",left:t.x+"px",top:t.y+"px",background:t.color,padding:"0px 10px",pointerEvents:"none",fontSize:"12px",fontFamily:"Open Sans",color:"#fff"});n.setElementAttributes(e,{style:s}),e.children[0].innerHTML=t.text,e.children[1].innerHTML=t.seriesLabel?t.seriesLabel:""},i.prototype.getInfo=function(t){var e=n.getElementOffset(this.application.DOM.elements.svg),s=this.application.positions.padding.x-this.application.settings.fontSize-this.application.settings.strokeWidth,i=this.application.settings.fontSize,a=(this.application.positions.padding,t.clientX-(e.left-20)),o=t.clientY-(e.top-20),r=t.clientX-e.left-s,l=(t.clientY-e.top-i,this.application.data.axisLabels.x.length-1),c=r/(this.application.positions.size.x/l),h=Math.round(c);return{x:a,y:o,i:h}},i.prototype.mousemoveLine=function(t){var e=t.target,s=e.getAttribute("data-series-index"),i=e.getAttribute("data-color"),n=this.getInfo(t),a=this.getLineSet(s),o=a[n.i],r=this.getLinePointPosition(s,n.i);this.showLineBulb(r,i),this.updateTooltip({x:n.x,y:n.y,color:i,text:o,seriesLabel:this.getSeriesLabel(s)})},i.prototype.mouseoutLine=function(t){this.hideLineBulb()},i.prototype.mousemoveBar=function(t){var e,s=t.target,i=s.getAttribute("data-index-i"),n=s.getAttribute("data-index-k"),a=s.getAttribute("data-index-j"),o=s.getAttribute("data-color"),r=this.getInfo(t);e="object"==typeof this.application.data.series[i][a]?this.application.data.series[i][a][n]:this.application.data.series[i][a],this.updateTooltip({x:r.x,y:r.y,color:o,text:e,seriesLabel:this.getSeriesLabel(a)})},i.prototype.mousemovePie=function(t){var e=t.target,s=e.getAttribute("data-series-index"),i=e.getAttribute("data-color"),n=this.getInfo(t),a=this.application.data.series[s][0];this.updateTooltip({x:n.x,y:n.y,color:i,text:a,seriesLabel:this.getSeriesLabel(s)})},i.prototype.mousemove=function(t){switch(this.application.settings.type){case"line":this.mousemoveLine(t);break;case"bar":this.mousemoveBar(t);break;case"doughnut":case"pie":this.mousemovePie(t)}},i.prototype.mouseout=function(t){switch(this.hideTooltip(),this.application.settings.type){case"line":this.mouseoutLine(t)}},t.exports=i},function(t,e,s){"use strict";function i(){}var n=s(3),a=s(7),o=s(4);i.createX=function(t){var e=[];return t.data.axisLabels.x.forEach(function(s,i){e.push({x:t.positions.axis.x[i],y:t.positions.size.y+10,fill:"#888",fontSize:t.settings.fontSize,fontFamily:t.settings.fontFamily,textAnchor:"middle",dataText:"foo"})}),e},i.createY=function(t){var e=[];return t.data.axisLabels.y.forEach(function(s,i){e.push({x:0,y:t.positions.axis.y[i]+6,fill:"#888",fontSize:t.settings.fontSize,fontFamily:t.settings.fontFamily,textAnchor:"right",dataText:"foo"})}),e},i.create=function(t){var e={x:this.createX(t),y:this.createY(t)},s={defs:[],elements:[]},i=[];a.renderElements(e.x,i,"text",n.element),i.forEach(function(e,s){var i=t.data.axisLabels.x[s];o.appendChild(e,document.createTextNode(i))});var r=[];return a.renderElements(e.y,r,"text",n.element),r.forEach(function(e,s){var i=t.data.axisLabels.y[s];o.appendChild(e,document.createTextNode(i))}),s.elements={x:i,y:r},s},t.exports=i},function(t,e,s){"use strict";function i(){}var n=s(3),a=s(7),o=s(4);i.createSeries=function(t){var e=[];return t.data.seriesLabels.forEach(function(s,i){var n={fill:t.settings.colors[i],fontSize:t.settings.fontSize,fontFamily:t.settings.fontFamily};"pie"===t.settings.type||"doughnut"===t.settings.type?(n.x=0,n.dy=-20,n.textAnchor="start"):n.dx=10,e.push(n)}),e},i.create=function(t){var e=this.createSeries(t),s={defs:[],elements:[]},i=[];a.renderElements(e,i,"tspan",n.element);var r;switch(t.settings.type){case"doughnut":case"pie":r={x:0,y:0,textAnchor:"start"};break;case"line":case"bar":r={x:t.positions.size.x,y:t.positions.size.y+40,textAnchor:"end"}}var l=n.element("text",r);return i.forEach(function(e,s){var i=t.data.seriesLabels[s];o.appendChild(e,document.createTextNode(i)),o.appendChild(l,e)}),s.elements.push(l),s},t.exports=i},function(t,e,s){"use strict";function i(){}var n=s(3),a=(s(7),s(4)),o=s(5);i.create=function(t){var e={defs:[],elements:[]},s=n.element("text",{x:t.positions.size.x/2,y:t.positions.size.y,fill:"#888",fontSize:t.settings.fontSize,fontFamily:t.settings.fontFamily,textAnchor:"middle"}),i=t.data.series[0][0]+" / "+t.data.series[0][1];a.appendChild(s,document.createTextNode(i)),e.elements.push(s);var r=n.element("text",{x:t.positions.size.x/1.95,y:t.positions.size.y/1.8,fill:"#fff",fontSize:t.positions.size.y/8,fontFamily:t.settings.fontFamily,textAnchor:"middle"}),i=o.round(100*o.getPercentages(t.data.series))+"%";return a.appendChild(r,document.createTextNode(i)),e.elements.push(r),e},t.exports=i},function(t,e,s){"use strict";function i(){}var n=s(5),a=s(4),o=s(3),r=s(7);i.calculatePoint=function(t){var e;return t.point>0?(e="vertical"===t.orientation?n.round(n.calculateY(t.point,t.max,t.size.y)):n.round(n.calculateX(t.point,t.max,t.size.x)),t.point/t.max>.1&&(e+=t.strokeWidth/2)):e="vertical"===t.orientation?n.calculateY(0,t.max,t.size.y):n.calculateX(0,t.max,t.size.y),e},i.calculate=function(t){var e=[];return t.data.series.forEach(function(s,i){var n=[];s.forEach(function(e,s){if("number"==typeof e.length){var i=[];e.map(function(e){var s=this.calculatePoint({point:e,max:t.data.max,strokeWidth:t.settings.strokeWidth,size:t.positions.size,orientation:t.settings.orientation});i.push(s)},this),n.push(i)}else{var a=this.calculatePoint({point:e,max:t.data.max,strokeWidth:t.settings.strokeWidth,size:t.positions.size,orientation:t.settings.orientation});n.push(a)}},this),e.push(n)},this),e},i.createAttribute=function(t,e,s,i,o,r,l,c,h){if("vertical"===t.settings.orientation)var p=n.calculateY(0,t.data.max,t.positions.size.y),u=s,d=[{type:"M",values:[e,p]},{type:"",values:[e,u]}];else var p=n.calculateX(0,t.data.max,t.positions.size.x),u=s,d=[{type:"M",values:[p,e]},{type:"",values:[u,e]}];var f=a.buildPathString(d),g={d:f,stroke:l,strokeWidth:t.settings.strokeWidth,strokeLinecap:"round",dataPoint:u,dataIndexI:i,dataIndexJ:o,dataIndexK:r,dataColor:l};return g},i.calculateX=function(t,e,s,i,n){var a,o=t.settings.strokeWidth,r=-(o/4),l=(o+r)*(n-1)/2,c="vertical"===t.settings.orientation?t.positions.axis.x[e]:t.positions.axis.y[e];return a=c+i*(o+r)-l},i.create=function(t){var e=[],s=[];t.positions.series.forEach(function(i,a){var o=0;i.forEach(function(r,l){if("number"==typeof r.length){var c=[],h=[];r.forEach(function(e,s){var n=this.calculateX(t,a,!1,l,i.length),r=this.createAttribute(t,n,e,a,l,s,t.settings.colors[o],!0);c.push(r);var p;"vertical"===t.settings.orientation?p=n-t.settings.strokeWidth/3:(p=n,e+=t.settings.strokeWidth/3);var u=this.createAttribute(t,p,e,a,l,s,"rgba(0, 0, 0, 0.2)",!0);h.push(u),o++},this),"vertical"===t.settings.orientation?(c.sort(n.sortByPointAsc),h.sort(n.sortByPointAsc)):(c.sort(n.sortByPointDesc),h.sort(n.sortByPointDesc)),c.map(function(t){e.push(t)}),h.map(function(t){s.push(t)})}else{var p=this.calculateX(t,a,!1,l,i.length),u=this.createAttribute(t,p,r,a,l,null,t.settings.colors[o],!1,i.length);e.push(u);var d=p-t.settings.strokeWidth/3,f=this.createAttribute(t,d,r,a,l,null,"rgba(0, 0, 0, 0.3)",!1,i.length);s.push(f),o++}},this)},this);var i={defs:[],elements:[]},l=o.element("g",{}),c=[],h=[];r.renderElements(e,c,"path",o.element,t.EventEmitter),r.renderElements(s,h,"path",o.element);var p=[];return c.forEach(function(t,e){p.push(h[e]),p.push(t)}),a.appendChildren(l,p),i.elements.push(l),i},t.exports=i},function(t,e,s){"use strict";function i(){}var n=s(5),a=s(4),o=s(3),r=s(7);i.calculate=function(t){var e=[];return t.data.series.forEach(function(s,i){var a=[];s.forEach(function(e,s){var i=n.calculateY(e,t.data.max,t.positions.size.y);a.push(i)}),e.push(a)}),e},i.create=function(t){var e=[];t.positions.series.forEach(function(s,i){var n=[];s.forEach(function(e,s){var i={type:"",values:[]};0===s&&(i.type="M");var a=t.positions.axis.x[s];i.values.push(a,e),n.push(i)});var o=a.buildPathString(n),r=t.settings.colors[i],l={d:o,stroke:r,fill:"none",strokeWidth:t.settings.strokeWidth,strokeLinecap:"round",dataSeriesIndex:i,dataColor:r};e.push(l)},this);var s={defs:[],elements:[]},i=[];r.renderElements(e,i,"path",o.element,t.EventEmitter);var n=o.element("g",{});return a.appendChildren(n,i),s.elements.push(n),s},t.exports=i},function(t,e,s){"use strict";function i(){}var n=s(5),a=s(4),o=s(3),r=s(7),l=s(15);i.calculate=function(t){var e=n.getSetPercentages(t.data.series),s=n.getDegrees(e,360);return s},i.createSliceAttributes=function(t){var e=[],s={x:t.positions.size.x/2,y:t.positions.size.y/2},i=s.y,o=0,r=t.settings.colors;return t.positions.series.forEach(function(t,l){var c={fill:r[l],dataSeriesIndex:l,dataColor:r[l]},h=l>0?o:0,p=-90+h,u=0+p,d=t+p;o+=t;var f=180+p,g=n.calculateAngleX(s.x,i,u),m=n.calculateAngleY(s.y,i,u),y=[{type:"M",values:[s.x,s.y]},{type:"",values:[g,m]}],v=[];t>180&&v.push(f),v.push(d),v.map(function(t){var e=n.calculateAngleX(s.x,i,t),a=n.calculateAngleY(s.y,i,t);y.push({type:"A",values:[i,i,0,0,1]}),y.push({type:"",values:[e,a]})}),y.push({type:"Z"}),c.dataPoint=m,c.dataIndex=l,c.d=a.buildPathString(y),e.push(c)}),e},i.create=function(t){var e=this.createSliceAttributes(t),s={defs:[],elements:[]};s.defs=l.createShadow();var i=o.element("g",{filter:"url(#shadow)"}),n=[];return r.renderElements(e,n,"path",o.element,t.EventEmitter),a.appendChildren(i,n),s.elements.push(i),s},t.exports=i},function(t,e,s){"use strict";function i(){}var n=(s(5),s(4)),a=s(3);i.createClipPath=function(t){var e={parent:{id:"clip"},child:t};return e},i.createShadow=function(){var t=a.element("defs",{}),e=a.element("filter",{id:"shadow",height:"180%"}),s=a.element("feGaussianBlur",{"in":"SourceAlpha",stdDeviation:"12"},!0),i=a.element("feOffset",{dx:"0",dy:"0",result:"offsetBlur"},!0),o=a.element("feComponentTransfer",{}),r=a.element("feFuncA",{type:"linear",slope:"0.3"}),l=a.element("feMerge",{}),c=a.element("feMergeNode",{}),h=a.element("feMergeNode",{"in":"SourceGraphic"});return n.appendChild(t,e),n.appendChild(e,s),n.appendChild(e,i),n.appendChild(e,o),n.appendChild(o,r),n.appendChild(e,l),n.appendChild(l,c),n.appendChild(l,h),t},t.exports=i},function(t,e,s){"use strict";function i(){}var n=s(14),a=s(5),o=s(4),r=s(3),l=s(7),c=s(15);i.calculate=function(t){var e=a.getSetPercentages(t.data.series),s=a.getDegrees(e,360);return s},i.createShape=function(t){var e={x:t.positions.size.x/2,y:t.positions.size.y/2},s=e.y,i=s-a.floor(t.positions.size.y/3.8),n=a.calculateAngleX(e.x,s,0),r=a.calculateAngleY(e.y,s,0),l=a.calculateAngleX(e.x,s,180),c=a.calculateAngleY(e.y,s,180),h=a.calculateAngleX(e.x,i,0),p=a.calculateAngleY(e.y,i,0),u=a.calculateAngleX(e.x,i,180),d=a.calculateAngleY(e.y,i,180),f=[{type:"M",values:[n,r]},{type:"A",values:[s,s,0,0,1]},{type:"",values:[l,c]},{type:"A",values:[s,s,0,0,1]},{type:"",values:[n,r]},{type:"Z"},{type:"M",values:[h,p]},{type:"A",values:[i,i,0,0,0]},{type:"",values:[u,d]},{type:"A",values:[i,i,0,0,0]},{type:"",values:[h,p]},{type:"Z"}],g=o.buildPathString(f),m={d:g};return m},i.create=function(t){var e=this.createShape(t),s=[c.createClipPath(e)],i={defs:[],elements:[]};l.renderClipPath(s,i.defs,r.element);var a=n.create(t),h=r.element("g",{clipPath:"url(#clip)"});o.appendChildren(h,a.elements),i.defs=i.defs.concat(a.defs);var p=r.element("g",{filter:"url(#shadow)"});return o.appendChild(p,h),i.elements.push(p),i},t.exports=i},function(t,e,s){"use strict";function i(){}var n=s(5),a=s(4),o=s(3),r=s(7),l=s(15);i.calculate=function(t){var e=n.getPercentages(t.data.series),s=n.getDegrees(e,260);return s},i.createDialAttribute=function(t){var e=n.calculateAngleX(t.center.x,t.radius,0),s=n.calculateAngleY(t.center.y,t.radius,0),i=n.calculateAngleX(t.center.x,t.radius,180),o=n.calculateAngleY(t.center.y,t.radius,180),r=n.calculateAngleX(t.center.x,t.radius,0),l=n.calculateAngleY(t.center.y,t.radius,0),c=[{type:"M",values:[t.center.x,t.center.y]},{type:"",values:[e,s]},{type:"A",values:[t.radius,t.radius,0,0,1]},{type:"",values:[i,o]},{type:"A",values:[t.radius,t.radius,0,0,1]},{type:"",values:[r,l]},{type:"Z",values:[]}],h={d:a.buildPathString(c),fill:t.color};return h},i.createDashAttributes=function(t){for(var e=t.radius+15,s=[],i=0;260>i;i+=20){var o=i/260>=t.percentage?.2:1,r=n.calculateAngleX(t.center.x,e,i-t.rotation),l=n.calculateAngleY(t.center.y,e,i-t.rotation),c={transform:"translate("+r+", "+l+") rotate("+(i-120)+", 0, 0)",fill:t.color,opacity:o},h=t.radius/50,p=[{type:"M",values:[0*h,0*h]},{type:"",values:[-2.6*h,0*h]},{type:"",values:[-3.8*h,-20*h]},{type:"",values:[3.8*h,-20*h]},{type:"",values:[2.6*h,0*h]},{type:"Z"}];c.d=a.buildPathString(p),s.push(c)}return s},i.createDotAttributes=function(t){var e=t.radius/8,s=t.radius-2.5*e,i=t.degree-220,a={x:n.calculateAngleX(t.center.x,s,i),y:n.calculateAngleY(t.center.y,s,i)},o=this.createDialAttribute({center:a,radius:e,color:t.color});return o},i.create=function(t){var e={x:t.positions.size.x/2,y:t.positions.size.y/2},s=t.positions.size.y/3.2,i=-150,c=n.getPercentages(t.data.series),h=this.createDashAttributes({center:e,rotation:i,radius:s,percentage:c,color:t.settings.colors[0]}),p=this.createDialAttribute({center:e,radius:s,color:t.settings.colors[0]}),u=this.createDotAttributes({center:e,radius:s,degree:t.positions.series[0],color:"#fff"}),d={defs:[],elements:[]};d.defs=l.createShadow();var f=[];r.renderElements([p],f,"path",o.element);var g=[];r.renderElements(h,g,"path",o.element);var m=[];r.renderElements([u],m,"path",o.element);var y=o.element("g",{filter:"url(#shadow)"});return a.appendChildren(y,f),a.appendChildren(y,g),a.appendChildren(y,m),d.elements.push(y),d},t.exports=i},function(t,e,s){"use strict";function i(){}var n=s(4);s(3),s(7);i.create=function(t){var e={defs:[],elements:[]},s=document.createElement("div"),i=n.styleToString({position:"absolute",left:0,right:0,padding:"10px"});n.setElementAttributes(s,{style:i});var a=document.createElement("p"),o=document.createElement("p");return s.appendChild(a),s.appendChild(o),e.elements.push(s),e},t.exports=i}])});