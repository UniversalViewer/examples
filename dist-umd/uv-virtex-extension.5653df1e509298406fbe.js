(window["webpackJsonpUV"] = window["webpackJsonpUV"] || []).push([["uv-virtex-extension"],{

/***/ "./src/extensions/uv-virtex-extension/DownloadDialogue.ts":
/*!****************************************************************!*\
  !*** ./src/extensions/uv-virtex-extension/DownloadDialogue.ts ***!
  \****************************************************************/
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

/***/ "./src/extensions/uv-virtex-extension/Extension.ts":
/*!*********************************************************!*\
  !*** ./src/extensions/uv-virtex-extension/Extension.ts ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../modules/uv-shared-module/BaseEvents */ "./src/modules/uv-shared-module/BaseEvents.ts");
/* harmony import */ var _modules_uv_shared_module_BaseExtension__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../modules/uv-shared-module/BaseExtension */ "./src/modules/uv-shared-module/BaseExtension.ts");
/* harmony import */ var _modules_uv_shared_module_Bookmark__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../modules/uv-shared-module/Bookmark */ "./src/modules/uv-shared-module/Bookmark.ts");
/* harmony import */ var _modules_uv_contentleftpanel_module_ContentLeftPanel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../modules/uv-contentleftpanel-module/ContentLeftPanel */ "./src/modules/uv-contentleftpanel-module/ContentLeftPanel.ts");
/* harmony import */ var _DownloadDialogue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DownloadDialogue */ "./src/extensions/uv-virtex-extension/DownloadDialogue.ts");
/* harmony import */ var _modules_uv_shared_module_FooterPanel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../modules/uv-shared-module/FooterPanel */ "./src/modules/uv-shared-module/FooterPanel.ts");
/* harmony import */ var _modules_uv_shared_module_HeaderPanel__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../modules/uv-shared-module/HeaderPanel */ "./src/modules/uv-shared-module/HeaderPanel.ts");
/* harmony import */ var _modules_uv_moreinforightpanel_module_MoreInfoRightPanel__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../modules/uv-moreinforightpanel-module/MoreInfoRightPanel */ "./src/modules/uv-moreinforightpanel-module/MoreInfoRightPanel.ts");
/* harmony import */ var _SettingsDialogue__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./SettingsDialogue */ "./src/extensions/uv-virtex-extension/SettingsDialogue.ts");
/* harmony import */ var _ShareDialogue__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./ShareDialogue */ "./src/extensions/uv-virtex-extension/ShareDialogue.ts");
/* harmony import */ var _modules_uv_virtexcenterpanel_module_VirtexCenterPanel__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../modules/uv-virtexcenterpanel-module/VirtexCenterPanel */ "./src/modules/uv-virtexcenterpanel-module/VirtexCenterPanel.ts");
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
        this.centerPanel = new _modules_uv_virtexcenterpanel_module_VirtexCenterPanel__WEBPACK_IMPORTED_MODULE_10__["VirtexCenterPanel"](this.shell.$centerPanel);
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

/***/ "./src/extensions/uv-virtex-extension/SettingsDialogue.ts":
/*!****************************************************************!*\
  !*** ./src/extensions/uv-virtex-extension/SettingsDialogue.ts ***!
  \****************************************************************/
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

/***/ "./src/extensions/uv-virtex-extension/ShareDialogue.ts":
/*!*************************************************************!*\
  !*** ./src/extensions/uv-virtex-extension/ShareDialogue.ts ***!
  \*************************************************************/
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



/***/ }),

/***/ "./src/modules/uv-virtexcenterpanel-module/VirtexCenterPanel.ts":
/*!**********************************************************************!*\
  !*** ./src/modules/uv-virtexcenterpanel-module/VirtexCenterPanel.ts ***!
  \**********************************************************************/
