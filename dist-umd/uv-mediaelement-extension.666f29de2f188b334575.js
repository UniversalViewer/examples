(window["webpackJsonpUV"] = window["webpackJsonpUV"] || []).push([["uv-mediaelement-extension"],{

/***/ "./src/extensions/uv-mediaelement-extension/DownloadDialogue.ts":
/*!**********************************************************************!*\
  !*** ./src/extensions/uv-mediaelement-extension/DownloadDialogue.ts ***!
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

/***/ "./src/extensions/uv-mediaelement-extension/Events.ts":
/*!************************************************************!*\
  !*** ./src/extensions/uv-mediaelement-extension/Events.ts ***!
  \************************************************************/
/*! exports provided: Events */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Events", function() { return Events; });
var Events = /** @class */ (function () {
    function Events() {
    }
    Events.namespace = 'mediaelementExtension.';
    Events.MEDIA_ENDED = Events.namespace + 'mediaEnded';
    Events.MEDIA_PAUSED = Events.namespace + 'mediaPaused';
    Events.MEDIA_PLAYED = Events.namespace + 'mediaPlayed';
    return Events;
}());



/***/ }),

/***/ "./src/extensions/uv-mediaelement-extension/Extension.ts":
/*!***************************************************************!*\
  !*** ./src/extensions/uv-mediaelement-extension/Extension.ts ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../modules/uv-shared-module/BaseEvents */ "./src/modules/uv-shared-module/BaseEvents.ts");
