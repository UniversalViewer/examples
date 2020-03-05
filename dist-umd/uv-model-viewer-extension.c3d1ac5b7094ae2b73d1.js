(window["webpackJsonpUV"] = window["webpackJsonpUV"] || []).push([["uv-model-viewer-extension"],{

/***/ "./src/extensions/uv-model-viewer-extension/DownloadDialogue.ts":
/*!**********************************************************************!*\
  !*** ./src/extensions/uv-model-viewer-extension/DownloadDialogue.ts ***!
  \**********************************************************************/
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
        this.updateNoneAvailable();
        this.resize();
    };
    DownloadDialogue.prototype.isDownloadOptionAvailable = function (option) {
        return _super.prototype.isDownloadOptionAvailable.call(this, option);
    };
    return DownloadDialogue;
}(_modules_uv_dialogues_module_DownloadDialogue__WEBPACK_IMPORTED_MODULE_0__["DownloadDialogue"]));



/***/ }),

/***/ "./src/extensions/uv-model-viewer-extension/Extension.ts":
/*!***************************************************************!*\
  !*** ./src/extensions/uv-model-viewer-extension/Extension.ts ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../modules/uv-shared-module/BaseEvents */ "./src/modules/uv-shared-module/BaseEvents.ts");
/* harmony import */ var _modules_uv_shared_module_BaseExtension__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../modules/uv-shared-module/BaseExtension */ "./src/modules/uv-shared-module/BaseExtension.ts");
/* harmony import */ var _modules_uv_shared_module_Bookmark__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../modules/uv-shared-module/Bookmark */ "./src/modules/uv-shared-module/Bookmark.ts");
/* harmony import */ var _modules_uv_contentleftpanel_module_ContentLeftPanel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../modules/uv-contentleftpanel-module/ContentLeftPanel */ "./src/modules/uv-contentleftpanel-module/ContentLeftPanel.ts");
/* harmony import */ var _DownloadDialogue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DownloadDialogue */ "./src/extensions/uv-model-viewer-extension/DownloadDialogue.ts");
/* harmony import */ var _modules_uv_shared_module_FooterPanel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../modules/uv-shared-module/FooterPanel */ "./src/modules/uv-shared-module/FooterPanel.ts");
/* harmony import */ var _modules_uv_shared_module_HeaderPanel__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../modules/uv-shared-module/HeaderPanel */ "./src/modules/uv-shared-module/HeaderPanel.ts");
/* harmony import */ var _modules_uv_moreinforightpanel_module_MoreInfoRightPanel__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../modules/uv-moreinforightpanel-module/MoreInfoRightPanel */ "./src/modules/uv-moreinforightpanel-module/MoreInfoRightPanel.ts");
/* harmony import */ var _SettingsDialogue__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./SettingsDialogue */ "./src/extensions/uv-model-viewer-extension/SettingsDialogue.ts");
/* harmony import */ var _ShareDialogue__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./ShareDialogue */ "./src/extensions/uv-model-viewer-extension/ShareDialogue.ts");
/* harmony import */ var _modules_uv_modelviewercenterpanel_module_ModelViewerCenterPanel__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../modules/uv-modelviewercenterpanel-module/ModelViewerCenterPanel */ "./src/modules/uv-modelviewercenterpanel-module/ModelViewerCenterPanel.ts");
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
        _super.prototype.create.call(this);
        this.component.subscribe(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].CANVAS_INDEX_CHANGED, function (canvasIndex) {
            _this.viewCanvas(canvasIndex);
        });
        this.component.subscribe(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].THUMB_SELECTED, function (canvasIndex) {
            _this.component.publish(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].CANVAS_INDEX_CHANGED, canvasIndex);
        });
    };
    Extension.prototype.createModules = function () {
        _super.prototype.createModules.call(this);
        if (this.isHeaderPanelEnabled()) {
            this.headerPanel = new _modules_uv_shared_module_HeaderPanel__WEBPACK_IMPORTED_MODULE_6__["HeaderPanel"](this.shell.$headerPanel);
        }
        else {
            this.shell.$headerPanel.hide();
        }
        if (this.isLeftPanelEnabled()) {
            this.leftPanel = new _modules_uv_contentleftpanel_module_ContentLeftPanel__WEBPACK_IMPORTED_MODULE_3__["ContentLeftPanel"](this.shell.$leftPanel);
        }
        this.centerPanel = new _modules_uv_modelviewercenterpanel_module_ModelViewerCenterPanel__WEBPACK_IMPORTED_MODULE_10__["ModelViewerCenterPanel"](this.shell.$centerPanel);
        if (this.isRightPanelEnabled()) {
            this.rightPanel = new _modules_uv_moreinforightpanel_module_MoreInfoRightPanel__WEBPACK_IMPORTED_MODULE_7__["MoreInfoRightPanel"](this.shell.$rightPanel);
        }
        if (this.isFooterPanelEnabled()) {
            this.footerPanel = new _modules_uv_shared_module_FooterPanel__WEBPACK_IMPORTED_MODULE_5__["FooterPanel"](this.shell.$footerPanel);
        }
        else {
            this.shell.$footerPanel.hide();
        }
        this.$downloadDialogue = $('<div class="overlay download" aria-hidden="true"></div>');
        this.shell.$overlays.append(this.$downloadDialogue);
        this.downloadDialogue = new _DownloadDialogue__WEBPACK_IMPORTED_MODULE_4__["DownloadDialogue"](this.$downloadDialogue);
        this.$shareDialogue = $('<div class="overlay share" aria-hidden="true"></div>');
        this.shell.$overlays.append(this.$shareDialogue);
        this.shareDialogue = new _ShareDialogue__WEBPACK_IMPORTED_MODULE_9__["ShareDialogue"](this.$shareDialogue);
        this.$settingsDialogue = $('<div class="overlay settings" aria-hidden="true"></div>');
        this.shell.$overlays.append(this.$settingsDialogue);
        this.settingsDialogue = new _SettingsDialogue__WEBPACK_IMPORTED_MODULE_8__["SettingsDialogue"](this.$settingsDialogue);
        if (this.isLeftPanelEnabled()) {
            this.leftPanel.init();
        }
        else {
            this.shell.$leftPanel.hide();
        }
        if (this.isRightPanelEnabled()) {
            this.rightPanel.init();
        }
        else {
            this.shell.$rightPanel.hide();
        }
    };
    Extension.prototype.render = function () {
        _super.prototype.render.call(this);
    };
    // dependencyLoaded(index: number, dep: any): void {
    //     if (index === 0) {
    //         window.THREE = dep; //https://github.com/mrdoob/three.js/issues/9602
    //     }
    // }
    Extension.prototype.isLeftPanelEnabled = function () {
        return _edsilv_utils__WEBPACK_IMPORTED_MODULE_12__["Bools"].getBool(this.data.config.options.leftPanelEnabled, true)
            && (this.helper.isMultiCanvas() || this.helper.isMultiSequence());
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
        bookmark.type = _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_11__["ExternalResourceType"].PHYSICAL_OBJECT;
        this.fire(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].BOOKMARK, bookmark);
    };
    Extension.prototype.getEmbedScript = function (template, width, height) {
        //const configUri: string = this.data.config.uri || '';
        //const script: string = String.format(template, this.getSerializedLocales(), configUri, this.helper.manifestUri, this.helper.collectionIndex, this.helper.manifestIndex, this.helper.sequenceIndex, this.helper.canvasIndex, width, height, this.data.embedScriptUri);
        var appUri = this.getAppUri();
        var iframeSrc = appUri + "#?manifest=" + this.helper.manifestUri + "&c=" + this.helper.collectionIndex + "&m=" + this.helper.manifestIndex + "&s=" + this.helper.sequenceIndex + "&cv=" + this.helper.canvasIndex;
        var script = _edsilv_utils__WEBPACK_IMPORTED_MODULE_12__["Strings"].format(template, iframeSrc, width.toString(), height.toString());
        return script;
    };
    return Extension;
}(_modules_uv_shared_module_BaseExtension__WEBPACK_IMPORTED_MODULE_1__["BaseExtension"]));
/* harmony default export */ __webpack_exports__["default"] = (Extension);


