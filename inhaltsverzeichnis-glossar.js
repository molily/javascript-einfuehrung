var inhaltsverzeichnis = {
	show : function () {
		var ul = document.createElement("ul");
		ul.id = "inhaltsverzeichnis";
		var h2s = document.getElementsByTagName("h2");
		for (var i = 0, h2, li, a, text, textnode; h2 = h2s[i]; i++) {
			li = document.createElement("li");
			a = document.createElement("a");
			a.href = "#" + h2.id;
			text = h2.innerText || h2.textContent;
			if (!text) {
				return false;
			}
			textnode = document.createTextNode(text);
			a.appendChild(textnode);
			li.appendChild(a);
			ul.appendChild(li);
		}
		var h1 = document.getElementsByTagName("h1").item(0);
		h1.parentNode.insertBefore(ul, h1.nextSibling);
	}
};

var glossary = {
	show : function () {
		var div = document.createElement("div");
		div.id = "glossary";

		var h2 = document.createElement("h2");
		h2.id = "glossar";
		var textnode = document.createTextNode("Glossar");
		h2.appendChild(textnode);

		div.appendChild(h2);

		var ul = document.createElement("ul");
		div.appendChild(ul);


		var dfns = document.getElementsByTagName("dfn");
		for (var i = 0, dfn, begriff, li, span, jumpTarget; dfn = dfns[i]; i++) {
			li = document.createElement("li");

			li.begriff = dfn.textContent || dfn.innerText || dfn.text;
			li.idFragment = li.begriff.toLowerCase().replace(/ /g, "-").replace(/[^a-z\-]/ig, "");
			li.dfn = dfn;
			li.onclick = li.showTerm = glossary.showTerm;

			ul.appendChild(li);

			span = document.createElement("span");
			textnode = document.createTextNode(li.begriff);
			span.appendChild(textnode);
			li.appendChild(span);

			if (new RegExp("^#?begriff-" + li.idFragment, "i").test(location.hash)) {
				jumpTarget = li;
			}
		}
		document.body.appendChild(div);

		if (jumpTarget) {
			window.setTimeout(function () { jumpTarget.showTerm(); }, 0);
		}
	},
	showTerm : function (e) {
		e = e || window.event;
		var dfn = this.dfn;
		var parentNode, tagName;
		while (parentNode = dfn.parentNode) {
			tagName = parentNode.nodeName.toLowerCase();
			if (/^p|li|dt|dd|th|td$/.test(tagName)) {
				break;
			}
		}

		var id = "begriff-" + this.idFragment;
		parentNode.id = id;
		window.location.hash = parentNode.id;
	}
};

addEvent(window, "load", glossary.show);
addEvent(window, "load", inhaltsverzeichnis.show);