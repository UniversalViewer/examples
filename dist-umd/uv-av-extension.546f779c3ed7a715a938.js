(window["webpackJsonpUV"] = window["webpackJsonpUV"] || []).push([["uv-av-extension"],{

/***/ "./src/extensions/uv-av-extension/DownloadDialogue.ts":
/*!************************************************************!*\
  !*** ./src/extensions/uv-av-extension/DownloadDialogue.ts ***!
  \************************************************************/
/*! exports provided: DownloadDialogue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DownloadDialogue", function() { return DownloadDialogue; });
/* harmony import */ var _modules_uv_dialogues_module_DownloadDialogue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../modules/uv-dialogues-module/DownloadDialogue */ "./src/modules/uv-dialogues-module/DownloadDialogue.ts");
/* harmony import */ var _modules_uv_shared_module_DownloadOption__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../modules/uv-shared-module/DownloadOption */ "./src/modules/uv-shared-module/DownloadOption.ts");
/* harmony import */ var _modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../modules/uv-shared-module/BaseEvents */ "./src/modules/uv-shared-module/BaseEvents.ts");
/* harmony import */ var _edsilv_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @edsilv/utils */ "./node_modules/@edsilv/utils/dist-esmodule/index.js");
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
        this.$entireFileAsOriginal = $('<li class="option single"><input id="' + _modules_uv_shared_module_DownloadOption__WEBPACK_IMPORTED_MODULE_1__["DownloadOption"].ENTIRE_FILE_AS_ORIGINAL + '" type="radio" name="downloadOptions" tabindex="0" /><label id="' + _modules_uv_shared_module_DownloadOption__WEBPACK_IMPORTED_MODULE_1__["DownloadOption"].ENTIRE_FILE_AS_ORIGINAL + 'label" for="' + _modules_uv_shared_module_DownloadOption__WEBPACK_IMPORTED_MODULE_1__["DownloadOption"].ENTIRE_FILE_AS_ORIGINAL + '"></label></li>');
        this.$downloadOptions.append(this.$entireFileAsOriginal);
        this.$entireFileAsOriginal.hide();
        this.$downloadButton = $('<a class="btn btn-primary" href="#" tabindex="0">' + this.content.download + '</a>');
        this.$buttons.prepend(this.$downloadButton);
        this.$imageOptionsContainer = $('<li class="group image"></li>');
        this.$imageOptions = $('<ul></ul>');
        this.$imageOptionsContainer.append(this.$imageOptions);
        this.$canvasOptionsContainer = $('<li class="group canvas"></li>');
        this.$canvasOptions = $('<ul></ul>');
        this.$canvasOptionsContainer.append(this.$canvasOptions);
        this.$manifestOptionsContainer = $('<li class="group manifest"></li>');
        this.$manifestOptions = $('<ul></ul>');
        this.$manifestOptionsContainer.append(this.$manifestOptions);
        var that = this;
        this.$downloadButton.on('click', function (e) {
            e.preventDefault();
            var $selectedOption = that.getSelectedOption();
            var id = $selectedOption.attr('id');
            var label = $selectedOption.attr('title');
            var type = _modules_uv_shared_module_DownloadOption__WEBPACK_IMPORTED_MODULE_1__["DownloadOption"].UNKNOWN;
            if (_this.renderingUrls[id]) {
                window.open(_this.renderingUrls[id]);
            }
            else {
                var id_1 = _this.getCurrentResourceId();
                window.open(id_1);
            }
            _this.component.publish(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_2__["BaseEvents"].DOWNLOAD, {
                "type": type,
                "label": label
            });
            _this.close();
        });
    };
    DownloadDialogue.prototype._isAdaptive = function () {
        var format = this.getCurrentResourceFormat();
        return format === 'mpd' || format === 'm3u8';
    };
    DownloadDialogue.prototype.open = function (triggerButton) {
        _super.prototype.open.call(this, triggerButton);
        var canvas = this.extension.helper.getCurrentCanvas();
        if (this.isDownloadOptionAvailable(_modules_uv_shared_module_DownloadOption__WEBPACK_IMPORTED_MODULE_1__["DownloadOption"].ENTIRE_FILE_AS_ORIGINAL) && !this._isAdaptive()) {
            var $input = this.$entireFileAsOriginal.find('input');
            var $label = this.$entireFileAsOriginal.find('label');
            var label = _edsilv_utils__WEBPACK_IMPORTED_MODULE_3__["Strings"].format(this.content.entireFileAsOriginalWithFormat, this.getCurrentResourceFormat());
            $label.text(label);
            $input.prop('title', label);
            this.$entireFileAsOriginal.show();
        }
        this.resetDynamicDownloadOptions();
        if (this.isDownloadOptionAvailable(_modules_uv_shared_module_DownloadOption__WEBPACK_IMPORTED_MODULE_1__["DownloadOption"].RANGE_RENDERINGS)) {
            if (canvas.ranges && canvas.ranges.length) {
                for (var i = 0; i < canvas.ranges.length; i++) {
                    var range = canvas.ranges[i];
                    var renderingOptions = this.getDownloadOptionsForRenderings(range, this.content.entireFileAsOriginal, _modules_uv_shared_module_DownloadOption__WEBPACK_IMPORTED_MODULE_1__["DownloadOption"].CANVAS_RENDERINGS);
                    this.addDownloadOptionsForRenderings(renderingOptions);
                }
            }
        }
        if (this.isDownloadOptionAvailable(_modules_uv_shared_module_DownloadOption__WEBPACK_IMPORTED_MODULE_1__["DownloadOption"].IMAGE_RENDERINGS)) {
            var images = canvas.getImages();
            if (images.length) {
                this.$downloadOptions.append(this.$imageOptionsContainer);
            }
            for (var i = 0; i < images.length; i++) {
                var renderingOptions = this.getDownloadOptionsForRenderings(images[i].getResource(), this.content.entireFileAsOriginal, _modules_uv_shared_module_DownloadOption__WEBPACK_IMPORTED_MODULE_1__["DownloadOption"].IMAGE_RENDERINGS);
                this.addDownloadOptionsForRenderings(renderingOptions);
            }
        }
        if (this.isDownloadOptionAvailable(_modules_uv_shared_module_DownloadOption__WEBPACK_IMPORTED_MODULE_1__["DownloadOption"].CANVAS_RENDERINGS)) {
            var renderingOptions = this.getDownloadOptionsForRenderings(canvas, this.content.entireFileAsOriginal, _modules_uv_shared_module_DownloadOption__WEBPACK_IMPORTED_MODULE_1__["DownloadOption"].CANVAS_RENDERINGS);
            if (renderingOptions.length) {
                this.$downloadOptions.append(this.$canvasOptionsContainer);
                this.addDownloadOptionsForRenderings(renderingOptions);
            }
        }
        if (this.isDownloadOptionAvailable(_modules_uv_shared_module_DownloadOption__WEBPACK_IMPORTED_MODULE_1__["DownloadOption"].MANIFEST_RENDERINGS)) {
            var renderingOptions = this.getDownloadOptionsForRenderings(this.extension.helper.getCurrentSequence(), this.content.entireDocument, _modules_uv_shared_module_DownloadOption__WEBPACK_IMPORTED_MODULE_1__["DownloadOption"].MANIFEST_RENDERINGS);
            if (!renderingOptions.length && this.extension.helper.manifest) {
                renderingOptions = this.getDownloadOptionsForRenderings(this.extension.helper.manifest, this.content.entireDocument, _modules_uv_shared_module_DownloadOption__WEBPACK_IMPORTED_MODULE_1__["DownloadOption"].MANIFEST_RENDERINGS);
            }
            if (renderingOptions.length) {
                this.$downloadOptions.append(this.$manifestOptionsContainer);
                this.addDownloadOptionsForRenderings(renderingOptions);
            }
        }
        if (this.$downloadOptions.length) {
            this.$entireFileAsOriginal.hide();
        }
        if (!this.$downloadOptions.find('li.option:visible').length) {
            this.$noneAvailable.show();
            this.$downloadButton.hide();
        }
        else {
            // select first option.
            this.$downloadOptions.find('li.option input:visible:first').prop('checked', true);
            this.$noneAvailable.hide();
            this.$downloadButton.show();
        }
        this.resize();
    };
    DownloadDialogue.prototype.addDownloadOptionsForRenderings = function (renderingOptions) {
        var _this = this;
        renderingOptions.forEach(function (option) {
            switch (option.type) {
                case _modules_uv_shared_module_DownloadOption__WEBPACK_IMPORTED_MODULE_1__["DownloadOption"].IMAGE_RENDERINGS:
                    _this.$imageOptions.append(option.button);
                    break;
                case _modules_uv_shared_module_DownloadOption__WEBPACK_IMPORTED_MODULE_1__["DownloadOption"].CANVAS_RENDERINGS:
                    _this.$canvasOptions.append(option.button);
                    break;
                case _modules_uv_shared_module_DownloadOption__WEBPACK_IMPORTED_MODULE_1__["DownloadOption"].MANIFEST_RENDERINGS:
                    _this.$manifestOptions.append(option.button);
                    break;
            }
        });
    };
    DownloadDialogue.prototype.isDownloadOptionAvailable = function (_option) {
        return this.isMediaDownloadEnabled();
    };
    return DownloadDialogue;
}(_modules_uv_dialogues_module_DownloadDialogue__WEBPACK_IMPORTED_MODULE_0__["DownloadDialogue"]));



