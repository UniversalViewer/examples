(window["webpackJsonpUV"] = window["webpackJsonpUV"] || []).push([["vendors~uv-av-extension~uv-model-viewer-extension~uv-openseadragon-extension"],{

/***/ "./node_modules/@iiif/iiif-gallery-component/dist-esmodule/index.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@iiif/iiif-gallery-component/dist-esmodule/index.js ***!
  \**************************************************************************/
/*! exports provided: GalleryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GalleryComponent", function() { return GalleryComponent; });
/* harmony import */ var _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @iiif/vocabulary */ "./node_modules/@iiif/vocabulary/dist-esmodule/index.js");
/* harmony import */ var _iiif_base_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @iiif/base-component */ "./node_modules/@iiif/base-component/dist-esmodule/index.js");
/* harmony import */ var _edsilv_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @edsilv/utils */ "./node_modules/@edsilv/utils/dist-esmodule/index.js");
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



var GalleryComponent = /** @class */ (function (_super) {
    __extends(GalleryComponent, _super);
    function GalleryComponent(options) {
        var _this = _super.call(this, options) || this;
        _this._data = _this.data();
        _this._data = _this.options.data;
        _this._init();
        _this._resize();
        return _this;
    }
    GalleryComponent.prototype._init = function () {
        var _this = this;
        _super.prototype._init.call(this);
        this._$element = $(this.el);
        this._$header = $('<div class="header"></div>');
        this._$element.append(this._$header);
        this._$leftOptions = $('<div class="left"></div>');
        this._$header.append(this._$leftOptions);
        this._$rightOptions = $('<div class="right"></div>');
        this._$header.append(this._$rightOptions);
        this._$sizeDownButton = $('<input class="btn btn-default size-down" type="button" value="-" />');
        this._$leftOptions.append(this._$sizeDownButton);
        this._$sizeRange = $('<input type="range" name="size" min="1" max="10" value="' +
            this.options.data.initialZoom +
            '" />');
        this._$leftOptions.append(this._$sizeRange);
        this._$sizeUpButton = $('<input class="btn btn-default size-up" type="button" value="+" />');
        this._$leftOptions.append(this._$sizeUpButton);
        this._$multiSelectOptions = $('<div class="multiSelectOptions"></div>');
        this._$rightOptions.append(this._$multiSelectOptions);
        this._$selectAllButton = $('<div class="multiSelectAll"><input id="multiSelectAll" type="checkbox" tabindex="0" /><label for="multiSelectAll">' +
            this.options.data.content.selectAll +
            "</label></div>");
        this._$multiSelectOptions.append(this._$selectAllButton);
        this._$selectAllButtonCheckbox = $(this._$selectAllButton.find("input:checkbox"));
        this._$selectButton = $('<a class="select" href="#">' + this.options.data.content.select + "</a>");
        this._$multiSelectOptions.append(this._$selectButton);
        this._$main = $('<div class="main"></div>');
        this._$element.append(this._$main);
        this._$thumbs = $('<div class="thumbs"></div>');
        this._$main.append(this._$thumbs);
        this._$sizeDownButton.on("click", function () {
            var val = Number(_this._$sizeRange.val()) - 1;
            if (val >= Number(_this._$sizeRange.attr("min"))) {
                _this._$sizeRange.val(val.toString());
                _this._$sizeRange.trigger("change");
                _this.fire(Events.DECREASE_SIZE);
            }
        });
        this._$sizeUpButton.on("click", function () {
            var val = Number(_this._$sizeRange.val()) + 1;
            if (val <= Number(_this._$sizeRange.attr("max"))) {
                _this._$sizeRange.val(val.toString());
                _this._$sizeRange.trigger("change");
                _this.fire(Events.INCREASE_SIZE);
            }
        });
        this._$sizeRange.on("change", function () {
            _this._updateThumbs();
            _this._scrollToThumb(_this._getSelectedThumbIndex());
        });
        this._$selectAllButton.checkboxButton(function (checked) {
            var multiSelectState = _this._getMultiSelectState();
            if (multiSelectState) {
                if (checked) {
                    multiSelectState.selectAll(true);
                }
                else {
                    multiSelectState.selectAll(false);
                }
            }
            _this.set(_this.options.data);
        });
        this._$selectButton.on("click", function () {
            var multiSelectState = _this._getMultiSelectState();
            if (multiSelectState) {
                var ids = multiSelectState
                    .getAllSelectedCanvases()
                    .map(function (canvas) {
                    return canvas.id;
                });
                _this.fire(Events.MULTISELECTION_MADE, ids);
            }
        });
        this._setRange();
        $.templates({
            galleryThumbsTemplate: '\
				<div class="{{:~galleryThumbClassName()}}" data-src="{{>uri}}" data-index="{{>index}}" data-visible="{{>visible}}" data-width="{{>width}}" data-height="{{>height}}" data-initialwidth="{{>initialWidth}}" data-initialheight="{{>initialHeight}}">\
						<div class="wrap" style="width:{{>initialWidth}}px; height:{{>initialHeight}}px" data-link="class{merge:multiSelected toggle=\'multiSelected\'}">\
						{^{if multiSelectEnabled}}\
								<input id="thumb-checkbox-{{>id}}" type="checkbox" data-link="checked{:multiSelected ? \'checked\' : \'\'}" class="multiSelect" />\
						{{/if}}\
						</div>\
						<div class="info">\
								<span class="index" style="width:{{>initialWidth}}px">{{:#index + 1}}</span>\
								<span class="label" style="width:{{>initialWidth}}px" title="{{>label}}">{{>label}}&nbsp;</span>\
								<span class="searchResults" title="{{:~galleryThumbSearchResultsTitle()}}">{{>data.searchResults}}</span>\
						</div>\
				</div>'
        });
        var that = this;
        $.views.helpers({
            galleryThumbClassName: function () {
                var className = "thumb preLoad";
                if (this.data.index === 0) {
                    className += " first";
                }
                if (!this.data.uri) {
                    className += " placeholder";
                }
                return className;
            },
            galleryThumbSearchResultsTitle: function () {
                var searchResults = Number(this.data.data.searchResults);
                if (searchResults) {
                    if (searchResults > 1) {
                        return _edsilv_utils__WEBPACK_IMPORTED_MODULE_2__["Strings"].format(that.options.data.content.searchResults, searchResults.toString());
                    }
                    return _edsilv_utils__WEBPACK_IMPORTED_MODULE_2__["Strings"].format(that.options.data.content.searchResult, searchResults.toString());
                }
                return null;
            }
        });
        // use unevent to detect scroll stop.
        this._$main.on("scroll", function () {
            _this._updateThumbs();
        }, this.options.data.scrollStopDuration);
        if (!this.options.data.sizingEnabled) {
            this._$sizeRange.hide();
        }
        return true;
    };
    GalleryComponent.prototype.data = function () {
        return {
            chunkedResizingThreshold: 400,
            content: {
                searchResult: "{0} search result",
                searchResults: "{0} search results",
                select: "Select",
                selectAll: "Select All"
            },
            debug: false,
            helper: null,
            imageFadeInDuration: 300,
            initialZoom: 6,
            minLabelWidth: 20,
            pageModeEnabled: false,
            scrollStopDuration: 100,
            searchResults: [],
            sizingEnabled: true,
            thumbHeight: 320,
            thumbLoadPadding: 3,
            thumbWidth: 200,
            viewingDirection: _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_0__["ViewingDirection"].LEFT_TO_RIGHT
        };
    };
    GalleryComponent.prototype.set = function (data) {
        this._data = Object.assign(this._data, data);
        if (this._data.helper &&
            this._data.thumbWidth !== undefined &&
            this._data.thumbHeight !== undefined) {
            this._thumbs = (this._data.helper.getThumbs(this._data.thumbWidth, this._data.thumbHeight));
        }
        if (this._data.viewingDirection) {
            if (this._data.viewingDirection === _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_0__["ViewingDirection"].BOTTOM_TO_TOP) {
                this._thumbs.reverse();
            }
            this._$thumbs.addClass(this._data.viewingDirection); // defaults to "left-to-right"
        }
        if (this._data.searchResults && this._data.searchResults.length) {
            for (var i = 0; i < this._data.searchResults.length; i++) {
                var searchResult = this._data.searchResults[i];
                // find the thumb with the same canvasIndex and add the searchResult
                var thumb = this._thumbs.filter(function (t) { return t.index === searchResult.canvasIndex; })[0];
                // clone the data so searchResults isn't persisted on the canvas.
                var data_1 = $.extend(true, {}, thumb.data);
                data_1.searchResults = searchResult.rects.length;
                thumb.data = data_1;
            }
        }
        this._thumbsCache = null; // delete cache
        this._createThumbs();
        if (this._data.helper) {
            this.selectIndex(this._data.helper.canvasIndex);
        }
        var multiSelectState = this._getMultiSelectState();
        if (multiSelectState && multiSelectState.isEnabled) {
            this._$multiSelectOptions.show();
            this._$thumbs.addClass("multiSelect");
            for (var i = 0; i < multiSelectState.canvases.length; i++) {
                var canvas = multiSelectState.canvases[i];
                var thumb = this._getThumbByCanvas(canvas);
                this._setThumbMultiSelected(thumb, canvas.multiSelected);
            }
            // range selections override canvas selections
            for (var i = 0; i < multiSelectState.ranges.length; i++) {
                var range = multiSelectState.ranges[i];
                var thumbs = this._getThumbsByRange(range);
                for (var i_1 = 0; i_1 < thumbs.length; i_1++) {
                    var thumb = thumbs[i_1];
                    this._setThumbMultiSelected(thumb, range.multiSelected);
                }
            }
        }
        else {
            this._$multiSelectOptions.hide();
            this._$thumbs.removeClass("multiSelect");
        }
        this._update();
    };
    GalleryComponent.prototype._update = function () {
        var multiSelectState = this._getMultiSelectState();
        if (multiSelectState && multiSelectState.isEnabled) {
            // check/uncheck Select All checkbox
            this._$selectAllButtonCheckbox.prop("checked", multiSelectState.allSelected());
            var anySelected = multiSelectState.getAll().filter(function (t) { return t.multiSelected; }).length > 0;
            if (!anySelected) {
                this._$selectButton.hide();
            }
            else {
                this._$selectButton.show();
            }
        }
    };
    GalleryComponent.prototype._getMultiSelectState = function () {
        if (this._data.helper) {
            return this._data.helper.getMultiSelectState();
        }
        return null;
    };
    GalleryComponent.prototype._createThumbs = function () {
        var that = this;
        if (!this._thumbs)
            return;
        this._$thumbs.undelegate(".thumb", "click");
        this._$thumbs.empty();
        var multiSelectState = this._getMultiSelectState();
        // set initial thumb sizes
        var heights = [];
        for (var i_2 = 0; i_2 < this._thumbs.length; i_2++) {
            var thumb = this._thumbs[i_2];
            var initialWidth = thumb.width;
            var initialHeight = thumb.height;
            thumb.initialWidth = initialWidth;
            //thumb.initialHeight = initialHeight;
            heights.push(initialHeight);
            thumb.multiSelectEnabled = multiSelectState
                ? multiSelectState.isEnabled
                : false;
        }
        var medianHeight = _edsilv_utils__WEBPACK_IMPORTED_MODULE_2__["Maths"].median(heights);
        for (var i_3 = 0; i_3 < this._thumbs.length; i_3++) {
            var thumb = this._thumbs[i_3];
            thumb.initialHeight = medianHeight;
        }
        this._$thumbs.link($.templates.galleryThumbsTemplate, this._thumbs);
        if (multiSelectState && !multiSelectState.isEnabled) {
            // add a selection click event to all thumbs
            this._$thumbs.delegate(".thumb", "click", function (e) {
                e.preventDefault();
                var thumb = $.view(this).data;
                that.fire(Events.THUMB_SELECTED, thumb);
            });
        }
        else {
            // make each thumb a checkboxButton
            var thumbs = this._$thumbs.find(".thumb");
            var _loop_1 = function () {
                var that_1 = this_1;
                var $thumb = $(thumbs[i]);
                $thumb.checkboxButton(function (_checked) {
                    var thumb = $.view(this).data;
                    that_1._setThumbMultiSelected(thumb, !thumb.multiSelected);
                    var range = that_1.options.data.helper.getCanvasRange(thumb.data);
                    var multiSelectState = that_1._getMultiSelectState();
                    if (multiSelectState) {
                        if (range) {
                            multiSelectState.selectRange(range, thumb.multiSelected);
                        }
                        else {
                            multiSelectState.selectCanvas(thumb.data, thumb.multiSelected);
                        }
                    }
                    that_1._update();
                    that_1.fire(Events.THUMB_MULTISELECTED, thumb);
                });
            };
            var this_1 = this;
            for (var i = 0; i < thumbs.length; i++) {
                _loop_1();
            }
        }
    };
    GalleryComponent.prototype._getThumbByCanvas = function (canvas) {
        return this._thumbs.filter(function (c) { return c.data.id === canvas.id; })[0];
    };
    GalleryComponent.prototype._sizeThumb = function ($thumb) {
        var initialWidth = $thumb.data().initialwidth;
        var initialHeight = $thumb.data().initialheight;
        var width = Number(initialWidth);
        var height = Number(initialHeight);
        var newWidth = Math.floor(width * this._range);
        var newHeight = Math.floor(height * this._range);
        var $wrap = $thumb.find(".wrap");
        var $label = $thumb.find(".label");
        var $index = $thumb.find(".index");
        var $searchResults = $thumb.find(".searchResults");
        var newLabelWidth = newWidth;
        // if search results are visible, size index/label to accommodate it.
        // if the resulting size is below options.minLabelWidth, hide search results.
        if (this._data.searchResults && this._data.searchResults.length) {
            $searchResults.show();
            newLabelWidth = newWidth - $searchResults.outerWidth();
            if (this._data.minLabelWidth !== undefined &&
                newLabelWidth < this._data.minLabelWidth) {
                $searchResults.hide();
                newLabelWidth = newWidth;
            }
            else {
                $searchResults.show();
            }
        }
        if (this._data.pageModeEnabled) {
            $index.hide();
            $label.show();
        }
        else {
            $index.show();
            $label.hide();
        }
        $wrap.outerWidth(newWidth);
        $wrap.outerHeight(newHeight);
        $index.outerWidth(newLabelWidth);
        $label.outerWidth(newLabelWidth);
    };
    GalleryComponent.prototype._loadThumb = function ($thumb, cb) {
        var $wrap = $thumb.find(".wrap");
        if ($wrap.hasClass("loading") || $wrap.hasClass("loaded"))
            return;
        $thumb.removeClass("preLoad");
        // if no img has been added yet
        var visible = $thumb.attr("data-visible");
        var fadeDuration = this._data.imageFadeInDuration || 0;
        if (visible !== "false") {
            $wrap.addClass("loading");
            var src = $thumb.attr("data-src");
            var $img = $('<img class="thumbImage" src="' + src + '" />');
            // fade in on load.
            $img.hide();
            $img.on("load", function () {
                $(this).fadeIn(fadeDuration, function () {
                    $(this).parent().switchClass("loading", "loaded");
                });
            });
            $wrap.prepend($img);
            if (cb)
                cb($img);
        }
        else {
            $wrap.addClass("hidden");
        }
    };
    GalleryComponent.prototype._getThumbsByRange = function (range) {
        var thumbs = [];
        if (!this._data.helper) {
            return thumbs;
        }
        for (var i = 0; i < this._thumbs.length; i++) {
            var thumb = this._thumbs[i];
            var canvas = thumb.data;
            var r = (this._data.helper.getCanvasRange(canvas, range.path));
            if (r && r.id === range.id) {
                thumbs.push(thumb);
            }
        }
        return thumbs;
    };
    GalleryComponent.prototype._updateThumbs = function () {
        var debug = !!this._data.debug;
        // cache range size
        this._setRange();
        var scrollTop = this._$main.scrollTop();
        var scrollHeight = this._$main.height();
        var scrollBottom = scrollTop + scrollHeight;
        if (debug) {
            console.log("scrollTop %s, scrollBottom %s", scrollTop, scrollBottom);
        }
        // test which thumbs are scrolled into view
        var thumbs = this._getAllThumbs();
        var numToUpdate = 0;
        for (var i = 0; i < thumbs.length; i++) {
            var $thumb = $(thumbs[i]);
            var thumbTop = $thumb.position().top;
            var thumbHeight = $thumb.outerHeight();
            var thumbBottom = thumbTop + thumbHeight;
            var padding = thumbHeight * this._data.thumbLoadPadding;
            // check all thumbs to see if they are within the scroll area plus padding
            if (thumbTop <= scrollBottom + padding &&
                thumbBottom >= scrollTop - padding) {
                numToUpdate += 1;
                //let $label: JQuery = $thumb.find('span:visible').not('.searchResults');
                // if (debug) {
                //     $thumb.addClass('debug');
                //     $label.empty().append('t: ' + thumbTop + ', b: ' + thumbBottom);
                // } else {
                //     $thumb.removeClass('debug');
                // }
                this._sizeThumb($thumb);
                $thumb.addClass("insideScrollArea");
                // if (debug) {
                //     $label.append(', i: true');
                // }
                this._loadThumb($thumb);
            }
            else {
                $thumb.removeClass("insideScrollArea");
                // if (debug) {
                //     $label.append(', i: false');
                // }
            }
        }
        if (debug) {
            console.log("number of thumbs to update: " + numToUpdate);
        }
    };
    GalleryComponent.prototype._getSelectedThumbIndex = function () {
        return Number(this._$selectedThumb.data("index"));
    };
    GalleryComponent.prototype._getAllThumbs = function () {
        if (!this._thumbsCache) {
            this._thumbsCache = this._$thumbs.find(".thumb");
        }
        return this._thumbsCache;
    };
    GalleryComponent.prototype._getThumbByIndex = function (canvasIndex) {
        return this._$thumbs.find('[data-index="' + canvasIndex + '"]');
    };
    GalleryComponent.prototype._scrollToThumb = function (canvasIndex) {
        var $thumb = this._getThumbByIndex(canvasIndex);
        this._$main.scrollTop($thumb.position().top);
    };
    // these don't work well because thumbs are loaded in chunks
    // public searchPreviewStart(canvasIndex: number): void {
    //     this._scrollToThumb(canvasIndex);
    //     const $thumb: JQuery = this._getThumbByIndex(canvasIndex);
    //     $thumb.addClass('searchpreview');
    // }
    // public searchPreviewFinish(): void {
    //     this._scrollToThumb(this._data.helper.canvasIndex);
    //     this._getAllThumbs().removeClass('searchpreview');
    // }
    GalleryComponent.prototype.selectIndex = function (index) {
        if (!this._thumbs || !this._thumbs.length)
            return;
        this._getAllThumbs().removeClass("selected");
        this._$selectedThumb = this._getThumbByIndex(index);
        this._$selectedThumb.addClass("selected");
        this._scrollToThumb(index);
        // make sure visible images are loaded.
        this._updateThumbs();
    };
    GalleryComponent.prototype._setRange = function () {
        var norm = _edsilv_utils__WEBPACK_IMPORTED_MODULE_2__["Maths"].normalise(Number(this._$sizeRange.val()), 0, 10);
        this._range = _edsilv_utils__WEBPACK_IMPORTED_MODULE_2__["Maths"].clamp(norm, 0.05, 1);
    };
    GalleryComponent.prototype._setThumbMultiSelected = function (thumb, selected) {
        $.observable(thumb).setProperty("multiSelected", selected);
    };
    GalleryComponent.prototype._resize = function () { };
    return GalleryComponent;
}(_iiif_base_component__WEBPACK_IMPORTED_MODULE_1__["BaseComponent"]));

