(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("fetch"));
	else if(typeof define === 'function' && define.amd)
		define("UV", ["fetch"], factory);
	else if(typeof exports === 'object')
		exports["UV"] = factory(require("fetch"));
	else
		root["UV"] = factory(root["fetch"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE_node_fetch__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 	};
/******/
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"UV": 0
/******/ 	};
/******/
/******/
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + ({"vendors~uv-av-extension~uv-mediaelement-extension~uv-openseadragon-extension~uv-pdf-extension~uv-vir~dcd3a7fc":"vendors~uv-av-extension~uv-mediaelement-extension~uv-openseadragon-extension~uv-pdf-extension~uv-vir~dcd3a7fc","uv-av-extension~uv-mediaelement-extension~uv-openseadragon-extension~uv-pdf-extension~uv-virtex-extension":"uv-av-extension~uv-mediaelement-extension~uv-openseadragon-extension~uv-pdf-extension~uv-virtex-extension","uv-mediaelement-extension":"uv-mediaelement-extension","uv-pdf-extension":"uv-pdf-extension","vendors~uv-av-extension~uv-openseadragon-extension~uv-virtex-extension":"vendors~uv-av-extension~uv-openseadragon-extension~uv-virtex-extension","vendors~uv-av-extension":"vendors~uv-av-extension","uv-av-extension~uv-openseadragon-extension~uv-virtex-extension":"uv-av-extension~uv-openseadragon-extension~uv-virtex-extension","uv-av-extension":"uv-av-extension","vendors~uv-openseadragon-extension":"vendors~uv-openseadragon-extension","uv-openseadragon-extension":"uv-openseadragon-extension","vendors~uv-virtex-extension":"vendors~uv-virtex-extension","uv-virtex-extension":"uv-virtex-extension","vendors~mediaelement":"vendors~mediaelement","vendors~pdfjs":"vendors~pdfjs","pdfjs":"pdfjs","vendors~pdfobject":"vendors~pdfobject"}[chunkId]||chunkId) + "." + {"0":"d16a514f430ee6013732","vendors~uv-av-extension~uv-mediaelement-extension~uv-openseadragon-extension~uv-pdf-extension~uv-vir~dcd3a7fc":"e86950ad3360bd079549","uv-av-extension~uv-mediaelement-extension~uv-openseadragon-extension~uv-pdf-extension~uv-virtex-extension":"0be01a3e30939502b10a","uv-mediaelement-extension":"8cfb6662d1f231fae443","uv-pdf-extension":"8787757ff4a8f8e6540e","vendors~uv-av-extension~uv-openseadragon-extension~uv-virtex-extension":"0fc98d573c4a4d48f93c","vendors~uv-av-extension":"bce89437eafa4bb79ad9","uv-av-extension~uv-openseadragon-extension~uv-virtex-extension":"89b4823ba8718fb4d748","uv-av-extension":"546f779c3ed7a715a938","vendors~uv-openseadragon-extension":"ff656a21eca157e9a7aa","uv-openseadragon-extension":"d770c40fc94c073107d6","vendors~uv-virtex-extension":"8b11bc3bad1d7530723c","uv-virtex-extension":"a2951c689d9d35d17d5c","vendors~mediaelement":"dd2b8311f62ef1736bc7","vendors~pdfjs":"b31288d6e4030fd4e889","pdfjs":"e469a7826caf75c9c3f0","vendors~pdfobject":"c3e3ff0404e5e581ad63"}[chunkId] + ".js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "dist-umd/";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonpUV"] = window["webpackJsonpUV"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@edsilv/http-status-codes/dist-umd/httpstatuscodes.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@edsilv/http-status-codes/dist-umd/httpstatuscodes.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function(E,e){ true?module.exports=e():undefined}(window,(function(){return function(E){var e={};function T(t){if(e[t])return e[t].exports;var O=e[t]={i:t,l:!1,exports:{}};return E[t].call(O.exports,O,O.exports,T),O.l=!0,O.exports}return T.m=E,T.c=e,T.d=function(E,e,t){T.o(E,e)||Object.defineProperty(E,e,{enumerable:!0,get:t})},T.r=function(E){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(E,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(E,"__esModule",{value:!0})},T.t=function(E,e){if(1&e&&(E=T(E)),8&e)return E;if(4&e&&"object"==typeof E&&E&&E.__esModule)return E;var t=Object.create(null);if(T.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:E}),2&e&&"string"!=typeof E)for(var O in E)T.d(t,O,function(e){return E[e]}.bind(null,O));return t},T.n=function(E){var e=E&&E.__esModule?function(){return E.default}:function(){return E};return T.d(e,"a",e),e},T.o=function(E,e){return Object.prototype.hasOwnProperty.call(E,e)},T.p="",T(T.s=0)}([function(E,e,T){E.exports=T(1)},function(E,e,T){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.CONTINUE=100,e.SWITCHING_PROTOCOLS=101,e.PROCESSING=102,e.OK=200,e.CREATED=201,e.ACCEPTED=202,e.NON_AUTHORITATIVE_INFORMATION=203,e.NO_CONTENT=204,e.RESET_CONTENT=205,e.PARTIAL_CONTENT=206,e.MULTI_STATUS=207,e.MULTIPLE_CHOICES=300,e.MOVED_PERMANENTLY=301,e.MOVED_TEMPORARILY=302,e.SEE_OTHER=303,e.NOT_MODIFIED=304,e.USE_PROXY=305,e.TEMPORARY_REDIRECT=307,e.BAD_REQUEST=400,e.UNAUTHORIZED=401,e.PAYMENT_REQUIRED=402,e.FORBIDDEN=403,e.NOT_FOUND=404,e.METHOD_NOT_ALLOWED=405,e.NOT_ACCEPTABLE=406,e.PROXY_AUTHENTICATION_REQUIRED=407,e.REQUEST_TIME_OUT=408,e.CONFLICT=409,e.GONE=410,e.LENGTH_REQUIRED=411,e.PRECONDITION_FAILED=412,e.REQUEST_ENTITY_TOO_LARGE=413,e.REQUEST_URI_TOO_LARGE=414,e.UNSUPPORTED_MEDIA_TYPE=415,e.REQUESTED_RANGE_NOT_SATISFIABLE=416,e.EXPECTATION_FAILED=417,e.IM_A_TEAPOT=418,e.UNPROCESSABLE_ENTITY=422,e.LOCKED=423,e.FAILED_DEPENDENCY=424,e.UNORDERED_COLLECTION=425,e.UPGRADE_REQUIRED=426,e.PRECONDITION_REQUIRED=428,e.TOO_MANY_REQUESTS=429,e.REQUEST_HEADER_FIELDS_TOO_LARGE=431,e.INTERNAL_SERVER_ERROR=500,e.NOT_IMPLEMENTED=501,e.BAD_GATEWAY=502,e.SERVICE_UNAVAILABLE=503,e.GATEWAY_TIME_OUT=504,e.HTTP_VERSION_NOT_SUPPORTED=505,e.VARIANT_ALSO_NEGOTIATES=506,e.INSUFFICIENT_STORAGE=507,e.BANDWIDTH_LIMIT_EXCEEDED=509,e.NOT_EXTENDED=510,e.NETWORK_AUTHENTICATION_REQUIRED=511}])}));
//# sourceMappingURL=httpstatuscodes.js.map

/***/ }),

/***/ "./node_modules/@edsilv/jquery-plugins/dist/jquery-plugins.js":
/*!********************************************************************!*\
  !*** ./node_modules/@edsilv/jquery-plugins/dist/jquery-plugins.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function ($) {
    $.fn.checkboxButton = function (onClick) {
        return this.each(function () {
            var $this = $(this);
            $this.on('click', function (e) {
                var tagName = e.target.tagName;
                var $checkbox = $(this).find(':checkbox');
                if (tagName !== "INPUT") {
                    e.preventDefault();
                    $checkbox.prop('checked', !$checkbox.prop('checked'));
                }
                var checked = $checkbox.is(':checked');
                onClick.call(this, checked);
            });
        });
    };
    $.fn.disable = function () {
        return this.each(function () {
            var $this = $(this);
            $this.addClass('disabled');
            $this.data('tabindex', $this.attr('tabindex'));
            $this.removeAttr('tabindex');
        });
    };
    $.fn.ellipsis = function (chars) {
        return this.each(function () {
            var $self = $(this);
            var text = $self.text();
            if (text.length > chars) {
                var trimmedText = text.substr(0, chars);
                trimmedText = trimmedText.substr(0, Math.min(trimmedText.length, trimmedText.lastIndexOf(" ")));
                $self.empty().html(trimmedText + "&hellip;");
            }
        });
    };
    $.fn.ellipsisFill = function (text) {
        var textPassed = true;
        if (!text)
            textPassed = false;
        return this.each(function () {
            var $self = $(this);
            if (!textPassed)
                text = $self.text();
            $self.empty();
            var $spanElem = $('<span title="' + text + '"></span>');
            $self.append($spanElem);
            $self.css('overflow', 'hidden');
            $spanElem.css('white-space', 'nowrap');
            $spanElem.html(text);
            // get the width of the span.
            // if it's wider than the container, remove a word until it's not.
            if ($spanElem.width() > $self.width()) {
                var lastText = null;
                while ($spanElem.width() > $self.width()) {
                    var t = $spanElem.html();
                    t = t.substring(0, t.lastIndexOf(' ')) + '&hellip;';
                    if (t === lastText)
                        break;
                    $spanElem.html(t);
                    lastText = t;
                }
            }
        });
    };
    // Truncates to a certain number of letters, while ignoring and preserving HTML
    $.fn.ellipsisHtmlFixed = function (chars, cb) {
        return this.each(function () {
            var $self = $(this);
            var expandedText = $self.html();
            var $trunc = $('<span></span>');
            $trunc.html($self.html().replace(/\s[\s]*/g, ' ').trim());
            if ($trunc.text().trim().length <= chars) {
                return; // do nothing if we're under the limit!
            }
            while ($trunc.text().trim().length > chars) {
                $trunc.removeLastWord(chars);
            }
            var collapsedText = $trunc.html();
            // Toggle function
            var expanded = false;
            $self.toggle = function () {
                $self.empty();
                var $toggleButton = $('<a href="#" class="toggle"></a>');
                if (expanded) {
                    $self.html(expandedText + " ");
                    $toggleButton.text("less");
                    $toggleButton.switchClass("less", "more");
                }
                else {
                    $self.html(collapsedText + "&hellip; ");
                    $toggleButton.text("more");
                    $toggleButton.switchClass("more", "less");
                }
                $toggleButton.one('click', function (e) {
                    e.preventDefault();
                    $self.toggle();
                });
                expanded = !expanded;
                $self.append($toggleButton);
                if (cb)
                    cb();
            };
            $self.toggle();
        });
    };
    $.fn.enable = function () {
        return this.each(function () {
            var $self = $(this);
            $self.removeClass('disabled');
            $self.attr('tabindex', $self.data('tabindex'));
        });
    };
    $.fn.equaliseHeight = function (reset, average) {
        var maxHeight = -1;
        var minHeight = Number.MAX_VALUE;
        var heights = [];
        // reset all heights to auto first so they can be re-measured.
        if (reset) {
            this.each(function () {
                $(this).height('auto');
            });
        }
        this.each(function () {
            var currentHeight = $(this).height();
            heights.push(currentHeight);
            maxHeight = maxHeight > currentHeight ? maxHeight : currentHeight;
            minHeight = minHeight < currentHeight ? minHeight : currentHeight;
        });
        var finalHeight = maxHeight;
        if (average) {
            heights.sort(function (a, b) { return a - b; });
            var half = Math.floor(heights.length / 2);
            if (heights.length % 2) {
                finalHeight = heights[half];
            }
            else {
                finalHeight = (heights[half - 1] + heights[half]) / 2.0;
            }
        }
        this.each(function () {
            $(this).height(finalHeight);
        });
        return this;
    };
    $.fn.getVisibleElementWithGreatestTabIndex = function () {
        var $self = $(this);
        var maxTabIndex = 0;
        var $elementWithGreatestTabIndex = null;
        $self.find('*:visible[tabindex]').each(function (index, el) {
            var $el = $(el);
            var tabIndex = parseInt($el.attr('tabindex'));
            if (tabIndex > maxTabIndex) {
                maxTabIndex = tabIndex;
                $elementWithGreatestTabIndex = $el;
            }
        });
        return $elementWithGreatestTabIndex;
    };
    $.fn.horizontalMargins = function () {
        var $self = $(this);
        return parseInt($self.css('marginLeft')) + parseInt($self.css('marginRight'));
    };
    $.fn.leftMargin = function () {
        var $self = $(this);
        return parseInt($self.css('marginLeft'));
    };
    $.fn.rightMargin = function () {
        var $self = $(this);
        return parseInt($self.css('marginRight'));
    };
    $.fn.horizontalPadding = function () {
        var $self = $(this);
        return parseInt($self.css('paddingLeft')) + parseInt($self.css('paddingRight'));
    };
    $.fn.leftPadding = function () {
        var $self = $(this);
        return parseInt($self.css('paddingLeft'));
    };
    $.fn.rightPadding = function () {
        var $self = $(this);
        return parseInt($self.css('paddingRight'));
    };
    $.mlp = { x: 0, y: 0 }; // Mouse Last Position
    function documentHandler() {
        var $current = this === document ? $(this) : $(this).contents();
        $current.mousemove(function (e) { jQuery.mlp = { x: e.pageX, y: e.pageY }; });
        $current.find('iframe').on('load', documentHandler);
    }
    $(documentHandler);
    $.fn.ismouseover = function () {
        var result = false;
        this.eq(0).each(function () {
            var $current = $(this).is("iframe") ? $(this).contents().find("body") : $(this);
            var offset = $current.offset();
            result = offset.left <= $.mlp.x && offset.left + $current.outerWidth() > $.mlp.x &&
                offset.top <= $.mlp.y && offset.top + $current.outerHeight() > $.mlp.y;
        });
        return result;
    };
    var on = $.fn.on;
    var timer;
    $.fn.on = function () {
        var args = Array.apply(null, arguments);
        var last = args[args.length - 1];
        if (isNaN(last) || (last === 1 && args.pop()))
            return on.apply(this, args);
        var delay = args.pop();
        var fn = args.pop();
        args.push(function () {
            var self = this;
            var params = arguments;
            clearTimeout(timer);
            timer = setTimeout(function () {
                fn.apply(self, params);
            }, delay);
        });
        return on.apply(this, args);
    };
    $.fn.onEnter = function (cb) {
        return this.each(function () {
            var $this = $(this);
            $this.on('keyup', function (e) {
                if (e.keyCode === 13) {
                    e.preventDefault();
                    cb();
                }
            });
        });
    };
    $.fn.onPressed = function (cb) {
        return this.each(function () {
            var $this = $(this);
            $this.on('touchstart click', function (e) {
                e.preventDefault();
                cb(e);
            });
            $this.on('keyup', function (e) {
                if (e.keyCode === 13) {
                    e.preventDefault();
                    cb(e);
                }
            });
        });
    };
    // Recursively removes the last empty element (img, audio, etc) or word in an element
    $.fn.removeLastWord = function (chars, depth) {
        if (chars === void 0) { chars = 8; }
        if (depth === void 0) { depth = 0; }
        return this.each(function () {
            var $self = $(this);
            if ($self.contents().length > 0) {
                var $lastElement = $self.contents().last();
                if ($lastElement[0].nodeType === 3) {
                    var words = $lastElement.text().trim().split(' ');
                    if (words.length > 1) {
                        words.splice(words.length - 1, 1);
                        $lastElement[0].data = words.join(' '); // textnode.data
                        return;
                    }
                    else if ('undefined' !== typeof chars && words.length === 1 && words[0].length > chars) {
                        $lastElement[0].data = words.join(' ').substring(0, chars);
                        return;
                    }
                }
                $lastElement.removeLastWord(chars, depth + 1); // Element
            }
            else if (depth > 0) {
                // Empty element
                $self.remove();
            }
        });
    };
    $.fn.switchClass = function (class1, class2) {
        return this.each(function () {
            $(this).removeClass(class1).addClass(class2);
        });
    };
    $.fn.targetBlank = function () {
        return this.each(function () {
            $(this).find('a').prop('target', '_blank');
        });
    };
    $.fn.toggleExpandText = function (chars, lessText, moreText, cb) {
        return this.each(function () {
            var $self = $(this);
            var expandedText = $self.html();
            if (chars > expandedText.length)
                return;
            var expanded = false;
            var collapsedText = expandedText.substr(0, chars);
            collapsedText = collapsedText.substr(0, Math.min(collapsedText.length, collapsedText.lastIndexOf(" ")));
            $self.toggle = function () {
                $self.empty();
                var $toggleButton = $('<a href="#" class="toggle"></a>');
                if (expanded) {
                    $self.html(expandedText + "&nbsp;");
                    $toggleButton.text(lessText);
                    $toggleButton.switchClass("less", "more");
                }
                else {
                    $self.html(collapsedText + "&nbsp;");
                    $toggleButton.text(moreText);
                    $toggleButton.switchClass("more", "less");
                }
                $toggleButton.one('click', function (e) {
                    e.preventDefault();
                    $self.toggle();
                });
                expanded = !expanded;
                $self.append($toggleButton);
                if (cb)
                    cb();
            };
            $self.toggle();
        });
    };
    // Toggle expansion by number of lines
    $.fn.toggleExpandTextByLines = function (lines, lessText, moreText, cb) {
        return this.each(function () {
            var $self = $(this);
            var expandedText = $self.html();
            // add 'pad' to account for the right margin in the sidebar
            var $buttonPad = $('<span>&hellip; <a href="#" class="toggle more">morepad</a></span>');
            // when height changes, store string, then pick from line counts
            var stringsByLine = [expandedText];
            var lastHeight = $self.height();
            // Until empty
            while ($self.text().length > 0) {
                $self.removeLastWord();
                var html = $self.html();
                $self.append($buttonPad);
                if (lastHeight > $self.height()) {
                    stringsByLine.unshift(html);
                    lastHeight = $self.height();
                }
                $buttonPad.remove();
            }
            if (stringsByLine.length <= lines) {
                $self.html(expandedText);
                return;
            }
            var collapsedText = stringsByLine[lines - 1];
            // Toggle function
            var expanded = false;
            $self.toggle = function () {
                $self.empty();
                var $toggleButton = $('<a href="#" class="toggle"></a>');
                if (expanded) {
                    $self.html(expandedText + " ");
                    $toggleButton.text(lessText);
                    $toggleButton.switchClass("less", "more");
                }
                else {
                    $self.html(collapsedText + "&hellip; ");
                    $toggleButton.text(moreText);
                    $toggleButton.switchClass("more", "less");
                }
                $toggleButton.one('click', function (e) {
                    e.preventDefault();
                    $self.toggle();
                });
                expanded = !expanded;
                $self.append($toggleButton);
                if (cb)
                    cb();
            };
            $self.toggle();
        });
    };
    $.fn.toggleText = function (text1, text2) {
        return this.each(function () {
            var $self = $(this);
            if ($self.text() === text1) {
                $(this).text(text2);
            }
            else {
                $(this).text(text1);
            }
        });
    };
    $.fn.updateAttr = function (attrName, oldVal, newVal) {
        return this.each(function () {
            var $self = $(this);
            var attr = $self.attr(attrName);
            if (attr && attr.indexOf(oldVal) === 0) {
                attr = attr.replace(oldVal, newVal);
                $self.attr(attrName, attr);
            }
        });
    };
    $.fn.verticalMargins = function () {
        var $self = $(this);
        return parseInt($self.css('marginTop')) + parseInt($self.css('marginBottom'));
    };
    $.fn.verticalPadding = function () {
        var $self = $(this);
        return parseInt($self.css('paddingTop')) + parseInt($self.css('paddingBottom'));
    };
})(jQuery);


/***/ }),

/***/ "./node_modules/@edsilv/utils/dist-esmodule/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/@edsilv/utils/dist-esmodule/index.js ***!
  \***********************************************************/
/*! exports provided: Async, Bools, Clipboard, Colors, Dates, Device, Documents, Events, Files, Keyboard, Maths, Size, Dimensions, Numbers, Objects, Storage, StorageItem, StorageType, Strings, Urls */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Async", function() { return Async; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Bools", function() { return Bools; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Clipboard", function() { return Clipboard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Colors", function() { return Colors; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Dates", function() { return Dates; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Device", function() { return Device; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Documents", function() { return Documents; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Events", function() { return Events; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Files", function() { return Files; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Keyboard", function() { return Keyboard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Maths", function() { return Maths; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Size", function() { return Size; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Dimensions", function() { return Dimensions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Numbers", function() { return Numbers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Objects", function() { return Objects; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Storage", function() { return Storage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StorageItem", function() { return StorageItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StorageType", function() { return StorageType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Strings", function() { return Strings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Urls", function() { return Urls; });
var Async = /** @class */ (function () {
    function Async() {
    }
    Async.waitFor = function (test, successCallback, failureCallback, interval, maxTries, numTries) {
        if (!interval)
            interval = 200;
        if (!maxTries)
            maxTries = 100; // try 100 times over 20 seconds
        if (!numTries)
            numTries = 0;
        numTries += 1;
        if (numTries > maxTries) {
            if (failureCallback)
                failureCallback();
        }
        else if (test()) {
            successCallback();
        }
        else {
            setTimeout(function () {
                Async.waitFor(test, successCallback, failureCallback, interval, maxTries, numTries);
            }, interval);
        }
    };
    return Async;
}());

var Bools = /** @class */ (function () {
    function Bools() {
    }
    Bools.getBool = function (val, defaultVal) {
        if (val === null || typeof (val) === 'undefined') {
            return defaultVal;
        }
        return val;
    };
    return Bools;
}());

var Clipboard = /** @class */ (function () {
    function Clipboard() {
    }
    Clipboard.supportsCopy = function () {
        return document.queryCommandSupported && document.queryCommandSupported('copy');
    };
    Clipboard.copy = function (text) {
        text = Clipboard.convertBrToNewLine(text);
        var textArea = document.createElement("textarea");
        textArea.value = text;
        Clipboard.hideButKeepEnabled(textArea);
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    };
    Clipboard.hideButKeepEnabled = function (textArea) {
        // Place in top-left corner of screen regardless of scroll position.
        textArea.style.position = 'fixed';
        textArea.style.top = '0';
        textArea.style.left = '0';
        // Ensure it has a small width and height. Setting to 1px / 1em
        // doesn't work as this gives a negative w/h on some browsers.
        textArea.style.width = '2em';
        textArea.style.height = '2em';
        // We don't need padding, reducing the size if it does flash render.
        textArea.style.padding = '0';
        // Clean up any borders.
        textArea.style.border = 'none';
        textArea.style.outline = 'none';
        textArea.style.boxShadow = 'none';
        // Avoid flash of white box if rendered for any reason.
        textArea.style.background = 'transparent';
    };
    Clipboard.convertBrToNewLine = function (text) {
        var brRegex = /<br\s*[\/]?>/gi;
        text = text.replace(brRegex, "\n");
        return text;
    };
    return Clipboard;
}());

var Colors = /** @class */ (function () {
    function Colors() {
    }
    Colors.float32ColorToARGB = function (float32Color) {
        var a = (float32Color & 0xff000000) >>> 24;
        var r = (float32Color & 0xff0000) >>> 16;
        var g = (float32Color & 0xff00) >>> 8;
        var b = float32Color & 0xff;
        var result = [a, r, g, b];
        return result;
    };
    Colors._componentToHex = function (c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    };
    Colors.rgbToHexString = function (rgb) {
        Colors.coalesce(rgb);
        return "#" + Colors._componentToHex(rgb[0]) + Colors._componentToHex(rgb[1]) + Colors._componentToHex(rgb[2]);
    };
    Colors.argbToHexString = function (argb) {
        return "#" + Colors._componentToHex(argb[0]) + Colors._componentToHex(argb[1]) + Colors._componentToHex(argb[2]) + Colors._componentToHex(argb[3]);
    };
    Colors.coalesce = function (arr) {
        for (var i = 1; i < arr.length; i++) {
            if (typeof (arr[i]) === 'undefined')
                arr[i] = arr[i - 1];
        }
    };
    return Colors;
}());

var Dates = /** @class */ (function () {
    function Dates() {
    }
    Dates.getTimeStamp = function () {
        return new Date().getTime();
    };
    return Dates;
}());

var Device = /** @class */ (function () {
    function Device() {
    }
    Device.getPixelRatio = function (ctx) {
        var dpr = window.devicePixelRatio || 1;
        var bsr = ctx.webkitBackingStorePixelRatio ||
            ctx.mozBackingStorePixelRatio ||
            ctx.msBackingStorePixelRatio ||
            ctx.oBackingStorePixelRatio ||
            ctx.backingStorePixelRatio || 1;
        return dpr / bsr;
    };
    Device.isTouch = function () {
        return !!("ontouchstart" in window) || window.navigator.msMaxTouchPoints > 0;
    };
    return Device;
}());

var Documents = /** @class */ (function () {
    function Documents() {
    }
    Documents.isInIFrame = function () {
        // see http://stackoverflow.com/questions/326069/how-to-identify-if-a-webpage-is-being-loaded-inside-an-iframe-or-directly-into-t
        try {
            return window.self !== window.top;
        }
        catch (e) {
            return true;
        }
    };
    Documents.supportsFullscreen = function () {
        var doc = document.documentElement;
        var support = doc.requestFullscreen || doc.mozRequestFullScreen ||
            doc.webkitRequestFullScreen || doc.msRequestFullscreen;
        return support !== undefined;
    };
    Documents.isHidden = function () {
        var prop = Documents.getHiddenProp();
        if (!prop)
            return false;
        return true;
        //return document[prop];
    };
    Documents.getHiddenProp = function () {
        var prefixes = ['webkit', 'moz', 'ms', 'o'];
        // if 'hidden' is natively supported just return it
        if ('hidden' in document)
            return 'hidden';
        // otherwise loop over all the known prefixes until we find one
        for (var i = 0; i < prefixes.length; i++) {
            if ((prefixes[i] + 'Hidden') in document) {
                return prefixes[i] + 'Hidden';
            }
        }
        // otherwise it's not supported
        return null;
    };
    return Documents;
}());

var Events = /** @class */ (function () {
    function Events() {
    }
    Events.debounce = function (fn, debounceDuration) {
        // summary:
        //      Returns a debounced function that will make sure the given
        //      function is not triggered too much.
        // fn: Function
        //      Function to debounce.
        // debounceDuration: Number
        //      OPTIONAL. The amount of time in milliseconds for which we
        //      will debounce the function. (defaults to 100ms)
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
    return Events;
}());

var Files = /** @class */ (function () {
    function Files() {
    }
    Files.simplifyMimeType = function (mime) {
        switch (mime) {
            case 'text/plain':
                return 'txt';
            case 'image/jpeg':
                return 'jpg';
            case 'application/msword':
                return 'doc';
            case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                return 'docx';
            default:
                var parts = mime.split('/');
                return parts[parts.length - 1];
        }
    };
    return Files;
}());

var Keyboard = /** @class */ (function () {
    function Keyboard() {
    }
    Keyboard.getCharCode = function (e) {
        var charCode = (typeof e.which == "number") ? e.which : e.keyCode;
        return charCode;
    };
    return Keyboard;
}());

var Maths = /** @class */ (function () {
    function Maths() {
    }
    Maths.normalise = function (num, min, max) {
        return (num - min) / (max - min);
    };
    Maths.median = function (values) {
        values.sort(function (a, b) {
            return a - b;
        });
        var half = Math.floor(values.length / 2);
        if (values.length % 2) {
            return values[half];
        }
        else {
            return (values[half - 1] + values[half]) / 2.0;
        }
    };
    Maths.clamp = function (value, min, max) {
        return Math.min(Math.max(value, min), max);
    };
    return Maths;
}());

var Size = /** @class */ (function () {
    function Size(width, height) {
        this.width = width;
        this.height = height;
    }
    return Size;
}());

var Dimensions = /** @class */ (function () {
    function Dimensions() {
    }
    Dimensions.fitRect = function (width1, height1, width2, height2) {
        var ratio1 = height1 / width1;
        var ratio2 = height2 / width2;
        var width = 0;
        var height = 0;
        var scale;
        if (ratio1 < ratio2) {
            scale = width2 / width1;
            width = width1 * scale;
            height = height1 * scale;
        }
        else {
            scale = height2 / height1;
            width = width1 * scale;
            height = height1 * scale;
        }
        return new Size(Math.floor(width), Math.floor(height));
    };
    Dimensions.hitRect = function (x, y, w, h, mx, my) {
        if (mx > x && mx < (x + w) && my > y && my < (y + h)) {
            return true;
        }
        return false;
    };
    return Dimensions;
}());

var Numbers = /** @class */ (function () {
    function Numbers() {
    }
    Numbers.numericalInput = function (event) {
        // Allow: backspace, delete, tab and escape
        if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 ||
            // Allow: Ctrl+A
            (event.keyCode == 65 && event.ctrlKey === true) ||
            // Allow: home, end, left, right
            (event.keyCode >= 35 && event.keyCode <= 39)) {
            // let it happen, don't do anything
            return true;
        }
        else {
            // Ensure that it is a number and stop the keypress
            if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
                event.preventDefault();
                return false;
            }
            return true;
        }
    };
    return Numbers;
}());

var Objects = /** @class */ (function () {
    function Objects() {
    }
    Objects.toPlainObject = function (value) {
        value = Object(value);
        var result = {};
        for (var key in value) {
            result[key] = value[key];
        }
        return result;
    };
    return Objects;
}());

var Storage = /** @class */ (function () {
    function Storage() {
    }
    Storage.clear = function (storageType) {
        if (storageType === void 0) { storageType = StorageType.MEMORY; }
        switch (storageType) {
            case StorageType.MEMORY:
                this._memoryStorage = {};
                break;
            case StorageType.SESSION:
                sessionStorage.clear();
                break;
            case StorageType.LOCAL:
                localStorage.clear();
                break;
        }
    };
    Storage.clearExpired = function (storageType) {
        if (storageType === void 0) { storageType = StorageType.MEMORY; }
        var items = this.getItems(storageType);
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (this._isExpired(item)) {
                this.remove(item.key);
            }
        }
    };
    Storage.get = function (key, storageType) {
        if (storageType === void 0) { storageType = StorageType.MEMORY; }
        var data = null;
        switch (storageType) {
            case StorageType.MEMORY:
                data = this._memoryStorage[key];
                break;
            case StorageType.SESSION:
                data = sessionStorage.getItem(key);
                break;
            case StorageType.LOCAL:
                data = localStorage.getItem(key);
                break;
        }
        if (!data)
            return null;
        var item = null;
        try {
            item = JSON.parse(data);
        }
        catch (error) {
            return null;
        }
        if (!item)
            return null;
        if (this._isExpired(item))
            return null;
        // useful reference
        item.key = key;
        return item;
    };
    Storage._isExpired = function (item) {
        if (new Date().getTime() < item.expiresAt) {
            return false;
        }
        return true;
    };
    Storage.getItems = function (storageType) {
        if (storageType === void 0) { storageType = StorageType.MEMORY; }
        var items = [];
        switch (storageType) {
            case StorageType.MEMORY:
                var keys = Object.keys(this._memoryStorage);
                for (var i = 0; i < keys.length; i++) {
                    var item = this.get(keys[i], StorageType.MEMORY);
                    if (item) {
                        items.push(item);
                    }
                }
                break;
            case StorageType.SESSION:
                for (var i = 0; i < sessionStorage.length; i++) {
                    var key = sessionStorage.key(i);
                    if (key) {
                        var item = this.get(key, StorageType.SESSION);
                        if (item) {
                            items.push(item);
                        }
                    }
                }
                break;
            case StorageType.LOCAL:
                for (var i = 0; i < localStorage.length; i++) {
                    var key = localStorage.key(i);
                    if (key) {
                        var item = this.get(key, StorageType.LOCAL);
                        if (item) {
                            items.push(item);
                        }
                    }
                }
                break;
        }
        return items;
    };
    Storage.remove = function (key, storageType) {
        if (storageType === void 0) { storageType = StorageType.MEMORY; }
        switch (storageType) {
            case StorageType.MEMORY:
                delete this._memoryStorage[key];
                break;
            case StorageType.SESSION:
                sessionStorage.removeItem(key);
                break;
            case StorageType.LOCAL:
                localStorage.removeItem(key);
                break;
        }
    };
    Storage.set = function (key, value, expirationSecs, storageType) {
        if (storageType === void 0) { storageType = StorageType.MEMORY; }
        var expirationMS = expirationSecs * 1000;
        var record = new StorageItem();
        record.value = value;
        record.expiresAt = new Date().getTime() + expirationMS;
        switch (storageType) {
            case StorageType.MEMORY:
                this._memoryStorage[key] = JSON.stringify(record);
                break;
            case StorageType.SESSION:
                sessionStorage.setItem(key, JSON.stringify(record));
                break;
            case StorageType.LOCAL:
                localStorage.setItem(key, JSON.stringify(record));
                break;
        }
        return record;
    };
    Storage._memoryStorage = {};
    return Storage;
}());

var StorageItem = /** @class */ (function () {
    function StorageItem() {
    }
    return StorageItem;
}());

var StorageType;
(function (StorageType) {
    StorageType["MEMORY"] = "memory";
    StorageType["SESSION"] = "session";
    StorageType["LOCAL"] = "local";
})(StorageType || (StorageType = {}));
var Strings = /** @class */ (function () {
    function Strings() {
    }
    Strings.ellipsis = function (text, chars) {
        if (text.length <= chars)
            return text;
        var trimmedText = text.substr(0, chars);
        var lastSpaceIndex = trimmedText.lastIndexOf(" ");
        if (lastSpaceIndex != -1) {
            trimmedText = trimmedText.substr(0, Math.min(trimmedText.length, lastSpaceIndex));
        }
        return trimmedText + "&hellip;";
    };
    Strings.htmlDecode = function (encoded) {
        var div = document.createElement("div");
        div.innerHTML = encoded;
        return div.firstChild.nodeValue;
    };
    Strings.format = function (str) {
        var values = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            values[_i - 1] = arguments[_i];
        }
        for (var i = 0; i < values.length; i++) {
            var reg = new RegExp("\\{" + i + "\\}", "gm");
            str = str.replace(reg, values[i]);
        }
        return str;
    };
    Strings.isAlphanumeric = function (str) {
        return /^[a-zA-Z0-9]*$/.test(str);
    };
    Strings.toCssClass = function (str) {
        return str.replace(/[^a-z0-9]/g, function (s) {
            var c = s.charCodeAt(0);
            if (c == 32)
                return '-';
            if (c >= 65 && c <= 90)
                return '_' + s.toLowerCase();
            return '__' + ('000' + c.toString(16)).slice(-4);
        });
    };
    Strings.toFileName = function (str) {
        return str.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    };
    Strings.utf8_to_b64 = function (str) {
        return window.btoa(unescape(encodeURIComponent(str)));
    };
    return Strings;
}());

var Urls = /** @class */ (function () {
    function Urls() {
    }
    Urls.getHashParameter = function (key, doc) {
        if (!doc)
            doc = window.document;
        if (doc && doc.location) {
            return this.getHashParameterFromString(key, doc.location.hash);
        }
        return null;
    };
    Urls.getHashParameterFromString = function (key, url) {
        var regex = new RegExp("#.*[?&]" + key + "=([^&]+)(&|$)");
        var match = regex.exec(url);
        return (match ? decodeURIComponent(match[1].replace(/\+/g, " ")) : null);
    };
    Urls.setHashParameter = function (key, value, doc) {
        if (!doc)
            doc = window.document;
        if (doc && doc.location) {
            var kvp = this.updateURIKeyValuePair(doc.location.hash.replace('#?', ''), key, value);
            var newHash = "#?" + kvp;
            var url = doc.URL;
            // remove hash value (if present).
            var index = url.indexOf('#');
            if (index != -1) {
                url = url.substr(0, url.indexOf('#'));
            }
            doc.location.replace(url + newHash);
        }
    };
    Urls.getQuerystringParameter = function (key, w) {
        if (!w)
            w = window;
        return this.getQuerystringParameterFromString(key, w.location.search);
    };
    Urls.getQuerystringParameterFromString = function (key, querystring) {
        key = key.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regex = new RegExp("[\\?&]" + key + "=([^&#]*)");
        var match = regex.exec(querystring);
        return (match ? decodeURIComponent(match[1].replace(/\+/g, " ")) : null);
    };
    Urls.setQuerystringParameter = function (key, value, doc) {
        if (!doc)
            doc = window.document;
        if (doc && doc.location) {
            var kvp = this.updateURIKeyValuePair(doc.location.hash.replace('#?', ''), key, value);
            // redirects.
            window.location.search = kvp;
        }
    };
    Urls.updateURIKeyValuePair = function (uriSegment, key, value) {
        key = encodeURIComponent(key);
        value = encodeURIComponent(value);
        var kvp = uriSegment.split('&');
        // Array.split() returns an array with a single "" item
        // if the target string is empty. remove if present.
        if (kvp[0] == "")
            kvp.shift();
        var i = kvp.length;
        var x;
        // replace if already present.
        while (i--) {
            x = kvp[i].split('=');
            if (x[0] == key) {
                x[1] = value;
                kvp[i] = x.join('=');
                break;
            }
        }
        // not found, so append.
        if (i < 0) {
            kvp[kvp.length] = [key, value].join('=');
        }
        return kvp.join('&');
    };
    Urls.getUrlParts = function (url) {
        var a = document.createElement('a');
        a.href = url;
        return a;
    };
    Urls.convertToRelativeUrl = function (url) {
        var parts = this.getUrlParts(url);
        var relUri = parts.pathname + parts.searchWithin;
        if (!relUri.startsWith("/")) {
            relUri = "/" + relUri;
        }
        return relUri;
    };
    return Urls;
}());

//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@iiif/base-component/dist-esmodule/index.js":
/*!******************************************************************!*\
  !*** ./node_modules/@iiif/base-component/dist-esmodule/index.js ***!
  \******************************************************************/
/*! exports provided: BaseComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseComponent", function() { return BaseComponent; });
var BaseComponent = /** @class */ (function () {
    function BaseComponent(options) {
        this.options = options;
        this.options.data = Object.assign({}, this.data(), options.data);
    }
    BaseComponent.prototype._init = function () {
        this.el = this.options.target;
        if (!this.el) {
            console.warn('element not found');
            return false;
        }
        this.el.innerHTML = '';
        return true;
    };
    BaseComponent.prototype.data = function () {
        return {};
    };
    BaseComponent.prototype.on = function (name, callback, ctx) {
        var e = this._e || (this._e = {});
        (e[name] || (e[name] = [])).push({
            fn: callback,
            ctx: ctx
        });
    };
    BaseComponent.prototype.fire = function (name) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var data = [].slice.call(arguments, 1);
        var evtArr = ((this._e || (this._e = {}))[name] || []).slice();
        var i = 0;
        var len = evtArr.length;
        for (i; i < len; i++) {
            evtArr[i].fn.apply(evtArr[i].ctx, data);
        }
    };
    BaseComponent.prototype._resize = function () {
    };
    BaseComponent.prototype.set = function (_data) {
    };
    return BaseComponent;
}());

//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@iiif/manifold/dist-esmodule/AnnotationGroup.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@iiif/manifold/dist-esmodule/AnnotationGroup.js ***!
  \**********************************************************************/
/*! exports provided: AnnotationGroup */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnnotationGroup", function() { return AnnotationGroup; });
/* harmony import */ var _AnnotationRect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AnnotationRect */ "./node_modules/@iiif/manifold/dist-esmodule/AnnotationRect.js");

var AnnotationGroup = /** @class */ (function () {
    function AnnotationGroup(resource, canvasIndex) {
        this.rects = [];
        this.canvasIndex = canvasIndex;
        this.addRect(resource);
    }
    AnnotationGroup.prototype.addRect = function (resource) {
        var rect = new _AnnotationRect__WEBPACK_IMPORTED_MODULE_0__["AnnotationRect"](resource);
        rect.canvasIndex = this.canvasIndex;
        rect.index = this.rects.length;
        this.rects.push(rect);
        // sort ascending
        this.rects.sort(function (a, b) {
            return a.index - b.index;
        });
    };
    return AnnotationGroup;
}());

//# sourceMappingURL=AnnotationGroup.js.map

/***/ }),

/***/ "./node_modules/@iiif/manifold/dist-esmodule/AnnotationRect.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@iiif/manifold/dist-esmodule/AnnotationRect.js ***!
  \*********************************************************************/
/*! exports provided: AnnotationRect */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnnotationRect", function() { return AnnotationRect; });
var AnnotationRect = /** @class */ (function () {
    function AnnotationRect(result) {
        this.isVisible = true;
        var xywh = result.on.match(/.*xywh=(\d*),(\d*),(\d*),(\d*)/);
        this.x = Number(xywh[1]);
        this.y = Number(xywh[2]);
        this.width = Number(xywh[3]);
        this.height = Number(xywh[4]);
        this.chars = result.resource.chars;
    }
    return AnnotationRect;
}());

//# sourceMappingURL=AnnotationRect.js.map

/***/ }),