/***/ }),

/***/ "./src/extensions/uv-av-extension/Extension.ts":
/*!*****************************************************!*\
  !*** ./src/extensions/uv-av-extension/Extension.ts ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_uv_avcenterpanel_module_AVCenterPanel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../modules/uv-avcenterpanel-module/AVCenterPanel */ "./src/modules/uv-avcenterpanel-module/AVCenterPanel.ts");
/* harmony import */ var _modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../modules/uv-shared-module/BaseEvents */ "./src/modules/uv-shared-module/BaseEvents.ts");
/* harmony import */ var _modules_uv_shared_module_BaseExtension__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../modules/uv-shared-module/BaseExtension */ "./src/modules/uv-shared-module/BaseExtension.ts");
/* harmony import */ var _modules_uv_contentleftpanel_module_ContentLeftPanel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../modules/uv-contentleftpanel-module/ContentLeftPanel */ "./src/modules/uv-contentleftpanel-module/ContentLeftPanel.ts");
/* harmony import */ var _DownloadDialogue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DownloadDialogue */ "./src/extensions/uv-av-extension/DownloadDialogue.ts");
/* harmony import */ var _modules_uv_shared_module_FooterPanel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../modules/uv-shared-module/FooterPanel */ "./src/modules/uv-shared-module/FooterPanel.ts");
/* harmony import */ var _modules_uv_avmobilefooterpanel_module_MobileFooter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../modules/uv-avmobilefooterpanel-module/MobileFooter */ "./src/modules/uv-avmobilefooterpanel-module/MobileFooter.ts");
/* harmony import */ var _modules_uv_shared_module_HeaderPanel__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../modules/uv-shared-module/HeaderPanel */ "./src/modules/uv-shared-module/HeaderPanel.ts");
/* harmony import */ var _modules_uv_moreinforightpanel_module_MoreInfoRightPanel__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../modules/uv-moreinforightpanel-module/MoreInfoRightPanel */ "./src/modules/uv-moreinforightpanel-module/MoreInfoRightPanel.ts");
/* harmony import */ var _SettingsDialogue__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./SettingsDialogue */ "./src/extensions/uv-av-extension/SettingsDialogue.ts");
/* harmony import */ var _ShareDialogue__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./ShareDialogue */ "./src/extensions/uv-av-extension/ShareDialogue.ts");
/* harmony import */ var _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @iiif/vocabulary */ "./node_modules/@iiif/vocabulary/dist-esmodule/index.js");
/* harmony import */ var _edsilv_utils__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @edsilv/utils */ "./node_modules/@edsilv/utils/dist-esmodule/index.js");
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













