(window["webpackJsonpUV"] = window["webpackJsonpUV"] || []).push([["uv-pdf-extension"],{

/***/ "./src/extensions/uv-pdf-extension/DownloadDialogue.ts":
/*!*************************************************************!*\
  !*** ./src/extensions/uv-pdf-extension/DownloadDialogue.ts ***!
  \*************************************************************/
/*! exports provided: DownloadDialogue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DownloadDialogue", function() { return DownloadDialogue; });
/* harmony import */ var _modules_uv_dialogues_module_DownloadDialogue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../modules/uv-dialogues-module/DownloadDialogue */ "./src/modules/uv-dialogues-module/DownloadDialogue.ts");
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
        this.setConfig('downloadDialogue');
        _super.prototype.create.call(this);
    };
    DownloadDialogue.prototype.open = function (triggerButton) {
        _super.prototype.open.call(this, triggerButton);
        this.addEntireFileDownloadOptions();
        if (!this.$downloadOptions.find('li:visible').length) {
            this.$noneAvailable.show();
        }
        else {
            // select first option.
            this.$noneAvailable.hide();
        }
        this.resize();
    };
    DownloadDialogue.prototype.isDownloadOptionAvailable = function (option) {
        return _super.prototype.isDownloadOptionAvailable.call(this, option);
    };
    return DownloadDialogue;
}(_modules_uv_dialogues_module_DownloadDialogue__WEBPACK_IMPORTED_MODULE_0__["DownloadDialogue"]));



/***/ }),

/***/ "./src/extensions/uv-pdf-extension/Events.ts":
/*!***************************************************!*\
  !*** ./src/extensions/uv-pdf-extension/Events.ts ***!
  \***************************************************/
/*! exports provided: Events */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Events", function() { return Events; });
var Events = /** @class */ (function () {
    function Events() {
    }
    Events.namespace = 'pdfExtension.';
    Events.PDF_LOADED = Events.namespace + 'pdfLoaded';
    Events.PAGE_INDEX_CHANGED = Events.namespace + 'pageIndexChanged';
    Events.SEARCH = Events.namespace + 'search';
    return Events;
}());



/***/ }),

/***/ "./src/extensions/uv-pdf-extension/Extension.ts":
/*!******************************************************!*\
  !*** ./src/extensions/uv-pdf-extension/Extension.ts ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../modules/uv-shared-module/BaseEvents */ "./src/modules/uv-shared-module/BaseEvents.ts");
