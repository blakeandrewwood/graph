!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.Graph=e():t.Graph=e()}(this,function(){return function(t){function e(o){if(i[o])return i[o].exports;var n=i[o]={exports:{},id:o,loaded:!1};return t[o].call(n.exports,n,n.exports,e),n.loaded=!0,n.exports}var i={};return e.m=t,e.c=i,e.p="",e(0)}([function(t,e,i){"use strict";function o(t){this.application=t,this.type="line",this.size={width:400,height:400},this.range={min:0,max:0},this.points=[],this.labels={row:[],column:[],positions:{row:[],column:[]},increment:10,prefix:"",suffix:""},this.font={family:"monospace",size:12},this.percentages=[],this.colors=["#2388F2","#F65237","#0DEFA5","#9B7CF3"],this.horizontal=!1,this.shadow=!0,this.prefix="",this.containerId,this.container,this.svg,this.Events=new a}var n=i(1),s=i(2),r=i(3),a=i(4),l=function(t){return window[t]=new o(t),window[t]};o.prototype.makeLineBarCalculations=function(){this.range=n.getMinMax(this.points),this.labels.row=n.getPointIncrements(this.range.max,this.labels.increment)},o.prototype.makePieDoughnutCalculations=function(){this.range=n.getMinMax(this.points),this.percentages=n.getSetPercentages(this.points),this.degrees=n.getDegrees(this.percentages,360)},o.prototype.makeDialCalculations=function(){this.range=n.getMinMax(this.points),this.percentages=n.getPercentages(this.points),this.degrees=n.getDegrees(this.percentages,260)},o.prototype.lineBuildSvg=function(){this.makeLineBarCalculations(),this.labels.positions.row=n.calculateRowPositions(this.labels.row,this.size.height),this.labels.positions.column=n.calculateColumnPositions(this.labels.column,this.size.width);var t=r.graphLines(this.labels,this.size),e=r.columnLabelText(this.labels,this.labels.column,this.font,this.size),i=r.rowLabelText(this.labels,this.labels.row,this.font,this.size),o=r.lineSets(this,this.labels.positions.column,this.labels.row[0],this.points,this.range,this.size,this.colors),a=[],l=s.group({transform:"translate("+this.widthOffset/2+","+this.heightOffset/2+")"},t),h=s.group({transform:"translate("+this.widthOffset/2+","+this.heightOffset/2+")"},o),p=s.group({transform:"translate("+this.widthOffset/2+","+this.heightOffset+")"},e),u=s.group({transform:"translate(0,"+this.heightOffset/2+")"},i);a.push(l),a.push(h),a.push(p),a.push(u);var c=s.group({},a);this.svg=r.svg(this.container,this.font.size,this.size,this.padding),n.appendChild(this.svg,c)},o.prototype.barBuildSvg=function(){this.makeLineBarCalculations();var t=this.labels.column,e=this.labels.row;this.horizontal&&(t=this.labels.row,e=this.labels.column,this.labels.row.reverse()),this.labels.positions.column=n.calculateColumnPositions(t,this.size.width),this.labels.positions.row=n.calculateRowPositions(e,this.size.height);var i=r.graphLines(this.labels,this.size),o=r.columnLabelText(this.labels,t,this.font,this.size),a=r.rowLabelText(this.labels,e,this.font,this.size),l=r.barSets(this,this.labels,this.points,this.size,this.horizontal,this.colors,this.shadow),h=[],p=s.group({transform:"translate("+this.widthOffset/2+","+this.heightOffset/2+")"},i),u=s.group({transform:"translate("+this.widthOffset/2+","+this.heightOffset/2+")"},l),c=s.group({transform:"translate("+this.widthOffset/2+","+this.heightOffset+")"},o),f=s.group({transform:"translate(0,"+this.heightOffset/2+")"},a);h.push(p),h.push(u),h.push(c),h.push(f);var d=s.group({},h);this.svg=r.svg(this.container,this.font.size,this.size,this.padding),n.appendChild(this.svg,d)},o.prototype.pieBuildSvg=function(){this.makePieDoughnutCalculations();var t=r.bottomLeftLabelText(this.labels.column,this.font,this.size,this.colors),e=r.pieSets(this,this.degrees,this.size,this.colors,this.shadow),i=[],o=s.group({transform:"translate(0,"+this.heightOffset+")"},t),a=s.group({transform:"translate("+this.widthOffset/2+","+this.heightOffset/2+")"},e);i.push(o),i.push(a);var l=s.group({},i);this.svg=r.svg(this.container,this.font.size,this.size,this.padding),n.appendChild(this.svg,l)},o.prototype.doughnutBuildSvg=function(){this.makePieDoughnutCalculations();var t=r.bottomLeftLabelText(this.labels.column,this.font,this.size,this.colors),e=r.centerLabelText("50",this.font,this.size,"#000"),i=r.doughnutSets(this,this.degrees,this.size,this.colors,this.shadow),o=[],a=s.group({transform:"translate(0,"+this.heightOffset+")"},t),l=s.group({transform:"translate("+this.widthOffset/2+","+this.heightOffset/2+")"},i),h=s.group({transform:"translate("+this.widthOffset/2+","+this.heightOffset/2+")"},e);o.push(a),o.push(l),o.push(h);var p=s.group({},o);this.svg=r.svg(o,this.font.size,this.size,this.padding),n.appendChild(this.svg,p)},o.prototype.dialBuildSvg=function(){this.makeDialCalculations();var t=r.centerLabelText(100*this.percentages[0],this.font,this.size,"#fff"),e=r.bottomCenterLabelText(this.points[0][0]+"/"+this.points[0][1],this.font,this.size,"#000"),i=r.dialSets(this.degrees,this.percentages,this.size,this.colors,this.shadow),o=[],a=s.group({transform:"translate("+this.widthOffset/2+","+this.heightOffset/2+")"},i),l=s.group({transform:"translate("+this.widthOffset/2+","+this.heightOffset/2+")"},t),h=s.group({transform:"translate("+this.widthOffset/2+","+this.heightOffset+")"},e);o.push(a),o.push(l),o.push(h);var p=s.group({},o);this.svg=r.svg(o,this.font.size,this.size,this.padding),n.appendChild(this.svg,p)},o.prototype.render=function(){switch(this.padding={x:100,y:60},this.widthOffset=this.font.size/2+this.padding.x,this.heightOffset=this.font.size/2+this.padding.y,this.type){case"line":this.lineBuildSvg();break;case"bar":this.barBuildSvg();break;case"pie":this.pieBuildSvg();break;case"doughnut":this.doughnutBuildSvg();break;case"dial":this.dialBuildSvg()}n.appendChild(this.container,this.svg)},o.prototype.setContainer=function(t){this.containerId=t,this.container=document.getElementById(t)},o.prototype.setType=function(t){this.type=t},o.prototype.setSize=function(t,e){this.size.width=t,this.size.height=e},o.prototype.setLabels=function(t){this.labels.column=t},o.prototype.setPoints=function(t){this.points=t},o.prototype.setIncrement=function(t){this.labels.increment=t},o.prototype.setHorizontal=function(t){this.horizontal=t},o.prototype.setShadow=function(t){this.shadow=t},o.prototype.setColors=function(t){this.colors=t},o.prototype.setPrefix=function(t){this.labels.prefix=t},o.prototype.setSuffix=function(t){this.labels.suffix=t},o.prototype.setFontFamily=function(t){this.font.family=t},o.prototype.setFontSize=function(t){this.font.size=t},t.exports=l},function(t,e){"use strict";function i(){}i.prototype.setElementAttributes=function(t,e){for(var i in e){var o=i.replace(/[A-Z]/g,function(t){return"-"+t.toLowerCase()});t.setAttribute(o,e[i])}},i.prototype.styleToString=function(t){var e="";for(var i in t){var o=i.replace(/[A-Z]/g,function(t){return"-"+t.toLowerCase()});e+=o+":"+t[i]+";"}return e},i.prototype.appendChild=function(t,e){t.appendChild(e)},i.prototype.appendChildren=function(t,e){e.map(function(e){t.appendChild(e)})},i.prototype.setDivPosition=function(t,e,i){t.style.position="absolute",t.style.left=e+"px",t.style.top=i+"px"},i.prototype.getElementOffset=function(t){var e=t.getBoundingClientRect(),i=document.body,o=document.documentElement,n=window.pageYOffset||o.scrollTop||i.scrollTop,s=window.pageXOffset||o.scrollLeft||i.scrollLeft,r=o.clientTop||i.clientTop||Math.abs(i.getBoundingClientRect().top)||0,a=o.clientLeft||i.clientLeft||Math.abs(i.getBoundingClientRect().left)||0,l=e.top+n-r,h=e.left+s-a;return{top:Math.round(l),left:Math.round(h)}},i.prototype.showElement=function(t){t.style.display="block"},i.prototype.hideElement=function(t){t.style.display="none"},i.prototype.buildPathString=function(t){var e="";return t.forEach(function(t,i,o){e+=t.type,t.values&&t.values.map(function(t){e+=t+" "})}),e.trim()},i.prototype.flattenPoints=function(t){var e=[];return t.map(function(t){t.map(function(t){"object"==typeof t?t.map(function(t){e.push(t)}):e.push(t)})}),e},i.prototype.getPointIncrements=function(t,e){for(var i=Math.ceil(t/e)+1,o=[],n=0;i>n;n++)o.push(n*e);return o.reverse(),o},i.prototype.getSetPercentages=function(t){var e=[],i=this.flattenPoints(t),o=i.reduce(function(t,e){return t+e},0);return t.map(function(t){e.push(t[0]/o)}),e},i.prototype.getPercentages=function(t){var e=[],i=this.flattenPoints(t);return e.push(i[0]/i[1]),e},i.prototype.getDegrees=function(t,e){var i=[];return t.map(function(t){i.push(t*e)}),i},i.prototype.getMinMax=function(t){var e={},i=this.flattenPoints(t);return e.min=Array.min(i),e.max=Array.max(i),e},i.prototype.calculateColumnPositions=function(t,e){var i=[],o=e/(t.length-1);return t.forEach(function(t,e,n){var s=Math.round(o*e);i.push(s)}),i},i.prototype.calculateRowPositions=function(t,e){var i=[],o=e/(t.length-1);return t.forEach(function(t,e,n){var s=Math.round(o*e);i.push(s)},this),i},i.prototype.calculateY=function(t,e,i){var o=this.normalizeY(t,e,i);return this.reversePosY(o,0,i)},i.prototype.calculateX=function(t,e,i){return this.normalizeX(t,e,i)},i.prototype.normalizeY=function(t,e,i){return i/e*t},i.prototype.normalizeX=function(t,e,i){return i/e*t},i.prototype.reversePosY=function(t,e,i){return i+e-t},i.prototype.reversePosX=function(t,e,i){return i+e-t},i.prototype.calculateAngleX=function(t,e,i){return t+e*Math.cos(Math.PI*(i/180))},i.prototype.calculateAngleY=function(t,e,i){return t+e*Math.sin(Math.PI*(i/180))},i.prototype.sortDesc=function(t,e){return e-t},Array.max=function(t){return Math.max.apply(Math,t)},Array.min=function(t){return Math.min.apply(Math,t)},t.exports=new i},function(t,e,i){"use strict";function o(){}var n=i(1);o.prototype.text=function(t){var e=document.createElementNS("http://www.w3.org/2000/svg","text");return n.setElementAttributes(e,t),e},o.prototype.line=function(t){var e=document.createElementNS("http://www.w3.org/2000/svg","line");return n.setElementAttributes(e,t),e},o.prototype.circle=function(t){var e=document.createElementNS("http://www.w3.org/2000/svg","circle");return n.setElementAttributes(e,t),e},o.prototype.rect=function(t){var e=document.createElementNS("http://www.w3.org/2000/svg","rect");return n.setElementAttributes(e,t),e},o.prototype.path=function(t){var e=document.createElementNS("http://www.w3.org/2000/svg","path");return n.setElementAttributes(e,t),e},o.prototype.svg=function(t){var e=document.createElementNS("http://www.w3.org/2000/svg","svg");return n.setElementAttributes(e,t),e},o.prototype.group=function(t,e){var i=document.createElementNS("http://www.w3.org/2000/svg","g");return n.setElementAttributes(i,t),n.appendChildren(i,e),i},o.prototype.div=function(t){var e=document.createElement("div");return n.setElementAttributes(e,t),e},o.prototype.p=function(t){var e=document.createElement("p");return n.setElementAttributes(e,t),e},o.prototype.dash=function(t){var e=[{type:"M",values:[0,0]},{type:"",values:[-2.6,0]},{type:"",values:[-3.8,-20]},{type:"",values:[3.8,-20]},{type:"",values:[2.6,0]},{type:"Z"}];t.d=n.buildPathString(e);var i=this.path(t);return i},o.prototype.shadow=function(t,e,i,o){var s={def:null,element:null};s.def=this.filterShadow(e,i);var r=o.cloneNode(!0);return t.filter="url(#"+e+")",n.setElementAttributes(r,t),s.element=r,s},o.prototype.defs=function(){var t=document.createElementNS("http://www.w3.org/2000/svg","defs");return t},o.prototype.clipPath=function(t,e){var i=document.createElementNS("http://www.w3.org/2000/svg","clipPath");return n.setElementAttributes(i,{id:t}),n.appendChild(i,e),i},o.prototype.filterShadow=function(t,e){var i=document.createElementNS("http://www.w3.org/2000/svg","filter"),o=document.createElementNS("http://www.w3.org/2000/svg","feGaussianBlur"),s=document.createElementNS("http://www.w3.org/2000/svg","feBlend");return n.setElementAttributes(i,{id:t,width:"200%",height:"200%"}),n.setElementAttributes(o,{"in":"SourceAlpha",result:"blurOut"}),o.setAttribute("stdDeviation",e),n.setElementAttributes(s,{"in":"blurOut",mode:"normal"}),n.appendChild(i,o),n.appendChild(i,s),i},t.exports=new o},function(t,e,i){"use strict";function o(){}var n=i(1),s=i(2);o.prototype.columnLabelText=function(t,e,i,o){var n=[];return e.forEach(function(e,r,a){var l=t.positions.column[r],h=s.text({x:l,y:o.height-i.size/2,fill:"#888",fontSize:i.size,fontFamily:i.family,textAnchor:"middle"}),p=document.createTextNode(e);h.appendChild(p),n.push(h)}),n},o.prototype.rowLabelText=function(t,e,i,o){var n=[];return e.forEach(function(e,o,r){var a=t.positions.row[o]+i.size/2,l=s.text({x:0,y:a,fill:"#888",fontSize:i.size,fontFamily:i.family,textAnchor:"right"}),h=document.createTextNode(e);l.appendChild(h),n.push(l)}),n},o.prototype.bottomLeftLabelText=function(t,e,i,o){var r=[];return t.forEach(function(a,l,h){var p=1.4*e.size,u=t.length-1,c=p*u-p*l,f=n.reversePosY(c,0,i.height),d=s.text({x:0,y:f,fill:o[l],fontSize:e.size,fontFamily:e.family,textAnchor:"right"}),g=document.createTextNode(a);d.appendChild(g),r.push(d)}),r},o.prototype.bottomCenterLabelText=function(t,e,i,o){var r=[],a=i.width/2,l=n.reversePosY(0,0,i.height),h=s.text({x:a,y:l,fill:o,fontSize:e.size,fontFamily:e.family,textAnchor:"middle"}),t=document.createTextNode(t);return h.appendChild(t),r},o.prototype.centerLabelText=function(t,e,i,o){var n=[],r=i.width/2,a=e.size/2+i.height/2,l=s.text({x:r,y:a,fill:o,fontSize:e.size,fontFamily:e.family,textAnchor:"middle"}),t=document.createTextNode(t);return l.appendChild(t),n},o.prototype.lineSets=function(t,e,i,o,r,a,l){var h=[];return o.forEach(function(o,r,p){var u=[];o.forEach(function(t,o,s){var r=o>0?"":"M";u.push({type:r,values:[e[o],n.calculateY(t,i,a.height)]})});var c=n.buildPathString(u),f=s.path({d:c,stroke:l[r],strokeWidth:8,strokeLinecap:"round",fill:"none"});f.addEventListener("mousemove",function(e){t.Events.onMouseOverLine(e,t,r,i)}),f.addEventListener("mouseout",function(e){t.Events.onMouseOut(e,t)}),h.push(f)}),h},o.prototype.barSets=function(t,e,i,o,r,a,l){var h=[];return i.forEach(function(i,p,u){var c=0;i.sort(n.sortDesc),i.forEach(function(u,f,d){var g,v=16,m=-(v/4),y=(v+m)*(i.length-1)/2,w=-(v/3),b={fill:"transparent",stroke:a[c],strokeWidth:v,strokeLinecap:"round"},x={opacity:"0.15",fill:"transparent",stroke:"#000",strokeWidth:v,strokeLinecap:"round"};if("number"==typeof u){var E=[];if(r){x.transform="translate("+-w+", 0)",g=e.row[e.row.length-1];var S=e.positions.row[p]+f*(v+m)-y;E.push({type:"M",values:[n.calculateX(0,g,o.width),S]}),E.push({type:"",values:[n.calculateX(u,g,o.width)-v/2,S]})}else{x.transform="translate("+w+", 0)",g=e.row[0];var z=e.positions.column[p]+f*(v+m)-y;E.push({type:"M",values:[z,n.calculateY(0,g,o.height)]}),E.push({type:"",values:[z,n.calculateY(u,g,o.height)+v/2]})}var A=n.buildPathString(E);if(l){x.d=A;var O=s.path(x,E);h.push(O)}b.d=A;var M=s.path(b,E);h.push(M),M.addEventListener("mousemove",function(e){t.Events.onMouseOverBar(e,t,0,u)}),M.addEventListener("mouseout",function(e){t.Events.onMouseOut(e,t)}),c++}else"object"==typeof u&&(u.sort(n.sortDesc),u.forEach(function(i,u,d){b.stroke=a[c];var E=[];if(r){x.transform="translate("+-w+", 0)",g=e.row[e.row.length-1];var S=e.positions.row[p]+f*(v+m)-y;E.push({type:"M",values:[n.calculateX(0,g,o.width),S]}),E.push({type:"",values:[n.calculateX(i,g,o.width)-v/2,S]})}else{x.transform="translate("+w+", 0)",g=e.row[0];var z=e.positions.column[p]+f*(v+m)-y;E.push({type:"M",values:[z,n.calculateY(0,g,o.height)]}),E.push({type:"",values:[z,n.calculateY(i,g,o.height)+v/2]})}var A=n.buildPathString(E);if(l){x.d=A;var O=s.path(x,E);h.push(O)}b.d=A;var M=s.path(b,E);h.push(M),M.addEventListener("mousemove",function(e){t.Events.onMouseOverBar(e,t,0,i)}),M.addEventListener("mouseout",function(e){t.Events.onMouseOut(e,t)}),c++}))})}),h},o.prototype.pieSets=function(t,e,i,o,r){var a=[],l={x:i.width/2,y:i.height/2},h=i.height/2,p=0;e.forEach(function(e,i,r){var u={fill:o[i]},c=i>0?p:0,f=-90+c,d=0+f,g=e+f;p+=e;var v=180+f,m=n.calculateAngleX(l.x,h,d),y=n.calculateAngleY(l.y,h,d),w=[{type:"M",values:[l.x,l.y]},{type:"",values:[m,y]}],b=[];e>180&&b.push(v),b.push(g),b.map(function(t){var e=n.calculateAngleX(l.x,h,t),i=n.calculateAngleY(l.y,h,t);w.push({type:"A",values:[h,h,0,0,1]}),w.push({type:"",values:[e,i]})}),w.push({type:"Z"}),u.d=n.buildPathString(w);var x=s.path(u);x.addEventListener("mousemove",function(e){t.Events.onMouseOverPie(e,t,i,y)}),x.addEventListener("mouseout",function(e){t.Events.onMouseOut(e,t)}),a.push(x)});var u=[],c=s.group({},a);if(r){var f=s.defs(),r=s.shadow({opacity:.15},"pie-shadow",8,c);n.appendChild(f,r.def),u.push(f),u.push(r.element)}return u.push(c),u},o.prototype.doughnutSets=function(t,e,i,o,r){var a={x:i.width/2,y:i.height/2},l=i.height/2,h=l-40,p=n.calculateAngleX(a.x,l,0),u=n.calculateAngleY(a.y,l,0),c=n.calculateAngleX(a.x,l,180),f=n.calculateAngleY(a.y,l,180),d=n.calculateAngleX(a.x,h,0),g=n.calculateAngleY(a.y,h,0),v=n.calculateAngleX(a.x,h,180),m=n.calculateAngleY(a.y,h,180),y=[{type:"M",values:[p,u]},{type:"A",values:[l,l,0,0,1]},{type:"",values:[c,f]},{type:"A",values:[l,l,0,0,1]},{type:"",values:[p,u]},{type:"Z"},{type:"M",values:[d,g]},{type:"A",values:[h,h,0,0,0]},{type:"",values:[v,m]},{type:"A",values:[h,h,0,0,0]},{type:"",values:[d,g]},{type:"Z"}],w=[],b={d:n.buildPathString(y)},x=s.path(b),E=s.defs(),S=s.clipPath("doughnut-clip",x);n.appendChild(E,S);var z=this.pieSets(t,e,i,o,!1)[0];n.setElementAttributes(z,{clipPath:"url(#doughnut-clip)"});var A=s.group({},[z]);if(r){var r=s.shadow({opacity:.15},"doughnut-shadow",8,A);n.appendChild(E,r.def),w.push(r.element)}return w.push(E),w.push(z),w},o.prototype.dialSets=function(t,e,i,o,r){for(var a={x:i.width/2,y:i.height/2},l=i.height/3.2,h=t-220,p=l-15,u=n.calculateAngleX(a.x,p,h),c=n.calculateAngleY(a.y,p,h),f=[],d=l+15,g=-150,v=0;260>v;v+=20){var m=v/260>e?.2:1,y=n.calculateAngleX(a.x,d,v-g),w=n.calculateAngleY(a.y,d,v-g),b=s.dash({transform:"translate("+y+", "+w+") rotate("+(v-120)+", 0, 0)",fill:o[0],opacity:m});f.push(b)}var x=[],E=s.group({},f),S=s.circle({cx:a.x,cy:a.y,r:l,fill:o[0]}),z=s.circle({cx:u,cy:c,r:5,fill:"#fff"});if(r){var A=s.defs(),r=s.shadow({opacity:.15},"pie-shadow",8,S);n.appendChild(A,r.def),x.push(A),x.push(r.element)}return x.push(S),x.push(z),x.push(E),x},o.prototype.tooltip=function(t,e){var i=n.styleToString({position:"absolute",padding:"10px 20px",margin:"none",color:"#fff",fontSize:"16px",fontFamily:e,boxShadow:"4px 4px 0 rgba(0, 0, 0, 0.2)"}),o=n.styleToString({padding:"0",margin:"0"}),r=s.div({id:t,style:i}),a=s.p({id:t+"-text",style:o});return n.appendChild(r,a),r},o.prototype.graphLines=function(t,e){var i=[];return t.positions.column.map(function(t){var o=s.line({x1:t,y1:0,x2:t,y2:e.height,stroke:"#ccc",strokeDasharray:"5, 5"});i.push(o)}),t.positions.row.map(function(t){var o=s.line({x1:0,y1:t,x2:e.width,y2:t,stroke:"#ccc",strokeDasharray:"5, 5"});i.push(o)}),i},o.prototype.svg=function(t,e,i,o){var n=e/2+o.x,r=e/2+o.y,a=i.width+n,l=i.height+r,h={xmlns:"http://www.w3.org/2000/svg",version:"1.1",width:a,height:l},p=s.svg(h);return p},t.exports=new o},function(t,e,i){"use strict";function o(){}var n=(i(2),i(3)),s=i(1);o.prototype.getSvg=function(t,e){var i=document.getElementById(t),o=i.getElementsByTagName("svg")[0],n=t+"-tooltip",s=document.getElementById(n),r=document.getElementById(n+"-text");s||this.createTooltip(i,n,e);var a={container:i,svg:o,tooltipId:n,tooltip:s,tooltipText:r};return a},o.prototype.onMouseOverLine=function(t,e,i,o){var n=this.getSvg(e.containerId,e.font.family),r=e.colors[i],a=s.getElementOffset(n.container),l=s.getElementOffset(n.svg),h=e.padding,p=t.clientX-a.left,u=t.clientY-a.top,c=t.clientX-l.left-h.x/2,f=(t.clientY-l.top-h.y/2,e.labels.positions.column.length-1),d=c/(e.size.width/f),g=Math.floor(d),v=[e.points[i][g],e.points[i][g+1]],m=Math.floor((v[1]-v[0])*(d%1)+v[0]),y=e.labels.prefix+m.toString()+e.labels.suffix;isNaN(m)||this.updateTooltip(n,p,u,r,y)},o.prototype.onMouseOverBar=function(t,e,i,o){var n=this.getSvg(e.containerId,e.font.family),r=e.colors[i],a=s.getElementOffset(n.container),l=(s.getElementOffset(n.svg),t.clientX-a.left),h=t.clientY-a.top,p=o,u=e.labels.prefix+p.toString()+e.labels.suffix;isNaN(p)||this.updateTooltip(n,l,h,r,u)},o.prototype.onMouseOverPie=function(t,e,i){var o=this.getSvg(e.containerId,e.font.family),n=e.colors[i],r=s.getElementOffset(o.container),a=(s.getElementOffset(o.svg),t.clientX-r.left),l=t.clientY-r.top,h=e.points[i],p=e.labels.prefix+h.toString()+e.labels.suffix;isNaN(h)||this.updateTooltip(o,a,l,n,p)},o.prototype.createTooltip=function(t,e,i){var o=n.tooltip(e,i);s.appendChild(t,o)},o.prototype.updateTooltip=function(t,e,i,o,n){s.showElement(t.tooltip),t.tooltip.style.background=o,t.tooltipText.innerHTML=n,s.setDivPosition(t.tooltip,e+10,i+10)},o.prototype.onMouseOut=function(t,e){var i=this.getSvg(e.containerId);i.tooltip&&s.hideElement(i.tooltip)},t.exports=o}])});