var Extension = /** @class */ (function (_super) {
    __extends(Extension, _super);
    function Extension() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Extension.prototype.create = function () {
        var _this = this;
        _super.prototype.create.call(this);
        //requirejs.config({shim: {'uv/lib/hls.min': { deps: ['require'], exports: "Hls"}}});
        this.component.subscribe(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].CANVAS_INDEX_CHANGED, function (canvasIndex) {
            _this.viewCanvas(canvasIndex);
        });
        this.component.subscribe(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].TREE_NODE_SELECTED, function (node) {
            _this.fire(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].TREE_NODE_SELECTED, node.data.path);
            _this.treeNodeSelected(node);
        });
        this.component.subscribe(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].THUMB_SELECTED, function (thumb) {
            _this.component.publish(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].CANVAS_INDEX_CHANGED, thumb.index);
        });
    };
    Extension.prototype.dependencyLoaded = function (index, dep) {
        if (index === this.getDependencyIndex('waveform-data')) {
            window.WaveformData = dep;
        }
        else if (index === this.getDependencyIndex('hls')) {
            window.Hls = dep; //https://github.com/mrdoob/three.js/issues/9602
        }
    };
    Extension.prototype.createModules = function () {
        _super.prototype.createModules.call(this);
        if (this.isHeaderPanelEnabled()) {
            this.headerPanel = new _modules_uv_shared_module_HeaderPanel__WEBPACK_IMPORTED_MODULE_7__["HeaderPanel"](this.shell.$headerPanel);
        }
        else {
            this.shell.$headerPanel.hide();
        }
        if (this.isLeftPanelEnabled()) {
            this.leftPanel = new _modules_uv_contentleftpanel_module_ContentLeftPanel__WEBPACK_IMPORTED_MODULE_3__["ContentLeftPanel"](this.shell.$leftPanel);
        }
        else {
            this.shell.$leftPanel.hide();
        }
        this.centerPanel = new _modules_uv_avcenterpanel_module_AVCenterPanel__WEBPACK_IMPORTED_MODULE_0__["AVCenterPanel"](this.shell.$centerPanel);
        if (this.isRightPanelEnabled()) {
            this.rightPanel = new _modules_uv_moreinforightpanel_module_MoreInfoRightPanel__WEBPACK_IMPORTED_MODULE_8__["MoreInfoRightPanel"](this.shell.$rightPanel);
        }
        else {
            this.shell.$rightPanel.hide();
        }
        if (this.isFooterPanelEnabled()) {
            this.footerPanel = new _modules_uv_shared_module_FooterPanel__WEBPACK_IMPORTED_MODULE_5__["FooterPanel"](this.shell.$footerPanel);
            this.mobileFooterPanel = new _modules_uv_avmobilefooterpanel_module_MobileFooter__WEBPACK_IMPORTED_MODULE_6__["FooterPanel"](this.shell.$mobileFooterPanel);
        }
        else {
            this.shell.$footerPanel.hide();
        }
        this.$shareDialogue = $('<div class="overlay share" aria-hidden="true"></div>');
        this.shell.$overlays.append(this.$shareDialogue);
        this.shareDialogue = new _ShareDialogue__WEBPACK_IMPORTED_MODULE_10__["ShareDialogue"](this.$shareDialogue);
        this.$downloadDialogue = $('<div class="overlay download" aria-hidden="true"></div>');
        this.shell.$overlays.append(this.$downloadDialogue);
        this.downloadDialogue = new _DownloadDialogue__WEBPACK_IMPORTED_MODULE_4__["DownloadDialogue"](this.$downloadDialogue);
        this.$settingsDialogue = $('<div class="overlay settings" aria-hidden="true"></div>');
        this.shell.$overlays.append(this.$settingsDialogue);
        this.settingsDialogue = new _SettingsDialogue__WEBPACK_IMPORTED_MODULE_9__["SettingsDialogue"](this.$settingsDialogue);
        if (this.isHeaderPanelEnabled()) {
            this.headerPanel.init();
        }
        if (this.isLeftPanelEnabled()) {
            this.leftPanel.init();
        }
        if (this.isRightPanelEnabled()) {
            this.rightPanel.init();
        }
        if (this.isFooterPanelEnabled()) {
            this.footerPanel.init();
        }
    };
    Extension.prototype.isLeftPanelEnabled = function () {
        var isEnabled = _super.prototype.isLeftPanelEnabled.call(this);
        var tree = this.helper.getTree();
        if (tree && tree.nodes.length) {
            isEnabled = true;
        }
        return isEnabled;
    };
    Extension.prototype.render = function () {
        _super.prototype.render.call(this);
    };
    Extension.prototype.getEmbedScript = function (template, width, height) {
        var appUri = this.getAppUri();
        var iframeSrc = appUri + "#?manifest=" + this.helper.manifestUri + "&c=" + this.helper.collectionIndex + "&m=" + this.helper.manifestIndex + "&s=" + this.helper.sequenceIndex + "&cv=" + this.helper.canvasIndex + "&rid=" + this.helper.rangeId;
        var script = _edsilv_utils__WEBPACK_IMPORTED_MODULE_12__["Strings"].format(template, iframeSrc, width.toString(), height.toString());
        return script;
    };
    Extension.prototype.treeNodeSelected = function (node) {
        var data = node.data;
        if (!data.type)
            return;
        switch (data.type) {
            case _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_11__["IIIFResourceType"].MANIFEST:
                // do nothing
                break;
            case _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_11__["IIIFResourceType"].COLLECTION:
                // do nothing
                break;
            default:
                this.viewRange(data.path);
                break;
        }
    };
    Extension.prototype.viewRange = function (path) {
        var range = this.helper.getRangeByPath(path);
        if (!range)
            return;
        this.component.publish(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].RANGE_CHANGED, range);
        // don't update the canvas index, only when thumbs are clicked
        // if (range.canvases && range.canvases.length) {
        //     const canvasId: string = range.canvases[0];
        //     const canvas: manifesto.Canvas | null = this.helper.getCanvasById(canvasId);
        //     if (canvas) {
        //         const canvasIndex: number = canvas.index;
        //         if (canvasIndex !== this.helper.canvasIndex) {
        //             this.component.publish(BaseEvents.CANVAS_INDEX_CHANGED, [canvasIndex]);
        //         }
        //     }
        // }
    };
    return Extension;
}(_modules_uv_shared_module_BaseExtension__WEBPACK_IMPORTED_MODULE_2__["BaseExtension"]));
/* harmony default export */ __webpack_exports__["default"] = (Extension);