/*! exports provided: VirtexCenterPanel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VirtexCenterPanel", function() { return VirtexCenterPanel; });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var three_examples_js_controls_VRControls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three/examples/js/controls/VRControls */ "./node_modules/three/examples/js/controls/VRControls.js");
/* harmony import */ var three_examples_js_controls_VRControls__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(three_examples_js_controls_VRControls__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var three_examples_js_Detector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three/examples/js/Detector */ "./node_modules/three/examples/js/Detector.js");
/* harmony import */ var three_examples_js_Detector__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(three_examples_js_Detector__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var three_examples_js_effects_VREffect__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! three/examples/js/effects/VREffect */ "./node_modules/three/examples/js/effects/VREffect.js");
/* harmony import */ var three_examples_js_effects_VREffect__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(three_examples_js_effects_VREffect__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var three_examples_js_libs_stats_min__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! three/examples/js/libs/stats.min */ "./node_modules/three/examples/js/libs/stats.min.js");
/* harmony import */ var three_examples_js_libs_stats_min__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(three_examples_js_libs_stats_min__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var three_examples_js_loaders_GLTFLoader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! three/examples/js/loaders/GLTFLoader */ "./node_modules/three/examples/js/loaders/GLTFLoader.js");
/* harmony import */ var three_examples_js_loaders_GLTFLoader__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(three_examples_js_loaders_GLTFLoader__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var three_examples_js_loaders_MTLLoader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! three/examples/js/loaders/MTLLoader */ "./node_modules/three/examples/js/loaders/MTLLoader.js");
/* harmony import */ var three_examples_js_loaders_MTLLoader__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(three_examples_js_loaders_MTLLoader__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var three_examples_js_loaders_OBJLoader__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! three/examples/js/loaders/OBJLoader */ "./node_modules/three/examples/js/loaders/OBJLoader.js");
/* harmony import */ var three_examples_js_loaders_OBJLoader__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(three_examples_js_loaders_OBJLoader__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var three_examples_js_loaders_PLYLoader__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! three/examples/js/loaders/PLYLoader */ "./node_modules/three/examples/js/loaders/PLYLoader.js");
/* harmony import */ var three_examples_js_loaders_PLYLoader__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(three_examples_js_loaders_PLYLoader__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var three_examples_js_vr_WebVR__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! three/examples/js/vr/WebVR */ "./node_modules/three/examples/js/vr/WebVR.js");
/* harmony import */ var three_examples_js_vr_WebVR__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(three_examples_js_vr_WebVR__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _edsilv_utils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @edsilv/utils */ "./node_modules/@edsilv/utils/dist-esmodule/index.js");
/* harmony import */ var _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @iiif/vocabulary */ "./node_modules/@iiif/vocabulary/dist-esmodule/index.js");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../Utils */ "./src/Utils.ts");
/* harmony import */ var virtex3d__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! virtex3d */ "./node_modules/virtex3d/dist-esmodule/index.js");
/* harmony import */ var _uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../uv-shared-module/BaseEvents */ "./src/modules/uv-shared-module/BaseEvents.ts");
/* harmony import */ var _uv_shared_module_CenterPanel__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../uv-shared-module/CenterPanel */ "./src/modules/uv-shared-module/CenterPanel.ts");
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
















