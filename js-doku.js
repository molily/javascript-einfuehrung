(function() {

var FileLinks = {

  init: function() {
    document.addEventListener('click', this.clickHandler);
  },

  clickHandler: function(event) {
    var target = event.target;
    if (
      target.tagName === 'A' &&
      target.getAttribute('href') === './' &&
      !(event.shiftKey || event.altKey || event.ctrlKey || event.metaKey)
    ) {
      event.preventDefault();
      location.href = 'index.html';
    }
  }

};

FileLinks.init();

/* ------------------------------------------------------ */

var CoolURIs = {

  rules: {
    'einbindung.html#ereignisbasierung': 'event-handling-grundlagen.html#ereignisbasierung',
    'einbindung.html#phase-laden': 'event-handling-grundlagen.html#phase-laden',
    'einbindung.html#phase-onload': 'event-handling-grundlagen.html#phase-onload',
    'einbindung.html#phase-event-handling': 'event-handling-grundlagen.html#phase-event-handling',
    'einbindung.html#script-struktur': 'event-handling-grundlagen.html#script-struktur',
    'einbindung.html#traditionelles-event-handling': 'event-handling-grundlagen.html#traditionelles-event-handling',
    'einbindung.html#traditionelles-schema': 'event-handling-grundlagen.html#traditionelles-schema',
    'einbindung.html#handler-loeschen': 'event-handling-grundlagen.html#handler-loeschen',
    'einbindung.html#fehler-handler-aufrufen': 'event-handling-grundlagen.html#fehler-handler-aufrufen',
    'einbindung.html#inline-handler': 'event-handling-grundlagen.html#inline-handler',
    'einbindung.html#fehler-code-als-string': 'event-handling-grundlagen.html#fehler-code-als-string',
    'einbindung.html#event-objekt': 'event-handling-objekt.html#event-objekt',
    'einbindung.html#standardaktion': 'event-handling-objekt.html#standardaktion',
    'einbindung.html#bubbling': 'event-handling-objekt.html#bubbling',
    'einbindung.html#currenttarget-target': 'event-handling-objekt.html#currenttarget-target',
    'einbindung.html#bubbling-verhindern': 'event-handling-objekt.html#bubbling-verhindern',
    'einbindung.html#traditionell-nachteile': 'event-handling-fortgeschritten.html#traditionell-nachteile',
    'einbindung.html#dom-events': 'event-handling-fortgeschritten.html#dom-events',
    'einbindung.html#addEventListener': 'event-handling-fortgeschritten.html#addEventListener',
    'einbindung.html#removeEventListener': 'event-handling-fortgeschritten.html#removeEventListener',
    'einbindung.html#microsoft': 'event-handling-fortgeschritten.html#microsoft',
    'einbindung.html#attachEvent': 'event-handling-fortgeschritten.html#attachEvent',
    'einbindung.html#detachEvent': 'event-handling-fortgeschritten.html#detachEvent',
    'einbindung.html#microsoft-eigenheiten': 'event-handling-fortgeschritten.html#microsoft-eigenheiten',
    'einbindung.html#addevent': 'event-handling-fortgeschritten.html#addevent',
    'einbindung.html#addevent-lage': 'event-handling-fortgeschritten.html#addevent-lage',
    'einbindung.html#addevent-helfer': 'event-handling-fortgeschritten.html#addevent-helfer',
    'einbindung.html#einfaches-addevent': 'event-handling-fortgeschritten.html#einfaches-addevent',
    'einbindung.html#flexibles-addevent': 'event-handling-fortgeschritten.html#flexibles-addevent',
    'einbindung.html#addevent-frameworks': 'event-handling-fortgeschritten.html#addevent-frameworks',
    'einbindung.html#onload': 'event-handling-onload.html#onload',
    'einbindung.html#onload-nachteile': 'event-handling-onload.html#onload-nachteile',
    'einbindung.html#domcontentloaded': 'event-handling-onload.html#domcontentloaded',
    'einbindung.html#domcontentloaded-crossbrowser': 'event-handling-onload.html#domcontentloaded-crossbrowser',
    'einbindung.html#domcontentloaded-nachteile': 'event-handling-onload.html#domcontentloaded-nachteile',
    'einbindung.html#delegation': 'event-handling-effizient.html#delegation',
    'einbindung.html#capturing': 'event-handling-effizient.html#capturing'
  },

  init: function() {
    var currentURI = location.href;
    for (var oldURI in CoolURIs.rules) {
      var regExp = new RegExp(oldURI.replace('.', '\\.') + '$');
      if (regExp.test(currentURI)) {
        location.href = CoolURIs.rules[oldURI];
        break;
      }
    }
  }

};

CoolURIs.init();

/* ------------------------------------------------------ */

var sortElementsDocumentPosition = function(a, b) {
  if (!a.compareDocumentPosition || !b.compareDocumentPosition) return 0;
  return a.compareDocumentPosition(b) & 4 ? -1 : a === b ? 0 : 1;
};

var sortElementsSourceIndex = function(a, b) {
  if (!a.sourceIndex || !b.sourceIndex) return 0;
  return a.sourceIndex - b.sourceIndex;
};

var TOC = {

  sortElements: (function() {
    return document.documentElement.compareDocumentPosition ?
      sortElementsDocumentPosition :
      ('sourceIndex' in document.documentElement) ?
        sortElementsSourceIndex :
        null;
  })(),

  toArray: Array.from || function(list) {
    var length = list.length;
    var array = new Array(length);
    for (var i = 0; i < length; i++) {
      array.push(list[i]);
    }
    return array;
  },

  getHeadings: function() {
    var h2s = document.getElementsByTagName('h2');
    var h3s = document.getElementsByTagName('h3');
    var list = TOC.toArray(h2s).concat(TOC.toArray(h3s));
    list.sort(TOC.sortElements);
    return list;
  },

  createElement: function(tagName, attributes, innerHTML) {
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

  buildList: function() {
    var headings = TOC.getHeadings();
    var h2list = TOC.createElement('ol');
    var lastH2Item = null;
    var h3list = null;

    for (var i = 0, heading; heading = headings[i]; i++) {

      var section = heading.parentNode;
      if (!section.id) {
        continue;
      }
      var a = TOC.createElement('a', { href: '#' + section.id }, heading.innerHTML);
      var li = TOC.createElement('li');
      li.appendChild(a);

      if (heading.tagName === 'H3') {
        if (!h3list) {
          h3list = TOC.createElement('ol');
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

  init: function() {
    var mainToc = TOC.buildList();
    mainToc.id = 'toc';
    var h1 = document.getElementsByTagName('h1')[0];
    h1.parentNode.insertBefore(mainToc, h1.nextSibling);
  }
};

TOC.init();

})();
