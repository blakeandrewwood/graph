!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.Graph=e():t.Graph=e()}(this,function(){return function(t){function e(s){if(i[s])return i[s].exports;var o=i[s]={exports:{},id:s,loaded:!1};return t[s].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var i={};return e.m=t,e.c=i,e.p="",e(0)}([function(t,e,i){"use strict";function s(t){this.application=t,this.type="line",this.size={width:400,height:400},this.range={min:0,max:0},this.points=[],this.labels={row:[],column:[],series:[],positions:{row:[],column:[],series:[]},increment:10,prefix:"",suffix:""},this.font={family:"monospace",size:12},this.percentages=[],this.colors=["#2388F2","#F65237","#0DEFA5","#9B7CF3"],this.horizontal=!1,this.shadow=!0,this.prefix="",this.containerId,this.container,this.svg,this.Events=new a}var o=i(1),n=i(2),r=i(3),a=i(4),l=function(t){return window[t]=new s(t),window[t]};s.prototype.makeLineBarCalculations=function(){this.range=o.getMinMax(this.points),this.labels.row=o.getPointIncrements(this.range.max,this.labels.increment)},s.prototype.makePieDoughnutCalculations=function(){this.range=o.getMinMax(this.points),this.percentages=o.getSetPercentages(this.points),this.degrees=o.getDegrees(this.percentages,360)},s.prototype.makeDialCalculations=function(){this.range=o.getMinMax(this.points),this.percentages=o.getPercentages(this.points),this.degrees=o.getDegrees(this.percentages,260)},s.prototype.lineBuildSvg=function(){this.makeLineBarCalculations(),this.labels.positions.row=o.calculateRowPositions(this.labels.row,this.size.height),this.labels.positions.column=o.calculateColumnPositions(this.labels.column,this.size.width);var t=r.graphLines(this.labels,this.size),e=r.columnLabelText(this.labels,this.labels.column,this.font,this.size),i=r.rowLabelText(this.labels,this.labels.row,this.font,this.size),s=r.seriesLabelText(this.labels,this.font,this.size,this.colors),a=r.lineSets(this,this.labels.positions.column,this.labels.row[0],this.points,this.range,this.size,this.colors),l=[],h=n.group({transform:"translate("+this.widthOffset/2+","+this.heightOffset/2+")"},t),p=n.group({transform:"translate("+this.widthOffset/2+","+this.heightOffset/2+")"},a),u=n.group({transform:"translate("+this.widthOffset/2+","+this.heightOffset/2+")"},e),c=n.group({transform:"translate("+this.widthOffset+","+this.heightOffset+")"},s),f=n.group({transform:"translate(0,"+this.heightOffset/2+")"},i);l.push(h),l.push(p),l.push(u),l.push(c),l.push(f);var d=n.group({},l);this.svg=r.svg(this.container,this.font.size,this.size,this.padding),o.appendChild(this.svg,d)},s.prototype.barBuildSvg=function(){this.makeLineBarCalculations();var t=this.labels.column,e=this.labels.row;this.horizontal&&(t=this.labels.row,e=this.labels.column,this.labels.row.reverse()),this.labels.positions.column=o.calculateColumnPositions(t,this.size.width),this.labels.positions.row=o.calculateRowPositions(e,this.size.height);var i=r.graphLines(this.labels,this.size),s=r.columnLabelText(this.labels,t,this.font,this.size),a=r.rowLabelText(this.labels,e,this.font,this.size),l=r.seriesLabelText(this.labels,this.font,this.size,this.colors),h=r.barSets(this,this.labels,this.points,this.size,this.horizontal,this.colors,this.shadow),p=[],u=n.group({transform:"translate("+this.widthOffset/2+","+this.heightOffset/2+")"},i),c=n.group({transform:"translate("+this.widthOffset/2+","+this.heightOffset/2+")"},h),f=n.group({transform:"translate("+this.widthOffset/2+","+this.heightOffset/2+")"},s),d=n.group({transform:"translate("+this.widthOffset+","+this.heightOffset+")"},l),g=n.group({transform:"translate(0,"+this.heightOffset/2+")"},a);p.push(u),p.push(c),p.push(f),p.push(d),p.push(g);var v=n.group({},p);this.svg=r.svg(this.container,this.font.size,this.size,this.padding),o.appendChild(this.svg,v)},s.prototype.pieBuildSvg=function(){this.makePieDoughnutCalculations();var t=r.bottomLeftLabelText(this.labels.column,this.font,this.size,this.colors),e=r.pieSets(this,this.degrees,this.size,this.colors,this.shadow),i=[],s=n.group({transform:"translate(0,"+this.heightOffset+")"},t),a=n.group({transform:"translate("+this.widthOffset/2+","+this.heightOffset/2+")"},e);i.push(s),i.push(a);var l=n.group({},i);this.svg=r.svg(this.container,this.font.size,this.size,this.padding),o.appendChild(this.svg,l)},s.prototype.doughnutBuildSvg=function(){this.makePieDoughnutCalculations();var t=r.bottomLeftLabelText(this.labels.column,this.font,this.size,this.colors),e=r.centerLabelText("50",this.font,this.size,"#000"),i=r.doughnutSets(this,this.degrees,this.size,this.colors,this.shadow),s=[],a=n.group({transform:"translate(0,"+this.heightOffset+")"},t),l=n.group({transform:"translate("+this.widthOffset/2+","+this.heightOffset/2+")"},i),h=n.group({transform:"translate("+this.widthOffset/2+","+this.heightOffset/2+")"},e);s.push(a),s.push(l),s.push(h);var p=n.group({},s);this.svg=r.svg(s,this.font.size,this.size,this.padding),o.appendChild(this.svg,p)},s.prototype.dialBuildSvg=function(){this.makeDialCalculations();var t=r.centerLabelText(100*this.percentages[0],this.font,this.size,"#fff"),e=r.bottomCenterLabelText(this.points[0][0]+"/"+this.points[0][1],this.font,this.size,"#000"),i=r.dialSets(this.degrees,this.percentages,this.size,this.colors,this.shadow),s=[],a=n.group({transform:"translate("+this.widthOffset/2+","+this.heightOffset/2+")"},i),l=n.group({transform:"translate("+this.widthOffset/2+","+this.heightOffset/2+")"},t),h=n.group({transform:"translate("+this.widthOffset/2+","+this.heightOffset+")"},e);s.push(a),s.push(l),s.push(h);var p=n.group({},s);this.svg=r.svg(s,this.font.size,this.size,this.padding),o.appendChild(this.svg,p)},s.prototype.render=function(){switch(this.padding={x:100,y:120},this.widthOffset=this.padding.x,this.heightOffset=this.padding.y,this.type){case"line":this.lineBuildSvg();break;case"bar":this.barBuildSvg();break;case"pie":this.pieBuildSvg();break;case"doughnut":this.doughnutBuildSvg();break;case"dial":this.dialBuildSvg()}o.appendChild(this.container,this.svg)},s.prototype.setContainer=function(t){this.containerId=t,this.container=document.getElementById(t)},s.prototype.setType=function(t){this.type=t},s.prototype.setSize=function(t,e){this.size.width=t,this.size.height=e},s.prototype.setLabels=function(t){this.labels.column=t},s.prototype.setSeriesLabels=function(t){this.labels.series=t},s.prototype.setPoints=function(t){this.points=t},s.prototype.setIncrement=function(t){this.labels.increment=t},s.prototype.setHorizontal=function(t){this.horizontal=t},s.prototype.setShadow=function(t){this.shadow=t},s.prototype.setColors=function(t){this.colors=t},s.prototype.setPrefix=function(t){this.labels.prefix=t},s.prototype.setSuffix=function(t){this.labels.suffix=t},s.prototype.setFontFamily=function(t){this.font.family=t},s.prototype.setFontSize=function(t){this.font.size=t},t.exports=l},function(t,e){"use strict";function i(){}i.prototype.setElementAttributes=function(t,e){for(var i in e){var s=i.replace(/[A-Z]/g,function(t){return"-"+t.toLowerCase()});t.setAttribute(s,e[i])}},i.prototype.styleToString=function(t){var e="";for(var i in t){var s=i.replace(/[A-Z]/g,function(t){return"-"+t.toLowerCase()});e+=s+":"+t[i]+";"}return e},i.prototype.appendChild=function(t,e){t.appendChild(e)},i.prototype.appendChildren=function(t,e){e.map(function(e){t.appendChild(e)})},i.prototype.setDivPosition=function(t,e,i){t.style.position="absolute",t.style.left=e+"px",t.style.top=i+"px"},i.prototype.getElementOffset=function(t){var e=t.getBoundingClientRect(),i=document.body,s=document.documentElement,o=window.pageYOffset||s.scrollTop||i.scrollTop,n=window.pageXOffset||s.scrollLeft||i.scrollLeft,r=s.clientTop||i.clientTop||Math.abs(i.getBoundingClientRect().top)||0,a=s.clientLeft||i.clientLeft||Math.abs(i.getBoundingClientRect().left)||0,l=e.top+o-r,h=e.left+n-a;return{top:Math.round(l),left:Math.round(h)}},i.prototype.showElement=function(t){t.style.display="block"},i.prototype.hideElement=function(t){t.style.display="none"},i.prototype.buildPathString=function(t){var e="";return t.forEach(function(t,i,s){e+=t.type,t.values&&t.values.map(function(t){e+=t+" "})}),e.trim()},i.prototype.flattenPoints=function(t){var e=[];return t.map(function(t){t.map(function(t){"object"==typeof t?t.map(function(t){e.push(t)}):e.push(t)})}),e},i.prototype.getPointIncrements=function(t,e){for(var i=Math.ceil(t/e)+1,s=[],o=0;i>o;o++)s.push(o*e);return s.reverse(),s},i.prototype.getSetPercentages=function(t){var e=[],i=this.flattenPoints(t),s=i.reduce(function(t,e){return t+e},0);return t.map(function(t){e.push(t[0]/s)}),e},i.prototype.getPercentages=function(t){var e=[],i=this.flattenPoints(t);return e.push(i[0]/i[1]),e},i.prototype.getDegrees=function(t,e){var i=[];return t.map(function(t){i.push(t*e)}),i},i.prototype.getMinMax=function(t){var e={},i=this.flattenPoints(t);return e.min=Array.min(i),e.max=Array.max(i),e},i.prototype.calculateColumnPositions=function(t,e){var i=[],s=e/(t.length-1);return t.forEach(function(t,e,o){var n=Math.round(s*e);i.push(n)}),i},i.prototype.calculateRowPositions=function(t,e){var i=[],s=e/(t.length-1);return t.forEach(function(t,e,o){var n=Math.round(s*e);i.push(n)},this),i},i.prototype.calculateY=function(t,e,i){var s=this.normalizeY(t,e,i);return this.reversePosY(s,0,i)},i.prototype.calculateX=function(t,e,i){return this.normalizeX(t,e,i)},i.prototype.normalizeY=function(t,e,i){return i/e*t},i.prototype.normalizeX=function(t,e,i){return i/e*t},i.prototype.reversePosY=function(t,e,i){return i+e-t},i.prototype.reversePosX=function(t,e,i){return i+e-t},i.prototype.calculateAngleX=function(t,e,i){return t+e*Math.cos(Math.PI*(i/180))},i.prototype.calculateAngleY=function(t,e,i){return t+e*Math.sin(Math.PI*(i/180))},i.prototype.sortDesc=function(t,e){return e-t},Array.max=function(t){return Math.max.apply(Math,t)},Array.min=function(t){return Math.min.apply(Math,t)},t.exports=new i},function(t,e,i){"use strict";function s(){}var o=i(1);s.prototype.text=function(t){var e=document.createElementNS("http://www.w3.org/2000/svg","text");return o.setElementAttributes(e,t),e},s.prototype.tspan=function(t){var e=document.createElementNS("http://www.w3.org/2000/svg","tspan");return o.setElementAttributes(e,t),e},s.prototype.line=function(t){var e=document.createElementNS("http://www.w3.org/2000/svg","line");return o.setElementAttributes(e,t),e},s.prototype.circle=function(t){var e=document.createElementNS("http://www.w3.org/2000/svg","circle");return o.setElementAttributes(e,t),e},s.prototype.rect=function(t){var e=document.createElementNS("http://www.w3.org/2000/svg","rect");return o.setElementAttributes(e,t),e},s.prototype.path=function(t){var e=document.createElementNS("http://www.w3.org/2000/svg","path");return o.setElementAttributes(e,t),e},s.prototype.svg=function(t){var e=document.createElementNS("http://www.w3.org/2000/svg","svg");return o.setElementAttributes(e,t),e},s.prototype.group=function(t,e){var i=document.createElementNS("http://www.w3.org/2000/svg","g");return o.setElementAttributes(i,t),o.appendChildren(i,e),i},s.prototype.div=function(t){var e=document.createElement("div");return o.setElementAttributes(e,t),e},s.prototype.p=function(t){var e=document.createElement("p");return o.setElementAttributes(e,t),e},s.prototype.dash=function(t){var e=[{type:"M",values:[0,0]},{type:"",values:[-2.6,0]},{type:"",values:[-3.8,-20]},{type:"",values:[3.8,-20]},{type:"",values:[2.6,0]},{type:"Z"}];t.d=o.buildPathString(e);var i=this.path(t);return i},s.prototype.shadow=function(t,e,i,s){var n={def:null,element:null};n.def=this.filterShadow(e,i);var r=s.cloneNode(!0);return t.filter="url(#"+e+")",o.setElementAttributes(r,t),n.element=r,n},s.prototype.defs=function(){var t=document.createElementNS("http://www.w3.org/2000/svg","defs");return t},s.prototype.clipPath=function(t,e){var i=document.createElementNS("http://www.w3.org/2000/svg","clipPath");return o.setElementAttributes(i,{id:t}),o.appendChild(i,e),i},s.prototype.filterShadow=function(t,e){var i=document.createElementNS("http://www.w3.org/2000/svg","filter"),s=document.createElementNS("http://www.w3.org/2000/svg","feGaussianBlur"),n=document.createElementNS("http://www.w3.org/2000/svg","feBlend");return o.setElementAttributes(i,{id:t,width:"200%",height:"200%"}),o.setElementAttributes(s,{"in":"SourceAlpha",result:"blurOut"}),s.setAttribute("stdDeviation",e),o.setElementAttributes(n,{"in":"blurOut",mode:"normal"}),o.appendChild(i,s),o.appendChild(i,n),i},t.exports=new s},function(t,e,i){"use strict";function s(){}var o=i(1),n=i(2);s.prototype.columnLabelText=function(t,e,i,s){var o=[];return e.forEach(function(e,r,a){var l=t.positions.column[r],h=n.text({x:l,y:s.height+2.2*i.size,fill:"#888",fontSize:i.size,fontFamily:i.family,textAnchor:"middle"}),p=document.createTextNode(e);h.appendChild(p),o.push(h)}),o},s.prototype.rowLabelText=function(t,e,i,s){var o=[];return e.forEach(function(e,s,r){var a=t.positions.row[s]+i.size/2,l=n.text({x:0,y:a,fill:"#888",fontSize:i.size,fontFamily:i.family}),h=document.createTextNode(e);l.appendChild(h),o.push(l)}),o},s.prototype.seriesLabelText=function(t,e,i,s){var o=[],r=10,a=n.text({x:i.width-r,y:i.height-.2*e.size,fill:"#888",fontSize:e.size,fontFamily:e.family,textAnchor:"end"});return t.series.forEach(function(t,e,i){var o=n.tspan({dx:r,fill:s[e]});o.appendChild(document.createTextNode(t)),a.appendChild(o)}),o.push(a),o},s.prototype.bottomLeftLabelText=function(t,e,i,s){var r=[];return t.forEach(function(a,l,h){var p=1.4*e.size,u=t.length-1,c=p*u-p*l,f=o.reversePosY(c,0,i.height),d=n.text({x:0,y:f,fill:s[l],fontSize:e.size,fontFamily:e.family,textAnchor:"right"}),g=document.createTextNode(a);d.appendChild(g),r.push(d)}),r},s.prototype.bottomCenterLabelText=function(t,e,i,s){var r=[],a=i.width/2,l=o.reversePosY(0,0,i.height),h=n.text({x:a,y:l,fill:s,fontSize:e.size,fontFamily:e.family,textAnchor:"middle"}),t=document.createTextNode(t);return h.appendChild(t),r.push(h),r},s.prototype.centerLabelText=function(t,e,i,s){var o=[],r=i.width/2,a=e.size/2+i.height/2,l=n.text({x:r,y:a,fill:s,fontSize:e.size,fontFamily:e.family,textAnchor:"middle"}),t=document.createTextNode(t);return l.appendChild(t),o.push(l),o},s.prototype.lineSets=function(t,e,i,s,r,a,l){var h=[];return s.forEach(function(s,r,p){var u=[];s.forEach(function(t,s,n){var r=s>0?"":"M";u.push({type:r,values:[e[s],o.calculateY(t,i,a.height)]})});var c=o.buildPathString(u),f=n.path({d:c,stroke:l[r],strokeWidth:6,strokeLinecap:"round",fill:"none"});f.addEventListener("mousemove",function(e){t.Events.onMouseOverLine(e,t,r,i)}),f.addEventListener("mouseout",function(e){t.Events.onMouseOut(e,t)}),h.push(f)}),h},s.prototype.barSets=function(t,e,i,s,r,a,l){var h=[];return i.forEach(function(i,p,u){var c=0;i.sort(o.sortDesc),i.forEach(function(u,f,d){var g,v=16,m=-(v/4),y=(v+m)*(i.length-1)/2,w=-(v/3),b={fill:"transparent",stroke:a[c],strokeWidth:v,strokeLinecap:"round"},x={opacity:"0.15",fill:"transparent",stroke:"#000",strokeWidth:v,strokeLinecap:"round"};if("number"==typeof u){var E=[];if(r){x.transform="translate("+-w+", 0)",g=e.row[e.row.length-1];var S=e.positions.row[p]+f*(v+m)-y;E.push({type:"M",values:[o.calculateX(0,g,s.width),S]}),E.push({type:"",values:[o.calculateX(u,g,s.width)-v/2,S]})}else{x.transform="translate("+w+", 0)",g=e.row[0];var z=e.positions.column[p]+f*(v+m)-y;E.push({type:"M",values:[z,o.calculateY(0,g,s.height)]}),E.push({type:"",values:[z,o.calculateY(u,g,s.height)+v/2]})}var O=o.buildPathString(E);if(l){x.d=O;var A=n.path(x,E);h.push(A)}b.d=O;var C=n.path(b,E);h.push(C),C.addEventListener("mousemove",function(e){t.Events.onMouseOverBar(e,t,0,u)}),C.addEventListener("mouseout",function(e){t.Events.onMouseOut(e,t)}),c++}else"object"==typeof u&&(u.sort(o.sortDesc),u.forEach(function(i,u,d){b.stroke=a[c];var E=[];if(r){x.transform="translate("+-w+", 0)",g=e.row[e.row.length-1];var S=e.positions.row[p]+f*(v+m)-y;E.push({type:"M",values:[o.calculateX(0,g,s.width),S]}),E.push({type:"",values:[o.calculateX(i,g,s.width)-v/2,S]})}else{x.transform="translate("+w+", 0)",g=e.row[0];var z=e.positions.column[p]+f*(v+m)-y;E.push({type:"M",values:[z,o.calculateY(0,g,s.height)]}),E.push({type:"",values:[z,o.calculateY(i,g,s.height)+v/2]})}var O=o.buildPathString(E);if(l){x.d=O;var A=n.path(x,E);h.push(A)}b.d=O;var C=n.path(b,E);h.push(C),C.addEventListener("mousemove",function(e){t.Events.onMouseOverBar(e,t,0,i)}),C.addEventListener("mouseout",function(e){t.Events.onMouseOut(e,t)}),c++}))})}),h},s.prototype.pieSets=function(t,e,i,s,r){var a=[],l={x:i.width/2,y:i.height/2},h=i.height/2,p=0;e.forEach(function(e,i,r){var u={fill:s[i]},c=i>0?p:0,f=-90+c,d=0+f,g=e+f;p+=e;var v=180+f,m=o.calculateAngleX(l.x,h,d),y=o.calculateAngleY(l.y,h,d),w=[{type:"M",values:[l.x,l.y]},{type:"",values:[m,y]}],b=[];e>180&&b.push(v),b.push(g),b.map(function(t){var e=o.calculateAngleX(l.x,h,t),i=o.calculateAngleY(l.y,h,t);w.push({type:"A",values:[h,h,0,0,1]}),w.push({type:"",values:[e,i]})}),w.push({type:"Z"}),u.d=o.buildPathString(w);var x=n.path(u);x.addEventListener("mousemove",function(e){t.Events.onMouseOverPie(e,t,i,y)}),x.addEventListener("mouseout",function(e){t.Events.onMouseOut(e,t)}),a.push(x)});var u=[],c=n.group({},a);if(r){var f=n.defs(),r=n.shadow({opacity:.15},"pie-shadow",8,c);o.appendChild(f,r.def),u.push(f),u.push(r.element)}return u.push(c),u},s.prototype.doughnutSets=function(t,e,i,s,r){var a={x:i.width/2,y:i.height/2},l=i.height/2,h=l-40,p=o.calculateAngleX(a.x,l,0),u=o.calculateAngleY(a.y,l,0),c=o.calculateAngleX(a.x,l,180),f=o.calculateAngleY(a.y,l,180),d=o.calculateAngleX(a.x,h,0),g=o.calculateAngleY(a.y,h,0),v=o.calculateAngleX(a.x,h,180),m=o.calculateAngleY(a.y,h,180),y=[{type:"M",values:[p,u]},{type:"A",values:[l,l,0,0,1]},{type:"",values:[c,f]},{type:"A",values:[l,l,0,0,1]},{type:"",values:[p,u]},{type:"Z"},{type:"M",values:[d,g]},{type:"A",values:[h,h,0,0,0]},{type:"",values:[v,m]},{type:"A",values:[h,h,0,0,0]},{type:"",values:[d,g]},{type:"Z"}],w=[],b={d:o.buildPathString(y)},x=n.path(b),E=n.defs(),S=n.clipPath("doughnut-clip",x);o.appendChild(E,S);var z=this.pieSets(t,e,i,s,!1)[0];o.setElementAttributes(z,{clipPath:"url(#doughnut-clip)"});var O=n.group({},[z]);if(r){var r=n.shadow({opacity:.15},"doughnut-shadow",8,O);o.appendChild(E,r.def),w.push(r.element)}return w.push(E),w.push(z),w},s.prototype.dialSets=function(t,e,i,s,r){for(var a={x:i.width/2,y:i.height/2},l=i.height/3.2,h=t-220,p=l-15,u=o.calculateAngleX(a.x,p,h),c=o.calculateAngleY(a.y,p,h),f=[],d=l+15,g=-150,v=0;260>v;v+=20){var m=v/260>e?.2:1,y=o.calculateAngleX(a.x,d,v-g),w=o.calculateAngleY(a.y,d,v-g),b=n.dash({transform:"translate("+y+", "+w+") rotate("+(v-120)+", 0, 0)",fill:s[0],opacity:m});f.push(b)}var x=[],E=n.group({},f),S=n.circle({cx:a.x,cy:a.y,r:l,fill:s[0]}),z=n.circle({cx:u,cy:c,r:5,fill:"#fff"});if(r){var O=n.defs(),r=n.shadow({opacity:.15},"pie-shadow",8,S);o.appendChild(O,r.def),x.push(O),x.push(r.element)}return x.push(S),x.push(z),x.push(E),x},s.prototype.tooltip=function(t,e){var i=o.styleToString({position:"absolute",padding:"10px 20px",margin:"none",color:"#fff",fontSize:"16px",fontFamily:e,boxShadow:"4px 4px 0 rgba(0, 0, 0, 0.2)"}),s=o.styleToString({padding:"0",margin:"0"}),r=n.div({id:t,style:i}),a=n.p({id:t+"-text",style:s});return o.appendChild(r,a),r},s.prototype.graphLines=function(t,e){var i=[];return t.positions.column.map(function(t){var s=n.line({x1:t,y1:0,x2:t,y2:e.height,stroke:"#ccc",strokeDasharray:"5, 5"});i.push(s)}),t.positions.row.map(function(t){var s=n.line({x1:0,y1:t,x2:e.width,y2:t,stroke:"#ccc",strokeDasharray:"5, 5"});i.push(s)}),i},s.prototype.svg=function(t,e,i,s){var o=i.width+s.x,r=i.height+s.y,a={xmlns:"http://www.w3.org/2000/svg",version:"1.1",width:o,height:r},l=n.svg(a);return l},t.exports=new s},function(t,e,i){"use strict";function s(){}var o=(i(2),i(3)),n=i(1);s.prototype.getSvg=function(t,e){var i=document.getElementById(t),s=i.getElementsByTagName("svg")[0],o=t+"-tooltip",n=document.getElementById(o),r=document.getElementById(o+"-text");n||this.createTooltip(i,o,e);var a={container:i,svg:s,tooltipId:o,tooltip:n,tooltipText:r};return a},s.prototype.onMouseOverLine=function(t,e,i,s){var o=this.getSvg(e.containerId,e.font.family),r=e.colors[i],a=n.getElementOffset(o.container),l=n.getElementOffset(o.svg),h=e.padding,p=t.clientX-a.left,u=t.clientY-a.top,c=t.clientX-l.left-h.x/2,f=(t.clientY-l.top-h.y/2,e.labels.positions.column.length-1),d=c/(e.size.width/f),g=Math.floor(d),v=[e.points[i][g],e.points[i][g+1]],m=Math.floor((v[1]-v[0])*(d%1)+v[0]),y=e.labels.prefix+m.toString()+e.labels.suffix;isNaN(m)||this.updateTooltip(o,p,u,r,y)},s.prototype.onMouseOverBar=function(t,e,i,s){var o=this.getSvg(e.containerId,e.font.family),r=e.colors[i],a=n.getElementOffset(o.container),l=(n.getElementOffset(o.svg),t.clientX-a.left),h=t.clientY-a.top,p=s,u=e.labels.prefix+p.toString()+e.labels.suffix;isNaN(p)||this.updateTooltip(o,l,h,r,u)},s.prototype.onMouseOverPie=function(t,e,i){var s=this.getSvg(e.containerId,e.font.family),o=e.colors[i],r=n.getElementOffset(s.container),a=(n.getElementOffset(s.svg),t.clientX-r.left),l=t.clientY-r.top,h=e.points[i],p=e.labels.prefix+h.toString()+e.labels.suffix;isNaN(h)||this.updateTooltip(s,a,l,o,p)},s.prototype.createTooltip=function(t,e,i){var s=o.tooltip(e,i);n.appendChild(t,s)},s.prototype.updateTooltip=function(t,e,i,s,o){n.showElement(t.tooltip),t.tooltip.style.background=s,t.tooltipText.innerHTML=o,n.setDivPosition(t.tooltip,e+10,i+10)},s.prototype.onMouseOut=function(t,e){var i=this.getSvg(e.containerId);i.tooltip&&n.hideElement(i.tooltip)},t.exports=s}])});