/***/ "./node_modules/@iiif/manifold/dist-esmodule/Bootstrapper.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@iiif/manifold/dist-esmodule/Bootstrapper.js ***!
  \*******************************************************************/
/*! exports provided: Bootstrapper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Bootstrapper", function() { return Bootstrapper; });
/* harmony import */ var _Helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Helper */ "./node_modules/@iiif/manifold/dist-esmodule/Helper.js");
/* harmony import */ var _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @iiif/vocabulary */ "./node_modules/@iiif/vocabulary/dist-esmodule/index.js");
/* harmony import */ var manifesto_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! manifesto.js */ "./node_modules/manifesto.js/dist-umd/manifesto.js");
/* harmony import */ var manifesto_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(manifesto_js__WEBPACK_IMPORTED_MODULE_2__);



var Bootstrapper = /** @class */ (function () {
    function Bootstrapper(options) {
        this._options = options;
        this._options.locale = this._options.locale || 'en-GB'; // default locale
    }
    Bootstrapper.prototype.bootstrap = function (res, rej) {
        var that = this;
        return new Promise(function (resolve, reject) {
            // if this is a recursive bootstrap we will have existing resolve & reject methods.
            if (res && rej) {
                resolve = res;
                reject = rej;
            }
            manifesto_js__WEBPACK_IMPORTED_MODULE_2__["Utils"].loadManifest(that._options.manifestUri).then(function (json) {
                that._loaded(that, json, resolve, reject);
            });
        });
    };
    Bootstrapper.prototype._loaded = function (bootstrapper, json, resolve, reject) {
        var iiifResource = manifesto_js__WEBPACK_IMPORTED_MODULE_2__["Utils"].parseManifest(json, {
            locale: bootstrapper._options.locale
        });
        if (iiifResource) {
            // only set the root IIIFResource on the first load
            if (!bootstrapper._options.iiifResource) {
                bootstrapper._options.iiifResource = iiifResource;
            }
            var collectionIndex = bootstrapper._options.collectionIndex; // this is either undefined, 0, or a positive number (defaults to undefined)
            var manifestIndex_1 = bootstrapper._options.manifestIndex; // this is either 0 or a positive number (defaults to 0)
            if (iiifResource.getIIIFResourceType() === _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_1__["IIIFResourceType"].COLLECTION) {
                // it's a collection
                var manifests = iiifResource.getManifests();
                var collections = iiifResource.getCollections();
                // if there are only collections available, set the collectionIndex to 0 if undefined.
                if (!manifests.length && collectionIndex === undefined) {
                    collectionIndex = 0;
                }
                if (collectionIndex !== undefined && collections && collections.length) {
                    // a collectionIndex has been passed and we have sub collections
                    iiifResource.getCollectionByIndex(collectionIndex).then(function (collection) {
                        if (!collection) {
                            reject('Collection index not found');
                        }
                        // Special case: we're trying to load the first manifest of the
                        // specified collection, but the collection has no manifests but does have
                        // subcollections. Thus, we should dive in until we find something
                        // we can display!
                        if (collection.getTotalManifests() === 0 && manifestIndex_1 === 0 && collection.getTotalCollections() > 0) {
                            bootstrapper._options.collectionIndex = 0;
                            bootstrapper._options.manifestUri = collection.id;
                            bootstrapper.bootstrap(resolve, reject);
                        }
                        else if (manifestIndex_1 !== undefined) {
                            collection.getManifestByIndex(manifestIndex_1).then(function (manifest) {
                                bootstrapper._options.manifest = manifest;
                                var helper = new _Helper__WEBPACK_IMPORTED_MODULE_0__["Helper"](bootstrapper._options);
                                resolve(helper);
                            });
                        }
                    });
                }
                else {
                    iiifResource.getManifestByIndex(bootstrapper._options.manifestIndex).then(function (manifest) {
                        bootstrapper._options.manifest = manifest;
                        var helper = new _Helper__WEBPACK_IMPORTED_MODULE_0__["Helper"](bootstrapper._options);
                        resolve(helper);
                    });
                }
            }
            else {
                bootstrapper._options.manifest = iiifResource;
                var helper = new _Helper__WEBPACK_IMPORTED_MODULE_0__["Helper"](bootstrapper._options);
                resolve(helper);
            }
        }
        else {
            console.error('Unable to load IIIF resource');
        }
    };
    return Bootstrapper;
}());

//# sourceMappingURL=Bootstrapper.js.map

/***/ }),

/***/ "./node_modules/@iiif/manifold/dist-esmodule/Errors.js":
/*!*************************************************************!*\
  !*** ./node_modules/@iiif/manifold/dist-esmodule/Errors.js ***!
  \*************************************************************/
/*! exports provided: Errors */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Errors", function() { return Errors; });
var Errors = /** @class */ (function () {
    function Errors() {
    }
    Errors.manifestNotLoaded = "Manifest has not loaded yet";
    return Errors;
}());

//# sourceMappingURL=Errors.js.map

/***/ }),

/***/ "./node_modules/@iiif/manifold/dist-esmodule/ExternalResource.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@iiif/manifold/dist-esmodule/ExternalResource.js ***!
  \***********************************************************************/
/*! exports provided: ExternalResource */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExternalResource", function() { return ExternalResource; });
/* harmony import */ var _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @iiif/vocabulary */ "./node_modules/@iiif/vocabulary/dist-esmodule/index.js");
/* harmony import */ var _edsilv_http_status_codes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @edsilv/http-status-codes */ "./node_modules/@edsilv/http-status-codes/dist-umd/httpstatuscodes.js");
/* harmony import */ var _edsilv_http_status_codes__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_edsilv_http_status_codes__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var manifesto_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! manifesto.js */ "./node_modules/manifesto.js/dist-umd/manifesto.js");
/* harmony import */ var manifesto_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(manifesto_js__WEBPACK_IMPORTED_MODULE_2__);



var ExternalResource = /** @class */ (function () {
    function ExternalResource(canvas, options) {
        this.authHoldingPage = null;
        this.clickThroughService = null;
        this.externalService = null;
        this.isProbed = false;
        this.isResponseHandled = false;
        this.kioskService = null;
        this.loginService = null;
        this.logoutService = null;
        this.probeService = null;
        this.restrictedService = null;
        this.tokenService = null;
        canvas.externalResource = this;
        this.dataUri = this._getDataUri(canvas);
        this.index = canvas.index;
        this.authAPIVersion = options.authApiVersion;
        this._parseAuthServices(canvas);
        // get the height and width of the image resource if available
        this._parseDimensions(canvas);
    }
    ExternalResource.prototype._getImageServiceDescriptor = function (services) {
        var infoUri = null;
        for (var i = 0; i < services.length; i++) {
            var service = services[i];
            var id = service.id;
            if (!id.endsWith('/')) {
                id += '/';
            }
            if (manifesto_js__WEBPACK_IMPORTED_MODULE_2__["Utils"].isImageProfile(service.getProfile())) {
                infoUri = id + 'info.json';
            }
        }
        return infoUri;
    };
    ExternalResource.prototype._getDataUri = function (canvas) {
        var content = canvas.getContent();
        var images = canvas.getImages();
        var infoUri = null;
        // presentation 3
        if (content && content.length) {
            var annotation = content[0];
            var annotationBody = annotation.getBody();
            if (annotationBody.length) {
                var body = annotationBody[0];
                var services = body.getServices();
                if (services.length) {
                    infoUri = this._getImageServiceDescriptor(services);
                    if (infoUri) {
                        return infoUri;
                    }
                }
                // no image services. return the image id
                return annotationBody[0].id;
            }
            return null;
        }
        else if (images && images.length) { // presentation 2
            var firstImage = images[0];
            var resource = firstImage.getResource();
            var services = resource.getServices();
            if (services.length) {
                infoUri = this._getImageServiceDescriptor(services);
                if (infoUri) {
                    return infoUri;
                }
            }
            // no image services. return the image id
            return resource.id;
        }
        else {
            // Legacy IxIF
            var service = canvas.getService(_iiif_vocabulary__WEBPACK_IMPORTED_MODULE_0__["ServiceProfile"].IXIF);
            if (service) { // todo: deprecate
                return service.getInfoUri();
            }
            // return the canvas id.
            return canvas.id;
        }
    };
    ExternalResource.prototype._parseAuthServices = function (resource) {
        if (this.authAPIVersion === 0.9) {
            this.clickThroughService = manifesto_js__WEBPACK_IMPORTED_MODULE_2__["Utils"].getService(resource, _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_0__["ServiceProfile"].AUTH_0_CLICK_THROUGH);
            this.loginService = manifesto_js__WEBPACK_IMPORTED_MODULE_2__["Utils"].getService(resource, _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_0__["ServiceProfile"].AUTH_0_LOGIN);
            this.restrictedService = manifesto_js__WEBPACK_IMPORTED_MODULE_2__["Utils"].getService(resource, _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_0__["ServiceProfile"].AUTH_0_RESTRICTED);
            if (this.clickThroughService) {
                this.logoutService = this.clickThroughService.getService(_iiif_vocabulary__WEBPACK_IMPORTED_MODULE_0__["ServiceProfile"].AUTH_0_LOGOUT);
                this.tokenService = this.clickThroughService.getService(_iiif_vocabulary__WEBPACK_IMPORTED_MODULE_0__["ServiceProfile"].AUTH_0_TOKEN);
            }
            else if (this.loginService) {
                this.logoutService = this.loginService.getService(_iiif_vocabulary__WEBPACK_IMPORTED_MODULE_0__["ServiceProfile"].AUTH_0_LOGOUT);
                this.tokenService = this.loginService.getService(_iiif_vocabulary__WEBPACK_IMPORTED_MODULE_0__["ServiceProfile"].AUTH_0_TOKEN);
            }
            else if (this.restrictedService) {
                this.logoutService = this.restrictedService.getService(_iiif_vocabulary__WEBPACK_IMPORTED_MODULE_0__["ServiceProfile"].AUTH_0_LOGOUT);
                this.tokenService = this.restrictedService.getService(_iiif_vocabulary__WEBPACK_IMPORTED_MODULE_0__["ServiceProfile"].AUTH_0_TOKEN);
            }
        }
        else { // auth 1
            // if the resource is a canvas, not an info.json, look for auth services on its content.
            if (resource.isCanvas !== undefined && resource.isCanvas()) {
                var content = resource.getContent();
                if (content && content.length) {
                    var body = content[0].getBody();
                    if (body && body.length) {
                        var annotation = body[0];
                        resource = annotation;
                    }
                }
            }
            this.clickThroughService = manifesto_js__WEBPACK_IMPORTED_MODULE_2__["Utils"].getService(resource, _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_0__["ServiceProfile"].AUTH_1_CLICK_THROUGH);
            this.loginService = manifesto_js__WEBPACK_IMPORTED_MODULE_2__["Utils"].getService(resource, _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_0__["ServiceProfile"].AUTH_1_LOGIN);
            this.externalService = manifesto_js__WEBPACK_IMPORTED_MODULE_2__["Utils"].getService(resource, _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_0__["ServiceProfile"].AUTH_1_EXTERNAL);
            this.kioskService = manifesto_js__WEBPACK_IMPORTED_MODULE_2__["Utils"].getService(resource, _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_0__["ServiceProfile"].AUTH_1_KIOSK);
            if (this.clickThroughService) {
                this.logoutService = this.clickThroughService.getService(_iiif_vocabulary__WEBPACK_IMPORTED_MODULE_0__["ServiceProfile"].AUTH_1_LOGOUT);
                this.tokenService = this.clickThroughService.getService(_iiif_vocabulary__WEBPACK_IMPORTED_MODULE_0__["ServiceProfile"].AUTH_1_TOKEN);
                this.probeService = this.clickThroughService.getService(_iiif_vocabulary__WEBPACK_IMPORTED_MODULE_0__["ServiceProfile"].AUTH_1_PROBE);
            }
            else if (this.loginService) {
                this.logoutService = this.loginService.getService(_iiif_vocabulary__WEBPACK_IMPORTED_MODULE_0__["ServiceProfile"].AUTH_1_LOGOUT);
                this.tokenService = this.loginService.getService(_iiif_vocabulary__WEBPACK_IMPORTED_MODULE_0__["ServiceProfile"].AUTH_1_TOKEN);
                this.probeService = this.loginService.getService(_iiif_vocabulary__WEBPACK_IMPORTED_MODULE_0__["ServiceProfile"].AUTH_1_PROBE);
            }
            else if (this.externalService) {
                this.logoutService = this.externalService.getService(_iiif_vocabulary__WEBPACK_IMPORTED_MODULE_0__["ServiceProfile"].AUTH_1_LOGOUT);
                this.tokenService = this.externalService.getService(_iiif_vocabulary__WEBPACK_IMPORTED_MODULE_0__["ServiceProfile"].AUTH_1_TOKEN);
                this.probeService = this.externalService.getService(_iiif_vocabulary__WEBPACK_IMPORTED_MODULE_0__["ServiceProfile"].AUTH_1_PROBE);
            }
            else if (this.kioskService) {
                this.logoutService = this.kioskService.getService(_iiif_vocabulary__WEBPACK_IMPORTED_MODULE_0__["ServiceProfile"].AUTH_1_LOGOUT);
                this.tokenService = this.kioskService.getService(_iiif_vocabulary__WEBPACK_IMPORTED_MODULE_0__["ServiceProfile"].AUTH_1_TOKEN);
                this.probeService = this.kioskService.getService(_iiif_vocabulary__WEBPACK_IMPORTED_MODULE_0__["ServiceProfile"].AUTH_1_PROBE);
            }
        }
    };
    ExternalResource.prototype._parseDimensions = function (canvas) {
        var images = canvas.getImages();
        if (images && images.length) {
            var firstImage = images[0];
            var resource = firstImage.getResource();
            this.width = resource.getWidth();
            this.height = resource.getHeight();
        }
        else {
            // presentation 3
            images = canvas.getContent();
            if (images.length) {
                var annotation = images[0];
                var body = annotation.getBody();
                if (body.length) {
                    this.width = body[0].getWidth();
                    this.height = body[0].getHeight();
                }
            }
        }
    };
    ExternalResource.prototype.isAccessControlled = function () {
        if (this.clickThroughService || this.loginService || this.externalService || this.kioskService || this.probeService) {
            return true;
        }
        return false;
    };
    ExternalResource.prototype.hasServiceDescriptor = function () {
        if (this.dataUri) {
            return this.dataUri.endsWith('info.json');
        }
        return false;
    };
    ExternalResource.prototype.getData = function (accessToken) {
        var that = this;
        that.data = {};
        return new Promise(function (resolve, reject) {
            if (!that.dataUri) {
                reject('There is no dataUri to fetch');
                return;
            }
            // if the resource has a probe service, use that to get http status code
            if (that.probeService) {
                that.isProbed = true;
                // leaving this in for reference until the XHR version is fully tested
                // $.ajax(<JQueryAjaxSettings>{
                //     url: that.probeService.id,
                //     type: 'GET',
                //     dataType: 'json',
                //     beforeSend: (xhr) => {
                //         if (accessToken) {
                //             xhr.setRequestHeader("Authorization", "Bearer " + accessToken.accessToken);
                //         }
                //     }
                // }).done((data: any) => {
                //     let contentLocation: string = unescape(data.contentLocation);
                //     if (contentLocation !== that.dataUri) {
                //         that.status = HTTPStatusCode.MOVED_TEMPORARILY;
                //     } else {
                //         that.status = HTTPStatusCode.OK;
                //     }
                //     resolve(that);
                // }).fail((error) => {
                //     that.status = error.status;
                //     that.error = error;
                //     resolve(that);
                // });
                // xhr implementation
                var xhr_1 = new XMLHttpRequest();
                xhr_1.open('GET', that.probeService.id, true);
                xhr_1.withCredentials = true;
                xhr_1.onload = function () {
                    var data = JSON.parse(xhr_1.responseText);
                    var contentLocation = unescape(data.contentLocation);
                    if (contentLocation !== that.dataUri) {
                        that.status = _edsilv_http_status_codes__WEBPACK_IMPORTED_MODULE_1__["MOVED_TEMPORARILY"];
                    }
                    else {
                        that.status = _edsilv_http_status_codes__WEBPACK_IMPORTED_MODULE_1__["OK"];
                    }
                    resolve(that);
                };
                xhr_1.onerror = function () {
                    that.status = xhr_1.status;
                    resolve(that);
                };
                xhr_1.send();
            }
            else {
                // check if dataUri ends with info.json
                // if not issue a HEAD request.
                var type = 'GET';
                if (!that.hasServiceDescriptor()) {
                    // If access control is unnecessary, short circuit the process.
                    // Note that isAccessControlled check for short-circuiting only
                    // works in the "binary resource" context, since in that case,
                    // we know about access control from the manifest. For image
                    // resources, we need to check info.json for details and can't
                    // short-circuit like this.
                    if (!that.isAccessControlled()) {
                        that.status = _edsilv_http_status_codes__WEBPACK_IMPORTED_MODULE_1__["OK"];
                        resolve(that);
                        return;
                    }
                    type = 'HEAD';
                }
                // leaving this in for reference until the XHR version is fully tested
                // $.ajax(<JQueryAjaxSettings>{
                //     url: that.dataUri,
                //     type: type,
                //     dataType: 'json',
                //     beforeSend: (xhr) => {
                //         if (accessToken) {
                //             xhr.setRequestHeader("Authorization", "Bearer " + accessToken.accessToken);
                //         }
                //     }
                // }).done((data: any) => {
                //     // if it's a resource without an info.json
                //     // todo: if resource doesn't have a @profile
                //     if (!data) {
                //         that.status = HTTPStatusCode.OK;
                //         resolve(that);
                //     } else {
                //         let uri: string = unescape(data['@id']);
                //         that.data = data;
                //         that._parseAuthServices(that.data);
                //         // remove trailing /info.json
                //         if (uri.endsWith('/info.json')){
                //             uri = uri.substr(0, uri.lastIndexOf('/'));
                //         }
                //         let dataUri: string | null = that.dataUri;
                //         if (dataUri && dataUri.endsWith('/info.json')){
                //             dataUri = dataUri.substr(0, dataUri.lastIndexOf('/'));
                //         }
                //         // if the request was redirected to a degraded version and there's a login service to get the full quality version
                //         if (uri !== dataUri && that.loginService) {
                //             that.status = HTTPStatusCode.MOVED_TEMPORARILY;
                //         } else {
                //             that.status = HTTPStatusCode.OK;
                //         }
                //         resolve(that);
                //     }
                // }).fail((error) => {
                //     that.status = error.status;
                //     that.error = error;
                //     if (error.responseJSON){
                //         that._parseAuthServices(error.responseJSON);
                //     }
                //     resolve(that);
                // });
                // xhr implementation
                var xhr_2 = new XMLHttpRequest();
                xhr_2.open(type, that.dataUri, true);
                //xhr.withCredentials = true;
                if (accessToken) {
                    xhr_2.setRequestHeader("Authorization", "Bearer " + accessToken.accessToken);
                }
                xhr_2.onload = function () {
                    var data = JSON.parse(xhr_2.responseText);
                    // if it's a resource without an info.json
                    // todo: if resource doesn't have a @profile
                    if (!data) {
                        that.status = _edsilv_http_status_codes__WEBPACK_IMPORTED_MODULE_1__["OK"];
                        resolve(that);
                    }
                    else {
                        var uri = unescape(data['@id']);
                        that.data = data;
                        that._parseAuthServices(that.data);
                        // remove trailing /info.json
                        if (uri.endsWith('/info.json')) {
                            uri = uri.substr(0, uri.lastIndexOf('/'));
                        }
                        var dataUri = that.dataUri;
                        if (dataUri && dataUri.endsWith('/info.json')) {
                            dataUri = dataUri.substr(0, dataUri.lastIndexOf('/'));
                        }
                        // if the request was redirected to a degraded version and there's a login service to get the full quality version
                        if (uri !== dataUri && that.loginService) {
                            that.status = _edsilv_http_status_codes__WEBPACK_IMPORTED_MODULE_1__["MOVED_TEMPORARILY"];
                        }
                        else {
                            that.status = _edsilv_http_status_codes__WEBPACK_IMPORTED_MODULE_1__["OK"];
                        }
                        resolve(that);
                    }
                };
                xhr_2.onerror = function () {
                    that.status = xhr_2.status;
                    if (xhr_2.responseText) {
                        that._parseAuthServices(JSON.parse(xhr_2.responseText));
                    }
                    resolve(that);
                };
                xhr_2.send();
            }
        });
    };
    return ExternalResource;
}());

//# sourceMappingURL=ExternalResource.js.map

/***/ }),

/***/ "./node_modules/@iiif/manifold/dist-esmodule/Helper.js":
/*!*************************************************************!*\
  !*** ./node_modules/@iiif/manifold/dist-esmodule/Helper.js ***!
  \*************************************************************/
/*! exports provided: Helper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Helper", function() { return Helper; });
/* harmony import */ var _MultiSelectState__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MultiSelectState */ "./node_modules/@iiif/manifold/dist-esmodule/MultiSelectState.js");
/* harmony import */ var _MetadataGroup__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MetadataGroup */ "./node_modules/@iiif/manifold/dist-esmodule/MetadataGroup.js");
/* harmony import */ var _TreeSortType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TreeSortType */ "./node_modules/@iiif/manifold/dist-esmodule/TreeSortType.js");
/* harmony import */ var _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @iiif/vocabulary */ "./node_modules/@iiif/vocabulary/dist-esmodule/index.js");
/* harmony import */ var _Errors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Errors */ "./node_modules/@iiif/manifold/dist-esmodule/Errors.js");
/* harmony import */ var manifesto_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! manifesto.js */ "./node_modules/manifesto.js/dist-umd/manifesto.js");
/* harmony import */ var manifesto_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(manifesto_js__WEBPACK_IMPORTED_MODULE_5__);