/***/ }),

/***/ "./src/extensions/uv-model-viewer-extension/SettingsDialogue.ts":
/*!**********************************************************************!*\
  !*** ./src/extensions/uv-model-viewer-extension/SettingsDialogue.ts ***!
  \**********************************************************************/
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

/***/ "./src/extensions/uv-model-viewer-extension/ShareDialogue.ts":
/*!*******************************************************************!*\
  !*** ./src/extensions/uv-model-viewer-extension/ShareDialogue.ts ***!
  \*******************************************************************/
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

/***/ "./src/modules/uv-modelviewercenterpanel-module/ModelViewerCenterPanel.ts":
/*!********************************************************************************!*\
  !*** ./src/modules/uv-modelviewercenterpanel-module/ModelViewerCenterPanel.ts ***!
  \********************************************************************************/
/*! exports provided: ModelViewerCenterPanel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModelViewerCenterPanel", function() { return ModelViewerCenterPanel; });
/* harmony import */ var _google_model_viewer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @google/model-viewer */ "./node_modules/@google/model-viewer/lib/model-viewer.js");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Utils */ "./src/Utils.ts");
/* harmony import */ var _uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../uv-shared-module/BaseEvents */ "./src/modules/uv-shared-module/BaseEvents.ts");
/* harmony import */ var _uv_shared_module_CenterPanel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../uv-shared-module/CenterPanel */ "./src/modules/uv-shared-module/CenterPanel.ts");
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




