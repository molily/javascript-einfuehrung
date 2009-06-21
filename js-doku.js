/*
 *
 * ContentLoaded.js
 *
 * Author: Diego Perini (diego.perini at gmail.com)
 * Summary: Cross-browser wrapper for DOMContentLoaded
 * Updated: 17/05/2008
 * License: MIT
 * Version: 1.1
 *
 * URL:
 * http://javascript.nwbox.com/ContentLoaded/
 * http://javascript.nwbox.com/ContentLoaded/MIT-LICENSE
 *
 * Notes:
 * based on code by Dean Edwards and John Resig
 * http://dean.edwards.name/weblog/2006/06/again/
 *
 */

// @w	window reference
// @f	function reference
function ContentLoaded(c,j){var b=c.document,h='DOMContentLoaded',d=c.navigator.userAgent.toLowerCase(),f=parseFloat(d.match(/.+(?:rv|it|ml|ra|ie)[\/: ]([\d.]+)/)[1]);function g(a){if(!document.loaded){document.loaded=true;j((a.type&&a.type==h)?a:{type:h,target:b,eventPhase:0,currentTarget:b,timeStamp:+new Date,eventType:a.type||a})}}if(/webkit\//.test(d)&&f<525.13){(function(){if(/complete|loaded/.test(b.readyState)){g('khtml-poll')}else{setTimeout(arguments.callee,10)}})()}else if(/msie/.test(d)&&!c.opera){b.attachEvent('onreadystatechange',function(a){if(b.readyState=='complete'){b.detachEvent('on'+a.type,arguments.callee);g(a)}});if(c==top){(function(){try{b.documentElement.doScroll('left')}catch(e){setTimeout(arguments.callee,10);return}g('msie-poll')})()}}else if(b.addEventListener&&(/opera\//.test(d)&&f>9)||(/gecko\//.test(d)&&f>=1.8)||(/khtml\//.test(d)&&f>=4.0)||(/webkit\//.test(d)&&f>=525.13)){b.addEventListener(h,function(a){b.removeEventListener(h,arguments.callee,false);g(a)},false)}else{var i=c.onload;c.onload=function(a){g(a||c.event);if(typeof i=='function'){i(a||c.event)}}}}

/* ------------------------------------------------------ */

var TOC = {
	buildList : function (headings, callback) {
		var ol, i, heading, a, section, li;
		
		if (headings.length == 0) {
			return false;
		}
		
		ol = document.createElement("ol")
		
		for (i = 0; heading = headings[i]; i++) {
			
			a = document.createElement("a");
			a.innerHTML = heading.innerHTML;
			section = heading.parentNode;
			if (section.id) {
				a.href = "#" + section.id;
			}
			
			li = document.createElement("li");
			li.appendChild(a);
			ol.appendChild(li);
			
			if (typeof callback == "function") {
				callback(section, li);
			}
		}
		
		return ol;
	},
	
	init : function () {
		
		var mainToc = TOC.buildList(
			document.getElementsByTagName("h2"),
			buildSubToc
		);
		mainToc.id = "toc";
		
		var h1 = document.getElementsByTagName("h1")[0];
		document.body.insertBefore(mainToc, h1.nextSibling);
		
		function buildSubToc (section, mainTocItem) {
			var subToc = TOC.buildList(
				section.getElementsByTagName("h3")
			);
			if (subToc) {
				mainTocItem.appendChild(subToc);
			}
		}
		
	}
};
ContentLoaded(window, TOC.init);