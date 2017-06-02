(function (window) {

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

// @w  window reference
// @f  function reference
function ContentLoaded(c,j){var b=c.document,h='DOMContentLoaded',d=c.navigator.userAgent.toLowerCase(),f=parseFloat(d.match(/.+(?:rv|it|ml|ra|ie)[\/: ]([\d.]+)/)[1]);function g(a){if(!document.loaded){document.loaded=true;j((a.type&&a.type==h)?a:{type:h,target:b,eventPhase:0,currentTarget:b,timeStamp:+new Date,eventType:a.type||a})}}if(/webkit\//.test(d)&&f<525.13){(function(){if(/complete|loaded/.test(b.readyState)){g('khtml-poll')}else{setTimeout(arguments.callee,10)}})()}else if(/msie/.test(d)&&!c.opera){b.attachEvent('onreadystatechange',function(a){if(b.readyState=='complete'){b.detachEvent('on'+a.type,arguments.callee);g(a)}});if(c==top){(function(){try{b.documentElement.doScroll('left')}catch(e){setTimeout(arguments.callee,10);return}g('msie-poll')})()}}else if(b.addEventListener&&(/opera\//.test(d)&&f>9)||(/gecko\//.test(d)&&f>=1.8)||(/khtml\//.test(d)&&f>=4.0)||(/webkit\//.test(d)&&f>=525.13)){b.addEventListener(h,function(a){b.removeEventListener(h,arguments.callee,false);g(a)},false)}else{var i=c.onload;c.onload=function(a){g(a||c.event);if(typeof i=='function'){i(a||c.event)}}}}

/* ------------------------------------------------------ */

var CoolURIs = {
  rules : {
    'einbindung.html#ereignisbasierung' : 'event-handling-grundlagen.html#ereignisbasierung',
    'einbindung.html#phase-laden' : 'event-handling-grundlagen.html#phase-laden',
    'einbindung.html#phase-onload' : 'event-handling-grundlagen.html#phase-onload',
    'einbindung.html#phase-event-handling' : 'event-handling-grundlagen.html#phase-event-handling',
    'einbindung.html#script-struktur' : 'event-handling-grundlagen.html#script-struktur',
    'einbindung.html#traditionelles-event-handling' : 'event-handling-grundlagen.html#traditionelles-event-handling',
    'einbindung.html#traditionelles-schema' : 'event-handling-grundlagen.html#traditionelles-schema',
    'einbindung.html#handler-loeschen' : 'event-handling-grundlagen.html#handler-loeschen',
    'einbindung.html#fehler-handler-aufrufen' : 'event-handling-grundlagen.html#fehler-handler-aufrufen',
    'einbindung.html#inline-handler' : 'event-handling-grundlagen.html#inline-handler',
    'einbindung.html#fehler-code-als-string' : 'event-handling-grundlagen.html#fehler-code-als-string',
    'einbindung.html#event-objekt' : 'event-handling-objekt.html#event-objekt',
    'einbindung.html#standardaktion' : 'event-handling-objekt.html#standardaktion',
    'einbindung.html#bubbling' : 'event-handling-objekt.html#bubbling',
    'einbindung.html#currenttarget-target' : 'event-handling-objekt.html#currenttarget-target',
    'einbindung.html#bubbling-verhindern' : 'event-handling-objekt.html#bubbling-verhindern',
    'einbindung.html#traditionell-nachteile' : 'event-handling-fortgeschritten.html#traditionell-nachteile',
    'einbindung.html#dom-events' : 'event-handling-fortgeschritten.html#dom-events',
    'einbindung.html#addEventListener' : 'event-handling-fortgeschritten.html#addEventListener',
    'einbindung.html#removeEventListener' : 'event-handling-fortgeschritten.html#removeEventListener',
    'einbindung.html#microsoft' : 'event-handling-fortgeschritten.html#microsoft',
    'einbindung.html#attachEvent' : 'event-handling-fortgeschritten.html#attachEvent',
    'einbindung.html#detachEvent' : 'event-handling-fortgeschritten.html#detachEvent',
    'einbindung.html#microsoft-eigenheiten' : 'event-handling-fortgeschritten.html#microsoft-eigenheiten',
    'einbindung.html#addevent' : 'event-handling-fortgeschritten.html#addevent',
    'einbindung.html#addevent-lage' : 'event-handling-fortgeschritten.html#addevent-lage',
    'einbindung.html#addevent-helfer' : 'event-handling-fortgeschritten.html#addevent-helfer',
    'einbindung.html#einfaches-addevent' : 'event-handling-fortgeschritten.html#einfaches-addevent',
    'einbindung.html#flexibles-addevent' : 'event-handling-fortgeschritten.html#flexibles-addevent',
    'einbindung.html#addevent-frameworks' : 'event-handling-fortgeschritten.html#addevent-frameworks',
    'einbindung.html#onload' : 'event-handling-onload.html#onload',
    'einbindung.html#onload-nachteile' : 'event-handling-onload.html#onload-nachteile',
    'einbindung.html#domcontentloaded' : 'event-handling-onload.html#domcontentloaded',
    'einbindung.html#domcontentloaded-crossbrowser' : 'event-handling-onload.html#domcontentloaded-crossbrowser',
    'einbindung.html#domcontentloaded-nachteile' : 'event-handling-onload.html#domcontentloaded-nachteile',
    'einbindung.html#delegation' : 'event-handling-effizient.html#delegation',
    'einbindung.html#capturing' : 'event-handling-effizient.html#capturing'
  },
  init : function () {
    var currentURI = location.href, newURI;
    for (var oldURI in CoolURIs.rules) {
      var regExp = new RegExp(oldURI.replace('.', '\\.') + "$");
      if (regExp.test(currentURI)) {
        location.href = CoolURIs.rules[oldURI];
        break;
      }
    }
  }
};

CoolURIs.init();

/* ------------------------------------------------------ */

var TOC = {

  sortElements : document.documentElement.compareDocumentPosition ? function (a, b) {
    if (!a.compareDocumentPosition || !b.compareDocumentPosition) return 0;
    return a.compareDocumentPosition(b) & 4 ? -1 : a === b ? 0 : 1;
  } : ('sourceIndex' in document.documentElement) ? function (a, b) {
    if (!a.sourceIndex || !b.sourceIndex) return 0;
    return a.sourceIndex - b.sourceIndex;
  } : null,
  hasClass : function(element, className) {
    var elementClassName = element.className;
    return (elementClassName.length > 0 && (elementClassName == className || new RegExp("(^|\\s)" + className + "(\\s|$)").test(elementClassName)));
  },

  toArray : function (list) {
    var arr = [];
    for (var i = 0, l = list.length; i < l; i++) {
      arr.push(list[i]);
    }
    return arr;
  },

  getHeadings : function () {
    var h2s = document.getElementsByTagName("h2"),
      h3s = document.getElementsByTagName("h3"),
      list = TOC.toArray(h2s).concat(TOC.toArray(h3s));
    list.sort(TOC.sortElements);
    return list;
  },

  createElement : function (tagName, attributes, innerHTML) {
    var el = document.createElement(tagName);
    for (var prop in attributes) {
      if (attributes.hasOwnProperty(prop)) {
        el.setAttribute(prop, attributes[prop]);
      }
    }
    if (innerHTML) {
      el.innerHTML = innerHTML
    }
    return el;
  },

  buildList : function () {
    var headings = TOC.getHeadings(),
      h2list = TOC.createElement("ol"),
      lastH2Item = null,
      h3list = null,
      i, heading, section, a, li;

    for (i = 0; heading = headings[i]; i++) {

      section = heading.parentNode;
      if (!section.id) {
        continue;
      }
      a = TOC.createElement("a", { href : "#" + section.id }, heading.innerHTML);
      li = TOC.createElement("li");
      li.appendChild(a);

      if (heading.tagName == "H3") {
        if (!h3list) {
          h3list = TOC.createElement("ol");
          lastH2Item.appendChild(h3list);
        }
        h3list.appendChild(li);
      } else {
        h2list.appendChild(li);
        h3list = null;
        lastH2Item = li;
      }
    }

    return h2list;
  },

  init : function () {
    var mainToc = TOC.buildList();
    mainToc.id = "toc";
    var h1 = document.getElementsByTagName("h1")[0];
    h1.parentNode.insertBefore(mainToc, h1.nextSibling);
  }
};

ContentLoaded(window, TOC.init);

})(window);
