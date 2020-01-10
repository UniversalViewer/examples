(window["webpackJsonpUV"] = window["webpackJsonpUV"] || []).push([["uv-av-extension~uv-mediaelement-extension~uv-openseadragon-extension~uv-pdf-extension~uv-virtex-extension"],{

/***/ "./src/modules/uv-dialogues-module/AuthDialogue.ts":
/*!*********************************************************!*\
  !*** ./src/modules/uv-dialogues-module/AuthDialogue.ts ***!
  \*********************************************************/
/*! exports provided: AuthDialogue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthDialogue", function() { return AuthDialogue; });
/* harmony import */ var _uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../uv-shared-module/BaseEvents */ "./src/modules/uv-shared-module/BaseEvents.ts");
/* harmony import */ var _uv_shared_module_Dialogue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../uv-shared-module/Dialogue */ "./src/modules/uv-shared-module/Dialogue.ts");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Utils */ "./src/Utils.ts");
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



var AuthDialogue = /** @class */ (function (_super) {
    __extends(AuthDialogue, _super);
    function AuthDialogue($element) {
        return _super.call(this, $element) || this;
    }
    AuthDialogue.prototype.create = function () {
        var _this = this;
        this.setConfig('authDialogue');
        _super.prototype.create.call(this);
        this.openCommand = _uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].SHOW_AUTH_DIALOGUE;
        this.closeCommand = _uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].HIDE_AUTH_DIALOGUE;
        this.component.subscribe(this.openCommand, function (e) {
            _this.closeCallback = e.closeCallback;
            _this.confirmCallback = e.confirmCallback;
            _this.cancelCallback = e.cancelCallback;
            _this.service = e.service;
            _this.open();
        });
        this.component.subscribe(this.closeCommand, function () {
            _this.close();
        });
        this.$title = $('<h1></h1>');
        this.$content.append(this.$title);
        this.$content.append('\
            <div>\
                <p class="message scroll"></p>\
            </div>');
        this.$buttons.prepend(this._buttonsToAdd());
        this.$message = this.$content.find('.message');
        this.$confirmButton = this.$buttons.find('.confirm');
        this.$confirmButton.text(this.content.confirm);
        this.$cancelButton = this.$buttons.find('.close');
        this.$cancelButton.text(this.content.cancel);
        this.$element.hide();
        this.$confirmButton.on('click', function (e) {
            e.preventDefault();
            if (_this.confirmCallback) {
                _this.confirmCallback();
            }
            _this.close();
        });
        this.$cancelButton.on('click', function (e) {
            e.preventDefault();
            if (_this.cancelCallback) {
                _this.cancelCallback();
            }
            _this.close();
        });
    };
    AuthDialogue.prototype.open = function () {
        _super.prototype.open.call(this);
        var header = this.service.getHeader();
        var description = this.service.getDescription();
        var confirmLabel = this.service.getConfirmLabel();
        if (header) {
            this.$title.text(Object(_Utils__WEBPACK_IMPORTED_MODULE_2__["sanitize"])(header));
        }
        if (description) {
            this.$message.html(Object(_Utils__WEBPACK_IMPORTED_MODULE_2__["sanitize"])(description));
            this.$message.targetBlank();
            this.$message.find('a').on('click', function () {
                var url = $(this).attr('href');
                this.component.publish(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].EXTERNAL_LINK_CLICKED, url);
            });
        }
        if (confirmLabel) {
            this.$confirmButton.text(Object(_Utils__WEBPACK_IMPORTED_MODULE_2__["sanitize"])(confirmLabel));
        }
        this.resize();
    };
    AuthDialogue.prototype.resize = function () {
        _super.prototype.resize.call(this);
    };
    AuthDialogue.prototype._buttonsToAdd = function () {
        var buttonsToAdd = '<a class="confirm btn btn-primary" href="#" target="_parent"></a>';
        // If the top button is enabled, add an additional close button for consistency.
        if (this.config.topCloseButtonEnabled) {
            buttonsToAdd += '<button class="close btn btn-default"></button>';
        }
        return buttonsToAdd;
    };
    return AuthDialogue;
}(_uv_shared_module_Dialogue__WEBPACK_IMPORTED_MODULE_1__["Dialogue"]));



/***/ }),

/***/ "./src/modules/uv-dialogues-module/ClickThroughDialogue.ts":
/*!*****************************************************************!*\
  !*** ./src/modules/uv-dialogues-module/ClickThroughDialogue.ts ***!
  \*****************************************************************/
/*! exports provided: ClickThroughDialogue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClickThroughDialogue", function() { return ClickThroughDialogue; });
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


var ClickThroughDialogue = /** @class */ (function (_super) {
    __extends(ClickThroughDialogue, _super);
    function ClickThroughDialogue($element) {
        return _super.call(this, $element) || this;
    }
    ClickThroughDialogue.prototype.create = function () {
        var _this = this;
        this.setConfig('clickThroughDialogue');
        _super.prototype.create.call(this);
        this.openCommand = _uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].SHOW_CLICKTHROUGH_DIALOGUE;
        this.closeCommand = _uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].HIDE_CLICKTHROUGH_DIALOGUE;
        this.component.subscribe(this.openCommand, function (params) {
            _this.acceptCallback = params.acceptCallback;
            _this.resource = params.resource;
            _this.open();
        });
        this.component.subscribe(this.closeCommand, function () {
            _this.close();
        });
        this.$title = $('<h1></h1>');
        this.$content.append(this.$title);
        this.$content.append('\
            <div>\
                <p class="message scroll"></p>\
                <div class="buttons">\
                    <a class="acceptTerms btn btn-primary" href="#" target="_parent"></a>\
                </div>\
            </div>');
        this.$message = this.$content.find(".message");
        this.$acceptTermsButton = this.$content.find(".acceptTerms");
        // TODO: get from config this.$acceptTermsButton.text(this.content.acceptTerms); // figure out config
        this.$acceptTermsButton.text("Accept Terms and Open");
        this.$element.hide();
        this.$acceptTermsButton.on('click', function (e) {
            e.preventDefault();
            _this.close();
            _this.component.publish(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].ACCEPT_TERMS);
            if (_this.acceptCallback)
                _this.acceptCallback();
        });
    };
    ClickThroughDialogue.prototype.open = function () {
        _super.prototype.open.call(this);
        if (this.resource.clickThroughService) {
            this.$title.text(this.resource.clickThroughService.getProperty('label'));
            this.$message.html(this.resource.clickThroughService.getProperty('description'));
            this.$message.targetBlank();
        }
        this.$message.find('a').on('click', function () {
            var url = $(this).attr('href');
            this.component.publish(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].EXTERNAL_LINK_CLICKED, url);
        });
        this.resize();
    };
    ClickThroughDialogue.prototype.resize = function () {
        _super.prototype.resize.call(this);
    };
    return ClickThroughDialogue;
}(_uv_shared_module_Dialogue__WEBPACK_IMPORTED_MODULE_1__["Dialogue"]));



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

/***/ "./src/modules/uv-dialogues-module/LoginDialogue.ts":
/*!**********************************************************!*\
  !*** ./src/modules/uv-dialogues-module/LoginDialogue.ts ***!
  \**********************************************************/
/*! exports provided: LoginDialogue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginDialogue", function() { return LoginDialogue; });
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


var LoginDialogue = /** @class */ (function (_super) {
    __extends(LoginDialogue, _super);
    function LoginDialogue($element) {
        return _super.call(this, $element) || this;
    }
    LoginDialogue.prototype.create = function () {
        var _this = this;
        this.setConfig('loginDialogue');
        _super.prototype.create.call(this);
        this.openCommand = _uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].SHOW_LOGIN_DIALOGUE;
        this.closeCommand = _uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].HIDE_LOGIN_DIALOGUE;
        this.component.subscribe(this.openCommand, function (e) {
            _this.loginCallback = e.loginCallback;
            _this.logoutCallback = e.logoutCallback;
            _this.options = e.options;
            _this.resource = e.resource;
            _this.open();
        });
        this.component.subscribe(this.closeCommand, function () {
            _this.close();
        });
        this.$title = $('<h1></h1>');
        this.$content.append(this.$title);
        this.$content.append('\
            <div>\
                <p class="message scroll"></p>\
                <div class="buttons">\
                    <a class="logout btn btn-primary" href="#" target="_parent"></a>\
                    <a class="login btn btn-primary" href="#" target="_parent"></a>\
                    <a class="cancel btn btn-primary" href="#"></a>\
                </div>\
            </div>');
        this.$message = this.$content.find('.message');
        this.$loginButton = this.$content.find('.login');
        this.$loginButton.text(this.content.login);
        this.$logoutButton = this.$content.find('.logout');
        this.$logoutButton.text(this.content.logout);
        this.$cancelButton = this.$content.find('.cancel');
        this.$cancelButton.text(this.content.cancel);
        this.$element.hide();
        this.$loginButton.on('click', function (e) {
            e.preventDefault();
            _this.close();
            if (_this.loginCallback)
                _this.loginCallback();
        });
        this.$logoutButton.on('click', function (e) {
            e.preventDefault();
            _this.close();
            if (_this.logoutCallback)
                _this.logoutCallback();
        });
        this.$cancelButton.on('click', function (e) {
            e.preventDefault();
            _this.close();
        });
        this.updateLogoutButton();
    };
    LoginDialogue.prototype.open = function () {
        _super.prototype.open.call(this);
        var message = "";
        if (this.resource.loginService) {
            this.$title.text(this.resource.loginService.getProperty('label'));
            message = this.resource.loginService.getProperty('description');
        }
        if (this.options.warningMessage) {
            message = '<span class="warning">' + this.extension.data.config.content[this.options.warningMessage] + '</span><span class="description">' + message + '</span>';
        }
        this.updateLogoutButton();
        this.$message.html(message);
        this.$message.targetBlank();
        this.$message.find('a').on('click', function () {
            var url = $(this).attr('href');
            this.component.publish(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].EXTERNAL_LINK_CLICKED, url);
        });
        if (this.options.showCancelButton) {
            this.$cancelButton.show();
        }
        else {
            this.$cancelButton.hide();
        }
        this.resize();
    };
    LoginDialogue.prototype.updateLogoutButton = function () {
        if (this.extension.isLoggedIn) {
            this.$logoutButton.show();
        }
        else {
            this.$logoutButton.hide();
        }
    };
    LoginDialogue.prototype.resize = function () {
        _super.prototype.resize.call(this);
    };
    return LoginDialogue;
}(_uv_shared_module_Dialogue__WEBPACK_IMPORTED_MODULE_1__["Dialogue"]));



/***/ }),

/***/ "./src/modules/uv-dialogues-module/RestrictedDialogue.ts":
/*!***************************************************************!*\
  !*** ./src/modules/uv-dialogues-module/RestrictedDialogue.ts ***!
  \***************************************************************/
/*! exports provided: RestrictedDialogue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RestrictedDialogue", function() { return RestrictedDialogue; });
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


var RestrictedDialogue = /** @class */ (function (_super) {
    __extends(RestrictedDialogue, _super);
    function RestrictedDialogue($element) {
        return _super.call(this, $element) || this;
    }
    RestrictedDialogue.prototype.create = function () {
        var _this = this;
        this.setConfig('restrictedDialogue');
        _super.prototype.create.call(this);
        this.openCommand = _uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].SHOW_RESTRICTED_DIALOGUE;
        this.closeCommand = _uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].HIDE_RESTRICTED_DIALOGUE;
        this.component.subscribe(this.openCommand, function (e) {
            _this.acceptCallback = e.acceptCallback;
            _this.options = e.options;
            _this.resource = e.resource;
            _this.open();
        });
        this.component.subscribe(this.closeCommand, function () {
            _this.close();
        });
        this.$title = $('<h1></h1>');
        this.$content.append(this.$title);
        this.$content.append('\
            <div>\
                <p class="message scroll"></p>\
                <div class="buttons">\
                    <a class="cancel btn btn-primary" href="#" target="_parent"></a>\
                </div>\
            </div>');
        this.$message = this.$content.find('.message');
        this.$message.targetBlank();
        // todo: revisit?
        //this.$nextVisibleButton = this.$content.find('.nextvisible');
        //this.$nextVisibleButton.text(this.content.nextVisibleItem);
        this.$cancelButton = this.$content.find('.cancel');
        this.$cancelButton.text(this.content.cancel);
        this.$element.hide();
        this.$cancelButton.on('click', function (e) {
            e.preventDefault();
            _this.close();
        });
    };
    RestrictedDialogue.prototype.open = function () {
        _super.prototype.open.call(this);
        this.isAccepted = false;
        var message = "";
        if (this.resource.restrictedService) {
            this.$title.text(this.resource.restrictedService.getProperty('label'));
            message = this.resource.restrictedService.getProperty('description');
        }
        this.$message.html(message);
        this.$message.targetBlank();
        this.$message.find('a').on('click', function () {
            var url = $(this).attr('href');
            this.component.publish(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].EXTERNAL_LINK_CLICKED, url);
        });
        this.resize();
    };
    RestrictedDialogue.prototype.close = function () {
        _super.prototype.close.call(this);
        if (!this.isAccepted && this.acceptCallback) {
            this.isAccepted = true;
            this.acceptCallback();
        }
    };
    RestrictedDialogue.prototype.resize = function () {
        _super.prototype.resize.call(this);
    };
    return RestrictedDialogue;
}(_uv_shared_module_Dialogue__WEBPACK_IMPORTED_MODULE_1__["Dialogue"]));



/***/ }),

/***/ "./src/modules/uv-dialogues-module/SettingsDialogue.ts":
/*!*************************************************************!*\
  !*** ./src/modules/uv-dialogues-module/SettingsDialogue.ts ***!
  \*************************************************************/
/*! exports provided: SettingsDialogue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsDialogue", function() { return SettingsDialogue; });
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


var SettingsDialogue = /** @class */ (function (_super) {
    __extends(SettingsDialogue, _super);
    function SettingsDialogue($element) {
        return _super.call(this, $element) || this;
    }
    SettingsDialogue.prototype.create = function () {
        var _this = this;
        this.setConfig('settingsDialogue');
        _super.prototype.create.call(this);
        this.openCommand = _uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].SHOW_SETTINGS_DIALOGUE;
        this.closeCommand = _uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].HIDE_SETTINGS_DIALOGUE;
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
        this.$version = $('<div class="version"></div>');
        this.$content.append(this.$version);
        this.$website = $('<div class="website"></div>');
        this.$content.append(this.$website);
        this.$locale = $('<div class="setting locale"></div>');
        this.$scroll.append(this.$locale);
        this.$localeLabel = $('<label for="locale">' + this.content.locale + '</label>');
        this.$locale.append(this.$localeLabel);
        this.$localeDropDown = $('<select id="locale"></select>');
        this.$locale.append(this.$localeDropDown);
        // initialise ui.
        this.$title.text(this.content.title);
        this.$website.html(this.content.website);
        this.$website.targetBlank();
        this._createLocalesMenu();
        this.$element.hide();
    };
    SettingsDialogue.prototype.getSettings = function () {
        return this.extension.getSettings();
    };
    SettingsDialogue.prototype.updateSettings = function (settings) {
        this.extension.updateSettings(settings);
        this.component.publish(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].UPDATE_SETTINGS, settings);
    };
    SettingsDialogue.prototype.open = function () {
        var _this = this;
        _super.prototype.open.call(this);
        $.getJSON(this.extension.data.root + "/info.json", function (pjson) {
            _this.$version.text("v" + pjson.version);
        });
    };
    SettingsDialogue.prototype._createLocalesMenu = function () {
        var _this = this;
        var locales = this.extension.data.locales;
        if (locales && locales.length > 1) {
            for (var i = 0; i < locales.length; i++) {
                var locale = locales[i];
                this.$localeDropDown.append('<option value="' + locale.name + '">' + locale.label + '</option>');
            }
            this.$localeDropDown.val(locales[0].name);
        }
        else {
            this.$locale.hide();
        }
        this.$localeDropDown.change(function () {
            _this.extension.changeLocale(_this.$localeDropDown.val());
        });
    };
    SettingsDialogue.prototype.resize = function () {
        _super.prototype.resize.call(this);
    };
    return SettingsDialogue;
}(_uv_shared_module_Dialogue__WEBPACK_IMPORTED_MODULE_1__["Dialogue"]));



/***/ }),

/***/ "./src/modules/uv-dialogues-module/ShareDialogue.ts":
/*!**********************************************************!*\
  !*** ./src/modules/uv-dialogues-module/ShareDialogue.ts ***!
  \**********************************************************/
/*! exports provided: ShareDialogue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShareDialogue", function() { return ShareDialogue; });
/* harmony import */ var _uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../uv-shared-module/BaseEvents */ "./src/modules/uv-shared-module/BaseEvents.ts");
/* harmony import */ var _uv_shared_module_Dialogue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../uv-shared-module/Dialogue */ "./src/modules/uv-shared-module/Dialogue.ts");
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