/* harmony import */ var _modules_uv_shared_module_BaseExtension__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../modules/uv-shared-module/BaseExtension */ "./src/modules/uv-shared-module/BaseExtension.ts");
/* harmony import */ var _modules_uv_shared_module_Bookmark__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../modules/uv-shared-module/Bookmark */ "./src/modules/uv-shared-module/Bookmark.ts");
/* harmony import */ var _DownloadDialogue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DownloadDialogue */ "./src/extensions/uv-pdf-extension/DownloadDialogue.ts");
/* harmony import */ var _modules_uv_shared_module_FooterPanel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../modules/uv-shared-module/FooterPanel */ "./src/modules/uv-shared-module/FooterPanel.ts");
/* harmony import */ var _modules_uv_moreinforightpanel_module_MoreInfoRightPanel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../modules/uv-moreinforightpanel-module/MoreInfoRightPanel */ "./src/modules/uv-moreinforightpanel-module/MoreInfoRightPanel.ts");
/* harmony import */ var _modules_uv_pdfcenterpanel_module_PDFCenterPanel__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../modules/uv-pdfcenterpanel-module/PDFCenterPanel */ "./src/modules/uv-pdfcenterpanel-module/PDFCenterPanel.ts");
/* harmony import */ var _modules_uv_pdfheaderpanel_module_PDFHeaderPanel__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../modules/uv-pdfheaderpanel-module/PDFHeaderPanel */ "./src/modules/uv-pdfheaderpanel-module/PDFHeaderPanel.ts");
/* harmony import */ var _modules_uv_resourcesleftpanel_module_ResourcesLeftPanel__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../modules/uv-resourcesleftpanel-module/ResourcesLeftPanel */ "./src/modules/uv-resourcesleftpanel-module/ResourcesLeftPanel.ts");
/* harmony import */ var _SettingsDialogue__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./SettingsDialogue */ "./src/extensions/uv-pdf-extension/SettingsDialogue.ts");
/* harmony import */ var _ShareDialogue__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./ShareDialogue */ "./src/extensions/uv-pdf-extension/ShareDialogue.ts");
/* harmony import */ var _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @iiif/vocabulary */ "./node_modules/@iiif/vocabulary/dist-esmodule/index.js");
/* harmony import */ var _edsilv_utils__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @edsilv/utils */ "./node_modules/@edsilv/utils/dist-esmodule/index.js");
/* harmony import */ var manifesto_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! manifesto.js */ "./node_modules/manifesto.js/dist-umd/manifesto.js");
/* harmony import */ var manifesto_js__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(manifesto_js__WEBPACK_IMPORTED_MODULE_13__);
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
        undefined;
        _super.prototype.create.call(this);
        this.component.subscribe(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].CANVAS_INDEX_CHANGED, function (canvasIndex) {
            _this.viewCanvas(canvasIndex);
        });
        this.component.subscribe(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].THUMB_SELECTED, function (thumb) {
            _this.component.publish(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].CANVAS_INDEX_CHANGED, thumb.index);
        });
        this.component.subscribe(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].LEFTPANEL_EXPAND_FULL_START, function () {
            _this.shell.$centerPanel.hide();
            _this.shell.$rightPanel.hide();
        });
        this.component.subscribe(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].LEFTPANEL_COLLAPSE_FULL_FINISH, function () {
            _this.shell.$centerPanel.show();
            _this.shell.$rightPanel.show();
            _this.resize();
        });
        this.component.subscribe(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].SHOW_OVERLAY, function () {
            if (_this.IsOldIE()) {
                _this.centerPanel.$element.hide();
            }
        });
        this.component.subscribe(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].HIDE_OVERLAY, function () {
            if (_this.IsOldIE()) {
                _this.centerPanel.$element.show();
            }
        });
        this.component.subscribe(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].EXIT_FULLSCREEN, function () {
            setTimeout(function () {
                _this.resize();
            }, 10); // allow time to exit full screen, then resize
        });
    };
    Extension.prototype.render = function () {
        _super.prototype.render.call(this);
    };
    Extension.prototype.IsOldIE = function () {
        var browser = window.browserDetect.browser;
        var version = window.browserDetect.version;
        if (browser === 'Explorer' && version <= 9)
            return true;
        return false;
    };
    Extension.prototype.isHeaderPanelEnabled = function () {
        return _super.prototype.isHeaderPanelEnabled.call(this) && _edsilv_utils__WEBPACK_IMPORTED_MODULE_12__["Bools"].getBool(this.data.config.options.usePdfJs, true);
    };
    Extension.prototype.createModules = function () {
        _super.prototype.createModules.call(this);
        if (this.isHeaderPanelEnabled()) {
            this.headerPanel = new _modules_uv_pdfheaderpanel_module_PDFHeaderPanel__WEBPACK_IMPORTED_MODULE_7__["PDFHeaderPanel"](this.shell.$headerPanel);
        }
        else {
            this.shell.$headerPanel.hide();
        }
        if (this.isLeftPanelEnabled()) {
            this.leftPanel = new _modules_uv_resourcesleftpanel_module_ResourcesLeftPanel__WEBPACK_IMPORTED_MODULE_8__["ResourcesLeftPanel"](this.shell.$leftPanel);
        }
        this.centerPanel = new _modules_uv_pdfcenterpanel_module_PDFCenterPanel__WEBPACK_IMPORTED_MODULE_6__["PDFCenterPanel"](this.shell.$centerPanel);
        if (this.isRightPanelEnabled()) {
            this.rightPanel = new _modules_uv_moreinforightpanel_module_MoreInfoRightPanel__WEBPACK_IMPORTED_MODULE_5__["MoreInfoRightPanel"](this.shell.$rightPanel);
        }
        if (this.isFooterPanelEnabled()) {
            this.footerPanel = new _modules_uv_shared_module_FooterPanel__WEBPACK_IMPORTED_MODULE_4__["FooterPanel"](this.shell.$footerPanel);
        }
        else {
            this.shell.$footerPanel.hide();
        }
        this.$downloadDialogue = $('<div class="overlay download" aria-hidden="true"></div>');
        this.shell.$overlays.append(this.$downloadDialogue);
        this.downloadDialogue = new _DownloadDialogue__WEBPACK_IMPORTED_MODULE_3__["DownloadDialogue"](this.$downloadDialogue);
        this.$shareDialogue = $('<div class="overlay share" aria-hidden="true"></div>');
        this.shell.$overlays.append(this.$shareDialogue);
        this.shareDialogue = new _ShareDialogue__WEBPACK_IMPORTED_MODULE_10__["ShareDialogue"](this.$shareDialogue);
        this.$settingsDialogue = $('<div class="overlay settings" aria-hidden="true"></div>');
        this.shell.$overlays.append(this.$settingsDialogue);
        this.settingsDialogue = new _SettingsDialogue__WEBPACK_IMPORTED_MODULE_9__["SettingsDialogue"](this.$settingsDialogue);
        if (this.isLeftPanelEnabled()) {
            this.leftPanel.init();
        }
        if (this.isRightPanelEnabled()) {
            this.rightPanel.init();
        }
    };
    Extension.prototype.bookmark = function () {
        _super.prototype.bookmark.call(this);
        var canvas = this.helper.getCurrentCanvas();
        var bookmark = new _modules_uv_shared_module_Bookmark__WEBPACK_IMPORTED_MODULE_2__["Bookmark"]();
        bookmark.index = this.helper.canvasIndex;
        bookmark.label = manifesto_js__WEBPACK_IMPORTED_MODULE_13__["LanguageMap"].getValue(canvas.getLabel());
        bookmark.thumb = canvas.getProperty('thumbnail');
        bookmark.title = this.helper.getLabel();
        bookmark.trackingLabel = window.trackingLabel;
        bookmark.type = _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_11__["ExternalResourceType"].DOCUMENT;
        this.fire(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].BOOKMARK, bookmark);
    };
    Extension.prototype.dependencyLoaded = function (index, dep) {
        if (index === 0) {
            window.PDFObject = dep;
        }
    };
    Extension.prototype.getEmbedScript = function (template, width, height) {
        //const configUri = this.data.config.uri || '';
        //const script = String.format(template, this.getSerializedLocales(), configUri, this.helper.manifestUri, this.helper.collectionIndex, this.helper.manifestIndex, this.helper.sequenceIndex, this.helper.canvasIndex, width, height, this.data.embedScriptUri);
        var appUri = this.getAppUri();
        var iframeSrc = appUri + "#?manifest=" + this.helper.manifestUri + "&c=" + this.helper.collectionIndex + "&m=" + this.helper.manifestIndex + "&s=" + this.helper.sequenceIndex + "&cv=" + this.helper.canvasIndex;
        var script = _edsilv_utils__WEBPACK_IMPORTED_MODULE_12__["Strings"].format(template, iframeSrc, width.toString(), height.toString());
        return script;
    };
    return Extension;
}(_modules_uv_shared_module_BaseExtension__WEBPACK_IMPORTED_MODULE_1__["BaseExtension"]));
/* harmony default export */ __webpack_exports__["default"] = (Extension);