/***/ }),

/***/ "./src/extensions/uv-av-extension/SettingsDialogue.ts":
/*!************************************************************!*\
  !*** ./src/extensions/uv-av-extension/SettingsDialogue.ts ***!
  \************************************************************/
/*! exports provided: SettingsDialogue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsDialogue", function() { return SettingsDialogue; });
/* harmony import */ var _modules_uv_dialogues_module_SettingsDialogue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../modules/uv-dialogues-module/SettingsDialogue */ "./src/modules/uv-dialogues-module/SettingsDialogue.ts");
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

var SettingsDialogue = /** @class */ (function (_super) {
    __extends(SettingsDialogue, _super);
    function SettingsDialogue($element) {
        return _super.call(this, $element) || this;
    }
    SettingsDialogue.prototype.create = function () {
        this.setConfig('settingsDialogue');
        _super.prototype.create.call(this);
    };
    return SettingsDialogue;
}(_modules_uv_dialogues_module_SettingsDialogue__WEBPACK_IMPORTED_MODULE_0__["SettingsDialogue"]));



/***/ }),

/***/ "./src/extensions/uv-av-extension/ShareDialogue.ts":
/*!*********************************************************!*\
  !*** ./src/extensions/uv-av-extension/ShareDialogue.ts ***!
  \*********************************************************/