var ShareDialogue = /** @class */ (function (_super) {
    __extends(ShareDialogue, _super);
    function ShareDialogue($element) {
        var _this = _super.call(this, $element) || this;
        _this.aspectRatio = .75;
        _this.isEmbedViewVisible = false;
        _this.isShareViewVisible = false;
        _this.maxWidth = 8000;
        _this.maxHeight = _this.maxWidth * _this.aspectRatio;
        _this.minWidth = 200;
        _this.minHeight = _this.minWidth * _this.aspectRatio;
        _this.shareManifests = false;
        return _this;
    }
    ShareDialogue.prototype.create = function () {
        var _this = this;
        this.setConfig('shareDialogue');
        _super.prototype.create.call(this);
        this.openCommand = _uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].SHOW_SHARE_DIALOGUE;
        this.closeCommand = _uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].HIDE_SHARE_DIALOGUE;
        this.shareManifests = this.options.shareManifests || false;
        this.component.subscribe(this.openCommand, function (triggerButton) {
            _this.open(triggerButton);
            if (_this.isShareAvailable()) {
                _this.openShareView();
            }
            else {
                _this.openEmbedView();
            }
        });
        this.component.subscribe(this.closeCommand, function () {
            _this.close();
        });
        this.component.subscribe(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].SHOW_EMBED_DIALOGUE, function (triggerButton) {
            _this.open(triggerButton);
            _this.openEmbedView();
        });
        this.$tabs = $('<div class="tabs"></div>');
        this.$content.append(this.$tabs);
        this.$shareButton = $('<a class="share tab default" tabindex="0">' + this.content.share + '</a>');
        this.$shareButton.prop('title', this.content.share);
        this.$tabs.append(this.$shareButton);
        this.$embedButton = $('<a class="embed tab" tabindex="0">' + this.content.embed + '</a>');
        this.$embedButton.prop('title', this.content.embed);
        this.$tabs.append(this.$embedButton);
        this.$tabsContent = $('<div class="tabsContent"></div>');
        this.$content.append(this.$tabsContent);
        this.$footer = $('<div class="footer"></div>');
        this.$content.append(this.$footer);
        this.$shareView = $('<div class="shareView view"></div>');
        this.$tabsContent.append(this.$shareView);
        this.$shareHeader = $('<div class="header"></div>');
        this.$shareView.append(this.$shareHeader);
        this.$shareLink = $('<a class="shareLink" onclick="return false;"></a>');
        this.$shareView.append(this.$shareLink);
        this.$shareInput = $("<input class=\"shareInput\" type=\"text\" readonly=\"readonly\" aria-label=\"" + this.content.shareUrl + "\"/>");
        this.$shareView.append(this.$shareInput);
        this.$shareFrame = $('<iframe class="shareFrame"></iframe>');
        this.$shareView.append(this.$shareFrame);
        this.$embedView = $('<div class="embedView view"></div>');
        this.$tabsContent.append(this.$embedView);
        this.$embedHeader = $('<div class="header"></div>');
        this.$embedView.append(this.$embedHeader);
        // this.$link = $('<a target="_blank"></a>');
        // this.$embedView.find('.leftCol').append(this.$link);
        // this.$image = $('<img class="share" />');
        // this.$embedView.append(this.$image);
        this.$code = $("<input class=\"code\" type=\"text\" readonly=\"readonly\" aria-label=\"" + this.content.embed + "\"/>");
        this.$embedView.append(this.$code);
        this.$customSize = $('<div class="customSize"></div>');
        this.$embedView.append(this.$customSize);
        this.$size = $('<span class="size">' + this.content.size + '</span>');
        this.$customSize.append(this.$size);
        this.$customSizeDropDown = $('<select id="size" aria-label="' + this.content.size + '"></select>');
        this.$customSize.append(this.$customSizeDropDown);
        this.$customSizeDropDown.append('<option value="small" data-width="560" data-height="420">560 x 420</option>');
        this.$customSizeDropDown.append('<option value="medium" data-width="640" data-height="480">640 x 480</option>');
        this.$customSizeDropDown.append('<option value="large" data-width="800" data-height="600">800 x 600</option>');
        this.$customSizeDropDown.append('<option value="custom">' + this.content.customSize + '</option>');
        this.$widthInput = $('<input class="width" type="text" maxlength="10" aria-label="' + this.content.width + '"/>');
        this.$customSize.append(this.$widthInput);
        this.$x = $('<span class="x">x</span>');
        this.$customSize.append(this.$x);
        this.$heightInput = $('<input class="height" type="text" maxlength="10" aria-label="' + this.content.height + '"/>');
        this.$customSize.append(this.$heightInput);
        var iiifUrl = this.extension.getIIIFShareUrl(this.shareManifests);
        this.$iiifButton = $('<a class="imageBtn iiif" href="' + iiifUrl + '" title="' + this.content.iiif + '" target="_blank"></a>');
        this.$footer.append(this.$iiifButton);
        this.$termsOfUseButton = $('<a href="#">' + this.extension.data.config.content.termsOfUse + '</a>');
        this.$footer.append(this.$termsOfUseButton);
        this.$widthInput.on('keydown', function (e) {
            return _edsilv_utils__WEBPACK_IMPORTED_MODULE_2__["Numbers"].numericalInput(e);
        });
        this.$heightInput.on('keydown', function (e) {
            return _edsilv_utils__WEBPACK_IMPORTED_MODULE_2__["Numbers"].numericalInput(e);
        });
        this.$shareInput.focus(function () {
            $(this).select();
        });
        this.$code.focus(function () {
            $(this).select();
        });
        this.$shareButton.onPressed(function () {
            _this.openShareView();
        });
        this.$embedButton.onPressed(function () {
            _this.openEmbedView();
        });
        this.$customSizeDropDown.change(function () {
            _this.update();
        });
        this.$widthInput.change(function () {
            _this.updateHeightRatio();
            _this.update();
        });
        this.$heightInput.change(function () {
            _this.updateWidthRatio();
            _this.update();
        });
        this.$termsOfUseButton.onPressed(function () {
            _this.component.publish(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].SHOW_TERMS_OF_USE);
        });
        this.$element.hide();
        this.update();
    };
    ShareDialogue.prototype.open = function (triggerButton) {
        _super.prototype.open.call(this, triggerButton);
        this.update();
    };
    ShareDialogue.prototype.getShareUrl = function () {
        return this.extension.getShareUrl();
    };
    ShareDialogue.prototype.isShareAvailable = function () {
        return !!this.getShareUrl();
    };
    ShareDialogue.prototype.update = function () {
        if (this.isShareAvailable()) {
            this.$shareButton.show();
        }
        else {
            this.$shareButton.hide();
        }
        var $selected = this.getSelectedSize();
        if ($selected.val() === 'custom') {
            this.$widthInput.show();
            this.$x.show();
            this.$heightInput.show();
        }
        else {
            this.$widthInput.hide();
            this.$x.hide();
            this.$heightInput.hide();
            this.currentWidth = Number($selected.data('width'));
            this.currentHeight = Number($selected.data('height'));
            this.$widthInput.val(String(this.currentWidth));
            this.$heightInput.val(String(this.currentHeight));
        }
        this.updateInstructions();
        this.updateShareOptions();
        this.updateShareFrame();
        this.updateTermsOfUseButton();
    };
    ShareDialogue.prototype.updateShareOptions = function () {
        var shareUrl = this.getShareUrl();
        if (shareUrl) {
            this.$shareInput.val(shareUrl);
            this.$shareLink.prop('href', shareUrl);
            this.$shareLink.text(shareUrl);
        }
        if (this.extension.isMobile()) {
            this.$shareInput.hide();
            this.$shareLink.show();
        }
        else {
            this.$shareInput.show();
            this.$shareLink.hide();
        }
    };
    ShareDialogue.prototype.updateInstructions = function () {
        if (_edsilv_utils__WEBPACK_IMPORTED_MODULE_2__["Bools"].getBool(this.options.instructionsEnabled, false)) {
            this.$shareHeader.show();
            this.$embedHeader.show();
            this.$shareHeader.text(this.content.shareInstructions);
            this.$embedHeader.text(this.content.embedInstructions);
        }
        else {
            this.$shareHeader.hide();
            this.$embedHeader.hide();
        }
    };
    // updateThumbnail(): void {
    //     var canvas: manifesto.Canvas = this.extension.helper.getCurrentCanvas();
    //     if (!canvas) return;
    //     var thumbnail = canvas.getProperty('thumbnail');
    //     if (!thumbnail || !_.isString(thumbnail)){
    //         thumbnail = canvas.getCanonicalImageUri(this.extension.data.config.options.bookmarkThumbWidth);
    //     }
    //     this.$link.attr('href', thumbnail);
    //     this.$image.attr('src', thumbnail);
    // }
    ShareDialogue.prototype.getSelectedSize = function () {
        return this.$customSizeDropDown.find(':selected');
    };
    ShareDialogue.prototype.updateWidthRatio = function () {
        this.currentHeight = Number(this.$heightInput.val());
        if (this.currentHeight < this.minHeight) {
            this.currentHeight = this.minHeight;
            this.$heightInput.val(String(this.currentHeight));
        }
        else if (this.currentHeight > this.maxHeight) {
            this.currentHeight = this.maxHeight;
            this.$heightInput.val(String(this.currentHeight));
        }
        this.currentWidth = Math.floor(this.currentHeight / this.aspectRatio);
        this.$widthInput.val(String(this.currentWidth));
    };
    ShareDialogue.prototype.updateHeightRatio = function () {
        this.currentWidth = Number(this.$widthInput.val());
        if (this.currentWidth < this.minWidth) {
            this.currentWidth = this.minWidth;
            this.$widthInput.val(String(this.currentWidth));
        }
        else if (this.currentWidth > this.maxWidth) {
            this.currentWidth = this.maxWidth;
            this.$widthInput.val(String(this.currentWidth));
        }
        this.currentHeight = Math.floor(this.currentWidth * this.aspectRatio);
        this.$heightInput.val(String(this.currentHeight));
    };
    ShareDialogue.prototype.updateShareFrame = function () {
        var shareUrl = this.extension.helper.getShareServiceUrl();
        if (!shareUrl) {
            return;
        }
        if (_edsilv_utils__WEBPACK_IMPORTED_MODULE_2__["Bools"].getBool(this.config.options.shareFrameEnabled, true) && shareUrl) {
            this.$shareFrame.prop('src', shareUrl);
            this.$shareFrame.show();
        }
        else {
            this.$shareFrame.hide();
        }
    };
    ShareDialogue.prototype.updateTermsOfUseButton = function () {
        var requiredStatement = this.extension.helper.getRequiredStatement();
        if (_edsilv_utils__WEBPACK_IMPORTED_MODULE_2__["Bools"].getBool(this.extension.data.config.options.termsOfUseEnabled, false) && requiredStatement && requiredStatement.value) {
            this.$termsOfUseButton.show();
        }
        else {
            this.$termsOfUseButton.hide();
        }
    };
    ShareDialogue.prototype.openShareView = function () {
        this.isShareViewVisible = true;
        this.isEmbedViewVisible = false;
        this.$embedView.hide();
        this.$shareView.show();
        this.$shareButton.addClass('on default');
        this.$embedButton.removeClass('on default');
        this.resize();
    };
    ShareDialogue.prototype.openEmbedView = function () {
        this.isShareViewVisible = false;
        this.isEmbedViewVisible = true;
        this.$embedView.show();
        this.$shareView.hide();
        this.$shareButton.removeClass('on default');
        this.$embedButton.addClass('on default');
        this.resize();
    };
    ShareDialogue.prototype.close = function () {
        _super.prototype.close.call(this);
    };
    ShareDialogue.prototype.getViews = function () {
        return this.$tabsContent.find('.view');
    };
    ShareDialogue.prototype.equaliseViewHeights = function () {
        this.getViews().equaliseHeight(true);
    };
    ShareDialogue.prototype.resize = function () {
        this.equaliseViewHeights();
        this.setDockedPosition();
    };
    return ShareDialogue;
}(_uv_shared_module_Dialogue__WEBPACK_IMPORTED_MODULE_1__["Dialogue"]));



/***/ }),

/***/ "./src/modules/uv-moreinforightpanel-module/MoreInfoRightPanel.ts":
/*!************************************************************************!*\
  !*** ./src/modules/uv-moreinforightpanel-module/MoreInfoRightPanel.ts ***!
  \************************************************************************/
/*! exports provided: MoreInfoRightPanel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MoreInfoRightPanel", function() { return MoreInfoRightPanel; });
/* harmony import */ var _uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../uv-shared-module/BaseEvents */ "./src/modules/uv-shared-module/BaseEvents.ts");
/* harmony import */ var _uv_shared_module_RightPanel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../uv-shared-module/RightPanel */ "./src/modules/uv-shared-module/RightPanel.ts");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Utils */ "./src/Utils.ts");
/* harmony import */ var _edsilv_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @edsilv/utils */ "./node_modules/@edsilv/utils/dist-esmodule/index.js");
/* harmony import */ var _iiif_manifold__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @iiif/manifold */ "./node_modules/@iiif/manifold/dist-esmodule/index.js");
/* harmony import */ var _iiif_iiif_metadata_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @iiif/iiif-metadata-component */ "./node_modules/@iiif/iiif-metadata-component/dist-umd/IIIFMetadataComponent.js");
/* harmony import */ var _iiif_iiif_metadata_component__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_iiif_iiif_metadata_component__WEBPACK_IMPORTED_MODULE_5__);
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






var MoreInfoRightPanel = /** @class */ (function (_super) {
    __extends(MoreInfoRightPanel, _super);
    function MoreInfoRightPanel($element) {
        return _super.call(this, $element) || this;
    }
    MoreInfoRightPanel.prototype.create = function () {
        var _this = this;
        this.setConfig('moreInfoRightPanel');
        _super.prototype.create.call(this);
        this.component.subscribe(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].CANVAS_INDEX_CHANGED, function () {
            _this.databind();
        });
        this.component.subscribe(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].RANGE_CHANGED, function () {
            _this.databind();
        });
        this.setTitle(this.config.content.title);
        this.$metadata = $('<div class="iiif-metadata-component"></div>');
        this.$main.append(this.$metadata);
        this.metadataComponent = new _iiif_iiif_metadata_component__WEBPACK_IMPORTED_MODULE_5__["MetadataComponent"]({
            target: this.$metadata[0],
            data: this._getData()
        });
        this.metadataComponent.on('iiifViewerLinkClicked', function (href) {
            // get the hash param.
            var rangeId = _edsilv_utils__WEBPACK_IMPORTED_MODULE_3__["Urls"].getHashParameterFromString('rid', href);
            if (rangeId) {
                var range = _this.extension.helper.getRangeById(rangeId);
                if (range) {
                    _this.component.publish(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].RANGE_CHANGED, range);
                }
            }
        }, false);
    };
    MoreInfoRightPanel.prototype.toggleFinish = function () {
        _super.prototype.toggleFinish.call(this);
        this.databind();
    };
    MoreInfoRightPanel.prototype.databind = function () {
        this.metadataComponent.set(this._getData());
    };
    MoreInfoRightPanel.prototype._getCurrentRange = function () {
        var range = this.extension.helper.getCurrentRange();
        return range;
    };
    MoreInfoRightPanel.prototype._getData = function () {
        return {
            canvasDisplayOrder: this.config.options.canvasDisplayOrder,
            canvases: this.extension.getCurrentCanvases(),
            canvasExclude: this.config.options.canvasExclude,
            canvasLabels: this.extension.getCanvasLabels(this.content.page),
            content: this.config.content,
            copiedMessageDuration: 2000,
            copyToClipboardEnabled: _edsilv_utils__WEBPACK_IMPORTED_MODULE_3__["Bools"].getBool(this.config.options.copyToClipboardEnabled, false),
            helper: this.extension.helper,
            licenseFormatter: new _iiif_manifold__WEBPACK_IMPORTED_MODULE_4__["UriLabeller"](this.config.license ? this.config.license : {}),
            limit: this.config.options.textLimit || 4,
            limitType: _iiif_iiif_metadata_component__WEBPACK_IMPORTED_MODULE_5__["LimitType"].LINES,
            limitToRange: _edsilv_utils__WEBPACK_IMPORTED_MODULE_3__["Bools"].getBool(this.config.options.limitToRange, false),
            manifestDisplayOrder: this.config.options.manifestDisplayOrder,
            manifestExclude: this.config.options.manifestExclude,
            range: this._getCurrentRange(),
            rtlLanguageCodes: this.config.options.rtlLanguageCodes,
            sanitizer: function (html) {
                return Object(_Utils__WEBPACK_IMPORTED_MODULE_2__["sanitize"])(html);
            },
            showAllLanguages: this.config.options.showAllLanguages
        };
    };
    MoreInfoRightPanel.prototype.resize = function () {
        _super.prototype.resize.call(this);
        this.$main.height(this.$element.height() - this.$top.height() - this.$main.verticalMargins());
    };
    return MoreInfoRightPanel;
}(_uv_shared_module_RightPanel__WEBPACK_IMPORTED_MODULE_1__["RightPanel"]));



/***/ }),

/***/ "./src/modules/uv-shared-module/Auth09.ts":
/*!************************************************!*\
  !*** ./src/modules/uv-shared-module/Auth09.ts ***!
  \************************************************/
/*! exports provided: Auth09 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Auth09", function() { return Auth09; });
/* harmony import */ var _BaseEvents__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseEvents */ "./src/modules/uv-shared-module/BaseEvents.ts");
/* harmony import */ var _InformationArgs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./InformationArgs */ "./src/modules/uv-shared-module/InformationArgs.ts");
/* harmony import */ var _InformationType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./InformationType */ "./src/modules/uv-shared-module/InformationType.ts");
/* harmony import */ var _LoginWarningMessages__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./LoginWarningMessages */ "./src/modules/uv-shared-module/LoginWarningMessages.ts");
/* harmony import */ var manifesto_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! manifesto.js */ "./node_modules/manifesto.js/dist-umd/manifesto.js");
/* harmony import */ var manifesto_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(manifesto_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _edsilv_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @edsilv/utils */ "./node_modules/@edsilv/utils/dist-esmodule/index.js");
/* harmony import */ var _edsilv_http_status_codes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @edsilv/http-status-codes */ "./node_modules/@edsilv/http-status-codes/dist-umd/httpstatuscodes.js");
/* harmony import */ var _edsilv_http_status_codes__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_edsilv_http_status_codes__WEBPACK_IMPORTED_MODULE_6__);







var Auth09 = /** @class */ (function () {
    function Auth09() {
    }
    Auth09.loadExternalResources = function (resourcesToLoad, storageStrategy) {
        return new Promise(function (resolve) {
            manifesto_js__WEBPACK_IMPORTED_MODULE_4__["Utils"].loadExternalResourcesAuth09(resourcesToLoad, storageStrategy, Auth09.clickThrough, Auth09.restricted, Auth09.login, Auth09.getAccessToken, Auth09.storeAccessToken, Auth09.getStoredAccessToken, Auth09.handleExternalResourceResponse).then(function (r) {
                resolve(r);
            })['catch'](function (error) {
                switch (error.name) {
                    case manifesto_js__WEBPACK_IMPORTED_MODULE_4__["StatusCode"].AUTHORIZATION_FAILED.toString():
                        Auth09.publish(_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].LOGIN_FAILED);
                        break;
                    case manifesto_js__WEBPACK_IMPORTED_MODULE_4__["StatusCode"].FORBIDDEN.toString():
                        Auth09.publish(_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].FORBIDDEN);
                        break;
                    case manifesto_js__WEBPACK_IMPORTED_MODULE_4__["StatusCode"].RESTRICTED.toString():
                        // do nothing
                        break;
                    default:
                        Auth09.publish(_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].SHOW_MESSAGE, [error.message || error]);
                }
            });
        });
    };
    Auth09.clickThrough = function (resource) {
        return new Promise(function (resolve) {
            Auth09.publish(_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].SHOW_CLICKTHROUGH_DIALOGUE, [{
                    resource: resource,
                    acceptCallback: function () {
                        if (resource.clickThroughService) {
                            var win_1 = window.open(resource.clickThroughService.id);
                            var pollTimer_1 = window.setInterval(function () {
                                if (win_1 && win_1.closed) {
                                    window.clearInterval(pollTimer_1);
                                    Auth09.publish(_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].CLICKTHROUGH);
                                    resolve();
                                }
                            }, 500);
                        }
                    }
                }]);
        });
    };
    Auth09.restricted = function (resource) {
        return new Promise(function (resolve, reject) {
            Auth09.publish(_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].SHOW_RESTRICTED_DIALOGUE, [{
                    resource: resource,
                    acceptCallback: function () {
                        Auth09.publish(_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].LOAD_FAILED);
                        reject(resource);
                    }
                }]);
        });
    };
    Auth09.login = function (resource) {
        return new Promise(function (resolve) {
            var options = {};
            if (resource.status === _edsilv_http_status_codes__WEBPACK_IMPORTED_MODULE_6__["FORBIDDEN"]) {
                options.warningMessage = _LoginWarningMessages__WEBPACK_IMPORTED_MODULE_3__["LoginWarningMessages"].FORBIDDEN;
                options.showCancelButton = true;
            }
            Auth09.publish(_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].SHOW_LOGIN_DIALOGUE, [{
                    resource: resource,
                    loginCallback: function () {
                        if (resource.loginService) {
                            var win_2 = window.open(resource.loginService.id + "?t=" + new Date().getTime());
                            var pollTimer_2 = window.setInterval(function () {
                                if (win_2 && win_2.closed) {
                                    window.clearInterval(pollTimer_2);
                                    Auth09.publish(_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].LOGIN);
                                    resolve();
                                }
                            }, 500);
                        }
                    },
                    logoutCallback: function () {
                        if (resource.logoutService) {
                            var win_3 = window.open(resource.logoutService.id + "?t=" + new Date().getTime());
                            var pollTimer_3 = window.setInterval(function () {
                                if (win_3 && win_3.closed) {
                                    window.clearInterval(pollTimer_3);
                                    Auth09.publish(_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].LOGOUT);
                                    resolve();
                                }
                            }, 500);
                        }
                    },
                    options: options
                }]);
        });
    };
    Auth09.getAccessToken = function (resource, rejectOnError) {
        return new Promise(function (resolve, reject) {
            if (resource.tokenService) {
                var serviceUri = resource.tokenService.id;
                // pick an identifier for this message. We might want to keep track of sent messages
                var msgId = serviceUri + "|" + new Date().getTime();
                var receiveAccessToken_1 = function (e) {
                    window.removeEventListener("message", receiveAccessToken_1);
                    var token = e.data;
                    if (token.error) {
                        if (rejectOnError) {
                            reject(token.errorDescription);
                        }
                        else {
                            resolve(undefined);
                        }
                    }
                    else {
                        resolve(token);
                    }
                };
                window.addEventListener("message", receiveAccessToken_1, false);
                var tokenUri = serviceUri + "?messageId=" + msgId;
                $('#commsFrame').prop('src', tokenUri);
            }
            else {
                reject('Token service not found');
            }
        });
    };
    Auth09.storeAccessToken = function (resource, token, storageStrategy) {
        return new Promise(function (resolve, reject) {
            if (resource.tokenService) {
                _edsilv_utils__WEBPACK_IMPORTED_MODULE_5__["Storage"].set(resource.tokenService.id, token, token.expiresIn, storageStrategy);
                resolve();
            }
            else {
                reject('Token service not found');
            }
        });
    };
    Auth09.getStoredAccessToken = function (resource, storageStrategy) {
        return new Promise(function (resolve, reject) {
            var foundItems = [];
            var item = null;
            // try to match on the tokenService, if the resource has one:
            if (resource.tokenService) {
                item = _edsilv_utils__WEBPACK_IMPORTED_MODULE_5__["Storage"].get(resource.tokenService.id, storageStrategy);
            }
            if (item) {
                foundItems.push(item);
            }
            else {
                // find an access token for the domain
                var domain = _edsilv_utils__WEBPACK_IMPORTED_MODULE_5__["Urls"].getUrlParts(resource.dataUri).hostname;
                var items = _edsilv_utils__WEBPACK_IMPORTED_MODULE_5__["Storage"].getItems(storageStrategy);
                for (var i = 0; i < items.length; i++) {
                    item = items[i];
                    if (item.key.includes(domain)) {
                        foundItems.push(item);
                    }
                }
            }
            // sort by expiresAt, earliest to most recent.
            foundItems = foundItems.sort(function (a, b) {
                return a.expiresAt - b.expiresAt;
            });
            var foundToken;
            if (foundItems.length) {
                foundToken = foundItems[foundItems.length - 1].value;
            }
            resolve(foundToken);
        });
    };
    Auth09.handleExternalResourceResponse = function (resource) {
        return new Promise(function (resolve, reject) {
            resource.isResponseHandled = true;
            if (resource.status === _edsilv_http_status_codes__WEBPACK_IMPORTED_MODULE_6__["OK"]) {
                resolve(resource);
            }
            else if (resource.status === _edsilv_http_status_codes__WEBPACK_IMPORTED_MODULE_6__["MOVED_TEMPORARILY"]) {
                resolve(resource);
                Auth09.publish(_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].RESOURCE_DEGRADED, [resource]);
            }
            else {
                if (resource.error.status === _edsilv_http_status_codes__WEBPACK_IMPORTED_MODULE_6__["UNAUTHORIZED"] ||
                    resource.error.status === _edsilv_http_status_codes__WEBPACK_IMPORTED_MODULE_6__["INTERNAL_SERVER_ERROR"]) {
                    // if the browser doesn't support CORS
                    // if (!Modernizr.cors) {
                    //     const informationArgs: InformationArgs = new InformationArgs(InformationType.AUTH_CORS_ERROR, null);
                    //     Auth09.publish(BaseEvents.SHOW_INFORMATION, [informationArgs]);
                    //     resolve(resource);
                    // } else {
                    // commented above because only supporting IE11 upwards which has CORS
                    reject(resource.error.statusText);
                    //}
                }
                else if (resource.error.status === _edsilv_http_status_codes__WEBPACK_IMPORTED_MODULE_6__["FORBIDDEN"]) {
                    var error = new Error();
                    error.message = "Forbidden";
                    error.name = manifesto_js__WEBPACK_IMPORTED_MODULE_4__["StatusCode"].FORBIDDEN.toString();
                    reject(error);
                }
                else {
                    reject(resource.error.statusText);
                }
            }
        });
    };
    Auth09.handleDegraded = function (resource) {
        var informationArgs = new _InformationArgs__WEBPACK_IMPORTED_MODULE_1__["InformationArgs"](_InformationType__WEBPACK_IMPORTED_MODULE_2__["InformationType"].DEGRADED_RESOURCE, resource);
        Auth09.publish(_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].SHOW_INFORMATION, [informationArgs]);
    };
    return Auth09;
}());