/***/ }),

/***/ "./src/extensions/uv-pdf-extension/SettingsDialogue.ts":
/*!*************************************************************!*\
  !*** ./src/extensions/uv-pdf-extension/SettingsDialogue.ts ***!
  \*************************************************************/
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

/***/ "./src/extensions/uv-pdf-extension/ShareDialogue.ts":
/*!**********************************************************!*\
  !*** ./src/extensions/uv-pdf-extension/ShareDialogue.ts ***!
  \**********************************************************/
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

/***/ "./src/modules/uv-pdfcenterpanel-module/PDFCenterPanel.ts":
/*!****************************************************************!*\
  !*** ./src/modules/uv-pdfcenterpanel-module/PDFCenterPanel.ts ***!
  \****************************************************************/
/*! exports provided: PDFCenterPanel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PDFCenterPanel", function() { return PDFCenterPanel; });
/* harmony import */ var _uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../uv-shared-module/BaseEvents */ "./src/modules/uv-shared-module/BaseEvents.ts");
/* harmony import */ var _uv_shared_module_CenterPanel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../uv-shared-module/CenterPanel */ "./src/modules/uv-shared-module/CenterPanel.ts");
/* harmony import */ var _extensions_uv_pdf_extension_Events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../extensions/uv-pdf-extension/Events */ "./src/extensions/uv-pdf-extension/Events.ts");
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