var ModelViewerCenterPanel = /** @class */ (function (_super) {
    __extends(ModelViewerCenterPanel, _super);
    function ModelViewerCenterPanel($element) {
        return _super.call(this, $element) || this;
    }
    ModelViewerCenterPanel.prototype.create = function () {
        this.setConfig('modelViewerCenterPanel');
        _super.prototype.create.call(this);
        var that = this;
        this.component.subscribe(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_2__["BaseEvents"].OPEN_EXTERNAL_RESOURCE, function (resources) {
            that.openMedia(resources);
        });
        this.title = this.extension.helper.getLabel();
        this.component.publish(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_2__["BaseEvents"].OPENED_MEDIA);
    };
    ModelViewerCenterPanel.prototype.openMedia = function (resources) {
        return __awaiter(this, void 0, void 0, function () {
            var mediaUri, canvas, formats;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.extension.getExternalResources(resources)];
                    case 1:
                        _a.sent();
                        this.$content.empty();
                        mediaUri = null;
                        canvas = this.extension.helper.getCurrentCanvas();
                        formats = this.extension.getMediaFormats(canvas);
                        if (formats && formats.length) {
                            mediaUri = formats[0].id;
                        }
                        else {
                            mediaUri = canvas.id;
                        }
                        this.$modelViewer = $('<model-viewer src="' + mediaUri + '" auto-rotate camera-controls></model-viewer>');
                        this.$content.append(this.$modelViewer);
                        this.component.publish(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_2__["BaseEvents"].OPENED_MEDIA);
                        return [2 /*return*/];
                }
            });
        });
    };
    ModelViewerCenterPanel.prototype.resize = function () {
        _super.prototype.resize.call(this);
        if (this.title) {
            this.$title.text(Object(_Utils__WEBPACK_IMPORTED_MODULE_1__["sanitize"])(this.title));
        }
        if (this.$modelViewer) {
            this.$modelViewer.width(this.$content.width());
            this.$modelViewer.height(this.$content.height());
        }
    };
    return ModelViewerCenterPanel;
}(_uv_shared_module_CenterPanel__WEBPACK_IMPORTED_MODULE_3__["CenterPanel"]));



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
//# sourceMappingURL=uv-model-viewer-extension.c3d1ac5b7094ae2b73d1.js.map