/***/ }),

/***/ "./src/modules/uv-shared-module/Auth1.ts":
/*!***********************************************!*\
  !*** ./src/modules/uv-shared-module/Auth1.ts ***!
  \***********************************************/
/*! exports provided: Auth1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Auth1", function() { return Auth1; });
/* harmony import */ var _BaseEvents__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseEvents */ "./src/modules/uv-shared-module/BaseEvents.ts");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Utils */ "./src/Utils.ts");
/* harmony import */ var _InformationArgs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./InformationArgs */ "./src/modules/uv-shared-module/InformationArgs.ts");
/* harmony import */ var _InformationType__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./InformationType */ "./src/modules/uv-shared-module/InformationType.ts");
/* harmony import */ var manifesto_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! manifesto.js */ "./node_modules/manifesto.js/dist-umd/manifesto.js");
/* harmony import */ var manifesto_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(manifesto_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _edsilv_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @edsilv/utils */ "./node_modules/@edsilv/utils/dist-esmodule/index.js");
/* harmony import */ var _edsilv_http_status_codes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @edsilv/http-status-codes */ "./node_modules/@edsilv/http-status-codes/dist-umd/httpstatuscodes.js");
/* harmony import */ var _edsilv_http_status_codes__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_edsilv_http_status_codes__WEBPACK_IMPORTED_MODULE_6__);







var Auth1 = /** @class */ (function () {
    function Auth1() {
    }
    Auth1.loadExternalResources = function (resourcesToLoad, storageStrategy, options) {
        return new Promise(function (resolve) {
            Auth1.storageStrategy = storageStrategy;
            // set all resources to Auth API V1
            resourcesToLoad = resourcesToLoad.map(function (resource) {
                resource.authAPIVersion = 1;
                resource.options = options;
                return resource;
            });
            manifesto_js__WEBPACK_IMPORTED_MODULE_4__["Utils"].loadExternalResourcesAuth1(resourcesToLoad, Auth1.openContentProviderInteraction, Auth1.openTokenService, Auth1.getStoredAccessToken, Auth1.userInteractedWithContentProvider, Auth1.getContentProviderInteraction, Auth1.handleMovedTemporarily, Auth1.showOutOfOptionsMessages).then(function (r) {
                resolve(r);
            })['catch'](function (error) {
                switch (error.name) {
                    case manifesto_js__WEBPACK_IMPORTED_MODULE_4__["StatusCode"].AUTHORIZATION_FAILED.toString():
                        Auth1.publish(_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].LOGIN_FAILED);
                        break;
                    case manifesto_js__WEBPACK_IMPORTED_MODULE_4__["StatusCode"].FORBIDDEN.toString():
                        Auth1.publish(_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].FORBIDDEN);
                        break;
                    case manifesto_js__WEBPACK_IMPORTED_MODULE_4__["StatusCode"].RESTRICTED.toString():
                        // do nothing
                        break;
                    default:
                        Auth1.publish(_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].SHOW_MESSAGE, [error.message || error]);
                }
            });
        });
    };
    Auth1.getCookieServiceUrl = function (service) {
        var cookieServiceUrl = service.id + "?origin=" + Auth1.getOrigin();
        return cookieServiceUrl;
    };
    Auth1.openContentProviderInteraction = function (service) {
        var cookieServiceUrl = Auth1.getCookieServiceUrl(service);
        return window.open(cookieServiceUrl);
    };
    // determine the postMessage-style origin for a URL
    Auth1.getOrigin = function (url) {
        var urlHolder = window.location;
        if (url) {
            urlHolder = document.createElement('a');
            urlHolder.href = url;
        }
        return urlHolder.protocol + "//" + urlHolder.hostname + (urlHolder.port ? ':' + urlHolder.port : '');
    };
    Auth1.userInteractedWithContentProvider = function (contentProviderWindow) {
        return new Promise(function (resolve) {
            // What happens here is forever a mystery to a client application.
            // It can but wait.
            var poll = window.setInterval(function () {
                if (contentProviderWindow.closed) {
                    window.clearInterval(poll);
                    resolve(true);
                }
            }, 500);
        });
    };
    Auth1.handleMovedTemporarily = function (resource) {
        return new Promise(function (resolve) {
            Auth1.showDegradedMessage(resource);
            resource.isResponseHandled = true;
            resolve();
        });
    };
    Auth1.showDegradedMessage = function (resource) {
        var informationArgs = new _InformationArgs__WEBPACK_IMPORTED_MODULE_2__["InformationArgs"](_InformationType__WEBPACK_IMPORTED_MODULE_3__["InformationType"].DEGRADED_RESOURCE, resource);
        Auth1.publish(_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].SHOW_INFORMATION, [informationArgs]);
    };
    Auth1.storeAccessToken = function (resource, token) {
        return new Promise(function (resolve, reject) {
            if (resource.tokenService) {
                _edsilv_utils__WEBPACK_IMPORTED_MODULE_5__["Storage"].set(resource.tokenService.id, token, token.expiresIn, Auth1.storageStrategy);
                resolve();
            }
            else {
                reject('Token service not found');
            }
        });
    };
    Auth1.getStoredAccessToken = function (resource) {
        return new Promise(function (resolve, reject) {
            var foundItems = [];
            var item = null;
            // try to match on the tokenService, if the resource has one:
            if (resource.tokenService) {
                item = _edsilv_utils__WEBPACK_IMPORTED_MODULE_5__["Storage"].get(resource.tokenService.id, Auth1.storageStrategy);
            }
            if (item) {
                foundItems.push(item);
            }
            else {
                // find an access token for the domain
                var domain = _edsilv_utils__WEBPACK_IMPORTED_MODULE_5__["Urls"].getUrlParts(resource.dataUri).hostname;
                var items = _edsilv_utils__WEBPACK_IMPORTED_MODULE_5__["Storage"].getItems(Auth1.storageStrategy);
                for (var i = 0; i < items.length; i++) {
                    item = items[i];
                    if (item.key.includes(domain)) {
                        foundItems.push(item);
                    }
                }
            }
            // sort by expiresAt, earliest to most recent.
            foundItems = foundItems.sort(function (a, b) {
                return a.expiresAt - b.expiresAt;
            });
            var foundToken = null;
            if (foundItems.length) {
                foundToken = foundItems[foundItems.length - 1].value;
            }
            resolve(foundToken);
        });
    };
    Auth1.getContentProviderInteraction = function (resource, service) {
        return new Promise(function (resolve) {
            // if the info bar has already been shown for degraded logins
            if (resource.isResponseHandled && !resource.authHoldingPage) {
                Auth1.showDegradedMessage(resource);
                resolve(null);
            }
            else if (resource.authHoldingPage) {
                // redirect holding page
                resource.authHoldingPage.location.href = Auth1.getCookieServiceUrl(service);
                resolve(resource.authHoldingPage);
            }
            else {
                Auth1.publish(_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].SHOW_AUTH_DIALOGUE, [{
                        service: service,
                        closeCallback: function () {
                            resolve(null);
                        },
                        confirmCallback: function () {
                            var win = Auth1.openContentProviderInteraction(service);
                            resolve(win);
                        },
                        cancelCallback: function () {
                            resolve(null);
                        }
                    }]);
            }
        });
    };
    Auth1.openTokenService = function (resource, tokenService) {
        // use a Promise across a postMessage call. Discuss...
        return new Promise(function (resolve, reject) {
            // if necessary, the client can decide not to trust this origin
            var serviceOrigin = Auth1.getOrigin(tokenService.id);
            var messageId = new Date().getTime();
            Auth1.messages[messageId] = {
                "resolve": resolve,
                "reject": reject,
                "serviceOrigin": serviceOrigin,
                "resource": resource
            };
            window.addEventListener("message", Auth1.receiveToken, false);
            var tokenUrl = tokenService.id + "?messageId=" + messageId + "&origin=" + Auth1.getOrigin();
            // load the access token service url in the #commsFrame iframe.
            // when the message event listener (Auth1.receiveToken) receives a message from the iframe
            // it looks in Auth1.messages to find a corresponding message id with the same origin.
            // if found, it stores the returned access token, resolves and deletes the message.
            // resolving the message resolves the openTokenService promise.
            $('#commsFrame').prop('src', tokenUrl);
            // reject any unhandled messages after a configurable timeout
            var postMessageTimeout = 5000;
            setTimeout(function () {
                if (Auth1.messages[messageId]) {
                    Auth1.messages[messageId].reject("Message unhandled after " + postMessageTimeout + "ms, rejecting");
                    delete Auth1.messages[messageId];
                }
            }, postMessageTimeout);
        });
    };
    Auth1.receiveToken = function (event) {
        if (event.data.hasOwnProperty("messageId")) {
            var message_1 = Auth1.messages[event.data.messageId];
            if (message_1 && event.origin == message_1.serviceOrigin) {
                // Any message with a messageId is a success
                Auth1.storeAccessToken(message_1.resource, event.data).then(function () {
                    message_1.resolve(event.data); // resolves openTokenService with the token
                    delete Auth1.messages[event.data.messageId];
                    return;
                });
            }
        }
    };
    Auth1.showOutOfOptionsMessages = function (resource, service) {
        console.log(resource);
        // if the UV is already showing the info bar, no need to show an error message.
        if (resource.status == _edsilv_http_status_codes__WEBPACK_IMPORTED_MODULE_6__["MOVED_TEMPORARILY"]) {
            return;
        }
        var errorMessage = "";
        if (service.getFailureHeader()) {
            errorMessage += '<p>' + service.getFailureHeader() + '</p>';
        }
        if (service.getFailureDescription()) {
            errorMessage += service.getFailureDescription();
        }
        Auth1.publish(_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].SHOW_MESSAGE, [Object(_Utils__WEBPACK_IMPORTED_MODULE_1__["sanitize"])(errorMessage)]);
    };
    Auth1.messages = {};
    return Auth1;
}());



/***/ }),

/***/ "./src/modules/uv-shared-module/BaseExpandPanel.ts":
/*!*********************************************************!*\
  !*** ./src/modules/uv-shared-module/BaseExpandPanel.ts ***!
  \*********************************************************/
/*! exports provided: BaseExpandPanel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseExpandPanel", function() { return BaseExpandPanel; });
/* harmony import */ var _BaseView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseView */ "./src/modules/uv-shared-module/BaseView.ts");
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


var BaseExpandPanel = /** @class */ (function (_super) {
    __extends(BaseExpandPanel, _super);
    function BaseExpandPanel($element) {
        var _this = _super.call(this, $element, false, true) || this;
        _this.isExpanded = false;
        _this.isFullyExpanded = false;
        _this.isUnopened = true;
        _this.autoToggled = false;
        _this.expandFullEnabled = true;
        return _this;
    }
    BaseExpandPanel.prototype.create = function () {
        var _this = this;
        _super.prototype.create.call(this);
        this.$top = $('<div class="top"></div>');
        this.$element.append(this.$top);
        this.$title = $('<div class="title"></div>');
        this.$title.prop('title', this.content.title);
        this.$top.append(this.$title);
        this.$expandFullButton = $('<a class="expandFullButton" tabindex="0"></a>');
        this.$expandFullButton.prop('title', this.content.expandFull);
        this.$top.append(this.$expandFullButton);
        if (!_edsilv_utils__WEBPACK_IMPORTED_MODULE_1__["Bools"].getBool(this.config.options.expandFullEnabled, true)) {
            this.$expandFullButton.hide();
        }
        this.$collapseButton = $('<div class="collapseButton" tabindex="0"></div>');
        this.$collapseButton.prop('title', this.content.collapse);
        this.$top.append(this.$collapseButton);
        this.$closed = $('<div class="closed"></div>');
        this.$element.append(this.$closed);
        this.$expandButton = $('<a class="expandButton" tabindex="0"></a>');
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
            }
            else {
                _this.toggle();
            }
        });
        this.$collapseButton.onPressed(function () {
            if (_this.isFullyExpanded) {
                _this.collapseFull();
            }
            else {
                _this.toggle();
            }
        });
        this.$top.hide();
        this.$main.hide();
    };
    BaseExpandPanel.prototype.init = function () {
        _super.prototype.init.call(this);
    };
    BaseExpandPanel.prototype.setTitle = function (title) {
        this.$title.text(title);
        this.$closedTitle.text(title);
    };
    BaseExpandPanel.prototype.toggle = function (autoToggled) {
        var _this = this;
        (autoToggled) ? this.autoToggled = true : this.autoToggled = false;
        // if collapsing, hide contents immediately.
        if (this.isExpanded) {
            this.$top.attr('aria-hidden', 'true');
            this.$main.attr('aria-hidden', 'true');
            this.$closed.attr('aria-hidden', 'false');
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
        // if expanded show content when animation finished.
        if (this.isExpanded) {
            this.$top.attr('aria-hidden', 'false');
            this.$main.attr('aria-hidden', 'false');
            this.$closed.attr('aria-hidden', 'true');
            this.$closed.hide();
            this.$top.show();
            this.$main.show();
        }
        this.toggleFinish();
        this.isUnopened = false;
    };
    BaseExpandPanel.prototype.expandFull = function () {
        var _this = this;
        if (!this.isExpanded) {
            this.toggled();
        }
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
        }
        else {
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
        if (this.expandFullEnabled) {
            this.$expandFullButton.show();
        }
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
}(_BaseView__WEBPACK_IMPORTED_MODULE_0__["BaseView"]));



/***/ }),

/***/ "./src/modules/uv-shared-module/BaseExtension.ts":
/*!*******************************************************!*\
  !*** ./src/modules/uv-shared-module/BaseExtension.ts ***!
  \*******************************************************/
/*! exports provided: BaseExtension */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseExtension", function() { return BaseExtension; });
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Utils */ "./src/Utils.ts");
/* harmony import */ var _Auth09__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Auth09 */ "./src/modules/uv-shared-module/Auth09.ts");
/* harmony import */ var _Auth1__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Auth1 */ "./src/modules/uv-shared-module/Auth1.ts");
/* harmony import */ var _modules_uv_dialogues_module_AuthDialogue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../modules/uv-dialogues-module/AuthDialogue */ "./src/modules/uv-dialogues-module/AuthDialogue.ts");
/* harmony import */ var _BaseEvents__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./BaseEvents */ "./src/modules/uv-shared-module/BaseEvents.ts");
/* harmony import */ var _modules_uv_dialogues_module_ClickThroughDialogue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../modules/uv-dialogues-module/ClickThroughDialogue */ "./src/modules/uv-dialogues-module/ClickThroughDialogue.ts");
/* harmony import */ var _modules_uv_dialogues_module_LoginDialogue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../modules/uv-dialogues-module/LoginDialogue */ "./src/modules/uv-dialogues-module/LoginDialogue.ts");
/* harmony import */ var _modules_uv_shared_module_MetricType__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../modules/uv-shared-module/MetricType */ "./src/modules/uv-shared-module/MetricType.ts");
/* harmony import */ var _modules_uv_dialogues_module_RestrictedDialogue__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../modules/uv-dialogues-module/RestrictedDialogue */ "./src/modules/uv-dialogues-module/RestrictedDialogue.ts");
/* harmony import */ var _Shell__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Shell */ "./src/modules/uv-shared-module/Shell.ts");
/* harmony import */ var _iiif_manifold__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @iiif/manifold */ "./node_modules/@iiif/manifold/dist-esmodule/index.js");
/* harmony import */ var _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @iiif/vocabulary */ "./node_modules/@iiif/vocabulary/dist-esmodule/index.js");
/* harmony import */ var _edsilv_key_codes__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @edsilv/key-codes */ "./node_modules/@edsilv/key-codes/dist-esmodule/index.js");
/* harmony import */ var _edsilv_utils__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @edsilv/utils */ "./node_modules/@edsilv/utils/dist-esmodule/index.js");