var PDFCenterPanel = /** @class */ (function (_super) {
    __extends(PDFCenterPanel, _super);
    function PDFCenterPanel($element) {
        var _this = _super.call(this, $element) || this;
        _this._maxScale = 5;
        _this._minScale = 0.7;
        _this._nextButtonEnabled = false;
        _this._pageIndex = 1;
        _this._pageIndexPending = null;
        _this._pageRendering = false;
        _this._pdfDoc = null;
        _this._prevButtonEnabled = false;
        _this._scale = 0.7;
        return _this;
    }
    PDFCenterPanel.prototype.create = function () {
        var _this = this;
        this.setConfig('pdfCenterPanel');
        _super.prototype.create.call(this);
        this._$pdfContainer = $('<div class="pdfContainer"></div>');
        this._$canvas = $('<canvas></canvas>');
        this._$spinner = $('<div class="spinner"></div>');
        this._canvas = this._$canvas[0];
        this._ctx = this._canvas.getContext('2d');
        this._$prevButton = $('<div class="btn prev" tabindex="0"></div>');
        this._$nextButton = $('<div class="btn next" tabindex="0"></div>');
        this._$zoomInButton = $('<div class="btn zoomIn" tabindex="0"></div>');
        this._$zoomOutButton = $('<div class="btn zoomOut" tabindex="0"></div>');
        // Only attach PDF controls if we're using PDF.js; they have no meaning in
        // PDFObject. However, we still create the objects above so that references
        // to them do not cause errors (simpler than putting usePdfJs checks all over):
        if (_edsilv_utils__WEBPACK_IMPORTED_MODULE_3__["Bools"].getBool(this.extension.data.config.options.usePdfJs, false)) {
            this.$content.append(this._$spinner);
            this.$content.append(this._$prevButton);
            this.$content.append(this._$nextButton);
            this.$content.append(this._$zoomInButton);
            this.$content.append(this._$zoomOutButton);
        }
        this._$pdfContainer.append(this._$canvas);
        this.$content.prepend(this._$pdfContainer);
        this.component.subscribe(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].OPEN_EXTERNAL_RESOURCE, function (resources) {
            _this.openMedia(resources);
        });
        this.component.subscribe(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].FIRST, function () {
            if (!_this._pdfDoc) {
                return;
            }
            _this._pageIndex = 1;
            _this._queueRenderPage(_this._pageIndex);
        });
        this.component.subscribe(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].PREV, function () {
            if (!_this._pdfDoc) {
                return;
            }
            if (_this._pageIndex <= 1) {
                return;
            }
            _this._pageIndex--;
            _this._queueRenderPage(_this._pageIndex);
        });
        this.component.subscribe(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].NEXT, function () {
            if (!_this._pdfDoc) {
                return;
            }
            if (_this._pageIndex >= _this._pdfDoc.numPages) {
                return;
            }
            _this._pageIndex++;
            _this._queueRenderPage(_this._pageIndex);
        });
        this.component.subscribe(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].LAST, function () {
            if (!_this._pdfDoc) {
                return;
            }
            _this._pageIndex = _this._pdfDoc.numPages;
            _this._queueRenderPage(_this._pageIndex);
        });
        this.component.subscribe(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].CANVAS_INDEX_CHANGED, function () {
            if (!_this._pdfDoc) {
                return;
            }
            _this._pageIndex = 1;
            _this._queueRenderPage(_this._pageIndex);
        });
        this.component.subscribe(_extensions_uv_pdf_extension_Events__WEBPACK_IMPORTED_MODULE_2__["Events"].SEARCH, function (pageIndex) {
            if (!_this._pdfDoc) {
                return;
            }
            if (pageIndex < 1 || pageIndex > _this._pdfDoc.numPages) {
                return;
            }
            _this._pageIndex = pageIndex;
            _this._queueRenderPage(_this._pageIndex);
        });
        this._$prevButton.onPressed(function (e) {
            e.preventDefault();
            if (!_this._prevButtonEnabled)
                return;
            _this.component.publish(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].PREV);
        });
        this.disablePrevButton();
        this._$nextButton.onPressed(function (e) {
            e.preventDefault();
            if (!_this._nextButtonEnabled)
                return;
            _this.component.publish(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].NEXT);
        });
        this.disableNextButton();
        this._$zoomInButton.onPressed(function (e) {
            e.preventDefault();
            var newScale = _this._scale + 0.5;
            if (newScale < _this._maxScale) {
                _this._scale = newScale;
            }
            else {
                _this._scale = _this._maxScale;
            }
            _this._render(_this._pageIndex);
        });
        this._$zoomOutButton.onPressed(function (e) {
            e.preventDefault();
            var newScale = _this._scale - 0.5;
            if (newScale > _this._minScale) {
                _this._scale = newScale;
            }
            else {
                _this._scale = _this._minScale;
            }
            _this._render(_this._pageIndex);
        });
    };
    PDFCenterPanel.prototype.disablePrevButton = function () {
        this._prevButtonEnabled = false;
        this._$prevButton.addClass('disabled');
    };
    PDFCenterPanel.prototype.enablePrevButton = function () {
        this._prevButtonEnabled = true;
        this._$prevButton.removeClass('disabled');
    };
    PDFCenterPanel.prototype.hidePrevButton = function () {
        this.disablePrevButton();
        this._$prevButton.hide();
    };
    PDFCenterPanel.prototype.showPrevButton = function () {
        this.enablePrevButton();
        this._$prevButton.show();
    };
    PDFCenterPanel.prototype.disableNextButton = function () {
        this._nextButtonEnabled = false;
        this._$nextButton.addClass('disabled');
    };
    PDFCenterPanel.prototype.enableNextButton = function () {
        this._nextButtonEnabled = true;
        this._$nextButton.removeClass('disabled');
    };
    PDFCenterPanel.prototype.hideNextButton = function () {
        this.disableNextButton();
        this._$nextButton.hide();
    };
    PDFCenterPanel.prototype.showNextButton = function () {
        this.enableNextButton();
        this._$nextButton.show();
    };
    PDFCenterPanel.prototype.openMedia = function (resources) {
        return __awaiter(this, void 0, void 0, function () {
            var mediaUri, canvas, formats, pdfUri, _a, parameter, pdfDoc;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this._$spinner.show();
                        return [4 /*yield*/, this.extension.getExternalResources(resources)];
                    case 1:
                        _b.sent();
                        mediaUri = null;
                        canvas = this.extension.helper.getCurrentCanvas();
                        formats = this.extension.getMediaFormats(canvas);
                        pdfUri = canvas.id;
                        if (formats && formats.length) {
                            mediaUri = formats[0].id;
                        }
                        else {
                            mediaUri = canvas.id;
                        }
                        if (!!_edsilv_utils__WEBPACK_IMPORTED_MODULE_3__["Bools"].getBool(this.extension.data.config.options.usePdfJs, false)) return [3 /*break*/, 3];
                        _a = window;
                        return [4 /*yield*/, __webpack_require__.e(/*! import() | pdfobject */ "vendors~pdfobject").then(__webpack_require__.t.bind(null, /*! pdfobject */ "./node_modules/pdfobject/pdfobject.js", 7))];
                    case 2:
                        _a.PDFObject = _b.sent();
                        window.PDFObject.embed(pdfUri, '.pdfContainer', { id: "PDF" });
                        return [3 /*break*/, 6];
                    case 3: return [4 /*yield*/, Promise.all(/*! import() | pdfjs */[__webpack_require__.e("vendors~pdfjs"), __webpack_require__.e("pdfjs")]).then(__webpack_require__.t.bind(null, /*! pdfjs-dist */ "./node_modules/pdfjs-dist/build/pdf.js", 7))];
                    case 4:
                        PDFJS = _b.sent();
                        PDFJS.disableWorker = true;
                        parameter = {
                            url: mediaUri,
                            withCredentials: canvas.externalResource.isAccessControlled()
                        };
                        return [4 /*yield*/, PDFJS.getDocument(parameter)];
                    case 5:
                        pdfDoc = _b.sent();
                        this._pdfDoc = pdfDoc;
                        this._render(this._pageIndex);
                        this.component.publish(_extensions_uv_pdf_extension_Events__WEBPACK_IMPORTED_MODULE_2__["Events"].PDF_LOADED, pdfDoc);
                        this._$spinner.hide();
                        _b.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    PDFCenterPanel.prototype._render = function (num) {
        var _this = this;
        if (!_edsilv_utils__WEBPACK_IMPORTED_MODULE_3__["Bools"].getBool(this.extension.data.config.options.usePdfJs, false)) {
            return;
        }
        this._pageRendering = true;
        this._$zoomOutButton.enable();
        this._$zoomInButton.enable();
        //disable zoom if not possible
        var lowScale = this._scale - 0.5;
        var highScale = this._scale + 0.5;
        if (lowScale < this._minScale) {
            this._$zoomOutButton.disable();
        }
        if (highScale > this._maxScale) {
            this._$zoomInButton.disable();
        }
        //this._pdfDoc.getPage(num).then((page: any) => {
        this._pdfDoc.getPage(num).then(function (page) {
            if (_this._renderTask) {
                _this._renderTask.cancel();
            }
            // how to fit to the available space
            // const height: number = this.$content.height();
            // this._canvas.height = height;
            // this._viewport = page.getViewport(this._canvas.height / page.getViewport(1.0).height);
            // const width: number = this._viewport.width;
            // this._canvas.width = width;
            // this._$canvas.css({
            //     left: (this.$content.width() / 2) - (width / 2)
            // });
            // scale viewport
            _this._viewport = page.getViewport(_this._scale);
            _this._canvas.height = _this._viewport.height;
            _this._canvas.width = _this._viewport.width;
            // Render PDF page into canvas context
            var renderContext = {
                canvasContext: _this._ctx,
                viewport: _this._viewport
            };
            _this._renderTask = page.render(renderContext);
            // Wait for rendering to finish
            _this._renderTask.promise.then(function () {
                _this.component.publish(_extensions_uv_pdf_extension_Events__WEBPACK_IMPORTED_MODULE_2__["Events"].PAGE_INDEX_CHANGED, _this._pageIndex);
                _this._pageRendering = false;
                if (_this._pageIndexPending !== null) {
                    // New page rendering is pending
                    _this._render(_this._pageIndexPending);
                    _this._pageIndexPending = null;
                }
                if (_this._pageIndex === 1) {
                    _this.disablePrevButton();
                }
                else {
                    _this.enablePrevButton();
                }
                if (_this._pageIndex === _this._pdfDoc.numPages) {
                    _this.disableNextButton();
                }
                else {
                    _this.enableNextButton();
                }
            }).catch(function (err) {
                //console.log(err);
            });
        });
    };
    PDFCenterPanel.prototype._queueRenderPage = function (num) {
        if (this._pageRendering) {
            this._pageIndexPending = num;
        }
        else {
            this._render(num);
        }
    };
    PDFCenterPanel.prototype.resize = function () {
        _super.prototype.resize.call(this);
        this._$pdfContainer.width(this.$content.width());
        this._$pdfContainer.height(this.$content.height());
        this._$spinner.css('top', (this.$content.height() / 2) - (this._$spinner.height() / 2));
        this._$spinner.css('left', (this.$content.width() / 2) - (this._$spinner.width() / 2));
        this._$prevButton.css({
            top: (this.$content.height() - this._$prevButton.height()) / 2,
            left: this._$prevButton.horizontalMargins()
        });
        this._$nextButton.css({
            top: (this.$content.height() - this._$nextButton.height()) / 2,
            left: this.$content.width() - (this._$nextButton.width() + this._$nextButton.horizontalMargins())
        });
        if (!this._viewport) {
            return;
        }
        this._render(this._pageIndex);
    };
    return PDFCenterPanel;
}(_uv_shared_module_CenterPanel__WEBPACK_IMPORTED_MODULE_1__["CenterPanel"]));



/***/ }),

