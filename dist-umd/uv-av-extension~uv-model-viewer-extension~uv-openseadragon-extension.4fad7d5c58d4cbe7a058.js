(window["webpackJsonpUV"] = window["webpackJsonpUV"] || []).push([["uv-av-extension~uv-model-viewer-extension~uv-openseadragon-extension"],{

/***/ "./src/extensions/uv-openseadragon-extension/Events.ts":
/*!*************************************************************!*\
  !*** ./src/extensions/uv-openseadragon-extension/Events.ts ***!
  \*************************************************************/
/*! exports provided: Events */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Events", function() { return Events; });
var Events = /** @class */ (function () {
    function Events() {
    }
    Events.namespace = 'openseadragonExtension.';
    Events.CURRENT_VIEW_URI = Events.namespace + 'currentViewUri';
    Events.IMAGE_SEARCH = Events.namespace + 'imageSearch';
    Events.MODE_CHANGED = Events.namespace + 'modeChanged';
    Events.NEXT_SEARCH_RESULT = Events.namespace + 'nextSearchResult';
    Events.NEXT_IMAGES_SEARCH_RESULT_UNAVAILABLE = Events.namespace + 'nextImagesSearchResultUnavailable';
    Events.PREV_IMAGES_SEARCH_RESULT_UNAVAILABLE = Events.namespace + 'prevImagesSearchResultUnavailable';
    Events.PAGE_SEARCH = Events.namespace + 'pageSearch';
    Events.PAGING_TOGGLED = Events.namespace + 'pagingToggled';
    Events.PREV_SEARCH_RESULT = Events.namespace + 'prevSearchResult';
    Events.PRINT = Events.namespace + 'print';
    Events.ROTATE = Events.namespace + 'rotate';
    Events.OPENSEADRAGON_ANIMATION_FINISH = Events.namespace + 'animationFinish';
    Events.OPENSEADRAGON_ANIMATION_START = Events.namespace + 'animationStart';
    Events.OPENSEADRAGON_ANIMATION = Events.namespace + 'animation';
    Events.OPENSEADRAGON_OPEN = Events.namespace + 'open';
    Events.OPENSEADRAGON_RESIZE = Events.namespace + 'resize';
    Events.OPENSEADRAGON_ROTATION = Events.namespace + 'rotationChanged';
    Events.SEARCH_PREVIEW_FINISH = Events.namespace + 'searchPreviewFinish';
    Events.SEARCH_PREVIEW_START = Events.namespace + 'searchPreviewStart';
    Events.SEARCH = Events.namespace + 'search';
    Events.XYWH_CHANGED = Events.namespace + 'xywhChanged';
    Events.ZOOM_IN = Events.namespace + 'zoomIn';
    Events.ZOOM_OUT = Events.namespace + 'zoomOut';
    return Events;
}());



/***/ }),

/***/ "./src/extensions/uv-openseadragon-extension/Mode.ts":
/*!***********************************************************!*\
  !*** ./src/extensions/uv-openseadragon-extension/Mode.ts ***!
  \***********************************************************/
/*! exports provided: Mode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Mode", function() { return Mode; });
var Mode = /** @class */ (function () {
    function Mode(value) {
        this.value = value;
    }
    Mode.prototype.toString = function () {
        return this.value;
    };
    Mode.image = new Mode("image");
    Mode.page = new Mode("page");
    return Mode;
}());



/***/ }),

/***/ "./src/modules/uv-contentleftpanel-module/ContentLeftPanel.ts":
/*!********************************************************************!*\
  !*** ./src/modules/uv-contentleftpanel-module/ContentLeftPanel.ts ***!
  \********************************************************************/
/*! exports provided: ContentLeftPanel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContentLeftPanel", function() { return ContentLeftPanel; });
/* harmony import */ var _edsilv_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @edsilv/utils */ "./node_modules/@edsilv/utils/dist-esmodule/index.js");
/* harmony import */ var _uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../uv-shared-module/BaseEvents */ "./src/modules/uv-shared-module/BaseEvents.ts");
/* harmony import */ var _GalleryView__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GalleryView */ "./src/modules/uv-contentleftpanel-module/GalleryView.ts");
/* harmony import */ var _uv_shared_module_LeftPanel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../uv-shared-module/LeftPanel */ "./src/modules/uv-shared-module/LeftPanel.ts");
/* harmony import */ var _extensions_uv_openseadragon_extension_Mode__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../extensions/uv-openseadragon-extension/Mode */ "./src/extensions/uv-openseadragon-extension/Mode.ts");
/* harmony import */ var _ThumbsView__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ThumbsView */ "./src/modules/uv-contentleftpanel-module/ThumbsView.ts");
/* harmony import */ var _TreeView__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./TreeView */ "./src/modules/uv-contentleftpanel-module/TreeView.ts");
/* harmony import */ var manifesto_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! manifesto.js */ "./node_modules/manifesto.js/dist-umd/manifesto.js");
/* harmony import */ var manifesto_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(manifesto_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _iiif_manifold__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @iiif/manifold */ "./node_modules/@iiif/manifold/dist-esmodule/index.js");
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
var ViewingDirectionEnum = __webpack_require__(/*! @iiif/vocabulary/dist-commonjs/ */ "./node_modules/@iiif/vocabulary/dist-commonjs/index.js").ViewingDirection;
var ViewingHintEnum = __webpack_require__(/*! @iiif/vocabulary/dist-commonjs/ */ "./node_modules/@iiif/vocabulary/dist-commonjs/index.js").ViewingHint;