var Helper = /** @class */ (function () {
    function Helper(options) {
        this.options = options;
        this.iiifResource = this.options.iiifResource;
        this.manifestUri = this.options.manifestUri;
        this.manifest = this.options.manifest;
        this.collectionIndex = this.options.collectionIndex || 0;
        this.manifestIndex = this.options.manifestIndex || 0;
        this.sequenceIndex = this.options.sequenceIndex || 0;
        this.canvasIndex = this.options.canvasIndex || 0;
    }
    // getters //
    Helper.prototype.getAutoCompleteService = function () {
        var service = this.getSearchService();
        if (service) {
            return service.getService(_iiif_vocabulary__WEBPACK_IMPORTED_MODULE_3__["ServiceProfile"].SEARCH_0_AUTO_COMPLETE);
        }
        return null;
    };
    Helper.prototype.getAttribution = function () {
        if (!this.manifest) {
            throw new Error(_Errors__WEBPACK_IMPORTED_MODULE_4__["Errors"].manifestNotLoaded);
        }
        var attribution = this.manifest.getAttribution();
        if (attribution) {
            return manifesto_js__WEBPACK_IMPORTED_MODULE_5__["LanguageMap"].getValue(attribution, this.options.locale);
        }
        return null;
    };
    Helper.prototype.getCanvases = function () {
        return this.getCurrentSequence().getCanvases();
    };
    Helper.prototype.getCanvasById = function (id) {
        return this.getCurrentSequence().getCanvasById(id);
    };
    Helper.prototype.getCanvasesById = function (ids) {
        var canvases = [];
        for (var i = 0; i < ids.length; i++) {
            var id = ids[i];
            var canvas = this.getCanvasById(id);
            if (canvas) {
                canvases.push(canvas);
            }
        }
        return canvases;
    };
    Helper.prototype.getCanvasByIndex = function (index) {
        return this.getCurrentSequence().getCanvasByIndex(index);
    };
    Helper.prototype.getCanvasIndexById = function (id) {
        return this.getCurrentSequence().getCanvasIndexById(id);
    };
    Helper.prototype.getCanvasIndexByLabel = function (label) {
        var foliated = this.getManifestType() === manifesto_js__WEBPACK_IMPORTED_MODULE_5__["ManifestType"].MANUSCRIPT;
        return this.getCurrentSequence().getCanvasIndexByLabel(label, foliated);
    };
    Helper.prototype.getCanvasRange = function (canvas, path) {
        var ranges = this.getCanvasRanges(canvas);
        if (path) {
            for (var i = 0; i < ranges.length; i++) {
                var range = ranges[i];
                if (range.path === path) {
                    return range;
                }
            }
            return null;
        }
        else {
            return ranges[0]; // else return the first range
        }
    };
    Helper.prototype.getCanvasRanges = function (canvas) {
        if (!this.manifest) {
            throw new Error(_Errors__WEBPACK_IMPORTED_MODULE_4__["Errors"].manifestNotLoaded);
        }
        if (canvas.ranges) {
            return canvas.ranges; // cache
        }
        else {
            // todo: write test
            canvas.ranges = this.manifest.getAllRanges().filter(function (range) { return (range.getCanvasIds().some(function (cid) { return manifesto_js__WEBPACK_IMPORTED_MODULE_5__["Utils"].normaliseUrl(cid) === manifesto_js__WEBPACK_IMPORTED_MODULE_5__["Utils"].normaliseUrl(canvas.id); })); });
        }
        return canvas.ranges;
    };
    Helper.prototype.getCollectionIndex = function (iiifResource) {
        // todo: this only works for collections nested one level deep
        if (iiifResource.parentCollection && !iiifResource.parentCollection.parentCollection) {
            // manifest must be in the root
            return undefined;
        }
        else if (iiifResource.parentCollection) {
            return iiifResource.parentCollection.index;
        }
        return undefined;
    };
    Helper.prototype.getCurrentCanvas = function () {
        return this.getCurrentSequence().getCanvasByIndex(this.canvasIndex);
    };
    Helper.prototype.getCurrentSequence = function () {
        return this.getSequenceByIndex(this.sequenceIndex);
    };
    Helper.prototype.getDescription = function () {
        if (!this.manifest) {
            throw new Error(_Errors__WEBPACK_IMPORTED_MODULE_4__["Errors"].manifestNotLoaded);
        }
        var description = this.manifest.getDescription();
        if (description) {
            return manifesto_js__WEBPACK_IMPORTED_MODULE_5__["LanguageMap"].getValue(description, this.options.locale);
        }
        return null;
    };
    Helper.prototype.getLabel = function () {
        if (!this.manifest) {
            throw new Error(_Errors__WEBPACK_IMPORTED_MODULE_4__["Errors"].manifestNotLoaded);
        }
        var label = this.manifest.getLabel();
        if (label) {
            return manifesto_js__WEBPACK_IMPORTED_MODULE_5__["LanguageMap"].getValue(label, this.options.locale);
        }
        return null;
    };
    Helper.prototype.getLastCanvasLabel = function (alphanumeric) {
        return this.getCurrentSequence().getLastCanvasLabel(alphanumeric);
    };
    Helper.prototype.getFirstPageIndex = function () {
        return 0; // why is this needed?
    };
    Helper.prototype.getLastPageIndex = function () {
        return this.getTotalCanvases() - 1;
    };
    Helper.prototype.getLicense = function () {
        if (!this.manifest) {
            throw new Error(_Errors__WEBPACK_IMPORTED_MODULE_4__["Errors"].manifestNotLoaded);
        }
        return this.manifest.getLicense();
    };
    Helper.prototype.getLogo = function () {
        if (!this.manifest) {
            throw new Error(_Errors__WEBPACK_IMPORTED_MODULE_4__["Errors"].manifestNotLoaded);
        }
        return this.manifest.getLogo();
    };
    Helper.prototype.getManifestType = function () {
        if (!this.manifest) {
            throw new Error(_Errors__WEBPACK_IMPORTED_MODULE_4__["Errors"].manifestNotLoaded);
        }
        var manifestType = this.manifest.getManifestType();
        // default to monograph
        if (manifestType === manifesto_js__WEBPACK_IMPORTED_MODULE_5__["ManifestType"].EMPTY) {
            manifestType = manifesto_js__WEBPACK_IMPORTED_MODULE_5__["ManifestType"].MONOGRAPH;
        }
        return manifestType;
    };
    Helper.prototype.getMetadata = function (options) {
        if (!this.manifest) {
            throw new Error(_Errors__WEBPACK_IMPORTED_MODULE_4__["Errors"].manifestNotLoaded);
        }
        var metadataGroups = [];
        var manifestMetadata = this.manifest.getMetadata();
        var manifestGroup = new _MetadataGroup__WEBPACK_IMPORTED_MODULE_1__["MetadataGroup"](this.manifest);
        var locale = this.options.locale; // this will always default to en-GB
        if (manifestMetadata && manifestMetadata.length) {
            manifestGroup.addMetadata(manifestMetadata, true);
        }
        if (this.manifest.getDescription().length) {
            var metadataItem = new manifesto_js__WEBPACK_IMPORTED_MODULE_5__["LabelValuePair"](locale);
            metadataItem.label = [new manifesto_js__WEBPACK_IMPORTED_MODULE_5__["Language"]("description", locale)];
            metadataItem.value = this.manifest.getDescription();
            metadataItem.isRootLevel = true;
            manifestGroup.addItem(metadataItem);
        }
        if (this.manifest.getAttribution().length) {
            var metadataItem = new manifesto_js__WEBPACK_IMPORTED_MODULE_5__["LabelValuePair"](locale);
            metadataItem.label = [new manifesto_js__WEBPACK_IMPORTED_MODULE_5__["Language"]("attribution", locale)];
            metadataItem.value = this.manifest.getAttribution();
            metadataItem.isRootLevel = true;
            manifestGroup.addItem(metadataItem);
        }
        var license = this.manifest.getLicense();
        if (license) {
            var item = {
                label: "license",
                value: (options && options.licenseFormatter) ? options.licenseFormatter.format(license) : license
            };
            var metadataItem = new manifesto_js__WEBPACK_IMPORTED_MODULE_5__["LabelValuePair"](locale);
            metadataItem.parse(item);
            metadataItem.isRootLevel = true;
            manifestGroup.addItem(metadataItem);
        }
        if (this.manifest.getLogo()) {
            var item = {
                label: "logo",
                value: '<img src="' + this.manifest.getLogo() + '"/>'
            };
            var metadataItem = new manifesto_js__WEBPACK_IMPORTED_MODULE_5__["LabelValuePair"](locale);
            metadataItem.parse(item);
            metadataItem.isRootLevel = true;
            manifestGroup.addItem(metadataItem);
        }
        metadataGroups.push(manifestGroup);
        if (options) {
            return this._parseMetadataOptions(options, metadataGroups);
        }
        else {
            return metadataGroups;
        }
    };
    Helper.prototype.getRequiredStatement = function () {
        if (!this.manifest) {
            throw new Error(_Errors__WEBPACK_IMPORTED_MODULE_4__["Errors"].manifestNotLoaded);
        }
        var requiredStatement = this.manifest.getRequiredStatement();
        if (requiredStatement) {
            return {
                label: requiredStatement.getLabel(),
                value: requiredStatement.getValue()
            };
        }
        return null;
    };
    Helper.prototype._parseMetadataOptions = function (options, metadataGroups) {
        // get sequence metadata
        var sequence = this.getCurrentSequence();
        var sequenceMetadata = sequence.getMetadata();
        if (sequenceMetadata && sequenceMetadata.length) {
            var sequenceGroup = new _MetadataGroup__WEBPACK_IMPORTED_MODULE_1__["MetadataGroup"](sequence);
            sequenceGroup.addMetadata(sequenceMetadata);
            metadataGroups.push(sequenceGroup);
        }
        // get range metadata
        if (options.range) {
            var rangeGroups = this._getRangeMetadata([], options.range);
            rangeGroups = rangeGroups.reverse();
            metadataGroups = metadataGroups.concat(rangeGroups);
        }
        // get canvas metadata
        if (options.canvases && options.canvases.length) {
            for (var i = 0; i < options.canvases.length; i++) {
                var canvas = options.canvases[i];
                var canvasMetadata = canvas.getMetadata();
                if (canvasMetadata && canvasMetadata.length) {
                    var canvasGroup = new _MetadataGroup__WEBPACK_IMPORTED_MODULE_1__["MetadataGroup"](canvas);
                    canvasGroup.addMetadata(canvas.getMetadata());
                    metadataGroups.push(canvasGroup);
                }
                // add image metadata
                var images = canvas.getImages();
                for (var j = 0; j < images.length; j++) {
                    var image = images[j];
                    var imageMetadata = image.getMetadata();
                    if (imageMetadata && imageMetadata.length) {
                        var imageGroup = new _MetadataGroup__WEBPACK_IMPORTED_MODULE_1__["MetadataGroup"](image);
                        imageGroup.addMetadata(imageMetadata);
                        metadataGroups.push(imageGroup);
                    }
                }
            }
        }
        return metadataGroups;
    };
    Helper.prototype._getRangeMetadata = function (metadataGroups, range) {
        var rangeMetadata = range.getMetadata();
        if (rangeMetadata && rangeMetadata.length) {
            var rangeGroup = new _MetadataGroup__WEBPACK_IMPORTED_MODULE_1__["MetadataGroup"](range);
            rangeGroup.addMetadata(rangeMetadata);
            metadataGroups.push(rangeGroup);
        }
        else if (range.parentRange) {
            return this._getRangeMetadata(metadataGroups, range.parentRange);
        }
        return metadataGroups;
    };
    Helper.prototype.getMultiSelectState = function () {
        if (!this._multiSelectState) {
            this._multiSelectState = new _MultiSelectState__WEBPACK_IMPORTED_MODULE_0__["MultiSelectState"]();
            this._multiSelectState.ranges = this.getRanges().slice(0);
            this._multiSelectState.canvases = this.getCurrentSequence().getCanvases().slice(0);
        }
        return this._multiSelectState;
    };
    Helper.prototype.getCurrentRange = function () {
        if (this.rangeId) {
            return this.getRangeById(this.rangeId);
        }
        return null;
    };
    Helper.prototype.getPosterCanvas = function () {
        if (!this.manifest) {
            throw new Error(_Errors__WEBPACK_IMPORTED_MODULE_4__["Errors"].manifestNotLoaded);
        }
        return this.manifest.getPosterCanvas();
    };
    Helper.prototype.getPosterImage = function () {
        var posterCanvas = this.getPosterCanvas();
        if (posterCanvas) {
            var content = posterCanvas.getContent();
            if (content && content.length) {
                var anno = content[0];
                var body = anno.getBody();
                return body[0].id;
            }
        }
        return null;
    };
    Helper.prototype.getPreviousRange = function (range) {
        var currentRange = null;
        if (range) {
            currentRange = range;
        }
        else {
            currentRange = this.getCurrentRange();
        }
        if (currentRange) {
            var flatTree = this.getFlattenedTree();
            if (flatTree) {
                for (var i = 0; i < flatTree.length; i++) {
                    var node = flatTree[i];
                    // find current range in flattened tree
                    if (node && node.data.id === currentRange.id) {
                        // find the first node before it that has canvases
                        while (i > 0) {
                            i--;
                            var prevNode = flatTree[i];
                            return prevNode.data;
                        }
                        break;
                    }
                }
            }
        }
        return null;
    };
    Helper.prototype.getNextRange = function (range) {
        // if a range is passed, use that. otherwise get the current range.
        var currentRange = null;
        if (range) {
            currentRange = range;
        }
        else {
            currentRange = this.getCurrentRange();
        }
        if (currentRange) {
            var flatTree = this.getFlattenedTree();
            if (flatTree) {
                for (var i = 0; i < flatTree.length; i++) {
                    var node = flatTree[i];
                    // find current range in flattened tree
                    if (node && node.data.id === currentRange.id) {
                        // find the first node after it that has canvases
                        while (i < flatTree.length - 1) {
                            i++;
                            var nextNode = flatTree[i];
                            if (nextNode.data.canvases && nextNode.data.canvases.length) {
                                return nextNode.data;
                            }
                        }
                        break;
                    }
                }
            }
        }
        return null;
    };
    Helper.prototype.getFlattenedTree = function (treeNode) {
        var t = null;
        if (!treeNode) {
            t = this.getTree();
        }
        else {
            t = treeNode;
        }
        if (t) {
            return this._flattenTree(t, 'nodes');
        }
        return null;
    };
    // use object.assign to return a set of new nodes
    // right now the UV needs the nodes to retain properties for databinding like expanded
    // as we're not redrawing the tree every time as per react.
    // maybe make this optional.
    // not sure why deleting the nodes key from each node is necessary
    Helper.prototype._flattenTree = function (root, key) {
        var _this = this;
        var flatten = [root]; //[Object.assign({}, root)];
        //delete flatten[0][key];
        if (root[key] && root[key].length > 0) {
            return flatten.concat(root[key]
                .map(function (child) { return _this._flattenTree(child, key); })
                .reduce(function (a, b) { return a.concat(b); }, []));
        }
        return flatten;
    };
    Helper.prototype.getRanges = function () {
        return this.manifest.getAllRanges();
    };
    Helper.prototype.getRangeByPath = function (path) {
        if (!this.manifest) {
            throw new Error(_Errors__WEBPACK_IMPORTED_MODULE_4__["Errors"].manifestNotLoaded);
        }
        return this.manifest.getRangeByPath(path);
    };
    Helper.prototype.getRangeById = function (id) {
        if (!this.manifest) {
            throw new Error(_Errors__WEBPACK_IMPORTED_MODULE_4__["Errors"].manifestNotLoaded);
        }
        return this.manifest.getRangeById(id);
    };
    Helper.prototype.getRangeCanvases = function (range) {
        var ids = range.getCanvasIds();
        return this.getCanvasesById(ids);
    };
    Helper.prototype.getRelated = function () {
        if (!this.manifest) {
            throw new Error(_Errors__WEBPACK_IMPORTED_MODULE_4__["Errors"].manifestNotLoaded);
        }
        return this.manifest.getRelated();
    };
    Helper.prototype.getSearchService = function () {
        if (!this.manifest) {
            throw new Error(_Errors__WEBPACK_IMPORTED_MODULE_4__["Errors"].manifestNotLoaded);
        }
        return this.manifest.getService(_iiif_vocabulary__WEBPACK_IMPORTED_MODULE_3__["ServiceProfile"].SEARCH_0);
    };
    Helper.prototype.getSeeAlso = function () {
        if (!this.manifest) {
            throw new Error(_Errors__WEBPACK_IMPORTED_MODULE_4__["Errors"].manifestNotLoaded);
        }
        return this.manifest.getSeeAlso();
    };
    Helper.prototype.getSequenceByIndex = function (index) {
        if (!this.manifest) {
            throw new Error(_Errors__WEBPACK_IMPORTED_MODULE_4__["Errors"].manifestNotLoaded);
        }
        return this.manifest.getSequenceByIndex(index);
    };
    Helper.prototype.getShareServiceUrl = function () {
        if (!this.manifest) {
            throw new Error(_Errors__WEBPACK_IMPORTED_MODULE_4__["Errors"].manifestNotLoaded);
        }
        var url = null;
        var shareService = this.manifest.getService(_iiif_vocabulary__WEBPACK_IMPORTED_MODULE_3__["ServiceProfile"].SHARE_EXTENSIONS);
        if (shareService) {
            if (shareService.length) {
                shareService = shareService[0];
            }
            url = shareService.__jsonld.shareUrl;
        }
        return url;
    };
    Helper.prototype._getSortedTreeNodesByDate = function (sortedTree, tree) {
        // const all: TreeNode[] = <TreeNode[]>tree.nodes.en().traverseUnique(node => node.nodes)
        //     .where((n) => n.data.type === TreeNodeType.COLLECTION ||
        //                 n.data.type === TreeNodeType.MANIFEST).toArray();
        var flattenedTree = this.getFlattenedTree(tree);
        // const manifests: TreeNode[] = <TreeNode[]>tree.nodes.en().traverseUnique(n => n.nodes)
        //     .where((n) => n.data.type === TreeNodeType.MANIFEST).toArray();
        if (flattenedTree) {
            var manifests = flattenedTree.filter(function (n) { return n.data.type === manifesto_js__WEBPACK_IMPORTED_MODULE_5__["TreeNodeType"].MANIFEST; });
            this.createDecadeNodes(sortedTree, flattenedTree);
            this.sortDecadeNodes(sortedTree);
            this.createYearNodes(sortedTree, flattenedTree);
            this.sortYearNodes(sortedTree);
            this.createMonthNodes(sortedTree, manifests);
            this.sortMonthNodes(sortedTree);
            this.createDateNodes(sortedTree, manifests);
            this.pruneDecadeNodes(sortedTree);
        }
    };
    Helper.prototype.getStartCanvasIndex = function () {
        return this.getCurrentSequence().getStartCanvasIndex();
    };
    Helper.prototype.getThumbs = function (width, height) {
        return this.getCurrentSequence().getThumbs(width, height);
    };
    Helper.prototype.getTopRanges = function () {
        if (!this.manifest) {
            throw new Error(_Errors__WEBPACK_IMPORTED_MODULE_4__["Errors"].manifestNotLoaded);
        }
        return this.manifest.getTopRanges();
    };
    Helper.prototype.getTotalCanvases = function () {
        return this.getCurrentSequence().getTotalCanvases();
    };
    Helper.prototype.getTrackingLabel = function () {
        if (!this.manifest) {
            throw new Error(_Errors__WEBPACK_IMPORTED_MODULE_4__["Errors"].manifestNotLoaded);
        }
        return this.manifest.getTrackingLabel();
    };
    Helper.prototype._getTopRanges = function () {
        return this.iiifResource.getTopRanges();
    };
    Helper.prototype.getTree = function (topRangeIndex, sortType) {
        // if it's a collection, use IIIFResource.getDefaultTree()
        // otherwise, get the top range by index and use Range.getTree()
        if (topRangeIndex === void 0) { topRangeIndex = 0; }
        if (sortType === void 0) { sortType = _TreeSortType__WEBPACK_IMPORTED_MODULE_2__["TreeSortType"].NONE; }
        if (!this.iiifResource) {
            return null;
        }
        var tree;
        if (this.iiifResource.isCollection()) {
            tree = this.iiifResource.getDefaultTree();
        }
        else {
            var topRanges = this._getTopRanges();
            var root = new manifesto_js__WEBPACK_IMPORTED_MODULE_5__["TreeNode"]();
            root.label = 'root';
            root.data = this.iiifResource;
            if (topRanges.length) {
                var range = topRanges[topRangeIndex];
                tree = range.getTree(root);
            }
            else {
                return root;
            }
        }
        var sortedTree = new manifesto_js__WEBPACK_IMPORTED_MODULE_5__["TreeNode"]();
        switch (sortType.toString()) {
            case _TreeSortType__WEBPACK_IMPORTED_MODULE_2__["TreeSortType"].DATE.toString():
                // returns a list of treenodes for each decade.
                // expanding a decade generates a list of years
                // expanding a year gives a list of months containing issues
                // expanding a month gives a list of issues.
                if (this.treeHasNavDates(tree)) {
                    this._getSortedTreeNodesByDate(sortedTree, tree);
                    break;
                }
            default:
                sortedTree = tree;
        }
        return sortedTree;
    };
    Helper.prototype.treeHasNavDates = function (tree) {
        //const node: TreeNode = tree.nodes.en().traverseUnique(node => node.nodes).where((n) => !isNaN(<any>n.navDate)).first();
        // todo: write test
        var flattenedTree = this.getFlattenedTree(tree);
        return (flattenedTree) ? flattenedTree.some(function (n) { return !isNaN(n.navDate); }) : false;
    };
    Helper.prototype.getViewingDirection = function () {
        if (!this.manifest) {
            throw new Error(_Errors__WEBPACK_IMPORTED_MODULE_4__["Errors"].manifestNotLoaded);
        }
        var viewingDirection = this.getCurrentSequence().getViewingDirection();
        if (!viewingDirection) {
            viewingDirection = this.manifest.getViewingDirection();
        }
        return viewingDirection;
    };
    Helper.prototype.getViewingHint = function () {
        if (!this.manifest) {
            throw new Error(_Errors__WEBPACK_IMPORTED_MODULE_4__["Errors"].manifestNotLoaded);
        }
        var viewingHint = this.getCurrentSequence().getViewingHint();
        if (!viewingHint) {
            viewingHint = this.manifest.getViewingHint();
        }
        return viewingHint;
    };
    // inquiries //
    Helper.prototype.hasParentCollection = function () {
        if (!this.manifest) {
            throw new Error(_Errors__WEBPACK_IMPORTED_MODULE_4__["Errors"].manifestNotLoaded);
        }
        return !!this.manifest.parentCollection;
    };
    Helper.prototype.hasRelatedPage = function () {
        var related = this.getRelated();
        if (!related)
            return false;
        if (related.length) {
            related = related[0];
        }
        return related['format'] === 'text/html';
    };
    Helper.prototype.hasResources = function () {
        var canvas = this.getCurrentCanvas();
        return canvas.getResources().length > 0;
    };
    Helper.prototype.isBottomToTop = function () {
        var viewingDirection = this.getViewingDirection();
        if (viewingDirection) {
            return viewingDirection === _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_3__["ViewingDirection"].BOTTOM_TO_TOP;
        }
        return false;
    };
    Helper.prototype.isCanvasIndexOutOfRange = function (index) {
        return this.getCurrentSequence().isCanvasIndexOutOfRange(index);
    };
    Helper.prototype.isContinuous = function () {
        var viewingHint = this.getViewingHint();
        if (viewingHint) {
            return viewingHint === _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_3__["ViewingHint"].CONTINUOUS;
        }
        return false;
    };
    Helper.prototype.isFirstCanvas = function (index) {
        if (typeof index !== 'undefined') {
            return this.getCurrentSequence().isFirstCanvas(index);
        }
        return this.getCurrentSequence().isFirstCanvas(this.canvasIndex);
    };
    Helper.prototype.isHorizontallyAligned = function () {
        return this.isLeftToRight() || this.isRightToLeft();
    };
    Helper.prototype.isLastCanvas = function (index) {
        if (typeof index !== 'undefined') {
            return this.getCurrentSequence().isLastCanvas(index);
        }
        return this.getCurrentSequence().isLastCanvas(this.canvasIndex);
    };
    Helper.prototype.isLeftToRight = function () {
        var viewingDirection = this.getViewingDirection();
        if (viewingDirection) {
            return viewingDirection === _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_3__["ViewingDirection"].LEFT_TO_RIGHT;
        }
        return false;
    };
    Helper.prototype.isMultiCanvas = function () {
        return this.getCurrentSequence().isMultiCanvas();
    };
    Helper.prototype.isMultiSequence = function () {
        if (!this.manifest) {
            throw new Error(_Errors__WEBPACK_IMPORTED_MODULE_4__["Errors"].manifestNotLoaded);
        }
        return this.manifest.isMultiSequence();
    };
    Helper.prototype.isPaged = function () {
        if (!this.manifest) {
            throw new Error(_Errors__WEBPACK_IMPORTED_MODULE_4__["Errors"].manifestNotLoaded);
        }
        // check the sequence for a viewingHint (deprecated)
        var viewingHint = this.getViewingHint();
        if (viewingHint) {
            return viewingHint === _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_3__["ViewingHint"].PAGED;
        }
        // check the manifest for a viewingHint (deprecated) or paged behavior
        return this.manifest.isPagingEnabled();
    };
    Helper.prototype.isPagingAvailable = function () {
        // paged mode is useless unless you have at least 3 pages...
        return this.isPagingEnabled() && this.getTotalCanvases() > 2;
    };
    Helper.prototype.isPagingEnabled = function () {
        if (!this.manifest) {
            throw new Error(_Errors__WEBPACK_IMPORTED_MODULE_4__["Errors"].manifestNotLoaded);
        }
        return (this.manifest.isPagingEnabled() || this.getCurrentSequence().isPagingEnabled());
    };
    Helper.prototype.isRightToLeft = function () {
        var viewingDirection = this.getViewingDirection();
        if (viewingDirection) {
            return viewingDirection === _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_3__["ViewingDirection"].RIGHT_TO_LEFT;
        }
        return false;
    };
    Helper.prototype.isTopToBottom = function () {
        var viewingDirection = this.getViewingDirection();
        if (viewingDirection) {
            return viewingDirection === _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_3__["ViewingDirection"].TOP_TO_BOTTOM;
        }
        return false;
    };
    Helper.prototype.isTotalCanvasesEven = function () {
        return this.getCurrentSequence().isTotalCanvasesEven();
    };
    Helper.prototype.isUIEnabled = function (name) {
        if (!this.manifest) {
            throw new Error(_Errors__WEBPACK_IMPORTED_MODULE_4__["Errors"].manifestNotLoaded);
        }
        var uiExtensions = this.manifest.getService(_iiif_vocabulary__WEBPACK_IMPORTED_MODULE_3__["ServiceProfile"].UI_EXTENSIONS);
        if (uiExtensions) {
            var disableUI = uiExtensions.getProperty('disableUI');
            if (disableUI) {
                if (disableUI.indexOf(name) !== -1 || disableUI.indexOf(name.toLowerCase()) !== -1) {
                    return false;
                }
            }
        }
        return true;
    };
    Helper.prototype.isVerticallyAligned = function () {
        return this.isTopToBottom() || this.isBottomToTop();
    };
    // dates //     
    Helper.prototype.createDateNodes = function (rootNode, nodes) {
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            var year = this.getNodeYear(node);
            var month = this.getNodeMonth(node);
            var dateNode = new manifesto_js__WEBPACK_IMPORTED_MODULE_5__["TreeNode"]();
            dateNode.id = node.id;
            dateNode.label = this.getNodeDisplayDate(node);
            dateNode.data = node.data;
            dateNode.data.type = manifesto_js__WEBPACK_IMPORTED_MODULE_5__["TreeNodeType"].MANIFEST;
            dateNode.data.year = year;
            dateNode.data.month = month;
            var decadeNode = this.getDecadeNode(rootNode, year);
            if (decadeNode) {
                var yearNode = this.getYearNode(decadeNode, year);
                if (yearNode) {
                    var monthNode = this.getMonthNode(yearNode, month);
                    if (monthNode) {
                        monthNode.addNode(dateNode);
                    }
                }
            }
        }
    };
    Helper.prototype.createDecadeNodes = function (rootNode, nodes) {
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            if (!node.navDate) {
                continue;
            }
            var year = this.getNodeYear(node);
            var endYear = Number(year.toString().substr(0, 3) + "9");
            if (!this.getDecadeNode(rootNode, year)) {
                var decadeNode = new manifesto_js__WEBPACK_IMPORTED_MODULE_5__["TreeNode"]();
                decadeNode.label = year + " - " + endYear;
                decadeNode.navDate = node.navDate;
                decadeNode.data.startYear = year;
                decadeNode.data.endYear = endYear;
                rootNode.addNode(decadeNode);
            }
        }
    };
    Helper.prototype.createMonthNodes = function (rootNode, nodes) {
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            if (!node.navDate) {
                continue;
            }
            var year = this.getNodeYear(node);
            var month = this.getNodeMonth(node);
            var decadeNode = this.getDecadeNode(rootNode, year);
            var yearNode = null;
            if (decadeNode) {
                yearNode = this.getYearNode(decadeNode, year);
            }
            if (decadeNode && yearNode && !this.getMonthNode(yearNode, month)) {
                var monthNode = new manifesto_js__WEBPACK_IMPORTED_MODULE_5__["TreeNode"]();
                monthNode.label = this.getNodeDisplayMonth(node);
                monthNode.navDate = node.navDate;
                monthNode.data.year = year;
                monthNode.data.month = month;
                yearNode.addNode(monthNode);
            }
        }
    };
    Helper.prototype.createYearNodes = function (rootNode, nodes) {
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            if (!node.navDate) {
                continue;
            }
            var year = this.getNodeYear(node);
            var decadeNode = this.getDecadeNode(rootNode, year);
            if (decadeNode && !this.getYearNode(decadeNode, year)) {
                var yearNode = new manifesto_js__WEBPACK_IMPORTED_MODULE_5__["TreeNode"]();
                yearNode.label = year.toString();
                yearNode.navDate = node.navDate;
                yearNode.data.year = year;
                decadeNode.addNode(yearNode);
            }
        }
    };
    Helper.prototype.getDecadeNode = function (rootNode, year) {
        for (var i = 0; i < rootNode.nodes.length; i++) {
            var n = rootNode.nodes[i];
            if (year >= n.data.startYear && year <= n.data.endYear)
                return n;
        }
        return null;
    };
    Helper.prototype.getMonthNode = function (yearNode, month) {
        for (var i = 0; i < yearNode.nodes.length; i++) {
            var n = yearNode.nodes[i];
            if (month === this.getNodeMonth(n))
                return n;
        }
        return null;
    };
    Helper.prototype.getNodeDisplayDate = function (node) {
        return node.navDate.toDateString();
    };
    Helper.prototype.getNodeDisplayMonth = function (node) {
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return months[node.navDate.getMonth()];
    };
    Helper.prototype.getNodeMonth = function (node) {
        return node.navDate.getMonth();
    };
    Helper.prototype.getNodeYear = function (node) {
        return node.navDate.getFullYear();
    };
    Helper.prototype.getYearNode = function (decadeNode, year) {
        for (var i = 0; i < decadeNode.nodes.length; i++) {
            var n = decadeNode.nodes[i];
            if (year === this.getNodeYear(n))
                return n;
        }
        return null;
    };
    // delete any empty decades
    Helper.prototype.pruneDecadeNodes = function (rootNode) {
        var pruned = [];
        for (var i = 0; i < rootNode.nodes.length; i++) {
            var n = rootNode.nodes[i];
            if (!n.nodes.length) {
                pruned.push(n);
            }
        }
        for (var j = 0; j < pruned.length; j++) {
            var p = pruned[j];
            var index = rootNode.nodes.indexOf(p);
            if (index > -1) {
                rootNode.nodes.splice(index, 1);
            }
        }
    };
    Helper.prototype.sortDecadeNodes = function (rootNode) {
        rootNode.nodes = rootNode.nodes.sort(function (a, b) {
            return a.data.startYear - b.data.startYear;
        });
    };
    Helper.prototype.sortMonthNodes = function (rootNode) {
        var _this = this;
        for (var i = 0; i < rootNode.nodes.length; i++) {
            var decadeNode = rootNode.nodes[i];
            for (var j = 0; j < decadeNode.nodes.length; j++) {
                var monthNode = decadeNode.nodes[j];
                monthNode.nodes = monthNode.nodes.sort(function (a, b) {
                    return _this.getNodeMonth(a) - _this.getNodeMonth(b);
                });
            }
        }
    };
    Helper.prototype.sortYearNodes = function (rootNode) {
        var _this = this;
        for (var i = 0; i < rootNode.nodes.length; i++) {
            var decadeNode = rootNode.nodes[i];
            decadeNode.nodes = decadeNode.nodes.sort(function (a, b) {
                return (_this.getNodeYear(a) - _this.getNodeYear(b));
            });
        }
    };
    return Helper;
}());

//# sourceMappingURL=Helper.js.map

/***/ }),

/***/ "./node_modules/@iiif/manifold/dist-esmodule/ILabelValuePair.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@iiif/manifold/dist-esmodule/ILabelValuePair.js ***!
  \**********************************************************************/
/*! exports provided: ILabelValuePair */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ILabelValuePair", function() { return ILabelValuePair; });
var ILabelValuePair = /** @class */ (function () {
    function ILabelValuePair() {
    }
    return ILabelValuePair;
}());

//# sourceMappingURL=ILabelValuePair.js.map

/***/ }),

/***/ "./node_modules/@iiif/manifold/dist-esmodule/MetadataGroup.js":
/*!********************************************************************!*\
  !*** ./node_modules/@iiif/manifold/dist-esmodule/MetadataGroup.js ***!
  \********************************************************************/
/*! exports provided: MetadataGroup */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MetadataGroup", function() { return MetadataGroup; });
var MetadataGroup = /** @class */ (function () {
    function MetadataGroup(resource, label) {
        this.items = [];
        this.resource = resource;
        this.label = label;
    }
    MetadataGroup.prototype.addItem = function (item) {
        this.items.push(item);
    };
    MetadataGroup.prototype.addMetadata = function (metadata, isRootLevel) {
        if (isRootLevel === void 0) { isRootLevel = false; }
        for (var i = 0; i < metadata.length; i++) {
            var item = metadata[i];
            item.isRootLevel = isRootLevel;
            this.addItem(item);
        }
    };
    return MetadataGroup;
}());

//# sourceMappingURL=MetadataGroup.js.map

/***/ }),

/***/ "./node_modules/@iiif/manifold/dist-esmodule/MetadataOptions.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@iiif/manifold/dist-esmodule/MetadataOptions.js ***!
  \**********************************************************************/
/*! exports provided: MetadataOptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MetadataOptions", function() { return MetadataOptions; });
var MetadataOptions = /** @class */ (function () {
    function MetadataOptions() {
    }
    return MetadataOptions;
}());

//# sourceMappingURL=MetadataOptions.js.map

/***/ }),

/***/ "./node_modules/@iiif/manifold/dist-esmodule/MultiSelectState.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@iiif/manifold/dist-esmodule/MultiSelectState.js ***!
  \***********************************************************************/
/*! exports provided: MultiSelectState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MultiSelectState", function() { return MultiSelectState; });
/* harmony import */ var manifesto_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! manifesto.js */ "./node_modules/manifesto.js/dist-umd/manifesto.js");
/* harmony import */ var manifesto_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(manifesto_js__WEBPACK_IMPORTED_MODULE_0__);

var MultiSelectState = /** @class */ (function () {
    function MultiSelectState() {
        this.isEnabled = false;
        this.ranges = [];
        this.canvases = [];
    }
    MultiSelectState.prototype.allCanvasesSelected = function () {
        return this.canvases.length > 0 && this.getAllSelectedCanvases().length === this.canvases.length;
    };
    MultiSelectState.prototype.allRangesSelected = function () {
        return this.ranges.length > 0 && this.getAllSelectedRanges().length === this.ranges.length;
    };
    MultiSelectState.prototype.allSelected = function () {
        return this.allRangesSelected() && this.allCanvasesSelected();
    };
    MultiSelectState.prototype.getAll = function () {
        return this.canvases.concat(this.ranges);
    };
    MultiSelectState.prototype.getAllSelectedCanvases = function () {
        return this.canvases.filter(function (c) { return c.multiSelected; });
    };
    MultiSelectState.prototype.getAllSelectedRanges = function () {
        return this.ranges.filter(function (r) { return r.multiSelected; });
    };
    MultiSelectState.prototype.getCanvasById = function (id) {
        return this.canvases.filter(function (c) { return manifesto_js__WEBPACK_IMPORTED_MODULE_0__["Utils"].normaliseUrl(c.id) === manifesto_js__WEBPACK_IMPORTED_MODULE_0__["Utils"].normaliseUrl(id); })[0];
    };
    MultiSelectState.prototype.getCanvasesByIds = function (ids) {
        var canvases = [];
        for (var i = 0; i < ids.length; i++) {
            var id = ids[i];
            canvases.push(this.getCanvasById(id));
        }
        return canvases;
    };
    MultiSelectState.prototype.getRangeCanvases = function (range) {
        var ids = range.getCanvasIds();
        return this.getCanvasesByIds(ids);
    };
    MultiSelectState.prototype.selectAll = function (selected) {
        this.selectRanges(this.ranges, selected);
        this.selectCanvases(this.canvases, selected);
    };
    MultiSelectState.prototype.selectCanvas = function (canvas, selected) {
        var c = this.canvases.filter(function (c) { return c.id === canvas.id; })[0];
        c.multiSelected = selected;
    };
    MultiSelectState.prototype.selectAllCanvases = function (selected) {
        this.selectCanvases(this.canvases, selected);
    };
    MultiSelectState.prototype.selectCanvases = function (canvases, selected) {
        for (var j = 0; j < canvases.length; j++) {
            var canvas = canvases[j];
            canvas.multiSelected = selected;
        }
    };
    MultiSelectState.prototype.selectRange = function (range, selected) {
        var r = this.ranges.filter(function (r) { return r.id === range.id; })[0];
        r.multiSelected = selected;
        var canvases = this.getRangeCanvases(r);
        this.selectCanvases(canvases, selected);
    };
    MultiSelectState.prototype.selectAllRanges = function (selected) {
        this.selectRanges(this.ranges, selected);
    };
    MultiSelectState.prototype.selectRanges = function (ranges, selected) {
        for (var i = 0; i < ranges.length; i++) {
            var range = ranges[i];
            range.multiSelected = selected;
            var canvases = this.getCanvasesByIds(range.getCanvasIds());
            this.selectCanvases(canvases, selected);
        }
    };
    MultiSelectState.prototype.setEnabled = function (enabled) {
        this.isEnabled = enabled;
        var items = this.getAll();
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            item.multiSelectEnabled = this.isEnabled;
            if (!enabled) {
                item.multiSelected = false;
            }
        }
    };
    return MultiSelectState;
}());

//# sourceMappingURL=MultiSelectState.js.map

/***/ }),

/***/ "./node_modules/@iiif/manifold/dist-esmodule/Translation.js":
/*!******************************************************************!*\
  !*** ./node_modules/@iiif/manifold/dist-esmodule/Translation.js ***!
  \******************************************************************/
/*! exports provided: Translation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Translation", function() { return Translation; });
var Translation = /** @class */ (function () {
    function Translation(value, locale) {
        this.value = value;
        this.locale = locale;
    }
    return Translation;
}());

//# sourceMappingURL=Translation.js.map

/***/ }),

/***/ "./node_modules/@iiif/manifold/dist-esmodule/TreeSortType.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@iiif/manifold/dist-esmodule/TreeSortType.js ***!
  \*******************************************************************/
/*! exports provided: TreeSortType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TreeSortType", function() { return TreeSortType; });
var TreeSortType;
(function (TreeSortType) {
    TreeSortType["DATE"] = "date";
    TreeSortType["NONE"] = "none";
})(TreeSortType || (TreeSortType = {}));
//# sourceMappingURL=TreeSortType.js.map

/***/ }),

/***/ "./node_modules/@iiif/manifold/dist-esmodule/UriLabeller.js":
/*!******************************************************************!*\
  !*** ./node_modules/@iiif/manifold/dist-esmodule/UriLabeller.js ***!
  \******************************************************************/
/*! exports provided: UriLabeller */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UriLabeller", function() { return UriLabeller; });
// This class formats URIs into HTML <a> links, applying labels when available
var UriLabeller = /** @class */ (function () {
    function UriLabeller(labels) {
        this.labels = labels;
    }
    UriLabeller.prototype.format = function (url) {
        // if already a link, do nothing.
        if (url.indexOf('<a') != -1)
            return url;
        var label = (this.labels[url]) ? this.labels[url] : url;
        return '<a href="' + url + '">' + label + '</a>';
    };
    return UriLabeller;
}());

//# sourceMappingURL=UriLabeller.js.map

/***/ }),

/***/ "./node_modules/@iiif/manifold/dist-esmodule/index.js":
/*!************************************************************!*\
  !*** ./node_modules/@iiif/manifold/dist-esmodule/index.js ***!
  \************************************************************/
/*! exports provided: loadManifest, AnnotationGroup, AnnotationRect, Bootstrapper, ExternalResource, Helper, ILabelValuePair, MetadataGroup, MetadataOptions, MultiSelectState, Translation, TreeSortType, UriLabeller */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadManifest", function() { return loadManifest; });
/* harmony import */ var _AnnotationGroup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AnnotationGroup */ "./node_modules/@iiif/manifold/dist-esmodule/AnnotationGroup.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AnnotationGroup", function() { return _AnnotationGroup__WEBPACK_IMPORTED_MODULE_0__["AnnotationGroup"]; });

/* harmony import */ var _AnnotationRect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AnnotationRect */ "./node_modules/@iiif/manifold/dist-esmodule/AnnotationRect.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AnnotationRect", function() { return _AnnotationRect__WEBPACK_IMPORTED_MODULE_1__["AnnotationRect"]; });

/* harmony import */ var _Bootstrapper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Bootstrapper */ "./node_modules/@iiif/manifold/dist-esmodule/Bootstrapper.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Bootstrapper", function() { return _Bootstrapper__WEBPACK_IMPORTED_MODULE_2__["Bootstrapper"]; });

/* harmony import */ var _ExternalResource__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ExternalResource */ "./node_modules/@iiif/manifold/dist-esmodule/ExternalResource.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ExternalResource", function() { return _ExternalResource__WEBPACK_IMPORTED_MODULE_3__["ExternalResource"]; });

/* harmony import */ var _Helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Helper */ "./node_modules/@iiif/manifold/dist-esmodule/Helper.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Helper", function() { return _Helper__WEBPACK_IMPORTED_MODULE_4__["Helper"]; });

/* harmony import */ var _ILabelValuePair__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ILabelValuePair */ "./node_modules/@iiif/manifold/dist-esmodule/ILabelValuePair.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ILabelValuePair", function() { return _ILabelValuePair__WEBPACK_IMPORTED_MODULE_5__["ILabelValuePair"]; });

/* harmony import */ var _MetadataGroup__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./MetadataGroup */ "./node_modules/@iiif/manifold/dist-esmodule/MetadataGroup.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MetadataGroup", function() { return _MetadataGroup__WEBPACK_IMPORTED_MODULE_6__["MetadataGroup"]; });

/* harmony import */ var _MetadataOptions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./MetadataOptions */ "./node_modules/@iiif/manifold/dist-esmodule/MetadataOptions.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MetadataOptions", function() { return _MetadataOptions__WEBPACK_IMPORTED_MODULE_7__["MetadataOptions"]; });

/* harmony import */ var _MultiSelectState__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./MultiSelectState */ "./node_modules/@iiif/manifold/dist-esmodule/MultiSelectState.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MultiSelectState", function() { return _MultiSelectState__WEBPACK_IMPORTED_MODULE_8__["MultiSelectState"]; });

/* harmony import */ var _Translation__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Translation */ "./node_modules/@iiif/manifold/dist-esmodule/Translation.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Translation", function() { return _Translation__WEBPACK_IMPORTED_MODULE_9__["Translation"]; });

/* harmony import */ var _TreeSortType__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./TreeSortType */ "./node_modules/@iiif/manifold/dist-esmodule/TreeSortType.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TreeSortType", function() { return _TreeSortType__WEBPACK_IMPORTED_MODULE_10__["TreeSortType"]; });

/* harmony import */ var _UriLabeller__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./UriLabeller */ "./node_modules/@iiif/manifold/dist-esmodule/UriLabeller.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UriLabeller", function() { return _UriLabeller__WEBPACK_IMPORTED_MODULE_11__["UriLabeller"]; });














var loadManifest = function (options) {
    return new _Bootstrapper__WEBPACK_IMPORTED_MODULE_2__["Bootstrapper"](options).bootstrap();
};
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@iiif/vocabulary/dist-esmodule/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/@iiif/vocabulary/dist-esmodule/index.js ***!
  \**************************************************************/