var BaseExtension = /** @class */ (function () {
    function BaseExtension() {
        this.isCreated = false;
        this.isLoggedIn = false;
        this.metric = _modules_uv_shared_module_MetricType__WEBPACK_IMPORTED_MODULE_7__["MetricType"].NONE;
        this.metrics = [];
        this.shifted = false;
        this.tabbing = false;
    }
    BaseExtension.prototype.create = function () {
        var _this = this;
        var that = this;
        _Auth09__WEBPACK_IMPORTED_MODULE_1__["Auth09"].publish = this.component.publish.bind(this.component);
        _Auth1__WEBPACK_IMPORTED_MODULE_2__["Auth1"].publish = this.component.publish.bind(this.component);
        this.$element = $(this.component.options.target);
        this.$element.data("component", this.component);
        this.fire(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].CREATE, {
            data: this.data,
            settings: this.getSettings(),
            preview: this.getSharePreview()
        });
        this._parseMetrics();
        this._initLocales();
        // add/remove classes.
        this.$element.empty();
        this.$element.removeClass();
        this.$element.addClass('uv');
        this.$element.addClass('loading');
        if (this.data.locales) {
            this.$element.addClass(this.data.locales[0].name.toLowerCase());
        }
        this.$element.addClass(this.name);
        this.$element.addClass('browser-' + window.browserDetect.browser);
        this.$element.addClass('browser-version-' + window.browserDetect.version);
        this.$element.prop('tabindex', 0);
        if (this.data.embedded) {
            this.$element.addClass('embedded');
        }
        if (this.isMobile()) {
            this.$element.addClass('mobile');
        }
        // todo: deprecate?
        if (this.data.isLightbox) {
            this.$element.addClass('lightbox');
        }
        if (_edsilv_utils__WEBPACK_IMPORTED_MODULE_13__["Documents"].supportsFullscreen()) {
            this.$element.addClass('fullscreen-supported');
        }
        this.$element.on('mousemove', function (e) {
            _this.mouseX = e.pageX;
            _this.mouseY = e.pageY;
        });
        // if this is the first load
        if (!this.data.isReload) {
            var visibilityProp = _edsilv_utils__WEBPACK_IMPORTED_MODULE_13__["Documents"].getHiddenProp();
            if (visibilityProp) {
                var event_1 = visibilityProp.replace(/[H|h]idden/, '') + 'visibilitychange';
                document.addEventListener(event_1, function () {
                    // resize after a tab has been shown (fixes safari layout issue)
                    if (!_edsilv_utils__WEBPACK_IMPORTED_MODULE_13__["Documents"].isHidden()) {
                        _this.resize();
                    }
                });
            }
            if (_edsilv_utils__WEBPACK_IMPORTED_MODULE_13__["Bools"].getBool(this.data.config.options.dropEnabled, true)) {
                this.$element.on('drop', (function (e) {
                    e.preventDefault();
                    var dropUrl = e.originalEvent.dataTransfer.getData('URL');
                    var a = _edsilv_utils__WEBPACK_IMPORTED_MODULE_13__["Urls"].getUrlParts(dropUrl);
                    var manifestUri = _edsilv_utils__WEBPACK_IMPORTED_MODULE_13__["Urls"].getQuerystringParameterFromString('manifest', a.search);
                    if (!manifestUri) {
                        // look for collection param
                        manifestUri = _edsilv_utils__WEBPACK_IMPORTED_MODULE_13__["Urls"].getQuerystringParameterFromString('collection', a.search);
                    }
                    //var canvasUri = Urls.getQuerystringParameterFromString('canvas', url.search);
                    if (manifestUri) {
                        _this.fire(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].DROP, manifestUri);
                        var data = {};
                        data.manifestUri = manifestUri;
                        _this.reload(data);
                    }
                }));
            }
            this.$element.on('dragover', (function (e) {
                // allow drop
                e.preventDefault();
            }));
            // keyboard events.
            this.$element.on('keyup keydown', function (e) {
                _this.shifted = e.shiftKey;
                _this.tabbing = e.keyCode === _edsilv_key_codes__WEBPACK_IMPORTED_MODULE_12__["KeyDown"].Tab;
            });
            this.$element.on('keydown', function (e) {
                var event = null;
                var preventDefault = true;
                if (!e.ctrlKey && !e.altKey && !e.shiftKey) {
                    if (e.keyCode === _edsilv_key_codes__WEBPACK_IMPORTED_MODULE_12__["KeyDown"].Enter) {
                        event = _BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].RETURN;
                        preventDefault = false;
                    }
                    if (e.keyCode === _edsilv_key_codes__WEBPACK_IMPORTED_MODULE_12__["KeyDown"].Escape)
                        event = _BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].ESCAPE;
                    if (e.keyCode === _edsilv_key_codes__WEBPACK_IMPORTED_MODULE_12__["KeyDown"].PageUp)
                        event = _BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].PAGE_UP;
                    if (e.keyCode === _edsilv_key_codes__WEBPACK_IMPORTED_MODULE_12__["KeyDown"].PageDown)
                        event = _BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].PAGE_DOWN;
                    if (e.keyCode === _edsilv_key_codes__WEBPACK_IMPORTED_MODULE_12__["KeyDown"].End)
                        event = _BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].END;
                    if (e.keyCode === _edsilv_key_codes__WEBPACK_IMPORTED_MODULE_12__["KeyDown"].Home)
                        event = _BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].HOME;
                    if (e.keyCode === _edsilv_key_codes__WEBPACK_IMPORTED_MODULE_12__["KeyDown"].NumpadPlus || e.keyCode === 171 || e.keyCode === _edsilv_key_codes__WEBPACK_IMPORTED_MODULE_12__["KeyDown"].Equals) {
                        event = _BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].PLUS;
                        preventDefault = false;
                    }
                    if (e.keyCode === _edsilv_key_codes__WEBPACK_IMPORTED_MODULE_12__["KeyDown"].NumpadMinus || e.keyCode === 173 || e.keyCode === _edsilv_key_codes__WEBPACK_IMPORTED_MODULE_12__["KeyDown"].Dash) {
                        event = _BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].MINUS;
                        preventDefault = false;
                    }
                    if (that.useArrowKeysToNavigate()) {
                        if (e.keyCode === _edsilv_key_codes__WEBPACK_IMPORTED_MODULE_12__["KeyDown"].LeftArrow)
                            event = _BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].LEFT_ARROW;
                        if (e.keyCode === _edsilv_key_codes__WEBPACK_IMPORTED_MODULE_12__["KeyDown"].UpArrow)
                            event = _BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].UP_ARROW;
                        if (e.keyCode === _edsilv_key_codes__WEBPACK_IMPORTED_MODULE_12__["KeyDown"].RightArrow)
                            event = _BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].RIGHT_ARROW;
                        if (e.keyCode === _edsilv_key_codes__WEBPACK_IMPORTED_MODULE_12__["KeyDown"].DownArrow)
                            event = _BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].DOWN_ARROW;
                    }
                }
                if (event) {
                    if (preventDefault) {
                        e.preventDefault();
                    }
                    _this.component.publish(event);
                }
            });
        }
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].EXIT_FULLSCREEN, function () {
            if (_this.isOverlayActive()) {
                _this.component.publish(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].ESCAPE);
            }
            _this.component.publish(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].ESCAPE);
            _this.component.publish(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].RESIZE);
        });
        this.$element.append('<a href="/" id="top"></a>');
        this.$element.append('<iframe id="commsFrame" style="display:none"></iframe>');
        //this.$element.append('<div id="debug"><span id="watch">Watch</span><span id="mobile-portrait">Mobile Portrait</span><span id="mobile-landscape">Mobile Landscape</span><span id="desktop">Desktop</span></div>');
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].ACCEPT_TERMS, function () {
            _this.fire(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].ACCEPT_TERMS);
        });
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].LOGIN_FAILED, function () {
            _this.fire(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].LOGIN_FAILED);
            _this.showMessage(_this.data.config.content.authorisationFailedMessage);
        });
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].LOGIN, function () {
            _this.isLoggedIn = true;
            _this.fire(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].LOGIN);
        });
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].LOGOUT, function () {
            _this.isLoggedIn = false;
            _this.fire(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].LOGOUT);
        });
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].BOOKMARK, function () {
            _this.bookmark();
            _this.fire(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].BOOKMARK);
        });
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].CANVAS_INDEX_CHANGE_FAILED, function () {
            _this.fire(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].CANVAS_INDEX_CHANGE_FAILED);
        });
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].CANVAS_INDEX_CHANGED, function (canvasIndex) {
            _this.data.canvasIndex = canvasIndex;
            _this.lastCanvasIndex = _this.helper.canvasIndex;
            _this.helper.canvasIndex = canvasIndex;
            _this.fire(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].CANVAS_INDEX_CHANGED, _this.data.canvasIndex);
        });
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].CLICKTHROUGH, function () {
            _this.fire(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].CLICKTHROUGH);
        });
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].CLOSE_ACTIVE_DIALOGUE, function () {
            _this.fire(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].CLOSE_ACTIVE_DIALOGUE);
        });
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].CLOSE_LEFT_PANEL, function () {
            _this.fire(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].CLOSE_LEFT_PANEL);
            _this.resize();
        });
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].CLOSE_RIGHT_PANEL, function () {
            _this.fire(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].CLOSE_RIGHT_PANEL);
            _this.resize();
        });
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].COLLECTION_INDEX_CHANGED, function (collectionIndex) {
            _this.data.collectionIndex = collectionIndex;
            _this.fire(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].COLLECTION_INDEX_CHANGED, _this.data.collectionIndex);
        });
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].CREATED, function () {
            _this.isCreated = true;
            _this.fire(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].CREATED);
        });
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].DOWN_ARROW, function () {
            _this.fire(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].DOWN_ARROW);
        });
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].DOWNLOAD, function (obj) {
            _this.fire(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].DOWNLOAD, obj);
        });
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].END, function () {
            _this.fire(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].END);
        });
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].ESCAPE, function () {
            _this.fire(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].ESCAPE);
            if (_this.isFullScreen() && !_this.isOverlayActive()) {
                _this.component.publish(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].TOGGLE_FULLSCREEN);
            }
        });
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].EXTERNAL_LINK_CLICKED, function (url) {
            _this.fire(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].EXTERNAL_LINK_CLICKED, url);
        });
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].FEEDBACK, function () {
            _this.feedback();
        });
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].FORBIDDEN, function () {
            _this.fire(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].FORBIDDEN);
            _this.component.publish(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].OPEN_EXTERNAL_RESOURCE);
        });
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].HIDE_DOWNLOAD_DIALOGUE, function () {
            _this.fire(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].HIDE_DOWNLOAD_DIALOGUE);
        });
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].HIDE_EMBED_DIALOGUE, function () {
            _this.fire(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].HIDE_EMBED_DIALOGUE);
        });
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].HIDE_EXTERNALCONTENT_DIALOGUE, function () {
            _this.fire(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].HIDE_EXTERNALCONTENT_DIALOGUE);
        });
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].HIDE_GENERIC_DIALOGUE, function () {
            _this.fire(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].HIDE_GENERIC_DIALOGUE);
        });
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].HIDE_HELP_DIALOGUE, function () {
            _this.fire(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].HIDE_HELP_DIALOGUE);
        });
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].HIDE_INFORMATION, function () {
            _this.fire(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].HIDE_INFORMATION);
        });
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].HIDE_LOGIN_DIALOGUE, function () {
            _this.fire(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].HIDE_LOGIN_DIALOGUE);
        });
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].HIDE_OVERLAY, function () {
            _this.fire(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].HIDE_OVERLAY);
        });
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].HIDE_RESTRICTED_DIALOGUE, function () {
            _this.fire(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].HIDE_RESTRICTED_DIALOGUE);
        });
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].HIDE_SETTINGS_DIALOGUE, function () {
            _this.fire(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].HIDE_SETTINGS_DIALOGUE);
        });
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].HOME, function () {
            _this.fire(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].HOME);
        });
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].LEFT_ARROW, function () {
            _this.fire(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].LEFT_ARROW);
        });
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].LEFTPANEL_COLLAPSE_FULL_FINISH, function () {
            _this.fire(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].LEFTPANEL_COLLAPSE_FULL_FINISH);
        });
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].LEFTPANEL_COLLAPSE_FULL_START, function () {
            _this.fire(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].LEFTPANEL_COLLAPSE_FULL_START);
        });
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].LEFTPANEL_EXPAND_FULL_FINISH, function () {
            _this.fire(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].LEFTPANEL_EXPAND_FULL_FINISH);
        });
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].LEFTPANEL_EXPAND_FULL_START, function () {
            _this.fire(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].LEFTPANEL_EXPAND_FULL_START);
        });
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].LOAD_FAILED, function () {
            _this.fire(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].LOAD_FAILED);
            if (!that.lastCanvasIndex == null && that.lastCanvasIndex !== that.helper.canvasIndex) {
                _this.component.publish(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].CANVAS_INDEX_CHANGED, that.lastCanvasIndex);
            }
        });
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].MANIFEST_INDEX_CHANGED, function (manifestIndex) {
            _this.data.manifestIndex = manifestIndex;
            _this.fire(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].MANIFEST_INDEX_CHANGED, _this.data.manifestIndex);
        });
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].NOT_FOUND, function () {
            _this.fire(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].NOT_FOUND);
        });
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].OPEN, function () {
            _this.fire(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].OPEN);
            var openUri = _edsilv_utils__WEBPACK_IMPORTED_MODULE_13__["Strings"].format(_this.data.config.options.openTemplate, _this.helper.manifestUri);
            window.open(openUri);
        });
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].OPEN_LEFT_PANEL, function () {
            _this.fire(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].OPEN_LEFT_PANEL);
            _this.resize();
        });
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].OPEN_EXTERNAL_RESOURCE, function () {
            _this.fire(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].OPEN_EXTERNAL_RESOURCE);
        });
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].OPENED_EXTERNAL_RESOURCE, function () {
            _this.$element.removeClass("loading");
            _this.component.publish(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].RESIZE);
            _this.fire(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].OPENED_EXTERNAL_RESOURCE);
        });
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].OPEN_RIGHT_PANEL, function () {
            _this.fire(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].OPEN_RIGHT_PANEL);
            _this.resize();
        });
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].PAGE_DOWN, function () {
            _this.fire(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].PAGE_DOWN);
        });
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].PAGE_UP, function () {
            _this.fire(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].PAGE_UP);
        });
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].RANGE_CHANGED, function (range) {
            if (range) {
                _this.data.rangeId = range.id;
                _this.helper.rangeId = range.id;
                _this.fire(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].RANGE_CHANGED, _this.data.rangeId);
            }
            else {
                _this.data.rangeId = undefined;
                _this.helper.rangeId = undefined;
                _this.fire(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].RANGE_CHANGED, null);
            }
        });
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].RESOURCE_DEGRADED, function (resource) {
            _this.fire(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].RESOURCE_DEGRADED);
            _Auth09__WEBPACK_IMPORTED_MODULE_1__["Auth09"].handleDegraded(resource);
        });
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].RETURN, function () {
            _this.fire(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].RETURN);
        });
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].RIGHT_ARROW, function () {
            _this.fire(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].RIGHT_ARROW);
        });
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].RIGHTPANEL_COLLAPSE_FULL_FINISH, function () {
            _this.fire(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].RIGHTPANEL_COLLAPSE_FULL_FINISH);
        });
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].RIGHTPANEL_COLLAPSE_FULL_START, function () {
            _this.fire(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].RIGHTPANEL_COLLAPSE_FULL_START);
        });
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].RIGHTPANEL_EXPAND_FULL_FINISH, function () {
            _this.fire(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].RIGHTPANEL_EXPAND_FULL_FINISH);
        });
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].RIGHTPANEL_EXPAND_FULL_START, function () {
            _this.fire(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].RIGHTPANEL_EXPAND_FULL_START);
        });
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].SEQUENCE_INDEX_CHANGED, function (sequenceIndex) {
            _this.data.sequenceIndex = sequenceIndex;
            _this.fire(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].SEQUENCE_INDEX_CHANGED, _this.data.sequenceIndex);
        });
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].SETTINGS_CHANGED, function (args) {
            _this.fire(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].SETTINGS_CHANGED, args);
        });
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].SHOW_DOWNLOAD_DIALOGUE, function () {
            _this.fire(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].SHOW_DOWNLOAD_DIALOGUE);
        });
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].SHOW_EMBED_DIALOGUE, function () {
            _this.fire(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].SHOW_EMBED_DIALOGUE);
        });
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].SHOW_EXTERNALCONTENT_DIALOGUE, function () {
            _this.fire(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].SHOW_EXTERNALCONTENT_DIALOGUE);
        });
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].SHOW_GENERIC_DIALOGUE, function () {
            _this.fire(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].SHOW_GENERIC_DIALOGUE);
        });
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].SHOW_HELP_DIALOGUE, function () {
            _this.fire(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].SHOW_HELP_DIALOGUE);
        });
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].SHOW_INFORMATION, function () {
            _this.fire(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].SHOW_INFORMATION);
        });
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].SHOW_LOGIN_DIALOGUE, function () {
            _this.fire(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].SHOW_LOGIN_DIALOGUE);
        });
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].SHOW_CLICKTHROUGH_DIALOGUE, function () {
            _this.fire(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].SHOW_CLICKTHROUGH_DIALOGUE);
        });
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].SHOW_MESSAGE, function (message) {
            _this.showMessage(message);
        });
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].SHOW_RESTRICTED_DIALOGUE, function () {
            _this.fire(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].SHOW_RESTRICTED_DIALOGUE);
        });
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].SHOW_OVERLAY, function () {
            _this.fire(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].SHOW_OVERLAY);
        });
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].SHOW_SETTINGS_DIALOGUE, function () {
            _this.fire(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].SHOW_SETTINGS_DIALOGUE);
        });
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].SHOW_TERMS_OF_USE, function () {
            _this.fire(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].SHOW_TERMS_OF_USE);
            var terms = _this.helper.getLicense();
            if (!terms) {
                var requiredStatement = _this.helper.getRequiredStatement();
                if (requiredStatement && requiredStatement.value) {
                    terms = requiredStatement.value;
                }
            }
            if (terms) {
                _this.showMessage(terms);
            }
        });
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].THUMB_SELECTED, function (thumb) {
            _this.fire(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].THUMB_SELECTED, thumb.index);
        });
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].TOGGLE_FULLSCREEN, function () {
            $('#top').focus();
            _this.component.isFullScreen = !_this.component.isFullScreen;
            if (_this.component.isFullScreen) {
                _this.$element.addClass('fullscreen');
            }
            else {
                _this.$element.removeClass('fullscreen');
            }
            _this.fire(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].TOGGLE_FULLSCREEN, {
                isFullScreen: _this.component.isFullScreen,
                overrideFullScreen: _this.data.config.options.overrideFullScreen
            });
        });
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].UP_ARROW, function () {
            _this.fire(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].UP_ARROW);
        });
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].UPDATE_SETTINGS, function () {
            _this.fire(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].UPDATE_SETTINGS);
        });
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].VIEW_FULL_TERMS, function () {
            _this.fire(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].VIEW_FULL_TERMS);
        });
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].WINDOW_UNLOAD, function () {
            _this.fire(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].WINDOW_UNLOAD);
        });
        // create shell and shared views.
        this.shell = new _Shell__WEBPACK_IMPORTED_MODULE_9__["Shell"](this.$element);
        this.createModules();
        this.modulesCreated();
        this.component.publish(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].RESIZE); // initial sizing
        setTimeout(function () {
            _this.render();
            _this.component.publish(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].CREATED);
            _this._setDefaultFocus();
        }, 1);
    };
    BaseExtension.prototype.createModules = function () {
        this.$authDialogue = $('<div class="overlay auth" aria-hidden="true"></div>');
        this.shell.$overlays.append(this.$authDialogue);
        this.authDialogue = new _modules_uv_dialogues_module_AuthDialogue__WEBPACK_IMPORTED_MODULE_3__["AuthDialogue"](this.$authDialogue);
        this.$clickThroughDialogue = $('<div class="overlay clickthrough" aria-hidden="true"></div>');
        this.shell.$overlays.append(this.$clickThroughDialogue);
        this.clickThroughDialogue = new _modules_uv_dialogues_module_ClickThroughDialogue__WEBPACK_IMPORTED_MODULE_5__["ClickThroughDialogue"](this.$clickThroughDialogue);
        this.$restrictedDialogue = $('<div class="overlay login" aria-hidden="true"></div>');
        this.shell.$overlays.append(this.$restrictedDialogue);
        this.restrictedDialogue = new _modules_uv_dialogues_module_RestrictedDialogue__WEBPACK_IMPORTED_MODULE_8__["RestrictedDialogue"](this.$restrictedDialogue);
        this.$loginDialogue = $('<div class="overlay login" aria-hidden="true"></div>');
        this.shell.$overlays.append(this.$loginDialogue);
        this.loginDialogue = new _modules_uv_dialogues_module_LoginDialogue__WEBPACK_IMPORTED_MODULE_6__["LoginDialogue"](this.$loginDialogue);
    };
    BaseExtension.prototype.modulesCreated = function () {
    };
    BaseExtension.prototype._setDefaultFocus = function () {
        var _this = this;
        setTimeout(function () {
            if (_this.data.config.options.allowStealFocus) {
                $('[tabindex=0]').focus();
            }
        }, 1);
    };
    BaseExtension.prototype.width = function () {
        return this.$element.width();
    };
    BaseExtension.prototype.height = function () {
        return this.$element.height();
    };
    BaseExtension.prototype.exitFullScreen = function () {
        this.component.publish(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].EXIT_FULLSCREEN);
    };
    BaseExtension.prototype.fire = function (name) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.component.fire(name, arguments[1]);
    };
    BaseExtension.prototype.redirect = function (uri) {
        this.fire(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].REDIRECT, uri);
    };
    BaseExtension.prototype.refresh = function () {
        this.fire(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].REFRESH, null);
    };
    BaseExtension.prototype.render = function () {
        if (!this.isCreated || (this.data.collectionIndex !== this.helper.collectionIndex)) {
            this.component.publish(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].COLLECTION_INDEX_CHANGED, this.data.collectionIndex);
        }
        if (!this.isCreated || (this.data.manifestIndex !== this.helper.manifestIndex)) {
            this.component.publish(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].MANIFEST_INDEX_CHANGED, this.data.manifestIndex);
        }
        if (!this.isCreated || (this.data.sequenceIndex !== this.helper.sequenceIndex)) {
            this.component.publish(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].SEQUENCE_INDEX_CHANGED, this.data.sequenceIndex);
        }
        if (!this.isCreated || (this.data.canvasIndex !== this.helper.canvasIndex)) {
            this.component.publish(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].CANVAS_INDEX_CHANGED, this.data.canvasIndex);
        }
        if (!this.isCreated || (this.data.rangeId !== this.helper.rangeId)) {
            if (this.data.rangeId) {
                var range = this.helper.getRangeById(this.data.rangeId);
                if (range) {
                    this.component.publish(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].RANGE_CHANGED, range);
                }
                else {
                    console.warn('range id not found:', this.data.rangeId);
                }
            }
        }
    };
    BaseExtension.prototype._initLocales = function () {
        var availableLocales = this.data.config.localisation.locales.slice(0);
        var configuredLocales = this.data.locales;
        var finalLocales = [];
        // loop through configuredLocales array (those passed in when initialising the UV component)
        // if availableLocales (those available in each extension's l10n directory) contains a configured locale, add it to finalLocales.
        // if the configured locale has a label, substitute it
        // mark locale as added.
        // if limitLocales is disabled,
        // loop through remaining availableLocales and add to finalLocales.
        if (configuredLocales) {
            configuredLocales.forEach(function (configuredLocale) {
                var match = availableLocales.filter(function (item) { return item.name === configuredLocale.name; });
                if (match.length) {
                    var m = match[0];
                    if (configuredLocale.label)
                        m.label = configuredLocale.label;
                    m.added = true;
                    finalLocales.push(m);
                }
            });
            var limitLocales = _edsilv_utils__WEBPACK_IMPORTED_MODULE_13__["Bools"].getBool(this.data.config.options.limitLocales, false);
            if (!limitLocales) {
                availableLocales.forEach(function (availableLocale) {
                    if (!availableLocale.added) {
                        finalLocales.push(availableLocale);
                    }
                    delete availableLocale.added;
                });
            }
            this.data.locales = finalLocales;
        }
        else {
            console.warn("No locales configured");
        }
    };
    BaseExtension.prototype._parseMetrics = function () {
        var metrics = this.data.config.options.metrics;
        if (metrics) {
            for (var i = 0; i < metrics.length; i++) {
                var m = metrics[i];
                if (typeof (m.type) === "string") {
                    m.type = new _modules_uv_shared_module_MetricType__WEBPACK_IMPORTED_MODULE_7__["MetricType"](m.type);
                }
                this.metrics.push(m);
            }
        }
    };
    BaseExtension.prototype._updateMetric = function () {
        var _this = this;
        setTimeout(function () {
            // loop through all metrics
            // find one that matches the current dimensions
            // if a metric is found, and it's not the current metric, set it to be the current metric and publish a METRIC_CHANGED event
            // if no metric is found, set MetricType.NONE to be the current metric and publish a METRIC_CHANGED event
            var metricFound = false;
            for (var i = 0; i < _this.metrics.length; i++) {
                var metric = _this.metrics[i];
                // if the current width and height is within this metric's defined range
                if (_this.width() >= metric.minWidth && _this.width() <= metric.maxWidth &&
                    _this.height() >= metric.minHeight && _this.height() <= metric.maxHeight) {
                    metricFound = true;
                    if (_this.metric !== metric.type) {
                        _this.metric = metric.type;
                        _this.component.publish(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].METRIC_CHANGED);
                    }
                }
            }
            if (!metricFound) {
                if (_this.metric !== _modules_uv_shared_module_MetricType__WEBPACK_IMPORTED_MODULE_7__["MetricType"].NONE) {
                    _this.metric = _modules_uv_shared_module_MetricType__WEBPACK_IMPORTED_MODULE_7__["MetricType"].NONE;
                    _this.component.publish(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].METRIC_CHANGED);
                }
            }
        }, 1);
    };
    BaseExtension.prototype.resize = function () {
        this._updateMetric();
        this.component.publish(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].RESIZE);
    };
    // re-bootstraps the application with new querystring params
    BaseExtension.prototype.reload = function (data) {
        this.component.publish(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].RELOAD, data);
    };
    BaseExtension.prototype.isSeeAlsoEnabled = function () {
        return this.data.config.options.seeAlsoEnabled !== false;
    };
    BaseExtension.prototype.getShareUrl = function () {
        // If not embedded on an external domain (this causes CORS errors when fetching parent url)
        if (!this.data.embedded) {
            // Use the current page URL with hash params
            if (_edsilv_utils__WEBPACK_IMPORTED_MODULE_13__["Documents"].isInIFrame()) {
                return parent.document.location.href;
            }
            else {
                return document.location.href;
            }
        }
        else {
            // If there's a `related` property of format `text/html` in the manifest
            if (this.helper.hasRelatedPage()) {
                // Use the `related` property in the URL box
                var related = this.helper.getRelated();
                if (related && related.length) {
                    related = related[0];
                }
                return related['@id'];
            }
        }
        return null;
    };
    BaseExtension.prototype.getIIIFShareUrl = function (shareManifests) {
        if (shareManifests === void 0) { shareManifests = false; }
        var manifestUri;
        if (shareManifests) {
            if (this.helper.manifest) {
                manifestUri = this.helper.manifest.id;
            }
            else {
                manifestUri = this.helper.manifestUri;
            }
        }
        return manifestUri + "?manifest=" + manifestUri;
    };
    BaseExtension.prototype.addTimestamp = function (uri) {
        return uri + "?t=" + _edsilv_utils__WEBPACK_IMPORTED_MODULE_13__["Dates"].getTimeStamp();
    };
    BaseExtension.prototype.getDomain = function () {
        var parts = _edsilv_utils__WEBPACK_IMPORTED_MODULE_13__["Urls"].getUrlParts(this.helper.manifestUri);
        return parts.host;
    };
    BaseExtension.prototype.getAppUri = function () {
        var parts = _edsilv_utils__WEBPACK_IMPORTED_MODULE_13__["Urls"].getUrlParts(document.location.href);
        var origin = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
        var pathname = parts.pathname;
        if (!pathname.startsWith('/')) {
            pathname = '/' + pathname;
        }
        pathname = pathname.substr(0, pathname.lastIndexOf('/') + 1); // remove the file name
        var appUri = origin + pathname;
        var root = '';
        if (!_edsilv_utils__WEBPACK_IMPORTED_MODULE_13__["Documents"].isInIFrame()) {
            root = this.data.root || '';
            if (root.startsWith('./')) {
                root = root.substr(2);
            }
            if (root && !root.endsWith('/')) {
                root += '/';
            }
        }
        // if root is a URL, use that instead of appUri.
        if (Object(_Utils__WEBPACK_IMPORTED_MODULE_0__["isValidUrl"])(root)) {
            return root + 'uv.html';
        }
        return appUri + root + 'uv.html';
    };
    BaseExtension.prototype.getSettings = function () {
        if (_edsilv_utils__WEBPACK_IMPORTED_MODULE_13__["Bools"].getBool(this.data.config.options.saveUserSettings, false)) {
            var settings = _edsilv_utils__WEBPACK_IMPORTED_MODULE_13__["Storage"].get("uv.settings", _edsilv_utils__WEBPACK_IMPORTED_MODULE_13__["StorageType"].LOCAL);
            if (settings) {
                return $.extend(this.data.config.options, settings.value);
            }
        }
        return this.data.config.options;
    };
    BaseExtension.prototype.updateSettings = function (settings) {
        if (_edsilv_utils__WEBPACK_IMPORTED_MODULE_13__["Bools"].getBool(this.data.config.options.saveUserSettings, false)) {
            var storedSettings = _edsilv_utils__WEBPACK_IMPORTED_MODULE_13__["Storage"].get("uv.settings", _edsilv_utils__WEBPACK_IMPORTED_MODULE_13__["StorageType"].LOCAL);
            if (storedSettings) {
                settings = $.extend(storedSettings.value, settings);
            }
            // store for ten years
            _edsilv_utils__WEBPACK_IMPORTED_MODULE_13__["Storage"].set("uv.settings", settings, 315360000, _edsilv_utils__WEBPACK_IMPORTED_MODULE_13__["StorageType"].LOCAL);
        }
        this.data.config.options = $.extend(this.data.config.options, settings);
    };
    BaseExtension.prototype.getLocale = function () {
        return this.helper.options.locale;
    };
    BaseExtension.prototype.getSharePreview = function () {
        var title = this.helper.getLabel();
        // todo: use getThumb (when implemented)
        var canvas = this.helper.getCurrentCanvas();
        var thumbnail = canvas.getProperty('thumbnail');
        if (!thumbnail || !(typeof (thumbnail) === 'string')) {
            thumbnail = canvas.getCanonicalImageUri(this.data.config.options.bookmarkThumbWidth);
        }
        return {
            title: title,
            image: thumbnail
        };
    };
    BaseExtension.prototype.getPagedIndices = function (canvasIndex) {
        if (canvasIndex === void 0) { canvasIndex = this.helper.canvasIndex; }
        return [canvasIndex];
    };
    BaseExtension.prototype.getCurrentCanvases = function () {
        var indices = this.getPagedIndices(this.helper.canvasIndex);
        var canvases = [];
        for (var i = 0; i < indices.length; i++) {
            var index = indices[i];
            var canvas = this.helper.getCanvasByIndex(index);
            canvases.push(canvas);
        }
        return canvases;
    };
    BaseExtension.prototype.getCanvasLabels = function (label) {
        var indices = this.getPagedIndices();
        var labels = "";
        if (indices.length === 1) {
            labels = label;
        }
        else {
            for (var i = 1; i <= indices.length; i++) {
                if (labels.length)
                    labels += ",";
                labels += label + " " + i;
            }
        }
        return labels;
    };
    BaseExtension.prototype.getCurrentCanvasRange = function () {
        //var rangePath: string = this.currentRangePath ? this.currentRangePath : '';
        //var range: manifesto.Range = this.helper.getCanvasRange(this.helper.getCurrentCanvas(), rangePath);
        var range = this.helper.getCanvasRange(this.helper.getCurrentCanvas());
        return range;
    };
    // todo: move to manifold?
    BaseExtension.prototype.getExternalResources = function (resources) {
        var _this = this;
        var indices = this.getPagedIndices();
        var resourcesToLoad = [];
        indices.forEach(function (index) {
            var canvas = _this.helper.getCanvasByIndex(index);
            var r;
            if (!canvas.externalResource) {
                r = new _iiif_manifold__WEBPACK_IMPORTED_MODULE_10__["ExternalResource"](canvas, {
                    authApiVersion: _this.data.config.options.authAPIVersion
                });
            }
            else {
                r = canvas.externalResource;
            }
            // reload resources if passed
            if (resources) {
                var found = resources.find(function (f) {
                    return f.dataUri === r.dataUri;
                });
                if (found) {
                    resourcesToLoad.push(found);
                }
                else {
                    resourcesToLoad.push(r);
                }
            }
            else {
                resourcesToLoad.push(r);
            }
        });
        var storageStrategy = this.data.config.options.tokenStorage;
        var authAPIVersion = this.data.config.options.authAPIVersion;
        // if using auth api v1
        if (authAPIVersion === 1) {
            return new Promise(function (resolve) {
                var options = {
                    locale: _this.helper.options.locale
                };
                _Auth1__WEBPACK_IMPORTED_MODULE_2__["Auth1"].loadExternalResources(resourcesToLoad, storageStrategy, options).then(function (r) {
                    _this.resources = r.map(function (resource) {
                        return _this._prepareResourceData(resource);
                    });
                    _this.component.publish(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].OPENED_EXTERNAL_RESOURCE);
                    resolve(_this.resources);
                });
            });
        }
        else {
            return new Promise(function (resolve) {
                _Auth09__WEBPACK_IMPORTED_MODULE_1__["Auth09"].loadExternalResources(resourcesToLoad, storageStrategy).then(function (r) {
                    _this.resources = r.map(function (resource) {
                        return _this._prepareResourceData(resource);
                    });
                    _this.component.publish(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].OPENED_EXTERNAL_RESOURCE);
                    resolve(_this.resources);
                });
            });
        }
    };
    // copy useful properties over to the data object to be opened in center panel's openMedia method
    // this is the info.json if there is one, which can be opened natively by openseadragon.
    BaseExtension.prototype._prepareResourceData = function (resource) {
        resource.data.hasServiceDescriptor = resource.hasServiceDescriptor();
        // if the data isn't an info.json, give it the necessary viewing properties
        if (!resource.hasServiceDescriptor()) {
            resource.data.id = resource.dataUri;
            resource.data.width = resource.width;
            resource.data.height = resource.height;
        }
        resource.data.index = resource.index;
        return _edsilv_utils__WEBPACK_IMPORTED_MODULE_13__["Objects"].toPlainObject(resource.data);
    };
    BaseExtension.prototype.getMediaFormats = function (canvas) {
        var annotations = canvas.getContent();
        if (annotations && annotations.length) {
            var annotation = annotations[0];
            return annotation.getBody();
        }
        else {
            // legacy IxIF compatibility
            var body = {
                id: canvas.id,
                type: canvas.getType(),
                getFormat: function () {
                    return '';
                }
            };
            return [body];
        }
    };
    BaseExtension.prototype.viewCanvas = function (canvasIndex) {
        if (this.helper.isCanvasIndexOutOfRange(canvasIndex)) {
            this.showMessage(this.data.config.content.canvasIndexOutOfRange);
            return;
        }
        this.component.publish(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].OPEN_EXTERNAL_RESOURCE);
    };
    BaseExtension.prototype.showMessage = function (message, acceptCallback, buttonText, allowClose) {
        this.closeActiveDialogue();
        this.component.publish(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].SHOW_GENERIC_DIALOGUE, {
            message: message,
            acceptCallback: acceptCallback,
            buttonText: buttonText,
            allowClose: allowClose
        });
    };
    BaseExtension.prototype.closeActiveDialogue = function () {
        this.component.publish(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].CLOSE_ACTIVE_DIALOGUE);
    };
    BaseExtension.prototype.isOverlayActive = function () {
        return this.shell.$overlays.is(':visible');
    };
    BaseExtension.prototype.isDesktopMetric = function () {
        return this.metric.toString() === _modules_uv_shared_module_MetricType__WEBPACK_IMPORTED_MODULE_7__["MetricType"].DESKTOP.toString();
    };
    BaseExtension.prototype.isWatchMetric = function () {
        return this.metric.toString() === _modules_uv_shared_module_MetricType__WEBPACK_IMPORTED_MODULE_7__["MetricType"].WATCH.toString();
    };
    BaseExtension.prototype.isCatchAllMetric = function () {
        return this.metric.toString() === _modules_uv_shared_module_MetricType__WEBPACK_IMPORTED_MODULE_7__["MetricType"].NONE.toString();
    };
    // todo: use redux in manifold to get reset state
    BaseExtension.prototype.viewManifest = function (manifest) {
        var data = {};
        data.manifestUri = this.helper.manifestUri;
        data.collectionIndex = this.helper.getCollectionIndex(manifest);
        data.manifestIndex = manifest.index;
        data.sequenceIndex = 0;
        data.canvasIndex = 0;
        this.reload(data);
    };
    // todo: use redux in manifold to get reset state
    BaseExtension.prototype.viewCollection = function (collection) {
        var data = {};
        //data.manifestUri = this.helper.manifestUri;
        data.manifestUri = collection.parentCollection ? collection.parentCollection.id : this.helper.manifestUri;
        data.collectionIndex = collection.index;
        data.manifestIndex = 0;
        data.sequenceIndex = 0;
        data.canvasIndex = 0;
        this.reload(data);
    };
    BaseExtension.prototype.isFullScreen = function () {
        return this.component.isFullScreen;
    };
    BaseExtension.prototype.isHeaderPanelEnabled = function () {
        return _edsilv_utils__WEBPACK_IMPORTED_MODULE_13__["Bools"].getBool(this.data.config.options.headerPanelEnabled, true);
    };
    BaseExtension.prototype.isLeftPanelEnabled = function () {
        if (_edsilv_utils__WEBPACK_IMPORTED_MODULE_13__["Bools"].getBool(this.data.config.options.leftPanelEnabled, true)) {
            if (this.helper.hasParentCollection()) {
                return true;
            }
            else if (this.helper.isMultiCanvas()) {
                var viewingHint = this.helper.getViewingHint();
                if (!viewingHint || (viewingHint && viewingHint !== _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_11__["ViewingHint"].CONTINUOUS)) {
                    return true;
                }
            }
        }
        return false;
    };
    BaseExtension.prototype.isRightPanelEnabled = function () {
        return _edsilv_utils__WEBPACK_IMPORTED_MODULE_13__["Bools"].getBool(this.data.config.options.rightPanelEnabled, true);
    };
    BaseExtension.prototype.isFooterPanelEnabled = function () {
        return _edsilv_utils__WEBPACK_IMPORTED_MODULE_13__["Bools"].getBool(this.data.config.options.footerPanelEnabled, true);
    };
    BaseExtension.prototype.isMobile = function () {
        return $.browser.mobile;
    };
    BaseExtension.prototype.useArrowKeysToNavigate = function () {
        return _edsilv_utils__WEBPACK_IMPORTED_MODULE_13__["Bools"].getBool(this.data.config.options.useArrowKeysToNavigate, true);
    };
    BaseExtension.prototype.bookmark = function () {
        // override for each extension
    };
    BaseExtension.prototype.feedback = function () {
        this.fire(_BaseEvents__WEBPACK_IMPORTED_MODULE_4__["BaseEvents"].FEEDBACK, this.data);
    };
    BaseExtension.prototype.getAlternateLocale = function () {
        var alternateLocale = null;
        if (this.data.locales && this.data.locales.length > 1) {
            alternateLocale = this.data.locales[1];
        }
        return alternateLocale;
    };
    BaseExtension.prototype.getSerializedLocales = function () {
        if (this.data.locales) {
            return this.serializeLocales(this.data.locales);
        }
        return null;
    };
    BaseExtension.prototype.serializeLocales = function (locales) {
        var serializedLocales = '';
        for (var i = 0; i < locales.length; i++) {
            var l = locales[i];
            if (i > 0)
                serializedLocales += ',';
            serializedLocales += l.name;
            if (l.label) {
                serializedLocales += ':' + l.label;
            }
        }
        return serializedLocales;
    };
    BaseExtension.prototype.changeLocale = function (locale) {
        // re-order locales so the passed locale is first
        var data = {};
        if (this.data.locales) {
            data.locales = this.data.locales.slice(0);
            var fromIndex = data.locales.findIndex(function (l) {
                return l.name === locale;
            });
            var toIndex = 0;
            data.locales.splice(toIndex, 0, data.locales.splice(fromIndex, 1)[0]);
            this.reload(data);
        }
    };
    return BaseExtension;
}());