var ContentLeftPanel = /** @class */ (function (_super) {
    __extends(ContentLeftPanel, _super);
    function ContentLeftPanel($element) {
        var _this = _super.call(this, $element) || this;
        _this.expandFullEnabled = false;
        _this.isThumbsViewOpen = false;
        _this.isTreeViewOpen = false;
        _this.treeSortType = _iiif_manifold__WEBPACK_IMPORTED_MODULE_8__["TreeSortType"].NONE;
        return _this;
    }
    ContentLeftPanel.prototype.create = function () {
        var _this = this;
        this.setConfig('contentLeftPanel');
        _super.prototype.create.call(this);
        this.component.subscribe(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].SETTINGS_CHANGED, function () {
            _this.databind();
        });
        this.component.subscribe(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].GALLERY_THUMB_SELECTED, function () {
            _this.collapseFull();
        });
        this.component.subscribe(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].METRIC_CHANGED, function () {
            if (!_this.extension.isDesktopMetric()) {
                if (_this.isFullyExpanded) {
                    _this.collapseFull();
                }
            }
        });
        this.component.subscribe(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].ANNOTATIONS, function () {
            _this.databindThumbsView();
            _this.databindGalleryView();
        });
        this.component.subscribe(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].ANNOTATIONS_CLEARED, function () {
            _this.databindThumbsView();
            _this.databindGalleryView();
        });
        this.component.subscribe(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].ANNOTATIONS_EMPTY, function () {
            _this.databindThumbsView();
            _this.databindGalleryView();
        });
        this.component.subscribe(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].CANVAS_INDEX_CHANGED, function () {
            if (_this.isFullyExpanded) {
                _this.collapseFull();
            }
            _this.selectCurrentTreeNode();
            _this.updateTreeTabBySelection();
        });
        this.component.subscribe(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].RANGE_CHANGED, function () {
            if (_this.isFullyExpanded) {
                _this.collapseFull();
            }
            _this.selectCurrentTreeNode();
            _this.updateTreeTabBySelection();
        });
        this.$tabs = $('<div class="tabs"></div>');
        this.$main.append(this.$tabs);
        this.$treeButton = $('<a class="index tab" tabindex="0">' + this.content.index + '</a>');
        this.$tabs.append(this.$treeButton);
        this.$thumbsButton = $('<a class="thumbs tab" tabindex="0">' + this.content.thumbnails + '</a>');
        this.$thumbsButton.prop('title', this.content.thumbnails);
        this.$tabs.append(this.$thumbsButton);
        this.$tabsContent = $('<div class="tabsContent"></div>');
        this.$main.append(this.$tabsContent);
        this.$options = $('<div class="options"></div>');
        this.$tabsContent.append(this.$options);
        this.$topOptions = $('<div class="top"></div>');
        this.$options.append(this.$topOptions);
        this.$treeSelect = $('<select aria-label="' + this.content.manifestRanges + '"></select>');
        this.$topOptions.append(this.$treeSelect);
        this.$bottomOptions = $('<div class="bottom"></div>');
        this.$options.append(this.$bottomOptions);
        this.$leftOptions = $('<div class="left"></div>');
        this.$bottomOptions.append(this.$leftOptions);
        this.$rightOptions = $('<div class="right"></div>');
        this.$bottomOptions.append(this.$rightOptions);
        this.$treeViewOptions = $('<div class="treeView"></div>');
        this.$leftOptions.append(this.$treeViewOptions);
        this.$sortByLabel = $('<span class="sort">' + this.content.sortBy + '</span>');
        this.$treeViewOptions.append(this.$sortByLabel);
        this.$sortButtonGroup = $('<div class="btn-group"></div>');
        this.$treeViewOptions.append(this.$sortButtonGroup);
        this.$sortByDateButton = $('<button class="btn" tabindex="0">' + this.content.date + '</button>');
        this.$sortButtonGroup.append(this.$sortByDateButton);
        this.$sortByVolumeButton = $('<button class="btn" tabindex="0">' + this.content.volume + '</button>');
        this.$sortButtonGroup.append(this.$sortByVolumeButton);
        this.$views = $('<div class="views"></div>');
        this.$tabsContent.append(this.$views);
        this.$treeView = $('<div class="treeView"></div>');
        this.$views.append(this.$treeView);
        this.$thumbsView = $('<div class="thumbsView" tabindex="0"></div>');
        this.$views.append(this.$thumbsView);
        this.$galleryView = $('<div class="galleryView"></div>');
        this.$views.append(this.$galleryView);
        this.$treeSelect.hide();
        this.$treeSelect.change(function () {
            _this.databindTreeView();
            _this.selectCurrentTreeNode();
            _this.updateTreeTabBySelection();
        });
        this.$sortByDateButton.on('click', function () {
            _this.sortByDate();
        });
        this.$sortByVolumeButton.on('click', function () {
            _this.sortByVolume();
        });
        this.$treeViewOptions.hide();
        this.$treeButton.onPressed(function () {
            _this.openTreeView();
        });
        this.$thumbsButton.onPressed(function () {
            _this.openThumbsView();
        });
        this.setTitle(this.content.title);
        this.$sortByVolumeButton.addClass('on');
        var tabOrderConfig = this.options.tabOrder;
        if (tabOrderConfig) {
            // sort tabs
            tabOrderConfig = tabOrderConfig.toLowerCase();
            tabOrderConfig = tabOrderConfig.replace(/ /g, "");
            var tabOrder = tabOrderConfig.split(',');
            if (tabOrder[0] === 'thumbs') {
                this.$treeButton.before(this.$thumbsButton);
                this.$thumbsButton.addClass('first');
            }
            else {
                this.$treeButton.addClass('first');
            }
        }
    };
    ContentLeftPanel.prototype.createTreeView = function () {
        this.treeView = new _TreeView__WEBPACK_IMPORTED_MODULE_6__["TreeView"](this.$treeView);
        this.treeView.treeData = this.getTreeData();
        this.treeView.setup();
        this.databindTreeView();
        // populate the tree select drop down when there are multiple top-level ranges
        var topRanges = this.extension.helper.getTopRanges();
        if (topRanges.length > 1) {
            for (var i = 0; i < topRanges.length; i++) {
                var range = topRanges[i];
                this.$treeSelect.append('<option value="' + range.id + '">' + manifesto_js__WEBPACK_IMPORTED_MODULE_7__["LanguageMap"].getValue(range.getLabel()) + '</option>');
            }
        }
        this.updateTreeViewOptions();
    };
    ContentLeftPanel.prototype.databind = function () {
        this.databindThumbsView();
        this.databindTreeView();
        this.databindGalleryView();
    };
    ContentLeftPanel.prototype.updateTreeViewOptions = function () {
        var treeData = this.getTree();
        if (!treeData) {
            return;
        }
        if (this.isCollection() && this.extension.helper.treeHasNavDates(treeData)) {
            this.$treeViewOptions.show();
        }
        else {
            this.$treeViewOptions.hide();
        }
        if (this.$treeSelect.find('option').length) {
            this.$treeSelect.show();
        }
        else {
            this.$treeSelect.hide();
        }
    };
    ContentLeftPanel.prototype.sortByDate = function () {
        this.treeSortType = _iiif_manifold__WEBPACK_IMPORTED_MODULE_8__["TreeSortType"].DATE;
        this.treeView.treeData = this.getTreeData();
        this.treeView.databind();
        this.selectCurrentTreeNode();
        this.$sortByDateButton.addClass('on');
        this.$sortByVolumeButton.removeClass('on');
        this.resize();
    };
    ContentLeftPanel.prototype.sortByVolume = function () {
        this.treeSortType = _iiif_manifold__WEBPACK_IMPORTED_MODULE_8__["TreeSortType"].NONE;
        this.treeView.treeData = this.getTreeData();
        this.treeView.databind();
        this.selectCurrentTreeNode();
        this.$sortByDateButton.removeClass('on');
        this.$sortByVolumeButton.addClass('on');
        this.resize();
    };
    ContentLeftPanel.prototype.isCollection = function () {
        var treeData = this.getTree();
        if (treeData) {
            return treeData.data.type === manifesto_js__WEBPACK_IMPORTED_MODULE_7__["TreeNodeType"].COLLECTION;
        }
        throw new Error("Tree not available");
    };
    ContentLeftPanel.prototype.databindTreeView = function () {
        if (!this.treeView)
            return;
        this.treeView.treeData = this.getTreeData();
        this.treeView.databind();
        this.selectCurrentTreeNode();
    };
    ContentLeftPanel.prototype.getTreeData = function () {
        return {
            autoExpand: this._isTreeAutoExpanded(),
            branchNodesExpandOnClick: _edsilv_utils__WEBPACK_IMPORTED_MODULE_0__["Bools"].getBool(this.config.options.branchNodesExpandOnClick, true),
            branchNodesSelectable: _edsilv_utils__WEBPACK_IMPORTED_MODULE_0__["Bools"].getBool(this.config.options.branchNodesSelectable, false),
            helper: this.extension.helper,
            topRangeIndex: this.getSelectedTopRangeIndex(),
            treeSortType: this.treeSortType
        };
    };
    ContentLeftPanel.prototype._isTreeAutoExpanded = function () {
        var autoExpandTreeEnabled = _edsilv_utils__WEBPACK_IMPORTED_MODULE_0__["Bools"].getBool(this.config.options.autoExpandTreeEnabled, false);
        var autoExpandTreeIfFewerThan = this.config.options.autoExpandTreeIfFewerThan || 0;
        if (autoExpandTreeEnabled) {
            // get total number of tree nodes
            var flatTree = this.extension.helper.getFlattenedTree();
            if (flatTree && flatTree.length < autoExpandTreeIfFewerThan) {
                return true;
            }
        }
        return false;
    };
    ContentLeftPanel.prototype.updateTreeTabByCanvasIndex = function () {
        // update tab to current top range label (if there is one)
        var topRanges = this.extension.helper.getTopRanges();
        if (topRanges.length > 1) {
            var index = this.getCurrentCanvasTopRangeIndex();
            if (index === -1) {
                return;
            }
            var currentRange = topRanges[index];
            this.setTreeTabTitle(manifesto_js__WEBPACK_IMPORTED_MODULE_7__["LanguageMap"].getValue(currentRange.getLabel()));
        }
        else {
            this.setTreeTabTitle(this.content.index);
        }
    };
    ContentLeftPanel.prototype.setTreeTabTitle = function (title) {
        this.$treeButton.text(title);
        this.$treeButton.prop('title', title);
    };
    ContentLeftPanel.prototype.updateTreeTabBySelection = function () {
        var title = null;
        var topRanges = this.extension.helper.getTopRanges();
        if (topRanges.length > 1) {
            if (this.treeView) {
                title = this.getSelectedTree().text();
            }
            else {
                title = manifesto_js__WEBPACK_IMPORTED_MODULE_7__["LanguageMap"].getValue(topRanges[0].getLabel());
            }
        }
        if (title) {
            this.setTreeTabTitle(title);
        }
        else {
            this.setTreeTabTitle(this.content.index);
        }
    };
    ContentLeftPanel.prototype.getViewingHint = function () {
        return this.extension.helper.getViewingHint();
    };
    ContentLeftPanel.prototype.getViewingDirection = function () {
        return this.extension.helper.getViewingDirection();
    };
    ContentLeftPanel.prototype.createThumbsView = function () {
        this.thumbsView = new _ThumbsView__WEBPACK_IMPORTED_MODULE_5__["ThumbsView"](this.$thumbsView);
        this.databindThumbsView();
    };
    ContentLeftPanel.prototype.databindThumbsView = function () {
        if (!this.thumbsView)
            return;
        var width;
        var height;
        var viewingHint = this.getViewingHint();
        var viewingDirection = this.getViewingDirection();
        if (viewingDirection && (viewingDirection === ViewingDirectionEnum.LEFT_TO_RIGHT || viewingDirection === ViewingDirectionEnum.RIGHT_TO_LEFT)) {
            width = this.config.options.twoColThumbWidth;
            height = this.config.options.twoColThumbHeight;
        }
        else if (viewingHint && viewingHint === ViewingHintEnum.PAGED) {
            width = this.config.options.twoColThumbWidth;
            height = this.config.options.twoColThumbHeight;
        }
        else {
            width = this.config.options.oneColThumbWidth;
            height = this.config.options.oneColThumbHeight;
        }
        var thumbs = this.extension.helper.getThumbs(width, height);
        if (viewingDirection && viewingDirection === ViewingDirectionEnum.BOTTOM_TO_TOP) {
            thumbs.reverse();
        }
        // add a search result icon for pages with results
        var searchResults = this.extension.annotations;
        if (searchResults && searchResults.length) {
            var _loop_1 = function (i) {
                var searchResult = searchResults[i];
                // find the thumb with the same canvasIndex and add the searchResult
                var thumb = thumbs.filter(function (t) { return t.index === searchResult.canvasIndex; })[0];
                if (thumb) {
                    // clone the data so searchResults isn't persisted on the canvas.
                    var data = $.extend(true, {}, thumb.data);
                    data.searchResults = searchResult.rects.length;
                    thumb.data = data;
                }
            };
            for (var i = 0; i < searchResults.length; i++) {
                _loop_1(i);
            }
        }
        this.thumbsView.thumbs = thumbs;
        this.thumbsView.databind();
    };
    ContentLeftPanel.prototype.createGalleryView = function () {
        this.galleryView = new _GalleryView__WEBPACK_IMPORTED_MODULE_2__["GalleryView"](this.$galleryView);
        this.galleryView.galleryData = this.getGalleryData();
        this.galleryView.setup();
        this.databindGalleryView();
    };
    ContentLeftPanel.prototype.databindGalleryView = function () {
        if (!this.galleryView)
            return;
        this.galleryView.galleryData = this.getGalleryData();
        this.galleryView.databind();
    };
    ContentLeftPanel.prototype.getGalleryData = function () {
        return {
            helper: this.extension.helper,
            chunkedResizingThreshold: this.config.options.galleryThumbChunkedResizingThreshold,
            content: this.config.content,
            debug: false,
            imageFadeInDuration: 300,
            initialZoom: 6,
            minLabelWidth: 20,
            pageModeEnabled: this.isPageModeEnabled(),
            scrollStopDuration: 100,
            searchResults: this.extension.annotations,
            sizingEnabled: true,
            thumbHeight: this.config.options.galleryThumbHeight,
            thumbLoadPadding: this.config.options.galleryThumbLoadPadding,
            thumbWidth: this.config.options.galleryThumbWidth,
            viewingDirection: this.getViewingDirection()
        };
    };
    ContentLeftPanel.prototype.isPageModeEnabled = function () {
        // todo: checks if the panel is being used in the openseadragon extension.
        // pass a `isPageModeEnabled` function to the panel's constructor instead?
        if (typeof this.extension.getMode === "function") {
            return _edsilv_utils__WEBPACK_IMPORTED_MODULE_0__["Bools"].getBool(this.config.options.pageModeEnabled, true) && this.extension.getMode().toString() === _extensions_uv_openseadragon_extension_Mode__WEBPACK_IMPORTED_MODULE_4__["Mode"].page.toString();
        }
        return _edsilv_utils__WEBPACK_IMPORTED_MODULE_0__["Bools"].getBool(this.config.options.pageModeEnabled, true);
    };
    ContentLeftPanel.prototype.getSelectedTree = function () {
        return this.$treeSelect.find(':selected');
    };
    ContentLeftPanel.prototype.getSelectedTopRangeIndex = function () {
        var topRangeIndex = this.getSelectedTree().index();
        if (topRangeIndex === -1) {
            topRangeIndex = 0;
        }
        return topRangeIndex;
    };
    ContentLeftPanel.prototype.getTree = function () {
        var topRangeIndex = this.getSelectedTopRangeIndex();
        return this.extension.helper.getTree(topRangeIndex, _iiif_manifold__WEBPACK_IMPORTED_MODULE_8__["TreeSortType"].NONE);
    };
    ContentLeftPanel.prototype.toggleFinish = function () {
        _super.prototype.toggleFinish.call(this);
        if (this.isUnopened) {
            var treeEnabled = _edsilv_utils__WEBPACK_IMPORTED_MODULE_0__["Bools"].getBool(this.config.options.treeEnabled, true);
            var thumbsEnabled = _edsilv_utils__WEBPACK_IMPORTED_MODULE_0__["Bools"].getBool(this.config.options.thumbsEnabled, true);
            var treeData = this.getTree();
            if (!treeData || !treeData.nodes.length) {
                treeEnabled = false;
            }
            // hide the tabs if either tree or thumbs are disabled
            if (!treeEnabled || !thumbsEnabled)
                this.$tabs.hide();
            if (thumbsEnabled && this.defaultToThumbsView()) {
                this.openThumbsView();
            }
            else if (treeEnabled) {
                this.openTreeView();
            }
        }
    };
    ContentLeftPanel.prototype.defaultToThumbsView = function () {
        var defaultToTreeEnabled = _edsilv_utils__WEBPACK_IMPORTED_MODULE_0__["Bools"].getBool(this.config.options.defaultToTreeEnabled, false);
        var defaultToTreeIfGreaterThan = this.config.options.defaultToTreeIfGreaterThan || 0;
        var treeData = this.getTree();
        if (defaultToTreeEnabled) {
            if (treeData && treeData.nodes.length > defaultToTreeIfGreaterThan) {
                return false;
            }
        }
        return true;
    };
    ContentLeftPanel.prototype.expandFullStart = function () {
        _super.prototype.expandFullStart.call(this);
        this.component.publish(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].LEFTPANEL_EXPAND_FULL_START);
    };
    ContentLeftPanel.prototype.expandFullFinish = function () {
        _super.prototype.expandFullFinish.call(this);
        if (this.$treeButton.hasClass('on')) {
            this.openTreeView();
        }
        else if (this.$thumbsButton.hasClass('on')) {
            this.openThumbsView();
        }
        this.component.publish(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].LEFTPANEL_EXPAND_FULL_FINISH);
    };
    ContentLeftPanel.prototype.collapseFullStart = function () {
        _super.prototype.collapseFullStart.call(this);
        this.component.publish(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].LEFTPANEL_COLLAPSE_FULL_START);
    };
    ContentLeftPanel.prototype.collapseFullFinish = function () {
        _super.prototype.collapseFullFinish.call(this);
        // todo: write a more generic tabs system with base tab class.
        // thumbsView may not necessarily have been created yet.
        // replace thumbsView with galleryView.
        if (this.$thumbsButton.hasClass('on')) {
            this.openThumbsView();
        }
        this.component.publish(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].LEFTPANEL_COLLAPSE_FULL_FINISH);
    };
    ContentLeftPanel.prototype.openTreeView = function () {
        this.isTreeViewOpen = true;
        this.isThumbsViewOpen = false;
        if (!this.treeView) {
            this.createTreeView();
        }
        this.$treeButton.addClass('on');
        this.$thumbsButton.removeClass('on');
        this.treeView.show();
        if (this.thumbsView)
            this.thumbsView.hide();
        if (this.galleryView)
            this.galleryView.hide();
        this.updateTreeViewOptions();
        this.selectCurrentTreeNode();
        this.resize();
        this.treeView.resize();
        this.component.publish(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].OPEN_TREE_VIEW);
    };
    ContentLeftPanel.prototype.openThumbsView = function () {
        this.isTreeViewOpen = false;
        this.isThumbsViewOpen = true;
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
        this.$treeSelect.hide();
        this.$treeViewOptions.hide();
        this.resize();
        if (this.isFullyExpanded) {
            this.thumbsView.hide();
            if (this.galleryView)
                this.galleryView.show();
            if (this.galleryView)
                this.galleryView.resize();
        }
        else {
            if (this.galleryView)
                this.galleryView.hide();
            this.thumbsView.show();
            this.thumbsView.resize();
        }
        this.component.publish(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].OPEN_THUMBS_VIEW);
    };
    ContentLeftPanel.prototype.selectTopRangeIndex = function (index) {
        this.$treeSelect.prop('selectedIndex', index);
    };
    ContentLeftPanel.prototype.getCurrentCanvasTopRangeIndex = function () {
        var topRangeIndex = -1;
        var range = this.extension.getCurrentCanvasRange();
        if (range) {
            topRangeIndex = Number(range.path.split('/')[0]);
        }
        return topRangeIndex;
    };
    ContentLeftPanel.prototype.selectCurrentTreeNode = function () {
        // todo: merge selectCurrentTreeNodeByCanvas and selectCurrentTreeNodeByRange
        // the openseadragon extension should keep track of the current range instead of using canvas index
        if (this.extension.name === 'uv-openseadragon-extension') {
            this.selectCurrentTreeNodeByCanvas();
        }
        else {
            this.selectCurrentTreeNodeByRange();
        }
    };
    ContentLeftPanel.prototype.selectCurrentTreeNodeByRange = function () {
        if (this.treeView) {
            var range = this.extension.helper.getCurrentRange();
            var node = null;
            if (range && range.treeNode) {
                node = this.treeView.getNodeById(range.treeNode.id);
            }
            if (node) {
                this.treeView.selectNode(node);
            }
            else {
                this.selectTreeNodeByManifest();
            }
        }
    };
    ContentLeftPanel.prototype.selectCurrentTreeNodeByCanvas = function () {
        if (this.treeView) {
            var node = null;
            var currentCanvasTopRangeIndex = this.getCurrentCanvasTopRangeIndex();
            var selectedTopRangeIndex = this.getSelectedTopRangeIndex();
            var usingCorrectTree = currentCanvasTopRangeIndex === selectedTopRangeIndex;
            var range = null;
            if (currentCanvasTopRangeIndex !== -1) {
                range = this.extension.getCurrentCanvasRange();
                //range = this.extension.helper.getCurrentRange();
                if (range && range.treeNode) {
                    node = this.treeView.getNodeById(range.treeNode.id);
                }
            }
            // use manifest root node
            // if (!node){
            //     id = this.extension.helper.manifest.defaultTree.id;
            //     node = this.treeView.getNodeById(id);
            // }
            if (node && usingCorrectTree) {
                this.treeView.selectNode(node);
            }
            else {
                range = this.extension.helper.getCurrentRange();
                if (range && range.treeNode) {
                    node = this.treeView.getNodeById(range.treeNode.id);
                }
                if (node) {
                    this.treeView.selectNode(node);
                }
                else {
                    this.selectTreeNodeByManifest();
                }
            }
        }
    };
    // fall through to this is there's no current range or canvas
    ContentLeftPanel.prototype.selectTreeNodeByManifest = function () {
        var _this = this;
        var collectionIndex = this.extension.helper.collectionIndex;
        var manifestIndex = this.extension.helper.manifestIndex;
        var allNodes = this.treeView.getAllNodes();
        var nodeFound = false;
        allNodes.map(function (node) {
            if (node.isCollection() && node.data.index === collectionIndex) {
                _this.treeView.selectNode(node);
                _this.treeView.expandNode(node, true);
                nodeFound = true;
            }
            if (node.isManifest() && node.data.index === manifestIndex) {
                _this.treeView.selectNode(node);
                nodeFound = true;
            }
        });
        if (!nodeFound) {
            this.treeView.deselectCurrentNode();
        }
    };
    ContentLeftPanel.prototype.resize = function () {
        _super.prototype.resize.call(this);
        this.$tabsContent.height(this.$main.height() - (this.$tabs.is(':visible') ? this.$tabs.height() : 0) - this.$tabsContent.verticalPadding());
        this.$views.height(this.$tabsContent.height() - this.$options.outerHeight());
    };
    return ContentLeftPanel;
}(_uv_shared_module_LeftPanel__WEBPACK_IMPORTED_MODULE_3__["LeftPanel"]));