var Events = /** @class */ (function () {
    function Events() {
    }
    Events.DECREASE_SIZE = "decreaseSize";
    Events.INCREASE_SIZE = "increaseSize";
    Events.MULTISELECTION_MADE = "multiSelectionMade";
    Events.THUMB_SELECTED = "thumbSelected";
    Events.THUMB_MULTISELECTED = "thumbMultiSelected";
    return Events;
}());
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@iiif/iiif-tree-component/dist-umd/IIIFTreeComponent.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@iiif/iiif-tree-component/dist-umd/IIIFTreeComponent.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){ true?module.exports=t(__webpack_require__(/*! fetch-cookie/node-fetch */ "./node_modules/fetch-cookie/node-fetch.js"),__webpack_require__(/*! form-data */ "./node_modules/form-data/lib/browser.js"),__webpack_require__(/*! node-fetch */ "node-fetch"),__webpack_require__(/*! url */ "./node_modules/url/url.js")):undefined}("undefined"!=typeof self?self:this,(function(e,t,n,r){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(r,i,function(t){return e[t]}.bind(null,i));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=2)}([function(e,t,n){var r,i,o,a;"undefined"!=typeof self&&self,e.exports=(r=n(4),i=n(5),o=n(6),a=n(7),function(e){var t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(r,i,function(t){return e[t]}.bind(null,i));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=3)}([function(e,t,n){"use strict";function r(e){for(var n in e)t.hasOwnProperty(n)||(t[n]=e[n])}Object.defineProperty(t,"__esModule",{value:!0}),r(n(5)),r(n(6)),r(n(7)),r(n(8)),r(n(9)),r(n(10)),r(n(11)),r(n(12)),r(n(13)),r(n(14)),r(n(15)),r(n(16)),r(n(17)),r(n(18)),r(n(19)),r(n(20)),r(n(21)),r(n(22)),r(n(23)),r(n(24)),r(n(25)),r(n(26)),r(n(27)),r(n(28)),r(n(29)),r(n(30)),r(n(31)),r(n(2))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){e.BOOKMARKING="oa:bookmarking",e.CLASSIFYING="oa:classifying",e.COMMENTING="oa:commenting",e.DESCRIBING="oa:describing",e.EDITING="oa:editing",e.HIGHLIGHTING="oa:highlighting",e.IDENTIFYING="oa:identifying",e.LINKING="oa:linking",e.MODERATING="oa:moderating",e.PAINTING="sc:painting",e.QUESTIONING="oa:questioning",e.REPLYING="oa:replying",e.TAGGING="oa:tagging",e.TRANSCRIBING="oad:transcribing"}(t.AnnotationMotivation||(t.AnnotationMotivation={})),function(e){e.AUTO_ADVANCE="auto-advance",e.CONTINUOUS="continuous",e.FACING_PAGES="facing-pages",e.HIDDEN="hidden",e.INDIVIDUALS="individuals",e.MULTI_PART="multi-part",e.NO_NAV="no-nav",e.NON_PAGED="non-paged",e.PAGED="paged",e.REPEAT="repeat",e.SEQUENCE="sequence",e.THUMBNAIL_NAV="thumbnail-nav",e.TOGETHER="together",e.UNORDERED="unordered"}(t.Behavior||(t.Behavior={})),function(e){e.CANVAS="canvas",e.CHOICE="choice",e.CONTENT_AS_TEXT="contentastext",e.DOCUMENT="document",e.IMAGE="image",e.MOVING_IMAGE="movingimage",e.PDF="pdf",e.PHYSICAL_OBJECT="physicalobject",e.SOUND="sound",e.TEXTUALBODY="textualbody",e.VIDEO="video"}(t.ExternalResourceType||(t.ExternalResourceType={})),function(e){e.ANNOTATION="annotation",e.CANVAS="canvas",e.COLLECTION="collection",e.MANIFEST="manifest",e.RANGE="range",e.SEQUENCE="sequence"}(t.IIIFResourceType||(t.IIIFResourceType={})),function(e){e.AUDIO_MP4="audio/mp4",e.CORTO="application/corto",e.DRACO="application/draco",e.GLTF="model/gltf+json",e.JPG="image/jpeg",e.M3U8="application/vnd.apple.mpegurl",e.MP3="audio/mp3",e.MPEG_DASH="application/dash+xml",e.OBJ="text/plain",e.PDF="application/pdf",e.PLY="application/ply",e.THREEJS="application/vnd.threejs+json",e.VIDEO_MP4="video/mp4",e.WEBM="video/webm"}(t.MediaType||(t.MediaType={})),function(e){e.DOC="application/msword",e.DOCX="application/vnd.openxmlformats-officedocument.wordprocessingml.document",e.PDF="application/pdf"}(t.RenderingFormat||(t.RenderingFormat={})),function(e){e.IMAGE_0_COMPLIANCE_LEVEL_0="http://library.stanford.edu/iiif/image-api/compliance.html#level0",e.IMAGE_0_COMPLIANCE_LEVEL_1="http://library.stanford.edu/iiif/image-api/compliance.html#level1",e.IMAGE_0_COMPLIANCE_LEVEL_2="http://library.stanford.edu/iiif/image-api/compliance.html#level2",e.IMAGE_0_CONFORMANCE_LEVEL_0="http://library.stanford.edu/iiif/image-api/conformance.html#level0",e.IMAGE_0_CONFORMANCE_LEVEL_1="http://library.stanford.edu/iiif/image-api/conformance.html#level1",e.IMAGE_0_CONFORMANCE_LEVEL_2="http://library.stanford.edu/iiif/image-api/conformance.html#level2",e.IMAGE_1_COMPLIANCE_LEVEL_0="http://library.stanford.edu/iiif/image-api/1.1/compliance.html#level0",e.IMAGE_1_COMPLIANCE_LEVEL_1="http://library.stanford.edu/iiif/image-api/1.1/compliance.html#level1",e.IMAGE_1_COMPLIANCE_LEVEL_2="http://library.stanford.edu/iiif/image-api/1.1/compliance.html#level2",e.IMAGE_1_CONFORMANCE_LEVEL_0="http://library.stanford.edu/iiif/image-api/1.1/conformance.html#level0",e.IMAGE_1_CONFORMANCE_LEVEL_1="http://library.stanford.edu/iiif/image-api/1.1/conformance.html#level1",e.IMAGE_1_CONFORMANCE_LEVEL_2="http://library.stanford.edu/iiif/image-api/1.1/conformance.html#level2",e.IMAGE_1_LEVEL_0="http://iiif.io/api/image/1/level0.json",e.IMAGE_1_PROFILE_LEVEL_0="http://iiif.io/api/image/1/profiles/level0.json",e.IMAGE_1_LEVEL_1="http://iiif.io/api/image/1/level1.json",e.IMAGE_1_PROFILE_LEVEL_1="http://iiif.io/api/image/1/profiles/level1.json",e.IMAGE_1_LEVEL_2="http://iiif.io/api/image/1/level2.json",e.IMAGE_1_PROFILE_LEVEL_2="http://iiif.io/api/image/1/profiles/level2.json",e.IMAGE_2_LEVEL_0="http://iiif.io/api/image/2/level0.json",e.IMAGE_2_PROFILE_LEVEL_0="http://iiif.io/api/image/2/profiles/level0.json",e.IMAGE_2_LEVEL_1="http://iiif.io/api/image/2/level1.json",e.IMAGE_2_PROFILE_LEVEL_1="http://iiif.io/api/image/2/profiles/level1.json",e.IMAGE_2_LEVEL_2="http://iiif.io/api/image/2/level2.json",e.IMAGE_2_PROFILE_LEVEL_2="http://iiif.io/api/image/2/profiles/level2.json",e.AUTH_0_CLICK_THROUGH="http://iiif.io/api/auth/0/login/clickthrough",e.AUTH_0_LOGIN="http://iiif.io/api/auth/0/login",e.AUTH_0_LOGOUT="http://iiif.io/api/auth/0/logout",e.AUTH_0_RESTRICTED="http://iiif.io/api/auth/0/login/restricted",e.AUTH_0_TOKEN="http://iiif.io/api/auth/0/token",e.AUTH_1_CLICK_THROUGH="http://iiif.io/api/auth/1/clickthrough",e.AUTH_1_EXTERNAL="http://iiif.io/api/auth/1/external",e.AUTH_1_KIOSK="http://iiif.io/api/auth/1/kiosk",e.AUTH_1_LOGIN="http://iiif.io/api/auth/1/login",e.AUTH_1_LOGOUT="http://iiif.io/api/auth/1/logout",e.AUTH_1_PROBE="http://iiif.io/api/auth/1/probe",e.AUTH_1_TOKEN="http://iiif.io/api/auth/1/token",e.SEARCH_0="http://iiif.io/api/search/0/search",e.SEARCH_0_AUTO_COMPLETE="http://iiif.io/api/search/0/autocomplete",e.SEARCH_1="http://iiif.io/api/search/1/search",e.SEARCH_1_AUTO_COMPLETE="http://iiif.io/api/search/1/autocomplete",e.TRACKING_EXTENSIONS="http://universalviewer.io/tracking-extensions-profile",e.UI_EXTENSIONS="http://universalviewer.io/ui-extensions-profile",e.PRINT_EXTENSIONS="http://universalviewer.io/print-extensions-profile",e.SHARE_EXTENSIONS="http://universalviewer.io/share-extensions-profile",e.OTHER_MANIFESTATIONS="http://iiif.io/api/otherManifestations.json",e.IXIF="http://wellcomelibrary.org/ld/ixif/0/alpha.json"}(t.ServiceProfile||(t.ServiceProfile={})),function(e){e.BOTTOM_TO_TOP="bottom-to-top",e.LEFT_TO_RIGHT="left-to-right",e.RIGHT_TO_LEFT="right-to-left",e.TOP_TO_BOTTOM="top-to-bottom"}(t.ViewingDirection||(t.ViewingDirection={})),function(e){e.CONTINUOUS="continuous",e.INDIVIDUALS="individuals",e.NON_PAGED="non-paged",e.PAGED="paged",e.TOP="top"}(t.ViewingHint||(t.ViewingHint={}))},function(e,t,n){"use strict";var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(i,o){function a(e){try{u(r.next(e))}catch(e){o(e)}}function s(e){try{u(r.throw(e))}catch(e){o(e)}}function u(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,s)}u((r=r.apply(e,t||[])).next())}))},i=this&&this.__generator||function(e,t){var n,r,i,o,a={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function s(o){return function(s){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(i=2&o[0]?r.return:o[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,o[1])).done)return i;switch(r=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return a.label++,{value:o[1],done:!1};case 5:a.label++,r=o[1],o=[0];continue;case 7:o=a.ops.pop(),a.trys.pop();continue;default:if(!(i=(i=a.trys).length>0&&i[i.length-1])&&(6===o[0]||2===o[0])){a=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){a.label=o[1];break}if(6===o[0]&&a.label<i[1]){a.label=i[1],i=o;break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(o);break}i[2]&&a.ops.pop(),a.trys.pop();continue}o=t.call(e,a)}catch(e){o=[6,e],r=0}finally{n=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,s])}}};Object.defineProperty(t,"__esModule",{value:!0});var o=n(0),a=n(1),s=n(32),u=n(37),l=function(){function e(){}return e.getMediaType=function(e){return(e=(e=e.toLowerCase()).split(";")[0]).trim()},e.getImageQuality=function(e){return e===a.ServiceProfile.IMAGE_0_COMPLIANCE_LEVEL_1||e===a.ServiceProfile.IMAGE_0_COMPLIANCE_LEVEL_2||e===a.ServiceProfile.IMAGE_1_COMPLIANCE_LEVEL_1||e===a.ServiceProfile.IMAGE_1_COMPLIANCE_LEVEL_2||e===a.ServiceProfile.IMAGE_0_CONFORMANCE_LEVEL_1||e===a.ServiceProfile.IMAGE_0_CONFORMANCE_LEVEL_2||e===a.ServiceProfile.IMAGE_1_CONFORMANCE_LEVEL_1||e===a.ServiceProfile.IMAGE_1_CONFORMANCE_LEVEL_2||e===a.ServiceProfile.IMAGE_1_LEVEL_1||e===a.ServiceProfile.IMAGE_1_PROFILE_LEVEL_1||e===a.ServiceProfile.IMAGE_1_LEVEL_2||e===a.ServiceProfile.IMAGE_1_PROFILE_LEVEL_2?"native":"default"},e.getInexactLocale=function(e){return-1!==e.indexOf("-")?e.substr(0,e.indexOf("-")):e},e.getLocalisedValue=function(e,t){if(!Array.isArray(e))return e;for(var n=0;n<e.length;n++){var r=e[n];if(t===r["@language"])return r["@value"]}var i=t.substr(0,t.indexOf("-"));for(n=0;n<e.length;n++){var o=e[n];if(o["@language"]===i)return o["@value"]}return null},e.generateTreeNodeIds=function(t,n){var r;void 0===n&&(n=0),r=t.parentNode?t.parentNode.id+"-"+n:"0",t.id=r;for(var i=0;i<t.nodes.length;i++){var o=t.nodes[i];e.generateTreeNodeIds(o,i)}},e.normaliseType=function(e){return-1!==(e=e.toLowerCase()).indexOf(":")?e.split(":")[1]:e},e.normaliseUrl=function(e){return-1!==(e=e.substr(e.indexOf("://"))).indexOf("#")&&(e=e.split("#")[0]),e},e.normalisedUrlsMatch=function(t,n){return e.normaliseUrl(t)===e.normaliseUrl(n)},e.isImageProfile=function(t){return!!(e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_0_COMPLIANCE_LEVEL_0)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_0_COMPLIANCE_LEVEL_1)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_0_COMPLIANCE_LEVEL_2)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_1_COMPLIANCE_LEVEL_0)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_1_COMPLIANCE_LEVEL_2)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_0_CONFORMANCE_LEVEL_0)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_0_CONFORMANCE_LEVEL_1)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_0_CONFORMANCE_LEVEL_2)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_1_CONFORMANCE_LEVEL_1)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_1_CONFORMANCE_LEVEL_2)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_1_LEVEL_0)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_1_PROFILE_LEVEL_0)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_1_LEVEL_1)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_1_PROFILE_LEVEL_1)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_1_LEVEL_2)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_1_PROFILE_LEVEL_2)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_2_LEVEL_0)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_2_PROFILE_LEVEL_0)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_2_LEVEL_1)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_2_PROFILE_LEVEL_1)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_2_LEVEL_2)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_2_PROFILE_LEVEL_2))},e.isLevel0ImageProfile=function(t){return!!(e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_0_COMPLIANCE_LEVEL_0)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_1_COMPLIANCE_LEVEL_0)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_0_CONFORMANCE_LEVEL_0)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_1_CONFORMANCE_LEVEL_0)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_1_LEVEL_0)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_1_PROFILE_LEVEL_0)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_2_LEVEL_0)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_2_PROFILE_LEVEL_0))},e.isLevel1ImageProfile=function(t){return!!(e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_0_COMPLIANCE_LEVEL_1)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_1_COMPLIANCE_LEVEL_1)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_0_CONFORMANCE_LEVEL_1)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_1_CONFORMANCE_LEVEL_1)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_1_LEVEL_1)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_1_PROFILE_LEVEL_1)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_2_LEVEL_1)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_2_PROFILE_LEVEL_1))},e.isLevel2ImageProfile=function(t){return!!(e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_0_COMPLIANCE_LEVEL_2)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_1_COMPLIANCE_LEVEL_2)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_0_CONFORMANCE_LEVEL_2)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_1_CONFORMANCE_LEVEL_2)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_1_LEVEL_2)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_1_PROFILE_LEVEL_2)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_2_LEVEL_2)||e.normalisedUrlsMatch(t,a.ServiceProfile.IMAGE_2_PROFILE_LEVEL_2))},e.parseManifest=function(e,t){return o.Deserialiser.parse(e,t)},e.loadManifest=function(e){return s.request(e,{credentials:"same-origin"})},e.loadExternalResourcesAuth1=function(t,n,r,i,o,a,s,u){return new Promise((function(l,c){var p=t.map((function(t){return e.loadExternalResourceAuth1(t,n,r,i,o,a,s,u)}));Promise.all(p).then((function(){l(t)})).catch((function(e){c(e)}))}))},e.loadExternalResourceAuth1=function(t,n,o,a,s,l,c,p){return r(this,void 0,void 0,(function(){var r;return i(this,(function(i){switch(i.label){case 0:return[4,a(t)];case 1:return(r=i.sent())?[4,t.getData(r)]:[3,6];case 2:return i.sent(),t.status!==u.OK?[3,3]:[2,t];case 3:return[4,e.doAuthChain(t,n,o,s,l,c,p)];case 4:i.sent(),i.label=5;case 5:if(t.status===u.OK||t.status===u.MOVED_TEMPORARILY)return[2,t];throw e.createAuthorizationFailedError();case 6:return[4,t.getData()];case 7:return i.sent(),t.status!==u.MOVED_TEMPORARILY&&t.status!==u.UNAUTHORIZED?[3,9]:[4,e.doAuthChain(t,n,o,s,l,c,p)];case 8:i.sent(),i.label=9;case 9:if(t.status===u.OK||t.status===u.MOVED_TEMPORARILY)return[2,t];throw e.createAuthorizationFailedError()}}))}))},e.doAuthChain=function(t,n,o,a,s,l,c){return r(this,void 0,void 0,(function(){var r,p,f,h,d,g,_,v;return i(this,(function(i){switch(i.label){case 0:return t.isAccessControlled()?((r=t.externalService)&&(r.options=t.options),(p=t.kioskService)&&(p.options=t.options),(f=t.clickThroughService)&&(f.options=t.options),(h=t.loginService)&&(h.options=t.options),t.isResponseHandled||t.status!==u.MOVED_TEMPORARILY?[3,2]:[4,l(t)]):[2,t];case 1:return i.sent(),[2,t];case 2:return d=null,g=null,(d=r)?(g=d,[4,e.attemptResourceWithToken(t,o,d)]):[3,4];case 3:return i.sent(),[2,t];case 4:return(d=p)?(g=d,(_=n(d))?[4,a(_)]:[3,7]):[3,7];case 5:return i.sent(),[4,e.attemptResourceWithToken(t,o,d)];case 6:return i.sent(),[2,t];case 7:return(d=f)?(g=d,[4,s(t,d)]):[3,11];case 8:return(v=i.sent())?[4,a(v)]:[3,11];case 9:return i.sent(),[4,e.attemptResourceWithToken(t,o,d)];case 10:return i.sent(),[2,t];case 11:return(d=h)?(g=d,[4,s(t,d)]):[3,15];case 12:return(v=i.sent())?[4,a(v)]:[3,15];case 13:return i.sent(),[4,e.attemptResourceWithToken(t,o,d)];case 14:return i.sent(),[2,t];case 15:return g&&c(t,g),[2]}}))}))},e.attemptResourceWithToken=function(e,t,n){return r(this,void 0,void 0,(function(){var r,o;return i(this,(function(i){switch(i.label){case 0:return(r=n.getService(a.ServiceProfile.AUTH_1_TOKEN))?[4,t(e,r)]:[3,3];case 1:return(o=i.sent())&&o.accessToken?[4,e.getData(o)]:[3,3];case 2:return i.sent(),[2,e];case 3:return[2]}}))}))},e.loadExternalResourcesAuth09=function(t,n,r,i,o,a,s,u,l,c){return new Promise((function(p,f){var h=t.map((function(t){return e.loadExternalResourceAuth09(t,n,r,i,o,a,s,u,l,c)}));Promise.all(h).then((function(){p(t)})).catch((function(e){f(e)}))}))},e.loadExternalResourceAuth09=function(t,n,r,i,o,a,s,l,c,p){return new Promise((function(f,h){p&&p.pessimisticAccessControl?t.getData().then((function(){t.isAccessControlled()?t.clickThroughService?(f(r(t)),f(i(t))):o(t).then((function(){a(t,!0).then((function(n){t.getData(n).then((function(){f(c(t))})).catch((function(t){h(e.createInternalServerError(t))}))})).catch((function(t){h(e.createInternalServerError(t))}))})).catch((function(t){h(e.createInternalServerError(t))})):f(t)})).catch((function(t){h(e.createInternalServerError(t))})):l(t,n).then((function(p){p?t.getData(p).then((function(){t.status===u.OK?f(c(t)):e.authorize(t,n,r,i,o,a,s,l).then((function(){f(c(t))})).catch((function(t){h(e.createAuthorizationFailedError())}))})).catch((function(t){h(e.createAuthorizationFailedError())})):e.authorize(t,n,r,i,o,a,s,l).then((function(){f(c(t))})).catch((function(t){h(e.createAuthorizationFailedError())}))})).catch((function(t){h(e.createAuthorizationFailedError())}))}))},e.createError=function(e,t){var n=new Error;return n.message=t,n.name=String(e),n},e.createAuthorizationFailedError=function(){return e.createError(o.StatusCode.AUTHORIZATION_FAILED,"Authorization failed")},e.createRestrictedError=function(){return e.createError(o.StatusCode.RESTRICTED,"Restricted")},e.createInternalServerError=function(t){return e.createError(o.StatusCode.INTERNAL_SERVER_ERROR,t)},e.authorize=function(t,n,r,i,o,a,s,l){return new Promise((function(c,p){t.getData().then((function(){t.isAccessControlled()?l(t,n).then((function(l){l?t.getData(l).then((function(){t.status===u.OK?c(t):e.showAuthInteraction(t,n,r,i,o,a,s,c,p)})).catch((function(t){p(e.createInternalServerError(t))})):a(t,!1).then((function(l){l?s(t,l,n).then((function(){t.getData(l).then((function(){t.status===u.OK?c(t):e.showAuthInteraction(t,n,r,i,o,a,s,c,p)})).catch((function(t){p(e.createInternalServerError(t))}))})).catch((function(t){p(e.createInternalServerError(t))})):e.showAuthInteraction(t,n,r,i,o,a,s,c,p)}))})).catch((function(t){p(e.createInternalServerError(t))})):c(t)}))}))},e.showAuthInteraction=function(t,n,r,i,o,a,s,l,c){t.status!==u.MOVED_TEMPORARILY||t.isResponseHandled?t.clickThroughService&&!t.isResponseHandled?r(t).then((function(){a(t,!0).then((function(r){s(t,r,n).then((function(){t.getData(r).then((function(){l(t)})).catch((function(t){c(e.createInternalServerError(t))}))})).catch((function(t){c(e.createInternalServerError(t))}))})).catch((function(t){c(e.createInternalServerError(t))}))})):o(t).then((function(){a(t,!0).then((function(r){s(t,r,n).then((function(){t.getData(r).then((function(){l(t)})).catch((function(t){c(e.createInternalServerError(t))}))})).catch((function(t){c(e.createInternalServerError(t))}))})).catch((function(t){c(e.createInternalServerError(t))}))})):l(t)},e.getService=function(e,t){for(var n=this.getServices(e),r=0;r<n.length;r++){var i=n[r];if(i.getProfile()===t)return i}return null},e.getResourceById=function(t,n){return e.traverseAndFind(t.__jsonld,"@id",n)},e.traverseAndFind=function(t,n,r){if(t.hasOwnProperty(n)&&t[n]===r)return t;for(var i=0;i<Object.keys(t).length;i++)if("object"==typeof t[Object.keys(t)[i]]){var o=e.traverseAndFind(t[Object.keys(t)[i]],n,r);if(null!=o)return o}},e.getServices=function(e){var t,n=[];if(!(t=e.__jsonld?e.__jsonld.service:e.service))return n;Array.isArray(t)||(t=[t]);for(var r=0;r<t.length;r++){var i=t[r];if("string"==typeof i){var a=this.getResourceById(e.options.resource,i);a&&n.push(new o.Service(a.__jsonld||a,e.options))}else n.push(new o.Service(i,e.options))}return n},e.getTemporalComponent=function(e){var t=/t=([^&]+)/g.exec(e),n=null;return t&&t[1]&&(n=t[1].split(",")),n},e}();t.Utils=l},function(e,t,n){e.exports=n(4)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){for(var n in e)t.hasOwnProperty(n)||(t[n]=e[n])}(n(0));var r=n(2);t.loadManifest=function(e){return r.Utils.loadManifest(e)},t.parseManifest=function(e,t){return r.Utils.parseManifest(e,t)}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e){this.__jsonld=e,this.context=this.getProperty("context"),this.id=this.getProperty("id")}return e.prototype.getProperty=function(e){var t=null;return this.__jsonld&&((t=this.__jsonld[e])||(t=this.__jsonld["@"+e])),t},e}();t.JSONLDResource=r},function(e,t,n){"use strict";var r,i=this&&this.__extends||(r=function(e,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)},function(e,t){function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)});Object.defineProperty(t,"__esModule",{value:!0});var o=n(0),a=n(1),s=function(e){function t(t,n){var r=e.call(this,t)||this;return r.options=n,r}return i(t,e),t.prototype.getIIIFResourceType=function(){return o.Utils.normaliseType(this.getProperty("type"))},t.prototype.getLabel=function(){var e=this.getProperty("label");return e?o.LanguageMap.parse(e,this.options.locale):[]},t.prototype.getDefaultLabel=function(){return o.LanguageMap.getValue(this.getLabel())},t.prototype.getMetadata=function(){var e=this.getProperty("metadata"),t=[];if(!e)return t;for(var n=0;n<e.length;n++){var r=e[n],i=new o.LabelValuePair(this.options.locale);i.parse(r),t.push(i)}return t},t.prototype.getRendering=function(e){for(var t=this.getRenderings(),n=0;n<t.length;n++){var r=t[n];if(r.getFormat()===e)return r}return null},t.prototype.getRenderings=function(){var e,t=[];if(!(e=this.__jsonld?this.__jsonld.rendering:this.rendering))return t;Array.isArray(e)||(e=[e]);for(var n=0;n<e.length;n++){var r=e[n];t.push(new o.Rendering(r,this.options))}return t},t.prototype.getService=function(e){return o.Utils.getService(this,e)},t.prototype.getServices=function(){return o.Utils.getServices(this)},t.prototype.getThumbnail=function(){var e=this.getProperty("thumbnail");return Array.isArray(e)&&(e=e[0]),e?new o.Thumbnail(e,this.options):null},t.prototype.isAnnotation=function(){return this.getIIIFResourceType()===a.IIIFResourceType.ANNOTATION},t.prototype.isCanvas=function(){return this.getIIIFResourceType()===a.IIIFResourceType.CANVAS},t.prototype.isCollection=function(){return this.getIIIFResourceType()===a.IIIFResourceType.COLLECTION},t.prototype.isManifest=function(){return this.getIIIFResourceType()===a.IIIFResourceType.MANIFEST},t.prototype.isRange=function(){return this.getIIIFResourceType()===a.IIIFResourceType.RANGE},t.prototype.isSequence=function(){return this.getIIIFResourceType()===a.IIIFResourceType.SEQUENCE},t}(o.JSONLDResource);t.ManifestResource=s},function(e,t,n){"use strict";var r,i=this&&this.__extends||(r=function(e,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)},function(e,t){function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)});Object.defineProperty(t,"__esModule",{value:!0});var o=n(0),a=function(e){function t(t,n){return e.call(this,t,n)||this}return i(t,e),t.prototype.getFormat=function(){var e=this.getProperty("format");return e?e.toLowerCase():null},t.prototype.getResources=function(){var e=[];if(!this.__jsonld.resources)return e;for(var t=0;t<this.__jsonld.resources.length;t++){var n=this.__jsonld.resources[t],r=new o.Annotation(n,this.options);e.push(r)}return e},t.prototype.getType=function(){var e=this.getProperty("type");return e?o.Utils.normaliseType(e):null},t.prototype.getWidth=function(){return this.getProperty("width")},t.prototype.getHeight=function(){return this.getProperty("height")},t.prototype.getMaxWidth=function(){return this.getProperty("maxWidth")},t.prototype.getMaxHeight=function(){return this.getProperty("maxHeight")?null:this.getMaxWidth()},t}(o.ManifestResource);t.Resource=a},function(e,t,n){"use strict";var r,i=this&&this.__extends||(r=function(e,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)},function(e,t){function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)});Object.defineProperty(t,"__esModule",{value:!0});var o=n(0),a=n(1),s=function(e){function t(t,n){var r=e.call(this,t,n)||this;r.index=-1,r.isLoaded=!1;var i={defaultLabel:"-",locale:"en-GB",resource:r,pessimisticAccessControl:!1};return r.options=Object.assign(i,n),r}return i(t,e),t.prototype.getAttribution=function(){var e=this.getProperty("attribution");return e?o.LanguageMap.parse(e,this.options.locale):[]},t.prototype.getDescription=function(){var e=this.getProperty("description");return e?o.LanguageMap.parse(e,this.options.locale):[]},t.prototype.getIIIFResourceType=function(){return o.Utils.normaliseType(this.getProperty("type"))},t.prototype.getLogo=function(){var e=this.getProperty("logo");return e?"string"==typeof e?e:(Array.isArray(e)&&e.length&&(e=e[0]),e["@id"]||e.id):null},t.prototype.getLicense=function(){return o.Utils.getLocalisedValue(this.getProperty("license"),this.options.locale)},t.prototype.getNavDate=function(){return new Date(this.getProperty("navDate"))},t.prototype.getRelated=function(){return this.getProperty("related")},t.prototype.getSeeAlso=function(){return this.getProperty("seeAlso")},t.prototype.getTrackingLabel=function(){var e=this.getService(a.ServiceProfile.TRACKING_EXTENSIONS);return e?e.getProperty("trackingLabel"):""},t.prototype.getDefaultTree=function(){return this.defaultTree=new o.TreeNode("root"),this.defaultTree.data=this,this.defaultTree},t.prototype.getRequiredStatement=function(){var e=null,t=this.getProperty("requiredStatement");if(t)(e=new o.LabelValuePair(this.options.locale)).parse(t);else{var n=this.getAttribution();n&&((e=new o.LabelValuePair(this.options.locale)).value=n)}return e},t.prototype.isCollection=function(){return this.getIIIFResourceType()===a.IIIFResourceType.COLLECTION},t.prototype.isManifest=function(){return this.getIIIFResourceType()===a.IIIFResourceType.MANIFEST},t.prototype.load=function(){var e=this;return new Promise((function(t){if(e.isLoaded)t(e);else{var n=e.options;n.navDate=e.getNavDate();var r=e.__jsonld.id;r||(r=e.__jsonld["@id"]),o.Utils.loadManifest(r).then((function(r){e.parentLabel=o.LanguageMap.getValue(e.getLabel(),n.locale);var i=o.Deserialiser.parse(r,n);(e=Object.assign(e,i)).index=n.index,t(e)}))}}))},t}(o.ManifestResource);t.IIIFResource=s},function(e,t,n){"use strict";var r,i=this&&this.__extends||(r=function(e,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)},function(e,t){function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)});Object.defineProperty(t,"__esModule",{value:!0});var o=n(0),a=function(e){function t(t,n){return e.call(this,t,n)||this}return i(t,e),t.prototype.getBody=function(){var e=[],t=this.getProperty("body");if(t)if(Array.isArray(t))for(var n=0;n<t.length;n++)if((a=t[n]).items)for(var r=0;r<a.items.length;r++){var i=a.items[r];e.push(new o.AnnotationBody(i,this.options))}else e.push(new o.AnnotationBody(a,this.options));else if(t.items)for(n=0;n<t.items.length;n++){var a=t.items[n];e.push(new o.AnnotationBody(a,this.options))}else e.push(new o.AnnotationBody(t,this.options));return e},t.prototype.getMotivation=function(){return this.getProperty("motivation")||null},t.prototype.getOn=function(){return this.getProperty("on")},t.prototype.getTarget=function(){return this.getProperty("target")},t.prototype.getResource=function(){return new o.Resource(this.getProperty("resource"),this.options)},t}(o.ManifestResource);t.Annotation=a},function(e,t,n){"use strict";var r,i=this&&this.__extends||(r=function(e,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)},function(e,t){function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)});Object.defineProperty(t,"__esModule",{value:!0});var o=n(0),a=function(e){function t(t,n){return e.call(this,t,n)||this}return i(t,e),t.prototype.getFormat=function(){var e=this.getProperty("format");return e?o.Utils.getMediaType(e):null},t.prototype.getType=function(){return this.getProperty("type")?o.Utils.normaliseType(this.getProperty("type")):null},t.prototype.getWidth=function(){return this.getProperty("width")},t.prototype.getHeight=function(){return this.getProperty("height")},t}(o.ManifestResource);t.AnnotationBody=a},function(e,t,n){"use strict";var r,i=this&&this.__extends||(r=function(e,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)},function(e,t){function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)});Object.defineProperty(t,"__esModule",{value:!0});var o=n(0),a=function(e){function t(t,n,r){var i=e.call(this,n)||this;return i.label=t,i.options=r,i}return i(t,e),t.prototype.getIIIFResourceType=function(){return o.Utils.normaliseType(this.getProperty("type"))},t.prototype.getLabel=function(){return this.label},t.prototype.getResources=function(){var e=this;return this.getProperty("resources").map((function(t){return new o.Annotation(t,e.options)}))},t.prototype.load=function(){var e=this;return new Promise((function(t,n){if(e.isLoaded)t(e);else{var r=e.__jsonld.id;r||(r=e.__jsonld["@id"]),o.Utils.loadManifest(r).then((function(n){e.__jsonld=n,e.context=e.getProperty("context"),e.id=e.getProperty("id"),e.isLoaded=!0,t(e)})).catch(n)}}))},t}(o.JSONLDResource);t.AnnotationList=a},function(e,t,n){"use strict";var r,i=this&&this.__extends||(r=function(e,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)},function(e,t){function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)});Object.defineProperty(t,"__esModule",{value:!0});var o=function(e){function t(t,n){return e.call(this,t,n)||this}return i(t,e),t.prototype.getItems=function(){return this.getProperty("items")},t}(n(0).ManifestResource);t.AnnotationPage=o},function(e,t,n){"use strict";var r,i=this&&this.__extends||(r=function(e,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)},function(e,t){function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)});Object.defineProperty(t,"__esModule",{value:!0});var o=n(0),a=function(e){function t(t,n){return e.call(this,t,n)||this}return i(t,e),t.prototype.getCanonicalImageUri=function(e){var t,n=null,r="default",i=e;if(this.externalResource&&this.externalResource.data&&this.externalResource.data["@id"])n=this.externalResource.data["@id"],i||(i=this.externalResource.data.width),this.externalResource.data["@context"]&&(this.externalResource.data["@context"].indexOf("/1.0/context.json")>-1||this.externalResource.data["@context"].indexOf("/1.1/context.json")>-1||this.externalResource.data["@context"].indexOf("/1/context.json")>-1)&&(r="native");else{var a=this.getImages();if(a&&a.length){var s=a[0].getResource(),u=s.getServices();if(i||(i=s.getWidth()),u.length){var l=u[0];n=l.id,r=o.Utils.getImageQuality(l.getProfile())}else if(i===s.getWidth())return s.id}if(!n){var c=this.getProperty("thumbnail");if(c){if("string"==typeof c)return c;if(c["@id"])return c["@id"];if(c.length)return c[0].id}}}return t=i+",",n&&n.endsWith("/")&&(n=n.substr(0,n.length-1)),[n,"full",t,0,r+".jpg"].join("/")},t.prototype.getMaxDimensions=function(){var e,t=null;return this.externalResource&&this.externalResource.data&&this.externalResource.data.profile&&(e=this.externalResource.data.profile,Array.isArray(e)&&(e=e.filter((function(e){return e.maxWidth}))[0])&&(t=new o.Size(e.maxWidth,e.maxHeight?e.maxHeight:e.maxWidth))),t},t.prototype.getContent=function(){var e=[],t=this.__jsonld.items||this.__jsonld.content;if(!t)return e;var n=null;if(t.length&&(n=new o.AnnotationPage(t[0],this.options)),!n)return e;for(var r=n.getItems(),i=0;i<r.length;i++){var a=r[i],s=new o.Annotation(a,this.options);e.push(s)}return e},t.prototype.getDuration=function(){return this.getProperty("duration")},t.prototype.getImages=function(){var e=[];if(!this.__jsonld.images)return e;for(var t=0;t<this.__jsonld.images.length;t++){var n=this.__jsonld.images[t],r=new o.Annotation(n,this.options);e.push(r)}return e},t.prototype.getIndex=function(){return this.getProperty("index")},t.prototype.getOtherContent=function(){var e=this,t=(Array.isArray(this.getProperty("otherContent"))?this.getProperty("otherContent"):[this.getProperty("otherContent")]).filter((function(e){return e&&"string"==typeof(t=e["@type"])&&t.toLowerCase()==t.toLowerCase();var t})).map((function(t,n){return new o.AnnotationList(t.label||"Annotation list "+n,t,e.options)})).map((function(e){return e.load()}));return Promise.all(t)},t.prototype.getWidth=function(){return this.getProperty("width")},t.prototype.getHeight=function(){return this.getProperty("height")},t}(o.Resource);t.Canvas=a},function(e,t,n){"use strict";var r,i=this&&this.__extends||(r=function(e,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)},function(e,t){function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)});Object.defineProperty(t,"__esModule",{value:!0});var o=n(1),a=n(0),s=function(e){function t(t,n){var r=e.call(this,t,n)||this;return r.items=[],r._collections=null,r._manifests=null,t.__collection=r,r}return i(t,e),t.prototype.getCollections=function(){return this._collections?this._collections:this._collections=this.items.filter((function(e){return e.isCollection()}))},t.prototype.getManifests=function(){return this._manifests?this._manifests:this._manifests=this.items.filter((function(e){return e.isManifest()}))},t.prototype.getCollectionByIndex=function(e){for(var t,n=this.getCollections(),r=0;r<n.length;r++){var i=n[r];i.index===e&&(t=i)}if(t)return t.options.index=e,t.load();throw new Error("Collection index not found")},t.prototype.getManifestByIndex=function(e){for(var t,n=this.getManifests(),r=0;r<n.length;r++){var i=n[r];i.index===e&&(t=i)}if(t)return t.options.index=e,t.load();throw new Error("Manifest index not found")},t.prototype.getTotalCollections=function(){return this.getCollections().length},t.prototype.getTotalManifests=function(){return this.getManifests().length},t.prototype.getTotalItems=function(){return this.items.length},t.prototype.getViewingDirection=function(){return this.getProperty("viewingDirection")?this.getProperty("viewingDirection"):o.ViewingDirection.LEFT_TO_RIGHT},t.prototype.getDefaultTree=function(){return e.prototype.getDefaultTree.call(this),this.defaultTree.data.type=a.Utils.normaliseType(a.TreeNodeType.COLLECTION),this._parseManifests(this),this._parseCollections(this),a.Utils.generateTreeNodeIds(this.defaultTree),this.defaultTree},t.prototype._parseManifests=function(e){if(e.getManifests()&&e.getManifests().length)for(var t=0;t<e.getManifests().length;t++){var n=e.getManifests()[t],r=n.getDefaultTree();r.label=n.parentLabel||a.LanguageMap.getValue(n.getLabel(),this.options.locale)||"manifest "+(t+1),r.navDate=n.getNavDate(),r.data.id=n.id,r.data.type=a.Utils.normaliseType(a.TreeNodeType.MANIFEST),e.defaultTree.addNode(r)}},t.prototype._parseCollections=function(e){if(e.getCollections()&&e.getCollections().length)for(var t=0;t<e.getCollections().length;t++){var n=e.getCollections()[t],r=n.getDefaultTree();r.label=n.parentLabel||a.LanguageMap.getValue(n.getLabel(),this.options.locale)||"collection "+(t+1),r.navDate=n.getNavDate(),r.data.id=n.id,r.data.type=a.Utils.normaliseType(a.TreeNodeType.COLLECTION),e.defaultTree.addNode(r)}},t}(a.IIIFResource);t.Collection=s},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){this.start=e,this.end=t}return e.prototype.getLength=function(){return this.end-this.start},e}();t.Duration=r},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),i=function(){function e(e){this.defaultLocale=e}return e.prototype.parse=function(e){this.resource=e,this.label=r.LanguageMap.parse(this.resource.label,this.defaultLocale),this.value=r.LanguageMap.parse(this.resource.value,this.defaultLocale)},e.prototype.getLabel=function(){return this.label?r.LanguageMap.getValue(this.label,this.defaultLocale):null},e.prototype.setLabel=function(e){var t=this;if(this.label&&this.label.length){var n=this.label.filter((function(e){return e.locale===t.defaultLocale||e.locale===r.Utils.getInexactLocale(t.defaultLocale)}))[0];n&&(n.value=e)}},e.prototype.getValue=function(){if(this.value){var e=this.defaultLocale;return this.label&&this.label.length&&this.label[0].locale&&(e=this.label[0].locale),r.LanguageMap.getValue(this.value,e)}return null},e.prototype.setValue=function(e){var t=this;if(this.value&&this.value.length){var n=this.value.filter((function(e){return e.locale===t.defaultLocale||e.locale===r.Utils.getInexactLocale(t.defaultLocale)}))[0];n&&(n.value=e)}},e}();t.LabelValuePair=i},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Language=function(e,t){Array.isArray(e)?1===e.length?this.value=e[0]:this.value=e.join("<br/>"):this.value=e,this.locale=t}},function(e,t,n){"use strict";var r,i=this&&this.__extends||(r=function(e,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)},function(e,t){function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)});Object.defineProperty(t,"__esModule",{value:!0});var o=n(0),a=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return i(t,e),t.parse=function(e,t){var n,r=[];if(!e)return r;if(Array.isArray(e))for(var i=0;i<e.length;i++){var a=e[i];n="string"==typeof a?new o.Language(a,t):new o.Language(a["@value"],a["@language"]||t),r.push(n)}else{if("string"==typeof e)return n=new o.Language(e,t),r.push(n),r;e["@value"]?(n=new o.Language(e["@value"],e["@language"]||t),r.push(n)):Object.keys(e).forEach((function(t){if(!e[t].length)throw new Error("language must have a value");n=new o.Language(e[t],t),r.push(n)}))}return r},t.getValue=function(e,t){if(e.length){if(t){var n=e.filter((function(e){return e.locale===t||o.Utils.getInexactLocale(e.locale)===o.Utils.getInexactLocale(t)}))[0];if(n)return n.value}return e[0].value}return null},t}(Array);t.LanguageMap=a},function(e,t,n){"use strict";var r,i=this&&this.__extends||(r=function(e,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)},function(e,t){function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)});Object.defineProperty(t,"__esModule",{value:!0});var o=n(1),a=n(0),s=function(e){function t(t,n){var r=e.call(this,t,n)||this;if(r.index=0,r._allRanges=null,r.items=[],r._topRanges=[],r.__jsonld.structures&&r.__jsonld.structures.length)for(var i=r._getTopRanges(),o=0;o<i.length;o++){var a=i[o];r._parseRanges(a,String(o))}return r}return i(t,e),t.prototype.getPosterCanvas=function(){var e=this.getProperty("posterCanvas");return e&&(e=new a.Canvas(e,this.options)),e},t.prototype.getBehavior=function(){var e=this.getProperty("behavior");return Array.isArray(e)&&(e=e[0]),e||null},t.prototype.getDefaultTree=function(){if(e.prototype.getDefaultTree.call(this),this.defaultTree.data.type=a.Utils.normaliseType(a.TreeNodeType.MANIFEST),!this.isLoaded)return this.defaultTree;var t=this.getTopRanges();return t.length&&t[0].getTree(this.defaultTree),a.Utils.generateTreeNodeIds(this.defaultTree),this.defaultTree},t.prototype._getTopRanges=function(){var e=[];if(this.__jsonld.structures&&this.__jsonld.structures.length){for(var t=0;t<this.__jsonld.structures.length;t++){var n=this.__jsonld.structures[t];n.viewingHint===o.ViewingHint.TOP&&e.push(n)}if(!e.length){var r={};r.ranges=this.__jsonld.structures,e.push(r)}}return e},t.prototype.getTopRanges=function(){return this._topRanges},t.prototype._getRangeById=function(e){if(this.__jsonld.structures&&this.__jsonld.structures.length)for(var t=0;t<this.__jsonld.structures.length;t++){var n=this.__jsonld.structures[t];if(n["@id"]===e||n.id===e)return n}return null},t.prototype._parseRanges=function(e,t,n){var r,i=null;if("string"==typeof e&&(i=e,e=this._getRangeById(i)),e){(r=new a.Range(e,this.options)).parentRange=n,r.path=t,n?n.items.push(r):this._topRanges.push(r);var o=e.items||e.members;if(o)for(var s=0;s<o.length;s++){var u=o[s];if(u["@type"]&&"sc:range"===u["@type"].toLowerCase()||u.type&&"range"===u.type.toLowerCase())this._parseRanges(u,t+"/"+s,r);else if(u["@type"]&&"sc:canvas"===u["@type"].toLowerCase()||u.type&&"canvas"===u.type.toLowerCase()){r.canvases||(r.canvases=[]);var l=u.id||u["@id"];r.canvases.push(l)}}else if(e.ranges)for(s=0;s<e.ranges.length;s++)this._parseRanges(e.ranges[s],t+"/"+s,r)}else console.warn("Range:",i,"does not exist")},t.prototype.getAllRanges=function(){if(null!=this._allRanges)return this._allRanges;this._allRanges=[];for(var e=this.getTopRanges(),t=function(t){var r=e[t];r.id&&n._allRanges.push(r);var i=function(e,t){e.add(t);var n=t.getRanges();return n.length?n.reduce(i,e):e},o=Array.from(r.getRanges().reduce(i,new Set));n._allRanges=n._allRanges.concat(o)},n=this,r=0;r<e.length;r++)t(r);return this._allRanges},t.prototype.getRangeById=function(e){for(var t=this.getAllRanges(),n=0;n<t.length;n++){var r=t[n];if(r.id===e)return r}return null},t.prototype.getRangeByPath=function(e){for(var t=this.getAllRanges(),n=0;n<t.length;n++){var r=t[n];if(r.path===e)return r}return null},t.prototype.getSequences=function(){if(this.items.length)return this.items;var e=this.__jsonld.mediaSequences||this.__jsonld.sequences;if(e)for(var t=0;t<e.length;t++){var n=e[t],r=new a.Sequence(n,this.options);this.items.push(r)}else this.__jsonld.items&&(r=new a.Sequence(this.__jsonld.items,this.options),this.items.push(r));return this.items},t.prototype.getSequenceByIndex=function(e){return this.getSequences()[e]},t.prototype.getTotalSequences=function(){return this.getSequences().length},t.prototype.getManifestType=function(){var e=this.getService(o.ServiceProfile.UI_EXTENSIONS);return e?e.getProperty("manifestType"):a.ManifestType.EMPTY},t.prototype.isMultiSequence=function(){return this.getTotalSequences()>1},t.prototype.isPagingEnabled=function(){var e=this.getViewingHint();if(e)return e===o.ViewingHint.PAGED;var t=this.getBehavior();return!!t&&t===o.Behavior.PAGED},t.prototype.getViewingDirection=function(){return this.getProperty("viewingDirection")},t.prototype.getViewingHint=function(){return this.getProperty("viewingHint")},t}(a.IIIFResource);t.Manifest=s},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){e.EMPTY="",e.MANUSCRIPT="manuscript",e.MONOGRAPH="monograph"}(t.ManifestType||(t.ManifestType={}))},function(e,t,n){"use strict";var r,i=this&&this.__extends||(r=function(e,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)},function(e,t){function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)});Object.defineProperty(t,"__esModule",{value:!0});var o=n(0),a=n(1),s=function(e){function t(t,n){var r=e.call(this,t,n)||this;return r._ranges=null,r.canvases=null,r.items=[],r}return i(t,e),t.prototype.getCanvasIds=function(){return this.__jsonld.canvases?this.__jsonld.canvases:this.canvases?this.canvases:[]},t.prototype.getDuration=function(){var e,t;if(this.canvases&&this.canvases.length)for(var n=0;n<this.canvases.length;n++){var r=this.canvases[n],i=o.Utils.getTemporalComponent(r);i&&i.length>1&&(0===n&&(e=Number(i[0])),n===this.canvases.length-1&&(t=Number(i[1])))}else{var a=this.getRanges();for(n=0;n<a.length;n++){var s=a[n].getDuration();s&&(0===n&&(e=s.start),n===a.length-1&&(t=s.end))}}if(void 0!==e&&void 0!==t)return new o.Duration(e,t)},t.prototype.getRanges=function(){return this._ranges?this._ranges:this._ranges=this.items.filter((function(e){return e.isRange()}))},t.prototype.getBehavior=function(){var e=this.getProperty("behavior");return Array.isArray(e)&&(e=e[0]),e||null},t.prototype.getViewingDirection=function(){return this.getProperty("viewingDirection")},t.prototype.getViewingHint=function(){return this.getProperty("viewingHint")},t.prototype.getTree=function(e){e.data=this,this.treeNode=e;var t=this.getRanges();if(t&&t.length)for(var n=0;n<t.length;n++){var r=t[n],i=new o.TreeNode;e.addNode(i),this._parseTreeNode(i,r)}return o.Utils.generateTreeNodeIds(e),e},t.prototype.spansTime=function(e){var t=this.getDuration();return!!(t&&e>=t.start&&e<=t.end)},t.prototype._parseTreeNode=function(e,t){e.label=o.LanguageMap.getValue(t.getLabel(),this.options.locale),e.data=t,e.data.type=o.Utils.normaliseType(o.TreeNodeType.RANGE),t.treeNode=e;var n=t.getRanges();if(n&&n.length)for(var r=0;r<n.length;r++){var i=n[r];if(i.getBehavior()!==a.Behavior.NO_NAV){var s=new o.TreeNode;e.addNode(s),this._parseTreeNode(s,i)}}},t}(o.ManifestResource);t.Range=s},function(e,t,n){"use strict";var r,i=this&&this.__extends||(r=function(e,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)},function(e,t){function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)});Object.defineProperty(t,"__esModule",{value:!0});var o=function(e){function t(t,n){return e.call(this,t,n)||this}return i(t,e),t.prototype.getFormat=function(){return this.getProperty("format")},t}(n(0).ManifestResource);t.Rendering=o},function(e,t,n){"use strict";var r,i=this&&this.__extends||(r=function(e,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)},function(e,t){function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)});Object.defineProperty(t,"__esModule",{value:!0});var o=n(1),a=n(0),s=function(e){function t(t,n){var r=e.call(this,t,n)||this;return r.items=[],r._thumbnails=null,r}return i(t,e),t.prototype.getCanvases=function(){if(this.items.length)return this.items;var e=this.__jsonld.canvases||this.__jsonld.elements;if(e)for(var t=0;t<e.length;t++){var n=e[t];(r=new a.Canvas(n,this.options)).index=t,this.items.push(r)}else if(this.__jsonld)for(t=0;t<this.__jsonld.length;t++){var r;n=this.__jsonld[t],(r=new a.Canvas(n,this.options)).index=t,this.items.push(r)}return this.items},t.prototype.getCanvasById=function(e){for(var t=0;t<this.getTotalCanvases();t++){var n=this.getCanvasByIndex(t),r=a.Utils.normaliseUrl(n.id);if(a.Utils.normaliseUrl(e)===r)return n}return null},t.prototype.getCanvasByIndex=function(e){return this.getCanvases()[e]},t.prototype.getCanvasIndexById=function(e){for(var t=0;t<this.getTotalCanvases();t++)if(this.getCanvasByIndex(t).id===e)return t;return null},t.prototype.getCanvasIndexByLabel=function(e,t){e=e.trim(),isNaN(e)||(e=parseInt(e,10).toString(),t&&(e+="r"));for(var n,r,i,o=/(\d*)\D+(\d*)/,s=0;s<this.getTotalCanvases();s++){var u=this.getCanvasByIndex(s);if(a.LanguageMap.getValue(u.getLabel(),this.options.locale)===e)return s;if((n=o.exec(e))&&(r=n[1],(i=n[2])&&new RegExp("^"+r+"\\D+"+i+"$").test(u.getLabel().toString())))return s}return-1},t.prototype.getLastCanvasLabel=function(e){for(var t=this.getTotalCanvases()-1;t>=0;t--){var n=this.getCanvasByIndex(t),r=a.LanguageMap.getValue(n.getLabel(),this.options.locale);if(e){if(/^[a-zA-Z0-9]*$/.test(r))return r}else if(r)return r}return this.options.defaultLabel},t.prototype.getLastPageIndex=function(){return this.getTotalCanvases()-1},t.prototype.getNextPageIndex=function(e,t){var n;if(t){var r=this.getPagedIndices(e),i=this.getViewingDirection();n=i&&i===o.ViewingDirection.RIGHT_TO_LEFT?r[0]+1:r[r.length-1]+1}else n=e+1;return n>this.getLastPageIndex()?-1:n},t.prototype.getPagedIndices=function(e,t){var n=[];if(t){n=this.isFirstCanvas(e)||this.isLastCanvas(e)?[e]:e%2?[e,e+1]:[e-1,e];var r=this.getViewingDirection();r&&r===o.ViewingDirection.RIGHT_TO_LEFT&&(n=n.reverse())}else n.push(e);return n},t.prototype.getPrevPageIndex=function(e,t){var n;if(t){var r=this.getPagedIndices(e),i=this.getViewingDirection();n=i&&i===o.ViewingDirection.RIGHT_TO_LEFT?r[r.length-1]-1:r[0]-1}else n=e-1;return n},t.prototype.getStartCanvasIndex=function(){var e=this.getStartCanvas();if(e)for(var t=0;t<this.getTotalCanvases();t++)if(this.getCanvasByIndex(t).id===e)return t;return 0},t.prototype.getThumbs=function(e,t){for(var n=[],r=this.getTotalCanvases(),i=0;i<r;i++){var o=this.getCanvasByIndex(i),s=new a.Thumb(e,o);n.push(s)}return n},t.prototype.getThumbnails=function(){if(null!=this._thumbnails)return this._thumbnails;this._thumbnails=[];for(var e=this.getCanvases(),t=0;t<e.length;t++){var n=e[t].getThumbnail();n&&this._thumbnails.push(n)}return this._thumbnails},t.prototype.getStartCanvas=function(){return this.getProperty("startCanvas")},t.prototype.getTotalCanvases=function(){return this.getCanvases().length},t.prototype.getViewingDirection=function(){return this.getProperty("viewingDirection")?this.getProperty("viewingDirection"):this.options.resource.getViewingDirection?this.options.resource.getViewingDirection():null},t.prototype.getViewingHint=function(){return this.getProperty("viewingHint")},t.prototype.isCanvasIndexOutOfRange=function(e){return e>this.getTotalCanvases()-1},t.prototype.isFirstCanvas=function(e){return 0===e},t.prototype.isLastCanvas=function(e){return e===this.getTotalCanvases()-1},t.prototype.isMultiCanvas=function(){return this.getTotalCanvases()>1},t.prototype.isPagingEnabled=function(){var e=this.getViewingHint();return!!e&&e===o.ViewingHint.PAGED},t.prototype.isTotalCanvasesEven=function(){return this.getTotalCanvases()%2==0},t}(a.ManifestResource);t.Sequence=s},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),i=function(){function e(){}return e.parse=function(e,t){return"string"==typeof e&&(e=JSON.parse(e)),this.parseJson(e,t)},e.parseJson=function(e,t){var n;if(t&&t.navDate&&!isNaN(t.navDate.getTime())&&(e.navDate=t.navDate.toString()),e["@type"])switch(e["@type"]){case"sc:Collection":n=this.parseCollection(e,t);break;case"sc:Manifest":n=this.parseManifest(e,t);break;default:return null}else switch(e.type){case"Collection":n=this.parseCollection(e,t);break;case"Manifest":n=this.parseManifest(e,t);break;default:return null}return n.isLoaded=!0,n},e.parseCollection=function(e,t){var n=new r.Collection(e,t);return t?(n.index=t.index||0,t.resource&&(n.parentCollection=t.resource.parentCollection)):n.index=0,this.parseCollections(n,t),this.parseManifests(n,t),this.parseItems(n,t),n},e.parseCollections=function(e,t){var n;if(e.__jsonld.collections?n=e.__jsonld.collections:e.__jsonld.items&&(n=e.__jsonld.items.filter((function(e){return"collection"===e.type.toLowerCase()}))),n)for(var r=0;r<n.length;r++){t&&(t.index=r);var i=this.parseCollection(n[r],t);i.index=r,i.parentCollection=e,e.items.push(i)}},e.parseManifest=function(e,t){return new r.Manifest(e,t)},e.parseManifests=function(e,t){var n;if(e.__jsonld.manifests?n=e.__jsonld.manifests:e.__jsonld.items&&(n=e.__jsonld.items.filter((function(e){return"manifest"===e.type.toLowerCase()}))),n)for(var r=0;r<n.length;r++){var i=this.parseManifest(n[r],t);i.index=r,i.parentCollection=e,e.items.push(i)}},e.parseItem=function(e,t){if(e["@type"]){if("sc:manifest"===e["@type"].toLowerCase())return this.parseManifest(e,t);if("sc:collection"===e["@type"].toLowerCase())return this.parseCollection(e,t)}else if(e.type){if("manifest"===e.type.toLowerCase())return this.parseManifest(e,t);if("collection"===e.type.toLowerCase())return this.parseCollection(e,t)}return null},e.parseItems=function(e,t){var n=e.__jsonld.members||e.__jsonld.items;if(n)for(var r=function(r){t&&(t.index=r);var o=i.parseItem(n[r],t);return o?e.items.filter((function(e){return e.id===o.id}))[0]?"continue":(o.index=r,o.parentCollection=e,void e.items.push(o)):{value:void 0}},i=this,o=0;o<n.length;o++){var a=r(o);if("object"==typeof a)return a.value}},e}();t.Deserialiser=i},function(e,t,n){"use strict";var r,i=this&&this.__extends||(r=function(e,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)},function(e,t){function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)});Object.defineProperty(t,"__esModule",{value:!0});var o=n(0),a=function(e){function t(t,n){return e.call(this,t,n)||this}return i(t,e),t.prototype.getProfile=function(){var e=this.getProperty("profile");return e||(e=this.getProperty("dcterms:conformsTo")),Array.isArray(e)?e[0]:e},t.prototype.getConfirmLabel=function(){return o.Utils.getLocalisedValue(this.getProperty("confirmLabel"),this.options.locale)},t.prototype.getDescription=function(){return o.Utils.getLocalisedValue(this.getProperty("description"),this.options.locale)},t.prototype.getFailureDescription=function(){return o.Utils.getLocalisedValue(this.getProperty("failureDescription"),this.options.locale)},t.prototype.getFailureHeader=function(){return o.Utils.getLocalisedValue(this.getProperty("failureHeader"),this.options.locale)},t.prototype.getHeader=function(){return o.Utils.getLocalisedValue(this.getProperty("header"),this.options.locale)},t.prototype.getServiceLabel=function(){return o.Utils.getLocalisedValue(this.getProperty("label"),this.options.locale)},t.prototype.getInfoUri=function(){var e=this.id;return e.endsWith("/")||(e+="/"),e+"info.json"},t}(o.ManifestResource);t.Service=a},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Size=function(e,t){this.width=e,this.height=t}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){e[e.AUTHORIZATION_FAILED=1]="AUTHORIZATION_FAILED",e[e.FORBIDDEN=2]="FORBIDDEN",e[e.INTERNAL_SERVER_ERROR=3]="INTERNAL_SERVER_ERROR",e[e.RESTRICTED=4]="RESTRICTED"}(t.StatusCode||(t.StatusCode={}))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0);t.Thumb=function(e,t){this.data=t,this.index=t.index,this.width=e;var n=t.getHeight()/t.getWidth();this.height=n?Math.floor(this.width*n):e,this.uri=t.getCanonicalImageUri(e),this.label=r.LanguageMap.getValue(t.getLabel())}},function(e,t,n){"use strict";var r,i=this&&this.__extends||(r=function(e,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)},function(e,t){function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)});Object.defineProperty(t,"__esModule",{value:!0});var o=function(e){function t(t,n){return e.call(this,t,n)||this}return i(t,e),t}(n(0).Resource);t.Thumbnail=o},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),i=function(){function e(e,t){this.label=e,this.data=t||{},this.nodes=[]}return e.prototype.addNode=function(e){this.nodes.push(e),e.parentNode=this},e.prototype.isCollection=function(){return this.data.type===r.Utils.normaliseType(r.TreeNodeType.COLLECTION)},e.prototype.isManifest=function(){return this.data.type===r.Utils.normaliseType(r.TreeNodeType.MANIFEST)},e.prototype.isRange=function(){return this.data.type===r.Utils.normaliseType(r.TreeNodeType.RANGE)},e}();t.TreeNode=i},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){e.COLLECTION="collection",e.MANIFEST="manifest",e.RANGE="range"}(t.TreeNodeType||(t.TreeNodeType={}))},function(e,t,n){!function(e,t,n,r,i){"use strict";t=t&&t.hasOwnProperty("default")?t.default:t,n=n&&n.hasOwnProperty("default")?n.default:n,r=r&&r.hasOwnProperty("default")?r.default:r,i=i&&i.hasOwnProperty("default")?i.default:i;class o extends Error{constructor({networkError:e,status:t,statusText:n,body:r,url:i,init:a},...s){super(...s),Error.captureStackTrace&&Error.captureStackTrace(this,o),this.name="FetchError",this.status=t,this.statusText=n,this.body=r,this.url=i,this.init=a,this.networkError=e,this.url&&(this.message=`error while fetching ${this.url}\n\nstatus: ${this.status}\n\ninit: ${JSON.stringify(a,void 0,2)}\n\nbody: ${JSON.stringify(r,void 0,2)}\n`)}}const a="undefined"!=typeof fetch,s=a?fetch:t(r),u=a?Headers:r.Headers,l=a?Request:r.Request,c=a?Response:r.Response,p=a?FormData:n,f=a?URL:i.URL,h=a?URLSearchParams:i.URLSearchParams,d=new RegExp("^application/(.*\\+)?json"),g=new RegExp("^application/(.*\\+)?xml");e.FetchError=o,e.FormData=p,e.Headers=u,e.Request=l,e.Response=c,e.URL=f,e.URLSearchParams=h,e.fetch=s,e.request=async function(e,t){let n;try{n=await s(e,t)}catch(e){throw new o({networkError:{message:e.message}})}const r=await async function(e){const{headers:t}=e,n=t.get("Content-Type");let r="blob";n?n.startsWith("text/")||g.test(n)?r="text":d.test(n)&&(r="json"):r="blob";const i=e[r](),o=await i;return{status:e.status,statusText:e.statusText,ok:e.ok,body:o}}(n);if(!r.ok)throw new o({status:r.status,statusText:r.statusText,body:r.body,url:e});return r.body},Object.defineProperty(e,"__esModule",{value:!0})}(t,n(33),n(34),n(35),n(36))},function(e,t){e.exports=r},function(e,t){e.exports=i},function(e,t){e.exports=o},function(e,t){e.exports=a},function(e,t,n){window,e.exports=function(e){var t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(r,i,function(t){return e[t]}.bind(null,i));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){e.exports=n(1)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.CONTINUE=100,t.SWITCHING_PROTOCOLS=101,t.PROCESSING=102,t.OK=200,t.CREATED=201,t.ACCEPTED=202,t.NON_AUTHORITATIVE_INFORMATION=203,t.NO_CONTENT=204,t.RESET_CONTENT=205,t.PARTIAL_CONTENT=206,t.MULTI_STATUS=207,t.MULTIPLE_CHOICES=300,t.MOVED_PERMANENTLY=301,t.MOVED_TEMPORARILY=302,t.SEE_OTHER=303,t.NOT_MODIFIED=304,t.USE_PROXY=305,t.TEMPORARY_REDIRECT=307,t.BAD_REQUEST=400,t.UNAUTHORIZED=401,t.PAYMENT_REQUIRED=402,t.FORBIDDEN=403,t.NOT_FOUND=404,t.METHOD_NOT_ALLOWED=405,t.NOT_ACCEPTABLE=406,t.PROXY_AUTHENTICATION_REQUIRED=407,t.REQUEST_TIME_OUT=408,t.CONFLICT=409,t.GONE=410,t.LENGTH_REQUIRED=411,t.PRECONDITION_FAILED=412,t.REQUEST_ENTITY_TOO_LARGE=413,t.REQUEST_URI_TOO_LARGE=414,t.UNSUPPORTED_MEDIA_TYPE=415,t.REQUESTED_RANGE_NOT_SATISFIABLE=416,t.EXPECTATION_FAILED=417,t.IM_A_TEAPOT=418,t.UNPROCESSABLE_ENTITY=422,t.LOCKED=423,t.FAILED_DEPENDENCY=424,t.UNORDERED_COLLECTION=425,t.UPGRADE_REQUIRED=426,t.PRECONDITION_REQUIRED=428,t.TOO_MANY_REQUESTS=429,t.REQUEST_HEADER_FIELDS_TOO_LARGE=431,t.INTERNAL_SERVER_ERROR=500,t.NOT_IMPLEMENTED=501,t.BAD_GATEWAY=502,t.SERVICE_UNAVAILABLE=503,t.GATEWAY_TIME_OUT=504,t.HTTP_VERSION_NOT_SUPPORTED=505,t.VARIANT_ALSO_NEGOTIATES=506,t.INSUFFICIENT_STORAGE=507,t.BANDWIDTH_LIMIT_EXCEEDED=509,t.NOT_EXTENDED=510,t.NETWORK_AUTHENTICATION_REQUIRED=511}])}]))},function(e,t,n){window,e.exports=function(e){var t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(r,i,function(t){return e[t]}.bind(null,i));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){e.exports=n(1)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.CONTINUE=100,t.SWITCHING_PROTOCOLS=101,t.PROCESSING=102,t.OK=200,t.CREATED=201,t.ACCEPTED=202,t.NON_AUTHORITATIVE_INFORMATION=203,t.NO_CONTENT=204,t.RESET_CONTENT=205,t.PARTIAL_CONTENT=206,t.MULTI_STATUS=207,t.MULTIPLE_CHOICES=300,t.MOVED_PERMANENTLY=301,t.MOVED_TEMPORARILY=302,t.SEE_OTHER=303,t.NOT_MODIFIED=304,t.USE_PROXY=305,t.TEMPORARY_REDIRECT=307,t.BAD_REQUEST=400,t.UNAUTHORIZED=401,t.PAYMENT_REQUIRED=402,t.FORBIDDEN=403,t.NOT_FOUND=404,t.METHOD_NOT_ALLOWED=405,t.NOT_ACCEPTABLE=406,t.PROXY_AUTHENTICATION_REQUIRED=407,t.REQUEST_TIME_OUT=408,t.CONFLICT=409,t.GONE=410,t.LENGTH_REQUIRED=411,t.PRECONDITION_FAILED=412,t.REQUEST_ENTITY_TOO_LARGE=413,t.REQUEST_URI_TOO_LARGE=414,t.UNSUPPORTED_MEDIA_TYPE=415,t.REQUESTED_RANGE_NOT_SATISFIABLE=416,t.EXPECTATION_FAILED=417,t.IM_A_TEAPOT=418,t.UNPROCESSABLE_ENTITY=422,t.LOCKED=423,t.FAILED_DEPENDENCY=424,t.UNORDERED_COLLECTION=425,t.UPGRADE_REQUIRED=426,t.PRECONDITION_REQUIRED=428,t.TOO_MANY_REQUESTS=429,t.REQUEST_HEADER_FIELDS_TOO_LARGE=431,t.INTERNAL_SERVER_ERROR=500,t.NOT_IMPLEMENTED=501,t.BAD_GATEWAY=502,t.SERVICE_UNAVAILABLE=503,t.GATEWAY_TIME_OUT=504,t.HTTP_VERSION_NOT_SUPPORTED=505,t.VARIANT_ALSO_NEGOTIATES=506,t.INSUFFICIENT_STORAGE=507,t.BANDWIDTH_LIMIT_EXCEEDED=509,t.NOT_EXTENDED=510,t.NETWORK_AUTHENTICATION_REQUIRED=511}])},function(e,t,n){e.exports=n(3)},function(e,t,n){"use strict";var r,i=this&&this.__extends||(r=function(e,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)},function(e,t){function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)});Object.defineProperty(t,"__esModule",{value:!0});var o=n(0),a=n(9),s=function(e){function t(t){var n=e.call(this,t)||this;return n._data=n.data(),n._data=n.options.data,n._init(),n._resize(),n}return i(t,e),t.prototype._init=function(){e.prototype._init.call(this),this._$element=$(this.el);var t=this;return this._$tree=$('<ul class="tree"></ul>'),this._$element.append(this._$tree),$.templates({pageTemplate:"{^{for nodes}}\t\t\t\t\t{^{tree/}}\t\t\t\t{{/for}}",treeTemplate:'<li>\t\t\t\t\t\t{^{if nodes && nodes.length}}\t\t\t\t\t\t\t<div class="toggle" data-link="class{merge:expanded toggle=\'expanded\'}"></div>\t\t\t\t\t\t{{else}}\t\t\t\t\t\t<div class="spacer"></div>\t\t\t\t\t\t{{/if}}\t\t\t\t\t\t{^{if multiSelectEnabled}}\t\t\t\t\t\t\t<input id="tree-checkbox-{{>id}}" type="checkbox" data-link="checked{:multiSelected ? \'checked\' : \'\'}" class="multiSelect" />\t\t\t\t\t\t{{/if}}\t\t\t\t\t\t{^{if selected}}\t\t\t\t\t\t\t<a id="tree-link-{{>id}}" href="#" title="{{>label}}" class="selected">{{>label}}</a>\t\t\t\t\t\t{{else}}\t\t\t\t\t\t\t<a id="tree-link-{{>id}}" href="#" title="{{>label}}">{{>label}}</a>\t\t\t\t\t\t{{/if}}\t\t\t\t</li>\t\t\t\t{^{if expanded}}\t\t\t\t\t<li>\t\t\t\t\t\t\t<ul>\t\t\t\t\t\t\t\t\t{^{for nodes}}\t\t\t\t\t\t\t\t\t\t{^{tree/}}\t\t\t\t\t\t\t\t\t{{/for}}\t\t\t\t\t\t\t</ul>\t\t\t\t\t</li>\t\t\t\t{{/if}}'}),$.views.tags({tree:{toggleExpanded:function(){var e=this.data;t._setNodeExpanded(e,!e.expanded)},toggleMultiSelect:function(){var e=this.data;if(t._setNodeMultiSelected(e,!e.multiSelected),e.isRange()){var n=t._getMultiSelectState();n&&n.selectRange(e.data,e.multiSelected)}t.fire(u.TREE_NODE_MULTISELECTED,e)},init:function(e,t,n){this.data=e.view.data},onAfterLink:function(){var e=this;e.contents("li").first().on("click",".toggle",(function(){e.toggleExpanded()})).on("click","a",(function(n){n.preventDefault();var r=e.data;r.nodes.length&&t._data.branchNodesExpandOnClick&&e.toggleExpanded(),r.multiSelectEnabled?e.toggleMultiSelect():r.nodes.length?t._data.branchNodesSelectable&&(t.fire(u.TREE_NODE_SELECTED,r),t.selectNode(r)):(t.fire(u.TREE_NODE_SELECTED,r),t.selectNode(r))})).on("click","input.multiSelect",(function(t){e.toggleMultiSelect()}))},template:$.templates.treeTemplate}}),!0},t.prototype.set=function(e){var t=this;if(this._data=Object.assign(this._data,e),this._data.helper){this._rootNode=this._data.helper.getTree(this._data.topRangeIndex,this._data.treeSortType),this._flattenedTree=null,this._multiSelectableNodes=null,this._$tree.link($.templates.pageTemplate,this._rootNode);var n=this._getMultiSelectState();if(n)for(var r=function(e){var t=n.ranges[e],r=i._getMultiSelectableNodes().filter((function(e){return e.data.id===t.id}))[0];r&&(i._setNodeMultiSelectEnabled(r,t.multiSelectEnabled),i._setNodeMultiSelected(r,t.multiSelected))},i=this,o=0;o<n.ranges.length;o++)r(o);if(this._data.autoExpand)this.getAllNodes().forEach((function(e,n){t._setNodeExpanded(e,!0)}))}},t.prototype._getMultiSelectState=function(){return this._data.helper?this._data.helper.getMultiSelectState():null},t.prototype.data=function(){return{autoExpand:!1,branchNodesExpandOnClick:!0,branchNodesSelectable:!0,helper:null,topRangeIndex:0,treeSortType:a.TreeSortType.NONE}},t.prototype.allNodesSelected=function(){var e=this._getMultiSelectableNodes(),t=this.getMultiSelectedNodes();return e.length===t.length},t.prototype._getMultiSelectableNodes=function(){var e=this;if(this._multiSelectableNodes)return this._multiSelectableNodes;var t=this.getAllNodes();return t?this._multiSelectableNodes=t.filter((function(t){return e._nodeIsMultiSelectable(t)})):[]},t.prototype._nodeIsMultiSelectable=function(e){return!!(e.data.type===o.TreeNodeType.MANIFEST&&e.nodes&&e.nodes.length>0||e.data.type===o.TreeNodeType.RANGE)},t.prototype.getAllNodes=function(){return this._flattenedTree?this._flattenedTree:this._data.helper?this._flattenedTree=this._data.helper.getFlattenedTree(this._rootNode):[]},t.prototype.getMultiSelectedNodes=function(){var e=this;return this.getAllNodes().filter((function(t){return e._nodeIsMultiSelectable(t)&&t.multiSelected}))},t.prototype.getNodeById=function(e){return this.getAllNodes().filter((function(t){return t.id===e}))[0]},t.prototype.expandParents=function(e,t){e&&e.parentNode&&(this._setNodeExpanded(e.parentNode,t),this.expandParents(e.parentNode,t))},t.prototype._setNodeSelected=function(e,t){$.observable(e).setProperty("selected",t)},t.prototype._setNodeExpanded=function(e,t){$.observable(e).setProperty("expanded",t)},t.prototype._setNodeMultiSelected=function(e,t){$.observable(e).setProperty("multiSelected",t)},t.prototype._setNodeMultiSelectEnabled=function(e,t){$.observable(e).setProperty("multiSelectEnabled",t)},t.prototype.selectPath=function(e){if(this._rootNode){var t=e.split("/");t.length>=1&&t.shift();var n=this.getNodeByPath(this._rootNode,t);this.selectNode(n)}},t.prototype.deselectCurrentNode=function(){this.selectedNode&&this._setNodeSelected(this.selectedNode,!1)},t.prototype.selectNode=function(e){this._rootNode&&(this.deselectCurrentNode(),this.selectedNode=e,this._setNodeSelected(this.selectedNode,!0))},t.prototype.expandNode=function(e,t){this._rootNode&&this._setNodeExpanded(e,t)},t.prototype.getNodeByPath=function(e,t){if(0===t.length)return e;var n=Number(t.shift()),r=e.nodes[n];return this.getNodeByPath(r,t)},t.prototype.show=function(){this._$element.show()},t.prototype.hide=function(){this._$element.hide()},t.prototype._resize=function(){},t}(n(8).BaseComponent);t.TreeComponent=s;var u=function(){function e(){}return e.TREE_NODE_MULTISELECTED="treeNodeMultiSelected",e.TREE_NODE_SELECTED="treeNodeSelected",e}();t.Events=u},function(t,n){t.exports=e},function(e,n){e.exports=t},function(e,t){e.exports=n},function(e,t){e.exports=r},function(e,t,n){"use strict";n.r(t),n.d(t,"BaseComponent",(function(){return r}));var r=function(){function e(e){this.options=e,this.options.data=Object.assign({},this.data(),e.data)}return e.prototype._init=function(){return this.el=this.options.target,this.el?(this.el.innerHTML="",!0):(console.warn("element not found"),!1)},e.prototype.data=function(){return{}},e.prototype.on=function(e,t,n){var r=this._e||(this._e={});(r[e]||(r[e]=[])).push({fn:t,ctx:n})},e.prototype.fire=function(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];for(var r=[].slice.call(arguments,1),i=((this._e||(this._e={}))[e]||[]).slice(),o=0,a=i.length;o<a;o++)i[o].fn.apply(i[o].ctx,r)},e.prototype._resize=function(){},e.prototype.set=function(e){},e}()},function(e,t,n){"use strict";n.r(t);var r,i,o,a,s,u,l,c,p,f,h=function(e){this.isVisible=!0;var t=e.on.match(/.*xywh=(\d*),(\d*),(\d*),(\d*)/);this.x=Number(t[1]),this.y=Number(t[2]),this.width=Number(t[3]),this.height=Number(t[4]),this.chars=e.resource.chars},d=function(){function e(e,t){this.rects=[],this.canvasIndex=t,this.addRect(e)}return e.prototype.addRect=function(e){var t=new h(e);t.canvasIndex=this.canvasIndex,t.index=this.rects.length,this.rects.push(t),this.rects.sort((function(e,t){return e.index-t.index}))},e}(),g=n(0),_=function(){function e(){this.isEnabled=!1,this.ranges=[],this.canvases=[]}return e.prototype.allCanvasesSelected=function(){return this.canvases.length>0&&this.getAllSelectedCanvases().length===this.canvases.length},e.prototype.allRangesSelected=function(){return this.ranges.length>0&&this.getAllSelectedRanges().length===this.ranges.length},e.prototype.allSelected=function(){return this.allRangesSelected()&&this.allCanvasesSelected()},e.prototype.getAll=function(){return this.canvases.concat(this.ranges)},e.prototype.getAllSelectedCanvases=function(){return this.canvases.filter((function(e){return e.multiSelected}))},e.prototype.getAllSelectedRanges=function(){return this.ranges.filter((function(e){return e.multiSelected}))},e.prototype.getCanvasById=function(e){return this.canvases.filter((function(t){return g.Utils.normaliseUrl(t.id)===g.Utils.normaliseUrl(e)}))[0]},e.prototype.getCanvasesByIds=function(e){for(var t=[],n=0;n<e.length;n++){var r=e[n];t.push(this.getCanvasById(r))}return t},e.prototype.getRangeCanvases=function(e){var t=e.getCanvasIds();return this.getCanvasesByIds(t)},e.prototype.selectAll=function(e){this.selectRanges(this.ranges,e),this.selectCanvases(this.canvases,e)},e.prototype.selectCanvas=function(e,t){this.canvases.filter((function(t){return t.id===e.id}))[0].multiSelected=t},e.prototype.selectAllCanvases=function(e){this.selectCanvases(this.canvases,e)},e.prototype.selectCanvases=function(e,t){for(var n=0;n<e.length;n++){e[n].multiSelected=t}},e.prototype.selectRange=function(e,t){var n=this.ranges.filter((function(t){return t.id===e.id}))[0];n.multiSelected=t;var r=this.getRangeCanvases(n);this.selectCanvases(r,t)},e.prototype.selectAllRanges=function(e){this.selectRanges(this.ranges,e)},e.prototype.selectRanges=function(e,t){for(var n=0;n<e.length;n++){var r=e[n];r.multiSelected=t;var i=this.getCanvasesByIds(r.getCanvasIds());this.selectCanvases(i,t)}},e.prototype.setEnabled=function(e){this.isEnabled=e;for(var t=this.getAll(),n=0;n<t.length;n++){var r=t[n];r.multiSelectEnabled=this.isEnabled,e||(r.multiSelected=!1)}},e}(),v=function(){function e(e,t){this.items=[],this.resource=e,this.label=t}return e.prototype.addItem=function(e){this.items.push(e)},e.prototype.addMetadata=function(e,t){void 0===t&&(t=!1);for(var n=0;n<e.length;n++){var r=e[n];r.isRootLevel=t,this.addItem(r)}},e}();!function(e){e.DATE="date",e.NONE="none"}(r||(r={})),function(e){e.BOOKMARKING="oa:bookmarking",e.CLASSIFYING="oa:classifying",e.COMMENTING="oa:commenting",e.DESCRIBING="oa:describing",e.EDITING="oa:editing",e.HIGHLIGHTING="oa:highlighting",e.IDENTIFYING="oa:identifying",e.LINKING="oa:linking",e.MODERATING="oa:moderating",e.PAINTING="sc:painting",e.QUESTIONING="oa:questioning",e.REPLYING="oa:replying",e.TAGGING="oa:tagging",e.TRANSCRIBING="oad:transcribing"}(i||(i={})),function(e){e.AUTO_ADVANCE="auto-advance",e.CONTINUOUS="continuous",e.FACING_PAGES="facing-pages",e.HIDDEN="hidden",e.INDIVIDUALS="individuals",e.MULTI_PART="multi-part",e.NO_NAV="no-nav",e.NON_PAGED="non-paged",e.PAGED="paged",e.REPEAT="repeat",e.SEQUENCE="sequence",e.THUMBNAIL_NAV="thumbnail-nav",e.TOGETHER="together",e.UNORDERED="unordered"}(o||(o={})),function(e){e.CANVAS="canvas",e.CHOICE="choice",e.CONTENT_AS_TEXT="contentastext",e.DOCUMENT="document",e.IMAGE="image",e.MOVING_IMAGE="movingimage",e.PDF="pdf",e.PHYSICAL_OBJECT="physicalobject",e.SOUND="sound",e.TEXTUALBODY="textualbody",e.VIDEO="video"}(a||(a={})),function(e){e.ANNOTATION="annotation",e.CANVAS="canvas",e.COLLECTION="collection",e.MANIFEST="manifest",e.RANGE="range",e.SEQUENCE="sequence"}(s||(s={})),function(e){e.AUDIO_MP4="audio/mp4",e.CORTO="application/corto",e.DRACO="application/draco",e.GLTF="model/gltf+json",e.JPG="image/jpeg",e.M3U8="application/vnd.apple.mpegurl",e.MP3="audio/mp3",e.MPEG_DASH="application/dash+xml",e.OBJ="text/plain",e.PDF="application/pdf",e.PLY="application/ply",e.THREEJS="application/vnd.threejs+json",e.VIDEO_MP4="video/mp4",e.WEBM="video/webm"}(u||(u={})),function(e){e.DOC="application/msword",e.DOCX="application/vnd.openxmlformats-officedocument.wordprocessingml.document",e.PDF="application/pdf"}(l||(l={})),function(e){e.IMAGE_0_COMPLIANCE_LEVEL_0="http://library.stanford.edu/iiif/image-api/compliance.html#level0",e.IMAGE_0_COMPLIANCE_LEVEL_1="http://library.stanford.edu/iiif/image-api/compliance.html#level1",e.IMAGE_0_COMPLIANCE_LEVEL_2="http://library.stanford.edu/iiif/image-api/compliance.html#level2",e.IMAGE_0_CONFORMANCE_LEVEL_0="http://library.stanford.edu/iiif/image-api/conformance.html#level0",e.IMAGE_0_CONFORMANCE_LEVEL_1="http://library.stanford.edu/iiif/image-api/conformance.html#level1",e.IMAGE_0_CONFORMANCE_LEVEL_2="http://library.stanford.edu/iiif/image-api/conformance.html#level2",e.IMAGE_1_COMPLIANCE_LEVEL_0="http://library.stanford.edu/iiif/image-api/1.1/compliance.html#level0",e.IMAGE_1_COMPLIANCE_LEVEL_1="http://library.stanford.edu/iiif/image-api/1.1/compliance.html#level1",e.IMAGE_1_COMPLIANCE_LEVEL_2="http://library.stanford.edu/iiif/image-api/1.1/compliance.html#level2",e.IMAGE_1_CONFORMANCE_LEVEL_0="http://library.stanford.edu/iiif/image-api/1.1/conformance.html#level0",e.IMAGE_1_CONFORMANCE_LEVEL_1="http://library.stanford.edu/iiif/image-api/1.1/conformance.html#level1",e.IMAGE_1_CONFORMANCE_LEVEL_2="http://library.stanford.edu/iiif/image-api/1.1/conformance.html#level2",e.IMAGE_1_LEVEL_0="http://iiif.io/api/image/1/level0.json",e.IMAGE_1_PROFILE_LEVEL_0="http://iiif.io/api/image/1/profiles/level0.json",e.IMAGE_1_LEVEL_1="http://iiif.io/api/image/1/level1.json",e.IMAGE_1_PROFILE_LEVEL_1="http://iiif.io/api/image/1/profiles/level1.json",e.IMAGE_1_LEVEL_2="http://iiif.io/api/image/1/level2.json",e.IMAGE_1_PROFILE_LEVEL_2="http://iiif.io/api/image/1/profiles/level2.json",e.IMAGE_2_LEVEL_0="http://iiif.io/api/image/2/level0.json",e.IMAGE_2_PROFILE_LEVEL_0="http://iiif.io/api/image/2/profiles/level0.json",e.IMAGE_2_LEVEL_1="http://iiif.io/api/image/2/level1.json",e.IMAGE_2_PROFILE_LEVEL_1="http://iiif.io/api/image/2/profiles/level1.json",e.IMAGE_2_LEVEL_2="http://iiif.io/api/image/2/level2.json",e.IMAGE_2_PROFILE_LEVEL_2="http://iiif.io/api/image/2/profiles/level2.json",e.AUTH_0_CLICK_THROUGH="http://iiif.io/api/auth/0/login/clickthrough",e.AUTH_0_LOGIN="http://iiif.io/api/auth/0/login",e.AUTH_0_LOGOUT="http://iiif.io/api/auth/0/logout",e.AUTH_0_RESTRICTED="http://iiif.io/api/auth/0/login/restricted",e.AUTH_0_TOKEN="http://iiif.io/api/auth/0/token",e.AUTH_1_CLICK_THROUGH="http://iiif.io/api/auth/1/clickthrough",e.AUTH_1_EXTERNAL="http://iiif.io/api/auth/1/external",e.AUTH_1_KIOSK="http://iiif.io/api/auth/1/kiosk",e.AUTH_1_LOGIN="http://iiif.io/api/auth/1/login",e.AUTH_1_LOGOUT="http://iiif.io/api/auth/1/logout",e.AUTH_1_PROBE="http://iiif.io/api/auth/1/probe",e.AUTH_1_TOKEN="http://iiif.io/api/auth/1/token",e.SEARCH_0="http://iiif.io/api/search/0/search",e.SEARCH_0_AUTO_COMPLETE="http://iiif.io/api/search/0/autocomplete",e.SEARCH_1="http://iiif.io/api/search/1/search",e.SEARCH_1_AUTO_COMPLETE="http://iiif.io/api/search/1/autocomplete",e.TRACKING_EXTENSIONS="http://universalviewer.io/tracking-extensions-profile",e.UI_EXTENSIONS="http://universalviewer.io/ui-extensions-profile",e.PRINT_EXTENSIONS="http://universalviewer.io/print-extensions-profile",e.SHARE_EXTENSIONS="http://universalviewer.io/share-extensions-profile",e.OTHER_MANIFESTATIONS="http://iiif.io/api/otherManifestations.json",e.IXIF="http://wellcomelibrary.org/ld/ixif/0/alpha.json"}(c||(c={})),function(e){e.BOTTOM_TO_TOP="bottom-to-top",e.LEFT_TO_RIGHT="left-to-right",e.RIGHT_TO_LEFT="right-to-left",e.TOP_TO_BOTTOM="top-to-bottom"}(p||(p={})),function(e){e.CONTINUOUS="continuous",e.INDIVIDUALS="individuals",e.NON_PAGED="non-paged",e.PAGED="paged",e.TOP="top"}(f||(f={}));var E=function(){function e(){}return e.manifestNotLoaded="Manifest has not loaded yet",e}(),y=function(){function e(e){this.options=e,this.iiifResource=this.options.iiifResource,this.manifestUri=this.options.manifestUri,this.manifest=this.options.manifest,this.collectionIndex=this.options.collectionIndex||0,this.manifestIndex=this.options.manifestIndex||0,this.sequenceIndex=this.options.sequenceIndex||0,this.canvasIndex=this.options.canvasIndex||0}return e.prototype.getAutoCompleteService=function(){var e=this.getSearchService();return e?e.getService(c.SEARCH_0_AUTO_COMPLETE):null},e.prototype.getAttribution=function(){if(!this.manifest)throw new Error(E.manifestNotLoaded);var e=this.manifest.getAttribution();return e?g.LanguageMap.getValue(e,this.options.locale):null},e.prototype.getCanvases=function(){return this.getCurrentSequence().getCanvases()},e.prototype.getCanvasById=function(e){return this.getCurrentSequence().getCanvasById(e)},e.prototype.getCanvasesById=function(e){for(var t=[],n=0;n<e.length;n++){var r=e[n],i=this.getCanvasById(r);i&&t.push(i)}return t},e.prototype.getCanvasByIndex=function(e){return this.getCurrentSequence().getCanvasByIndex(e)},e.prototype.getCanvasIndexById=function(e){return this.getCurrentSequence().getCanvasIndexById(e)},e.prototype.getCanvasIndexByLabel=function(e){var t=this.getManifestType()===g.ManifestType.MANUSCRIPT;return this.getCurrentSequence().getCanvasIndexByLabel(e,t)},e.prototype.getCanvasRange=function(e,t){var n=this.getCanvasRanges(e);if(t){for(var r=0;r<n.length;r++){var i=n[r];if(i.path===t)return i}return null}return n[0]},e.prototype.getCanvasRanges=function(e){if(!this.manifest)throw new Error(E.manifestNotLoaded);return e.ranges?e.ranges:(e.ranges=this.manifest.getAllRanges().filter((function(t){return t.getCanvasIds().some((function(t){return g.Utils.normaliseUrl(t)===g.Utils.normaliseUrl(e.id)}))})),e.ranges)},e.prototype.getCollectionIndex=function(e){if(!e.parentCollection||e.parentCollection.parentCollection)return e.parentCollection?e.parentCollection.index:void 0},e.prototype.getCurrentCanvas=function(){return this.getCurrentSequence().getCanvasByIndex(this.canvasIndex)},e.prototype.getCurrentSequence=function(){return this.getSequenceByIndex(this.sequenceIndex)},e.prototype.getDescription=function(){if(!this.manifest)throw new Error(E.manifestNotLoaded);var e=this.manifest.getDescription();return e?g.LanguageMap.getValue(e,this.options.locale):null},e.prototype.getLabel=function(){if(!this.manifest)throw new Error(E.manifestNotLoaded);var e=this.manifest.getLabel();return e?g.LanguageMap.getValue(e,this.options.locale):null},e.prototype.getLastCanvasLabel=function(e){return this.getCurrentSequence().getLastCanvasLabel(e)},e.prototype.getFirstPageIndex=function(){return 0},e.prototype.getLastPageIndex=function(){return this.getTotalCanvases()-1},e.prototype.getLicense=function(){if(!this.manifest)throw new Error(E.manifestNotLoaded);return this.manifest.getLicense()},e.prototype.getLogo=function(){if(!this.manifest)throw new Error(E.manifestNotLoaded);return this.manifest.getLogo()},e.prototype.getManifestType=function(){if(!this.manifest)throw new Error(E.manifestNotLoaded);var e=this.manifest.getManifestType();return e===g.ManifestType.EMPTY&&(e=g.ManifestType.MONOGRAPH),e},e.prototype.getMetadata=function(e){if(!this.manifest)throw new Error(E.manifestNotLoaded);var t=[],n=this.manifest.getMetadata(),r=new v(this.manifest),i=this.options.locale;(n&&n.length&&r.addMetadata(n,!0),this.manifest.getDescription().length)&&((s=new g.LabelValuePair(i)).label=[new g.Language("description",i)],s.value=this.manifest.getDescription(),s.isRootLevel=!0,r.addItem(s));this.manifest.getAttribution().length&&((s=new g.LabelValuePair(i)).label=[new g.Language("attribution",i)],s.value=this.manifest.getAttribution(),s.isRootLevel=!0,r.addItem(s));var o=this.manifest.getLicense();if(o){var a={label:"license",value:e&&e.licenseFormatter?e.licenseFormatter.format(o):o};(s=new g.LabelValuePair(i)).parse(a),s.isRootLevel=!0,r.addItem(s)}if(this.manifest.getLogo()){var s;a={label:"logo",value:'<img src="'+this.manifest.getLogo()+'"/>'};(s=new g.LabelValuePair(i)).parse(a),s.isRootLevel=!0,r.addItem(s)}return t.push(r),e?this._parseMetadataOptions(e,t):t},e.prototype.getRequiredStatement=function(){if(!this.manifest)throw new Error(E.manifestNotLoaded);var e=this.manifest.getRequiredStatement();return e?{label:e.getLabel(),value:e.getValue()}:null},e.prototype._parseMetadataOptions=function(e,t){var n=this.getCurrentSequence(),r=n.getMetadata();if(r&&r.length){var i=new v(n);i.addMetadata(r),t.push(i)}if(e.range){var o=this._getRangeMetadata([],e.range);o=o.reverse(),t=t.concat(o)}if(e.canvases&&e.canvases.length)for(var a=0;a<e.canvases.length;a++){var s=e.canvases[a],u=s.getMetadata();if(u&&u.length){var l=new v(s);l.addMetadata(s.getMetadata()),t.push(l)}for(var c=s.getImages(),p=0;p<c.length;p++){var f=c[p],h=f.getMetadata();if(h&&h.length){var d=new v(f);d.addMetadata(h),t.push(d)}}}return t},e.prototype._getRangeMetadata=function(e,t){var n=t.getMetadata();if(n&&n.length){var r=new v(t);r.addMetadata(n),e.push(r)}else if(t.parentRange)return this._getRangeMetadata(e,t.parentRange);return e},e.prototype.getMultiSelectState=function(){return this._multiSelectState||(this._multiSelectState=new _,this._multiSelectState.ranges=this.getRanges().slice(0),this._multiSelectState.canvases=this.getCurrentSequence().getCanvases().slice(0)),this._multiSelectState},e.prototype.getCurrentRange=function(){return this.rangeId?this.getRangeById(this.rangeId):null},e.prototype.getPosterCanvas=function(){if(!this.manifest)throw new Error(E.manifestNotLoaded);return this.manifest.getPosterCanvas()},e.prototype.getPosterImage=function(){var e=this.getPosterCanvas();if(e){var t=e.getContent();if(t&&t.length)return t[0].getBody()[0].id}return null},e.prototype.getPreviousRange=function(e){var t=null;if(t=e||this.getCurrentRange()){var n=this.getFlattenedTree();if(n)for(var r=0;r<n.length;r++){var i=n[r];if(i&&i.data.id===t.id){for(;r>0;){return n[--r].data}break}}}return null},e.prototype.getNextRange=function(e){var t=null;if(t=e||this.getCurrentRange()){var n=this.getFlattenedTree();if(n)for(var r=0;r<n.length;r++){var i=n[r];if(i&&i.data.id===t.id){for(;r<n.length-1;){var o=n[++r];if(o.data.canvases&&o.data.canvases.length)return o.data}break}}}return null},e.prototype.getFlattenedTree=function(e){var t=null;return(t=e||this.getTree())?this._flattenTree(t,"nodes"):null},e.prototype._flattenTree=function(e,t){var n=this,r=[e];return e[t]&&e[t].length>0?r.concat(e[t].map((function(e){return n._flattenTree(e,t)})).reduce((function(e,t){return e.concat(t)}),[])):r},e.prototype.getRanges=function(){return this.manifest.getAllRanges()},e.prototype.getRangeByPath=function(e){if(!this.manifest)throw new Error(E.manifestNotLoaded);return this.manifest.getRangeByPath(e)},e.prototype.getRangeById=function(e){if(!this.manifest)throw new Error(E.manifestNotLoaded);return this.manifest.getRangeById(e)},e.prototype.getRangeCanvases=function(e){var t=e.getCanvasIds();return this.getCanvasesById(t)},e.prototype.getRelated=function(){if(!this.manifest)throw new Error(E.manifestNotLoaded);return this.manifest.getRelated()},e.prototype.getSearchService=function(){if(!this.manifest)throw new Error(E.manifestNotLoaded);return this.manifest.getService(c.SEARCH_0)},e.prototype.getSeeAlso=function(){if(!this.manifest)throw new Error(E.manifestNotLoaded);return this.manifest.getSeeAlso()},e.prototype.getSequenceByIndex=function(e){if(!this.manifest)throw new Error(E.manifestNotLoaded);return this.manifest.getSequenceByIndex(e)},e.prototype.getShareServiceUrl=function(){if(!this.manifest)throw new Error(E.manifestNotLoaded);var e=null,t=this.manifest.getService(c.SHARE_EXTENSIONS);return t&&(t.length&&(t=t[0]),e=t.__jsonld.shareUrl),e},e.prototype._getSortedTreeNodesByDate=function(e,t){var n=this.getFlattenedTree(t);if(n){var r=n.filter((function(e){return e.data.type===g.TreeNodeType.MANIFEST}));this.createDecadeNodes(e,n),this.sortDecadeNodes(e),this.createYearNodes(e,n),this.sortYearNodes(e),this.createMonthNodes(e,r),this.sortMonthNodes(e),this.createDateNodes(e,r),this.pruneDecadeNodes(e)}},e.prototype.getStartCanvasIndex=function(){return this.getCurrentSequence().getStartCanvasIndex()},e.prototype.getThumbs=function(e,t){return this.getCurrentSequence().getThumbs(e,t)},e.prototype.getTopRanges=function(){if(!this.manifest)throw new Error(E.manifestNotLoaded);return this.manifest.getTopRanges()},e.prototype.getTotalCanvases=function(){return this.getCurrentSequence().getTotalCanvases()},e.prototype.getTrackingLabel=function(){if(!this.manifest)throw new Error(E.manifestNotLoaded);return this.manifest.getTrackingLabel()},e.prototype._getTopRanges=function(){return this.iiifResource.getTopRanges()},e.prototype.getTree=function(e,t){if(void 0===e&&(e=0),void 0===t&&(t=r.NONE),!this.iiifResource)return null;var n;if(this.iiifResource.isCollection())n=this.iiifResource.getDefaultTree();else{var i=this._getTopRanges(),o=new g.TreeNode;if(o.label="root",o.data=this.iiifResource,!i.length)return o;n=i[e].getTree(o)}var a=new g.TreeNode;switch(t.toString()){case r.DATE.toString():if(this.treeHasNavDates(n)){this._getSortedTreeNodesByDate(a,n);break}default:a=n}return a},e.prototype.treeHasNavDates=function(e){var t=this.getFlattenedTree(e);return!!t&&t.some((function(e){return!isNaN(e.navDate)}))},e.prototype.getViewingDirection=function(){if(!this.manifest)throw new Error(E.manifestNotLoaded);var e=this.getCurrentSequence().getViewingDirection();return e||(e=this.manifest.getViewingDirection()),e},e.prototype.getViewingHint=function(){if(!this.manifest)throw new Error(E.manifestNotLoaded);var e=this.getCurrentSequence().getViewingHint();return e||(e=this.manifest.getViewingHint()),e},e.prototype.hasParentCollection=function(){if(!this.manifest)throw new Error(E.manifestNotLoaded);return!!this.manifest.parentCollection},e.prototype.hasRelatedPage=function(){var e=this.getRelated();return!!e&&(e.length&&(e=e[0]),"text/html"===e.format)},e.prototype.hasResources=function(){return this.getCurrentCanvas().getResources().length>0},e.prototype.isBottomToTop=function(){var e=this.getViewingDirection();return!!e&&e===p.BOTTOM_TO_TOP},e.prototype.isCanvasIndexOutOfRange=function(e){return this.getCurrentSequence().isCanvasIndexOutOfRange(e)},e.prototype.isContinuous=function(){var e=this.getViewingHint();return!!e&&e===f.CONTINUOUS},e.prototype.isFirstCanvas=function(e){return void 0!==e?this.getCurrentSequence().isFirstCanvas(e):this.getCurrentSequence().isFirstCanvas(this.canvasIndex)},e.prototype.isHorizontallyAligned=function(){return this.isLeftToRight()||this.isRightToLeft()},e.prototype.isLastCanvas=function(e){return void 0!==e?this.getCurrentSequence().isLastCanvas(e):this.getCurrentSequence().isLastCanvas(this.canvasIndex)},e.prototype.isLeftToRight=function(){var e=this.getViewingDirection();return!!e&&e===p.LEFT_TO_RIGHT},e.prototype.isMultiCanvas=function(){return this.getCurrentSequence().isMultiCanvas()},e.prototype.isMultiSequence=function(){if(!this.manifest)throw new Error(E.manifestNotLoaded);return this.manifest.isMultiSequence()},e.prototype.isPaged=function(){if(!this.manifest)throw new Error(E.manifestNotLoaded);var e=this.getViewingHint();return e?e===f.PAGED:this.manifest.isPagingEnabled()},e.prototype.isPagingAvailable=function(){return this.isPagingEnabled()&&this.getTotalCanvases()>2},e.prototype.isPagingEnabled=function(){if(!this.manifest)throw new Error(E.manifestNotLoaded);return this.manifest.isPagingEnabled()||this.getCurrentSequence().isPagingEnabled()},e.prototype.isRightToLeft=function(){var e=this.getViewingDirection();return!!e&&e===p.RIGHT_TO_LEFT},e.prototype.isTopToBottom=function(){var e=this.getViewingDirection();return!!e&&e===p.TOP_TO_BOTTOM},e.prototype.isTotalCanvasesEven=function(){return this.getCurrentSequence().isTotalCanvasesEven()},e.prototype.isUIEnabled=function(e){if(!this.manifest)throw new Error(E.manifestNotLoaded);var t=this.manifest.getService(c.UI_EXTENSIONS);if(t){var n=t.getProperty("disableUI");if(n&&(-1!==n.indexOf(e)||-1!==n.indexOf(e.toLowerCase())))return!1}return!0},e.prototype.isVerticallyAligned=function(){return this.isTopToBottom()||this.isBottomToTop()},e.prototype.createDateNodes=function(e,t){for(var n=0;n<t.length;n++){var r=t[n],i=this.getNodeYear(r),o=this.getNodeMonth(r),a=new g.TreeNode;a.id=r.id,a.label=this.getNodeDisplayDate(r),a.data=r.data,a.data.type=g.TreeNodeType.MANIFEST,a.data.year=i,a.data.month=o;var s=this.getDecadeNode(e,i);if(s){var u=this.getYearNode(s,i);if(u){var l=this.getMonthNode(u,o);l&&l.addNode(a)}}}},e.prototype.createDecadeNodes=function(e,t){for(var n=0;n<t.length;n++){var r=t[n];if(r.navDate){var i=this.getNodeYear(r),o=Number(i.toString().substr(0,3)+"9");if(!this.getDecadeNode(e,i)){var a=new g.TreeNode;a.label=i+" - "+o,a.navDate=r.navDate,a.data.startYear=i,a.data.endYear=o,e.addNode(a)}}}},e.prototype.createMonthNodes=function(e,t){for(var n=0;n<t.length;n++){var r=t[n];if(r.navDate){var i=this.getNodeYear(r),o=this.getNodeMonth(r),a=this.getDecadeNode(e,i),s=null;if(a&&(s=this.getYearNode(a,i)),a&&s&&!this.getMonthNode(s,o)){var u=new g.TreeNode;u.label=this.getNodeDisplayMonth(r),u.navDate=r.navDate,u.data.year=i,u.data.month=o,s.addNode(u)}}}},e.prototype.createYearNodes=function(e,t){for(var n=0;n<t.length;n++){var r=t[n];if(r.navDate){var i=this.getNodeYear(r),o=this.getDecadeNode(e,i);if(o&&!this.getYearNode(o,i)){var a=new g.TreeNode;a.label=i.toString(),a.navDate=r.navDate,a.data.year=i,o.addNode(a)}}}},e.prototype.getDecadeNode=function(e,t){for(var n=0;n<e.nodes.length;n++){var r=e.nodes[n];if(t>=r.data.startYear&&t<=r.data.endYear)return r}return null},e.prototype.getMonthNode=function(e,t){for(var n=0;n<e.nodes.length;n++){var r=e.nodes[n];if(t===this.getNodeMonth(r))return r}return null},e.prototype.getNodeDisplayDate=function(e){return e.navDate.toDateString()},e.prototype.getNodeDisplayMonth=function(e){return["January","February","March","April","May","June","July","August","September","October","November","December"][e.navDate.getMonth()]},e.prototype.getNodeMonth=function(e){return e.navDate.getMonth()},e.prototype.getNodeYear=function(e){return e.navDate.getFullYear()},e.prototype.getYearNode=function(e,t){for(var n=0;n<e.nodes.length;n++){var r=e.nodes[n];if(t===this.getNodeYear(r))return r}return null},e.prototype.pruneDecadeNodes=function(e){for(var t=[],n=0;n<e.nodes.length;n++){var r=e.nodes[n];r.nodes.length||t.push(r)}for(var i=0;i<t.length;i++){var o=t[i],a=e.nodes.indexOf(o);a>-1&&e.nodes.splice(a,1)}},e.prototype.sortDecadeNodes=function(e){e.nodes=e.nodes.sort((function(e,t){return e.data.startYear-t.data.startYear}))},e.prototype.sortMonthNodes=function(e){for(var t=this,n=0;n<e.nodes.length;n++)for(var r=e.nodes[n],i=0;i<r.nodes.length;i++){var o=r.nodes[i];o.nodes=o.nodes.sort((function(e,n){return t.getNodeMonth(e)-t.getNodeMonth(n)}))}},e.prototype.sortYearNodes=function(e){for(var t=this,n=0;n<e.nodes.length;n++){var r=e.nodes[n];r.nodes=r.nodes.sort((function(e,n){return t.getNodeYear(e)-t.getNodeYear(n)}))}},e}(),T=function(){function e(e){this._options=e,this._options.locale=this._options.locale||"en-GB"}return e.prototype.bootstrap=function(e,t){var n=this;return new Promise((function(r,i){e&&t&&(r=e,i=t),g.Utils.loadManifest(n._options.manifestUri).then((function(e){n._loaded(n,e,r,i)}))}))},e.prototype._loaded=function(e,t,n,r){var i=g.Utils.parseManifest(t,{locale:e._options.locale});if(i){e._options.iiifResource||(e._options.iiifResource=i);var o=e._options.collectionIndex,a=e._options.manifestIndex;if(i.getIIIFResourceType()===s.COLLECTION){var u=i.getManifests(),l=i.getCollections();u.length||void 0!==o||(o=0),void 0!==o&&l&&l.length?i.getCollectionByIndex(o).then((function(t){t||r("Collection index not found"),0===t.getTotalManifests()&&0===a&&t.getTotalCollections()>0?(e._options.collectionIndex=0,e._options.manifestUri=t.id,e.bootstrap(n,r)):void 0!==a&&t.getManifestByIndex(a).then((function(t){e._options.manifest=t;var r=new y(e._options);n(r)}))})):i.getManifestByIndex(e._options.manifestIndex).then((function(t){e._options.manifest=t;var r=new y(e._options);n(r)}))}else{e._options.manifest=i;var c=new y(e._options);n(c)}}else console.error("Unable to load IIIF resource")},e}(),I=n(1),O=function(){function e(e,t){this.authHoldingPage=null,this.clickThroughService=null,this.externalService=null,this.isProbed=!1,this.isResponseHandled=!1,this.kioskService=null,this.loginService=null,this.logoutService=null,this.probeService=null,this.restrictedService=null,this.tokenService=null,e.externalResource=this,this.dataUri=this._getDataUri(e),this.index=e.index,this.authAPIVersion=t.authApiVersion,this._parseAuthServices(e),this._parseDimensions(e)}return e.prototype._getImageServiceDescriptor=function(e){for(var t=null,n=0;n<e.length;n++){var r=e[n],i=r.id;i.endsWith("/")||(i+="/"),g.Utils.isImageProfile(r.getProfile())&&(t=i+"info.json")}return t},e.prototype._getDataUri=function(e){var t=e.getContent(),n=e.getImages(),r=null;if(t&&t.length){var i=t[0].getBody();return i.length?(o=i[0].getServices()).length&&(r=this._getImageServiceDescriptor(o))?r:i[0].id:null}if(n&&n.length){var o,a=n[0].getResource();return(o=a.getServices()).length&&(r=this._getImageServiceDescriptor(o))?r:a.id}var s=e.getService(c.IXIF);return s?s.getInfoUri():e.id},e.prototype._parseAuthServices=function(e){if(.9===this.authAPIVersion)this.clickThroughService=g.Utils.getService(e,c.AUTH_0_CLICK_THROUGH),this.loginService=g.Utils.getService(e,c.AUTH_0_LOGIN),this.restrictedService=g.Utils.getService(e,c.AUTH_0_RESTRICTED),this.clickThroughService?(this.logoutService=this.clickThroughService.getService(c.AUTH_0_LOGOUT),this.tokenService=this.clickThroughService.getService(c.AUTH_0_TOKEN)):this.loginService?(this.logoutService=this.loginService.getService(c.AUTH_0_LOGOUT),this.tokenService=this.loginService.getService(c.AUTH_0_TOKEN)):this.restrictedService&&(this.logoutService=this.restrictedService.getService(c.AUTH_0_LOGOUT),this.tokenService=this.restrictedService.getService(c.AUTH_0_TOKEN));else{if(void 0!==e.isCanvas&&e.isCanvas()){var t=e.getContent();if(t&&t.length){var n=t[0].getBody();if(n&&n.length)e=n[0]}}this.clickThroughService=g.Utils.getService(e,c.AUTH_1_CLICK_THROUGH),this.loginService=g.Utils.getService(e,c.AUTH_1_LOGIN),this.externalService=g.Utils.getService(e,c.AUTH_1_EXTERNAL),this.kioskService=g.Utils.getService(e,c.AUTH_1_KIOSK),this.clickThroughService?(this.logoutService=this.clickThroughService.getService(c.AUTH_1_LOGOUT),this.tokenService=this.clickThroughService.getService(c.AUTH_1_TOKEN),this.probeService=this.clickThroughService.getService(c.AUTH_1_PROBE)):this.loginService?(this.logoutService=this.loginService.getService(c.AUTH_1_LOGOUT),this.tokenService=this.loginService.getService(c.AUTH_1_TOKEN),this.probeService=this.loginService.getService(c.AUTH_1_PROBE)):this.externalService?(this.logoutService=this.externalService.getService(c.AUTH_1_LOGOUT),this.tokenService=this.externalService.getService(c.AUTH_1_TOKEN),this.probeService=this.externalService.getService(c.AUTH_1_PROBE)):this.kioskService&&(this.logoutService=this.kioskService.getService(c.AUTH_1_LOGOUT),this.tokenService=this.kioskService.getService(c.AUTH_1_TOKEN),this.probeService=this.kioskService.getService(c.AUTH_1_PROBE))}},e.prototype._parseDimensions=function(e){var t=e.getImages();if(t&&t.length){var n=t[0].getResource();this.width=n.getWidth(),this.height=n.getHeight()}else if((t=e.getContent()).length){var r=t[0].getBody();r.length&&(this.width=r[0].getWidth(),this.height=r[0].getHeight())}},e.prototype.isAccessControlled=function(){return!!(this.clickThroughService||this.loginService||this.externalService||this.kioskService||this.probeService)},e.prototype.hasServiceDescriptor=function(){return!!this.dataUri&&this.dataUri.endsWith("info.json")},e.prototype.getData=function(e){var t=this;return t.data={},new Promise((function(n,r){if(t.dataUri)if(t.probeService){t.isProbed=!0;var i=new XMLHttpRequest;i.open("GET",t.probeService.id,!0),i.withCredentials=!0,i.onload=function(){var e=JSON.parse(i.responseText);unescape(e.contentLocation)!==t.dataUri?t.status=I.MOVED_TEMPORARILY:t.status=I.OK,n(t)},i.onerror=function(){t.status=i.status,n(t)},i.send()}else{var o="GET";if(!t.hasServiceDescriptor()){if(!t.isAccessControlled())return t.status=I.OK,void n(t);o="HEAD"}var a=new XMLHttpRequest;a.open(o,t.dataUri,!0),e&&a.setRequestHeader("Authorization","Bearer "+e.accessToken),a.onload=function(){var e=JSON.parse(a.responseText);if(e){var r=unescape(e["@id"]);t.data=e,t._parseAuthServices(t.data),r.endsWith("/info.json")&&(r=r.substr(0,r.lastIndexOf("/")));var i=t.dataUri;i&&i.endsWith("/info.json")&&(i=i.substr(0,i.lastIndexOf("/"))),r!==i&&t.loginService?t.status=I.MOVED_TEMPORARILY:t.status=I.OK,n(t)}else t.status=I.OK,n(t)},a.onerror=function(){t.status=a.status,a.responseText&&t._parseAuthServices(JSON.parse(a.responseText)),n(t)},a.send()}else r("There is no dataUri to fetch")}))},e}(),N=function(){},m=function(){},L=function(e,t){this.value=e,this.locale=t},A=function(){function e(e){this.labels=e}return e.prototype.format=function(e){return-1!=e.indexOf("<a")?e:'<a href="'+e+'">'+(this.labels[e]?this.labels[e]:e)+"</a>"},e}();n.d(t,"loadManifest",(function(){return S})),n.d(t,"AnnotationGroup",(function(){return d})),n.d(t,"AnnotationRect",(function(){return h})),n.d(t,"Bootstrapper",(function(){return T})),n.d(t,"ExternalResource",(function(){return O})),n.d(t,"Helper",(function(){return y})),n.d(t,"ILabelValuePair",(function(){return N})),n.d(t,"MetadataGroup",(function(){return v})),n.d(t,"MetadataOptions",(function(){return m})),n.d(t,"MultiSelectState",(function(){return _})),n.d(t,"Translation",(function(){return L})),n.d(t,"TreeSortType",(function(){return r})),n.d(t,"UriLabeller",(function(){return A}));var S=function(e){return new T(e).bootstrap()}}])}));