/***/ "./src/modules/uv-pdfheaderpanel-module/PDFHeaderPanel.ts":
/*!****************************************************************!*\
  !*** ./src/modules/uv-pdfheaderpanel-module/PDFHeaderPanel.ts ***!
  \****************************************************************/
/*! exports provided: PDFHeaderPanel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PDFHeaderPanel", function() { return PDFHeaderPanel; });
/* harmony import */ var _uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../uv-shared-module/BaseEvents */ "./src/modules/uv-shared-module/BaseEvents.ts");
/* harmony import */ var _extensions_uv_pdf_extension_Events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../extensions/uv-pdf-extension/Events */ "./src/extensions/uv-pdf-extension/Events.ts");
/* harmony import */ var _uv_shared_module_HeaderPanel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../uv-shared-module/HeaderPanel */ "./src/modules/uv-shared-module/HeaderPanel.ts");
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




var PDFHeaderPanel = /** @class */ (function (_super) {
    __extends(PDFHeaderPanel, _super);
    function PDFHeaderPanel($element) {
        var _this = _super.call(this, $element) || this;
        _this.firstButtonEnabled = false;
        _this.lastButtonEnabled = false;
        _this.nextButtonEnabled = false;
        _this.prevButtonEnabled = false;
        _this._pageIndex = 0;
        _this._pdfDoc = null;
        return _this;
    }
    PDFHeaderPanel.prototype.create = function () {
        var _this = this;
        this.setConfig('pdfHeaderPanel');
        _super.prototype.create.call(this);
        this.component.subscribe(_extensions_uv_pdf_extension_Events__WEBPACK_IMPORTED_MODULE_1__["Events"].PAGE_INDEX_CHANGED, function (pageIndex) {
            _this._pageIndex = pageIndex;
            _this.render();
        });
        this.component.subscribe(_extensions_uv_pdf_extension_Events__WEBPACK_IMPORTED_MODULE_1__["Events"].PDF_LOADED, function (pdfDoc) {
            _this._pdfDoc = pdfDoc;
        });
        this.$prevOptions = $('<div class="prevOptions"></div>');
        this.$centerOptions.append(this.$prevOptions);
        this.$firstButton = $("\n          <button class=\"btn imageBtn first\" tabindex=\"0\" title=\"" + this.content.first + "\">\n            <i class=\"uv-icon-first\" aria-hidden=\"true\"></i>" + this.content.first + "\n          </button>\n        ");
        this.$prevOptions.append(this.$firstButton);
        this.$firstButton.disable();
        this.$prevButton = $("\n          <button class=\"btn imageBtn prev\" tabindex=\"0\" title=\"" + this.content.previous + "\">\n            <i class=\"uv-icon-prev\" aria-hidden=\"true\"></i>" + this.content.previous + "\n          </button>\n        ");
        this.$prevOptions.append(this.$prevButton);
        this.$prevButton.disable();
        this.$search = $('<div class="search"></div>');
        this.$centerOptions.append(this.$search);
        this.$searchText = $('<input class="searchText" maxlength="50" type="text" tabindex="0" aria-label="' + this.content.pageSearchLabel + '"/>');
        this.$search.append(this.$searchText);
        this.$total = $('<span class="total"></span>');
        this.$search.append(this.$total);
        this.$searchButton = $('<a class="go btn btn-primary" tabindex="0">' + this.content.go + '</a>');
        this.$search.append(this.$searchButton);
        this.$searchButton.disable();
        this.$nextOptions = $('<div class="nextOptions"></div>');
        this.$centerOptions.append(this.$nextOptions);
        this.$nextButton = $("\n          <button class=\"btn imageBtn next\" tabindex=\"0\" title=\"" + this.content.next + "\">\n            <i class=\"uv-icon-next\" aria-hidden=\"true\"></i>" + this.content.next + "\n          </button>\n        ");
        this.$nextOptions.append(this.$nextButton);
        this.$nextButton.disable();
        this.$lastButton = $("\n          <button class=\"btn imageBtn last\" tabindex=\"0\" title=\"" + this.content.last + "\">\n            <i class=\"uv-icon-last\" aria-hidden=\"true\"></i>" + this.content.last + "\n          </button>\n        ");
        this.$nextOptions.append(this.$lastButton);
        this.$lastButton.disable();
        // ui event handlers.
        this.$firstButton.onPressed(function () {
            _this.component.publish(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].FIRST);
        });
        this.$prevButton.onPressed(function () {
            _this.component.publish(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].PREV);
        });
        this.$nextButton.onPressed(function () {
            _this.component.publish(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].NEXT);
        });
        this.$lastButton.onPressed(function () {
            _this.component.publish(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].LAST);
        });
        this.$searchText.onEnter(function () {
            _this.$searchText.blur();
            _this.search(_this.$searchText.val());
        });
        this.$searchText.click(function () {
            $(this).select();
        });
        this.$searchButton.onPressed(function () {
            _this.search(_this.$searchText.val());
        });
    };
    PDFHeaderPanel.prototype.render = function () {
        // check if the book has more than one page, otherwise hide prev/next options.
        if (this._pdfDoc.numPages === 1) {
            this.$centerOptions.hide();
        }
        else {
            this.$centerOptions.show();
        }
        this.$searchText.val(this._pageIndex);
        var of = this.content.of;
        this.$total.html(_edsilv_utils__WEBPACK_IMPORTED_MODULE_3__["Strings"].format(of, this._pdfDoc.numPages.toString()));
        this.$searchButton.enable();
        if (this._pageIndex === 1) {
            this.$firstButton.disable();
            this.$prevButton.disable();
        }
        else {
            this.$firstButton.enable();
            this.$prevButton.enable();
        }
        if (this._pageIndex === this._pdfDoc.numPages) {
            this.$lastButton.disable();
            this.$nextButton.disable();
        }
        else {
            this.$lastButton.enable();
            this.$nextButton.enable();
        }
    };
    PDFHeaderPanel.prototype.search = function (value) {
        if (!value) {
            this.extension.showMessage(this.content.emptyValue);
            return;
        }
        var index = parseInt(this.$searchText.val(), 10);
        if (isNaN(index)) {
            this.extension.showMessage(this.extension.data.config.modules.genericDialogue.content.invalidNumber);
            return;
        }
        this.component.publish(_extensions_uv_pdf_extension_Events__WEBPACK_IMPORTED_MODULE_1__["Events"].SEARCH, index);
    };
    PDFHeaderPanel.prototype.resize = function () {
        _super.prototype.resize.call(this);
    };
    return PDFHeaderPanel;
}(_uv_shared_module_HeaderPanel__WEBPACK_IMPORTED_MODULE_2__["HeaderPanel"]));