/***/ }),

/***/ "./src/modules/uv-contentleftpanel-module/GalleryView.ts":
/*!***************************************************************!*\
  !*** ./src/modules/uv-contentleftpanel-module/GalleryView.ts ***!
  \***************************************************************/
/*! exports provided: GalleryView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GalleryView", function() { return GalleryView; });
/* harmony import */ var _uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../uv-shared-module/BaseEvents */ "./src/modules/uv-shared-module/BaseEvents.ts");
/* harmony import */ var _uv_shared_module_BaseView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../uv-shared-module/BaseView */ "./src/modules/uv-shared-module/BaseView.ts");
/* harmony import */ var _iiif_iiif_gallery_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @iiif/iiif-gallery-component */ "./node_modules/@iiif/iiif-gallery-component/dist-esmodule/index.js");
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



var GalleryView = /** @class */ (function (_super) {
    __extends(GalleryView, _super);
    function GalleryView($element) {
        var _this = _super.call(this, $element, true, true) || this;
        _this.isOpen = false;
        return _this;
    }
    GalleryView.prototype.create = function () {
        this.setConfig('contentLeftPanel');
        _super.prototype.create.call(this);
        this.$gallery = $('<div class="iiif-gallery-component"></div>');
        this.$element.append(this.$gallery);
    };
    GalleryView.prototype.setup = function () {
        var that = this;
        this.galleryComponent = new _iiif_iiif_gallery_component__WEBPACK_IMPORTED_MODULE_2__["GalleryComponent"]({
            target: this.$gallery[0]
        });
        this.galleryComponent.on('thumbSelected', function (thumb) {
            that.component.publish(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].GALLERY_THUMB_SELECTED, thumb);
            that.component.publish(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].THUMB_SELECTED, thumb);
        }, false);
        this.galleryComponent.on('decreaseSize', function () {
            that.component.publish(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].GALLERY_DECREASE_SIZE);
        }, false);
        this.galleryComponent.on('increaseSize', function () {
            that.component.publish(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].GALLERY_INCREASE_SIZE);
        }, false);
    };
    GalleryView.prototype.databind = function () {
        this.galleryComponent.options.data = this.galleryData;
        this.galleryComponent.set(this.galleryData);
        this.resize();
    };
    GalleryView.prototype.show = function () {
        var _this = this;
        this.isOpen = true;
        this.$element.show();
        // todo: would be better to have no imperative methods on components and use a reactive pattern
        setTimeout(function () {
            _this.galleryComponent.selectIndex(_this.extension.helper.canvasIndex);
        }, 10);
    };
    GalleryView.prototype.hide = function () {
        this.isOpen = false;
        this.$element.hide();
    };
    GalleryView.prototype.resize = function () {
        _super.prototype.resize.call(this);
        var $main = this.$gallery.find('.main');
        var $header = this.$gallery.find('.header');
        $main.height(this.$element.height() - $header.height());
    };
    return GalleryView;
}(_uv_shared_module_BaseView__WEBPACK_IMPORTED_MODULE_1__["BaseView"]));