/*! exports provided: AnnotationMotivation, Behavior, ExternalResourceType, IIIFResourceType, MediaType, RenderingFormat, ServiceProfile, ViewingDirection, ViewingHint */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnnotationMotivation", function() { return AnnotationMotivation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Behavior", function() { return Behavior; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExternalResourceType", function() { return ExternalResourceType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IIIFResourceType", function() { return IIIFResourceType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MediaType", function() { return MediaType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderingFormat", function() { return RenderingFormat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServiceProfile", function() { return ServiceProfile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ViewingDirection", function() { return ViewingDirection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ViewingHint", function() { return ViewingHint; });
var AnnotationMotivation;
(function (AnnotationMotivation) {
    AnnotationMotivation["BOOKMARKING"] = "oa:bookmarking";
    AnnotationMotivation["CLASSIFYING"] = "oa:classifying";
    AnnotationMotivation["COMMENTING"] = "oa:commenting";
    AnnotationMotivation["DESCRIBING"] = "oa:describing";
    AnnotationMotivation["EDITING"] = "oa:editing";
    AnnotationMotivation["HIGHLIGHTING"] = "oa:highlighting";
    AnnotationMotivation["IDENTIFYING"] = "oa:identifying";
    AnnotationMotivation["LINKING"] = "oa:linking";
    AnnotationMotivation["MODERATING"] = "oa:moderating";
    AnnotationMotivation["PAINTING"] = "sc:painting";
    AnnotationMotivation["QUESTIONING"] = "oa:questioning";
    AnnotationMotivation["REPLYING"] = "oa:replying";
    AnnotationMotivation["TAGGING"] = "oa:tagging";
    AnnotationMotivation["TRANSCRIBING"] = "oad:transcribing";
})(AnnotationMotivation || (AnnotationMotivation = {}));
var Behavior;
(function (Behavior) {
    Behavior["AUTO_ADVANCE"] = "auto-advance";
    Behavior["CONTINUOUS"] = "continuous";
    Behavior["FACING_PAGES"] = "facing-pages";
    Behavior["HIDDEN"] = "hidden";
    Behavior["INDIVIDUALS"] = "individuals";
    Behavior["MULTI_PART"] = "multi-part";
    Behavior["NO_NAV"] = "no-nav";
    Behavior["NON_PAGED"] = "non-paged";
    Behavior["PAGED"] = "paged";
    Behavior["REPEAT"] = "repeat";
    Behavior["SEQUENCE"] = "sequence";
    Behavior["THUMBNAIL_NAV"] = "thumbnail-nav";
    Behavior["TOGETHER"] = "together";
    Behavior["UNORDERED"] = "unordered";
})(Behavior || (Behavior = {}));
var ExternalResourceType;
(function (ExternalResourceType) {
    ExternalResourceType["CANVAS"] = "canvas";
    ExternalResourceType["CHOICE"] = "choice";
    ExternalResourceType["CONTENT_AS_TEXT"] = "contentastext";
    ExternalResourceType["DOCUMENT"] = "document";
    ExternalResourceType["IMAGE"] = "image";
    ExternalResourceType["MOVING_IMAGE"] = "movingimage";
    ExternalResourceType["PDF"] = "pdf";
    ExternalResourceType["PHYSICAL_OBJECT"] = "physicalobject";
    ExternalResourceType["SOUND"] = "sound";
    ExternalResourceType["TEXTUALBODY"] = "textualbody";
    ExternalResourceType["VIDEO"] = "video";
})(ExternalResourceType || (ExternalResourceType = {}));
var IIIFResourceType;
(function (IIIFResourceType) {
    IIIFResourceType["ANNOTATION"] = "annotation";
    IIIFResourceType["CANVAS"] = "canvas";
    IIIFResourceType["COLLECTION"] = "collection";
    IIIFResourceType["MANIFEST"] = "manifest";
    IIIFResourceType["RANGE"] = "range";
    IIIFResourceType["SEQUENCE"] = "sequence";
})(IIIFResourceType || (IIIFResourceType = {}));
var MediaType;
(function (MediaType) {
    MediaType["AUDIO_MP4"] = "audio/mp4";
    MediaType["CORTO"] = "application/corto";
    MediaType["DRACO"] = "application/draco";
    MediaType["GLTF"] = "model/gltf+json";
    MediaType["JPG"] = "image/jpeg";
    MediaType["M3U8"] = "application/vnd.apple.mpegurl";
    MediaType["MP3"] = "audio/mp3";
    MediaType["MPEG_DASH"] = "application/dash+xml";
    MediaType["OBJ"] = "text/plain";
    MediaType["PDF"] = "application/pdf";
    MediaType["PLY"] = "application/ply";
    MediaType["THREEJS"] = "application/vnd.threejs+json";
    MediaType["VIDEO_MP4"] = "video/mp4";
    MediaType["WEBM"] = "video/webm";
})(MediaType || (MediaType = {}));
var RenderingFormat;
(function (RenderingFormat) {
    RenderingFormat["DOC"] = "application/msword";
    RenderingFormat["DOCX"] = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    RenderingFormat["PDF"] = "application/pdf";
})(RenderingFormat || (RenderingFormat = {}));
var ServiceProfile;
(function (ServiceProfile) {
    // image api
    ServiceProfile["IMAGE_0_COMPLIANCE_LEVEL_0"] = "http://library.stanford.edu/iiif/image-api/compliance.html#level0";
    ServiceProfile["IMAGE_0_COMPLIANCE_LEVEL_1"] = "http://library.stanford.edu/iiif/image-api/compliance.html#level1";
    ServiceProfile["IMAGE_0_COMPLIANCE_LEVEL_2"] = "http://library.stanford.edu/iiif/image-api/compliance.html#level2";
    ServiceProfile["IMAGE_0_CONFORMANCE_LEVEL_0"] = "http://library.stanford.edu/iiif/image-api/conformance.html#level0";
    ServiceProfile["IMAGE_0_CONFORMANCE_LEVEL_1"] = "http://library.stanford.edu/iiif/image-api/conformance.html#level1";
    ServiceProfile["IMAGE_0_CONFORMANCE_LEVEL_2"] = "http://library.stanford.edu/iiif/image-api/conformance.html#level2";
    ServiceProfile["IMAGE_1_COMPLIANCE_LEVEL_0"] = "http://library.stanford.edu/iiif/image-api/1.1/compliance.html#level0";
    ServiceProfile["IMAGE_1_COMPLIANCE_LEVEL_1"] = "http://library.stanford.edu/iiif/image-api/1.1/compliance.html#level1";
    ServiceProfile["IMAGE_1_COMPLIANCE_LEVEL_2"] = "http://library.stanford.edu/iiif/image-api/1.1/compliance.html#level2";
    ServiceProfile["IMAGE_1_CONFORMANCE_LEVEL_0"] = "http://library.stanford.edu/iiif/image-api/1.1/conformance.html#level0";
    ServiceProfile["IMAGE_1_CONFORMANCE_LEVEL_1"] = "http://library.stanford.edu/iiif/image-api/1.1/conformance.html#level1";
    ServiceProfile["IMAGE_1_CONFORMANCE_LEVEL_2"] = "http://library.stanford.edu/iiif/image-api/1.1/conformance.html#level2";
    ServiceProfile["IMAGE_1_LEVEL_0"] = "http://iiif.io/api/image/1/level0.json";
    ServiceProfile["IMAGE_1_PROFILE_LEVEL_0"] = "http://iiif.io/api/image/1/profiles/level0.json";
    ServiceProfile["IMAGE_1_LEVEL_1"] = "http://iiif.io/api/image/1/level1.json";
    ServiceProfile["IMAGE_1_PROFILE_LEVEL_1"] = "http://iiif.io/api/image/1/profiles/level1.json";
    ServiceProfile["IMAGE_1_LEVEL_2"] = "http://iiif.io/api/image/1/level2.json";
    ServiceProfile["IMAGE_1_PROFILE_LEVEL_2"] = "http://iiif.io/api/image/1/profiles/level2.json";
    ServiceProfile["IMAGE_2_LEVEL_0"] = "http://iiif.io/api/image/2/level0.json";
    ServiceProfile["IMAGE_2_PROFILE_LEVEL_0"] = "http://iiif.io/api/image/2/profiles/level0.json";
    ServiceProfile["IMAGE_2_LEVEL_1"] = "http://iiif.io/api/image/2/level1.json";
    ServiceProfile["IMAGE_2_PROFILE_LEVEL_1"] = "http://iiif.io/api/image/2/profiles/level1.json";
    ServiceProfile["IMAGE_2_LEVEL_2"] = "http://iiif.io/api/image/2/level2.json";
    ServiceProfile["IMAGE_2_PROFILE_LEVEL_2"] = "http://iiif.io/api/image/2/profiles/level2.json";
    // auth api
    ServiceProfile["AUTH_0_CLICK_THROUGH"] = "http://iiif.io/api/auth/0/login/clickthrough";
    ServiceProfile["AUTH_0_LOGIN"] = "http://iiif.io/api/auth/0/login";
    ServiceProfile["AUTH_0_LOGOUT"] = "http://iiif.io/api/auth/0/logout";
    ServiceProfile["AUTH_0_RESTRICTED"] = "http://iiif.io/api/auth/0/login/restricted";
    ServiceProfile["AUTH_0_TOKEN"] = "http://iiif.io/api/auth/0/token";
    ServiceProfile["AUTH_1_CLICK_THROUGH"] = "http://iiif.io/api/auth/1/clickthrough";
    ServiceProfile["AUTH_1_EXTERNAL"] = "http://iiif.io/api/auth/1/external";
    ServiceProfile["AUTH_1_KIOSK"] = "http://iiif.io/api/auth/1/kiosk";
    ServiceProfile["AUTH_1_LOGIN"] = "http://iiif.io/api/auth/1/login";
    ServiceProfile["AUTH_1_LOGOUT"] = "http://iiif.io/api/auth/1/logout";
    ServiceProfile["AUTH_1_PROBE"] = "http://iiif.io/api/auth/1/probe";
    ServiceProfile["AUTH_1_TOKEN"] = "http://iiif.io/api/auth/1/token";
    // search api
    ServiceProfile["SEARCH_0"] = "http://iiif.io/api/search/0/search";
    ServiceProfile["SEARCH_0_AUTO_COMPLETE"] = "http://iiif.io/api/search/0/autocomplete";
    ServiceProfile["SEARCH_1"] = "http://iiif.io/api/search/1/search";
    ServiceProfile["SEARCH_1_AUTO_COMPLETE"] = "http://iiif.io/api/search/1/autocomplete";
    // extensions
    ServiceProfile["TRACKING_EXTENSIONS"] = "http://universalviewer.io/tracking-extensions-profile";
    ServiceProfile["UI_EXTENSIONS"] = "http://universalviewer.io/ui-extensions-profile";
    ServiceProfile["PRINT_EXTENSIONS"] = "http://universalviewer.io/print-extensions-profile";
    ServiceProfile["SHARE_EXTENSIONS"] = "http://universalviewer.io/share-extensions-profile";
    // other
    ServiceProfile["OTHER_MANIFESTATIONS"] = "http://iiif.io/api/otherManifestations.json";
    ServiceProfile["IXIF"] = "http://wellcomelibrary.org/ld/ixif/0/alpha.json";
})(ServiceProfile || (ServiceProfile = {}));
var ViewingDirection;
(function (ViewingDirection) {
    ViewingDirection["BOTTOM_TO_TOP"] = "bottom-to-top";
    ViewingDirection["LEFT_TO_RIGHT"] = "left-to-right";
    ViewingDirection["RIGHT_TO_LEFT"] = "right-to-left";
    ViewingDirection["TOP_TO_BOTTOM"] = "top-to-bottom";
})(ViewingDirection || (ViewingDirection = {}));
var ViewingHint;
(function (ViewingHint) {
    ViewingHint["CONTINUOUS"] = "continuous";
    ViewingHint["INDIVIDUALS"] = "individuals";
    ViewingHint["NON_PAGED"] = "non-paged";
    ViewingHint["PAGED"] = "paged";
    ViewingHint["TOP"] = "top";
})(ViewingHint || (ViewingHint = {}));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/cssfilter/lib/css.js":
/*!*******************************************!*\
  !*** ./node_modules/cssfilter/lib/css.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * cssfilter
 *
 * @author 老雷<leizongmin@gmail.com>
 */

var DEFAULT = __webpack_require__(/*! ./default */ "./node_modules/cssfilter/lib/default.js");
var parseStyle = __webpack_require__(/*! ./parser */ "./node_modules/cssfilter/lib/parser.js");
var _ = __webpack_require__(/*! ./util */ "./node_modules/cssfilter/lib/util.js");


/**
 * 返回值是否为空
 *
 * @param {Object} obj
 * @return {Boolean}
 */
function isNull (obj) {
  return (obj === undefined || obj === null);
}

/**
 * 浅拷贝对象
 *
 * @param {Object} obj
 * @return {Object}
 */
function shallowCopyObject (obj) {
  var ret = {};
  for (var i in obj) {
    ret[i] = obj[i];
  }
  return ret;
}

/**
 * 创建CSS过滤器
 *
 * @param {Object} options
 *   - {Object} whiteList
 *   - {Function} onAttr
 *   - {Function} onIgnoreAttr
 *   - {Function} safeAttrValue
 */
function FilterCSS (options) {
  options = shallowCopyObject(options || {});
  options.whiteList = options.whiteList || DEFAULT.whiteList;
  options.onAttr = options.onAttr || DEFAULT.onAttr;
  options.onIgnoreAttr = options.onIgnoreAttr || DEFAULT.onIgnoreAttr;
  options.safeAttrValue = options.safeAttrValue || DEFAULT.safeAttrValue;
  this.options = options;
}

FilterCSS.prototype.process = function (css) {
  // 兼容各种奇葩输入
  css = css || '';
  css = css.toString();
  if (!css) return '';

  var me = this;
  var options = me.options;
  var whiteList = options.whiteList;
  var onAttr = options.onAttr;
  var onIgnoreAttr = options.onIgnoreAttr;
  var safeAttrValue = options.safeAttrValue;

  var retCSS = parseStyle(css, function (sourcePosition, position, name, value, source) {

    var check = whiteList[name];
    var isWhite = false;
    if (check === true) isWhite = check;
    else if (typeof check === 'function') isWhite = check(value);
    else if (check instanceof RegExp) isWhite = check.test(value);
    if (isWhite !== true) isWhite = false;

    // 如果过滤后 value 为空则直接忽略
    value = safeAttrValue(name, value);
    if (!value) return;

    var opts = {
      position: position,
      sourcePosition: sourcePosition,
      source: source,
      isWhite: isWhite
    };

    if (isWhite) {

      var ret = onAttr(name, value, opts);
      if (isNull(ret)) {
        return name + ':' + value;
      } else {
        return ret;
      }

    } else {

      var ret = onIgnoreAttr(name, value, opts);
      if (!isNull(ret)) {
        return ret;
      }

    }
  });

  return retCSS;
};


module.exports = FilterCSS;


/***/ }),

/***/ "./node_modules/cssfilter/lib/default.js":
/*!***********************************************!*\
  !*** ./node_modules/cssfilter/lib/default.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * cssfilter
 *
 * @author 老雷<leizongmin@gmail.com>
 */

function getDefaultWhiteList () {
  // 白名单值说明：
  // true: 允许该属性
  // Function: function (val) { } 返回true表示允许该属性，其他值均表示不允许
  // RegExp: regexp.test(val) 返回true表示允许该属性，其他值均表示不允许
  // 除上面列出的值外均表示不允许
  var whiteList = {};

  whiteList['align-content'] = false; // default: auto
  whiteList['align-items'] = false; // default: auto
  whiteList['align-self'] = false; // default: auto
  whiteList['alignment-adjust'] = false; // default: auto
  whiteList['alignment-baseline'] = false; // default: baseline
  whiteList['all'] = false; // default: depending on individual properties
  whiteList['anchor-point'] = false; // default: none
  whiteList['animation'] = false; // default: depending on individual properties
  whiteList['animation-delay'] = false; // default: 0
  whiteList['animation-direction'] = false; // default: normal
  whiteList['animation-duration'] = false; // default: 0
  whiteList['animation-fill-mode'] = false; // default: none
  whiteList['animation-iteration-count'] = false; // default: 1
  whiteList['animation-name'] = false; // default: none
  whiteList['animation-play-state'] = false; // default: running
  whiteList['animation-timing-function'] = false; // default: ease
  whiteList['azimuth'] = false; // default: center
  whiteList['backface-visibility'] = false; // default: visible
  whiteList['background'] = true; // default: depending on individual properties
  whiteList['background-attachment'] = true; // default: scroll
  whiteList['background-clip'] = true; // default: border-box
  whiteList['background-color'] = true; // default: transparent
  whiteList['background-image'] = true; // default: none
  whiteList['background-origin'] = true; // default: padding-box
  whiteList['background-position'] = true; // default: 0% 0%
  whiteList['background-repeat'] = true; // default: repeat
  whiteList['background-size'] = true; // default: auto
  whiteList['baseline-shift'] = false; // default: baseline
  whiteList['binding'] = false; // default: none
  whiteList['bleed'] = false; // default: 6pt
  whiteList['bookmark-label'] = false; // default: content()
  whiteList['bookmark-level'] = false; // default: none
  whiteList['bookmark-state'] = false; // default: open
  whiteList['border'] = true; // default: depending on individual properties
  whiteList['border-bottom'] = true; // default: depending on individual properties
  whiteList['border-bottom-color'] = true; // default: current color
  whiteList['border-bottom-left-radius'] = true; // default: 0
  whiteList['border-bottom-right-radius'] = true; // default: 0
  whiteList['border-bottom-style'] = true; // default: none
  whiteList['border-bottom-width'] = true; // default: medium
  whiteList['border-collapse'] = true; // default: separate
  whiteList['border-color'] = true; // default: depending on individual properties
  whiteList['border-image'] = true; // default: none
  whiteList['border-image-outset'] = true; // default: 0
  whiteList['border-image-repeat'] = true; // default: stretch
  whiteList['border-image-slice'] = true; // default: 100%
  whiteList['border-image-source'] = true; // default: none
  whiteList['border-image-width'] = true; // default: 1
  whiteList['border-left'] = true; // default: depending on individual properties
  whiteList['border-left-color'] = true; // default: current color
  whiteList['border-left-style'] = true; // default: none
  whiteList['border-left-width'] = true; // default: medium
  whiteList['border-radius'] = true; // default: 0
  whiteList['border-right'] = true; // default: depending on individual properties
  whiteList['border-right-color'] = true; // default: current color
  whiteList['border-right-style'] = true; // default: none
  whiteList['border-right-width'] = true; // default: medium
  whiteList['border-spacing'] = true; // default: 0
  whiteList['border-style'] = true; // default: depending on individual properties
  whiteList['border-top'] = true; // default: depending on individual properties
  whiteList['border-top-color'] = true; // default: current color
  whiteList['border-top-left-radius'] = true; // default: 0
  whiteList['border-top-right-radius'] = true; // default: 0
  whiteList['border-top-style'] = true; // default: none
  whiteList['border-top-width'] = true; // default: medium
  whiteList['border-width'] = true; // default: depending on individual properties
  whiteList['bottom'] = false; // default: auto
  whiteList['box-decoration-break'] = true; // default: slice
  whiteList['box-shadow'] = true; // default: none
  whiteList['box-sizing'] = true; // default: content-box
  whiteList['box-snap'] = true; // default: none
  whiteList['box-suppress'] = true; // default: show
  whiteList['break-after'] = true; // default: auto
  whiteList['break-before'] = true; // default: auto
  whiteList['break-inside'] = true; // default: auto
  whiteList['caption-side'] = false; // default: top
  whiteList['chains'] = false; // default: none
  whiteList['clear'] = true; // default: none
  whiteList['clip'] = false; // default: auto
  whiteList['clip-path'] = false; // default: none
  whiteList['clip-rule'] = false; // default: nonzero
  whiteList['color'] = true; // default: implementation dependent
  whiteList['color-interpolation-filters'] = true; // default: auto
  whiteList['column-count'] = false; // default: auto
  whiteList['column-fill'] = false; // default: balance
  whiteList['column-gap'] = false; // default: normal
  whiteList['column-rule'] = false; // default: depending on individual properties
  whiteList['column-rule-color'] = false; // default: current color
  whiteList['column-rule-style'] = false; // default: medium
  whiteList['column-rule-width'] = false; // default: medium
  whiteList['column-span'] = false; // default: none
  whiteList['column-width'] = false; // default: auto
  whiteList['columns'] = false; // default: depending on individual properties
  whiteList['contain'] = false; // default: none
  whiteList['content'] = false; // default: normal
  whiteList['counter-increment'] = false; // default: none
  whiteList['counter-reset'] = false; // default: none
  whiteList['counter-set'] = false; // default: none
  whiteList['crop'] = false; // default: auto
  whiteList['cue'] = false; // default: depending on individual properties
  whiteList['cue-after'] = false; // default: none
  whiteList['cue-before'] = false; // default: none
  whiteList['cursor'] = false; // default: auto
  whiteList['direction'] = false; // default: ltr
  whiteList['display'] = true; // default: depending on individual properties
  whiteList['display-inside'] = true; // default: auto
  whiteList['display-list'] = true; // default: none
  whiteList['display-outside'] = true; // default: inline-level
  whiteList['dominant-baseline'] = false; // default: auto
  whiteList['elevation'] = false; // default: level
  whiteList['empty-cells'] = false; // default: show
  whiteList['filter'] = false; // default: none
  whiteList['flex'] = false; // default: depending on individual properties
  whiteList['flex-basis'] = false; // default: auto
  whiteList['flex-direction'] = false; // default: row
  whiteList['flex-flow'] = false; // default: depending on individual properties
  whiteList['flex-grow'] = false; // default: 0
  whiteList['flex-shrink'] = false; // default: 1
  whiteList['flex-wrap'] = false; // default: nowrap
  whiteList['float'] = false; // default: none
  whiteList['float-offset'] = false; // default: 0 0
  whiteList['flood-color'] = false; // default: black
  whiteList['flood-opacity'] = false; // default: 1
  whiteList['flow-from'] = false; // default: none
  whiteList['flow-into'] = false; // default: none
  whiteList['font'] = true; // default: depending on individual properties
  whiteList['font-family'] = true; // default: implementation dependent
  whiteList['font-feature-settings'] = true; // default: normal
  whiteList['font-kerning'] = true; // default: auto
  whiteList['font-language-override'] = true; // default: normal
  whiteList['font-size'] = true; // default: medium
  whiteList['font-size-adjust'] = true; // default: none
  whiteList['font-stretch'] = true; // default: normal
  whiteList['font-style'] = true; // default: normal
  whiteList['font-synthesis'] = true; // default: weight style
  whiteList['font-variant'] = true; // default: normal
  whiteList['font-variant-alternates'] = true; // default: normal
  whiteList['font-variant-caps'] = true; // default: normal
  whiteList['font-variant-east-asian'] = true; // default: normal
  whiteList['font-variant-ligatures'] = true; // default: normal
  whiteList['font-variant-numeric'] = true; // default: normal
  whiteList['font-variant-position'] = true; // default: normal
  whiteList['font-weight'] = true; // default: normal
  whiteList['grid'] = false; // default: depending on individual properties
  whiteList['grid-area'] = false; // default: depending on individual properties
  whiteList['grid-auto-columns'] = false; // default: auto
  whiteList['grid-auto-flow'] = false; // default: none
  whiteList['grid-auto-rows'] = false; // default: auto
  whiteList['grid-column'] = false; // default: depending on individual properties
  whiteList['grid-column-end'] = false; // default: auto
  whiteList['grid-column-start'] = false; // default: auto
  whiteList['grid-row'] = false; // default: depending on individual properties
  whiteList['grid-row-end'] = false; // default: auto
  whiteList['grid-row-start'] = false; // default: auto
  whiteList['grid-template'] = false; // default: depending on individual properties
  whiteList['grid-template-areas'] = false; // default: none
  whiteList['grid-template-columns'] = false; // default: none
  whiteList['grid-template-rows'] = false; // default: none
  whiteList['hanging-punctuation'] = false; // default: none
  whiteList['height'] = true; // default: auto
  whiteList['hyphens'] = false; // default: manual
  whiteList['icon'] = false; // default: auto
  whiteList['image-orientation'] = false; // default: auto
  whiteList['image-resolution'] = false; // default: normal
  whiteList['ime-mode'] = false; // default: auto
  whiteList['initial-letters'] = false; // default: normal
  whiteList['inline-box-align'] = false; // default: last
  whiteList['justify-content'] = false; // default: auto
  whiteList['justify-items'] = false; // default: auto
  whiteList['justify-self'] = false; // default: auto
  whiteList['left'] = false; // default: auto
  whiteList['letter-spacing'] = true; // default: normal
  whiteList['lighting-color'] = true; // default: white
  whiteList['line-box-contain'] = false; // default: block inline replaced
  whiteList['line-break'] = false; // default: auto
  whiteList['line-grid'] = false; // default: match-parent
  whiteList['line-height'] = false; // default: normal
  whiteList['line-snap'] = false; // default: none
  whiteList['line-stacking'] = false; // default: depending on individual properties
  whiteList['line-stacking-ruby'] = false; // default: exclude-ruby
  whiteList['line-stacking-shift'] = false; // default: consider-shifts
  whiteList['line-stacking-strategy'] = false; // default: inline-line-height
  whiteList['list-style'] = true; // default: depending on individual properties
  whiteList['list-style-image'] = true; // default: none
  whiteList['list-style-position'] = true; // default: outside
  whiteList['list-style-type'] = true; // default: disc
  whiteList['margin'] = true; // default: depending on individual properties
  whiteList['margin-bottom'] = true; // default: 0
  whiteList['margin-left'] = true; // default: 0
  whiteList['margin-right'] = true; // default: 0
  whiteList['margin-top'] = true; // default: 0
  whiteList['marker-offset'] = false; // default: auto
  whiteList['marker-side'] = false; // default: list-item
  whiteList['marks'] = false; // default: none
  whiteList['mask'] = false; // default: border-box
  whiteList['mask-box'] = false; // default: see individual properties
  whiteList['mask-box-outset'] = false; // default: 0
  whiteList['mask-box-repeat'] = false; // default: stretch
  whiteList['mask-box-slice'] = false; // default: 0 fill
  whiteList['mask-box-source'] = false; // default: none
  whiteList['mask-box-width'] = false; // default: auto
  whiteList['mask-clip'] = false; // default: border-box
  whiteList['mask-image'] = false; // default: none
  whiteList['mask-origin'] = false; // default: border-box
  whiteList['mask-position'] = false; // default: center
  whiteList['mask-repeat'] = false; // default: no-repeat
  whiteList['mask-size'] = false; // default: border-box
  whiteList['mask-source-type'] = false; // default: auto
  whiteList['mask-type'] = false; // default: luminance
  whiteList['max-height'] = true; // default: none
  whiteList['max-lines'] = false; // default: none
  whiteList['max-width'] = true; // default: none
  whiteList['min-height'] = true; // default: 0
  whiteList['min-width'] = true; // default: 0
  whiteList['move-to'] = false; // default: normal
  whiteList['nav-down'] = false; // default: auto
  whiteList['nav-index'] = false; // default: auto
  whiteList['nav-left'] = false; // default: auto
  whiteList['nav-right'] = false; // default: auto
  whiteList['nav-up'] = false; // default: auto
  whiteList['object-fit'] = false; // default: fill
  whiteList['object-position'] = false; // default: 50% 50%
  whiteList['opacity'] = false; // default: 1
  whiteList['order'] = false; // default: 0
  whiteList['orphans'] = false; // default: 2
  whiteList['outline'] = false; // default: depending on individual properties
  whiteList['outline-color'] = false; // default: invert
  whiteList['outline-offset'] = false; // default: 0
  whiteList['outline-style'] = false; // default: none
  whiteList['outline-width'] = false; // default: medium
  whiteList['overflow'] = false; // default: depending on individual properties
  whiteList['overflow-wrap'] = false; // default: normal
  whiteList['overflow-x'] = false; // default: visible
  whiteList['overflow-y'] = false; // default: visible
  whiteList['padding'] = true; // default: depending on individual properties
  whiteList['padding-bottom'] = true; // default: 0
  whiteList['padding-left'] = true; // default: 0
  whiteList['padding-right'] = true; // default: 0
  whiteList['padding-top'] = true; // default: 0
  whiteList['page'] = false; // default: auto
  whiteList['page-break-after'] = false; // default: auto
  whiteList['page-break-before'] = false; // default: auto
  whiteList['page-break-inside'] = false; // default: auto
  whiteList['page-policy'] = false; // default: start
  whiteList['pause'] = false; // default: implementation dependent
  whiteList['pause-after'] = false; // default: implementation dependent
  whiteList['pause-before'] = false; // default: implementation dependent
  whiteList['perspective'] = false; // default: none
  whiteList['perspective-origin'] = false; // default: 50% 50%
  whiteList['pitch'] = false; // default: medium
  whiteList['pitch-range'] = false; // default: 50
  whiteList['play-during'] = false; // default: auto
  whiteList['position'] = false; // default: static
  whiteList['presentation-level'] = false; // default: 0
  whiteList['quotes'] = false; // default: text
  whiteList['region-fragment'] = false; // default: auto
  whiteList['resize'] = false; // default: none
  whiteList['rest'] = false; // default: depending on individual properties
  whiteList['rest-after'] = false; // default: none
  whiteList['rest-before'] = false; // default: none
  whiteList['richness'] = false; // default: 50
  whiteList['right'] = false; // default: auto
  whiteList['rotation'] = false; // default: 0
  whiteList['rotation-point'] = false; // default: 50% 50%
  whiteList['ruby-align'] = false; // default: auto
  whiteList['ruby-merge'] = false; // default: separate
  whiteList['ruby-position'] = false; // default: before
  whiteList['shape-image-threshold'] = false; // default: 0.0
  whiteList['shape-outside'] = false; // default: none
  whiteList['shape-margin'] = false; // default: 0
  whiteList['size'] = false; // default: auto
  whiteList['speak'] = false; // default: auto
  whiteList['speak-as'] = false; // default: normal
  whiteList['speak-header'] = false; // default: once
  whiteList['speak-numeral'] = false; // default: continuous
  whiteList['speak-punctuation'] = false; // default: none
  whiteList['speech-rate'] = false; // default: medium
  whiteList['stress'] = false; // default: 50
  whiteList['string-set'] = false; // default: none
  whiteList['tab-size'] = false; // default: 8
  whiteList['table-layout'] = false; // default: auto
  whiteList['text-align'] = true; // default: start
  whiteList['text-align-last'] = true; // default: auto
  whiteList['text-combine-upright'] = true; // default: none
  whiteList['text-decoration'] = true; // default: none
  whiteList['text-decoration-color'] = true; // default: currentColor
  whiteList['text-decoration-line'] = true; // default: none
  whiteList['text-decoration-skip'] = true; // default: objects
  whiteList['text-decoration-style'] = true; // default: solid
  whiteList['text-emphasis'] = true; // default: depending on individual properties
  whiteList['text-emphasis-color'] = true; // default: currentColor
  whiteList['text-emphasis-position'] = true; // default: over right
  whiteList['text-emphasis-style'] = true; // default: none
  whiteList['text-height'] = true; // default: auto
  whiteList['text-indent'] = true; // default: 0
  whiteList['text-justify'] = true; // default: auto
  whiteList['text-orientation'] = true; // default: mixed
  whiteList['text-overflow'] = true; // default: clip
  whiteList['text-shadow'] = true; // default: none
  whiteList['text-space-collapse'] = true; // default: collapse
  whiteList['text-transform'] = true; // default: none
  whiteList['text-underline-position'] = true; // default: auto
  whiteList['text-wrap'] = true; // default: normal
  whiteList['top'] = false; // default: auto
  whiteList['transform'] = false; // default: none
  whiteList['transform-origin'] = false; // default: 50% 50% 0
  whiteList['transform-style'] = false; // default: flat
  whiteList['transition'] = false; // default: depending on individual properties
  whiteList['transition-delay'] = false; // default: 0s
  whiteList['transition-duration'] = false; // default: 0s
  whiteList['transition-property'] = false; // default: all
  whiteList['transition-timing-function'] = false; // default: ease
  whiteList['unicode-bidi'] = false; // default: normal
  whiteList['vertical-align'] = false; // default: baseline
  whiteList['visibility'] = false; // default: visible
  whiteList['voice-balance'] = false; // default: center
  whiteList['voice-duration'] = false; // default: auto
  whiteList['voice-family'] = false; // default: implementation dependent
  whiteList['voice-pitch'] = false; // default: medium
  whiteList['voice-range'] = false; // default: medium
  whiteList['voice-rate'] = false; // default: normal
  whiteList['voice-stress'] = false; // default: normal
  whiteList['voice-volume'] = false; // default: medium
  whiteList['volume'] = false; // default: medium
  whiteList['white-space'] = false; // default: normal
  whiteList['widows'] = false; // default: 2
  whiteList['width'] = true; // default: auto
  whiteList['will-change'] = false; // default: auto
  whiteList['word-break'] = true; // default: normal
  whiteList['word-spacing'] = true; // default: normal
  whiteList['word-wrap'] = true; // default: normal
  whiteList['wrap-flow'] = false; // default: auto
  whiteList['wrap-through'] = false; // default: wrap
  whiteList['writing-mode'] = false; // default: horizontal-tb
  whiteList['z-index'] = false; // default: auto

  return whiteList;
}


/**
 * 匹配到白名单上的一个属性时
 *
 * @param {String} name
 * @param {String} value
 * @param {Object} options
 * @return {String}
 */
function onAttr (name, value, options) {
  // do nothing
}

/**
 * 匹配到不在白名单上的一个属性时
 *
 * @param {String} name
 * @param {String} value
 * @param {Object} options
 * @return {String}
 */
function onIgnoreAttr (name, value, options) {
  // do nothing
}

var REGEXP_URL_JAVASCRIPT = /javascript\s*\:/img;

/**
 * 过滤属性值
 *
 * @param {String} name
 * @param {String} value
 * @return {String}
 */
function safeAttrValue(name, value) {
  if (REGEXP_URL_JAVASCRIPT.test(value)) return '';
  return value;
}


exports.whiteList = getDefaultWhiteList();
exports.getDefaultWhiteList = getDefaultWhiteList;
exports.onAttr = onAttr;
exports.onIgnoreAttr = onIgnoreAttr;
exports.safeAttrValue = safeAttrValue;


/***/ }),

/***/ "./node_modules/cssfilter/lib/index.js":
/*!*********************************************!*\
  !*** ./node_modules/cssfilter/lib/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * cssfilter
 *
 * @author 老雷<leizongmin@gmail.com>
 */

var DEFAULT = __webpack_require__(/*! ./default */ "./node_modules/cssfilter/lib/default.js");
var FilterCSS = __webpack_require__(/*! ./css */ "./node_modules/cssfilter/lib/css.js");


/**
 * XSS过滤
 *
 * @param {String} css 要过滤的CSS代码
 * @param {Object} options 选项：whiteList, onAttr, onIgnoreAttr
 * @return {String}
 */
function filterCSS (html, options) {
  var xss = new FilterCSS(options);
  return xss.process(html);
}


// 输出
exports = module.exports = filterCSS;
exports.FilterCSS = FilterCSS;
for (var i in DEFAULT) exports[i] = DEFAULT[i];

// 在浏览器端使用
if (typeof window !== 'undefined') {
  window.filterCSS = module.exports;
}


/***/ }),

/***/ "./node_modules/cssfilter/lib/parser.js":
/*!**********************************************!*\
  !*** ./node_modules/cssfilter/lib/parser.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * cssfilter
 *
 * @author 老雷<leizongmin@gmail.com>
 */

var _ = __webpack_require__(/*! ./util */ "./node_modules/cssfilter/lib/util.js");


/**
 * 解析style
 *
 * @param {String} css
 * @param {Function} onAttr 处理属性的函数
 *   参数格式： function (sourcePosition, position, name, value, source)
 * @return {String}
 */
function parseStyle (css, onAttr) {
  css = _.trimRight(css);
  if (css[css.length - 1] !== ';') css += ';';
  var cssLength = css.length;
  var isParenthesisOpen = false;
  var lastPos = 0;
  var i = 0;
  var retCSS = '';

  function addNewAttr () {
    // 如果没有正常的闭合圆括号，则直接忽略当前属性
    if (!isParenthesisOpen) {
      var source = _.trim(css.slice(lastPos, i));
      var j = source.indexOf(':');
      if (j !== -1) {
        var name = _.trim(source.slice(0, j));
        var value = _.trim(source.slice(j + 1));
        // 必须有属性名称
        if (name) {
          var ret = onAttr(lastPos, retCSS.length, name, value, source);
          if (ret) retCSS += ret + '; ';
        }
      }
    }
    lastPos = i + 1;
  }

  for (; i < cssLength; i++) {
    var c = css[i];
    if (c === '/' && css[i + 1] === '*') {
      // 备注开始
      var j = css.indexOf('*/', i + 2);
      // 如果没有正常的备注结束，则后面的部分全部跳过
      if (j === -1) break;
      // 直接将当前位置调到备注结尾，并且初始化状态
      i = j + 1;
      lastPos = i + 1;
      isParenthesisOpen = false;
    } else if (c === '(') {
      isParenthesisOpen = true;
    } else if (c === ')') {
      isParenthesisOpen = false;
    } else if (c === ';') {
      if (isParenthesisOpen) {
        // 在圆括号里面，忽略
      } else {
        addNewAttr();
      }
    } else if (c === '\n') {
      addNewAttr();
    }
  }

  return _.trim(retCSS);
}

module.exports = parseStyle;


/***/ }),

/***/ "./node_modules/cssfilter/lib/util.js":
/*!********************************************!*\
  !*** ./node_modules/cssfilter/lib/util.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  indexOf: function (arr, item) {
    var i, j;
    if (Array.prototype.indexOf) {
      return arr.indexOf(item);
    }
    for (i = 0, j = arr.length; i < j; i++) {
      if (arr[i] === item) {
        return i;
      }
    }
    return -1;
  },
  forEach: function (arr, fn, scope) {
    var i, j;
    if (Array.prototype.forEach) {
      return arr.forEach(fn, scope);
    }
    for (i = 0, j = arr.length; i < j; i++) {
      fn.call(scope, arr[i], i, arr);
    }
  },
  trim: function (str) {
    if (String.prototype.trim) {
      return str.trim();
    }
    return str.replace(/(^\s*)|(\s*$)/g, '');
  },
  trimRight: function (str) {
    if (String.prototype.trimRight) {
      return str.trimRight();
    }
    return str.replace(/(\s*$)/g, '');
  }
};


/***/ }),

/***/ "./node_modules/es6-denodeify/index.js":
/*!*********************************************!*\
  !*** ./node_modules/es6-denodeify/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function () {
  var PromiseArg = arguments[0] === undefined ? Promise : arguments[0];
  return function (f) {
    return function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return new PromiseArg(function (resolve, reject) {
        return f.apply(undefined, args.concat([function (err, val) {
          return err ? reject(err) : resolve(val);
        }]));
      });
    };
  };
};

module.exports = exports["default"];



/***/ }),

/***/ "./node_modules/fetch-cookie/index.js":
/*!********************************************!*\
  !*** ./node_modules/fetch-cookie/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var denodeify = __webpack_require__(/*! es6-denodeify */ "./node_modules/es6-denodeify/index.js")(Promise)
var tough = __webpack_require__(/*! tough-cookie */ "node-fetch")

module.exports = function fetchCookieDecorator (fetch, jar) {
  fetch = fetch || window.fetch
  jar = jar || new tough.CookieJar()

  var getCookieString = denodeify(jar.getCookieString.bind(jar))
  var setCookie = denodeify(jar.setCookie.bind(jar))

  async function fetchCookie (url, opts) {
    opts = opts || {}

    // Prepare request
    const cookie = await getCookieString(url)

    if (url.headers && typeof url.headers.append === 'function') {
      url.headers.append('cookie', cookie)
    } else if (opts.headers && typeof opts.headers.append === 'function') {
      opts.headers.append('cookie', cookie)
    } else {
      opts.headers = Object.assign(
        opts.headers || {},
        cookie ? { cookie: cookie } : {}
      )
    }

    // Actual request
    const res = await fetch(url, opts)

    // Get cookie header
    var cookies = []
    if (res.headers.getAll) {
      // node-fetch v1
      cookies = res.headers.getAll('set-cookie')
      // console.warn("You are using a fetch version that supports 'Headers.getAll' which is deprecated!")
      // console.warn("In the future 'fetch-cookie-v2' may discontinue supporting that fetch implementation.")
      // console.warn('Details: https://developer.mozilla.org/en-US/docs/Web/API/Headers/getAll')
    } else {
      // node-fetch v2
      const headers = res.headers.raw()
      if (headers['set-cookie'] !== undefined) {
        cookies = headers['set-cookie']
      }
    }

    // Store all present cookies
    await Promise.all(cookies.map((cookie) => setCookie(cookie, res.url)))

    return res
  }

  return fetchCookie
}


/***/ }),

/***/ "./node_modules/fetch-cookie/node-fetch.js":
/*!*************************************************!*\
  !*** ./node_modules/fetch-cookie/node-fetch.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = function nodeFetchCookieDecorator (nodeFetch, jar) {
  const fetchCookie = __webpack_require__(/*! ./ */ "./node_modules/fetch-cookie/index.js")(nodeFetch, jar)

  return function nodeFetchCookie (url, userOptions = {}) {
    const opts = Object.assign({}, userOptions, { redirect: 'manual' })

    // Forward identical options to wrapped node-fetch but tell to not handle redirection.
    return fetchCookie(url, opts)
      .then(res => {
        const isRedirect = (res.status === 303 || ((res.status === 301 || res.status === 302)))

        // Interpret the proprietary "redirect" option in the same way that node-fetch does.
        if (isRedirect && userOptions.redirect !== 'manual' && userOptions.follow !== 0) {
          const optsForGet = Object.assign({}, {
            method: 'GET',
            body: null,
            // Since the "follow" flag is not relevant for node-fetch in this case,
            // we'll hijack it for our internal bookkeeping.
            follow: userOptions.follow !== undefined ? userOptions.follow - 1 : undefined
          })

          return nodeFetchCookie(res.headers.get('location'), optsForGet)
        } else {
          return res
        }
      })
  }
}


/***/ }),

/***/ "./node_modules/form-data/lib/browser.js":
/*!***********************************************!*\
  !*** ./node_modules/form-data/lib/browser.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* eslint-env browser */
module.exports = typeof self == 'object' ? self.FormData : window.FormData;


/***/ }),