/***/ }),

/***/ "./src/modules/uv-resourcesleftpanel-module/ResourcesLeftPanel.ts":
/*!************************************************************************!*\
  !*** ./src/modules/uv-resourcesleftpanel-module/ResourcesLeftPanel.ts ***!
  \************************************************************************/
/*! exports provided: ResourcesLeftPanel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResourcesLeftPanel", function() { return ResourcesLeftPanel; });
/* harmony import */ var _uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../uv-shared-module/BaseEvents */ "./src/modules/uv-shared-module/BaseEvents.ts");
/* harmony import */ var _uv_shared_module_LeftPanel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../uv-shared-module/LeftPanel */ "./src/modules/uv-shared-module/LeftPanel.ts");
/* harmony import */ var _ThumbsView__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ThumbsView */ "./src/modules/uv-resourcesleftpanel-module/ThumbsView.ts");
/* harmony import */ var _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @iiif/vocabulary */ "./node_modules/@iiif/vocabulary/dist-esmodule/index.js");
/* harmony import */ var _edsilv_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @edsilv/utils */ "./node_modules/@edsilv/utils/dist-esmodule/index.js");
/* harmony import */ var manifesto_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! manifesto.js */ "./node_modules/manifesto.js/dist-umd/manifesto.js");
/* harmony import */ var manifesto_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(manifesto_js__WEBPACK_IMPORTED_MODULE_5__);
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