/***/ }),

/***/ "./src/modules/uv-contentleftpanel-module/ThumbsView.ts":
/*!**************************************************************!*\
  !*** ./src/modules/uv-contentleftpanel-module/ThumbsView.ts ***!
  \**************************************************************/
/*! exports provided: ThumbsView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ThumbsView", function() { return ThumbsView; });
/* harmony import */ var _uv_shared_module_ThumbsView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../uv-shared-module/ThumbsView */ "./src/modules/uv-shared-module/ThumbsView.ts");
/* harmony import */ var _extensions_uv_openseadragon_extension_Events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../extensions/uv-openseadragon-extension/Events */ "./src/extensions/uv-openseadragon-extension/Events.ts");
/* harmony import */ var _extensions_uv_openseadragon_extension_Mode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../extensions/uv-openseadragon-extension/Mode */ "./src/extensions/uv-openseadragon-extension/Mode.ts");
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



var ThumbsView = /** @class */ (function (_super) {
    __extends(ThumbsView, _super);
    function ThumbsView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ThumbsView.prototype.create = function () {
        var _this = this;
        this.setConfig('contentLeftPanel');
        _super.prototype.create.call(this);
        // todo: this should be a setting
        this.component.subscribe(_extensions_uv_openseadragon_extension_Events__WEBPACK_IMPORTED_MODULE_1__["Events"].MODE_CHANGED, function () {
            _this.setLabel();
        });
        this.component.subscribe(_extensions_uv_openseadragon_extension_Events__WEBPACK_IMPORTED_MODULE_1__["Events"].SEARCH_PREVIEW_START, function (canvasIndex) {
            _this.searchPreviewStart(canvasIndex);
        });
        this.component.subscribe(_extensions_uv_openseadragon_extension_Events__WEBPACK_IMPORTED_MODULE_1__["Events"].SEARCH_PREVIEW_FINISH, function () {
            _this.searchPreviewFinish();
        });
        if (this.extension.helper.isPaged()) {
            this.$thumbs.addClass('paged');
        }
        var that = this;
        $.views.helpers({
            separator: function () {
                // two thumbs per line
                if (that.extension.helper.isPaged()) {
                    return ((this.data.index - 1) % 2 == 0) ? false : true;
                }
                return true; // default to one thumbnail per row
            }
        });
    };
    ThumbsView.prototype.addSelectedClassToThumbs = function (index) {
        var indices = this.extension.getPagedIndices(index);
        for (var i = 0; i < indices.length; i++) {
            this.getThumbByIndex(indices[i]).addClass('selected');
        }
    };
    ThumbsView.prototype.isPageModeEnabled = function () {
        // todo: move getMode to BaseExtension. call it getIndexingMode which can be Label or Index
        if (typeof this.extension.getMode === "function") {
            return this.config.options.pageModeEnabled && this.extension.getMode().toString() === _extensions_uv_openseadragon_extension_Mode__WEBPACK_IMPORTED_MODULE_2__["Mode"].page.toString();
        }
        return this.config.options.pageModeEnabled;
    };
    ThumbsView.prototype.searchPreviewStart = function (canvasIndex) {
        this.scrollToThumb(canvasIndex);
        var $thumb = this.getThumbByIndex(canvasIndex);
        $thumb.addClass('searchpreview');
    };
    ThumbsView.prototype.searchPreviewFinish = function () {
        this.scrollToThumb(this.extension.helper.canvasIndex);
        this.getAllThumbs().removeClass('searchpreview');
    };
    ThumbsView.prototype.setLabel = function () {
        if (this.isPDF()) {
            $(this.$thumbs).find('span.index').hide();
            $(this.$thumbs).find('span.label').hide();
        }
        else {
            if (this.isPageModeEnabled()) {
                $(this.$thumbs).find('span.index').hide();
                $(this.$thumbs).find('span.label').show();
            }
            else {
                $(this.$thumbs).find('span.index').show();
                $(this.$thumbs).find('span.label').hide();
            }
        }
    };
    return ThumbsView;
}(_uv_shared_module_ThumbsView__WEBPACK_IMPORTED_MODULE_0__["ThumbsView"]));