/***/ "./node_modules/manifesto.js/dist-umd/manifesto.js":
/*!*********************************************************!*\
  !*** ./node_modules/manifesto.js/dist-umd/manifesto.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){ true?module.exports=t(__webpack_require__(/*! fetch-cookie/node-fetch */ "./node_modules/fetch-cookie/node-fetch.js"),__webpack_require__(/*! form-data */ "./node_modules/form-data/lib/browser.js"),__webpack_require__(/*! node-fetch */ "node-fetch"),__webpack_require__(/*! url */ "./node_modules/url/url.js")):undefined}("undefined"!=typeof self?self:this,(function(e,t,r,n){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)r.d(n,i,function(t){return e[t]}.bind(null,i));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=3)}([function(e,t,r){"use strict";function n(e){for(var r in e)t.hasOwnProperty(r)||(t[r]=e[r])}Object.defineProperty(t,"__esModule",{value:!0}),n(r(5)),n(r(6)),n(r(7)),n(r(8)),n(r(9)),n(r(10)),n(r(11)),n(r(12)),n(r(13)),n(r(14)),n(r(15)),n(r(16)),n(r(17)),n(r(18)),n(r(19)),n(r(20)),n(r(21)),n(r(22)),n(r(23)),n(r(24)),n(r(25)),n(r(26)),n(r(27)),n(r(28)),n(r(29)),n(r(30)),n(r(31)),n(r(2))},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){e.BOOKMARKING="oa:bookmarking",e.CLASSIFYING="oa:classifying",e.COMMENTING="oa:commenting",e.DESCRIBING="oa:describing",e.EDITING="oa:editing",e.HIGHLIGHTING="oa:highlighting",e.IDENTIFYING="oa:identifying",e.LINKING="oa:linking",e.MODERATING="oa:moderating",e.PAINTING="sc:painting",e.QUESTIONING="oa:questioning",e.REPLYING="oa:replying",e.TAGGING="oa:tagging",e.TRANSCRIBING="oad:transcribing"}(t.AnnotationMotivation||(t.AnnotationMotivation={})),function(e){e.AUTO_ADVANCE="auto-advance",e.CONTINUOUS="continuous",e.FACING_PAGES="facing-pages",e.HIDDEN="hidden",e.INDIVIDUALS="individuals",e.MULTI_PART="multi-part",e.NO_NAV="no-nav",e.NON_PAGED="non-paged",e.PAGED="paged",e.REPEAT="repeat",e.SEQUENCE="sequence",e.THUMBNAIL_NAV="thumbnail-nav",e.TOGETHER="together",e.UNORDERED="unordered"}(t.Behavior||(t.Behavior={})),function(e){e.CANVAS="canvas",e.CHOICE="choice",e.CONTENT_AS_TEXT="contentastext",e.DOCUMENT="document",e.IMAGE="image",e.MOVING_IMAGE="movingimage",e.PDF="pdf",e.PHYSICAL_OBJECT="physicalobject",e.SOUND="sound",e.TEXTUALBODY="textualbody",e.VIDEO="video"}(t.ExternalResourceType||(t.ExternalResourceType={})),function(e){e.ANNOTATION="annotation",e.CANVAS="canvas",e.COLLECTION="collection",e.MANIFEST="manifest",e.RANGE="range",e.SEQUENCE="sequence"}(t.IIIFResourceType||(t.IIIFResourceType={})),function(e){e.AUDIO_MP4="audio/mp4",e.CORTO="application/corto",e.DRACO="application/draco",e.GLTF="model/gltf+json",e.JPG="image/jpeg",e.M3U8="application/vnd.apple.mpegurl",e.MP3="audio/mp3",e.MPEG_DASH="application/dash+xml",e.OBJ="text/plain",e.PDF="application/pdf",e.PLY="application/ply",e.THREEJS="application/vnd.threejs+json",e.VIDEO_MP4="video/mp4",e.WEBM="video/webm"}(t.MediaType||(t.MediaType={})),function(e){e.DOC="application/msword",e.DOCX="application/vnd.openxmlformats-officedocument.wordprocessingml.document",e.PDF="application/pdf"}(t.RenderingFormat||(t.RenderingFormat={})),function(e){e.IMAGE_0_COMPLIANCE_LEVEL_0="http://library.stanford.edu/iiif/image-api/compliance.html#level0",e.IMAGE_0_COMPLIANCE_LEVEL_1="http://library.stanford.edu/iiif/image-api/compliance.html#level1",e.IMAGE_0_COMPLIANCE_LEVEL_2="http://library.stanford.edu/iiif/image-api/compliance.html#level2",e.IMAGE_0_CONFORMANCE_LEVEL_0="http://library.stanford.edu/iiif/image-api/conformance.html#level0",e.IMAGE_0_CONFORMANCE_LEVEL_1="http://library.stanford.edu/iiif/image-api/conformance.html#level1",e.IMAGE_0_CONFORMANCE_LEVEL_2="http://library.stanford.edu/iiif/image-api/conformance.html#level2",e.IMAGE_1_COMPLIANCE_LEVEL_0="http://library.stanford.edu/iiif/image-api/1.1/compliance.html#level0",e.IMAGE_1_COMPLIANCE_LEVEL_1="http://library.stanford.edu/iiif/image-api/1.1/compliance.html#level1",e.IMAGE_1_COMPLIANCE_LEVEL_2="http://library.stanford.edu/iiif/image-api/1.1/compliance.html#level2",e.IMAGE_1_CONFORMANCE_LEVEL_0="http://library.stanford.edu/iiif/image-api/1.1/conformance.html#level0",e.IMAGE_1_CONFORMANCE_LEVEL_1="http://library.stanford.edu/iiif/image-api/1.1/conformance.html#level1",e.IMAGE_1_CONFORMANCE_LEVEL_2="http://library.stanford.edu/iiif/image-api/1.1/conformance.html#level2",e.IMAGE_1_LEVEL_0="http://iiif.io/api/image/1/level0.json",e.IMAGE_1_PROFILE_LEVEL_0="http://iiif.io/api/image/1/profiles/level0.json",e.IMAGE_1_LEVEL_1="http://iiif.io/api/image/1/level1.json",e.IMAGE_1_PROFILE_LEVEL_1="http://iiif.io/api/image/1/profiles/level1.json",e.IMAGE_1_LEVEL_2="http://iiif.io/api/image/1/level2.json",e.IMAGE_1_PROFILE_LEVEL_2="http://iiif.io/api/image/1/profiles/level2.json",e.IMAGE_2_LEVEL_0="http://iiif.io/api/image/2/level0.json",e.IMAGE_2_PROFILE_LEVEL_0="http://iiif.io/api/image/2/profiles/level0.json",e.IMAGE_2_LEVEL_1="http://iiif.io/api/image/2/level1.json",e.IMAGE_2_PROFILE_LEVEL_1="http://iiif.io/api/image/2/profiles/level1.json",e.IMAGE_2_LEVEL_2="http://iiif.io/api/image/2/level2.json",e.IMAGE_2_PROFILE_LEVEL_2="http://iiif.io/api/image/2/profiles/level2.json",e.AUTH_0_CLICK_THROUGH="http://iiif.io/api/auth/0/login/clickthrough",e.AUTH_0_LOGIN="http://iiif.io/api/auth/0/login",e.AUTH_0_LOGOUT="http://iiif.io/api/auth/0/logout",e.AUTH_0_RESTRICTED="http://iiif.io/api/auth/0/login/restricted",e.AUTH_0_TOKEN="http://iiif.io/api/auth/0/token",e.AUTH_1_CLICK_THROUGH="http://iiif.io/api/auth/1/clickthrough",e.AUTH_1_EXTERNAL="http://iiif.io/api/auth/1/external",e.AUTH_1_KIOSK="http://iiif.io/api/auth/1/kiosk",e.AUTH_1_LOGIN="http://iiif.io/api/auth/1/login",e.AUTH_1_LOGOUT="http://iiif.io/api/auth/1/logout",e.AUTH_1_PROBE="http://iiif.io/api/auth/1/probe",e.AUTH_1_TOKEN="http://iiif.io/api/auth/1/token",e.SEARCH_0="http://iiif.io/api/search/0/search",e.SEARCH_0_AUTO_COMPLETE="http://iiif.io/api/search/0/autocomplete",e.SEARCH_1="http://iiif.io/api/search/1/search",e.SEARCH_1_AUTO_COMPLETE="http://iiif.io/api/search/1/autocomplete",e.TRACKING_EXTENSIONS="http://universalviewer.io/tracking-extensions-profile",e.UI_EXTENSIONS="http://universalviewer.io/ui-extensions-profile",e.PRINT_EXTENSIONS="http://universalviewer.io/print-extensions-profile",e.SHARE_EXTENSIONS="http://universalviewer.io/share-extensions-profile",e.OTHER_MANIFESTATIONS="http://iiif.io/api/otherManifestations.json",e.IXIF="http://wellcomelibrary.org/ld/ixif/0/alpha.json"}(t.ServiceProfile||(t.ServiceProfile={})),function(e){e.BOTTOM_TO_TOP="bottom-to-top",e.LEFT_TO_RIGHT="left-to-right",e.RIGHT_TO_LEFT="right-to-left",e.TOP_TO_BOTTOM="top-to-bottom"}(t.ViewingDirection||(t.ViewingDirection={})),function(e){e.CONTINUOUS="continuous",e.INDIVIDUALS="individuals",e.NON_PAGED="non-paged",e.PAGED="paged",e.TOP="top"}(t.ViewingHint||(t.ViewingHint={}))},function(e,t,r){"use strict";var n=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(i,o){function a(e){try{u(n.next(e))}catch(e){o(e)}}function s(e){try{u(n.throw(e))}catch(e){o(e)}}function u(e){var t;e.done?i(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(a,s)}u((n=n.apply(e,t||[])).next())}))},i=this&&this.__generator||function(e,t){var r,n,i,o,a={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function s(o){return function(s){return function(o){if(r)throw new TypeError("Generator is already executing.");for(;a;)try{if(r=1,n&&(i=2&o[0]?n.return:o[0]?n.throw||((i=n.return)&&i.call(n),0):n.next)&&!(i=i.call(n,o[1])).done)return i;switch(n=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return a.label++,{value:o[1],done:!1};case 5:a.label++,n=o[1],o=[0];continue;case 7:o=a.ops.pop(),a.trys.pop();continue;default:if(!(i=(i=a.trys).length>0&&i[i.length-1])&&(6===o[0]||2===o[0])){a=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){a.label=o[1];break}if(6===o[0]&&a.label<i[1]){a.label=i[1],i=o;break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(o);break}i[2]&&a.ops.pop(),a.trys.pop();continue}o=t.call(e,a)}catch(e){o=[6,e],n=0}finally{r=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,s])}}};Object.defineProperty(t,"__esModule",{value:!0});var o=r(0),a=r(1),s=r(32),u=r(37),c=function(){function e(){}return e.getMediaType=function(e){return(e=(e=e.toLowerCase()).split(";")[0]).trim()},e.getImageQuality=function(e){return e===a.ServiceProfile.IMAGE_0_COMPLIANCE_LEVEL_1||e===a.ServiceProfile.IMAGE_0_COMPLIANCE_LEVEL_2||e===a.ServiceProfile.IMAGE_1_COMPLIANCE_LEVEL_1||e===a.ServiceProfile.IMAGE_1_COMPLIANCE_LEVEL_2||e===a.ServiceProfile.IMAGE_0_CONFORMANCE_LEVEL_1||e===a.ServiceProfile.IMAGE_0_CONFORMANCE_LEVEL_2||e===a.ServiceProfile.IMAGE_1_CONFORMANCE_LEVEL_1||e===a.ServiceProfile.IMAGE_1_CONFORMANCE_LEVEL_2||e===a.ServiceProfile.IMAGE_1_LEVEL_1||e===a.ServiceProfile.IMAGE_1_PROFILE_LEVEL_1||e===a.ServiceProfile.IMAGE_1_LEVEL_2||e===a.ServiceProfile.IMAGE_1_PROFILE_LEVEL_2?"native":"default"},e.getInexactLocale=function(e){return-1!==e.indexOf("-")?e.substr(0,e.indexOf("-")):e},e.getLocalisedValue=function(e,t){if(!Array.isArray(e))return e;for(var r=0;r<e.length;r++){var n=e[r];if(t===n["@language"])return n["@value"]}var i=t.substr(0,t.indexOf("-"));for(r=0;r<e.length;r++){var o=e[r];if(o["@language"]===i)return o["@value"]}return null},e.generateTreeNodeIds=function(t,r){var n;void 0===r&&(r=0),n=t.parentNode?t.parentNode.id+"-"+r:"0",t.id=n;for(var i=0;i<t.nodes.length;i++){var o=t.nodes[i];e.generateTreeNodeIds(o,i)}},e.normaliseType=function(e){return-1!==(e=e.toLowerCase()).indexOf(":")?e.split(":")[1]:e},e.normaliseUrl=function(e){return-1!==(e=e.substr(e.indexOf("://"))).indexOf("#")&&(e=e.split("#")[0]),e},e.normalisedUrlsMatch=function(t,r){return e.normaliseUrl(t)===e.normaliseUrl(r)},e.isImageProfile=function(t){return!!(e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_0_COMPLIANCE_LEVEL_0)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_0_COMPLIANCE_LEVEL_1)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_0_COMPLIANCE_LEVEL_2)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_1_COMPLIANCE_LEVEL_0)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_1_COMPLIANCE_LEVEL_2)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_0_CONFORMANCE_LEVEL_0)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_0_CONFORMANCE_LEVEL_1)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_0_CONFORMANCE_LEVEL_2)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_1_CONFORMANCE_LEVEL_1)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_1_CONFORMANCE_LEVEL_2)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_1_LEVEL_0)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_1_PROFILE_LEVEL_0)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_1_LEVEL_1)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_1_PROFILE_LEVEL_1)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_1_LEVEL_2)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_1_PROFILE_LEVEL_2)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_2_LEVEL_0)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_2_PROFILE_LEVEL_0)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_2_LEVEL_1)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_2_PROFILE_LEVEL_1)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_2_LEVEL_2)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_2_PROFILE_LEVEL_2))},e.isLevel0ImageProfile=function(t){return!!(e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_0_COMPLIANCE_LEVEL_0)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_1_COMPLIANCE_LEVEL_0)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_0_CONFORMANCE_LEVEL_0)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_1_CONFORMANCE_LEVEL_0)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_1_LEVEL_0)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_1_PROFILE_LEVEL_0)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_2_LEVEL_0)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_2_PROFILE_LEVEL_0))},e.isLevel1ImageProfile=function(t){return!!(e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_0_COMPLIANCE_LEVEL_1)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_1_COMPLIANCE_LEVEL_1)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_0_CONFORMANCE_LEVEL_1)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_1_CONFORMANCE_LEVEL_1)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_1_LEVEL_1)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_1_PROFILE_LEVEL_1)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_2_LEVEL_1)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_2_PROFILE_LEVEL_1))},e.isLevel2ImageProfile=function(t){return!!(e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_0_COMPLIANCE_LEVEL_2)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_1_COMPLIANCE_LEVEL_2)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_0_CONFORMANCE_LEVEL_2)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_1_CONFORMANCE_LEVEL_2)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_1_LEVEL_2)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_1_PROFILE_LEVEL_2)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_2_LEVEL_2)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_2_PROFILE_LEVEL_2))},e.parseManifest=function(e,t){return o.Deserialiser.parse(e,t)},e.loadManifest=function(e){return s.request(e,{credentials:"same-origin"})},e.loadExternalResourcesAuth1=function(t,r,n,i,o,a,s,u){return new Promise((function(c,l){var p=t.map((function(t){return e.loadExternalResourceAuth1(t,r,n,i,o,a,s,u)}));Promise.all(p).then((function(){c(t)})).catch((function(e){l(e)}))}))},e.loadExternalResourceAuth1=function(t,r,o,a,s,c,l,p){return n(this,void 0,void 0,(function(){var n;return i(this,(function(i){switch(i.label){case 0:return[4,a(t)];case 1:return(n=i.sent())?[4,t.getData(n)]:[3,6];case 2:return i.sent(),t.status!==u.OK?[3,3]:[2,t];case 3:return[4,e.doAuthChain(t,r,o,s,c,l,p)];case 4:i.sent(),i.label=5;case 5:if(t.status===u.OK||t.status===u.MOVED_TEMPORARILY)return[2,t];throw e.createAuthorizationFailedError();case 6:return[4,t.getData()];case 7:return i.sent(),t.status!==u.MOVED_TEMPORARILY&&t.status!==u.UNAUTHORIZED?[3,9]:[4,e.doAuthChain(t,r,o,s,c,l,p)];case 8:i.sent(),i.label=9;case 9:if(t.status===u.OK||t.status===u.MOVED_TEMPORARILY)return[2,t];throw e.createAuthorizationFailedError()}}))}))},e.doAuthChain=function(t,r,o,a,s,c,l){return n(this,void 0,void 0,(function(){var n,p,f,h,_,g,d,E;return i(this,(function(i){switch(i.label){case 0:return t.isAccessControlled()?((n=t.externalService)&&(n.options=t.options),(p=t.kioskService)&&(p.options=t.options),(f=t.clickThroughService)&&(f.options=t.options),(h=t.loginService)&&(h.options=t.options),t.isResponseHandled||t.status!==u.MOVED_TEMPORARILY?[3,2]:[4,c(t)]):[2,t];case 1:return i.sent(),[2,t];case 2:return _=null,g=null,(_=n)?(g=_,[4,e.attemptResourceWithToken(t,o,_)]):[3,4];case 3:return i.sent(),[2,t];case 4:return(_=p)?(g=_,(d=r(_))?[4,a(d)]:[3,7]):[3,7];case 5:return i.sent(),[4,e.attemptResourceWithToken(t,o,_)];case 6:return i.sent(),[2,t];case 7:return(_=f)?(g=_,[4,s(t,_)]):[3,11];case 8:return(E=i.sent())?[4,a(E)]:[3,11];case 9:return i.sent(),[4,e.attemptResourceWithToken(t,o,_)];case 10:return i.sent(),[2,t];case 11:return(_=h)?(g=_,[4,s(t,_)]):[3,15];case 12:return(E=i.sent())?[4,a(E)]:[3,15];case 13:return i.sent(),[4,e.attemptResourceWithToken(t,o,_)];case 14:return i.sent(),[2,t];case 15:return g&&l(t,g),[2]}}))}))},e.attemptResourceWithToken=function(e,t,r){return n(this,void 0,void 0,(function(){var n,o;return i(this,(function(i){switch(i.label){case 0:return(n=r.getService(a.ServiceProfile.AUTH_1_TOKEN))?[4,t(e,n)]:[3,3];case 1:return(o=i.sent())&&o.accessToken?[4,e.getData(o)]:[3,3];case 2:return i.sent(),[2,e];case 3:return[2]}}))}))},e.loadExternalResourcesAuth09=function(t,r,n,i,o,a,s,u,c,l){return new Promise((function(p,f){var h=t.map((function(t){return e.loadExternalResourceAuth09(t,r,n,i,o,a,s,u,c,l)}));Promise.all(h).then((function(){p(t)})).catch((function(e){f(e)}))}))},e.loadExternalResourceAuth09=function(t,r,n,i,o,a,s,c,l,p){return new Promise((function(f,h){p&&p.pessimisticAccessControl?t.getData().then((function(){t.isAccessControlled()?t.clickThroughService?(f(n(t)),f(i(t))):o(t).then((function(){a(t,!0).then((function(r){t.getData(r).then((function(){f(l(t))})).catch((function(t){h(e.createInternalServerError(t))}))})).catch((function(t){h(e.createInternalServerError(t))}))})).catch((function(t){h(e.createInternalServerError(t))})):f(t)})).catch((function(t){h(e.createInternalServerError(t))})):c(t,r).then((function(p){p?t.getData(p).then((function(){t.status===u.OK?f(l(t)):e.authorize(t,r,n,i,o,a,s,c).then((function(){f(l(t))})).catch((function(t){h(e.createAuthorizationFailedError())}))})).catch((function(t){h(e.createAuthorizationFailedError())})):e.authorize(t,r,n,i,o,a,s,c).then((function(){f(l(t))})).catch((function(t){h(e.createAuthorizationFailedError())}))})).catch((function(t){h(e.createAuthorizationFailedError())}))}))},e.createError=function(e,t){var r=new Error;return r.message=t,r.name=String(e),r},e.createAuthorizationFailedError=function(){return e.createError(o.StatusCode.AUTHORIZATION_FAILED,"Authorization failed")},e.createRestrictedError=function(){return e.createError(o.StatusCode.RESTRICTED,"Restricted")},e.createInternalServerError=function(t){return e.createError(o.StatusCode.INTERNAL_SERVER_ERROR,t)},e.authorize=function(t,r,n,i,o,a,s,c){return new Promise((function(l,p){t.getData().then((function(){t.isAccessControlled()?c(t,r).then((function(c){c?t.getData(c).then((function(){t.status===u.OK?l(t):e.showAuthInteraction(t,r,n,i,o,a,s,l,p)})).catch((function(t){p(e.createInternalServerError(t))})):a(t,!1).then((function(c){c?s(t,c,r).then((function(){t.getData(c).then((function(){t.status===u.OK?l(t):e.showAuthInteraction(t,r,n,i,o,a,s,l,p)})).catch((function(t){p(e.createInternalServerError(t))}))})).catch((function(t){p(e.createInternalServerError(t))})):e.showAuthInteraction(t,r,n,i,o,a,s,l,p)}))})).catch((function(t){p(e.createInternalServerError(t))})):l(t)}))}))},e.showAuthInteraction=function(t,r,n,i,o,a,s,c,l){t.status!==u.MOVED_TEMPORARILY||t.isResponseHandled?t.clickThroughService&&!t.isResponseHandled?n(t).then((function(){a(t,!0).then((function(n){s(t,n,r).then((function(){t.getData(n).then((function(){c(t)})).catch((function(t){l(e.createInternalServerError(t))}))})).catch((function(t){l(e.createInternalServerError(t))}))})).catch((function(t){l(e.createInternalServerError(t))}))})):o(t).then((function(){a(t,!0).then((function(n){s(t,n,r).then((function(){t.getData(n).then((function(){c(t)})).catch((function(t){l(e.createInternalServerError(t))}))})).catch((function(t){l(e.createInternalServerError(t))}))})).catch((function(t){l(e.createInternalServerError(t))}))})):c(t)},e.getService=function(e,t){for(var r=this.getServices(e),n=0;n<r.length;n++){var i=r[n];if(i.getProfile()===t)return i}return null},e.getResourceById=function(t,r){return e.traverseAndFind(t.__jsonld,"@id",r)},e.traverseAndFind=function(t,r,n){if(t.hasOwnProperty(r)&&t[r]===n)return t;for(var i=0;i<Object.keys(t).length;i++)if("object"==typeof t[Object.keys(t)[i]]){var o=e.traverseAndFind(t[Object.keys(t)[i]],r,n);if(null!=o)return o}},e.getServices=function(e){var t,r=[];if(!(t=e.__jsonld?e.__jsonld.service:e.service))return r;Array.isArray(t)||(t=[t]);for(var n=0;n<t.length;n++){var i=t[n];if("string"==typeof i){var a=this.getResourceById(e.options.resource,i);a&&r.push(new o.Service(a.__jsonld||a,e.options))}else r.push(new o.Service(i,e.options))}return r},e.getTemporalComponent=function(e){var t=/t=([^&]+)/g.exec(e),r=null;return t&&t[1]&&(r=t[1].split(",")),r},e}();t.Utils=c},function(e,t,r){e.exports=r(4)},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){for(var r in e)t.hasOwnProperty(r)||(t[r]=e[r])}(r(0));var n=r(2);t.loadManifest=function(e){return n.Utils.loadManifest(e)},t.parseManifest=function(e,t){return n.Utils.parseManifest(e,t)}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e){this.__jsonld=e,this.context=this.getProperty("context"),this.id=this.getProperty("id")}return e.prototype.getProperty=function(e){var t=null;return this.__jsonld&&((t=this.__jsonld[e])||(t=this.__jsonld["@"+e])),t},e}();t.JSONLDResource=n},function(e,t,r){"use strict";var n,i=this&&this.__extends||(n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(e,t)},function(e,t){function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)});Object.defineProperty(t,"__esModule",{value:!0});var o=r(0),a=r(1),s=function(e){function t(t,r){var n=e.call(this,t)||this;return n.options=r,n}return i(t,e),t.prototype.getIIIFResourceType=function(){return o.Utils.normaliseType(this.getProperty("type"))},t.prototype.getLabel=function(){var e=this.getProperty("label");return e?o.LanguageMap.parse(e,this.options.locale):[]},t.prototype.getDefaultLabel=function(){return o.LanguageMap.getValue(this.getLabel())},t.prototype.getMetadata=function(){var e=this.getProperty("metadata"),t=[];if(!e)return t;for(var r=0;r<e.length;r++){var n=e[r],i=new o.LabelValuePair(this.options.locale);i.parse(n),t.push(i)}return t},t.prototype.getRendering=function(e){for(var t=this.getRenderings(),r=0;r<t.length;r++){var n=t[r];if(n.getFormat()===e)return n}return null},t.prototype.getRenderings=function(){var e,t=[];if(!(e=this.__jsonld?this.__jsonld.rendering:this.rendering))return t;Array.isArray(e)||(e=[e]);for(var r=0;r<e.length;r++){var n=e[r];t.push(new o.Rendering(n,this.options))}return t},t.prototype.getService=function(e){return o.Utils.getService(this,e)},t.prototype.getServices=function(){return o.Utils.getServices(this)},t.prototype.getThumbnail=function(){var e=this.getProperty("thumbnail");return Array.isArray(e)&&(e=e[0]),e?new o.Thumbnail(e,this.options):null},t.prototype.isAnnotation=function(){return this.getIIIFResourceType()===a.IIIFResourceType.ANNOTATION},t.prototype.isCanvas=function(){return this.getIIIFResourceType()===a.IIIFResourceType.CANVAS},t.prototype.isCollection=function(){return this.getIIIFResourceType()===a.IIIFResourceType.COLLECTION},t.prototype.isManifest=function(){return this.getIIIFResourceType()===a.IIIFResourceType.MANIFEST},t.prototype.isRange=function(){return this.getIIIFResourceType()===a.IIIFResourceType.RANGE},t.prototype.isSequence=function(){return this.getIIIFResourceType()===a.IIIFResourceType.SEQUENCE},t}(o.JSONLDResource);t.ManifestResource=s},function(e,t,r){"use strict";var n,i=this&&this.__extends||(n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(e,t)},function(e,t){function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)});Object.defineProperty(t,"__esModule",{value:!0});var o=r(0),a=function(e){function t(t,r){return e.call(this,t,r)||this}return i(t,e),t.prototype.getFormat=function(){var e=this.getProperty("format");return e?e.toLowerCase():null},t.prototype.getResources=function(){var e=[];if(!this.__jsonld.resources)return e;for(var t=0;t<this.__jsonld.resources.length;t++){var r=this.__jsonld.resources[t],n=new o.Annotation(r,this.options);e.push(n)}return e},t.prototype.getType=function(){var e=this.getProperty("type");return e?o.Utils.normaliseType(e):null},t.prototype.getWidth=function(){return this.getProperty("width")},t.prototype.getHeight=function(){return this.getProperty("height")},t.prototype.getMaxWidth=function(){return this.getProperty("maxWidth")},t.prototype.getMaxHeight=function(){return this.getProperty("maxHeight")?null:this.getMaxWidth()},t}(o.ManifestResource);t.Resource=a},function(e,t,r){"use strict";var n,i=this&&this.__extends||(n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(e,t)},function(e,t){function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)});Object.defineProperty(t,"__esModule",{value:!0});var o=r(0),a=r(1),s=function(e){function t(t,r){var n=e.call(this,t,r)||this;n.index=-1,n.isLoaded=!1;var i={defaultLabel:"-",locale:"en-GB",resource:n,pessimisticAccessControl:!1};return n.options=Object.assign(i,r),n}return i(t,e),t.prototype.getAttribution=function(){var e=this.getProperty("attribution");return e?o.LanguageMap.parse(e,this.options.locale):[]},t.prototype.getDescription=function(){var e=this.getProperty("description");return e?o.LanguageMap.parse(e,this.options.locale):[]},t.prototype.getIIIFResourceType=function(){return o.Utils.normaliseType(this.getProperty("type"))},t.prototype.getLogo=function(){var e=this.getProperty("logo");return e?"string"==typeof e?e:(Array.isArray(e)&&e.length&&(e=e[0]),e["@id"]||e.id):null},t.prototype.getLicense=function(){return o.Utils.getLocalisedValue(this.getProperty("license"),this.options.locale)},t.prototype.getNavDate=function(){return new Date(this.getProperty("navDate"))},t.prototype.getRelated=function(){return this.getProperty("related")},t.prototype.getSeeAlso=function(){return this.getProperty("seeAlso")},t.prototype.getTrackingLabel=function(){var e=this.getService(a.ServiceProfile.TRACKING_EXTENSIONS);return e?e.getProperty("trackingLabel"):""},t.prototype.getDefaultTree=function(){return this.defaultTree=new o.TreeNode("root"),this.defaultTree.data=this,this.defaultTree},t.prototype.getRequiredStatement=function(){var e=null,t=this.getProperty("requiredStatement");if(t)(e=new o.LabelValuePair(this.options.locale)).parse(t);else{var r=this.getAttribution();r&&((e=new o.LabelValuePair(this.options.locale)).value=r)}return e},t.prototype.isCollection=function(){return this.getIIIFResourceType()===a.IIIFResourceType.COLLECTION},t.prototype.isManifest=function(){return this.getIIIFResourceType()===a.IIIFResourceType.MANIFEST},t.prototype.load=function(){var e=this;return new Promise((function(t){if(e.isLoaded)t(e);else{var r=e.options;r.navDate=e.getNavDate();var n=e.__jsonld.id;n||(n=e.__jsonld["@id"]),o.Utils.loadManifest(n).then((function(n){e.parentLabel=o.LanguageMap.getValue(e.getLabel(),r.locale);var i=o.Deserialiser.parse(n,r);(e=Object.assign(e,i)).index=r.index,t(e)}))}}))},t}(o.ManifestResource);t.IIIFResource=s},function(e,t,r){"use strict";var n,i=this&&this.__extends||(n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(e,t)},function(e,t){function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)});Object.defineProperty(t,"__esModule",{value:!0});var o=r(0),a=function(e){function t(t,r){return e.call(this,t,r)||this}return i(t,e),t.prototype.getBody=function(){var e=[],t=this.getProperty("body");if(t)if(Array.isArray(t))for(var r=0;r<t.length;r++){if((a=t[r]).items)for(var n=0;n<a.items.length;n++){var i=a.items[n];e.push(new o.AnnotationBody(i,this.options))}else e.push(new o.AnnotationBody(a,this.options))}else if(t.items)for(r=0;r<t.items.length;r++){var a=t.items[r];e.push(new o.AnnotationBody(a,this.options))}else e.push(new o.AnnotationBody(t,this.options));return e},t.prototype.getMotivation=function(){var e=this.getProperty("motivation");return e||null},t.prototype.getOn=function(){return this.getProperty("on")},t.prototype.getTarget=function(){return this.getProperty("target")},t.prototype.getResource=function(){return new o.Resource(this.getProperty("resource"),this.options)},t}(o.ManifestResource);t.Annotation=a},function(e,t,r){"use strict";var n,i=this&&this.__extends||(n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(e,t)},function(e,t){function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)});Object.defineProperty(t,"__esModule",{value:!0});var o=r(0),a=function(e){function t(t,r){return e.call(this,t,r)||this}return i(t,e),t.prototype.getFormat=function(){var e=this.getProperty("format");return e?o.Utils.getMediaType(e):null},t.prototype.getType=function(){return this.getProperty("type")?o.Utils.normaliseType(this.getProperty("type")):null},t.prototype.getWidth=function(){return this.getProperty("width")},t.prototype.getHeight=function(){return this.getProperty("height")},t}(o.ManifestResource);t.AnnotationBody=a},function(e,t,r){"use strict";var n,i=this&&this.__extends||(n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(e,t)},function(e,t){function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)});Object.defineProperty(t,"__esModule",{value:!0});var o=r(0),a=function(e){function t(t,r,n){var i=e.call(this,r)||this;return i.label=t,i.options=n,i}return i(t,e),t.prototype.getIIIFResourceType=function(){return o.Utils.normaliseType(this.getProperty("type"))},t.prototype.getLabel=function(){return this.label},t.prototype.getResources=function(){var e=this;return this.getProperty("resources").map((function(t){return new o.Annotation(t,e.options)}))},t.prototype.load=function(){var e=this;return new Promise((function(t,r){if(e.isLoaded)t(e);else{var n=e.__jsonld.id;n||(n=e.__jsonld["@id"]),o.Utils.loadManifest(n).then((function(r){e.__jsonld=r,e.context=e.getProperty("context"),e.id=e.getProperty("id"),e.isLoaded=!0,t(e)})).catch(r)}}))},t}(o.JSONLDResource);t.AnnotationList=a},function(e,t,r){"use strict";var n,i=this&&this.__extends||(n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(e,t)},function(e,t){function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)});Object.defineProperty(t,"__esModule",{value:!0});var o=function(e){function t(t,r){return e.call(this,t,r)||this}return i(t,e),t.prototype.getItems=function(){return this.getProperty("items")},t}(r(0).ManifestResource);t.AnnotationPage=o},function(e,t,r){"use strict";var n,i=this&&this.__extends||(n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(e,t)},function(e,t){function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)});Object.defineProperty(t,"__esModule",{value:!0});var o=r(0),a=function(e){function t(t,r){return e.call(this,t,r)||this}return i(t,e),t.prototype.getCanonicalImageUri=function(e){var t,r=null,n="default",i=e;if(this.externalResource&&this.externalResource.data&&this.externalResource.data["@id"])r=this.externalResource.data["@id"],i||(i=this.externalResource.data.width),this.externalResource.data["@context"]&&(this.externalResource.data["@context"].indexOf("/1.0/context.json")>-1||this.externalResource.data["@context"].indexOf("/1.1/context.json")>-1||this.externalResource.data["@context"].indexOf("/1/context.json")>-1)&&(n="native");else{var a=this.getImages();if(a&&a.length){var s=a[0].getResource(),u=s.getServices();if(i||(i=s.getWidth()),u.length){var c=u[0];r=c.id,n=o.Utils.getImageQuality(c.getProfile())}else if(i===s.getWidth())return s.id}if(!r){var l=this.getProperty("thumbnail");if(l){if("string"==typeof l)return l;if(l["@id"])return l["@id"];if(l.length)return l[0].id}}}return t=i+",",r&&r.endsWith("/")&&(r=r.substr(0,r.length-1)),[r,"full",t,0,n+".jpg"].join("/")},t.prototype.getMaxDimensions=function(){var e,t=null;return this.externalResource&&this.externalResource.data&&this.externalResource.data.profile&&(e=this.externalResource.data.profile,Array.isArray(e)&&(e=e.filter((function(e){return e.maxWidth}))[0])&&(t=new o.Size(e.maxWidth,e.maxHeight?e.maxHeight:e.maxWidth))),t},t.prototype.getContent=function(){var e=[],t=this.__jsonld.items||this.__jsonld.content;if(!t)return e;var r=null;if(t.length&&(r=new o.AnnotationPage(t[0],this.options)),!r)return e;for(var n=r.getItems(),i=0;i<n.length;i++){var a=n[i],s=new o.Annotation(a,this.options);e.push(s)}return e},t.prototype.getDuration=function(){return this.getProperty("duration")},t.prototype.getImages=function(){var e=[];if(!this.__jsonld.images)return e;for(var t=0;t<this.__jsonld.images.length;t++){var r=this.__jsonld.images[t],n=new o.Annotation(r,this.options);e.push(n)}return e},t.prototype.getIndex=function(){return this.getProperty("index")},t.prototype.getOtherContent=function(){var e=this,t=Array.isArray(this.getProperty("otherContent"))?this.getProperty("otherContent"):[this.getProperty("otherContent")],r=t.filter((function(e){return e&&(t=e["@type"],r="sc:AnnotationList","string"==typeof t&&"string"==typeof r&&t.toLowerCase()==t.toLowerCase());var t,r})).map((function(t,r){return new o.AnnotationList(t.label||"Annotation list "+r,t,e.options)})).map((function(e){return e.load()}));return Promise.all(r)},t.prototype.getWidth=function(){return this.getProperty("width")},t.prototype.getHeight=function(){return this.getProperty("height")},t}(o.Resource);t.Canvas=a},function(e,t,r){"use strict";var n,i=this&&this.__extends||(n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(e,t)},function(e,t){function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)});Object.defineProperty(t,"__esModule",{value:!0});var o=r(1),a=r(0),s=function(e){function t(t,r){var n=e.call(this,t,r)||this;return n.items=[],n._collections=null,n._manifests=null,t.__collection=n,n}return i(t,e),t.prototype.getCollections=function(){return this._collections?this._collections:this._collections=this.items.filter((function(e){return e.isCollection()}))},t.prototype.getManifests=function(){return this._manifests?this._manifests:this._manifests=this.items.filter((function(e){return e.isManifest()}))},t.prototype.getCollectionByIndex=function(e){for(var t,r=this.getCollections(),n=0;n<r.length;n++){var i=r[n];i.index===e&&(t=i)}if(t)return t.options.index=e,t.load();throw new Error("Collection index not found")},t.prototype.getManifestByIndex=function(e){for(var t,r=this.getManifests(),n=0;n<r.length;n++){var i=r[n];i.index===e&&(t=i)}if(t)return t.options.index=e,t.load();throw new Error("Manifest index not found")},t.prototype.getTotalCollections=function(){return this.getCollections().length},t.prototype.getTotalManifests=function(){return this.getManifests().length},t.prototype.getTotalItems=function(){return this.items.length},t.prototype.getViewingDirection=function(){return this.getProperty("viewingDirection")?this.getProperty("viewingDirection"):o.ViewingDirection.LEFT_TO_RIGHT},t.prototype.getDefaultTree=function(){return e.prototype.getDefaultTree.call(this),this.defaultTree.data.type=a.Utils.normaliseType(a.TreeNodeType.COLLECTION),this._parseManifests(this),this._parseCollections(this),a.Utils.generateTreeNodeIds(this.defaultTree),this.defaultTree},t.prototype._parseManifests=function(e){if(e.getManifests()&&e.getManifests().length)for(var t=0;t<e.getManifests().length;t++){var r=e.getManifests()[t],n=r.getDefaultTree();n.label=r.parentLabel||a.LanguageMap.getValue(r.getLabel(),this.options.locale)||"manifest "+(t+1),n.navDate=r.getNavDate(),n.data.id=r.id,n.data.type=a.Utils.normaliseType(a.TreeNodeType.MANIFEST),e.defaultTree.addNode(n)}},t.prototype._parseCollections=function(e){if(e.getCollections()&&e.getCollections().length)for(var t=0;t<e.getCollections().length;t++){var r=e.getCollections()[t],n=r.getDefaultTree();n.label=r.parentLabel||a.LanguageMap.getValue(r.getLabel(),this.options.locale)||"collection "+(t+1),n.navDate=r.getNavDate(),n.data.id=r.id,n.data.type=a.Utils.normaliseType(a.TreeNodeType.COLLECTION),e.defaultTree.addNode(n)}},t}(a.IIIFResource);t.Collection=s},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){this.start=e,this.end=t}return e.prototype.getLength=function(){return this.end-this.start},e}();t.Duration=n},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(0),i=function(){function e(e){this.defaultLocale=e}return e.prototype.parse=function(e){this.resource=e,this.label=n.LanguageMap.parse(this.resource.label,this.defaultLocale),this.value=n.LanguageMap.parse(this.resource.value,this.defaultLocale)},e.prototype.getLabel=function(){return this.label?n.LanguageMap.getValue(this.label,this.defaultLocale):null},e.prototype.setLabel=function(e){var t=this;if(this.label&&this.label.length){var r=this.label.filter((function(e){return e.locale===t.defaultLocale||e.locale===n.Utils.getInexactLocale(t.defaultLocale)}))[0];r&&(r.value=e)}},e.prototype.getValue=function(){if(this.value){var e=this.defaultLocale;return this.label&&this.label.length&&this.label[0].locale&&(e=this.label[0].locale),n.LanguageMap.getValue(this.value,e)}return null},e.prototype.setValue=function(e){var t=this;if(this.value&&this.value.length){var r=this.value.filter((function(e){return e.locale===t.defaultLocale||e.locale===n.Utils.getInexactLocale(t.defaultLocale)}))[0];r&&(r.value=e)}},e}();t.LabelValuePair=i},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(e,t){Array.isArray(e)?1===e.length?this.value=e[0]:this.value=e.join("<br/>"):this.value=e,this.locale=t};t.Language=n},function(e,t,r){"use strict";var n,i=this&&this.__extends||(n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(e,t)},function(e,t){function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)});Object.defineProperty(t,"__esModule",{value:!0});var o=r(0),a=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return i(t,e),t.parse=function(e,t){var r,n=[];if(!e)return n;if(Array.isArray(e))for(var i=0;i<e.length;i++){var a=e[i];r="string"==typeof a?new o.Language(a,t):new o.Language(a["@value"],a["@language"]||t),n.push(r)}else{if("string"==typeof e)return r=new o.Language(e,t),n.push(r),n;e["@value"]?(r=new o.Language(e["@value"],e["@language"]||t),n.push(r)):Object.keys(e).forEach((function(t){if(!e[t].length)throw new Error("language must have a value");r=new o.Language(e[t],t),n.push(r)}))}return n},t.getValue=function(e,t){if(e.length){if(t){var r=e.filter((function(e){return e.locale===t||o.Utils.getInexactLocale(e.locale)===o.Utils.getInexactLocale(t)}))[0];if(r)return r.value}return e[0].value}return null},t}(Array);t.LanguageMap=a},function(e,t,r){"use strict";var n,i=this&&this.__extends||(n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(e,t)},function(e,t){function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)});Object.defineProperty(t,"__esModule",{value:!0});var o=r(1),a=r(0),s=function(e){function t(t,r){var n=e.call(this,t,r)||this;if(n.index=0,n._allRanges=null,n.items=[],n._topRanges=[],n.__jsonld.structures&&n.__jsonld.structures.length)for(var i=n._getTopRanges(),o=0;o<i.length;o++){var a=i[o];n._parseRanges(a,String(o))}return n}return i(t,e),t.prototype.getPosterCanvas=function(){var e=this.getProperty("posterCanvas");return e&&(e=new a.Canvas(e,this.options)),e},t.prototype.getBehavior=function(){var e=this.getProperty("behavior");return Array.isArray(e)&&(e=e[0]),e||null},t.prototype.getDefaultTree=function(){if(e.prototype.getDefaultTree.call(this),this.defaultTree.data.type=a.Utils.normaliseType(a.TreeNodeType.MANIFEST),!this.isLoaded)return this.defaultTree;var t=this.getTopRanges();return t.length&&t[0].getTree(this.defaultTree),a.Utils.generateTreeNodeIds(this.defaultTree),this.defaultTree},t.prototype._getTopRanges=function(){var e=[];if(this.__jsonld.structures&&this.__jsonld.structures.length){for(var t=0;t<this.__jsonld.structures.length;t++){var r=this.__jsonld.structures[t];r.viewingHint===o.ViewingHint.TOP&&e.push(r)}if(!e.length){var n={};n.ranges=this.__jsonld.structures,e.push(n)}}return e},t.prototype.getTopRanges=function(){return this._topRanges},t.prototype._getRangeById=function(e){if(this.__jsonld.structures&&this.__jsonld.structures.length)for(var t=0;t<this.__jsonld.structures.length;t++){var r=this.__jsonld.structures[t];if(r["@id"]===e||r.id===e)return r}return null},t.prototype._parseRanges=function(e,t,r){var n,i=null;if("string"==typeof e&&(i=e,e=this._getRangeById(i)),e){(n=new a.Range(e,this.options)).parentRange=r,n.path=t,r?r.items.push(n):this._topRanges.push(n);var o=e.items||e.members;if(o)for(var s=0;s<o.length;s++){var u=o[s];if(u["@type"]&&"sc:range"===u["@type"].toLowerCase()||u.type&&"range"===u.type.toLowerCase())this._parseRanges(u,t+"/"+s,n);else if(u["@type"]&&"sc:canvas"===u["@type"].toLowerCase()||u.type&&"canvas"===u.type.toLowerCase()){n.canvases||(n.canvases=[]);var c=u.id||u["@id"];n.canvases.push(c)}}else if(e.ranges)for(s=0;s<e.ranges.length;s++)this._parseRanges(e.ranges[s],t+"/"+s,n)}else console.warn("Range:",i,"does not exist")},t.prototype.getAllRanges=function(){if(null!=this._allRanges)return this._allRanges;this._allRanges=[];for(var e=this.getTopRanges(),t=function(t){var n=e[t];n.id&&r._allRanges.push(n);var i=function(e,t){e.add(t);var r=t.getRanges();return r.length?r.reduce(i,e):e},o=Array.from(n.getRanges().reduce(i,new Set));r._allRanges=r._allRanges.concat(o)},r=this,n=0;n<e.length;n++)t(n);return this._allRanges},t.prototype.getRangeById=function(e){for(var t=this.getAllRanges(),r=0;r<t.length;r++){var n=t[r];if(n.id===e)return n}return null},t.prototype.getRangeByPath=function(e){for(var t=this.getAllRanges(),r=0;r<t.length;r++){var n=t[r];if(n.path===e)return n}return null},t.prototype.getSequences=function(){if(this.items.length)return this.items;var e=this.__jsonld.mediaSequences||this.__jsonld.sequences;if(e)for(var t=0;t<e.length;t++){var r=e[t],n=new a.Sequence(r,this.options);this.items.push(n)}else if(this.__jsonld.items){n=new a.Sequence(this.__jsonld.items,this.options);this.items.push(n)}return this.items},t.prototype.getSequenceByIndex=function(e){return this.getSequences()[e]},t.prototype.getTotalSequences=function(){return this.getSequences().length},t.prototype.getManifestType=function(){var e=this.getService(o.ServiceProfile.UI_EXTENSIONS);return e?e.getProperty("manifestType"):a.ManifestType.EMPTY},t.prototype.isMultiSequence=function(){return this.getTotalSequences()>1},t.prototype.isPagingEnabled=function(){var e=this.getViewingHint();if(e)return e===o.ViewingHint.PAGED;var t=this.getBehavior();return!!t&&t===o.Behavior.PAGED},t.prototype.getViewingDirection=function(){return this.getProperty("viewingDirection")},t.prototype.getViewingHint=function(){return this.getProperty("viewingHint")},t}(a.IIIFResource);t.Manifest=s},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){e.EMPTY="",e.MANUSCRIPT="manuscript",e.MONOGRAPH="monograph"}(t.ManifestType||(t.ManifestType={}))},function(e,t,r){"use strict";var n,i=this&&this.__extends||(n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(e,t)},function(e,t){function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)});Object.defineProperty(t,"__esModule",{value:!0});var o=r(0),a=r(1),s=function(e){function t(t,r){var n=e.call(this,t,r)||this;return n._ranges=null,n.canvases=null,n.items=[],n}return i(t,e),t.prototype.getCanvasIds=function(){return this.__jsonld.canvases?this.__jsonld.canvases:this.canvases?this.canvases:[]},t.prototype.getDuration=function(){var e,t;if(this.canvases&&this.canvases.length)for(var r=0;r<this.canvases.length;r++){var n=this.canvases[r],i=o.Utils.getTemporalComponent(n);i&&i.length>1&&(0===r&&(e=Number(i[0])),r===this.canvases.length-1&&(t=Number(i[1])))}else{var a=this.getRanges();for(r=0;r<a.length;r++){var s=a[r].getDuration();s&&(0===r&&(e=s.start),r===a.length-1&&(t=s.end))}}if(void 0!==e&&void 0!==t)return new o.Duration(e,t)},t.prototype.getRanges=function(){return this._ranges?this._ranges:this._ranges=this.items.filter((function(e){return e.isRange()}))},t.prototype.getBehavior=function(){var e=this.getProperty("behavior");return Array.isArray(e)&&(e=e[0]),e||null},t.prototype.getViewingDirection=function(){return this.getProperty("viewingDirection")},t.prototype.getViewingHint=function(){return this.getProperty("viewingHint")},t.prototype.getTree=function(e){e.data=this,this.treeNode=e;var t=this.getRanges();if(t&&t.length)for(var r=0;r<t.length;r++){var n=t[r],i=new o.TreeNode;e.addNode(i),this._parseTreeNode(i,n)}return o.Utils.generateTreeNodeIds(e),e},t.prototype.spansTime=function(e){var t=this.getDuration();return!!(t&&e>=t.start&&e<=t.end)},t.prototype._parseTreeNode=function(e,t){e.label=o.LanguageMap.getValue(t.getLabel(),this.options.locale),e.data=t,e.data.type=o.Utils.normaliseType(o.TreeNodeType.RANGE),t.treeNode=e;var r=t.getRanges();if(r&&r.length)for(var n=0;n<r.length;n++){var i=r[n];if(i.getBehavior()!==a.Behavior.NO_NAV){var s=new o.TreeNode;e.addNode(s),this._parseTreeNode(s,i)}}},t}(o.ManifestResource);t.Range=s},function(e,t,r){"use strict";var n,i=this&&this.__extends||(n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(e,t)},function(e,t){function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)});Object.defineProperty(t,"__esModule",{value:!0});var o=function(e){function t(t,r){return e.call(this,t,r)||this}return i(t,e),t.prototype.getFormat=function(){return this.getProperty("format")},t}(r(0).ManifestResource);t.Rendering=o},function(e,t,r){"use strict";var n,i=this&&this.__extends||(n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(e,t)},function(e,t){function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)});Object.defineProperty(t,"__esModule",{value:!0});var o=r(1),a=r(0),s=function(e){function t(t,r){var n=e.call(this,t,r)||this;return n.items=[],n._thumbnails=null,n}return i(t,e),t.prototype.getCanvases=function(){if(this.items.length)return this.items;var e=this.__jsonld.canvases||this.__jsonld.elements;if(e)for(var t=0;t<e.length;t++){var r=e[t];(n=new a.Canvas(r,this.options)).index=t,this.items.push(n)}else if(this.__jsonld)for(t=0;t<this.__jsonld.length;t++){var n;r=this.__jsonld[t];(n=new a.Canvas(r,this.options)).index=t,this.items.push(n)}return this.items},t.prototype.getCanvasById=function(e){for(var t=0;t<this.getTotalCanvases();t++){var r=this.getCanvasByIndex(t),n=a.Utils.normaliseUrl(r.id);if(a.Utils.normaliseUrl(e)===n)return r}return null},t.prototype.getCanvasByIndex=function(e){return this.getCanvases()[e]},t.prototype.getCanvasIndexById=function(e){for(var t=0;t<this.getTotalCanvases();t++){if(this.getCanvasByIndex(t).id===e)return t}return null},t.prototype.getCanvasIndexByLabel=function(e,t){e=e.trim(),isNaN(e)||(e=parseInt(e,10).toString(),t&&(e+="r"));for(var r,n,i,o=/(\d*)\D+(\d*)/,s=0;s<this.getTotalCanvases();s++){var u=this.getCanvasByIndex(s);if(a.LanguageMap.getValue(u.getLabel(),this.options.locale)===e)return s;if((r=o.exec(e))&&(n=r[1],(i=r[2])&&new RegExp("^"+n+"\\D+"+i+"$").test(u.getLabel().toString())))return s}return-1},t.prototype.getLastCanvasLabel=function(e){for(var t=this.getTotalCanvases()-1;t>=0;t--){var r=this.getCanvasByIndex(t),n=a.LanguageMap.getValue(r.getLabel(),this.options.locale);if(e){if(/^[a-zA-Z0-9]*$/.test(n))return n}else if(n)return n}return this.options.defaultLabel},t.prototype.getLastPageIndex=function(){return this.getTotalCanvases()-1},t.prototype.getNextPageIndex=function(e,t){var r;if(t){var n=this.getPagedIndices(e),i=this.getViewingDirection();r=i&&i===o.ViewingDirection.RIGHT_TO_LEFT?n[0]+1:n[n.length-1]+1}else r=e+1;return r>this.getLastPageIndex()?-1:r},t.prototype.getPagedIndices=function(e,t){var r=[];if(t){r=this.isFirstCanvas(e)||this.isLastCanvas(e)?[e]:e%2?[e,e+1]:[e-1,e];var n=this.getViewingDirection();n&&n===o.ViewingDirection.RIGHT_TO_LEFT&&(r=r.reverse())}else r.push(e);return r},t.prototype.getPrevPageIndex=function(e,t){var r;if(t){var n=this.getPagedIndices(e),i=this.getViewingDirection();r=i&&i===o.ViewingDirection.RIGHT_TO_LEFT?n[n.length-1]-1:n[0]-1}else r=e-1;return r},t.prototype.getStartCanvasIndex=function(){var e=this.getStartCanvas();if(e)for(var t=0;t<this.getTotalCanvases();t++){if(this.getCanvasByIndex(t).id===e)return t}return 0},t.prototype.getThumbs=function(e,t){for(var r=[],n=this.getTotalCanvases(),i=0;i<n;i++){var o=this.getCanvasByIndex(i),s=new a.Thumb(e,o);r.push(s)}return r},t.prototype.getThumbnails=function(){if(null!=this._thumbnails)return this._thumbnails;this._thumbnails=[];for(var e=this.getCanvases(),t=0;t<e.length;t++){var r=e[t].getThumbnail();r&&this._thumbnails.push(r)}return this._thumbnails},t.prototype.getStartCanvas=function(){return this.getProperty("startCanvas")},t.prototype.getTotalCanvases=function(){return this.getCanvases().length},t.prototype.getViewingDirection=function(){return this.getProperty("viewingDirection")?this.getProperty("viewingDirection"):this.options.resource.getViewingDirection?this.options.resource.getViewingDirection():null},t.prototype.getViewingHint=function(){return this.getProperty("viewingHint")},t.prototype.isCanvasIndexOutOfRange=function(e){return e>this.getTotalCanvases()-1},t.prototype.isFirstCanvas=function(e){return 0===e},t.prototype.isLastCanvas=function(e){return e===this.getTotalCanvases()-1},t.prototype.isMultiCanvas=function(){return this.getTotalCanvases()>1},t.prototype.isPagingEnabled=function(){var e=this.getViewingHint();return!!e&&e===o.ViewingHint.PAGED},t.prototype.isTotalCanvasesEven=function(){return this.getTotalCanvases()%2==0},t}(a.ManifestResource);t.Sequence=s},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(0),i=function(){function e(){}return e.parse=function(e,t){return"string"==typeof e&&(e=JSON.parse(e)),this.parseJson(e,t)},e.parseJson=function(e,t){var r;if(t&&t.navDate&&!isNaN(t.navDate.getTime())&&(e.navDate=t.navDate.toString()),e["@type"])switch(e["@type"]){case"sc:Collection":r=this.parseCollection(e,t);break;case"sc:Manifest":r=this.parseManifest(e,t);break;default:return null}else switch(e.type){case"Collection":r=this.parseCollection(e,t);break;case"Manifest":r=this.parseManifest(e,t);break;default:return null}return r.isLoaded=!0,r},e.parseCollection=function(e,t){var r=new n.Collection(e,t);return t?(r.index=t.index||0,t.resource&&(r.parentCollection=t.resource.parentCollection)):r.index=0,this.parseCollections(r,t),this.parseManifests(r,t),this.parseItems(r,t),r},e.parseCollections=function(e,t){var r;if(e.__jsonld.collections?r=e.__jsonld.collections:e.__jsonld.items&&(r=e.__jsonld.items.filter((function(e){return"collection"===e.type.toLowerCase()}))),r)for(var n=0;n<r.length;n++){t&&(t.index=n);var i=this.parseCollection(r[n],t);i.index=n,i.parentCollection=e,e.items.push(i)}},e.parseManifest=function(e,t){return new n.Manifest(e,t)},e.parseManifests=function(e,t){var r;if(e.__jsonld.manifests?r=e.__jsonld.manifests:e.__jsonld.items&&(r=e.__jsonld.items.filter((function(e){return"manifest"===e.type.toLowerCase()}))),r)for(var n=0;n<r.length;n++){var i=this.parseManifest(r[n],t);i.index=n,i.parentCollection=e,e.items.push(i)}},e.parseItem=function(e,t){if(e["@type"]){if("sc:manifest"===e["@type"].toLowerCase())return this.parseManifest(e,t);if("sc:collection"===e["@type"].toLowerCase())return this.parseCollection(e,t)}else if(e.type){if("manifest"===e.type.toLowerCase())return this.parseManifest(e,t);if("collection"===e.type.toLowerCase())return this.parseCollection(e,t)}return null},e.parseItems=function(e,t){var r=e.__jsonld.members||e.__jsonld.items;if(r)for(var n=function(n){t&&(t.index=n);var o=i.parseItem(r[n],t);return o?e.items.filter((function(e){return e.id===o.id}))[0]?"continue":(o.index=n,o.parentCollection=e,void e.items.push(o)):{value:void 0}},i=this,o=0;o<r.length;o++){var a=n(o);if("object"==typeof a)return a.value}},e}();t.Deserialiser=i},function(e,t,r){"use strict";var n,i=this&&this.__extends||(n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(e,t)},function(e,t){function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)});Object.defineProperty(t,"__esModule",{value:!0});var o=r(0),a=function(e){function t(t,r){return e.call(this,t,r)||this}return i(t,e),t.prototype.getProfile=function(){var e=this.getProperty("profile");return e||(e=this.getProperty("dcterms:conformsTo")),Array.isArray(e)?e[0]:e},t.prototype.getConfirmLabel=function(){return o.Utils.getLocalisedValue(this.getProperty("confirmLabel"),this.options.locale)},t.prototype.getDescription=function(){return o.Utils.getLocalisedValue(this.getProperty("description"),this.options.locale)},t.prototype.getFailureDescription=function(){return o.Utils.getLocalisedValue(this.getProperty("failureDescription"),this.options.locale)},t.prototype.getFailureHeader=function(){return o.Utils.getLocalisedValue(this.getProperty("failureHeader"),this.options.locale)},t.prototype.getHeader=function(){return o.Utils.getLocalisedValue(this.getProperty("header"),this.options.locale)},t.prototype.getServiceLabel=function(){return o.Utils.getLocalisedValue(this.getProperty("label"),this.options.locale)},t.prototype.getInfoUri=function(){var e=this.id;return e.endsWith("/")||(e+="/"),e+="info.json"},t}(o.ManifestResource);t.Service=a},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(e,t){this.width=e,this.height=t};t.Size=n},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){e[e.AUTHORIZATION_FAILED=1]="AUTHORIZATION_FAILED",e[e.FORBIDDEN=2]="FORBIDDEN",e[e.INTERNAL_SERVER_ERROR=3]="INTERNAL_SERVER_ERROR",e[e.RESTRICTED=4]="RESTRICTED"}(t.StatusCode||(t.StatusCode={}))},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(0),i=function(e,t){this.data=t,this.index=t.index,this.width=e;var r=t.getHeight()/t.getWidth();this.height=r?Math.floor(this.width*r):e,this.uri=t.getCanonicalImageUri(e),this.label=n.LanguageMap.getValue(t.getLabel())};t.Thumb=i},function(e,t,r){"use strict";var n,i=this&&this.__extends||(n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(e,t)},function(e,t){function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)});Object.defineProperty(t,"__esModule",{value:!0});var o=function(e){function t(t,r){return e.call(this,t,r)||this}return i(t,e),t}(r(0).Resource);t.Thumbnail=o},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(0),i=function(){function e(e,t){this.label=e,this.data=t||{},this.nodes=[]}return e.prototype.addNode=function(e){this.nodes.push(e),e.parentNode=this},e.prototype.isCollection=function(){return this.data.type===n.Utils.normaliseType(n.TreeNodeType.COLLECTION)},e.prototype.isManifest=function(){return this.data.type===n.Utils.normaliseType(n.TreeNodeType.MANIFEST)},e.prototype.isRange=function(){return this.data.type===n.Utils.normaliseType(n.TreeNodeType.RANGE)},e}();t.TreeNode=i},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){e.COLLECTION="collection",e.MANIFEST="manifest",e.RANGE="range"}(t.TreeNodeType||(t.TreeNodeType={}))},function(e,t,r){!function(e,t,r,n,i){"use strict";t=t&&t.hasOwnProperty("default")?t.default:t,r=r&&r.hasOwnProperty("default")?r.default:r,n=n&&n.hasOwnProperty("default")?n.default:n,i=i&&i.hasOwnProperty("default")?i.default:i;class o extends Error{constructor({networkError:e,status:t,statusText:r,body:n,url:i,init:a},...s){super(...s),Error.captureStackTrace&&Error.captureStackTrace(this,o),this.name="FetchError",this.status=t,this.statusText=r,this.body=n,this.url=i,this.init=a,this.networkError=e,this.url&&(this.message=`error while fetching ${this.url}\n\nstatus: ${this.status}\n\ninit: ${JSON.stringify(a,void 0,2)}\n\nbody: ${JSON.stringify(n,void 0,2)}\n`)}}const a="undefined"!=typeof fetch,s=a?fetch:t(n),u=a?Headers:n.Headers,c=a?Request:n.Request,l=a?Response:n.Response,p=a?FormData:r,f=a?URL:i.URL,h=a?URLSearchParams:i.URLSearchParams,_=new RegExp("^application/(.*\\+)?json"),g=new RegExp("^application/(.*\\+)?xml");e.FetchError=o,e.FormData=p,e.Headers=u,e.Request=c,e.Response=l,e.URL=f,e.URLSearchParams=h,e.fetch=s,e.request=async function(e,t){let r;try{r=await s(e,t)}catch(e){throw new o({networkError:{message:e.message}})}const n=await async function(e){const{headers:t}=e,r=t.get("Content-Type");let n="blob";r?r.startsWith("text/")||g.test(r)?n="text":_.test(r)&&(n="json"):n="blob";const i=e[n](),o=await i;return{status:e.status,statusText:e.statusText,ok:e.ok,body:o}}(r);if(!n.ok)throw new o({status:n.status,statusText:n.statusText,body:n.body,url:e});return n.body},Object.defineProperty(e,"__esModule",{value:!0})}(t,r(33),r(34),r(35),r(36))},function(t,r){t.exports=e},function(e,r){e.exports=t},function(e,t){e.exports=r},function(e,t){e.exports=n},function(e,t,r){window,e.exports=function(e){var t={};function r(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)r.d(n,i,function(t){return e[t]}.bind(null,i));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){e.exports=r(1)},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.CONTINUE=100,t.SWITCHING_PROTOCOLS=101,t.PROCESSING=102,t.OK=200,t.CREATED=201,t.ACCEPTED=202,t.NON_AUTHORITATIVE_INFORMATION=203,t.NO_CONTENT=204,t.RESET_CONTENT=205,t.PARTIAL_CONTENT=206,t.MULTI_STATUS=207,t.MULTIPLE_CHOICES=300,t.MOVED_PERMANENTLY=301,t.MOVED_TEMPORARILY=302,t.SEE_OTHER=303,t.NOT_MODIFIED=304,t.USE_PROXY=305,t.TEMPORARY_REDIRECT=307,t.BAD_REQUEST=400,t.UNAUTHORIZED=401,t.PAYMENT_REQUIRED=402,t.FORBIDDEN=403,t.NOT_FOUND=404,t.METHOD_NOT_ALLOWED=405,t.NOT_ACCEPTABLE=406,t.PROXY_AUTHENTICATION_REQUIRED=407,t.REQUEST_TIME_OUT=408,t.CONFLICT=409,t.GONE=410,t.LENGTH_REQUIRED=411,t.PRECONDITION_FAILED=412,t.REQUEST_ENTITY_TOO_LARGE=413,t.REQUEST_URI_TOO_LARGE=414,t.UNSUPPORTED_MEDIA_TYPE=415,t.REQUESTED_RANGE_NOT_SATISFIABLE=416,t.EXPECTATION_FAILED=417,t.IM_A_TEAPOT=418,t.UNPROCESSABLE_ENTITY=422,t.LOCKED=423,t.FAILED_DEPENDENCY=424,t.UNORDERED_COLLECTION=425,t.UPGRADE_REQUIRED=426,t.PRECONDITION_REQUIRED=428,t.TOO_MANY_REQUESTS=429,t.REQUEST_HEADER_FIELDS_TOO_LARGE=431,t.INTERNAL_SERVER_ERROR=500,t.NOT_IMPLEMENTED=501,t.BAD_GATEWAY=502,t.SERVICE_UNAVAILABLE=503,t.GATEWAY_TIME_OUT=504,t.HTTP_VERSION_NOT_SUPPORTED=505,t.VARIANT_ALSO_NEGOTIATES=506,t.INSUFFICIENT_STORAGE=507,t.BANDWIDTH_LIMIT_EXCEEDED=509,t.NOT_EXTENDED=510,t.NETWORK_AUTHENTICATION_REQUIRED=511}])}])}));