/***/ }),

/***/ "./src/modules/uv-shared-module/BaseView.ts":
/*!**************************************************!*\
  !*** ./src/modules/uv-shared-module/BaseView.ts ***!
  \**************************************************/
/*! exports provided: BaseView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseView", function() { return BaseView; });
/* harmony import */ var _Panel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Panel */ "./src/modules/uv-shared-module/Panel.ts");
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

var BaseView = /** @class */ (function (_super) {
    __extends(BaseView, _super);
    function BaseView($element, fitToParentWidth, fitToParentHeight) {
        return _super.call(this, $element, fitToParentWidth, fitToParentHeight) || this;
    }
    BaseView.prototype.create = function () {
        this.component = this.$element.closest(".uv").data("component");
        _super.prototype.create.call(this);
        this.extension = this.component.extension;
        this.config = {};
        this.config.content = {};
        this.config.options = {};
        var that = this;
        // build config inheritance chain
        if (that.modules && that.modules.length) {
            that.modules = that.modules.reverse();
            that.modules.forEach(function (moduleName) {
                that.config = $.extend(true, that.config, that.extension.data.config.modules[moduleName]);
            });
        }
        this.content = this.config.content;
        this.options = this.config.options;
    };
    BaseView.prototype.init = function () {
    };
    BaseView.prototype.setConfig = function (moduleName) {
        if (!this.modules) {
            this.modules = [];
        }
        this.modules.push(moduleName);
    };
    BaseView.prototype.resize = function () {
        _super.prototype.resize.call(this);
    };
    return BaseView;
}(_Panel__WEBPACK_IMPORTED_MODULE_0__["Panel"]));