/* harmony import */ var _modules_uv_shared_module_BaseExtension__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../modules/uv-shared-module/BaseExtension */ "./src/modules/uv-shared-module/BaseExtension.ts");
/* harmony import */ var _modules_uv_shared_module_Bookmark__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../modules/uv-shared-module/Bookmark */ "./src/modules/uv-shared-module/Bookmark.ts");
/* harmony import */ var _DownloadDialogue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DownloadDialogue */ "./src/extensions/uv-mediaelement-extension/DownloadDialogue.ts");
/* harmony import */ var _Events__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Events */ "./src/extensions/uv-mediaelement-extension/Events.ts");
/* harmony import */ var _modules_uv_shared_module_FooterPanel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../modules/uv-shared-module/FooterPanel */ "./src/modules/uv-shared-module/FooterPanel.ts");
/* harmony import */ var _modules_uv_shared_module_HeaderPanel__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../modules/uv-shared-module/HeaderPanel */ "./src/modules/uv-shared-module/HeaderPanel.ts");
/* harmony import */ var _modules_uv_dialogues_module_HelpDialogue__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../modules/uv-dialogues-module/HelpDialogue */ "./src/modules/uv-dialogues-module/HelpDialogue.ts");
/* harmony import */ var _modules_uv_mediaelementcenterpanel_module_MediaElementCenterPanel__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../modules/uv-mediaelementcenterpanel-module/MediaElementCenterPanel */ "./src/modules/uv-mediaelementcenterpanel-module/MediaElementCenterPanel.ts");
/* harmony import */ var _modules_uv_moreinforightpanel_module_MoreInfoRightPanel__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../modules/uv-moreinforightpanel-module/MoreInfoRightPanel */ "./src/modules/uv-moreinforightpanel-module/MoreInfoRightPanel.ts");
/* harmony import */ var _modules_uv_resourcesleftpanel_module_ResourcesLeftPanel__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../modules/uv-resourcesleftpanel-module/ResourcesLeftPanel */ "./src/modules/uv-resourcesleftpanel-module/ResourcesLeftPanel.ts");
/* harmony import */ var _SettingsDialogue__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./SettingsDialogue */ "./src/extensions/uv-mediaelement-extension/SettingsDialogue.ts");
/* harmony import */ var _ShareDialogue__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./ShareDialogue */ "./src/extensions/uv-mediaelement-extension/ShareDialogue.ts");
/* harmony import */ var _edsilv_utils__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @edsilv/utils */ "./node_modules/@edsilv/utils/dist-esmodule/index.js");
/* harmony import */ var _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @iiif/vocabulary */ "./node_modules/@iiif/vocabulary/dist-esmodule/index.js");
/* harmony import */ var manifesto_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! manifesto.js */ "./node_modules/manifesto.js/dist-umd/manifesto.js");
/* harmony import */ var manifesto_js__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(manifesto_js__WEBPACK_IMPORTED_MODULE_15__);
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
        // listen for mediaelement enter/exit fullscreen events.
        $(window).bind('enterfullscreen', function () {
            _this.component.publish(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].TOGGLE_FULLSCREEN);
        });
        $(window).bind('exitfullscreen', function () {
            _this.component.publish(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].TOGGLE_FULLSCREEN);
        });
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
        this.component.subscribe(_Events__WEBPACK_IMPORTED_MODULE_4__["Events"].MEDIA_ENDED, function () {
            _this.fire(_Events__WEBPACK_IMPORTED_MODULE_4__["Events"].MEDIA_ENDED);
        });
        this.component.subscribe(_Events__WEBPACK_IMPORTED_MODULE_4__["Events"].MEDIA_PAUSED, function () {
            _this.fire(_Events__WEBPACK_IMPORTED_MODULE_4__["Events"].MEDIA_PAUSED);
        });
        this.component.subscribe(_Events__WEBPACK_IMPORTED_MODULE_4__["Events"].MEDIA_PLAYED, function () {
            _this.fire(_Events__WEBPACK_IMPORTED_MODULE_4__["Events"].MEDIA_PLAYED);
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
            this.leftPanel = new _modules_uv_resourcesleftpanel_module_ResourcesLeftPanel__WEBPACK_IMPORTED_MODULE_10__["ResourcesLeftPanel"](this.shell.$leftPanel);
        }
        this.centerPanel = new _modules_uv_mediaelementcenterpanel_module_MediaElementCenterPanel__WEBPACK_IMPORTED_MODULE_8__["MediaElementCenterPanel"](this.shell.$centerPanel);
        if (this.isRightPanelEnabled()) {
            this.rightPanel = new _modules_uv_moreinforightpanel_module_MoreInfoRightPanel__WEBPACK_IMPORTED_MODULE_9__["MoreInfoRightPanel"](this.shell.$rightPanel);
        }
        if (this.isFooterPanelEnabled()) {
            this.footerPanel = new _modules_uv_shared_module_FooterPanel__WEBPACK_IMPORTED_MODULE_5__["FooterPanel"](this.shell.$footerPanel);
        }
        else {
            this.shell.$footerPanel.hide();
        }
        this.$helpDialogue = $('<div class="overlay help" aria-hidden="true"></div>');
        this.shell.$overlays.append(this.$helpDialogue);
        this.helpDialogue = new _modules_uv_dialogues_module_HelpDialogue__WEBPACK_IMPORTED_MODULE_7__["HelpDialogue"](this.$helpDialogue);
        this.$downloadDialogue = $('<div class="overlay download" aria-hidden="true"></div>');
        this.shell.$overlays.append(this.$downloadDialogue);
        this.downloadDialogue = new _DownloadDialogue__WEBPACK_IMPORTED_MODULE_3__["DownloadDialogue"](this.$downloadDialogue);
        this.$shareDialogue = $('<div class="overlay share" aria-hidden="true"></div>');
        this.shell.$overlays.append(this.$shareDialogue);
        this.shareDialogue = new _ShareDialogue__WEBPACK_IMPORTED_MODULE_12__["ShareDialogue"](this.$shareDialogue);
        this.$settingsDialogue = $('<div class="overlay settings" aria-hidden="true"></div>');
        this.shell.$overlays.append(this.$settingsDialogue);
        this.settingsDialogue = new _SettingsDialogue__WEBPACK_IMPORTED_MODULE_11__["SettingsDialogue"](this.$settingsDialogue);
        if (this.isLeftPanelEnabled()) {
            this.leftPanel.init();
        }
        if (this.isRightPanelEnabled()) {
            this.rightPanel.init();
        }
    };
    Extension.prototype.render = function () {
        _super.prototype.render.call(this);
    };
    Extension.prototype.isLeftPanelEnabled = function () {
        return _edsilv_utils__WEBPACK_IMPORTED_MODULE_13__["Bools"].getBool(this.data.config.options.leftPanelEnabled, true)
            && ((this.helper.isMultiCanvas() || this.helper.isMultiSequence()) || this.helper.hasResources());
    };
    Extension.prototype.bookmark = function () {
        _super.prototype.bookmark.call(this);
        var canvas = this.extensions.helper.getCurrentCanvas();
        var bookmark = new _modules_uv_shared_module_Bookmark__WEBPACK_IMPORTED_MODULE_2__["Bookmark"]();
        bookmark.index = this.helper.canvasIndex;
        bookmark.label = manifesto_js__WEBPACK_IMPORTED_MODULE_15__["LanguageMap"].getValue(canvas.getLabel());
        bookmark.thumb = canvas.getProperty('thumbnail');
        bookmark.title = this.helper.getLabel();
        bookmark.trackingLabel = window.trackingLabel;
        if (this.isVideo()) {
            bookmark.type = _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_14__["ExternalResourceType"].MOVING_IMAGE;
        }
        else {
            bookmark.type = _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_14__["ExternalResourceType"].SOUND;
        }
        this.fire(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].BOOKMARK, bookmark);
    };
    Extension.prototype.getEmbedScript = function (template, width, height) {
        //const configUri: string = this.data.config.uri || '';
        //const script: string = String.format(template, this.getSerializedLocales(), configUri, this.helper.manifestUri, this.helper.collectionIndex, this.helper.manifestIndex, this.helper.sequenceIndex, this.helper.canvasIndex, width, height, this.data.embedScriptUri);
        var appUri = this.getAppUri();
        var iframeSrc = appUri + "#?manifest=" + this.helper.manifestUri + "&c=" + this.helper.collectionIndex + "&m=" + this.helper.manifestIndex + "&s=" + this.helper.sequenceIndex + "&cv=" + this.helper.canvasIndex;
        var script = _edsilv_utils__WEBPACK_IMPORTED_MODULE_13__["Strings"].format(template, iframeSrc, width.toString(), height.toString());
        return script;
    };
    // todo: use canvas.getThumbnail()
    Extension.prototype.getPosterImageUri = function () {
        var canvas = this.helper.getCurrentCanvas();
        var annotations = canvas.getContent();
        if (annotations && annotations.length) {
            return annotations[0].getProperty('thumbnail');
        }
        else {
            return canvas.getProperty('thumbnail');
        }
    };
    Extension.prototype.isVideoFormat = function (type) {
        var videoFormats = [_iiif_vocabulary__WEBPACK_IMPORTED_MODULE_14__["MediaType"].VIDEO_MP4, _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_14__["MediaType"].WEBM];
        return videoFormats.indexOf(type) != -1;
    };
    Extension.prototype.isVideo = function () {
        var canvas = this.helper.getCurrentCanvas();
        var annotations = canvas.getContent();
        if (annotations && annotations.length) {
            var formats = this.getMediaFormats(canvas);
            for (var i = 0; i < formats.length; i++) {
                var format = formats[i];
                var type = format.getFormat();
                if (type) {
                    if (this.isVideoFormat(type.toString())) {
                        return true;
                    }
                }
            }
        }
        else {
            var type = canvas.getType();
            if (type) {
                return type.toString() === _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_14__["ExternalResourceType"].MOVING_IMAGE;
            }
        }
        throw (new Error("Unable to determine media type"));
    };
    return Extension;
}(_modules_uv_shared_module_BaseExtension__WEBPACK_IMPORTED_MODULE_1__["BaseExtension"]));
/* harmony default export */ __webpack_exports__["default"] = (Extension);