/***/ }),

/***/ "./node_modules/node-libs-browser/node_modules/punycode/punycode.js":
/*!**************************************************************************!*\
  !*** ./node_modules/node-libs-browser/node_modules/punycode/punycode.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/punycode v1.4.1 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports =  true && exports &&
		!exports.nodeType && exports;
	var freeModule =  true && module &&
		!module.nodeType && module;
	var freeGlobal = typeof global == 'object' && global;
	if (
		freeGlobal.global === freeGlobal ||
		freeGlobal.window === freeGlobal ||
		freeGlobal.self === freeGlobal
	) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw new RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		var result = [];
		while (length--) {
			result[length] = fn(array[length]);
		}
		return result;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		var parts = string.split('@');
		var result = '';
		if (parts.length > 1) {
			// In email addresses, only the domain name should be punycoded. Leave
			// the local part (i.e. everything up to `@`) intact.
			result = parts[0] + '@';
			string = parts[1];
		}
		// Avoid `split(regex)` for IE8 compatibility. See #17.
		string = string.replace(regexSeparators, '\x2E');
		var labels = string.split('.');
		var encoded = map(labels, fn).join('.');
		return result + encoded;
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * https://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(input) {
		return mapDomain(input, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
	function toASCII(input) {
		return mapDomain(input, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.4.1',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		true
	) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
			return punycode;
		}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}

}(this));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module), __webpack_require__(/*! ./../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/querystring-es3/decode.js":
/*!************************************************!*\
  !*** ./node_modules/querystring-es3/decode.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};


/***/ }),

/***/ "./node_modules/querystring-es3/encode.js":
/*!************************************************!*\
  !*** ./node_modules/querystring-es3/encode.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};


/***/ }),

/***/ "./node_modules/querystring-es3/index.js":
/*!***********************************************!*\
  !*** ./node_modules/querystring-es3/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.decode = exports.parse = __webpack_require__(/*! ./decode */ "./node_modules/querystring-es3/decode.js");
exports.encode = exports.stringify = __webpack_require__(/*! ./encode */ "./node_modules/querystring-es3/encode.js");


/***/ }),

/***/ "./node_modules/url/url.js":
/*!*********************************!*\
  !*** ./node_modules/url/url.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var punycode = __webpack_require__(/*! punycode */ "./node_modules/node-libs-browser/node_modules/punycode/punycode.js");
var util = __webpack_require__(/*! ./util */ "./node_modules/url/util.js");

exports.parse = urlParse;
exports.resolve = urlResolve;
exports.resolveObject = urlResolveObject;
exports.format = urlFormat;

exports.Url = Url;

function Url() {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.host = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.query = null;
  this.pathname = null;
  this.path = null;
  this.href = null;
}

// Reference: RFC 3986, RFC 1808, RFC 2396

// define these here so at least they only have to be
// compiled once on the first module load.
var protocolPattern = /^([a-z0-9.+-]+:)/i,
    portPattern = /:[0-9]*$/,

    // Special case for a simple path URL
    simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,

    // RFC 2396: characters reserved for delimiting URLs.
    // We actually just auto-escape these.
    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

    // RFC 2396: characters not allowed for various reasons.
    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
    autoEscape = ['\''].concat(unwise),
    // Characters that are never ever allowed in a hostname.
    // Note that any invalid chars are also handled, but these
    // are the ones that are *expected* to be seen, so we fast-path
    // them.
    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
    hostEndingChars = ['/', '?', '#'],
    hostnameMaxLen = 255,
    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
    // protocols that can allow "unsafe" and "unwise" chars.
    unsafeProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that never have a hostname.
    hostlessProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that always contain a // bit.
    slashedProtocol = {
      'http': true,
      'https': true,
      'ftp': true,
      'gopher': true,
      'file': true,
      'http:': true,
      'https:': true,
      'ftp:': true,
      'gopher:': true,
      'file:': true
    },
    querystring = __webpack_require__(/*! querystring */ "./node_modules/querystring-es3/index.js");

function urlParse(url, parseQueryString, slashesDenoteHost) {
  if (url && util.isObject(url) && url instanceof Url) return url;

  var u = new Url;
  u.parse(url, parseQueryString, slashesDenoteHost);
  return u;
}

Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
  if (!util.isString(url)) {
    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
  }

  // Copy chrome, IE, opera backslash-handling behavior.
  // Back slashes before the query string get converted to forward slashes
  // See: https://code.google.com/p/chromium/issues/detail?id=25916
  var queryIndex = url.indexOf('?'),
      splitter =
          (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',
      uSplit = url.split(splitter),
      slashRegex = /\\/g;
  uSplit[0] = uSplit[0].replace(slashRegex, '/');
  url = uSplit.join(splitter);

  var rest = url;

  // trim before proceeding.
  // This is to support parse stuff like "  http://foo.com  \n"
  rest = rest.trim();

  if (!slashesDenoteHost && url.split('#').length === 1) {
    // Try fast path regexp
    var simplePath = simplePathPattern.exec(rest);
    if (simplePath) {
      this.path = rest;
      this.href = rest;
      this.pathname = simplePath[1];
      if (simplePath[2]) {
        this.search = simplePath[2];
        if (parseQueryString) {
          this.query = querystring.parse(this.search.substr(1));
        } else {
          this.query = this.search.substr(1);
        }
      } else if (parseQueryString) {
        this.search = '';
        this.query = {};
      }
      return this;
    }
  }

  var proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    var lowerProto = proto.toLowerCase();
    this.protocol = lowerProto;
    rest = rest.substr(proto.length);
  }

  // figure out if it's got a host
  // user@server is *always* interpreted as a hostname, and url
  // resolution will treat //foo/bar as host=foo,path=bar because that's
  // how the browser resolves relative URLs.
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var slashes = rest.substr(0, 2) === '//';
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      this.slashes = true;
    }
  }

  if (!hostlessProtocol[proto] &&
      (slashes || (proto && !slashedProtocol[proto]))) {

    // there's a hostname.
    // the first instance of /, ?, ;, or # ends the host.
    //
    // If there is an @ in the hostname, then non-host chars *are* allowed
    // to the left of the last @ sign, unless some host-ending character
    // comes *before* the @-sign.
    // URLs are obnoxious.
    //
    // ex:
    // http://a@b@c/ => user:a@b host:c
    // http://a@b?@c => user:a host:c path:/?@c

    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
    // Review our test case against browsers more comprehensively.

    // find the first instance of any hostEndingChars
    var hostEnd = -1;
    for (var i = 0; i < hostEndingChars.length; i++) {
      var hec = rest.indexOf(hostEndingChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }

    // at this point, either we have an explicit point where the
    // auth portion cannot go past, or the last @ char is the decider.
    var auth, atSign;
    if (hostEnd === -1) {
      // atSign can be anywhere.
      atSign = rest.lastIndexOf('@');
    } else {
      // atSign must be in auth portion.
      // http://a@b/c@d => host:b auth:a path:/c@d
      atSign = rest.lastIndexOf('@', hostEnd);
    }

    // Now we have a portion which is definitely the auth.
    // Pull that off.
    if (atSign !== -1) {
      auth = rest.slice(0, atSign);
      rest = rest.slice(atSign + 1);
      this.auth = decodeURIComponent(auth);
    }

    // the host is the remaining to the left of the first non-host char
    hostEnd = -1;
    for (var i = 0; i < nonHostChars.length; i++) {
      var hec = rest.indexOf(nonHostChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }
    // if we still have not hit it, then the entire thing is a host.
    if (hostEnd === -1)
      hostEnd = rest.length;

    this.host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd);

    // pull out port.
    this.parseHost();

    // we've indicated that there is a hostname,
    // so even if it's empty, it has to be present.
    this.hostname = this.hostname || '';

    // if hostname begins with [ and ends with ]
    // assume that it's an IPv6 address.
    var ipv6Hostname = this.hostname[0] === '[' &&
        this.hostname[this.hostname.length - 1] === ']';

    // validate a little.
    if (!ipv6Hostname) {
      var hostparts = this.hostname.split(/\./);
      for (var i = 0, l = hostparts.length; i < l; i++) {
        var part = hostparts[i];
        if (!part) continue;
        if (!part.match(hostnamePartPattern)) {
          var newpart = '';
          for (var j = 0, k = part.length; j < k; j++) {
            if (part.charCodeAt(j) > 127) {
              // we replace non-ASCII char with a temporary placeholder
              // we need this to make sure size of hostname is not
              // broken by replacing non-ASCII by nothing
              newpart += 'x';
            } else {
              newpart += part[j];
            }
          }
          // we test again with ASCII char only
          if (!newpart.match(hostnamePartPattern)) {
            var validParts = hostparts.slice(0, i);
            var notHost = hostparts.slice(i + 1);
            var bit = part.match(hostnamePartStart);
            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }
            if (notHost.length) {
              rest = '/' + notHost.join('.') + rest;
            }
            this.hostname = validParts.join('.');
            break;
          }
        }
      }
    }

    if (this.hostname.length > hostnameMaxLen) {
      this.hostname = '';
    } else {
      // hostnames are always lower case.
      this.hostname = this.hostname.toLowerCase();
    }

    if (!ipv6Hostname) {
      // IDNA Support: Returns a punycoded representation of "domain".
      // It only converts parts of the domain name that
      // have non-ASCII characters, i.e. it doesn't matter if
      // you call it with a domain that already is ASCII-only.
      this.hostname = punycode.toASCII(this.hostname);
    }

    var p = this.port ? ':' + this.port : '';
    var h = this.hostname || '';
    this.host = h + p;
    this.href += this.host;

    // strip [ and ] from the hostname
    // the host field still retains them, though
    if (ipv6Hostname) {
      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
      if (rest[0] !== '/') {
        rest = '/' + rest;
      }
    }
  }

  // now rest is set to the post-host stuff.
  // chop off any delim chars.
  if (!unsafeProtocol[lowerProto]) {

    // First, make 100% sure that any "autoEscape" chars get
    // escaped, even if encodeURIComponent doesn't think they
    // need to be.
    for (var i = 0, l = autoEscape.length; i < l; i++) {
      var ae = autoEscape[i];
      if (rest.indexOf(ae) === -1)
        continue;
      var esc = encodeURIComponent(ae);
      if (esc === ae) {
        esc = escape(ae);
      }
      rest = rest.split(ae).join(esc);
    }
  }


  // chop off from the tail first.
  var hash = rest.indexOf('#');
  if (hash !== -1) {
    // got a fragment string.
    this.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  var qm = rest.indexOf('?');
  if (qm !== -1) {
    this.search = rest.substr(qm);
    this.query = rest.substr(qm + 1);
    if (parseQueryString) {
      this.query = querystring.parse(this.query);
    }
    rest = rest.slice(0, qm);
  } else if (parseQueryString) {
    // no query string, but parseQueryString still requested
    this.search = '';
    this.query = {};
  }
  if (rest) this.pathname = rest;
  if (slashedProtocol[lowerProto] &&
      this.hostname && !this.pathname) {
    this.pathname = '/';
  }

  //to support http.request
  if (this.pathname || this.search) {
    var p = this.pathname || '';
    var s = this.search || '';
    this.path = p + s;
  }

  // finally, reconstruct the href based on what has been validated.
  this.href = this.format();
  return this;
};