/***/ }),

/***/ "./src/modules/uv-contentleftpanel-module/TreeView.ts":
/*!************************************************************!*\
  !*** ./src/modules/uv-contentleftpanel-module/TreeView.ts ***!
  \************************************************************/
/*! exports provided: TreeView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TreeView", function() { return TreeView; });
/* harmony import */ var _uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../uv-shared-module/BaseEvents */ "./src/modules/uv-shared-module/BaseEvents.ts");
/* harmony import */ var _uv_shared_module_BaseView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../uv-shared-module/BaseView */ "./src/modules/uv-shared-module/BaseView.ts");
/* harmony import */ var _iiif_iiif_tree_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @iiif/iiif-tree-component */ "./node_modules/@iiif/iiif-tree-component/dist-umd/IIIFTreeComponent.js");
/* harmony import */ var _iiif_iiif_tree_component__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_iiif_iiif_tree_component__WEBPACK_IMPORTED_MODULE_2__);
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



var TreeView = /** @class */ (function (_super) {
    __extends(TreeView, _super);
    function TreeView($element) {
        var _this = _super.call(this, $element, true, true) || this;
        _this.isOpen = false;
        return _this;
    }
    TreeView.prototype.create = function () {
        this.setConfig('contentLeftPanel');
        _super.prototype.create.call(this);
        this.$tree = $('<div class="iiif-tree-component"></div>');
        this.$element.append(this.$tree);
    };
    TreeView.prototype.setup = function () {
        var that = this;
        this.treeComponent = new _iiif_iiif_tree_component__WEBPACK_IMPORTED_MODULE_2__["TreeComponent"]({
            target: this.$tree[0],
            data: this.treeData
        });
        this.treeComponent.on('treeNodeSelected', function (node) {
            that.component.publish(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].TREE_NODE_SELECTED, node);
        }, false);
        this.treeComponent.on('treeNodeMultiSelected', function (node) {
            that.component.publish(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].TREE_NODE_MULTISELECTED, node);
        }, false);
    };
    TreeView.prototype.databind = function () {
        var _this = this;
        setTimeout(function () {
            _this.treeComponent.set(_this.treeData);
            _this.resize();
        }, 1);
    };
    TreeView.prototype.show = function () {
        this.isOpen = true;
        this.$element.show();
    };
    TreeView.prototype.hide = function () {
        this.isOpen = false;
        this.$element.hide();
    };
    TreeView.prototype.selectNode = function (node) {
        if (!this.treeComponent.selectedNode) {
            this.treeComponent.expandParents(node, true);
            var link = this.$tree.find("#tree-link-" + node.id)[0];
            if (link) {
                link.scrollIntoViewIfNeeded();
            }
        }
        this.treeComponent.selectNode(node);
    };
    TreeView.prototype.expandNode = function (node, expanded) {
        this.treeComponent.expandNode(node, expanded);
    };
    TreeView.prototype.getAllNodes = function () {
        return this.treeComponent.getAllNodes();
    };
    TreeView.prototype.deselectCurrentNode = function () {
        this.treeComponent.deselectCurrentNode();
    };
    TreeView.prototype.getNodeById = function (id) {
        return this.treeComponent.getNodeById(id);
    };
    TreeView.prototype.resize = function () {
        _super.prototype.resize.call(this);
    };
    return TreeView;
}(_uv_shared_module_BaseView__WEBPACK_IMPORTED_MODULE_1__["BaseView"]));



