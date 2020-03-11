(window["webpackJsonpUV"] = window["webpackJsonpUV"] || []).push([["uv-default-extension"],{

/***/ "./src/extensions/uv-default-extension/Extension.ts":
/*!**********************************************************!*\
  !*** ./src/extensions/uv-default-extension/Extension.ts ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../modules/uv-shared-module/BaseEvents */ "./src/modules/uv-shared-module/BaseEvents.ts");
/* harmony import */ var _modules_uv_shared_module_BaseExtension__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../modules/uv-shared-module/BaseExtension */ "./src/modules/uv-shared-module/BaseExtension.ts");
/* harmony import */ var _modules_uv_filelinkcenterpanel_module_FileLinkCenterPanel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../modules/uv-filelinkcenterpanel-module/FileLinkCenterPanel */ "./src/modules/uv-filelinkcenterpanel-module/FileLinkCenterPanel.ts");
/* harmony import */ var _modules_uv_shared_module_FooterPanel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../modules/uv-shared-module/FooterPanel */ "./src/modules/uv-shared-module/FooterPanel.ts");
/* harmony import */ var _modules_uv_shared_module_HeaderPanel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../modules/uv-shared-module/HeaderPanel */ "./src/modules/uv-shared-module/HeaderPanel.ts");
/* harmony import */ var _modules_uv_dialogues_module_HelpDialogue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../modules/uv-dialogues-module/HelpDialogue */ "./src/modules/uv-dialogues-module/HelpDialogue.ts");
/* harmony import */ var _modules_uv_moreinforightpanel_module_MoreInfoRightPanel__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../modules/uv-moreinforightpanel-module/MoreInfoRightPanel */ "./src/modules/uv-moreinforightpanel-module/MoreInfoRightPanel.ts");
/* harmony import */ var _modules_uv_resourcesleftpanel_module_ResourcesLeftPanel__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../modules/uv-resourcesleftpanel-module/ResourcesLeftPanel */ "./src/modules/uv-resourcesleftpanel-module/ResourcesLeftPanel.ts");
/* harmony import */ var _SettingsDialogue__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./SettingsDialogue */ "./src/extensions/uv-default-extension/SettingsDialogue.ts");
/* harmony import */ var _ShareDialogue__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./ShareDialogue */ "./src/extensions/uv-default-extension/ShareDialogue.ts");
/* harmony import */ var _edsilv_utils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @edsilv/utils */ "./node_modules/@edsilv/utils/dist-esmodule/index.js");
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
        this.component.subscribe(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].THUMB_SELECTED, function (canvasIndex) {
            _this.component.publish(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].CANVAS_INDEX_CHANGED, canvasIndex);
        });
    };
    Extension.prototype.createModules = function () {
        _super.prototype.createModules.call(this);
        if (this.isHeaderPanelEnabled()) {
            this.headerPanel = new _modules_uv_shared_module_HeaderPanel__WEBPACK_IMPORTED_MODULE_4__["HeaderPanel"](this.shell.$headerPanel);
        }
        else {
            this.shell.$headerPanel.hide();
        }
        if (this.isLeftPanelEnabled()) {
            this.leftPanel = new _modules_uv_resourcesleftpanel_module_ResourcesLeftPanel__WEBPACK_IMPORTED_MODULE_7__["ResourcesLeftPanel"](this.shell.$leftPanel);
        }
        this.centerPanel = new _modules_uv_filelinkcenterpanel_module_FileLinkCenterPanel__WEBPACK_IMPORTED_MODULE_2__["FileLinkCenterPanel"](this.shell.$centerPanel);
        if (this.isRightPanelEnabled()) {
            this.rightPanel = new _modules_uv_moreinforightpanel_module_MoreInfoRightPanel__WEBPACK_IMPORTED_MODULE_6__["MoreInfoRightPanel"](this.shell.$rightPanel);
        }
        if (this.isFooterPanelEnabled()) {
            this.footerPanel = new _modules_uv_shared_module_FooterPanel__WEBPACK_IMPORTED_MODULE_3__["FooterPanel"](this.shell.$footerPanel);
        }
        else {
            this.shell.$footerPanel.hide();
        }
        this.$helpDialogue = $('<div class="overlay help" aria-hidden="true"></div>');
        this.shell.$overlays.append(this.$helpDialogue);
        this.helpDialogue = new _modules_uv_dialogues_module_HelpDialogue__WEBPACK_IMPORTED_MODULE_5__["HelpDialogue"](this.$helpDialogue);
        this.$shareDialogue = $('<div class="overlay share" aria-hidden="true"></div>');
        this.shell.$overlays.append(this.$shareDialogue);
        this.shareDialogue = new _ShareDialogue__WEBPACK_IMPORTED_MODULE_9__["ShareDialogue"](this.$shareDialogue);
        this.$settingsDialogue = $('<div class="overlay settings" aria-hidden="true"></div>');
        this.shell.$overlays.append(this.$settingsDialogue);
        this.settingsDialogue = new _SettingsDialogue__WEBPACK_IMPORTED_MODULE_8__["SettingsDialogue"](this.$settingsDialogue);
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
        return _edsilv_utils__WEBPACK_IMPORTED_MODULE_10__["Bools"].getBool(this.data.config.options.leftPanelEnabled, true)
            && ((this.helper.isMultiCanvas() || this.helper.isMultiSequence()) || this.helper.hasResources());
    };
    Extension.prototype.getEmbedScript = function (template, width, height) {
        //const configUri: string = this.data.config.uri || '';
        //const script: string = String.format(template, this.getSerializedLocales(), configUri, this.helper.manifestUri, this.helper.collectionIndex, this.helper.manifestIndex, this.helper.sequenceIndex, this.helper.canvasIndex, width, height, this.data.embedScriptUri);
        var appUri = this.getAppUri();
        var iframeSrc = appUri + "#?manifest=" + this.helper.manifestUri + "&c=" + this.helper.collectionIndex + "&m=" + this.helper.manifestIndex + "&s=" + this.helper.sequenceIndex + "&cv=" + this.helper.canvasIndex;
        var script = _edsilv_utils__WEBPACK_IMPORTED_MODULE_10__["Strings"].format(template, iframeSrc, width.toString(), height.toString());
        return script;
    };
    return Extension;
}(_modules_uv_shared_module_BaseExtension__WEBPACK_IMPORTED_MODULE_1__["BaseExtension"]));
/* harmony default export */ __webpack_exports__["default"] = (Extension);