// format a parsed object into a url string
function urlFormat(obj) {
  // ensure it's an object, and not a string url.
  // If it's an obj, this is a no-op.
  // this way, you can call url_format() on strings
  // to clean up potentially wonky urls.
  if (util.isString(obj)) obj = urlParse(obj);
  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
  return obj.format();
}

Url.prototype.format = function() {
  var auth = this.auth || '';
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ':');
    auth += '@';
  }

  var protocol = this.protocol || '',
      pathname = this.pathname || '',
      hash = this.hash || '',
      host = false,
      query = '';

  if (this.host) {
    host = auth + this.host;
  } else if (this.hostname) {
    host = auth + (this.hostname.indexOf(':') === -1 ?
        this.hostname :
        '[' + this.hostname + ']');
    if (this.port) {
      host += ':' + this.port;
    }
  }

  if (this.query &&
      util.isObject(this.query) &&
      Object.keys(this.query).length) {
    query = querystring.stringify(this.query);
  }

  var search = this.search || (query && ('?' + query)) || '';

  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
  // unless they had them to begin with.
  if (this.slashes ||
      (!protocol || slashedProtocol[protocol]) && host !== false) {
    host = '//' + (host || '');
    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
  } else if (!host) {
    host = '';
  }

  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
  if (search && search.charAt(0) !== '?') search = '?' + search;

  pathname = pathname.replace(/[?#]/g, function(match) {
    return encodeURIComponent(match);
  });
  search = search.replace('#', '%23');

  return protocol + host + pathname + search + hash;
};

function urlResolve(source, relative) {
  return urlParse(source, false, true).resolve(relative);
}

Url.prototype.resolve = function(relative) {
  return this.resolveObject(urlParse(relative, false, true)).format();
};

function urlResolveObject(source, relative) {
  if (!source) return relative;
  return urlParse(source, false, true).resolveObject(relative);
}

Url.prototype.resolveObject = function(relative) {
  if (util.isString(relative)) {
    var rel = new Url();
    rel.parse(relative, false, true);
    relative = rel;
  }

  var result = new Url();
  var tkeys = Object.keys(this);
  for (var tk = 0; tk < tkeys.length; tk++) {
    var tkey = tkeys[tk];
    result[tkey] = this[tkey];
  }

  // hash is always overridden, no matter what.
  // even href="" will remove it.
  result.hash = relative.hash;

  // if the relative url is empty, then there's nothing left to do here.
  if (relative.href === '') {
    result.href = result.format();
    return result;
  }

  // hrefs like //foo/bar always cut to the protocol.
  if (relative.slashes && !relative.protocol) {
    // take everything except the protocol from relative
    var rkeys = Object.keys(relative);
    for (var rk = 0; rk < rkeys.length; rk++) {
      var rkey = rkeys[rk];
      if (rkey !== 'protocol')
        result[rkey] = relative[rkey];
    }

    //urlParse appends trailing / to urls like http://www.example.com
    if (slashedProtocol[result.protocol] &&
        result.hostname && !result.pathname) {
      result.path = result.pathname = '/';
    }

    result.href = result.format();
    return result;
  }

  if (relative.protocol && relative.protocol !== result.protocol) {
    // if it's a known url protocol, then changing
    // the protocol does weird things
    // first, if it's not file:, then we MUST have a host,
    // and if there was a path
    // to begin with, then we MUST have a path.
    // if it is file:, then the host is dropped,
    // because that's known to be hostless.
    // anything else is assumed to be absolute.
    if (!slashedProtocol[relative.protocol]) {
      var keys = Object.keys(relative);
      for (var v = 0; v < keys.length; v++) {
        var k = keys[v];
        result[k] = relative[k];
      }
      result.href = result.format();
      return result;
    }

    result.protocol = relative.protocol;
    if (!relative.host && !hostlessProtocol[relative.protocol]) {
      var relPath = (relative.pathname || '').split('/');
      while (relPath.length && !(relative.host = relPath.shift()));
      if (!relative.host) relative.host = '';
      if (!relative.hostname) relative.hostname = '';
      if (relPath[0] !== '') relPath.unshift('');
      if (relPath.length < 2) relPath.unshift('');
      result.pathname = relPath.join('/');
    } else {
      result.pathname = relative.pathname;
    }
    result.search = relative.search;
    result.query = relative.query;
    result.host = relative.host || '';
    result.auth = relative.auth;
    result.hostname = relative.hostname || relative.host;
    result.port = relative.port;
    // to support http.request
    if (result.pathname || result.search) {
      var p = result.pathname || '';
      var s = result.search || '';
      result.path = p + s;
    }
    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
  }

  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
      isRelAbs = (
          relative.host ||
          relative.pathname && relative.pathname.charAt(0) === '/'
      ),
      mustEndAbs = (isRelAbs || isSourceAbs ||
                    (result.host && relative.pathname)),
      removeAllDots = mustEndAbs,
      srcPath = result.pathname && result.pathname.split('/') || [],
      relPath = relative.pathname && relative.pathname.split('/') || [],
      psychotic = result.protocol && !slashedProtocol[result.protocol];

  // if the url is a non-slashed url, then relative
  // links like ../.. should be able
  // to crawl up to the hostname, as well.  This is strange.
  // result.protocol has already been set by now.
  // Later on, put the first path part into the host field.
  if (psychotic) {
    result.hostname = '';
    result.port = null;
    if (result.host) {
      if (srcPath[0] === '') srcPath[0] = result.host;
      else srcPath.unshift(result.host);
    }
    result.host = '';
    if (relative.protocol) {
      relative.hostname = null;
      relative.port = null;
      if (relative.host) {
        if (relPath[0] === '') relPath[0] = relative.host;
        else relPath.unshift(relative.host);
      }
      relative.host = null;
    }
    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
  }

  if (isRelAbs) {
    // it's absolute.
    result.host = (relative.host || relative.host === '') ?
                  relative.host : result.host;
    result.hostname = (relative.hostname || relative.hostname === '') ?
                      relative.hostname : result.hostname;
    result.search = relative.search;
    result.query = relative.query;
    srcPath = relPath;
    // fall through to the dot-handling below.
  } else if (relPath.length) {
    // it's relative
    // throw away the existing file, and take the new path instead.
    if (!srcPath) srcPath = [];
    srcPath.pop();
    srcPath = srcPath.concat(relPath);
    result.search = relative.search;
    result.query = relative.query;
  } else if (!util.isNullOrUndefined(relative.search)) {
    // just pull out the search.
    // like href='?foo'.
    // Put this after the other two cases because it simplifies the booleans
    if (psychotic) {
      result.hostname = result.host = srcPath.shift();
      //occationaly the auth can get stuck only in host
      //this especially happens in cases like
      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
      var authInHost = result.host && result.host.indexOf('@') > 0 ?
                       result.host.split('@') : false;
      if (authInHost) {
        result.auth = authInHost.shift();
        result.host = result.hostname = authInHost.shift();
      }
    }
    result.search = relative.search;
    result.query = relative.query;
    //to support http.request
    if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
      result.path = (result.pathname ? result.pathname : '') +
                    (result.search ? result.search : '');
    }
    result.href = result.format();
    return result;
  }

  if (!srcPath.length) {
    // no path at all.  easy.
    // we've already handled the other stuff above.
    result.pathname = null;
    //to support http.request
    if (result.search) {
      result.path = '/' + result.search;
    } else {
      result.path = null;
    }
    result.href = result.format();
    return result;
  }

  // if a url ENDs in . or .., then it must get a trailing slash.
  // however, if it ends in anything else non-slashy,
  // then it must NOT get a trailing slash.
  var last = srcPath.slice(-1)[0];
  var hasTrailingSlash = (
      (result.host || relative.host || srcPath.length > 1) &&
      (last === '.' || last === '..') || last === '');

  // strip single dots, resolve double dots to parent dir
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = srcPath.length; i >= 0; i--) {
    last = srcPath[i];
    if (last === '.') {
      srcPath.splice(i, 1);
    } else if (last === '..') {
      srcPath.splice(i, 1);
      up++;
    } else if (up) {
      srcPath.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (!mustEndAbs && !removeAllDots) {
    for (; up--; up) {
      srcPath.unshift('..');
    }
  }

  if (mustEndAbs && srcPath[0] !== '' &&
      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
    srcPath.unshift('');
  }

  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
    srcPath.push('');
  }

  var isAbsolute = srcPath[0] === '' ||
      (srcPath[0] && srcPath[0].charAt(0) === '/');

  // put the host back
  if (psychotic) {
    result.hostname = result.host = isAbsolute ? '' :
                                    srcPath.length ? srcPath.shift() : '';
    //occationaly the auth can get stuck only in host
    //this especially happens in cases like
    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
    var authInHost = result.host && result.host.indexOf('@') > 0 ?
                     result.host.split('@') : false;
    if (authInHost) {
      result.auth = authInHost.shift();
      result.host = result.hostname = authInHost.shift();
    }
  }

  mustEndAbs = mustEndAbs || (result.host && srcPath.length);

  if (mustEndAbs && !isAbsolute) {
    srcPath.unshift('');
  }

  if (!srcPath.length) {
    result.pathname = null;
    result.path = null;
  } else {
    result.pathname = srcPath.join('/');
  }

  //to support request.http
  if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
    result.path = (result.pathname ? result.pathname : '') +
                  (result.search ? result.search : '');
  }
  result.auth = relative.auth || result.auth;
  result.slashes = result.slashes || relative.slashes;
  result.href = result.format();
  return result;
};

Url.prototype.parseHost = function() {
  var host = this.host;
  var port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ':') {
      this.port = port.substr(1);
    }
    host = host.substr(0, host.length - port.length);
  }
  if (host) this.hostname = host;
};


/***/ }),

/***/ "./node_modules/url/util.js":
/*!**********************************!*\
  !*** ./node_modules/url/util.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  isString: function(arg) {
    return typeof(arg) === 'string';
  },
  isObject: function(arg) {
    return typeof(arg) === 'object' && arg !== null;
  },
  isNull: function(arg) {
    return arg === null;
  },
  isNullOrUndefined: function(arg) {
    return arg == null;
  }
};


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./node_modules/xss/lib/default.js":
/*!*****************************************!*\
  !*** ./node_modules/xss/lib/default.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * default settings
 *
 * @author Zongmin Lei<leizongmin@gmail.com>
 */

var FilterCSS = __webpack_require__(/*! cssfilter */ "./node_modules/cssfilter/lib/index.js").FilterCSS;
var getDefaultCSSWhiteList = __webpack_require__(/*! cssfilter */ "./node_modules/cssfilter/lib/index.js").getDefaultWhiteList;
var _ = __webpack_require__(/*! ./util */ "./node_modules/xss/lib/util.js");

function getDefaultWhiteList() {
  return {
    a: ["target", "href", "title"],
    abbr: ["title"],
    address: [],
    area: ["shape", "coords", "href", "alt"],
    article: [],
    aside: [],
    audio: ["autoplay", "controls", "loop", "preload", "src"],
    b: [],
    bdi: ["dir"],
    bdo: ["dir"],
    big: [],
    blockquote: ["cite"],
    br: [],
    caption: [],
    center: [],
    cite: [],
    code: [],
    col: ["align", "valign", "span", "width"],
    colgroup: ["align", "valign", "span", "width"],
    dd: [],
    del: ["datetime"],
    details: ["open"],
    div: [],
    dl: [],
    dt: [],
    em: [],
    font: ["color", "size", "face"],
    footer: [],
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    header: [],
    hr: [],
    i: [],
    img: ["src", "alt", "title", "width", "height"],
    ins: ["datetime"],
    li: [],
    mark: [],
    nav: [],
    ol: [],
    p: [],
    pre: [],
    s: [],
    section: [],
    small: [],
    span: [],
    sub: [],
    sup: [],
    strong: [],
    table: ["width", "border", "align", "valign"],
    tbody: ["align", "valign"],
    td: ["width", "rowspan", "colspan", "align", "valign"],
    tfoot: ["align", "valign"],
    th: ["width", "rowspan", "colspan", "align", "valign"],
    thead: ["align", "valign"],
    tr: ["rowspan", "align", "valign"],
    tt: [],
    u: [],
    ul: [],
    video: ["autoplay", "controls", "loop", "preload", "src", "height", "width"]
  };
}

var defaultCSSFilter = new FilterCSS();

/**
 * default onTag function
 *
 * @param {String} tag
 * @param {String} html
 * @param {Object} options
 * @return {String}
 */
function onTag(tag, html, options) {
  // do nothing
}

/**
 * default onIgnoreTag function
 *
 * @param {String} tag
 * @param {String} html
 * @param {Object} options
 * @return {String}
 */
function onIgnoreTag(tag, html, options) {
  // do nothing
}

/**
 * default onTagAttr function
 *
 * @param {String} tag
 * @param {String} name
 * @param {String} value
 * @return {String}
 */
function onTagAttr(tag, name, value) {
  // do nothing
}

/**
 * default onIgnoreTagAttr function
 *
 * @param {String} tag
 * @param {String} name
 * @param {String} value
 * @return {String}
 */
function onIgnoreTagAttr(tag, name, value) {
  // do nothing
}

/**
 * default escapeHtml function
 *
 * @param {String} html
 */
function escapeHtml(html) {
  return html.replace(REGEXP_LT, "&lt;").replace(REGEXP_GT, "&gt;");
}

/**
 * default safeAttrValue function
 *
 * @param {String} tag
 * @param {String} name
 * @param {String} value
 * @param {Object} cssFilter
 * @return {String}
 */
function safeAttrValue(tag, name, value, cssFilter) {
  // unescape attribute value firstly
  value = friendlyAttrValue(value);

  if (name === "href" || name === "src") {
    // filter `href` and `src` attribute
    // only allow the value that starts with `http://` | `https://` | `mailto:` | `/` | `#`
    value = _.trim(value);
    if (value === "#") return "#";
    if (
      !(
        value.substr(0, 7) === "http://" ||
        value.substr(0, 8) === "https://" ||
        value.substr(0, 7) === "mailto:" ||
        value.substr(0, 4) === "tel:" ||
        value[0] === "#" ||
        value[0] === "/"
      )
    ) {
      return "";
    }
  } else if (name === "background") {
    // filter `background` attribute (maybe no use)
    // `javascript:`
    REGEXP_DEFAULT_ON_TAG_ATTR_4.lastIndex = 0;
    if (REGEXP_DEFAULT_ON_TAG_ATTR_4.test(value)) {
      return "";
    }
  } else if (name === "style") {
    // `expression()`
    REGEXP_DEFAULT_ON_TAG_ATTR_7.lastIndex = 0;
    if (REGEXP_DEFAULT_ON_TAG_ATTR_7.test(value)) {
      return "";
    }
    // `url()`
    REGEXP_DEFAULT_ON_TAG_ATTR_8.lastIndex = 0;
    if (REGEXP_DEFAULT_ON_TAG_ATTR_8.test(value)) {
      REGEXP_DEFAULT_ON_TAG_ATTR_4.lastIndex = 0;
      if (REGEXP_DEFAULT_ON_TAG_ATTR_4.test(value)) {
        return "";
      }
    }
    if (cssFilter !== false) {
      cssFilter = cssFilter || defaultCSSFilter;
      value = cssFilter.process(value);
    }
  }

  // escape `<>"` before returns
  value = escapeAttrValue(value);
  return value;
}

// RegExp list
var REGEXP_LT = /</g;
var REGEXP_GT = />/g;
var REGEXP_QUOTE = /"/g;
var REGEXP_QUOTE_2 = /&quot;/g;
var REGEXP_ATTR_VALUE_1 = /&#([a-zA-Z0-9]*);?/gim;
var REGEXP_ATTR_VALUE_COLON = /&colon;?/gim;
var REGEXP_ATTR_VALUE_NEWLINE = /&newline;?/gim;
var REGEXP_DEFAULT_ON_TAG_ATTR_3 = /\/\*|\*\//gm;
var REGEXP_DEFAULT_ON_TAG_ATTR_4 = /((j\s*a\s*v\s*a|v\s*b|l\s*i\s*v\s*e)\s*s\s*c\s*r\s*i\s*p\s*t\s*|m\s*o\s*c\s*h\s*a)\:/gi;
var REGEXP_DEFAULT_ON_TAG_ATTR_5 = /^[\s"'`]*(d\s*a\s*t\s*a\s*)\:/gi;
var REGEXP_DEFAULT_ON_TAG_ATTR_6 = /^[\s"'`]*(d\s*a\s*t\s*a\s*)\:\s*image\//gi;
var REGEXP_DEFAULT_ON_TAG_ATTR_7 = /e\s*x\s*p\s*r\s*e\s*s\s*s\s*i\s*o\s*n\s*\(.*/gi;
var REGEXP_DEFAULT_ON_TAG_ATTR_8 = /u\s*r\s*l\s*\(.*/gi;

/**
 * escape doube quote
 *
 * @param {String} str
 * @return {String} str
 */
function escapeQuote(str) {
  return str.replace(REGEXP_QUOTE, "&quot;");
}

/**
 * unescape double quote
 *
 * @param {String} str
 * @return {String} str
 */
function unescapeQuote(str) {
  return str.replace(REGEXP_QUOTE_2, '"');
}

/**
 * escape html entities
 *
 * @param {String} str
 * @return {String}
 */
function escapeHtmlEntities(str) {
  return str.replace(REGEXP_ATTR_VALUE_1, function replaceUnicode(str, code) {
    return code[0] === "x" || code[0] === "X"
      ? String.fromCharCode(parseInt(code.substr(1), 16))
      : String.fromCharCode(parseInt(code, 10));
  });
}

/**
 * escape html5 new danger entities
 *
 * @param {String} str
 * @return {String}
 */
function escapeDangerHtml5Entities(str) {
  return str
    .replace(REGEXP_ATTR_VALUE_COLON, ":")
    .replace(REGEXP_ATTR_VALUE_NEWLINE, " ");
}

/**
 * clear nonprintable characters
 *
 * @param {String} str
 * @return {String}
 */
function clearNonPrintableCharacter(str) {
  var str2 = "";
  for (var i = 0, len = str.length; i < len; i++) {
    str2 += str.charCodeAt(i) < 32 ? " " : str.charAt(i);
  }
  return _.trim(str2);
}

/**
 * get friendly attribute value
 *
 * @param {String} str
 * @return {String}
 */
function friendlyAttrValue(str) {
  str = unescapeQuote(str);
  str = escapeHtmlEntities(str);
  str = escapeDangerHtml5Entities(str);
  str = clearNonPrintableCharacter(str);
  return str;
}

/**
 * unescape attribute value
 *
 * @param {String} str
 * @return {String}
 */
function escapeAttrValue(str) {
  str = escapeQuote(str);
  str = escapeHtml(str);
  return str;
}

/**
 * `onIgnoreTag` function for removing all the tags that are not in whitelist
 */
function onIgnoreTagStripAll() {
  return "";
}

/**
 * remove tag body
 * specify a `tags` list, if the tag is not in the `tags` list then process by the specify function (optional)
 *
 * @param {array} tags
 * @param {function} next
 */
function StripTagBody(tags, next) {
  if (typeof next !== "function") {
    next = function() {};
  }

  var isRemoveAllTag = !Array.isArray(tags);
  function isRemoveTag(tag) {
    if (isRemoveAllTag) return true;
    return _.indexOf(tags, tag) !== -1;
  }

  var removeList = [];
  var posStart = false;

  return {
    onIgnoreTag: function(tag, html, options) {
      if (isRemoveTag(tag)) {
        if (options.isClosing) {
          var ret = "[/removed]";
          var end = options.position + ret.length;
          removeList.push([
            posStart !== false ? posStart : options.position,
            end
          ]);
          posStart = false;
          return ret;
        } else {
          if (!posStart) {
            posStart = options.position;
          }
          return "[removed]";
        }
      } else {
        return next(tag, html, options);
      }
    },
    remove: function(html) {
      var rethtml = "";
      var lastPos = 0;
      _.forEach(removeList, function(pos) {
        rethtml += html.slice(lastPos, pos[0]);
        lastPos = pos[1];
      });
      rethtml += html.slice(lastPos);
      return rethtml;
    }
  };
}

/**
 * remove html comments
 *
 * @param {String} html
 * @return {String}
 */
function stripCommentTag(html) {
  return html.replace(STRIP_COMMENT_TAG_REGEXP, "");
}
var STRIP_COMMENT_TAG_REGEXP = /<!--[\s\S]*?-->/g;

/**
 * remove invisible characters
 *
 * @param {String} html
 * @return {String}
 */
function stripBlankChar(html) {
  var chars = html.split("");
  chars = chars.filter(function(char) {
    var c = char.charCodeAt(0);
    if (c === 127) return false;
    if (c <= 31) {
      if (c === 10 || c === 13) return true;
      return false;
    }
    return true;
  });
  return chars.join("");
}

exports.whiteList = getDefaultWhiteList();
exports.getDefaultWhiteList = getDefaultWhiteList;
exports.onTag = onTag;
exports.onIgnoreTag = onIgnoreTag;
exports.onTagAttr = onTagAttr;
exports.onIgnoreTagAttr = onIgnoreTagAttr;
exports.safeAttrValue = safeAttrValue;
exports.escapeHtml = escapeHtml;
exports.escapeQuote = escapeQuote;
exports.unescapeQuote = unescapeQuote;
exports.escapeHtmlEntities = escapeHtmlEntities;
exports.escapeDangerHtml5Entities = escapeDangerHtml5Entities;
exports.clearNonPrintableCharacter = clearNonPrintableCharacter;
exports.friendlyAttrValue = friendlyAttrValue;
exports.escapeAttrValue = escapeAttrValue;
exports.onIgnoreTagStripAll = onIgnoreTagStripAll;
exports.StripTagBody = StripTagBody;
exports.stripCommentTag = stripCommentTag;
exports.stripBlankChar = stripBlankChar;
exports.cssFilter = defaultCSSFilter;
exports.getDefaultCSSWhiteList = getDefaultCSSWhiteList;


/***/ }),

/***/ "./node_modules/xss/lib/index.js":
/*!***************************************!*\
  !*** ./node_modules/xss/lib/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * xss
 *
 * @author Zongmin Lei<leizongmin@gmail.com>
 */

var DEFAULT = __webpack_require__(/*! ./default */ "./node_modules/xss/lib/default.js");
var parser = __webpack_require__(/*! ./parser */ "./node_modules/xss/lib/parser.js");
var FilterXSS = __webpack_require__(/*! ./xss */ "./node_modules/xss/lib/xss.js");

/**
 * filter xss function
 *
 * @param {String} html
 * @param {Object} options { whiteList, onTag, onTagAttr, onIgnoreTag, onIgnoreTagAttr, safeAttrValue, escapeHtml }
 * @return {String}
 */
function filterXSS(html, options) {
  var xss = new FilterXSS(options);
  return xss.process(html);
}

exports = module.exports = filterXSS;
exports.FilterXSS = FilterXSS;
for (var i in DEFAULT) exports[i] = DEFAULT[i];
for (var i in parser) exports[i] = parser[i];

// using `xss` on the browser, output `filterXSS` to the globals
if (typeof window !== "undefined") {
  window.filterXSS = module.exports;
}

// using `xss` on the WebWorker, output `filterXSS` to the globals
function isWorkerEnv() {
  return typeof self !== 'undefined' && typeof DedicatedWorkerGlobalScope !== 'undefined' && self instanceof DedicatedWorkerGlobalScope;
}
if (isWorkerEnv()) {
  self.filterXSS = module.exports;
}


/***/ }),

/***/ "./node_modules/xss/lib/parser.js":
/*!****************************************!*\
  !*** ./node_modules/xss/lib/parser.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Simple HTML Parser
 *
 * @author Zongmin Lei<leizongmin@gmail.com>
 */

var _ = __webpack_require__(/*! ./util */ "./node_modules/xss/lib/util.js");

/**
 * get tag name
 *
 * @param {String} html e.g. '<a hef="#">'
 * @return {String}
 */
function getTagName(html) {
  var i = _.spaceIndex(html);
  if (i === -1) {
    var tagName = html.slice(1, -1);
  } else {
    var tagName = html.slice(1, i + 1);
  }
  tagName = _.trim(tagName).toLowerCase();
  if (tagName.slice(0, 1) === "/") tagName = tagName.slice(1);
  if (tagName.slice(-1) === "/") tagName = tagName.slice(0, -1);
  return tagName;
}

/**
 * is close tag?
 *
 * @param {String} html 如：'<a hef="#">'
 * @return {Boolean}
 */
function isClosing(html) {
  return html.slice(0, 2) === "</";
}

/**
 * parse input html and returns processed html
 *
 * @param {String} html
 * @param {Function} onTag e.g. function (sourcePosition, position, tag, html, isClosing)
 * @param {Function} escapeHtml
 * @return {String}
 */
function parseTag(html, onTag, escapeHtml) {
  "user strict";

  var rethtml = "";
  var lastPos = 0;
  var tagStart = false;
  var quoteStart = false;
  var currentPos = 0;
  var len = html.length;
  var currentTagName = "";
  var currentHtml = "";

  for (currentPos = 0; currentPos < len; currentPos++) {
    var c = html.charAt(currentPos);
    if (tagStart === false) {
      if (c === "<") {
        tagStart = currentPos;
        continue;
      }
    } else {
      if (quoteStart === false) {
        if (c === "<") {
          rethtml += escapeHtml(html.slice(lastPos, currentPos));
          tagStart = currentPos;
          lastPos = currentPos;
          continue;
        }
        if (c === ">") {
          rethtml += escapeHtml(html.slice(lastPos, tagStart));
          currentHtml = html.slice(tagStart, currentPos + 1);
          currentTagName = getTagName(currentHtml);
          rethtml += onTag(
            tagStart,
            rethtml.length,
            currentTagName,
            currentHtml,
            isClosing(currentHtml)
          );
          lastPos = currentPos + 1;
          tagStart = false;
          continue;
        }
        if ((c === '"' || c === "'") && html.charAt(currentPos - 1) === "=") {
          quoteStart = c;
          continue;
        }
      } else {
        if (c === quoteStart) {
          quoteStart = false;
          continue;
        }
      }
    }
  }
  if (lastPos < html.length) {
    rethtml += escapeHtml(html.substr(lastPos));
  }

  return rethtml;
}

var REGEXP_ILLEGAL_ATTR_NAME = /[^a-zA-Z0-9_:\.\-]/gim;

/**
 * parse input attributes and returns processed attributes
 *
 * @param {String} html e.g. `href="#" target="_blank"`
 * @param {Function} onAttr e.g. `function (name, value)`
 * @return {String}
 */
function parseAttr(html, onAttr) {
  "user strict";

  var lastPos = 0;
  var retAttrs = [];
  var tmpName = false;
  var len = html.length;

  function addAttr(name, value) {
    name = _.trim(name);
    name = name.replace(REGEXP_ILLEGAL_ATTR_NAME, "").toLowerCase();
    if (name.length < 1) return;
    var ret = onAttr(name, value || "");
    if (ret) retAttrs.push(ret);
  }

  // 逐个分析字符
  for (var i = 0; i < len; i++) {
    var c = html.charAt(i);
    var v, j;
    if (tmpName === false && c === "=") {
      tmpName = html.slice(lastPos, i);
      lastPos = i + 1;
      continue;
    }
    if (tmpName !== false) {
      if (
        i === lastPos &&
        (c === '"' || c === "'") &&
        html.charAt(i - 1) === "="
      ) {
        j = html.indexOf(c, i + 1);
        if (j === -1) {
          break;
        } else {
          v = _.trim(html.slice(lastPos + 1, j));
          addAttr(tmpName, v);
          tmpName = false;
          i = j;
          lastPos = i + 1;
          continue;
        }
      }
    }
    if (/\s|\n|\t/.test(c)) {
      html = html.replace(/\s|\n|\t/g, " ");
      if (tmpName === false) {
        j = findNextEqual(html, i);
        if (j === -1) {
          v = _.trim(html.slice(lastPos, i));
          addAttr(v);
          tmpName = false;
          lastPos = i + 1;
          continue;
        } else {
          i = j - 1;
          continue;
        }
      } else {
        j = findBeforeEqual(html, i - 1);
        if (j === -1) {
          v = _.trim(html.slice(lastPos, i));
          v = stripQuoteWrap(v);
          addAttr(tmpName, v);
          tmpName = false;
          lastPos = i + 1;
          continue;
        } else {
          continue;
        }
      }
    }
  }

  if (lastPos < html.length) {
    if (tmpName === false) {
      addAttr(html.slice(lastPos));
    } else {
      addAttr(tmpName, stripQuoteWrap(_.trim(html.slice(lastPos))));
    }
  }

  return _.trim(retAttrs.join(" "));
}

function findNextEqual(str, i) {
  for (; i < str.length; i++) {
    var c = str[i];
    if (c === " ") continue;
    if (c === "=") return i;
    return -1;
  }
}

function findBeforeEqual(str, i) {
  for (; i > 0; i--) {
    var c = str[i];
    if (c === " ") continue;
    if (c === "=") return i;
    return -1;
  }
}

function isQuoteWrapString(text) {
  if (
    (text[0] === '"' && text[text.length - 1] === '"') ||
    (text[0] === "'" && text[text.length - 1] === "'")
  ) {
    return true;
  } else {
    return false;
  }
}

function stripQuoteWrap(text) {
  if (isQuoteWrapString(text)) {
    return text.substr(1, text.length - 2);
  } else {
    return text;
  }
}

exports.parseTag = parseTag;
exports.parseAttr = parseAttr;


/***/ }),

/***/ "./node_modules/xss/lib/util.js":
/*!**************************************!*\
  !*** ./node_modules/xss/lib/util.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  indexOf: function(arr, item) {
    var i, j;
    if (Array.prototype.indexOf) {
      return arr.indexOf(item);
    }
    for (i = 0, j = arr.length; i < j; i++) {
      if (arr[i] === item) {
        return i;
      }
    }
    return -1;
  },
  forEach: function(arr, fn, scope) {
    var i, j;
    if (Array.prototype.forEach) {
      return arr.forEach(fn, scope);
    }
    for (i = 0, j = arr.length; i < j; i++) {
      fn.call(scope, arr[i], i, arr);
    }
  },
  trim: function(str) {
    if (String.prototype.trim) {
      return str.trim();
    }
    return str.replace(/(^\s*)|(\s*$)/g, "");
  },
  spaceIndex: function(str) {
    var reg = /\s|\n|\t/;
    var match = reg.exec(str);
    return match ? match.index : -1;
  }
};


/***/ }),

/***/ "./node_modules/xss/lib/xss.js":
/*!*************************************!*\
  !*** ./node_modules/xss/lib/xss.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * filter xss
 *
 * @author Zongmin Lei<leizongmin@gmail.com>
 */

var FilterCSS = __webpack_require__(/*! cssfilter */ "./node_modules/cssfilter/lib/index.js").FilterCSS;
var DEFAULT = __webpack_require__(/*! ./default */ "./node_modules/xss/lib/default.js");
var parser = __webpack_require__(/*! ./parser */ "./node_modules/xss/lib/parser.js");
var parseTag = parser.parseTag;
var parseAttr = parser.parseAttr;
var _ = __webpack_require__(/*! ./util */ "./node_modules/xss/lib/util.js");

/**
 * returns `true` if the input value is `undefined` or `null`
 *
 * @param {Object} obj
 * @return {Boolean}
 */
function isNull(obj) {
  return obj === undefined || obj === null;
}

/**
 * get attributes for a tag
 *
 * @param {String} html
 * @return {Object}
 *   - {String} html
 *   - {Boolean} closing
 */
function getAttrs(html) {
  var i = _.spaceIndex(html);
  if (i === -1) {
    return {
      html: "",
      closing: html[html.length - 2] === "/"
    };
  }
  html = _.trim(html.slice(i + 1, -1));
  var isClosing = html[html.length - 1] === "/";
  if (isClosing) html = _.trim(html.slice(0, -1));
  return {
    html: html,
    closing: isClosing
  };
}

/**
 * shallow copy
 *
 * @param {Object} obj
 * @return {Object}
 */
function shallowCopyObject(obj) {
  var ret = {};
  for (var i in obj) {
    ret[i] = obj[i];
  }
  return ret;
}

/**
 * FilterXSS class
 *
 * @param {Object} options
 *        whiteList, onTag, onTagAttr, onIgnoreTag,
 *        onIgnoreTagAttr, safeAttrValue, escapeHtml
 *        stripIgnoreTagBody, allowCommentTag, stripBlankChar
 *        css{whiteList, onAttr, onIgnoreAttr} `css=false` means don't use `cssfilter`
 */
function FilterXSS(options) {
  options = shallowCopyObject(options || {});

  if (options.stripIgnoreTag) {
    if (options.onIgnoreTag) {
      console.error(
        'Notes: cannot use these two options "stripIgnoreTag" and "onIgnoreTag" at the same time'
      );
    }
    options.onIgnoreTag = DEFAULT.onIgnoreTagStripAll;
  }

  options.whiteList = options.whiteList || DEFAULT.whiteList;
  options.onTag = options.onTag || DEFAULT.onTag;
  options.onTagAttr = options.onTagAttr || DEFAULT.onTagAttr;
  options.onIgnoreTag = options.onIgnoreTag || DEFAULT.onIgnoreTag;
  options.onIgnoreTagAttr = options.onIgnoreTagAttr || DEFAULT.onIgnoreTagAttr;
  options.safeAttrValue = options.safeAttrValue || DEFAULT.safeAttrValue;
  options.escapeHtml = options.escapeHtml || DEFAULT.escapeHtml;
  this.options = options;

  if (options.css === false) {
    this.cssFilter = false;
  } else {
    options.css = options.css || {};
    this.cssFilter = new FilterCSS(options.css);
  }
}

/**
 * start process and returns result
 *
 * @param {String} html
 * @return {String}
 */
FilterXSS.prototype.process = function(html) {
  // compatible with the input
  html = html || "";
  html = html.toString();
  if (!html) return "";

  var me = this;
  var options = me.options;
  var whiteList = options.whiteList;
  var onTag = options.onTag;
  var onIgnoreTag = options.onIgnoreTag;
  var onTagAttr = options.onTagAttr;
  var onIgnoreTagAttr = options.onIgnoreTagAttr;
  var safeAttrValue = options.safeAttrValue;
  var escapeHtml = options.escapeHtml;
  var cssFilter = me.cssFilter;

  // remove invisible characters
  if (options.stripBlankChar) {
    html = DEFAULT.stripBlankChar(html);
  }

  // remove html comments
  if (!options.allowCommentTag) {
    html = DEFAULT.stripCommentTag(html);
  }

  // if enable stripIgnoreTagBody
  var stripIgnoreTagBody = false;
  if (options.stripIgnoreTagBody) {
    var stripIgnoreTagBody = DEFAULT.StripTagBody(
      options.stripIgnoreTagBody,
      onIgnoreTag
    );
    onIgnoreTag = stripIgnoreTagBody.onIgnoreTag;
  }

  var retHtml = parseTag(
    html,
    function(sourcePosition, position, tag, html, isClosing) {
      var info = {
        sourcePosition: sourcePosition,
        position: position,
        isClosing: isClosing,
        isWhite: whiteList.hasOwnProperty(tag)
      };

      // call `onTag()`
      var ret = onTag(tag, html, info);
      if (!isNull(ret)) return ret;

      if (info.isWhite) {
        if (info.isClosing) {
          return "</" + tag + ">";
        }

        var attrs = getAttrs(html);
        var whiteAttrList = whiteList[tag];
        var attrsHtml = parseAttr(attrs.html, function(name, value) {
          // call `onTagAttr()`
          var isWhiteAttr = _.indexOf(whiteAttrList, name) !== -1;
          var ret = onTagAttr(tag, name, value, isWhiteAttr);
          if (!isNull(ret)) return ret;

          if (isWhiteAttr) {
            // call `safeAttrValue()`
            value = safeAttrValue(tag, name, value, cssFilter);
            if (value) {
              return name + '="' + value + '"';
            } else {
              return name;
            }
          } else {
            // call `onIgnoreTagAttr()`
            var ret = onIgnoreTagAttr(tag, name, value, isWhiteAttr);
            if (!isNull(ret)) return ret;
            return;
          }
        });

        // build new tag html
        var html = "<" + tag;
        if (attrsHtml) html += " " + attrsHtml;
        if (attrs.closing) html += " /";
        html += ">";
        return html;
      } else {
        // call `onIgnoreTag()`
        var ret = onIgnoreTag(tag, html, info);
        if (!isNull(ret)) return ret;
        return escapeHtml(html);
      }
    },
    escapeHtml
  );

  // if enable stripIgnoreTagBody
  if (stripIgnoreTagBody) {
    retHtml = stripIgnoreTagBody.remove(retHtml);
  }

  return retHtml;
};

module.exports = FilterXSS;


/***/ }),

/***/ "./src/PubSub.ts":
/*!***********************!*\
  !*** ./src/PubSub.ts ***!
  \***********************/
/*! exports provided: PubSub */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PubSub", function() { return PubSub; });
var PubSub = /** @class */ (function () {
    function PubSub() {
        this.events = {};
    }
    PubSub.prototype.publish = function (name, args) {
        var _this = this;
        var handlers = this.events[name];
        if (handlers === undefined)
            return;
        handlers.forEach(function (handler) {
            handler.call(_this, args);
        });
    };
    PubSub.prototype.subscribe = function (name, handler) {
        var handlers = this.events[name];
        if (handlers === undefined) {
            handlers = this.events[name] = [];
        }
        handlers.push(handler);
    };
    PubSub.prototype.unsubscribe = function (name, handler) {
        var handlers = this.events[name];
        if (handlers === undefined)
            return;
        var handlerIdx = handlers.indexOf(handler);
        handlers.splice(handlerIdx);
    };
    PubSub.prototype.dispose = function () {
        this.events = {};
    };
    return PubSub;
}());



/***/ }),