/***/ }),

/***/ "./src/modules/uv-dialogues-module/DownloadDialogue.ts":
/*!*************************************************************!*\
  !*** ./src/modules/uv-dialogues-module/DownloadDialogue.ts ***!
  \*************************************************************/
/*! exports provided: DownloadDialogue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DownloadDialogue", function() { return DownloadDialogue; });
/* harmony import */ var _uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../uv-shared-module/BaseEvents */ "./src/modules/uv-shared-module/BaseEvents.ts");
/* harmony import */ var _uv_shared_module_Dialogue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../uv-shared-module/Dialogue */ "./src/modules/uv-shared-module/Dialogue.ts");
/* harmony import */ var _uv_shared_module_DownloadOption__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../uv-shared-module/DownloadOption */ "./src/modules/uv-shared-module/DownloadOption.ts");
/* harmony import */ var _edsilv_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @edsilv/utils */ "./node_modules/@edsilv/utils/dist-esmodule/index.js");
/* harmony import */ var manifesto_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! manifesto.js */ "./node_modules/manifesto.js/dist-umd/manifesto.js");
/* harmony import */ var manifesto_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(manifesto_js__WEBPACK_IMPORTED_MODULE_4__);
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





var DownloadDialogue = /** @class */ (function (_super) {
    __extends(DownloadDialogue, _super);
    function DownloadDialogue($element) {
        return _super.call(this, $element) || this;
    }
    DownloadDialogue.prototype.create = function () {
        var _this = this;
        this.setConfig('downloadDialogue');
        _super.prototype.create.call(this);
        this.openCommand = _uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].SHOW_DOWNLOAD_DIALOGUE;
        this.closeCommand = _uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].HIDE_DOWNLOAD_DIALOGUE;
        this.component.subscribe(this.openCommand, function (triggerButton) {
            _this.open(triggerButton);
        });
        this.component.subscribe(this.closeCommand, function () {
            _this.close();
        });
        // create ui.
        this.$title = $('<h1>' + this.content.title + '</h1>');
        this.$content.append(this.$title);
        this.$noneAvailable = $('<div class="noneAvailable">' + this.content.noneAvailable + '</div>');
        this.$content.append(this.$noneAvailable);
        this.$downloadOptions = $('<ol class="options"></ol>');
        this.$content.append(this.$downloadOptions);
        this.$footer = $('<div class="footer"></div>');
        this.$content.append(this.$footer);
        this.$termsOfUseButton = $('<a href="#">' + this.extension.data.config.content.termsOfUse + '</a>');
        this.$footer.append(this.$termsOfUseButton);
        this.$termsOfUseButton.onPressed(function () {
            _this.component.publish(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].SHOW_TERMS_OF_USE);
        });
        // hide
        this.$element.hide();
        this.updateTermsOfUseButton();
    };
    DownloadDialogue.prototype.addEntireFileDownloadOptions = function () {
        if (this.isDownloadOptionAvailable(_uv_shared_module_DownloadOption__WEBPACK_IMPORTED_MODULE_2__["DownloadOption"].ENTIRE_FILE_AS_ORIGINAL)) {
            this.$downloadOptions.empty();
            // 
            // add each file src
            var canvas = this.extension.helper.getCurrentCanvas();
            var renderingFound = false;
            var renderings = canvas.getRenderings();
            for (var i = 0; i < renderings.length; i++) {
                var rendering = renderings[i];
                var renderingFormat = rendering.getFormat();
                var format = '';
                if (renderingFormat) {
                    format = renderingFormat.toString();
                }
                this.addEntireFileDownloadOption(rendering.id, manifesto_js__WEBPACK_IMPORTED_MODULE_4__["LanguageMap"].getValue(rendering.getLabel()), format);
                renderingFound = true;
            }
            if (!renderingFound) {
                var annotationFound = false;
                var annotations = canvas.getContent();
                for (var i = 0; i < annotations.length; i++) {
                    var annotation = annotations[i];
                    var body = annotation.getBody();
                    if (body.length) {
                        var format = body[0].getFormat();
                        if (format) {
                            this.addEntireFileDownloadOption(body[0].id, '', format.toString());
                            annotationFound = true;
                        }
                    }
                }
                if (!annotationFound) {
                    this.addEntireFileDownloadOption(canvas.id, '', '');
                }
            }
        }
    };
    DownloadDialogue.prototype.addEntireFileDownloadOption = function (uri, label, format) {
        var fileType;
        if (format) {
            fileType = _edsilv_utils__WEBPACK_IMPORTED_MODULE_3__["Files"].simplifyMimeType(format);
        }
        else {
            fileType = this.getFileExtension(uri);
        }
        if (!label) {
            label = this.content.entireFileAsOriginal;
        }
        if (fileType) {
            label += " (" + fileType + ")";
        }
        this.$downloadOptions.append('<li><a href="' + uri + '" target="_blank" download tabindex="0">' + label + '</li>');
    };
    DownloadDialogue.prototype.resetDynamicDownloadOptions = function () {
        this.renderingUrls = [];
        this.renderingUrlsCount = 0;
        this.$downloadOptions.find('li.dynamic').remove();
    };
    DownloadDialogue.prototype.getDownloadOptionsForRenderings = function (resource, defaultLabel, type) {
        var renderings = resource.getRenderings();
        var downloadOptions = [];
        for (var i = 0; i < renderings.length; i++) {
            var rendering = renderings[i];
            if (rendering) {
                var label = manifesto_js__WEBPACK_IMPORTED_MODULE_4__["LanguageMap"].getValue(rendering.getLabel(), this.extension.getLocale());
                var currentId = "downloadOption" + ++this.renderingUrlsCount;
                if (label) {
                    label += " ({0})";
                }
                else {
                    label = defaultLabel;
                }
                var mime = _edsilv_utils__WEBPACK_IMPORTED_MODULE_3__["Files"].simplifyMimeType(rendering.getFormat().toString());
                label = _edsilv_utils__WEBPACK_IMPORTED_MODULE_3__["Strings"].format(label, mime);
                this.renderingUrls[currentId] = rendering.id;
                var $button = $('<li class="option dynamic"><input id="' + currentId + '" data-mime="' + mime + '" title="' + label + '" type="radio" name="downloadOptions" tabindex="0" /><label for="' + currentId + '">' + label + '</label></li>');
                downloadOptions.push({
                    type: type,
                    button: $button
                });
            }
        }
        return downloadOptions;
    };
    DownloadDialogue.prototype.getSelectedOption = function () {
        return this.$downloadOptions.find("li.option input:checked");
    };
    DownloadDialogue.prototype.getCurrentResourceId = function () {
        var canvas = this.extension.helper.getCurrentCanvas();
        return canvas.externalResource.data.id;
    };
    DownloadDialogue.prototype.getCurrentResourceFormat = function () {
        var id = this.getCurrentResourceId();
        return id.substr(id.lastIndexOf('.') + 1).toLowerCase();
    };
    DownloadDialogue.prototype.updateNoneAvailable = function () {
        if (!this.$downloadOptions.find('li:visible').length) {
            this.$noneAvailable.show();
        }
        else {
            // select first option.
            this.$noneAvailable.hide();
        }
    };
    DownloadDialogue.prototype.updateTermsOfUseButton = function () {
        var requiredStatement = this.extension.helper.getRequiredStatement();
        if (_edsilv_utils__WEBPACK_IMPORTED_MODULE_3__["Bools"].getBool(this.extension.data.config.options.termsOfUseEnabled, false) && requiredStatement && requiredStatement.value) {
            this.$termsOfUseButton.show();
        }
        else {
            this.$termsOfUseButton.hide();
        }
    };
    DownloadDialogue.prototype.getFileExtension = function (fileUri) {
        var extension = fileUri.split('.').pop();
        // if it's not a valid file extension
        if (extension.length > 5 || extension.indexOf('/') !== -1) {
            return null;
        }
        return extension;
    };
    DownloadDialogue.prototype.isMediaDownloadEnabled = function () {
        return this.extension.helper.isUIEnabled('mediaDownload');
    };
    DownloadDialogue.prototype.isDownloadOptionAvailable = function (option) {
        switch (option) {
            case _uv_shared_module_DownloadOption__WEBPACK_IMPORTED_MODULE_2__["DownloadOption"].ENTIRE_FILE_AS_ORIGINAL:
                return this.isMediaDownloadEnabled();
        }
        return true;
    };
    DownloadDialogue.prototype.close = function () {
        _super.prototype.close.call(this);
    };
    DownloadDialogue.prototype.resize = function () {
        this.setDockedPosition();
    };
    return DownloadDialogue;
}(_uv_shared_module_Dialogue__WEBPACK_IMPORTED_MODULE_1__["Dialogue"]));