/***/ }),

/***/ "./src/modules/uv-shared-module/CenterPanel.ts":
/*!*****************************************************!*\
  !*** ./src/modules/uv-shared-module/CenterPanel.ts ***!
  \*****************************************************/
/*! exports provided: CenterPanel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CenterPanel", function() { return CenterPanel; });
/* harmony import */ var _BaseView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseView */ "./src/modules/uv-shared-module/BaseView.ts");
/* harmony import */ var _Position__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Position */ "./src/modules/uv-shared-module/Position.ts");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Utils */ "./src/Utils.ts");
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




var CenterPanel = /** @class */ (function (_super) {
    __extends(CenterPanel, _super);
    function CenterPanel($element) {
        var _this = _super.call(this, $element, false, true) || this;
        _this.subtitleExpanded = false;
        _this.isAttributionOpen = false;
        _this.attributionPosition = _Position__WEBPACK_IMPORTED_MODULE_1__["Position"].BOTTOM_LEFT;
        return _this;
    }
    CenterPanel.prototype.create = function () {
        var _this = this;
        _super.prototype.create.call(this);
        this.$title = $('<div class="title"></div>');
        this.$element.append(this.$title);
        this.$subtitle = $("<div class=\"subtitle\">\n                                <div class=\"wrapper\">\n                                    <button type=\"button\" class=\"expand-btn\" aria-label=\"Expand\">\n                                        <span aria-hidden=\"true\">+</span>\n                                    </button>\n                                    <span class=\"text\"></span>\n                                </div>\n                            </div>");
        this.$element.append(this.$subtitle);
        this.$subtitleWrapper = this.$subtitle.find('.wrapper');
        this.$subtitleExpand = this.$subtitle.find('.expand-btn');
        this.$subtitleText = this.$subtitle.find('.text');
        this.$content = $('<div id="content" class="content"></div>');
        this.$element.append(this.$content);
        this.$attribution = $("\n                                <div class=\"attribution\">\n                                  <div class=\"header\">\n                                    <div class=\"title\"></div>\n                                    <button type=\"button\" class=\"close\" aria-label=\"Close\">\n                                      <span aria-hidden=\"true\">&#215;</span>\n                                    </button>\n                                  </div>\n                                  <div class=\"main\">\n                                    <div class=\"attribution-text\"></div>\n                                    <div class=\"license\"></div>\n                                    <div class=\"logo\"></div>\n                                  </div>\n                                </div>\n        ");
        this.$attribution.find('.header .title').text(this.content.attribution);
        this.$content.append(this.$attribution);
        this.closeAttribution();
        this.$closeAttributionButton = this.$attribution.find('.header .close');
        this.$closeAttributionButton.on('click', function (e) {
            e.preventDefault();
            _this.closeAttribution();
        });
        this.$subtitleExpand.on('click', function (e) {
            e.preventDefault();
            _this.subtitleExpanded = !_this.subtitleExpanded;
            if (_this.subtitleExpanded) {
                _this.$subtitleWrapper.addClass('expanded');
                _this.$subtitleExpand.text('-');
            }
            else {
                _this.$subtitleWrapper.removeClass('expanded');
                _this.$subtitleExpand.text('+');
            }
            _this.resize();
        });
        if (_edsilv_utils__WEBPACK_IMPORTED_MODULE_3__["Bools"].getBool(this.options.titleEnabled, true)) {
            this.$title.removeClass('hidden');
        }
        else {
            this.$title.addClass('hidden');
        }
        if (_edsilv_utils__WEBPACK_IMPORTED_MODULE_3__["Bools"].getBool(this.options.subtitleEnabled, false)) {
            this.$subtitle.removeClass('hidden');
        }
        else {
            this.$subtitle.addClass('hidden');
        }
        this.whenResized(function () {
            _this.updateRequiredStatement();
        });
    };
    CenterPanel.prototype.openAttribution = function () {
        this.$attribution.show();
        this.isAttributionOpen = true;
    };
    CenterPanel.prototype.closeAttribution = function () {
        this.$attribution.hide();
        this.isAttributionOpen = false;
    };
    CenterPanel.prototype.updateRequiredStatement = function () {
        var _this = this;
        var requiredStatement = this.extension.helper.getRequiredStatement();
        //var license = this.provider.getLicense();
        //var logo = this.provider.getLogo();
        var enabled = _edsilv_utils__WEBPACK_IMPORTED_MODULE_3__["Bools"].getBool(this.options.requiredStatementEnabled, true);
        if (!requiredStatement || !requiredStatement.value || !enabled) {
            return;
        }
        this.openAttribution();
        var $attributionTitle = this.$attribution.find('.title');
        var $attributionText = this.$attribution.find('.attribution-text');
        var $license = this.$attribution.find('.license');
        var $logo = this.$attribution.find('.logo');
        if (requiredStatement.label) {
            var sanitizedTitle = Object(_Utils__WEBPACK_IMPORTED_MODULE_2__["sanitize"])(requiredStatement.label);
            $attributionTitle.html(sanitizedTitle);
        }
        else {
            $attributionTitle.text(this.content.attribution);
        }
        if (requiredStatement.value) {
            var sanitizedText = Object(_Utils__WEBPACK_IMPORTED_MODULE_2__["sanitize"])(requiredStatement.value);
            $attributionText.html(sanitizedText);
            $attributionText.find('img').one('load', function () {
                _this.resize();
            }).each(function () {
                if (this.complete)
                    $(this).load();
            });
            $attributionText.targetBlank();
        }
        // $attribution.toggleExpandText(this.options.trimAttributionCount, () => {
        //     this.resize();
        // });
        //if (license){
        //    $license.append('<a href="' + license + '">' + license + '</a>');
        //} else {
        $license.hide();
        //}
        //
        //if (logo){
        //    $logo.append('<img src="' + logo + '"/>');
        //} else {
        $logo.hide();
        //}
        this.resize();
    };
    CenterPanel.prototype.resize = function () {
        _super.prototype.resize.call(this);
        var leftPanelWidth = this.extension.shell.$leftPanel.is(':visible') ? Math.floor(this.extension.shell.$leftPanel.width()) : 0;
        var rightPanelWidth = this.extension.shell.$rightPanel.is(':visible') ? Math.floor(this.extension.shell.$rightPanel.width()) : 0;
        var width = Math.floor(this.$element.parent().width() - leftPanelWidth - rightPanelWidth);
        this.$element.css({
            'left': leftPanelWidth,
            'width': width
        });
        var titleHeight;
        var subtitleHeight;
        if (this.options && this.options.titleEnabled === false || !this.$title.is(':visible')) {
            titleHeight = 0;
        }
        else {
            titleHeight = this.$title.height();
        }
        if (this.options && this.options.subtitleEnabled === false || !this.$subtitle.is(':visible')) {
            subtitleHeight = 0;
        }
        else {
            subtitleHeight = this.$subtitle.height();
        }
        this.$content.height(this.$element.height() - titleHeight - subtitleHeight);
        this.$content.width(this.$element.width());
        if (this.$attribution && this.isAttributionOpen) {
            switch (this.attributionPosition) {
                case _Position__WEBPACK_IMPORTED_MODULE_1__["Position"].BOTTOM_LEFT:
                    this.$attribution.css('top', this.$content.height() - this.$attribution.outerHeight() - this.$attribution.verticalMargins());
                    this.$attribution.css('left', 0);
                    break;
                case _Position__WEBPACK_IMPORTED_MODULE_1__["Position"].BOTTOM_RIGHT:
                    this.$attribution.css('top', this.$content.height() - this.$attribution.outerHeight() - this.$attribution.verticalMargins());
                    this.$attribution.css('left', this.$content.width() - this.$attribution.outerWidth() - this.$attribution.horizontalMargins());
                    break;
            }
            // hide the attribution if there's no room for it
            if (this.$content.width() <= this.$attribution.width()) {
                this.$attribution.hide();
            }
            else {
                this.$attribution.show();
            }
        }
        if (this.subtitle && this.options.subtitleEnabled) {
            this.$subtitleText.html(Object(_Utils__WEBPACK_IMPORTED_MODULE_2__["sanitize"])(this.subtitle.replace(/<br\s*[\/]?>/gi, '; ')));
            this.$subtitleText.removeClass('elided');
            this.$subtitle.removeClass('hidden');
            this.$subtitleWrapper.css('max-height', this.$content.height() + this.$subtitle.outerHeight());
            this.$subtitleWrapper.width(this.$content.width());
            if (!this.subtitleExpanded) {
                this.$subtitleText.width('auto');
                this.$subtitleWrapper.width('auto');
                this.$subtitleExpand.hide();
                // if the subtitle span is wider than the container, set it to display:block 
                // and set its width to that of the container
                // this will make it appear elided.
                // show the expand button
                if (this.$subtitleText.width() > this.$content.width()) {
                    this.$subtitleExpand.show();
                    this.$subtitleText.addClass('elided');
                    this.$subtitleText.width(this.$content.width() - (this.$subtitleExpand.outerWidth() + this.$subtitleText.horizontalMargins()));
                }
            }
            else {
                // subtitle expanded
                this.$subtitleText.width(this.$content.width() - this.$subtitleText.horizontalMargins() - 2);
            }
        }
        else {
            this.$subtitle.addClass('hidden');
        }
    };
    return CenterPanel;
}(_BaseView__WEBPACK_IMPORTED_MODULE_0__["BaseView"]));



/***/ }),

/***/ "./src/modules/uv-shared-module/Dialogue.ts":
/*!**************************************************!*\
  !*** ./src/modules/uv-shared-module/Dialogue.ts ***!
  \**************************************************/
/*! exports provided: Dialogue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Dialogue", function() { return Dialogue; });
/* harmony import */ var _BaseView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseView */ "./src/modules/uv-shared-module/BaseView.ts");
/* harmony import */ var _BaseEvents__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseEvents */ "./src/modules/uv-shared-module/BaseEvents.ts");
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



var Dialogue = /** @class */ (function (_super) {
    __extends(Dialogue, _super);
    function Dialogue($element) {
        var _this = _super.call(this, $element, false, false) || this;
        _this.allowClose = true;
        _this.isActive = false;
        _this.isUnopened = true;
        return _this;
    }
    Dialogue.prototype.create = function () {
        var _this = this;
        this.setConfig('dialogue');
        _super.prototype.create.call(this);
        // events.
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].CLOSE_ACTIVE_DIALOGUE, function () {
            if (_this.isActive) {
                if (_this.allowClose) {
                    _this.close();
                }
            }
        });
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].ESCAPE, function () {
            if (_this.isActive) {
                if (_this.allowClose) {
                    _this.close();
                }
            }
        });
        this.$top = $('<div class="top"></div>');
        this.$element.append(this.$top);
        this.$closeButton = $('<button type="button" class="btn btn-default close" tabindex="0">' + this.content.close + '</button>');
        this.$middle = $('<div class="middle"></div>');
        this.$element.append(this.$middle);
        this.$content = $('<div class="content"></div>');
        this.$middle.append(this.$content);
        this.$buttons = $('<div class="buttons"></div>');
        this.$middle.append(this.$buttons);
        this.$bottom = $('<div class="bottom"></div>');
        this.$element.append(this.$bottom);
        if (this.config.topCloseButtonEnabled) {
            this.$top.append(this.$closeButton);
        }
        else {
            this.$buttons.append(this.$closeButton);
        }
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
    Dialogue.prototype.setDockedPosition = function () {
        var top = Math.floor(this.extension.height() - this.$element.outerHeight(true));
        var left = 0;
        var arrowLeft = 0;
        var normalisedPos = 0;
        if (this.$triggerButton) {
            var verticalPadding = 4;
            var horizontalPadding = 2;
            var a = this.$triggerButton.offset().top;
            var b = this.extension.$element.offset().top;
            var d = this.$element.outerHeight(true);
            var e = (a - b) - d;
            top = e + verticalPadding;
            var f = this.$triggerButton.offset().left;
            var g = this.extension.$element.offset().left;
            var h = f - g;
            normalisedPos = _edsilv_utils__WEBPACK_IMPORTED_MODULE_2__["Maths"].normalise(h, 0, this.extension.width());
            left = Math.floor((this.extension.width() * normalisedPos) - ((this.$element.width()) * normalisedPos)) + horizontalPadding;
            arrowLeft = Math.floor(this.$element.width() * normalisedPos);
        }
        this.$bottom.css('backgroundPosition', arrowLeft + 'px 0px');
        this.$element.css({
            'top': top,
            'left': left
        });
    };
    Dialogue.prototype.open = function (triggerButton) {
        var _this = this;
        this.$element.attr('aria-hidden', 'false');
        this.$element.show();
        if (triggerButton) {
            this.$triggerButton = $(triggerButton);
            this.$bottom.show();
        }
        else {
            this.$bottom.hide();
        }
        this.isActive = true;
        // set the focus to the default button.
        setTimeout(function () {
            var $defaultButton = _this.$element.find('.default');
            if ($defaultButton.length) {
                $defaultButton.focus();
            }
            else {
                // if there's no default button, focus on the first visible input
                var $input = _this.$element.find('input:visible').first();
                if ($input.length) {
                    $input.focus();
                }
                else {
                    // if there's no visible first input, focus on the close button
                    _this.$closeButton.focus();
                }
            }
        }, 1);
        this.component.publish(_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].SHOW_OVERLAY);
        if (this.isUnopened) {
            this.isUnopened = false;
            this.afterFirstOpen();
        }
        this.resize();
    };
    Dialogue.prototype.afterFirstOpen = function () {
    };
    Dialogue.prototype.close = function () {
        if (!this.isActive)
            return;
        this.$element.attr('aria-hidden', 'true');
        this.$element.hide();
        this.isActive = false;
        this.component.publish(this.closeCommand);
        this.component.publish(_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].HIDE_OVERLAY);
    };
    Dialogue.prototype.resize = function () {
        _super.prototype.resize.call(this);
        this.$element.css({
            'top': Math.floor((this.extension.height() / 2) - (this.$element.height() / 2)),
            'left': Math.floor((this.extension.width() / 2) - (this.$element.width() / 2))
        });
    };
    return Dialogue;
}(_BaseView__WEBPACK_IMPORTED_MODULE_0__["BaseView"]));



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


/***/ }),

/***/ "./src/modules/uv-shared-module/FooterPanel.ts":
/*!*****************************************************!*\
  !*** ./src/modules/uv-shared-module/FooterPanel.ts ***!
  \*****************************************************/
/*! exports provided: FooterPanel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FooterPanel", function() { return FooterPanel; });
/* harmony import */ var _BaseEvents__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseEvents */ "./src/modules/uv-shared-module/BaseEvents.ts");
/* harmony import */ var _BaseView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseView */ "./src/modules/uv-shared-module/BaseView.ts");
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



var FooterPanel = /** @class */ (function (_super) {
    __extends(FooterPanel, _super);
    function FooterPanel($element) {
        return _super.call(this, $element) || this;
    }
    FooterPanel.prototype.create = function () {
        var _this = this;
        this.setConfig('footerPanel');
        _super.prototype.create.call(this);
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].TOGGLE_FULLSCREEN, function () {
            _this.updateFullScreenButton();
        });
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].METRIC_CHANGED, function () {
            _this.updateMinimisedButtons();
            _this.updateMoreInfoButton();
        });
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].SETTINGS_CHANGED, function () {
            _this.updateDownloadButton();
        });
        this.$options = $('<div class="options"></div>');
        this.$element.append(this.$options);
        this.$feedbackButton = $("\n          <button class=\"feedback btn imageBtn\" title=\"" + this.content.feedback + "\" tabindex=\"0\">\n            <i class=\"uv-icon uv-icon-feedback\" aria-hidden=\"true\"></i>" + this.content.feedback + "\n          </button>\n        ");
        this.$options.prepend(this.$feedbackButton);
        this.$openButton = $("\n          <button class=\"open btn imageBtn\" title=\"" + this.content.open + "\" tabindex=\"0\">\n            <i class=\"uv-icon-open\" aria-hidden=\"true\"></i>" + this.content.open + "\n          </button>\n        ");
        this.$options.prepend(this.$openButton);
        this.$bookmarkButton = $("\n          <button class=\"bookmark btn imageBtn\" title=\"" + this.content.bookmark + "\" tabindex=\"0\">\n            <i class=\"uv-icon uv-icon-bookmark\" aria-hidden=\"true\"></i>" + this.content.bookmark + "\n          </button>\n        ");
        this.$options.prepend(this.$bookmarkButton);
        this.$shareButton = $("\n          <button class=\"share btn imageBtn\" title=\"" + this.content.share + "\" tabindex=\"0\">\n            <i class=\"uv-icon uv-icon-share\" aria-hidden=\"true\"></i>" + this.content.share + "\n          </button>\n        ");
        this.$options.append(this.$shareButton);
        this.$embedButton = $("\n          <button class=\"embed btn imageBtn\" title=\"" + this.content.embed + "\" tabindex=\"0\">\n            <i class=\"uv-icon uv-icon-embed\" aria-hidden=\"true\"></i>" + this.content.embed + "\n          </button>\n        ");
        this.$options.append(this.$embedButton);
        this.$downloadButton = $("\n          <button class=\"download btn imageBtn\" title=\"" + this.content.download + "\" tabindex=\"0\">\n            <i class=\"uv-icon uv-icon-download\" aria-hidden=\"true\"></i>" + this.content.download + "\n          </button>\n        ");
        this.$options.prepend(this.$downloadButton);
        this.$moreInfoButton = $("\n          <button class=\"moreInfo btn imageBtn\" title=\"" + this.content.moreInfo + "\" tabindex=\"0\">\n            <i class=\"uv-icon uv-icon-more-info\" aria-hidden=\"true\"></i>" + this.content.moreInfo + "\n          </button>\n        ");
        this.$options.prepend(this.$moreInfoButton);
        this.$fullScreenBtn = $("\n          <button class=\"fullScreen btn imageBtn\" title=\"" + this.content.fullScreen + "\" tabindex=\"0\">\n            <i class=\"uv-icon uv-icon-fullscreen\" aria-hidden=\"true\"></i>" + this.content.fullScreen + "\n          </button>\n        ");
        this.$options.append(this.$fullScreenBtn);
        this.$openButton.onPressed(function () {
            _this.component.publish(_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].OPEN);
        });
        this.$feedbackButton.onPressed(function () {
            _this.component.publish(_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].FEEDBACK);
        });
        this.$bookmarkButton.onPressed(function () {
            _this.component.publish(_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].BOOKMARK);
        });
        this.$shareButton.onPressed(function () {
            _this.component.publish(_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].SHOW_SHARE_DIALOGUE, _this.$shareButton);
        });
        this.$embedButton.onPressed(function () {
            _this.component.publish(_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].SHOW_EMBED_DIALOGUE, _this.$embedButton);
        });
        this.$downloadButton.onPressed(function () {
            _this.component.publish(_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].SHOW_DOWNLOAD_DIALOGUE, _this.$downloadButton);
        });
        this.$moreInfoButton.onPressed(function () {
            _this.component.publish(_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].SHOW_MOREINFO_DIALOGUE, _this.$moreInfoButton);
        });
        this.$fullScreenBtn.on('click', function (e) {
            e.preventDefault();
            _this.component.publish(_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].TOGGLE_FULLSCREEN);
        });
        if (!_edsilv_utils__WEBPACK_IMPORTED_MODULE_2__["Bools"].getBool(this.options.embedEnabled, true)) {
            this.$embedButton.hide();
        }
        this.updateMoreInfoButton();
        this.updateOpenButton();
        this.updateFeedbackButton();
        this.updateBookmarkButton();
        this.updateEmbedButton();
        this.updateDownloadButton();
        this.updateFullScreenButton();
        this.updateShareButton();
        this.updateMinimisedButtons();
    };
    FooterPanel.prototype.updateMinimisedButtons = function () {
        // if configured to always minimise buttons
        if (_edsilv_utils__WEBPACK_IMPORTED_MODULE_2__["Bools"].getBool(this.options.minimiseButtons, false)) {
            this.$options.addClass('minimiseButtons');
            return;
        }
        // otherwise, check metric
        if (!this.extension.isDesktopMetric()) {
            this.$options.addClass('minimiseButtons');
        }
        else {
            this.$options.removeClass('minimiseButtons');
        }
    };
    FooterPanel.prototype.updateMoreInfoButton = function () {
        var configEnabled = _edsilv_utils__WEBPACK_IMPORTED_MODULE_2__["Bools"].getBool(this.options.moreInfoEnabled, false);
        if (configEnabled && !this.extension.isDesktopMetric() && !this.extension.isCatchAllMetric()) {
            this.$moreInfoButton.show();
        }
        else {
            this.$moreInfoButton.hide();
        }
    };
    FooterPanel.prototype.updateOpenButton = function () {
        var configEnabled = _edsilv_utils__WEBPACK_IMPORTED_MODULE_2__["Bools"].getBool(this.options.openEnabled, false);
        if (configEnabled && _edsilv_utils__WEBPACK_IMPORTED_MODULE_2__["Documents"].isInIFrame()) {
            this.$openButton.show();
        }
        else {
            this.$openButton.hide();
        }
    };
    FooterPanel.prototype.updateFullScreenButton = function () {
        if (!_edsilv_utils__WEBPACK_IMPORTED_MODULE_2__["Bools"].getBool(this.options.fullscreenEnabled, true) || !_edsilv_utils__WEBPACK_IMPORTED_MODULE_2__["Documents"].supportsFullscreen()) {
            this.$fullScreenBtn.hide();
            return;
        }
        if (this.extension.data.isLightbox) {
            this.$fullScreenBtn.addClass('lightbox');
        }
        if (this.extension.isFullScreen()) {
            this.$fullScreenBtn.switchClass('fullScreen', 'exitFullscreen');
            this.$fullScreenBtn.find('i').switchClass('uv-icon-fullscreen', 'uv-icon-exit-fullscreen');
            this.$fullScreenBtn.attr('title', this.content.exitFullScreen);
            $(this.$fullScreenBtn[0].firstChild.nextSibling.nextSibling).replaceWith(this.content.exitFullScreen);
        }
        else {
            this.$fullScreenBtn.switchClass('exitFullscreen', 'fullScreen');
            this.$fullScreenBtn.find('i').switchClass('uv-icon-exit-fullscreen', 'uv-icon-fullscreen');
            this.$fullScreenBtn.attr('title', this.content.fullScreen);
            $(this.$fullScreenBtn[0].firstChild.nextSibling.nextSibling).replaceWith(this.content.fullScreen);
        }
    };
    FooterPanel.prototype.updateEmbedButton = function () {
        if (this.extension.helper.isUIEnabled('embed') && _edsilv_utils__WEBPACK_IMPORTED_MODULE_2__["Bools"].getBool(this.options.embedEnabled, false)) {
            // current jquery version sets display to 'inline' in mobile version, while this should remain hidden (see media query)
            if (!this.extension.isMobile()) {
                this.$embedButton.show();
            }
        }
        else {
            this.$embedButton.hide();
        }
    };
    FooterPanel.prototype.updateShareButton = function () {
        if (this.extension.helper.isUIEnabled('share') && _edsilv_utils__WEBPACK_IMPORTED_MODULE_2__["Bools"].getBool(this.options.shareEnabled, true)) {
            this.$shareButton.show();
        }
        else {
            this.$shareButton.hide();
        }
    };
    FooterPanel.prototype.updateDownloadButton = function () {
        var configEnabled = _edsilv_utils__WEBPACK_IMPORTED_MODULE_2__["Bools"].getBool(this.options.downloadEnabled, true);
        if (configEnabled) {
            this.$downloadButton.show();
        }
        else {
            this.$downloadButton.hide();
        }
    };
    FooterPanel.prototype.updateFeedbackButton = function () {
        var configEnabled = _edsilv_utils__WEBPACK_IMPORTED_MODULE_2__["Bools"].getBool(this.options.feedbackEnabled, false);
        if (configEnabled) {
            this.$feedbackButton.show();
        }
        else {
            this.$feedbackButton.hide();
        }
    };
    FooterPanel.prototype.updateBookmarkButton = function () {
        var configEnabled = _edsilv_utils__WEBPACK_IMPORTED_MODULE_2__["Bools"].getBool(this.options.bookmarkEnabled, false);
        if (configEnabled) {
            this.$bookmarkButton.show();
        }
        else {
            this.$bookmarkButton.hide();
        }
    };
    FooterPanel.prototype.resize = function () {
        _super.prototype.resize.call(this);
    };
    return FooterPanel;
}(_BaseView__WEBPACK_IMPORTED_MODULE_1__["BaseView"]));