/***/ }),

/***/ "./src/extensions/uv-default-extension/SettingsDialogue.ts":
/*!*****************************************************************!*\
  !*** ./src/extensions/uv-default-extension/SettingsDialogue.ts ***!
  \*****************************************************************/
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

/***/ "./src/extensions/uv-default-extension/ShareDialogue.ts":
/*!**************************************************************!*\
  !*** ./src/extensions/uv-default-extension/ShareDialogue.ts ***!
  \**************************************************************/
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

/***/ "./src/modules/uv-filelinkcenterpanel-module/FileLinkCenterPanel.ts":
/*!**************************************************************************!*\
  !*** ./src/modules/uv-filelinkcenterpanel-module/FileLinkCenterPanel.ts ***!
  \**************************************************************************/
/*! exports provided: FileLinkCenterPanel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FileLinkCenterPanel", function() { return FileLinkCenterPanel; });
/* harmony import */ var _uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../uv-shared-module/BaseEvents */ "./src/modules/uv-shared-module/BaseEvents.ts");
/* harmony import */ var _uv_shared_module_CenterPanel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../uv-shared-module/CenterPanel */ "./src/modules/uv-shared-module/CenterPanel.ts");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Utils */ "./src/Utils.ts");
/* harmony import */ var manifesto_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! manifesto.js */ "./node_modules/manifesto.js/dist-umd/manifesto.js");
/* harmony import */ var manifesto_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(manifesto_js__WEBPACK_IMPORTED_MODULE_3__);
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




var FileLinkCenterPanel = /** @class */ (function (_super) {
    __extends(FileLinkCenterPanel, _super);
    function FileLinkCenterPanel($element) {
        return _super.call(this, $element) || this;
    }
    FileLinkCenterPanel.prototype.create = function () {
        var _this = this;
        this.setConfig('fileLinkCenterPanel');
        _super.prototype.create.call(this);
        this.component.subscribe(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].OPEN_EXTERNAL_RESOURCE, function (resources) {
            _this.openMedia(resources);
        });
        this.$scroll = $('<div class="scroll"></div>');
        this.$content.append(this.$scroll);
        this.$downloadItems = $('<ol></ol>');
        this.$scroll.append(this.$downloadItems);
        this.$downloadItemTemplate = $('<li><img/><div class="col2"><a class="filename" target="_blank" download=""></a><span class="label"></span><a class="description" target="_blank" download=""></a></div></li>');
        this.title = this.extension.helper.getLabel();
    };
    FileLinkCenterPanel.prototype.openMedia = function (resources) {
        return __awaiter(this, void 0, void 0, function () {
            var canvas, annotations, $item, i, annotation, $fileName, $label, $thumb, $description, annotationBody, id, label, thumbnail, description;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.extension.getExternalResources(resources)];
                    case 1:
                        _a.sent();
                        canvas = this.extension.helper.getCurrentCanvas();
                        annotations = canvas.getContent();
                        for (i = 0; i < annotations.length; i++) {
                            annotation = annotations[i];
                            if (!annotation.getBody().length) {
                                continue;
                            }
                            $item = this.$downloadItemTemplate.clone();
                            $fileName = $item.find('.filename');
                            $label = $item.find('.label');
                            $thumb = $item.find('img');
                            $description = $item.find('.description');
                            annotationBody = annotation.getBody()[0];
                            id = annotationBody.getProperty('id');
                            if (id) {
                                $fileName.prop('href', id);
                                $fileName.text(id.substr(id.lastIndexOf('/') + 1));
                            }
                            label = manifesto_js__WEBPACK_IMPORTED_MODULE_3__["LanguageMap"].getValue(annotationBody.getLabel());
                            if (label) {
                                $label.text(Object(_Utils__WEBPACK_IMPORTED_MODULE_2__["sanitize"])(label));
                            }
                            thumbnail = annotation.getProperty('thumbnail');
                            if (thumbnail) {
                                $thumb.prop('src', thumbnail);
                            }
                            else {
                                $thumb.hide();
                            }
                            description = annotationBody.getProperty('description');
                            if (description) {
                                $description.text(Object(_Utils__WEBPACK_IMPORTED_MODULE_2__["sanitize"])(description));
                                if (id) {
                                    $description.prop('href', id);
                                }
                            }
                            this.$downloadItems.append($item);
                        }
                        this.component.publish(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].OPENED_MEDIA);
                        return [2 /*return*/];
                }
            });
        });
    };
    FileLinkCenterPanel.prototype.resize = function () {
        _super.prototype.resize.call(this);
        if (this.title) {
            this.$title.text(Object(_Utils__WEBPACK_IMPORTED_MODULE_2__["sanitize"])(this.title));
        }
        this.$scroll.height(this.$content.height() - this.$scroll.verticalMargins());
    };
    return FileLinkCenterPanel;
}(_uv_shared_module_CenterPanel__WEBPACK_IMPORTED_MODULE_1__["CenterPanel"]));



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



/***/ })

}]);
//# sourceMappingURL=uv-default-extension.9c16231f6b4c3d547a01.js.map