/***/ }),

/***/ "./src/modules/uv-shared-module/DownloadOption.ts":
/*!********************************************************!*\
  !*** ./src/modules/uv-shared-module/DownloadOption.ts ***!
  \********************************************************/
/*! exports provided: DownloadOption */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DownloadOption", function() { return DownloadOption; });
var DownloadOption;
(function (DownloadOption) {
    DownloadOption["CANVAS_RENDERINGS"] = "canvasRenderings";
    DownloadOption["CURRENT_VIEW"] = "currentView";
    DownloadOption["ENTIRE_DOCUMENT_AS_PDF"] = "entireDocumentAsPdf";
    DownloadOption["ENTIRE_DOCUMENT_AS_TEXT"] = "entireDocumentAsText";
    DownloadOption["ENTIRE_FILE_AS_ORIGINAL"] = "entireFileAsOriginal";
    DownloadOption["IMAGE_RENDERINGS"] = "imageRenderings";
    DownloadOption["MANIFEST_RENDERINGS"] = "manifestRenderings";
    DownloadOption["RANGE_RENDERINGS"] = "rangeRenderings";
    DownloadOption["SELECTION"] = "selection";
    //SEQUENCE_RENDERINGS = "sequenceRenderings",
    DownloadOption["UNKNOWN"] = "unknown";
    DownloadOption["WHOLE_IMAGE_HIGH_RES"] = "wholeImageHighRes";
    DownloadOption["WHOLE_IMAGE_LOW_RES"] = "wholeImageLowRes";
    DownloadOption["WHOLE_IMAGES_HIGH_RES"] = "wholeImagesHighRes";
})(DownloadOption || (DownloadOption = {}));


/***/ })

}]);
//# sourceMappingURL=uv-av-extension~uv-model-viewer-extension~uv-openseadragon-extension.4fad7d5c58d4cbe7a058.js.map