/***/ }),

/***/ "./src/modules/uv-shared-module/GenericDialogue.ts":
/*!*********************************************************!*\
  !*** ./src/modules/uv-shared-module/GenericDialogue.ts ***!
  \*********************************************************/
/*! exports provided: GenericDialogue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GenericDialogue", function() { return GenericDialogue; });
/* harmony import */ var _BaseEvents__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseEvents */ "./src/modules/uv-shared-module/BaseEvents.ts");
/* harmony import */ var _Dialogue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Dialogue */ "./src/modules/uv-shared-module/Dialogue.ts");
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


var GenericDialogue = /** @class */ (function (_super) {
    __extends(GenericDialogue, _super);
    function GenericDialogue($element) {
        return _super.call(this, $element) || this;
    }
    GenericDialogue.prototype.create = function () {
        var _this = this;
        this.setConfig('genericDialogue');
        _super.prototype.create.call(this);
        this.openCommand = _BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].SHOW_GENERIC_DIALOGUE;
        this.closeCommand = _BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].HIDE_GENERIC_DIALOGUE;
        this.component.subscribe(this.openCommand, function (params) {
            _this.acceptCallback = params.acceptCallback;
            _this.showMessage(params);
        });
        this.component.subscribe(this.closeCommand, function () {
            _this.close();
        });
        this.$message = $('<p></p>');
        this.$content.append(this.$message);
        this.$acceptButton = $("\n          <button class=\"btn btn-primary accept default\">\n            " + this.content.ok + "\n          </button>\n        ");
        this.$buttons.append(this.$acceptButton);
        // Hide the redundant close button
        this.$buttons.find('.close').hide();
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
        this.component.publish(_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].CLOSE_ACTIVE_DIALOGUE);
        if (this.acceptCallback)
            this.acceptCallback();
    };
    GenericDialogue.prototype.showMessage = function (params) {
        this.$message.html(params.message);
        if (params.buttonText) {
            this.$acceptButton.text(params.buttonText);
        }
        else {
            this.$acceptButton.text(this.content.ok);
        }
        if (params.allowClose === false) {
            this.disableClose();
        }
        this.open();
    };
    GenericDialogue.prototype.resize = function () {
        _super.prototype.resize.call(this);
    };
    return GenericDialogue;
}(_Dialogue__WEBPACK_IMPORTED_MODULE_1__["Dialogue"]));



/***/ }),

/***/ "./src/modules/uv-shared-module/HeaderPanel.ts":
/*!*****************************************************!*\
  !*** ./src/modules/uv-shared-module/HeaderPanel.ts ***!
  \*****************************************************/
/*! exports provided: HeaderPanel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderPanel", function() { return HeaderPanel; });
/* harmony import */ var _BaseEvents__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseEvents */ "./src/modules/uv-shared-module/BaseEvents.ts");
/* harmony import */ var _BaseView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseView */ "./src/modules/uv-shared-module/BaseView.ts");
/* harmony import */ var _uv_shared_module_InformationFactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../uv-shared-module/InformationFactory */ "./src/modules/uv-shared-module/InformationFactory.ts");
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




var HeaderPanel = /** @class */ (function (_super) {
    __extends(HeaderPanel, _super);
    function HeaderPanel($element) {
        return _super.call(this, $element, false, false) || this;
    }
    HeaderPanel.prototype.create = function () {
        var _this = this;
        this.setConfig('headerPanel');
        _super.prototype.create.call(this);
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].SHOW_INFORMATION, function (args) {
            _this.showInformation(args);
        });
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].HIDE_INFORMATION, function () {
            _this.hideInformation();
        });
        this.$options = $('<div class="options"></div>');
        this.$element.append(this.$options);
        this.$centerOptions = $('<div class="centerOptions"></div>');
        this.$options.append(this.$centerOptions);
        this.$rightOptions = $('<div class="rightOptions"></div>');
        this.$options.append(this.$rightOptions);
        //this.$helpButton = $('<a href="#" class="action help">' + this.content.help + '</a>');
        //this.$rightOptions.append(this.$helpButton);
        this.$localeToggleButton = $('<a class="localeToggle" tabindex="0"></a>');
        this.$rightOptions.append(this.$localeToggleButton);
        this.$settingsButton = $("\n          <button class=\"btn imageBtn settings\" tabindex=\"0\" title=\"" + this.content.settings + "\">\n            <i class=\"uv-icon-settings\" aria-hidden=\"true\"></i>" + this.content.settings + "\n          </button>\n        ");
        this.$settingsButton.attr('title', this.content.settings);
        this.$rightOptions.append(this.$settingsButton);
        this.$informationBox = $('<div class="informationBox" aria-hidden="true"> \
                                    <div class="message"></div> \
                                    <div class="actions"></div> \
                                    <button type="button" class="close" aria-label="Close"> \
                                        <span aria-hidden="true">&#215;</span>\
                                    </button> \
                                  </div>');
        this.$element.append(this.$informationBox);
        this.$informationBox.hide();
        this.$informationBox.find('.close').attr('title', this.content.close);
        this.$informationBox.find('.close').on('click', function (e) {
            e.preventDefault();
            _this.component.publish(_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].HIDE_INFORMATION);
        });
        this.$localeToggleButton.on('click', function () {
            _this.extension.changeLocale(String(_this.$localeToggleButton.data('locale')));
        });
        this.$settingsButton.onPressed(function () {
            _this.component.publish(_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].SHOW_SETTINGS_DIALOGUE);
        });
        if (!_edsilv_utils__WEBPACK_IMPORTED_MODULE_3__["Bools"].getBool(this.options.centerOptionsEnabled, true)) {
            this.$centerOptions.hide();
        }
        this.updateLocaleToggle();
        this.updateSettingsButton();
    };
    HeaderPanel.prototype.updateLocaleToggle = function () {
        if (!this.localeToggleIsVisible()) {
            this.$localeToggleButton.hide();
            return;
        }
        var alternateLocale = this.extension.getAlternateLocale();
        var text = alternateLocale.name.split('-')[0].toUpperCase();
        this.$localeToggleButton.data('locale', alternateLocale.name);
        this.$localeToggleButton.attr('title', alternateLocale.label);
        this.$localeToggleButton.text(text);
    };
    HeaderPanel.prototype.updateSettingsButton = function () {
        var settingsEnabled = _edsilv_utils__WEBPACK_IMPORTED_MODULE_3__["Bools"].getBool(this.options.settingsButtonEnabled, true);
        if (!settingsEnabled) {
            this.$settingsButton.hide();
        }
        else {
            this.$settingsButton.show();
        }
    };
    HeaderPanel.prototype.localeToggleIsVisible = function () {
        var locales = this.extension.data.locales;
        if (locales) {
            return locales.length > 1 && _edsilv_utils__WEBPACK_IMPORTED_MODULE_3__["Bools"].getBool(this.options.localeToggleEnabled, false);
        }
        return false;
    };
    HeaderPanel.prototype.showInformation = function (args) {
        var informationFactory = new _uv_shared_module_InformationFactory__WEBPACK_IMPORTED_MODULE_2__["InformationFactory"](this.extension);
        this.information = informationFactory.Get(args);
        var $message = this.$informationBox.find('.message');
        $message.html(this.information.message).find('a').attr('target', '_top');
        var $actions = this.$informationBox.find('.actions');
        $actions.empty();
        for (var i = 0; i < this.information.actions.length; i++) {
            var action = this.information.actions[i];
            var $action = $('<a href="#" class="btn btn-default">' + action.label + '</a>');
            $action.on('click', action.action);
            $actions.append($action);
        }
        this.$informationBox.attr('aria-hidden', 'false');
        this.$informationBox.show();
        this.$element.addClass('showInformation');
        this.extension.resize();
    };
    HeaderPanel.prototype.hideInformation = function () {
        this.$element.removeClass('showInformation');
        this.$informationBox.attr('aria-hidden', 'true');
        this.$informationBox.hide();
        this.extension.resize();
    };
    HeaderPanel.prototype.getSettings = function () {
        return this.extension.getSettings();
    };
    HeaderPanel.prototype.updateSettings = function (settings) {
        this.extension.updateSettings(settings);
        this.component.publish(_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].UPDATE_SETTINGS, settings);
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
        if (this.$informationBox.is(':visible')) {
            var $actions = this.$informationBox.find('.actions');
            var $message = this.$informationBox.find('.message');
            $message.width(Math.floor(this.$element.width()) - Math.ceil($message.horizontalMargins()) - Math.ceil($actions.outerWidth(true)) - Math.ceil(this.$informationBox.find('.close').outerWidth(true)) - 2);
            $message.text(this.information.message);
        }
        // hide toggle buttons below minimum width
        if (this.extension.width() < this.extension.data.config.options.minWidthBreakPoint) {
            if (this.localeToggleIsVisible())
                this.$localeToggleButton.hide();
        }
        else {
            if (this.localeToggleIsVisible())
                this.$localeToggleButton.show();
        }
    };
    return HeaderPanel;
}(_BaseView__WEBPACK_IMPORTED_MODULE_1__["BaseView"]));



/***/ }),

/***/ "./src/modules/uv-shared-module/Information.ts":
/*!*****************************************************!*\
  !*** ./src/modules/uv-shared-module/Information.ts ***!
  \*****************************************************/
/*! exports provided: Information */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Information", function() { return Information; });
var Information = /** @class */ (function () {
    function Information(message, actions) {
        this.message = message;
        this.actions = actions;
    }
    return Information;
}());



/***/ }),

/***/ "./src/modules/uv-shared-module/InformationAction.ts":
/*!***********************************************************!*\
  !*** ./src/modules/uv-shared-module/InformationAction.ts ***!
  \***********************************************************/
/*! exports provided: InformationAction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InformationAction", function() { return InformationAction; });
var InformationAction = /** @class */ (function () {
    function InformationAction() {
    }
    return InformationAction;
}());



/***/ }),

/***/ "./src/modules/uv-shared-module/InformationArgs.ts":
/*!*********************************************************!*\
  !*** ./src/modules/uv-shared-module/InformationArgs.ts ***!
  \*********************************************************/
/*! exports provided: InformationArgs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InformationArgs", function() { return InformationArgs; });
var InformationArgs = /** @class */ (function () {
    function InformationArgs(informationType, param) {
        this.informationType = informationType;
        this.param = param;
    }
    return InformationArgs;
}());



/***/ }),

/***/ "./src/modules/uv-shared-module/InformationFactory.ts":
/*!************************************************************!*\
  !*** ./src/modules/uv-shared-module/InformationFactory.ts ***!
  \************************************************************/
/*! exports provided: InformationFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InformationFactory", function() { return InformationFactory; });
/* harmony import */ var _BaseEvents__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseEvents */ "./src/modules/uv-shared-module/BaseEvents.ts");
/* harmony import */ var _Information__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Information */ "./src/modules/uv-shared-module/Information.ts");
/* harmony import */ var _InformationAction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./InformationAction */ "./src/modules/uv-shared-module/InformationAction.ts");
/* harmony import */ var _InformationType__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./InformationType */ "./src/modules/uv-shared-module/InformationType.ts");




var InformationFactory = /** @class */ (function () {
    function InformationFactory(extension) {
        this.extension = extension;
    }
    InformationFactory.prototype.Get = function (args) {
        var _this = this;
        switch (args.informationType) {
            case (_InformationType__WEBPACK_IMPORTED_MODULE_3__["InformationType"].AUTH_CORS_ERROR):
                return new _Information__WEBPACK_IMPORTED_MODULE_1__["Information"](this.extension.data.config.content.authCORSError, []);
            case (_InformationType__WEBPACK_IMPORTED_MODULE_3__["InformationType"].DEGRADED_RESOURCE):
                var actions = [];
                var loginAction = new _InformationAction__WEBPACK_IMPORTED_MODULE_2__["InformationAction"]();
                var label = args.param.loginService.getConfirmLabel();
                if (!label) {
                    label = this.extension.data.config.content.fallbackDegradedLabel;
                }
                loginAction.label = label;
                var resource_1 = args.param;
                loginAction.action = function () {
                    resource_1.authHoldingPage = window.open("", "_blank");
                    _this.extension.component.publish(_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].HIDE_INFORMATION);
                    _this.extension.component.publish(_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].OPEN_EXTERNAL_RESOURCE, [[resource_1]]);
                };
                actions.push(loginAction);
                var message = args.param.loginService.getServiceLabel();
                if (!message) {
                    message = this.extension.data.config.content.fallbackDegradedMessage;
                }
                return new _Information__WEBPACK_IMPORTED_MODULE_1__["Information"](message, actions);
        }
    };
    return InformationFactory;
}());



/***/ }),

/***/ "./src/modules/uv-shared-module/InformationType.ts":
/*!*********************************************************!*\
  !*** ./src/modules/uv-shared-module/InformationType.ts ***!
  \*********************************************************/
/*! exports provided: InformationType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InformationType", function() { return InformationType; });
var InformationType;
(function (InformationType) {
    InformationType[InformationType["AUTH_CORS_ERROR"] = 0] = "AUTH_CORS_ERROR";
    InformationType[InformationType["DEGRADED_RESOURCE"] = 1] = "DEGRADED_RESOURCE";
})(InformationType || (InformationType = {}));


/***/ }),

/***/ "./src/modules/uv-shared-module/LeftPanel.ts":
/*!***************************************************!*\
  !*** ./src/modules/uv-shared-module/LeftPanel.ts ***!
  \***************************************************/
/*! exports provided: LeftPanel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LeftPanel", function() { return LeftPanel; });
/* harmony import */ var _BaseEvents__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseEvents */ "./src/modules/uv-shared-module/BaseEvents.ts");
/* harmony import */ var _BaseExpandPanel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseExpandPanel */ "./src/modules/uv-shared-module/BaseExpandPanel.ts");
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



var LeftPanel = /** @class */ (function (_super) {
    __extends(LeftPanel, _super);
    function LeftPanel($element) {
        return _super.call(this, $element) || this;
    }
    LeftPanel.prototype.create = function () {
        var _this = this;
        _super.prototype.create.call(this);
        this.$element.width(this.options.panelCollapsedWidth);
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].TOGGLE_EXPAND_LEFT_PANEL, function () {
            if (_this.isFullyExpanded) {
                _this.collapseFull();
            }
            else {
                _this.expandFull();
            }
        });
    };
    LeftPanel.prototype.init = function () {
        _super.prototype.init.call(this);
        var shouldOpenPanel = _edsilv_utils__WEBPACK_IMPORTED_MODULE_2__["Bools"].getBool(this.extension.getSettings().leftPanelOpen, this.options.panelOpen);
        if (shouldOpenPanel) {
            this.toggle(true);
        }
    };
    LeftPanel.prototype.getTargetWidth = function () {
        if (this.isFullyExpanded || !this.isExpanded) {
            return this.options.panelExpandedWidth;
        }
        else {
            return this.options.panelCollapsedWidth;
        }
    };
    LeftPanel.prototype.getFullTargetWidth = function () {
        return this.$element.parent().width();
    };
    LeftPanel.prototype.toggleFinish = function () {
        _super.prototype.toggleFinish.call(this);
        if (this.isExpanded) {
            this.component.publish(_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].OPEN_LEFT_PANEL);
        }
        else {
            this.component.publish(_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].CLOSE_LEFT_PANEL);
        }
        this.extension.updateSettings({ leftPanelOpen: this.isExpanded });
    };
    LeftPanel.prototype.resize = function () {
        _super.prototype.resize.call(this);
        if (this.isFullyExpanded) {
            this.$element.width(this.$element.parent().width());
        }
    };
    return LeftPanel;
}(_BaseExpandPanel__WEBPACK_IMPORTED_MODULE_1__["BaseExpandPanel"]));