/***/ }),

/***/ "./src/extensions/uv-mediaelement-extension/SettingsDialogue.ts":
/*!**********************************************************************!*\
  !*** ./src/extensions/uv-mediaelement-extension/SettingsDialogue.ts ***!
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

/***/ "./src/extensions/uv-mediaelement-extension/ShareDialogue.ts":
/*!*******************************************************************!*\
  !*** ./src/extensions/uv-mediaelement-extension/ShareDialogue.ts ***!
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

/***/ "./src/modules/uv-dialogues-module/HelpDialogue.ts":
/*!*********************************************************!*\
  !*** ./src/modules/uv-dialogues-module/HelpDialogue.ts ***!
  \*********************************************************/
/*! exports provided: HelpDialogue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HelpDialogue", function() { return HelpDialogue; });
/* harmony import */ var _uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../uv-shared-module/BaseEvents */ "./src/modules/uv-shared-module/BaseEvents.ts");
/* harmony import */ var _uv_shared_module_Dialogue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../uv-shared-module/Dialogue */ "./src/modules/uv-shared-module/Dialogue.ts");
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


var HelpDialogue = /** @class */ (function (_super) {
    __extends(HelpDialogue, _super);
    function HelpDialogue($element) {
        return _super.call(this, $element) || this;
    }
    HelpDialogue.prototype.create = function () {
        var _this = this;
        this.setConfig('helpDialogue');
        _super.prototype.create.call(this);
        this.openCommand = _uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].SHOW_HELP_DIALOGUE;
        this.closeCommand = _uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].HIDE_HELP_DIALOGUE;
        this.component.subscribe(this.openCommand, function () {
            _this.open();
        });
        this.component.subscribe(this.closeCommand, function () {
            _this.close();
        });
        this.$title = $('<h1></h1>');
        this.$content.append(this.$title);
        this.$scroll = $('<div class="scroll"></div>');
        this.$content.append(this.$scroll);
        this.$message = $('<p></p>');
        this.$scroll.append(this.$message);
        // initialise ui.
        this.$title.text(this.content.title);
        this.$message.html(this.content.text);
        // ensure anchor tags link to _blank.
        this.$message.targetBlank();
        this.$element.hide();
    };
    HelpDialogue.prototype.resize = function () {
        _super.prototype.resize.call(this);
    };
    return HelpDialogue;
}(_uv_shared_module_Dialogue__WEBPACK_IMPORTED_MODULE_1__["Dialogue"]));