var ResourcesLeftPanel = /** @class */ (function (_super) {
    __extends(ResourcesLeftPanel, _super);
    function ResourcesLeftPanel($element) {
        return _super.call(this, $element) || this;
    }
    ResourcesLeftPanel.prototype.create = function () {
        this.setConfig('resourcesLeftPanel');
        _super.prototype.create.call(this);
        this.setTitle(this.content.title);
        /*
         TODO: make tabs work
        this.$tabs = $('<div class="tabs"></div>');
        this.$main.append(this.$tabs);

        this.$thumbsButton = $('<a class="thumbs tab">' + this.content.thumbnails + '</a>');
        this.$thumbsButton.prop('title', this.content.thumbnails);
        this.$tabs.append(this.$thumbsButton);

        this.$resourcesButton = $('<a class="resources tab">' + this.content.resources+ '</a>');
        this.$resourcesButton.prop('title', this.content.resources);
        this.$tabs.append(this.$resourcesButton);
         */
        this.$tabsContent = $('<div class="tabsContent"></div>');
        this.$main.append(this.$tabsContent);
        this.$views = $('<div class="views"></div>');
        this.$tabsContent.append(this.$views);
        this.$thumbsView = $('<div class="thumbsView"></div>');
        this.$views.append(this.$thumbsView);
        this.$resourcesView = $('<div class="resourcesView"></div>');
        this.$resources = $('<ul></ul>');
        this.$resourcesView.append(this.$resources);
        this.$views.append(this.$resourcesView);
        this.thumbsView = new _ThumbsView__WEBPACK_IMPORTED_MODULE_2__["ThumbsView"](this.$thumbsView);
        this.dataBind();
    };
    ResourcesLeftPanel.prototype.dataBind = function () {
        this.dataBindThumbsView();
        var annotations = this.extension.helper.getCurrentCanvas().getResources();
        if (annotations.length === 0) {
            this.$resourcesView.hide();
        }
        for (var i = 0; i < annotations.length; i++) {
            var annotation = annotations[i];
            var resource = annotation.getResource();
            if (resource) {
                var label = manifesto_js__WEBPACK_IMPORTED_MODULE_5__["LanguageMap"].getValue(resource.getLabel());
                if (label) {
                    var mime = _edsilv_utils__WEBPACK_IMPORTED_MODULE_4__["Files"].simplifyMimeType(resource.getFormat().toString());
                    var $listItem = $('<li><a href="' + resource.id + '" target="_blank">' + label + ' (' + mime + ')' + '</li>');
                    this.$resources.append($listItem);
                }
            }
        }
    };
    ResourcesLeftPanel.prototype.dataBindThumbsView = function () {
        if (!this.thumbsView)
            return;
        var width;
        var height;
        var viewingDirection = this.extension.helper.getViewingDirection();
        if (viewingDirection && (viewingDirection === _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_3__["ViewingDirection"].LEFT_TO_RIGHT || viewingDirection === _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_3__["ViewingDirection"].RIGHT_TO_LEFT)) {
            width = this.config.options.twoColThumbWidth;
            height = this.config.options.twoColThumbHeight;
        }
        else {
            width = this.config.options.oneColThumbWidth;
            height = this.config.options.oneColThumbHeight;
        }
        if (typeof (width) === "undefined") {
            width = 100;
        }
        if (typeof (height) === "undefined") {
            height = 100;
        }
        this.thumbsView.thumbs = this.extension.helper.getThumbs(width, height);
        // hide thumb selector for single-part manifests
        if (this.thumbsView.thumbs.length < 2) {
            this.$thumbsView.hide();
        }
        this.thumbsView.databind();
    };
    ResourcesLeftPanel.prototype.expandFullStart = function () {
        _super.prototype.expandFullStart.call(this);
        this.component.publish(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].LEFTPANEL_EXPAND_FULL_START);
    };
    ResourcesLeftPanel.prototype.expandFullFinish = function () {
        _super.prototype.expandFullFinish.call(this);
        this.component.publish(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].LEFTPANEL_EXPAND_FULL_FINISH);
    };
    ResourcesLeftPanel.prototype.collapseFullStart = function () {
        _super.prototype.collapseFullStart.call(this);
        this.component.publish(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].LEFTPANEL_COLLAPSE_FULL_START);
    };
    ResourcesLeftPanel.prototype.collapseFullFinish = function () {
        _super.prototype.collapseFullFinish.call(this);
        this.component.publish(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].LEFTPANEL_COLLAPSE_FULL_FINISH);
    };
    ResourcesLeftPanel.prototype.resize = function () {
        _super.prototype.resize.call(this);
        this.$views.height(this.$main.height());
        this.$resources.height(this.$main.height());
    };
    return ResourcesLeftPanel;
}(_uv_shared_module_LeftPanel__WEBPACK_IMPORTED_MODULE_1__["LeftPanel"]));