/***/ }),

/***/ "./src/modules/uv-shared-module/LoginWarningMessages.ts":
/*!**************************************************************!*\
  !*** ./src/modules/uv-shared-module/LoginWarningMessages.ts ***!
  \**************************************************************/
/*! exports provided: LoginWarningMessages */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginWarningMessages", function() { return LoginWarningMessages; });
var LoginWarningMessages = /** @class */ (function () {
    function LoginWarningMessages() {
    }
    LoginWarningMessages.FORBIDDEN = "forbiddenResourceMessage";
    return LoginWarningMessages;
}());



/***/ }),

/***/ "./src/modules/uv-shared-module/MetricType.ts":
/*!****************************************************!*\
  !*** ./src/modules/uv-shared-module/MetricType.ts ***!
  \****************************************************/
/*! exports provided: MetricType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MetricType", function() { return MetricType; });
/* harmony import */ var _StringValue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StringValue */ "./src/modules/uv-shared-module/StringValue.ts");
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

var MetricType = /** @class */ (function (_super) {
    __extends(MetricType, _super);
    function MetricType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MetricType.DESKTOP = new MetricType("desktop");
    MetricType.MOBILELANDSCAPE = new MetricType("mobilelandscape");
    MetricType.MOBILEPORTRAIT = new MetricType("mobileportrait");
    MetricType.NONE = new MetricType("none");
    MetricType.WATCH = new MetricType("watch");
    return MetricType;
}(_StringValue__WEBPACK_IMPORTED_MODULE_0__["StringValue"]));



/***/ }),

/***/ "./src/modules/uv-shared-module/Panel.ts":
/*!***********************************************!*\
  !*** ./src/modules/uv-shared-module/Panel.ts ***!
  \***********************************************/
/*! exports provided: Panel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Panel", function() { return Panel; });
/* harmony import */ var _BaseEvents__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseEvents */ "./src/modules/uv-shared-module/BaseEvents.ts");
/* harmony import */ var _edsilv_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @edsilv/utils */ "./node_modules/@edsilv/utils/dist-esmodule/index.js");


var Panel = /** @class */ (function () {
    function Panel($element, fitToParentWidth, fitToParentHeight) {
        this.isResized = false;
        this.$element = $element;
        this.fitToParentWidth = fitToParentWidth || false;
        this.fitToParentHeight = fitToParentHeight || false;
        this.create();
    }
    Panel.prototype.create = function () {
        var _this = this;
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].RESIZE, function () {
            _this.resize();
        });
    };
    Panel.prototype.whenResized = function (cb) {
        var _this = this;
        _edsilv_utils__WEBPACK_IMPORTED_MODULE_1__["Async"].waitFor(function () {
            return _this.isResized;
        }, cb);
    };
    Panel.prototype.resize = function () {
        var $parent = this.$element.parent();
        if (this.fitToParentWidth) {
            this.$element.width($parent.width());
        }
        if (this.fitToParentHeight) {
            this.$element.height($parent.height());
        }
        this.isResized = true;
    };
    return Panel;
}());



/***/ }),

/***/ "./src/modules/uv-shared-module/Position.ts":
/*!**************************************************!*\
  !*** ./src/modules/uv-shared-module/Position.ts ***!
  \**************************************************/
/*! exports provided: Position */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Position", function() { return Position; });
var Position;
(function (Position) {
    Position[Position["TOP_LEFT"] = 0] = "TOP_LEFT";
    Position[Position["TOP_CENTER"] = 1] = "TOP_CENTER";
    Position[Position["TOP_RIGHT"] = 2] = "TOP_RIGHT";
    Position[Position["CENTER_LEFT"] = 3] = "CENTER_LEFT";
    Position[Position["CENTER"] = 4] = "CENTER";
    Position[Position["CENTER_RIGHT"] = 5] = "CENTER_RIGHT";
    Position[Position["BOTTOM_LEFT"] = 6] = "BOTTOM_LEFT";
    Position[Position["BOTTOM_CENTER"] = 7] = "BOTTOM_CENTER";
    Position[Position["BOTTOM_RIGHT"] = 8] = "BOTTOM_RIGHT";
})(Position || (Position = {}));


/***/ }),

/***/ "./src/modules/uv-shared-module/RightPanel.ts":
/*!****************************************************!*\
  !*** ./src/modules/uv-shared-module/RightPanel.ts ***!
  \****************************************************/
/*! exports provided: RightPanel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RightPanel", function() { return RightPanel; });
/* harmony import */ var _BaseEvents__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseEvents */ "./src/modules/uv-shared-module/BaseEvents.ts");
/* harmony import */ var _BaseExpandPanel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseExpandPanel */ "./src/modules/uv-shared-module/BaseExpandPanel.ts");
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



var RightPanel = /** @class */ (function (_super) {
    __extends(RightPanel, _super);
    function RightPanel($element) {
        return _super.call(this, $element) || this;
    }
    RightPanel.prototype.create = function () {
        _super.prototype.create.call(this);
        this.$element.width(this.options.panelCollapsedWidth);
    };
    RightPanel.prototype.init = function () {
        var _this = this;
        _super.prototype.init.call(this);
        var shouldOpenPanel = _edsilv_utils__WEBPACK_IMPORTED_MODULE_2__["Bools"].getBool(this.extension.getSettings().rightPanelOpen, this.options.panelOpen);
        if (shouldOpenPanel) {
            this.toggle(true);
        }
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].TOGGLE_EXPAND_RIGHT_PANEL, function () {
            if (_this.isFullyExpanded) {
                _this.collapseFull();
            }
            else {
                _this.expandFull();
            }
        });
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
            this.component.publish(_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].OPEN_RIGHT_PANEL);
        }
        else {
            this.component.publish(_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].CLOSE_RIGHT_PANEL);
        }
        this.extension.updateSettings({ rightPanelOpen: this.isExpanded });
    };
    RightPanel.prototype.resize = function () {
        _super.prototype.resize.call(this);
        this.$element.css({
            'left': Math.floor(this.$element.parent().width() - this.$element.outerWidth())
        });
    };
    return RightPanel;
}(_BaseExpandPanel__WEBPACK_IMPORTED_MODULE_1__["BaseExpandPanel"]));



/***/ }),

/***/ "./src/modules/uv-shared-module/Shell.ts":
/*!***********************************************!*\
  !*** ./src/modules/uv-shared-module/Shell.ts ***!
  \***********************************************/
/*! exports provided: Shell */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Shell", function() { return Shell; });
/* harmony import */ var _BaseEvents__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseEvents */ "./src/modules/uv-shared-module/BaseEvents.ts");
/* harmony import */ var _BaseView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseView */ "./src/modules/uv-shared-module/BaseView.ts");
/* harmony import */ var _GenericDialogue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GenericDialogue */ "./src/modules/uv-shared-module/GenericDialogue.ts");
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



var Shell = /** @class */ (function (_super) {
    __extends(Shell, _super);
    function Shell($element) {
        return _super.call(this, $element, true, true) || this;
    }
    Shell.prototype.create = function () {
        var _this = this;
        _super.prototype.create.call(this);
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].SHOW_OVERLAY, function () {
            _this.$overlays.show();
        });
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].HIDE_OVERLAY, function () {
            _this.$overlays.hide();
        });
        this.$headerPanel = $('<div class="headerPanel"></div>');
        this.$element.append(this.$headerPanel);
        this.$mainPanel = $('<div class="mainPanel"></div>');
        this.$element.append(this.$mainPanel);
        this.$centerPanel = $('<div class="centerPanel"></div>');
        this.$mainPanel.append(this.$centerPanel);
        this.$leftPanel = $('<div class="leftPanel"></div>');
        this.$mainPanel.append(this.$leftPanel);
        this.$rightPanel = $('<div class="rightPanel"></div>');
        this.$mainPanel.append(this.$rightPanel);
        this.$footerPanel = $('<div class="footerPanel"></div>');
        this.$element.append(this.$footerPanel);
        this.$mobileFooterPanel = $('<div class="mobileFooterPanel"></div>');
        this.$element.append(this.$mobileFooterPanel);
        this.$overlays = $('<div class="overlays"></div>');
        this.$element.append(this.$overlays);
        this.$genericDialogue = $('<div class="overlay genericDialogue" aria-hidden="true"></div>');
        this.$overlays.append(this.$genericDialogue);
        this.$overlays.on('click', function (e) {
            if ($(e.target).hasClass('overlays')) {
                e.preventDefault();
                _this.component.publish(_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].CLOSE_ACTIVE_DIALOGUE);
            }
        });
        // create shared views.
        new _GenericDialogue__WEBPACK_IMPORTED_MODULE_2__["GenericDialogue"](this.$genericDialogue);
    };
    Shell.prototype.resize = function () {
        var _this = this;
        _super.prototype.resize.call(this);
        setTimeout(function () {
            _this.$overlays.width(_this.extension.width());
            _this.$overlays.height(_this.extension.height());
        }, 1);
        var mainHeight = this.$element.height() - parseInt(this.$mainPanel.css('paddingTop'))
            - (this.$headerPanel.is(':visible') ? this.$headerPanel.height() : 0)
            - (this.$footerPanel.is(':visible') ? this.$footerPanel.height() : 0)
            - (this.$mobileFooterPanel.is(':visible') ? this.$mobileFooterPanel.height() : 0);
        this.$mainPanel.height(mainHeight);
    };
    return Shell;
}(_BaseView__WEBPACK_IMPORTED_MODULE_1__["BaseView"]));



/***/ }),

/***/ "./src/modules/uv-shared-module/StringValue.ts":
/*!*****************************************************!*\
  !*** ./src/modules/uv-shared-module/StringValue.ts ***!
  \*****************************************************/
/*! exports provided: StringValue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StringValue", function() { return StringValue; });
var StringValue = /** @class */ (function () {
    function StringValue(value) {
        this.value = "";
        if (value) {
            this.value = value.toLowerCase();
        }
    }
    StringValue.prototype.toString = function () {
        return this.value;
    };
    return StringValue;
}());



/***/ }),

/***/ "./src/modules/uv-shared-module/ThumbsView.ts":
/*!****************************************************!*\
  !*** ./src/modules/uv-shared-module/ThumbsView.ts ***!
  \****************************************************/
/*! exports provided: ThumbsView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ThumbsView", function() { return ThumbsView; });
/* harmony import */ var _BaseEvents__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseEvents */ "./src/modules/uv-shared-module/BaseEvents.ts");
/* harmony import */ var _BaseView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseView */ "./src/modules/uv-shared-module/BaseView.ts");
/* harmony import */ var _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @iiif/vocabulary */ "./node_modules/@iiif/vocabulary/dist-esmodule/index.js");
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




var ThumbsView = /** @class */ (function (_super) {
    __extends(ThumbsView, _super);
    function ThumbsView($element) {
        var _this = _super.call(this, $element, true, true) || this;
        _this.isCreated = false;
        _this.isOpen = false;
        return _this;
    }
    ThumbsView.prototype.create = function () {
        var _this = this;
        _super.prototype.create.call(this);
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].CANVAS_INDEX_CHANGED, function (index) {
            _this.selectIndex(parseInt(index));
        });
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].LOGIN, function () {
            _this.loadThumbs();
        });
        this.component.subscribe(_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].CLICKTHROUGH, function () {
            _this.loadThumbs();
        });
        this.$thumbs = $('<div class="thumbs"></div>');
        this.$element.append(this.$thumbs);
        var viewingDirection = this.extension.helper.getViewingDirection() || _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_2__["ViewingDirection"].LEFT_TO_RIGHT;
        this.$thumbs.addClass(viewingDirection); // defaults to "left-to-right"
        var that = this;
        $.templates({
            thumbsTemplate: '<div id="thumb{{>index}}" class="{{:~className()}}" data-src="{{>uri}}" data-visible="{{>visible}}" data-index="{{>index}}">\
                                <div class="wrap" style="height:{{>height + ~extraHeight()}}px"></div>\
                                <div class="info">\
                                    <span class="index">{{:#index + 1}}</span>\
                                    <span class="label" title="{{>label}}">{{>label}}&nbsp;</span>\
                                    <span class="searchResults" title="{{:~searchResultsTitle()}}">{{>data.searchResults}}</span>\
                                </div>\
                             </div>\
                             {{if ~separator()}} \
                                 <div class="separator"></div> \
                             {{/if}}'
        });
        var extraHeight = this.options.thumbsExtraHeight;
        $.views.helpers({
            separator: function () {
                return false;
            },
            extraHeight: function () {
                return extraHeight;
            },
            className: function () {
                var className = "thumb";
                if (this.data.index === 0) {
                    className += " first";
                }
                if (!this.data.uri) {
                    className += " placeholder";
                }
                var viewingDirection = that.extension.helper.getViewingDirection();
                if (viewingDirection && (viewingDirection === _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_2__["ViewingDirection"].LEFT_TO_RIGHT || viewingDirection === _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_2__["ViewingDirection"].RIGHT_TO_LEFT)) {
                    className += " twoCol";
                }
                else if (that.extension.helper.isPaged()) {
                    className += " twoCol";
                }
                else {
                    className += " oneCol";
                }
                return className;
            },
            searchResultsTitle: function () {
                var searchResults = Number(this.data.data.searchResults);
                if (searchResults) {
                    if (searchResults > 1) {
                        return _edsilv_utils__WEBPACK_IMPORTED_MODULE_3__["Strings"].format(that.content.searchResults, searchResults.toString());
                    }
                    return _edsilv_utils__WEBPACK_IMPORTED_MODULE_3__["Strings"].format(that.content.searchResult, searchResults.toString());
                }
                return '';
            }
        });
        // use unevent to detect scroll stop.
        this.$element.on('scroll', function () {
            _this.scrollStop();
        }, 100);
        this.resize();
    };
    ThumbsView.prototype.databind = function () {
        if (!this.thumbs)
            return;
        this._$thumbsCache = null; // delete cache
        this.createThumbs();
        // do initial load to show padlocks
        this.loadThumbs(0);
        this.selectIndex(this.extension.helper.canvasIndex);
    };
    ThumbsView.prototype.createThumbs = function () {
        var that = this;
        if (!this.thumbs)
            return;
        // get median height
        var heights = [];
        for (var i = 0; i < this.thumbs.length; i++) {
            var thumb = this.thumbs[i];
            heights.push(thumb.height);
        }
        var medianHeight = _edsilv_utils__WEBPACK_IMPORTED_MODULE_3__["Maths"].median(heights);
        for (var i = 0; i < this.thumbs.length; i++) {
            var thumb = this.thumbs[i];
            thumb.height = medianHeight;
        }
        this.$thumbs.link($.templates.thumbsTemplate, this.thumbs);
        this.$thumbs.undelegate(".thumb", "click");
        this.$thumbs.delegate(".thumb", "click", function (e) {
            e.preventDefault();
            var data = $.view(this).data;
            that.lastThumbClickedIndex = data.index;
            that.component.publish(_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].THUMB_SELECTED, data);
        });
        this.setLabel();
        this.isCreated = true;
    };
    ThumbsView.prototype.scrollStop = function () {
        var scrollPos = 1 / ((this.$thumbs.height() - this.$element.height()) / this.$element.scrollTop());
        if (scrollPos > 1)
            scrollPos = 1;
        var thumbRangeMid = Math.floor((this.thumbs.length - 1) * scrollPos);
        this.loadThumbs(thumbRangeMid);
    };
    ThumbsView.prototype.loadThumbs = function (index) {
        if (index === void 0) { index = this.extension.helper.canvasIndex; }
        if (!this.thumbs || !this.thumbs.length)
            return;
        var thumbType;
        // get the type of the canvas content
        var canvas = this.extension.helper.getCanvasByIndex(index);
        var annotations = canvas.getContent();
        if (annotations.length) {
            var annotation = annotations[0];
            var body = annotation.getBody();
            if (body.length) {
                var type = body[0].getType();
                if (type) {
                    thumbType = type.toString().toLowerCase();
                }
            }
        }
        var thumbRangeMid = index;
        var thumbLoadRange = this.options.thumbsLoadRange;
        var thumbRange = {
            start: (thumbRangeMid > thumbLoadRange) ? thumbRangeMid - thumbLoadRange : 0,
            end: (thumbRangeMid < (this.thumbs.length - 1) - thumbLoadRange) ? thumbRangeMid + thumbLoadRange : this.thumbs.length - 1
        };
        var fadeDuration = this.options.thumbsImageFadeInDuration;
        var that = this;
        for (var i = thumbRange.start; i <= thumbRange.end; i++) {
            var $thumb = this.getThumbByIndex(i);
            var $wrap = $thumb.find(".wrap");
            // if no img has been added yet
            if (!$wrap.hasClass("loading") && !$wrap.hasClass("loaded")) {
                var visible = $thumb.attr("data-visible");
                if (visible !== "false") {
                    $wrap.removeClass("loadingFailed");
                    $wrap.addClass("loading");
                    if (thumbType) {
                        $wrap.addClass(thumbType);
                    }
                    var src = $thumb.attr("data-src");
                    if (that.config.options.thumbsCacheInvalidation && that.config.options.thumbsCacheInvalidation.enabled) {
                        src += that.config.options.thumbsCacheInvalidation.paramType + "t=" + _edsilv_utils__WEBPACK_IMPORTED_MODULE_3__["Dates"].getTimeStamp();
                    }
                    var $img = $('<img src="' + src + '" alt=""/>');
                    // fade in on load.
                    $img.hide();
                    $img.on("load", function () {
                        $(this).fadeIn(fadeDuration, function () {
                            $(this).parent().switchClass("loading", "loaded");
                        });
                    });
                    $img.on("error", function () {
                        $(this).parent().switchClass("loading", "loadingFailed");
                    });
                    $wrap.append($img);
                }
                else {
                    $wrap.addClass("hidden");
                }
            }
        }
    };
    ThumbsView.prototype.show = function () {
        var _this = this;
        this.isOpen = true;
        this.$element.show();
        setTimeout(function () {
            _this.selectIndex(_this.extension.helper.canvasIndex);
        }, 1);
    };
    ThumbsView.prototype.hide = function () {
        this.isOpen = false;
        this.$element.hide();
    };
    ThumbsView.prototype.isPDF = function () {
        var canvas = this.extension.helper.getCurrentCanvas();
        var type = canvas.getType();
        if (type) {
            return (type.toString().includes("pdf"));
        }
        return false;
    };
    ThumbsView.prototype.setLabel = function () {
        $(this.$thumbs).find('span.index').hide();
        $(this.$thumbs).find('span.label').show();
    };
    ThumbsView.prototype.addSelectedClassToThumbs = function (index) {
        this.getThumbByIndex(index).addClass('selected');
    };
    ThumbsView.prototype.selectIndex = function (index) {
        // may be authenticating
        if (index === -1)
            return;
        if (!this.thumbs || !this.thumbs.length)
            return;
        this.getAllThumbs().removeClass('selected');
        this.$selectedThumb = this.getThumbByIndex(index);
        this.addSelectedClassToThumbs(index);
        var indices = this.extension.getPagedIndices(index);
        // scroll to thumb if the index change didn't originate
        // within the thumbs view.
        if (!~indices.indexOf(this.lastThumbClickedIndex)) {
            this.$element.scrollTop(this.$selectedThumb.position().top);
        }
        // make sure visible images are loaded.
        this.loadThumbs(index);
    };
    ThumbsView.prototype.getAllThumbs = function () {
        if (!this._$thumbsCache) {
            this._$thumbsCache = this.$thumbs.find('.thumb');
        }
        return this._$thumbsCache;
    };
    ThumbsView.prototype.getThumbByIndex = function (canvasIndex) {
        return this.$thumbs.find('[data-index="' + canvasIndex + '"]');
    };
    ThumbsView.prototype.scrollToThumb = function (canvasIndex) {
        var $thumb = this.getThumbByIndex(canvasIndex);
        this.$element.scrollTop($thumb.position().top);
    };
    ThumbsView.prototype.resize = function () {
        _super.prototype.resize.call(this);
    };
    return ThumbsView;
}(_BaseView__WEBPACK_IMPORTED_MODULE_1__["BaseView"]));



/***/ })

}]);
//# sourceMappingURL=uv-av-extension~uv-mediaelement-extension~uv-openseadragon-extension~uv-pdf-extension~uv-virtex-extension.0be01a3e30939502b10a.js.map