/***/ }),

/***/ "./node_modules/@iiif/vocabulary/dist-commonjs/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/@iiif/vocabulary/dist-commonjs/index.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
})(AnnotationMotivation = exports.AnnotationMotivation || (exports.AnnotationMotivation = {}));
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
})(Behavior = exports.Behavior || (exports.Behavior = {}));
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
})(ExternalResourceType = exports.ExternalResourceType || (exports.ExternalResourceType = {}));
var IIIFResourceType;
(function (IIIFResourceType) {
    IIIFResourceType["ANNOTATION"] = "annotation";
    IIIFResourceType["CANVAS"] = "canvas";
    IIIFResourceType["COLLECTION"] = "collection";
    IIIFResourceType["MANIFEST"] = "manifest";
    IIIFResourceType["RANGE"] = "range";
    IIIFResourceType["SEQUENCE"] = "sequence";
})(IIIFResourceType = exports.IIIFResourceType || (exports.IIIFResourceType = {}));
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
})(MediaType = exports.MediaType || (exports.MediaType = {}));
var RenderingFormat;
(function (RenderingFormat) {
    RenderingFormat["DOC"] = "application/msword";
    RenderingFormat["DOCX"] = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    RenderingFormat["PDF"] = "application/pdf";
})(RenderingFormat = exports.RenderingFormat || (exports.RenderingFormat = {}));
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
})(ServiceProfile = exports.ServiceProfile || (exports.ServiceProfile = {}));
var ViewingDirection;
(function (ViewingDirection) {
    ViewingDirection["BOTTOM_TO_TOP"] = "bottom-to-top";
    ViewingDirection["LEFT_TO_RIGHT"] = "left-to-right";
    ViewingDirection["RIGHT_TO_LEFT"] = "right-to-left";
    ViewingDirection["TOP_TO_BOTTOM"] = "top-to-bottom";
})(ViewingDirection = exports.ViewingDirection || (exports.ViewingDirection = {}));
var ViewingHint;
(function (ViewingHint) {
    ViewingHint["CONTINUOUS"] = "continuous";
    ViewingHint["INDIVIDUALS"] = "individuals";
    ViewingHint["NON_PAGED"] = "non-paged";
    ViewingHint["PAGED"] = "paged";
    ViewingHint["TOP"] = "top";
})(ViewingHint = exports.ViewingHint || (exports.ViewingHint = {}));
//# sourceMappingURL=index.js.map

/***/ })

}]);
//# sourceMappingURL=vendors~uv-av-extension~uv-model-viewer-extension~uv-openseadragon-extension.d515e00d331cbe71efc9.js.map