/*! exports provided: ShareDialogue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShareDialogue", function() { return ShareDialogue; });
/* harmony import */ var _modules_uv_dialogues_module_ShareDialogue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../modules/uv-dialogues-module/ShareDialogue */ "./src/modules/uv-dialogues-module/ShareDialogue.ts");
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

var ShareDialogue = /** @class */ (function (_super) {
    __extends(ShareDialogue, _super);
    function ShareDialogue($element) {
        return _super.call(this, $element) || this;
    }
    ShareDialogue.prototype.create = function () {
        this.setConfig('shareDialogue');
        _super.prototype.create.call(this);
    };
    ShareDialogue.prototype.update = function () {
        _super.prototype.update.call(this);
        this.code = this.extension.getEmbedScript(this.options.embedTemplate, this.currentWidth, this.currentHeight);
        this.$code.val(this.code);
    };
    ShareDialogue.prototype.resize = function () {
        _super.prototype.resize.call(this);
    };
    return ShareDialogue;
}(_modules_uv_dialogues_module_ShareDialogue__WEBPACK_IMPORTED_MODULE_0__["ShareDialogue"]));



/***/ }),

/***/ "./src/modules/uv-avcenterpanel-module/AVCenterPanel.ts":
/*!**************************************************************!*\
  !*** ./src/modules/uv-avcenterpanel-module/AVCenterPanel.ts ***!
  \**************************************************************/
