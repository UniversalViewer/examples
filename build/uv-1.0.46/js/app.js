
/* Modernizr 2.8.3 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-input-inputtypes-cssclasses-load
 */
/* Modernizr 2.8.3 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-input-inputtypes-cssclasses-cors-load
 * (add Non-core detects: cors)
 */
;window.Modernizr=function(a,b,c){function v(a){j.cssText=a}function w(a,b){return v(prefixes.join(a+";")+(b||""))}function x(a,b){return typeof a===b}function y(a,b){return!!~(""+a).indexOf(b)}function z(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:x(f,"function")?f.bind(d||b):f}return!1}function A(){e.input=function(c){for(var d=0,e=c.length;d<e;d++)p[c[d]]=c[d]in k;return p.list&&(p.list=!!b.createElement("datalist")&&!!a.HTMLDataListElement),p}("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")),e.inputtypes=function(a){for(var d=0,e,f,h,i=a.length;d<i;d++)k.setAttribute("type",f=a[d]),e=k.type!=="text",e&&(k.value=l,k.style.cssText="position:absolute;visibility:hidden;",/^range$/.test(f)&&k.style.WebkitAppearance!==c?(g.appendChild(k),h=b.defaultView,e=h.getComputedStyle&&h.getComputedStyle(k,null).WebkitAppearance!=="textfield"&&k.offsetHeight!==0,g.removeChild(k)):/^(search|tel)$/.test(f)||(/^(url|email)$/.test(f)?e=k.checkValidity&&k.checkValidity()===!1:e=k.value!=l)),o[a[d]]=!!e;return o}("search tel url email datetime date month week time datetime-local number range color".split(" "))}var d="2.8.3",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k=b.createElement("input"),l=":)",m={}.toString,n={},o={},p={},q=[],r=q.slice,s,t={}.hasOwnProperty,u;!x(t,"undefined")&&!x(t.call,"undefined")?u=function(a,b){return t.call(a,b)}:u=function(a,b){return b in a&&x(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=r.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(r.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(r.call(arguments)))};return e});for(var B in n)u(n,B)&&(s=B.toLowerCase(),e[s]=n[B](),q.push((e[s]?"":"no-")+s));return e.input||A(),e.addTest=function(a,b){if(typeof a=="object")for(var d in a)u(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},v(""),i=k=null,e._version=d,g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+q.join(" "):""),e}(this,this.document),function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))},Modernizr.addTest("cors",!!(window.XMLHttpRequest&&"withCredentials"in new XMLHttpRequest));
define("modernizr", function(){});

/*! jQuery v1.10.2 | (c) 2005, 2013 jQuery Foundation, Inc. | jquery.org/license*/
(function (e, t) {
    var n, r, i = typeof t, o = e.location, a = e.document, s = a.documentElement, l = e.jQuery, u = e.$, c = {}, p = [], f = "1.10.2", d = p.concat, h = p.push, g = p.slice, m = p.indexOf, y = c.toString, v = c.hasOwnProperty, b = f.trim, x = function (e, t) { return new x.fn.init(e, t, r) }, w = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, T = /\S+/g, C = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, N = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, k = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, E = /^[\],:{}\s]*$/, S = /(?:^|:|,)(?:\s*\[)+/g, A = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g, j = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g, D = /^-ms-/, L = /-([\da-z])/gi, H = function (e, t) { return t.toUpperCase() }, q = function (e) { (a.addEventListener || "load" === e.type || "complete" === a.readyState) && (_(), x.ready()) }, _ = function () { a.addEventListener ? (a.removeEventListener("DOMContentLoaded", q, !1), e.removeEventListener("load", q, !1)) : (a.detachEvent("onreadystatechange", q), e.detachEvent("onload", q)) }; x.fn = x.prototype = { jquery: f, constructor: x, init: function (e, n, r) { var i, o; if (!e) return this; if ("string" == typeof e) { if (i = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : N.exec(e), !i || !i[1] && n) return !n || n.jquery ? (n || r).find(e) : this.constructor(n).find(e); if (i[1]) { if (n = n instanceof x ? n[0] : n, x.merge(this, x.parseHTML(i[1], n && n.nodeType ? n.ownerDocument || n : a, !0)), k.test(i[1]) && x.isPlainObject(n)) for (i in n) x.isFunction(this[i]) ? this[i](n[i]) : this.attr(i, n[i]); return this } if (o = a.getElementById(i[2]), o && o.parentNode) { if (o.id !== i[2]) return r.find(e); this.length = 1, this[0] = o } return this.context = a, this.selector = e, this } return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : x.isFunction(e) ? r.ready(e) : (e.selector !== t && (this.selector = e.selector, this.context = e.context), x.makeArray(e, this)) }, selector: "", length: 0, toArray: function () { return g.call(this) }, get: function (e) { return null == e ? this.toArray() : 0 > e ? this[this.length + e] : this[e] }, pushStack: function (e) { var t = x.merge(this.constructor(), e); return t.prevObject = this, t.context = this.context, t }, each: function (e, t) { return x.each(this, e, t) }, ready: function (e) { return x.ready.promise().done(e), this }, slice: function () { return this.pushStack(g.apply(this, arguments)) }, first: function () { return this.eq(0) }, last: function () { return this.eq(-1) }, eq: function (e) { var t = this.length, n = +e + (0 > e ? t : 0); return this.pushStack(n >= 0 && t > n ? [this[n]] : []) }, map: function (e) { return this.pushStack(x.map(this, function (t, n) { return e.call(t, n, t) })) }, end: function () { return this.prevObject || this.constructor(null) }, push: h, sort: [].sort, splice: [].splice }, x.fn.init.prototype = x.fn, x.extend = x.fn.extend = function () { var e, n, r, i, o, a, s = arguments[0] || {}, l = 1, u = arguments.length, c = !1; for ("boolean" == typeof s && (c = s, s = arguments[1] || {}, l = 2), "object" == typeof s || x.isFunction(s) || (s = {}), u === l && (s = this, --l) ; u > l; l++) if (null != (o = arguments[l])) for (i in o) e = s[i], r = o[i], s !== r && (c && r && (x.isPlainObject(r) || (n = x.isArray(r))) ? (n ? (n = !1, a = e && x.isArray(e) ? e : []) : a = e && x.isPlainObject(e) ? e : {}, s[i] = x.extend(c, a, r)) : r !== t && (s[i] = r)); return s }, x.extend({ expando: "jQuery" + (f + Math.random()).replace(/\D/g, ""), noConflict: function (t) { return e.$ === x && (e.$ = u), t && e.jQuery === x && (e.jQuery = l), x }, isReady: !1, readyWait: 1, holdReady: function (e) { e ? x.readyWait++ : x.ready(!0) }, ready: function (e) { if (e === !0 ? !--x.readyWait : !x.isReady) { if (!a.body) return setTimeout(x.ready); x.isReady = !0, e !== !0 && --x.readyWait > 0 || (n.resolveWith(a, [x]), x.fn.trigger && x(a).trigger("ready").off("ready")) } }, isFunction: function (e) { return "function" === x.type(e) }, isArray: Array.isArray || function (e) { return "array" === x.type(e) }, isWindow: function (e) { return null != e && e == e.window }, isNumeric: function (e) { return !isNaN(parseFloat(e)) && isFinite(e) }, type: function (e) { return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? c[y.call(e)] || "object" : typeof e }, isPlainObject: function (e) { var n; if (!e || "object" !== x.type(e) || e.nodeType || x.isWindow(e)) return !1; try { if (e.constructor && !v.call(e, "constructor") && !v.call(e.constructor.prototype, "isPrototypeOf")) return !1 } catch (r) { return !1 } if (x.support.ownLast) for (n in e) return v.call(e, n); for (n in e); return n === t || v.call(e, n) }, isEmptyObject: function (e) { var t; for (t in e) return !1; return !0 }, error: function (e) { throw Error(e) }, parseHTML: function (e, t, n) { if (!e || "string" != typeof e) return null; "boolean" == typeof t && (n = t, t = !1), t = t || a; var r = k.exec(e), i = !n && []; return r ? [t.createElement(r[1])] : (r = x.buildFragment([e], t, i), i && x(i).remove(), x.merge([], r.childNodes)) }, parseJSON: function (n) { return e.JSON && e.JSON.parse ? e.JSON.parse(n) : null === n ? n : "string" == typeof n && (n = x.trim(n), n && E.test(n.replace(A, "@").replace(j, "]").replace(S, ""))) ? Function("return " + n)() : (x.error("Invalid JSON: " + n), t) }, parseXML: function (n) { var r, i; if (!n || "string" != typeof n) return null; try { e.DOMParser ? (i = new DOMParser, r = i.parseFromString(n, "text/xml")) : (r = new ActiveXObject("Microsoft.XMLDOM"), r.async = "false", r.loadXML(n)) } catch (o) { r = t } return r && r.documentElement && !r.getElementsByTagName("parsererror").length || x.error("Invalid XML: " + n), r }, noop: function () { }, globalEval: function (t) { t && x.trim(t) && (e.execScript || function (t) { e.eval.call(e, t) })(t) }, camelCase: function (e) { return e.replace(D, "ms-").replace(L, H) }, nodeName: function (e, t) { return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase() }, each: function (e, t, n) { var r, i = 0, o = e.length, a = M(e); if (n) { if (a) { for (; o > i; i++) if (r = t.apply(e[i], n), r === !1) break } else for (i in e) if (r = t.apply(e[i], n), r === !1) break } else if (a) { for (; o > i; i++) if (r = t.call(e[i], i, e[i]), r === !1) break } else for (i in e) if (r = t.call(e[i], i, e[i]), r === !1) break; return e }, trim: b && !b.call("\ufeff\u00a0") ? function (e) { return null == e ? "" : b.call(e) } : function (e) { return null == e ? "" : (e + "").replace(C, "") }, makeArray: function (e, t) { var n = t || []; return null != e && (M(Object(e)) ? x.merge(n, "string" == typeof e ? [e] : e) : h.call(n, e)), n }, inArray: function (e, t, n) { var r; if (t) { if (m) return m.call(t, e, n); for (r = t.length, n = n ? 0 > n ? Math.max(0, r + n) : n : 0; r > n; n++) if (n in t && t[n] === e) return n } return -1 }, merge: function (e, n) { var r = n.length, i = e.length, o = 0; if ("number" == typeof r) for (; r > o; o++) e[i++] = n[o]; else while (n[o] !== t) e[i++] = n[o++]; return e.length = i, e }, grep: function (e, t, n) { var r, i = [], o = 0, a = e.length; for (n = !!n; a > o; o++) r = !!t(e[o], o), n !== r && i.push(e[o]); return i }, map: function (e, t, n) { var r, i = 0, o = e.length, a = M(e), s = []; if (a) for (; o > i; i++) r = t(e[i], i, n), null != r && (s[s.length] = r); else for (i in e) r = t(e[i], i, n), null != r && (s[s.length] = r); return d.apply([], s) }, guid: 1, proxy: function (e, n) { var r, i, o; return "string" == typeof n && (o = e[n], n = e, e = o), x.isFunction(e) ? (r = g.call(arguments, 2), i = function () { return e.apply(n || this, r.concat(g.call(arguments))) }, i.guid = e.guid = e.guid || x.guid++, i) : t }, access: function (e, n, r, i, o, a, s) { var l = 0, u = e.length, c = null == r; if ("object" === x.type(r)) { o = !0; for (l in r) x.access(e, n, l, r[l], !0, a, s) } else if (i !== t && (o = !0, x.isFunction(i) || (s = !0), c && (s ? (n.call(e, i), n = null) : (c = n, n = function (e, t, n) { return c.call(x(e), n) })), n)) for (; u > l; l++) n(e[l], r, s ? i : i.call(e[l], l, n(e[l], r))); return o ? e : c ? n.call(e) : u ? n(e[0], r) : a }, now: function () { return (new Date).getTime() }, swap: function (e, t, n, r) { var i, o, a = {}; for (o in t) a[o] = e.style[o], e.style[o] = t[o]; i = n.apply(e, r || []); for (o in t) e.style[o] = a[o]; return i } }), x.ready.promise = function (t) { if (!n) if (n = x.Deferred(), "complete" === a.readyState) setTimeout(x.ready); else if (a.addEventListener) a.addEventListener("DOMContentLoaded", q, !1), e.addEventListener("load", q, !1); else { a.attachEvent("onreadystatechange", q), e.attachEvent("onload", q); var r = !1; try { r = null == e.frameElement && a.documentElement } catch (i) { } r && r.doScroll && function o() { if (!x.isReady) { try { r.doScroll("left") } catch (e) { return setTimeout(o, 50) } _(), x.ready() } }() } return n.promise(t) }, x.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (e, t) { c["[object " + t + "]"] = t.toLowerCase() }); function M(e) { var t = e.length, n = x.type(e); return x.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === n || "function" !== n && (0 === t || "number" == typeof t && t > 0 && t - 1 in e) } r = x(a), function (e, t) { var n, r, i, o, a, s, l, u, c, p, f, d, h, g, m, y, v, b = "sizzle" + -new Date, w = e.document, T = 0, C = 0, N = st(), k = st(), E = st(), S = !1, A = function (e, t) { return e === t ? (S = !0, 0) : 0 }, j = typeof t, D = 1 << 31, L = {}.hasOwnProperty, H = [], q = H.pop, _ = H.push, M = H.push, O = H.slice, F = H.indexOf || function (e) { var t = 0, n = this.length; for (; n > t; t++) if (this[t] === e) return t; return -1 }, B = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", P = "[\\x20\\t\\r\\n\\f]", R = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", W = R.replace("w", "w#"), $ = "\\[" + P + "*(" + R + ")" + P + "*(?:([*^$|!~]?=)" + P + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + W + ")|)|)" + P + "*\\]", I = ":(" + R + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + $.replace(3, 8) + ")*)|.*)\\)|)", z = RegExp("^" + P + "+|((?:^|[^\\\\])(?:\\\\.)*)" + P + "+$", "g"), X = RegExp("^" + P + "*," + P + "*"), U = RegExp("^" + P + "*([>+~]|" + P + ")" + P + "*"), V = RegExp(P + "*[+~]"), Y = RegExp("=" + P + "*([^\\]'\"]*)" + P + "*\\]", "g"), J = RegExp(I), G = RegExp("^" + W + "$"), Q = { ID: RegExp("^#(" + R + ")"), CLASS: RegExp("^\\.(" + R + ")"), TAG: RegExp("^(" + R.replace("w", "w*") + ")"), ATTR: RegExp("^" + $), PSEUDO: RegExp("^" + I), CHILD: RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + P + "*(even|odd|(([+-]|)(\\d*)n|)" + P + "*(?:([+-]|)" + P + "*(\\d+)|))" + P + "*\\)|)", "i"), bool: RegExp("^(?:" + B + ")$", "i"), needsContext: RegExp("^" + P + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + P + "*((?:-\\d)?\\d*)" + P + "*\\)|)(?=[^-]|$)", "i") }, K = /^[^{]+\{\s*\[native \w/, Z = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, et = /^(?:input|select|textarea|button)$/i, tt = /^h\d$/i, nt = /'|\\/g, rt = RegExp("\\\\([\\da-f]{1,6}" + P + "?|(" + P + ")|.)", "ig"), it = function (e, t, n) { var r = "0x" + t - 65536; return r !== r || n ? t : 0 > r ? String.fromCharCode(r + 65536) : String.fromCharCode(55296 | r >> 10, 56320 | 1023 & r) }; try { M.apply(H = O.call(w.childNodes), w.childNodes), H[w.childNodes.length].nodeType } catch (ot) { M = { apply: H.length ? function (e, t) { _.apply(e, O.call(t)) } : function (e, t) { var n = e.length, r = 0; while (e[n++] = t[r++]); e.length = n - 1 } } } function at(e, t, n, i) { var o, a, s, l, u, c, d, m, y, x; if ((t ? t.ownerDocument || t : w) !== f && p(t), t = t || f, n = n || [], !e || "string" != typeof e) return n; if (1 !== (l = t.nodeType) && 9 !== l) return []; if (h && !i) { if (o = Z.exec(e)) if (s = o[1]) { if (9 === l) { if (a = t.getElementById(s), !a || !a.parentNode) return n; if (a.id === s) return n.push(a), n } else if (t.ownerDocument && (a = t.ownerDocument.getElementById(s)) && v(t, a) && a.id === s) return n.push(a), n } else { if (o[2]) return M.apply(n, t.getElementsByTagName(e)), n; if ((s = o[3]) && r.getElementsByClassName && t.getElementsByClassName) return M.apply(n, t.getElementsByClassName(s)), n } if (r.qsa && (!g || !g.test(e))) { if (m = d = b, y = t, x = 9 === l && e, 1 === l && "object" !== t.nodeName.toLowerCase()) { c = mt(e), (d = t.getAttribute("id")) ? m = d.replace(nt, "\\$&") : t.setAttribute("id", m), m = "[id='" + m + "'] ", u = c.length; while (u--) c[u] = m + yt(c[u]); y = V.test(e) && t.parentNode || t, x = c.join(",") } if (x) try { return M.apply(n, y.querySelectorAll(x)), n } catch (T) { } finally { d || t.removeAttribute("id") } } } return kt(e.replace(z, "$1"), t, n, i) } function st() { var e = []; function t(n, r) { return e.push(n += " ") > o.cacheLength && delete t[e.shift()], t[n] = r } return t } function lt(e) { return e[b] = !0, e } function ut(e) { var t = f.createElement("div"); try { return !!e(t) } catch (n) { return !1 } finally { t.parentNode && t.parentNode.removeChild(t), t = null } } function ct(e, t) { var n = e.split("|"), r = e.length; while (r--) o.attrHandle[n[r]] = t } function pt(e, t) { var n = t && e, r = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || D) - (~e.sourceIndex || D); if (r) return r; if (n) while (n = n.nextSibling) if (n === t) return -1; return e ? 1 : -1 } function ft(e) { return function (t) { var n = t.nodeName.toLowerCase(); return "input" === n && t.type === e } } function dt(e) { return function (t) { var n = t.nodeName.toLowerCase(); return ("input" === n || "button" === n) && t.type === e } } function ht(e) { return lt(function (t) { return t = +t, lt(function (n, r) { var i, o = e([], n.length, t), a = o.length; while (a--) n[i = o[a]] && (n[i] = !(r[i] = n[i])) }) }) } s = at.isXML = function (e) { var t = e && (e.ownerDocument || e).documentElement; return t ? "HTML" !== t.nodeName : !1 }, r = at.support = {}, p = at.setDocument = function (e) { var n = e ? e.ownerDocument || e : w, i = n.defaultView; return n !== f && 9 === n.nodeType && n.documentElement ? (f = n, d = n.documentElement, h = !s(n), i && i.attachEvent && i !== i.top && i.attachEvent("onbeforeunload", function () { p() }), r.attributes = ut(function (e) { return e.className = "i", !e.getAttribute("className") }), r.getElementsByTagName = ut(function (e) { return e.appendChild(n.createComment("")), !e.getElementsByTagName("*").length }), r.getElementsByClassName = ut(function (e) { return e.innerHTML = "<div class='a'></div><div class='a i'></div>", e.firstChild.className = "i", 2 === e.getElementsByClassName("i").length }), r.getById = ut(function (e) { return d.appendChild(e).id = b, !n.getElementsByName || !n.getElementsByName(b).length }), r.getById ? (o.find.ID = function (e, t) { if (typeof t.getElementById !== j && h) { var n = t.getElementById(e); return n && n.parentNode ? [n] : [] } }, o.filter.ID = function (e) { var t = e.replace(rt, it); return function (e) { return e.getAttribute("id") === t } }) : (delete o.find.ID, o.filter.ID = function (e) { var t = e.replace(rt, it); return function (e) { var n = typeof e.getAttributeNode !== j && e.getAttributeNode("id"); return n && n.value === t } }), o.find.TAG = r.getElementsByTagName ? function (e, n) { return typeof n.getElementsByTagName !== j ? n.getElementsByTagName(e) : t } : function (e, t) { var n, r = [], i = 0, o = t.getElementsByTagName(e); if ("*" === e) { while (n = o[i++]) 1 === n.nodeType && r.push(n); return r } return o }, o.find.CLASS = r.getElementsByClassName && function (e, n) { return typeof n.getElementsByClassName !== j && h ? n.getElementsByClassName(e) : t }, m = [], g = [], (r.qsa = K.test(n.querySelectorAll)) && (ut(function (e) { e.innerHTML = "<select><option selected=''></option></select>", e.querySelectorAll("[selected]").length || g.push("\\[" + P + "*(?:value|" + B + ")"), e.querySelectorAll(":checked").length || g.push(":checked") }), ut(function (e) { var t = n.createElement("input"); t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("t", ""), e.querySelectorAll("[t^='']").length && g.push("[*^$]=" + P + "*(?:''|\"\")"), e.querySelectorAll(":enabled").length || g.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), g.push(",.*:") })), (r.matchesSelector = K.test(y = d.webkitMatchesSelector || d.mozMatchesSelector || d.oMatchesSelector || d.msMatchesSelector)) && ut(function (e) { r.disconnectedMatch = y.call(e, "div"), y.call(e, "[s!='']:x"), m.push("!=", I) }), g = g.length && RegExp(g.join("|")), m = m.length && RegExp(m.join("|")), v = K.test(d.contains) || d.compareDocumentPosition ? function (e, t) { var n = 9 === e.nodeType ? e.documentElement : e, r = t && t.parentNode; return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r))) } : function (e, t) { if (t) while (t = t.parentNode) if (t === e) return !0; return !1 }, A = d.compareDocumentPosition ? function (e, t) { if (e === t) return S = !0, 0; var i = t.compareDocumentPosition && e.compareDocumentPosition && e.compareDocumentPosition(t); return i ? 1 & i || !r.sortDetached && t.compareDocumentPosition(e) === i ? e === n || v(w, e) ? -1 : t === n || v(w, t) ? 1 : c ? F.call(c, e) - F.call(c, t) : 0 : 4 & i ? -1 : 1 : e.compareDocumentPosition ? -1 : 1 } : function (e, t) { var r, i = 0, o = e.parentNode, a = t.parentNode, s = [e], l = [t]; if (e === t) return S = !0, 0; if (!o || !a) return e === n ? -1 : t === n ? 1 : o ? -1 : a ? 1 : c ? F.call(c, e) - F.call(c, t) : 0; if (o === a) return pt(e, t); r = e; while (r = r.parentNode) s.unshift(r); r = t; while (r = r.parentNode) l.unshift(r); while (s[i] === l[i]) i++; return i ? pt(s[i], l[i]) : s[i] === w ? -1 : l[i] === w ? 1 : 0 }, n) : f }, at.matches = function (e, t) { return at(e, null, null, t) }, at.matchesSelector = function (e, t) { if ((e.ownerDocument || e) !== f && p(e), t = t.replace(Y, "='$1']"), !(!r.matchesSelector || !h || m && m.test(t) || g && g.test(t))) try { var n = y.call(e, t); if (n || r.disconnectedMatch || e.document && 11 !== e.document.nodeType) return n } catch (i) { } return at(t, f, null, [e]).length > 0 }, at.contains = function (e, t) { return (e.ownerDocument || e) !== f && p(e), v(e, t) }, at.attr = function (e, n) { (e.ownerDocument || e) !== f && p(e); var i = o.attrHandle[n.toLowerCase()], a = i && L.call(o.attrHandle, n.toLowerCase()) ? i(e, n, !h) : t; return a === t ? r.attributes || !h ? e.getAttribute(n) : (a = e.getAttributeNode(n)) && a.specified ? a.value : null : a }, at.error = function (e) { throw Error("Syntax error, unrecognized expression: " + e) }, at.uniqueSort = function (e) { var t, n = [], i = 0, o = 0; if (S = !r.detectDuplicates, c = !r.sortStable && e.slice(0), e.sort(A), S) { while (t = e[o++]) t === e[o] && (i = n.push(o)); while (i--) e.splice(n[i], 1) } return e }, a = at.getText = function (e) { var t, n = "", r = 0, i = e.nodeType; if (i) { if (1 === i || 9 === i || 11 === i) { if ("string" == typeof e.textContent) return e.textContent; for (e = e.firstChild; e; e = e.nextSibling) n += a(e) } else if (3 === i || 4 === i) return e.nodeValue } else for (; t = e[r]; r++) n += a(t); return n }, o = at.selectors = { cacheLength: 50, createPseudo: lt, match: Q, attrHandle: {}, find: {}, relative: { ">": { dir: "parentNode", first: !0 }, " ": { dir: "parentNode" }, "+": { dir: "previousSibling", first: !0 }, "~": { dir: "previousSibling" } }, preFilter: { ATTR: function (e) { return e[1] = e[1].replace(rt, it), e[3] = (e[4] || e[5] || "").replace(rt, it), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4) }, CHILD: function (e) { return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || at.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && at.error(e[0]), e }, PSEUDO: function (e) { var n, r = !e[5] && e[2]; return Q.CHILD.test(e[0]) ? null : (e[3] && e[4] !== t ? e[2] = e[4] : r && J.test(r) && (n = mt(r, !0)) && (n = r.indexOf(")", r.length - n) - r.length) && (e[0] = e[0].slice(0, n), e[2] = r.slice(0, n)), e.slice(0, 3)) } }, filter: { TAG: function (e) { var t = e.replace(rt, it).toLowerCase(); return "*" === e ? function () { return !0 } : function (e) { return e.nodeName && e.nodeName.toLowerCase() === t } }, CLASS: function (e) { var t = N[e + " "]; return t || (t = RegExp("(^|" + P + ")" + e + "(" + P + "|$)")) && N(e, function (e) { return t.test("string" == typeof e.className && e.className || typeof e.getAttribute !== j && e.getAttribute("class") || "") }) }, ATTR: function (e, t, n) { return function (r) { var i = at.attr(r, e); return null == i ? "!=" === t : t ? (i += "", "=" === t ? i === n : "!=" === t ? i !== n : "^=" === t ? n && 0 === i.indexOf(n) : "*=" === t ? n && i.indexOf(n) > -1 : "$=" === t ? n && i.slice(-n.length) === n : "~=" === t ? (" " + i + " ").indexOf(n) > -1 : "|=" === t ? i === n || i.slice(0, n.length + 1) === n + "-" : !1) : !0 } }, CHILD: function (e, t, n, r, i) { var o = "nth" !== e.slice(0, 3), a = "last" !== e.slice(-4), s = "of-type" === t; return 1 === r && 0 === i ? function (e) { return !!e.parentNode } : function (t, n, l) { var u, c, p, f, d, h, g = o !== a ? "nextSibling" : "previousSibling", m = t.parentNode, y = s && t.nodeName.toLowerCase(), v = !l && !s; if (m) { if (o) { while (g) { p = t; while (p = p[g]) if (s ? p.nodeName.toLowerCase() === y : 1 === p.nodeType) return !1; h = g = "only" === e && !h && "nextSibling" } return !0 } if (h = [a ? m.firstChild : m.lastChild], a && v) { c = m[b] || (m[b] = {}), u = c[e] || [], d = u[0] === T && u[1], f = u[0] === T && u[2], p = d && m.childNodes[d]; while (p = ++d && p && p[g] || (f = d = 0) || h.pop()) if (1 === p.nodeType && ++f && p === t) { c[e] = [T, d, f]; break } } else if (v && (u = (t[b] || (t[b] = {}))[e]) && u[0] === T) f = u[1]; else while (p = ++d && p && p[g] || (f = d = 0) || h.pop()) if ((s ? p.nodeName.toLowerCase() === y : 1 === p.nodeType) && ++f && (v && ((p[b] || (p[b] = {}))[e] = [T, f]), p === t)) break; return f -= i, f === r || 0 === f % r && f / r >= 0 } } }, PSEUDO: function (e, t) { var n, r = o.pseudos[e] || o.setFilters[e.toLowerCase()] || at.error("unsupported pseudo: " + e); return r[b] ? r(t) : r.length > 1 ? (n = [e, e, "", t], o.setFilters.hasOwnProperty(e.toLowerCase()) ? lt(function (e, n) { var i, o = r(e, t), a = o.length; while (a--) i = F.call(e, o[a]), e[i] = !(n[i] = o[a]) }) : function (e) { return r(e, 0, n) }) : r } }, pseudos: { not: lt(function (e) { var t = [], n = [], r = l(e.replace(z, "$1")); return r[b] ? lt(function (e, t, n, i) { var o, a = r(e, null, i, []), s = e.length; while (s--) (o = a[s]) && (e[s] = !(t[s] = o)) }) : function (e, i, o) { return t[0] = e, r(t, null, o, n), !n.pop() } }), has: lt(function (e) { return function (t) { return at(e, t).length > 0 } }), contains: lt(function (e) { return function (t) { return (t.textContent || t.innerText || a(t)).indexOf(e) > -1 } }), lang: lt(function (e) { return G.test(e || "") || at.error("unsupported lang: " + e), e = e.replace(rt, it).toLowerCase(), function (t) { var n; do if (n = h ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return n = n.toLowerCase(), n === e || 0 === n.indexOf(e + "-"); while ((t = t.parentNode) && 1 === t.nodeType); return !1 } }), target: function (t) { var n = e.location && e.location.hash; return n && n.slice(1) === t.id }, root: function (e) { return e === d }, focus: function (e) { return e === f.activeElement && (!f.hasFocus || f.hasFocus()) && !!(e.type || e.href || ~e.tabIndex) }, enabled: function (e) { return e.disabled === !1 }, disabled: function (e) { return e.disabled === !0 }, checked: function (e) { var t = e.nodeName.toLowerCase(); return "input" === t && !!e.checked || "option" === t && !!e.selected }, selected: function (e) { return e.parentNode && e.parentNode.selectedIndex, e.selected === !0 }, empty: function (e) { for (e = e.firstChild; e; e = e.nextSibling) if (e.nodeName > "@" || 3 === e.nodeType || 4 === e.nodeType) return !1; return !0 }, parent: function (e) { return !o.pseudos.empty(e) }, header: function (e) { return tt.test(e.nodeName) }, input: function (e) { return et.test(e.nodeName) }, button: function (e) { var t = e.nodeName.toLowerCase(); return "input" === t && "button" === e.type || "button" === t }, text: function (e) { var t; return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || t.toLowerCase() === e.type) }, first: ht(function () { return [0] }), last: ht(function (e, t) { return [t - 1] }), eq: ht(function (e, t, n) { return [0 > n ? n + t : n] }), even: ht(function (e, t) { var n = 0; for (; t > n; n += 2) e.push(n); return e }), odd: ht(function (e, t) { var n = 1; for (; t > n; n += 2) e.push(n); return e }), lt: ht(function (e, t, n) { var r = 0 > n ? n + t : n; for (; --r >= 0;) e.push(r); return e }), gt: ht(function (e, t, n) { var r = 0 > n ? n + t : n; for (; t > ++r;) e.push(r); return e }) } }, o.pseudos.nth = o.pseudos.eq; for (n in { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }) o.pseudos[n] = ft(n); for (n in { submit: !0, reset: !0 }) o.pseudos[n] = dt(n); function gt() { } gt.prototype = o.filters = o.pseudos, o.setFilters = new gt; function mt(e, t) { var n, r, i, a, s, l, u, c = k[e + " "]; if (c) return t ? 0 : c.slice(0); s = e, l = [], u = o.preFilter; while (s) { (!n || (r = X.exec(s))) && (r && (s = s.slice(r[0].length) || s), l.push(i = [])), n = !1, (r = U.exec(s)) && (n = r.shift(), i.push({ value: n, type: r[0].replace(z, " ") }), s = s.slice(n.length)); for (a in o.filter) !(r = Q[a].exec(s)) || u[a] && !(r = u[a](r)) || (n = r.shift(), i.push({ value: n, type: a, matches: r }), s = s.slice(n.length)); if (!n) break } return t ? s.length : s ? at.error(e) : k(e, l).slice(0) } function yt(e) { var t = 0, n = e.length, r = ""; for (; n > t; t++) r += e[t].value; return r } function vt(e, t, n) { var r = t.dir, o = n && "parentNode" === r, a = C++; return t.first ? function (t, n, i) { while (t = t[r]) if (1 === t.nodeType || o) return e(t, n, i) } : function (t, n, s) { var l, u, c, p = T + " " + a; if (s) { while (t = t[r]) if ((1 === t.nodeType || o) && e(t, n, s)) return !0 } else while (t = t[r]) if (1 === t.nodeType || o) if (c = t[b] || (t[b] = {}), (u = c[r]) && u[0] === p) { if ((l = u[1]) === !0 || l === i) return l === !0 } else if (u = c[r] = [p], u[1] = e(t, n, s) || i, u[1] === !0) return !0 } } function bt(e) { return e.length > 1 ? function (t, n, r) { var i = e.length; while (i--) if (!e[i](t, n, r)) return !1; return !0 } : e[0] } function xt(e, t, n, r, i) { var o, a = [], s = 0, l = e.length, u = null != t; for (; l > s; s++) (o = e[s]) && (!n || n(o, r, i)) && (a.push(o), u && t.push(s)); return a } function wt(e, t, n, r, i, o) { return r && !r[b] && (r = wt(r)), i && !i[b] && (i = wt(i, o)), lt(function (o, a, s, l) { var u, c, p, f = [], d = [], h = a.length, g = o || Nt(t || "*", s.nodeType ? [s] : s, []), m = !e || !o && t ? g : xt(g, f, e, s, l), y = n ? i || (o ? e : h || r) ? [] : a : m; if (n && n(m, y, s, l), r) { u = xt(y, d), r(u, [], s, l), c = u.length; while (c--) (p = u[c]) && (y[d[c]] = !(m[d[c]] = p)) } if (o) { if (i || e) { if (i) { u = [], c = y.length; while (c--) (p = y[c]) && u.push(m[c] = p); i(null, y = [], u, l) } c = y.length; while (c--) (p = y[c]) && (u = i ? F.call(o, p) : f[c]) > -1 && (o[u] = !(a[u] = p)) } } else y = xt(y === a ? y.splice(h, y.length) : y), i ? i(null, a, y, l) : M.apply(a, y) }) } function Tt(e) { var t, n, r, i = e.length, a = o.relative[e[0].type], s = a || o.relative[" "], l = a ? 1 : 0, c = vt(function (e) { return e === t }, s, !0), p = vt(function (e) { return F.call(t, e) > -1 }, s, !0), f = [function (e, n, r) { return !a && (r || n !== u) || ((t = n).nodeType ? c(e, n, r) : p(e, n, r)) }]; for (; i > l; l++) if (n = o.relative[e[l].type]) f = [vt(bt(f), n)]; else { if (n = o.filter[e[l].type].apply(null, e[l].matches), n[b]) { for (r = ++l; i > r; r++) if (o.relative[e[r].type]) break; return wt(l > 1 && bt(f), l > 1 && yt(e.slice(0, l - 1).concat({ value: " " === e[l - 2].type ? "*" : "" })).replace(z, "$1"), n, r > l && Tt(e.slice(l, r)), i > r && Tt(e = e.slice(r)), i > r && yt(e)) } f.push(n) } return bt(f) } function Ct(e, t) { var n = 0, r = t.length > 0, a = e.length > 0, s = function (s, l, c, p, d) { var h, g, m, y = [], v = 0, b = "0", x = s && [], w = null != d, C = u, N = s || a && o.find.TAG("*", d && l.parentNode || l), k = T += null == C ? 1 : Math.random() || .1; for (w && (u = l !== f && l, i = n) ; null != (h = N[b]) ; b++) { if (a && h) { g = 0; while (m = e[g++]) if (m(h, l, c)) { p.push(h); break } w && (T = k, i = ++n) } r && ((h = !m && h) && v--, s && x.push(h)) } if (v += b, r && b !== v) { g = 0; while (m = t[g++]) m(x, y, l, c); if (s) { if (v > 0) while (b--) x[b] || y[b] || (y[b] = q.call(p)); y = xt(y) } M.apply(p, y), w && !s && y.length > 0 && v + t.length > 1 && at.uniqueSort(p) } return w && (T = k, u = C), x }; return r ? lt(s) : s } l = at.compile = function (e, t) { var n, r = [], i = [], o = E[e + " "]; if (!o) { t || (t = mt(e)), n = t.length; while (n--) o = Tt(t[n]), o[b] ? r.push(o) : i.push(o); o = E(e, Ct(i, r)) } return o }; function Nt(e, t, n) { var r = 0, i = t.length; for (; i > r; r++) at(e, t[r], n); return n } function kt(e, t, n, i) { var a, s, u, c, p, f = mt(e); if (!i && 1 === f.length) { if (s = f[0] = f[0].slice(0), s.length > 2 && "ID" === (u = s[0]).type && r.getById && 9 === t.nodeType && h && o.relative[s[1].type]) { if (t = (o.find.ID(u.matches[0].replace(rt, it), t) || [])[0], !t) return n; e = e.slice(s.shift().value.length) } a = Q.needsContext.test(e) ? 0 : s.length; while (a--) { if (u = s[a], o.relative[c = u.type]) break; if ((p = o.find[c]) && (i = p(u.matches[0].replace(rt, it), V.test(s[0].type) && t.parentNode || t))) { if (s.splice(a, 1), e = i.length && yt(s), !e) return M.apply(n, i), n; break } } } return l(e, f)(i, t, !h, n, V.test(e)), n } r.sortStable = b.split("").sort(A).join("") === b, r.detectDuplicates = S, p(), r.sortDetached = ut(function (e) { return 1 & e.compareDocumentPosition(f.createElement("div")) }), ut(function (e) { return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href") }) || ct("type|href|height|width", function (e, n, r) { return r ? t : e.getAttribute(n, "type" === n.toLowerCase() ? 1 : 2) }), r.attributes && ut(function (e) { return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value") }) || ct("value", function (e, n, r) { return r || "input" !== e.nodeName.toLowerCase() ? t : e.defaultValue }), ut(function (e) { return null == e.getAttribute("disabled") }) || ct(B, function (e, n, r) { var i; return r ? t : (i = e.getAttributeNode(n)) && i.specified ? i.value : e[n] === !0 ? n.toLowerCase() : null }), x.find = at, x.expr = at.selectors, x.expr[":"] = x.expr.pseudos, x.unique = at.uniqueSort, x.text = at.getText, x.isXMLDoc = at.isXML, x.contains = at.contains }(e); var O = {}; function F(e) { var t = O[e] = {}; return x.each(e.match(T) || [], function (e, n) { t[n] = !0 }), t } x.Callbacks = function (e) { e = "string" == typeof e ? O[e] || F(e) : x.extend({}, e); var n, r, i, o, a, s, l = [], u = !e.once && [], c = function (t) { for (r = e.memory && t, i = !0, a = s || 0, s = 0, o = l.length, n = !0; l && o > a; a++) if (l[a].apply(t[0], t[1]) === !1 && e.stopOnFalse) { r = !1; break } n = !1, l && (u ? u.length && c(u.shift()) : r ? l = [] : p.disable()) }, p = { add: function () { if (l) { var t = l.length; (function i(t) { x.each(t, function (t, n) { var r = x.type(n); "function" === r ? e.unique && p.has(n) || l.push(n) : n && n.length && "string" !== r && i(n) }) })(arguments), n ? o = l.length : r && (s = t, c(r)) } return this }, remove: function () { return l && x.each(arguments, function (e, t) { var r; while ((r = x.inArray(t, l, r)) > -1) l.splice(r, 1), n && (o >= r && o--, a >= r && a--) }), this }, has: function (e) { return e ? x.inArray(e, l) > -1 : !(!l || !l.length) }, empty: function () { return l = [], o = 0, this }, disable: function () { return l = u = r = t, this }, disabled: function () { return !l }, lock: function () { return u = t, r || p.disable(), this }, locked: function () { return !u }, fireWith: function (e, t) { return !l || i && !u || (t = t || [], t = [e, t.slice ? t.slice() : t], n ? u.push(t) : c(t)), this }, fire: function () { return p.fireWith(this, arguments), this }, fired: function () { return !!i } }; return p }, x.extend({ Deferred: function (e) { var t = [["resolve", "done", x.Callbacks("once memory"), "resolved"], ["reject", "fail", x.Callbacks("once memory"), "rejected"], ["notify", "progress", x.Callbacks("memory")]], n = "pending", r = { state: function () { return n }, always: function () { return i.done(arguments).fail(arguments), this }, then: function () { var e = arguments; return x.Deferred(function (n) { x.each(t, function (t, o) { var a = o[0], s = x.isFunction(e[t]) && e[t]; i[o[1]](function () { var e = s && s.apply(this, arguments); e && x.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[a + "With"](this === r ? n.promise() : this, s ? [e] : arguments) }) }), e = null }).promise() }, promise: function (e) { return null != e ? x.extend(e, r) : r } }, i = {}; return r.pipe = r.then, x.each(t, function (e, o) { var a = o[2], s = o[3]; r[o[1]] = a.add, s && a.add(function () { n = s }, t[1 ^ e][2].disable, t[2][2].lock), i[o[0]] = function () { return i[o[0] + "With"](this === i ? r : this, arguments), this }, i[o[0] + "With"] = a.fireWith }), r.promise(i), e && e.call(i, i), i }, when: function (e) { var t = 0, n = g.call(arguments), r = n.length, i = 1 !== r || e && x.isFunction(e.promise) ? r : 0, o = 1 === i ? e : x.Deferred(), a = function (e, t, n) { return function (r) { t[e] = this, n[e] = arguments.length > 1 ? g.call(arguments) : r, n === s ? o.notifyWith(t, n) : --i || o.resolveWith(t, n) } }, s, l, u; if (r > 1) for (s = Array(r), l = Array(r), u = Array(r) ; r > t; t++) n[t] && x.isFunction(n[t].promise) ? n[t].promise().done(a(t, u, n)).fail(o.reject).progress(a(t, l, s)) : --i; return i || o.resolveWith(u, n), o.promise() } }), x.support = function (t) {
        var n, r, o, s, l, u, c, p, f, d = a.createElement("div"); if (d.setAttribute("className", "t"), d.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", n = d.getElementsByTagName("*") || [], r = d.getElementsByTagName("a")[0], !r || !r.style || !n.length) return t; s = a.createElement("select"), u = s.appendChild(a.createElement("option")), o = d.getElementsByTagName("input")[0], r.style.cssText = "top:1px;float:left;opacity:.5", t.getSetAttribute = "t" !== d.className, t.leadingWhitespace = 3 === d.firstChild.nodeType, t.tbody = !d.getElementsByTagName("tbody").length, t.htmlSerialize = !!d.getElementsByTagName("link").length, t.style = /top/.test(r.getAttribute("style")), t.hrefNormalized = "/a" === r.getAttribute("href"), t.opacity = /^0.5/.test(r.style.opacity), t.cssFloat = !!r.style.cssFloat, t.checkOn = !!o.value, t.optSelected = u.selected, t.enctype = !!a.createElement("form").enctype, t.html5Clone = "<:nav></:nav>" !== a.createElement("nav").cloneNode(!0).outerHTML, t.inlineBlockNeedsLayout = !1, t.shrinkWrapBlocks = !1, t.pixelPosition = !1, t.deleteExpando = !0, t.noCloneEvent = !0, t.reliableMarginRight = !0, t.boxSizingReliable = !0, o.checked = !0, t.noCloneChecked = o.cloneNode(!0).checked, s.disabled = !0, t.optDisabled = !u.disabled; try { delete d.test } catch (h) { t.deleteExpando = !1 } o = a.createElement("input"), o.setAttribute("value", ""), t.input = "" === o.getAttribute("value"), o.value = "t", o.setAttribute("type", "radio"), t.radioValue = "t" === o.value, o.setAttribute("checked", "t"), o.setAttribute("name", "t"), l = a.createDocumentFragment(), l.appendChild(o), t.appendChecked = o.checked, t.checkClone = l.cloneNode(!0).cloneNode(!0).lastChild.checked, d.attachEvent && (d.attachEvent("onclick", function () { t.noCloneEvent = !1 }), d.cloneNode(!0).click()); for (f in { submit: !0, change: !0, focusin: !0 }) d.setAttribute(c = "on" + f, "t"), t[f + "Bubbles"] = c in e || d.attributes[c].expando === !1; d.style.backgroundClip = "content-box", d.cloneNode(!0).style.backgroundClip = "", t.clearCloneStyle = "content-box" === d.style.backgroundClip; for (f in x(t)) break; return t.ownLast = "0" !== f, x(function () { var n, r, o, s = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;", l = a.getElementsByTagName("body")[0]; l && (n = a.createElement("div"), n.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", l.appendChild(n).appendChild(d), d.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", o = d.getElementsByTagName("td"), o[0].style.cssText = "padding:0;margin:0;border:0;display:none", p = 0 === o[0].offsetHeight, o[0].style.display = "", o[1].style.display = "none", t.reliableHiddenOffsets = p && 0 === o[0].offsetHeight, d.innerHTML = "", d.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", x.swap(l, null != l.style.zoom ? { zoom: 1 } : {}, function () { t.boxSizing = 4 === d.offsetWidth }), e.getComputedStyle && (t.pixelPosition = "1%" !== (e.getComputedStyle(d, null) || {}).top, t.boxSizingReliable = "4px" === (e.getComputedStyle(d, null) || { width: "4px" }).width, r = d.appendChild(a.createElement("div")), r.style.cssText = d.style.cssText = s, r.style.marginRight = r.style.width = "0", d.style.width = "1px", t.reliableMarginRight = !parseFloat((e.getComputedStyle(r, null) || {}).marginRight)), typeof d.style.zoom !== i && (d.innerHTML = "", d.style.cssText = s + "width:1px;padding:1px;display:inline;zoom:1", t.inlineBlockNeedsLayout = 3 === d.offsetWidth, d.style.display = "block", d.innerHTML = "<div></div>", d.firstChild.style.width = "5px", t.shrinkWrapBlocks = 3 !== d.offsetWidth, t.inlineBlockNeedsLayout && (l.style.zoom = 1)), l.removeChild(n), n = d = o = r = null) }), n = s = l = u = r = o = null, t
    }({}); var B = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/, P = /([A-Z])/g; function R(e, n, r, i) { if (x.acceptData(e)) { var o, a, s = x.expando, l = e.nodeType, u = l ? x.cache : e, c = l ? e[s] : e[s] && s; if (c && u[c] && (i || u[c].data) || r !== t || "string" != typeof n) return c || (c = l ? e[s] = p.pop() || x.guid++ : s), u[c] || (u[c] = l ? {} : { toJSON: x.noop }), ("object" == typeof n || "function" == typeof n) && (i ? u[c] = x.extend(u[c], n) : u[c].data = x.extend(u[c].data, n)), a = u[c], i || (a.data || (a.data = {}), a = a.data), r !== t && (a[x.camelCase(n)] = r), "string" == typeof n ? (o = a[n], null == o && (o = a[x.camelCase(n)])) : o = a, o } } function W(e, t, n) { if (x.acceptData(e)) { var r, i, o = e.nodeType, a = o ? x.cache : e, s = o ? e[x.expando] : x.expando; if (a[s]) { if (t && (r = n ? a[s] : a[s].data)) { x.isArray(t) ? t = t.concat(x.map(t, x.camelCase)) : t in r ? t = [t] : (t = x.camelCase(t), t = t in r ? [t] : t.split(" ")), i = t.length; while (i--) delete r[t[i]]; if (n ? !I(r) : !x.isEmptyObject(r)) return } (n || (delete a[s].data, I(a[s]))) && (o ? x.cleanData([e], !0) : x.support.deleteExpando || a != a.window ? delete a[s] : a[s] = null) } } } x.extend({ cache: {}, noData: { applet: !0, embed: !0, object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" }, hasData: function (e) { return e = e.nodeType ? x.cache[e[x.expando]] : e[x.expando], !!e && !I(e) }, data: function (e, t, n) { return R(e, t, n) }, removeData: function (e, t) { return W(e, t) }, _data: function (e, t, n) { return R(e, t, n, !0) }, _removeData: function (e, t) { return W(e, t, !0) }, acceptData: function (e) { if (e.nodeType && 1 !== e.nodeType && 9 !== e.nodeType) return !1; var t = e.nodeName && x.noData[e.nodeName.toLowerCase()]; return !t || t !== !0 && e.getAttribute("classid") === t } }), x.fn.extend({ data: function (e, n) { var r, i, o = null, a = 0, s = this[0]; if (e === t) { if (this.length && (o = x.data(s), 1 === s.nodeType && !x._data(s, "parsedAttrs"))) { for (r = s.attributes; r.length > a; a++) i = r[a].name, 0 === i.indexOf("data-") && (i = x.camelCase(i.slice(5)), $(s, i, o[i])); x._data(s, "parsedAttrs", !0) } return o } return "object" == typeof e ? this.each(function () { x.data(this, e) }) : arguments.length > 1 ? this.each(function () { x.data(this, e, n) }) : s ? $(s, e, x.data(s, e)) : null }, removeData: function (e) { return this.each(function () { x.removeData(this, e) }) } }); function $(e, n, r) { if (r === t && 1 === e.nodeType) { var i = "data-" + n.replace(P, "-$1").toLowerCase(); if (r = e.getAttribute(i), "string" == typeof r) { try { r = "true" === r ? !0 : "false" === r ? !1 : "null" === r ? null : +r + "" === r ? +r : B.test(r) ? x.parseJSON(r) : r } catch (o) { } x.data(e, n, r) } else r = t } return r } function I(e) { var t; for (t in e) if (("data" !== t || !x.isEmptyObject(e[t])) && "toJSON" !== t) return !1; return !0 } x.extend({ queue: function (e, n, r) { var i; return e ? (n = (n || "fx") + "queue", i = x._data(e, n), r && (!i || x.isArray(r) ? i = x._data(e, n, x.makeArray(r)) : i.push(r)), i || []) : t }, dequeue: function (e, t) { t = t || "fx"; var n = x.queue(e, t), r = n.length, i = n.shift(), o = x._queueHooks(e, t), a = function () { x.dequeue(e, t) }; "inprogress" === i && (i = n.shift(), r--), i && ("fx" === t && n.unshift("inprogress"), delete o.stop, i.call(e, a, o)), !r && o && o.empty.fire() }, _queueHooks: function (e, t) { var n = t + "queueHooks"; return x._data(e, n) || x._data(e, n, { empty: x.Callbacks("once memory").add(function () { x._removeData(e, t + "queue"), x._removeData(e, n) }) }) } }), x.fn.extend({ queue: function (e, n) { var r = 2; return "string" != typeof e && (n = e, e = "fx", r--), r > arguments.length ? x.queue(this[0], e) : n === t ? this : this.each(function () { var t = x.queue(this, e, n); x._queueHooks(this, e), "fx" === e && "inprogress" !== t[0] && x.dequeue(this, e) }) }, dequeue: function (e) { return this.each(function () { x.dequeue(this, e) }) }, delay: function (e, t) { return e = x.fx ? x.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function (t, n) { var r = setTimeout(t, e); n.stop = function () { clearTimeout(r) } }) }, clearQueue: function (e) { return this.queue(e || "fx", []) }, promise: function (e, n) { var r, i = 1, o = x.Deferred(), a = this, s = this.length, l = function () { --i || o.resolveWith(a, [a]) }; "string" != typeof e && (n = e, e = t), e = e || "fx"; while (s--) r = x._data(a[s], e + "queueHooks"), r && r.empty && (i++, r.empty.add(l)); return l(), o.promise(n) } }); var z, X, U = /[\t\r\n\f]/g, V = /\r/g, Y = /^(?:input|select|textarea|button|object)$/i, J = /^(?:a|area)$/i, G = /^(?:checked|selected)$/i, Q = x.support.getSetAttribute, K = x.support.input; x.fn.extend({ attr: function (e, t) { return x.access(this, x.attr, e, t, arguments.length > 1) }, removeAttr: function (e) { return this.each(function () { x.removeAttr(this, e) }) }, prop: function (e, t) { return x.access(this, x.prop, e, t, arguments.length > 1) }, removeProp: function (e) { return e = x.propFix[e] || e, this.each(function () { try { this[e] = t, delete this[e] } catch (n) { } }) }, addClass: function (e) { var t, n, r, i, o, a = 0, s = this.length, l = "string" == typeof e && e; if (x.isFunction(e)) return this.each(function (t) { x(this).addClass(e.call(this, t, this.className)) }); if (l) for (t = (e || "").match(T) || []; s > a; a++) if (n = this[a], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(U, " ") : " ")) { o = 0; while (i = t[o++]) 0 > r.indexOf(" " + i + " ") && (r += i + " "); n.className = x.trim(r) } return this }, removeClass: function (e) { var t, n, r, i, o, a = 0, s = this.length, l = 0 === arguments.length || "string" == typeof e && e; if (x.isFunction(e)) return this.each(function (t) { x(this).removeClass(e.call(this, t, this.className)) }); if (l) for (t = (e || "").match(T) || []; s > a; a++) if (n = this[a], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(U, " ") : "")) { o = 0; while (i = t[o++]) while (r.indexOf(" " + i + " ") >= 0) r = r.replace(" " + i + " ", " "); n.className = e ? x.trim(r) : "" } return this }, toggleClass: function (e, t) { var n = typeof e; return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : x.isFunction(e) ? this.each(function (n) { x(this).toggleClass(e.call(this, n, this.className, t), t) }) : this.each(function () { if ("string" === n) { var t, r = 0, o = x(this), a = e.match(T) || []; while (t = a[r++]) o.hasClass(t) ? o.removeClass(t) : o.addClass(t) } else (n === i || "boolean" === n) && (this.className && x._data(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : x._data(this, "__className__") || "") }) }, hasClass: function (e) { var t = " " + e + " ", n = 0, r = this.length; for (; r > n; n++) if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(U, " ").indexOf(t) >= 0) return !0; return !1 }, val: function (e) { var n, r, i, o = this[0]; { if (arguments.length) return i = x.isFunction(e), this.each(function (n) { var o; 1 === this.nodeType && (o = i ? e.call(this, n, x(this).val()) : e, null == o ? o = "" : "number" == typeof o ? o += "" : x.isArray(o) && (o = x.map(o, function (e) { return null == e ? "" : e + "" })), r = x.valHooks[this.type] || x.valHooks[this.nodeName.toLowerCase()], r && "set" in r && r.set(this, o, "value") !== t || (this.value = o)) }); if (o) return r = x.valHooks[o.type] || x.valHooks[o.nodeName.toLowerCase()], r && "get" in r && (n = r.get(o, "value")) !== t ? n : (n = o.value, "string" == typeof n ? n.replace(V, "") : null == n ? "" : n) } } }), x.extend({ valHooks: { option: { get: function (e) { var t = x.find.attr(e, "value"); return null != t ? t : e.text } }, select: { get: function (e) { var t, n, r = e.options, i = e.selectedIndex, o = "select-one" === e.type || 0 > i, a = o ? null : [], s = o ? i + 1 : r.length, l = 0 > i ? s : o ? i : 0; for (; s > l; l++) if (n = r[l], !(!n.selected && l !== i || (x.support.optDisabled ? n.disabled : null !== n.getAttribute("disabled")) || n.parentNode.disabled && x.nodeName(n.parentNode, "optgroup"))) { if (t = x(n).val(), o) return t; a.push(t) } return a }, set: function (e, t) { var n, r, i = e.options, o = x.makeArray(t), a = i.length; while (a--) r = i[a], (r.selected = x.inArray(x(r).val(), o) >= 0) && (n = !0); return n || (e.selectedIndex = -1), o } } }, attr: function (e, n, r) { var o, a, s = e.nodeType; if (e && 3 !== s && 8 !== s && 2 !== s) return typeof e.getAttribute === i ? x.prop(e, n, r) : (1 === s && x.isXMLDoc(e) || (n = n.toLowerCase(), o = x.attrHooks[n] || (x.expr.match.bool.test(n) ? X : z)), r === t ? o && "get" in o && null !== (a = o.get(e, n)) ? a : (a = x.find.attr(e, n), null == a ? t : a) : null !== r ? o && "set" in o && (a = o.set(e, r, n)) !== t ? a : (e.setAttribute(n, r + ""), r) : (x.removeAttr(e, n), t)) }, removeAttr: function (e, t) { var n, r, i = 0, o = t && t.match(T); if (o && 1 === e.nodeType) while (n = o[i++]) r = x.propFix[n] || n, x.expr.match.bool.test(n) ? K && Q || !G.test(n) ? e[r] = !1 : e[x.camelCase("default-" + n)] = e[r] = !1 : x.attr(e, n, ""), e.removeAttribute(Q ? n : r) }, attrHooks: { type: { set: function (e, t) { if (!x.support.radioValue && "radio" === t && x.nodeName(e, "input")) { var n = e.value; return e.setAttribute("type", t), n && (e.value = n), t } } } }, propFix: { "for": "htmlFor", "class": "className" }, prop: function (e, n, r) { var i, o, a, s = e.nodeType; if (e && 3 !== s && 8 !== s && 2 !== s) return a = 1 !== s || !x.isXMLDoc(e), a && (n = x.propFix[n] || n, o = x.propHooks[n]), r !== t ? o && "set" in o && (i = o.set(e, r, n)) !== t ? i : e[n] = r : o && "get" in o && null !== (i = o.get(e, n)) ? i : e[n] }, propHooks: { tabIndex: { get: function (e) { var t = x.find.attr(e, "tabindex"); return t ? parseInt(t, 10) : Y.test(e.nodeName) || J.test(e.nodeName) && e.href ? 0 : -1 } } } }), X = { set: function (e, t, n) { return t === !1 ? x.removeAttr(e, n) : K && Q || !G.test(n) ? e.setAttribute(!Q && x.propFix[n] || n, n) : e[x.camelCase("default-" + n)] = e[n] = !0, n } }, x.each(x.expr.match.bool.source.match(/\w+/g), function (e, n) { var r = x.expr.attrHandle[n] || x.find.attr; x.expr.attrHandle[n] = K && Q || !G.test(n) ? function (e, n, i) { var o = x.expr.attrHandle[n], a = i ? t : (x.expr.attrHandle[n] = t) != r(e, n, i) ? n.toLowerCase() : null; return x.expr.attrHandle[n] = o, a } : function (e, n, r) { return r ? t : e[x.camelCase("default-" + n)] ? n.toLowerCase() : null } }), K && Q || (x.attrHooks.value = { set: function (e, n, r) { return x.nodeName(e, "input") ? (e.defaultValue = n, t) : z && z.set(e, n, r) } }), Q || (z = { set: function (e, n, r) { var i = e.getAttributeNode(r); return i || e.setAttributeNode(i = e.ownerDocument.createAttribute(r)), i.value = n += "", "value" === r || n === e.getAttribute(r) ? n : t } }, x.expr.attrHandle.id = x.expr.attrHandle.name = x.expr.attrHandle.coords = function (e, n, r) { var i; return r ? t : (i = e.getAttributeNode(n)) && "" !== i.value ? i.value : null }, x.valHooks.button = { get: function (e, n) { var r = e.getAttributeNode(n); return r && r.specified ? r.value : t }, set: z.set }, x.attrHooks.contenteditable = { set: function (e, t, n) { z.set(e, "" === t ? !1 : t, n) } }, x.each(["width", "height"], function (e, n) { x.attrHooks[n] = { set: function (e, r) { return "" === r ? (e.setAttribute(n, "auto"), r) : t } } })), x.support.hrefNormalized || x.each(["href", "src"], function (e, t) { x.propHooks[t] = { get: function (e) { return e.getAttribute(t, 4) } } }), x.support.style || (x.attrHooks.style = { get: function (e) { return e.style.cssText || t }, set: function (e, t) { return e.style.cssText = t + "" } }), x.support.optSelected || (x.propHooks.selected = { get: function (e) { var t = e.parentNode; return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null } }), x.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () { x.propFix[this.toLowerCase()] = this }), x.support.enctype || (x.propFix.enctype = "encoding"), x.each(["radio", "checkbox"], function () { x.valHooks[this] = { set: function (e, n) { return x.isArray(n) ? e.checked = x.inArray(x(e).val(), n) >= 0 : t } }, x.support.checkOn || (x.valHooks[this].get = function (e) { return null === e.getAttribute("value") ? "on" : e.value }) }); var Z = /^(?:input|select|textarea)$/i, et = /^key/, tt = /^(?:mouse|contextmenu)|click/, nt = /^(?:focusinfocus|focusoutblur)$/, rt = /^([^.]*)(?:\.(.+)|)$/; function it() { return !0 } function ot() { return !1 } function at() { try { return a.activeElement } catch (e) { } } x.event = { global: {}, add: function (e, n, r, o, a) { var s, l, u, c, p, f, d, h, g, m, y, v = x._data(e); if (v) { r.handler && (c = r, r = c.handler, a = c.selector), r.guid || (r.guid = x.guid++), (l = v.events) || (l = v.events = {}), (f = v.handle) || (f = v.handle = function (e) { return typeof x === i || e && x.event.triggered === e.type ? t : x.event.dispatch.apply(f.elem, arguments) }, f.elem = e), n = (n || "").match(T) || [""], u = n.length; while (u--) s = rt.exec(n[u]) || [], g = y = s[1], m = (s[2] || "").split(".").sort(), g && (p = x.event.special[g] || {}, g = (a ? p.delegateType : p.bindType) || g, p = x.event.special[g] || {}, d = x.extend({ type: g, origType: y, data: o, handler: r, guid: r.guid, selector: a, needsContext: a && x.expr.match.needsContext.test(a), namespace: m.join(".") }, c), (h = l[g]) || (h = l[g] = [], h.delegateCount = 0, p.setup && p.setup.call(e, o, m, f) !== !1 || (e.addEventListener ? e.addEventListener(g, f, !1) : e.attachEvent && e.attachEvent("on" + g, f))), p.add && (p.add.call(e, d), d.handler.guid || (d.handler.guid = r.guid)), a ? h.splice(h.delegateCount++, 0, d) : h.push(d), x.event.global[g] = !0); e = null } }, remove: function (e, t, n, r, i) { var o, a, s, l, u, c, p, f, d, h, g, m = x.hasData(e) && x._data(e); if (m && (c = m.events)) { t = (t || "").match(T) || [""], u = t.length; while (u--) if (s = rt.exec(t[u]) || [], d = g = s[1], h = (s[2] || "").split(".").sort(), d) { p = x.event.special[d] || {}, d = (r ? p.delegateType : p.bindType) || d, f = c[d] || [], s = s[2] && RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), l = o = f.length; while (o--) a = f[o], !i && g !== a.origType || n && n.guid !== a.guid || s && !s.test(a.namespace) || r && r !== a.selector && ("**" !== r || !a.selector) || (f.splice(o, 1), a.selector && f.delegateCount--, p.remove && p.remove.call(e, a)); l && !f.length && (p.teardown && p.teardown.call(e, h, m.handle) !== !1 || x.removeEvent(e, d, m.handle), delete c[d]) } else for (d in c) x.event.remove(e, d + t[u], n, r, !0); x.isEmptyObject(c) && (delete m.handle, x._removeData(e, "events")) } }, trigger: function (n, r, i, o) { var s, l, u, c, p, f, d, h = [i || a], g = v.call(n, "type") ? n.type : n, m = v.call(n, "namespace") ? n.namespace.split(".") : []; if (u = f = i = i || a, 3 !== i.nodeType && 8 !== i.nodeType && !nt.test(g + x.event.triggered) && (g.indexOf(".") >= 0 && (m = g.split("."), g = m.shift(), m.sort()), l = 0 > g.indexOf(":") && "on" + g, n = n[x.expando] ? n : new x.Event(g, "object" == typeof n && n), n.isTrigger = o ? 2 : 3, n.namespace = m.join("."), n.namespace_re = n.namespace ? RegExp("(^|\\.)" + m.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, n.result = t, n.target || (n.target = i), r = null == r ? [n] : x.makeArray(r, [n]), p = x.event.special[g] || {}, o || !p.trigger || p.trigger.apply(i, r) !== !1)) { if (!o && !p.noBubble && !x.isWindow(i)) { for (c = p.delegateType || g, nt.test(c + g) || (u = u.parentNode) ; u; u = u.parentNode) h.push(u), f = u; f === (i.ownerDocument || a) && h.push(f.defaultView || f.parentWindow || e) } d = 0; while ((u = h[d++]) && !n.isPropagationStopped()) n.type = d > 1 ? c : p.bindType || g, s = (x._data(u, "events") || {})[n.type] && x._data(u, "handle"), s && s.apply(u, r), s = l && u[l], s && x.acceptData(u) && s.apply && s.apply(u, r) === !1 && n.preventDefault(); if (n.type = g, !o && !n.isDefaultPrevented() && (!p._default || p._default.apply(h.pop(), r) === !1) && x.acceptData(i) && l && i[g] && !x.isWindow(i)) { f = i[l], f && (i[l] = null), x.event.triggered = g; try { i[g]() } catch (y) { } x.event.triggered = t, f && (i[l] = f) } return n.result } }, dispatch: function (e) { e = x.event.fix(e); var n, r, i, o, a, s = [], l = g.call(arguments), u = (x._data(this, "events") || {})[e.type] || [], c = x.event.special[e.type] || {}; if (l[0] = e, e.delegateTarget = this, !c.preDispatch || c.preDispatch.call(this, e) !== !1) { s = x.event.handlers.call(this, e, u), n = 0; while ((o = s[n++]) && !e.isPropagationStopped()) { e.currentTarget = o.elem, a = 0; while ((i = o.handlers[a++]) && !e.isImmediatePropagationStopped()) (!e.namespace_re || e.namespace_re.test(i.namespace)) && (e.handleObj = i, e.data = i.data, r = ((x.event.special[i.origType] || {}).handle || i.handler).apply(o.elem, l), r !== t && (e.result = r) === !1 && (e.preventDefault(), e.stopPropagation())) } return c.postDispatch && c.postDispatch.call(this, e), e.result } }, handlers: function (e, n) { var r, i, o, a, s = [], l = n.delegateCount, u = e.target; if (l && u.nodeType && (!e.button || "click" !== e.type)) for (; u != this; u = u.parentNode || this) if (1 === u.nodeType && (u.disabled !== !0 || "click" !== e.type)) { for (o = [], a = 0; l > a; a++) i = n[a], r = i.selector + " ", o[r] === t && (o[r] = i.needsContext ? x(r, this).index(u) >= 0 : x.find(r, this, null, [u]).length), o[r] && o.push(i); o.length && s.push({ elem: u, handlers: o }) } return n.length > l && s.push({ elem: this, handlers: n.slice(l) }), s }, fix: function (e) { if (e[x.expando]) return e; var t, n, r, i = e.type, o = e, s = this.fixHooks[i]; s || (this.fixHooks[i] = s = tt.test(i) ? this.mouseHooks : et.test(i) ? this.keyHooks : {}), r = s.props ? this.props.concat(s.props) : this.props, e = new x.Event(o), t = r.length; while (t--) n = r[t], e[n] = o[n]; return e.target || (e.target = o.srcElement || a), 3 === e.target.nodeType && (e.target = e.target.parentNode), e.metaKey = !!e.metaKey, s.filter ? s.filter(e, o) : e }, props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "), fixHooks: {}, keyHooks: { props: "char charCode key keyCode".split(" "), filter: function (e, t) { return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e } }, mouseHooks: { props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "), filter: function (e, n) { var r, i, o, s = n.button, l = n.fromElement; return null == e.pageX && null != n.clientX && (i = e.target.ownerDocument || a, o = i.documentElement, r = i.body, e.pageX = n.clientX + (o && o.scrollLeft || r && r.scrollLeft || 0) - (o && o.clientLeft || r && r.clientLeft || 0), e.pageY = n.clientY + (o && o.scrollTop || r && r.scrollTop || 0) - (o && o.clientTop || r && r.clientTop || 0)), !e.relatedTarget && l && (e.relatedTarget = l === e.target ? n.toElement : l), e.which || s === t || (e.which = 1 & s ? 1 : 2 & s ? 3 : 4 & s ? 2 : 0), e } }, special: { load: { noBubble: !0 }, focus: { trigger: function () { if (this !== at() && this.focus) try { return this.focus(), !1 } catch (e) { } }, delegateType: "focusin" }, blur: { trigger: function () { return this === at() && this.blur ? (this.blur(), !1) : t }, delegateType: "focusout" }, click: { trigger: function () { return x.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : t }, _default: function (e) { return x.nodeName(e.target, "a") } }, beforeunload: { postDispatch: function (e) { e.result !== t && (e.originalEvent.returnValue = e.result) } } }, simulate: function (e, t, n, r) { var i = x.extend(new x.Event, n, { type: e, isSimulated: !0, originalEvent: {} }); r ? x.event.trigger(i, null, t) : x.event.dispatch.call(t, i), i.isDefaultPrevented() && n.preventDefault() } }, x.removeEvent = a.removeEventListener ? function (e, t, n) { e.removeEventListener && e.removeEventListener(t, n, !1) } : function (e, t, n) { var r = "on" + t; e.detachEvent && (typeof e[r] === i && (e[r] = null), e.detachEvent(r, n)) }, x.Event = function (e, n) { return this instanceof x.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || e.returnValue === !1 || e.getPreventDefault && e.getPreventDefault() ? it : ot) : this.type = e, n && x.extend(this, n), this.timeStamp = e && e.timeStamp || x.now(), this[x.expando] = !0, t) : new x.Event(e, n) }, x.Event.prototype = { isDefaultPrevented: ot, isPropagationStopped: ot, isImmediatePropagationStopped: ot, preventDefault: function () { var e = this.originalEvent; this.isDefaultPrevented = it, e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1) }, stopPropagation: function () { var e = this.originalEvent; this.isPropagationStopped = it, e && (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0) }, stopImmediatePropagation: function () { this.isImmediatePropagationStopped = it, this.stopPropagation() } }, x.each({ mouseenter: "mouseover", mouseleave: "mouseout" }, function (e, t) { x.event.special[e] = { delegateType: t, bindType: t, handle: function (e) { var n, r = this, i = e.relatedTarget, o = e.handleObj; return (!i || i !== r && !x.contains(r, i)) && (e.type = o.origType, n = o.handler.apply(this, arguments), e.type = t), n } } }), x.support.submitBubbles || (x.event.special.submit = { setup: function () { return x.nodeName(this, "form") ? !1 : (x.event.add(this, "click._submit keypress._submit", function (e) { var n = e.target, r = x.nodeName(n, "input") || x.nodeName(n, "button") ? n.form : t; r && !x._data(r, "submitBubbles") && (x.event.add(r, "submit._submit", function (e) { e._submit_bubble = !0 }), x._data(r, "submitBubbles", !0)) }), t) }, postDispatch: function (e) { e._submit_bubble && (delete e._submit_bubble, this.parentNode && !e.isTrigger && x.event.simulate("submit", this.parentNode, e, !0)) }, teardown: function () { return x.nodeName(this, "form") ? !1 : (x.event.remove(this, "._submit"), t) } }), x.support.changeBubbles || (x.event.special.change = { setup: function () { return Z.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (x.event.add(this, "propertychange._change", function (e) { "checked" === e.originalEvent.propertyName && (this._just_changed = !0) }), x.event.add(this, "click._change", function (e) { this._just_changed && !e.isTrigger && (this._just_changed = !1), x.event.simulate("change", this, e, !0) })), !1) : (x.event.add(this, "beforeactivate._change", function (e) { var t = e.target; Z.test(t.nodeName) && !x._data(t, "changeBubbles") && (x.event.add(t, "change._change", function (e) { !this.parentNode || e.isSimulated || e.isTrigger || x.event.simulate("change", this.parentNode, e, !0) }), x._data(t, "changeBubbles", !0)) }), t) }, handle: function (e) { var n = e.target; return this !== n || e.isSimulated || e.isTrigger || "radio" !== n.type && "checkbox" !== n.type ? e.handleObj.handler.apply(this, arguments) : t }, teardown: function () { return x.event.remove(this, "._change"), !Z.test(this.nodeName) } }), x.support.focusinBubbles || x.each({ focus: "focusin", blur: "focusout" }, function (e, t) { var n = 0, r = function (e) { x.event.simulate(t, e.target, x.event.fix(e), !0) }; x.event.special[t] = { setup: function () { 0 === n++ && a.addEventListener(e, r, !0) }, teardown: function () { 0 === --n && a.removeEventListener(e, r, !0) } } }), x.fn.extend({ on: function (e, n, r, i, o) { var a, s; if ("object" == typeof e) { "string" != typeof n && (r = r || n, n = t); for (a in e) this.on(a, n, r, e[a], o); return this } if (null == r && null == i ? (i = n, r = n = t) : null == i && ("string" == typeof n ? (i = r, r = t) : (i = r, r = n, n = t)), i === !1) i = ot; else if (!i) return this; return 1 === o && (s = i, i = function (e) { return x().off(e), s.apply(this, arguments) }, i.guid = s.guid || (s.guid = x.guid++)), this.each(function () { x.event.add(this, e, i, r, n) }) }, one: function (e, t, n, r) { return this.on(e, t, n, r, 1) }, off: function (e, n, r) { var i, o; if (e && e.preventDefault && e.handleObj) return i = e.handleObj, x(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this; if ("object" == typeof e) { for (o in e) this.off(o, n, e[o]); return this } return (n === !1 || "function" == typeof n) && (r = n, n = t), r === !1 && (r = ot), this.each(function () { x.event.remove(this, e, r, n) }) }, trigger: function (e, t) { return this.each(function () { x.event.trigger(e, t, this) }) }, triggerHandler: function (e, n) { var r = this[0]; return r ? x.event.trigger(e, n, r, !0) : t } }); var st = /^.[^:#\[\.,]*$/, lt = /^(?:parents|prev(?:Until|All))/, ut = x.expr.match.needsContext, ct = { children: !0, contents: !0, next: !0, prev: !0 }; x.fn.extend({ find: function (e) { var t, n = [], r = this, i = r.length; if ("string" != typeof e) return this.pushStack(x(e).filter(function () { for (t = 0; i > t; t++) if (x.contains(r[t], this)) return !0 })); for (t = 0; i > t; t++) x.find(e, r[t], n); return n = this.pushStack(i > 1 ? x.unique(n) : n), n.selector = this.selector ? this.selector + " " + e : e, n }, has: function (e) { var t, n = x(e, this), r = n.length; return this.filter(function () { for (t = 0; r > t; t++) if (x.contains(this, n[t])) return !0 }) }, not: function (e) { return this.pushStack(ft(this, e || [], !0)) }, filter: function (e) { return this.pushStack(ft(this, e || [], !1)) }, is: function (e) { return !!ft(this, "string" == typeof e && ut.test(e) ? x(e) : e || [], !1).length }, closest: function (e, t) { var n, r = 0, i = this.length, o = [], a = ut.test(e) || "string" != typeof e ? x(e, t || this.context) : 0; for (; i > r; r++) for (n = this[r]; n && n !== t; n = n.parentNode) if (11 > n.nodeType && (a ? a.index(n) > -1 : 1 === n.nodeType && x.find.matchesSelector(n, e))) { n = o.push(n); break } return this.pushStack(o.length > 1 ? x.unique(o) : o) }, index: function (e) { return e ? "string" == typeof e ? x.inArray(this[0], x(e)) : x.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1 }, add: function (e, t) { var n = "string" == typeof e ? x(e, t) : x.makeArray(e && e.nodeType ? [e] : e), r = x.merge(this.get(), n); return this.pushStack(x.unique(r)) }, addBack: function (e) { return this.add(null == e ? this.prevObject : this.prevObject.filter(e)) } }); function pt(e, t) { do e = e[t]; while (e && 1 !== e.nodeType); return e } x.each({ parent: function (e) { var t = e.parentNode; return t && 11 !== t.nodeType ? t : null }, parents: function (e) { return x.dir(e, "parentNode") }, parentsUntil: function (e, t, n) { return x.dir(e, "parentNode", n) }, next: function (e) { return pt(e, "nextSibling") }, prev: function (e) { return pt(e, "previousSibling") }, nextAll: function (e) { return x.dir(e, "nextSibling") }, prevAll: function (e) { return x.dir(e, "previousSibling") }, nextUntil: function (e, t, n) { return x.dir(e, "nextSibling", n) }, prevUntil: function (e, t, n) { return x.dir(e, "previousSibling", n) }, siblings: function (e) { return x.sibling((e.parentNode || {}).firstChild, e) }, children: function (e) { return x.sibling(e.firstChild) }, contents: function (e) { return x.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : x.merge([], e.childNodes) } }, function (e, t) { x.fn[e] = function (n, r) { var i = x.map(this, t, n); return "Until" !== e.slice(-5) && (r = n), r && "string" == typeof r && (i = x.filter(r, i)), this.length > 1 && (ct[e] || (i = x.unique(i)), lt.test(e) && (i = i.reverse())), this.pushStack(i) } }), x.extend({ filter: function (e, t, n) { var r = t[0]; return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? x.find.matchesSelector(r, e) ? [r] : [] : x.find.matches(e, x.grep(t, function (e) { return 1 === e.nodeType })) }, dir: function (e, n, r) { var i = [], o = e[n]; while (o && 9 !== o.nodeType && (r === t || 1 !== o.nodeType || !x(o).is(r))) 1 === o.nodeType && i.push(o), o = o[n]; return i }, sibling: function (e, t) { var n = []; for (; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e); return n } }); function ft(e, t, n) { if (x.isFunction(t)) return x.grep(e, function (e, r) { return !!t.call(e, r, e) !== n }); if (t.nodeType) return x.grep(e, function (e) { return e === t !== n }); if ("string" == typeof t) { if (st.test(t)) return x.filter(t, e, n); t = x.filter(t, e) } return x.grep(e, function (e) { return x.inArray(e, t) >= 0 !== n }) } function dt(e) { var t = ht.split("|"), n = e.createDocumentFragment(); if (n.createElement) while (t.length) n.createElement(t.pop()); return n } var ht = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", gt = / jQuery\d+="(?:null|\d+)"/g, mt = RegExp("<(?:" + ht + ")[\\s/>]", "i"), yt = /^\s+/, vt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, bt = /<([\w:]+)/, xt = /<tbody/i, wt = /<|&#?\w+;/, Tt = /<(?:script|style|link)/i, Ct = /^(?:checkbox|radio)$/i, Nt = /checked\s*(?:[^=]|=\s*.checked.)/i, kt = /^$|\/(?:java|ecma)script/i, Et = /^true\/(.*)/, St = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, At = { option: [1, "<select multiple='multiple'>", "</select>"], legend: [1, "<fieldset>", "</fieldset>"], area: [1, "<map>", "</map>"], param: [1, "<object>", "</object>"], thead: [1, "<table>", "</table>"], tr: [2, "<table><tbody>", "</tbody></table>"], col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], _default: x.support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"] }, jt = dt(a), Dt = jt.appendChild(a.createElement("div")); At.optgroup = At.option, At.tbody = At.tfoot = At.colgroup = At.caption = At.thead, At.th = At.td, x.fn.extend({ text: function (e) { return x.access(this, function (e) { return e === t ? x.text(this) : this.empty().append((this[0] && this[0].ownerDocument || a).createTextNode(e)) }, null, e, arguments.length) }, append: function () { return this.domManip(arguments, function (e) { if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) { var t = Lt(this, e); t.appendChild(e) } }) }, prepend: function () { return this.domManip(arguments, function (e) { if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) { var t = Lt(this, e); t.insertBefore(e, t.firstChild) } }) }, before: function () { return this.domManip(arguments, function (e) { this.parentNode && this.parentNode.insertBefore(e, this) }) }, after: function () { return this.domManip(arguments, function (e) { this.parentNode && this.parentNode.insertBefore(e, this.nextSibling) }) }, remove: function (e, t) { var n, r = e ? x.filter(e, this) : this, i = 0; for (; null != (n = r[i]) ; i++) t || 1 !== n.nodeType || x.cleanData(Ft(n)), n.parentNode && (t && x.contains(n.ownerDocument, n) && _t(Ft(n, "script")), n.parentNode.removeChild(n)); return this }, empty: function () { var e, t = 0; for (; null != (e = this[t]) ; t++) { 1 === e.nodeType && x.cleanData(Ft(e, !1)); while (e.firstChild) e.removeChild(e.firstChild); e.options && x.nodeName(e, "select") && (e.options.length = 0) } return this }, clone: function (e, t) { return e = null == e ? !1 : e, t = null == t ? e : t, this.map(function () { return x.clone(this, e, t) }) }, html: function (e) { return x.access(this, function (e) { var n = this[0] || {}, r = 0, i = this.length; if (e === t) return 1 === n.nodeType ? n.innerHTML.replace(gt, "") : t; if (!("string" != typeof e || Tt.test(e) || !x.support.htmlSerialize && mt.test(e) || !x.support.leadingWhitespace && yt.test(e) || At[(bt.exec(e) || ["", ""])[1].toLowerCase()])) { e = e.replace(vt, "<$1></$2>"); try { for (; i > r; r++) n = this[r] || {}, 1 === n.nodeType && (x.cleanData(Ft(n, !1)), n.innerHTML = e); n = 0 } catch (o) { } } n && this.empty().append(e) }, null, e, arguments.length) }, replaceWith: function () { var e = x.map(this, function (e) { return [e.nextSibling, e.parentNode] }), t = 0; return this.domManip(arguments, function (n) { var r = e[t++], i = e[t++]; i && (r && r.parentNode !== i && (r = this.nextSibling), x(this).remove(), i.insertBefore(n, r)) }, !0), t ? this : this.remove() }, detach: function (e) { return this.remove(e, !0) }, domManip: function (e, t, n) { e = d.apply([], e); var r, i, o, a, s, l, u = 0, c = this.length, p = this, f = c - 1, h = e[0], g = x.isFunction(h); if (g || !(1 >= c || "string" != typeof h || x.support.checkClone) && Nt.test(h)) return this.each(function (r) { var i = p.eq(r); g && (e[0] = h.call(this, r, i.html())), i.domManip(e, t, n) }); if (c && (l = x.buildFragment(e, this[0].ownerDocument, !1, !n && this), r = l.firstChild, 1 === l.childNodes.length && (l = r), r)) { for (a = x.map(Ft(l, "script"), Ht), o = a.length; c > u; u++) i = l, u !== f && (i = x.clone(i, !0, !0), o && x.merge(a, Ft(i, "script"))), t.call(this[u], i, u); if (o) for (s = a[a.length - 1].ownerDocument, x.map(a, qt), u = 0; o > u; u++) i = a[u], kt.test(i.type || "") && !x._data(i, "globalEval") && x.contains(s, i) && (i.src ? x._evalUrl(i.src) : x.globalEval((i.text || i.textContent || i.innerHTML || "").replace(St, ""))); l = r = null } return this } }); function Lt(e, t) { return x.nodeName(e, "table") && x.nodeName(1 === t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e } function Ht(e) { return e.type = (null !== x.find.attr(e, "type")) + "/" + e.type, e } function qt(e) { var t = Et.exec(e.type); return t ? e.type = t[1] : e.removeAttribute("type"), e } function _t(e, t) { var n, r = 0; for (; null != (n = e[r]) ; r++) x._data(n, "globalEval", !t || x._data(t[r], "globalEval")) } function Mt(e, t) { if (1 === t.nodeType && x.hasData(e)) { var n, r, i, o = x._data(e), a = x._data(t, o), s = o.events; if (s) { delete a.handle, a.events = {}; for (n in s) for (r = 0, i = s[n].length; i > r; r++) x.event.add(t, n, s[n][r]) } a.data && (a.data = x.extend({}, a.data)) } } function Ot(e, t) { var n, r, i; if (1 === t.nodeType) { if (n = t.nodeName.toLowerCase(), !x.support.noCloneEvent && t[x.expando]) { i = x._data(t); for (r in i.events) x.removeEvent(t, r, i.handle); t.removeAttribute(x.expando) } "script" === n && t.text !== e.text ? (Ht(t).text = e.text, qt(t)) : "object" === n ? (t.parentNode && (t.outerHTML = e.outerHTML), x.support.html5Clone && e.innerHTML && !x.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === n && Ct.test(e.type) ? (t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value)) : "option" === n ? t.defaultSelected = t.selected = e.defaultSelected : ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue) } } x.each({ appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith" }, function (e, t) { x.fn[e] = function (e) { var n, r = 0, i = [], o = x(e), a = o.length - 1; for (; a >= r; r++) n = r === a ? this : this.clone(!0), x(o[r])[t](n), h.apply(i, n.get()); return this.pushStack(i) } }); function Ft(e, n) { var r, o, a = 0, s = typeof e.getElementsByTagName !== i ? e.getElementsByTagName(n || "*") : typeof e.querySelectorAll !== i ? e.querySelectorAll(n || "*") : t; if (!s) for (s = [], r = e.childNodes || e; null != (o = r[a]) ; a++) !n || x.nodeName(o, n) ? s.push(o) : x.merge(s, Ft(o, n)); return n === t || n && x.nodeName(e, n) ? x.merge([e], s) : s } function Bt(e) { Ct.test(e.type) && (e.defaultChecked = e.checked) } x.extend({
        clone: function (e, t, n) { var r, i, o, a, s, l = x.contains(e.ownerDocument, e); if (x.support.html5Clone || x.isXMLDoc(e) || !mt.test("<" + e.nodeName + ">") ? o = e.cloneNode(!0) : (Dt.innerHTML = e.outerHTML, Dt.removeChild(o = Dt.firstChild)), !(x.support.noCloneEvent && x.support.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || x.isXMLDoc(e))) for (r = Ft(o), s = Ft(e), a = 0; null != (i = s[a]) ; ++a) r[a] && Ot(i, r[a]); if (t) if (n) for (s = s || Ft(e), r = r || Ft(o), a = 0; null != (i = s[a]) ; a++) Mt(i, r[a]); else Mt(e, o); return r = Ft(o, "script"), r.length > 0 && _t(r, !l && Ft(e, "script")), r = s = i = null, o }, buildFragment: function (e, t, n, r) { var i, o, a, s, l, u, c, p = e.length, f = dt(t), d = [], h = 0; for (; p > h; h++) if (o = e[h], o || 0 === o) if ("object" === x.type(o)) x.merge(d, o.nodeType ? [o] : o); else if (wt.test(o)) { s = s || f.appendChild(t.createElement("div")), l = (bt.exec(o) || ["", ""])[1].toLowerCase(), c = At[l] || At._default, s.innerHTML = c[1] + o.replace(vt, "<$1></$2>") + c[2], i = c[0]; while (i--) s = s.lastChild; if (!x.support.leadingWhitespace && yt.test(o) && d.push(t.createTextNode(yt.exec(o)[0])), !x.support.tbody) { o = "table" !== l || xt.test(o) ? "<table>" !== c[1] || xt.test(o) ? 0 : s : s.firstChild, i = o && o.childNodes.length; while (i--) x.nodeName(u = o.childNodes[i], "tbody") && !u.childNodes.length && o.removeChild(u) } x.merge(d, s.childNodes), s.textContent = ""; while (s.firstChild) s.removeChild(s.firstChild); s = f.lastChild } else d.push(t.createTextNode(o)); s && f.removeChild(s), x.support.appendChecked || x.grep(Ft(d, "input"), Bt), h = 0; while (o = d[h++]) if ((!r || -1 === x.inArray(o, r)) && (a = x.contains(o.ownerDocument, o), s = Ft(f.appendChild(o), "script"), a && _t(s), n)) { i = 0; while (o = s[i++]) kt.test(o.type || "") && n.push(o) } return s = null, f }, cleanData: function (e, t) {
            var n, r, o, a, s = 0, l = x.expando, u = x.cache, c = x.support.deleteExpando, f = x.event.special; for (; null != (n = e[s]) ; s++) if ((t || x.acceptData(n)) && (o = n[l], a = o && u[o])) {
                if (a.events) for (r in a.events) f[r] ? x.event.remove(n, r) : x.removeEvent(n, r, a.handle);
                u[o] && (delete u[o], c ? delete n[l] : typeof n.removeAttribute !== i ? n.removeAttribute(l) : n[l] = null, p.push(o))
            }
        }, _evalUrl: function (e) { return x.ajax({ url: e, type: "GET", dataType: "script", async: !1, global: !1, "throws": !0 }) }
    }), x.fn.extend({ wrapAll: function (e) { if (x.isFunction(e)) return this.each(function (t) { x(this).wrapAll(e.call(this, t)) }); if (this[0]) { var t = x(e, this[0].ownerDocument).eq(0).clone(!0); this[0].parentNode && t.insertBefore(this[0]), t.map(function () { var e = this; while (e.firstChild && 1 === e.firstChild.nodeType) e = e.firstChild; return e }).append(this) } return this }, wrapInner: function (e) { return x.isFunction(e) ? this.each(function (t) { x(this).wrapInner(e.call(this, t)) }) : this.each(function () { var t = x(this), n = t.contents(); n.length ? n.wrapAll(e) : t.append(e) }) }, wrap: function (e) { var t = x.isFunction(e); return this.each(function (n) { x(this).wrapAll(t ? e.call(this, n) : e) }) }, unwrap: function () { return this.parent().each(function () { x.nodeName(this, "body") || x(this).replaceWith(this.childNodes) }).end() } }); var Pt, Rt, Wt, $t = /alpha\([^)]*\)/i, It = /opacity\s*=\s*([^)]*)/, zt = /^(top|right|bottom|left)$/, Xt = /^(none|table(?!-c[ea]).+)/, Ut = /^margin/, Vt = RegExp("^(" + w + ")(.*)$", "i"), Yt = RegExp("^(" + w + ")(?!px)[a-z%]+$", "i"), Jt = RegExp("^([+-])=(" + w + ")", "i"), Gt = { BODY: "block" }, Qt = { position: "absolute", visibility: "hidden", display: "block" }, Kt = { letterSpacing: 0, fontWeight: 400 }, Zt = ["Top", "Right", "Bottom", "Left"], en = ["Webkit", "O", "Moz", "ms"]; function tn(e, t) { if (t in e) return t; var n = t.charAt(0).toUpperCase() + t.slice(1), r = t, i = en.length; while (i--) if (t = en[i] + n, t in e) return t; return r } function nn(e, t) { return e = t || e, "none" === x.css(e, "display") || !x.contains(e.ownerDocument, e) } function rn(e, t) { var n, r, i, o = [], a = 0, s = e.length; for (; s > a; a++) r = e[a], r.style && (o[a] = x._data(r, "olddisplay"), n = r.style.display, t ? (o[a] || "none" !== n || (r.style.display = ""), "" === r.style.display && nn(r) && (o[a] = x._data(r, "olddisplay", ln(r.nodeName)))) : o[a] || (i = nn(r), (n && "none" !== n || !i) && x._data(r, "olddisplay", i ? n : x.css(r, "display")))); for (a = 0; s > a; a++) r = e[a], r.style && (t && "none" !== r.style.display && "" !== r.style.display || (r.style.display = t ? o[a] || "" : "none")); return e } x.fn.extend({ css: function (e, n) { return x.access(this, function (e, n, r) { var i, o, a = {}, s = 0; if (x.isArray(n)) { for (o = Rt(e), i = n.length; i > s; s++) a[n[s]] = x.css(e, n[s], !1, o); return a } return r !== t ? x.style(e, n, r) : x.css(e, n) }, e, n, arguments.length > 1) }, show: function () { return rn(this, !0) }, hide: function () { return rn(this) }, toggle: function (e) { return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function () { nn(this) ? x(this).show() : x(this).hide() }) } }), x.extend({ cssHooks: { opacity: { get: function (e, t) { if (t) { var n = Wt(e, "opacity"); return "" === n ? "1" : n } } } }, cssNumber: { columnCount: !0, fillOpacity: !0, fontWeight: !0, lineHeight: !0, opacity: !0, order: !0, orphans: !0, widows: !0, zIndex: !0, zoom: !0 }, cssProps: { "float": x.support.cssFloat ? "cssFloat" : "styleFloat" }, style: function (e, n, r, i) { if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) { var o, a, s, l = x.camelCase(n), u = e.style; if (n = x.cssProps[l] || (x.cssProps[l] = tn(u, l)), s = x.cssHooks[n] || x.cssHooks[l], r === t) return s && "get" in s && (o = s.get(e, !1, i)) !== t ? o : u[n]; if (a = typeof r, "string" === a && (o = Jt.exec(r)) && (r = (o[1] + 1) * o[2] + parseFloat(x.css(e, n)), a = "number"), !(null == r || "number" === a && isNaN(r) || ("number" !== a || x.cssNumber[l] || (r += "px"), x.support.clearCloneStyle || "" !== r || 0 !== n.indexOf("background") || (u[n] = "inherit"), s && "set" in s && (r = s.set(e, r, i)) === t))) try { u[n] = r } catch (c) { } } }, css: function (e, n, r, i) { var o, a, s, l = x.camelCase(n); return n = x.cssProps[l] || (x.cssProps[l] = tn(e.style, l)), s = x.cssHooks[n] || x.cssHooks[l], s && "get" in s && (a = s.get(e, !0, r)), a === t && (a = Wt(e, n, i)), "normal" === a && n in Kt && (a = Kt[n]), "" === r || r ? (o = parseFloat(a), r === !0 || x.isNumeric(o) ? o || 0 : a) : a } }), e.getComputedStyle ? (Rt = function (t) { return e.getComputedStyle(t, null) }, Wt = function (e, n, r) { var i, o, a, s = r || Rt(e), l = s ? s.getPropertyValue(n) || s[n] : t, u = e.style; return s && ("" !== l || x.contains(e.ownerDocument, e) || (l = x.style(e, n)), Yt.test(l) && Ut.test(n) && (i = u.width, o = u.minWidth, a = u.maxWidth, u.minWidth = u.maxWidth = u.width = l, l = s.width, u.width = i, u.minWidth = o, u.maxWidth = a)), l }) : a.documentElement.currentStyle && (Rt = function (e) { return e.currentStyle }, Wt = function (e, n, r) { var i, o, a, s = r || Rt(e), l = s ? s[n] : t, u = e.style; return null == l && u && u[n] && (l = u[n]), Yt.test(l) && !zt.test(n) && (i = u.left, o = e.runtimeStyle, a = o && o.left, a && (o.left = e.currentStyle.left), u.left = "fontSize" === n ? "1em" : l, l = u.pixelLeft + "px", u.left = i, a && (o.left = a)), "" === l ? "auto" : l }); function on(e, t, n) { var r = Vt.exec(t); return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t } function an(e, t, n, r, i) { var o = n === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0, a = 0; for (; 4 > o; o += 2) "margin" === n && (a += x.css(e, n + Zt[o], !0, i)), r ? ("content" === n && (a -= x.css(e, "padding" + Zt[o], !0, i)), "margin" !== n && (a -= x.css(e, "border" + Zt[o] + "Width", !0, i))) : (a += x.css(e, "padding" + Zt[o], !0, i), "padding" !== n && (a += x.css(e, "border" + Zt[o] + "Width", !0, i))); return a } function sn(e, t, n) { var r = !0, i = "width" === t ? e.offsetWidth : e.offsetHeight, o = Rt(e), a = x.support.boxSizing && "border-box" === x.css(e, "boxSizing", !1, o); if (0 >= i || null == i) { if (i = Wt(e, t, o), (0 > i || null == i) && (i = e.style[t]), Yt.test(i)) return i; r = a && (x.support.boxSizingReliable || i === e.style[t]), i = parseFloat(i) || 0 } return i + an(e, t, n || (a ? "border" : "content"), r, o) + "px" } function ln(e) { var t = a, n = Gt[e]; return n || (n = un(e, t), "none" !== n && n || (Pt = (Pt || x("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(t.documentElement), t = (Pt[0].contentWindow || Pt[0].contentDocument).document, t.write("<!doctype html><html><body>"), t.close(), n = un(e, t), Pt.detach()), Gt[e] = n), n } function un(e, t) { var n = x(t.createElement(e)).appendTo(t.body), r = x.css(n[0], "display"); return n.remove(), r } x.each(["height", "width"], function (e, n) { x.cssHooks[n] = { get: function (e, r, i) { return r ? 0 === e.offsetWidth && Xt.test(x.css(e, "display")) ? x.swap(e, Qt, function () { return sn(e, n, i) }) : sn(e, n, i) : t }, set: function (e, t, r) { var i = r && Rt(e); return on(e, t, r ? an(e, n, r, x.support.boxSizing && "border-box" === x.css(e, "boxSizing", !1, i), i) : 0) } } }), x.support.opacity || (x.cssHooks.opacity = { get: function (e, t) { return It.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : "" }, set: function (e, t) { var n = e.style, r = e.currentStyle, i = x.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : "", o = r && r.filter || n.filter || ""; n.zoom = 1, (t >= 1 || "" === t) && "" === x.trim(o.replace($t, "")) && n.removeAttribute && (n.removeAttribute("filter"), "" === t || r && !r.filter) || (n.filter = $t.test(o) ? o.replace($t, i) : o + " " + i) } }), x(function () { x.support.reliableMarginRight || (x.cssHooks.marginRight = { get: function (e, n) { return n ? x.swap(e, { display: "inline-block" }, Wt, [e, "marginRight"]) : t } }), !x.support.pixelPosition && x.fn.position && x.each(["top", "left"], function (e, n) { x.cssHooks[n] = { get: function (e, r) { return r ? (r = Wt(e, n), Yt.test(r) ? x(e).position()[n] + "px" : r) : t } } }) }), x.expr && x.expr.filters && (x.expr.filters.hidden = function (e) { return 0 >= e.offsetWidth && 0 >= e.offsetHeight || !x.support.reliableHiddenOffsets && "none" === (e.style && e.style.display || x.css(e, "display")) }, x.expr.filters.visible = function (e) { return !x.expr.filters.hidden(e) }), x.each({ margin: "", padding: "", border: "Width" }, function (e, t) { x.cssHooks[e + t] = { expand: function (n) { var r = 0, i = {}, o = "string" == typeof n ? n.split(" ") : [n]; for (; 4 > r; r++) i[e + Zt[r] + t] = o[r] || o[r - 2] || o[0]; return i } }, Ut.test(e) || (x.cssHooks[e + t].set = on) }); var cn = /%20/g, pn = /\[\]$/, fn = /\r?\n/g, dn = /^(?:submit|button|image|reset|file)$/i, hn = /^(?:input|select|textarea|keygen)/i; x.fn.extend({ serialize: function () { return x.param(this.serializeArray()) }, serializeArray: function () { return this.map(function () { var e = x.prop(this, "elements"); return e ? x.makeArray(e) : this }).filter(function () { var e = this.type; return this.name && !x(this).is(":disabled") && hn.test(this.nodeName) && !dn.test(e) && (this.checked || !Ct.test(e)) }).map(function (e, t) { var n = x(this).val(); return null == n ? null : x.isArray(n) ? x.map(n, function (e) { return { name: t.name, value: e.replace(fn, "\r\n") } }) : { name: t.name, value: n.replace(fn, "\r\n") } }).get() } }), x.param = function (e, n) { var r, i = [], o = function (e, t) { t = x.isFunction(t) ? t() : null == t ? "" : t, i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t) }; if (n === t && (n = x.ajaxSettings && x.ajaxSettings.traditional), x.isArray(e) || e.jquery && !x.isPlainObject(e)) x.each(e, function () { o(this.name, this.value) }); else for (r in e) gn(r, e[r], n, o); return i.join("&").replace(cn, "+") }; function gn(e, t, n, r) { var i; if (x.isArray(t)) x.each(t, function (t, i) { n || pn.test(e) ? r(e, i) : gn(e + "[" + ("object" == typeof i ? t : "") + "]", i, n, r) }); else if (n || "object" !== x.type(t)) r(e, t); else for (i in t) gn(e + "[" + i + "]", t[i], n, r) } x.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (e, t) { x.fn[t] = function (e, n) { return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t) } }), x.fn.extend({ hover: function (e, t) { return this.mouseenter(e).mouseleave(t || e) }, bind: function (e, t, n) { return this.on(e, null, t, n) }, unbind: function (e, t) { return this.off(e, null, t) }, delegate: function (e, t, n, r) { return this.on(t, e, n, r) }, undelegate: function (e, t, n) { return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n) } }); var mn, yn, vn = x.now(), bn = /\?/, xn = /#.*$/, wn = /([?&])_=[^&]*/, Tn = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm, Cn = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, Nn = /^(?:GET|HEAD)$/, kn = /^\/\//, En = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/, Sn = x.fn.load, An = {}, jn = {}, Dn = "*/".concat("*"); try { yn = o.href } catch (Ln) { yn = a.createElement("a"), yn.href = "", yn = yn.href } mn = En.exec(yn.toLowerCase()) || []; function Hn(e) { return function (t, n) { "string" != typeof t && (n = t, t = "*"); var r, i = 0, o = t.toLowerCase().match(T) || []; if (x.isFunction(n)) while (r = o[i++]) "+" === r[0] ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n) } } function qn(e, n, r, i) { var o = {}, a = e === jn; function s(l) { var u; return o[l] = !0, x.each(e[l] || [], function (e, l) { var c = l(n, r, i); return "string" != typeof c || a || o[c] ? a ? !(u = c) : t : (n.dataTypes.unshift(c), s(c), !1) }), u } return s(n.dataTypes[0]) || !o["*"] && s("*") } function _n(e, n) { var r, i, o = x.ajaxSettings.flatOptions || {}; for (i in n) n[i] !== t && ((o[i] ? e : r || (r = {}))[i] = n[i]); return r && x.extend(!0, e, r), e } x.fn.load = function (e, n, r) { if ("string" != typeof e && Sn) return Sn.apply(this, arguments); var i, o, a, s = this, l = e.indexOf(" "); return l >= 0 && (i = e.slice(l, e.length), e = e.slice(0, l)), x.isFunction(n) ? (r = n, n = t) : n && "object" == typeof n && (a = "POST"), s.length > 0 && x.ajax({ url: e, type: a, dataType: "html", data: n }).done(function (e) { o = arguments, s.html(i ? x("<div>").append(x.parseHTML(e)).find(i) : e) }).complete(r && function (e, t) { s.each(r, o || [e.responseText, t, e]) }), this }, x.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (e, t) { x.fn[t] = function (e) { return this.on(t, e) } }), x.extend({ active: 0, lastModified: {}, etag: {}, ajaxSettings: { url: yn, type: "GET", isLocal: Cn.test(mn[1]), global: !0, processData: !0, async: !0, contentType: "application/x-www-form-urlencoded; charset=UTF-8", accepts: { "*": Dn, text: "text/plain", html: "text/html", xml: "application/xml, text/xml", json: "application/json, text/javascript" }, contents: { xml: /xml/, html: /html/, json: /json/ }, responseFields: { xml: "responseXML", text: "responseText", json: "responseJSON" }, converters: { "* text": String, "text html": !0, "text json": x.parseJSON, "text xml": x.parseXML }, flatOptions: { url: !0, context: !0 } }, ajaxSetup: function (e, t) { return t ? _n(_n(e, x.ajaxSettings), t) : _n(x.ajaxSettings, e) }, ajaxPrefilter: Hn(An), ajaxTransport: Hn(jn), ajax: function (e, n) { "object" == typeof e && (n = e, e = t), n = n || {}; var r, i, o, a, s, l, u, c, p = x.ajaxSetup({}, n), f = p.context || p, d = p.context && (f.nodeType || f.jquery) ? x(f) : x.event, h = x.Deferred(), g = x.Callbacks("once memory"), m = p.statusCode || {}, y = {}, v = {}, b = 0, w = "canceled", C = { readyState: 0, getResponseHeader: function (e) { var t; if (2 === b) { if (!c) { c = {}; while (t = Tn.exec(a)) c[t[1].toLowerCase()] = t[2] } t = c[e.toLowerCase()] } return null == t ? null : t }, getAllResponseHeaders: function () { return 2 === b ? a : null }, setRequestHeader: function (e, t) { var n = e.toLowerCase(); return b || (e = v[n] = v[n] || e, y[e] = t), this }, overrideMimeType: function (e) { return b || (p.mimeType = e), this }, statusCode: function (e) { var t; if (e) if (2 > b) for (t in e) m[t] = [m[t], e[t]]; else C.always(e[C.status]); return this }, abort: function (e) { var t = e || w; return u && u.abort(t), k(0, t), this } }; if (h.promise(C).complete = g.add, C.success = C.done, C.error = C.fail, p.url = ((e || p.url || yn) + "").replace(xn, "").replace(kn, mn[1] + "//"), p.type = n.method || n.type || p.method || p.type, p.dataTypes = x.trim(p.dataType || "*").toLowerCase().match(T) || [""], null == p.crossDomain && (r = En.exec(p.url.toLowerCase()), p.crossDomain = !(!r || r[1] === mn[1] && r[2] === mn[2] && (r[3] || ("http:" === r[1] ? "80" : "443")) === (mn[3] || ("http:" === mn[1] ? "80" : "443")))), p.data && p.processData && "string" != typeof p.data && (p.data = x.param(p.data, p.traditional)), qn(An, p, n, C), 2 === b) return C; l = p.global, l && 0 === x.active++ && x.event.trigger("ajaxStart"), p.type = p.type.toUpperCase(), p.hasContent = !Nn.test(p.type), o = p.url, p.hasContent || (p.data && (o = p.url += (bn.test(o) ? "&" : "?") + p.data, delete p.data), p.cache === !1 && (p.url = wn.test(o) ? o.replace(wn, "$1_=" + vn++) : o + (bn.test(o) ? "&" : "?") + "_=" + vn++)), p.ifModified && (x.lastModified[o] && C.setRequestHeader("If-Modified-Since", x.lastModified[o]), x.etag[o] && C.setRequestHeader("If-None-Match", x.etag[o])), (p.data && p.hasContent && p.contentType !== !1 || n.contentType) && C.setRequestHeader("Content-Type", p.contentType), C.setRequestHeader("Accept", p.dataTypes[0] && p.accepts[p.dataTypes[0]] ? p.accepts[p.dataTypes[0]] + ("*" !== p.dataTypes[0] ? ", " + Dn + "; q=0.01" : "") : p.accepts["*"]); for (i in p.headers) C.setRequestHeader(i, p.headers[i]); if (p.beforeSend && (p.beforeSend.call(f, C, p) === !1 || 2 === b)) return C.abort(); w = "abort"; for (i in { success: 1, error: 1, complete: 1 }) C[i](p[i]); if (u = qn(jn, p, n, C)) { C.readyState = 1, l && d.trigger("ajaxSend", [C, p]), p.async && p.timeout > 0 && (s = setTimeout(function () { C.abort("timeout") }, p.timeout)); try { b = 1, u.send(y, k) } catch (N) { if (!(2 > b)) throw N; k(-1, N) } } else k(-1, "No Transport"); function k(e, n, r, i) { var c, y, v, w, T, N = n; 2 !== b && (b = 2, s && clearTimeout(s), u = t, a = i || "", C.readyState = e > 0 ? 4 : 0, c = e >= 200 && 300 > e || 304 === e, r && (w = Mn(p, C, r)), w = On(p, w, C, c), c ? (p.ifModified && (T = C.getResponseHeader("Last-Modified"), T && (x.lastModified[o] = T), T = C.getResponseHeader("etag"), T && (x.etag[o] = T)), 204 === e || "HEAD" === p.type ? N = "nocontent" : 304 === e ? N = "notmodified" : (N = w.state, y = w.data, v = w.error, c = !v)) : (v = N, (e || !N) && (N = "error", 0 > e && (e = 0))), C.status = e, C.statusText = (n || N) + "", c ? h.resolveWith(f, [y, N, C]) : h.rejectWith(f, [C, N, v]), C.statusCode(m), m = t, l && d.trigger(c ? "ajaxSuccess" : "ajaxError", [C, p, c ? y : v]), g.fireWith(f, [C, N]), l && (d.trigger("ajaxComplete", [C, p]), --x.active || x.event.trigger("ajaxStop"))) } return C }, getJSON: function (e, t, n) { return x.get(e, t, n, "json") }, getScript: function (e, n) { return x.get(e, t, n, "script") } }), x.each(["get", "post"], function (e, n) { x[n] = function (e, r, i, o) { return x.isFunction(r) && (o = o || i, i = r, r = t), x.ajax({ url: e, type: n, dataType: o, data: r, success: i }) } }); function Mn(e, n, r) { var i, o, a, s, l = e.contents, u = e.dataTypes; while ("*" === u[0]) u.shift(), o === t && (o = e.mimeType || n.getResponseHeader("Content-Type")); if (o) for (s in l) if (l[s] && l[s].test(o)) { u.unshift(s); break } if (u[0] in r) a = u[0]; else { for (s in r) { if (!u[0] || e.converters[s + " " + u[0]]) { a = s; break } i || (i = s) } a = a || i } return a ? (a !== u[0] && u.unshift(a), r[a]) : t } function On(e, t, n, r) { var i, o, a, s, l, u = {}, c = e.dataTypes.slice(); if (c[1]) for (a in e.converters) u[a.toLowerCase()] = e.converters[a]; o = c.shift(); while (o) if (e.responseFields[o] && (n[e.responseFields[o]] = t), !l && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), l = o, o = c.shift()) if ("*" === o) o = l; else if ("*" !== l && l !== o) { if (a = u[l + " " + o] || u["* " + o], !a) for (i in u) if (s = i.split(" "), s[1] === o && (a = u[l + " " + s[0]] || u["* " + s[0]])) { a === !0 ? a = u[i] : u[i] !== !0 && (o = s[0], c.unshift(s[1])); break } if (a !== !0) if (a && e["throws"]) t = a(t); else try { t = a(t) } catch (p) { return { state: "parsererror", error: a ? p : "No conversion from " + l + " to " + o } } } return { state: "success", data: t } } x.ajaxSetup({ accepts: { script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript" }, contents: { script: /(?:java|ecma)script/ }, converters: { "text script": function (e) { return x.globalEval(e), e } } }), x.ajaxPrefilter("script", function (e) { e.cache === t && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1) }), x.ajaxTransport("script", function (e) { if (e.crossDomain) { var n, r = a.head || x("head")[0] || a.documentElement; return { send: function (t, i) { n = a.createElement("script"), n.async = !0, e.scriptCharset && (n.charset = e.scriptCharset), n.src = e.url, n.onload = n.onreadystatechange = function (e, t) { (t || !n.readyState || /loaded|complete/.test(n.readyState)) && (n.onload = n.onreadystatechange = null, n.parentNode && n.parentNode.removeChild(n), n = null, t || i(200, "success")) }, r.insertBefore(n, r.firstChild) }, abort: function () { n && n.onload(t, !0) } } } }); var Fn = [], Bn = /(=)\?(?=&|$)|\?\?/; x.ajaxSetup({ jsonp: "callback", jsonpCallback: function () { var e = Fn.pop() || x.expando + "_" + vn++; return this[e] = !0, e } }), x.ajaxPrefilter("json jsonp", function (n, r, i) { var o, a, s, l = n.jsonp !== !1 && (Bn.test(n.url) ? "url" : "string" == typeof n.data && !(n.contentType || "").indexOf("application/x-www-form-urlencoded") && Bn.test(n.data) && "data"); return l || "jsonp" === n.dataTypes[0] ? (o = n.jsonpCallback = x.isFunction(n.jsonpCallback) ? n.jsonpCallback() : n.jsonpCallback, l ? n[l] = n[l].replace(Bn, "$1" + o) : n.jsonp !== !1 && (n.url += (bn.test(n.url) ? "&" : "?") + n.jsonp + "=" + o), n.converters["script json"] = function () { return s || x.error(o + " was not called"), s[0] }, n.dataTypes[0] = "json", a = e[o], e[o] = function () { s = arguments }, i.always(function () { e[o] = a, n[o] && (n.jsonpCallback = r.jsonpCallback, Fn.push(o)), s && x.isFunction(a) && a(s[0]), s = a = t }), "script") : t }); var Pn, Rn, Wn = 0, $n = e.ActiveXObject && function () { var e; for (e in Pn) Pn[e](t, !0) }; function In() { try { return new e.XMLHttpRequest } catch (t) { } } function zn() { try { return new e.ActiveXObject("Microsoft.XMLHTTP") } catch (t) { } } x.ajaxSettings.xhr = e.ActiveXObject ? function () { return !this.isLocal && In() || zn() } : In, Rn = x.ajaxSettings.xhr(), x.support.cors = !!Rn && "withCredentials" in Rn, Rn = x.support.ajax = !!Rn, Rn && x.ajaxTransport(function (n) { if (!n.crossDomain || x.support.cors) { var r; return { send: function (i, o) { var a, s, l = n.xhr(); if (n.username ? l.open(n.type, n.url, n.async, n.username, n.password) : l.open(n.type, n.url, n.async), n.xhrFields) for (s in n.xhrFields) l[s] = n.xhrFields[s]; n.mimeType && l.overrideMimeType && l.overrideMimeType(n.mimeType), n.crossDomain || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest"); try { for (s in i) l.setRequestHeader(s, i[s]) } catch (u) { } l.send(n.hasContent && n.data || null), r = function (e, i) { var s, u, c, p; try { if (r && (i || 4 === l.readyState)) if (r = t, a && (l.onreadystatechange = x.noop, $n && delete Pn[a]), i) 4 !== l.readyState && l.abort(); else { p = {}, s = l.status, u = l.getAllResponseHeaders(), "string" == typeof l.responseText && (p.text = l.responseText); try { c = l.statusText } catch (f) { c = "" } s || !n.isLocal || n.crossDomain ? 1223 === s && (s = 204) : s = p.text ? 200 : 404 } } catch (d) { i || o(-1, d) } p && o(s, c, p, u) }, n.async ? 4 === l.readyState ? setTimeout(r) : (a = ++Wn, $n && (Pn || (Pn = {}, x(e).unload($n)), Pn[a] = r), l.onreadystatechange = r) : r() }, abort: function () { r && r(t, !0) } } } }); var Xn, Un, Vn = /^(?:toggle|show|hide)$/, Yn = RegExp("^(?:([+-])=|)(" + w + ")([a-z%]*)$", "i"), Jn = /queueHooks$/, Gn = [nr], Qn = { "*": [function (e, t) { var n = this.createTween(e, t), r = n.cur(), i = Yn.exec(t), o = i && i[3] || (x.cssNumber[e] ? "" : "px"), a = (x.cssNumber[e] || "px" !== o && +r) && Yn.exec(x.css(n.elem, e)), s = 1, l = 20; if (a && a[3] !== o) { o = o || a[3], i = i || [], a = +r || 1; do s = s || ".5", a /= s, x.style(n.elem, e, a + o); while (s !== (s = n.cur() / r) && 1 !== s && --l) } return i && (a = n.start = +a || +r || 0, n.unit = o, n.end = i[1] ? a + (i[1] + 1) * i[2] : +i[2]), n }] }; function Kn() { return setTimeout(function () { Xn = t }), Xn = x.now() } function Zn(e, t, n) { var r, i = (Qn[t] || []).concat(Qn["*"]), o = 0, a = i.length; for (; a > o; o++) if (r = i[o].call(n, t, e)) return r } function er(e, t, n) { var r, i, o = 0, a = Gn.length, s = x.Deferred().always(function () { delete l.elem }), l = function () { if (i) return !1; var t = Xn || Kn(), n = Math.max(0, u.startTime + u.duration - t), r = n / u.duration || 0, o = 1 - r, a = 0, l = u.tweens.length; for (; l > a; a++) u.tweens[a].run(o); return s.notifyWith(e, [u, o, n]), 1 > o && l ? n : (s.resolveWith(e, [u]), !1) }, u = s.promise({ elem: e, props: x.extend({}, t), opts: x.extend(!0, { specialEasing: {} }, n), originalProperties: t, originalOptions: n, startTime: Xn || Kn(), duration: n.duration, tweens: [], createTween: function (t, n) { var r = x.Tween(e, u.opts, t, n, u.opts.specialEasing[t] || u.opts.easing); return u.tweens.push(r), r }, stop: function (t) { var n = 0, r = t ? u.tweens.length : 0; if (i) return this; for (i = !0; r > n; n++) u.tweens[n].run(1); return t ? s.resolveWith(e, [u, t]) : s.rejectWith(e, [u, t]), this } }), c = u.props; for (tr(c, u.opts.specialEasing) ; a > o; o++) if (r = Gn[o].call(u, e, c, u.opts)) return r; return x.map(c, Zn, u), x.isFunction(u.opts.start) && u.opts.start.call(e, u), x.fx.timer(x.extend(l, { elem: e, anim: u, queue: u.opts.queue })), u.progress(u.opts.progress).done(u.opts.done, u.opts.complete).fail(u.opts.fail).always(u.opts.always) } function tr(e, t) { var n, r, i, o, a; for (n in e) if (r = x.camelCase(n), i = t[r], o = e[n], x.isArray(o) && (i = o[1], o = e[n] = o[0]), n !== r && (e[r] = o, delete e[n]), a = x.cssHooks[r], a && "expand" in a) { o = a.expand(o), delete e[r]; for (n in o) n in e || (e[n] = o[n], t[n] = i) } else t[r] = i } x.Animation = x.extend(er, { tweener: function (e, t) { x.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" "); var n, r = 0, i = e.length; for (; i > r; r++) n = e[r], Qn[n] = Qn[n] || [], Qn[n].unshift(t) }, prefilter: function (e, t) { t ? Gn.unshift(e) : Gn.push(e) } }); function nr(e, t, n) { var r, i, o, a, s, l, u = this, c = {}, p = e.style, f = e.nodeType && nn(e), d = x._data(e, "fxshow"); n.queue || (s = x._queueHooks(e, "fx"), null == s.unqueued && (s.unqueued = 0, l = s.empty.fire, s.empty.fire = function () { s.unqueued || l() }), s.unqueued++, u.always(function () { u.always(function () { s.unqueued--, x.queue(e, "fx").length || s.empty.fire() }) })), 1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [p.overflow, p.overflowX, p.overflowY], "inline" === x.css(e, "display") && "none" === x.css(e, "float") && (x.support.inlineBlockNeedsLayout && "inline" !== ln(e.nodeName) ? p.zoom = 1 : p.display = "inline-block")), n.overflow && (p.overflow = "hidden", x.support.shrinkWrapBlocks || u.always(function () { p.overflow = n.overflow[0], p.overflowX = n.overflow[1], p.overflowY = n.overflow[2] })); for (r in t) if (i = t[r], Vn.exec(i)) { if (delete t[r], o = o || "toggle" === i, i === (f ? "hide" : "show")) continue; c[r] = d && d[r] || x.style(e, r) } if (!x.isEmptyObject(c)) { d ? "hidden" in d && (f = d.hidden) : d = x._data(e, "fxshow", {}), o && (d.hidden = !f), f ? x(e).show() : u.done(function () { x(e).hide() }), u.done(function () { var t; x._removeData(e, "fxshow"); for (t in c) x.style(e, t, c[t]) }); for (r in c) a = Zn(f ? d[r] : 0, r, u), r in d || (d[r] = a.start, f && (a.end = a.start, a.start = "width" === r || "height" === r ? 1 : 0)) } } function rr(e, t, n, r, i) { return new rr.prototype.init(e, t, n, r, i) } x.Tween = rr, rr.prototype = { constructor: rr, init: function (e, t, n, r, i, o) { this.elem = e, this.prop = n, this.easing = i || "swing", this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = o || (x.cssNumber[n] ? "" : "px") }, cur: function () { var e = rr.propHooks[this.prop]; return e && e.get ? e.get(this) : rr.propHooks._default.get(this) }, run: function (e) { var t, n = rr.propHooks[this.prop]; return this.pos = t = this.options.duration ? x.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : rr.propHooks._default.set(this), this } }, rr.prototype.init.prototype = rr.prototype, rr.propHooks = { _default: { get: function (e) { var t; return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = x.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0) : e.elem[e.prop] }, set: function (e) { x.fx.step[e.prop] ? x.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[x.cssProps[e.prop]] || x.cssHooks[e.prop]) ? x.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now } } }, rr.propHooks.scrollTop = rr.propHooks.scrollLeft = { set: function (e) { e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now) } }, x.each(["toggle", "show", "hide"], function (e, t) { var n = x.fn[t]; x.fn[t] = function (e, r, i) { return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(ir(t, !0), e, r, i) } }), x.fn.extend({ fadeTo: function (e, t, n, r) { return this.filter(nn).css("opacity", 0).show().end().animate({ opacity: t }, e, n, r) }, animate: function (e, t, n, r) { var i = x.isEmptyObject(e), o = x.speed(t, n, r), a = function () { var t = er(this, x.extend({}, e), o); (i || x._data(this, "finish")) && t.stop(!0) }; return a.finish = a, i || o.queue === !1 ? this.each(a) : this.queue(o.queue, a) }, stop: function (e, n, r) { var i = function (e) { var t = e.stop; delete e.stop, t(r) }; return "string" != typeof e && (r = n, n = e, e = t), n && e !== !1 && this.queue(e || "fx", []), this.each(function () { var t = !0, n = null != e && e + "queueHooks", o = x.timers, a = x._data(this); if (n) a[n] && a[n].stop && i(a[n]); else for (n in a) a[n] && a[n].stop && Jn.test(n) && i(a[n]); for (n = o.length; n--;) o[n].elem !== this || null != e && o[n].queue !== e || (o[n].anim.stop(r), t = !1, o.splice(n, 1)); (t || !r) && x.dequeue(this, e) }) }, finish: function (e) { return e !== !1 && (e = e || "fx"), this.each(function () { var t, n = x._data(this), r = n[e + "queue"], i = n[e + "queueHooks"], o = x.timers, a = r ? r.length : 0; for (n.finish = !0, x.queue(this, e, []), i && i.stop && i.stop.call(this, !0), t = o.length; t--;) o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1)); for (t = 0; a > t; t++) r[t] && r[t].finish && r[t].finish.call(this); delete n.finish }) } }); function ir(e, t) { var n, r = { height: e }, i = 0; for (t = t ? 1 : 0; 4 > i; i += 2 - t) n = Zt[i], r["margin" + n] = r["padding" + n] = e; return t && (r.opacity = r.width = e), r } x.each({ slideDown: ir("show"), slideUp: ir("hide"), slideToggle: ir("toggle"), fadeIn: { opacity: "show" }, fadeOut: { opacity: "hide" }, fadeToggle: { opacity: "toggle" } }, function (e, t) { x.fn[e] = function (e, n, r) { return this.animate(t, e, n, r) } }), x.speed = function (e, t, n) { var r = e && "object" == typeof e ? x.extend({}, e) : { complete: n || !n && t || x.isFunction(e) && e, duration: e, easing: n && t || t && !x.isFunction(t) && t }; return r.duration = x.fx.off ? 0 : "number" == typeof r.duration ? r.duration : r.duration in x.fx.speeds ? x.fx.speeds[r.duration] : x.fx.speeds._default, (null == r.queue || r.queue === !0) && (r.queue = "fx"), r.old = r.complete, r.complete = function () { x.isFunction(r.old) && r.old.call(this), r.queue && x.dequeue(this, r.queue) }, r }, x.easing = { linear: function (e) { return e }, swing: function (e) { return .5 - Math.cos(e * Math.PI) / 2 } }, x.timers = [], x.fx = rr.prototype.init, x.fx.tick = function () { var e, n = x.timers, r = 0; for (Xn = x.now() ; n.length > r; r++) e = n[r], e() || n[r] !== e || n.splice(r--, 1); n.length || x.fx.stop(), Xn = t }, x.fx.timer = function (e) { e() && x.timers.push(e) && x.fx.start() }, x.fx.interval = 13, x.fx.start = function () { Un || (Un = setInterval(x.fx.tick, x.fx.interval)) }, x.fx.stop = function () { clearInterval(Un), Un = null }, x.fx.speeds = { slow: 600, fast: 200, _default: 400 }, x.fx.step = {}, x.expr && x.expr.filters && (x.expr.filters.animated = function (e) { return x.grep(x.timers, function (t) { return e === t.elem }).length }), x.fn.offset = function (e) { if (arguments.length) return e === t ? this : this.each(function (t) { x.offset.setOffset(this, e, t) }); var n, r, o = { top: 0, left: 0 }, a = this[0], s = a && a.ownerDocument; if (s) return n = s.documentElement, x.contains(n, a) ? (typeof a.getBoundingClientRect !== i && (o = a.getBoundingClientRect()), r = or(s), { top: o.top + (r.pageYOffset || n.scrollTop) - (n.clientTop || 0), left: o.left + (r.pageXOffset || n.scrollLeft) - (n.clientLeft || 0) }) : o }, x.offset = { setOffset: function (e, t, n) { var r = x.css(e, "position"); "static" === r && (e.style.position = "relative"); var i = x(e), o = i.offset(), a = x.css(e, "top"), s = x.css(e, "left"), l = ("absolute" === r || "fixed" === r) && x.inArray("auto", [a, s]) > -1, u = {}, c = {}, p, f; l ? (c = i.position(), p = c.top, f = c.left) : (p = parseFloat(a) || 0, f = parseFloat(s) || 0), x.isFunction(t) && (t = t.call(e, n, o)), null != t.top && (u.top = t.top - o.top + p), null != t.left && (u.left = t.left - o.left + f), "using" in t ? t.using.call(e, u) : i.css(u) } }, x.fn.extend({ position: function () { if (this[0]) { var e, t, n = { top: 0, left: 0 }, r = this[0]; return "fixed" === x.css(r, "position") ? t = r.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), x.nodeName(e[0], "html") || (n = e.offset()), n.top += x.css(e[0], "borderTopWidth", !0), n.left += x.css(e[0], "borderLeftWidth", !0)), { top: t.top - n.top - x.css(r, "marginTop", !0), left: t.left - n.left - x.css(r, "marginLeft", !0) } } }, offsetParent: function () { return this.map(function () { var e = this.offsetParent || s; while (e && !x.nodeName(e, "html") && "static" === x.css(e, "position")) e = e.offsetParent; return e || s }) } }), x.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function (e, n) { var r = /Y/.test(n); x.fn[e] = function (i) { return x.access(this, function (e, i, o) { var a = or(e); return o === t ? a ? n in a ? a[n] : a.document.documentElement[i] : e[i] : (a ? a.scrollTo(r ? x(a).scrollLeft() : o, r ? o : x(a).scrollTop()) : e[i] = o, t) }, e, i, arguments.length, null) } }); function or(e) { return x.isWindow(e) ? e : 9 === e.nodeType ? e.defaultView || e.parentWindow : !1 } x.each({ Height: "height", Width: "width" }, function (e, n) { x.each({ padding: "inner" + e, content: n, "": "outer" + e }, function (r, i) { x.fn[i] = function (i, o) { var a = arguments.length && (r || "boolean" != typeof i), s = r || (i === !0 || o === !0 ? "margin" : "border"); return x.access(this, function (n, r, i) { var o; return x.isWindow(n) ? n.document.documentElement["client" + e] : 9 === n.nodeType ? (o = n.documentElement, Math.max(n.body["scroll" + e], o["scroll" + e], n.body["offset" + e], o["offset" + e], o["client" + e])) : i === t ? x.css(n, r, s) : x.style(n, r, i, s) }, n, a ? i : t, a, null) } }) }), x.fn.size = function () { return this.length }, x.fn.andSelf = x.fn.addBack, "object" == typeof module && module && "object" == typeof module.exports ? module.exports = x : (e.jQuery = e.$ = x, "function" == typeof define && define.amd && define("jquery", [], function () { return x }))
})(window);

(function ($) {

    $.fn.disable = function () {
        return this.each(function () {
            var $this = $(this);
            $this.addClass('disabled');
            $this.data('tabindex', $this.attr('tabindex'));
            $this.removeAttr('tabindex');
        });
    };

    $.fn.enable = function () {
        return this.each(function () {
            var $this = $(this);
            $this.removeClass('disabled');
            $this.attr('tabindex', $this.data('tabindex'));
        });
    };

    $.fn.targetBlank = function () {
        return this.each(function () {
            $(this).find('a').prop('target', '_blank');
        });
    };

    $.fn.swapClass = function (removeClass, addClass) {
        return this.each(function () {
            $(this).removeClass(removeClass).addClass(addClass);
        });
    };

    $.fn.toggleClass = function (class1, class2) {
        return this.each(function () {
            var $this = $(this);

            if ($this.hasClass(class1)){
                $(this).removeClass(class1).addClass(class2);
            } else {
                $(this).removeClass(class2).addClass(class1);
            }

        });
    };

    $.fn.toggleText = function (text1, text2) {
        return this.each(function () {
            var $this = $(this);

            if ($this.text() == text1){
                $(this).text(text2);
            } else {
                $(this).text(text1);
            }

        });
    };

    $.fn.ellipsisFill = function (text) {

        var textPassed = true;
        if (!text) textPassed = false;

        return this.each(function () {

            var $self = $(this);

            if (!textPassed) text = $self.text();

            $self.empty();

            $self.spanElem = $('<span title="' + text + '"></span>');
            $self.append($self.spanElem);

            $self.css('overflow', 'hidden');
            $self.spanElem.css('white-space', 'nowrap');

            $self.spanElem.html(text);

            // get the width of the span.
            // if it's wider than the container, remove a word until it's not.
            if ($self.spanElem.width() > $self.width()) {
                var lastText;

                while ($self.spanElem.width() > $self.width()) {
                    var t = $self.spanElem.html();

                    t = t.substring(0, t.lastIndexOf(' ')) + '&hellip;';

                    if (t == lastText) break;

                    $self.spanElem.html(t);

                    lastText = t;
                }
            }
        });
    };

    $.fn.ellipsisFixed = function (chars, buttonText) {

        return this.each(function () {

            var $self = $(this);

            var text = $self.text();

            $self.empty();

            var $span = $('<span></span>');

            var $ellipsis = $('<a href="#" title="more" class="ellipsis"></a>');

            if (buttonText) {
                $ellipsis.html(buttonText);
            } else {
                $ellipsis.html('&hellip;');
            }

            $ellipsis.click(function (e) {
                e.preventDefault();

                var $this = $(this);

                $span.html(text);

                $this.remove();
            });

            if (text.length > chars) {
                var trimmedText = text.substr(0, chars);
                trimmedText = trimmedText.substr(0, Math.min(trimmedText.length, trimmedText.lastIndexOf(" ")));

                $span.html(trimmedText + "&nbsp;");

                $span.append($ellipsis);
            } else {
                $span.html(text);
            }

            $self.append($span);
        });

    };

    $.fn.toggleExpandText = function (chars, callback) {

        return this.each(function () {

            var $self = $(this);

            var expandedText = $self.html();

            if (chars > expandedText.length) return;

            var expanded = false;

            var collapsedText = expandedText.substr(0, chars);
            collapsedText = collapsedText.substr(0, Math.min(collapsedText.length, collapsedText.lastIndexOf(" ")));

            $self.toggle = function() {
                $self.empty();

                var $toggleButton = $('<a href="#" class="toggle"></a>');

                if (expanded) {
                    $self.html(expandedText + "&nbsp;");
                    $toggleButton.text("less");
                    $toggleButton.toggleClass("less", "more");
                } else {
                    $self.html(collapsedText + "&nbsp;");
                    $toggleButton.text("more");
                    $toggleButton.toggleClass("more", "less");
                }

                $toggleButton.one('click', function(e) {
                    e.preventDefault();

                    $self.toggle();
                });

                expanded = !expanded;

                $self.append($toggleButton);

                if (callback) callback();
            };

            $self.toggle();
        });

    };

    $.fn.ellipsis = function (chars) {

        return this.each(function () {

            var $self = $(this);

            var text = $self.text();

            if (text.length > chars) {
                var trimmedText = text.substr(0, chars);
                trimmedText = trimmedText.substr(0, Math.min(trimmedText.length, trimmedText.lastIndexOf(" ")))

                $self.empty().html(trimmedText + "&hellip;");
            }
        });

    };

    $.fn.equaliseHeight = function (reset) {

        var maxHeight = -1;

        // reset all heights to auto first so they can be re-measured.
        if (reset){
            this.each(function () {
                $(this).height('auto');
            });
        }

        this.each(function () {
            maxHeight = maxHeight > $(this).height() ? maxHeight : $(this).height();
        });

        this.each(function () {
            $(this).height(maxHeight);
        });

        return this;
    };

    $.fn.horizontalMargins = function () {
        var $self = $(this);
        return parseInt($self.css('marginLeft')) + parseInt($self.css('marginRight'));
    };

    $.fn.verticalMargins = function () {
        var $self = $(this);
        return parseInt($self.css('marginTop')) + parseInt($self.css('marginBottom'));
    };

    $.fn.horizontalPadding = function () {
        var $self = $(this);
        return parseInt($self.css('paddingLeft')) + parseInt($self.css('paddingRight'));
    };

    $.fn.verticalPadding = function () {
        var $self = $(this);
        return parseInt($self.css('paddingTop')) + parseInt($self.css('paddingBottom'));
    };

    $.fn.onPressed = function (callback) {

        return this.each(function() {

            var $this = $(this);

            $this.on('click', function(e) {
                e.preventDefault();
                callback();
            });

            $this.on('keyup', function(e) {
                if (e.keyCode == 13) {
                    e.preventDefault();
                    callback();
                }
            });
        });
    };

    $.fn.onEnter = function (callback) {

        return this.each(function() {

            var $this = $(this);

            $this.on('keyup', function(e) {
                if (e.keyCode == 13) {
                    e.preventDefault();
                    callback();
                }
            });
        });
    };

})(jQuery);

(function ($) {
    var on = $.fn.on, timer;
    $.fn.on = function () {
        var args = Array.apply(null, arguments);
        var last = args[args.length - 1];

        if (isNaN(last) || (last === 1 && args.pop())) return on.apply(this, args);

        var delay = args.pop();
        var fn = args.pop();

        args.push(function () {
            var self = this, params = arguments;
            clearTimeout(timer);
            timer = setTimeout(function () {
                fn.apply(self, params);
            }, delay);
        });

        return on.apply(this, args);
    };
})(jQuery);

/*!
 * jQuery Cookie Plugin
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2011, Klaus Hartl
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/GPL-2.0
 */
(function($) {
    $.cookie = function(key, value, options) {

        // key and at least value given, set cookie...
        if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value === null || value === undefined)) {
            options = $.extend({}, options);

            if (value === null || value === undefined) {
                options.expires = -1;
            }

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setDate(t.getDate() + days);
            }

            value = String(value);

            return (document.cookie = [
                encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path    ? '; path=' + options.path : '',
                options.domain  ? '; domain=' + options.domain : '',
                options.secure  ? '; secure' : ''
            ].join(''));
        }

        // key and possibly options given, get cookie...
        options = value || {};
        var decode = options.raw ? function(s) { return s; } : decodeURIComponent;

        var pairs = document.cookie.split('; ');
        for (var i = 0, pair; pair = pairs[i] && pairs[i].split('='); i++) {
            if (decode(pair[0]) === key) return decode(pair[1] || ''); // IE saves cookies with empty string as "c; ", e.g. without "=" as opposed to EOMB, thus pair[1] may be undefined
        }
        return null;
    };
})(jQuery);

(function($){
    $.mlp = {x:0,y:0}; // Mouse Last Position
    function documentHandler(){
        var $current = this === document ? $(this) : $(this).contents();
        $current.mousemove(function(e){jQuery.mlp = {x:e.pageX,y:e.pageY}});
        $current.find("iframe").load(documentHandler);
    }
    $(documentHandler);
    $.fn.ismouseover = function(overThis) {
        var result = false;
        this.eq(0).each(function() {
            var $current = $(this).is("iframe") ? $(this).contents().find("body") : $(this);
            var offset = $current.offset();
            result =    offset.left<=$.mlp.x && offset.left + $current.outerWidth() > $.mlp.x &&
            offset.top<=$.mlp.y && offset.top + $current.outerHeight() > $.mlp.y;
        });
        return result;
    };
})(jQuery);
define("plugins", ["jquery"], function(){});

//     Underscore.js 1.6.0
//     http://underscorejs.org
//     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
(function(){var n=this,t=n._,r={},e=Array.prototype,u=Object.prototype,i=Function.prototype,a=e.push,o=e.slice,c=e.concat,l=u.toString,f=u.hasOwnProperty,s=e.forEach,p=e.map,h=e.reduce,v=e.reduceRight,g=e.filter,d=e.every,m=e.some,y=e.indexOf,b=e.lastIndexOf,x=Array.isArray,w=Object.keys,_=i.bind,j=function(n){return n instanceof j?n:this instanceof j?void(this._wrapped=n):new j(n)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=j),exports._=j):n._=j,j.VERSION="1.6.0";var A=j.each=j.forEach=function(n,t,e){if(null==n)return n;if(s&&n.forEach===s)n.forEach(t,e);else if(n.length===+n.length){for(var u=0,i=n.length;i>u;u++)if(t.call(e,n[u],u,n)===r)return}else for(var a=j.keys(n),u=0,i=a.length;i>u;u++)if(t.call(e,n[a[u]],a[u],n)===r)return;return n};j.map=j.collect=function(n,t,r){var e=[];return null==n?e:p&&n.map===p?n.map(t,r):(A(n,function(n,u,i){e.push(t.call(r,n,u,i))}),e)};var O="Reduce of empty array with no initial value";j.reduce=j.foldl=j.inject=function(n,t,r,e){var u=arguments.length>2;if(null==n&&(n=[]),h&&n.reduce===h)return e&&(t=j.bind(t,e)),u?n.reduce(t,r):n.reduce(t);if(A(n,function(n,i,a){u?r=t.call(e,r,n,i,a):(r=n,u=!0)}),!u)throw new TypeError(O);return r},j.reduceRight=j.foldr=function(n,t,r,e){var u=arguments.length>2;if(null==n&&(n=[]),v&&n.reduceRight===v)return e&&(t=j.bind(t,e)),u?n.reduceRight(t,r):n.reduceRight(t);var i=n.length;if(i!==+i){var a=j.keys(n);i=a.length}if(A(n,function(o,c,l){c=a?a[--i]:--i,u?r=t.call(e,r,n[c],c,l):(r=n[c],u=!0)}),!u)throw new TypeError(O);return r},j.find=j.detect=function(n,t,r){var e;return k(n,function(n,u,i){return t.call(r,n,u,i)?(e=n,!0):void 0}),e},j.filter=j.select=function(n,t,r){var e=[];return null==n?e:g&&n.filter===g?n.filter(t,r):(A(n,function(n,u,i){t.call(r,n,u,i)&&e.push(n)}),e)},j.reject=function(n,t,r){return j.filter(n,function(n,e,u){return!t.call(r,n,e,u)},r)},j.every=j.all=function(n,t,e){t||(t=j.identity);var u=!0;return null==n?u:d&&n.every===d?n.every(t,e):(A(n,function(n,i,a){return(u=u&&t.call(e,n,i,a))?void 0:r}),!!u)};var k=j.some=j.any=function(n,t,e){t||(t=j.identity);var u=!1;return null==n?u:m&&n.some===m?n.some(t,e):(A(n,function(n,i,a){return u||(u=t.call(e,n,i,a))?r:void 0}),!!u)};j.contains=j.include=function(n,t){return null==n?!1:y&&n.indexOf===y?n.indexOf(t)!=-1:k(n,function(n){return n===t})},j.invoke=function(n,t){var r=o.call(arguments,2),e=j.isFunction(t);return j.map(n,function(n){return(e?t:n[t]).apply(n,r)})},j.pluck=function(n,t){return j.map(n,j.property(t))},j.where=function(n,t){return j.filter(n,j.matches(t))},j.findWhere=function(n,t){return j.find(n,j.matches(t))},j.max=function(n,t,r){if(!t&&j.isArray(n)&&n[0]===+n[0]&&n.length<65535)return Math.max.apply(Math,n);var e=-1/0,u=-1/0;return A(n,function(n,i,a){var o=t?t.call(r,n,i,a):n;o>u&&(e=n,u=o)}),e},j.min=function(n,t,r){if(!t&&j.isArray(n)&&n[0]===+n[0]&&n.length<65535)return Math.min.apply(Math,n);var e=1/0,u=1/0;return A(n,function(n,i,a){var o=t?t.call(r,n,i,a):n;u>o&&(e=n,u=o)}),e},j.shuffle=function(n){var t,r=0,e=[];return A(n,function(n){t=j.random(r++),e[r-1]=e[t],e[t]=n}),e},j.sample=function(n,t,r){return null==t||r?(n.length!==+n.length&&(n=j.values(n)),n[j.random(n.length-1)]):j.shuffle(n).slice(0,Math.max(0,t))};var E=function(n){return null==n?j.identity:j.isFunction(n)?n:j.property(n)};j.sortBy=function(n,t,r){return t=E(t),j.pluck(j.map(n,function(n,e,u){return{value:n,index:e,criteria:t.call(r,n,e,u)}}).sort(function(n,t){var r=n.criteria,e=t.criteria;if(r!==e){if(r>e||r===void 0)return 1;if(e>r||e===void 0)return-1}return n.index-t.index}),"value")};var F=function(n){return function(t,r,e){var u={};return r=E(r),A(t,function(i,a){var o=r.call(e,i,a,t);n(u,o,i)}),u}};j.groupBy=F(function(n,t,r){j.has(n,t)?n[t].push(r):n[t]=[r]}),j.indexBy=F(function(n,t,r){n[t]=r}),j.countBy=F(function(n,t){j.has(n,t)?n[t]++:n[t]=1}),j.sortedIndex=function(n,t,r,e){r=E(r);for(var u=r.call(e,t),i=0,a=n.length;a>i;){var o=i+a>>>1;r.call(e,n[o])<u?i=o+1:a=o}return i},j.toArray=function(n){return n?j.isArray(n)?o.call(n):n.length===+n.length?j.map(n,j.identity):j.values(n):[]},j.size=function(n){return null==n?0:n.length===+n.length?n.length:j.keys(n).length},j.first=j.head=j.take=function(n,t,r){return null==n?void 0:null==t||r?n[0]:0>t?[]:o.call(n,0,t)},j.initial=function(n,t,r){return o.call(n,0,n.length-(null==t||r?1:t))},j.last=function(n,t,r){return null==n?void 0:null==t||r?n[n.length-1]:o.call(n,Math.max(n.length-t,0))},j.rest=j.tail=j.drop=function(n,t,r){return o.call(n,null==t||r?1:t)},j.compact=function(n){return j.filter(n,j.identity)};var M=function(n,t,r){return t&&j.every(n,j.isArray)?c.apply(r,n):(A(n,function(n){j.isArray(n)||j.isArguments(n)?t?a.apply(r,n):M(n,t,r):r.push(n)}),r)};j.flatten=function(n,t){return M(n,t,[])},j.without=function(n){return j.difference(n,o.call(arguments,1))},j.partition=function(n,t){var r=[],e=[];return A(n,function(n){(t(n)?r:e).push(n)}),[r,e]},j.uniq=j.unique=function(n,t,r,e){j.isFunction(t)&&(e=r,r=t,t=!1);var u=r?j.map(n,r,e):n,i=[],a=[];return A(u,function(r,e){(t?e&&a[a.length-1]===r:j.contains(a,r))||(a.push(r),i.push(n[e]))}),i},j.union=function(){return j.uniq(j.flatten(arguments,!0))},j.intersection=function(n){var t=o.call(arguments,1);return j.filter(j.uniq(n),function(n){return j.every(t,function(t){return j.contains(t,n)})})},j.difference=function(n){var t=c.apply(e,o.call(arguments,1));return j.filter(n,function(n){return!j.contains(t,n)})},j.zip=function(){for(var n=j.max(j.pluck(arguments,"length").concat(0)),t=new Array(n),r=0;n>r;r++)t[r]=j.pluck(arguments,""+r);return t},j.object=function(n,t){if(null==n)return{};for(var r={},e=0,u=n.length;u>e;e++)t?r[n[e]]=t[e]:r[n[e][0]]=n[e][1];return r},j.indexOf=function(n,t,r){if(null==n)return-1;var e=0,u=n.length;if(r){if("number"!=typeof r)return e=j.sortedIndex(n,t),n[e]===t?e:-1;e=0>r?Math.max(0,u+r):r}if(y&&n.indexOf===y)return n.indexOf(t,r);for(;u>e;e++)if(n[e]===t)return e;return-1},j.lastIndexOf=function(n,t,r){if(null==n)return-1;var e=null!=r;if(b&&n.lastIndexOf===b)return e?n.lastIndexOf(t,r):n.lastIndexOf(t);for(var u=e?r:n.length;u--;)if(n[u]===t)return u;return-1},j.range=function(n,t,r){arguments.length<=1&&(t=n||0,n=0),r=arguments[2]||1;for(var e=Math.max(Math.ceil((t-n)/r),0),u=0,i=new Array(e);e>u;)i[u++]=n,n+=r;return i};var R=function(){};j.bind=function(n,t){var r,e;if(_&&n.bind===_)return _.apply(n,o.call(arguments,1));if(!j.isFunction(n))throw new TypeError;return r=o.call(arguments,2),e=function(){if(!(this instanceof e))return n.apply(t,r.concat(o.call(arguments)));R.prototype=n.prototype;var u=new R;R.prototype=null;var i=n.apply(u,r.concat(o.call(arguments)));return Object(i)===i?i:u}},j.partial=function(n){var t=o.call(arguments,1);return function(){for(var r=0,e=t.slice(),u=0,i=e.length;i>u;u++)e[u]===j&&(e[u]=arguments[r++]);for(;r<arguments.length;)e.push(arguments[r++]);return n.apply(this,e)}},j.bindAll=function(n){var t=o.call(arguments,1);if(0===t.length)throw new Error("bindAll must be passed function names");return A(t,function(t){n[t]=j.bind(n[t],n)}),n},j.memoize=function(n,t){var r={};return t||(t=j.identity),function(){var e=t.apply(this,arguments);return j.has(r,e)?r[e]:r[e]=n.apply(this,arguments)}},j.delay=function(n,t){var r=o.call(arguments,2);return setTimeout(function(){return n.apply(null,r)},t)},j.defer=function(n){return j.delay.apply(j,[n,1].concat(o.call(arguments,1)))},j.throttle=function(n,t,r){var e,u,i,a=null,o=0;r||(r={});var c=function(){o=r.leading===!1?0:j.now(),a=null,i=n.apply(e,u),e=u=null};return function(){var l=j.now();o||r.leading!==!1||(o=l);var f=t-(l-o);return e=this,u=arguments,0>=f?(clearTimeout(a),a=null,o=l,i=n.apply(e,u),e=u=null):a||r.trailing===!1||(a=setTimeout(c,f)),i}},j.debounce=function(n,t,r){var e,u,i,a,o,c=function(){var l=j.now()-a;t>l?e=setTimeout(c,t-l):(e=null,r||(o=n.apply(i,u),i=u=null))};return function(){i=this,u=arguments,a=j.now();var l=r&&!e;return e||(e=setTimeout(c,t)),l&&(o=n.apply(i,u),i=u=null),o}},j.once=function(n){var t,r=!1;return function(){return r?t:(r=!0,t=n.apply(this,arguments),n=null,t)}},j.wrap=function(n,t){return j.partial(t,n)},j.compose=function(){var n=arguments;return function(){for(var t=arguments,r=n.length-1;r>=0;r--)t=[n[r].apply(this,t)];return t[0]}},j.after=function(n,t){return function(){return--n<1?t.apply(this,arguments):void 0}},j.keys=function(n){if(!j.isObject(n))return[];if(w)return w(n);var t=[];for(var r in n)j.has(n,r)&&t.push(r);return t},j.values=function(n){for(var t=j.keys(n),r=t.length,e=new Array(r),u=0;r>u;u++)e[u]=n[t[u]];return e},j.pairs=function(n){for(var t=j.keys(n),r=t.length,e=new Array(r),u=0;r>u;u++)e[u]=[t[u],n[t[u]]];return e},j.invert=function(n){for(var t={},r=j.keys(n),e=0,u=r.length;u>e;e++)t[n[r[e]]]=r[e];return t},j.functions=j.methods=function(n){var t=[];for(var r in n)j.isFunction(n[r])&&t.push(r);return t.sort()},j.extend=function(n){return A(o.call(arguments,1),function(t){if(t)for(var r in t)n[r]=t[r]}),n},j.pick=function(n){var t={},r=c.apply(e,o.call(arguments,1));return A(r,function(r){r in n&&(t[r]=n[r])}),t},j.omit=function(n){var t={},r=c.apply(e,o.call(arguments,1));for(var u in n)j.contains(r,u)||(t[u]=n[u]);return t},j.defaults=function(n){return A(o.call(arguments,1),function(t){if(t)for(var r in t)n[r]===void 0&&(n[r]=t[r])}),n},j.clone=function(n){return j.isObject(n)?j.isArray(n)?n.slice():j.extend({},n):n},j.tap=function(n,t){return t(n),n};var S=function(n,t,r,e){if(n===t)return 0!==n||1/n==1/t;if(null==n||null==t)return n===t;n instanceof j&&(n=n._wrapped),t instanceof j&&(t=t._wrapped);var u=l.call(n);if(u!=l.call(t))return!1;switch(u){case"[object String]":return n==String(t);case"[object Number]":return n!=+n?t!=+t:0==n?1/n==1/t:n==+t;case"[object Date]":case"[object Boolean]":return+n==+t;case"[object RegExp]":return n.source==t.source&&n.global==t.global&&n.multiline==t.multiline&&n.ignoreCase==t.ignoreCase}if("object"!=typeof n||"object"!=typeof t)return!1;for(var i=r.length;i--;)if(r[i]==n)return e[i]==t;var a=n.constructor,o=t.constructor;if(a!==o&&!(j.isFunction(a)&&a instanceof a&&j.isFunction(o)&&o instanceof o)&&"constructor"in n&&"constructor"in t)return!1;r.push(n),e.push(t);var c=0,f=!0;if("[object Array]"==u){if(c=n.length,f=c==t.length)for(;c--&&(f=S(n[c],t[c],r,e)););}else{for(var s in n)if(j.has(n,s)&&(c++,!(f=j.has(t,s)&&S(n[s],t[s],r,e))))break;if(f){for(s in t)if(j.has(t,s)&&!c--)break;f=!c}}return r.pop(),e.pop(),f};j.isEqual=function(n,t){return S(n,t,[],[])},j.isEmpty=function(n){if(null==n)return!0;if(j.isArray(n)||j.isString(n))return 0===n.length;for(var t in n)if(j.has(n,t))return!1;return!0},j.isElement=function(n){return!(!n||1!==n.nodeType)},j.isArray=x||function(n){return"[object Array]"==l.call(n)},j.isObject=function(n){return n===Object(n)},A(["Arguments","Function","String","Number","Date","RegExp"],function(n){j["is"+n]=function(t){return l.call(t)=="[object "+n+"]"}}),j.isArguments(arguments)||(j.isArguments=function(n){return!(!n||!j.has(n,"callee"))}),"function"!=typeof/./&&(j.isFunction=function(n){return"function"==typeof n}),j.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))},j.isNaN=function(n){return j.isNumber(n)&&n!=+n},j.isBoolean=function(n){return n===!0||n===!1||"[object Boolean]"==l.call(n)},j.isNull=function(n){return null===n},j.isUndefined=function(n){return n===void 0},j.has=function(n,t){return f.call(n,t)},j.noConflict=function(){return n._=t,this},j.identity=function(n){return n},j.constant=function(n){return function(){return n}},j.property=function(n){return function(t){return t[n]}},j.matches=function(n){return function(t){if(t===n)return!0;for(var r in n)if(n[r]!==t[r])return!1;return!0}},j.times=function(n,t,r){for(var e=Array(Math.max(0,n)),u=0;n>u;u++)e[u]=t.call(r,u);return e},j.random=function(n,t){return null==t&&(t=n,n=0),n+Math.floor(Math.random()*(t-n+1))},j.now=Date.now||function(){return(new Date).getTime()};var T={escape:{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;"}};T.unescape=j.invert(T.escape);var I={escape:new RegExp("["+j.keys(T.escape).join("")+"]","g"),unescape:new RegExp("("+j.keys(T.unescape).join("|")+")","g")};j.each(["escape","unescape"],function(n){j[n]=function(t){return null==t?"":(""+t).replace(I[n],function(t){return T[n][t]})}}),j.result=function(n,t){if(null==n)return void 0;var r=n[t];return j.isFunction(r)?r.call(n):r},j.mixin=function(n){A(j.functions(n),function(t){var r=j[t]=n[t];j.prototype[t]=function(){var n=[this._wrapped];return a.apply(n,arguments),z.call(this,r.apply(j,n))}})};var N=0;j.uniqueId=function(n){var t=++N+"";return n?n+t:t},j.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var q=/(.)^/,B={"'":"'","\\":"\\","\r":"r","\n":"n","   ":"t","\u2028":"u2028","\u2029":"u2029"},D=/\\|'|\r|\n|\t|\u2028|\u2029/g;j.template=function(n,t,r){var e;r=j.defaults({},r,j.templateSettings);var u=new RegExp([(r.escape||q).source,(r.interpolate||q).source,(r.evaluate||q).source].join("|")+"|$","g"),i=0,a="__p+='";n.replace(u,function(t,r,e,u,o){return a+=n.slice(i,o).replace(D,function(n){return"\\"+B[n]}),r&&(a+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'"),e&&(a+="'+\n((__t=("+e+"))==null?'':__t)+\n'"),u&&(a+="';\n"+u+"\n__p+='"),i=o+t.length,t}),a+="';\n",r.variable||(a="with(obj||{}){\n"+a+"}\n"),a="var __t,__p='',__j=Array.prototype.join,"+"print=function(){__p+=__j.call(arguments,'');};\n"+a+"return __p;\n";try{e=new Function(r.variable||"obj","_",a)}catch(o){throw o.source=a,o}if(t)return e(t,j);var c=function(n){return e.call(this,n,j)};return c.source="function("+(r.variable||"obj")+"){\n"+a+"}",c},j.chain=function(n){return j(n).chain()};var z=function(n){return this._chain?j(n).chain():n};j.mixin(j),A(["pop","push","reverse","shift","sort","splice","unshift"],function(n){var t=e[n];j.prototype[n]=function(){var r=this._wrapped;return t.apply(r,arguments),"shift"!=n&&"splice"!=n||0!==r.length||delete r[0],z.call(this,r)}}),A(["concat","join","slice"],function(n){var t=e[n];j.prototype[n]=function(){return z.call(this,t.apply(this._wrapped,arguments))}}),j.extend(j.prototype,{chain:function(){return this._chain=!0,this},value:function(){return this._wrapped}}),"function"==typeof define&&define.amd&&define("underscore",[],function(){return j})}).call(this);
/*! Tiny Pub/Sub - v0.7.0 - 2013-01-29
* https://github.com/cowboy/jquery-tiny-pubsub
* Copyright (c) 2013 "Cowboy" Ben Alman; Licensed MIT */
(function (n) { var u = n({}); n.subscribe = function () { u.on.apply(u, arguments) }, n.unsubscribe = function () { u.off.apply(u, arguments) }, n.publish = function () { u.trigger.apply(u, arguments) } })(jQuery);
define("pubsub", ["jquery"], function(){});

/*! jsviews.js v1.0.0-alpha single-file version:
 includes JsRender, JsObservable and JsViews  http://github.com/BorisMoore/jsrender and http://jsviews.com/jsviews
 off(informal pre V1.0 commit counter: 61 (Beta Candidate) */
(function(n,t,i){function et(n,t){for(var i in t.props)bt.test(i)&&(n[i]=t.props[i])}function ot(n){return n}function rr(n){return n}function gt(n){s._dbgMode=n;wt=n?"Unavailable (nested view): use #getIndex()":"";yt("dbg",li.dbg=tt.dbg=n?rr:ot)}function st(n){this.name=(r.link?"JsViews":"JsRender")+" Error";this.message=n||this.name}function f(n,t){for(var i in t)n[i]=t[i];return n}function d(n){return typeof n=="function"}function ni(n,t,i){return(!o.rTag||n)&&(p=n?n.charAt(0):p,w=n?n.charAt(1):w,h=t?t.charAt(0):h,v=t?t.charAt(1):v,nt=i||nt,n="\\"+p+"(\\"+nt+")?\\"+w,t="\\"+h+"\\"+v,y="(?:(?:(\\w+(?=[\\/\\s\\"+h+"]))|(?:(\\w+)?(:)|(>)|!--((?:[^-]|-(?!-))*)--|(\\*)))\\s*((?:[^\\"+h+"]|\\"+h+"(?!\\"+v+"))*?)",o.rTag=y+")",y=new RegExp(n+y+"(\\/)?|(?:\\/(\\w+)))"+t,"g"),pt=new RegExp("<.*>|([^\\\\]|^)[{}]|"+n+".*"+t)),[p,w,h,v,nt]}function ur(n,t){t||(t=n,n=i);var e,f,o,u,r=this,s=!t||t==="root";if(n){if(u=r.type===t?r:i,!u)if(e=r.views,r._.useKey){for(f in e)if(u=e[f].get(n,t))break}else for(f=0,o=e.length;!u&&f<o;f++)u=e[f].get(n,t)}else if(s)while(r.parent.parent)u=r=r.parent;else while(r&&!u)u=r.type===t?r:i,r=r.parent;return u}function ti(){var n=this.get("item");return n?n.index:i}function ii(){return this.index}function fr(t){var u,e=this,o=e.linkCtx,r=(e.ctx||{})[t];return r===i&&o&&o.ctx&&(r=o.ctx[t]),r===i&&(r=li[t]),r&&d(r)&&!r._wrp&&(u=function(){return r.apply(!this||this===n?e:this,arguments)},u._wrp=!0,f(u,r)),u||r}function er(n,t,r,f){var e,s,c=+r===r&&t.tmpl.bnds[r-1],h=t.linkCtx;return f=f!==i&&{props:{},args:[f]},r=f||(c?c(t.data,t,u):r),s=r.args[0],(n||c)&&(e=h&&h.tag,e||(e={_:{inline:!h,bnd:c},tagName:":",cvt:n,flow:!0,tagCtx:r,_is:"tag"},h&&(h.tag=e,e.linkCtx=h),r.ctx=a(r.ctx,(h?h.view:t).ctx),o._lnk(e)),e._er=f&&s,et(e,r),r.view=t,e.ctx=r.ctx||{},delete r.ctx,t._.tag=e,s=ht(e,e.convert||n!=="true"&&n)[0],s=c&&t._.onRender?t._.onRender(s,t,c):s,t._.tag=i),s!=i?s:""}function ht(n,t){var r=n.tagCtx,u=r.view,i=r.args;return t=t&&(""+t===t?u.getRsc("converters",t)||c("Unknown converter: '"+t+"'"):t),i=!i.length&&!r.index?[u.data]:t?i.slice():i,t&&(t.depends&&(n.depends=o.getDeps(n.depends,n,t.depends,t)),i[0]=t.apply(n,i)),i}function or(n,t){for(var f,e,r=this;f===i&&r;)e=r.tmpl[n],f=e&&e[t],r=r.parent;return f||u[n][t]}function sr(n,t,r,s,h,l){var v,lt,at,ot,p,vt,nt,y,st,rt,it,yt,pt,d,k,ct,wt,g="",w=t.linkCtx||0,ut=t.ctx,bt=r||t.tmpl,ft=+s===s&&bt.bnds[s-1];for(n._is==="tag"&&(v=n,n=v.tagName,s=v.tagCtxs),v=v||w.tag,l=l!==i&&(g+=l,[{props:{},args:[]}]),s=l||(ft?ft(t.data,t,u):s),vt=s.length,p=0;p<vt;p++)p||r&&v||(it=t.getRsc("tags",n)||c("Unknown tag: {{"+n+"}}")),y=s[p],(!w.tag||v._er)&&(rt=y.tmpl,rt=y.content=rt&&bt.tmpls[rt-1],f(y,{tmpl:(v?v:it).template||rt,render:oi,index:p,view:t,ctx:a(y.ctx,ut)})),(r=y.props.tmpl)&&(r=""+r===r?t.getRsc("templates",r)||e(r):r,y.tmpl=r),v||(it._ctr?(v=new it._ctr,yt=!!v.init):o._lnk(v={render:it.render}),v._={inline:!w},w&&(w.tag=v,v.linkCtx=w),(v._.bnd=ft||w.fn)?v._.arrVws={}:v.dataBoundOnly&&c("{^{"+n+"}} tag must be data-bound"),v.tagName=n,v.parent=ot=ut&&ut.tag,v._is="tag",v._def=it,v.tagCtxs=s),y.tag=v,v.dataMap&&v.tagCtxs&&(y.map=v.tagCtxs[p].map),v.flow||(st=y.ctx=y.ctx||{},lt=v.parents=st.parentTags=ut&&a(st.parentTags,ut.parentTags)||{},ot&&(lt[ot.tagName]=ot),lt[v.tagName]=st.tag=v);if(t._.tag=v,!(v._er=l)){for(et(v,s[0]),v.rendering={},p=0;p<vt;p++)y=v.tagCtx=v.tagCtxs[p],ct=y.props,k=ht(v,v.convert),(pt=ct.dataMap||v.dataMap)&&(k.length||ct.dataMap)&&(d=y.map,(!d||d.src!==k[0]||h)&&(d&&d.src&&d.unmap(),d=y.map=pt.map(k[0],ct)),k=[d.tgt]),v.ctx=y.ctx,!p&&yt&&(wt=v.template,v.init(y,w,v.ctx),yt=i,v.template!==wt&&(v._.tmpl=v.template),w&&(w.attr=v.attr=w.attr||v.attr)),nt=i,v.render&&(nt=v.render.apply(v,k)),k=k.length?k:[t],nt=nt!==i?nt:y.render(k[0],!0)||(h?i:""),g=g?g+(nt||""):nt;delete v.rendering}return v.tagCtx=v.tagCtxs[0],v.ctx=v.tagCtx.ctx,v._.inline&&(at=v.attr)&&at!==b&&(g=at==="text"?tt.html(g):""),ft&&t._.onRender?t._.onRender(g,t,ft):g}function g(n,t,i,r,u,f,e,o){var a,h,c,s=this,v=t==="array",l={key:0,useKey:v?0:1,id:""+ir++,onRender:o,bnds:{}};s.data=r;s.tmpl=u;s.content=e;s.views=v?[]:{};s.parent=i;s.type=t||"top";s._=l;s.linked=!!o;i?(a=i.views,h=i._,h.useKey?(a[l.key="_"+h.useKey++]=s,s.index=wt,s.getIndex=ti,c=h.tag,l.bnd=v&&(!c||!!c._.bnd&&c)):a.splice(l.key=s.index=f,0,s),s.ctx=n||i.ctx):s.ctx=n}function hr(n){var i,r,t,u,e,f,s;for(i in k)if(e=k[i],(f=e.compile)&&(r=n[i+"s"]))for(t in r)u=r[t]=f(t,r[t],n),u&&(s=o.onStore[i])&&s(t,u,f)}function cr(n,t,u){var h,s,o;return d(t)?t={depends:t.depends,render:t}:((o=t.baseTag)&&(t.baseTag=o=""+o===o?u&&u.tags[o]||r.views.tags[o]:o,t.flow=!!t.flow,t=f(f({},o),t)),(s=t.template)!==i&&(t.template=""+s===s?e[s]||e(s):s),t.init!==!1&&(h=t._ctr=function(){},(h.prototype=t).constructor=h)),u&&(t._parentTmpl=u),t}function ri(r,u,f,o){function c(u){if(""+u===u||u.nodeType>0){try{h=u.nodeType>0?u:!pt.test(u)&&t&&t(n.document).find(u)[0]}catch(s){}return h&&(u=e[r=r||h.getAttribute(ft)],u||(r=r||"_"+tr++,h.setAttribute(ft,r),u=e[r]=ri(r,h.innerHTML,f,o)),h=i),u}}var s,h;return u=u||"",s=c(u),o=o||(u.markup?u:{}),o.tmplName=r,f&&(o._parentTmpl=f),!s&&u.markup&&(s=c(u.markup))&&s.fn&&(s.debug!==u.debug||s.allowCode!==u.allowCode)&&(s=s.markup),s!==i?(r&&!f&&(dt[r]=function(){return u.render.apply(u,arguments)}),s.fn||u.fn?s.fn&&(u=r&&r!==s.tmplName?a(o,s):s):(u=fi(s,o),lt(s.replace(wi,"\\$&"),u)),hr(o),u):void 0}function ui(n){function t(t,i){this.tgt=n.getTgt(t,i)}return d(n)&&(n={getTgt:n}),n.baseMap&&(n=f(f({},n.baseMap),n)),n.map=function(n,i){return new t(n,i)},n}function fi(n,t){var i,e=s.wrapMap||{},u=f({markup:n,tmpls:[],links:{},tags:{},bnds:[],_is:"template",render:ei},t);return t.htmlTag||(i=di.exec(n),u.htmlTag=i?i[1].toLowerCase():""),i=e[u.htmlTag],i&&i!==e.div&&(u.markup=r.trim(u.markup)),u}function lr(n,t){function r(e,s,h){var v,c,l,a;if(e&&typeof e===ut&&!e.nodeType&&!e.markup&&!e.getTgt){for(l in e)r(l,e[l],s);return u}return s===i&&(s=e,e=i),e&&""+e!==e&&(h=s,s=e,e=i),a=h?h[f]=h[f]||{}:r,c=t.compile,s===null?e&&delete a[e]:(s=c?s=c(e,s,h):s,e&&(a[e]=s)),c&&s&&(s._is=n),s&&(v=o.onStore[n])&&v(e,s,c),s}var f=n+"s";u[f]=r;k[n]=t}function ar(n,t,i){var r=this.jquery&&(this[0]||c('Unknown template: "'+this.selector+'"')),u=r.getAttribute(ft);return ei.call(u?e[u]:e(r),n,t,i)}function ct(n,t,i){if(s._dbgMode)try{return n.fn(t,i,u)}catch(r){return c(r,i)}return n.fn(t,i,u)}function ei(n,t,i,u,f,e){var o=this;return!u&&o.fn._nvw&&!r.isArray(n)?ct(o,n,{tmpl:o}):oi.call(o,n,t,i,u,f,e)}function oi(n,t,u,f,o,s){var y,ft,d,l,nt,tt,it,p,v,rt,w,et,h,ot,c=this,k="";if(!!t===t&&(u=t,t=i),typeof t!==ut&&(t=i),o===!0&&(it=!0,o=0),c.tag?(p=c,c=c.tag,rt=c._,et=c.tagName,h=rt.tmpl||p.tmpl,ot=c.attr&&c.attr!==b,t=a(t,c.ctx),v=p.content,p.props.link===!1&&(t=t||{},t.link=!1),f=f||p.view,n=arguments.length?n:f):h=c,h&&(!f&&n&&n._is==="view"&&(f=n),f&&(v=v||f.content,s=s||f._.onRender,n===f&&(n=f.data),t=a(t,f.ctx)),f&&f.type!=="top"||((t=t||{}).root=n),h.fn||(h=e[h]||e(h)),h)){if(s=(t&&t.link)!==!1&&!ot&&s,w=s,s===!0&&(w=i,s=f._.onRender),t=h.helpers?a(h.helpers,t):t,r.isArray(n)&&!u)for(l=it?f:o!==i&&f||new g(t,"array",f,n,h,o,v,s),y=0,ft=n.length;y<ft;y++)d=n[y],nt=new g(t,"item",l,d,h,(o||0)+y,v,s),tt=ct(h,d,nt),k+=l._.onRender?l._.onRender(tt,nt):tt;else(f||!h.fn._nvw)&&(l=it?f:new g(t,et||"data",f,n,h,o,v,s),rt&&!c.flow&&(l.tag=c)),k+=ct(h,n,l);return w?w(k,l):k}return""}function c(n,t,i){var r=s.onError(n,t,i);if(""+n===n)throw new o.Err(r);return!t.linkCtx&&t.linked?tt.html(r):r}function l(n){c("Syntax error\n"+n)}function lt(n,t,i,r){function k(t){t-=f;t&&h.push(n.substr(f,t).replace(rt,"\\n"))}function c(t){t&&l('Unmatched or missing tag: "{{/'+t+'}}" in template:\n'+n)}function d(e,o,v,y,p,d,nt,tt,it,ut,ft,et){d&&(p=":",y=b);ut=ut||i;var ot=(o||i)&&[[]],ht="",ct="",lt="",at="",vt="",yt="",pt="",wt="",st=!ut&&!p&&!nt;v=v||(it=it||"#data",p);k(et);f=et+e.length;tt?g&&h.push(["*","\n"+it.replace(pi,"$1")+"\n"]):v?(v==="else"&&(ki.test(it)&&l('for "{{else if expr}}" use "{{else expr}}"'),ot=u[7],u[8]=n.substring(u[8],et),u=s.pop(),h=u[2],st=!0),it&&(ci(it.replace(rt," "),ot,t).replace(bi,function(n,t,i,r,u,f,e,o){return e?(ct+=f+",",at+="'"+o+"',"):i?(lt+=r+f+",",yt+=r+"'"+o+"',"):t?pt+=f:(u==="trigger"&&(wt+=f),ht+=r+f+",",vt+=r+"'"+o+"',",w=w||bt.test(u)),""}).slice(0,-1),ot&&ot[0]&&ot.pop()),a=[v,y||!!r||w||"",st&&[],si(at,vt,yt),si(ct,ht,lt),pt,wt,ot||0],h.push(a),st&&(s.push(u),u=a,u[8]=f)):ft&&(c(ft!==u[0]&&u[0]!=="else"&&ft),u[8]=n.substring(u[8],et),u=s.pop());c(!u&&ft);h=u[2]}var o,a,w,g=t&&t.allowCode,e=[],f=0,s=[],h=e,u=[,,e];return i&&(n=p+n+v),c(s[0]&&s[0][2].pop()[0]),n.replace(y,d),k(n.length),(f=e[e.length-1])&&c(""+f!==f&&+f[8]===f[8]&&f[0]),i?(o=vt(e,n,i),at(o,e[0][7])):o=vt(e,t),o._nvw&&(o._nvw=!/[~#]/.test(n)),o}function at(n,t){n.deps=[];for(var i in t)i!=="_jsvto"&&t[i].length&&(n.deps=n.deps.concat(t[i]));n.paths=t}function si(n,t,i){return[n.slice(0,-1),t.slice(0,-1),i.slice(0,-1)]}function hi(n,t){return"\n\t"+(t?t+":{":"")+"args:["+n[0]+"]"+(n[1]||!t?",\n\tprops:{"+n[1]+"}":"")+(n[2]?",\n\tctx:{"+n[2]+"}":"")}function ci(n,t,i){function d(d,g,nt,tt,it,rt,ut,ft,et,ot,st,ht,ct,at,vt,yt,pt,wt,bt,kt){function ri(n,i,o,s,h,c,l,a){var y=o===".";if(o&&(it=it.slice(i.length),y||(n=(s?'view.hlp("'+s+'")':h?"view":"data")+(a?(c?"."+c:s?"":h?"":"."+o)+(l||""):(a=s?"":h?c||"":o,"")),n=n+(a?"."+a:""),n=i+(n.slice(0,9)==="view.data"?n.slice(5):n)),u)){if(gt=e==="linkTo"?v=t._jsvto=t._jsvto||[]:f.bd,dt=y&&gt[gt.length-1]){if(dt._jsv){while(dt.sb)dt=dt.sb;dt.bnd&&(it="^"+it.slice(1));dt.sb=it;dt.bnd=dt.bnd||it.charAt(0)==="^"}}else gt.push(it);k[r]=bt+(y?1:0)}return n}tt&&!ft&&(it=tt+it);rt=rt||"";nt=nt||g||ht;it=it||et;ot=ot||pt||"";var ii,ti,gt,dt,ni;if(!ut||s||o){if(u&&yt&&!s&&!o&&(!e||p||v)&&(ii=k[r-1],kt.length-1>bt-(ii||0))){if(ii=kt.slice(ii,bt+d.length),ti!==!0)if(gt=v||c[r-1].bd,dt=gt[gt.length-1],dt&&dt.prm){while(dt.sb&&dt.sb.prm)dt=dt.sb;ni=dt.sb={path:dt.sb,bnd:dt.bnd}}else gt.push(ni={path:gt.pop()});yt=w+":"+ii+" onerror=''"+h;ti=b[yt];ti||(b[yt]=!0,b[yt]=ti=lt(yt,i,!0));ti!==!0&&ni&&(ni._jsv=ti,ni.prm=f.bd,ni.bnd=ni.bnd||ni.path&&ni.path.indexOf("^")>=0)}return s?(s=!ct,s?d:'"'):o?(o=!at,o?d:'"'):(nt?(k[r]=bt++,f=c[++r]={bd:[]},nt):"")+(wt?r?"":(a=kt.slice(a,bt),e?(e=p=v=!1,"\b"):"\b,")+a+(a=bt+d.length,u&&t.push(f.bd=[]),"\b"):ft?(r&&l(n),u&&t.pop(),e=it,p=tt,a=bt+d.length,tt&&(u=f.bd=t[e]=[]),it+":"):it?it.split("^").join(".").replace(vi,ri)+(ot?(f=c[++r]={bd:[]},y[r]=!0,ot):rt):rt?rt:vt?(y[r]=!1,f=c[--r],vt)+(ot?(f=c[++r],y[r]=!0,ot):""):st?(y[r]||l(n),","):g?"":(s=ct,o=at,'"'))}l(n)}var e,v,p,o,s,u=t&&t[0],f={bd:u},c={0:f},a=0,b=i?i.links:u&&(u.links=u.links||{}),r=0,y={},k={};return(n+(i?" ":"")).replace(yi,d)}function vt(n,t,r){var p,f,e,c,g,yt,pt,ni,wt,nt,ot,w,s,st,tt,it,v,ht,y,ut,k,ft,bt,d,kt,dt,ct,h,a,lt,gt,o=0,u="",et={},ti=n.length;for(""+t===t?(y=r?'data-link="'+t.replace(rt," ").slice(1,-1)+'"':t,t=0):(y=t.tmplName||"unnamed",t.allowCode&&(et.allowCode=!0),t.debug&&(et.debug=!0),w=t.bnds,ht=t.tmpls),p=0;p<ti;p++)if(f=n[p],""+f===f)u+='\n+"'+f+'"';else if(e=f[0],e==="*")u+=";\n"+f[1]+"\nret=ret";else{if(c=f[1],ft=f[2],g=hi(f[3],"params")+"},"+hi(st=f[4]),a=f[5],gt=f[6],bt=f[8],(dt=e==="else")||(o=0,w&&(s=f[7])&&(o=w.push(s))),(ct=e===":")?c&&(e=c===b?">":c+e):(ft&&(ut=fi(bt,et),ut.tmplName=y+"/"+e,vt(ft,ut),ht.push(ut)),dt||(k=e,kt=u,u=""),d=n[p+1],d=d&&d[0]==="else"),lt=a?";\ntry{\nret+=":"\n+",tt="",it="",ct&&(s||gt||c&&c!==b)){if(h="return {"+g+"};",v='c("'+c+'",view,',h=new Function("data,view,j,u"," // "+y+" "+o+" "+e+"\n"+h),h._er=a,tt=v+o+",",it=")",h._tag=e,r)return h;at(h,s);ot=!0}if(u+=ct?(r?(a?"\ntry{\n":"")+"return ":lt)+(ot?(ot=i,nt=wt=!0,v+(s?(w[o-1]=h,o):"{"+g+"}")+")"):e===">"?(pt=!0,"h("+st[0]+")"):(ni=!0,"((v="+(st[0]||"data")+')!=null?v:"")')):(nt=yt=!0,"\n{view:view,tmpl:"+(ft?ht.length:"0")+","+g+"},"),k&&!d){if(u="["+u.slice(0,-1)+"]",v='t("'+k+'",view,this,',r||s){if(u=new Function("data,view,j,u"," // "+y+" "+o+" "+k+"\nreturn "+u+";"),u._er=a,u._tag=e,s&&at(w[o-1]=u,s),r)return u;tt=v+o+",undefined,";it=")"}u=kt+lt+v+(o||u)+")";s=0;k=0}a&&(nt=!0,u+=";\n}catch(e){ret"+(r?"urn ":"+=")+tt+"j._err(e,view,"+a+")"+it+";}"+(r?"":"ret=ret"))}u="// "+y+"\nvar v"+(yt?",t=j._tag":"")+(wt?",c=j._cnvt":"")+(pt?",h=j.converters.html":"")+(r?";\n":',ret=""\n')+(et.debug?"debugger;":"")+u+(r?"\n":";\nreturn ret;");try{u=new Function("data,view,j,u",u)}catch(ii){l("Compiled template code:\n\n"+u+'\n: "'+ii.message+'"')}return t&&(t.fn=u),nt||(u._nvw=!0),u}function a(n,t){return n&&n!==t?t?f(f({},t),n):n:t&&f({},t)}function vr(n){return kt[n]||(kt[n]="&#"+n.charCodeAt(0)+";")}function yr(n){var i,t,r=[];if(typeof n===ut)for(i in n)t=n[i],t&&t.toJSON&&!t.toJSON()||d(t)||r.push({key:i,prop:t});return r}function ai(n){return n!=null?gi.test(n)&&(""+n).replace(nr,vr)||n:""}if((!t||!t.render)&&!n.jsviews){var r,it,y,pt,wt,p="{",w="{",h="}",v="}",nt="^",vi=/^(!*?)(?:null|true|false|\d[\d.]*|([\w$]+|\.|~([\w$]+)|#(view|([\w$]+))?)([\w$.^]*?)(?:[.[^]([\w$]+)\]?)?)$/g,yi=/(\()(?=\s*\()|(?:([([])\s*)?(?:(\^?)(!*?[#~]?[\w$.^]+)?\s*((\+\+|--)|\+|-|&&|\|\||===|!==|==|!=|<=|>=|[<>%*:?\/]|(=))\s*|(!*?[#~]?[\w$.^]+)([([])?)|(,\s*)|(\(?)\\?(?:(')|("))|(?:\s*(([)\]])(?=\s*[.^]|\s*$|[^\(\[])|[)\]])([([]?))|(\s+)/g,rt=/[ \t]*(\r\n|\n|\r)/g,pi=/\\(['"])/g,wi=/['"\\]/g,bi=/(?:\x08|^)(onerror:)?(?:(~?)(([\w$]+):)?([^\x08]+))\x08(,)?([^\x08]+)/gi,ki=/^if\s/,di=/<(\w+)[>\s]/,gi=/[\x00`><\"'&]/,bt=/^on[A-Z]|^convert(Back)?$/,nr=/[\x00`><"'&]/g,tr=0,ir=0,kt={"&":"&amp;","<":"&lt;",">":"&gt;","\x00":"&#0;","'":"&#39;",'"':"&#34;","`":"&#96;"},b="html",ut="object",ft="data-jsv-tmpl",dt={},k={template:{compile:ri},tag:{compile:cr},helper:{},converter:{}},u={jsviews:"v1.0.0-beta",settings:function(n){f(s,n);gt(s._dbgMode);s.jsv&&s.jsv()},sub:{View:g,Err:st,tmplFn:lt,cvt:ht,parse:ci,extend:f,syntaxErr:l,onStore:{},_lnk:ot,_ths:et},map:ui,_cnvt:er,_tag:sr,_err:c};(st.prototype=new Error).constructor=st;ti.depends=function(){return[this.get("item"),"index"]};ii.depends="index";g.prototype={get:ur,getIndex:ii,getRsc:or,hlp:fr,_is:"view"};for(it in k)lr(it,k[it]);var e=u.templates,tt=u.converters,li=u.helpers,yt=u.tags,o=u.sub,s=u.settings;t?(r=t,r.fn.render=ar,r.observable&&(f(o,r.views.sub),u.map=r.views.map)):(r=n.jsviews={},r.isArray=Array&&Array.isArray||function(n){return Object.prototype.toString.call(n)==="[object Array]"});r.render=dt;r.views=u;r.templates=e=u.templates;s({debugMode:gt,delimiters:ni,onError:function(n,t,r){return t&&(n=r===i?"{Error: "+n+"}":d(r)?r(n,t):r),n==i?"":n},_dbgMode:!0});yt({"else":function(){},"if":{render:function(n){var t=this;return t.rendering.done||!n&&(arguments.length||!t.tagCtx.index)?"":(t.rendering.done=!0,t.selected=t.tagCtx.index,t.tagCtx.render(t.tagCtx.view,!0))},onUpdate:function(n,t,i){for(var r,f,u=0;(r=this.tagCtxs[u])&&r.args.length;u++)if(r=r.args[0],f=!r!=!i[u].args[0],!this.convert&&!!r||f)return f;return!1},flow:!0},"for":{render:function(n){var f,t=this,u=t.tagCtx,e="",o=0;return t.rendering.done||((f=!arguments.length)&&(n=u.view.data),n!==i&&(e+=u.render(n,f),o+=r.isArray(n)?n.length:1),(t.rendering.done=o)&&(t.selected=u.index)),e},flow:!0},include:{flow:!0},"*":{render:ot,flow:!0}});yt("props",{baseTag:"for",dataMap:ui(yr)});tt({html:ai,attr:ai,url:function(n){return n!=i?encodeURI(""+n):n===null?n:""}});ni()}})(this,this.jQuery),function(n,t,i){function p(n){return n._cId=n._cId||".obs"+at++}function r(n){return u(n)?new b(n):new w(n)}function w(n){return this._data=n,this}function b(n){return this._data=n,this}function yt(n){return u(n)?[n]:n}function ft(n,t){n=u(n)?n:[n];for(var i,e=t,o=e,h=n.length,r=[],s=0;s<h;s++){if(i=n[s],f(i)){r=r.concat(ft(i.call(t,t),t));continue}else if(""+i!==i){t=o=i;o!==e&&r.push(e=o);continue}o!==e&&r.push(e=o);r.push(i)}return r}function et(n,t){for(var i in n)return;delete l[t]}function k(n,t){function h(n){return typeof n===o&&(s[0]||e&&u(n))}if(!(n.data&&n.data.off)){var y,p,w,l=t.oldValue,a=t.value,r=n.data,f=r.observeAll,e=!r.cb.noArray,s=r.paths;n.type===c?(r.cb.array||r.cb).call(r,n,t):(r.prop===t.path||r.prop==="*")&&(f?(y=f._path+"."+t.path,p=f.filter,w=[n.target].concat(f.parents()),h(l)&&v(e,f.ns,[l],s,r.cb,!0,p,[w],y),h(a)&&v(e,f.ns,[a],s,r.cb,i,p,[w],y)):(h(l)&&v(e,[l],s,r.cb,!0),h(a)&&v(e,[a],s,r.cb)),r.cb(n,t))}}function a(){function e(){function gt(i,r,u,f){var o,e,a=rt(v),y=yt(v),s=ei,p=pt;if(i=n?i+"."+n:i,nt||f)a&&t(y).off(i,k);else{if(b=a&&t._data(v))for(b=b&&b.events,b=b&&b[u?c:h],kt=b&&b.length;kt--;)if((ot=b[kt].data)&&ot.cb._cId===d._cId&&ot.ns===n){if(u)return;r==="*"&&ot.prop!==r&&t(v).off(i,k)}e=u?{}:{fullPath:w,paths:r?[r]:[],prop:g};e.ns=n;e.cb=d;pt&&(e.observeAll={_path:p,path:function(){return o=s.length,p.replace(/[[.]/g,function(n){return o--,n==="["?"["+t.inArray(s[o-1],s[o]):"."})},parents:function(){return s},filter:oi,ns:n});t(y).on(i,null,e,k);ii&&((l[d._cId]=ii)[t.data(v,"obId")||t.data(v,"obId",lt++)]=v)}}function vi(n){var t=wt;return n.ob=ht(n,t),n.cb=function(i,r){var s=n.ob,h=n.sb,f=ht(n,t);f!==s&&(typeof s===o&&(ni(s,!0),(h||a&&u(s))&&e([s],h,d,ht,!0)),n.ob=f,typeof f===o&&(ni(f),(h||a&&u(f))&&e([f],h,d,ht)));d(i,r)}}function ni(n,t,f,e){if(a){var o=v,s=pt;v=n;e&&(v=n[e],pt+="."+e);oi&&v&&(v=r._fltr(pt,v,e?[n].concat(ei):ei,oi));v&&(f||u(v))&&gt(c+".observe"+(d?bt=p(d):""),i,!0,t);v=o;pt=s}}var ti,fi,si,st,g,w,ai,nt,d,bt,kt,ot,b,ht,hi,ii,ri,dt,ei,pt,oi,ci,li,ui=it,tt=this!=1?[].concat.apply([],arguments):Array.apply(0,arguments),ut=tt.pop()||!1,wt=tt.shift(),v=wt,at=tt.length;for(ut+""===ut&&(pt=ut,ei=tt.pop(),oi=tt.pop(),ut=!!tt.pop(),at-=3),ut===!!ut&&(nt=ut,ut=tt[at-1],ut=at&&ut+""!==ut?(at--,tt.pop()):i),d=ut,at&&f(tt[at-1])&&(ht=d,d=tt.pop(),at--),ui+=nt?d?d._cId+(d._inId||""):"":(bt=p(d))+(d._inId||""),nt||(ii=l[bt]=l[bt]||{}),ci=n&&n.match(ct)||[""],li=ci.length;li--;)for(n=ci[li],u(wt)?ni(wt,nt,!0):nt&&at===0&&wt&&gt(ui,""),ri=0,ti=0;ti<at;ti++)if(w=tt[ti],w!==""&&w!==i){if(v=wt,""+w===w){if(st=w.split("^"),st[1]&&(ri=st[0].split(".").length,w=st.join("."),ri=w.split(".").length-ri),ht&&(hi=ht(w,wt))){at+=hi.length-1;y.apply(tt,[ti--,1].concat(hi));continue}st=w.split(".")}else f(w)||(w&&w._jsv?(dt=nt?w.cb:vi(w),dt.noArray=!a,dt._cId=d._cId,dt._inId=dt._inId||".obIn"+vt++,(w.bnd||w.prm&&w.prm.length||!w.sb)&&e([v],w.path,[s],w.prm,dt,ht,nt),w.sb&&e([w.ob],w.sb,d,ht,nt),w=s,v=i):v=w),st=[wt=w];while(v&&(g=st.shift())!==i)if(typeof v===o){if(""+g===g){if(g==="")continue;if(st.length<ri+1&&!v.nodeType){if(!nt&&(b=rt(v)&&t._data(v))){for(b=b.events,b=b&&b[h],kt=b&&b.length,si=0;kt--;)ot=b[kt].data,ot&&ot.cb===d&&ot.ns===n&&(ot.prop===g||ot.prop==="*")&&((fi=st.join("."))&&ot.paths.push(fi),si++);if(si){v=v[g];continue}}if(g==="*"){!nt&&b&&b.length&&gt(ui,"",!1,!0);gt(ui,"");for(fi in v)ni(v,nt,i,fi);break}else g&&gt(ui+"."+g,st.join("^"))}pt&&(pt+="."+g);g=v[g]}if(f(g)){(ai=g.depends)&&e([v],ft(ai,v),d,ht,nt);break}v=g}ni(v,nt)}return bt&&et(ii,bt),{cbId:bt,bnd:ii}}var n,a=this!=!1,w=it,v=Array.apply(0,arguments),s=v[0];return s+""===s&&a&&(n=s,v.shift(),s=v[0]),e.apply(1,v)}function pt(){return[].push.call(arguments,!0),a.apply(this,arguments)}function v(){var n=[].concat.apply([],arguments);return a.apply(n.shift(),n)}function d(n,t,i,r){n+""!==n&&(i=t,t=n,n="");st(n,this._data,t,i,[],"root",r)}function ot(n,t,i){d.call(this,n,t,i,!0)}function st(n,t,f,e,s,h,c){function v(n,t){for(l=n.length,w=h+"[]";l--;)k(n,l,t,1)}function k(t,u,o,s){var c,h;u!==tt&&(c=r._fltr(w,t[u],b,e))&&(h=b.slice(),s&&d&&h.unshift(d),st(n,c,f,e||(s?i:0),h,w,o))}function g(n,t){h=n.data.observeAll._path;d=n.target;switch(t.change){case"insert":v(t.items);break;case"remove":v(t.items,!0);break;case"refresh":v(t.oldItems,!0);v(n.target);break;case"set":w=h+"."+t.path;k(t,"oldValue",!0);k(t,"value")}d=i;f.apply(this,arguments)}var l,y,w,b,d;if(typeof t===o)if(b=[t].concat(s),y=u(t)?"":"*",f?(y||e!==0)&&(g._cId=p(f),a(n,t,y,g,c,e,b,h)):a(n,t,y,i,c,e,b,h),y)for(l in t)w=h+"."+l,k(t,l,c);else v(t,c)}function ht(n){return n.indexOf(".")<0&&n.indexOf("[")<0}if(!t)throw"jsViews/jsObservable require jQuery";if(!t.observable){var g=t.views=t.views||{jsviews:"v1.0.0-alpha",sub:{}},e=g.sub,nt=t.event.special,y=[].splice,u=t.isArray,tt=t.expando,o="object",s=parseInt,ct=/\S+/g,h=e.propChng=e.propChng||"propertyChange",c=e.arrChng=e.arrChng||"arrayChange",l=e._cbBnds=e._cbBnds||{},it=h+".observe",f=t.isFunction,lt=1,at=1,vt=1,rt=t.hasData,ut={};e.getDeps=function(){var n=arguments;return function(){for(var i,t,r=[],u=n.length;u--;)i=n[u--],t=n[u],t&&(r=r.concat(f(t)?t(i,i):t));return r}};t.observable=r;r._fltr=function(n,t,i,r){if(r&&f(r)?r(n,t,i):!0)return t=f(t)?t.set&&t.call(i[0]):t,typeof t===o&&t};r.Object=w;r.Array=b;t.observe=r.observe=a;t.unobserve=r.unobserve=pt;r._apply=v;w.prototype={_data:null,observeAll:d,unobserveAll:ot,data:function(){return this._data},setProperty:function(n,t,r){var f,h,s,o=this,e=o._data;if(n=n||"",e)if(u(n))for(f=n.length;f--;)h=n[f],o.setProperty(h.name,h.value,r===i||r);else if(""+n!==n)for(f in n)o.setProperty(f,n[f],t);else if(n!==tt){for(s=n.split(".");e&&s.length>1;)e=e[s.shift()];e&&o._setProperty(e,s[0],t,r)}return o},removeProperty:function(n){return this.setProperty(n,ut),this},_setProperty:function(n,t,r,u){var o,s,h,e=t?n[t]:n;f(e)&&e.set&&(s=e,o=e.set===!0?e:e.set,e=e.call(n));(e!==r||u&&e!=r)&&(!(e instanceof Date)||e>r||e<r)&&(o?(o.call(n,r),r=s.call(n)):(h=r===ut)?(delete n[t],r=i):t&&(n[t]=r),this._trigger(n,{change:"set",path:t,value:r,oldValue:e,remove:h}))},_trigger:function(n,i){t(n).triggerHandler(h,i)}};b.prototype={_data:null,observeAll:d,unobserveAll:ot,data:function(){return this._data},insert:function(n,t){var i=this._data;return arguments.length===1&&(t=n,n=i.length),n=s(n),n>-1&&n<=i.length&&(t=u(t)?t:[t],t.length&&this._insert(n,t)),this},_insert:function(n,t){var i=this._data,r=i.length;y.apply(i,[n,0].concat(t));this._trigger({change:"insert",index:n,items:t},r)},remove:function(n,t){var r,u=this._data;return n===i&&(n=u.length-1),n=s(n),t=t?s(t):t===0?0:1,t>-1&&n>-1&&(r=u.slice(n,n+t),t=r.length,t&&this._remove(n,t,r)),this},_remove:function(n,t,i){var r=this._data,u=r.length;r.splice(n,t);this._trigger({change:"remove",index:n,items:i},u)},move:function(n,t,i){if(i=i?s(i):i===0?0:1,n=s(n),t=s(t),i>0&&n>-1&&t>-1&&n!==t){var r=this._data.slice(n,n+i);i=r.length;i&&this._move(n,t,i,r)}return this},_move:function(n,t,i,r){var u=this._data,f=u.length;u.splice(n,i);u.splice.apply(u,[t,0].concat(r));this._trigger({change:"move",oldIndex:n,index:t,items:r},f)},refresh:function(n){var t=this._data.slice();return this._refresh(t,n),this},_refresh:function(n,t){var i=this._data,r=i.length;y.apply(i,[0,i.length].concat(t));this._trigger({change:"refresh",oldItems:n},r)},_trigger:function(n,i){var r=this._data,u=r.length,f=t([r]);f.triggerHandler(c,n);u!==i&&f.triggerHandler(h,{change:"set",path:"length",value:u,oldValue:i})}};nt[h]=nt[c]={remove:function(n){var r,u,f,e,o,i=n.data;if(i&&(i.off=!0,i=i.cb)&&(r=l[i._cId])){for(f=t._data(this).events[n.type],e=f.length;e--&&!u;)u=(o=f[e].data)&&o.cb._cId===i._cId;u||(delete r[t.data(this,"obId")],et(r,i._cId))}}};g.map=function(n){function u(t,u,f){var s,e=this;this.src&&this.unmap();typeof t===o&&(e.src=t,e.tgt=f||e.tgt||[],e.options=u||e.options,e.update(),n.obsSrc&&r(e.src).observeAll(e.obs=function(t,r){s||(s=!0,n.obsSrc(e,t,r),s=i)},e.srcFlt),n.obsTgt&&r(e.tgt).observeAll(e.obt=function(t,r){s||(s=!0,n.obsTgt(e,t,r),s=i)},e.tgtFlt))}return f(n)&&(n={getTgt:n}),n.baseMap&&(n=t.extend({},n.baseMap,n)),n.map=function(n,t,i){return new u(n,t,i)},(u.prototype={srcFlt:n.srcFlt||ht,tgtFlt:n.tgtFlt||ht,update:function(t){var i=this;r(i.tgt).refresh(n.getTgt(i.src,i.options=t||i.options))},unmap:function(){var n=this;n.src&&(n.obs&&r(n.src).unobserveAll(n.obs,n.srcFlt),n.obt&&r(n.tgt).unobserveAll(n.obt,n.tgtFlt),n.src=i)},map:u,_def:n}).constructor=u,n}}}(this,this.jQuery),function(n,t,i){function nt(n,r,u){var k,it,v,o,d,y,h,g,l,p,rt,nt,tt,s,e,w,a,b=n.target,ut=b._jsvBnd,ft=/&(\d+)\+?/g;if(ut)while(p=ft.exec(ut))if((p=c[p[1]])&&(e=p.to)){if(o=p.linkCtx,l=o.view,s=o.tag,g=t(b),nt=l.hlp(ii),tt=l.hlp(ri),v=vt(b),k=ei[v],u===i&&(u=et(v)?v(b):k?g[k]():g.attr(v)),y=e[1],e=e[0],e=e+""===e?[o.data,e]:e,y&&(d=et(y)?y:l.getRsc("converters",y)),d&&(u=d.call(s,u)),rt=l.linkCtx,l.linkCtx=o,w={change:"change",oldValue:o._val,value:u},(!nt||!(it=nt.call(o,n,w)===!1))&&(!s||!s.onBeforeChange||!(it=s.onBeforeChange(n,w)===!1))&&u!==i&&(h=e[0],u!==i&&h)){if(h._jsv)for(a=h,h=o.data;a&&a.sb;)h=o._ctxCb(a,h),a=a.sb;if(s&&(s._.chging=!0),f(h).setProperty(e[2]||e[1],u),tt&&tt.call(o,n,w),s){if(s.onAfterChange)s.onAfterChange(n,w);delete s._.chging}o._val=u}l.linkCtx=rt}}function wu(n,t,r){var h,o,d,b,a,v,e=this,f=e.tag,l=e.data,p=e.elem,c=e.convert,nt=p.parentNode,s=e.view,g=s.linkCtx,w=s.hlp(ii);if(s.linkCtx=e,nt&&(!w||!(t&&w.call(e,n,t)===!1))&&!(t&&n.data.prop!=="*"&&n.data.prop!==t.path)){if(t&&(e.eventArgs=t),t||e._initVal){if(delete e._initVal,r._er)try{o=r(l,s)}catch(tt){a=r._er;v=k(tt,s,new Function("data,view","return "+a+";")(l,s));o=[{props:{},args:[v]}]}else o=r(l,s,u);if(h=bu(o,e,f=e.tag,e.attr||vt(p,!0,c!==i)),f){if(b=a||f._er,o=o[0]?o:[o],d=!b&&t&&f.onUpdate&&f.onUpdate(n,t,o)===!1,gr(f,o,b),d||h===ct){h===y&&f.onBeforeLink&&f.onBeforeLink();bt(f,f.tagCtx);vi(e,l,p);s.linkCtx=g;return}if(f._.chging)return;o=f.tagName===":"?u._cnvt(f.cvt,s,o[0]):u._tag(f,s,s.tmpl,o,!0,v)}else r._tag&&(c=c===""?at:c,o=c?u._cnvt(c,s,o[0]||o):u._tag(r._tag,s,s.tmpl,o,!0,v),f=e.tag,h=e.attr||h);ar(o,e,h,f)&&t&&(w=s.hlp(ri))&&w.call(e,n,t);f&&(f._er=a,bt(f,f.tagCtx))}vi(e,l,p);s.linkCtx=g}}function bu(n,r,u,f){var e,h,c,o,s=u&&u.parentElem||r.elem;if(n!==i){if(o=t(s),f=u&&u.attr||f,et(n)&&k(r.expr+": missing parens"),c=/^css-/.test(f)&&f.slice(4))e=t.style(s,c),+n===n&&(e=parseInt(e));else if(f!=="link"){if(f==="value")s.type===ui&&(e=o.prop(f=g));else if(f===ht)if(s.value===""+n)e=o.prop(g);else return f;e===i&&(h=ei[f],e=h?o[h]():o.attr(f))}r._val=e}return f}function p(n,t){n._df=t;n[(t?"set":"remove")+"Attribute"](ur,"")}function ar(r,u,f,o){var ot,h,c,tt,st,d,a,nt,v,b,k,it,rt,ut=r!==i,lt=u.data,s=o&&o.parentElem||u.elem,ft=t(s),w=u.view,et=u._val,at=w.linkCtx,l=o||f===y;if(o&&(o.parentElem=o.parentElem||u.expr||o._elCnt?s:s.parentNode,h=o._prv,c=o._nxt),!ut){f===y&&o&&o.onBeforeLink&&o.onBeforeLink();return}if(f==="visible"&&(f="css-display"),/^css-/.test(f))u.attr==="visible"&&(rt=(s.currentStyle||lr.call(n,s,"")).display,r?(r=s._jsvd||rt,r!==ct||(r=or[it=s.nodeName])||(k=e.createElement(it),e.body.appendChild(k),r=or[it]=(k.currentStyle||lr.call(n,k,"")).display,e.body.removeChild(k))):(s._jsvd=rt,r=ct)),(l=l||et!==r)&&t.style(s,f.slice(4),r);else if(f!=="link"){if(f===g)d=!0,r=r&&r!=="false";else if(f===ht)if(s.value===""+r)r=d=!0,f=g;else{vi(u,lt,s);return}else(f==="selected"||f==="disabled"||f==="multiple"||f==="readonly")&&(r=r&&r!=="false"?f:null);(ot=ei[f])?f===y?(w.linkCtx=u,o&&o._.inline?(st=o.nodes(!0),o._elCnt&&(h&&h!==c?bi(h,c,s,o._tgId,"^",!0):(a=s._df)&&(nt=o._tgId+"^",v=a.indexOf("#"+nt)+1,b=a.indexOf("/"+nt),v&&b>0&&(v+=nt.length,b>v&&(p(s,a.slice(0,v)+a.slice(b)),tu(a.slice(v,b))))),h=h?h.previousSibling:c?c.previousSibling:s.lastChild),t(st).remove(),o&&o.onBeforeLink&&o.onBeforeLink(),tt=w.link(w.data,s,h,c,r,o&&{tag:o._tgId,lazyLink:o.tagCtx.props.lazyLink})):(ut&&ft.empty(),o&&o.onBeforeLink&&o.onBeforeLink(),ut&&(tt=w.link(lt,s,h,c,r,o&&{tag:o._tgId}))),w.linkCtx=at):(l=l||et!==r)&&(f==="text"&&s.children&&!s.children[0]?s.textContent!==i?s.textContent=r:s.innerText=r===null?"":r:ft[ot](r)):(l=l||et!==r)&&ft[d?"prop":"attr"](f,r===i&&!d?null:r);u._val=r}return tt||l}function vr(n,t){var i=this,r=i.hlp(ii),u=i.hlp(ri);if(!r||r.call(this,n,t)!==!1){if(t){var o=t.change,f=t.index,e=t.items;switch(o){case"insert":i.addViews(f,e);break;case"remove":i.removeViews(f,e.length);break;case"move":i.refresh();break;case"refresh":i.refresh()}}u&&u.call(this,n,t)}}function ai(n){var u,f,o=n.type,e=n.data,r=n._.bnd;if(!n._.useKey&&r)if((f=n._.bndArr)&&(t([f[1]]).off(ti,f[0]),n._.bndArr=i),r!==!!r&&r._.inline)o?r._.arrVws[n._.id]=n:delete r._.arrVws[n._.id];else if(o&&e){u=function(t){t.data&&t.data.off||vr.apply(n,arguments)};t([e]).on(ti,u);n._.bndArr=[u,e]}}function vt(n,t,i){var u=n.nodeName.toLowerCase(),r=a.merge[u]||n.contentEditable===at&&{to:y,from:y};return r?t?u==="input"&&n.type===ht?ht:r.to:r.from:t?i?"text":y:""}function yr(n,r,u,f,e,o,s){var p,c,v,w,b,l=n.parentElem,h=n._prv,a=n._nxt,y=n._elCnt;if(h&&h.parentNode!==l&&k("Missing parentNode"),s){w=n.nodes();y&&h&&h!==a&&bi(h,a,l,n._.id,"_",!0);n.removeViews(i,i,!0);c=a;y&&(h=h?h.previousSibling:a?a.previousSibling:l.lastChild);t(w).remove();for(b in n._.bnds)dt(b)}else{if(r){if(v=f[r-1],!v)return!1;h=v._nxt}y?(c=h,h=c?c.previousSibling:l.lastChild):c=h.nextSibling}p=u.render(e,o,n._.useKey&&s,n,s||r,!0);n.link(e,l,h,c,p,v)}function yt(n,t,r){var u,f,e;return r?(e="^`",f=t._.tag,u=f._tgId,u||(c[u=sr++]=f,f._tgId=""+u)):(e="_`",b[u=t._.id]=t),"#"+u+e+(n!=i?n:"")+"/"+u+e}function vi(n,t,r){var h,s,e,y,p,u=n.tag,w=n.convertBack,l=[],a=n._bndId||""+sr++,b=n._hdl;if(delete n._bndId,u&&(l=u.depends||l,l=et(l)?u.depends(u):l,e=u.linkedElem),!n._depends||""+n._depends!=""+l){for(n._depends&&f._apply(!1,[t],n._depends,b,!0),y=n.fn.deps.slice(),s=y.length;s--;)p=y[s],p._jsv&&(y[s]=v({},p));if(h=f._apply(!1,[t],y,l,b,n._ctxCb),h.elem=r,h.linkCtx=n,h._tgId=a,r._jsvBnd=r._jsvBnd||"",r._jsvBnd+="&"+a,n._depends=l,n.view._.bnds[a]=a,c[a]=h,e&&(h.to=[[],w]),(e||w!==i)&&dr(h,u&&u.convertBack||w),u){if(u.onAfterBind)u.onAfterBind(h);u.flow||u._.inline||(r.setAttribute(o,(r.getAttribute(o)||"")+"#"+a+"^/"+a+"^"),u._tgId=""+a)}}if(e&&e[0])for(u._.radio&&(e=e.children("input[type=radio]")),s=e.length;s--;)e[s]._jsvBnd=e[s]._jsvBnd||r._jsvBnd+"+",e[s]._jsvLkEl=u}function pr(n,t,i,r,u,f,e){return yi(this,n,t,i,r,u,f,e)}function yi(n,r,u,f,o,h,c,a){if(typeof f!="object"&&(f=i),n&&r){if(r=r.jquery?r:t(r),!tt){tt=e.body;t(tt).on(tr,nt).on("blur","[contenteditable]",nt)}for(var w,g,rt,d,y,k,v,ut,ft=yt,ot=f&&f.target==="replace",et=r.length;et--;)if(v=r[et],""+n===n)pt(n,v,it(v),i,!0,u,f);else{if(h=h||it(v),n.markup!==i)h.link===!1&&(f=f||{},f.link=ft=!1),ot&&(k=v.parentNode),rt=n.render(u,f,o,h,i,ft),k?(c=v.previousSibling,a=v.nextSibling,t.cleanData([v],!0),k.removeChild(v),v=k):(c=a=i,t(v).empty());else if(n===!0&&h===l)ut={lnk:1};else break;if(v._df&&!a){for(d=s(v._df,!0,hr),w=0,g=d.length;w<g;w++)y=d[w],(y=b[y.id])&&y.data!==i&&y.parent.removeViews(y._.key,i,!0);p(v)}h.link(u,v,c,a,rt,ut,f)}}return r}function ku(n,r,u,f,l,v,y,d){function pu(n,t,r,u,f,e,s,h,c,a,v,y,p){var w,b="";return p?(ui=0,n):(nt=h||c||"",u=u||a,r=r||y,oi&&!r&&(u||nt||e)&&(oi=i,ut=dt.shift()),u=u||r,u&&(ui=0,oi=i,wr&&(r||y?li[ut]||/;svg;|;math;/.test(";"+dt.join(";")+";")||(w="'<"+ut+".../"):li[u]?w="'<\/"+u:dt.length&&u===ut||(w="Mismatch: '<\/"+u),w&&si(w+">' in:\n"+l)),sr=ft,ut=dt.shift(),ft=ci[ut],a=a?"<\/"+a+">":"",sr&&(ht+=lt,lt="",ft?ht+="-":(b=a+rr+"@"+ht+ir+(v||""),ht=lu.shift()))),ft?(e?lt+=e:t=a||y||"",nt&&(t+=nt,lt&&(t+=" "+o+'="'+lt+'"',lt=""))):t=e?t+b+f+rr+e+ir+s+nt:b||n,ui&&e&&si(" No {^{ tags within elem markup ("+ui+' ). Use data-link="..."'),nt&&(ui=nt,dt.unshift(ut),ut=nt.slice(1),dt[0]&&dt[0]===cu[ut]&&k("Parent of <tr> must be <tbody>"),oi=li[ut],(ft=ci[ut])&&!sr&&(lu.unshift(ht),ht=""),sr=ft,ht&&ft&&(ht+="+")),t)}function wi(n,t){var o,l,u,e,f,a,s,h=[];if(n){for(n._tkns.charAt(0)==="@"&&(t=g.previousSibling,g.parentNode.removeChild(g),g=i),vt=n.length;vt--;){if(rt=n[vt],u=rt.ch,o=rt.path)for(et=o.length-1;l=o.charAt(et--);)l==="+"?o.charAt(et)==="-"?(et--,t=t.previousSibling):t=t.parentNode:t=t.lastChild;u==="^"?(nt=c[f=rt.id])&&(s=t&&(!g||g.parentNode!==t),(!g||s)&&(nt.parentElem=t),rt.elCnt&&s&&p(t,(rt.open?"#":"/")+f+u+(t._df||"")),h.push([s?null:g,rt])):(tt=b[f=rt.id])&&(tt.parentElem||(tt.parentElem=t||g&&g.parentNode||r,tt._.onRender=yt,tt._.onArrayChange=vr,ai(tt)),e=tt.parentElem,rt.open?(tt._elCnt=rt.elCnt,t&&!g?p(t,"#"+f+u+(t._df||"")):(tt._prv||p(e,wt(e._df,"#"+f+u)),tt._prv=g)):(t&&(!g||g.parentNode!==t)?(p(t,"/"+f+u+(t._df||"")),tt._nxt=i):g&&(tt._nxt||p(e,wt(e._df,"/"+f+u)),tt._nxt=g),fi=tt.linkCtx,(a=tt.ctx&&tt.ctx.onAfterCreate||wu)&&a.call(fi,tt)))}for(vt=h.length;vt--;)pi.push(h[vt])}return!n||n.elCnt}function tu(n){var t,i;if(n)for(vt=n.length,et=0;et<vt;et++)if(rt=n[et],i=nt=c[rt.id].linkCtx.tag,!nt.flow){if(!ar){for(t=1;i=i.parent;)t++;fr=fr||t}(ar||t===fr)&&(!yr||nt.tagName===yr)&&ru.push(nt)}}function iu(){var h,a,e="",p={},v=gi+(st?",["+ur+"]":"");for(bi=hi?r.querySelectorAll(v):t(v,r).get(),gt=bi.length,u&&u.innerHTML&&(ki=hi?u.querySelectorAll(v):t(v,u).get(),u=ki.length?ki[ki.length-1]:u),fr=0,ct=0;ct<gt;ct++)if(g=bi[ct],u&&!ou)ou=g===u;else if(f&&g===f){st&&(e+=ot(g));break}else if(g.parentNode)if(st){if(e+=ot(g),g._df){for(h=ct+1;h<gt&&g.contains(bi[h]);)h++;p[h-1]=g._df}p[ct]&&(e+=p[ct]||"")}else gr&&(rt=s(g,i,cr))&&(rt=rt[0])&&(yi=yi?rt.id!==yi&&yi:rt.open&&rt.id),!yi&&vu(s(g))&&g.getAttribute(w)&&pi.push([g]);if(st&&(e+=r._df||"",(a=e.indexOf("#"+st.id)+1)&&(e=e.slice(a+st.id.length)),a=e.indexOf("/"+st.id),a+1&&(e=e.slice(0,a)),tu(s(e,i,yu))),l===i&&r.getAttribute(w)&&pi.push([r]),br(u,ft),br(f,ft),st){kt&&kt.resolve();return}for(ft&&ht+lt&&(g=f,ht&&(f?wi(s(ht+"+",!0),f):wi(s(ht,!0),r)),wi(s(lt,!0),r),f&&(e=f.getAttribute(o),(gt=e.indexOf(hr)+1)&&(e=e.slice(gt+hr.length-1)),f.setAttribute(o,lt+e))),gt=pi.length,ct=0;ct<gt;ct++)g=pi[ct],ni=g[1],g=g[0],ni?(nt=c[ni.id])&&((fi=nt.linkCtx)&&(nt=fi.tag,nt.linkCtx=fi),ni.open?(g&&(nt.parentElem=g.parentNode,nt._prv=g),nt._elCnt=ni.elCnt,!nt||nt.onBeforeLink&&nt.onBeforeLink()===!1||nt._.bound||(nt._.bound=!0,tt=nt.tagCtx.view,pt(i,nt._prv,tt,ni.id)),nt._.linking=!0):(nt._nxt=g,nt._.linking&&(pr=nt.tagCtx,tt=pr.view,delete nt._.linking,nt._.bound||(nt._.bound=!0,pt(i,nt._prv,tt,ni.id)),bt(nt,pr)))):pt(g.getAttribute(w),g,it(g),i,gr,n,y);kt&&kt.resolve()}var ui,fi,nt,ct,gt,et,vt,bi,g,tt,rt,ni,ki,nr,lr,tr,ii,ru,ar,yr,pr,wr,fr,uu,dr,eu,ei,ut,oi,vi,or,ti,ft,sr,ri,lt,hr,ou,yi,kt,gr,st,nu=this,hu=nu._.id+"_",ht="",pi=[],dt=[],lu=[],wu=nu.hlp(fu),vu=wi;if(v&&(kt=v.lazyLink&&t.Deferred(),v.tmpl?lr="/"+v._.id+"_":(gr=v.lnk,v.tag&&(hu=v.tag+"^",v=!0),(st=v.get)&&(vu=tu,ru=st.tags,ar=st.deep,yr=st.name)),v=v===!0),r=r?""+r===r?t(r)[0]:r.jquery?r[0]:r:nu.parentElem||e.body,wr=!a.noValidate&&r.contentEditable!==at,ut=r.tagName.toLowerCase(),ft=!!ci[ut],u=u&&kr(u,ft),f=f&&kr(f,ft)||null,l!=i){if(or=e.createElement("div"),vi=or,hr=lt="",ri=r.namespaceURI==="http://www.w3.org/2000/svg"?"svg_ns":(ei=su.exec(l))&&ei[1]||"",di&&ei&&ei[2]&&k("Unsupported: "+ei[2]),ft){for(ii=f;ii&&!(tr=s(ii));)ii=ii.nextSibling;(ti=tr?tr._tkns:r._df)&&(nr=lr||"",(v||!lr)&&(nr+="#"+hu),et=ti.indexOf(nr),et+1&&(et+=nr.length,hr=lt=ti.slice(0,et),ti=ti.slice(et),tr?ii.setAttribute(o,ti):p(r,ti)))}if(oi=i,l=(""+l).replace(au,pu),wr&&dt.length&&si("Mismatched '<"+ut+"...>' in:\n"+l),d)return;for(er.appendChild(or),ri=h[ri]||h.div,uu=ri[0],vi.innerHTML=ri[1]+l+ri[2];uu--;)vi=vi.lastChild;for(er.removeChild(or),dr=e.createDocumentFragment();eu=vi.firstChild;)dr.appendChild(eu);r.insertBefore(dr,f)}return kt?setTimeout(iu,0):iu(),kt&&kt.promise()}function pt(n,t,u,f,e,o,s){var k,v,w,h,d,g,p,b,a,l,nt;if(f)l=c[f],l=l.linkCtx?l.linkCtx.tag:l,a=l.linkCtx||{data:u.data,elem:l._elCnt?l.parentElem:t,view:u,ctx:u.ctx,attr:y,fn:l._.bnd,tag:l,_bndId:f},wr(a,a.fn);else if(n&&t)for(o=e?o:u.data,k=u.tmpl,n=du(n,vt(t)),rt.lastIndex=0;v=rt.exec(n);)nt=rt.lastIndex,w=v[1],p=v[3],d=v[10],h=i,a={data:o,elem:t,view:u,ctx:s,attr:w,isLk:e,_initVal:!v[2]},v[6]&&(!w&&(h=/:([\w$]*)$/.exec(d))&&(h=h[1],h!==i&&(g=-h.length-1,p=p.slice(0,g-1)+ut)),h===null&&(h=i),a.convert=v[5]||""),a.expr=w+p,b=k.links[p],b||(k.links[p]=b=r.tmplFn(p,k,!0,h)),a.fn=b,w||h===i||(a.convertBack=h),wr(a,b),rt.lastIndex=nt}function wr(n,t){function u(i,r){wu.call(n,i,r,t)}u.noArray=!0;n.isLk&&(n.view=new r.View(n.ctx,"link",l,n.data,l.tmpl,i,i,yt));n._ctxCb=nf(n.view);n._hdl=u;u(!0)}function wt(n,t){var i;return n?(i=n.indexOf(t),i+1?n.slice(0,i)+n.slice(i+t.length):n):""}function ot(n){return n&&(""+n===n?n:n.tagName===lt?n.type.slice(3):n.nodeType===1&&n.getAttribute(o)||"")}function s(n,t,i){function e(n,t,i,u,e,o){f.push({elCnt:r,id:u,ch:e,open:t,close:i,path:o,token:n})}var r,u,f=[];if(u=t?n:ot(n))return r=f.elCnt=n.tagName!==lt,r=u.charAt(0)==="@"||r,f._tkns=u,u.replace(i||pu,e),f}function br(n,t){n&&(n.type==="jsv"?n.parentNode.removeChild(n):t&&n.getAttribute(w)===""&&n.removeAttribute(w))}function kr(n,t){for(var i=n;t&&i&&i.nodeType!==1;)i=i.previousSibling;return i&&(i.nodeType!==1?(i=e.createElement(lt),i.type="jsv",n.parentNode.insertBefore(i,n)):ot(i)||i.getAttribute(w)||i.setAttribute(w,"")),i}function du(n,i){return n=t.trim(n).replace(hu,"\\$&"),n.slice(-1)!==ut?n=ni+":"+n+(i?":":"")+ut:n}function bt(n,u){var e,f,l,o,s,y,p,a,w,v,b=u.view,h=n.linkCtx=n.linkCtx||{tag:n,data:b.data,view:b,ctx:b.ctx};if(n.onAfterLink)n.onAfterLink(u,h);if(e=n.targetTag?n.targetTag.linkedElem:n.linkedElem,(f=e&&e[0])&&((l=n._.radio)&&(e=e.children("input[type=radio]")),l||!n._.chging)){if(o=r.cvt(n,n.convert)[0],l||f!==h.elem){for(p=e.length;p--;){if(f=e[p],a=f._jsvLkEl,n._.inline&&(!a||a!==n&&a.targetTag!==n))for(f._jsvLkEl=n,s=h.elem?h.elem._jsvBnd:n._prv._jsvBnd,f._jsvBnd=s+"+",s=s.slice(1).split("&"),y=s.length;y--;)dr(c[s[y]],n.convertBack);l&&(f[g]=o===f.value)}h._val=o}o!==i&&(l||f.value===i?f.contentEditable===at&&(f.innerHTML=o):f.type===ui?f[g]=o&&o!=="false":e.val(o))}(f=f||n.tagName===":"&&h.elem)&&(w=f._jsvTr,v=u.props.trigger,w!==v&&(f._jsvTr=v,e=e||t(f),pi(e,w,"off"),pi(e,v,"on")))}function gu(n){setTimeout(function(){nt(n)},0)}function pi(n,t,i){t&&n[i](t===!0?"keydown":t,t===!0?gu:nt)}function dr(n,t){var s,e,r,i,o,f=n.linkCtx,h=f.data,u=f.fn.paths;if(n&&u)if(u=(s=u._jsvto)||u[0],e=u&&u.length,e&&(!f.tag||f.tag.tagCtx.args.length)){if(i=u[e-1],i._jsv){for(o=i;i.sb&&i.sb._jsv;)r=i=i.sb;r=i.sb||r&&r.path;i=r?r.slice(1):o.path}n.to=r?[[o,i],t]:[f._ctxCb(r=i.split("^").join("."))||[h,r],t]}else n.to=[[],t]}function gr(n,t,i){var o,s,h=n.tagCtx.view,e=n.tagCtxs||[n.tagCtx],c=e.length,l=!t;if(t=t||n._.bnd.call(h.tmpl,(n.linkCtx||h).data,h,u),i)e=n.tagCtxs=t,n.tagCtx=e[0];else while(c--)o=e[c],s=t[c],f(o.props).setProperty(s.props),v(o.ctx,s.ctx),o.args=s.args,l&&(o.tmpl=s.tmpl);return r._ths(n,e[0]),e}function kt(n){for(var u,t,i,f=[],e=n.length,r=e;r--;)f.push(n[r]);for(r=e;r--;)if(t=f[r],t.parentNode){if(i=t._jsvBnd)for(i=i.slice(1).split("&"),t._jsvBnd="",u=i.length;u--;)dt(i[u],t._jsvLkEl,t);tu(ot(t)+(t._df||""))}}function dt(n,u,f){var y,h,e,l,a,p,w,b,v,s,k,o=c[n];if(u)f===u.linkedElem[0]&&(delete f._jsvLkEl,delete u.linkedElem);else if(o){delete c[n];for(y in o.bnd)l=o.bnd[y],a=o.cbId,t.isArray(l)?t([l]).off(ti+a).off(nr+a):t(l).off(nr+a),delete o.bnd[y];if(h=o.linkCtx){if(e=h.tag){if(p=e.tagCtxs)for(w=p.length;w--;)(b=p[w].map)&&b.unmap();v=e.linkedElem;s=v&&v[0]||h.elem;(k=s&&s._jsvTr)&&(pi(v||t(s),k,"off"),s._jsvTr=i);e.onDispose&&e.onDispose();e._elCnt||(e._prv&&e._prv.parentNode.removeChild(e._prv),e._nxt&&e._nxt.parentNode.removeChild(e._nxt))}delete h.view._.bnds[n]}delete r._cbBnds[o.cbId]}}function wi(n,r){return n===i?(tt&&(t(tt).off(tr,nt).off("blur","[contenteditable]",nt),tt=i),n=!0,l.removeViews(),kt(e.body.getElementsByTagName("*"))):r&&n===!0&&(r=r.jquery?r:t(r),r.each(function(){for(var n;(n=it(this,!0))&&n.parent;)n.parent.removeViews(n._.key,i,!0);kt(this.getElementsByTagName("*"));kt([this])})),r}function nu(n,t){return wi(this,n,t)}function nf(n){return function(t,i){var f,r,e=[i];if(n&&t){if(t._jsv)return t._jsv.call(n.tmpl,i,n,u);if(t.charAt(0)==="~")return t.slice(0,4)==="~tag"&&(r=n.ctx,t.charAt(4)==="."&&(f=t.slice(5).split("."),r=r.tag),f)?r?[r,f.join("."),i]:[]:(t=t.slice(1).split("."),(i=n.hlp(t.shift()))&&(t.length&&e.unshift(t.join(".")),e.unshift(i)),i?e:[]);if(t.charAt(0)==="#")return t==="#data"?[]:[n,t.replace(lu,""),i]}}}function tf(n){return n.type===ui?n[g]:n.value}function bi(n,t,i,r,u,f){var v,l,y,h,k,a,e,w=0,d=n===t;if(n){for(y=s(n)||[],v=0,l=y.length;v<l;v++){if(h=y[v],a=h.id,a===r&&h.ch===u)if(f)l=0;else break;d||(k=h.ch==="_"?b[a]:c[a].linkCtx.tag,h.open?k._prv=t:h.close&&(k._nxt=t));w+=a.length+2}w&&n.setAttribute(o,n.getAttribute(o).slice(w));e=t?t.getAttribute(o):i._df;(l=e.indexOf("/"+r+u)+1)&&(e=y._tkns.slice(0,w)+e.slice(l+(f?-1:r.length+1)));e&&(t?t.setAttribute(o,e):p(i,e))}else p(i,wt(i._df,"#"+r+u)),f||t||p(i,wt(i._df,"/"+r+u))}function tu(n){var r,f,t,u;if(u=s(n,!0,vu))for(r=0,f=u.length;r<f;r++)t=u[r],t.ch==="_"?(t=b[t.id])&&t.type&&t.parent.removeViews(t._.key,i,!0):dt(t.id)}function rf(n,t,i){if(i.change==="set"){for(var r=n.tgt,u=r.length;u--;)if(r[u].key===i.path)break;u===-1?i.path&&f(r).insert({key:i.path,prop:i.value}):i.remove?f(r).remove(u):f(r[u]).setProperty("prop",i.value)}}function uf(n,t,i){var r,u=n.src,e=i.change;e==="set"?i.path==="prop"?f(u).setProperty(t.target.key,i.value):(f(u).setProperty(i.oldValue,null),delete u[i.oldValue],f(u).setProperty(i.value,t.target.prop)):e==="remove"?(r=i.items[0],f(u).removeProperty(r.key),delete u[r.key]):e==="insert"&&(r=i.items[0],r.key&&f(u).setProperty(r.key,r.prop))}function ff(n){return n.indexOf(".")<0}var gt="JsViews requires ",tt,it,rt,iu,ni,ut,ru,ki,di,k,w,ft,gi,h,l,b,e=n.document,u=t.views,r=u.sub,a=u.settings,v=r.extend,et=t.isFunction,uu=u.converters,d=u.tags,f=t.observable,st=f.observe,o="data-jsv",nr=r.propChng=r.propChng||"propertyChange",ti=r.arrChng=r.arrChng||"arrayChange",tr="change.jsv",ii="onBeforeChange",ri="onAfterChange",fu="onAfterCreate",g="checked",ui="checkbox",ht="radio",ct="none",lt="SCRIPT",at="true",ir='"><\/script>',rr='<script type="jsv',ur=o+"-df",fi="script,["+o+"]",y="html",ei={value:"val",input:"val",html:y,text:"text"},fr={from:"value",to:"value"},oi=0,eu=t.cleanData,ou=a.delimiters,si=r.syntaxErr,su=/<(?!script)(\w+)(?:[^>]*(on\w+)\s*=)?[^>]*>/,hu=/['"\\]/g,er=e.createDocumentFragment(),hi=e.querySelector,ci={ol:1,ul:1,table:1,tbody:1,thead:1,tfoot:1,tr:1,colgroup:1,dl:1,select:1,optgroup:1,svg:1,svg_ns:1},cu={tr:"table"},li={br:1,img:1,input:1,hr:1,area:1,base:1,col:1,link:1,meta:1,command:1,embed:1,keygen:1,param:1,source:1,track:1,wbr:1},or={},c={},sr=1,lu=/^#(view\.?)?/,au=/(^|(\/>)|<\/(\w+)>|)(\s*)([#\/]\d+[_^])`(\s*)(<\w+(?=[\s\/>]))?|\s*(?:(<\w+(?=[\s\/>]))|<\/(\w+)>(\s*)|(\/>)\s*|(>))/g,hr=/(#)()(\d+)(_)/g,vu=/(#)()(\d+)([_^])/g,cr=/(?:(#)|(\/))(\d+)(_)/g,yu=/(#)()(\d+)(\^)/g,pu=/(?:(#)|(\/))(\d+)([_^])([-+@\d]+)?/g,lr=n.getComputedStyle;if(!t)throw gt+"jQuery";if(!u)throw gt+"JsRender";if(!f)throw gt+"jquery.observable";t.link||(ft={contents:function(n,r){n!==!!n&&(r=n,n=i);var f,u=t(this.nodes());return u[0]&&(f=r?u.filter(r):u,u=n&&r?f.add(u.find(r)):f),u},nodes:function(n,t,i){var r,u=this,f=u._elCnt,o=!t&&f,e=[];for(t=t||u._prv,i=i||u._nxt,r=o?t===u._nxt?u.parentElem.lastSibling:t:u._.inline===!1?t||u.linkCtx.elem.firstChild:t&&t.nextSibling;r&&(!i||r!==i);)(n||f||r.tagName!==lt)&&e.push(r),r=r.nextSibling;return e},childTags:function(n,t){n!==!!n&&(t=n,n=i);var r=this,e=r.link?r:r.tagCtx.view,u=r._prv,o=r._elCnt,f=[];return e.link(i,r.parentElem,o?u&&u.previousSibling:u,r._nxt,i,{get:{tags:f,deep:n,name:t,id:r.link?r._.id+"_":r._tgId+"^"}}),f},refresh:function(n){var r,f,t=this,e=t.linkCtx,o=t.tagCtx.view;return t.disposed&&k("Removed tag"),n===i&&(n=u._tag(t,o,o.tmpl,gr(t),!0)),n+""===n&&(f=t._.inline?y:e.attr||vt(t.parentElem,!0),r=ar(n,e,f,t)),bt(t,t.tagCtx),r||t},update:function(n){var t=this.linkedElem;t&&nt({target:t[0]},i,n)}},r.onStore.template=function(n,i){i.link=pr;i.unlink=nu;n&&(t.link[n]=function(){return pr.apply(i,arguments)},t.unlink[n]=function(){return nu.apply(i,arguments)})},r.onStore.tag=function(n,t){r._lnk(t)},r._lnk=function(n){return v(n,ft)},r.viewInfos=s,(a.delimiters=function(){var n=ou.apply(u,arguments);return iu=n[0],ni=n[1],ut=n[2],ru=n[3],ki=n[4],rt=new RegExp("(?:^|\\s*)([\\w-]*)(\\"+ki+")?(\\"+ni+r.rTag+"\\"+ut+")","g"),this})(),v(r._lnk(r.View.prototype),{addViews:function(n,t,i){var u,s,r=this,e=t.length,o=r.views;if(!r._.useKey&&e&&(i=r.tmpl)&&(s=o.length+e,yr(r,n,i,o,t,r.ctx)!==!1))for(u=n+e;u<s;u++)f(o[u]).setProperty("index",u);return r},removeViews:function(n,r,u){function s(n){var s,h,c,f,o,l,r=e[n];if(r&&r.link){if(s=r._.id,u||(l=r.nodes()),r.removeViews(i,i,!0),r.type=i,f=r._prv,o=r._nxt,c=r.parentElem,u||(r._elCnt&&bi(f,o,c,s,"_"),t(l).remove()),!r._elCnt)try{f.parentNode.removeChild(f);o.parentNode.removeChild(o)}catch(a){}ai(r);for(h in r._.bnds)dt(h);delete b[s]}}var o,a,h,c=this,l=!c._.useKey,e=c.views;if(l&&(h=e.length),n===i)if(l){for(o=h;o--;)s(o);c.views=[]}else{for(a in e)s(a);c.views={}}else if(r===i&&(l?r=1:(s(n),delete e[n])),l&&r){for(o=n+r;o-->n;)s(o);if(e.splice(n,r),h=e.length)while(n<h)f(e[n]).setProperty("index",n++)}return this},refresh:function(n){var t=this,i=t.parent;return i&&(yr(t,t.index,t.tmpl,i.views,t.data,n,!0),ai(t)),t},link:ku}),b={0:l=new r.View},uu.merge=function(n){var t,i=this.linkCtx._val||"",r=this.tagCtx.props.toggle;return r&&(t=r.replace(/[\\^$.|?*+()[{]/g,"\\$&"),t="(\\s(?="+t+"$)|(\\s)|^)("+t+"(\\s|$))",i=i.replace(new RegExp(t),"$2"),n=i+(n?(i&&" ")+r:"")),n},d("on",{attr:ct,onAfterLink:function(n,u){for(var l,o,s=this,h=0,f=n.args,v=f.length,a=n.props.data,c=n.view,e=n.props.context;h<v&&!(o=et(l=f[h++])););if(o){o=f.slice(h);f=f.slice(0,h-1);e||(e=/^(.*)[\.^][\w$]+$/.exec(n.params.args.slice(-o.length-1)[0]),e=e&&r.tmplFn("{:"+e[1]+"}",c.tmpl,!0)(u.data,c));s._evs&&s.onDispose();t(u.elem).on(s._evs=f[0]||"click",s._sel=f[1],a==i?null:a,s._hlr=function(n){return l.apply(e||u.data,[].concat(o,n,{change:n.type,view:c,linkCtx:u}))})}},onDispose:function(){t(this.parentElem).off(this._evs,this._sel,this._hlr)},flow:!0}),v(d["for"],{onArrayChange:function(n,t){var i,r=this,u=t.change;if(r.tagCtxs[1]&&(u==="insert"&&n.target.length===t.items.length||u==="remove"&&!n.target.length||u==="refresh"&&!t.oldItems.length!=!n.target.length))r.refresh();else for(i in r._.arrVws)i=r._.arrVws[i],i.data===n.target&&i._.onArrayChange.apply(i,arguments);n.done=!0},onAfterLink:function(){for(var u,o,i,f,e=this,r=e._ars||{},s=e.tagCtxs,c=s.length,h=e.selected||0,n=0;n<=h;n++)u=s[n],f=u.map?u.map.tgt:u.args.length?u.args[0]:u.view.data,(i=r[n])&&f!==i[0]&&(st(i[0],i[1],!0),delete r[n]),!r[n]&&t.isArray(f)&&(st(f,o=function(n,t){e.onArrayChange(n,t)}),r[n]=[f,o]);for(n=h+1;n<c;n++)(i=r[n])&&(st(i[0],i[1],!0),delete r[n]);e._ars=r},onDispose:function(){var n,t=this;for(n in t._ars)st(t._ars[n][0],t._ars[n][1],!0)}}),v(d["for"],ft),v(d["if"],ft),v(d.include,ft),d("props",{baseTag:"for",dataMap:u.map({getTgt:d.props.dataMap.getTgt,obsSrc:rf,obsTgt:uf,tgtFlt:ff})}),v(t,{view:u.view=it=function(n,r,u){function p(n,t){if(n)for(o=s(n,t,hr),a=0,w=o.length;a<w;a++)if((f=b[o[a].id])&&(f=f&&u?f.get(!0,u):f))break}r!==!!r&&(u=r,r=i);var f,o,c,a,w,h,v,y=0,k=e.body;if(n&&n!==k&&l._.useKey>1&&(n=""+n===n?t(n)[0]:n.jquery?n[0]:n,n)){if(r){if(p(n._df,!0),!f)for(v=hi?n.querySelectorAll(fi):t(fi,n).get(),h=v.length,c=0;!f&&c<h;c++)p(v[c]);return f}while(n){if(o=s(n,i,cr))for(h=o.length;h--;)if(f=o[h],f.open){if(y<1)return f=b[f.id],f&&u?f.get(u):f||l;y--}else y++;n=n.previousSibling||n.parentNode}}return l},link:u.link=yi,unlink:u.unlink=wi,cleanData:function(n){n.length&&oi&&kt(n);eu.apply(t,arguments)}}),u.utility={validate:function(n){try{l.link(i,e.createElement("div"),i,i,n,i,i,1)}catch(t){return t.message}}},v(t.fn,{link:function(n,t,i,r,u,f,e){return yi(n,this,t,i,r,u,f,e)},unlink:function(n){return wi(n,this)},view:function(n){return it(this[0],n)}}),t.each([y,"replaceWith","empty","remove"],function(n,i){var r=t.fn[i];t.fn[i]=function(){var n;oi=1;try{n=r.apply(this,arguments)}finally{oi=0}return n}}),v(l,{tmpl:{links:{},tags:{}}}),l._.onRender=yt,a({wrapMap:h={option:[1,"<select multiple='multiple'>","<\/select>"],legend:[1,"<fieldset>","<\/fieldset>"],area:[1,"<map>","<\/map>"],param:[1,"<object>","<\/object>"],thead:[1,"<table>","<\/table>"],tr:[2,"<table><tbody>","<\/tbody><\/table>"],td:[3,"<table><tbody><tr>","<\/tr><\/tbody><\/table>"],col:[2,"<table><tbody><\/tbody><colgroup>","<\/colgroup><\/table>"],svg_ns:[1,"<svg>","<\/svg>"],div:jQuery.support.htmlSerialize?[0,"",""]:[1,"X<div>","<\/div>"]},linkAttr:w="data-link",merge:{input:{from:tf,to:"value"},textarea:fr,select:fr,optgroup:{to:"label"}},jsrDbgMode:a.debugMode,debugMode:function(t){a.jsrDbgMode(t);t?n._jsv={views:b,bindings:c}:delete n._jsv},jsv:function(){a.debugMode(a._dbgMode);w=a.linkAttr;k=u._err;gi=fi+",["+w+"]";di=a.noDomLevel0;h.optgroup=h.option;h.tbody=h.tfoot=h.colgroup=h.caption=h.thead;h.th=h.td}}))}(this,this.jQuery);
/*
 //# sourceMappingURL=jsviews.min.js.map
 */;
define("jsviews", ["jquery"], function(){});

/*yepnope1.5.x|WTFPL*/
(function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}})(this,document);
define("yepnope", function(){});

( function ( window, doc, undef ) {
  // Takes a preloaded css obj (changes in different browsers) and injects it into the head
  yepnope.injectCss = function( href, cb, attrs, timeout, /* Internal use */ err, internal ) {

    // Create stylesheet link
    var link = document.createElement( "link" ),
        onload = function() {
          if ( ! done ) {
            done = 1;
            link.removeAttribute("id");
            setTimeout( cb, 0 );
          }
        },
        id = "yn" + (+new Date()),
        ref, done, i;

    cb = internal ? yepnope.executeStack : ( cb || function(){} );
    timeout = timeout || yepnope.errorTimeout;
    // Add attributes
    link.href = href;
    link.rel  = "stylesheet";
    link.type = "text/css";
    link.id = id;

    // Add our extra attributes to the link element
    for ( i in attrs ) {
      link.setAttribute( i, attrs[ i ] );
    }


    if ( ! err ) {
      ref = document.getElementsByTagName('base')[0] || document.getElementsByTagName('script')[0];
      ref.parentNode.insertBefore( link, ref );
      link.onload = onload;

      function poll() {
        try {
            var sheets = document.styleSheets;
            for(var j=0, k=sheets.length; j<k; j++) {
                if(sheets[j].ownerNode.id == id) {
                    // this throws an exception, I believe, if not full loaded (was originally just "sheets[j].cssRules;")
                    if (sheets[j].cssRules.length)
                        return onload();
                }
            }
            // if we get here, its not in document.styleSheets (we never saw the ID)
            throw new Error;
        } catch(e) {
            // Keep polling
            setTimeout(poll, 20);
        }
      }
      poll();
    }
  }
})( this, this.document );
define("yepnopecss", ["yepnope"], function(){});

define('bootstrapParams',["require", "exports"], function(require, exports) {
    var bootstrapParams = (function () {
        function bootstrapParams() {
        }
        bootstrapParams.prototype.setLocale = function (locale) {
            this.locales = [];
            var l = locale.split(',');

            for (var i = 0; i < l.length; i++) {
                var v = l[i].split(':');
                this.locales.push({
                    name: v[0].trim(),
                    label: (v[1]) ? v[1].trim() : ""
                });
            }

            this._locale = this.locales[0].name;
        };

        bootstrapParams.prototype.getLocale = function () {
            return this._locale;
        };
        return bootstrapParams;
    })();

    
    return bootstrapParams;
});

define('utils',["require", "exports"], function(require, exports) {
    String.prototype.format = function () {
        var s = arguments[0];
        for (var i = 0; i < arguments.length - 1; i++) {
            var reg = new RegExp("\\{" + i + "\\}", "gm");
            s = s.replace(reg, arguments[i + 1]);
        }

        return s;
    };

    String.prototype.startsWith = function (str) {
        return this.indexOf(str) == 0;
    };
    String.prototype.endsWith = function (str) {
        return this.indexOf(str, this.length - str.length) !== -1;
    };
    String.prototype.trim = function () {
        return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    };
    String.prototype.ltrim = function () {
        return this.replace(/^\s+/, '');
    };
    String.prototype.rtrim = function () {
        return this.replace(/\s+$/, '');
    };
    String.prototype.fulltrim = function () {
        return this.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g, '').replace(/\s+/g, ' ');
    };
    String.prototype.toFileName = function () {
        return this.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    };
    String.prototype.contains = function (str) {
        return this.indexOf(str) !== -1;
    };
    String.prototype.utf8_to_b64 = function () {
        return window.btoa(unescape(encodeURIComponent(this)));
    };
    String.prototype.b64_to_utf8 = function () {
        return decodeURIComponent(escape(window.atob(this)));
    };
    String.prototype.toCssClass = function () {
        return this.replace(/[^a-z0-9]/g, function (s) {
            var c = s.charCodeAt(0);
            if (c == 32)
                return '-';
            if (c >= 65 && c <= 90)
                return '_' + s.toLowerCase();
            return '__' + ('000' + c.toString(16)).slice(-4);
        });
    };

    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function (searchElement, fromIndex) {
            var i = (fromIndex || 0);
            var j = this.length;

            for (i; i < j; i++) {
                if (this[i] === searchElement) {
                    return i;
                }
            }
            return -1;
        };
    }

    Array.prototype.indexOfTest = function (test, fromIndex) {
        var i = (fromIndex || 0);
        var j = this.length;

        for (i; i < j; i++) {
            if (test(this[i]))
                return i;
        }

        return -1;
    };

    if (!Array.prototype.clone) {
        Array.prototype.clone = function () {
            return this.slice(0);
        };
    }

    if (!Array.prototype.last) {
        Array.prototype.last = function () {
            return this[this.length - 1];
        };
    }
    ;

    if (!Array.prototype.contains) {
        Array.prototype.contains = function (val) {
            return this.indexOf(val) !== -1;
        };
    }

    Array.prototype.move = function (fromIndex, toIndex) {
        if (fromIndex < 0 || fromIndex > this.length - 1)
            throw new RangeError("fromIndex out of range");
        if (toIndex < 0 || toIndex > this.length - 1)
            throw new RangeError("toIndex out of range");
        this.splice(toIndex, 0, this.splice(fromIndex, 1)[0]);
    };

    window.browserDetect = {
        init: function () {
            this.browser = this.searchString(this.dataBrowser) || "Other";
            this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";

            if (this.browser == 'Explorer' && this.version == '7' && navigator.userAgent.match(/Trident/i)) {
                this.version = this.searchVersionIE();
            }
        },
        searchString: function (data) {
            for (var i = 0; i < data.length; i++) {
                var dataString = data[i].string;
                this.versionSearchString = data[i].subString;

                if (dataString.indexOf(data[i].subString) != -1) {
                    return data[i].identity;
                }
            }
        },
        searchVersion: function (dataString) {
            var index = dataString.indexOf(this.versionSearchString);
            if (index == -1)
                return;
            return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
        },
        searchVersionIE: function () {
            var ua = navigator.userAgent.toString().toLowerCase(), match = /(trident)(?:.*rv:([\w.]+))?/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || ['', null, -1], ver;
            try  {
                ver = match[2].split('.')[0];
            } catch (err) {
                ver = 'unknown';
            }
            return ver;
        },
        dataBrowser: [
            { string: navigator.userAgent, subString: "Chrome", identity: "Chrome" },
            { string: navigator.userAgent, subString: "MSIE", identity: "Explorer" },
            { string: navigator.userAgent, subString: "Trident", identity: "Explorer" },
            { string: navigator.userAgent, subString: "Firefox", identity: "Firefox" },
            { string: navigator.userAgent, subString: "Safari", identity: "Safari" },
            { string: navigator.userAgent, subString: "Opera", identity: "Opera" }
        ]
    };

    window.browserDetect.init();

    var Size = (function () {
        function Size(width, height) {
            this.width = width;
            this.height = height;
        }
        return Size;
    })();
    exports.Size = Size;

    var Utils = (function () {
        function Utils() {
        }
        Utils.ellipsis = function (text, chars) {
            if (text.length <= chars)
                return text;
            var trimmedText = text.substr(0, chars);
            trimmedText = trimmedText.substr(0, Math.min(trimmedText.length, trimmedText.lastIndexOf(" ")));
            return trimmedText + "&hellip;";
        };

        Utils.htmlDecode = function (encoded) {
            var div = document.createElement('div');
            div.innerHTML = encoded;
            return div.firstChild.nodeValue;
        };

        Utils.numericalInput = function (event) {
            if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || (event.keyCode == 65 && event.ctrlKey === true) || (event.keyCode >= 35 && event.keyCode <= 39)) {
                return true;
            } else {
                if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
                    event.preventDefault();
                    return false;
                }
                return true;
            }
        };

        Utils.getTimeStamp = function () {
            return new Date().getTime();
        };

        Utils.getHashParameter = function (key, doc) {
            if (!doc)
                doc = window.document;
            var regex = new RegExp("#.*[?&]" + key + "=([^&]+)(&|$)");
            var match = regex.exec(doc.location.hash);
            return (match ? decodeURIComponent(match[1].replace(/\+/g, " ")) : null);
        };

        Utils.setHashParameter = function (key, value, doc) {
            if (!doc)
                doc = window.document;

            var kvp = this.updateURIKeyValuePair(doc.location.hash.replace('#?', ''), key, value);

            var newHash = "#?" + kvp;

            var url = doc.URL;

            var index = url.indexOf('#');

            if (index != -1) {
                url = url.substr(0, url.indexOf('#'));
            }

            doc.location.replace(url + newHash);
        };

        Utils.getQuerystringParameter = function (key, doc) {
            if (!doc)
                doc = window.document;
            key = key.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
            var regex = new RegExp("[\\?&]" + key + "=([^&#]*)");
            var match = regex.exec(window.location.search);
            return (match ? decodeURIComponent(match[1].replace(/\+/g, " ")) : null);
        };

        Utils.setQuerystringParameter = function (key, value, doc) {
            if (!doc)
                doc = window.document;

            var kvp = this.updateURIKeyValuePair(doc.location.hash.replace('#?', ''), key, value);

            window.location.search = kvp;
        };

        Utils.updateURIKeyValuePair = function (uriSegment, key, value) {
            key = encodeURIComponent(key);
            value = encodeURIComponent(value);

            var kvp = uriSegment.split('&');

            if (kvp[0] == "")
                kvp.shift();

            var i = kvp.length;
            var x;

            while (i--) {
                x = kvp[i].split('=');

                if (x[0] == key) {
                    x[1] = value;
                    kvp[i] = x.join('=');
                    break;
                }
            }

            if (i < 0) {
                kvp[kvp.length] = [key, value].join('=');
            }

            return kvp.join('&');
        };

        Utils.clamp = function (value, min, max) {
            return Math.min(Math.max(value, min), max);
        };

        Utils.roundNumber = function (num, dec) {
            return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
        };

        Utils.normalise = function (num, min, max) {
            return (num - min) / (max - min);
        };

        Utils.fitRect = function (width1, height1, width2, height2) {
            var ratio1 = height1 / width1;
            var ratio2 = height2 / width2;

            var width, height, scale;

            if (ratio1 < ratio2) {
                scale = width2 / width1;
                width = width1 * scale;
                height = height1 * scale;
            }
            if (ratio2 < ratio1) {
                scale = height2 / height1;
                width = width1 * scale;
                height = height1 * scale;
            }

            return new Size(Math.floor(width), Math.floor(height));
        };

        Utils.getBool = function (val, defaultVal) {
            if (val === null || typeof (val) === 'undefined') {
                return defaultVal;
            }

            return val;
        };

        Utils.getUrlParts = function (url) {
            var a = document.createElement('a');
            a.href = url;
            return a;
        };

        Utils.convertToRelativeUrl = function (url) {
            var parts = this.getUrlParts(url);
            var relUri = parts.pathname + parts.search;

            if (!relUri.startsWith("/")) {
                relUri = "/" + relUri;
            }

            return relUri;
        };

        Utils.debounce = function (fn, debounceDuration) {
            debounceDuration = debounceDuration || 100;

            return function () {
                if (!fn.debouncing) {
                    var args = Array.prototype.slice.apply(arguments);
                    fn.lastReturnVal = fn.apply(window, args);
                    fn.debouncing = true;
                }
                clearTimeout(fn.debounceTimeout);
                fn.debounceTimeout = setTimeout(function () {
                    fn.debouncing = false;
                }, debounceDuration);

                return fn.lastReturnVal;
            };
        };

        Utils.createElement = function (tagName, id, className) {
            var $elem = $(document.createElement(tagName));

            if (id)
                $elem.attr('id', id);
            if (className)
                $elem.attr('class', className);

            return $elem;
        };

        Utils.createDiv = function (className) {
            return Utils.createElement('div', null, className);
        };

        Utils.loadCss = function (uri) {
            $('head').append($('<link rel="stylesheet" type="text/css" />').attr('href', uri));
        };
        return Utils;
    })();
    exports.Utils = Utils;
});

define('bootstrapper',["require", "exports", "bootstrapParams", "utils"], function(require, exports, BootstrapParams, utils) {
    var util = utils.Utils;

    var BootStrapper = (function () {
        function BootStrapper(extensions) {
            this.extensions = extensions;
        }
        BootStrapper.prototype.getBootstrapParams = function () {
            var p = new BootstrapParams();

            p.manifestUri = util.getQuerystringParameter('manifestUri');
            p.config = util.getQuerystringParameter('config');
            p.jsonp = util.getBool(util.getQuerystringParameter('jsonp'), false);
            p.isHomeDomain = util.getQuerystringParameter('isHomeDomain') === "true";
            p.isReload = util.getQuerystringParameter('isReload') === "true";
            p.setLocale(util.getQuerystringParameter('locale'));
            p.embedDomain = util.getQuerystringParameter('embedDomain');
            p.isOnlyInstance = util.getQuerystringParameter('isOnlyInstance') === "true";
            p.embedScriptUri = util.getQuerystringParameter('embedScriptUri');
            p.domain = util.getQuerystringParameter('domain');
            p.isLightbox = util.getQuerystringParameter('isLightbox') === "true";

            return p;
        };

        BootStrapper.prototype.bootStrap = function (params) {
            var that = this;

            that.params = this.getBootstrapParams();

            if (params) {
                that.params = $.extend(true, that.params, params);
            }

            $('#app').empty();

            $('#app').addClass('loading');

            $('link[type*="text/css"]').remove();

            jQuery.support.cors = true;

            if (that.params.config) {
                if (that.params.config.toLowerCase() === "sessionstorage") {
                    var config = sessionStorage.getItem("uv-config");
                    that.configExtension = JSON.parse(config);
                    that.loadManifest();
                } else {
                    $.getJSON(that.params.config, function (configExtension) {
                        that.configExtension = configExtension;
                        that.loadManifest();
                    });
                }
            } else {
                that.loadManifest();
            }
        };

        BootStrapper.prototype.corsEnabled = function () {
            return Modernizr.cors && !this.params.jsonp;
        };

        BootStrapper.prototype.loadManifest = function () {
            var that = this;

            if (this.corsEnabled()) {
                $.getJSON(that.params.manifestUri, function (manifest) {
                    that.parseManifest(manifest);
                });
            } else {
                var settings = {
                    url: that.params.manifestUri,
                    type: 'GET',
                    dataType: 'jsonp',
                    jsonp: 'callback',
                    jsonpCallback: 'manifestCallback'
                };

                $.ajax(settings);

                window.manifestCallback = function (manifest) {
                    that.parseManifest(manifest);
                };
            }
        };

        BootStrapper.prototype.parseManifest = function (manifest) {
            this.manifest = manifest;

            if (this.params.isHomeDomain && !this.params.isReload) {
                this.sequenceIndex = parseInt(util.getHashParameter("si", parent.document));
            }

            if (!this.sequenceIndex) {
                this.sequenceIndex = parseInt(util.getQuerystringParameter("si")) || 0;
            }

            this.sequences = this.manifest.sequences;

            if (!this.sequences) {
                this.notFound();
            }

            this.loadSequence();
        };

        BootStrapper.prototype.loadSequence = function () {
            var that = this;

            if (that.sequences[that.sequenceIndex].canvases) {
                that.sequence = that.sequences[that.sequenceIndex];
                that.loadDependencies();
            } else {
                var sequenceUri = String(that.sequences[that.sequenceIndex]['@id']);

                $.getJSON(sequenceUri, function (sequenceData) {
                    that.sequence = that.sequences[that.sequenceIndex] = sequenceData;
                    that.loadDependencies();
                });
            }
        };

        BootStrapper.prototype.notFound = function () {
            try  {
                parent.$(parent.document).trigger("onNotFound");
                return;
            } catch (e) {
            }
        };

        BootStrapper.prototype.loadDependencies = function () {
            var that = this;
            var extension;

            extension = that.extensions['seadragon/iiif'];

            var configPath = (window.DEBUG) ? 'extensions/' + extension.name + '/config/' + that.params.getLocale() + '.config.js' : 'js/' + extension.name + '.' + that.params.getLocale() + '.config.js';

            yepnope({
                test: window.btoa && window.atob,
                nope: 'js/base64.min.js',
                complete: function () {
                    $.getJSON(configPath, function (config) {
                        config.name = extension.name;

                        if (that.configExtension) {
                            config.uri = that.params.config;

                            $.extend(true, config, that.configExtension);
                        }

                        var cssPath = (window.DEBUG) ? 'extensions/' + extension.name + '/theme/' + config.options.theme + '.css' : 'themes/' + config.options.theme + '/css/' + extension.name + '/theme.css';

                        yepnope.injectCss(cssPath, function () {
                            that.createExtension(extension, config);
                        });
                    });
                }
            });
        };

        BootStrapper.prototype.createExtension = function (extension, config) {
            var provider = new extension.provider(this, config, this.manifest);

            new extension.type(provider);
        };
        return BootStrapper;
    })();

    
    return BootStrapper;
});

/**
 * Copyright (c) 2011-2013 Fabien Cazenave, Mozilla.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */
/*
  Additional modifications for PDF.js project:
    - Disables language initialization on page loading;
    - Removes consoleWarn and consoleLog and use console.log/warn directly.
    - Removes window._ assignment.
*/

/*jshint browser: true, devel: true, globalstrict: true */


document.webL10n = (function(window, document, undefined) {
  var gL10nData = {};
  var gTextData = '';
  var gTextProp = 'textContent';
  var gLanguage = '';
  var gMacros = {};
  var gReadyState = 'loading';


  /**
   * Synchronously loading l10n resources significantly minimizes flickering
   * from displaying the app with non-localized strings and then updating the
   * strings. Although this will block all script execution on this page, we
   * expect that the l10n resources are available locally on flash-storage.
   *
   * As synchronous XHR is generally considered as a bad idea, we're still
   * loading l10n resources asynchronously -- but we keep this in a setting,
   * just in case... and applications using this library should hide their
   * content until the `localized' event happens.
   */

  var gAsyncResourceLoading = true; // read-only


  /**
   * DOM helpers for the so-called "HTML API".
   *
   * These functions are written for modern browsers. For old versions of IE,
   * they're overridden in the 'startup' section at the end of this file.
   */

  function getL10nResourceLinks() {
    return document.querySelectorAll('link[type="application/l10n"]');
  }

  function getL10nDictionary() {
    var script = document.querySelector('script[type="application/l10n"]');
    // TODO: support multiple and external JSON dictionaries
    return script ? JSON.parse(script.innerHTML) : null;
  }

  function getTranslatableChildren(element) {
    return element ? element.querySelectorAll('*[data-l10n-id]') : [];
  }

  function getL10nAttributes(element) {
    if (!element)
      return {};

    var l10nId = element.getAttribute('data-l10n-id');
    var l10nArgs = element.getAttribute('data-l10n-args');
    var args = {};
    if (l10nArgs) {
      try {
        args = JSON.parse(l10nArgs);
      } catch (e) {
        console.warn('could not parse arguments for #' + l10nId);
      }
    }
    return { id: l10nId, args: args };
  }

  function fireL10nReadyEvent(lang) {
    var evtObject = document.createEvent('Event');
    evtObject.initEvent('localized', true, false);
    evtObject.language = lang;
    document.dispatchEvent(evtObject);
  }

  function xhrLoadText(url, onSuccess, onFailure, asynchronous) {
    onSuccess = onSuccess || function _onSuccess(data) {};
    onFailure = onFailure || function _onFailure() {
      console.warn(url + ' not found.');
    };

    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, asynchronous);
    if (xhr.overrideMimeType) {
      xhr.overrideMimeType('text/plain; charset=utf-8');
    }
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        if (xhr.status == 200 || xhr.status === 0) {
          onSuccess(xhr.responseText);
        } else {
          onFailure();
        }
      }
    };
    xhr.onerror = onFailure;
    xhr.ontimeout = onFailure;

    // in Firefox OS with the app:// protocol, trying to XHR a non-existing
    // URL will raise an exception here -- hence this ugly try...catch.
    try {
      xhr.send(null);
    } catch (e) {
      onFailure();
    }
  }


  /**
   * l10n resource parser:
   *  - reads (async XHR) the l10n resource matching `lang';
   *  - imports linked resources (synchronously) when specified;
   *  - parses the text data (fills `gL10nData' and `gTextData');
   *  - triggers success/failure callbacks when done.
   *
   * @param {string} href
   *    URL of the l10n resource to parse.
   *
   * @param {string} lang
   *    locale (language) to parse.
   *
   * @param {Function} successCallback
   *    triggered when the l10n resource has been successully parsed.
   *
   * @param {Function} failureCallback
   *    triggered when the an error has occured.
   *
   * @return {void}
   *    uses the following global variables: gL10nData, gTextData, gTextProp.
   */

  function parseResource(href, lang, successCallback, failureCallback) {
    var baseURL = href.replace(/[^\/]*$/, '') || './';

    // handle escaped characters (backslashes) in a string
    function evalString(text) {
      if (text.lastIndexOf('\\') < 0)
        return text;
      return text.replace(/\\\\/g, '\\')
                 .replace(/\\n/g, '\n')
                 .replace(/\\r/g, '\r')
                 .replace(/\\t/g, '\t')
                 .replace(/\\b/g, '\b')
                 .replace(/\\f/g, '\f')
                 .replace(/\\{/g, '{')
                 .replace(/\\}/g, '}')
                 .replace(/\\"/g, '"')
                 .replace(/\\'/g, "'");
    }

    // parse *.properties text data into an l10n dictionary
    function parseProperties(text) {
      var dictionary = [];

      // token expressions
      var reBlank = /^\s*|\s*$/;
      var reComment = /^\s*#|^\s*$/;
      var reSection = /^\s*\[(.*)\]\s*$/;
      var reImport = /^\s*@import\s+url\((.*)\)\s*$/i;
      var reSplit = /^([^=\s]*)\s*=\s*(.+)$/; // TODO: escape EOLs with '\'

      // parse the *.properties file into an associative array
      function parseRawLines(rawText, extendedSyntax) {
        var entries = rawText.replace(reBlank, '').split(/[\r\n]+/);
        var currentLang = '*';
        var genericLang = lang.replace(/-[a-z]+$/i, '');
        var skipLang = false;
        var match = '';

        for (var i = 0; i < entries.length; i++) {
          var line = entries[i];

          // comment or blank line?
          if (reComment.test(line))
            continue;

          // the extended syntax supports [lang] sections and @import rules
          if (extendedSyntax) {
            if (reSection.test(line)) { // section start?
              match = reSection.exec(line);
              currentLang = match[1];
              skipLang = (currentLang !== '*') &&
                  (currentLang !== lang) && (currentLang !== genericLang);
              continue;
            } else if (skipLang) {
              continue;
            }
            if (reImport.test(line)) { // @import rule?
              match = reImport.exec(line);
              loadImport(baseURL + match[1]); // load the resource synchronously
            }
          }

          // key-value pair
          var tmp = line.match(reSplit);
          if (tmp && tmp.length == 3) {
            dictionary[tmp[1]] = evalString(tmp[2]);
          }
        }
      }

      // import another *.properties file
      function loadImport(url) {
        xhrLoadText(url, function(content) {
          parseRawLines(content, false); // don't allow recursive imports
        }, null, false); // load synchronously
      }

      // fill the dictionary
      parseRawLines(text, true);
      return dictionary;
    }

    // load and parse l10n data (warning: global variables are used here)
    xhrLoadText(href, function(response) {
      gTextData += response; // mostly for debug

      // parse *.properties text data into an l10n dictionary
      var data = parseProperties(response);

      // find attribute descriptions, if any
      for (var key in data) {
        var id, prop, index = key.lastIndexOf('.');
        if (index > 0) { // an attribute has been specified
          id = key.substring(0, index);
          prop = key.substr(index + 1);
        } else { // no attribute: assuming text content by default
          id = key;
          prop = gTextProp;
        }
        if (!gL10nData[id]) {
          gL10nData[id] = {};
        }
        gL10nData[id][prop] = data[key];
      }

      // trigger callback
      if (successCallback) {
        successCallback();
      }
    }, failureCallback, gAsyncResourceLoading);
  }

  // load and parse all resources for the specified locale
  function loadLocale(lang, callback) {
    console.log("load locale");
    callback = callback || function _callback() {};

    clear();
    gLanguage = lang;

    // check all <link type="application/l10n" href="..." /> nodes
    // and load the resource files
    var langLinks = getL10nResourceLinks();
    var langCount = langLinks.length;
    if (langCount === 0) {
      // we might have a pre-compiled dictionary instead
      var dict = getL10nDictionary();
      if (dict && dict.locales && dict.default_locale) {
        console.log('using the embedded JSON directory, early way out');
        gL10nData = dict.locales[lang] || dict.locales[dict.default_locale];
        callback();
      } else {
        console.log('no resource to load, early way out');
      }
      // early way out
      fireL10nReadyEvent(lang);
      gReadyState = 'complete';
      return;
    }

    // start the callback when all resources are loaded
    var onResourceLoaded = null;
    var gResourceCount = 0;
    onResourceLoaded = function() {
      gResourceCount++;
      if (gResourceCount >= langCount) {
        callback();
        fireL10nReadyEvent(lang);
        gReadyState = 'complete';
      }
    };

    // load all resource files
    function L10nResourceLink(link) {
      var href = link.href;
      var type = link.type;
      this.load = function(lang, callback) {
        var applied = lang;
        parseResource(href, lang, callback, function() {
          console.warn(href + ' not found.');
          applied = '';
        });
        return applied; // return lang if found, an empty string if not found
      };
    }

    for (var i = 0; i < langCount; i++) {
      var resource = new L10nResourceLink(langLinks[i]);
      var rv = resource.load(lang, onResourceLoaded);
      if (rv != lang) { // lang not found, used default resource instead
        console.warn('"' + lang + '" resource not found');
        gLanguage = '';
      }
    }
  }

  // clear all l10n data
  function clear() {
    gL10nData = {};
    gTextData = '';
    gLanguage = '';
    // TODO: clear all non predefined macros.
    // There's no such macro /yet/ but we're planning to have some...
  }


  /**
   * Get rules for plural forms (shared with JetPack), see:
   * http://unicode.org/repos/cldr-tmp/trunk/diff/supplemental/language_plural_rules.html
   * https://github.com/mozilla/addon-sdk/blob/master/python-lib/plural-rules-generator.p
   *
   * @param {string} lang
   *    locale (language) used.
   *
   * @return {Function}
   *    returns a function that gives the plural form name for a given integer:
   *       var fun = getPluralRules('en');
   *       fun(1)    -> 'one'
   *       fun(0)    -> 'other'
   *       fun(1000) -> 'other'.
   */

  function getPluralRules(lang) {
    var locales2rules = {
      'af': 3,
      'ak': 4,
      'am': 4,
      'ar': 1,
      'asa': 3,
      'az': 0,
      'be': 11,
      'bem': 3,
      'bez': 3,
      'bg': 3,
      'bh': 4,
      'bm': 0,
      'bn': 3,
      'bo': 0,
      'br': 20,
      'brx': 3,
      'bs': 11,
      'ca': 3,
      'cgg': 3,
      'chr': 3,
      'cs': 12,
      'cy': 17,
      'da': 3,
      'de': 3,
      'dv': 3,
      'dz': 0,
      'ee': 3,
      'el': 3,
      'en': 3,
      'eo': 3,
      'es': 3,
      'et': 3,
      'eu': 3,
      'fa': 0,
      'ff': 5,
      'fi': 3,
      'fil': 4,
      'fo': 3,
      'fr': 5,
      'fur': 3,
      'fy': 3,
      'ga': 8,
      'gd': 24,
      'gl': 3,
      'gsw': 3,
      'gu': 3,
      'guw': 4,
      'gv': 23,
      'ha': 3,
      'haw': 3,
      'he': 2,
      'hi': 4,
      'hr': 11,
      'hu': 0,
      'id': 0,
      'ig': 0,
      'ii': 0,
      'is': 3,
      'it': 3,
      'iu': 7,
      'ja': 0,
      'jmc': 3,
      'jv': 0,
      'ka': 0,
      'kab': 5,
      'kaj': 3,
      'kcg': 3,
      'kde': 0,
      'kea': 0,
      'kk': 3,
      'kl': 3,
      'km': 0,
      'kn': 0,
      'ko': 0,
      'ksb': 3,
      'ksh': 21,
      'ku': 3,
      'kw': 7,
      'lag': 18,
      'lb': 3,
      'lg': 3,
      'ln': 4,
      'lo': 0,
      'lt': 10,
      'lv': 6,
      'mas': 3,
      'mg': 4,
      'mk': 16,
      'ml': 3,
      'mn': 3,
      'mo': 9,
      'mr': 3,
      'ms': 0,
      'mt': 15,
      'my': 0,
      'nah': 3,
      'naq': 7,
      'nb': 3,
      'nd': 3,
      'ne': 3,
      'nl': 3,
      'nn': 3,
      'no': 3,
      'nr': 3,
      'nso': 4,
      'ny': 3,
      'nyn': 3,
      'om': 3,
      'or': 3,
      'pa': 3,
      'pap': 3,
      'pl': 13,
      'ps': 3,
      'pt': 3,
      'rm': 3,
      'ro': 9,
      'rof': 3,
      'ru': 11,
      'rwk': 3,
      'sah': 0,
      'saq': 3,
      'se': 7,
      'seh': 3,
      'ses': 0,
      'sg': 0,
      'sh': 11,
      'shi': 19,
      'sk': 12,
      'sl': 14,
      'sma': 7,
      'smi': 7,
      'smj': 7,
      'smn': 7,
      'sms': 7,
      'sn': 3,
      'so': 3,
      'sq': 3,
      'sr': 11,
      'ss': 3,
      'ssy': 3,
      'st': 3,
      'sv': 3,
      'sw': 3,
      'syr': 3,
      'ta': 3,
      'te': 3,
      'teo': 3,
      'th': 0,
      'ti': 4,
      'tig': 3,
      'tk': 3,
      'tl': 4,
      'tn': 3,
      'to': 0,
      'tr': 0,
      'ts': 3,
      'tzm': 22,
      'uk': 11,
      'ur': 3,
      've': 3,
      'vi': 0,
      'vun': 3,
      'wa': 4,
      'wae': 3,
      'wo': 0,
      'xh': 3,
      'xog': 3,
      'yo': 0,
      'zh': 0,
      'zu': 3
    };

    // utility functions for plural rules methods
    function isIn(n, list) {
      return list.indexOf(n) !== -1;
    }
    function isBetween(n, start, end) {
      return start <= n && n <= end;
    }

    // list of all plural rules methods:
    // map an integer to the plural form name to use
    var pluralRules = {
      '0': function(n) {
        return 'other';
      },
      '1': function(n) {
        if ((isBetween((n % 100), 3, 10)))
          return 'few';
        if (n === 0)
          return 'zero';
        if ((isBetween((n % 100), 11, 99)))
          return 'many';
        if (n == 2)
          return 'two';
        if (n == 1)
          return 'one';
        return 'other';
      },
      '2': function(n) {
        if (n !== 0 && (n % 10) === 0)
          return 'many';
        if (n == 2)
          return 'two';
        if (n == 1)
          return 'one';
        return 'other';
      },
      '3': function(n) {
        if (n == 1)
          return 'one';
        return 'other';
      },
      '4': function(n) {
        if ((isBetween(n, 0, 1)))
          return 'one';
        return 'other';
      },
      '5': function(n) {
        if ((isBetween(n, 0, 2)) && n != 2)
          return 'one';
        return 'other';
      },
      '6': function(n) {
        if (n === 0)
          return 'zero';
        if ((n % 10) == 1 && (n % 100) != 11)
          return 'one';
        return 'other';
      },
      '7': function(n) {
        if (n == 2)
          return 'two';
        if (n == 1)
          return 'one';
        return 'other';
      },
      '8': function(n) {
        if ((isBetween(n, 3, 6)))
          return 'few';
        if ((isBetween(n, 7, 10)))
          return 'many';
        if (n == 2)
          return 'two';
        if (n == 1)
          return 'one';
        return 'other';
      },
      '9': function(n) {
        if (n === 0 || n != 1 && (isBetween((n % 100), 1, 19)))
          return 'few';
        if (n == 1)
          return 'one';
        return 'other';
      },
      '10': function(n) {
        if ((isBetween((n % 10), 2, 9)) && !(isBetween((n % 100), 11, 19)))
          return 'few';
        if ((n % 10) == 1 && !(isBetween((n % 100), 11, 19)))
          return 'one';
        return 'other';
      },
      '11': function(n) {
        if ((isBetween((n % 10), 2, 4)) && !(isBetween((n % 100), 12, 14)))
          return 'few';
        if ((n % 10) === 0 ||
            (isBetween((n % 10), 5, 9)) ||
            (isBetween((n % 100), 11, 14)))
          return 'many';
        if ((n % 10) == 1 && (n % 100) != 11)
          return 'one';
        return 'other';
      },
      '12': function(n) {
        if ((isBetween(n, 2, 4)))
          return 'few';
        if (n == 1)
          return 'one';
        return 'other';
      },
      '13': function(n) {
        if ((isBetween((n % 10), 2, 4)) && !(isBetween((n % 100), 12, 14)))
          return 'few';
        if (n != 1 && (isBetween((n % 10), 0, 1)) ||
            (isBetween((n % 10), 5, 9)) ||
            (isBetween((n % 100), 12, 14)))
          return 'many';
        if (n == 1)
          return 'one';
        return 'other';
      },
      '14': function(n) {
        if ((isBetween((n % 100), 3, 4)))
          return 'few';
        if ((n % 100) == 2)
          return 'two';
        if ((n % 100) == 1)
          return 'one';
        return 'other';
      },
      '15': function(n) {
        if (n === 0 || (isBetween((n % 100), 2, 10)))
          return 'few';
        if ((isBetween((n % 100), 11, 19)))
          return 'many';
        if (n == 1)
          return 'one';
        return 'other';
      },
      '16': function(n) {
        if ((n % 10) == 1 && n != 11)
          return 'one';
        return 'other';
      },
      '17': function(n) {
        if (n == 3)
          return 'few';
        if (n === 0)
          return 'zero';
        if (n == 6)
          return 'many';
        if (n == 2)
          return 'two';
        if (n == 1)
          return 'one';
        return 'other';
      },
      '18': function(n) {
        if (n === 0)
          return 'zero';
        if ((isBetween(n, 0, 2)) && n !== 0 && n != 2)
          return 'one';
        return 'other';
      },
      '19': function(n) {
        if ((isBetween(n, 2, 10)))
          return 'few';
        if ((isBetween(n, 0, 1)))
          return 'one';
        return 'other';
      },
      '20': function(n) {
        if ((isBetween((n % 10), 3, 4) || ((n % 10) == 9)) && !(
            isBetween((n % 100), 10, 19) ||
            isBetween((n % 100), 70, 79) ||
            isBetween((n % 100), 90, 99)
            ))
          return 'few';
        if ((n % 1000000) === 0 && n !== 0)
          return 'many';
        if ((n % 10) == 2 && !isIn((n % 100), [12, 72, 92]))
          return 'two';
        if ((n % 10) == 1 && !isIn((n % 100), [11, 71, 91]))
          return 'one';
        return 'other';
      },
      '21': function(n) {
        if (n === 0)
          return 'zero';
        if (n == 1)
          return 'one';
        return 'other';
      },
      '22': function(n) {
        if ((isBetween(n, 0, 1)) || (isBetween(n, 11, 99)))
          return 'one';
        return 'other';
      },
      '23': function(n) {
        if ((isBetween((n % 10), 1, 2)) || (n % 20) === 0)
          return 'one';
        return 'other';
      },
      '24': function(n) {
        if ((isBetween(n, 3, 10) || isBetween(n, 13, 19)))
          return 'few';
        if (isIn(n, [2, 12]))
          return 'two';
        if (isIn(n, [1, 11]))
          return 'one';
        return 'other';
      }
    };

    // return a function that gives the plural form name for a given integer
    var index = locales2rules[lang.replace(/-.*$/, '')];
    if (!(index in pluralRules)) {
      console.warn('plural form unknown for [' + lang + ']');
      return function() { return 'other'; };
    }
    return pluralRules[index];
  }

  // pre-defined 'plural' macro
  gMacros.plural = function(str, param, key, prop) {
    var n = parseFloat(param);
    if (isNaN(n))
      return str;

    // TODO: support other properties (l20n still doesn't...)
    if (prop != gTextProp)
      return str;

    // initialize _pluralRules
    if (!gMacros._pluralRules) {
      gMacros._pluralRules = getPluralRules(gLanguage);
    }
    var index = '[' + gMacros._pluralRules(n) + ']';

    // try to find a [zero|one|two] key if it's defined
    if (n === 0 && (key + '[zero]') in gL10nData) {
      str = gL10nData[key + '[zero]'][prop];
    } else if (n == 1 && (key + '[one]') in gL10nData) {
      str = gL10nData[key + '[one]'][prop];
    } else if (n == 2 && (key + '[two]') in gL10nData) {
      str = gL10nData[key + '[two]'][prop];
    } else if ((key + index) in gL10nData) {
      str = gL10nData[key + index][prop];
    } else if ((key + '[other]') in gL10nData) {
      str = gL10nData[key + '[other]'][prop];
    }

    return str;
  };


  /**
   * l10n dictionary functions
   */

  // fetch an l10n object, warn if not found, apply `args' if possible
  function getL10nData(key, args, fallback) {
    var data = gL10nData[key];
    if (!data) {
      console.warn('#' + key + ' is undefined.');
      if (!fallback) {
        return null;
      }
      data = fallback;
    }

    /** This is where l10n expressions should be processed.
      * The plan is to support C-style expressions from the l20n project;
      * until then, only two kinds of simple expressions are supported:
      *   {[ index ]} and {{ arguments }}.
      */
    var rv = {};
    for (var prop in data) {
      var str = data[prop];
      str = substIndexes(str, args, key, prop);
      str = substArguments(str, args, key);
      rv[prop] = str;
    }
    return rv;
  }

  // replace {[macros]} with their values
  function substIndexes(str, args, key, prop) {
    var reIndex = /\{\[\s*([a-zA-Z]+)\(([a-zA-Z]+)\)\s*\]\}/;
    var reMatch = reIndex.exec(str);
    if (!reMatch || !reMatch.length)
      return str;

    // an index/macro has been found
    // Note: at the moment, only one parameter is supported
    var macroName = reMatch[1];
    var paramName = reMatch[2];
    var param;
    if (args && paramName in args) {
      param = args[paramName];
    } else if (paramName in gL10nData) {
      param = gL10nData[paramName];
    }

    // there's no macro parser yet: it has to be defined in gMacros
    if (macroName in gMacros) {
      var macro = gMacros[macroName];
      str = macro(str, param, key, prop);
    }
    return str;
  }

  // replace {{arguments}} with their values
  function substArguments(str, args, key) {
    var reArgs = /\{\{\s*(.+?)\s*\}\}/;
    var match = reArgs.exec(str);
    while (match) {
      if (!match || match.length < 2)
        return str; // argument key not found

      var arg = match[1];
      var sub = '';
      if (args && arg in args) {
        sub = args[arg];
      } else if (arg in gL10nData) {
        sub = gL10nData[arg][gTextProp];
      } else {
        console.log('argument {{' + arg + '}} for #' + key + ' is undefined.');
        return str;
      }

      str = str.substring(0, match.index) + sub +
            str.substr(match.index + match[0].length);
      match = reArgs.exec(str);
    }
    return str;
  }

  // translate an HTML element
  function translateElement(element) {
    var l10n = getL10nAttributes(element);
    if (!l10n.id)
      return;

    // get the related l10n object
    var data = getL10nData(l10n.id, l10n.args);
    if (!data) {
      console.warn('#' + l10n.id + ' is undefined.');
      return;
    }

    // translate element (TODO: security checks?)
    if (data[gTextProp]) { // XXX
      if (getChildElementCount(element) === 0) {
        element[gTextProp] = data[gTextProp];
      } else {
        // this element has element children: replace the content of the first
        // (non-empty) child textNode and clear other child textNodes
        var children = element.childNodes;
        var found = false;
        for (var i = 0, l = children.length; i < l; i++) {
          if (children[i].nodeType === 3 && /\S/.test(children[i].nodeValue)) {
            if (found) {
              children[i].nodeValue = '';
            } else {
              children[i].nodeValue = data[gTextProp];
              found = true;
            }
          }
        }
        // if no (non-empty) textNode is found, insert a textNode before the
        // first element child.
        if (!found) {
          var textNode = document.createTextNode(data[gTextProp]);
          element.insertBefore(textNode, element.firstChild);
        }
      }
      delete data[gTextProp];
    }

    for (var k in data) {
      element[k] = data[k];
    }
  }

  // webkit browsers don't currently support 'children' on SVG elements...
  function getChildElementCount(element) {
    if (element.children) {
      return element.children.length;
    }
    if (typeof element.childElementCount !== 'undefined') {
      return element.childElementCount;
    }
    var count = 0;
    for (var i = 0; i < element.childNodes.length; i++) {
      count += element.nodeType === 1 ? 1 : 0;
    }
    return count;
  }

  // translate an HTML subtree
  function translateFragment(element) {
    element = element || document.documentElement;

    // check all translatable children (= w/ a `data-l10n-id' attribute)
    var children = getTranslatableChildren(element);
    var elementCount = children.length;
    for (var i = 0; i < elementCount; i++) {
      translateElement(children[i]);
    }

    // translate element itself if necessary
    translateElement(element);
  }

  // cross-browser API (sorry, oldIE doesn't support getters & setters)
  return {
    // get a localized string
    get: function(key, args, fallbackString) {
      var index = key.lastIndexOf('.');
      var prop = gTextProp;
      if (index > 0) { // An attribute has been specified
        prop = key.substr(index + 1);
        key = key.substring(0, index);
      }
      var fallback;
      if (fallbackString) {
        fallback = {};
        fallback[prop] = fallbackString;
      }
      var data = getL10nData(key, args, fallback);
      if (data && prop in data) {
        return data[prop];
      }
      return '{{' + key + '}}';
    },

    // debug
    getData: function() { return gL10nData; },
    getText: function() { return gTextData; },

    // get|set the document language
    getLanguage: function() { return gLanguage; },
    setLanguage: function(lang) {
      loadLocale(lang, translateFragment);
    },

    // get the direction (ltr|rtl) of the current language
    getDirection: function() {
      // http://www.w3.org/International/questions/qa-scripts
      // Arabic, Hebrew, Farsi, Pashto, Urdu
      var rtlList = ['ar', 'he', 'fa', 'ps', 'ur'];
      return (rtlList.indexOf(gLanguage) >= 0) ? 'rtl' : 'ltr';
    },

    // translate an element or document fragment
    translate: translateFragment,

    // this can be used to prevent race conditions
    getReadyState: function() { return gReadyState; },
    ready: function(callback) {
      if (!callback) {
        return;
      } else if (gReadyState == 'complete' || gReadyState == 'interactive') {
        window.setTimeout(callback);
      } else if (document.addEventListener) {
        document.addEventListener('localized', callback);
      } else if (document.attachEvent) {
        document.documentElement.attachEvent('onpropertychange', function(e) {
          if (e.propertyName === 'localized') {
            callback();
          }
        });
      }
    }
  };
}) (window, document);
define("l10n", function(){});

/**
 * Copyright (c) 2010 by Gabriel Birke
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the 'Software'), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

function Sanitize(){
    var i, e, options;
    options = arguments[0] || {};
    this.config = {};
    this.config.elements = options.elements ? options.elements : [];
    this.config.attributes = options.attributes ? options.attributes : {};
    this.config.attributes[Sanitize.ALL] = this.config.attributes[Sanitize.ALL] ? this.config.attributes[Sanitize.ALL] : [];
    this.config.allow_comments = options.allow_comments ? options.allow_comments : false;
    this.allowed_elements = {};
    this.config.protocols = options.protocols ? options.protocols : {};
    this.config.add_attributes = options.add_attributes ? options.add_attributes  : {};
    this.dom = options.dom ? options.dom : document;
    for(i=0;i<this.config.elements.length;i++) {
        this.allowed_elements[this.config.elements[i]] = true;
    }
    this.config.remove_element_contents = {};
    this.config.remove_all_contents = false;
    if(options.remove_contents) {

        if(options.remove_contents instanceof Array) {
            for(i=0;i<options.remove_contents.length;i++) {
                this.config.remove_element_contents[options.remove_contents[i]] = true;
            }
        }
        else {
            this.config.remove_all_contents = true;
        }
    }
    this.transformers = options.transformers ? options.transformers : [];
}

Sanitize.REGEX_PROTOCOL = /^([A-Za-z0-9\+\-\.\&\;\*\s]*?)(?:\:|&*0*58|&*x0*3a)/i;

// emulate Ruby symbol with string constant
Sanitize.RELATIVE = '__RELATIVE__';
Sanitize.ALL = '__ALL__';

Sanitize.prototype.clean_node = function(container) {
    var fragment = this.dom.createDocumentFragment();
    this.current_element = fragment;
    this.whitelist_nodes = [];



    /**
     * Utility function to check if an element exists in an array
     */
    function _array_index(needle, haystack) {
        var i;
        for(i=0; i < haystack.length; i++) {
            if(haystack[i] == needle)
                return i;
        }
        return -1;
    }

    function _merge_arrays_uniq() {
        var result = [];
        var uniq_hash = {};
        var i,j;
        for(i=0;i<arguments.length;i++) {
            if(!arguments[i] || !arguments[i].length)
                continue;
            for(j=0;j<arguments[i].length;j++) {
                if(uniq_hash[arguments[i][j]])
                    continue;
                uniq_hash[arguments[i][j]] = true;
                result.push(arguments[i][j]);
            }
        }
        return result;
    }

    /**
     * Clean function that checks the different node types and cleans them up accordingly
     * @param elem DOM Node to clean
     */
    function _clean(elem) {
        var clone;
        switch(elem.nodeType) {
            // Element
            case 1:
                _clean_element.call(this, elem);
                break;
            // Text
            case 3:
                clone = elem.cloneNode(false);
                this.current_element.appendChild(clone);
                break;
            // Entity-Reference (normally not used)
            case 5:
                clone = elem.cloneNode(false);
                this.current_element.appendChild(clone);
                break;
            // Comment
            case 8:
                if(this.config.allow_comments) {
                    clone = elem.cloneNode(false);
                    this.current_element.appendChild(clone);
                }
                break;
            default:
                if (console && console.log) console.log("unknown node type", elem.nodeType);
                break;
        }

    }

    function _clean_element(elem) {
        var i, j, clone, parent_element, name, allowed_attributes, attr, attr_name, attr_node, protocols, del, attr_ok;
        var transform = _transform_element.call(this, elem);

        elem = transform.node;
        name = elem.nodeName.toLowerCase();

        // check if element itself is allowed
        parent_element = this.current_element;
        if(this.allowed_elements[name] || transform.whitelist) {
            this.current_element = this.dom.createElement(elem.nodeName);
            parent_element.appendChild(this.current_element);

            // clean attributes
            var attrs = this.config.attributes;
            allowed_attributes = _merge_arrays_uniq(attrs[name], attrs[Sanitize.ALL], transform.attr_whitelist);
            for(i=0;i<allowed_attributes.length;i++) {
                attr_name = allowed_attributes[i];
                attr = elem.attributes[attr_name];
                if(attr) {
                    attr_ok = true;
                    // Check protocol attributes for valid protocol
                    if(this.config.protocols[name] && this.config.protocols[name][attr_name]) {
                        protocols = this.config.protocols[name][attr_name];
                        del = attr.value.toLowerCase().match(Sanitize.REGEX_PROTOCOL);
                        if(del) {
                            attr_ok = (_array_index(del[1], protocols) != -1);
                        }
                        else {
                            attr_ok = (_array_index(Sanitize.RELATIVE, protocols) != -1);
                        }
                    }
                    if(attr_ok) {
                        attr_node = document.createAttribute(attr_name);
                        attr_node.value = attr.value;
                        this.current_element.setAttributeNode(attr_node);
                    }
                }
            }

            // Add attributes
            if(this.config.add_attributes[name]) {
                for(attr_name in this.config.add_attributes[name]) {
                    attr_node = document.createAttribute(attr_name);
                    attr_node.value = this.config.add_attributes[name][attr_name];
                    this.current_element.setAttributeNode(attr_node);
                }
            }
        } // End checking if element is allowed
        // If this node is in the dynamic whitelist array (built at runtime by
        // transformers), let it live with all of its attributes intact.
        else if(_array_index(elem, this.whitelist_nodes) != -1) {
            this.current_element = elem.cloneNode(true);
            // Remove child nodes, they will be sanitiazied and added by other code
            while(this.current_element.childNodes.length > 0) {
                this.current_element.removeChild(this.current_element.firstChild);
            }
            parent_element.appendChild(this.current_element);
        }

        // iterate over child nodes
        if(!this.config.remove_all_contents && !this.config.remove_element_contents[name]) {
            for(i=0;i<elem.childNodes.length;i++) {
                _clean.call(this, elem.childNodes[i]);
            }
        }

        // some versions of IE don't support normalize.
        if(this.current_element.normalize) {
            this.current_element.normalize();
        }
        this.current_element = parent_element;
    } // END clean_element function

    function _transform_element(node) {
        var output = {
            attr_whitelist:[],
            node: node,
            whitelist: false
        };
        var i, j, transform;
        for(i=0;i<this.transformers.length;i++) {
            transform = this.transformers[i]({
                allowed_elements: this.allowed_elements,
                config: this.config,
                node: node,
                node_name: node.nodeName.toLowerCase(),
                whitelist_nodes: this.whitelist_nodes,
                dom: this.dom
            });
            if (transform == null)
                continue;
            else if(typeof transform == 'object') {
                if(transform.whitelist_nodes && transform.whitelist_nodes instanceof Array) {
                    for(j=0;j<transform.whitelist_nodes.length;j++) {
                        if(_array_index(transform.whitelist_nodes[j], this.whitelist_nodes) == -1) {
                            this.whitelist_nodes.push(transform.whitelist_nodes[j]);
                        }
                    }
                }
                output.whitelist = transform.whitelist ? true : false;
                if(transform.attr_whitelist) {
                    output.attr_whitelist = _merge_arrays_uniq(output.attr_whitelist, transform.attr_whitelist);
                }
                output.node = transform.node ? transform.node : output.node;
            }
            else {
                throw new Error("transformer output must be an object or null");
            }
        }
        return output;
    }



    for(i=0;i<container.childNodes.length;i++) {
        _clean.call(this, container.childNodes[i]);
    }

    if(fragment.normalize) {
        fragment.normalize();
    }

    return fragment;

};

if ( typeof define === "function" ) {
    define( "sanitize", [], function () { return Sanitize; } );
};
define('modules/uv-shared-module/panel',["require", "exports"], function(require, exports) {
    var Panel = (function () {
        function Panel($element, fitToParentWidth, fitToParentHeight) {
            this.$element = $element;
            this.fitToParentWidth = fitToParentWidth || false;
            this.fitToParentHeight = fitToParentHeight || false;

            this.create();
        }
        Panel.prototype.create = function () {
            var _this = this;
            $.subscribe('onResize', function () {
                _this.resize();
            });
        };

        Panel.prototype.resize = function () {
            var $parent = this.$element.parent();

            if (this.fitToParentWidth) {
                this.$element.width($parent.width());
            }

            if (this.fitToParentHeight) {
                this.$element.height($parent.height());
            }
        };
        return Panel;
    })();
    exports.Panel = Panel;
});

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define('modules/uv-shared-module/baseView',["require", "exports", "./panel"], function(require, exports, panel) {
    var BaseView = (function (_super) {
        __extends(BaseView, _super);
        function BaseView($element, fitToParentWidth, fitToParentHeight) {
            this.modules = [];
            _super.call(this, $element, fitToParentWidth, fitToParentHeight);
        }
        BaseView.prototype.create = function () {
            var _this = this;
            _super.prototype.create.call(this);

            this.extension = window.extension;
            this.provider = this.extension.provider;

            this.config = {};
            this.config.content = {};
            this.config.options = {};
            this.content = this.config.content;
            this.options = this.config.options;

            if (this.modules.length) {
                this.modules = this.modules.reverse();
                _.each(this.modules, function (moduleName) {
                    _this.config = $.extend(true, _this.config, _this.provider.config.modules[moduleName]);
                });
            }
        };

        BaseView.prototype.init = function () {
        };

        BaseView.prototype.setConfig = function (moduleName) {
            this.modules.push(moduleName);
        };

        BaseView.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        return BaseView;
    })(panel.Panel);
    exports.BaseView = BaseView;
});

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define('modules/uv-shared-module/dialogue',["require", "exports", "./baseExtension", "./shell", "./baseView"], function(require, exports, baseExtension, shell, baseView) {
    var Dialogue = (function (_super) {
        __extends(Dialogue, _super);
        function Dialogue($element) {
            _super.call(this, $element, false, false);
            this.isActive = false;
            this.allowClose = true;
        }
        Dialogue.prototype.create = function () {
            var _this = this;
            this.setConfig('dialogue');

            _super.prototype.create.call(this);

            $.subscribe(baseExtension.BaseExtension.CLOSE_ACTIVE_DIALOGUE, function () {
                if (_this.isActive) {
                    if (_this.allowClose) {
                        _this.close();
                    }
                }
            });

            $.subscribe(baseExtension.BaseExtension.ESCAPE, function () {
                if (_this.isActive) {
                    if (_this.allowClose) {
                        _this.close();
                    }
                }
            });

            this.$top = $('<div class="top"></div>');
            this.$element.append(this.$top);

            this.$closeButton = $('<a href="#" class="close">' + this.content.close + '</a>');
            this.$top.append(this.$closeButton);

            this.$middle = $('<div class="middle"></div>');
            this.$element.append(this.$middle);

            this.$content = $('<div class="content"></div>');
            this.$middle.append(this.$content);

            this.$bottom = $('<div class="bottom"></div>');
            this.$element.append(this.$bottom);

            this.$closeButton.on('click', function (e) {
                e.preventDefault();

                _this.close();
            });

            this.returnFunc = this.close;
        };

        Dialogue.prototype.enableClose = function () {
            this.allowClose = true;
            this.$closeButton.show();
        };

        Dialogue.prototype.disableClose = function () {
            this.allowClose = false;
            this.$closeButton.hide();
        };

        Dialogue.prototype.setArrowPosition = function () {
            var paddingLeft = parseInt(this.$element.css("padding-left"));
            var pos = this.extension.mouseX - paddingLeft - 10;
            if (pos < 0)
                pos = 0;
            this.$bottom.css('backgroundPosition', pos + 'px 0px');
        };

        Dialogue.prototype.open = function () {
            var _this = this;
            this.$element.show();
            this.setArrowPosition();
            this.isActive = true;

            setTimeout(function () {
                _this.$element.find('.btn.default').focus();
            }, 1);

            $.publish(shell.Shell.SHOW_OVERLAY);

            this.resize();
        };

        Dialogue.prototype.close = function () {
            if (this.isActive) {
                this.$element.hide();
                this.isActive = false;

                $.publish(shell.Shell.HIDE_OVERLAY);
            }
        };

        Dialogue.prototype.resize = function () {
            _super.prototype.resize.call(this);

            this.$element.css({
                'top': (this.extension.height() / 2) - (this.$element.height() / 2),
                'left': (this.extension.width() / 2) - (this.$element.width() / 2)
            });
        };
        return Dialogue;
    })(baseView.BaseView);
    exports.Dialogue = Dialogue;
});

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define('modules/uv-shared-module/genericDialogue',["require", "exports", "./baseExtension", "./dialogue"], function(require, exports, baseExtension, dialogue) {
    var GenericDialogue = (function (_super) {
        __extends(GenericDialogue, _super);
        function GenericDialogue($element) {
            _super.call(this, $element);
        }
        GenericDialogue.prototype.create = function () {
            var _this = this;
            this.setConfig('genericDialogue');

            _super.prototype.create.call(this);

            $.subscribe(GenericDialogue.SHOW_GENERIC_DIALOGUE, function (e, params) {
                _this.showMessage(params);
            });

            $.subscribe(GenericDialogue.HIDE_GENERIC_DIALOGUE, function (e) {
                _this.close();
            });

            this.$message = $('<p></p>');
            this.$content.append(this.$message);

            this.$acceptButton = $('<a href="#" class="btn btn-primary accept default"></a>');
            this.$content.append(this.$acceptButton);
            this.$acceptButton.text(this.content.ok);

            this.$acceptButton.onPressed(function () {
                _this.accept();
            });

            this.returnFunc = function () {
                if (_this.isActive) {
                    _this.accept();
                }
            };

            this.$element.hide();
        };

        GenericDialogue.prototype.accept = function () {
            $.publish(baseExtension.BaseExtension.CLOSE_ACTIVE_DIALOGUE);

            if (this.acceptCallback)
                this.acceptCallback();
        };

        GenericDialogue.prototype.showMessage = function (params) {
            this.$message.html(params.message);

            if (params.buttonText) {
                this.$acceptButton.text(params.buttonText);
            } else {
                this.$acceptButton.text(this.content.ok);
            }

            this.acceptCallback = params.acceptCallback;

            if (params.allowClose === false) {
                this.disableClose();
            }

            this.open();
        };

        GenericDialogue.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        GenericDialogue.SHOW_GENERIC_DIALOGUE = 'onShowGenericDialogue';
        GenericDialogue.HIDE_GENERIC_DIALOGUE = 'onHideGenericDialogue';
        return GenericDialogue;
    })(dialogue.Dialogue);
    exports.GenericDialogue = GenericDialogue;
});

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define('modules/uv-shared-module/shell',["require", "exports", "./baseExtension", "./baseView", "./genericDialogue"], function(require, exports, baseExtension, baseView, genericDialogue) {
    var Shell = (function (_super) {
        __extends(Shell, _super);
        function Shell($element) {
            Shell.$element = $element;
            _super.call(this, Shell.$element, true, true);
        }
        Shell.prototype.create = function () {
            _super.prototype.create.call(this);

            $.subscribe(Shell.SHOW_OVERLAY, function () {
                Shell.$overlays.show();
            });

            $.subscribe(Shell.HIDE_OVERLAY, function () {
                Shell.$overlays.hide();
            });

            Shell.$headerPanel = $('<div class="headerPanel"></div>');
            this.$element.append(Shell.$headerPanel);

            Shell.$mainPanel = $('<div class="mainPanel"></div>');
            this.$element.append(Shell.$mainPanel);

            Shell.$centerPanel = $('<div class="centerPanel"></div>');
            Shell.$mainPanel.append(Shell.$centerPanel);

            Shell.$leftPanel = $('<div class="leftPanel"></div>');
            Shell.$mainPanel.append(Shell.$leftPanel);

            Shell.$rightPanel = $('<div class="rightPanel"></div>');
            Shell.$mainPanel.append(Shell.$rightPanel);

            Shell.$footerPanel = $('<div class="footerPanel"></div>');
            Shell.$element.append(Shell.$footerPanel);

            Shell.$overlays = $('<div class="overlays"></div>');
            this.$element.append(Shell.$overlays);

            Shell.$genericDialogue = $('<div class="overlay genericDialogue"></div>');
            Shell.$overlays.append(Shell.$genericDialogue);

            Shell.$overlays.on('click', function (e) {
                if ($(e.target).hasClass('overlays')) {
                    e.preventDefault();
                    $.publish(baseExtension.BaseExtension.CLOSE_ACTIVE_DIALOGUE);
                }
            });

            new genericDialogue.GenericDialogue(Shell.$genericDialogue);
        };

        Shell.prototype.resize = function () {
            _super.prototype.resize.call(this);

            Shell.$overlays.width(this.extension.width());
            Shell.$overlays.height(this.extension.height());

            var mainHeight = this.$element.height() - parseInt(Shell.$mainPanel.css('marginTop')) - Shell.$headerPanel.height() - Shell.$footerPanel.height();
            Shell.$mainPanel.height(mainHeight);
        };
        Shell.SHOW_OVERLAY = 'onShowOverlay';
        Shell.HIDE_OVERLAY = 'onHideOverlay';
        return Shell;
    })(baseView.BaseView);
    exports.Shell = Shell;
});

define('modules/uv-shared-module/baseExtension',["require", "exports", "../../utils", "./shell", "./genericDialogue"], function(require, exports, utils, shell, genericDialogue) {
    var BaseExtension = (function () {
        function BaseExtension(provider) {
            this.isFullScreen = false;
            this.tabbing = false;
            this.shifted = false;
            window.extension = this;

            this.provider = provider;

            this.create();
        }
        BaseExtension.prototype.create = function () {
            var _this = this;
            this.$element = $('#app');

            var $win = $(window);
            this.$element.width($win.width());
            this.$element.height($win.height());

            if (!this.provider.isReload) {
                this.socket = new easyXDM.Socket({
                    onMessage: function (message, origin) {
                        message = $.parseJSON(message);
                        _this.handleParentFrameEvent(message);
                    }
                });
            }

            this.triggerSocket(BaseExtension.LOAD, {
                config: this.provider.config
            });

            this.$element.empty();
            this.$element.removeClass();
            this.$element.addClass('browser-' + window.browserDetect.browser);
            this.$element.addClass('browser-version-' + window.browserDetect.version);
            if (!this.provider.isHomeDomain)
                this.$element.addClass('embedded');
            if (this.provider.isLightbox)
                this.$element.addClass('lightbox');
            this.$element.addClass(this.provider.getSequenceType());

            window.onresize = function () {
                var $win = $(window);
                $('body').height($win.height());

                _this.resize();
            };

            $(document).on('mousemove', function (e) {
                _this.mouseX = e.pageX;
                _this.mouseY = e.pageY;
            });

            $(document).on('keyup keydown', function (e) {
                _this.shifted = e.shiftKey;
                _this.tabbing = e.keyCode === 9;
            });

            this.$element.append('<a href="/" id="top"></a>');

            $.subscribe(BaseExtension.TOGGLE_FULLSCREEN, function () {
                if (!_this.isOverlayActive()) {
                    $('#top').focus();
                    _this.isFullScreen = !_this.isFullScreen;
                    _this.triggerSocket(BaseExtension.TOGGLE_FULLSCREEN, {
                        isFullScreen: _this.isFullScreen,
                        overrideFullScreen: _this.provider.config.options.overrideFullScreen
                    });
                }
            });

            $(document).keyup(function (e) {
                if (e.keyCode === 13)
                    $.publish(BaseExtension.RETURN);
                if (e.keyCode === 27)
                    $.publish(BaseExtension.ESCAPE);
                if (e.keyCode === 33)
                    $.publish(BaseExtension.PAGE_UP);
                if (e.keyCode === 34)
                    $.publish(BaseExtension.PAGE_DOWN);
                if (e.keyCode === 35)
                    $.publish(BaseExtension.END);
                if (e.keyCode === 36)
                    $.publish(BaseExtension.HOME);
            });

            $.subscribe(BaseExtension.ESCAPE, function () {
                if (_this.isFullScreen) {
                    $.publish(BaseExtension.TOGGLE_FULLSCREEN);
                }
            });

            $.subscribe(BaseExtension.CREATED, function () {
                _this.triggerSocket(BaseExtension.CREATED);
            });

            this.shell = new shell.Shell(this.$element);

            this.canvasIndex = -1;
        };

        BaseExtension.prototype.width = function () {
            return $(window).width();
        };

        BaseExtension.prototype.height = function () {
            return $(window).height();
        };

        BaseExtension.prototype.triggerSocket = function (eventName, eventObject) {
            if (this.socket) {
                this.socket.postMessage(JSON.stringify({ eventName: eventName, eventObject: eventObject }));
            }
        };

        BaseExtension.prototype.redirect = function (uri) {
            this.triggerSocket(BaseExtension.REDIRECT, uri);
        };

        BaseExtension.prototype.refresh = function () {
            this.triggerSocket(BaseExtension.REFRESH, null);
        };

        BaseExtension.prototype.resize = function () {
            $.publish(BaseExtension.RESIZE);
        };

        BaseExtension.prototype.handleParentFrameEvent = function (message) {
            switch (message.eventName) {
                case BaseExtension.TOGGLE_FULLSCREEN:
                    $.publish(BaseExtension.TOGGLE_FULLSCREEN, message.eventObject);
                    break;
            }
        };

        BaseExtension.prototype.getParam = function (key) {
            var value;

            if (this.provider.isDeepLinkingEnabled()) {
                value = utils.Utils.getHashParameter(this.provider.paramMap[key], parent.document);
            }

            if (!value) {
                value = utils.Utils.getQuerystringParameter(this.provider.paramMap[key]);
            }

            return value;
        };

        BaseExtension.prototype.setParam = function (key, value) {
            if (this.provider.isDeepLinkingEnabled()) {
                utils.Utils.setHashParameter(this.provider.paramMap[key], value, parent.document);
            }
        };

        BaseExtension.prototype.viewCanvas = function (canvasIndex, callback) {
            this.provider.canvasIndex = canvasIndex;

            $.publish(BaseExtension.CANVAS_INDEX_CHANGED, [canvasIndex]);

            if (callback)
                callback(canvasIndex);
        };

        BaseExtension.prototype.showDialogue = function (message, acceptCallback, buttonText, allowClose) {
            this.closeActiveDialogue();

            $.publish(genericDialogue.GenericDialogue.SHOW_GENERIC_DIALOGUE, [{
                    message: message,
                    acceptCallback: acceptCallback,
                    buttonText: buttonText,
                    allowClose: allowClose
                }]);
        };

        BaseExtension.prototype.closeActiveDialogue = function () {
            $.publish(BaseExtension.CLOSE_ACTIVE_DIALOGUE);
        };

        BaseExtension.prototype.isOverlayActive = function () {
            return shell.Shell.$overlays.is(':visible');
        };

        BaseExtension.prototype.viewManifest = function (manifest) {
            var seeAlsoUri = this.provider.getManifestSeeAlsoUri(manifest);
            if (seeAlsoUri) {
                window.open(seeAlsoUri, '_blank');
            } else {
                if (this.isFullScreen) {
                    $.publish(BaseExtension.TOGGLE_FULLSCREEN);
                }

                this.triggerSocket(BaseExtension.SEQUENCE_INDEX_CHANGED, manifest.assetSequence);
            }
        };
        BaseExtension.SETTINGS_CHANGED = 'onSettingsChanged';
        BaseExtension.LOAD = 'onLoad';
        BaseExtension.RESIZE = 'onResize';
        BaseExtension.TOGGLE_FULLSCREEN = 'onToggleFullScreen';
        BaseExtension.CANVAS_INDEX_CHANGED = 'onAssetIndexChanged';
        BaseExtension.CANVAS_INDEX_CHANGE_FAILED = 'onAssetIndexChangeFailed';
        BaseExtension.CLOSE_ACTIVE_DIALOGUE = 'onCloseActiveDialogue';
        BaseExtension.SEQUENCE_INDEX_CHANGED = 'onSequenceIndexChanged';
        BaseExtension.REDIRECT = 'onRedirect';
        BaseExtension.REFRESH = 'onRefresh';
        BaseExtension.RELOAD_MANIFEST = 'onReloadManifest';
        BaseExtension.ESCAPE = 'onEscape';
        BaseExtension.RETURN = 'onReturn';
        BaseExtension.PAGE_UP = 'onPageUp';
        BaseExtension.PAGE_DOWN = 'onPageDown';
        BaseExtension.HOME = 'onHome';
        BaseExtension.END = 'onEnd';
        BaseExtension.WINDOW_UNLOAD = 'onWindowUnload';
        BaseExtension.OPEN_MEDIA = 'onOpenMedia';
        BaseExtension.CREATED = 'onCreated';
        BaseExtension.SHOW_MESSAGE = 'onShowMessage';
        BaseExtension.HIDE_MESSAGE = 'onHideMessage';
        return BaseExtension;
    })();
    exports.BaseExtension = BaseExtension;
});

define('modules/uv-shared-module/treeNode',["require", "exports"], function(require, exports) {
    var TreeNode = (function () {
        function TreeNode(label, data) {
            this.label = label;
            this.data = data;
            this.nodes = [];
            if (!data)
                this.data = {};
        }
        TreeNode.prototype.addNode = function (node) {
            this.nodes.push(node);
            node.parentNode = this;
        };
        return TreeNode;
    })();

    
    return TreeNode;
});

define('modules/uv-shared-module/baseProvider',["require", "exports", "../../utils", "./treeNode", "../../bootstrapParams"], function(require, exports, utils, TreeNode, BootstrapParams) {
    var util = utils.Utils;

    (function (params) {
        params[params["sequenceIndex"] = 0] = "sequenceIndex";
        params[params["canvasIndex"] = 1] = "canvasIndex";
        params[params["zoom"] = 2] = "zoom";
        params[params["rotation"] = 3] = "rotation";
    })(exports.params || (exports.params = {}));
    var params = exports.params;

    var BaseProvider = (function () {
        function BaseProvider(bootstrapper, config, manifest) {
            this.paramMap = ['asi', 'ai', 'z', 'r'];
            this.options = {
                thumbsUriTemplate: "{0}{1}",
                timestampUris: false,
                mediaUriTemplate: "{0}{1}"
            };
            this.bootstrapper = bootstrapper;
            this.config = config;
            this.manifest = manifest;

            this.manifestUri = this.bootstrapper.params.manifestUri;
            this.jsonp = this.bootstrapper.params.jsonp;
            this.locale = this.bootstrapper.params.getLocale();
            this.isHomeDomain = this.bootstrapper.params.isHomeDomain;
            this.isReload = this.bootstrapper.params.isReload;
            this.embedDomain = this.bootstrapper.params.embedDomain;
            this.isOnlyInstance = this.bootstrapper.params.isOnlyInstance;
            this.embedScriptUri = this.bootstrapper.params.embedScriptUri;
            this.domain = this.bootstrapper.params.domain;
            this.isLightbox = this.bootstrapper.params.isLightbox;

            if (this.isHomeDomain && !this.isReload) {
                this.sequenceIndex = parseInt(util.getHashParameter(this.paramMap[0 /* sequenceIndex */], parent.document));
            }

            if (!this.sequenceIndex) {
                this.sequenceIndex = parseInt(util.getQuerystringParameter(this.paramMap[0 /* sequenceIndex */])) || 0;
            }

            this.canvasIndex = -1;

            this.load();
        }
        BaseProvider.prototype.load = function () {
            this.sequence = this.manifest.assetSequences[this.sequenceIndex];

            for (var i = 0; i < this.manifest.assetSequences.length; i++) {
                if (this.manifest.assetSequences[i].$ref) {
                    this.manifest.assetSequences[i] = {};
                }
            }

            if (this.manifest.rootStructure) {
                this.parseManifest();
            }

            this.parseStructure();
        };

        BaseProvider.prototype.reload = function (params) {
            var p = new BootstrapParams();
            p.isReload = true;

            if (params) {
                p = $.extend(p, params);
            }

            this.bootstrapper.bootStrap(p);
        };

        BaseProvider.prototype.corsEnabled = function () {
            return Modernizr.cors && !this.jsonp;
        };

        BaseProvider.prototype.reloadManifest = function (callback) {
            var _this = this;
            var manifestUri = this.manifestUri;

            if (this.options.dataBaseUri) {
                manifestUri = this.options.dataBaseUri + this.manifestUri;
            }

            manifestUri = this.addTimestamp(manifestUri);

            if (this.corsEnabled()) {
                $.getJSON(manifestUri, function (data) {
                    _this.manifest = data;

                    _this.load();

                    callback();
                });
            } else {
                window.manifestCallback = function (data) {
                    _this.manifest = data;

                    _this.load();

                    callback();
                };

                $.ajax({
                    url: manifestUri,
                    type: 'GET',
                    dataType: 'jsonp',
                    jsonp: 'callback',
                    jsonpCallback: 'manifestCallback'
                });
            }
        };

        BaseProvider.prototype.getManifestType = function () {
            return this.getRootStructure().sectionType.toLowerCase();
        };

        BaseProvider.prototype.getSequenceType = function () {
            return this.sequence.assetType.replace('/', '-');
        };

        BaseProvider.prototype.getAttribution = function () {
            return this.manifest.attribution;
        };

        BaseProvider.prototype.getLicense = function () {
            return this.manifest.license;
        };

        BaseProvider.prototype.getLogo = function () {
            return this.manifest.logo;
        };

        BaseProvider.prototype.getRootStructure = function () {
            return this.sequence.rootSection;
        };

        BaseProvider.prototype.getTitle = function () {
            return this.getRootStructure().title;
        };

        BaseProvider.prototype.getSeeAlso = function () {
            return this.sequence.seeAlso;
        };

        BaseProvider.prototype.isCanvasIndexOutOfRange = function (canvasIndex) {
            return canvasIndex > this.getTotalCanvases() - 1;
        };

        BaseProvider.prototype.isFirstCanvas = function (canvasIndex) {
            if (typeof (canvasIndex) === 'undefined')
                canvasIndex = this.canvasIndex;
            return canvasIndex == 0;
        };

        BaseProvider.prototype.isLastCanvas = function (canvasIndex) {
            if (typeof (canvasIndex) === 'undefined')
                canvasIndex = this.canvasIndex;
            return canvasIndex == this.getTotalCanvases() - 1;
        };

        BaseProvider.prototype.isSeeAlsoEnabled = function () {
            return this.config.options.seeAlsoEnabled !== false;
        };

        BaseProvider.prototype.getCanvasByIndex = function (index) {
            return this.sequence.assets[index];
        };

        BaseProvider.prototype.getCanvasIndexById = function (id) {
            return null;
        };

        BaseProvider.prototype.getCurrentCanvas = function () {
            return this.sequence.assets[this.canvasIndex];
        };

        BaseProvider.prototype.getTotalCanvases = function () {
            return this.sequence.assets.length;
        };

        BaseProvider.prototype.isMultiCanvas = function () {
            return this.sequence.assets.length > 1;
        };

        BaseProvider.prototype.isMultiSequence = function () {
            return this.manifest.assetSequences.length > 1;
        };

        BaseProvider.prototype.isPaged = function () {
            return false;
        };

        BaseProvider.prototype.getMediaUri = function (mediaUri) {
            var baseUri = this.options.mediaBaseUri || "";
            var template = this.options.mediaUriTemplate;
            var uri = String.prototype.format(template, baseUri, mediaUri);

            return uri;
        };

        BaseProvider.prototype.setMediaUri = function (canvas) {
            if (canvas.mediaUri) {
                canvas.mediaUri = this.getMediaUri(canvas.mediaUri);
            } else {
                canvas.mediaUri = this.getMediaUri(canvas.fileUri);
            }
        };

        BaseProvider.prototype.getThumbUri = function (canvas, width, height) {
            return null;
        };

        BaseProvider.prototype.getPagedIndices = function (canvasIndex) {
            if (typeof (canvasIndex) === 'undefined')
                canvasIndex = this.canvasIndex;

            if (this.isFirstCanvas() || this.isLastCanvas()) {
                return [canvasIndex];
            } else if (canvasIndex % 2) {
                return [canvasIndex, canvasIndex + 1];
            } else {
                return [canvasIndex - 1, canvasIndex];
            }
        };

        BaseProvider.prototype.getViewingDirection = function () {
            return this.sequence.viewingDirection || "left-to-right";
        };

        BaseProvider.prototype.getFirstPageIndex = function () {
            return 0;
        };

        BaseProvider.prototype.getLastPageIndex = function () {
            return this.getTotalCanvases() - 1;
        };

        BaseProvider.prototype.getPrevPageIndex = function (canvasIndex) {
            if (typeof (canvasIndex) === 'undefined')
                canvasIndex = this.canvasIndex;

            var index;

            if (this.isPaged()) {
                var indices = this.getPagedIndices(canvasIndex);
                index = indices[0] - 1;
            } else {
                index = canvasIndex - 1;
            }

            return index;
        };

        BaseProvider.prototype.getNextPageIndex = function (canvasIndex) {
            if (typeof (canvasIndex) === 'undefined')
                canvasIndex = this.canvasIndex;

            var index;

            if (this.isPaged()) {
                var indices = this.getPagedIndices(canvasIndex);
                index = indices.last() + 1;
            } else {
                index = canvasIndex + 1;
            }

            if (index > this.getTotalCanvases() - 1) {
                return -1;
            }

            return index;
        };

        BaseProvider.prototype.getStartCanvasIndex = function () {
            return 0;
        };

        BaseProvider.prototype.parseManifest = function () {
            this.parseManifestation(this.manifest.rootStructure, this.manifest.assetSequences, '');
        };

        BaseProvider.prototype.parseManifestation = function (structure, sequences, path) {
            structure.path = path;

            if (typeof (structure.assetSequence) != 'undefined') {
                var sequence = sequences[structure.assetSequence];

                sequence.index = structure.sequence;
                sequence.structure = structure;
                structure.sequence = sequence;
            }

            if (structure.structures) {
                for (var j = 0; j < structure.structures.length; j++) {
                    this.parseManifestation(structure.structures[j], sequences, path + '/' + j);
                }
            }
        };

        BaseProvider.prototype.parseStructure = function () {
            this.parseStructures(this.getRootStructure(), this.sequence.assets, '');
        };

        BaseProvider.prototype.parseStructures = function (structure, canvases, path) {
            structure.path = path;

            structure.sectionType = this.replaceStructureType(structure.sectionType);

            for (var i = 0; i < structure.assets.length; i++) {
                var index = structure.assets[i];

                var canvas = canvases[index];

                if (!canvas.structures)
                    canvas.structures = [];

                canvas.structures.push(structure);
            }

            if (structure.sections) {
                for (var j = 0; j < structure.sections.length; j++) {
                    this.parseStructures(structure.sections[j], canvases, path + '/' + j);
                }
            }
        };

        BaseProvider.prototype.replaceStructureType = function (structureType) {
            if (this.config.options.sectionMappings && this.config.options.sectionMappings[structureType]) {
                return this.config.options.sectionMappings[structureType];
            }

            return structureType;
        };

        BaseProvider.prototype.getStructureByCanvasIndex = function (index) {
            if (index == -1)
                return null;
            var canvas = this.getCanvasByIndex(index);
            return this.getCanvasStructure(canvas);
        };

        BaseProvider.prototype.getStructureByIndex = function (structure, index) {
            return structure.sections[index];
        };

        BaseProvider.prototype.getStructureByPath = function (path) {
            return null;
        };

        BaseProvider.prototype.getCanvasStructure = function (canvas) {
            return canvas.structures.last();
        };

        BaseProvider.prototype.getLastCanvasOrderLabel = function () {
            for (var i = this.sequence.assets.length - 1; i >= 0; i--) {
                var canvas = this.sequence.assets[i];

                var regExp = /\d/;

                if (regExp.test(canvas.orderLabel)) {
                    return canvas.orderLabel;
                }
            }

            return '-';
        };

        BaseProvider.prototype.getStructureIndex = function (path) {
            for (var i = 0; i < this.sequence.assets.length; i++) {
                var canvas = this.sequence.assets[i];
                for (var j = 0; j < canvas.structures.length; j++) {
                    var structure = canvas.structures[j];

                    if (structure.path == path) {
                        return i;
                    }
                }
            }

            return null;
        };

        BaseProvider.prototype.getCanvasIndexByLabel = function (label) {
            var regExp = /(\d*)\D*(\d*)|(\d*)/;
            var match = regExp.exec(label);

            var labelPart1 = match[1];
            var labelPart2 = match[2];

            if (!labelPart1)
                return -1;

            var searchRegExp, regStr;

            if (labelPart2) {
                regStr = "^" + labelPart1 + "\\D*" + labelPart2 + "$";
            } else {
                regStr = "\\D*" + labelPart1 + "\\D*";
            }

            searchRegExp = new RegExp(regStr);

            for (var i = 0; i < this.sequence.assets.length; i++) {
                var canvas = this.sequence.assets[i];

                if (searchRegExp.test(canvas.orderLabel)) {
                    return i;
                }
            }

            return -1;
        };

        BaseProvider.prototype.getManifestSeeAlsoUri = function (manifest) {
            if (manifest.seeAlso && manifest.seeAlso.tag && manifest.seeAlso.data) {
                if (manifest.seeAlso.tag === 'OpenExternal') {
                    return this.getMediaUri(manifest.seeAlso.data);
                }
            }
        };

        BaseProvider.prototype.addTimestamp = function (uri) {
            return uri + "?t=" + util.getTimeStamp();
        };

        BaseProvider.prototype.isDeepLinkingEnabled = function () {
            return (this.isHomeDomain && this.isOnlyInstance);
        };

        BaseProvider.prototype.getTree = function () {
            this.treeRoot = new TreeNode('root');
            var rootStructure = this.manifest.rootStructure;

            if (rootStructure) {
                this.parseTreeStructure(this.treeRoot, rootStructure);
            }

            if (!this.sectionsRootNode) {
                this.sectionsRootNode = this.treeRoot;
                this.sectionsRootNode.data = this.sequence.rootSection;
            }

            if (this.sequence.rootSection.sections) {
                for (var i = 0; i < this.sequence.rootSection.sections.length; i++) {
                    var section = this.sequence.rootSection.sections[i];

                    var childNode = new TreeNode();
                    this.sectionsRootNode.addNode(childNode);

                    this.parseTreeSection(childNode, section);
                }
            }

            return this.treeRoot;
        };

        BaseProvider.prototype.parseTreeStructure = function (node, structure) {
            node.label = structure.name || "root";
            node.data = structure;
            node.data.type = "manifest";
            node.data.treeNode = node;

            if (this.sequence.structure == structure) {
                this.sectionsRootNode = node;
                this.sectionsRootNode.selected = true;
                this.sectionsRootNode.expanded = true;
            }

            if (structure.structures) {
                for (var i = 0; i < structure.structures.length; i++) {
                    var childStructure = structure.structures[i];

                    var childNode = new TreeNode();
                    node.addNode(childNode);

                    this.parseTreeStructure(childNode, childStructure);
                }
            }
        };

        BaseProvider.prototype.parseTreeSection = function (node, section) {
            node.label = section.sectionType;
            node.data = section;
            node.data.type = "structure";
            node.data.treeNode = node;

            if (section.sections) {
                for (var i = 0; i < section.sections.length; i++) {
                    var childSection = section.sections[i];

                    var childNode = new TreeNode();
                    node.addNode(childNode);

                    this.parseTreeSection(childNode, childSection);
                }
            }
        };

        BaseProvider.prototype.getThumbs = function (width, height) {
            return null;
        };

        BaseProvider.prototype.getDomain = function () {
            var parts = util.getUrlParts(this.manifestUri);
            return parts.host;
        };

        BaseProvider.prototype.getEmbedDomain = function () {
            return this.embedDomain;
        };

        BaseProvider.prototype.getMetaData = function (callback) {
            callback(null);
        };

        BaseProvider.prototype.defaultToThumbsView = function () {
            var manifestType = this.getManifestType();

            switch (manifestType) {
                case 'monograph':
                    if (!this.isMultiSequence())
                        return true;
                    break;
                case 'archive':
                    return true;
                    break;
                case 'boundmanuscript':
                    return true;
                    break;
                case 'artwork':
                    return true;
            }

            var sequenceType = this.getSequenceType();

            switch (sequenceType) {
                case 'application-pdf':
                    return true;
                    break;
            }

            return false;
        };

        BaseProvider.prototype.getSettings = function () {
            return this.config.options;
        };

        BaseProvider.prototype.updateSettings = function (settings) {
            this.config.options = settings;
        };

        BaseProvider.prototype.sanitize = function (html) {
            var elem = document.createDocumentFragment();
            var $elem = $(elem);

            $elem.html(html);

            var s = new Sanitize({
                elements: ['a', 'b', 'br', 'img', 'p', 'i', 'span'],
                attributes: {
                    a: ['href'],
                    img: ['src', 'alt']
                },
                protocols: {
                    a: { href: ['http', 'https'] }
                }
            });

            $elem.html(s.clean_node(elem));

            return $elem.contents().html();
        };

        BaseProvider.prototype.getLocales = function () {
            if (this.locales)
                return this.locales;

            var items = this.config.localisation.locales.clone();
            var sorting = this.bootstrapper.params.locales;
            var result = [];

            _.each(sorting, function (sortItem) {
                var match = _.filter(items, function (item) {
                    return item.name === sortItem.name;
                });
                if (match.length) {
                    var m = match[0];
                    if (sortItem.label)
                        m.label = sortItem.label;
                    m.added = true;
                    result.push(m);
                }
            });

            _.each(items, function (item) {
                if (!item.added) {
                    result.push(item);
                }
                delete item.added;
            });

            return this.locales = result;
        };

        BaseProvider.prototype.getAlternateLocale = function () {
            var locales = this.getLocales();

            var alternateLocale;

            for (var i = 0; i < locales.length; i++) {
                var l = locales[i];
                if (l.name !== this.locale) {
                    alternateLocale = l;
                }
            }

            return l;
        };

        BaseProvider.prototype.changeLocale = function (locale) {
            var locales = this.locales.clone();

            var index = locales.indexOfTest(function (l) {
                return l.name === locale;
            });

            locales.move(index, 0);

            var str = this.serializeLocales(locales);

            var p = new BootstrapParams();
            p.setLocale(str);
            this.reload(p);
        };

        BaseProvider.prototype.serializeLocales = function (locales) {
            var str = '';

            for (var i = 0; i < locales.length; i++) {
                var l = locales[i];
                if (i > 0)
                    str += ',';
                str += l.name;
                if (l.label) {
                    str += ':' + l.label;
                }
            }

            return str;
        };

        BaseProvider.prototype.getSerializedLocales = function () {
            return this.serializeLocales(this.locales);
        };

        BaseProvider.prototype.getLabel = function (resource) {
            return null;
        };

        BaseProvider.prototype.getLocalisedValue = function (values) {
            return null;
        };
        return BaseProvider;
    })();
    exports.BaseProvider = BaseProvider;
});

define('_Version',["require", "exports"], function(require, exports) {
    exports.Version = '1.0.46';
});

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define('modules/uv-dialogues-module/settingsDialogue',["require", "exports", "../uv-shared-module/dialogue", "../../_Version"], function(require, exports, dialogue, version) {
    var SettingsDialogue = (function (_super) {
        __extends(SettingsDialogue, _super);
        function SettingsDialogue($element) {
            _super.call(this, $element);
        }
        SettingsDialogue.prototype.create = function () {
            var _this = this;
            this.setConfig('settingsDialogue');

            _super.prototype.create.call(this);

            $.subscribe(SettingsDialogue.SHOW_SETTINGS_DIALOGUE, function (e, params) {
                _this.open();
            });

            $.subscribe(SettingsDialogue.HIDE_SETTINGS_DIALOGUE, function (e) {
                _this.close();
            });

            this.$title = $('<h1></h1>');
            this.$content.append(this.$title);

            this.$scroll = $('<div class="scroll"></div>');
            this.$content.append(this.$scroll);

            this.$version = $('<div class="version"></div>');
            this.$content.append(this.$version);

            this.$locale = $('<div class="setting locale"></div>');
            this.$scroll.append(this.$locale);

            this.$localeLabel = $('<label for="locale">' + this.content.locale + '</label>');
            this.$locale.append(this.$localeLabel);

            this.$localeDropDown = $('<select id="locale"></select>');
            this.$locale.append(this.$localeDropDown);

            this.$title.text(this.content.title);

            this.$version.text("v" + version.Version);

            var locales = this.provider.getLocales();

            for (var i = 0; i < locales.length; i++) {
                var locale = locales[i];
                this.$localeDropDown.append('<option value="' + locale.name + '">' + locale.label + '</option>');
            }

            this.$localeDropDown.val(this.provider.locale);

            this.$localeDropDown.change(function () {
                _this.provider.changeLocale(_this.$localeDropDown.val());
            });

            if (this.provider.getLocales().length < 2) {
                this.$locale.hide();
            }

            this.$element.hide();
        };

        SettingsDialogue.prototype.getSettings = function () {
            return this.provider.getSettings();
        };

        SettingsDialogue.prototype.updateSettings = function (settings) {
            this.provider.updateSettings(settings);

            $.publish(SettingsDialogue.UPDATE_SETTINGS, [settings]);
        };

        SettingsDialogue.prototype.open = function () {
            _super.prototype.open.call(this);
        };

        SettingsDialogue.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        SettingsDialogue.SHOW_SETTINGS_DIALOGUE = 'onShowSettingsDialogue';
        SettingsDialogue.HIDE_SETTINGS_DIALOGUE = 'onHideSettingsDialogue';
        SettingsDialogue.UPDATE_SETTINGS = 'onUpdateSettings';
        return SettingsDialogue;
    })(dialogue.Dialogue);
    exports.SettingsDialogue = SettingsDialogue;
});

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define('modules/uv-shared-module/headerPanel',["require", "exports", "./baseExtension", "./baseView", "../uv-dialogues-module/settingsDialogue"], function(require, exports, baseExtension, baseView, settings) {
    var HeaderPanel = (function (_super) {
        __extends(HeaderPanel, _super);
        function HeaderPanel($element) {
            _super.call(this, $element, false, false);
        }
        HeaderPanel.prototype.create = function () {
            var _this = this;
            this.setConfig('headerPanel');

            _super.prototype.create.call(this);

            $.subscribe(baseExtension.BaseExtension.SETTINGS_CHANGED, function (e, message) {
                _this.updatePagingToggle();
            });

            $.subscribe(baseExtension.BaseExtension.SHOW_MESSAGE, function (e, message) {
                _this.showMessage(message);
            });

            $.subscribe(baseExtension.BaseExtension.HIDE_MESSAGE, function () {
                _this.hideMessage();
            });

            this.$options = $('<div class="options"></div>');
            this.$element.append(this.$options);

            this.$centerOptions = $('<div class="centerOptions"></div>');
            this.$options.append(this.$centerOptions);

            this.$rightOptions = $('<div class="rightOptions"></div>');
            this.$options.append(this.$rightOptions);

            this.$pagingToggleButton = $('<a class="imageBtn pagingToggle"></a>');
            this.$rightOptions.append(this.$pagingToggleButton);

            this.$localeToggleButton = $('<a class="localeToggle"></a>');
            this.$rightOptions.append(this.$localeToggleButton);

            this.$settingsButton = $('<a class="imageBtn settings" tabindex="3"></a>');
            this.$settingsButton.attr('title', this.content.settings);
            this.$rightOptions.append(this.$settingsButton);

            this.$messageBox = $('<div class="messageBox"> \
                                <div class="text"></div> \
                                <div class="close"></div> \
                              </div>');

            this.$element.append(this.$messageBox);

            this.$messageBox.hide();
            this.$messageBox.find('.close').attr('title', this.content.close);
            this.$messageBox.find('.close').on('click', function (e) {
                e.preventDefault();
                _this.hideMessage();
            });

            this.updatePagingToggle();

            this.updateLocaleToggle();

            this.$pagingToggleButton.on('click', function () {
                var settings = _this.getSettings();
                settings.pagingEnabled = !settings.pagingEnabled;
                _this.updateSettings(settings);
            });

            this.$localeToggleButton.on('click', function () {
                _this.provider.changeLocale(_this.$localeToggleButton.data('locale'));
            });

            this.$settingsButton.onPressed(function () {
                $.publish(settings.SettingsDialogue.SHOW_SETTINGS_DIALOGUE);
            });

            if (this.options.localeToggleEnabled === false) {
                this.$localeToggleButton.hide();
            }

            if (this.options.pagingToggleEnabled === false) {
                this.$pagingToggleButton.hide();
            }
        };

        HeaderPanel.prototype.updatePagingToggle = function () {
            var settings = this.provider.getSettings();

            if (settings.pagingEnabled) {
                this.$pagingToggleButton.removeClass('two-up');
                this.$pagingToggleButton.addClass('one-up');
                this.$pagingToggleButton.prop('title', this.content.oneUp);
            } else {
                this.$pagingToggleButton.removeClass('one-up');
                this.$pagingToggleButton.addClass('two-up');
                this.$pagingToggleButton.prop('title', this.content.twoUp);
            }
        };

        HeaderPanel.prototype.updateLocaleToggle = function () {
            if (!this.localeToggleIsVisible()) {
                this.$localeToggleButton.hide();
                return;
            }

            var alternateLocale = this.provider.getAlternateLocale();
            var text = alternateLocale.name.split('-')[0].toUpperCase();

            this.$localeToggleButton.data('locale', alternateLocale.name);
            this.$localeToggleButton.attr('title', alternateLocale.label);
            this.$localeToggleButton.text(text);
        };

        HeaderPanel.prototype.localeToggleIsVisible = function () {
            return this.provider.getLocales().length > 1 && this.options.localeToggleEnabled;
        };

        HeaderPanel.prototype.pagingToggleIsVisible = function () {
            return this.options.pagingToggleEnabled;
        };

        HeaderPanel.prototype.showMessage = function (message) {
            this.message = message;
            this.$messageBox.find('.text').html(message).find('a').attr('target', '_top');
            this.$messageBox.show();
            this.$element.addClass('showMessage');
            this.extension.resize();
        };

        HeaderPanel.prototype.hideMessage = function () {
            this.$element.removeClass('showMessage');
            this.$messageBox.hide();
            this.extension.resize();
        };

        HeaderPanel.prototype.getSettings = function () {
            return this.provider.getSettings();
        };

        HeaderPanel.prototype.updateSettings = function (settings) {
            this.provider.updateSettings(settings);

            $.publish(HeaderPanel.UPDATE_SETTINGS, [settings]);
        };

        HeaderPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);

            var headerWidth = this.$element.width();
            var center = headerWidth / 2;
            var containerWidth = this.$centerOptions.outerWidth();
            var pos = center - (containerWidth / 2);

            this.$centerOptions.css({
                left: pos
            });

            if (this.$messageBox.is(':visible')) {
                var $text = this.$messageBox.find('.text');

                $text.width(this.$element.width() - this.$messageBox.find('.close').outerWidth(true));
                $text.ellipsisFill(this.message);
            }

            if (this.extension.width() < 610) {
                if (this.pagingToggleIsVisible())
                    this.$pagingToggleButton.hide();
                if (this.localeToggleIsVisible())
                    this.$localeToggleButton.hide();
            } else {
                if (this.pagingToggleIsVisible())
                    this.$pagingToggleButton.show();
                if (this.localeToggleIsVisible())
                    this.$localeToggleButton.show();
            }
        };
        HeaderPanel.UPDATE_SETTINGS = 'header.onUpdateSettings';
        return HeaderPanel;
    })(baseView.BaseView);
    exports.HeaderPanel = HeaderPanel;
});

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define('modules/uv-pagingheaderpanel-module/pagingHeaderPanel',["require", "exports", "../uv-shared-module/baseExtension", "../../extensions/uv-seadragon-extension/extension", "../uv-shared-module/headerPanel"], function(require, exports, baseExtension, extension, baseHeader) {
    var PagingHeaderPanel = (function (_super) {
        __extends(PagingHeaderPanel, _super);
        function PagingHeaderPanel($element) {
            _super.call(this, $element);
            this.firstButtonEnabled = false;
            this.lastButtonEnabled = false;
            this.prevButtonEnabled = false;
            this.nextButtonEnabled = false;
        }
        PagingHeaderPanel.prototype.create = function () {
            var _this = this;
            this.setConfig('pagingHeaderPanel');

            _super.prototype.create.call(this);

            $.subscribe(baseExtension.BaseExtension.CANVAS_INDEX_CHANGED, function (e, canvasIndex) {
                _this.canvasIndexChanged(canvasIndex);
            });

            $.subscribe(extension.Extension.SETTINGS_CHANGED, function (e, mode) {
                _this.modeChanged(mode);
            });

            $.subscribe(baseExtension.BaseExtension.CANVAS_INDEX_CHANGE_FAILED, function (e) {
                _this.setSearchFieldValue(_this.provider.canvasIndex);
            });

            this.$prevOptions = $('<div class="prevOptions"></div>');
            this.$centerOptions.append(this.$prevOptions);

            this.$firstButton = $('<a class="imageBtn first" tabindex="15"></a>');
            this.$prevOptions.append(this.$firstButton);

            this.$prevButton = $('<a class="imageBtn prev" tabindex="16"></a>');
            this.$prevOptions.append(this.$prevButton);

            this.$modeOptions = $('<div class="mode"></div>');
            this.$centerOptions.append(this.$modeOptions);

            this.$imageModeLabel = $('<label for="image">' + this.content.image + '</label>');
            this.$modeOptions.append(this.$imageModeLabel);
            this.$imageModeOption = $('<input type="radio" id="image" name="mode" tabindex="17"></input>');
            this.$modeOptions.append(this.$imageModeOption);

            this.$pageModeLabel = $('<label for="page">' + this.content.page + '</label>');
            this.$modeOptions.append(this.$pageModeLabel);
            this.$pageModeOption = $('<input type="radio" id="page" name="mode" tabindex="18"></input>');
            this.$modeOptions.append(this.$pageModeOption);

            this.$search = $('<div class="search"></div>');
            this.$centerOptions.append(this.$search);

            this.$searchText = $('<input class="searchText" maxlength="50" type="text" tabindex="19"></input>');
            this.$search.append(this.$searchText);

            this.$total = $('<span class="total"></span>');
            this.$search.append(this.$total);

            this.$searchButton = $('<a class="go btn btn-primary" tabindex="20">' + this.content.go + '</a>');
            this.$search.append(this.$searchButton);

            this.$nextOptions = $('<div class="nextOptions"></div>');
            this.$centerOptions.append(this.$nextOptions);

            this.$nextButton = $('<a class="imageBtn next" tabindex="1"></a>');
            this.$nextOptions.append(this.$nextButton);

            this.$lastButton = $('<a class="imageBtn last" tabindex="2"></a>');
            this.$nextOptions.append(this.$lastButton);

            if (this.extension.getMode() == extension.Extension.PAGE_MODE) {
                this.$pageModeOption.attr('checked', 'checked');
                this.$pageModeOption.removeAttr('disabled');
                this.$pageModeLabel.removeClass('disabled');
            } else {
                this.$imageModeOption.attr('checked', 'checked');

                this.$pageModeOption.attr('disabled', 'disabled');
                this.$pageModeLabel.addClass('disabled');
            }

            this.setTitles();

            this.setTotal();

            if (this.provider.getTotalCanvases() == 1) {
                this.$centerOptions.hide();
            }

            this.$firstButton.onPressed(function () {
                $.publish(PagingHeaderPanel.FIRST);
            });

            this.$prevButton.onPressed(function () {
                $.publish(PagingHeaderPanel.PREV);
            });

            this.$nextButton.onPressed(function () {
                $.publish(PagingHeaderPanel.NEXT);
            });

            this.$imageModeOption.on('click', function (e) {
                $.publish(PagingHeaderPanel.MODE_CHANGED, [extension.Extension.IMAGE_MODE]);
            });

            this.$pageModeOption.on('click', function (e) {
                $.publish(PagingHeaderPanel.MODE_CHANGED, [extension.Extension.PAGE_MODE]);
            });

            this.$searchText.onEnter(function () {
                _this.$searchText.blur();
                _this.search();
            });

            this.$searchText.focus(function () {
                $(this).select();
            });

            this.$searchButton.onPressed(function () {
                _this.search();
            });

            this.$lastButton.onPressed(function () {
                $.publish(PagingHeaderPanel.LAST);
            });

            if (this.options.modeOptionsEnabled === false) {
                this.$modeOptions.hide();
                this.$centerOptions.addClass('modeOptionsDisabled');
            }

            if (this.options.helpEnabled === false) {
                this.$helpButton.hide();
            }

            this.$searchButton.blur(function () {
                if (_this.extension.tabbing && !_this.extension.shifted) {
                    _this.$nextButton.focus();
                }
            });
        };

        PagingHeaderPanel.prototype.setTitles = function () {
            var mode;

            if (this.extension.getMode() === extension.Extension.PAGE_MODE) {
                mode = this.content.page;
            } else {
                mode = this.content.image;
            }

            this.$firstButton.prop('title', this.content.first + " " + mode);
            this.$prevButton.prop('title', this.content.previous + " " + mode);
            this.$nextButton.prop('title', this.content.next + " " + mode);
            this.$lastButton.prop('title', this.content.last + " " + mode);
            this.$searchButton.prop('title', this.content.go);
        };

        PagingHeaderPanel.prototype.setTotal = function () {
            var of = this.content.of;

            if (this.extension.getMode() === extension.Extension.PAGE_MODE) {
                this.$total.html(String.prototype.format(of, this.provider.getLastCanvasLabel()));
            } else {
                this.$total.html(String.prototype.format(of, this.provider.getTotalCanvases()));
            }
        };

        PagingHeaderPanel.prototype.setSearchFieldValue = function (index) {
            var canvas = this.provider.getCanvasByIndex(index);

            if (this.extension.getMode() === extension.Extension.PAGE_MODE) {
                var orderLabel = this.provider.getLocalisedValue(canvas.label);

                if (orderLabel === "-") {
                    this.$searchText.val("");
                } else {
                    this.$searchText.val(orderLabel);
                }
            } else {
                index += 1;
                this.$searchText.val(index);
            }
        };

        PagingHeaderPanel.prototype.search = function () {
            var value = this.$searchText.val();

            if (!value) {
                this.extension.showDialogue(this.content.emptyValue);
                $.publish(baseExtension.BaseExtension.CANVAS_INDEX_CHANGE_FAILED);

                return;
            }

            if (this.extension.getMode() === extension.Extension.PAGE_MODE) {
                $.publish(PagingHeaderPanel.PAGE_SEARCH, [value]);
            } else {
                var index = parseInt(this.$searchText.val(), 10);

                index -= 1;

                if (isNaN(index)) {
                    this.extension.showDialogue(this.provider.config.modules.genericDialogue.content.invalidNumber);
                    $.publish(baseExtension.BaseExtension.CANVAS_INDEX_CHANGE_FAILED);
                    return;
                }

                var asset = this.provider.getCanvasByIndex(index);

                if (!asset) {
                    this.extension.showDialogue(this.provider.config.modules.genericDialogue.content.pageNotFound);
                    $.publish(baseExtension.BaseExtension.CANVAS_INDEX_CHANGE_FAILED);
                    return;
                }

                $.publish(PagingHeaderPanel.IMAGE_SEARCH, [index]);
            }
        };

        PagingHeaderPanel.prototype.canvasIndexChanged = function (index) {
            this.setSearchFieldValue(index);

            if (this.provider.isFirstCanvas()) {
                this.disableFirstButton();
                this.disablePrevButton();
            } else {
                this.enableFirstButton();
                this.enablePrevButton();
            }

            if (this.provider.isLastCanvas()) {
                this.disableLastButton();
                this.disableNextButton();
            } else {
                this.enableLastButton();
                this.enableNextButton();
            }
        };

        PagingHeaderPanel.prototype.disableFirstButton = function () {
            this.firstButtonEnabled = false;
            this.$firstButton.disable();
        };

        PagingHeaderPanel.prototype.enableFirstButton = function () {
            this.firstButtonEnabled = true;
            this.$firstButton.enable();
        };

        PagingHeaderPanel.prototype.disableLastButton = function () {
            this.lastButtonEnabled = false;
            this.$lastButton.disable();
        };

        PagingHeaderPanel.prototype.enableLastButton = function () {
            this.lastButtonEnabled = true;
            this.$lastButton.enable();
        };

        PagingHeaderPanel.prototype.disablePrevButton = function () {
            this.prevButtonEnabled = false;
            this.$prevButton.disable();
        };

        PagingHeaderPanel.prototype.enablePrevButton = function () {
            this.prevButtonEnabled = true;
            this.$prevButton.enable();
        };

        PagingHeaderPanel.prototype.disableNextButton = function () {
            this.nextButtonEnabled = false;
            this.$nextButton.disable();
        };

        PagingHeaderPanel.prototype.enableNextButton = function () {
            this.nextButtonEnabled = true;
            this.$nextButton.enable();
        };

        PagingHeaderPanel.prototype.modeChanged = function (mode) {
            this.setSearchFieldValue(this.provider.canvasIndex);
            this.setTitles();
            this.setTotal();
        };

        PagingHeaderPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        PagingHeaderPanel.FIRST = 'header.onFirst';
        PagingHeaderPanel.LAST = 'header.onLast';
        PagingHeaderPanel.PREV = 'header.onPrev';
        PagingHeaderPanel.NEXT = 'header.onNext';
        PagingHeaderPanel.PAGE_SEARCH = 'header.onPageSearch';
        PagingHeaderPanel.IMAGE_SEARCH = 'header.onImageSearch';
        PagingHeaderPanel.MODE_CHANGED = 'header.onModeChanged';
        return PagingHeaderPanel;
    })(baseHeader.HeaderPanel);
    exports.PagingHeaderPanel = PagingHeaderPanel;
});

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define('modules/uv-shared-module/baseExpandPanel',["require", "exports", "./baseView"], function(require, exports, baseView) {
    var BaseExpandPanel = (function (_super) {
        __extends(BaseExpandPanel, _super);
        function BaseExpandPanel($element) {
            _super.call(this, $element, false, true);
            this.isExpanded = false;
            this.isFullyExpanded = false;
            this.isUnopened = true;
            this.autoToggled = false;
        }
        BaseExpandPanel.prototype.create = function () {
            var _this = this;
            _super.prototype.create.call(this);

            this.$top = $('<div class="top"></div>');
            this.$element.append(this.$top);

            this.$title = $('<div class="title"></div>');
            this.$title.prop('title', this.content.title);
            this.$top.append(this.$title);

            this.$expandFullButton = $('<a class="expandFullButton"></a>');
            this.$expandFullButton.prop('title', this.content.expandFull);
            this.$top.append(this.$expandFullButton);

            this.$collapseButton = $('<div class="collapseButton"></div>');
            this.$collapseButton.prop('title', this.content.collapse);
            this.$top.append(this.$collapseButton);

            this.$closed = $('<div class="closed"></div>');
            this.$element.append(this.$closed);

            this.$expandButton = $('<a class="expandButton"></a>');
            this.$expandButton.prop('title', this.content.expand);
            this.$closed.append(this.$expandButton);

            this.$closedTitle = $('<a class="title"></a>');
            this.$closedTitle.prop('title', this.content.title);
            this.$closed.append(this.$closedTitle);

            this.$main = $('<div class="main"></div>');
            this.$element.append(this.$main);

            this.$expandButton.onPressed(function () {
                _this.toggle();
            });

            this.$expandFullButton.onPressed(function () {
                _this.expandFull();
            });

            this.$closedTitle.onPressed(function () {
                _this.toggle();
            });

            this.$title.onPressed(function () {
                if (_this.isFullyExpanded) {
                    _this.collapseFull();
                } else {
                    _this.toggle();
                }
            });

            this.$collapseButton.onPressed(function () {
                if (_this.isFullyExpanded) {
                    _this.collapseFull();
                } else {
                    _this.toggle();
                }
            });

            this.$top.hide();
            this.$main.hide();
        };

        BaseExpandPanel.prototype.init = function () {
            _super.prototype.init.call(this);
        };

        BaseExpandPanel.prototype.toggle = function (autoToggled) {
            var _this = this;
            (autoToggled) ? this.autoToggled = true : this.autoToggled = false;

            if (this.isExpanded) {
                this.$top.hide();
                this.$main.hide();
                this.$closed.show();
            }

            this.$element.stop().animate({
                width: this.getTargetWidth(),
                left: this.getTargetLeft()
            }, this.options.panelAnimationDuration, function () {
                _this.toggled();
            });
        };

        BaseExpandPanel.prototype.toggled = function () {
            this.toggleStart();

            this.isExpanded = !this.isExpanded;

            if (this.isExpanded) {
                this.$closed.hide();
                this.$top.show();
                this.$main.show();
            }

            this.toggleFinish();

            this.isUnopened = false;
        };

        BaseExpandPanel.prototype.expandFull = function () {
            var _this = this;
            var targetWidth = this.getFullTargetWidth();
            var targetLeft = this.getFullTargetLeft();

            this.expandFullStart();

            this.$element.stop().animate({
                width: targetWidth,
                left: targetLeft
            }, this.options.panelAnimationDuration, function () {
                _this.expandFullFinish();
            });
        };

        BaseExpandPanel.prototype.collapseFull = function () {
            var _this = this;
            var targetWidth = this.getTargetWidth();
            var targetLeft = this.getTargetLeft();

            this.collapseFullStart();

            this.$element.stop().animate({
                width: targetWidth,
                left: targetLeft
            }, this.options.panelAnimationDuration, function () {
                _this.collapseFullFinish();
            });
        };

        BaseExpandPanel.prototype.getTargetWidth = function () {
            return 0;
        };

        BaseExpandPanel.prototype.getTargetLeft = function () {
            return 0;
        };

        BaseExpandPanel.prototype.getFullTargetWidth = function () {
            return 0;
        };

        BaseExpandPanel.prototype.getFullTargetLeft = function () {
            return 0;
        };

        BaseExpandPanel.prototype.toggleStart = function () {
        };

        BaseExpandPanel.prototype.toggleFinish = function () {
            if (this.isExpanded && !this.autoToggled) {
                this.focusCollapseButton();
            } else {
                this.focusExpandButton();
            }
        };

        BaseExpandPanel.prototype.expandFullStart = function () {
        };

        BaseExpandPanel.prototype.expandFullFinish = function () {
            this.isFullyExpanded = true;
            this.$expandFullButton.hide();

            this.focusCollapseButton();
        };

        BaseExpandPanel.prototype.collapseFullStart = function () {
        };

        BaseExpandPanel.prototype.collapseFullFinish = function () {
            this.isFullyExpanded = false;
            this.$expandFullButton.show();

            this.focusExpandFullButton();
        };

        BaseExpandPanel.prototype.focusExpandButton = function () {
            var _this = this;
            setTimeout(function () {
                _this.$expandButton.focus();
            }, 1);
        };

        BaseExpandPanel.prototype.focusExpandFullButton = function () {
            var _this = this;
            setTimeout(function () {
                _this.$expandFullButton.focus();
            }, 1);
        };

        BaseExpandPanel.prototype.focusCollapseButton = function () {
            var _this = this;
            setTimeout(function () {
                _this.$collapseButton.focus();
            }, 1);
        };

        BaseExpandPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);

            this.$main.height(this.$element.parent().height() - this.$top.outerHeight(true));
        };
        return BaseExpandPanel;
    })(baseView.BaseView);
    exports.BaseExpandPanel = BaseExpandPanel;
});

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define('modules/uv-shared-module/leftPanel',["require", "exports", "./baseExpandPanel"], function(require, exports, baseExpandPanel) {
    var LeftPanel = (function (_super) {
        __extends(LeftPanel, _super);
        function LeftPanel($element) {
            _super.call(this, $element);
        }
        LeftPanel.prototype.create = function () {
            _super.prototype.create.call(this);

            this.$element.width(this.options.panelCollapsedWidth);
        };

        LeftPanel.prototype.init = function () {
            _super.prototype.init.call(this);

            if (this.options.panelOpen && this.provider.isHomeDomain) {
                this.toggle(true);
            }
        };

        LeftPanel.prototype.getTargetWidth = function () {
            if (this.isFullyExpanded || !this.isExpanded) {
                return this.options.panelExpandedWidth;
            } else {
                return this.options.panelCollapsedWidth;
            }
        };

        LeftPanel.prototype.getFullTargetWidth = function () {
            return this.$element.parent().width();
        };

        LeftPanel.prototype.toggleFinish = function () {
            _super.prototype.toggleFinish.call(this);

            if (this.isExpanded) {
                $.publish(LeftPanel.OPEN_LEFT_PANEL);
            } else {
                $.publish(LeftPanel.CLOSE_LEFT_PANEL);
            }
        };

        LeftPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);

            if (this.isFullyExpanded) {
                this.$element.width(this.$element.parent().width());
            }
        };
        LeftPanel.OPEN_LEFT_PANEL = 'onOpenLeftPanel';
        LeftPanel.CLOSE_LEFT_PANEL = 'onCloseLeftPanel';
        return LeftPanel;
    })(baseExpandPanel.BaseExpandPanel);
    exports.LeftPanel = LeftPanel;
});

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define('modules/uv-treeviewleftpanel-module/treeView',["require", "exports", "../../utils", "../uv-shared-module/baseView", "../uv-shared-module/baseExtension"], function(require, exports, utils, baseView, baseExtension) {
    var util = utils.Utils;

    var TreeView = (function (_super) {
        __extends(TreeView, _super);
        function TreeView($element) {
            _super.call(this, $element, true, true);
            this.isOpen = false;
        }
        TreeView.prototype.create = function () {
            var _this = this;
            _super.prototype.create.call(this);

            var that = this;

            $.subscribe(baseExtension.BaseExtension.CANVAS_INDEX_CHANGED, function (e, canvasIndex) {
                _this.selectTreeNodeFromCanvasIndex(canvasIndex);
            });

            this.$tree = $('<ul class="tree"></ul>');
            this.$element.append(this.$tree);

            $.templates({
                pageTemplate: '{^{for nodes}}\
                               {^{tree/}}\
                           {{/for}}',
                treeTemplate: '<li>\
                               {^{if nodes && nodes.length}}\
                                   {^{if expanded}}\
                                       <div class="toggle expanded"></div>\
                                   {{else}}\
                                       <div class="toggle"></div>\
                                   {{/if}}\
                               {{else}}\
                                   <div class="spacer"></div>\
                               {{/if}}\
                               {^{if selected}}\
                                   <a href="#" title="{{>label}}" class="selected" data-link="~elide(text)"></a>\
                               {{else}}\
                                   <a href="#" title="{{>label}}" data-link="~elide(text)"></a>\
                               {{/if}}\
                           </li>\
                           {^{if expanded}}\
                               <li>\
                                   <ul>\
                                       {^{for nodes}}\
                                           {^{tree/}}\
                                       {{/for}}\
                                   </ul>\
                               </li>\
                           {{/if}}'
            });

            $.views.helpers({
                elide: function (text) {
                    var $a = $(this.linkCtx.elem);
                    var elideCount = Math.floor($a.parent().width() / 7);
                    return util.htmlDecode(util.ellipsis(text, elideCount));
                }
            });

            $.views.tags({
                tree: {
                    toggle: function () {
                        $.observable(this.data).setProperty("expanded", !this.data.expanded);
                    },
                    init: function (tagCtx, linkCtx, ctx) {
                        var data = tagCtx.view.data;
                        data.text = data.label;
                        this.data = tagCtx.view.data;
                    },
                    onAfterLink: function () {
                        var self = this;

                        self.contents("li").first().on("click", ".toggle", function () {
                            self.toggle();
                        }).on("click", "a", function (e) {
                            e.preventDefault();

                            if (self.data.nodes.length) {
                                self.toggle();
                            }

                            $.publish(TreeView.NODE_SELECTED, [self.data.data]);
                        });
                    },
                    template: $.templates.treeTemplate
                }
            });
        };

        TreeView.prototype.dataBind = function () {
            if (!this.rootNode)
                return;

            this.$tree.link($.templates.pageTemplate, this.rootNode);
            this.resize();
        };

        TreeView.prototype.selectPath = function (path) {
            if (!this.rootNode)
                return;

            var pathArr = path.split("/");
            if (pathArr.length >= 1)
                pathArr.shift();
            var node = this.getNodeByPath(this.rootNode, pathArr);

            this.selectNode(node);
        };

        TreeView.prototype.selectTreeNodeFromCanvasIndex = function (index) {
            if (index == -1)
                return;

            this.deselectCurrentNode();

            var structure = this.provider.getStructureByCanvasIndex(index);

            if (!structure)
                return;

            if (structure.treeNode)
                this.selectNode(structure.treeNode);
        };

        TreeView.prototype.deselectCurrentNode = function () {
            if (this.selectedNode)
                $.observable(this.selectedNode).setProperty("selected", false);
        };

        TreeView.prototype.selectNode = function (node) {
            if (!this.rootNode)
                return;

            this.selectedNode = node;
            $.observable(this.selectedNode).setProperty("selected", true);

            this.expandParents(this.selectedNode);
        };

        TreeView.prototype.expandParents = function (node) {
            if (!node.parentNode)
                return;

            $.observable(node.parentNode).setProperty("expanded", true);
            this.expandParents(node.parentNode);
        };

        TreeView.prototype.getNodeByPath = function (parentNode, path) {
            if (path.length == 0)
                return parentNode;
            var index = path.shift();
            var node = parentNode.nodes[index];
            return this.getNodeByPath(node, path);
        };

        TreeView.prototype.show = function () {
            this.isOpen = true;
            this.$element.show();
        };

        TreeView.prototype.hide = function () {
            this.isOpen = false;
            this.$element.hide();
        };

        TreeView.prototype.elide = function ($a) {
            if (!$a.is(':visible'))
                return;
            var elideCount = Math.floor($a.parent().width() / 7);
            $a.text(util.htmlDecode(util.ellipsis($a.attr('title'), elideCount)));
        };

        TreeView.prototype.elideAll = function () {
            var that = this;

            this.$tree.find('a').each(function () {
                var $this = $(this);
                that.elide($this);
            });
        };

        TreeView.prototype.resize = function () {
            _super.prototype.resize.call(this);

            this.elideAll();
        };
        TreeView.NODE_SELECTED = 'treeView.onNodeSelected';
        return TreeView;
    })(baseView.BaseView);
    exports.TreeView = TreeView;
});

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define('modules/uv-treeviewleftpanel-module/thumbsView',["require", "exports", "../uv-shared-module/baseExtension", "../../extensions/uv-seadragon-extension/extension", "../uv-shared-module/baseView"], function(require, exports, baseExtension, extension, baseView) {
    var ThumbsView = (function (_super) {
        __extends(ThumbsView, _super);
        function ThumbsView($element) {
            _super.call(this, $element, true, true);
            this.isOpen = false;
        }
        ThumbsView.prototype.create = function () {
            var _this = this;
            this.setConfig('treeViewLeftPanel');

            _super.prototype.create.call(this);

            $.subscribe(baseExtension.BaseExtension.CANVAS_INDEX_CHANGED, function (e, index) {
                _this.selectIndex(parseInt(index));
            });

            $.subscribe(extension.Extension.SETTINGS_CHANGED, function (e, mode) {
                _this.setLabel();
            });

            this.$thumbs = $('<div class="thumbs"></div>');
            this.$element.append(this.$thumbs);

            this.$thumbs.addClass(this.provider.getViewingDirection());

            var that = this;

            $.templates({
                thumbsTemplate: '<div class="{{:~className()}}" data-src="{{>url}}" data-visible="{{>visible}}">\
                                <div class="wrap" style="height:{{>height + ~extraHeight()}}px"></div>\
                                <span class="index">{{:#index + 1}}</span>\
                                <span class="label">{{>label}}&nbsp;</span>\
                             </div>\
                             {{if ~separator()}} \
                                 <div class="separator"></div> \
                             {{/if}}'
            });

            var extraHeight = this.options.thumbsExtraHeight;

            $.views.helpers({
                separator: function () {
                    var viewingDirection = that.provider.getViewingDirection();
                    if (viewingDirection === "top-to-bottom" || viewingDirection === "bottom-to-top") {
                        return true;
                    }

                    return ((this.data.index - 1) % 2 == 0) ? false : true;
                },
                extraHeight: function () {
                    return extraHeight;
                },
                className: function () {
                    var className = "thumb";

                    if (this.data.index === 0) {
                        className += " first";
                    }

                    if (!this.data.url) {
                        className += " placeholder";
                    }

                    var viewingDirection = that.provider.getViewingDirection();
                    if (viewingDirection === "top-to-bottom" || viewingDirection === "bottom-to-top") {
                        className += " oneCol";
                    } else {
                        className += " twoCol";
                    }

                    return className;
                }
            });

            this.$element.on('scroll', function () {
                _this.scrollStop();
            }, 1000);

            this.resize();
        };

        ThumbsView.prototype.dataBind = function () {
            if (!this.thumbs)
                return;
            this.createThumbs();
        };

        ThumbsView.prototype.createThumbs = function () {
            var that = this;

            if (!this.thumbs)
                return;

            this.$thumbs.link($.templates.thumbsTemplate, this.thumbs);

            this.$thumbs.delegate(".thumb", "click", function (e) {
                e.preventDefault();

                var data = $.view(this).data;

                that.lastThumbClickedIndex = data.index;

                $.publish(ThumbsView.THUMB_SELECTED, [data.index]);
            });

            this.selectIndex(this.provider.canvasIndex);

            this.setLabel();

            this.loadThumbs(0);
        };

        ThumbsView.prototype.scrollStop = function () {
            var scrollPos = 1 / ((this.$thumbs.height() - this.$element.height()) / this.$element.scrollTop());

            if (scrollPos > 1)
                scrollPos = 1;

            var thumbRangeMid = Math.floor((this.thumbs.length - 1) * scrollPos);

            this.loadThumbs(thumbRangeMid);
        };

        ThumbsView.prototype.loadThumbs = function (index) {
            if (!this.thumbs || !this.thumbs.length)
                return;

            index = parseInt(index);

            var thumbRangeMid = index;
            var thumbLoadRange = this.options.thumbsLoadRange;

            var thumbRange = {
                start: (thumbRangeMid > thumbLoadRange) ? thumbRangeMid - thumbLoadRange : 0,
                end: (thumbRangeMid < (this.thumbs.length - 1) - thumbLoadRange) ? thumbRangeMid + thumbLoadRange : this.thumbs.length - 1
            };

            var fadeDuration = this.options.thumbsImageFadeInDuration;

            for (var i = thumbRange.start; i <= thumbRange.end; i++) {
                var thumbElem = $(this.$thumbs.find('.thumb')[i]);
                var imgCont = thumbElem.find('.wrap');

                if (!imgCont.hasClass('loading') && !imgCont.hasClass('loaded')) {
                    var visible = thumbElem.attr('data-visible');

                    if (visible !== "false") {
                        imgCont.addClass('loading');
                        var src = thumbElem.attr('data-src');

                        var img = $('<img src="' + src + '" />');

                        $(img).hide().load(function () {
                            $(this).fadeIn(fadeDuration, function () {
                                $(this).parent().swapClass('loading', 'loaded');
                            });
                        });
                        imgCont.append(img);
                    } else {
                        imgCont.addClass('hidden');
                    }
                }
            }
        };

        ThumbsView.prototype.show = function () {
            var _this = this;
            this.isOpen = true;
            this.$element.show();

            setTimeout(function () {
                _this.selectIndex(_this.provider.canvasIndex);
            }, 1);
        };

        ThumbsView.prototype.hide = function () {
            this.isOpen = false;
            this.$element.hide();
        };

        ThumbsView.prototype.isPDF = function () {
            return (this.provider.getSequenceType() === "application-pdf");
        };

        ThumbsView.prototype.setLabel = function () {
            if (this.isPDF()) {
                $(this.$thumbs).find('span.index').hide();
                $(this.$thumbs).find('span.label').hide();
            } else {
                if (this.extension.getMode() == extension.Extension.PAGE_MODE) {
                    $(this.$thumbs).find('span.index').hide();
                    $(this.$thumbs).find('span.label').show();
                } else {
                    $(this.$thumbs).find('span.index').show();
                    $(this.$thumbs).find('span.label').hide();
                }
            }
        };

        ThumbsView.prototype.selectIndex = function (index) {
            var _this = this;
            if (index == -1)
                return;

            if (!this.thumbs || !this.thumbs.length)
                return;

            index = parseInt(index);

            this.$thumbs.find('.thumb').removeClass('selected');

            this.$selectedThumb = $(this.$thumbs.find('.thumb')[index]);

            if (this.provider.isPaged()) {
                var indices = this.provider.getPagedIndices(index);

                _.each(indices, function (index) {
                    $(_this.$thumbs.find('.thumb')[index]).addClass('selected');
                });
            } else {
                this.$selectedThumb.addClass('selected');
            }

            if (this.lastThumbClickedIndex != index) {
                this.$element.scrollTop(this.$selectedThumb.position().top);
            }

            this.loadThumbs(index);
        };

        ThumbsView.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        ThumbsView.THUMB_SELECTED = 'thumbsView.onThumbSelected';
        return ThumbsView;
    })(baseView.BaseView);
    exports.ThumbsView = ThumbsView;
});

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define('modules/uv-treeviewleftpanel-module/galleryView',["require", "exports", "../../utils", "../uv-shared-module/baseExtension", "../../extensions/uv-seadragon-extension/extension", "../uv-shared-module/baseView"], function(require, exports, utils, baseExtension, extension, baseView) {
    var GalleryView = (function (_super) {
        __extends(GalleryView, _super);
        function GalleryView($element) {
            _super.call(this, $element, true, true);
            this.isOpen = false;
        }
        GalleryView.prototype.create = function () {
            var _this = this;
            this.setConfig('treeViewLeftPanel');

            _super.prototype.create.call(this);

            $.subscribe(baseExtension.BaseExtension.CANVAS_INDEX_CHANGED, function (e, index) {
                _this.selectIndex(parseInt(index));
            });

            $.subscribe(extension.Extension.SETTINGS_CHANGED, function () {
                _this.setLabel();
            });

            this.$header = $('<div class="header"></div>');
            this.$element.append(this.$header);

            this.$sizeDownButton = $('<input class="btn btn-default size-down" type="button" value="-" />');
            this.$header.append(this.$sizeDownButton);

            this.$sizeRange = $('<input type="range" name="size" min="0" max="10" value="5" />');
            this.$header.append(this.$sizeRange);

            this.$sizeUpButton = $('<input class="btn btn-default size-up" type="button" value="+" />');
            this.$header.append(this.$sizeUpButton);

            this.$main = $('<div class="main"></div>');
            this.$element.append(this.$main);

            this.$thumbs = $('<div class="thumbs"></div>');
            this.$main.append(this.$thumbs);

            this.$thumbs.addClass(this.provider.getViewingDirection());

            this.$sizeDownButton.on('click', function () {
                var val = Number(_this.$sizeRange.val()) - 1;

                if (val >= Number(_this.$sizeRange.attr('min'))) {
                    _this.$sizeRange.val(val.toString());
                    _this.$sizeRange.trigger('change');
                }
            });

            this.$sizeUpButton.on('click', function () {
                var val = Number(_this.$sizeRange.val()) + 1;

                if (val <= Number(_this.$sizeRange.attr('max'))) {
                    _this.$sizeRange.val(val.toString());
                    _this.$sizeRange.trigger('change');
                }
            });

            this.$sizeRange.on('change', function () {
                _this.updateThumbs();
                _this.scrollToSelectedThumb();
            });

            $.templates({
                galleryThumbsTemplate: '<div class="{{:~className()}}" data-src="{{>url}}" data-visible="{{>visible}}" data-width="{{>width}}" data-height="{{>height}}">\
                                <div class="wrap"></div>\
                                <span class="index">{{:#index + 1}}</span>\
                                <span class="label">{{>label}}&nbsp;</span>\
                             </div>'
            });

            $.views.helpers({
                className: function () {
                    var className = "thumb";

                    if (this.data.index === 0) {
                        className += " first";
                    }

                    if (!this.data.url) {
                        className += " placeholder";
                    }

                    return className;
                }
            });

            this.$main.on('scroll', function () {
                _this.updateThumbs();
            }, 1000);

            if (!Modernizr.inputtypes.range) {
                this.$sizeRange.hide();
            }

            this.resize();
        };

        GalleryView.prototype.dataBind = function () {
            if (!this.thumbs)
                return;
            this.createThumbs();
        };

        GalleryView.prototype.createThumbs = function () {
            var that = this;

            if (!this.thumbs)
                return;

            this.$thumbs.link($.templates.galleryThumbsTemplate, this.thumbs);

            this.$thumbs.delegate(".thumb", "click", function (e) {
                e.preventDefault();

                var data = $.view(this).data;

                that.lastThumbClickedIndex = data.index;

                $.publish(GalleryView.THUMB_SELECTED, [data.index]);
            });

            this.selectIndex(this.provider.canvasIndex);

            this.setLabel();

            this.updateThumbs();
        };

        GalleryView.prototype.updateThumbs = function () {
            var _this = this;
            if (!this.thumbs || !this.thumbs.length)
                return;

            this.range = utils.Utils.normalise(Number(this.$sizeRange.val()), 0, 10);
            this.range = utils.Utils.clamp(this.range, 0.05, 1);

            var thumbs = this.$thumbs.find('.thumb');

            for (var i = 0; i < thumbs.length; i++) {
                var $thumb = $(thumbs[i]);
                this.sizeThumb($thumb);
                this.sizeThumbImage($thumb);
            }

            this.equaliseHeights();

            var scrollTop = this.$main.scrollTop();
            var scrollHeight = this.$main.height();

            for (var i = 0; i < thumbs.length; i++) {
                var $thumb = $(thumbs[i]);
                var thumbTop = $thumb.position().top;
                var thumbBottom = thumbTop + $thumb.height();

                if (thumbBottom >= scrollTop && thumbTop <= scrollTop + scrollHeight) {
                    this.loadThumb($thumb, function () {
                        _this.sizeThumbImage($thumb);
                    });
                }
            }
        };

        GalleryView.prototype.equaliseHeights = function () {
            this.$thumbs.find('.thumb .wrap').equaliseHeight();
        };

        GalleryView.prototype.sizeThumb = function ($thumb) {
            var width = $thumb.data('width');
            var height = $thumb.data('height');

            var $wrap = $thumb.find('.wrap');

            $wrap.width(width * this.range);
            $wrap.height(height * this.range);
        };

        GalleryView.prototype.sizeThumbImage = function ($thumb) {
            var width = $thumb.data('width');
            var height = $thumb.data('height');

            var $img = $thumb.find('img');

            $img.width(width * this.range);
            $img.height(height * this.range);
        };

        GalleryView.prototype.loadThumb = function ($thumb, callback) {
            var $wrap = $thumb.find('.wrap');

            if ($wrap.hasClass('loading') || $wrap.hasClass('loaded'))
                return;

            var visible = $thumb.attr('data-visible');

            var fadeDuration = this.options.thumbsImageFadeInDuration;

            if (visible !== "false") {
                $wrap.addClass('loading');
                var src = $thumb.attr('data-src');
                var img = $('<img src="' + src + '" />');

                $(img).hide().load(function () {
                    $(this).fadeIn(fadeDuration, function () {
                        $(this).parent().swapClass('loading', 'loaded');
                    });
                });
                $wrap.append(img);
                if (callback)
                    callback(img);
            } else {
                $wrap.addClass('hidden');
            }
        };

        GalleryView.prototype.show = function () {
            var _this = this;
            this.isOpen = true;
            this.$element.show();

            setTimeout(function () {
                _this.selectIndex(_this.provider.canvasIndex);
                _this.scrollToSelectedThumb();
            }, 1);
        };

        GalleryView.prototype.hide = function () {
            this.isOpen = false;
            this.$element.hide();
        };

        GalleryView.prototype.setLabel = function () {
            if (this.extension.getMode() == extension.Extension.PAGE_MODE) {
                $(this.$thumbs).find('span.index').hide();
                $(this.$thumbs).find('span.label').show();
            } else {
                $(this.$thumbs).find('span.index').show();
                $(this.$thumbs).find('span.label').hide();
            }
        };

        GalleryView.prototype.selectIndex = function (index) {
            if (index == -1)
                return;

            if (!this.thumbs || !this.thumbs.length)
                return;

            index = parseInt(index);

            this.$thumbs.find('.thumb').removeClass('selected');

            this.$selectedThumb = $(this.$thumbs.find('.thumb')[index]);

            this.$selectedThumb.addClass('selected');

            this.updateThumbs();
        };

        GalleryView.prototype.scrollToSelectedThumb = function () {
            this.$main.scrollTop(this.$selectedThumb.position().top);
        };

        GalleryView.prototype.resize = function () {
            _super.prototype.resize.call(this);

            this.$main.height(this.$element.height() - this.$header.height());

            this.updateThumbs();
        };
        GalleryView.THUMB_SELECTED = 'galleryView.onThumbSelected';
        return GalleryView;
    })(baseView.BaseView);
    exports.GalleryView = GalleryView;
});

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define('modules/uv-treeviewleftpanel-module/treeViewLeftPanel',["require", "exports", "../uv-shared-module/leftPanel", "../../utils", "./treeView", "./thumbsView", "./galleryView", "../../extensions/uv-seadragon-extension/extension", "../uv-shared-module/baseExtension"], function(require, exports, baseLeft, utils, tree, thumbs, gallery, extension, baseExtension) {
    var TreeViewLeftPanel = (function (_super) {
        __extends(TreeViewLeftPanel, _super);
        function TreeViewLeftPanel($element) {
            _super.call(this, $element);
        }
        TreeViewLeftPanel.prototype.create = function () {
            var _this = this;
            this.setConfig('treeViewLeftPanel');

            _super.prototype.create.call(this);

            $.subscribe(extension.Extension.RELOAD_MANIFEST, function () {
                _this.dataBindThumbsView();
                _this.dataBindTreeView();
                _this.dataBindGalleryView();
            });

            $.subscribe(gallery.GalleryView.THUMB_SELECTED, function () {
                _this.collapseFull();
            });

            $.subscribe(baseExtension.BaseExtension.CANVAS_INDEX_CHANGED, function (e, index) {
                if (_this.isFullyExpanded) {
                    _this.collapseFull();
                }
            });

            this.$tabs = $('<div class="tabs"></div>');
            this.$main.append(this.$tabs);

            this.$treeButton = $('<a class="index tab first">' + this.content.index + '</a>');
            this.$treeButton.prop('title', this.content.index);
            this.$tabs.append(this.$treeButton);

            this.$thumbsButton = $('<a class="thumbs tab">' + this.content.thumbnails + '</a>');
            this.$thumbsButton.prop('title', this.content.thumbnails);
            this.$tabs.append(this.$thumbsButton);

            this.$tabsContent = $('<div class="tabsContent"></div>');
            this.$main.append(this.$tabsContent);

            this.$options = $('<div class="options"></div>');
            this.$tabsContent.append(this.$options);

            this.$views = $('<div class="views"></div>');
            this.$tabsContent.append(this.$views);

            this.$treeView = $('<div class="treeView"></div>');
            this.$views.append(this.$treeView);

            this.$thumbsView = $('<div class="thumbsView"></div>');
            this.$views.append(this.$thumbsView);

            this.$galleryView = $('<div class="galleryView"></div>');
            this.$views.append(this.$galleryView);

            this.$treeButton.onPressed(function () {
                _this.openTreeView();

                $.publish(TreeViewLeftPanel.OPEN_TREE_VIEW);
            });

            this.$thumbsButton.onPressed(function () {
                _this.openThumbsView();

                $.publish(TreeViewLeftPanel.OPEN_THUMBS_VIEW);
            });

            this.$expandButton.attr('tabindex', '7');
            this.$collapseButton.attr('tabindex', '7');
            this.$expandFullButton.attr('tabindex', '8');

            this.$title.text(this.content.title);
            this.$closedTitle.text(this.content.title);
        };

        TreeViewLeftPanel.prototype.createTreeView = function () {
            this.treeView = new tree.TreeView(this.$treeView);
            this.treeView.elideCount = this.config.options.elideCount;
            this.dataBindTreeView();
        };

        TreeViewLeftPanel.prototype.dataBindTreeView = function () {
            if (!this.treeView)
                return;
            this.treeView.rootNode = this.provider.getTree();
            this.treeView.dataBind();
        };

        TreeViewLeftPanel.prototype.createThumbsView = function () {
            this.thumbsView = new thumbs.ThumbsView(this.$thumbsView);
            this.dataBindThumbsView();
        };

        TreeViewLeftPanel.prototype.dataBindThumbsView = function () {
            if (!this.thumbsView)
                return;
            var width, height;
            var viewingDirection = this.provider.getViewingDirection();

            if (viewingDirection === "top-to-bottom" || viewingDirection === "bottom-to-top") {
                width = this.config.options.oneColThumbWidth;
                height = this.config.options.oneColThumbHeight;
            } else {
                width = this.config.options.twoColThumbWidth;
                height = this.config.options.twoColThumbHeight;
            }

            this.thumbsView.thumbs = this.provider.getThumbs(width, height);
            this.thumbsView.dataBind();
        };

        TreeViewLeftPanel.prototype.createGalleryView = function () {
            this.galleryView = new gallery.GalleryView(this.$galleryView);
            this.dataBindGalleryView();
        };

        TreeViewLeftPanel.prototype.dataBindGalleryView = function () {
            if (!this.galleryView)
                return;
            var width = this.config.options.galleryThumbWidth;
            var height = this.config.options.galleryThumbHeight;
            this.galleryView.thumbs = this.provider.getThumbs(width, height);
            this.galleryView.dataBind();
        };

        TreeViewLeftPanel.prototype.toggleFinish = function () {
            _super.prototype.toggleFinish.call(this);

            if (this.isUnopened) {
                var treeEnabled = utils.Utils.getBool(this.config.options.treeEnabled, true);
                var thumbsEnabled = utils.Utils.getBool(this.config.options.thumbsEnabled, true);

                if (!treeEnabled || !thumbsEnabled)
                    this.$tabs.hide();

                if (thumbsEnabled && this.provider.defaultToThumbsView()) {
                    this.openThumbsView();
                } else if (treeEnabled) {
                    this.openTreeView();
                }
            }

            if (this.isExpanded) {
                this.$treeButton.attr('tabindex', '9');
                this.$thumbsButton.attr('tabindex', '10');
            } else {
                this.$treeButton.attr('tabindex', '');
                this.$thumbsButton.attr('tabindex', '');
            }
        };

        TreeViewLeftPanel.prototype.expandFullStart = function () {
            _super.prototype.expandFullStart.call(this);
            $.publish(TreeViewLeftPanel.EXPAND_FULL_START);
        };

        TreeViewLeftPanel.prototype.expandFullFinish = function () {
            _super.prototype.expandFullFinish.call(this);

            if (this.$treeButton.hasClass('on')) {
                this.openTreeView();
            } else if (this.$thumbsButton.hasClass('on')) {
                this.openThumbsView();
            }

            $.publish(TreeViewLeftPanel.EXPAND_FULL_FINISH);
        };

        TreeViewLeftPanel.prototype.collapseFullStart = function () {
            _super.prototype.collapseFullStart.call(this);

            $.publish(TreeViewLeftPanel.COLLAPSE_FULL_START);
        };

        TreeViewLeftPanel.prototype.collapseFullFinish = function () {
            _super.prototype.collapseFullFinish.call(this);

            if (this.$thumbsButton.hasClass('on')) {
                this.openThumbsView();
            }

            $.publish(TreeViewLeftPanel.COLLAPSE_FULL_FINISH);
        };

        TreeViewLeftPanel.prototype.openTreeView = function () {
            var _this = this;
            if (!this.treeView) {
                this.createTreeView();
            }

            this.$treeButton.addClass('on');
            this.$thumbsButton.removeClass('on');

            this.treeView.show();

            setTimeout(function () {
                var structure = _this.provider.getStructureByCanvasIndex(_this.provider.canvasIndex);
                if (_this.treeView && structure && structure.treeNode)
                    _this.treeView.selectNode(structure.treeNode);
            }, 1);

            if (this.thumbsView)
                this.thumbsView.hide();
            if (this.galleryView)
                this.galleryView.hide();

            this.treeView.resize();
        };

        TreeViewLeftPanel.prototype.openThumbsView = function () {
            if (!this.thumbsView) {
                this.createThumbsView();
            }

            if (this.isFullyExpanded && !this.galleryView) {
                this.createGalleryView();
            }

            this.$treeButton.removeClass('on');
            this.$thumbsButton.addClass('on');

            if (this.treeView)
                this.treeView.hide();

            if (this.isFullyExpanded) {
                this.thumbsView.hide();
                if (this.galleryView)
                    this.galleryView.show();
                if (this.galleryView)
                    this.galleryView.resize();
            } else {
                if (this.galleryView)
                    this.galleryView.hide();
                this.thumbsView.show();
                this.thumbsView.resize();
            }
        };

        TreeViewLeftPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);

            this.$tabsContent.height(this.$main.height() - (this.$tabs.is(':visible') ? this.$tabs.height() : 0) - this.$tabsContent.verticalPadding());
            this.$views.height(this.$tabsContent.height() - this.$options.height());
        };
        TreeViewLeftPanel.OPEN_TREE_VIEW = 'leftPanel.onOpenTreeView';
        TreeViewLeftPanel.OPEN_THUMBS_VIEW = 'leftPanel.onOpenThumbsView';
        TreeViewLeftPanel.EXPAND_FULL_START = 'leftPanel.onExpandFullStart';
        TreeViewLeftPanel.EXPAND_FULL_FINISH = 'leftPanel.onExpandFullFinish';
        TreeViewLeftPanel.COLLAPSE_FULL_START = 'leftPanel.onCollapseFullStart';
        TreeViewLeftPanel.COLLAPSE_FULL_FINISH = 'leftPanel.onCollapseFullFinish';
        return TreeViewLeftPanel;
    })(baseLeft.LeftPanel);
    exports.TreeViewLeftPanel = TreeViewLeftPanel;
});

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define('modules/uv-shared-module/centerPanel',["require", "exports", "./shell", "./baseView"], function(require, exports, shell, baseView) {
    var CenterPanel = (function (_super) {
        __extends(CenterPanel, _super);
        function CenterPanel($element) {
            _super.call(this, $element, false, true);
        }
        CenterPanel.prototype.create = function () {
            _super.prototype.create.call(this);

            this.$title = $('<div class="title"></div>');
            this.$element.append(this.$title);

            this.$content = $('<div id="content" class="content"></div>');
            this.$element.append(this.$content);

            if (this.options.titleEnabled === false) {
                this.$title.hide();
            }
        };

        CenterPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);

            this.$element.css({
                'left': shell.Shell.$leftPanel.width(),
                'width': this.$element.parent().width() - shell.Shell.$leftPanel.width() - shell.Shell.$rightPanel.width()
            });

            var titleHeight;

            if (this.options.titleEnabled === false) {
                titleHeight = 0;
            } else {
                titleHeight = this.$title.height();
            }

            this.$content.height(this.$element.height() - titleHeight);
            this.$content.width(this.$element.width());
        };
        return CenterPanel;
    })(baseView.BaseView);
    exports.CenterPanel = CenterPanel;
});

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define('modules/uv-seadragoncenterpanel-module/seadragonCenterPanel',["require", "exports", "../uv-shared-module/baseExtension", "../uv-shared-module/baseProvider", "../uv-shared-module/centerPanel", "../../utils"], function(require, exports, baseExtension, baseProvider, baseCenter, utils) {
    var SeadragonCenterPanel = (function (_super) {
        __extends(SeadragonCenterPanel, _super);
        function SeadragonCenterPanel($element) {
            _super.call(this, $element);
            this.prevButtonEnabled = false;
            this.nextButtonEnabled = false;
            this.isFirstLoad = true;
            this.controlsVisible = false;
        }
        SeadragonCenterPanel.prototype.create = function () {
            var _this = this;
            this.setConfig('seadragonCenterPanel');

            _super.prototype.create.call(this);

            this.$viewer = $('<div id="viewer"></div>');
            this.$content.append(this.$viewer);

            this.$spinner = $('<div class="spinner"></div>');
            this.$content.append(this.$spinner);

            this.$rights = $('<div class="rights">\
                               <div class="header">\
                                   <div class="title"></div>\
                                   <div class="close"></div>\
                               </div>\
                               <div class="main">\
                                   <div class="attribution"></div>\
                                   <div class="license"></div>\
                                   <div class="logo"></div>\
                               </div>\
                          </div>');

            this.$rights.find('.header .title').text(this.content.acknowledgements);
            this.$content.append(this.$rights);

            this.$closeRightsBtn = this.$rights.find('.header .close');
            this.$closeRightsBtn.on('click', function (e) {
                e.preventDefault();
                _this.$rights.hide();
            });

            $.subscribe(baseExtension.BaseExtension.OPEN_MEDIA, function (e, uri) {
                _this.loadTileSources();
            });

            this.createSeadragonViewer();

            this.$zoomInButton = this.$viewer.find('div[title="Zoom in"]');
            this.$zoomInButton.attr('tabindex', 11);
            this.$zoomInButton.addClass('zoomIn');

            this.$zoomOutButton = this.$viewer.find('div[title="Zoom out"]');
            this.$zoomOutButton.attr('tabindex', 12);
            this.$zoomOutButton.addClass('zoomOut');

            this.$goHomeButton = this.$viewer.find('div[title="Go home"]');
            this.$goHomeButton.attr('tabindex', 13);
            this.$goHomeButton.addClass('goHome');

            this.$rotateButton = this.$viewer.find('div[title="Rotate right"]');
            this.$rotateButton.attr('tabindex', 14);
            this.$rotateButton.addClass('rotate');

            this.$element.on('mousemove', function (e) {
                if (_this.controlsVisible)
                    return;
                _this.controlsVisible = true;
                _this.viewer.setControlsEnabled(true);
            });

            this.$element.on('mouseleave', function (e) {
                if (!_this.controlsVisible)
                    return;
                _this.controlsVisible = false;
                _this.viewer.setControlsEnabled(false);
            });

            this.$element.on('mousemove', function (e) {
                if (!_this.$viewer.find('.navigator').ismouseover()) {
                    if (!_this.controlsVisible)
                        return;
                    _this.controlsVisible = false;
                    _this.viewer.setControlsEnabled(false);
                }
            }, this.config.options.controlsFadeAfterInactive);

            this.viewer.addHandler('open', function (viewer) {
                _this.viewerOpen();
                $.publish(SeadragonCenterPanel.SEADRAGON_OPEN, [viewer]);
            });

            this.viewer.addHandler('resize', function (viewer) {
                $.publish(SeadragonCenterPanel.SEADRAGON_RESIZE, [viewer]);
                _this.viewerResize(viewer);
            });

            this.viewer.addHandler('animation-start', function (viewer) {
                $.publish(SeadragonCenterPanel.SEADRAGON_ANIMATION_START, [viewer]);
            });

            this.viewer.addHandler('animation', function (viewer) {
                $.publish(SeadragonCenterPanel.SEADRAGON_ANIMATION, [viewer]);
            });

            this.viewer.addHandler('animation-finish', function (viewer) {
                _this.currentBounds = _this.getBounds();

                $.publish(SeadragonCenterPanel.SEADRAGON_ANIMATION_FINISH, [viewer]);
            });

            this.$rotateButton.on('click', function () {
                $.publish(SeadragonCenterPanel.SEADRAGON_ROTATION, [_this.viewer.viewport.getRotation()]);
            });

            this.title = this.extension.provider.getTitle();

            this.createNavigationButtons();

            this.showAttribution();

            this.resize();
        };

        SeadragonCenterPanel.prototype.createSeadragonViewer = function () {
            var prefixUrl = (window.DEBUG) ? 'modules/uv-seadragoncenterpanel-module/img/' : 'themes/' + this.provider.config.options.theme + '/img/uv-seadragoncenterpanel-module/';

            window.openSeadragonViewer = this.viewer = OpenSeadragon({
                id: "viewer",
                showNavigationControl: true,
                showNavigator: true,
                showRotationControl: true,
                showHomeControl: true,
                showFullPageControl: false,
                defaultZoomLevel: this.config.options.defaultZoomLevel || 0,
                controlsFadeDelay: this.config.options.controlsFadeDelay,
                controlsFadeLength: this.config.options.controlsFadeLength,
                navigatorPosition: this.config.options.navigatorPosition,
                prefixUrl: prefixUrl,
                navImages: {
                    zoomIn: {
                        REST: 'zoom_in.png',
                        GROUP: 'zoom_in.png',
                        HOVER: 'zoom_in.png',
                        DOWN: 'zoom_in.png'
                    },
                    zoomOut: {
                        REST: 'zoom_out.png',
                        GROUP: 'zoom_out.png',
                        HOVER: 'zoom_out.png',
                        DOWN: 'zoom_out.png'
                    },
                    home: {
                        REST: 'home.png',
                        GROUP: 'home.png',
                        HOVER: 'home.png',
                        DOWN: 'home.png'
                    },
                    rotateright: {
                        REST: 'rotate_right.png',
                        GROUP: 'rotate_right.png',
                        HOVER: 'rotate_right.png',
                        DOWN: 'rotate_right.png'
                    },
                    rotateleft: {
                        REST: 'pixel.gif',
                        GROUP: 'pixel.gif',
                        HOVER: 'pixel.gif',
                        DOWN: 'pixel.gif'
                    },
                    next: {
                        REST: 'pixel.gif',
                        GROUP: 'pixel.gif',
                        HOVER: 'pixel.gif',
                        DOWN: 'pixel.gif'
                    },
                    previous: {
                        REST: 'pixel.gif',
                        GROUP: 'pixel.gif',
                        HOVER: 'pixel.gif',
                        DOWN: 'pixel.gif'
                    }
                }
            });
        };

        SeadragonCenterPanel.prototype.createNavigationButtons = function () {
            if (!this.provider.isMultiCanvas())
                return;

            this.$prevButton = $('<div class="paging btn prev"></div>');
            this.$prevButton.prop('title', this.content.previous);
            this.viewer.addControl(this.$prevButton[0], { anchor: OpenSeadragon.ControlAnchor.TOP_LEFT });

            this.$nextButton = $('<div class="paging btn next"></div>');
            this.$nextButton.prop('title', this.content.next);
            this.viewer.addControl(this.$nextButton[0], { anchor: OpenSeadragon.ControlAnchor.TOP_RIGHT });

            var that = this;

            this.$prevButton.on('touchstart click', function (e) {
                e.preventDefault();
                OpenSeadragon.cancelEvent(e);

                if (!that.prevButtonEnabled)
                    return;

                $.publish(SeadragonCenterPanel.PREV);
            });

            this.$nextButton.on('touchstart click', function (e) {
                e.preventDefault();
                OpenSeadragon.cancelEvent(e);

                if (!that.nextButtonEnabled)
                    return;

                $.publish(SeadragonCenterPanel.NEXT);
            });
        };

        SeadragonCenterPanel.prototype.viewerOpen = function () {
            if (this.provider.isMultiCanvas()) {
                $('.navigator').addClass('extraMargin');

                if (!this.provider.isFirstCanvas()) {
                    this.enablePrevButton();
                } else {
                    this.disablePrevButton();
                }

                if (!this.provider.isLastCanvas()) {
                    this.enableNextButton();
                } else {
                    this.disableNextButton();
                }
            }
        };

        SeadragonCenterPanel.prototype.loadTileSources = function () {
            if (!this.viewer)
                return;

            this.tileSources = this.provider.getTileSources();

            this.$spinner.show();

            var imageUnavailableUri = (window.DEBUG) ? '/src/extensions/uv-seadragon-extension/js/imageunavailable.js' : 'js/imageunavailable.js';

            _.each(this.tileSources, function (ts) {
                if (!ts.tileSource) {
                    ts.tileSource = imageUnavailableUri;
                }
            });

            this.viewer.addHandler('open', this.openTileSourcesHandler, this);

            this.viewer.open(this.tileSources[0]);
        };

        SeadragonCenterPanel.prototype.openTileSourcesHandler = function () {
            var that = this.userData;

            that.viewer.removeHandler('open', that.handler);

            var viewingDirection = that.provider.getViewingDirection();

            if (that.tileSources.length > 1) {
                if (viewingDirection == "top-to-bottom" || viewingDirection == "bottom-to-top") {
                    that.tileSources[1].y = that.viewer.world.getItemAt(0).getBounds().y + that.viewer.world.getItemAt(0).getBounds().height + that.config.options.pageGap;
                } else {
                    that.tileSources[1].x = that.viewer.world.getItemAt(0).getBounds().x + that.viewer.world.getItemAt(0).getBounds().width + that.config.options.pageGap;
                }

                that.viewer.addTiledImage(that.tileSources[1]);
            }

            if (that.isFirstLoad) {
                that.initialRotation = that.extension.getParam(3 /* rotation */);

                if (that.initialRotation) {
                    that.viewer.viewport.setRotation(parseInt(that.initialRotation));
                }

                that.initialBounds = that.extension.getParam(2 /* zoom */);

                if (that.initialBounds) {
                    that.initialBounds = that.deserialiseBounds(that.initialBounds);
                    that.currentBounds = that.initialBounds;
                    that.fitToBounds(that.currentBounds);
                }
            } else {
                var settings = that.provider.getSettings();

                if (settings.preserveViewport) {
                    that.fitToBounds(that.currentBounds);
                } else {
                    that.goHome();
                }
            }

            that.lastTilesNum = that.tileSources.length;
            that.isFirstLoad = false;
            that.$spinner.hide();
        };

        SeadragonCenterPanel.prototype.showAttribution = function () {
            var _this = this;
            var attribution = this.provider.getAttribution();

            if (!attribution) {
                this.$rights.hide();
                return;
            }

            var $attribution = this.$rights.find('.attribution');
            var $license = this.$rights.find('.license');
            var $logo = this.$rights.find('.logo');

            if (attribution) {
                $attribution.html(this.provider.sanitize(attribution));
                $attribution.find('img').one("load", function () {
                    _this.resize();
                }).each(function () {
                    if (this.complete)
                        $(this).load();
                });
                $attribution.targetBlank();
                $attribution.toggleExpandText(this.options.trimAttributionCount, function () {
                    _this.resize();
                });
            } else {
                $attribution.hide();
            }

            $license.hide();

            $logo.hide();
        };

        SeadragonCenterPanel.prototype.goHome = function () {
            var viewingDirection = this.provider.getViewingDirection();

            switch (viewingDirection) {
                case "top-to-bottom":
                    this.viewer.viewport.fitBounds(new OpenSeadragon.Rect(0, 0, 1, this.viewer.world.getItemAt(0).normHeight * this.tileSources.length), true);
                    break;
                case "left-to-right":
                case "right-to-left":
                    this.viewer.viewport.fitBounds(new OpenSeadragon.Rect(0, 0, this.tileSources.length, this.viewer.world.getItemAt(0).normHeight), true);
                    break;
            }
        };

        SeadragonCenterPanel.prototype.disablePrevButton = function () {
            this.prevButtonEnabled = false;
            this.$prevButton.addClass('disabled');
        };

        SeadragonCenterPanel.prototype.enablePrevButton = function () {
            this.prevButtonEnabled = true;
            this.$prevButton.removeClass('disabled');
        };

        SeadragonCenterPanel.prototype.disableNextButton = function () {
            this.nextButtonEnabled = false;
            this.$nextButton.addClass('disabled');
        };

        SeadragonCenterPanel.prototype.enableNextButton = function () {
            this.nextButtonEnabled = true;
            this.$nextButton.removeClass('disabled');
        };

        SeadragonCenterPanel.prototype.serialiseBounds = function (bounds) {
            return bounds.x + ',' + bounds.y + ',' + bounds.width + ',' + bounds.height;
        };

        SeadragonCenterPanel.prototype.deserialiseBounds = function (bounds) {
            var boundsArr = bounds.split(',');

            return {
                x: Number(boundsArr[0]),
                y: Number(boundsArr[1]),
                width: Number(boundsArr[2]),
                height: Number(boundsArr[3])
            };
        };

        SeadragonCenterPanel.prototype.fitToBounds = function (bounds) {
            var rect = new OpenSeadragon.Rect();
            rect.x = bounds.x;
            rect.y = bounds.y;
            rect.width = bounds.width;
            rect.height = bounds.height;

            this.viewer.viewport.fitBounds(rect, true);
        };

        SeadragonCenterPanel.prototype.getBounds = function () {
            if (!this.viewer || !this.viewer.viewport)
                return null;

            var bounds = this.viewer.viewport.getBounds(true);

            return {
                x: utils.Utils.roundNumber(bounds.x, 4),
                y: utils.Utils.roundNumber(bounds.y, 4),
                width: utils.Utils.roundNumber(bounds.width, 4),
                height: utils.Utils.roundNumber(bounds.height, 4)
            };
        };

        SeadragonCenterPanel.prototype.viewerResize = function (viewer) {
            if (!viewer.viewport)
                return;

            var center = viewer.viewport.getCenter(true);
            if (!center)
                return;

            setTimeout(function () {
                viewer.viewport.panTo(center, true);
            }, 1);
        };

        SeadragonCenterPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);

            this.$title.ellipsisFill(this.title);

            this.$viewer.height(this.$content.height() - this.$viewer.verticalMargins());
            this.$viewer.width(this.$content.width() - this.$viewer.horizontalMargins());

            if (this.currentBounds)
                this.fitToBounds(this.currentBounds);

            this.$spinner.css('top', (this.$content.height() / 2) - (this.$spinner.height() / 2));
            this.$spinner.css('left', (this.$content.width() / 2) - (this.$spinner.width() / 2));

            if (this.provider.isMultiCanvas() && this.$prevButton && this.$nextButton) {
                this.$prevButton.css('top', (this.$content.height() - this.$prevButton.height()) / 2);
                this.$nextButton.css('top', (this.$content.height() - this.$nextButton.height()) / 2);
            }

            if (this.$rights && this.$rights.is(':visible')) {
                this.$rights.css('top', this.$content.height() - this.$rights.outerHeight() - this.$rights.verticalMargins());
            }
        };
        SeadragonCenterPanel.SEADRAGON_OPEN = 'center.onOpen';
        SeadragonCenterPanel.SEADRAGON_RESIZE = 'center.onResize';
        SeadragonCenterPanel.SEADRAGON_ANIMATION_START = 'center.onAnimationStart';
        SeadragonCenterPanel.SEADRAGON_ANIMATION = 'center.onAnimation';
        SeadragonCenterPanel.SEADRAGON_ANIMATION_FINISH = 'center.onAnimationfinish';
        SeadragonCenterPanel.SEADRAGON_ROTATION = 'center.onRotation';
        SeadragonCenterPanel.PREV = 'center.onPrev';
        SeadragonCenterPanel.NEXT = 'center.onNext';
        return SeadragonCenterPanel;
    })(baseCenter.CenterPanel);
    exports.SeadragonCenterPanel = SeadragonCenterPanel;
});

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define('modules/uv-shared-module/rightPanel',["require", "exports", "./baseExpandPanel"], function(require, exports, baseExpandPanel) {
    var RightPanel = (function (_super) {
        __extends(RightPanel, _super);
        function RightPanel($element) {
            _super.call(this, $element);
        }
        RightPanel.prototype.create = function () {
            _super.prototype.create.call(this);

            this.$element.width(this.options.panelCollapsedWidth);
        };

        RightPanel.prototype.init = function () {
            _super.prototype.init.call(this);

            if (this.options.panelOpen && this.provider.isHomeDomain) {
                this.toggle(true);
            }
        };

        RightPanel.prototype.getTargetWidth = function () {
            return this.isExpanded ? this.options.panelCollapsedWidth : this.options.panelExpandedWidth;
        };

        RightPanel.prototype.getTargetLeft = function () {
            return this.isExpanded ? this.$element.parent().width() - this.options.panelCollapsedWidth : this.$element.parent().width() - this.options.panelExpandedWidth;
        };

        RightPanel.prototype.toggleFinish = function () {
            _super.prototype.toggleFinish.call(this);

            if (this.isExpanded) {
                $.publish(RightPanel.OPEN_RIGHT_PANEL);
            } else {
                $.publish(RightPanel.CLOSE_RIGHT_PANEL);
            }
        };

        RightPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);

            this.$element.css({
                'left': this.$element.parent().width() - this.$element.outerWidth()
            });
        };
        RightPanel.OPEN_RIGHT_PANEL = 'onOpenRightPanel';
        RightPanel.CLOSE_RIGHT_PANEL = 'onCloseRightPanel';
        return RightPanel;
    })(baseExpandPanel.BaseExpandPanel);
    exports.RightPanel = RightPanel;
});

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define('modules/uv-moreinforightpanel-module/moreInfoRightPanel',["require", "exports", "../uv-shared-module/rightPanel"], function(require, exports, baseRight) {
    var MoreInfoRightPanel = (function (_super) {
        __extends(MoreInfoRightPanel, _super);
        function MoreInfoRightPanel($element) {
            _super.call(this, $element);
        }
        MoreInfoRightPanel.prototype.create = function () {
            this.setConfig('moreInfoRightPanel');

            _super.prototype.create.call(this);

            this.moreInfoItemTemplate = $('<div class="item">\
                                           <div class="header"></div>\
                                           <div class="text"></div>\
                                       </div>');

            this.$items = $('<div class="items"></div>');
            this.$main.append(this.$items);

            this.$noData = $('<div class="noData">' + this.content.noData + '</div>');
            this.$main.append(this.$noData);

            this.$expandButton.attr('tabindex', '4');
            this.$collapseButton.attr('tabindex', '4');

            this.$title.text(this.content.title);
            this.$closedTitle.text(this.content.title);
        };

        MoreInfoRightPanel.prototype.toggleFinish = function () {
            _super.prototype.toggleFinish.call(this);

            if (this.isUnopened) {
                this.getInfo();
            }
        };

        MoreInfoRightPanel.prototype.getInfo = function () {
            var _this = this;
            this.$main.addClass('loading');

            this.provider.getMetaData(function (data) {
                _this.displayInfo(data);
            }, true);
        };

        MoreInfoRightPanel.prototype.displayInfo = function (data) {
            var _this = this;
            this.$main.removeClass('loading');

            if (!data) {
                this.$noData.show();
                return;
            }

            this.$noData.hide();

            _.each(data, function (item) {
                _this.$items.append(_this.buildItem(item, 130));
            });
        };

        MoreInfoRightPanel.prototype.buildItem = function (item, trimChars) {
            var $elem = this.moreInfoItemTemplate.clone();
            var $header = $elem.find('.header');
            var $text = $elem.find('.text');

            var label = this.provider.getLocalisedValue(item.label);
            var value = this.provider.getLocalisedValue(item.value);

            label = this.provider.sanitize(label);
            value = this.provider.sanitize(value);

            value = value.replace('\n', '<br>');

            $header.html(label);
            $text.html(value);
            $text.targetBlank();

            $text.toggleExpandText(trimChars);

            label = label.trim();
            label = label.toLowerCase();

            $elem.addClass(label.toCssClass());

            return $elem;
        };

        MoreInfoRightPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);

            this.$main.height(this.$element.height() - this.$top.height() - this.$main.verticalMargins());
        };
        return MoreInfoRightPanel;
    })(baseRight.RightPanel);
    exports.MoreInfoRightPanel = MoreInfoRightPanel;
});

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define('modules/uv-shared-module/footerPanel',["require", "exports", "../../utils", "./baseExtension", "./baseView"], function(require, exports, utils, baseExtension, baseView) {
    var FooterPanel = (function (_super) {
        __extends(FooterPanel, _super);
        function FooterPanel($element) {
            _super.call(this, $element);
        }
        FooterPanel.prototype.create = function () {
            var _this = this;
            this.setConfig('footerPanel');

            _super.prototype.create.call(this);

            $.subscribe(baseExtension.BaseExtension.TOGGLE_FULLSCREEN, function () {
                _this.toggleFullScreen();
            });

            this.$options = $('<div class="options"></div>');
            this.$element.append(this.$options);

            this.$embedButton = $('<a href="#" class="embed" title="' + this.content.embed + '">' + this.content.embed + '</a>');
            this.$options.append(this.$embedButton);
            this.$embedButton.attr('tabindex', '6');

            this.$downloadButton = $('<a class="download" title="' + this.content.download + '">' + this.content.download + '</a>');
            this.$options.prepend(this.$downloadButton);

            this.$fullScreenBtn = $('<a href="#" class="fullScreen" title="' + this.content.fullScreen + '">' + this.content.fullScreen + '</a>');
            this.$options.append(this.$fullScreenBtn);
            this.$fullScreenBtn.attr('tabindex', '5');

            this.$embedButton.onPressed(function () {
                $.publish(FooterPanel.EMBED);
            });

            this.$downloadButton.on('click', function (e) {
                e.preventDefault();

                $.publish(FooterPanel.DOWNLOAD);
            });

            this.$fullScreenBtn.on('click', function (e) {
                e.preventDefault();
                $.publish(baseExtension.BaseExtension.TOGGLE_FULLSCREEN);
            });

            if (!utils.Utils.getBool(this.options.embedEnabled, true)) {
                this.$embedButton.hide();
            }

            if (!utils.Utils.getBool(this.options.downloadEnabled, true)) {
                this.$downloadButton.hide();
            }

            if (!utils.Utils.getBool(this.options.fullscreenEnabled, true)) {
                this.$fullScreenBtn.hide();
            }

            if (this.provider.isLightbox) {
                this.$fullScreenBtn.addClass('lightbox');
            }

            if (utils.Utils.getBool(this.options.minimiseButtons, false)) {
                this.$options.addClass('minimiseButtons');
            }
        };

        FooterPanel.prototype.toggleFullScreen = function () {
            if (this.extension.isFullScreen) {
                this.$fullScreenBtn.swapClass('fullScreen', 'exitFullscreen');
                this.$fullScreenBtn.text(this.content.exitFullScreen);
                this.$fullScreenBtn.attr('title', this.content.exitFullScreen);
            } else {
                this.$fullScreenBtn.swapClass('exitFullscreen', 'fullScreen');
                this.$fullScreenBtn.text(this.content.fullScreen);
                this.$fullScreenBtn.attr('title', this.content.fullScreen);
            }
        };

        FooterPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        FooterPanel.EMBED = 'footer.onEmbed';
        FooterPanel.DOWNLOAD = 'footer.onDownload';
        return FooterPanel;
    })(baseView.BaseView);
    exports.FooterPanel = FooterPanel;
});

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define('modules/uv-dialogues-module/helpDialogue',["require", "exports", "../uv-shared-module/dialogue"], function(require, exports, dialogue) {
    var HelpDialogue = (function (_super) {
        __extends(HelpDialogue, _super);
        function HelpDialogue($element) {
            _super.call(this, $element);
        }
        HelpDialogue.prototype.create = function () {
            var _this = this;
            this.setConfig('helpDialogue');

            _super.prototype.create.call(this);

            $.subscribe(HelpDialogue.SHOW_HELP_DIALOGUE, function (e, params) {
                _this.open();
            });

            $.subscribe(HelpDialogue.HIDE_HELP_DIALOGUE, function (e) {
                _this.close();
            });

            this.$title = $('<h1></h1>');
            this.$content.append(this.$title);

            this.$scroll = $('<div class="scroll"></div>');
            this.$content.append(this.$scroll);

            this.$message = $('<p></p>');
            this.$scroll.append(this.$message);

            this.$title.text(this.content.title);
            this.$message.html(this.content.text);

            this.$message.targetBlank();

            this.$element.hide();
        };

        HelpDialogue.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        HelpDialogue.SHOW_HELP_DIALOGUE = 'onShowHelpDialogue';
        HelpDialogue.HIDE_HELP_DIALOGUE = 'onHideHelpDialogue';
        return HelpDialogue;
    })(dialogue.Dialogue);
    exports.HelpDialogue = HelpDialogue;
});

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define('modules/uv-dialogues-module/embedDialogue',["require", "exports", "../../utils", "../uv-shared-module/dialogue"], function(require, exports, utils, dialogue) {
    var EmbedDialogue = (function (_super) {
        __extends(EmbedDialogue, _super);
        function EmbedDialogue($element) {
            _super.call(this, $element);
        }
        EmbedDialogue.prototype.create = function () {
            var _this = this;
            this.setConfig('embedDialogue');

            _super.prototype.create.call(this);

            var that = this;

            $.subscribe(EmbedDialogue.SHOW_EMBED_DIALOGUE, function (e, params) {
                _this.open();
                _this.formatCode();
            });

            $.subscribe(EmbedDialogue.HIDE_EMBED_DIALOGUE, function (e) {
                _this.close();
            });

            this.smallWidth = 560;
            this.smallHeight = 420;

            this.mediumWidth = 640;
            this.mediumHeight = 480;

            this.largeWidth = 800;
            this.largeHeight = 600;

            this.currentWidth = this.smallWidth;
            this.currentHeight = this.smallHeight;

            this.$title = $('<h1>' + this.content.title + '</h1>');
            this.$content.append(this.$title);

            this.$intro = $('<p>' + this.content.instructions + '</p>');
            this.$content.append(this.$intro);

            this.$code = $('<textarea class="code"></textarea>');
            this.$content.append(this.$code);

            this.$sizes = $('<div class="sizes"></div>');
            this.$content.append(this.$sizes);

            this.$smallSize = $('<div class="size small"></div>');
            this.$sizes.append(this.$smallSize);
            this.$smallSize.append('<p>' + this.smallWidth + ' x ' + this.smallHeight + '</p>');
            this.$smallSize.append('<div class="box"></div>');

            this.$mediumSize = $('<div class="size medium"></div>');
            this.$sizes.append(this.$mediumSize);
            this.$mediumSize.append('<p>' + this.mediumWidth + ' x ' + this.mediumHeight + '</p>');
            this.$mediumSize.append('<div class="box"></div>');

            this.$largeSize = $('<div class="size large"></div>');
            this.$sizes.append(this.$largeSize);
            this.$largeSize.append('<p>' + this.largeWidth + ' x ' + this.largeHeight + '</p>');
            this.$largeSize.append('<div class="box"></div>');

            this.$customSize = $('<div class="size custom"></div>');
            this.$sizes.append(this.$customSize);
            this.$customSize.append('<p>' + this.content.customSize + '</p>');
            this.$customSizeWrap = $('<div class="wrap"></div>');
            this.$customSize.append(this.$customSizeWrap);
            this.$customSizeWidthWrap = $('<div class="width"></div>');
            this.$customSizeWrap.append(this.$customSizeWidthWrap);
            this.$customSizeWidthWrap.append('<label for="width">' + this.content.width + '</label>');
            this.$customWidth = $('<input id="width" type="text" maxlength="5"></input>');
            this.$customSizeWidthWrap.append(this.$customWidth);
            this.$customSizeWidthWrap.append('<span>px</span>');
            this.$customSizeHeightWrap = $('<div class="height"></div>');
            this.$customSizeWrap.append(this.$customSizeHeightWrap);
            this.$customSizeHeightWrap.append('<label for="height">' + this.content.height + '</label>');
            this.$customHeight = $('<input id="height" type="text" maxlength="5"></input>');
            this.$customSizeHeightWrap.append(this.$customHeight);
            this.$customSizeHeightWrap.append('<span>px</span>');

            this.$code.focus(function () {
                $(this).select();
            });

            this.$code.mouseup(function (e) {
                e.preventDefault();
            });

            this.$smallSize.click(function (e) {
                e.preventDefault();

                _this.currentWidth = _this.smallWidth;
                _this.currentHeight = _this.smallHeight;

                _this.formatCode();
            });

            this.$mediumSize.click(function (e) {
                e.preventDefault();

                _this.currentWidth = _this.mediumWidth;
                _this.currentHeight = _this.mediumHeight;

                _this.formatCode();
            });

            this.$largeSize.click(function (e) {
                e.preventDefault();

                _this.currentWidth = _this.largeWidth;
                _this.currentHeight = _this.largeHeight;

                _this.formatCode();
            });

            this.$smallSize.addClass('selected');

            this.$sizes.find('.size').click(function (e) {
                e.preventDefault();

                that.$sizes.find('.size').removeClass('selected');
                $(this).addClass('selected');
            });

            this.$customWidth.keydown(function (event) {
                utils.Utils.numericalInput(event);
            });

            this.$customWidth.keyup(function (event) {
                _this.getCustomSize();
            });

            this.$customHeight.keydown(function (event) {
                utils.Utils.numericalInput(event);
            });

            this.$customHeight.keyup(function (event) {
                _this.getCustomSize();
            });

            this.$element.hide();
        };

        EmbedDialogue.prototype.getCustomSize = function () {
            this.currentWidth = this.$customWidth.val();
            this.currentHeight = this.$customHeight.val();

            this.formatCode();
        };

        EmbedDialogue.prototype.formatCode = function () {
        };

        EmbedDialogue.prototype.resize = function () {
            this.$element.css({
                'top': this.extension.height() - this.$element.outerHeight(true)
            });
        };
        EmbedDialogue.SHOW_EMBED_DIALOGUE = 'onShowEmbedDialogue';
        EmbedDialogue.HIDE_EMBED_DIALOGUE = 'onHideEmbedDialogue';
        return EmbedDialogue;
    })(dialogue.Dialogue);
    exports.EmbedDialogue = EmbedDialogue;
});

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define('extensions/uv-seadragon-extension/embedDialogue',["require", "exports", "../../modules/uv-dialogues-module/embedDialogue", "../../modules/uv-seadragoncenterpanel-module/seadragonCenterPanel"], function(require, exports, embed, baseCenter) {
    var EmbedDialogue = (function (_super) {
        __extends(EmbedDialogue, _super);
        function EmbedDialogue($element) {
            var _this = this;
            _super.call(this, $element);

            $.subscribe(baseCenter.SeadragonCenterPanel.SEADRAGON_OPEN, function (viewer) {
                _this.formatCode();
            });

            $.subscribe(baseCenter.SeadragonCenterPanel.SEADRAGON_ANIMATION_FINISH, function (viewer) {
                _this.formatCode();
            });
        }
        EmbedDialogue.prototype.create = function () {
            this.setConfig('embedDialogue');

            _super.prototype.create.call(this);
        };

        EmbedDialogue.prototype.formatCode = function () {
            var zoom = this.extension.getViewerBounds();
            var rotation = this.extension.getViewerRotation();

            this.code = this.provider.getEmbedScript(this.provider.canvasIndex, zoom, this.currentWidth, this.currentHeight, rotation, this.options.embedTemplate);

            this.$code.val(this.code);
        };

        EmbedDialogue.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        return EmbedDialogue;
    })(embed.EmbedDialogue);
    exports.EmbedDialogue = EmbedDialogue;
});

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define('extensions/uv-seadragon-extension/settingsDialogue',["require", "exports", "../../modules/uv-dialogues-module/settingsDialogue"], function(require, exports, baseSettings) {
    var SettingsDialogue = (function (_super) {
        __extends(SettingsDialogue, _super);
        function SettingsDialogue($element) {
            _super.call(this, $element);
        }
        SettingsDialogue.prototype.create = function () {
            var _this = this;
            this.setConfig('settingsDialogue');

            _super.prototype.create.call(this);

            this.$pagingEnabled = $('<div class="setting pagingEnabled"></div>');
            this.$scroll.append(this.$pagingEnabled);

            this.$pagingEnabledCheckbox = $('<input id="pagingEnabled" type="checkbox" />');
            this.$pagingEnabled.append(this.$pagingEnabledCheckbox);

            this.$pagingEnabledLabel = $('<label for="pagingEnabled">' + this.content.pagingEnabled + '</label>');
            this.$pagingEnabled.append(this.$pagingEnabledLabel);

            this.$preserveViewport = $('<div class="setting preserveViewport"></div>');
            this.$scroll.append(this.$preserveViewport);

            this.$preserveViewportCheckbox = $('<input id="preserveViewport" type="checkbox" />');
            this.$preserveViewport.append(this.$preserveViewportCheckbox);

            this.$preserveViewportLabel = $('<label for="preserveViewport">' + this.content.preserveViewport + '</label>');
            this.$preserveViewport.append(this.$preserveViewportLabel);

            this.$pagingEnabledCheckbox.change(function () {
                var settings = _this.getSettings();

                if (_this.$pagingEnabledCheckbox.is(":checked")) {
                    settings.pagingEnabled = true;
                } else {
                    settings.pagingEnabled = false;
                }

                _this.updateSettings(settings);
            });

            this.$preserveViewportCheckbox.change(function () {
                var settings = _this.getSettings();

                if (_this.$preserveViewportCheckbox.is(":checked")) {
                    settings.preserveViewport = true;
                } else {
                    settings.preserveViewport = false;
                }

                _this.updateSettings(settings);
            });
        };

        SettingsDialogue.prototype.open = function () {
            _super.prototype.open.call(this);

            var settings = this.getSettings();

            if (settings.pagingEnabled) {
                this.$pagingEnabledCheckbox.attr("checked", "checked");
            } else {
                this.$pagingEnabledCheckbox.removeAttr("checked");
            }

            if (settings.preserveViewport) {
                this.$preserveViewportCheckbox.attr("checked", "checked");
            } else {
                this.$preserveViewportCheckbox.removeAttr("checked");
            }
        };
        return SettingsDialogue;
    })(baseSettings.SettingsDialogue);
    exports.SettingsDialogue = SettingsDialogue;
});

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define('modules/uv-dialogues-module/externalContentDialogue',["require", "exports", "../uv-shared-module/dialogue"], function(require, exports, dialogue) {
    var ExternalContentDialogue = (function (_super) {
        __extends(ExternalContentDialogue, _super);
        function ExternalContentDialogue($element) {
            _super.call(this, $element);
        }
        ExternalContentDialogue.prototype.create = function () {
            var _this = this;
            this.setConfig('externalContentDialogue');

            _super.prototype.create.call(this);

            $.subscribe(ExternalContentDialogue.SHOW_EXTERNALCONTENT_DIALOGUE, function (e, params) {
                _this.open();
                _this.$iframe.prop('src', params.uri);
            });

            $.subscribe(ExternalContentDialogue.HIDE_EXTERNALCONTENT_DIALOGUE, function (e) {
                _this.close();
            });

            this.$iframe = $('<iframe></iframe>');
            this.$content.append(this.$iframe);

            this.$element.hide();
        };

        ExternalContentDialogue.prototype.resize = function () {
            _super.prototype.resize.call(this);

            this.$iframe.width(this.$content.width());
            this.$iframe.height(this.$content.height());
        };
        ExternalContentDialogue.SHOW_EXTERNALCONTENT_DIALOGUE = 'onShowExternalContentDialogue';
        ExternalContentDialogue.HIDE_EXTERNALCONTENT_DIALOGUE = 'onHideExternalContentDialogue';
        return ExternalContentDialogue;
    })(dialogue.Dialogue);
    exports.ExternalContentDialogue = ExternalContentDialogue;
});

define('extensions/uv-seadragon-extension/dependencies',[],function() {
    return {
        'openseadragon': './js/openseadragon'
    };

    var Dependencies = (function () {
        function Dependencies() {
        }
        return Dependencies;
    })();
    exports.Dependencies = Dependencies;
});

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define('extensions/uv-seadragon-extension/extension',["require", "exports", "../../modules/uv-shared-module/baseExtension", "../../utils", "../../modules/uv-shared-module/baseProvider", "../../modules/uv-shared-module/shell", "../../modules/uv-pagingheaderpanel-module/pagingHeaderPanel", "../../modules/uv-shared-module/leftPanel", "../../modules/uv-treeviewleftpanel-module/treeViewLeftPanel", "../../modules/uv-treeviewleftpanel-module/thumbsView", "../../modules/uv-treeviewleftpanel-module/galleryView", "../../modules/uv-treeviewleftpanel-module/treeView", "../../modules/uv-seadragoncenterpanel-module/seadragonCenterPanel", "../../modules/uv-seadragoncenterpanel-module/seadragonCenterPanel", "../../modules/uv-shared-module/rightPanel", "../../modules/uv-moreinforightpanel-module/moreInfoRightPanel", "../../modules/uv-shared-module/footerPanel", "../../modules/uv-dialogues-module/helpDialogue", "../../extensions/uv-seadragon-extension/embedDialogue", "../../extensions/uv-seadragon-extension/settingsDialogue", "../../modules/uv-dialogues-module/externalContentDialogue", "../../uv-seadragon-extension-dependencies"], function(require, exports, baseExtension, utils, baseProvider, shell, header, baseLeft, left, thumbsView, galleryView, treeView, baseCenter, center, baseRight, right, footer, help, embed, settingsDialogue, externalContentDialogue, dependencies) {
    var Extension = (function (_super) {
        __extends(Extension, _super);
        function Extension(provider) {
            _super.call(this, provider);
            this.currentRotation = 0;
        }
        Extension.prototype.create = function (overrideDependencies) {
            var _this = this;
            _super.prototype.create.call(this);

            var that = this;

            $.subscribe(header.PagingHeaderPanel.FIRST, function (e) {
                _this.viewPage(_this.provider.getFirstPageIndex());
            });

            $.subscribe(Extension.HOME, function (e) {
                _this.viewPage(_this.provider.getFirstPageIndex());
            });

            $.subscribe(header.PagingHeaderPanel.LAST, function (e) {
                _this.viewPage(_this.provider.getLastPageIndex());
            });

            $.subscribe(Extension.END, function (e) {
                _this.viewPage(_this.provider.getLastPageIndex());
            });

            $.subscribe(header.PagingHeaderPanel.PREV, function (e) {
                _this.viewPage(_this.provider.getPrevPageIndex());
            });

            $.subscribe(Extension.PAGE_UP, function (e) {
                _this.viewPage(_this.provider.getPrevPageIndex());
            });

            $.subscribe(header.PagingHeaderPanel.NEXT, function (e) {
                _this.viewPage(_this.provider.getNextPageIndex());
            });

            $.subscribe(Extension.PAGE_DOWN, function (e) {
                _this.viewPage(_this.provider.getNextPageIndex());
            });

            $.subscribe(header.PagingHeaderPanel.MODE_CHANGED, function (e, mode) {
                Extension.mode = mode;
                $.publish(Extension.SETTINGS_CHANGED, [mode]);
            });

            $.subscribe(header.PagingHeaderPanel.PAGE_SEARCH, function (e, value) {
                _this.viewLabel(value);
            });

            $.subscribe(header.PagingHeaderPanel.IMAGE_SEARCH, function (e, index) {
                _this.viewPage(index);
            });

            $.subscribe(header.PagingHeaderPanel.UPDATE_SETTINGS, function (e) {
                _this.updateSettings();
            });

            $.subscribe(settingsDialogue.SettingsDialogue.UPDATE_SETTINGS, function (e) {
                _this.updateSettings();
            });

            $.subscribe(treeView.TreeView.NODE_SELECTED, function (e, data) {
                _this.treeNodeSelected(data);
            });

            $.subscribe(thumbsView.ThumbsView.THUMB_SELECTED, function (e, index) {
                _this.viewPage(index);
            });

            $.subscribe(galleryView.GalleryView.THUMB_SELECTED, function (e, index) {
                _this.viewPage(index);
            });

            $.subscribe(baseLeft.LeftPanel.OPEN_LEFT_PANEL, function (e) {
                _this.resize();
            });

            $.subscribe(baseLeft.LeftPanel.CLOSE_LEFT_PANEL, function (e) {
                _this.resize();
            });

            $.subscribe(baseRight.RightPanel.OPEN_RIGHT_PANEL, function (e) {
                _this.resize();
            });

            $.subscribe(baseRight.RightPanel.CLOSE_RIGHT_PANEL, function (e) {
                _this.resize();
            });

            $.subscribe(left.TreeViewLeftPanel.EXPAND_FULL_START, function (e) {
                shell.Shell.$centerPanel.hide();
                shell.Shell.$rightPanel.hide();
            });

            $.subscribe(left.TreeViewLeftPanel.COLLAPSE_FULL_FINISH, function (e) {
                shell.Shell.$centerPanel.show();
                shell.Shell.$rightPanel.show();
                _this.resize();
            });

            $.subscribe(baseCenter.SeadragonCenterPanel.SEADRAGON_ANIMATION_FINISH, function (e, viewer) {
                if (_this.centerPanel) {
                    _this.setParam(2 /* zoom */, _this.centerPanel.serialiseBounds(_this.centerPanel.currentBounds));
                }
            });

            $.subscribe(baseCenter.SeadragonCenterPanel.SEADRAGON_ROTATION, function (e, rotation) {
                _this.currentRotation = rotation;
                _this.setParam(3 /* rotation */, rotation);
            });

            $.subscribe(baseCenter.SeadragonCenterPanel.PREV, function (e) {
                _this.viewPage(_this.provider.getPrevPageIndex());
            });

            $.subscribe(baseCenter.SeadragonCenterPanel.NEXT, function (e) {
                _this.viewPage(_this.provider.getNextPageIndex());
            });

            $.subscribe(footer.FooterPanel.EMBED, function (e) {
                $.publish(embed.EmbedDialogue.SHOW_EMBED_DIALOGUE);
            });

            $.subscribe(footer.FooterPanel.DOWNLOAD, function (e) {
                var c = _this.provider.getCanvasByIndex(_this.provider.canvasIndex);
                c = c['@id'];
            });

            var deps = overrideDependencies || dependencies;
            require(_.values(deps), function () {
                that.createModules();

                that.setParams();

                var canvasIndex;

                if (!that.provider.isReload) {
                    canvasIndex = parseInt(that.getParam(1 /* canvasIndex */)) || that.provider.getStartCanvasIndex();
                }

                if (that.provider.isCanvasIndexOutOfRange(canvasIndex)) {
                    that.showDialogue(that.provider.config.content.canvasIndexOutOfRange);
                    return;
                }

                that.viewPage(canvasIndex || that.provider.getStartCanvasIndex());

                $.publish(baseExtension.BaseExtension.RESIZE);

                that.setDefaultFocus();

                $.publish(Extension.CREATED);
            });
        };

        Extension.prototype.createModules = function () {
            this.headerPanel = new header.PagingHeaderPanel(shell.Shell.$headerPanel);

            if (this.isLeftPanelEnabled()) {
                this.leftPanel = new left.TreeViewLeftPanel(shell.Shell.$leftPanel);
            }

            this.centerPanel = new center.SeadragonCenterPanel(shell.Shell.$centerPanel);

            if (this.isRightPanelEnabled()) {
                this.rightPanel = new right.MoreInfoRightPanel(shell.Shell.$rightPanel);
            }

            this.footerPanel = new footer.FooterPanel(shell.Shell.$footerPanel);

            this.$helpDialogue = $('<div class="overlay help"></div>');
            shell.Shell.$overlays.append(this.$helpDialogue);
            this.helpDialogue = new help.HelpDialogue(this.$helpDialogue);

            this.$embedDialogue = $('<div class="overlay embed"></div>');
            shell.Shell.$overlays.append(this.$embedDialogue);
            this.embedDialogue = new embed.EmbedDialogue(this.$embedDialogue);

            this.$settingsDialogue = $('<div class="overlay settings"></div>');
            shell.Shell.$overlays.append(this.$settingsDialogue);
            this.settingsDialogue = new settingsDialogue.SettingsDialogue(this.$settingsDialogue);

            this.$externalContentDialogue = $('<div class="overlay externalContent"></div>');
            shell.Shell.$overlays.append(this.$externalContentDialogue);
            this.externalContentDialogue = new externalContentDialogue.ExternalContentDialogue(this.$externalContentDialogue);

            if (this.isLeftPanelEnabled()) {
                this.leftPanel.init();
            }

            if (this.isRightPanelEnabled()) {
                this.rightPanel.init();
            }
        };

        Extension.prototype.updateSettings = function () {
            var _this = this;
            this.provider.reloadManifest(function () {
                $.publish(baseExtension.BaseExtension.RELOAD_MANIFEST);
                _this.viewPage(_this.provider.canvasIndex, true);
                $.publish(Extension.SETTINGS_CHANGED);
            });
        };

        Extension.prototype.setDefaultFocus = function () {
            setTimeout(function () {
                $('[tabindex=1]').focus();
            }, 1);
        };

        Extension.prototype.setParams = function () {
            if (!this.provider.isHomeDomain)
                return;

            this.setParam(0 /* sequenceIndex */, this.provider.sequenceIndex);
        };

        Extension.prototype.isLeftPanelEnabled = function () {
            return utils.Utils.getBool(this.provider.config.options.leftPanelEnabled, true) && this.provider.isMultiCanvas();
        };

        Extension.prototype.isRightPanelEnabled = function () {
            return utils.Utils.getBool(this.provider.config.options.rightPanelEnabled, true);
        };

        Extension.prototype.viewPage = function (canvasIndex, isReload) {
            var _this = this;
            if (canvasIndex == -1)
                return;

            if (this.provider.isPaged() && !isReload) {
                var indices = this.provider.getPagedIndices(canvasIndex);

                if (indices.contains(this.provider.canvasIndex)) {
                    this.viewCanvas(canvasIndex, function () {
                        _this.setParam(1 /* canvasIndex */, canvasIndex);
                    });

                    return;
                }
            }

            this.viewCanvas(canvasIndex, function () {
                var canvas = _this.provider.getCanvasByIndex(canvasIndex);
                var uri = _this.provider.getImageUri(canvas);
                $.publish(Extension.OPEN_MEDIA, [uri]);
                _this.setParam(1 /* canvasIndex */, canvasIndex);
            });
        };

        Extension.prototype.getMode = function () {
            if (Extension.mode)
                return Extension.mode;

            switch (this.provider.getManifestType()) {
                case 'monograph':
                    return Extension.PAGE_MODE;
                    break;
                case 'archive', 'boundmanuscript':
                    return Extension.IMAGE_MODE;
                    break;
                default:
                    return Extension.IMAGE_MODE;
            }
        };

        Extension.prototype.getViewerBounds = function () {
            if (!this.centerPanel)
                return;

            var bounds = this.centerPanel.getBounds();

            if (bounds)
                return this.centerPanel.serialiseBounds(bounds);

            return "";
        };

        Extension.prototype.getViewerRotation = function () {
            if (!this.centerPanel)
                return;

            return this.currentRotation;
        };

        Extension.prototype.viewStructure = function (path) {
            var structure = this.provider.getStructureByPath(path);

            if (!structure)
                return;

            var canvas = structure.canvases[0];

            var index = this.provider.getCanvasIndexById(canvas['@id']);

            this.viewPage(index);
        };

        Extension.prototype.viewLabel = function (label) {
            if (!label) {
                this.showDialogue(this.provider.config.modules.genericDialogue.content.emptyValue);
                $.publish(Extension.CANVAS_INDEX_CHANGE_FAILED);
                return;
            }

            var index = this.provider.getCanvasIndexByLabel(label);

            if (index != -1) {
                this.viewPage(index);
            } else {
                this.showDialogue(this.provider.config.modules.genericDialogue.content.pageNotFound);
                $.publish(Extension.CANVAS_INDEX_CHANGE_FAILED);
            }
        };

        Extension.prototype.treeNodeSelected = function (data) {
            if (!data.type)
                return;

            if (data.type == 'manifest') {
                this.viewManifest(data);
            } else {
                this.viewStructure(data.path);
            }
        };
        Extension.PAGE_MODE = "pageMode";
        Extension.IMAGE_MODE = "imageMode";
        return Extension;
    })(baseExtension.BaseExtension);
    exports.Extension = Extension;
});

define('modules/uv-shared-module/thumb',["require", "exports"], function(require, exports) {
    var Thumb = (function () {
        function Thumb(index, url, label, width, height, visible) {
            this.index = index;
            this.url = url;
            this.label = label;
            this.width = width;
            this.height = height;
            this.visible = visible;
        }
        return Thumb;
    })();
    
    return Thumb;
});

define('modules/uv-shared-module/baseIIIFProvider',["require", "exports", "../../bootstrapParams", "../../utils", "./treeNode", "./thumb"], function(require, exports, BootstrapParams, utils, TreeNode, Thumb) {
    var util = utils.Utils;

    (function (params) {
        params[params["sequenceIndex"] = 0] = "sequenceIndex";
        params[params["canvasIndex"] = 1] = "canvasIndex";
        params[params["zoom"] = 2] = "zoom";
        params[params["rotation"] = 3] = "rotation";
    })(exports.params || (exports.params = {}));
    var params = exports.params;

    var BaseProvider = (function () {
        function BaseProvider(bootstrapper, config, manifest) {
            this.paramMap = ['si', 'ci', 'z', 'r'];
            this.options = {
                thumbsUriTemplate: "{0}{1}",
                timestampUris: false,
                mediaUriTemplate: "{0}{1}"
            };
            this.bootstrapper = bootstrapper;
            this.config = config;
            this.manifest = manifest;

            this.manifestUri = this.bootstrapper.params.manifestUri;
            this.jsonp = this.bootstrapper.params.jsonp;
            this.locale = this.bootstrapper.params.getLocale();
            this.isHomeDomain = this.bootstrapper.params.isHomeDomain;
            this.isReload = this.bootstrapper.params.isReload;
            this.embedDomain = this.bootstrapper.params.embedDomain;
            this.isOnlyInstance = this.bootstrapper.params.isOnlyInstance;
            this.embedScriptUri = this.bootstrapper.params.embedScriptUri;
            this.domain = this.bootstrapper.params.domain;
            this.isLightbox = this.bootstrapper.params.isLightbox;

            if (this.isHomeDomain && !this.isReload) {
                this.sequenceIndex = parseInt(util.getHashParameter(this.paramMap[0 /* sequenceIndex */], parent.document));
            }

            if (!this.sequenceIndex) {
                this.sequenceIndex = parseInt(util.getQuerystringParameter(this.paramMap[0 /* sequenceIndex */])) || 0;
            }

            this.load();
        }
        BaseProvider.prototype.load = function () {
            this.sequence = this.manifest.sequences[this.sequenceIndex];

            for (var i = 0; i < this.manifest.sequences.length; i++) {
                if (!this.manifest.sequences[i].canvases) {
                    this.manifest.sequences[i] = {};
                }
            }

            this.parseStructure();
        };

        BaseProvider.prototype.reload = function (params) {
            var p = new BootstrapParams();
            p.isReload = true;

            if (params) {
                p = $.extend(p, params);
            }

            this.bootstrapper.bootStrap(p);
        };

        BaseProvider.prototype.corsEnabled = function () {
            return Modernizr.cors && !this.jsonp;
        };

        BaseProvider.prototype.reloadManifest = function (callback) {
            var _this = this;
            this.rootStructure = null;
            var manifestUri = this.manifestUri;

            manifestUri = this.addTimestamp(manifestUri);

            if (this.corsEnabled()) {
                $.getJSON(manifestUri, function (data) {
                    _this.manifest = data;

                    _this.load();

                    callback();
                });
            } else {
                window.manifestCallback = function (data) {
                    _this.manifest = data;

                    _this.load();

                    callback();
                };

                $.ajax({
                    url: manifestUri,
                    type: 'GET',
                    dataType: 'jsonp',
                    jsonp: 'callback',
                    jsonpCallback: 'manifestCallback'
                });
            }
        };

        BaseProvider.prototype.getManifestType = function () {
            return 'monograph';
        };

        BaseProvider.prototype.getSequenceType = function () {
            return 'seadragon-iiif';
        };

        BaseProvider.prototype.getAttribution = function () {
            return this.getLocalisedValue(this.manifest.attribution);
        };

        BaseProvider.prototype.getLicense = function () {
            return this.manifest.license;
        };

        BaseProvider.prototype.getLogo = function () {
            return this.manifest.logo;
        };

        BaseProvider.prototype.getTitle = function () {
            return this.manifest.label;
        };

        BaseProvider.prototype.getSeeAlso = function () {
            return this.manifest.seeAlso;
        };

        BaseProvider.prototype.getLastCanvasLabel = function () {
            for (var i = this.sequence.canvases.length - 1; i >= 0; i--) {
                var canvas = this.sequence.canvases[i];

                var regExp = /\d/;

                if (regExp.test(canvas.label)) {
                    return this.getLocalisedValue(canvas.label);
                }
            }

            return '-';
        };

        BaseProvider.prototype.isCanvasIndexOutOfRange = function (canvasIndex) {
            return canvasIndex > this.getTotalCanvases() - 1;
        };

        BaseProvider.prototype.isFirstCanvas = function (canvasIndex) {
            if (typeof (canvasIndex) === 'undefined')
                canvasIndex = this.canvasIndex;
            return canvasIndex == 0;
        };

        BaseProvider.prototype.isLastCanvas = function (canvasIndex) {
            if (typeof (canvasIndex) === 'undefined')
                canvasIndex = this.canvasIndex;
            return canvasIndex == this.getTotalCanvases() - 1;
        };

        BaseProvider.prototype.isSeeAlsoEnabled = function () {
            return this.config.options.seeAlsoEnabled !== false;
        };

        BaseProvider.prototype.getCanvasByIndex = function (index) {
            return this.sequence.canvases[index];
        };

        BaseProvider.prototype.getStructureByCanvasIndex = function (index) {
            if (index == -1)
                return null;
            var canvas = this.getCanvasByIndex(index);
            return this.getCanvasStructure(canvas);
        };

        BaseProvider.prototype.getCanvasStructure = function (canvas) {
            if (canvas.structures) {
                return canvas.structures.last();
            }

            return null;
        };

        BaseProvider.prototype.getCurrentCanvas = function () {
            return this.sequence.canvases[this.canvasIndex];
        };

        BaseProvider.prototype.getTotalCanvases = function () {
            return this.sequence.canvases.length;
        };

        BaseProvider.prototype.isMultiCanvas = function () {
            return this.sequence.canvases.length > 1;
        };

        BaseProvider.prototype.isMultiSequence = function () {
            return this.manifest.sequences.length > 1;
        };

        BaseProvider.prototype.isPaged = function () {
            return this.sequence.viewingHint && (this.sequence.viewingHint == "paged") && this.getSettings().pagingEnabled;
        };

        BaseProvider.prototype.getMediaUri = function (mediaUri) {
            var baseUri = this.options.mediaBaseUri || "";
            var template = this.options.mediaUriTemplate;
            var uri = String.prototype.format(template, baseUri, mediaUri);

            return uri;
        };

        BaseProvider.prototype.setMediaUri = function (canvas) {
        };

        BaseProvider.prototype.getPagedIndices = function (canvasIndex) {
            if (typeof (canvasIndex) === 'undefined')
                canvasIndex = this.canvasIndex;

            var indices = [];

            if (this.isFirstCanvas(canvasIndex) || this.isLastCanvas(canvasIndex)) {
                indices = [canvasIndex];
            } else if (canvasIndex % 2) {
                indices = [canvasIndex, canvasIndex + 1];
            } else {
                indices = [canvasIndex - 1, canvasIndex];
            }

            if (this.getViewingDirection() === "right-to-left") {
                return indices.reverse();
            } else {
                return indices;
            }
        };

        BaseProvider.prototype.getViewingDirection = function () {
            return this.sequence.viewingDirection || "left-to-right";
        };

        BaseProvider.prototype.getFirstPageIndex = function () {
            return 0;
        };

        BaseProvider.prototype.getLastPageIndex = function () {
            return this.getTotalCanvases() - 1;
        };

        BaseProvider.prototype.getPrevPageIndex = function (canvasIndex) {
            if (typeof (canvasIndex) === 'undefined')
                canvasIndex = this.canvasIndex;

            var index;

            if (this.isPaged()) {
                var indices = this.getPagedIndices(canvasIndex);

                if (this.getViewingDirection() == "right-to-left") {
                    index = indices.last() - 1;
                } else {
                    index = indices[0] - 1;
                }
            } else {
                index = canvasIndex - 1;
            }

            return index;
        };

        BaseProvider.prototype.getNextPageIndex = function (canvasIndex) {
            if (typeof (canvasIndex) === 'undefined')
                canvasIndex = this.canvasIndex;

            var index;

            if (this.isPaged()) {
                var indices = this.getPagedIndices(canvasIndex);

                if (this.getViewingDirection() == "right-to-left") {
                    index = indices[0] + 1;
                } else {
                    index = indices.last() + 1;
                }
            } else {
                index = canvasIndex + 1;
            }

            if (index > this.getTotalCanvases() - 1) {
                return -1;
            }

            return index;
        };

        BaseProvider.prototype.getStartCanvasIndex = function () {
            if (this.sequence.startCanvas) {
                for (var i = 0; i < this.sequence.canvases.length; i++) {
                    var canvas = this.sequence.canvases[i];

                    if (canvas["@id"] == this.sequence.startCanvas)
                        return i;
                }
            }

            return 0;
        };

        BaseProvider.prototype.addTimestamp = function (uri) {
            return uri + "?t=" + util.getTimeStamp();
        };

        BaseProvider.prototype.isDeepLinkingEnabled = function () {
            return (this.isHomeDomain && this.isOnlyInstance);
        };

        BaseProvider.prototype.getThumbUri = function (canvas, width, height) {
            var uri;

            if (canvas.resources) {
                uri = canvas.resources[0].resource.service['@id'];
            } else if (canvas.images && canvas.images[0].resource.service) {
                uri = canvas.images[0].resource.service['@id'];
            } else {
                return "";
            }

            var tile = 'full/' + width + ',' + height + '/0/default.jpg';

            if (uri.endsWith('/')) {
                uri += tile;
            } else {
                uri += '/' + tile;
            }

            return uri;
        };

        BaseProvider.prototype.getThumbs = function (width, height) {
            var thumbs = [];

            for (var i = 0; i < this.getTotalCanvases(); i++) {
                var canvas = this.sequence.canvases[i];

                var heightRatio = canvas.height / canvas.width;

                if (heightRatio) {
                    height = Math.floor(width * heightRatio);
                }

                var uri = this.getThumbUri(canvas, width, height);

                thumbs.push(new Thumb(i, uri, this.getLocalisedValue(canvas.label), width, height, true));
            }

            return thumbs;
        };

        BaseProvider.prototype.getLocalisedValue = function (prop) {
            if (!(prop instanceof Array)) {
                return prop;
            }

            for (var i = 0; i < prop.length; i++) {
                var value = prop[i];
                var language = value['@language'];

                if (this.locale === language) {
                    return value['@value'];
                }
            }

            for (var i = 0; i < prop.length; i++) {
                var value = prop[i];
                var language = value['@language'];

                var match = this.locale.substr(0, this.locale.indexOf('-'));

                if (language === match) {
                    return value['@value'];
                }
            }

            return null;
        };

        BaseProvider.prototype.parseManifest = function () {
        };

        BaseProvider.prototype.getStructureIndex = function (path) {
            for (var i = 0; i < this.sequence.canvases.length; i++) {
                var canvas = this.sequence.canvases[i];

                if (!canvas.structures)
                    continue;

                for (var j = 0; j < canvas.structures.length; j++) {
                    var structure = canvas.structures[j];

                    if (structure.path == path) {
                        return i;
                    }
                }
            }

            return null;
        };

        BaseProvider.prototype.getStructureByPath = function (path) {
            for (var i = 0; i < this.sequence.canvases.length; i++) {
                var canvas = this.sequence.canvases[i];

                if (!canvas.structures)
                    continue;

                for (var j = 0; j < canvas.structures.length; j++) {
                    var structure = canvas.structures[j];

                    if (structure.path == path) {
                        return structure;
                    }
                }
            }

            return null;
        };

        BaseProvider.prototype.getCanvasById = function (id) {
            for (var i = 0; i < this.sequence.canvases.length; i++) {
                var c = this.sequence.canvases[i];

                if (c['@id'] === id) {
                    return c;
                }
            }

            return null;
        };

        BaseProvider.prototype.getCanvasIndexById = function (id) {
            for (var i = 0; i < this.sequence.canvases.length; i++) {
                var c = this.sequence.canvases[i];

                if (c['@id'] === id) {
                    return i;
                }
            }

            return null;
        };

        BaseProvider.prototype.getStructureByIndex = function (structure, index) {
            return structure.structures[index];
        };

        BaseProvider.prototype.getStructureById = function (id) {
            for (var i = 0; i < this.manifest.structures.length; i++) {
                var s = this.manifest.structures[i];

                if (s['@id'] === id) {
                    return s;
                }
            }

            return null;
        };

        BaseProvider.prototype.getCanvasIndexByLabel = function (label) {
            label = label.trim();

            if ($.isNumeric(label)) {
                label = parseInt(label, 10).toString();
            }

            var doublePageRegExp = /(\d*)\D+(\d*)/;
            var match, regExp, regStr, labelPart1, labelPart2;

            for (var i = 0; i < this.sequence.canvases.length; i++) {
                var canvas = this.sequence.canvases[i];

                if (canvas.label === label) {
                    return i;
                }

                match = doublePageRegExp.exec(label);

                if (!match)
                    continue;

                labelPart1 = match[1];
                labelPart2 = match[2];

                if (!labelPart2)
                    continue;

                regStr = "^" + labelPart1 + "\\D+" + labelPart2 + "$";

                regExp = new RegExp(regStr);

                if (regExp.test(canvas.label)) {
                    return i;
                }
            }

            return -1;
        };

        BaseProvider.prototype.getManifestSeeAlsoUri = function (manifest) {
            return null;
        };

        BaseProvider.prototype.getRootStructure = function () {
            if (this.manifest.structures) {
                for (var i = 0; i < this.manifest.structures.length; i++) {
                    var s = this.manifest.structures[i];
                    if (s.viewingHint == "top") {
                        this.rootStructure = s;
                        break;
                    }
                }
            }

            if (!this.rootStructure) {
                this.rootStructure = {
                    path: "",
                    ranges: this.manifest.structures
                };
            }

            return this.rootStructure;
        };

        BaseProvider.prototype.parseStructure = function () {
            if (!this.manifest.structures || !this.manifest.structures.length)
                return;

            this.parseStructures(this.getRootStructure(), '');
        };

        BaseProvider.prototype.parseStructures = function (structure, path) {
            structure.path = path;

            if (structure.canvases) {
                for (var j = 0; j < structure.canvases.length; j++) {
                    var canvas = structure.canvases[j];

                    if (typeof (canvas) === "string") {
                        canvas = this.getCanvasById(canvas);
                    }

                    if (!canvas) {
                        structure.canvases[j] = null;
                        continue;
                    }

                    if (!canvas.structures)
                        canvas.structures = [];

                    canvas.structures.push(structure);

                    structure.canvases[j] = canvas;
                }
            }

            if (structure.ranges) {
                structure.structures = [];

                for (var k = 0; k < structure.ranges.length; k++) {
                    var s = structure.ranges[k];

                    if (typeof (s) === "string") {
                        s = this.getStructureById(s);
                    }

                    if (s.parentStructure)
                        continue;

                    s.parentStructure = structure;

                    structure.structures.push(s);

                    this.parseStructures(s, path + '/' + k);
                }
            }
        };

        BaseProvider.prototype.getTree = function () {
            var rootStructure = this.getRootStructure();

            this.treeRoot = new TreeNode('root');
            this.treeRoot.label = "root";
            this.treeRoot.data = rootStructure;
            this.treeRoot.data.type = "manifest";
            rootStructure.treeNode = this.treeRoot;

            if (rootStructure.structures) {
                for (var i = 0; i < rootStructure.structures.length; i++) {
                    var structure = rootStructure.structures[i];

                    var node = new TreeNode();
                    this.treeRoot.addNode(node);

                    this.parseTreeNode(node, structure);
                }
            }

            return this.treeRoot;
        };

        BaseProvider.prototype.parseTreeNode = function (node, structure) {
            node.label = this.getLocalisedValue(structure.label);
            node.data = structure;
            node.data.type = "structure";
            structure.treeNode = node;

            if (structure.structures) {
                for (var i = 0; i < structure.structures.length; i++) {
                    var childStructure = structure.structures[i];

                    var childNode = new TreeNode();
                    node.addNode(childNode);

                    this.parseTreeNode(childNode, childStructure);
                }
            }
        };

        BaseProvider.prototype.getDomain = function () {
            var parts = util.getUrlParts(this.manifestUri);
            return parts.host;
        };

        BaseProvider.prototype.getEmbedDomain = function () {
            return this.embedDomain;
        };

        BaseProvider.prototype.getMetaData = function (callback, includeRootProperties) {
            var metaData = this.manifest.metadata;

            if (metaData && includeRootProperties) {
                if (this.manifest.description)
                    metaData.push({ "label": "description", "value": this.manifest.description });
                if (this.manifest.attribution)
                    metaData.push({ "label": "attribution", "value": this.manifest.attribution });
                if (this.manifest.license)
                    metaData.push({ "label": "license", "value": this.manifest.license });
                if (this.manifest.logo)
                    metaData.push({ "label": "logo", "value": '<img src="' + this.manifest.logo + '"/>' });
            }

            callback(this.manifest.metadata);
        };

        BaseProvider.prototype.defaultToThumbsView = function () {
            var manifestType = this.getManifestType();

            switch (manifestType) {
                case 'monograph':
                    if (!this.isMultiSequence())
                        return true;
                    break;
                case 'archive':
                    return true;
                    break;
                case 'boundmanuscript':
                    return true;
                    break;
                case 'artwork':
                    return true;
            }

            var sequenceType = this.getSequenceType();

            switch (sequenceType) {
                case 'application-pdf':
                    return true;
                    break;
            }

            return false;
        };

        BaseProvider.prototype.getSettings = function () {
            return this.config.options;
        };

        BaseProvider.prototype.updateSettings = function (settings) {
            this.config.options = settings;
        };

        BaseProvider.prototype.sanitize = function (html) {
            var elem = document.createElement('div');
            var $elem = $(elem);

            $elem.html(html);

            var s = new Sanitize({
                elements: ['a', 'b', 'br', 'img', 'p', 'i', 'span'],
                attributes: {
                    a: ['href'],
                    img: ['src', 'alt']
                },
                protocols: {
                    a: { href: ['http', 'https'] }
                }
            });

            $elem.html(s.clean_node(elem));

            return $elem.html();
        };

        BaseProvider.prototype.getLocales = function () {
            if (this.locales)
                return this.locales;

            var items = this.config.localisation.locales.clone();
            var sorting = this.bootstrapper.params.locales;
            var result = [];

            _.each(sorting, function (sortItem) {
                var match = _.filter(items, function (item) {
                    return item.name === sortItem.name;
                });
                if (match.length) {
                    var m = match[0];
                    if (sortItem.label)
                        m.label = sortItem.label;
                    m.added = true;
                    result.push(m);
                }
            });

            _.each(items, function (item) {
                if (!item.added) {
                    result.push(item);
                }
                delete item.added;
            });

            return this.locales = result;
        };

        BaseProvider.prototype.getAlternateLocale = function () {
            var locales = this.getLocales();

            var alternateLocale;

            for (var i = 0; i < locales.length; i++) {
                var l = locales[i];
                if (l.name !== this.locale) {
                    alternateLocale = l;
                }
            }

            return l;
        };

        BaseProvider.prototype.changeLocale = function (locale) {
            var locales = this.locales.clone();

            var index = locales.indexOfTest(function (l) {
                return l.name === locale;
            });

            locales.move(index, 0);

            var str = this.serializeLocales(locales);

            var p = new BootstrapParams();
            p.setLocale(str);
            this.reload(p);
        };

        BaseProvider.prototype.serializeLocales = function (locales) {
            var str = '';

            for (var i = 0; i < locales.length; i++) {
                var l = locales[i];
                if (i > 0)
                    str += ',';
                str += l.name;
                if (l.label) {
                    str += ':' + l.label;
                }
            }

            return str;
        };

        BaseProvider.prototype.getSerializedLocales = function () {
            return this.serializeLocales(this.locales);
        };
        return BaseProvider;
    })();
    exports.BaseProvider = BaseProvider;
});

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define('extensions/uv-seadragon-extension/iiifProvider',["require", "exports", "../../modules/uv-shared-module/baseIIIFProvider"], function(require, exports, baseProvider) {
    var Provider = (function (_super) {
        __extends(Provider, _super);
        function Provider(bootstrapper, config, manifest) {
            _super.call(this, bootstrapper, config, manifest);

            this.config.options = $.extend(true, this.options, {
                imageUriTemplate: "{0}{1}"
            }, config.options);
        }
        Provider.prototype.getImageUri = function (canvas, imageBaseUri, imageUriTemplate) {
            var baseUri = imageBaseUri ? imageBaseUri : this.options.imageBaseUri || "";
            var template = imageUriTemplate ? imageUriTemplate : this.options.imageUriTemplate;

            var iiifUri;

            if (canvas.resources) {
                iiifUri = canvas.resources[0].resource.service['@id'];
            } else if (canvas.images && canvas.images[0].resource.service) {
                iiifUri = canvas.images[0].resource.service['@id'];
            } else {
                return null;
            }

            if (!iiifUri) {
                console.warn('no service endpoint available');
            } else if (iiifUri.endsWith('/')) {
                if (!this.corsEnabled()) {
                    iiifUri += 'info.js';
                } else {
                    iiifUri += 'info.json';
                }
            } else {
                if (!this.corsEnabled()) {
                    iiifUri += '/info.js';
                } else {
                    iiifUri += '/info.json';
                }
            }

            var uri = String.prototype.format(template, baseUri, iiifUri);

            return uri;
        };

        Provider.prototype.getEmbedScript = function (canvasIndex, zoom, width, height, rotation, embedTemplate) {
            var esu = this.options.embedScriptUri || this.embedScriptUri;

            var template = this.options.embedTemplate || embedTemplate;

            var configUri = this.config.uri || '';

            var script = String.prototype.format(template, this.getSerializedLocales(), configUri, this.manifestUri, this.sequenceIndex, canvasIndex, zoom, rotation, width, height, esu);

            return script;
        };

        Provider.prototype.getTileSources = function () {
            var _this = this;
            if (!this.isPaged()) {
                return [{
                        tileSource: this.getImageUri(this.getCurrentCanvas())
                    }];
            } else {
                if (this.isFirstCanvas() || this.isLastCanvas()) {
                    return [{
                            tileSource: this.getImageUri(this.getCurrentCanvas())
                        }];
                } else {
                    var indices = this.getPagedIndices();

                    var tileSources = [];

                    _.each(indices, function (index) {
                        tileSources.push({
                            tileSource: _this.getImageUri(_this.getCanvasByIndex(index))
                        });
                    });

                    return tileSources;
                }
            }
        };
        return Provider;
    })(baseProvider.BaseProvider);
    exports.Provider = Provider;
});

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define('extensions/uv-seadragon-extension/provider',["require", "exports", "../../modules/uv-shared-module/baseProvider"], function(require, exports, baseProvider) {
    var Provider = (function (_super) {
        __extends(Provider, _super);
        function Provider(bootstrapper, config, manifest) {
            _super.call(this, bootstrapper, config, manifest);

            this.config.options = $.extend(true, this.options, {
                dziUriTemplate: "{0}{1}"
            }, config.options);
        }
        Provider.prototype.getImageUri = function (asset, dziBaseUri, dziUriTemplate) {
            var baseUri = dziBaseUri ? dziBaseUri : this.options.dziBaseUri || "";
            var template = dziUriTemplate ? dziUriTemplate : this.options.dziUriTemplate;
            var uri = String.prototype.format(template, baseUri, asset.dziUri);

            return uri;
        };

        Provider.prototype.getEmbedScript = function (assetIndex, zoom, width, height, rotation, embedTemplate) {
            var esu = this.options.embedScriptUri || this.embedScriptUri;

            var template = this.options.embedTemplate || embedTemplate;

            var configUri = this.config.uri || '';

            var script = String.prototype.format(template, this.getSerializedLocales(), configUri, this.manifestUri, this.sequenceIndex, assetIndex, zoom, rotation, width, height, esu);

            return script;
        };

        Provider.prototype.getTileSources = function () {
            return null;
        };
        return Provider;
    })(baseProvider.BaseProvider);
    exports.Provider = Provider;
});

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define('modules/uv-mediaelementcenterpanel-module/mediaelementCenterPanel',["require", "exports", "../uv-shared-module/baseExtension", "../../extensions/uv-mediaelement-extension/extension", "../uv-shared-module/centerPanel", "../../utils"], function(require, exports, baseExtension, extension, baseCenter, utils) {
    var MediaElementCenterPanel = (function (_super) {
        __extends(MediaElementCenterPanel, _super);
        function MediaElementCenterPanel($element) {
            _super.call(this, $element);
        }
        MediaElementCenterPanel.prototype.create = function () {
            this.setConfig('mediaelementCenterPanel');

            _super.prototype.create.call(this);

            var that = this;

            if (this.provider.getSequenceType().contains('video')) {
                $.subscribe(baseExtension.BaseExtension.TOGGLE_FULLSCREEN, function (e) {
                    if (that.extension.isFullScreen) {
                        that.$container.css('backgroundColor', '#000');
                        that.player.enterFullScreen(false);
                    } else {
                        that.$container.css('backgroundColor', 'transparent');
                        that.player.exitFullScreen(false);
                    }
                });
            }

            $.subscribe(extension.Extension.OPEN_MEDIA, function (e, canvas) {
                that.viewMedia(canvas);
            });

            this.$container = $('<div class="container"></div>');
            this.$content.append(this.$container);

            this.title = this.extension.provider.getTitle();
        };

        MediaElementCenterPanel.prototype.viewMedia = function (canvas) {
            var that = this;

            this.$container.empty();

            this.mediaHeight = 576;
            this.mediaWidth = 720;

            this.$container.height(this.mediaHeight);
            this.$container.width(this.mediaWidth);

            var id = utils.Utils.getTimeStamp();

            var poster = this.provider.getPosterImageUri();

            var type = this.provider.getSequenceType();

            if (type.contains('video')) {
                if (!canvas.sources) {
                    this.media = this.$container.append('<video id="' + id + '" type="video/mp4" src="' + canvas.mediaUri + '" class="mejs-uv" controls="controls" preload="none" poster="' + poster + '"></video>');
                } else {
                    this.media = this.$container.append('<video id="' + id + '" type="video/mp4" class="mejs-uv" controls="controls" preload="none" poster="' + poster + '"></video>');
                }

                this.player = new MediaElementPlayer("#" + id, {
                    type: ['video/mp4', 'video/webm', 'video/flv'],
                    plugins: ['flash'],
                    alwaysShowControls: false,
                    autosizeProgress: false,
                    success: function (media) {
                        media.addEventListener('canplay', function (e) {
                            that.resize();
                        });

                        media.addEventListener('play', function (e) {
                            $.publish(extension.Extension.MEDIA_PLAYED, [Math.floor(that.player.media.currentTime)]);
                        });

                        media.addEventListener('pause', function (e) {
                            if (Math.floor(that.player.media.currentTime) != Math.floor(that.player.media.duration)) {
                                $.publish(extension.Extension.MEDIA_PAUSED, [Math.floor(that.player.media.currentTime)]);
                            }
                        });

                        media.addEventListener('ended', function (e) {
                            $.publish(extension.Extension.MEDIA_ENDED, [Math.floor(that.player.media.duration)]);
                        });

                        if (canvas.sources && canvas.sources.length) {
                            media.setSrc(canvas.sources);
                        }

                        try  {
                            media.load();
                        } catch (e) {
                        }
                    }
                });
            } else if (type.contains('audio')) {
                this.media = this.$container.append('<audio id="' + id + '" type="audio/mp3" src="' + canvas.mediaUri + '" class="mejs-uv" controls="controls" preload="none" poster="' + poster + '"></audio>');

                this.player = new MediaElementPlayer("#" + id, {
                    plugins: ['flash'],
                    alwaysShowControls: false,
                    autosizeProgress: false,
                    defaultVideoWidth: that.mediaWidth,
                    defaultVideoHeight: that.mediaHeight,
                    success: function (media) {
                        media.addEventListener('canplay', function (e) {
                            that.resize();
                        });

                        media.addEventListener('play', function (e) {
                            $.publish(extension.Extension.MEDIA_PLAYED, [Math.floor(that.player.media.currentTime)]);
                        });

                        media.addEventListener('pause', function (e) {
                            if (Math.floor(that.player.media.currentTime) != Math.floor(that.player.media.duration)) {
                                $.publish(extension.Extension.MEDIA_PAUSED, [Math.floor(that.player.media.currentTime)]);
                            }
                        });

                        media.addEventListener('ended', function (e) {
                            $.publish(extension.Extension.MEDIA_ENDED, [Math.floor(that.player.media.duration)]);
                        });

                        try  {
                            media.load();
                        } catch (e) {
                        }
                    }
                });
            }

            this.resize();
        };

        MediaElementCenterPanel.prototype.getPlayer = function () {
            return this.player;
        };

        MediaElementCenterPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);

            if (window.browserDetect.browser == 'Firefox' && window.browserDetect.version < 13) {
                this.$container.width(this.mediaWidth);
                this.$container.height(this.mediaHeight);
            } else {
                var size = utils.Utils.fitRect(this.mediaWidth, this.mediaHeight, this.$content.width(), this.$content.height());

                this.$container.height(size.height);
                this.$container.width(size.width);
            }

            if (this.player && !this.extension.isFullScreen) {
                this.player.resize();
            }

            var left = Math.floor((this.$content.width() - this.$container.width()) / 2);
            var top = Math.floor((this.$content.height() - this.$container.height()) / 2);

            this.$container.css({
                'left': left,
                'top': top
            });

            this.$title.ellipsisFill(this.title);
        };
        return MediaElementCenterPanel;
    })(baseCenter.CenterPanel);
    exports.MediaElementCenterPanel = MediaElementCenterPanel;
});

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define('extensions/uv-mediaelement-extension/embedDialogue',["require", "exports", "../../modules/uv-dialogues-module/embedDialogue"], function(require, exports, embed) {
    var EmbedDialogue = (function (_super) {
        __extends(EmbedDialogue, _super);
        function EmbedDialogue($element) {
            _super.call(this, $element);
        }
        EmbedDialogue.prototype.create = function () {
            this.setConfig('embedDialogue');

            _super.prototype.create.call(this);
        };

        EmbedDialogue.prototype.formatCode = function () {
            this.code = this.provider.getEmbedScript(this.currentWidth, this.currentHeight, this.options.embedTemplate);

            this.$code.val(this.code);
        };

        EmbedDialogue.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        return EmbedDialogue;
    })(embed.EmbedDialogue);
    exports.EmbedDialogue = EmbedDialogue;
});

define('extensions/uv-mediaelement-extension/dependencies',[],function() {
    return {
        'mediaelement': './js/mediaelement-and-player'
    };

    var Dependencies = (function () {
        function Dependencies() {
        }
        return Dependencies;
    })();
    exports.Dependencies = Dependencies;
});

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define('extensions/uv-mediaelement-extension/extension',["require", "exports", "../../modules/uv-shared-module/baseExtension", "../../utils", "../../modules/uv-shared-module/baseProvider", "../../modules/uv-shared-module/shell", "../../modules/uv-shared-module/headerPanel", "../../modules/uv-shared-module/leftPanel", "../../modules/uv-treeviewleftpanel-module/treeViewLeftPanel", "../../modules/uv-treeviewleftpanel-module/treeView", "../../modules/uv-mediaelementcenterpanel-module/mediaelementCenterPanel", "../../modules/uv-shared-module/rightPanel", "../../modules/uv-moreinforightpanel-module/moreInfoRightPanel", "../../modules/uv-shared-module/footerPanel", "../../modules/uv-dialogues-module/helpDialogue", "./embedDialogue", "../../uv-mediaelement-extension-dependencies"], function(require, exports, baseExtension, utils, baseProvider, shell, header, baseLeft, left, treeView, center, baseRight, right, footer, help, embed, dependencies) {
    var Extension = (function (_super) {
        __extends(Extension, _super);
        function Extension(provider) {
            _super.call(this, provider);
        }
        Extension.prototype.create = function () {
            var _this = this;
            _super.prototype.create.call(this);

            var that = this;

            $(window).bind('enterfullscreen', function () {
                $.publish(baseExtension.BaseExtension.TOGGLE_FULLSCREEN);
            });

            $(window).bind('exitfullscreen', function () {
                $.publish(baseExtension.BaseExtension.TOGGLE_FULLSCREEN);
            });

            $.subscribe(treeView.TreeView.NODE_SELECTED, function (e, data) {
                _this.viewManifest(data);
            });

            $.subscribe(footer.FooterPanel.EMBED, function (e) {
                $.publish(embed.EmbedDialogue.SHOW_EMBED_DIALOGUE);
            });

            $.subscribe(baseLeft.LeftPanel.OPEN_LEFT_PANEL, function (e) {
                _this.resize();
            });

            $.subscribe(baseLeft.LeftPanel.CLOSE_LEFT_PANEL, function (e) {
                _this.resize();
            });

            $.subscribe(baseRight.RightPanel.OPEN_RIGHT_PANEL, function (e) {
                _this.resize();
            });

            $.subscribe(baseRight.RightPanel.CLOSE_RIGHT_PANEL, function (e) {
                _this.resize();
            });

            require(_.values(dependencies), function () {
                that.createModules();

                that.setParams();

                $.publish(baseExtension.BaseExtension.RESIZE);

                that.viewMedia();

                $.publish(Extension.CREATED);
            });
        };

        Extension.prototype.createModules = function () {
            this.headerPanel = new header.HeaderPanel(shell.Shell.$headerPanel);

            if (this.isLeftPanelEnabled()) {
                this.leftPanel = new left.TreeViewLeftPanel(shell.Shell.$leftPanel);
            }

            this.centerPanel = new center.MediaElementCenterPanel(shell.Shell.$centerPanel);
            this.rightPanel = new right.MoreInfoRightPanel(shell.Shell.$rightPanel);
            this.footerPanel = new footer.FooterPanel(shell.Shell.$footerPanel);

            this.$helpDialogue = utils.Utils.createDiv('overlay help');
            shell.Shell.$overlays.append(this.$helpDialogue);
            this.helpDialogue = new help.HelpDialogue(this.$helpDialogue);

            this.$embedDialogue = utils.Utils.createDiv('overlay embed');
            shell.Shell.$overlays.append(this.$embedDialogue);
            this.embedDialogue = new embed.EmbedDialogue(this.$embedDialogue);

            if (this.isLeftPanelEnabled()) {
                this.leftPanel.init();
            }
        };

        Extension.prototype.setParams = function () {
            if (!this.provider.isHomeDomain)
                return;

            this.setParam(0 /* sequenceIndex */, this.provider.sequenceIndex);
        };

        Extension.prototype.isLeftPanelEnabled = function () {
            return utils.Utils.getBool(this.provider.config.options.leftPanelEnabled, true) && this.provider.isMultiSequence();
        };

        Extension.prototype.viewMedia = function () {
            var _this = this;
            var canvas = this.provider.getCanvasByIndex(0);

            this.viewCanvas(0, function () {
                _this.provider.setMediaUri(canvas);

                $.publish(Extension.OPEN_MEDIA, [canvas]);

                _this.setParam(1 /* canvasIndex */, 0);
            });
        };
        Extension.OPEN_MEDIA = 'onMediaOpened';
        Extension.MEDIA_PLAYED = 'onMediaPlayed';
        Extension.MEDIA_PAUSED = 'onMediaPaused';
        Extension.MEDIA_ENDED = 'onMediaEnded';
        return Extension;
    })(baseExtension.BaseExtension);
    exports.Extension = Extension;
});

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define('extensions/uv-mediaelement-extension/provider',["require", "exports", "../../modules/uv-shared-module/baseProvider"], function(require, exports, baseProvider) {
    var Provider = (function (_super) {
        __extends(Provider, _super);
        function Provider(bootstrapper, config, manifest) {
            _super.call(this, bootstrapper, config, manifest);

            this.config.options = $.extend(true, this.options, {}, config.options);
        }
        Provider.prototype.getEmbedScript = function (width, height, embedTemplate) {
            var esu = this.options.embedScriptUri || this.embedScriptUri;

            var template = this.options.embedTemplate || embedTemplate;

            var configUri = this.config.uri || '';

            var script = String.prototype.format(template, this.manifestUri, this.sequenceIndex, configUri, width, height, esu);

            return script;
        };

        Provider.prototype.getPosterImageUri = function () {
            var baseUri = this.options.mediaBaseUri || "";
            var template = this.options.mediaUriTemplate;
            var uri = String.prototype.format(template, baseUri, this.sequence.extensions.posterImage);

            return uri;
        };
        return Provider;
    })(baseProvider.BaseProvider);
    exports.Provider = Provider;
});

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define('modules/uv-pdfcenterpanel-module/pdfCenterPanel',["require", "exports", "../../extensions/uv-pdf-extension/extension", "../uv-shared-module/centerPanel"], function(require, exports, extension, baseCenter) {
    var PDFCenterPanel = (function (_super) {
        __extends(PDFCenterPanel, _super);
        function PDFCenterPanel($element) {
            _super.call(this, $element);
        }
        PDFCenterPanel.prototype.create = function () {
            var _this = this;
            this.setConfig('pdfCenterPanel');

            _super.prototype.create.call(this);

            $.subscribe(extension.Extension.OPEN_MEDIA, function (e, canvas) {
                _this.viewMedia(canvas);
            });
        };

        PDFCenterPanel.prototype.viewMedia = function (canvas) {
            var _this = this;
            var browser = window.browserDetect.browser;
            var version = window.browserDetect.version;

            if (browser == 'Explorer' && version < 10) {
                var myPDF = new PDFObject({
                    url: canvas.mediaUri,
                    id: "PDF"
                }).embed('content');
            } else {
                var viewerPath;

                if (window.DEBUG) {
                    viewerPath = 'modules/uv-pdfcenterpanel-module/html/viewer.html';
                } else {
                    viewerPath = 'html/uv-pdfcenterpanel-module/viewer.html';
                }

                this.$content.load(viewerPath, function () {
                    if (window.DEBUG) {
                        PDFJS.workerSrc = 'extensions/uv-pdf-extension/js/pdf.worker.min.js';
                    } else {
                        PDFJS.workerSrc = 'js/pdf.worker.min.js';
                    }

                    PDFJS.DEFAULT_URL = canvas.mediaUri;

                    window.webViewerLoad();

                    _this.resize();
                });
            }
        };

        PDFCenterPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        return PDFCenterPanel;
    })(baseCenter.CenterPanel);
    exports.PDFCenterPanel = PDFCenterPanel;
});

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define('extensions/uv-pdf-extension/embedDialogue',["require", "exports", "../../modules/uv-dialogues-module/embedDialogue"], function(require, exports, embed) {
    var EmbedDialogue = (function (_super) {
        __extends(EmbedDialogue, _super);
        function EmbedDialogue($element) {
            _super.call(this, $element);
        }
        EmbedDialogue.prototype.create = function () {
            this.setConfig('embedDialogue');

            _super.prototype.create.call(this);
        };

        EmbedDialogue.prototype.formatCode = function () {
            this.code = this.provider.getEmbedScript(this.currentWidth, this.currentHeight, this.options.embedTemplate);

            this.$code.val(this.code);
        };

        EmbedDialogue.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        return EmbedDialogue;
    })(embed.EmbedDialogue);
    exports.EmbedDialogue = EmbedDialogue;
});

define('extensions/uv-pdf-extension/dependencies',[],function() {
    var paths = {
        'pdf': './js/pdf_combined',
        'pdfobject': './js/pdfobject'
    };

    return paths;

    var Dependencies = (function () {
        function Dependencies() {
        }
        return Dependencies;
    })();
    exports.Dependencies = Dependencies;
});

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define('extensions/uv-pdf-extension/extension',["require", "exports", "../../modules/uv-shared-module/baseExtension", "../../utils", "../../modules/uv-shared-module/baseProvider", "../../modules/uv-shared-module/shell", "../../modules/uv-shared-module/headerPanel", "../../modules/uv-shared-module/leftPanel", "../../modules/uv-treeviewleftpanel-module/treeViewLeftPanel", "../../modules/uv-pdfcenterpanel-module/pdfCenterPanel", "../../modules/uv-shared-module/rightPanel", "../../modules/uv-moreinforightpanel-module/moreInfoRightPanel", "../../modules/uv-shared-module/footerPanel", "../../modules/uv-dialogues-module/helpDialogue", "./embedDialogue", "../../modules/uv-treeviewleftpanel-module/thumbsView", "../../uv-pdf-extension-dependencies"], function(require, exports, baseExtension, utils, baseProvider, shell, header, baseLeft, left, center, baseRight, right, footer, help, embed, thumbsView, dependencies) {
    var Extension = (function (_super) {
        __extends(Extension, _super);
        function Extension(provider) {
            _super.call(this, provider);
        }
        Extension.prototype.create = function () {
            var _this = this;
            _super.prototype.create.call(this);

            var that = this;

            $.subscribe(thumbsView.ThumbsView.THUMB_SELECTED, function (e, index) {
                window.open(that.provider.getPDFUri());
            });

            $.subscribe(footer.FooterPanel.EMBED, function (e) {
                $.publish(embed.EmbedDialogue.SHOW_EMBED_DIALOGUE);
            });

            $.subscribe(shell.Shell.SHOW_OVERLAY, function (e, params) {
                if (_this.IsOldIE()) {
                    _this.centerPanel.$element.hide();
                }
            });

            $.subscribe(shell.Shell.HIDE_OVERLAY, function (e, params) {
                if (_this.IsOldIE()) {
                    _this.centerPanel.$element.show();
                }
            });

            $.subscribe(baseLeft.LeftPanel.OPEN_LEFT_PANEL, function (e) {
                _this.resize();
            });

            $.subscribe(baseLeft.LeftPanel.CLOSE_LEFT_PANEL, function (e) {
                _this.resize();
            });

            $.subscribe(baseRight.RightPanel.OPEN_RIGHT_PANEL, function (e) {
                _this.resize();
            });

            $.subscribe(baseRight.RightPanel.CLOSE_RIGHT_PANEL, function (e) {
                _this.resize();
            });

            require(_.values(dependencies), function () {
                that.createModules();

                $.publish(baseExtension.BaseExtension.RESIZE);

                that.viewMedia();

                $.publish(Extension.CREATED);
            });
        };

        Extension.prototype.IsOldIE = function () {
            var browser = window.browserDetect.browser;
            var version = window.browserDetect.version;

            if (browser == 'Explorer' && version <= 9)
                return true;
            return false;
        };

        Extension.prototype.createModules = function () {
            this.headerPanel = new header.HeaderPanel(shell.Shell.$headerPanel);

            if (this.isLeftPanelEnabled()) {
                this.leftPanel = new left.TreeViewLeftPanel(shell.Shell.$leftPanel);
            }

            this.centerPanel = new center.PDFCenterPanel(shell.Shell.$centerPanel);

            if (this.isRightPanelEnabled()) {
                this.rightPanel = new right.MoreInfoRightPanel(shell.Shell.$rightPanel);
            }

            this.footerPanel = new footer.FooterPanel(shell.Shell.$footerPanel);

            this.$helpDialogue = utils.Utils.createDiv('overlay help');
            shell.Shell.$overlays.append(this.$helpDialogue);
            this.helpDialogue = new help.HelpDialogue(this.$helpDialogue);

            this.$embedDialogue = utils.Utils.createDiv('overlay embed');
            shell.Shell.$overlays.append(this.$embedDialogue);
            this.embedDialogue = new embed.EmbedDialogue(this.$embedDialogue);

            if (this.isLeftPanelEnabled()) {
                this.leftPanel.init();
            }
        };

        Extension.prototype.isLeftPanelEnabled = function () {
            return utils.Utils.getBool(this.provider.config.options.leftPanelEnabled, true);
        };

        Extension.prototype.isRightPanelEnabled = function () {
            return utils.Utils.getBool(this.provider.config.options.rightPanelEnabled, true);
        };

        Extension.prototype.viewMedia = function () {
            var _this = this;
            var canvas = this.provider.getCanvasByIndex(0);

            this.viewCanvas(0, function () {
                _this.provider.setMediaUri(canvas);

                $.publish(Extension.OPEN_MEDIA, [canvas]);

                _this.setParam(1 /* canvasIndex */, 0);
            });
        };
        return Extension;
    })(baseExtension.BaseExtension);
    exports.Extension = Extension;
});

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define('extensions/uv-pdf-extension/provider',["require", "exports", "../../modules/uv-shared-module/baseProvider"], function(require, exports, baseProvider) {
    var Provider = (function (_super) {
        __extends(Provider, _super);
        function Provider(bootstrapper, config, manifest) {
            _super.call(this, bootstrapper, config, manifest);

            this.config.options = $.extend(true, this.options, {}, config.options);
        }
        Provider.prototype.getPDFUri = function () {
            var canvas = this.getCanvasByIndex(0);
            return canvas.mediaUri;
        };

        Provider.prototype.getEmbedScript = function (width, height, embedTemplate) {
            var esu = this.options.embedScriptUri || this.embedScriptUri;

            var template = this.options.embedTemplate || embedTemplate;

            var configUri = this.config.uri || '';

            var script = String.prototype.format(template, this.manifestUri, this.sequenceIndex, configUri, width, height, esu);

            return script;
        };
        return Provider;
    })(baseProvider.BaseProvider);
    exports.Provider = Provider;
});

require.config({
    paths: {
        'modernizr': 'js/modernizr',
        'jquery': 'js/jquery-1.10.2.min',
        'plugins': 'js/jquery.plugins',
        'underscore': 'js/underscore-min',
        'pubsub': 'js/pubsub',
        'jsviews': 'js/jsviews.min',
        'yepnope': 'js/yepnope.1.5.4-min',
        'yepnopecss': 'js/yepnope.css',
        'l10n': 'js/l10n',
        'sanitize': 'js/sanitize'
    },
    shim: {
        jquery: {
            exports: '$'
        },
        plugins: {
            deps: ['jquery']
        },
        underscore: {
            exports: '_'
        },
        pubsub: {
            deps: ['jquery']
        },
        jsviews: {
            deps: ['jquery']
        },
        yepnopecss: {
            deps: ['yepnope']
        }
    }
});

require([
    'modernizr',
    'jquery',
    'plugins',
    'underscore',
    'pubsub',
    'jsviews',
    'yepnope',
    'yepnopecss',
    'bootstrapper',
    'l10n',
    'sanitize',
    'extensions/uv-seadragon-extension/extension',
    'extensions/uv-seadragon-extension/iiifProvider',
    'extensions/uv-seadragon-extension/provider',
    'extensions/uv-mediaelement-extension/extension',
    'extensions/uv-mediaelement-extension/provider',
    'extensions/uv-pdf-extension/extension',
    'extensions/uv-pdf-extension/provider'
], function (modernizr, $, plugins, _, pubsub, jsviews, yepnope, yepnopecss, bootstrapper, l10n, sanitize, seadragonExtension, seadragonIIIFProvider, seadragonProvider, mediaelementExtension, mediaelementProvider, pdfExtension, pdfProvider) {
    

    var extensions = {};

    extensions['seadragon/dzi'] = {
        type: seadragonExtension.Extension,
        provider: seadragonProvider.Provider,
        name: 'uv-seadragon-extension'
    };

    extensions['seadragon/iiif'] = {
        type: seadragonExtension.Extension,
        provider: seadragonIIIFProvider.Provider,
        name: 'uv-seadragon-extension'
    };

    extensions['video/mp4'] = {
        type: mediaelementExtension.Extension,
        provider: mediaelementProvider.Provider,
        name: 'uv-mediaelement-extension'
    };

    extensions['video/multiple-sources'] = {
        type: mediaelementExtension.Extension,
        provider: mediaelementProvider.Provider,
        name: 'uv-mediaelement-extension'
    };

    extensions['audio/mp3'] = {
        type: mediaelementExtension.Extension,
        provider: mediaelementProvider.Provider,
        name: 'uv-mediaelement-extension'
    };

    extensions['application/pdf'] = {
        type: pdfExtension.Extension,
        provider: pdfProvider.Provider,
        name: 'uv-pdf-extension'
    };

    var bs = new bootstrapper(extensions);

    bs.bootStrap();
});

define("app", function(){});