/***/ "./src/URLDataProvider.ts":
/*!********************************!*\
  !*** ./src/URLDataProvider.ts ***!
  \********************************/
/*! exports provided: URLDataProvider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "URLDataProvider", function() { return URLDataProvider; });
/* harmony import */ var _UVDataProvider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UVDataProvider */ "./src/UVDataProvider.ts");
/* harmony import */ var _edsilv_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @edsilv/utils */ "./node_modules/@edsilv/utils/dist-esmodule/index.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var URLDataProvider = /** @class */ (function (_super) {
    __extends(URLDataProvider, _super);
    function URLDataProvider(readonly) {
        if (readonly === void 0) { readonly = false; }
        return _super.call(this, readonly) || this;
    }
    URLDataProvider.prototype.get = function (key, defaultValue) {
        return _edsilv_utils__WEBPACK_IMPORTED_MODULE_1__["Urls"].getHashParameter(key, document) || defaultValue;
    };
    URLDataProvider.prototype.set = function (key, value) {
        if (!this.readonly) {
            if (value) {
                _edsilv_utils__WEBPACK_IMPORTED_MODULE_1__["Urls"].setHashParameter(key, value.toString(), document);
            }
            else {
                _edsilv_utils__WEBPACK_IMPORTED_MODULE_1__["Urls"].setHashParameter(key, '', document);
            }
        }
    };
    return URLDataProvider;
}(_UVDataProvider__WEBPACK_IMPORTED_MODULE_0__["UVDataProvider"]));



/***/ }),

/***/ "./src/UVDataProvider.ts":
/*!*******************************!*\
  !*** ./src/UVDataProvider.ts ***!
  \*******************************/
/*! exports provided: UVDataProvider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UVDataProvider", function() { return UVDataProvider; });
var UVDataProvider = /** @class */ (function () {
    function UVDataProvider(readonly) {
        this.readonly = false;
        this.readonly = readonly;
    }
    UVDataProvider.prototype.get = function (_key, _defaultValue) {
        return null;
    };
    UVDataProvider.prototype.set = function (_key, _value) {
    };
    return UVDataProvider;
}());



/***/ }),

/***/ "./src/Utils.ts":
/*!**********************!*\
  !*** ./src/Utils.ts ***!
  \**********************/
/*! exports provided: sanitize, isValidUrl, propertiesChanged, propertyChanged */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sanitize", function() { return sanitize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidUrl", function() { return isValidUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "propertiesChanged", function() { return propertiesChanged; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "propertyChanged", function() { return propertyChanged; });
var filterXSS = __webpack_require__(/*! xss */ "./node_modules/xss/lib/index.js");
var sanitize = function (html) {
    return filterXSS(html, {
        whiteList: {
            a: ["href", "title", "target", "class"],
            b: [],
            br: [],
            i: [],
            img: ["src", "alt"],
            p: [],
            small: [],
            span: [],
            strong: [],
            sub: [],
            sup: []
        }
    });
};
var isValidUrl = function (value) {
    var a = document.createElement('a');
    a.href = value;
    return (!!a.host && a.host !== window.location.host);
};
var propertiesChanged = function (newData, currentData, properties) {
    var propChanged = false;
    for (var i = 0; i < properties.length; i++) {
        propChanged = propertyChanged(newData, currentData, properties[i]);
        if (propChanged) {
            break;
        }
    }
    return propChanged;
};
var propertyChanged = function (newData, currentData, propertyName) {
    return currentData[propertyName] !== newData[propertyName];
};


/***/ }),

/***/ "./src/Viewer.ts":
/*!***********************!*\
  !*** ./src/Viewer.ts ***!
  \***********************/
/*! exports provided: Viewer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Viewer", function() { return Viewer; });
/* harmony import */ var _modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/uv-shared-module/BaseEvents */ "./src/modules/uv-shared-module/BaseEvents.ts");
/* harmony import */ var _PubSub__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PubSub */ "./src/PubSub.ts");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Utils */ "./src/Utils.ts");
/* harmony import */ var _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @iiif/vocabulary */ "./node_modules/@iiif/vocabulary/dist-esmodule/index.js");
/* harmony import */ var _iiif_manifold__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @iiif/manifold */ "./node_modules/@iiif/manifold/dist-esmodule/index.js");
/* harmony import */ var _iiif_base_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @iiif/base-component */ "./node_modules/@iiif/base-component/dist-esmodule/index.js");
/* harmony import */ var _URLDataProvider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./URLDataProvider */ "./src/URLDataProvider.ts");
/* harmony import */ var _lib___WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./lib/ */ "./src/lib/index.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};








var Extension;
(function (Extension) {
    Extension["AV"] = "uv-av-extension";
    Extension["DEFAULT"] = "uv-default-extension";
    Extension["MEDIAELEMENT"] = "uv-mediaelement-extension";
    Extension["OSD"] = "uv-openseadragon-extension";
    Extension["PDF"] = "uv-pdf-extension";
    Extension["VIRTEX"] = "uv-virtex-extension";
})(Extension || (Extension = {}));
var Viewer = /** @class */ (function (_super) {
    __extends(Viewer, _super);
    function Viewer(options) {
        var _this = _super.call(this, options) || this;
        _this.isFullScreen = false;
        _this.dataProvider = new _URLDataProvider__WEBPACK_IMPORTED_MODULE_6__["URLDataProvider"]();
        _this._pubsub = new _PubSub__WEBPACK_IMPORTED_MODULE_1__["PubSub"]();
        _this._init();
        _this._resize();
        return _this;
    }
    Viewer.prototype._init = function () {
        var _a;
        var _this = this;
        _super.prototype._init.call(this);
        this._extensions = (_a = {},
            _a[Extension.AV] = function () { return __awaiter(_this, void 0, void 0, function () {
                var m, extension;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, Promise.all(/*! import() | uv-av-extension */[__webpack_require__.e("vendors~uv-av-extension~uv-mediaelement-extension~uv-openseadragon-extension~uv-pdf-extension~uv-vir~dcd3a7fc"), __webpack_require__.e("vendors~uv-av-extension~uv-openseadragon-extension~uv-virtex-extension"), __webpack_require__.e("vendors~uv-av-extension"), __webpack_require__.e("uv-av-extension~uv-mediaelement-extension~uv-openseadragon-extension~uv-pdf-extension~uv-virtex-extension"), __webpack_require__.e("uv-av-extension~uv-openseadragon-extension~uv-virtex-extension"), __webpack_require__.e("uv-av-extension")]).then(__webpack_require__.bind(null, /*! ./extensions/uv-av-extension/Extension */ "./src/extensions/uv-av-extension/Extension.ts"))];
                        case 1:
                            m = _a.sent();
                            extension = new m.default();
                            extension.name = Extension.AV;
                            return [2 /*return*/, extension];
                    }
                });
            }); },
            _a[Extension.MEDIAELEMENT] = function () { return __awaiter(_this, void 0, void 0, function () {
                var m, extension;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, Promise.all(/*! import() | uv-mediaelement-extension */[__webpack_require__.e("vendors~uv-av-extension~uv-mediaelement-extension~uv-openseadragon-extension~uv-pdf-extension~uv-vir~dcd3a7fc"), __webpack_require__.e("uv-av-extension~uv-mediaelement-extension~uv-openseadragon-extension~uv-pdf-extension~uv-virtex-extension"), __webpack_require__.e("uv-mediaelement-extension")]).then(__webpack_require__.bind(null, /*! ./extensions/uv-mediaelement-extension/Extension */ "./src/extensions/uv-mediaelement-extension/Extension.ts"))];
                        case 1:
                            m = _a.sent();
                            extension = new m.default();
                            extension.name = Extension.MEDIAELEMENT;
                            return [2 /*return*/, extension];
                    }
                });
            }); },
            _a[Extension.OSD] = function () { return __awaiter(_this, void 0, void 0, function () {
                var m, extension;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, Promise.all(/*! import() | uv-openseadragon-extension */[__webpack_require__.e("vendors~uv-av-extension~uv-mediaelement-extension~uv-openseadragon-extension~uv-pdf-extension~uv-vir~dcd3a7fc"), __webpack_require__.e("vendors~uv-av-extension~uv-openseadragon-extension~uv-virtex-extension"), __webpack_require__.e("vendors~uv-openseadragon-extension"), __webpack_require__.e("uv-av-extension~uv-mediaelement-extension~uv-openseadragon-extension~uv-pdf-extension~uv-virtex-extension"), __webpack_require__.e("uv-av-extension~uv-openseadragon-extension~uv-virtex-extension"), __webpack_require__.e("uv-openseadragon-extension")]).then(__webpack_require__.bind(null, /*! ./extensions/uv-openseadragon-extension/Extension */ "./src/extensions/uv-openseadragon-extension/Extension.ts"))];
                        case 1:
                            m = _a.sent();
                            extension = new m.default();
                            extension.name = Extension.OSD;
                            return [2 /*return*/, extension];
                    }
                });
            }); },
            _a[Extension.PDF] = function () { return __awaiter(_this, void 0, void 0, function () {
                var m, extension;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, Promise.all(/*! import() | uv-pdf-extension */[__webpack_require__.e("vendors~uv-av-extension~uv-mediaelement-extension~uv-openseadragon-extension~uv-pdf-extension~uv-vir~dcd3a7fc"), __webpack_require__.e("uv-av-extension~uv-mediaelement-extension~uv-openseadragon-extension~uv-pdf-extension~uv-virtex-extension"), __webpack_require__.e("uv-pdf-extension")]).then(__webpack_require__.bind(null, /*! ./extensions/uv-pdf-extension/Extension */ "./src/extensions/uv-pdf-extension/Extension.ts"))];
                        case 1:
                            m = _a.sent();
                            extension = new m.default();
                            extension.name = Extension.PDF;
                            return [2 /*return*/, extension];
                    }
                });
            }); },
            _a[Extension.VIRTEX] = function () { return __awaiter(_this, void 0, void 0, function () {
                var m, extension;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, Promise.all(/*! import() | uv-virtex-extension */[__webpack_require__.e("vendors~uv-av-extension~uv-mediaelement-extension~uv-openseadragon-extension~uv-pdf-extension~uv-vir~dcd3a7fc"), __webpack_require__.e("vendors~uv-av-extension~uv-openseadragon-extension~uv-virtex-extension"), __webpack_require__.e("vendors~uv-virtex-extension"), __webpack_require__.e("uv-av-extension~uv-mediaelement-extension~uv-openseadragon-extension~uv-pdf-extension~uv-virtex-extension"), __webpack_require__.e("uv-av-extension~uv-openseadragon-extension~uv-virtex-extension"), __webpack_require__.e("uv-virtex-extension")]).then(__webpack_require__.bind(null, /*! ./extensions/uv-virtex-extension/Extension */ "./src/extensions/uv-virtex-extension/Extension.ts"))];
                        case 1:
                            m = _a.sent();
                            extension = new m.default();
                            extension.name = Extension.VIRTEX;
                            return [2 /*return*/, extension];
                    }
                });
            }); },
            _a);
        this._extensionRegistry = {};
        this._extensionRegistry[_iiif_vocabulary__WEBPACK_IMPORTED_MODULE_3__["ExternalResourceType"].CANVAS] = {
            load: this._extensions[Extension.OSD]
        };
        this._extensionRegistry[_iiif_vocabulary__WEBPACK_IMPORTED_MODULE_3__["ExternalResourceType"].DOCUMENT] = {
            load: this._extensions[Extension.PDF]
        };
        this._extensionRegistry[_iiif_vocabulary__WEBPACK_IMPORTED_MODULE_3__["ExternalResourceType"].IMAGE] = {
            load: this._extensions[Extension.OSD]
        };
        this._extensionRegistry[_iiif_vocabulary__WEBPACK_IMPORTED_MODULE_3__["ExternalResourceType"].MOVING_IMAGE] = {
            load: this._extensions[Extension.MEDIAELEMENT]
        };
        this._extensionRegistry[_iiif_vocabulary__WEBPACK_IMPORTED_MODULE_3__["ExternalResourceType"].PHYSICAL_OBJECT] = {
            load: this._extensions[Extension.VIRTEX]
        };
        this._extensionRegistry[_iiif_vocabulary__WEBPACK_IMPORTED_MODULE_3__["ExternalResourceType"].SOUND] = {
            load: this._extensions[Extension.MEDIAELEMENT]
        };
        this._extensionRegistry[_iiif_vocabulary__WEBPACK_IMPORTED_MODULE_3__["RenderingFormat"].PDF] = {
            load: this._extensions[Extension.PDF]
        };
        // presentation 3
        this._extensionRegistry[_iiif_vocabulary__WEBPACK_IMPORTED_MODULE_3__["MediaType"].JPG] = {
            load: this._extensions[Extension.OSD]
        };
        this._extensionRegistry[_iiif_vocabulary__WEBPACK_IMPORTED_MODULE_3__["MediaType"].PDF] = {
            load: this._extensions[Extension.PDF]
        };
        this._extensionRegistry[_iiif_vocabulary__WEBPACK_IMPORTED_MODULE_3__["MediaType"].AUDIO_MP4] = {
            load: this._extensions[Extension.AV]
        };
        this._extensionRegistry[_iiif_vocabulary__WEBPACK_IMPORTED_MODULE_3__["MediaType"].VIDEO_MP4] = {
            load: this._extensions[Extension.AV]
        };
        this._extensionRegistry[_iiif_vocabulary__WEBPACK_IMPORTED_MODULE_3__["MediaType"].WEBM] = {
            load: this._extensions[Extension.AV]
        };
        this._extensionRegistry[_iiif_vocabulary__WEBPACK_IMPORTED_MODULE_3__["MediaType"].THREEJS] = {
            load: this._extensions[Extension.VIRTEX]
        };
        this._extensionRegistry[_iiif_vocabulary__WEBPACK_IMPORTED_MODULE_3__["MediaType"].MP3] = {
            load: this._extensions[Extension.AV]
        };
        this._extensionRegistry[_iiif_vocabulary__WEBPACK_IMPORTED_MODULE_3__["MediaType"].M3U8] = {
            load: this._extensions[Extension.AV]
        };
        this._extensionRegistry[_iiif_vocabulary__WEBPACK_IMPORTED_MODULE_3__["MediaType"].MPEG_DASH] = {
            load: this._extensions[Extension.AV]
        };
        this._extensionRegistry["av"] = {
            load: this._extensions[Extension.AV]
        };
        this._extensionRegistry["default"] = {
            load: this._extensions[Extension.DEFAULT]
        };
        this.set(this.options.data);
        return true;
    };
    Viewer.prototype.data = function () {
        return {
            annotations: undefined,
            root: "./uv",
            canvasIndex: 0,
            collectionIndex: undefined,
            config: undefined,
            configUri: undefined,
            embedded: false,
            manifestUri: "",
            isLightbox: false,
            isReload: false,
            limitLocales: false,
            locales: [
                {
                    name: "en-GB"
                }
            ],
            manifestIndex: 0,
            rangeId: undefined,
            rotation: 0,
            sequenceIndex: 0,
            xywh: ""
        };
    };
    Viewer.prototype.set = function (data) {
        // if this is the first set
        if (!this.extension) {
            if (!data.manifestUri) {
                this._error("manifestUri is required.");
                return;
            }
            // remove '/' from root
            if (data.root && data.root.endsWith('/')) {
                data.root = data.root.substring(0, data.root.length - 1);
            }
            this._reload(data);
        }
        else {
            // changing any of these data properties forces the UV to reload.
            if (Object(_Utils__WEBPACK_IMPORTED_MODULE_2__["propertiesChanged"])(data, this.extension.data, ['collectionIndex', 'manifestIndex', 'config', 'configUri', 'domain', 'embedDomain', 'embedScriptUri', 'manifestUri', 'isHomeDomain', 'isLightbox', 'isOnlyInstance', 'isReload', 'locales', 'root'])) {
                this.extension.data = Object.assign({}, this.extension.data, data);
                this._reload(this.extension.data);
            }
            else {
                // no need to reload, just update.
                this.extension.data = Object.assign({}, this.extension.data, data);
                this.extension.render();
            }
        }
    };
    Viewer.prototype._getExtension = function (key) {
        if (!this._extensionRegistry[key]) {
            key = "default";
        }
        return this._extensionRegistry[key].load();
    };
    Viewer.prototype.get = function (key) {
        if (this.extension) {
            return this.extension.data[key];
        }
    };
    Viewer.prototype.publish = function (event, args) {
        this._pubsub.publish(event, args);
    };
    Viewer.prototype.subscribe = function (event, cb) {
        this._pubsub.subscribe(event, cb);
    };
    Viewer.prototype._reload = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var $elem, that, helper, trackingLabel, sequence, canvas, extension, content, annotation, body, format, type, type, canvasType, format;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._pubsub.dispose(); // remove any existing event listeners
                        this.subscribe(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].RELOAD, function (data) {
                            _this.fire(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].RELOAD, data);
                        });
                        $elem = $(this.options.target);
                        // empty the containing element
                        $elem.empty();
                        // add loading class
                        $elem.addClass('loading');
                        that = this;
                        return [4 /*yield*/, Object(_iiif_manifold__WEBPACK_IMPORTED_MODULE_4__["loadManifest"])({
                                manifestUri: data.manifestUri,
                                collectionIndex: data.collectionIndex,
                                manifestIndex: data.manifestIndex || 0,
                                sequenceIndex: data.sequenceIndex || 0,
                                canvasIndex: data.canvasIndex || 0,
                                rangeId: data.rangeId,
                                locale: (data.locales) ? data.locales[0].name : undefined
                            })];
                    case 1:
                        helper = _a.sent();
                        trackingLabel = helper.getTrackingLabel();
                        if (trackingLabel) {
                            trackingLabel +=  true ? document.referrer : undefined;
                            window.trackingLabel = trackingLabel;
                        }
                        if (data.sequenceIndex !== undefined) {
                            sequence = helper.getSequenceByIndex(data.sequenceIndex);
                            if (!sequence) {
                                that._error("Sequence " + data.sequenceIndex + " not found.");
                                return [2 /*return*/];
                            }
                        }
                        if (data.canvasIndex !== undefined) {
                            canvas = helper.getCanvasByIndex(data.canvasIndex);
                        }
                        if (!canvas) {
                            that._error("Canvas " + data.canvasIndex + " not found.");
                            return [2 /*return*/];
                        }
                        extension = undefined;
                        content = canvas.getContent();
                        if (!content.length) return [3 /*break*/, 8];
                        annotation = content[0];
                        body = annotation.getBody();
                        if (!(body && body.length)) return [3 /*break*/, 7];
                        format = body[0].getFormat();
                        if (!format) return [3 /*break*/, 5];
                        return [4 /*yield*/, that._getExtension(format)];
                    case 2:
                        extension = _a.sent();
                        if (!!extension) return [3 /*break*/, 4];
                        type = body[0].getType();
                        if (!type) return [3 /*break*/, 4];
                        return [4 /*yield*/, that._getExtension(type)];
                    case 3:
                        extension = _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 7];
                    case 5:
                        type = body[0].getType();
                        if (!type) return [3 /*break*/, 7];
                        return [4 /*yield*/, that._getExtension(type)];
                    case 6:
                        extension = _a.sent();
                        _a.label = 7;
                    case 7: return [3 /*break*/, 12];
                    case 8:
                        canvasType = canvas.getType();
                        if (!canvasType) return [3 /*break*/, 10];
                        return [4 /*yield*/, that._getExtension(canvasType)];
                    case 9:
                        // try using canvasType
                        extension = _a.sent();
                        _a.label = 10;
                    case 10:
                        if (!!extension) return [3 /*break*/, 12];
                        format = canvas.getProperty('format');
                        return [4 /*yield*/, that._getExtension(format)];
                    case 11:
                        extension = _a.sent();
                        _a.label = 12;
                    case 12:
                        if (!!extension) return [3 /*break*/, 14];
                        return [4 /*yield*/, that._getExtension("default")];
                    case 13:
                        extension = _a.sent();
                        _a.label = 14;
                    case 14:
                        that._configure(data, extension, function (config) {
                            data.config = config;
                            that._injectCss(data, extension, function () {
                                that._createExtension(extension, data, helper);
                            });
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    Viewer.prototype._error = function (message) {
        this.fire(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].ERROR, message);
    };
    Viewer.prototype._configure = function (data, extension, cb) {
        var _this = this;
        this._getConfigExtension(data, extension, function (configExtension) {
            if (data.locales) {
                var configPath = data.root + '/lib/' + extension.name + '.' + data.locales[0].name + '.config.json';
                $.getJSON(configPath, function (config) {
                    _this._extendConfig(data, extension, config, configExtension, cb);
                });
            }
        });
    };
    Viewer.prototype._extendConfig = function (data, extension, config, configExtension, cb) {
        config.name = extension.name;
        // if configUri has been set, extend the existing config object.
        if (configExtension) {
            // save a reference to the config extension uri.
            config.uri = data.configUri;
            $.extend(true, config, configExtension);
            //$.extend(true, config, configExtension, data.config);
        }
        cb(config);
    };
    Viewer.prototype._getConfigExtension = function (data, extension, cb) {
        if (!data.locales) {
            return;
        }
        var sessionConfig = sessionStorage.getItem(extension.name + '.' + data.locales[0].name);
        var configUri = data.configUri;
        if (sessionConfig) { // if config is stored in sessionstorage
            cb(JSON.parse(sessionConfig));
        }
        else if (configUri) { // if data.configUri has been set
            $.getJSON(configUri, function (configExtension) {
                cb(configExtension);
            });
        }
        else {
            cb(null);
        }
    };
    Viewer.prototype._injectCss = function (data, extension, cb) {
        if (!data.locales) {
            return;
        }
        var cssPath = data.root + '/themes/' + data.config.options.theme + '/css/' + extension.name + '/theme.css';
        var locale = data.locales[0].name;
        var themeName = extension.name.toLowerCase() + '-theme-' + locale.toLowerCase();
        var $existingCSS = $('#' + themeName.toLowerCase());
        if (!$existingCSS.length) {
            $('head').append('<link rel="stylesheet" id="' + themeName + '" href="' + cssPath.toLowerCase() + '" />');
            cb();
        }
        else {
            cb();
        }
    };
    Viewer.prototype._createExtension = function (extension, data, helper) {
        this.extension = extension;
        if (this.extension) {
            this.extension.component = this;
            this.extension.data = data;
            this.extension.helper = helper;
            this.extension.create();
        }
    };
    Viewer.prototype.exitFullScreen = function () {
        if (this.extension) {
            this.extension.exitFullScreen();
        }
    };
    Viewer.prototype.resize = function () {
        if (this.extension) {
            this.extension.resize();
        }
    };
    return Viewer;
}(_iiif_base_component__WEBPACK_IMPORTED_MODULE_5__["BaseComponent"]));



/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! exports provided: URLDataProvider, Viewer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _URLDataProvider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./URLDataProvider */ "./src/URLDataProvider.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "URLDataProvider", function() { return _URLDataProvider__WEBPACK_IMPORTED_MODULE_0__["URLDataProvider"]; });

/* harmony import */ var _Viewer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Viewer */ "./src/Viewer.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Viewer", function() { return _Viewer__WEBPACK_IMPORTED_MODULE_1__["Viewer"]; });





/***/ }),

/***/ "./src/lib/index.js":
/*!**************************!*\
  !*** ./src/lib/index.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _edsilv_jquery_plugins__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @edsilv/jquery-plugins */ "./node_modules/@edsilv/jquery-plugins/dist/jquery-plugins.js");
/* harmony import */ var _edsilv_jquery_plugins__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_edsilv_jquery_plugins__WEBPACK_IMPORTED_MODULE_0__);


// if (typeof jQuery === "function") {
//   define('jquery', [], function() {
//       return jQuery;
//   });
// }

(function () {

  // IE CustomEvent Polyfill
  // https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
  if ( typeof window.CustomEvent === "function" ) return false;

  function CustomEvent ( event, params ) {
      params = params || { bubbles: false, cancelable: false, detail: undefined };
      var evt = document.createEvent( 'CustomEvent' );
      evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
      return evt;
  }

  CustomEvent.prototype = window.Event.prototype;
  window.CustomEvent = CustomEvent;
  

  // scrollIntoViewIfNeeded
  if (!Element.prototype.scrollIntoViewIfNeeded) {
    Element.prototype.scrollIntoViewIfNeeded = function(centerIfNeeded) {
      centerIfNeeded = arguments.length === 0 ? true : !!centerIfNeeded;
  
      var parent = this.parentNode,
        parentComputedStyle = window.getComputedStyle(parent, undefined),
        parentBorderTopWidth = parseInt(
          parentComputedStyle.getPropertyValue("border-top-width")
        ),
        parentBorderLeftWidth = parseInt(
          parentComputedStyle.getPropertyValue("border-left-width")
        ),
        overTop = this.offsetTop - parent.offsetTop < parent.scrollTop,
        overBottom =
          this.offsetTop -
            parent.offsetTop +
            this.clientHeight -
            parentBorderTopWidth >
          parent.scrollTop + parent.clientHeight,
        overLeft = this.offsetLeft - parent.offsetLeft < parent.scrollLeft,
        overRight =
          this.offsetLeft -
            parent.offsetLeft +
            this.clientWidth -
            parentBorderLeftWidth >
          parent.scrollLeft + parent.clientWidth,
        alignWithTop = overTop && !overBottom;
  
      if ((overTop || overBottom) && centerIfNeeded) {
        parent.scrollTop =
          this.offsetTop -
          parent.offsetTop -
          parent.clientHeight / 2 -
          parentBorderTopWidth +
          this.clientHeight / 2;
      }
  
      if ((overLeft || overRight) && centerIfNeeded) {
        parent.scrollLeft =
          this.offsetLeft -
          parent.offsetLeft -
          parent.clientWidth / 2 -
          parentBorderLeftWidth +
          this.clientWidth / 2;
      }
  
      if ((overTop || overBottom || overLeft || overRight) && !centerIfNeeded) {
        this.scrollIntoView(alignWithTop);
      }
    };
  }

  return;

})();

// detect mobile browser
(function(a){(jQuery.browser=jQuery.browser||{}).mobile=/(android|bb\d+|meego).+mobile|avantgo|bada\/|android|ipad|playbook|silk|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);

// browserDetect
window.browserDetect = {
  init: function () {
      this.browser = this.searchString(this.dataBrowser) || "Other";
      this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";
      // detect IE 11
      if (this.browser == 'Explorer' && this.version == '7' && navigator.userAgent.match(/Trident/i)) {
          this.version = this.searchVersionIE();
      }
  },

  searchString: function (data) {
      for (var i = 0 ; i < data.length ; i++) {
          var dataString = data[i].string;
          this.versionSearchString = data[i].subString;

          if (dataString.indexOf(data[i].subString) != -1) {
              return data[i].identity;
          }
      }
  },

  searchVersion: function (dataString) {
      var index = dataString.indexOf(this.versionSearchString);
      if (index == -1) return;
      return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
  },

  searchVersionIE: function() {
      var ua = navigator.userAgent.toString().toLowerCase(),
          match = /(trident)(?:.*rv:([\w.]+))?/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || ['', null, -1],
          ver;
      try {
        ver = (match[2]).split('.')[0]; // version
      }
      catch (err) {
          ver = 'unknown'; //
      }
      return ver;
  },

  dataBrowser:
      [
          { string: navigator.userAgent, subString: "Chrome", identity: "Chrome" },
          { string: navigator.userAgent, subString: "MSIE", identity: "Explorer" },
          { string: navigator.userAgent, subString: "Trident", identity: "Explorer" },
          { string: navigator.userAgent, subString: "Firefox", identity: "Firefox" },
          { string: navigator.userAgent, subString: "Safari", identity: "Safari" },
          { string: navigator.userAgent, subString: "Opera", identity: "Opera" }
      ]

};

window.browserDetect.init();

/***/ }),

/***/ "./src/modules/uv-shared-module/BaseEvents.ts":
/*!****************************************************!*\
  !*** ./src/modules/uv-shared-module/BaseEvents.ts ***!
  \****************************************************/
/*! exports provided: BaseEvents */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseEvents", function() { return BaseEvents; });
var BaseEvents = /** @class */ (function () {
    function BaseEvents() {
    }
    BaseEvents.ACCEPT_TERMS = 'acceptTerms';
    BaseEvents.ANNOTATION_CANVAS_CHANGED = 'annotationCanvasChanged';
    BaseEvents.ANNOTATION_CHANGED = 'annotationChanged';
    BaseEvents.ANNOTATIONS_CLEARED = 'annotationsCleared';
    BaseEvents.ANNOTATIONS_EMPTY = 'annotationsEmpty';
    BaseEvents.ANNOTATIONS = 'annotations';
    BaseEvents.BOOKMARK = 'bookmark';
    BaseEvents.CANVAS_INDEX_CHANGE_FAILED = 'canvasIndexChangeFailed';
    BaseEvents.CANVAS_INDEX_CHANGED = 'canvasIndexChanged';
    BaseEvents.CLEAR_ANNOTATIONS = 'clearAnnotations';
    BaseEvents.CLICKTHROUGH = 'clickthrough';
    BaseEvents.CLOSE_ACTIVE_DIALOGUE = 'closeActiveDialogue';
    BaseEvents.CLOSE_LEFT_PANEL = 'closeLeftPanel';
    BaseEvents.CLOSE_RIGHT_PANEL = 'closeRightPanel';
    BaseEvents.COLLECTION_INDEX_CHANGED = 'collectionIndexChanged';
    BaseEvents.CREATE = 'create';
    BaseEvents.CREATED = 'created';
    BaseEvents.DOWN_ARROW = 'downArrow';
    BaseEvents.DOWNLOAD = 'download';
    BaseEvents.DROP = 'drop';
    BaseEvents.END = 'end';
    BaseEvents.ERROR = 'error';
    BaseEvents.ESCAPE = 'escape';
    BaseEvents.EXIT_FULLSCREEN = 'exitFullScreen';
    BaseEvents.EXTERNAL_LINK_CLICKED = 'externalLinkClicked';
    BaseEvents.FEEDBACK = 'feedback';
    BaseEvents.FIRST = 'first';
    BaseEvents.FORBIDDEN = 'forbidden';
    BaseEvents.GALLERY_DECREASE_SIZE = 'galleryDecreaseSize';
    BaseEvents.GALLERY_INCREASE_SIZE = 'galleryIncreaseSize';
    BaseEvents.GALLERY_THUMB_SELECTED = 'galleryThumbSelected';
    BaseEvents.HIDE_AUTH_DIALOGUE = 'hideAuthDialogue';
    BaseEvents.HIDE_CLICKTHROUGH_DIALOGUE = 'hideClickthroughDialogue';
    BaseEvents.HIDE_DOWNLOAD_DIALOGUE = 'hideDownloadDialogue';
    BaseEvents.HIDE_EMBED_DIALOGUE = 'hideEmbedDialogue';
    BaseEvents.HIDE_EXTERNALCONTENT_DIALOGUE = 'hideExternalContentDialogue';
    BaseEvents.HIDE_GENERIC_DIALOGUE = 'hideGenericDialogue';
    BaseEvents.HIDE_HELP_DIALOGUE = 'hideHelpDialogue';
    BaseEvents.HIDE_INFORMATION = 'hideInformation';
    BaseEvents.HIDE_LOGIN_DIALOGUE = 'hideLoginDialogue';
    BaseEvents.HIDE_MOREINFO_DIALOGUE = 'hideMoreInfoDialogue';
    BaseEvents.HIDE_MULTISELECT_DIALOGUE = 'hideMultiSelectDialogue';
    BaseEvents.HIDE_OVERLAY = 'hideOverlay';
    BaseEvents.HIDE_RESTRICTED_DIALOGUE = 'hideRestrictedDialogue';
    BaseEvents.HIDE_SETTINGS_DIALOGUE = 'hideSettingsDialogue';
    BaseEvents.HIDE_SHARE_DIALOGUE = 'hideShareDialogue';
    BaseEvents.HOME = 'home';
    BaseEvents.LAST = 'last';
    BaseEvents.LEFT_ARROW = 'leftArrow';
    BaseEvents.LEFTPANEL_COLLAPSE_FULL_FINISH = 'leftPanelCollapseFullFinish';
    BaseEvents.LEFTPANEL_COLLAPSE_FULL_START = 'leftPanelCollapseFullStart';
    BaseEvents.LEFTPANEL_EXPAND_FULL_FINISH = 'leftPanelExpandFullFinish';
    BaseEvents.LEFTPANEL_EXPAND_FULL_START = 'leftPanelExpandFullStart';
    BaseEvents.LOAD_FAILED = 'loadFailed';
    BaseEvents.LOGIN_FAILED = 'loginFailed';
    BaseEvents.LOGIN = 'login';
    BaseEvents.LOGOUT = 'logout';
    BaseEvents.MANIFEST_INDEX_CHANGED = 'manifestIndexChanged';
    BaseEvents.METRIC_CHANGED = 'metricChanged';
    BaseEvents.MINUS = 'minus';
    BaseEvents.MULTISELECT_CHANGE = 'multiSelectChange';
    BaseEvents.MULTISELECTION_MADE = 'multiSelectionMade';
    BaseEvents.NEXT = 'next';
    BaseEvents.NOT_FOUND = 'notFound';
    BaseEvents.OPEN_EXTERNAL_RESOURCE = 'openExternalResource';
    BaseEvents.OPEN_LEFT_PANEL = 'openLeftPanel';
    BaseEvents.OPEN_RIGHT_PANEL = 'openRightPanel';
    BaseEvents.OPEN_THUMBS_VIEW = 'openThumbsView';
    BaseEvents.OPEN_TREE_VIEW = 'openTreeView';
    BaseEvents.OPEN = 'open';
    BaseEvents.OPENED_EXTERNAL_RESOURCE = 'openedExternalResource';
    BaseEvents.PAGE_DOWN = 'pageDown';
    BaseEvents.PAGE_UP = 'pageUp';
    BaseEvents.PLUS = 'plus';
    BaseEvents.PREV = 'prev';
    BaseEvents.RANGE_CHANGED = 'rangeChanged';
    BaseEvents.REDIRECT = 'redirect';
    BaseEvents.REFRESH = 'refresh';
    BaseEvents.RELOAD = 'reload';
    BaseEvents.RESIZE = 'resize';
    BaseEvents.RESOURCE_DEGRADED = 'resourceDegraded';
    BaseEvents.RETRY = 'retry';
    BaseEvents.RETURN = 'return';
    BaseEvents.RIGHT_ARROW = 'rightArrow';
    BaseEvents.RIGHTPANEL_COLLAPSE_FULL_FINISH = 'rightPanelCollapseFullFinish';
    BaseEvents.RIGHTPANEL_COLLAPSE_FULL_START = 'rightPanelCollapseFullStart';
    BaseEvents.RIGHTPANEL_EXPAND_FULL_FINISH = 'rightPanelExpandFullFinish';
    BaseEvents.RIGHTPANEL_EXPAND_FULL_START = 'rightPanelExpandFullStart';
    BaseEvents.SEQUENCE_INDEX_CHANGED = 'sequenceIndexChanged';
    BaseEvents.SETTINGS_CHANGED = 'settingsChanged';
    BaseEvents.SHOW_AUTH_DIALOGUE = 'showAuthDialogue';
    BaseEvents.SHOW_CLICKTHROUGH_DIALOGUE = 'showClickThroughDialogue';
    BaseEvents.SHOW_DOWNLOAD_DIALOGUE = 'showDownloadDialogue';
    BaseEvents.SHOW_EMBED_DIALOGUE = 'showEmbedDialogue';
    BaseEvents.SHOW_EXTERNALCONTENT_DIALOGUE = 'showExternalContentDialogue';
    BaseEvents.SHOW_GENERIC_DIALOGUE = 'showGenericDialogue';
    BaseEvents.SHOW_HELP_DIALOGUE = 'showHelpDialogue';
    BaseEvents.SHOW_INFORMATION = 'showInformation';
    BaseEvents.SHOW_LOGIN_DIALOGUE = 'showLoginDialogue';
    BaseEvents.SHOW_MESSAGE = 'showMessage';
    BaseEvents.SHOW_MOREINFO_DIALOGUE = 'showMoreInfoDialogue';
    BaseEvents.SHOW_MULTISELECT_DIALOGUE = 'showMultiSelectDialogue';
    BaseEvents.SHOW_OVERLAY = 'showOverlay';
    BaseEvents.SHOW_RESTRICTED_DIALOGUE = 'showRestrictedDialogue';
    BaseEvents.SHOW_SETTINGS_DIALOGUE = 'showSettingsDialogue';
    BaseEvents.SHOW_SHARE_DIALOGUE = 'showShareDialogue';
    BaseEvents.SHOW_TERMS_OF_USE = 'showTermsOfUse';
    BaseEvents.THUMB_MULTISELECTED = 'thumbMultiSelected';
    BaseEvents.THUMB_SELECTED = 'thumbSelected';
    BaseEvents.TOGGLE_EXPAND_LEFT_PANEL = 'toggleExpandLeftPanel';
    BaseEvents.TOGGLE_EXPAND_RIGHT_PANEL = 'toggleExpandRightPanel';
    BaseEvents.TOGGLE_FULLSCREEN = 'toggleFullScreen';
    BaseEvents.TREE_NODE_MULTISELECTED = 'treeNodeMultiSelected';
    BaseEvents.TREE_NODE_SELECTED = 'treeNodeSelected';
    BaseEvents.UP_ARROW = 'upArrow';
    BaseEvents.UPDATE_SETTINGS = 'updateSettings';
    BaseEvents.VIEW_FULL_TERMS = 'viewFullTerms';
    BaseEvents.WINDOW_UNLOAD = 'windowUnload';
    return BaseEvents;
}());



/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/index.ts */"./src/index.ts");


/***/ }),

/***/ "node-fetch":
/*!************************!*\
  !*** external "fetch" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_node_fetch__;

/***/ })

/******/ });
});
//# sourceMappingURL=UV.js.map