/*! exports provided: AVCenterPanel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AVCenterPanel", function() { return AVCenterPanel; });
/* harmony import */ var _uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../uv-shared-module/BaseEvents */ "./src/modules/uv-shared-module/BaseEvents.ts");
/* harmony import */ var _uv_shared_module_CenterPanel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../uv-shared-module/CenterPanel */ "./src/modules/uv-shared-module/CenterPanel.ts");
/* harmony import */ var _uv_shared_module_Position__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../uv-shared-module/Position */ "./src/modules/uv-shared-module/Position.ts");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Utils */ "./src/Utils.ts");
/* harmony import */ var _edsilv_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @edsilv/utils */ "./node_modules/@edsilv/utils/dist-esmodule/index.js");
/* harmony import */ var manifesto_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! manifesto.js */ "./node_modules/manifesto.js/dist-umd/manifesto.js");
/* harmony import */ var manifesto_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(manifesto_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _iiif_iiif_av_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @iiif/iiif-av-component */ "./node_modules/@iiif/iiif-av-component/dist-umd/IIIFAVComponent.js");
/* harmony import */ var _iiif_iiif_av_component__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_iiif_iiif_av_component__WEBPACK_IMPORTED_MODULE_6__);
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







var AVCenterPanel = /** @class */ (function (_super) {
    __extends(AVCenterPanel, _super);
    function AVCenterPanel($element) {
        var _this = _super.call(this, $element) || this;
        _this._mediaReady = false;
        _this._isThumbsViewOpen = false;
        _this.attributionPosition = _uv_shared_module_Position__WEBPACK_IMPORTED_MODULE_2__["Position"].BOTTOM_RIGHT;
        return _this;
    }
    AVCenterPanel.prototype.create = function () {
        var _this = this;
        this.setConfig('avCenterPanel');
        _super.prototype.create.call(this);
        var that = this;
        this.component.subscribe(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].OPEN_EXTERNAL_RESOURCE, function (resources) {
            that.openMedia(resources);
        });
        this.component.subscribe(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].CANVAS_INDEX_CHANGED, function (canvasIndex) {
            _this._viewCanvas(canvasIndex);
        });
        this.component.subscribe(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].RANGE_CHANGED, function (range) {
            if (!_this._observeRangeChanges()) {
                return;
            }
            _this._whenMediaReady(function () {
                that._viewRange(range);
                that._setTitle();
            });
        });
        this.component.subscribe(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].METRIC_CHANGED, function () {
            _this._whenMediaReady(function () {
                if (_this.avcomponent) {
                    _this.avcomponent.set({
                        limitToRange: _this._limitToRange(),
                        constrainNavigationToRange: _this._limitToRange()
                    });
                }
            });
        });
        this.component.subscribe(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].CREATED, function () {
            _this._setTitle();
        });
        this.component.subscribe(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].OPEN_THUMBS_VIEW, function () {
            _this._isThumbsViewOpen = true;
            _this._whenMediaReady(function () {
                if (_this.avcomponent) {
                    _this.avcomponent.set({
                        virtualCanvasEnabled: false
                    });
                    var canvas = _this.extension.helper.getCurrentCanvas();
                    if (canvas) {
                        _this._viewCanvas(_this.extension.helper.canvasIndex);
                    }
                }
            });
        });
        this.component.subscribe(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].OPEN_TREE_VIEW, function () {
            _this._isThumbsViewOpen = false;
            _this._whenMediaReady(function () {
                if (_this.avcomponent) {
                    _this.avcomponent.set({
                        virtualCanvasEnabled: true
                    });
                }
            });
        });
        this._createAVComponent();
    };
    AVCenterPanel.prototype._createAVComponent = function () {
        var _this = this;
        this.$avcomponent = $('<div class="iiif-av-component"></div>');
        this.$content.prepend(this.$avcomponent);
        this.avcomponent = new _iiif_iiif_av_component__WEBPACK_IMPORTED_MODULE_6__["AVComponent"]({
            target: this.$avcomponent[0],
            data: {
                posterImageExpanded: this.options.posterImageExpanded
            }
        });
        this.avcomponent.on('mediaready', function () {
            console.log('mediaready');
            _this._mediaReady = true;
        }, false);
        this.avcomponent.on('rangechanged', function (rangeId) {
            if (rangeId) {
                _this._setTitle();
                var range = _this.extension.helper.getRangeById(rangeId);
                if (range) {
                    var currentRange = _this.extension.helper.getCurrentRange();
                    if (range !== currentRange) {
                        _this.component.publish(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].RANGE_CHANGED, range);
                    }
                }
                else {
                    _this.component.publish(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].RANGE_CHANGED, null);
                }
            }
            else {
                _this.component.publish(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].RANGE_CHANGED, null);
            }
        }, false);
    };
    AVCenterPanel.prototype._observeRangeChanges = function () {
        if (!this._isThumbsViewOpen) {
            return true;
        }
        return false;
    };
    AVCenterPanel.prototype._setTitle = function () {
        var _this = this;
        var title = '';
        var value;
        var label;
        // get the current range or canvas title
        var currentRange = this.extension.helper.getCurrentRange();
        if (currentRange) {
            label = currentRange.getLabel();
        }
        else {
            label = this.extension.helper.getCurrentCanvas().getLabel();
        }
        value = manifesto_js__WEBPACK_IMPORTED_MODULE_5__["LanguageMap"].getValue(label);
        if (value) {
            title = value;
        }
        if (_edsilv_utils__WEBPACK_IMPORTED_MODULE_4__["Bools"].getBool(this.config.options.includeParentInTitleEnabled, false)) {
            // get the parent range or manifest's title
            if (currentRange) {
                if (currentRange.parentRange) {
                    label = currentRange.parentRange.getLabel();
                    value = manifesto_js__WEBPACK_IMPORTED_MODULE_5__["LanguageMap"].getValue(label);
                }
            }
            else {
                value = this.extension.helper.getLabel();
            }
            if (value) {
                title += this.content.delimiter + value;
            }
        }
        this.title = title;
        // set subtitle
        var groups = this.extension.helper.getMetadata({
            range: currentRange
        });
        for (var i = 0; i < groups.length; i++) {
            var group = groups[i];
            var item = group.items.find(function (el) {
                if (el.label) {
                    var label_1 = manifesto_js__WEBPACK_IMPORTED_MODULE_5__["LanguageMap"].getValue(el.label);
                    if (label_1 && label_1.toLowerCase() === _this.config.options.subtitleMetadataField) {
                        return true;
                    }
                }
                return false;
            });
            if (item) {
                this.subtitle = manifesto_js__WEBPACK_IMPORTED_MODULE_5__["LanguageMap"].getValue(item.value);
                break;
            }
        }
        this.$title.text(Object(_Utils__WEBPACK_IMPORTED_MODULE_3__["sanitize"])(this.title));
        this.resize(false);
    };
    AVCenterPanel.prototype._isCurrentResourceAccessControlled = function () {
        var canvas = this.extension.helper.getCurrentCanvas();
        return canvas.externalResource.isAccessControlled();
    };
    AVCenterPanel.prototype.openMedia = function (resources) {
        var _this = this;
        this.extension.getExternalResources(resources).then(function () {
            if (_this.avcomponent) {
                // reset if the media has already been loaded (degraded flow has happened)
                if (_this.extension.helper.canvasIndex === _this._lastCanvasIndex) {
                    _this.avcomponent.reset();
                }
                _this._lastCanvasIndex = _this.extension.helper.canvasIndex;
                _this.avcomponent.set({
                    helper: _this.extension.helper,
                    adaptiveAuthEnabled: _this._isCurrentResourceAccessControlled(),
                    autoPlay: _this.config.options.autoPlay,
                    autoSelectRange: true,
                    constrainNavigationToRange: _this._limitToRange(),
                    content: _this.content,
                    defaultAspectRatio: 0.56,
                    doubleClickMS: 350,
                    limitToRange: _this._limitToRange(),
                    posterImageRatio: _this.config.options.posterImageRatio
                });
                _this.resize();
            }
        });
    };
    AVCenterPanel.prototype._limitToRange = function () {
        return !this.extension.isDesktopMetric();
    };
    AVCenterPanel.prototype._whenMediaReady = function (cb) {
        var _this = this;
        _edsilv_utils__WEBPACK_IMPORTED_MODULE_4__["Async"].waitFor(function () {
            return _this._mediaReady;
        }, cb);
    };
    AVCenterPanel.prototype._viewRange = function (range) {
        var _this = this;
        this._whenMediaReady(function () {
            if (range && _this.avcomponent) {
                _this.avcomponent.playRange(range.id);
            }
            // don't resize the av component to avoid expensively redrawing waveforms
            _this.resize(false);
        });
    };
    AVCenterPanel.prototype._viewCanvas = function (canvasIndex) {
        var _this = this;
        this._whenMediaReady(function () {
            var canvas = _this.extension.helper.getCanvasByIndex(canvasIndex);
            if (_this.avcomponent) {
                _this.avcomponent.showCanvas(canvas.id);
            }
        });
    };
    AVCenterPanel.prototype.resize = function (resizeAVComponent) {
        if (resizeAVComponent === void 0) { resizeAVComponent = true; }
        _super.prototype.resize.call(this);
        if (resizeAVComponent && this.avcomponent) {
            this.$avcomponent.height(this.$content.height());
            this.avcomponent.resize();
        }
    };
    return AVCenterPanel;
}(_uv_shared_module_CenterPanel__WEBPACK_IMPORTED_MODULE_1__["CenterPanel"]));