var VirtexCenterPanel = /** @class */ (function (_super) {
    __extends(VirtexCenterPanel, _super);
    function VirtexCenterPanel($element) {
        return _super.call(this, $element) || this;
    }
    VirtexCenterPanel.prototype.create = function () {
        var _this = this;
        this.setConfig('virtexCenterPanel');
        _super.prototype.create.call(this);
        var that = this;
        this.component.subscribe(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_14__["BaseEvents"].OPEN_EXTERNAL_RESOURCE, function (resources) {
            that.openMedia(resources);
        });
        this.$navigation = $('<div class="navigation"></div>');
        this.$content.prepend(this.$navigation);
        this.$zoomInButton = $("\n          <button class=\"btn imageBtn zoomIn\" title=\"" + this.content.zoomIn + "\">\n            <i class=\"uv-icon-zoom-in\" aria-hidden=\"true\"></i>" + this.content.zoomIn + "\n          </button>\n        ");
        this.$navigation.append(this.$zoomInButton);
        this.$zoomOutButton = $("\n          <button class=\"btn imageBtn zoomOut\" title=\"" + this.content.zoomOut + "\">\n            <i class=\"uv-icon-zoom-out\" aria-hidden=\"true\"></i>" + this.content.zoomOut + "\n          </button>\n        ");
        this.$navigation.append(this.$zoomOutButton);
        this.$vrButton = $("\n          <button class=\"btn imageBtn vr\" title=\"" + this.content.vr + "\">\n            <i class=\"uv-icon-vr\" aria-hidden=\"true\"></i>" + this.content.vr + "\n          </button>\n        ");
        this.$navigation.append(this.$vrButton);
        this.$viewport = $('<div class="virtex"></div>');
        this.$content.prepend(this.$viewport);
        this.title = this.extension.helper.getLabel();
        this.$zoomInButton.on('click', function (e) {
            e.preventDefault();
            if (_this.viewport) {
                _this.viewport.zoomIn();
            }
        });
        this.$zoomOutButton.on('click', function (e) {
            e.preventDefault();
            if (_this.viewport) {
                _this.viewport.zoomOut();
            }
        });
        this.$vrButton.on('click', function (e) {
            e.preventDefault();
            if (_this.viewport) {
                _this.viewport.toggleVR();
            }
        });
        if (!this._isVREnabled()) {
            this.$vrButton.hide();
        }
        this.component.publish(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_14__["BaseEvents"].OPENED_MEDIA);
    };
    VirtexCenterPanel.prototype.openMedia = function (resources) {
        return __awaiter(this, void 0, void 0, function () {
            var mediaUri, canvas, formats, resourceType, fileType, isAndroid;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.extension.getExternalResources(resources)];
                    case 1:
                        _a.sent();
                        this.$viewport.empty();
                        mediaUri = null;
                        canvas = this.extension.helper.getCurrentCanvas();
                        formats = this.extension.getMediaFormats(canvas);
                        resourceType = null;
                        fileType = _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_11__["MediaType"].THREEJS;
                        if (formats && formats.length) {
                            mediaUri = formats[0].id;
                            resourceType = formats[0].getFormat();
                        }
                        else {
                            mediaUri = canvas.id;
                        }
                        if (resourceType) {
                            fileType = resourceType;
                        }
                        isAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1;
                        this.viewport = new virtex3d__WEBPACK_IMPORTED_MODULE_13__["Viewport"]({
                            target: this.$viewport[0],
                            data: {
                                antialias: !isAndroid,
                                file: mediaUri,
                                fullscreenEnabled: false,
                                type: fileType,
                                showStats: this.options.showStats
                            }
                        });
                        if (this.viewport) {
                            this.viewport.on('vravailable', function () {
                                _this.$vrButton.show();
                            }, false);
                            this.viewport.on('vrunavailable', function () {
                                _this.$vrButton.hide();
                            }, false);
                        }
                        this.component.publish(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_14__["BaseEvents"].OPENED_MEDIA);
                        return [2 /*return*/];
                }
            });
        });
    };
    VirtexCenterPanel.prototype._isVREnabled = function () {
        return (_edsilv_utils__WEBPACK_IMPORTED_MODULE_10__["Bools"].getBool(this.config.options.vrEnabled, false) && WEBVR.isAvailable());
    };
    VirtexCenterPanel.prototype.resize = function () {
        _super.prototype.resize.call(this);
        if (this.title) {
            this.$title.text(Object(_Utils__WEBPACK_IMPORTED_MODULE_12__["sanitize"])(this.title));
        }
        this.$viewport.width(this.$content.width());
        this.$viewport.height(this.$content.height());
        if (this.viewport) {
            this.viewport.resize();
        }
    };
    return VirtexCenterPanel;
}(_uv_shared_module_CenterPanel__WEBPACK_IMPORTED_MODULE_15__["CenterPanel"]));



/***/ })

}]);
//# sourceMappingURL=uv-virtex-extension.5653df1e509298406fbe.js.map