/***/ }),

/***/ "./src/modules/uv-resourcesleftpanel-module/ThumbsView.ts":
/*!****************************************************************!*\
  !*** ./src/modules/uv-resourcesleftpanel-module/ThumbsView.ts ***!
  \****************************************************************/
/*! exports provided: ThumbsView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ThumbsView", function() { return ThumbsView; });
/* harmony import */ var _uv_shared_module_ThumbsView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../uv-shared-module/ThumbsView */ "./src/modules/uv-shared-module/ThumbsView.ts");
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
        this.setConfig('resourcesLeftPanel');
        _super.prototype.create.call(this);
    };
    return ThumbsView;
}(_uv_shared_module_ThumbsView__WEBPACK_IMPORTED_MODULE_0__["ThumbsView"]));



/***/ }),

/***/ "./src/modules/uv-shared-module/Bookmark.ts":
/*!**************************************************!*\
  !*** ./src/modules/uv-shared-module/Bookmark.ts ***!
  \**************************************************/
/*! exports provided: Bookmark */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Bookmark", function() { return Bookmark; });
var Bookmark = /** @class */ (function () {
    function Bookmark() {
    }
    return Bookmark;
}());



/***/ })

}]);
//# sourceMappingURL=uv-pdf-extension.8787757ff4a8f8e6540e.js.map