/***/ }),

/***/ "./src/modules/uv-avmobilefooterpanel-module/MobileFooter.ts":
/*!*******************************************************************!*\
  !*** ./src/modules/uv-avmobilefooterpanel-module/MobileFooter.ts ***!
  \*******************************************************************/
/*! exports provided: FooterPanel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FooterPanel", function() { return FooterPanel; });
/* harmony import */ var _uv_shared_module_FooterPanel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../uv-shared-module/FooterPanel */ "./src/modules/uv-shared-module/FooterPanel.ts");
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

var FooterPanel = /** @class */ (function (_super) {
    __extends(FooterPanel, _super);
    function FooterPanel($element) {
        return _super.call(this, $element) || this;
    }
    FooterPanel.prototype.create = function () {
        this.setConfig('mobileFooterPanel');
        _super.prototype.create.call(this);
    };
    FooterPanel.prototype.resize = function () {
        _super.prototype.resize.call(this);
        this.$options.css('left', Math.floor((this.$element.width() / 2) - (this.$options.width() / 2)));
    };
    return FooterPanel;
}(_uv_shared_module_FooterPanel__WEBPACK_IMPORTED_MODULE_0__["FooterPanel"]));



/***/ })

}]);
//# sourceMappingURL=uv-av-extension.546f779c3ed7a715a938.js.map