/***/ }),

/***/ "./src/modules/uv-mediaelementcenterpanel-module/MediaElementCenterPanel.ts":
/*!**********************************************************************************!*\
  !*** ./src/modules/uv-mediaelementcenterpanel-module/MediaElementCenterPanel.ts ***!
  \**********************************************************************************/
/*! exports provided: MediaElementCenterPanel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MediaElementCenterPanel", function() { return MediaElementCenterPanel; });
/* harmony import */ var _uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../uv-shared-module/BaseEvents */ "./src/modules/uv-shared-module/BaseEvents.ts");
/* harmony import */ var _extensions_uv_mediaelement_extension_Events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../extensions/uv-mediaelement-extension/Events */ "./src/extensions/uv-mediaelement-extension/Events.ts");
/* harmony import */ var _uv_shared_module_CenterPanel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../uv-shared-module/CenterPanel */ "./src/modules/uv-shared-module/CenterPanel.ts");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Utils */ "./src/Utils.ts");
/* harmony import */ var _edsilv_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @edsilv/utils */ "./node_modules/@edsilv/utils/dist-esmodule/index.js");
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





var MediaElementCenterPanel = /** @class */ (function (_super) {
    __extends(MediaElementCenterPanel, _super);
    function MediaElementCenterPanel($element) {
        return _super.call(this, $element) || this;
    }
    MediaElementCenterPanel.prototype.create = function () {
        this.setConfig('mediaelementCenterPanel');
        _super.prototype.create.call(this);
        var that = this;
        // events.
        // only full screen video
        if (this.isVideo()) {
            this.component.subscribe(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].TOGGLE_FULLSCREEN, function () {
                if (that.component.isFullScreen) {
                    that.player.enterFullScreen(false);
                }
                else {
                    that.player.exitFullScreen(false);
                }
            });
        }
        this.component.subscribe(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].OPEN_EXTERNAL_RESOURCE, function (resources) {
            that.openMedia(resources);
        });
        this.$container = $('<div class="container"></div>');
        this.$content.append(this.$container);
        this.title = this.extension.helper.getLabel();
    };
    MediaElementCenterPanel.prototype.openMedia = function (resources) {
        return __awaiter(this, void 0, void 0, function () {
            var that, canvas, poster, sources, renderings, formats;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        that = this;
                        return [4 /*yield*/, this.extension.getExternalResources(resources)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, __webpack_require__.e(/*! import() | mediaelement */ "vendors~mediaelement").then(__webpack_require__.t.bind(null, /*! mediaelement/build/mediaelement-and-player */ "./node_modules/mediaelement/build/mediaelement-and-player.js", 7))];
                    case 2:
                        _a.sent();
                        this.$container.empty();
                        canvas = this.extension.helper.getCurrentCanvas();
                        this.mediaHeight = this.config.defaultHeight;
                        this.mediaWidth = this.config.defaultWidth;
                        this.$container.height(this.mediaHeight);
                        this.$container.width(this.mediaWidth);
                        poster = this.extension.getPosterImageUri();
                        sources = [];
                        renderings = canvas.getRenderings();
                        if (renderings && renderings.length) {
                            canvas.getRenderings().forEach(function (rendering) {
                                sources.push({
                                    type: rendering.getFormat().toString(),
                                    src: rendering.id
                                });
                            });
                        }
                        else {
                            formats = this.extension.getMediaFormats(this.extension.helper.getCurrentCanvas());
                            if (formats && formats.length) {
                                formats.forEach(function (format) {
                                    var type = format.getFormat();
                                    if (type) {
                                        sources.push({
                                            type: type.toString(),
                                            src: format.id
                                        });
                                    }
                                });
                            }
                        }
                        if (this.isVideo()) {
                            this.$media = $('<video controls="controls" preload="none"></video>');
                            this.$container.append(this.$media);
                            this.player = new MediaElementPlayer($('video')[0], {
                                //pluginPath: this.extension.data.root + 'lib/mediaelement/',
                                poster: poster,
                                features: ['playpause', 'current', 'progress', 'volume'],
                                success: function (mediaElement, originalNode) {
                                    mediaElement.addEventListener('canplay', function () {
                                        that.resize();
                                    });
                                    mediaElement.addEventListener('play', function () {
                                        that.component.publish(_extensions_uv_mediaelement_extension_Events__WEBPACK_IMPORTED_MODULE_1__["Events"].MEDIA_PLAYED, Math.floor(mediaElement.currentTime));
                                    });
                                    mediaElement.addEventListener('pause', function () {
                                        // mediaelement creates a pause event before the ended event. ignore this.
                                        if (Math.floor(mediaElement.currentTime) != Math.floor(mediaElement.duration)) {
                                            that.component.publish(_extensions_uv_mediaelement_extension_Events__WEBPACK_IMPORTED_MODULE_1__["Events"].MEDIA_PAUSED, Math.floor(mediaElement.currentTime));
                                        }
                                    });
                                    mediaElement.addEventListener('ended', function () {
                                        that.component.publish(_extensions_uv_mediaelement_extension_Events__WEBPACK_IMPORTED_MODULE_1__["Events"].MEDIA_ENDED, Math.floor(mediaElement.duration));
                                    });
                                    mediaElement.setSrc(sources);
                                }
                            });
                        }
                        else { // audio
                            this.$media = $('<audio controls="controls" preload="none"></audio>');
                            this.$container.append(this.$media);
                            this.player = new MediaElementPlayer($('audio')[0], {
                                poster: poster,
                                defaultAudioWidth: 'auto',
                                defaultAudioHeight: 'auto',
                                showPosterWhenPaused: true,
                                showPosterWhenEnded: true,
                                success: function (mediaElement, originalNode) {
                                    mediaElement.addEventListener('canplay', function () {
                                        that.resize();
                                    });
                                    mediaElement.addEventListener('play', function () {
                                        that.component.publish(_extensions_uv_mediaelement_extension_Events__WEBPACK_IMPORTED_MODULE_1__["Events"].MEDIA_PLAYED, Math.floor(mediaElement.currentTime));
                                    });
                                    mediaElement.addEventListener('pause', function () {
                                        // mediaelement creates a pause event before the ended event. ignore this.
                                        if (Math.floor(mediaElement.currentTime) != Math.floor(mediaElement.duration)) {
                                            that.component.publish(_extensions_uv_mediaelement_extension_Events__WEBPACK_IMPORTED_MODULE_1__["Events"].MEDIA_PAUSED, Math.floor(mediaElement.currentTime));
                                        }
                                    });
                                    mediaElement.addEventListener('ended', function () {
                                        that.component.publish(_extensions_uv_mediaelement_extension_Events__WEBPACK_IMPORTED_MODULE_1__["Events"].MEDIA_ENDED, Math.floor(mediaElement.duration));
                                    });
                                    mediaElement.setSrc(sources);
                                }
                            });
                        }
                        this.component.publish(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].OPENED_MEDIA);
                        return [2 /*return*/];
                }
            });
        });
    };
    MediaElementCenterPanel.prototype.isVideo = function () {
        return this.extension.isVideo();
    };
    MediaElementCenterPanel.prototype.resize = function () {
        _super.prototype.resize.call(this);
        // if in Firefox < v13 don't resize the media container.
        if (window.browserDetect.browser === 'Firefox' && window.browserDetect.version < 13) {
            this.$container.width(this.mediaWidth);
            this.$container.height(this.mediaHeight);
        }
        else {
            // fit media to available space.
            var size = _edsilv_utils__WEBPACK_IMPORTED_MODULE_4__["Dimensions"].fitRect(this.mediaWidth, this.mediaHeight, this.$content.width(), this.$content.height());
            this.$container.height(size.height);
            this.$container.width(size.width);
            if (this.player && !this.extension.isFullScreen()) {
                this.$media.width(size.width);
                this.$media.height(size.height);
            }
        }
        var left = Math.floor((this.$content.width() - this.$container.width()) / 2);
        var top = Math.floor((this.$content.height() - this.$container.height()) / 2);
        this.$container.css({
            'left': left,
            'top': top
        });
        if (this.title) {
            this.$title.text(Object(_Utils__WEBPACK_IMPORTED_MODULE_3__["sanitize"])(this.title));
        }
        if (this.player) {
            if (!this.isVideo() || (this.isVideo() && !this.component.isFullScreen)) {
                this.player.setPlayerSize();
                this.player.setControlsSize();
                var $mejs = $('.mejs__container');
                $mejs.css({
                    'margin-top': (this.$container.height() - $mejs.height()) / 2
                });
            }
        }
    };
    return MediaElementCenterPanel;
}(_uv_shared_module_CenterPanel__WEBPACK_IMPORTED_MODULE_2__["CenterPanel"]));



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
//# sourceMappingURL=uv-mediaelement-extension.666f29de2f188b334575.js.map