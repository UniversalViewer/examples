(window["webpackJsonpUV"] = window["webpackJsonpUV"] || []).push([["uv-openseadragon-extension"],{

/***/ "./src/extensions/uv-openseadragon-extension/Bounds.ts":
/*!*************************************************************!*\
  !*** ./src/extensions/uv-openseadragon-extension/Bounds.ts ***!
  \*************************************************************/
/*! exports provided: Bounds */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Bounds", function() { return Bounds; });
var Bounds = /** @class */ (function () {
    function Bounds(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    Bounds.prototype.toString = function () {
        return this.x + "," + this.y + "," + this.w + "," + this.h;
    };
    Bounds.fromString = function (bounds) {
        var boundsArr = bounds.split(',');
        return new Bounds(Number(boundsArr[0]), Number(boundsArr[1]), Number(boundsArr[2]), Number(boundsArr[3]));
    };
    return Bounds;
}());



/***/ }),

/***/ "./src/extensions/uv-openseadragon-extension/CroppedImageDimensions.ts":
/*!*****************************************************************************!*\
  !*** ./src/extensions/uv-openseadragon-extension/CroppedImageDimensions.ts ***!
  \*****************************************************************************/
/*! exports provided: CroppedImageDimensions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CroppedImageDimensions", function() { return CroppedImageDimensions; });
/* harmony import */ var _edsilv_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @edsilv/utils */ "./node_modules/@edsilv/utils/dist-esmodule/index.js");
/* harmony import */ var _modules_uv_shared_module_Point__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../modules/uv-shared-module/Point */ "./src/modules/uv-shared-module/Point.ts");


var CroppedImageDimensions = /** @class */ (function () {
    function CroppedImageDimensions() {
        this.region = new _edsilv_utils__WEBPACK_IMPORTED_MODULE_0__["Size"](0, 0);
        this.regionPos = new _modules_uv_shared_module_Point__WEBPACK_IMPORTED_MODULE_1__["Point"](0, 0);
        this.size = new _edsilv_utils__WEBPACK_IMPORTED_MODULE_0__["Size"](0, 0);
    }
    return CroppedImageDimensions;
}());



/***/ }),

/***/ "./src/extensions/uv-openseadragon-extension/DownloadDialogue.ts":
/*!***********************************************************************!*\
  !*** ./src/extensions/uv-openseadragon-extension/DownloadDialogue.ts ***!
  \***********************************************************************/
/*! exports provided: DownloadDialogue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DownloadDialogue", function() { return DownloadDialogue; });
/* harmony import */ var _modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../modules/uv-shared-module/BaseEvents */ "./src/modules/uv-shared-module/BaseEvents.ts");
/* harmony import */ var _modules_uv_dialogues_module_DownloadDialogue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../modules/uv-dialogues-module/DownloadDialogue */ "./src/modules/uv-dialogues-module/DownloadDialogue.ts");
/* harmony import */ var _modules_uv_shared_module_DownloadOption__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../modules/uv-shared-module/DownloadOption */ "./src/modules/uv-shared-module/DownloadOption.ts");
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
        // create ui.
        this.$settingsButton = $('<a class="settings" href="#">' + this.content.editSettings + '</a>');
        this.$pagingNote = $('<div class="pagingNote">' + this.content.pagingNote + ' </div>');
        this.$pagingNote.append(this.$settingsButton);
        this.$content.append(this.$pagingNote);
        this.$imageOptionsContainer = $('<li class="group image"></li>');
        this.$downloadOptions.append(this.$imageOptionsContainer);
        this.$imageOptions = $('<ul></ul>');
        this.$imageOptionsContainer.append(this.$imageOptions);
        this.$currentViewAsJpgButton = $('<li class="option single"><input id="' + _modules_uv_shared_module_DownloadOption__WEBPACK_IMPORTED_MODULE_2__["DownloadOption"].CURRENT_VIEW + '" type="radio" name="downloadOptions" tabindex="0" /><label for="' + _modules_uv_shared_module_DownloadOption__WEBPACK_IMPORTED_MODULE_2__["DownloadOption"].CURRENT_VIEW + '"></label></li>');
        this.$imageOptions.append(this.$currentViewAsJpgButton);
        this.$currentViewAsJpgButton.hide();
        this.$wholeImageHighResButton = $('<li class="option single"><input id="' + _modules_uv_shared_module_DownloadOption__WEBPACK_IMPORTED_MODULE_2__["DownloadOption"].WHOLE_IMAGE_HIGH_RES + '" type="radio" name="downloadOptions" tabindex="0" /><label id="' + _modules_uv_shared_module_DownloadOption__WEBPACK_IMPORTED_MODULE_2__["DownloadOption"].WHOLE_IMAGE_HIGH_RES + 'label" for="' + _modules_uv_shared_module_DownloadOption__WEBPACK_IMPORTED_MODULE_2__["DownloadOption"].WHOLE_IMAGE_HIGH_RES + '"></label></li>');
        this.$imageOptions.append(this.$wholeImageHighResButton);
        this.$wholeImageHighResButton.hide();
        this.$wholeImagesHighResButton = $('<li class="option multiple"><input id="' + _modules_uv_shared_module_DownloadOption__WEBPACK_IMPORTED_MODULE_2__["DownloadOption"].WHOLE_IMAGES_HIGH_RES + '" type="radio" name="downloadOptions" tabindex="0" /><label id="' + _modules_uv_shared_module_DownloadOption__WEBPACK_IMPORTED_MODULE_2__["DownloadOption"].WHOLE_IMAGES_HIGH_RES + 'label" for="' + _modules_uv_shared_module_DownloadOption__WEBPACK_IMPORTED_MODULE_2__["DownloadOption"].WHOLE_IMAGES_HIGH_RES + '"></label></li>');
        this.$imageOptions.append(this.$wholeImagesHighResButton);
        this.$wholeImageHighResButton.hide();
        this.$wholeImageLowResAsJpgButton = $('<li class="option single"><input id="' + _modules_uv_shared_module_DownloadOption__WEBPACK_IMPORTED_MODULE_2__["DownloadOption"].WHOLE_IMAGE_LOW_RES + '" type="radio" name="downloadOptions" tabindex="0" /><label for="' + _modules_uv_shared_module_DownloadOption__WEBPACK_IMPORTED_MODULE_2__["DownloadOption"].WHOLE_IMAGE_LOW_RES + '">' + this.content.wholeImageLowResAsJpg + '</label></li>');
        this.$imageOptions.append(this.$wholeImageLowResAsJpgButton);
        this.$wholeImageLowResAsJpgButton.hide();
        this.$canvasOptionsContainer = $('<li class="group canvas"></li>');
        this.$downloadOptions.append(this.$canvasOptionsContainer);
        this.$canvasOptions = $('<ul></ul>');
        this.$canvasOptionsContainer.append(this.$canvasOptions);
        this.$manifestOptionsContainer = $('<li class="group manifest"></li>');
        this.$downloadOptions.append(this.$manifestOptionsContainer);
        this.$manifestOptions = $('<ul></ul>');
        this.$manifestOptionsContainer.append(this.$manifestOptions);
        this.$selectionButton = $('<li class="option"><input id="' + _modules_uv_shared_module_DownloadOption__WEBPACK_IMPORTED_MODULE_2__["DownloadOption"].SELECTION + '" type="radio" name="downloadOptions" tabindex="0" /><label id="' + _modules_uv_shared_module_DownloadOption__WEBPACK_IMPORTED_MODULE_2__["DownloadOption"].SELECTION + 'label" for="' + _modules_uv_shared_module_DownloadOption__WEBPACK_IMPORTED_MODULE_2__["DownloadOption"].SELECTION + '"></label></li>');
        this.$manifestOptions.append(this.$selectionButton);
        this.$selectionButton.hide();
        this.$downloadButton = $('<a class="btn btn-primary" href="#" tabindex="0">' + this.content.download + '</a>');
        this.$buttons.prepend(this.$downloadButton);
        this.$explanatoryTextTemplate = $('<span class="explanatory"></span>');
        var that = this;
        // what happens on download is specific to the extension (except for renderings which need to be moved to the base download dialogue)
        // todo: we need to make everything a list of radio button options in the base class, then we can unify everything into a single render method
        this.$downloadButton.on('click', function (e) {
            e.preventDefault();
            var $selectedOption = that.getSelectedOption();
            var id = $selectedOption.attr('id');
            var label = $selectedOption.attr('title');
            var mime = $selectedOption.data('mime');
            var type = _modules_uv_shared_module_DownloadOption__WEBPACK_IMPORTED_MODULE_2__["DownloadOption"].UNKNOWN;
            var canvas = _this.extension.helper.getCurrentCanvas();
            if (_this.renderingUrls[id]) {
                if (mime) {
                    if (mime.toLowerCase().indexOf('pdf') !== -1) {
                        type = _modules_uv_shared_module_DownloadOption__WEBPACK_IMPORTED_MODULE_2__["DownloadOption"].ENTIRE_DOCUMENT_AS_PDF;
                    }
                    else if (mime.toLowerCase().indexOf('txt') !== -1) {
                        type = _modules_uv_shared_module_DownloadOption__WEBPACK_IMPORTED_MODULE_2__["DownloadOption"].ENTIRE_DOCUMENT_AS_TEXT;
                    }
                }
                if (type = _modules_uv_shared_module_DownloadOption__WEBPACK_IMPORTED_MODULE_2__["DownloadOption"].ENTIRE_DOCUMENT_AS_PDF) {
                    //var printService: manifesto.Service = this.extension.helper.manifest.getService(manifesto.ServiceProfile.printExtensions());
                    // if downloading a pdf - if there's a print service, generate an event instead of opening a new window.
                    // if (printService && this.extension.isOnHomeDomain()){
                    //     this.component.publish(Events.PRINT);
                    // } else {
                    window.open(_this.renderingUrls[id]);
                    //}
                }
            }
            else {
                type = id;
                switch (type) {
                    case _modules_uv_shared_module_DownloadOption__WEBPACK_IMPORTED_MODULE_2__["DownloadOption"].CURRENT_VIEW:
                        var viewer = that.extension.getViewer();
                        window.open(that.extension.getCroppedImageUri(canvas, viewer));
                        break;
                    case _modules_uv_shared_module_DownloadOption__WEBPACK_IMPORTED_MODULE_2__["DownloadOption"].SELECTION:
                        _edsilv_utils__WEBPACK_IMPORTED_MODULE_3__["Async"].waitFor(function () {
                            return !_this.isActive;
                        }, function () {
                            _this.component.publish(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].SHOW_MULTISELECT_DIALOGUE);
                        });
                        break;
                    case _modules_uv_shared_module_DownloadOption__WEBPACK_IMPORTED_MODULE_2__["DownloadOption"].WHOLE_IMAGE_HIGH_RES:
                        window.open(_this.getCanvasHighResImageUri(_this.extension.helper.getCurrentCanvas()));
                        break;
                    case _modules_uv_shared_module_DownloadOption__WEBPACK_IMPORTED_MODULE_2__["DownloadOption"].WHOLE_IMAGES_HIGH_RES:
                        var indices = _this.extension.getPagedIndices();
                        for (var i = 0; i < indices.length; i++) {
                            window.open(_this.getCanvasHighResImageUri(_this.extension.helper.getCanvasByIndex(indices[i])));
                        }
                        break;
                    case _modules_uv_shared_module_DownloadOption__WEBPACK_IMPORTED_MODULE_2__["DownloadOption"].WHOLE_IMAGE_LOW_RES:
                        var imageUri = that.extension.getConfinedImageUri(canvas, that.options.confinedImageSize);
                        if (imageUri) {
                            window.open(imageUri);
                        }
                        break;
                }
            }
            _this.component.publish(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].DOWNLOAD, {
                "type": type,
                "label": label
            });
            _this.close();
        });
        this.$settingsButton.onPressed(function () {
            _this.component.publish(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].HIDE_DOWNLOAD_DIALOGUE);
            _this.component.publish(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].SHOW_SETTINGS_DIALOGUE);
        });
    };
    DownloadDialogue.prototype.open = function (triggerButton) {
        _super.prototype.open.call(this, triggerButton);
        var canvas = this.extension.helper.getCurrentCanvas();
        var rotation = this.extension.getViewerRotation();
        var hasNormalDimensions = rotation % 180 == 0;
        if (this.isDownloadOptionAvailable(_modules_uv_shared_module_DownloadOption__WEBPACK_IMPORTED_MODULE_2__["DownloadOption"].CURRENT_VIEW)) {
            var $input = this.$currentViewAsJpgButton.find('input');
            var $label = this.$currentViewAsJpgButton.find('label');
            var label = this.content.currentViewAsJpg;
            var viewer = this.extension.getViewer();
            var dimensions = this.extension.getCroppedImageDimensions(canvas, viewer);
            // dimensions
            if (dimensions) {
                label = hasNormalDimensions ?
                    _edsilv_utils__WEBPACK_IMPORTED_MODULE_3__["Strings"].format(label, dimensions.size.width.toString(), dimensions.size.height.toString()) :
                    _edsilv_utils__WEBPACK_IMPORTED_MODULE_3__["Strings"].format(label, dimensions.size.height.toString(), dimensions.size.width.toString());
                $label.text(label);
                $input.prop('title', label);
                this.$currentViewAsJpgButton.data('width', dimensions.size.width);
                this.$currentViewAsJpgButton.data('height', dimensions.size.height);
                this.$currentViewAsJpgButton.show();
            }
            else {
                this.$currentViewAsJpgButton.hide();
            }
            // explanatory text
            if (_edsilv_utils__WEBPACK_IMPORTED_MODULE_3__["Bools"].getBool(this.options.optionsExplanatoryTextEnabled, false)) {
                var text = this.content.currentViewAsJpgExplanation;
                if (text) {
                    var $span = this.$explanatoryTextTemplate.clone();
                    $span.text(text);
                    $label.append($span);
                }
            }
        }
        else {
            this.$currentViewAsJpgButton.hide();
        }
        if (this.isDownloadOptionAvailable(_modules_uv_shared_module_DownloadOption__WEBPACK_IMPORTED_MODULE_2__["DownloadOption"].WHOLE_IMAGE_HIGH_RES)) {
            var $input = this.$wholeImageHighResButton.find('input');
            var $label = this.$wholeImageHighResButton.find('label');
            var mime = this.getCanvasMimeType(this.extension.helper.getCurrentCanvas());
            if (mime) {
                mime = _edsilv_utils__WEBPACK_IMPORTED_MODULE_3__["Files"].simplifyMimeType(mime);
            }
            else {
                mime = '?';
            }
            // dimensions
            var size = this.getCanvasComputedDimensions(this.extension.helper.getCurrentCanvas());
            if (!size) {
                // if there is no image service, allow the image to be downloaded directly.
                if (canvas.externalResource && !canvas.externalResource.hasServiceDescriptor()) {
                    var label = _edsilv_utils__WEBPACK_IMPORTED_MODULE_3__["Strings"].format(this.content.wholeImageHighRes, '?', '?', mime);
                    $label.text(label);
                    $input.prop('title', label);
                    this.$wholeImageHighResButton.show();
                }
                else {
                    this.$wholeImageHighResButton.hide();
                }
            }
            else {
                var label = hasNormalDimensions ?
                    _edsilv_utils__WEBPACK_IMPORTED_MODULE_3__["Strings"].format(this.content.wholeImageHighRes, size.width.toString(), size.height.toString(), mime) :
                    _edsilv_utils__WEBPACK_IMPORTED_MODULE_3__["Strings"].format(this.content.wholeImageHighRes, size.height.toString(), size.width.toString(), mime);
                $label.text(label);
                $input.prop('title', label);
                this.$wholeImageHighResButton.data('width', size.width);
                this.$wholeImageHighResButton.data('height', size.height);
                this.$wholeImageHighResButton.show();
            }
            // explanatory text
            if (_edsilv_utils__WEBPACK_IMPORTED_MODULE_3__["Bools"].getBool(this.options.optionsExplanatoryTextEnabled, false)) {
                var text = this.content.wholeImageHighResExplanation;
                if (text) {
                    var $span = this.$explanatoryTextTemplate.clone();
                    $span.text(text);
                    $label.append($span);
                }
            }
        }
        else {
            this.$wholeImageHighResButton.hide();
        }
        if (this.isDownloadOptionAvailable(_modules_uv_shared_module_DownloadOption__WEBPACK_IMPORTED_MODULE_2__["DownloadOption"].WHOLE_IMAGES_HIGH_RES)) {
            var $input = this.$wholeImagesHighResButton.find('input');
            var $label = this.$wholeImagesHighResButton.find('label');
            var mime = this.getCanvasMimeType(this.extension.helper.getCurrentCanvas());
            if (mime) {
                mime = _edsilv_utils__WEBPACK_IMPORTED_MODULE_3__["Files"].simplifyMimeType(mime);
            }
            else {
                mime = '?';
            }
            var label = _edsilv_utils__WEBPACK_IMPORTED_MODULE_3__["Strings"].format(this.content.wholeImagesHighRes, mime);
            $label.text(label);
            $input.prop('title', label);
            this.$wholeImagesHighResButton.show();
            // explanatory text
            if (_edsilv_utils__WEBPACK_IMPORTED_MODULE_3__["Bools"].getBool(this.options.optionsExplanatoryTextEnabled, false)) {
                var text = this.content.wholeImagesHighResExplanation;
                if (text) {
                    var $span = this.$explanatoryTextTemplate.clone();
                    $span.text(text);
                    $label.append($span);
                }
            }
        }
        else {
            this.$wholeImagesHighResButton.hide();
        }
        if (this.isDownloadOptionAvailable(_modules_uv_shared_module_DownloadOption__WEBPACK_IMPORTED_MODULE_2__["DownloadOption"].WHOLE_IMAGE_LOW_RES)) {
            var $input = this.$wholeImageLowResAsJpgButton.find('input');
            var $label = this.$wholeImageLowResAsJpgButton.find('label');
            var size = this.extension.getConfinedImageDimensions(canvas, this.options.confinedImageSize);
            var label = hasNormalDimensions ?
                _edsilv_utils__WEBPACK_IMPORTED_MODULE_3__["Strings"].format(this.content.wholeImageLowResAsJpg, size.width.toString(), size.height.toString()) :
                _edsilv_utils__WEBPACK_IMPORTED_MODULE_3__["Strings"].format(this.content.wholeImageLowResAsJpg, size.height.toString(), size.width.toString());
            $label.text(label);
            $input.prop('title', label);
            this.$wholeImageLowResAsJpgButton.data('width', size.width);
            this.$wholeImageLowResAsJpgButton.data('height', size.height);
            this.$wholeImageLowResAsJpgButton.show();
            // explanatory text
            if (_edsilv_utils__WEBPACK_IMPORTED_MODULE_3__["Bools"].getBool(this.options.optionsExplanatoryTextEnabled, false)) {
                var text = this.content.wholeImageLowResAsJpgExplanation;
                if (text) {
                    var $span = this.$explanatoryTextTemplate.clone();
                    $span.text(text);
                    $label.append($span);
                }
            }
        }
        else {
            this.$wholeImageLowResAsJpgButton.hide();
        }
        if (this.isDownloadOptionAvailable(_modules_uv_shared_module_DownloadOption__WEBPACK_IMPORTED_MODULE_2__["DownloadOption"].SELECTION)) {
            var $input = this.$selectionButton.find('input');
            var $label = this.$selectionButton.find('label');
            $label.text(this.content.downloadSelection);
            $input.prop('title', this.content.downloadSelection);
            this.$selectionButton.show();
            // explanatory text
            if (_edsilv_utils__WEBPACK_IMPORTED_MODULE_3__["Bools"].getBool(this.options.optionsExplanatoryTextEnabled, false)) {
                var text = this.content.selectionExplanation;
                if (text) {
                    var $span = this.$explanatoryTextTemplate.clone();
                    $span.text(text);
                    $label.append($span);
                }
            }
        }
        else {
            this.$selectionButton.hide();
        }
        this.resetDynamicDownloadOptions();
        if (this.isDownloadOptionAvailable(_modules_uv_shared_module_DownloadOption__WEBPACK_IMPORTED_MODULE_2__["DownloadOption"].RANGE_RENDERINGS)) {
            if (canvas.ranges && canvas.ranges.length) {
                for (var i = 0; i < canvas.ranges.length; i++) {
                    var range = canvas.ranges[i];
                    var renderingOptions = this.getDownloadOptionsForRenderings(range, this.content.entireFileAsOriginal, _modules_uv_shared_module_DownloadOption__WEBPACK_IMPORTED_MODULE_2__["DownloadOption"].CANVAS_RENDERINGS);
                    this.addDownloadOptionsForRenderings(renderingOptions);
                }
            }
        }
        if (this.isDownloadOptionAvailable(_modules_uv_shared_module_DownloadOption__WEBPACK_IMPORTED_MODULE_2__["DownloadOption"].IMAGE_RENDERINGS)) {
            var images = canvas.getImages();
            for (var i = 0; i < images.length; i++) {
                var renderingOptions = this.getDownloadOptionsForRenderings(images[i].getResource(), this.content.entireFileAsOriginal, _modules_uv_shared_module_DownloadOption__WEBPACK_IMPORTED_MODULE_2__["DownloadOption"].IMAGE_RENDERINGS);
                this.addDownloadOptionsForRenderings(renderingOptions);
            }
        }
        if (this.isDownloadOptionAvailable(_modules_uv_shared_module_DownloadOption__WEBPACK_IMPORTED_MODULE_2__["DownloadOption"].CANVAS_RENDERINGS)) {
            var renderingOptions = this.getDownloadOptionsForRenderings(canvas, this.content.entireFileAsOriginal, _modules_uv_shared_module_DownloadOption__WEBPACK_IMPORTED_MODULE_2__["DownloadOption"].CANVAS_RENDERINGS);
            this.addDownloadOptionsForRenderings(renderingOptions);
        }
        if (this.isDownloadOptionAvailable(_modules_uv_shared_module_DownloadOption__WEBPACK_IMPORTED_MODULE_2__["DownloadOption"].MANIFEST_RENDERINGS)) {
            var renderingOptions = this.getDownloadOptionsForRenderings(this.extension.helper.getCurrentSequence(), this.content.entireDocument, _modules_uv_shared_module_DownloadOption__WEBPACK_IMPORTED_MODULE_2__["DownloadOption"].MANIFEST_RENDERINGS);
            if (!renderingOptions.length && this.extension.helper.manifest) {
                renderingOptions = this.getDownloadOptionsForRenderings(this.extension.helper.manifest, this.content.entireDocument, _modules_uv_shared_module_DownloadOption__WEBPACK_IMPORTED_MODULE_2__["DownloadOption"].MANIFEST_RENDERINGS);
            }
            this.addDownloadOptionsForRenderings(renderingOptions);
        }
        // hide the current view option if it's equivalent to whole image.
        if (this.isDownloadOptionAvailable(_modules_uv_shared_module_DownloadOption__WEBPACK_IMPORTED_MODULE_2__["DownloadOption"].CURRENT_VIEW)) {
            var currentWidth = parseInt(this.$currentViewAsJpgButton.data('width').toString());
            var currentHeight = parseInt(this.$currentViewAsJpgButton.data('height').toString());
            var wholeWidth = parseInt(this.$wholeImageHighResButton.data('width').toString());
            var wholeHeight = parseInt(this.$wholeImageHighResButton.data('height').toString());
            var percentageWidth = (currentWidth / wholeWidth) * 100;
            var percentageHeight = (currentHeight / wholeHeight) * 100;
            var disabledPercentage = this.options.currentViewDisabledPercentage;
            // if over disabledPercentage of the size of whole image
            if (percentageWidth >= disabledPercentage && percentageHeight >= disabledPercentage) {
                this.$currentViewAsJpgButton.hide();
            }
            else {
                this.$currentViewAsJpgButton.show();
            }
        }
        // order by image area
        var $options = this.$imageOptions.find('li.single');
        $options = $options.sort(function (a, b) {
            var aWidth = $(a).data('width');
            aWidth ? aWidth = parseInt(aWidth.toString()) : 0;
            var aHeight = $(a).data('height');
            aHeight ? aHeight = parseInt(aHeight.toString()) : 0;
            var bWidth = $(b).data('width');
            bWidth ? bWidth = parseInt(bWidth.toString()) : 0;
            var bHeight = $(b).data('height');
            bHeight ? bHeight = parseInt(bHeight.toString()) : 0;
            var aArea = aWidth * aHeight;
            var bArea = bWidth * bHeight;
            if (aArea < bArea) {
                return -1;
            }
            if (aArea > bArea) {
                return 1;
            }
            return 0;
        });
        $options.detach().appendTo(this.$imageOptions);
        // hide empty groups
        var $groups = this.$downloadOptions.find('li.group');
        $groups.each(function (index, group) {
            var $group = $(group);
            $group.show();
            if ($group.find('li.option:hidden').length === $group.find('li.option').length) {
                // all options are hidden, hide group.
                $group.hide();
            }
        });
        this.$downloadOptions.find('li.group:visible').last().addClass('lastVisible');
        if (this.extension.isPagingSettingEnabled() && (this.config.options.downloadPagingNoteEnabled)) {
            this.$pagingNote.show();
        }
        else {
            this.$pagingNote.hide();
        }
        if (!this.$downloadOptions.find('li.option:visible').length) {
            this.$noneAvailable.show();
            this.$downloadButton.hide();
        }
        else {
            // select first option.
            this.$downloadOptions.find('li.option input:visible:first').prop("checked", true);
            this.$noneAvailable.hide();
            this.$downloadButton.show();
        }
        this.resize();
    };
    DownloadDialogue.prototype.addDownloadOptionsForRenderings = function (renderingOptions) {
        var _this = this;
        renderingOptions.forEach(function (option) {
            switch (option.type) {
                case _modules_uv_shared_module_DownloadOption__WEBPACK_IMPORTED_MODULE_2__["DownloadOption"].IMAGE_RENDERINGS:
                    _this.$imageOptions.append(option.button);
                    break;
                case _modules_uv_shared_module_DownloadOption__WEBPACK_IMPORTED_MODULE_2__["DownloadOption"].CANVAS_RENDERINGS:
                    _this.$canvasOptions.append(option.button);
                    break;
                case _modules_uv_shared_module_DownloadOption__WEBPACK_IMPORTED_MODULE_2__["DownloadOption"].MANIFEST_RENDERINGS:
                    _this.$manifestOptions.append(option.button);
                    break;
            }
        });
    };
    DownloadDialogue.prototype.getCanvasImageResource = function (canvas) {
        var images = canvas.getImages();
        if (images[0]) {
            return images[0].getResource();
        }
        return null;
    };
    DownloadDialogue.prototype.getCanvasHighResImageUri = function (canvas) {
        var size = this.getCanvasComputedDimensions(canvas);
        if (size) {
            var width = size.width;
            var uri = canvas.getCanonicalImageUri(width);
            if (canvas.externalResource && canvas.externalResource.hasServiceDescriptor()) {
                var uri_parts = uri.split('/');
                var rotation = this.extension.getViewerRotation();
                uri_parts[uri_parts.length - 2] = String(rotation);
                uri = uri_parts.join('/');
            }
            return uri;
        }
        else if (canvas.externalResource && !canvas.externalResource.hasServiceDescriptor()) {
            // if there is no image service, return the dataUri.
            return canvas.externalResource.dataUri;
        }
        return '';
    };
    DownloadDialogue.prototype.getCanvasMimeType = function (canvas) {
        var resource = this.getCanvasImageResource(canvas);
        if (resource) {
            var format = resource.getFormat();
            if (format) {
                return format.toString();
            }
        }
        return null;
    };
    DownloadDialogue.prototype.getCanvasDimensions = function (canvas) {
        // externalResource may not have loaded yet
        if (canvas.externalResource.data) {
            var width = canvas.externalResource.data.width;
            var height = canvas.externalResource.data.height;
            if (width && height) {
                return new manifesto_js__WEBPACK_IMPORTED_MODULE_4__["Size"](width, height);
            }
        }
        return null;
    };
    DownloadDialogue.prototype.getCanvasComputedDimensions = function (canvas) {
        var imageSize = this.getCanvasDimensions(canvas);
        var requiredSize = canvas.getMaxDimensions();
        if (!imageSize) {
            return null;
        }
        if (!requiredSize) {
            return imageSize;
        }
        if (imageSize.width <= requiredSize.width && imageSize.height <= requiredSize.height) {
            return imageSize;
        }
        var scaleW = requiredSize.width / imageSize.width;
        var scaleH = requiredSize.height / imageSize.height;
        var scale = Math.min(scaleW, scaleH);
        return new manifesto_js__WEBPACK_IMPORTED_MODULE_4__["Size"](Math.floor(imageSize.width * scale), Math.floor(imageSize.height * scale));
    };
    DownloadDialogue.prototype._isLevel0 = function (profile) {
        if (!profile || !profile.length)
            return false;
        return manifesto_js__WEBPACK_IMPORTED_MODULE_4__["Utils"].isLevel0ImageProfile(profile[0]);
    };
    DownloadDialogue.prototype.isDownloadOptionAvailable = function (option) {
        if (!this.extension.resources) {
            return false;
        }
        var canvas = this.extension.helper.getCurrentCanvas();
        // if the external resource doesn't have a service descriptor or is level 0
        // only allow wholeImageHighRes
        if (!canvas.externalResource.hasServiceDescriptor() || this._isLevel0(canvas.externalResource.data.profile)) {
            if (option === _modules_uv_shared_module_DownloadOption__WEBPACK_IMPORTED_MODULE_2__["DownloadOption"].WHOLE_IMAGE_HIGH_RES) {
                // if in one-up mode, or in two-up mode with a single page being shown
                if (!this.extension.isPagingSettingEnabled() ||
                    this.extension.isPagingSettingEnabled() && this.extension.resources && this.extension.resources.length === 1) {
                    return true;
                }
            }
            return false;
        }
        switch (option) {
            case _modules_uv_shared_module_DownloadOption__WEBPACK_IMPORTED_MODULE_2__["DownloadOption"].CURRENT_VIEW:
            case _modules_uv_shared_module_DownloadOption__WEBPACK_IMPORTED_MODULE_2__["DownloadOption"].CANVAS_RENDERINGS:
            case _modules_uv_shared_module_DownloadOption__WEBPACK_IMPORTED_MODULE_2__["DownloadOption"].IMAGE_RENDERINGS:
            case _modules_uv_shared_module_DownloadOption__WEBPACK_IMPORTED_MODULE_2__["DownloadOption"].WHOLE_IMAGE_HIGH_RES:
                // if in one-up mode, or in two-up mode with a single page being shown
                if (!this.extension.isPagingSettingEnabled() ||
                    this.extension.isPagingSettingEnabled() && this.extension.resources && this.extension.resources.length === 1) {
                    var maxDimensions = canvas.getMaxDimensions();
                    if (maxDimensions) {
                        if (maxDimensions.width <= this.options.maxImageWidth) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    return true;
                }
                return false;
            case _modules_uv_shared_module_DownloadOption__WEBPACK_IMPORTED_MODULE_2__["DownloadOption"].WHOLE_IMAGES_HIGH_RES:
                if (this.extension.isPagingSettingEnabled() && this.extension.resources && this.extension.resources.length > 1) {
                    return true;
                }
                return false;
            case _modules_uv_shared_module_DownloadOption__WEBPACK_IMPORTED_MODULE_2__["DownloadOption"].WHOLE_IMAGE_LOW_RES:
                // hide low-res option if hi-res width is smaller than constraint
                var size = this.getCanvasComputedDimensions(canvas);
                if (!size) {
                    return false;
                }
                return (!this.extension.isPagingSettingEnabled() && (size.width > this.options.confinedImageSize));
            case _modules_uv_shared_module_DownloadOption__WEBPACK_IMPORTED_MODULE_2__["DownloadOption"].SELECTION:
                return this.options.selectionEnabled;
            case _modules_uv_shared_module_DownloadOption__WEBPACK_IMPORTED_MODULE_2__["DownloadOption"].RANGE_RENDERINGS:
                if (canvas.ranges && canvas.ranges.length) {
                    var range = canvas.ranges[0];
                    return range.getRenderings().length > 0;
                }
                return false;
            default:
                return _super.prototype.isDownloadOptionAvailable.call(this, option);
        }
    };
    return DownloadDialogue;
}(_modules_uv_dialogues_module_DownloadDialogue__WEBPACK_IMPORTED_MODULE_1__["DownloadDialogue"]));



/***/ }),

/***/ "./src/extensions/uv-openseadragon-extension/Extension.ts":
/*!****************************************************************!*\
  !*** ./src/extensions/uv-openseadragon-extension/Extension.ts ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_uv_shared_module_AnnotationResults__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../modules/uv-shared-module/AnnotationResults */ "./src/modules/uv-shared-module/AnnotationResults.ts");
/* harmony import */ var _modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../modules/uv-shared-module/BaseEvents */ "./src/modules/uv-shared-module/BaseEvents.ts");
/* harmony import */ var _modules_uv_shared_module_BaseExtension__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../modules/uv-shared-module/BaseExtension */ "./src/modules/uv-shared-module/BaseExtension.ts");
/* harmony import */ var _modules_uv_shared_module_Bookmark__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../modules/uv-shared-module/Bookmark */ "./src/modules/uv-shared-module/Bookmark.ts");
/* harmony import */ var _modules_uv_contentleftpanel_module_ContentLeftPanel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../modules/uv-contentleftpanel-module/ContentLeftPanel */ "./src/modules/uv-contentleftpanel-module/ContentLeftPanel.ts");
/* harmony import */ var _CroppedImageDimensions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./CroppedImageDimensions */ "./src/extensions/uv-openseadragon-extension/CroppedImageDimensions.ts");
/* harmony import */ var _DownloadDialogue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./DownloadDialogue */ "./src/extensions/uv-openseadragon-extension/DownloadDialogue.ts");
/* harmony import */ var _Events__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Events */ "./src/extensions/uv-openseadragon-extension/Events.ts");
/* harmony import */ var _modules_uv_dialogues_module_ExternalContentDialogue__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../modules/uv-dialogues-module/ExternalContentDialogue */ "./src/modules/uv-dialogues-module/ExternalContentDialogue.ts");
/* harmony import */ var _modules_uv_osdmobilefooterpanel_module_MobileFooter__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../modules/uv-osdmobilefooterpanel-module/MobileFooter */ "./src/modules/uv-osdmobilefooterpanel-module/MobileFooter.ts");
/* harmony import */ var _modules_uv_searchfooterpanel_module_FooterPanel__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../modules/uv-searchfooterpanel-module/FooterPanel */ "./src/modules/uv-searchfooterpanel-module/FooterPanel.ts");
/* harmony import */ var _modules_uv_dialogues_module_HelpDialogue__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../modules/uv-dialogues-module/HelpDialogue */ "./src/modules/uv-dialogues-module/HelpDialogue.ts");
/* harmony import */ var _Mode__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./Mode */ "./src/extensions/uv-openseadragon-extension/Mode.ts");
/* harmony import */ var _modules_uv_dialogues_module_MoreInfoDialogue__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../modules/uv-dialogues-module/MoreInfoDialogue */ "./src/modules/uv-dialogues-module/MoreInfoDialogue.ts");
/* harmony import */ var _modules_uv_moreinforightpanel_module_MoreInfoRightPanel__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../modules/uv-moreinforightpanel-module/MoreInfoRightPanel */ "./src/modules/uv-moreinforightpanel-module/MoreInfoRightPanel.ts");
/* harmony import */ var _modules_uv_multiselectdialogue_module_MultiSelectDialogue__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../modules/uv-multiselectdialogue-module/MultiSelectDialogue */ "./src/modules/uv-multiselectdialogue-module/MultiSelectDialogue.ts");
/* harmony import */ var _MultiSelectionArgs__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./MultiSelectionArgs */ "./src/extensions/uv-openseadragon-extension/MultiSelectionArgs.ts");
/* harmony import */ var _modules_uv_pagingheaderpanel_module_PagingHeaderPanel__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../modules/uv-pagingheaderpanel-module/PagingHeaderPanel */ "./src/modules/uv-pagingheaderpanel-module/PagingHeaderPanel.ts");
/* harmony import */ var _modules_uv_shared_module_Point__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../modules/uv-shared-module/Point */ "./src/modules/uv-shared-module/Point.ts");
/* harmony import */ var _modules_uv_openseadragoncenterpanel_module_OpenSeadragonCenterPanel__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../modules/uv-openseadragoncenterpanel-module/OpenSeadragonCenterPanel */ "./src/modules/uv-openseadragoncenterpanel-module/OpenSeadragonCenterPanel.ts");
/* harmony import */ var _SettingsDialogue__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./SettingsDialogue */ "./src/extensions/uv-openseadragon-extension/SettingsDialogue.ts");
/* harmony import */ var _ShareDialogue__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./ShareDialogue */ "./src/extensions/uv-openseadragon-extension/ShareDialogue.ts");
/* harmony import */ var _edsilv_utils__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @edsilv/utils */ "./node_modules/@edsilv/utils/dist-esmodule/index.js");
/* harmony import */ var _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @iiif/vocabulary */ "./node_modules/@iiif/vocabulary/dist-esmodule/index.js");
/* harmony import */ var _iiif_manifold__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @iiif/manifold */ "./node_modules/@iiif/manifold/dist-esmodule/index.js");
/* harmony import */ var manifesto_js__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! manifesto.js */ "./node_modules/manifesto.js/dist-umd/manifesto.js");
/* harmony import */ var manifesto_js__WEBPACK_IMPORTED_MODULE_25___default = /*#__PURE__*/__webpack_require__.n(manifesto_js__WEBPACK_IMPORTED_MODULE_25__);
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


























var OpenSeadragonExtension = /** @class */ (function (_super) {
    __extends(OpenSeadragonExtension, _super);
    function OpenSeadragonExtension() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.annotations = [];
        _this.currentRotation = 0;
        _this.isAnnotating = false;
        return _this;
    }
    OpenSeadragonExtension.prototype.create = function () {
        var _this = this;
        _super.prototype.create.call(this);
        this.component.subscribe(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].METRIC_CHANGED, function () {
            if (!_this.isDesktopMetric()) {
                var settings = {};
                settings.pagingEnabled = false;
                _this.updateSettings(settings);
                _this.component.publish(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].UPDATE_SETTINGS);
                _this.shell.$rightPanel.hide();
            }
            else {
                _this.shell.$rightPanel.show();
            }
        });
        this.component.subscribe(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].CANVAS_INDEX_CHANGED, function (canvasIndex) {
            _this.previousAnnotationRect = null;
            _this.currentAnnotationRect = null;
            _this.viewPage(canvasIndex);
        });
        this.component.subscribe(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].CLEAR_ANNOTATIONS, function () {
            _this.clearAnnotations();
            _this.component.publish(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].ANNOTATIONS_CLEARED);
            _this.fire(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].CLEAR_ANNOTATIONS);
        });
        this.component.subscribe(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].DOWN_ARROW, function () {
            if (!_this.useArrowKeysToNavigate()) {
                _this.centerPanel.setFocus();
            }
        });
        this.component.subscribe(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].END, function () {
            _this.component.publish(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].CANVAS_INDEX_CHANGED, _this.helper.getLastPageIndex());
        });
        this.component.subscribe(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].FIRST, function () {
            _this.fire(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].FIRST);
            _this.component.publish(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].CANVAS_INDEX_CHANGED, _this.helper.getFirstPageIndex());
        });
        this.component.subscribe(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].GALLERY_DECREASE_SIZE, function () {
            _this.fire(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].GALLERY_DECREASE_SIZE);
        });
        this.component.subscribe(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].GALLERY_INCREASE_SIZE, function () {
            _this.fire(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].GALLERY_INCREASE_SIZE);
        });
        this.component.subscribe(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].GALLERY_THUMB_SELECTED, function () {
            _this.fire(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].GALLERY_THUMB_SELECTED);
        });
        this.component.subscribe(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].HOME, function () {
            _this.component.publish(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].CANVAS_INDEX_CHANGED, _this.helper.getFirstPageIndex());
        });
        this.component.subscribe(_Events__WEBPACK_IMPORTED_MODULE_7__["Events"].IMAGE_SEARCH, function (index) {
            _this.fire(_Events__WEBPACK_IMPORTED_MODULE_7__["Events"].IMAGE_SEARCH, index);
            _this.component.publish(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].CANVAS_INDEX_CHANGED, index);
        });
        this.component.subscribe(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].LAST, function () {
            _this.fire(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].LAST);
            _this.component.publish(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].CANVAS_INDEX_CHANGED, _this.helper.getLastPageIndex());
        });
        this.component.subscribe(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].LEFT_ARROW, function () {
            if (_this.useArrowKeysToNavigate()) {
                _this.component.publish(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].CANVAS_INDEX_CHANGED, _this.getPrevPageIndex());
            }
            else {
                _this.centerPanel.setFocus();
            }
        });
        this.component.subscribe(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].LEFTPANEL_COLLAPSE_FULL_START, function () {
            if (_this.isDesktopMetric()) {
                _this.shell.$rightPanel.show();
            }
        });
        this.component.subscribe(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].LEFTPANEL_COLLAPSE_FULL_FINISH, function () {
            _this.shell.$centerPanel.show();
            _this.resize();
        });
        this.component.subscribe(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].LEFTPANEL_EXPAND_FULL_START, function () {
            _this.shell.$centerPanel.hide();
            _this.shell.$rightPanel.hide();
        });
        this.component.subscribe(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].MINUS, function () {
            _this.centerPanel.setFocus();
        });
        this.component.subscribe(_Events__WEBPACK_IMPORTED_MODULE_7__["Events"].MODE_CHANGED, function (mode) {
            _this.fire(_Events__WEBPACK_IMPORTED_MODULE_7__["Events"].MODE_CHANGED, mode);
            _this.mode = new _Mode__WEBPACK_IMPORTED_MODULE_12__["Mode"](mode);
            var settings = _this.getSettings();
            _this.component.publish(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].SETTINGS_CHANGED, settings);
        });
        this.component.subscribe(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].MULTISELECTION_MADE, function (ids) {
            var args = new _MultiSelectionArgs__WEBPACK_IMPORTED_MODULE_16__["MultiSelectionArgs"]();
            args.manifestUri = _this.helper.manifestUri;
            args.allCanvases = ids.length === _this.helper.getCanvases().length;
            args.canvases = ids;
            args.format = _this.data.config.options.multiSelectionMimeType;
            args.sequence = _this.helper.getCurrentSequence().id;
            _this.fire(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].MULTISELECTION_MADE, args);
        });
        this.component.subscribe(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].NEXT, function () {
            _this.fire(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].NEXT);
            _this.component.publish(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].CANVAS_INDEX_CHANGED, _this.getNextPageIndex());
        });
        this.component.subscribe(_Events__WEBPACK_IMPORTED_MODULE_7__["Events"].NEXT_SEARCH_RESULT, function () {
            _this.fire(_Events__WEBPACK_IMPORTED_MODULE_7__["Events"].NEXT_SEARCH_RESULT);
        });
        this.component.subscribe(_Events__WEBPACK_IMPORTED_MODULE_7__["Events"].NEXT_IMAGES_SEARCH_RESULT_UNAVAILABLE, function () {
            _this.fire(_Events__WEBPACK_IMPORTED_MODULE_7__["Events"].NEXT_IMAGES_SEARCH_RESULT_UNAVAILABLE);
            _this.nextSearchResult();
        });
        this.component.subscribe(_Events__WEBPACK_IMPORTED_MODULE_7__["Events"].PREV_IMAGES_SEARCH_RESULT_UNAVAILABLE, function () {
            _this.fire(_Events__WEBPACK_IMPORTED_MODULE_7__["Events"].PREV_IMAGES_SEARCH_RESULT_UNAVAILABLE);
            _this.prevSearchResult();
        });
        this.component.subscribe(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].OPEN_THUMBS_VIEW, function () {
            _this.fire(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].OPEN_THUMBS_VIEW);
        });
        this.component.subscribe(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].OPEN_TREE_VIEW, function () {
            _this.fire(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].OPEN_TREE_VIEW);
        });
        this.component.subscribe(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].PAGE_DOWN, function () {
            _this.component.publish(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].CANVAS_INDEX_CHANGED, _this.getNextPageIndex());
        });
        this.component.subscribe(_Events__WEBPACK_IMPORTED_MODULE_7__["Events"].PAGE_SEARCH, function (value) {
            _this.fire(_Events__WEBPACK_IMPORTED_MODULE_7__["Events"].PAGE_SEARCH, value);
            _this.viewLabel(value);
        });
        this.component.subscribe(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].PAGE_UP, function () {
            _this.component.publish(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].CANVAS_INDEX_CHANGED, _this.getPrevPageIndex());
        });
        this.component.subscribe(_Events__WEBPACK_IMPORTED_MODULE_7__["Events"].PAGING_TOGGLED, function (obj) {
            _this.fire(_Events__WEBPACK_IMPORTED_MODULE_7__["Events"].PAGING_TOGGLED, obj);
        });
        this.component.subscribe(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].PLUS, function () {
            _this.centerPanel.setFocus();
        });
        this.component.subscribe(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].PREV, function () {
            _this.fire(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].PREV);
            _this.component.publish(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].CANVAS_INDEX_CHANGED, _this.getPrevPageIndex());
        });
        this.component.subscribe(_Events__WEBPACK_IMPORTED_MODULE_7__["Events"].PREV_SEARCH_RESULT, function () {
            _this.fire(_Events__WEBPACK_IMPORTED_MODULE_7__["Events"].PREV_SEARCH_RESULT);
        });
        this.component.subscribe(_Events__WEBPACK_IMPORTED_MODULE_7__["Events"].PRINT, function () {
            _this.print();
        });
        this.component.subscribe(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].RELOAD, function () {
            _this.component.publish(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].CLEAR_ANNOTATIONS);
        });
        this.component.subscribe(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].RIGHT_ARROW, function () {
            if (_this.useArrowKeysToNavigate()) {
                _this.component.publish(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].CANVAS_INDEX_CHANGED, _this.getNextPageIndex());
            }
            else {
                _this.centerPanel.setFocus();
            }
        });
        this.component.subscribe(_Events__WEBPACK_IMPORTED_MODULE_7__["Events"].OPENSEADRAGON_ANIMATION, function () {
            _this.fire(_Events__WEBPACK_IMPORTED_MODULE_7__["Events"].OPENSEADRAGON_ANIMATION);
        });
        this.component.subscribe(_Events__WEBPACK_IMPORTED_MODULE_7__["Events"].OPENSEADRAGON_ANIMATION_FINISH, function (viewer) {
            var bounds = _this.centerPanel.getViewportBounds();
            if (_this.centerPanel && bounds) {
                _this.component.publish(_Events__WEBPACK_IMPORTED_MODULE_7__["Events"].XYWH_CHANGED, bounds.toString());
                _this.data.xywh = bounds.toString();
                _this.fire(_Events__WEBPACK_IMPORTED_MODULE_7__["Events"].XYWH_CHANGED, _this.data.xywh);
            }
            var canvas = _this.helper.getCurrentCanvas();
            _this.fire(_Events__WEBPACK_IMPORTED_MODULE_7__["Events"].CURRENT_VIEW_URI, {
                cropUri: _this.getCroppedImageUri(canvas, _this.getViewer()),
                fullUri: _this.getConfinedImageUri(canvas, canvas.getWidth())
            });
        });
        this.component.subscribe(_Events__WEBPACK_IMPORTED_MODULE_7__["Events"].OPENSEADRAGON_ANIMATION_START, function () {
            _this.fire(_Events__WEBPACK_IMPORTED_MODULE_7__["Events"].OPENSEADRAGON_ANIMATION_START);
        });
        this.component.subscribe(_Events__WEBPACK_IMPORTED_MODULE_7__["Events"].OPENSEADRAGON_OPEN, function () {
            if (!_this.useArrowKeysToNavigate()) {
                _this.centerPanel.setFocus();
            }
            _this.fire(_Events__WEBPACK_IMPORTED_MODULE_7__["Events"].OPENSEADRAGON_OPEN);
        });
        this.component.subscribe(_Events__WEBPACK_IMPORTED_MODULE_7__["Events"].OPENSEADRAGON_RESIZE, function () {
            _this.fire(_Events__WEBPACK_IMPORTED_MODULE_7__["Events"].OPENSEADRAGON_RESIZE);
        });
        this.component.subscribe(_Events__WEBPACK_IMPORTED_MODULE_7__["Events"].OPENSEADRAGON_ROTATION, function (rotation) {
            _this.data.rotation = rotation;
            _this.fire(_Events__WEBPACK_IMPORTED_MODULE_7__["Events"].OPENSEADRAGON_ROTATION, _this.data.rotation);
            _this.currentRotation = rotation;
        });
        this.component.subscribe(_Events__WEBPACK_IMPORTED_MODULE_7__["Events"].SEARCH, function (terms) {
            _this.fire(_Events__WEBPACK_IMPORTED_MODULE_7__["Events"].SEARCH, terms);
            _this.search(terms);
        });
        this.component.subscribe(_Events__WEBPACK_IMPORTED_MODULE_7__["Events"].SEARCH_PREVIEW_FINISH, function () {
            _this.fire(_Events__WEBPACK_IMPORTED_MODULE_7__["Events"].SEARCH_PREVIEW_FINISH);
        });
        this.component.subscribe(_Events__WEBPACK_IMPORTED_MODULE_7__["Events"].SEARCH_PREVIEW_START, function () {
            _this.fire(_Events__WEBPACK_IMPORTED_MODULE_7__["Events"].SEARCH_PREVIEW_START);
        });
        this.component.subscribe(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].ANNOTATIONS, function (obj) {
            _this.fire(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].ANNOTATIONS, obj);
        });
        this.component.subscribe(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].ANNOTATION_CANVAS_CHANGED, function (rects) {
            _this.component.publish(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].CANVAS_INDEX_CHANGED, rects[0].canvasIndex);
        });
        this.component.subscribe(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].ANNOTATIONS_EMPTY, function () {
            _this.fire(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].ANNOTATIONS_EMPTY);
        });
        this.component.subscribe(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].THUMB_SELECTED, function (thumb) {
            _this.component.publish(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].CANVAS_INDEX_CHANGED, thumb.index);
        });
        this.component.subscribe(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].TREE_NODE_SELECTED, function (node) {
            _this.fire(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].TREE_NODE_SELECTED, node.data.path);
            _this.treeNodeSelected(node);
        });
        this.component.subscribe(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].UP_ARROW, function () {
            if (!_this.useArrowKeysToNavigate()) {
                _this.centerPanel.setFocus();
            }
        });
        this.component.subscribe(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].UPDATE_SETTINGS, function () {
            _this.component.publish(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].CANVAS_INDEX_CHANGED, _this.helper.canvasIndex);
            var settings = _this.getSettings();
            _this.component.publish(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].SETTINGS_CHANGED, settings);
        });
        // this.component.subscribe(Events.VIEW_PAGE, (e: any, index: number) => {
        //     this.fire(Events.VIEW_PAGE, index);
        //     this.component.publish(BaseEvents.CANVAS_INDEX_CHANGED, [index]);
        // });
    };
    OpenSeadragonExtension.prototype.createModules = function () {
        _super.prototype.createModules.call(this);
        if (this.isHeaderPanelEnabled()) {
            this.headerPanel = new _modules_uv_pagingheaderpanel_module_PagingHeaderPanel__WEBPACK_IMPORTED_MODULE_17__["PagingHeaderPanel"](this.shell.$headerPanel);
        }
        else {
            this.shell.$headerPanel.hide();
        }
        if (this.isLeftPanelEnabled()) {
            this.leftPanel = new _modules_uv_contentleftpanel_module_ContentLeftPanel__WEBPACK_IMPORTED_MODULE_4__["ContentLeftPanel"](this.shell.$leftPanel);
        }
        else {
            this.shell.$leftPanel.hide();
        }
        this.centerPanel = new _modules_uv_openseadragoncenterpanel_module_OpenSeadragonCenterPanel__WEBPACK_IMPORTED_MODULE_19__["OpenSeadragonCenterPanel"](this.shell.$centerPanel);
        if (this.isRightPanelEnabled()) {
            this.rightPanel = new _modules_uv_moreinforightpanel_module_MoreInfoRightPanel__WEBPACK_IMPORTED_MODULE_14__["MoreInfoRightPanel"](this.shell.$rightPanel);
        }
        else {
            this.shell.$rightPanel.hide();
        }
        if (this.isFooterPanelEnabled()) {
            this.footerPanel = new _modules_uv_searchfooterpanel_module_FooterPanel__WEBPACK_IMPORTED_MODULE_10__["FooterPanel"](this.shell.$footerPanel);
            this.mobileFooterPanel = new _modules_uv_osdmobilefooterpanel_module_MobileFooter__WEBPACK_IMPORTED_MODULE_9__["FooterPanel"](this.shell.$mobileFooterPanel);
        }
        else {
            this.shell.$footerPanel.hide();
        }
        this.$helpDialogue = $('<div class="overlay help" aria-hidden="true"></div>');
        this.shell.$overlays.append(this.$helpDialogue);
        this.helpDialogue = new _modules_uv_dialogues_module_HelpDialogue__WEBPACK_IMPORTED_MODULE_11__["HelpDialogue"](this.$helpDialogue);
        this.$moreInfoDialogue = $('<div class="overlay moreInfo" aria-hidden="true"></div>');
        this.shell.$overlays.append(this.$moreInfoDialogue);
        this.moreInfoDialogue = new _modules_uv_dialogues_module_MoreInfoDialogue__WEBPACK_IMPORTED_MODULE_13__["MoreInfoDialogue"](this.$moreInfoDialogue);
        this.$multiSelectDialogue = $('<div class="overlay multiSelect" aria-hidden="true"></div>');
        this.shell.$overlays.append(this.$multiSelectDialogue);
        this.multiSelectDialogue = new _modules_uv_multiselectdialogue_module_MultiSelectDialogue__WEBPACK_IMPORTED_MODULE_15__["MultiSelectDialogue"](this.$multiSelectDialogue);
        this.$shareDialogue = $('<div class="overlay share" aria-hidden="true"></div>');
        this.shell.$overlays.append(this.$shareDialogue);
        this.shareDialogue = new _ShareDialogue__WEBPACK_IMPORTED_MODULE_21__["ShareDialogue"](this.$shareDialogue);
        this.$downloadDialogue = $('<div class="overlay download" aria-hidden="true"></div>');
        this.shell.$overlays.append(this.$downloadDialogue);
        this.downloadDialogue = new _DownloadDialogue__WEBPACK_IMPORTED_MODULE_6__["DownloadDialogue"](this.$downloadDialogue);
        this.$settingsDialogue = $('<div class="overlay settings" aria-hidden="true"></div>');
        this.shell.$overlays.append(this.$settingsDialogue);
        this.settingsDialogue = new _SettingsDialogue__WEBPACK_IMPORTED_MODULE_20__["SettingsDialogue"](this.$settingsDialogue);
        this.$externalContentDialogue = $('<div class="overlay externalContent" aria-hidden="true"></div>');
        this.shell.$overlays.append(this.$externalContentDialogue);
        this.externalContentDialogue = new _modules_uv_dialogues_module_ExternalContentDialogue__WEBPACK_IMPORTED_MODULE_8__["ExternalContentDialogue"](this.$externalContentDialogue);
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
    OpenSeadragonExtension.prototype.render = function () {
        _super.prototype.render.call(this);
        this.checkForAnnotations();
        this.checkForSearchParam();
        this.checkForRotationParam();
    };
    OpenSeadragonExtension.prototype.checkForAnnotations = function () {
        if (this.data.annotations) {
            var annotations = this.parseAnnotationList(this.data.annotations);
            this.component.publish(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].CLEAR_ANNOTATIONS);
            this.annotate(annotations);
        }
    };
    OpenSeadragonExtension.prototype.annotate = function (annotations, terms) {
        this.annotations = annotations;
        // sort the annotations by canvasIndex
        this.annotations = annotations.sort(function (a, b) {
            return a.canvasIndex - b.canvasIndex;
        });
        var annotationResults = new _modules_uv_shared_module_AnnotationResults__WEBPACK_IMPORTED_MODULE_0__["AnnotationResults"]();
        annotationResults.terms = terms;
        annotationResults.annotations = this.annotations;
        this.component.publish(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].ANNOTATIONS, annotationResults);
        // reload current index as it may contain annotations.
        //this.component.publish(BaseEvents.CANVAS_INDEX_CHANGED, [this.helper.canvasIndex]);
    };
    OpenSeadragonExtension.prototype.checkForSearchParam = function () {
        // if a highlight param is set, use it to search.
        var highlight = this.data.highlight;
        if (highlight) {
            highlight.replace(/\+/g, " ").replace(/"/g, "");
            this.component.publish(_Events__WEBPACK_IMPORTED_MODULE_7__["Events"].SEARCH, highlight);
        }
    };
    OpenSeadragonExtension.prototype.checkForRotationParam = function () {
        // if a rotation value is passed, set rotation
        var rotation = this.data.rotation;
        if (rotation) {
            this.component.publish(_Events__WEBPACK_IMPORTED_MODULE_7__["Events"].OPENSEADRAGON_ROTATION, rotation);
        }
    };
    OpenSeadragonExtension.prototype.viewPage = function (canvasIndex) {
        // if it's an invalid canvas index.
        if (canvasIndex === -1)
            return;
        var isReload = false;
        if (canvasIndex === this.helper.canvasIndex) {
            isReload = true;
        }
        if (this.helper.isCanvasIndexOutOfRange(canvasIndex)) {
            this.showMessage(this.data.config.content.canvasIndexOutOfRange);
            canvasIndex = 0;
        }
        if (this.isPagingSettingEnabled() && !isReload) {
            var indices = this.getPagedIndices(canvasIndex);
            // if the page is already displayed, only advance canvasIndex.
            if (indices.includes(this.helper.canvasIndex)) {
                this.viewCanvas(canvasIndex);
                return;
            }
        }
        this.viewCanvas(canvasIndex);
    };
    OpenSeadragonExtension.prototype.getViewer = function () {
        return this.centerPanel.viewer;
    };
    OpenSeadragonExtension.prototype.getMode = function () {
        if (this.mode)
            return this.mode;
        switch (this.helper.getManifestType()) {
            case manifesto_js__WEBPACK_IMPORTED_MODULE_25__["ManifestType"].MONOGRAPH:
                return _Mode__WEBPACK_IMPORTED_MODULE_12__["Mode"].page;
            case manifesto_js__WEBPACK_IMPORTED_MODULE_25__["ManifestType"].MANUSCRIPT:
                return _Mode__WEBPACK_IMPORTED_MODULE_12__["Mode"].page;
            default:
                return _Mode__WEBPACK_IMPORTED_MODULE_12__["Mode"].image;
        }
    };
    OpenSeadragonExtension.prototype.getViewportBounds = function () {
        if (!this.centerPanel)
            return null;
        var bounds = this.centerPanel.getViewportBounds();
        if (bounds) {
            return bounds.toString();
        }
        return null;
    };
    OpenSeadragonExtension.prototype.getViewerRotation = function () {
        if (!this.centerPanel)
            return null;
        return this.currentRotation;
    };
    OpenSeadragonExtension.prototype.viewRange = function (path) {
        //this.currentRangePath = path;
        var range = this.helper.getRangeByPath(path);
        if (!range)
            return;
        var canvasId = range.getCanvasIds()[0];
        var index = this.helper.getCanvasIndexById(canvasId);
        this.component.publish(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].CANVAS_INDEX_CHANGED, index);
    };
    OpenSeadragonExtension.prototype.viewLabel = function (label) {
        if (!label) {
            this.showMessage(this.data.config.modules.genericDialogue.content.emptyValue);
            this.component.publish(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].CANVAS_INDEX_CHANGE_FAILED);
            return;
        }
        var index = this.helper.getCanvasIndexByLabel(label);
        if (index != -1) {
            this.component.publish(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].CANVAS_INDEX_CHANGED, index);
        }
        else {
            this.showMessage(this.data.config.modules.genericDialogue.content.pageNotFound);
            this.component.publish(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].CANVAS_INDEX_CHANGE_FAILED);
        }
    };
    OpenSeadragonExtension.prototype.treeNodeSelected = function (node) {
        var data = node.data;
        if (!data.type)
            return;
        switch (data.type) {
            case _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_23__["IIIFResourceType"].MANIFEST:
                this.viewManifest(data);
                break;
            case _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_23__["IIIFResourceType"].COLLECTION:
                // note: this won't get called as the tree component now has branchNodesSelectable = false
                // useful to keep around for reference
                this.viewCollection(data);
                break;
            default:
                this.viewRange(data.path);
                break;
        }
    };
    OpenSeadragonExtension.prototype.clearAnnotations = function () {
        this.annotations = null;
        // reload current index as it may contain results.
        this.component.publish(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].CANVAS_INDEX_CHANGED, this.helper.canvasIndex);
    };
    OpenSeadragonExtension.prototype.prevSearchResult = function () {
        var foundResult;
        if (!this.annotations)
            return;
        // get the first result with a canvasIndex less than the current index.
        for (var i = this.annotations.length - 1; i >= 0; i--) {
            var result = this.annotations[i];
            if (result.canvasIndex <= this.getPrevPageIndex()) {
                foundResult = result;
                this.component.publish(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].CANVAS_INDEX_CHANGED, foundResult.canvasIndex);
                break;
            }
        }
    };
    OpenSeadragonExtension.prototype.nextSearchResult = function () {
        if (!this.annotations)
            return;
        // get the first result with an index greater than the current index.
        for (var i = 0; i < this.annotations.length; i++) {
            var result = this.annotations[i];
            if (result && result.canvasIndex >= this.getNextPageIndex()) {
                this.component.publish(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].CANVAS_INDEX_CHANGED, result.canvasIndex);
                break;
            }
        }
    };
    OpenSeadragonExtension.prototype.bookmark = function () {
        _super.prototype.bookmark.call(this);
        var canvas = this.helper.getCurrentCanvas();
        var bookmark = new _modules_uv_shared_module_Bookmark__WEBPACK_IMPORTED_MODULE_3__["Bookmark"]();
        bookmark.index = this.helper.canvasIndex;
        bookmark.label = manifesto_js__WEBPACK_IMPORTED_MODULE_25__["LanguageMap"].getValue(canvas.getLabel());
        bookmark.path = this.getCroppedImageUri(canvas, this.getViewer());
        bookmark.thumb = canvas.getCanonicalImageUri(this.data.config.options.bookmarkThumbWidth);
        bookmark.title = this.helper.getLabel();
        bookmark.trackingLabel = window.trackingLabel;
        bookmark.type = _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_23__["ExternalResourceType"].IMAGE;
        this.fire(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].BOOKMARK, bookmark);
    };
    OpenSeadragonExtension.prototype.print = function () {
        // var args: MultiSelectionArgs = new MultiSelectionArgs();
        // args.manifestUri = this.helper.manifestUri;
        // args.allCanvases = true;
        // args.format = this.data.config.options.printMimeType;
        // args.sequence = this.helper.getCurrentSequence().id;
        window.print();
        this.fire(_Events__WEBPACK_IMPORTED_MODULE_7__["Events"].PRINT);
    };
    OpenSeadragonExtension.prototype.getCroppedImageDimensions = function (canvas, viewer) {
        if (!viewer)
            return null;
        if (!viewer.viewport)
            return null;
        if (!canvas.getHeight() || !canvas.getWidth()) {
            return null;
        }
        var bounds = viewer.viewport.getBounds(true);
        var dimensions = new _CroppedImageDimensions__WEBPACK_IMPORTED_MODULE_5__["CroppedImageDimensions"]();
        var width = Math.floor(bounds.width);
        var height = Math.floor(bounds.height);
        var x = Math.floor(bounds.x);
        var y = Math.floor(bounds.y);
        // constrain to image bounds
        if (x + width > canvas.getWidth()) {
            width = canvas.getWidth() - x;
        }
        else if (x < 0) {
            width = width + x;
        }
        if (x < 0) {
            x = 0;
        }
        if (y + height > canvas.getHeight()) {
            height = canvas.getHeight() - y;
        }
        else if (y < 0) {
            height = height + y;
        }
        if (y < 0) {
            y = 0;
        }
        width = Math.min(width, canvas.getWidth());
        height = Math.min(height, canvas.getHeight());
        var regionWidth = width;
        var regionHeight = height;
        var maxDimensions = canvas.getMaxDimensions();
        if (maxDimensions) {
            if (width > maxDimensions.width) {
                var newWidth = maxDimensions.width;
                height = Math.round(newWidth * (height / width));
                width = newWidth;
            }
            if (height > maxDimensions.height) {
                var newHeight = maxDimensions.height;
                width = Math.round((width / height) * newHeight);
                height = newHeight;
            }
        }
        dimensions.region = new manifesto_js__WEBPACK_IMPORTED_MODULE_25__["Size"](regionWidth, regionHeight);
        dimensions.regionPos = new _modules_uv_shared_module_Point__WEBPACK_IMPORTED_MODULE_18__["Point"](x, y);
        dimensions.size = new manifesto_js__WEBPACK_IMPORTED_MODULE_25__["Size"](width, height);
        return dimensions;
    };
    // keep this around for reference
    // getOnScreenCroppedImageDimensions(canvas: manifesto.Canvas, viewer: any): CroppedImageDimensions {
    //     if (!viewer) return null;
    //     if (!viewer.viewport) return null;
    //     if (!canvas.getHeight() || !canvas.getWidth()){
    //         return null;
    //     }
    //     var bounds = viewer.viewport.getBounds(true);
    //     var containerSize = viewer.viewport.getContainerSize();
    //     var zoom = viewer.viewport.getZoom(true);
    //     var top = Math.max(0, bounds.y);
    //     var left = Math.max(0, bounds.x);
    //     // change top to be normalised value proportional to height of image, not width (as per OSD).
    //     top = 1 / (canvas.getHeight() / parseInt(String(canvas.getWidth() * top)));
    //     // get on-screen pixel sizes.
    //     var viewportWidthPx = containerSize.x;
    //     var viewportHeightPx = containerSize.y;
    //     var imageWidthPx = parseInt(String(viewportWidthPx * zoom));
    //     var ratio = canvas.getWidth() / imageWidthPx;
    //     var imageHeightPx = parseInt(String(canvas.getHeight() / ratio));
    //     var viewportLeftPx = parseInt(String(left * imageWidthPx));
    //     var viewportTopPx = parseInt(String(top * imageHeightPx));
    //     var rect1Left = 0;
    //     var rect1Right = imageWidthPx;
    //     var rect1Top = 0;
    //     var rect1Bottom = imageHeightPx;
    //     var rect2Left = viewportLeftPx;
    //     var rect2Right = viewportLeftPx + viewportWidthPx;
    //     var rect2Top = viewportTopPx;
    //     var rect2Bottom = viewportTopPx + viewportHeightPx;
    //     var sizeWidth = Math.max(0, Math.min(rect1Right, rect2Right) - Math.max(rect1Left, rect2Left));
    //     var sizeHeight = Math.max(0, Math.min(rect1Bottom, rect2Bottom) - Math.max(rect1Top, rect2Top));
    //     // get original image pixel sizes.
    //     var ratio2 = canvas.getWidth() / imageWidthPx;
    //     var regionWidth = parseInt(String(sizeWidth * ratio2));
    //     var regionHeight = parseInt(String(sizeHeight * ratio2));
    //     var regionTop = parseInt(String(canvas.getHeight() * top));
    //     var regionLeft = parseInt(String(canvas.getWidth() * left));
    //     if (regionTop < 0) regionTop = 0;
    //     if (regionLeft < 0) regionLeft = 0;
    //     var dimensions: CroppedImageDimensions = new CroppedImageDimensions();
    //     dimensions.region = new manifesto.Size(regionWidth, regionHeight);
    //     dimensions.regionPos = new Point(regionLeft, regionTop);
    //     dimensions.size = new manifesto.Size(sizeWidth, sizeHeight);
    //     return dimensions;
    // }
    OpenSeadragonExtension.prototype.getCroppedImageUri = function (canvas, viewer) {
        if (!viewer)
            return null;
        if (!viewer.viewport)
            return null;
        var dimensions = this.getCroppedImageDimensions(canvas, viewer);
        if (!dimensions) {
            return null;
        }
        // construct uri
        // {baseuri}/{id}/{region}/{size}/{rotation}/{quality}.jpg
        var baseUri = this.getImageBaseUri(canvas);
        var id = this.getImageId(canvas);
        if (!id) {
            return null;
        }
        var region = dimensions.regionPos.x + "," + dimensions.regionPos.y + "," + dimensions.region.width + "," + dimensions.region.height;
        var size = dimensions.size.width + ',' + dimensions.size.height;
        var rotation = this.getViewerRotation();
        var quality = 'default';
        return baseUri + "/" + id + "/" + region + "/" + size + "/" + rotation + "/" + quality + ".jpg";
    };
    OpenSeadragonExtension.prototype.getConfinedImageDimensions = function (canvas, width) {
        var dimensions = new manifesto_js__WEBPACK_IMPORTED_MODULE_25__["Size"](0, 0);
        dimensions.width = width;
        var normWidth = _edsilv_utils__WEBPACK_IMPORTED_MODULE_22__["Maths"].normalise(width, 0, canvas.getWidth());
        dimensions.height = Math.floor(canvas.getHeight() * normWidth);
        return dimensions;
    };
    OpenSeadragonExtension.prototype.getConfinedImageUri = function (canvas, width) {
        var baseUri = this.getImageBaseUri(canvas);
        // {baseuri}/{id}/{region}/{size}/{rotation}/{quality}.jpg
        var id = this.getImageId(canvas);
        if (!id) {
            return null;
        }
        var region = 'full';
        var dimensions = this.getConfinedImageDimensions(canvas, width);
        var size = dimensions.width + ',' + dimensions.height;
        var rotation = this.getViewerRotation();
        var quality = 'default';
        return baseUri + "/" + id + "/" + region + "/" + size + "/" + rotation + "/" + quality + ".jpg";
    };
    OpenSeadragonExtension.prototype.getImageId = function (canvas) {
        if (canvas.externalResource) {
            var id = canvas.externalResource.data['@id'];
            if (id) {
                return id.substr(id.lastIndexOf("/") + 1);
            }
        }
        return null;
    };
    OpenSeadragonExtension.prototype.getImageBaseUri = function (canvas) {
        var uri = this.getInfoUri(canvas);
        // First trim off info.json, then trim off ID....
        uri = uri.substr(0, uri.lastIndexOf("/"));
        return uri.substr(0, uri.lastIndexOf("/"));
    };
    OpenSeadragonExtension.prototype.getInfoUri = function (canvas) {
        var infoUri = null;
        var images = canvas.getImages();
        if (images && images.length) {
            var firstImage = images[0];
            var resource = firstImage.getResource();
            var services = resource.getServices();
            for (var i = 0; i < services.length; i++) {
                var service = services[i];
                var id = service.id;
                if (!id.endsWith('/')) {
                    id += '/';
                }
                if (manifesto_js__WEBPACK_IMPORTED_MODULE_25__["Utils"].isImageProfile(service.getProfile())) {
                    infoUri = id + 'info.json';
                }
            }
        }
        if (!infoUri) {
            // todo: use compiler flag (when available)
            infoUri = 'lib/imageunavailable.json';
        }
        return infoUri;
    };
    OpenSeadragonExtension.prototype.getEmbedScript = function (template, width, height, zoom, rotation) {
        var config = this.data.config.uri || '';
        var locales = this.getSerializedLocales();
        var appUri = this.getAppUri();
        var iframeSrc = appUri + "#?manifest=" + this.helper.manifestUri + "&c=" + this.helper.collectionIndex + "&m=" + this.helper.manifestIndex + "&s=" + this.helper.sequenceIndex + "&cv=" + this.helper.canvasIndex + "&config=" + config + "&locales=" + locales + "&xywh=" + zoom + "&r=" + rotation;
        var script = _edsilv_utils__WEBPACK_IMPORTED_MODULE_22__["Strings"].format(template, iframeSrc, width.toString(), height.toString());
        return script;
    };
    OpenSeadragonExtension.prototype.getPrevPageIndex = function (canvasIndex) {
        if (canvasIndex === void 0) { canvasIndex = this.helper.canvasIndex; }
        var index;
        if (this.isPagingSettingEnabled()) {
            var indices = this.getPagedIndices(canvasIndex);
            if (this.helper.isRightToLeft()) {
                index = indices[indices.length - 1] - 1;
            }
            else {
                index = indices[0] - 1;
            }
        }
        else {
            index = canvasIndex - 1;
        }
        return index;
    };
    OpenSeadragonExtension.prototype.isSearchEnabled = function () {
        if (!_edsilv_utils__WEBPACK_IMPORTED_MODULE_22__["Bools"].getBool(this.data.config.options.searchWithinEnabled, false)) {
            return false;
        }
        if (!this.helper.getSearchService()) {
            return false;
        }
        return true;
    };
    OpenSeadragonExtension.prototype.isPagingSettingEnabled = function () {
        if (this.helper.isPagingAvailable()) {
            return this.getSettings().pagingEnabled;
        }
        return false;
    };
    OpenSeadragonExtension.prototype.getNextPageIndex = function (canvasIndex) {
        if (canvasIndex === void 0) { canvasIndex = this.helper.canvasIndex; }
        var index;
        if (this.isPagingSettingEnabled()) {
            var indices = this.getPagedIndices(canvasIndex);
            if (this.helper.isRightToLeft()) {
                index = indices[0] + 1;
            }
            else {
                index = indices[indices.length - 1] + 1;
            }
        }
        else {
            index = canvasIndex + 1;
        }
        if (index > this.helper.getTotalCanvases() - 1) {
            return -1;
        }
        return index;
    };
    OpenSeadragonExtension.prototype.getAutoCompleteService = function () {
        var service = this.helper.getSearchService();
        if (!service)
            return null;
        return service.getService(_iiif_vocabulary__WEBPACK_IMPORTED_MODULE_23__["ServiceProfile"].SEARCH_0_AUTO_COMPLETE) || service.getService(_iiif_vocabulary__WEBPACK_IMPORTED_MODULE_23__["ServiceProfile"].SEARCH_1_AUTO_COMPLETE);
    };
    OpenSeadragonExtension.prototype.getAutoCompleteUri = function () {
        var service = this.getAutoCompleteService();
        if (!service)
            return null;
        return service.id + '?q={0}';
    };
    OpenSeadragonExtension.prototype.getSearchServiceUri = function () {
        var service = this.helper.getSearchService();
        if (!service)
            return null;
        var uri = service.id;
        uri = uri + "?q={0}";
        return uri;
    };
    OpenSeadragonExtension.prototype.search = function (terms) {
        var _this = this;
        if (this.isAnnotating)
            return;
        this.isAnnotating = true;
        // clear search results
        this.annotations = [];
        var that = this;
        // searching
        var searchUri = this.getSearchServiceUri();
        if (!searchUri)
            return;
        searchUri = _edsilv_utils__WEBPACK_IMPORTED_MODULE_22__["Strings"].format(searchUri, encodeURIComponent(terms));
        this.getSearchResults(searchUri, terms, this.annotations, function (annotations) {
            that.isAnnotating = false;
            if (annotations.length) {
                that.annotate(annotations, terms);
            }
            else {
                that.showMessage(that.data.config.modules.genericDialogue.content.noMatches, function () {
                    _this.component.publish(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].ANNOTATIONS_EMPTY);
                });
            }
        });
    };
    OpenSeadragonExtension.prototype.getSearchResults = function (searchUri, terms, searchResults, cb) {
        var _this = this;
        $.getJSON(searchUri, function (results) {
            if (results.resources && results.resources.length) {
                searchResults = searchResults.concat(_this.parseAnnotationList(results));
            }
            if (results.next) {
                _this.getSearchResults(results.next, terms, searchResults, cb);
            }
            else {
                cb(searchResults);
            }
        });
    };
    OpenSeadragonExtension.prototype.parseAnnotationList = function (annotations) {
        var parsed = [];
        var _loop_1 = function (i) {
            var resource = annotations.resources[i];
            var canvasIndex = this_1.helper.getCanvasIndexById(resource.on.match(/(.*)#/)[1]);
            var annotationGroup = new _iiif_manifold__WEBPACK_IMPORTED_MODULE_24__["AnnotationGroup"](resource, canvasIndex);
            var match = parsed.filter(function (x) { return x.canvasIndex === annotationGroup.canvasIndex; })[0];
            // if there's already an annotation for the canvas index, add a rect to it, otherwise create a new AnnotationGroup
            if (match) {
                match.addRect(resource);
            }
            else {
                parsed.push(annotationGroup);
            }
        };
        var this_1 = this;
        for (var i = 0; i < annotations.resources.length; i++) {
            _loop_1(i);
        }
        // sort by canvasIndex
        parsed.sort(function (a, b) {
            return a.canvasIndex - b.canvasIndex;
        });
        return parsed;
    };
    OpenSeadragonExtension.prototype.getAnnotationRects = function () {
        if (this.annotations) {
            return this.annotations.map(function (x) { return x.rects; }).reduce(function (a, b) { return a.concat(b); });
        }
        return [];
    };
    OpenSeadragonExtension.prototype.getCurrentAnnotationRectIndex = function () {
        var annotationRects = this.getAnnotationRects();
        if (this.currentAnnotationRect) {
            return annotationRects.indexOf(this.currentAnnotationRect);
        }
        return -1;
    };
    OpenSeadragonExtension.prototype.getTotalAnnotationRects = function () {
        var annotationRects = this.getAnnotationRects();
        return annotationRects.length;
    };
    OpenSeadragonExtension.prototype.isFirstAnnotationRect = function () {
        return this.getCurrentAnnotationRectIndex() === 0;
    };
    OpenSeadragonExtension.prototype.getLastAnnotationRectIndex = function () {
        return this.getTotalAnnotationRects() - 1;
    };
    OpenSeadragonExtension.prototype.getPagedIndices = function (canvasIndex) {
        if (canvasIndex === void 0) { canvasIndex = this.helper.canvasIndex; }
        var indices = [];
        // if it's a continuous manifest, get all resources.
        if (this.helper.isContinuous()) {
            indices = $.map(this.helper.getCanvases(), function (c, index) {
                return index;
            });
        }
        else {
            if (!this.isPagingSettingEnabled()) {
                indices.push(this.helper.canvasIndex);
            }
            else {
                if (this.helper.isFirstCanvas(canvasIndex) || (this.helper.isLastCanvas(canvasIndex) && this.helper.isTotalCanvasesEven())) {
                    indices = [canvasIndex];
                }
                else if (canvasIndex % 2) {
                    indices = [canvasIndex, canvasIndex + 1];
                }
                else {
                    indices = [canvasIndex - 1, canvasIndex];
                }
                if (this.helper.isRightToLeft()) {
                    indices = indices.reverse();
                }
            }
        }
        return indices;
    };
    return OpenSeadragonExtension;
}(_modules_uv_shared_module_BaseExtension__WEBPACK_IMPORTED_MODULE_2__["BaseExtension"]));
/* harmony default export */ __webpack_exports__["default"] = (OpenSeadragonExtension);


/***/ }),

/***/ "./src/extensions/uv-openseadragon-extension/MultiSelectionArgs.ts":
/*!*************************************************************************!*\
  !*** ./src/extensions/uv-openseadragon-extension/MultiSelectionArgs.ts ***!
  \*************************************************************************/
/*! exports provided: MultiSelectionArgs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MultiSelectionArgs", function() { return MultiSelectionArgs; });
var MultiSelectionArgs = /** @class */ (function () {
    function MultiSelectionArgs() {
    }
    return MultiSelectionArgs;
}());



/***/ }),

/***/ "./src/extensions/uv-openseadragon-extension/SettingsDialogue.ts":
/*!***********************************************************************!*\
  !*** ./src/extensions/uv-openseadragon-extension/SettingsDialogue.ts ***!
  \***********************************************************************/
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
        var _this = this;
        this.setConfig('settingsDialogue');
        _super.prototype.create.call(this);
        this.$navigatorEnabled = $('<div class="setting navigatorEnabled"></div>');
        this.$scroll.append(this.$navigatorEnabled);
        // todo: use .checkboxButton jquery extension
        this.$navigatorEnabledCheckbox = $('<input id="navigatorEnabled" type="checkbox" tabindex="0" />');
        this.$navigatorEnabled.append(this.$navigatorEnabledCheckbox);
        this.$navigatorEnabledLabel = $('<label for="navigatorEnabled">' + this.content.navigatorEnabled + '</label>');
        this.$navigatorEnabled.append(this.$navigatorEnabledLabel);
        this.$pagingEnabled = $('<div class="setting pagingEnabled"></div>');
        this.$scroll.append(this.$pagingEnabled);
        this.$pagingEnabledCheckbox = $('<input id="pagingEnabled" type="checkbox" tabindex="0" />');
        this.$pagingEnabled.append(this.$pagingEnabledCheckbox);
        this.$pagingEnabledLabel = $('<label for="pagingEnabled">' + this.content.pagingEnabled + '</label>');
        this.$pagingEnabled.append(this.$pagingEnabledLabel);
        this.$clickToZoomEnabled = $('<div class="setting clickToZoom"></div>');
        this.$scroll.append(this.$clickToZoomEnabled);
        this.$clickToZoomEnabledCheckbox = $('<input id="clickToZoomEnabled" type="checkbox" />');
        this.$clickToZoomEnabled.append(this.$clickToZoomEnabledCheckbox);
        this.$clickToZoomEnabledLabel = $('<label for="clickToZoomEnabled">' + this.content.clickToZoomEnabled + '</label>');
        this.$clickToZoomEnabled.append(this.$clickToZoomEnabledLabel);
        this.$preserveViewport = $('<div class="setting preserveViewport"></div>');
        this.$scroll.append(this.$preserveViewport);
        this.$preserveViewportCheckbox = $('<input id="preserveViewport" type="checkbox" tabindex="0" />');
        this.$preserveViewport.append(this.$preserveViewportCheckbox);
        this.$preserveViewportLabel = $('<label for="preserveViewport">' + this.content.preserveViewport + '</label>');
        this.$preserveViewport.append(this.$preserveViewportLabel);
        this.$navigatorEnabledCheckbox.change(function () {
            var settings = {};
            if (_this.$navigatorEnabledCheckbox.is(":checked")) {
                settings.navigatorEnabled = true;
            }
            else {
                settings.navigatorEnabled = false;
            }
            _this.updateSettings(settings);
        });
        this.$clickToZoomEnabledCheckbox.change(function () {
            var settings = {};
            if (_this.$clickToZoomEnabledCheckbox.is(":checked")) {
                settings.clickToZoomEnabled = true;
            }
            else {
                settings.clickToZoomEnabled = false;
            }
            _this.updateSettings(settings);
        });
        this.$pagingEnabledCheckbox.change(function () {
            var settings = {};
            if (_this.$pagingEnabledCheckbox.is(":checked")) {
                settings.pagingEnabled = true;
            }
            else {
                settings.pagingEnabled = false;
            }
            _this.updateSettings(settings);
        });
        this.$preserveViewportCheckbox.change(function () {
            var settings = {};
            if (_this.$preserveViewportCheckbox.is(":checked")) {
                settings.preserveViewport = true;
            }
            else {
                settings.preserveViewport = false;
            }
            _this.updateSettings(settings);
        });
    };
    SettingsDialogue.prototype.open = function () {
        _super.prototype.open.call(this);
        var settings = this.getSettings();
        if (settings.navigatorEnabled) {
            this.$navigatorEnabledCheckbox.prop("checked", true);
        }
        else {
            this.$navigatorEnabledCheckbox.removeAttr("checked");
        }
        if (settings.clickToZoomEnabled) {
            this.$clickToZoomEnabledCheckbox.prop("checked", true);
        }
        else {
            this.$clickToZoomEnabledCheckbox.removeAttr("checked");
        }
        if (!this.extension.helper.isPagingAvailable()) {
            this.$pagingEnabled.hide();
        }
        else {
            if (settings.pagingEnabled) {
                this.$pagingEnabledCheckbox.prop("checked", true);
            }
            else {
                this.$pagingEnabledCheckbox.removeAttr("checked");
            }
        }
        if (settings.preserveViewport) {
            this.$preserveViewportCheckbox.prop("checked", true);
        }
        else {
            this.$preserveViewportCheckbox.removeAttr("checked");
        }
    };
    return SettingsDialogue;
}(_modules_uv_dialogues_module_SettingsDialogue__WEBPACK_IMPORTED_MODULE_0__["SettingsDialogue"]));



/***/ }),

/***/ "./src/extensions/uv-openseadragon-extension/ShareDialogue.ts":
/*!********************************************************************!*\
  !*** ./src/extensions/uv-openseadragon-extension/ShareDialogue.ts ***!
  \********************************************************************/
/*! exports provided: ShareDialogue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShareDialogue", function() { return ShareDialogue; });
/* harmony import */ var _Events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Events */ "./src/extensions/uv-openseadragon-extension/Events.ts");
/* harmony import */ var _modules_uv_dialogues_module_ShareDialogue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../modules/uv-dialogues-module/ShareDialogue */ "./src/modules/uv-dialogues-module/ShareDialogue.ts");
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
        _this.component.subscribe(_Events__WEBPACK_IMPORTED_MODULE_0__["Events"].OPENSEADRAGON_OPEN, function () {
            _this.update();
        });
        _this.component.subscribe(_Events__WEBPACK_IMPORTED_MODULE_0__["Events"].OPENSEADRAGON_ANIMATION_FINISH, function () {
            _this.update();
        });
        return _this;
    }
    ShareDialogue.prototype.create = function () {
        this.setConfig('shareDialogue');
        _super.prototype.create.call(this);
    };
    ShareDialogue.prototype.update = function () {
        _super.prototype.update.call(this);
        var xywh = this.extension.getViewportBounds();
        var rotation = this.extension.getViewerRotation();
        this.code = this.extension.getEmbedScript(this.options.embedTemplate, this.currentWidth, this.currentHeight, xywh, rotation);
        this.$code.val(this.code);
    };
    ShareDialogue.prototype.resize = function () {
        _super.prototype.resize.call(this);
    };
    return ShareDialogue;
}(_modules_uv_dialogues_module_ShareDialogue__WEBPACK_IMPORTED_MODULE_1__["ShareDialogue"]));



/***/ }),

/***/ "./src/modules/uv-dialogues-module/ExternalContentDialogue.ts":
/*!********************************************************************!*\
  !*** ./src/modules/uv-dialogues-module/ExternalContentDialogue.ts ***!
  \********************************************************************/
/*! exports provided: ExternalContentDialogue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExternalContentDialogue", function() { return ExternalContentDialogue; });
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


var ExternalContentDialogue = /** @class */ (function (_super) {
    __extends(ExternalContentDialogue, _super);
    function ExternalContentDialogue($element) {
        return _super.call(this, $element) || this;
    }
    ExternalContentDialogue.prototype.create = function () {
        var _this = this;
        this.setConfig('externalContentDialogue');
        _super.prototype.create.call(this);
        this.openCommand = _uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].SHOW_EXTERNALCONTENT_DIALOGUE;
        this.closeCommand = _uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].HIDE_EXTERNALCONTENT_DIALOGUE;
        this.component.subscribe(this.openCommand, function (params) {
            _this.open();
            _this.$iframe.prop('src', params.uri);
        });
        this.component.subscribe(this.closeCommand, function () {
            _this.close();
        });
        this.$iframe = $('<iframe></iframe>');
        this.$content.append(this.$iframe);
        this.$element.hide();
    };
    ExternalContentDialogue.prototype.resize = function () {
        _super.prototype.resize.call(this);
        this.$iframe.width(this.$content.width());
        this.$iframe.height(this.$content.height());
    };
    return ExternalContentDialogue;
}(_uv_shared_module_Dialogue__WEBPACK_IMPORTED_MODULE_1__["Dialogue"]));



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

/***/ "./src/modules/uv-dialogues-module/MoreInfoDialogue.ts":
/*!*************************************************************!*\
  !*** ./src/modules/uv-dialogues-module/MoreInfoDialogue.ts ***!
  \*************************************************************/
/*! exports provided: MoreInfoDialogue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MoreInfoDialogue", function() { return MoreInfoDialogue; });
/* harmony import */ var _uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../uv-shared-module/BaseEvents */ "./src/modules/uv-shared-module/BaseEvents.ts");
/* harmony import */ var _uv_shared_module_Dialogue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../uv-shared-module/Dialogue */ "./src/modules/uv-shared-module/Dialogue.ts");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Utils */ "./src/Utils.ts");
/* harmony import */ var _edsilv_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @edsilv/utils */ "./node_modules/@edsilv/utils/dist-esmodule/index.js");
/* harmony import */ var _iiif_iiif_metadata_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @iiif/iiif-metadata-component */ "./node_modules/@iiif/iiif-metadata-component/dist-umd/IIIFMetadataComponent.js");
/* harmony import */ var _iiif_iiif_metadata_component__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_iiif_iiif_metadata_component__WEBPACK_IMPORTED_MODULE_4__);
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





var MoreInfoDialogue = /** @class */ (function (_super) {
    __extends(MoreInfoDialogue, _super);
    function MoreInfoDialogue($element) {
        return _super.call(this, $element) || this;
    }
    MoreInfoDialogue.prototype.create = function () {
        var _this = this;
        this.setConfig('moreInfoDialogue');
        _super.prototype.create.call(this);
        this.openCommand = _uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].SHOW_MOREINFO_DIALOGUE;
        this.closeCommand = _uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].HIDE_MOREINFO_DIALOGUE;
        this.component.subscribe(this.openCommand, function (triggerButton) {
            _this.open(triggerButton);
        });
        this.component.subscribe(this.closeCommand, function () {
            _this.close();
        });
        this.config.content = this.extension.data.config.modules.moreInfoRightPanel.content;
        this.config.options = this.extension.data.config.modules.moreInfoRightPanel.options;
        // create ui
        this.$title = $('<h1>' + this.config.content.title + '</h1>');
        this.$content.append(this.$title);
        this.$metadata = $('<div class="iiif-metadata-component"></div>');
        this.$content.append(this.$metadata);
        this.metadataComponent = new _iiif_iiif_metadata_component__WEBPACK_IMPORTED_MODULE_4__["MetadataComponent"]({
            target: this.$metadata[0]
        });
        // hide
        this.$element.hide();
    };
    MoreInfoDialogue.prototype.open = function (triggerButton) {
        _super.prototype.open.call(this, triggerButton);
        this.metadataComponent.set(this._getData());
    };
    MoreInfoDialogue.prototype._getData = function () {
        return {
            canvasDisplayOrder: this.config.options.canvasDisplayOrder,
            canvases: this.extension.getCurrentCanvases(),
            canvasExclude: this.config.options.canvasExclude,
            canvasLabels: this.extension.getCanvasLabels(this.content.page),
            content: this.config.content,
            copiedMessageDuration: 2000,
            copyToClipboardEnabled: _edsilv_utils__WEBPACK_IMPORTED_MODULE_3__["Bools"].getBool(this.config.options.copyToClipboardEnabled, false),
            helper: this.extension.helper,
            licenseFormatter: null,
            limit: this.config.options.textLimit || 4,
            limitType: _iiif_iiif_metadata_component__WEBPACK_IMPORTED_MODULE_4__["LimitType"].LINES,
            manifestDisplayOrder: this.config.options.manifestDisplayOrder,
            manifestExclude: this.config.options.manifestExclude,
            range: this.extension.getCurrentCanvasRange(),
            rtlLanguageCodes: this.config.options.rtlLanguageCodes,
            sanitizer: function (html) {
                return Object(_Utils__WEBPACK_IMPORTED_MODULE_2__["sanitize"])(html);
            },
            showAllLanguages: this.config.options.showAllLanguages
        };
    };
    MoreInfoDialogue.prototype.close = function () {
        _super.prototype.close.call(this);
    };
    MoreInfoDialogue.prototype.resize = function () {
        this.setDockedPosition();
    };
    return MoreInfoDialogue;
}(_uv_shared_module_Dialogue__WEBPACK_IMPORTED_MODULE_1__["Dialogue"]));



/***/ }),

/***/ "./src/modules/uv-multiselectdialogue-module/MultiSelectDialogue.ts":
/*!**************************************************************************!*\
  !*** ./src/modules/uv-multiselectdialogue-module/MultiSelectDialogue.ts ***!
  \**************************************************************************/
/*! exports provided: MultiSelectDialogue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MultiSelectDialogue", function() { return MultiSelectDialogue; });
/* harmony import */ var _modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../modules/uv-shared-module/BaseEvents */ "./src/modules/uv-shared-module/BaseEvents.ts");
/* harmony import */ var _modules_uv_shared_module_Dialogue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../modules/uv-shared-module/Dialogue */ "./src/modules/uv-shared-module/Dialogue.ts");
/* harmony import */ var _extensions_uv_openseadragon_extension_Mode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../extensions/uv-openseadragon-extension/Mode */ "./src/extensions/uv-openseadragon-extension/Mode.ts");
/* harmony import */ var _edsilv_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @edsilv/utils */ "./node_modules/@edsilv/utils/dist-esmodule/index.js");
/* harmony import */ var _iiif_iiif_gallery_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @iiif/iiif-gallery-component */ "./node_modules/@iiif/iiif-gallery-component/dist-esmodule/index.js");
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





var MultiSelectDialogue = /** @class */ (function (_super) {
    __extends(MultiSelectDialogue, _super);
    function MultiSelectDialogue($element) {
        return _super.call(this, $element) || this;
    }
    MultiSelectDialogue.prototype.create = function () {
        var _this = this;
        this.setConfig('multiSelectDialogue');
        _super.prototype.create.call(this);
        var that = this;
        this.openCommand = _modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].SHOW_MULTISELECT_DIALOGUE;
        this.closeCommand = _modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].HIDE_MULTISELECT_DIALOGUE;
        this.component.subscribe(this.openCommand, function () {
            _this.open();
            var multiSelectState = _this.extension.helper.getMultiSelectState();
            multiSelectState.setEnabled(true);
            _this.galleryComponent.set(_this.data);
        });
        this.component.subscribe(this.closeCommand, function () {
            _this.close();
            var multiSelectState = _this.extension.helper.getMultiSelectState();
            multiSelectState.setEnabled(false);
        });
        this.$title = $('<h1></h1>');
        this.$content.append(this.$title);
        this.$title.text(this.content.title);
        this.$gallery = $('<div class="iiif-gallery-component"></div>');
        this.$content.append(this.$gallery);
        this.data = {
            helper: this.extension.helper,
            chunkedResizingThreshold: this.config.options.galleryThumbChunkedResizingThreshold,
            content: this.config.content,
            debug: false,
            imageFadeInDuration: 300,
            initialZoom: 4,
            minLabelWidth: 20,
            pageModeEnabled: this.isPageModeEnabled(),
            searchResults: [],
            scrollStopDuration: 100,
            sizingEnabled: true,
            thumbHeight: this.config.options.galleryThumbHeight,
            thumbLoadPadding: this.config.options.galleryThumbLoadPadding,
            thumbWidth: this.config.options.galleryThumbWidth,
            viewingDirection: this.extension.helper.getViewingDirection()
        };
        this.galleryComponent = new _iiif_iiif_gallery_component__WEBPACK_IMPORTED_MODULE_4__["GalleryComponent"]({
            target: this.$gallery[0]
        });
        var $selectButton = this.$gallery.find('a.select');
        $selectButton.addClass('btn btn-primary');
        this.galleryComponent.on('multiSelectionMade', function (ids) {
            _this.component.publish(_modules_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].MULTISELECTION_MADE, ids);
            that.close();
        }, false);
        this.$element.hide();
    };
    MultiSelectDialogue.prototype.isPageModeEnabled = function () {
        return _edsilv_utils__WEBPACK_IMPORTED_MODULE_3__["Bools"].getBool(this.config.options.pageModeEnabled, true) && this.extension.getMode().toString() === _extensions_uv_openseadragon_extension_Mode__WEBPACK_IMPORTED_MODULE_2__["Mode"].page.toString();
    };
    MultiSelectDialogue.prototype.open = function () {
        _super.prototype.open.call(this);
    };
    MultiSelectDialogue.prototype.close = function () {
        _super.prototype.close.call(this);
    };
    MultiSelectDialogue.prototype.resize = function () {
        _super.prototype.resize.call(this);
        var $main = this.$gallery.find('.main');
        var $header = this.$gallery.find('.header');
        $main.height(this.$content.height() - this.$title.outerHeight() - this.$title.verticalMargins() - $header.height());
    };
    return MultiSelectDialogue;
}(_modules_uv_shared_module_Dialogue__WEBPACK_IMPORTED_MODULE_1__["Dialogue"]));



/***/ }),

/***/ "./src/modules/uv-openseadragoncenterpanel-module/OpenSeadragonCenterPanel.ts":
/*!************************************************************************************!*\
  !*** ./src/modules/uv-openseadragoncenterpanel-module/OpenSeadragonCenterPanel.ts ***!
  \************************************************************************************/
/*! exports provided: OpenSeadragonCenterPanel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OpenSeadragonCenterPanel", function() { return OpenSeadragonCenterPanel; });
/* harmony import */ var _uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../uv-shared-module/BaseEvents */ "./src/modules/uv-shared-module/BaseEvents.ts");
/* harmony import */ var _extensions_uv_openseadragon_extension_Bounds__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../extensions/uv-openseadragon-extension/Bounds */ "./src/extensions/uv-openseadragon-extension/Bounds.ts");
/* harmony import */ var _uv_shared_module_CenterPanel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../uv-shared-module/CenterPanel */ "./src/modules/uv-shared-module/CenterPanel.ts");
/* harmony import */ var _extensions_uv_openseadragon_extension_Events__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../extensions/uv-openseadragon-extension/Events */ "./src/extensions/uv-openseadragon-extension/Events.ts");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Utils */ "./src/Utils.ts");
/* harmony import */ var _edsilv_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @edsilv/utils */ "./node_modules/@edsilv/utils/dist-esmodule/index.js");
/* harmony import */ var _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @iiif/vocabulary */ "./node_modules/@iiif/vocabulary/dist-esmodule/index.js");
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







var OpenSeadragonCenterPanel = /** @class */ (function (_super) {
    __extends(OpenSeadragonCenterPanel, _super);
    function OpenSeadragonCenterPanel($element) {
        var _this = _super.call(this, $element) || this;
        _this.controlsVisible = false;
        _this.isCreated = false;
        _this.isFirstLoad = true;
        _this.navigatedFromSearch = false;
        _this.nextButtonEnabled = false;
        _this.prevButtonEnabled = false;
        return _this;
    }
    OpenSeadragonCenterPanel.prototype.create = function () {
        var _this = this;
        this.setConfig('openSeadragonCenterPanel');
        _super.prototype.create.call(this);
        this.viewerId = "osd" + new Date().getTime();
        this.$viewer = $('<div id="' + this.viewerId + '" class="viewer"></div>');
        this.$content.prepend(this.$viewer);
        this.component.subscribe(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].ANNOTATIONS, function (args) {
            _this.overlayAnnotations();
            _this.zoomToInitialAnnotation();
        });
        this.component.subscribe(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].SETTINGS_CHANGED, function (args) {
            _this.viewer.gestureSettingsMouse.clickToZoom = args.clickToZoomEnabled;
        });
        this.component.subscribe(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].OPEN_EXTERNAL_RESOURCE, function (resources) {
            _this.whenResized(function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.isCreated)
                                this.createUI();
                            return [4 /*yield*/, this.openMedia(resources)];
                        case 1:
                            _a.sent();
                            this.component.publish(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].OPENED_MEDIA);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        this.component.subscribe(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].CLEAR_ANNOTATIONS, function () {
            _this.whenCreated(function () {
                _this.extension.currentAnnotationRect = null;
                _this.clearAnnotations();
            });
        });
        this.component.subscribe(_extensions_uv_openseadragon_extension_Events__WEBPACK_IMPORTED_MODULE_3__["Events"].NEXT_SEARCH_RESULT, function () {
            _this.whenCreated(function () {
                _this.nextAnnotation();
            });
        });
        this.component.subscribe(_extensions_uv_openseadragon_extension_Events__WEBPACK_IMPORTED_MODULE_3__["Events"].PREV_SEARCH_RESULT, function () {
            _this.whenCreated(function () {
                _this.prevAnnotation();
            });
        });
        this.component.subscribe(_extensions_uv_openseadragon_extension_Events__WEBPACK_IMPORTED_MODULE_3__["Events"].ZOOM_IN, function () {
            _this.whenCreated(function () {
                _this.zoomIn();
            });
        });
        this.component.subscribe(_extensions_uv_openseadragon_extension_Events__WEBPACK_IMPORTED_MODULE_3__["Events"].ZOOM_OUT, function () {
            _this.whenCreated(function () {
                _this.zoomOut();
            });
        });
        this.component.subscribe(_extensions_uv_openseadragon_extension_Events__WEBPACK_IMPORTED_MODULE_3__["Events"].ROTATE, function () {
            _this.whenCreated(function () {
                _this.rotateRight();
            });
        });
        this.component.subscribe(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].METRIC_CHANGED, function () {
            _this.whenCreated(function () {
                _this.updateResponsiveView();
            });
        });
    };
    OpenSeadragonCenterPanel.prototype.whenCreated = function (cb) {
        var _this = this;
        _edsilv_utils__WEBPACK_IMPORTED_MODULE_5__["Async"].waitFor(function () {
            return _this.isCreated;
        }, cb);
    };
    OpenSeadragonCenterPanel.prototype.zoomIn = function () {
        this.viewer.viewport.zoomTo(this.viewer.viewport.getZoom(true) * 2);
    };
    OpenSeadragonCenterPanel.prototype.zoomOut = function () {
        this.viewer.viewport.zoomTo(this.viewer.viewport.getZoom(true) * 0.5);
    };
    OpenSeadragonCenterPanel.prototype.rotateRight = function () {
        this.viewer.viewport.setRotation(this.viewer.viewport.getRotation() + 90);
    };
    OpenSeadragonCenterPanel.prototype.updateResponsiveView = function () {
        this.setNavigatorVisible();
        if (!this.extension.isDesktopMetric()) {
            this.viewer.autoHideControls = false;
            this.$viewportNavButtons.hide();
        }
        else {
            this.viewer.autoHideControls = true;
            this.$viewportNavButtons.show();
        }
    };
    OpenSeadragonCenterPanel.prototype.createUI = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.$spinner = $('<div class="spinner"></div>');
                        this.$content.append(this.$spinner);
                        return [4 /*yield*/, Promise.resolve(/*! import() eager */).then(__webpack_require__.t.bind(null, /*! openseadragon */ "./node_modules/openseadragon/build/openseadragon/openseadragon.js", 7))];
                    case 1:
                        _a.sent();
                        this.viewer = OpenSeadragon({
                            id: this.viewerId,
                            ajaxWithCredentials: false,
                            showNavigationControl: true,
                            showNavigator: true,
                            showRotationControl: true,
                            showHomeControl: _edsilv_utils__WEBPACK_IMPORTED_MODULE_5__["Bools"].getBool(this.config.options.showHomeControl, false),
                            showFullPageControl: false,
                            defaultZoomLevel: this.config.options.defaultZoomLevel || 0,
                            maxZoomPixelRatio: this.config.options.maxZoomPixelRatio || 2,
                            controlsFadeDelay: this.config.options.controlsFadeDelay || 250,
                            controlsFadeLength: this.config.options.controlsFadeLength || 250,
                            navigatorPosition: this.config.options.navigatorPosition || "BOTTOM_RIGHT",
                            animationTime: this.config.options.animationTime || 1.2,
                            visibilityRatio: this.config.options.visibilityRatio || 0.5,
                            constrainDuringPan: _edsilv_utils__WEBPACK_IMPORTED_MODULE_5__["Bools"].getBool(this.config.options.constrainDuringPan, false),
                            immediateRender: _edsilv_utils__WEBPACK_IMPORTED_MODULE_5__["Bools"].getBool(this.config.options.immediateRender, false),
                            blendTime: this.config.options.blendTime || 0,
                            autoHideControls: _edsilv_utils__WEBPACK_IMPORTED_MODULE_5__["Bools"].getBool(this.config.options.autoHideControls, true),
                            prefixUrl: this.extension.data.root + '/img/',
                            gestureSettingsMouse: {
                                clickToZoom: _edsilv_utils__WEBPACK_IMPORTED_MODULE_5__["Bools"].getBool(this.extension.data.config.options.clickToZoomEnabled, true)
                            },
                            navImages: {
                                zoomIn: {
                                    REST: 'pixel.gif',
                                    GROUP: 'pixel.gif',
                                    HOVER: 'pixel.gif',
                                    DOWN: 'pixel.gif'
                                },
                                zoomOut: {
                                    REST: 'pixel.gif',
                                    GROUP: 'pixel.gif',
                                    HOVER: 'pixel.gif',
                                    DOWN: 'pixel.gif'
                                },
                                home: {
                                    REST: 'pixel.gif',
                                    GROUP: 'pixel.gif',
                                    HOVER: 'pixel.gif',
                                    DOWN: 'pixel.gif'
                                },
                                rotateright: {
                                    REST: 'pixel.gif',
                                    GROUP: 'pixel.gif',
                                    HOVER: 'pixel.gif',
                                    DOWN: 'pixel.gif'
                                },
                                rotateleft: {
                                    REST: 'pixel.gif',
                                    GROUP: 'pixel.gif',
                                    HOVER: 'pixel.gif',
                                    DOWN: 'pixel.gif'
                                },
                                next: {
                                    REST: 'pixel.gif',
                                    GROUP: 'pixel.gif',
                                    HOVER: 'pixel.gif',
                                    DOWN: 'pixel.gif'
                                },
                                previous: {
                                    REST: 'pixel.gif',
                                    GROUP: 'pixel.gif',
                                    HOVER: 'pixel.gif',
                                    DOWN: 'pixel.gif'
                                }
                            }
                        });
                        this.$zoomInButton = this.$viewer.find('div[title="Zoom in"]');
                        this.$zoomInButton.attr('tabindex', 0);
                        this.$zoomInButton.prop('title', this.content.zoomIn);
                        this.$zoomInButton.addClass('zoomIn viewportNavButton');
                        this.$zoomOutButton = this.$viewer.find('div[title="Zoom out"]');
                        this.$zoomOutButton.attr('tabindex', 0);
                        this.$zoomOutButton.prop('title', this.content.zoomOut);
                        this.$zoomOutButton.addClass('zoomOut viewportNavButton');
                        this.$goHomeButton = this.$viewer.find('div[title="Go home"]');
                        this.$goHomeButton.attr('tabindex', 0);
                        this.$goHomeButton.prop('title', this.content.goHome);
                        this.$goHomeButton.addClass('goHome viewportNavButton');
                        this.$rotateButton = this.$viewer.find('div[title="Rotate right"]');
                        this.$rotateButton.attr('tabindex', 0);
                        this.$rotateButton.prop('title', this.content.rotateRight);
                        this.$rotateButton.addClass('rotate viewportNavButton');
                        this.$viewportNavButtonsContainer = this.$viewer.find('.openseadragon-container > div:not(.openseadragon-canvas):first');
                        this.$viewportNavButtons = this.$viewportNavButtonsContainer.find('.viewportNavButton');
                        this.$canvas = $(this.viewer.canvas);
                        // disable right click on canvas
                        this.$canvas.on('contextmenu', function () { return false; });
                        this.$navigator = this.$viewer.find(".navigator");
                        this.setNavigatorVisible();
                        // events
                        this.$element.on('mousemove', function () {
                            if (_this.controlsVisible)
                                return;
                            _this.controlsVisible = true;
                            _this.viewer.setControlsEnabled(true);
                        });
                        this.$element.on('mouseleave', function () {
                            if (!_this.controlsVisible)
                                return;
                            _this.controlsVisible = false;
                            _this.viewer.setControlsEnabled(false);
                        });
                        // when mouse move stopped
                        this.$element.on('mousemove', function () {
                            // if over element, hide controls.
                            // When over prev/next buttons keep controls enabled
                            if (_this.$prevButton.ismouseover()) {
                                return;
                            }
                            if (_this.$nextButton.ismouseover()) {
                                return;
                            }
                            if (!_this.$viewer.find('.navigator').ismouseover()) {
                                if (!_this.controlsVisible)
                                    return;
                                _this.controlsVisible = false;
                                _this.viewer.setControlsEnabled(false);
                            }
                        }, this.config.options.controlsFadeAfterInactive);
                        this.viewer.addHandler('tile-drawn', function () {
                            _this.$spinner.hide();
                        });
                        //this.viewer.addHandler("open-failed", () => {
                        //});
                        this.viewer.addHandler('resize', function (viewer) {
                            _this.component.publish(_extensions_uv_openseadragon_extension_Events__WEBPACK_IMPORTED_MODULE_3__["Events"].OPENSEADRAGON_RESIZE, viewer);
                            _this.viewerResize(viewer);
                        });
                        this.viewer.addHandler('animation-start', function (viewer) {
                            _this.component.publish(_extensions_uv_openseadragon_extension_Events__WEBPACK_IMPORTED_MODULE_3__["Events"].OPENSEADRAGON_ANIMATION_START, viewer);
                        });
                        this.viewer.addHandler('animation', function (viewer) {
                            _this.component.publish(_extensions_uv_openseadragon_extension_Events__WEBPACK_IMPORTED_MODULE_3__["Events"].OPENSEADRAGON_ANIMATION, viewer);
                        });
                        this.viewer.addHandler('animation-finish', function (viewer) {
                            _this.currentBounds = _this.getViewportBounds();
                            _this.updateVisibleAnnotationRects();
                            _this.component.publish(_extensions_uv_openseadragon_extension_Events__WEBPACK_IMPORTED_MODULE_3__["Events"].OPENSEADRAGON_ANIMATION_FINISH, viewer);
                        });
                        this.viewer.addHandler('rotate', function (args) {
                            _this.component.publish(_extensions_uv_openseadragon_extension_Events__WEBPACK_IMPORTED_MODULE_3__["Events"].OPENSEADRAGON_ROTATION, args.degrees);
                        });
                        this.title = this.extension.helper.getLabel();
                        this.createNavigationButtons();
                        this.hidePrevButton();
                        this.hideNextButton();
                        this.isCreated = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    OpenSeadragonCenterPanel.prototype.createNavigationButtons = function () {
        var _this = this;
        var viewingDirection = this.extension.helper.getViewingDirection() || _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_6__["ViewingDirection"].LEFT_TO_RIGHT;
        this.$prevButton = $('<div class="paging btn prev" tabindex="0"></div>');
        if (this.extension.helper.isRightToLeft()) {
            this.$prevButton.prop('title', this.content.next);
        }
        else {
            this.$prevButton.prop('title', this.content.previous);
        }
        this.$nextButton = $('<div class="paging btn next" tabindex="0"></div>');
        if (this.extension.helper.isRightToLeft()) {
            this.$nextButton.prop('title', this.content.previous);
        }
        else {
            this.$nextButton.prop('title', this.content.next);
        }
        this.viewer.addControl(this.$prevButton[0], { anchor: OpenSeadragon.ControlAnchor.TOP_LEFT });
        this.viewer.addControl(this.$nextButton[0], { anchor: OpenSeadragon.ControlAnchor.TOP_RIGHT });
        switch (viewingDirection) {
            case _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_6__["ViewingDirection"].BOTTOM_TO_TOP:
            case _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_6__["ViewingDirection"].TOP_TO_BOTTOM:
                this.$prevButton.addClass('vertical');
                this.$nextButton.addClass('vertical');
                ;
                break;
        }
        var that = this;
        this.$prevButton.onPressed(function (e) {
            e.preventDefault();
            OpenSeadragon.cancelEvent(e);
            if (!that.prevButtonEnabled)
                return;
            switch (viewingDirection) {
                case _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_6__["ViewingDirection"].LEFT_TO_RIGHT:
                case _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_6__["ViewingDirection"].BOTTOM_TO_TOP:
                case _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_6__["ViewingDirection"].TOP_TO_BOTTOM:
                    _this.component.publish(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].PREV);
                    break;
                case _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_6__["ViewingDirection"].RIGHT_TO_LEFT:
                    _this.component.publish(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].NEXT);
                    break;
            }
        });
        this.$nextButton.onPressed(function (e) {
            e.preventDefault();
            OpenSeadragon.cancelEvent(e);
            if (!that.nextButtonEnabled)
                return;
            switch (viewingDirection) {
                case _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_6__["ViewingDirection"].LEFT_TO_RIGHT:
                case _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_6__["ViewingDirection"].BOTTOM_TO_TOP:
                case _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_6__["ViewingDirection"].TOP_TO_BOTTOM:
                    _this.component.publish(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].NEXT);
                    break;
                case _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_6__["ViewingDirection"].RIGHT_TO_LEFT:
                    _this.component.publish(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].PREV);
                    break;
            }
        });
        // When Prev/Next buttons are focused, make sure the controls are enabled
        this.$prevButton.on('focus', function () {
            if (_this.controlsVisible)
                return;
            _this.controlsVisible = true;
            _this.viewer.setControlsEnabled(true);
        });
        this.$nextButton.on('focus', function () {
            if (_this.controlsVisible)
                return;
            _this.controlsVisible = true;
            _this.viewer.setControlsEnabled(true);
        });
    };
    OpenSeadragonCenterPanel.prototype.openMedia = function (resources) {
        return __awaiter(this, void 0, void 0, function () {
            var images, i, data, tileSource;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.$spinner.show();
                        this.items = [];
                        return [4 /*yield*/, this.extension.getExternalResources(resources)];
                    case 1:
                        images = _a.sent();
                        this.viewer.close();
                        images = this.getPagePositions(images);
                        for (i = 0; i < images.length; i++) {
                            data = images[i];
                            tileSource = void 0;
                            if (data.hasServiceDescriptor) {
                                tileSource = data;
                            }
                            else {
                                tileSource = {
                                    type: 'image',
                                    url: data.id,
                                    buildPyramid: false
                                };
                            }
                            this.viewer.addTiledImage({
                                tileSource: tileSource,
                                x: data.x,
                                y: data.y,
                                width: data.width,
                                success: function (item) {
                                    _this.items.push(item);
                                    if (_this.items.length === images.length) {
                                        _this.openPagesHandler();
                                    }
                                    _this.resize();
                                }
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    OpenSeadragonCenterPanel.prototype.getPagePositions = function (resources) {
        var leftPage;
        var rightPage;
        var topPage;
        var bottomPage;
        var page;
        var nextPage;
        // if there's more than one image, determine alignment strategy
        if (resources.length > 1) {
            if (resources.length === 2) {
                // recto verso
                if (this.extension.helper.isVerticallyAligned()) {
                    // vertical alignment
                    topPage = resources[0];
                    topPage.y = 0;
                    bottomPage = resources[1];
                    bottomPage.y = topPage.height + this.config.options.pageGap;
                }
                else {
                    // horizontal alignment
                    leftPage = resources[0];
                    leftPage.x = 0;
                    rightPage = resources[1];
                    rightPage.x = leftPage.width + this.config.options.pageGap;
                }
            }
            else {
                // scroll
                if (this.extension.helper.isVerticallyAligned()) {
                    // vertical alignment
                    if (this.extension.helper.isTopToBottom()) {
                        // top to bottom
                        for (var i = 0; i < resources.length - 1; i++) {
                            page = resources[i];
                            nextPage = resources[i + 1];
                            nextPage.y = (page.y || 0) + page.height;
                            ;
                        }
                    }
                    else {
                        // bottom to top
                        for (var i = resources.length; i > 0; i--) {
                            page = resources[i];
                            nextPage = resources[i - 1];
                            nextPage.y = (page.y || 0) - page.height;
                        }
                    }
                }
                else {
                    // horizontal alignment
                    if (this.extension.helper.isLeftToRight()) {
                        // left to right
                        for (var i = 0; i < resources.length - 1; i++) {
                            page = resources[i];
                            nextPage = resources[i + 1];
                            nextPage.x = (page.x || 0) + page.width;
                        }
                    }
                    else {
                        // right to left
                        for (var i = resources.length - 1; i > 0; i--) {
                            page = resources[i];
                            nextPage = resources[i - 1];
                            nextPage.x = (page.x || 0) - page.width;
                        }
                    }
                }
            }
        }
        return resources;
    };
    OpenSeadragonCenterPanel.prototype.openPagesHandler = function () {
        this.component.publish(_extensions_uv_openseadragon_extension_Events__WEBPACK_IMPORTED_MODULE_3__["Events"].OPENSEADRAGON_OPEN);
        if (this.extension.helper.isMultiCanvas() && !this.extension.helper.isContinuous()) {
            this.showPrevButton();
            this.showNextButton();
            $('.navigator').addClass('extraMargin');
            var viewingDirection = this.extension.helper.getViewingDirection() || _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_6__["ViewingDirection"].LEFT_TO_RIGHT;
            if (viewingDirection === _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_6__["ViewingDirection"].RIGHT_TO_LEFT) {
                if (this.extension.helper.isFirstCanvas()) {
                    this.disableNextButton();
                }
                else {
                    this.enableNextButton();
                }
                if (this.extension.helper.isLastCanvas()) {
                    this.disablePrevButton();
                }
                else {
                    this.enablePrevButton();
                }
            }
            else {
                if (this.extension.helper.isFirstCanvas()) {
                    this.disablePrevButton();
                }
                else {
                    this.enablePrevButton();
                }
                if (this.extension.helper.isLastCanvas()) {
                    this.disableNextButton();
                }
                else {
                    this.enableNextButton();
                }
            }
        }
        this.setNavigatorVisible();
        this.overlayAnnotations();
        this.updateBounds();
        // this only happens if prev/next search result were clicked and caused a reload
        if (this.navigatedFromSearch) {
            this.navigatedFromSearch = false;
            this.zoomToInitialAnnotation();
        }
        this.isFirstLoad = false;
    };
    OpenSeadragonCenterPanel.prototype.zoomToInitialAnnotation = function () {
        var annotationRect = this.getInitialAnnotationRect();
        this.extension.previousAnnotationRect = null;
        this.extension.currentAnnotationRect = null;
        if (annotationRect && this.isZoomToSearchResultEnabled()) {
            this.zoomToAnnotation(annotationRect);
        }
    };
    OpenSeadragonCenterPanel.prototype.overlayAnnotations = function () {
        var annotations = this.getAnnotationsForCurrentImages();
        for (var i = 0; i < annotations.length; i++) {
            var annotation = annotations[i];
            var overlayRects = this.getAnnotationOverlayRects(annotation);
            for (var k = 0; k < overlayRects.length; k++) {
                var overlayRect = overlayRects[k];
                var div = document.createElement('div');
                div.id = 'searchResult-' + overlayRect.canvasIndex + '-' + overlayRect.resultIndex;
                div.className = 'searchOverlay';
                div.title = Object(_Utils__WEBPACK_IMPORTED_MODULE_4__["sanitize"])(overlayRect.chars);
                this.viewer.addOverlay(div, overlayRect);
            }
        }
    };
    OpenSeadragonCenterPanel.prototype.updateBounds = function () {
        var settings = this.extension.getSettings();
        // if this is the first load and there are initial bounds, fit to those.
        if (this.isFirstLoad) {
            this.initialRotation = this.extension.data.rotation;
            if (this.initialRotation) {
                this.viewer.viewport.setRotation(parseInt(this.initialRotation));
            }
            this.initialBounds = this.extension.data.xywh;
            if (this.initialBounds) {
                this.initialBounds = _extensions_uv_openseadragon_extension_Bounds__WEBPACK_IMPORTED_MODULE_1__["Bounds"].fromString(this.initialBounds);
                this.currentBounds = this.initialBounds;
                this.fitToBounds(this.currentBounds);
            }
        }
        else if (settings.preserveViewport) { // if this isn't the first load and preserveViewport is enabled, fit to the current bounds.
            this.fitToBounds(this.currentBounds);
        }
        else {
            this.goHome();
        }
    };
    OpenSeadragonCenterPanel.prototype.goHome = function () {
        this.viewer.viewport.goHome(true);
    };
    OpenSeadragonCenterPanel.prototype.disablePrevButton = function () {
        this.prevButtonEnabled = false;
        this.$prevButton.addClass('disabled');
    };
    OpenSeadragonCenterPanel.prototype.enablePrevButton = function () {
        this.prevButtonEnabled = true;
        this.$prevButton.removeClass('disabled');
    };
    OpenSeadragonCenterPanel.prototype.hidePrevButton = function () {
        this.disablePrevButton();
        this.$prevButton.hide();
    };
    OpenSeadragonCenterPanel.prototype.showPrevButton = function () {
        this.enablePrevButton();
        this.$prevButton.show();
    };
    OpenSeadragonCenterPanel.prototype.disableNextButton = function () {
        this.nextButtonEnabled = false;
        this.$nextButton.addClass('disabled');
    };
    OpenSeadragonCenterPanel.prototype.enableNextButton = function () {
        this.nextButtonEnabled = true;
        this.$nextButton.removeClass('disabled');
    };
    OpenSeadragonCenterPanel.prototype.hideNextButton = function () {
        this.disableNextButton();
        this.$nextButton.hide();
    };
    OpenSeadragonCenterPanel.prototype.showNextButton = function () {
        this.enableNextButton();
        this.$nextButton.show();
    };
    OpenSeadragonCenterPanel.prototype.fitToBounds = function (bounds, immediate) {
        if (immediate === void 0) { immediate = true; }
        var rect = new OpenSeadragon.Rect();
        rect.x = Number(bounds.x);
        rect.y = Number(bounds.y);
        rect.width = Number(bounds.w);
        rect.height = Number(bounds.h);
        this.viewer.viewport.fitBoundsWithConstraints(rect, immediate);
    };
    OpenSeadragonCenterPanel.prototype.getCroppedImageBounds = function () {
        if (!this.viewer || !this.viewer.viewport)
            return null;
        var canvas = this.extension.helper.getCurrentCanvas();
        var dimensions = this.extension.getCroppedImageDimensions(canvas, this.viewer);
        if (dimensions) {
            var bounds = new _extensions_uv_openseadragon_extension_Bounds__WEBPACK_IMPORTED_MODULE_1__["Bounds"](dimensions.regionPos.x, dimensions.regionPos.y, dimensions.region.width, dimensions.region.height);
            return bounds.toString();
        }
        return null;
    };
    OpenSeadragonCenterPanel.prototype.getViewportBounds = function () {
        if (!this.viewer || !this.viewer.viewport)
            return null;
        var b = this.viewer.viewport.getBounds(true);
        var bounds = new _extensions_uv_openseadragon_extension_Bounds__WEBPACK_IMPORTED_MODULE_1__["Bounds"](Math.floor(b.x), Math.floor(b.y), Math.floor(b.width), Math.floor(b.height));
        return bounds;
    };
    OpenSeadragonCenterPanel.prototype.viewerResize = function (viewer) {
        if (!viewer.viewport)
            return;
        var center = viewer.viewport.getCenter(true);
        if (!center)
            return;
        // postpone pan for a millisecond - fixes iPad image stretching/squashing issue.
        setTimeout(function () {
            viewer.viewport.panTo(center, true);
        }, 1);
    };
    OpenSeadragonCenterPanel.prototype.clearAnnotations = function () {
        this.$canvas.find('.searchOverlay').hide();
    };
    OpenSeadragonCenterPanel.prototype.getAnnotationsForCurrentImages = function () {
        var annotationsForCurrentImages = [];
        var annotations = this.extension.annotations;
        if (!annotations || !annotations.length)
            return annotationsForCurrentImages;
        var indices = this.extension.getPagedIndices();
        for (var i = 0; i < indices.length; i++) {
            var canvasIndex = indices[i];
            for (var j = 0; j < annotations.length; j++) {
                if (annotations[j].canvasIndex === canvasIndex) {
                    annotationsForCurrentImages.push(annotations[j]);
                    break;
                }
            }
        }
        return annotationsForCurrentImages;
    };
    OpenSeadragonCenterPanel.prototype.getAnnotationRectsForCurrentImages = function () {
        var annotations = this.getAnnotationsForCurrentImages();
        if (annotations.length) {
            return annotations.map(function (x) { return x.rects; }).reduce(function (a, b) { return a.concat(b); });
        }
        return [];
    };
    OpenSeadragonCenterPanel.prototype.updateVisibleAnnotationRects = function () {
        // after animating, loop through all search result rects and flag their visibility based on whether they are inside the current viewport.
        var annotationRects = this.getAnnotationRectsForCurrentImages();
        for (var i = 0; i < annotationRects.length; i++) {
            var rect = annotationRects[i];
            var viewportBounds = this.viewer.viewport.getBounds();
            rect.isVisible = _edsilv_utils__WEBPACK_IMPORTED_MODULE_5__["Dimensions"].hitRect(viewportBounds.x, viewportBounds.y, viewportBounds.width, viewportBounds.height, rect.viewportX, rect.viewportY);
        }
    };
    OpenSeadragonCenterPanel.prototype.getAnnotationRectIndex = function (annotationRect) {
        var annotationRects = this.getAnnotationRectsForCurrentImages();
        return annotationRects.indexOf(annotationRect);
    };
    OpenSeadragonCenterPanel.prototype.isZoomToSearchResultEnabled = function () {
        return _edsilv_utils__WEBPACK_IMPORTED_MODULE_5__["Bools"].getBool(this.extension.data.config.options.zoomToSearchResultEnabled, true);
    };
    OpenSeadragonCenterPanel.prototype.prevAnnotation = function () {
        var annotationRects = this.getAnnotationRectsForCurrentImages();
        var currentAnnotationRect = this.extension.currentAnnotationRect;
        var currentAnnotationRectIndex = currentAnnotationRect ? this.getAnnotationRectIndex(currentAnnotationRect) : annotationRects.length;
        //const currentAnnotationRectIndex: number = this.getAnnotationRectIndex(<AnnotationRect>currentAnnotationRect);
        var foundRect = null;
        // if there's no currentAnnotationRect selected, index is the total available annotation rects for the current images.
        // minusing 1 makes the index the last of the available rects for the current images.
        for (var i = currentAnnotationRectIndex - 1; i >= 0; i--) {
            var rect = annotationRects[i];
            // this was removed as users found it confusing.
            // find the prev visible or non-visible rect.
            //if (rect.isVisible) {
            //    continue;
            //} else {
            foundRect = rect;
            break;
            //}
        }
        if (foundRect && this.isZoomToSearchResultEnabled()) {
            // if the rect's canvasIndex is less than the current canvasIndex
            if (foundRect.canvasIndex < this.extension.helper.canvasIndex) {
                this.extension.currentAnnotationRect = foundRect;
                this.navigatedFromSearch = true;
                this.component.publish(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].ANNOTATION_CANVAS_CHANGED, [foundRect]);
            }
            else {
                this.zoomToAnnotation(foundRect);
            }
        }
        else {
            this.navigatedFromSearch = true;
            this.component.publish(_extensions_uv_openseadragon_extension_Events__WEBPACK_IMPORTED_MODULE_3__["Events"].PREV_IMAGES_SEARCH_RESULT_UNAVAILABLE);
        }
    };
    OpenSeadragonCenterPanel.prototype.nextAnnotation = function () {
        var annotationRects = this.getAnnotationRectsForCurrentImages();
        var currentAnnotationRect = this.extension.currentAnnotationRect;
        var currentAnnotationRectIndex = currentAnnotationRect ? this.getAnnotationRectIndex(currentAnnotationRect) : -1;
        var foundRect = null;
        // if there's no currentAnnotationRect selected, index is -1.
        // adding 1 makes the index 0 of available rects for the current images.
        for (var i = currentAnnotationRectIndex + 1; i < annotationRects.length; i++) {
            var rect = annotationRects[i];
            // this was removed as users found it confusing.
            // find the next visible or non-visible rect.
            //if (rect.isVisible) {
            //    continue;
            //} else {
            foundRect = rect;
            break;
            //}
        }
        if (foundRect && this.isZoomToSearchResultEnabled()) {
            // if the rect's canvasIndex is greater than the current canvasIndex
            if (foundRect.canvasIndex > this.extension.helper.canvasIndex) {
                this.extension.currentAnnotationRect = foundRect;
                this.navigatedFromSearch = true;
                this.component.publish(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].ANNOTATION_CANVAS_CHANGED, [foundRect]);
            }
            else {
                this.zoomToAnnotation(foundRect);
            }
        }
        else {
            this.navigatedFromSearch = true;
            this.component.publish(_extensions_uv_openseadragon_extension_Events__WEBPACK_IMPORTED_MODULE_3__["Events"].NEXT_IMAGES_SEARCH_RESULT_UNAVAILABLE);
        }
    };
    OpenSeadragonCenterPanel.prototype.getAnnotationRectByIndex = function (index) {
        var annotationRects = this.getAnnotationRectsForCurrentImages();
        if (!annotationRects.length)
            return null;
        return annotationRects[index];
    };
    OpenSeadragonCenterPanel.prototype.getInitialAnnotationRect = function () {
        var _this = this;
        var annotationRects = this.getAnnotationRectsForCurrentImages();
        if (!annotationRects.length)
            return null;
        // if we've got this far it means that a reload has happened
        // check if the lastCanvasIndex is greater or less than the current canvasIndex
        // if greater than, select the last annotation on the current page
        // if less than, select the first annotation on the current page
        // otherwise default to the first annotation
        var previousAnnotationRect = this.extension.previousAnnotationRect;
        if (!previousAnnotationRect) {
            if (this.extension.lastCanvasIndex > this.extension.helper.canvasIndex) {
                var result = annotationRects.filter(function (x) { return x.canvasIndex === _this.extension.helper.canvasIndex; });
                return result[result.length - 1];
            }
        }
        return annotationRects.filter(function (x) { return x.canvasIndex === _this.extension.helper.canvasIndex; })[0];
    };
    OpenSeadragonCenterPanel.prototype.zoomToAnnotation = function (annotationRect) {
        this.extension.previousAnnotationRect = this.extension.currentAnnotationRect || annotationRect;
        this.extension.currentAnnotationRect = annotationRect;
        // if zoomToBoundsEnabled, zoom to the annotation's bounds.
        // otherwise, pan into view preserving the current zoom level.
        if (_edsilv_utils__WEBPACK_IMPORTED_MODULE_5__["Bools"].getBool(this.extension.data.config.options.zoomToBoundsEnabled, false)) {
            this.fitToBounds(new _extensions_uv_openseadragon_extension_Bounds__WEBPACK_IMPORTED_MODULE_1__["Bounds"](annotationRect.viewportX, annotationRect.viewportY, annotationRect.width, annotationRect.height), false);
        }
        else {
            var x = annotationRect.viewportX - ((this.currentBounds.w * 0.5) - annotationRect.width * 0.5);
            var y = annotationRect.viewportY - ((this.currentBounds.h * 0.5) - annotationRect.height * 0.5);
            var w = this.currentBounds.w;
            var h = this.currentBounds.h;
            var bounds = new _extensions_uv_openseadragon_extension_Bounds__WEBPACK_IMPORTED_MODULE_1__["Bounds"](x, y, w, h);
            this.fitToBounds(bounds);
        }
        this.highlightAnnotationRect(annotationRect);
        this.component.publish(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_0__["BaseEvents"].ANNOTATION_CHANGED);
    };
    OpenSeadragonCenterPanel.prototype.highlightAnnotationRect = function (annotationRect) {
        var $rect = $('#searchResult-' + annotationRect.canvasIndex + '-' + annotationRect.index);
        $rect.addClass('current');
        $('.searchOverlay').not($rect).removeClass('current');
    };
    OpenSeadragonCenterPanel.prototype.getAnnotationOverlayRects = function (annotationGroup) {
        var newRects = [];
        if (!this.extension.resources) {
            return newRects;
        }
        var resource = this.extension.resources.filter(function (x) { return x.index === annotationGroup.canvasIndex; })[0];
        var index = this.extension.resources.indexOf(resource);
        var offsetX = 0;
        if (index > 0) {
            offsetX = this.extension.resources[index - 1].width;
        }
        for (var i = 0; i < annotationGroup.rects.length; i++) {
            var searchRect = annotationGroup.rects[i];
            var x = (searchRect.x + offsetX) + ((index > 0) ? this.config.options.pageGap : 0);
            var y = searchRect.y;
            var w = searchRect.width;
            var h = searchRect.height;
            var rect = new OpenSeadragon.Rect(x, y, w, h);
            searchRect.viewportX = x;
            searchRect.viewportY = y;
            rect.canvasIndex = searchRect.canvasIndex;
            rect.resultIndex = searchRect.index;
            rect.chars = searchRect.chars;
            newRects.push(rect);
        }
        return newRects;
    };
    OpenSeadragonCenterPanel.prototype.resize = function () {
        var _this = this;
        _super.prototype.resize.call(this);
        this.$viewer.height(this.$content.height() - this.$viewer.verticalMargins());
        this.$viewer.width(this.$content.width() - this.$viewer.horizontalMargins());
        if (!this.isCreated)
            return;
        if (this.title) {
            this.$title.text(Object(_Utils__WEBPACK_IMPORTED_MODULE_4__["sanitize"])(this.title));
        }
        this.$spinner.css('top', (this.$content.height() / 2) - (this.$spinner.height() / 2));
        this.$spinner.css('left', (this.$content.width() / 2) - (this.$spinner.width() / 2));
        var viewingDirection = this.extension.helper.getViewingDirection() || _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_6__["ViewingDirection"].LEFT_TO_RIGHT;
        if (this.extension.helper.isMultiCanvas() && this.$prevButton && this.$nextButton) {
            var verticalButtonPos = Math.floor(this.$content.width() / 2);
            switch (viewingDirection) {
                case _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_6__["ViewingDirection"].BOTTOM_TO_TOP:
                    this.$prevButton.addClass('down');
                    this.$nextButton.addClass('up');
                    this.$prevButton.css('left', verticalButtonPos - (this.$prevButton.outerWidth() / 2));
                    this.$prevButton.css('top', (this.$content.height() - this.$prevButton.height()));
                    this.$nextButton.css('left', (verticalButtonPos * -1) - (this.$nextButton.outerWidth() / 2));
                    break;
                case _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_6__["ViewingDirection"].TOP_TO_BOTTOM:
                    this.$prevButton.css('left', verticalButtonPos - (this.$prevButton.outerWidth() / 2));
                    this.$nextButton.css('left', (verticalButtonPos * -1) - (this.$nextButton.outerWidth() / 2));
                    this.$nextButton.css('top', (this.$content.height() - this.$nextButton.height()));
                    break;
                default:
                    this.$prevButton.css('top', (this.$content.height() - this.$prevButton.height()) / 2);
                    this.$nextButton.css('top', (this.$content.height() - this.$nextButton.height()) / 2);
                    break;
            }
        }
        // stretch navigator, allowing time for OSD to resize
        setTimeout(function () {
            if (_this.extension.helper.isContinuous()) {
                if (_this.extension.helper.isHorizontallyAligned()) {
                    var width = _this.$viewer.width() - _this.$viewer.rightMargin();
                    _this.$navigator.width(width);
                }
                else {
                    _this.$navigator.height(_this.$viewer.height());
                }
            }
        }, 100);
    };
    OpenSeadragonCenterPanel.prototype.setFocus = function () {
        if (!this.$canvas.is(":focus")) {
            if (this.extension.data.config.options.allowStealFocus) {
                this.$canvas.focus();
            }
        }
    };
    OpenSeadragonCenterPanel.prototype.setNavigatorVisible = function () {
        var navigatorEnabled = _edsilv_utils__WEBPACK_IMPORTED_MODULE_5__["Bools"].getBool(this.extension.getSettings().navigatorEnabled, true) && this.extension.isDesktopMetric();
        this.viewer.navigator.setVisible(navigatorEnabled);
        if (navigatorEnabled) {
            this.$navigator.show();
        }
        else {
            this.$navigator.hide();
        }
    };
    return OpenSeadragonCenterPanel;
}(_uv_shared_module_CenterPanel__WEBPACK_IMPORTED_MODULE_2__["CenterPanel"]));



/***/ }),

/***/ "./src/modules/uv-osdmobilefooterpanel-module/MobileFooter.ts":
/*!********************************************************************!*\
  !*** ./src/modules/uv-osdmobilefooterpanel-module/MobileFooter.ts ***!
  \********************************************************************/
/*! exports provided: FooterPanel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FooterPanel", function() { return FooterPanel; });
/* harmony import */ var _uv_shared_module_FooterPanel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../uv-shared-module/FooterPanel */ "./src/modules/uv-shared-module/FooterPanel.ts");
/* harmony import */ var _extensions_uv_openseadragon_extension_Events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../extensions/uv-openseadragon-extension/Events */ "./src/extensions/uv-openseadragon-extension/Events.ts");
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
        this.setConfig('mobileFooterPanel');
        _super.prototype.create.call(this);
        this.$spacer = $('<div class="spacer"></div>');
        this.$options.prepend(this.$spacer);
        this.$rotateButton = $("\n            <button class=\"btn imageBtn rotate\" title=\"" + this.content.rotateRight + "\">\n                <i class=\"uv-icon-rotate\" aria-hidden=\"true\"></i>" + this.content.rotateRight + "\n            </button>\n        ");
        this.$options.prepend(this.$rotateButton);
        this.$zoomOutButton = $("\n            <button class=\"btn imageBtn zoomOut\" title=\"" + this.content.zoomOut + "\">\n                <i class=\"uv-icon-zoom-out\" aria-hidden=\"true\"></i>" + this.content.zoomOut + "\n            </button>\n        ");
        this.$options.prepend(this.$zoomOutButton);
        this.$zoomInButton = $("\n            <button class=\"btn imageBtn zoomIn\" title=\"" + this.content.zoomIn + "\">\n                <i class=\"uv-icon-zoom-in\" aria-hidden=\"true\"></i>" + this.content.zoomIn + "\n            </button>\n        ");
        this.$options.prepend(this.$zoomInButton);
        this.$zoomInButton.onPressed(function () {
            _this.component.publish(_extensions_uv_openseadragon_extension_Events__WEBPACK_IMPORTED_MODULE_1__["Events"].ZOOM_IN);
        });
        this.$zoomOutButton.onPressed(function () {
            _this.component.publish(_extensions_uv_openseadragon_extension_Events__WEBPACK_IMPORTED_MODULE_1__["Events"].ZOOM_OUT);
        });
        this.$rotateButton.onPressed(function () {
            _this.component.publish(_extensions_uv_openseadragon_extension_Events__WEBPACK_IMPORTED_MODULE_1__["Events"].ROTATE);
        });
    };
    FooterPanel.prototype.resize = function () {
        _super.prototype.resize.call(this);
        this.$options.css('left', Math.floor((this.$element.width() / 2) - (this.$options.width() / 2)));
    };
    return FooterPanel;
}(_uv_shared_module_FooterPanel__WEBPACK_IMPORTED_MODULE_0__["FooterPanel"]));



/***/ }),

/***/ "./src/modules/uv-pagingheaderpanel-module/PagingHeaderPanel.ts":
/*!**********************************************************************!*\
  !*** ./src/modules/uv-pagingheaderpanel-module/PagingHeaderPanel.ts ***!
  \**********************************************************************/
/*! exports provided: PagingHeaderPanel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PagingHeaderPanel", function() { return PagingHeaderPanel; });
/* harmony import */ var _uv_shared_module_AutoComplete__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../uv-shared-module/AutoComplete */ "./src/modules/uv-shared-module/AutoComplete.ts");
/* harmony import */ var _uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../uv-shared-module/BaseEvents */ "./src/modules/uv-shared-module/BaseEvents.ts");
/* harmony import */ var _extensions_uv_openseadragon_extension_Events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../extensions/uv-openseadragon-extension/Events */ "./src/extensions/uv-openseadragon-extension/Events.ts");
/* harmony import */ var _uv_shared_module_HeaderPanel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../uv-shared-module/HeaderPanel */ "./src/modules/uv-shared-module/HeaderPanel.ts");
/* harmony import */ var _extensions_uv_openseadragon_extension_Mode__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../extensions/uv-openseadragon-extension/Mode */ "./src/extensions/uv-openseadragon-extension/Mode.ts");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../Utils */ "./src/Utils.ts");
/* harmony import */ var _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @iiif/vocabulary */ "./node_modules/@iiif/vocabulary/dist-esmodule/index.js");
/* harmony import */ var _edsilv_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @edsilv/utils */ "./node_modules/@edsilv/utils/dist-esmodule/index.js");
/* harmony import */ var manifesto_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! manifesto.js */ "./node_modules/manifesto.js/dist-umd/manifesto.js");
/* harmony import */ var manifesto_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(manifesto_js__WEBPACK_IMPORTED_MODULE_8__);
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









var PagingHeaderPanel = /** @class */ (function (_super) {
    __extends(PagingHeaderPanel, _super);
    function PagingHeaderPanel($element) {
        var _this = _super.call(this, $element) || this;
        _this.firstButtonEnabled = false;
        _this.lastButtonEnabled = false;
        _this.nextButtonEnabled = false;
        _this.prevButtonEnabled = false;
        return _this;
    }
    PagingHeaderPanel.prototype.create = function () {
        var _this = this;
        this.setConfig('pagingHeaderPanel');
        _super.prototype.create.call(this);
        this.component.subscribe(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].CANVAS_INDEX_CHANGED, function (canvasIndex) {
            _this.canvasIndexChanged(canvasIndex);
        });
        this.component.subscribe(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].SETTINGS_CHANGED, function () {
            _this.modeChanged();
            _this.updatePagingToggle();
        });
        this.component.subscribe(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].CANVAS_INDEX_CHANGE_FAILED, function () {
            _this.setSearchFieldValue(_this.extension.helper.canvasIndex);
        });
        this.component.subscribe(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].LEFTPANEL_EXPAND_FULL_START, function () {
            _this.openGallery();
        });
        this.component.subscribe(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].LEFTPANEL_COLLAPSE_FULL_START, function () {
            _this.closeGallery();
        });
        this.$prevOptions = $('<div class="prevOptions"></div>');
        this.$centerOptions.append(this.$prevOptions);
        this.$firstButton = $("\n          <button class=\"btn imageBtn first\" tabindex=\"0\" title=\"" + this.content.first + "\">\n            <i class=\"uv-icon-first\" aria-hidden=\"true\"></i><span>" + this.content.first + "</span>\n          </button>\n        ");
        this.$prevOptions.append(this.$firstButton);
        this.$prevButton = $("\n          <button class=\"btn imageBtn prev\" tabindex=\"0\" title=\"" + this.content.previous + "\">\n            <i class=\"uv-icon-prev\" aria-hidden=\"true\"></i><span>" + this.content.previous + "</span>\n          </button>\n        ");
        this.$prevOptions.append(this.$prevButton);
        this.$modeOptions = $('<div class="mode"></div>');
        this.$centerOptions.append(this.$modeOptions);
        this.$imageModeLabel = $('<label for="image">' + this.content.image + '</label>');
        this.$modeOptions.append(this.$imageModeLabel);
        this.$imageModeOption = $('<input type="radio" id="image" name="mode" tabindex="0"/>');
        this.$modeOptions.append(this.$imageModeOption);
        this.$pageModeLabel = $('<label for="page"></label>');
        this.$modeOptions.append(this.$pageModeLabel);
        this.$pageModeOption = $('<input type="radio" id="page" name="mode" tabindex="0"/>');
        this.$modeOptions.append(this.$pageModeOption);
        this.$search = $('<div class="search"></div>');
        this.$centerOptions.append(this.$search);
        this.$searchText = $('<input class="searchText" maxlength="50" type="text" tabindex="0" aria-label="' + this.content.pageSearchLabel + '"/>');
        this.$search.append(this.$searchText);
        if (_edsilv_utils__WEBPACK_IMPORTED_MODULE_7__["Bools"].getBool(this.options.autoCompleteBoxEnabled, true)) {
            this.$searchText.hide();
            this.$autoCompleteBox = $('<input class="autocompleteText" type="text" maxlength="100" aria-label="' + this.content.pageSearchLabel + '"/>');
            this.$search.append(this.$autoCompleteBox);
            new _uv_shared_module_AutoComplete__WEBPACK_IMPORTED_MODULE_0__["AutoComplete"](this.$autoCompleteBox, function (term, cb) {
                var results = [];
                var canvases = _this.extension.helper.getCanvases();
                // if in page mode, get canvases by label.
                if (_this.isPageModeEnabled()) {
                    for (var i = 0; i < canvases.length; i++) {
                        var canvas = canvases[i];
                        var label = manifesto_js__WEBPACK_IMPORTED_MODULE_8__["LanguageMap"].getValue(canvas.getLabel());
                        if (label && label.startsWith(term)) {
                            results.push(label);
                        }
                    }
                }
                else {
                    // get canvas by index
                    for (var i = 0; i < canvases.length; i++) {
                        var canvas = canvases[i];
                        if (canvas.index.toString().startsWith(term)) {
                            results.push(canvas.index.toString());
                        }
                    }
                }
                cb(results);
            }, function (results) {
                return results;
            }, function (terms) {
                _this.search(terms);
            }, 300, 0, _edsilv_utils__WEBPACK_IMPORTED_MODULE_7__["Bools"].getBool(this.options.autocompleteAllowWords, false));
        }
        else if (_edsilv_utils__WEBPACK_IMPORTED_MODULE_7__["Bools"].getBool(this.options.imageSelectionBoxEnabled, true)) {
            this.$selectionBoxOptions = $('<div class="image-selectionbox-options"></div>');
            this.$centerOptions.append(this.$selectionBoxOptions);
            this.$imageSelectionBox = $('<select class="image-selectionbox" name="image-select" tabindex="0" ></select>');
            this.$selectionBoxOptions.append(this.$imageSelectionBox);
            for (var imageIndex = 0; imageIndex < this.extension.helper.getTotalCanvases(); imageIndex++) {
                var canvas = this.extension.helper.getCanvasByIndex(imageIndex);
                var label = Object(_Utils__WEBPACK_IMPORTED_MODULE_5__["sanitize"])(manifesto_js__WEBPACK_IMPORTED_MODULE_8__["LanguageMap"].getValue(canvas.getLabel(), this.extension.helper.options.locale));
                this.$imageSelectionBox.append('<option value=' + (imageIndex) + '>' + label + '</option>');
            }
            this.$imageSelectionBox.change(function () {
                var imageIndex = parseInt(_this.$imageSelectionBox.val());
                _this.component.publish(_extensions_uv_openseadragon_extension_Events__WEBPACK_IMPORTED_MODULE_2__["Events"].IMAGE_SEARCH, imageIndex);
            });
        }
        this.$total = $('<span class="total"></span>');
        this.$search.append(this.$total);
        this.$searchButton = $("<a class=\"go btn btn-primary\" title=\"" + this.content.go + "\" tabindex=\"0\">" + this.content.go + "</a>");
        this.$search.append(this.$searchButton);
        this.$nextOptions = $('<div class="nextOptions"></div>');
        this.$centerOptions.append(this.$nextOptions);
        this.$nextButton = $("\n          <button class=\"btn imageBtn next\" tabindex=\"0\" title=\"" + this.content.next + "\">\n            <i class=\"uv-icon-next\" aria-hidden=\"true\"></i><span>" + this.content.next + "</span>\n          </button>\n        ");
        this.$nextOptions.append(this.$nextButton);
        this.$lastButton = $("\n          <button class=\"btn imageBtn last\" tabindex=\"0\" title=\"" + this.content.last + "\">\n            <i class=\"uv-icon-last\" aria-hidden=\"true\"></i><span>" + this.content.last + "</span>\n          </button>\n        ");
        this.$nextOptions.append(this.$lastButton);
        if (this.isPageModeEnabled()) {
            this.$pageModeOption.attr('checked', 'checked');
            this.$pageModeOption.removeAttr('disabled');
            this.$pageModeLabel.removeClass('disabled');
        }
        else {
            this.$imageModeOption.attr('checked', 'checked');
            // disable page mode option.
            this.$pageModeOption.attr('disabled', 'disabled');
            this.$pageModeLabel.addClass('disabled');
        }
        if (this.extension.helper.getManifestType() === manifesto_js__WEBPACK_IMPORTED_MODULE_8__["ManifestType"].MANUSCRIPT) {
            this.$pageModeLabel.text(this.content.folio);
        }
        else {
            this.$pageModeLabel.text(this.content.page);
        }
        this.$galleryButton = $("\n          <button class=\"btn imageBtn gallery\" title=\"" + this.content.gallery + "\" tabindex=\"0\">\n            <i class=\"uv-icon-gallery\" aria-hidden=\"true\"></i>" + this.content.gallery + "\n          </button>\n        ");
        this.$rightOptions.prepend(this.$galleryButton);
        this.$pagingToggleButtons = $('<div class="pagingToggleButtons"></div>');
        this.$rightOptions.prepend(this.$pagingToggleButtons);
        this.$oneUpButton = $("\n          <button class=\"btn imageBtn one-up\" title=\"" + this.content.oneUp + "\" tabindex=\"0\">\n            <i class=\"uv-icon-one-up\" aria-hidden=\"true\"></i>" + this.content.oneUp + "\n          </button>");
        this.$pagingToggleButtons.append(this.$oneUpButton);
        this.$twoUpButton = $("\n          <button class=\"btn imageBtn two-up\" title=\"" + this.content.twoUp + "\" tabindex=\"0\">\n            <i class=\"uv-icon-two-up\" aria-hidden=\"true\"></i>" + this.content.twoUp + "\n          </button>\n        ");
        this.$pagingToggleButtons.append(this.$twoUpButton);
        this.updatePagingToggle();
        this.updateGalleryButton();
        this.$oneUpButton.onPressed(function () {
            var enabled = false;
            _this.updateSettings({ pagingEnabled: enabled });
            _this.component.publish(_extensions_uv_openseadragon_extension_Events__WEBPACK_IMPORTED_MODULE_2__["Events"].PAGING_TOGGLED, enabled);
        });
        this.$twoUpButton.onPressed(function () {
            var enabled = true;
            _this.updateSettings({ pagingEnabled: enabled });
            _this.component.publish(_extensions_uv_openseadragon_extension_Events__WEBPACK_IMPORTED_MODULE_2__["Events"].PAGING_TOGGLED, enabled);
        });
        this.$galleryButton.onPressed(function () {
            _this.component.publish(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].TOGGLE_EXPAND_LEFT_PANEL);
        });
        this.setNavigationTitles();
        this.setTotal();
        var viewingDirection = this.extension.helper.getViewingDirection() || _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_6__["ViewingDirection"].LEFT_TO_RIGHT;
        // check if the book has more than one page, otherwise hide prev/next options.
        if (this.extension.helper.getTotalCanvases() === 1) {
            this.$centerOptions.hide();
        }
        // ui event handlers.
        this.$firstButton.onPressed(function () {
            switch (viewingDirection.toString()) {
                case _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_6__["ViewingDirection"].LEFT_TO_RIGHT:
                case _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_6__["ViewingDirection"].TOP_TO_BOTTOM:
                case _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_6__["ViewingDirection"].BOTTOM_TO_TOP:
                    _this.component.publish(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].FIRST);
                    break;
                case _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_6__["ViewingDirection"].RIGHT_TO_LEFT:
                    _this.component.publish(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].LAST);
                    break;
            }
        });
        this.$prevButton.onPressed(function () {
            switch (viewingDirection.toString()) {
                case _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_6__["ViewingDirection"].LEFT_TO_RIGHT:
                case _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_6__["ViewingDirection"].BOTTOM_TO_TOP:
                case _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_6__["ViewingDirection"].TOP_TO_BOTTOM:
                    _this.component.publish(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].PREV);
                    break;
                case _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_6__["ViewingDirection"].RIGHT_TO_LEFT:
                    _this.component.publish(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].NEXT);
                    break;
            }
        });
        this.$nextButton.onPressed(function () {
            switch (viewingDirection.toString()) {
                case _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_6__["ViewingDirection"].LEFT_TO_RIGHT:
                case _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_6__["ViewingDirection"].BOTTOM_TO_TOP:
                case _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_6__["ViewingDirection"].TOP_TO_BOTTOM:
                    _this.component.publish(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].NEXT);
                    break;
                case _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_6__["ViewingDirection"].RIGHT_TO_LEFT:
                    _this.component.publish(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].PREV);
                    break;
            }
        });
        this.$lastButton.onPressed(function () {
            switch (viewingDirection.toString()) {
                case _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_6__["ViewingDirection"].LEFT_TO_RIGHT:
                case _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_6__["ViewingDirection"].TOP_TO_BOTTOM:
                case _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_6__["ViewingDirection"].BOTTOM_TO_TOP:
                    _this.component.publish(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].LAST);
                    break;
                case _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_6__["ViewingDirection"].RIGHT_TO_LEFT:
                    _this.component.publish(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].FIRST);
                    break;
            }
        });
        // If page mode is disabled, we don't need to show radio buttons since
        // there is only one option:
        if (!this.config.options.pageModeEnabled) {
            this.$imageModeOption.hide();
            this.$pageModeLabel.hide();
            this.$pageModeOption.hide();
        }
        else {
            // Only activate click actions for mode buttons when controls are
            // visible, since otherwise, clicking on the "Image" label can
            // trigger unexpected/undesired side effects.
            this.$imageModeOption.on('click', function () {
                _this.component.publish(_extensions_uv_openseadragon_extension_Events__WEBPACK_IMPORTED_MODULE_2__["Events"].MODE_CHANGED, _extensions_uv_openseadragon_extension_Mode__WEBPACK_IMPORTED_MODULE_4__["Mode"].image.toString());
            });
            this.$pageModeOption.on('click', function () {
                _this.component.publish(_extensions_uv_openseadragon_extension_Events__WEBPACK_IMPORTED_MODULE_2__["Events"].MODE_CHANGED, _extensions_uv_openseadragon_extension_Mode__WEBPACK_IMPORTED_MODULE_4__["Mode"].page.toString());
            });
        }
        this.$searchText.onEnter(function () {
            _this.$searchText.blur();
            _this.search(_this.$searchText.val());
        });
        this.$searchText.click(function () {
            $(this).select();
        });
        this.$searchButton.onPressed(function () {
            if (_this.options.autoCompleteBoxEnabled) {
                _this.search(_this.$autoCompleteBox.val());
            }
            else {
                _this.search(_this.$searchText.val());
            }
        });
        if (this.options.modeOptionsEnabled === false) {
            this.$modeOptions.hide();
            this.$centerOptions.addClass('modeOptionsDisabled');
        }
        // Search is shown as default
        if (this.options.imageSelectionBoxEnabled === true && this.options.autoCompleteBoxEnabled !== true) {
            this.$search.hide();
        }
        if (this.options.helpEnabled === false) {
            this.$helpButton.hide();
        }
        // todo: discuss on community call
        // Get visible element in centerOptions with greatest tabIndex
        // var $elementWithGreatestTabIndex: JQuery = this.$centerOptions.getVisibleElementWithGreatestTabIndex();
        // // cycle focus back to start.
        // if ($elementWithGreatestTabIndex) {
        //     $elementWithGreatestTabIndex.blur(() => {
        //         if (this.extension.tabbing && !this.extension.shifted) {
        //             this.$nextButton.focus();
        //         }
        //     });
        // }
        // this.$nextButton.blur(() => {
        //     if (this.extension.tabbing && this.extension.shifted) {
        //         setTimeout(() => {
        //             $elementWithGreatestTabIndex.focus();
        //         }, 100);
        //     }
        // });
        if (!_edsilv_utils__WEBPACK_IMPORTED_MODULE_7__["Bools"].getBool(this.options.pagingToggleEnabled, true)) {
            this.$pagingToggleButtons.hide();
        }
    };
    PagingHeaderPanel.prototype.openGallery = function () {
        this.$oneUpButton.removeClass('on');
        this.$twoUpButton.removeClass('on');
        this.$galleryButton.addClass('on');
    };
    PagingHeaderPanel.prototype.closeGallery = function () {
        this.updatePagingToggle();
        this.$galleryButton.removeClass('on');
    };
    PagingHeaderPanel.prototype.isPageModeEnabled = function () {
        return this.config.options.pageModeEnabled && this.extension.getMode().toString() === _extensions_uv_openseadragon_extension_Mode__WEBPACK_IMPORTED_MODULE_4__["Mode"].page.toString();
    };
    PagingHeaderPanel.prototype.setNavigationTitles = function () {
        if (this.isPageModeEnabled()) {
            if (this.extension.helper.isRightToLeft()) {
                this.$firstButton.prop('title', this.content.lastPage);
                this.$firstButton.find('span').text(this.content.lastPage);
                this.$prevButton.prop('title', this.content.nextPage);
                this.$prevButton.find('span').text(this.content.nextPage);
                this.$nextButton.prop('title', this.content.previousPage);
                this.$nextButton.find('span').text(this.content.previousPage);
                this.$lastButton.prop('title', this.content.firstPage);
                this.$lastButton.find('span').text(this.content.firstPage);
            }
            else {
                this.$firstButton.prop('title', this.content.firstPage);
                this.$firstButton.find('span').text(this.content.firstPage);
                this.$prevButton.prop('title', this.content.previousPage);
                this.$prevButton.find('span').text(this.content.previousPage);
                this.$nextButton.prop('title', this.content.nextPage);
                this.$nextButton.find('span').text(this.content.nextPage);
                this.$lastButton.prop('title', this.content.lastPage);
                this.$lastButton.find('span').text(this.content.lastPage);
            }
        }
        else {
            if (this.extension.helper.isRightToLeft()) {
                this.$firstButton.prop('title', this.content.lastImage);
                this.$firstButton.find('span').text(this.content.lastPage);
                this.$prevButton.prop('title', this.content.nextImage);
                this.$prevButton.find('span').text(this.content.nextImage);
                this.$nextButton.prop('title', this.content.previousImage);
                this.$nextButton.find('span').text(this.content.previousImage);
                this.$lastButton.prop('title', this.content.firstImage);
                this.$lastButton.find('span').text(this.content.firstImage);
            }
            else {
                this.$firstButton.prop('title', this.content.firstImage);
                this.$firstButton.find('span').text(this.content.firstImage);
                this.$prevButton.prop('title', this.content.previousImage);
                this.$prevButton.find('span').text(this.content.previousImage);
                this.$nextButton.prop('title', this.content.nextImage);
                this.$nextButton.find('span').text(this.content.nextImage);
                this.$lastButton.prop('title', this.content.lastImage);
                this.$lastButton.find('span').text(this.content.lastImage);
            }
        }
    };
    PagingHeaderPanel.prototype.updatePagingToggle = function () {
        if (!this.pagingToggleIsVisible()) {
            this.$pagingToggleButtons.hide();
            return;
        }
        if (this.extension.isPagingSettingEnabled()) {
            this.$oneUpButton.removeClass('on');
            this.$twoUpButton.addClass('on');
        }
        else {
            this.$twoUpButton.removeClass('on');
            this.$oneUpButton.addClass('on');
        }
    };
    PagingHeaderPanel.prototype.pagingToggleIsVisible = function () {
        return _edsilv_utils__WEBPACK_IMPORTED_MODULE_7__["Bools"].getBool(this.options.pagingToggleEnabled, true) && this.extension.helper.isPagingAvailable();
    };
    PagingHeaderPanel.prototype.updateGalleryButton = function () {
        if (!this.galleryIsVisible()) {
            this.$galleryButton.hide();
        }
    };
    PagingHeaderPanel.prototype.galleryIsVisible = function () {
        return _edsilv_utils__WEBPACK_IMPORTED_MODULE_7__["Bools"].getBool(this.options.galleryButtonEnabled, true) && this.extension.isLeftPanelEnabled();
    };
    PagingHeaderPanel.prototype.setTotal = function () {
        var of = this.content.of;
        if (this.isPageModeEnabled()) {
            this.$total.html(_edsilv_utils__WEBPACK_IMPORTED_MODULE_7__["Strings"].format(of, this.extension.helper.getLastCanvasLabel(true)));
        }
        else {
            this.$total.html(_edsilv_utils__WEBPACK_IMPORTED_MODULE_7__["Strings"].format(of, this.extension.helper.getTotalCanvases().toString()));
        }
    };
    PagingHeaderPanel.prototype.setSearchFieldValue = function (index) {
        var canvas = this.extension.helper.getCanvasByIndex(index);
        var value = null;
        if (this.isPageModeEnabled()) {
            var orderLabel = manifesto_js__WEBPACK_IMPORTED_MODULE_8__["LanguageMap"].getValue(canvas.getLabel());
            if (orderLabel === "-") {
                value = "";
            }
            else {
                value = orderLabel;
            }
        }
        else {
            index += 1;
            value = index.toString();
        }
        if (this.options.autoCompleteBoxEnabled) {
            this.$autoCompleteBox.val(value);
        }
        else {
            this.$searchText.val(value);
        }
    };
    PagingHeaderPanel.prototype.search = function (value) {
        if (!value) {
            this.extension.showMessage(this.content.emptyValue);
            this.component.publish(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].CANVAS_INDEX_CHANGE_FAILED);
            return;
        }
        if (this.isPageModeEnabled()) {
            this.component.publish(_extensions_uv_openseadragon_extension_Events__WEBPACK_IMPORTED_MODULE_2__["Events"].PAGE_SEARCH, value);
        }
        else {
            var index = void 0;
            if (this.options.autoCompleteBoxEnabled) {
                index = parseInt(this.$autoCompleteBox.val(), 10);
            }
            else {
                index = parseInt(this.$searchText.val(), 10);
            }
            index -= 1;
            if (isNaN(index)) {
                this.extension.showMessage(this.extension.data.config.modules.genericDialogue.content.invalidNumber);
                this.component.publish(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].CANVAS_INDEX_CHANGE_FAILED);
                return;
            }
            var asset = this.extension.helper.getCanvasByIndex(index);
            if (!asset) {
                this.extension.showMessage(this.extension.data.config.modules.genericDialogue.content.pageNotFound);
                this.component.publish(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].CANVAS_INDEX_CHANGE_FAILED);
                return;
            }
            this.component.publish(_extensions_uv_openseadragon_extension_Events__WEBPACK_IMPORTED_MODULE_2__["Events"].IMAGE_SEARCH, index);
        }
    };
    PagingHeaderPanel.prototype.canvasIndexChanged = function (index) {
        this.setSearchFieldValue(index);
        if (this.options.imageSelectionBoxEnabled === true && this.options.autoCompleteBoxEnabled !== true) {
            this.$imageSelectionBox.val(index);
        }
        var viewingDirection = this.extension.helper.getViewingDirection() || _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_6__["ViewingDirection"].LEFT_TO_RIGHT;
        if (viewingDirection === _iiif_vocabulary__WEBPACK_IMPORTED_MODULE_6__["ViewingDirection"].RIGHT_TO_LEFT) {
            if (this.extension.helper.isFirstCanvas()) {
                this.disableLastButton();
                this.disableNextButton();
            }
            else {
                this.enableLastButton();
                this.enableNextButton();
            }
            if (this.extension.helper.isLastCanvas()) {
                this.disableFirstButton();
                this.disablePrevButton();
            }
            else {
                this.enableFirstButton();
                this.enablePrevButton();
            }
        }
        else {
            if (this.extension.helper.isFirstCanvas()) {
                this.disableFirstButton();
                this.disablePrevButton();
            }
            else {
                this.enableFirstButton();
                this.enablePrevButton();
            }
            if (this.extension.helper.isLastCanvas()) {
                this.disableLastButton();
                this.disableNextButton();
            }
            else {
                this.enableLastButton();
                this.enableNextButton();
            }
        }
    };
    PagingHeaderPanel.prototype.disableFirstButton = function () {
        this.firstButtonEnabled = false;
        this.$firstButton.disable();
    };
    PagingHeaderPanel.prototype.enableFirstButton = function () {
        this.firstButtonEnabled = true;
        this.$firstButton.enable();
    };
    PagingHeaderPanel.prototype.disableLastButton = function () {
        this.lastButtonEnabled = false;
        this.$lastButton.disable();
    };
    PagingHeaderPanel.prototype.enableLastButton = function () {
        this.lastButtonEnabled = true;
        this.$lastButton.enable();
    };
    PagingHeaderPanel.prototype.disablePrevButton = function () {
        this.prevButtonEnabled = false;
        this.$prevButton.disable();
    };
    PagingHeaderPanel.prototype.enablePrevButton = function () {
        this.prevButtonEnabled = true;
        this.$prevButton.enable();
    };
    PagingHeaderPanel.prototype.disableNextButton = function () {
        this.nextButtonEnabled = false;
        this.$nextButton.disable();
    };
    PagingHeaderPanel.prototype.enableNextButton = function () {
        this.nextButtonEnabled = true;
        this.$nextButton.enable();
    };
    PagingHeaderPanel.prototype.modeChanged = function () {
        this.setSearchFieldValue(this.extension.helper.canvasIndex);
        this.setNavigationTitles();
        this.setTotal();
    };
    PagingHeaderPanel.prototype.resize = function () {
        _super.prototype.resize.call(this);
        // hide toggle buttons below minimum width
        if (this.extension.width() < this.extension.data.config.options.minWidthBreakPoint) {
            if (this.pagingToggleIsVisible())
                this.$pagingToggleButtons.hide();
            if (this.galleryIsVisible())
                this.$galleryButton.hide();
        }
        else {
            if (this.pagingToggleIsVisible())
                this.$pagingToggleButtons.show();
            if (this.galleryIsVisible())
                this.$galleryButton.show();
        }
    };
    return PagingHeaderPanel;
}(_uv_shared_module_HeaderPanel__WEBPACK_IMPORTED_MODULE_3__["HeaderPanel"]));



/***/ }),

/***/ "./src/modules/uv-searchfooterpanel-module/FooterPanel.ts":
/*!****************************************************************!*\
  !*** ./src/modules/uv-searchfooterpanel-module/FooterPanel.ts ***!
  \****************************************************************/
/*! exports provided: FooterPanel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FooterPanel", function() { return FooterPanel; });
/* harmony import */ var _uv_shared_module_AutoComplete__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../uv-shared-module/AutoComplete */ "./src/modules/uv-shared-module/AutoComplete.ts");
/* harmony import */ var _uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../uv-shared-module/BaseEvents */ "./src/modules/uv-shared-module/BaseEvents.ts");
/* harmony import */ var _extensions_uv_openseadragon_extension_Events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../extensions/uv-openseadragon-extension/Events */ "./src/extensions/uv-openseadragon-extension/Events.ts");
/* harmony import */ var _uv_shared_module_FooterPanel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../uv-shared-module/FooterPanel */ "./src/modules/uv-shared-module/FooterPanel.ts");
/* harmony import */ var _extensions_uv_openseadragon_extension_Mode__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../extensions/uv-openseadragon-extension/Mode */ "./src/extensions/uv-openseadragon-extension/Mode.ts");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../Utils */ "./src/Utils.ts");
/* harmony import */ var _edsilv_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @edsilv/utils */ "./node_modules/@edsilv/utils/dist-esmodule/index.js");
/* harmony import */ var _edsilv_key_codes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @edsilv/key-codes */ "./node_modules/@edsilv/key-codes/dist-esmodule/index.js");
/* harmony import */ var manifesto_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! manifesto.js */ "./node_modules/manifesto.js/dist-umd/manifesto.js");
/* harmony import */ var manifesto_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(manifesto_js__WEBPACK_IMPORTED_MODULE_8__);
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
        var _this = _super.call(this, $element) || this;
        _this.placemarkerTouched = false;
        return _this;
    }
    FooterPanel.prototype.create = function () {
        var _this = this;
        this.setConfig('searchFooterPanel');
        _super.prototype.create.call(this);
        this.component.subscribe(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].CANVAS_INDEX_CHANGED, function () {
            _this.canvasIndexChanged();
            _this.setCurrentSearchResultPlacemarker();
            _this.updatePrevButton();
            _this.updateNextButton();
        });
        this.component.subscribe(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].CLEAR_ANNOTATIONS, function () {
            _this.clearSearchResults();
        });
        // todo: this should be a setting
        this.component.subscribe(_extensions_uv_openseadragon_extension_Events__WEBPACK_IMPORTED_MODULE_2__["Events"].MODE_CHANGED, function () {
            _this.settingsChanged();
        });
        this.component.subscribe(_extensions_uv_openseadragon_extension_Events__WEBPACK_IMPORTED_MODULE_2__["Events"].SEARCH, function (terms) {
            _this.terms = terms;
        });
        this.component.subscribe(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].ANNOTATIONS, function (annotationResults) {
            _this.displaySearchResults(annotationResults.annotations, annotationResults.terms);
            _this.setCurrentSearchResultPlacemarker();
            _this.updatePrevButton();
            _this.updateNextButton();
        });
        this.component.subscribe(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].ANNOTATIONS_EMPTY, function () {
            _this.hideSearchSpinner();
        });
        this.component.subscribe(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].ANNOTATION_CHANGED, function () {
            _this.updatePrevButton();
            _this.updateNextButton();
        });
        this.$printButton = $("\n          <button class=\"print btn imageBtn\" title=\"" + this.content.print + "\" tabindex=\"0\">\n            <i class=\"uv-icon uv-icon-print\" aria-hidden=\"true\"></i>" + this.content.print + "\n          </button>\n        ");
        this.$options.prepend(this.$printButton);
        // search input.
        this.$searchContainer = $('<div class="search"></div>');
        this.$element.prepend(this.$searchContainer);
        this.$searchOptions = $('<div class="searchOptions"></div>');
        this.$searchContainer.append(this.$searchOptions);
        this.$searchLabel = $('<span class="label">' + this.content.searchWithin + '</span>');
        this.$searchOptions.append(this.$searchLabel);
        this.$searchTextContainer = $('<div class="searchTextContainer"></div>');
        this.$searchOptions.append(this.$searchTextContainer);
        this.$searchText = $('<input class="searchText" type="text" maxlength="100" value="' + this.content.enterKeyword + '" aria-label="' + this.content.searchWithin + '"/>');
        this.$searchTextContainer.append(this.$searchText);
        this.$searchButton = $('<a class="imageButton searchButton" tabindex="0"></a>');
        this.$searchTextContainer.append(this.$searchButton);
        // search results.
        this.$searchPagerContainer = $('<div class="searchPager"></div>');
        this.$element.prepend(this.$searchPagerContainer);
        this.$searchPagerControls = $('<div class="controls"></div>');
        this.$searchPagerContainer.prepend(this.$searchPagerControls);
        this.$previousResultButton = $('<a class="previousResult" title="' + this.content.previousResult + '">' + this.content.previousResult + '</a>');
        this.$searchPagerControls.append(this.$previousResultButton);
        this.$searchResultsInfo = $('<div class="searchResultsInfo"><span class="info"><span class="number">x</span> <span class="foundFor"></span> \'<span class="terms">y</span>\'</span></div>');
        this.$searchPagerControls.append(this.$searchResultsInfo);
        this.$clearSearchResultsButton = $('<a class="clearSearch" title="' + this.content.clearSearch + '">' + this.content.clearSearch + '</a>');
        this.$searchResultsInfo.append(this.$clearSearchResultsButton);
        this.$nextResultButton = $('<a class="nextResult" title="' + this.content.nextResult + '">' + this.content.nextResult + '</a>');
        this.$searchPagerControls.append(this.$nextResultButton);
        // placemarker line.
        this.$searchResultsContainer = $('<div class="searchResults"></div>');
        this.$element.prepend(this.$searchResultsContainer);
        this.$line = $('<div class="line"></div>');
        this.$searchResultsContainer.append(this.$line);
        this.$pagePositionMarker = $('<div class="positionPlacemarker"></div>');
        this.$searchResultsContainer.append(this.$pagePositionMarker);
        this.$pagePositionLabel = $('<div class="label"></div>');
        this.$searchResultsContainer.append(this.$pagePositionLabel);
        this.$placemarkerDetails = $('<div class="placeMarkerDetails"></div>');
        this.$searchResultsContainer.append(this.$placemarkerDetails);
        this.$placemarkerDetailsTop = $('<h1></h1>');
        this.$placemarkerDetails.append(this.$placemarkerDetailsTop);
        this.$placemarkerDetailsBottom = $('<p></p>');
        this.$placemarkerDetails.append(this.$placemarkerDetailsBottom);
        // initialise ui.
        this.$searchPagerContainer.hide();
        this.$placemarkerDetails.hide();
        // ui event handlers.
        var that = this;
        this.$searchButton.on('click', function (e) {
            e.preventDefault();
            _this.search(_this.$searchText.val());
        });
        this.$searchText.on('focus', function () {
            // clear initial text.
            if (_this.$searchText.val() === _this.content.enterKeyword)
                _this.$searchText.val('');
        });
        this.$placemarkerDetails.on('mouseover', function () {
            that.component.publish(_extensions_uv_openseadragon_extension_Events__WEBPACK_IMPORTED_MODULE_2__["Events"].SEARCH_PREVIEW_START, _this.currentPlacemarkerIndex);
        });
        this.$placemarkerDetails.on('mouseleave', function () {
            $(this).hide();
            that.component.publish(_extensions_uv_openseadragon_extension_Events__WEBPACK_IMPORTED_MODULE_2__["Events"].SEARCH_PREVIEW_FINISH);
            // reset all placemarkers.
            var placemarkers = that.getSearchResultPlacemarkers();
            placemarkers.removeClass('hover');
        });
        this.$placemarkerDetails.on('click', function () {
            that.component.publish(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].CANVAS_INDEX_CHANGED, _this.currentPlacemarkerIndex);
        });
        this.$previousResultButton.on('click', function (e) {
            e.preventDefault();
            if (_this.isPreviousButtonEnabled()) {
                that.component.publish(_extensions_uv_openseadragon_extension_Events__WEBPACK_IMPORTED_MODULE_2__["Events"].PREV_SEARCH_RESULT);
            }
        });
        this.$nextResultButton.on('click', function (e) {
            e.preventDefault();
            if (_this.isNextButtonEnabled()) {
                that.component.publish(_extensions_uv_openseadragon_extension_Events__WEBPACK_IMPORTED_MODULE_2__["Events"].NEXT_SEARCH_RESULT);
            }
        });
        this.$clearSearchResultsButton.on('click', function (e) {
            e.preventDefault();
            that.component.publish(_uv_shared_module_BaseEvents__WEBPACK_IMPORTED_MODULE_1__["BaseEvents"].CLEAR_ANNOTATIONS);
        });
        // hide search options if not enabled/supported.
        if (!this.isSearchEnabled()) {
            this.$searchContainer.hide();
            this.$searchPagerContainer.hide();
            this.$searchResultsContainer.hide();
            this.$element.addClass('min');
        }
        if (this.extension.helper.getTotalCanvases() === 1) {
            this.$searchResultsContainer.hide();
        }
        var autocompleteService = this.extension.getAutoCompleteUri();
        if (autocompleteService) {
            new _uv_shared_module_AutoComplete__WEBPACK_IMPORTED_MODULE_0__["AutoComplete"](this.$searchText, function (terms, cb) {
                $.getJSON(_edsilv_utils__WEBPACK_IMPORTED_MODULE_6__["Strings"].format(autocompleteService, terms), function (results) {
                    cb(results);
                });
            }, function (results) {
                return $.map(results.terms, function (result) {
                    return result.match;
                });
            }, function (terms) {
                _this.search(terms);
            }, 300, 2, true, _edsilv_utils__WEBPACK_IMPORTED_MODULE_6__["Bools"].getBool(this.options.autocompleteAllowWords, false));
        }
        else {
            this.$searchText.on("keyup", function (e) {
                if (e.keyCode === _edsilv_key_codes__WEBPACK_IMPORTED_MODULE_7__["KeyDown"].Enter) {
                    that.search(that.$searchText.val());
                }
            });
        }
        this.$printButton.onPressed(function () {
            that.component.publish(_extensions_uv_openseadragon_extension_Events__WEBPACK_IMPORTED_MODULE_2__["Events"].PRINT);
        });
        this.updatePrintButton();
        var positionMarkerEnabled = _edsilv_utils__WEBPACK_IMPORTED_MODULE_6__["Bools"].getBool(this.config.options.positionMarkerEnabled, true);
        if (!positionMarkerEnabled) {
            this.$pagePositionMarker.hide();
            this.$pagePositionLabel.hide();
        }
    };
    FooterPanel.prototype.isSearchEnabled = function () {
        return this.extension.isSearchEnabled();
    };
    FooterPanel.prototype.isZoomToSearchResultEnabled = function () {
        return _edsilv_utils__WEBPACK_IMPORTED_MODULE_6__["Bools"].getBool(this.extension.data.config.options.zoomToSearchResultEnabled, true);
    };
    FooterPanel.prototype.isPreviousButtonEnabled = function () {
        var currentCanvasIndex = this.extension.helper.canvasIndex;
        var firstSearchResultCanvasIndex = this.getFirstSearchResultCanvasIndex();
        var currentSearchResultRectIndex = this.getCurrentSearchResultRectIndex();
        // if zoom to search result is enabled and there is a highlighted search result.
        if (this.isZoomToSearchResultEnabled() && this.extension.currentAnnotationRect) {
            if (currentCanvasIndex < firstSearchResultCanvasIndex) {
                return false;
            }
            else if (currentCanvasIndex === firstSearchResultCanvasIndex) {
                if (currentSearchResultRectIndex === 0) {
                    return false;
                }
            }
            return true;
        }
        return (currentCanvasIndex > firstSearchResultCanvasIndex);
    };
    FooterPanel.prototype.isNextButtonEnabled = function () {
        var currentCanvasIndex = this.extension.helper.canvasIndex;
        var lastSearchResultCanvasIndex = this.getLastSearchResultCanvasIndex();
        var currentSearchResultRectIndex = this.getCurrentSearchResultRectIndex();
        // if zoom to search result is enabled and there is a highlighted search result.
        if (this.isZoomToSearchResultEnabled() && this.extension.currentAnnotationRect) {
            if (currentCanvasIndex > lastSearchResultCanvasIndex) {
                return false;
            }
            else if (currentCanvasIndex === lastSearchResultCanvasIndex) {
                if (currentSearchResultRectIndex === this.getLastSearchResultRectIndex()) {
                    return false;
                }
            }
            return true;
        }
        return (currentCanvasIndex < lastSearchResultCanvasIndex);
    };
    FooterPanel.prototype.getSearchResults = function () {
        return this.extension.annotations;
    };
    FooterPanel.prototype.getCurrentSearchResultRectIndex = function () {
        return this.extension.getCurrentAnnotationRectIndex();
    };
    FooterPanel.prototype.getFirstSearchResultCanvasIndex = function () {
        var searchResults = this.getSearchResults();
        if (!searchResults)
            return -1;
        var firstSearchResultCanvasIndex = searchResults[0].canvasIndex;
        return firstSearchResultCanvasIndex;
    };
    FooterPanel.prototype.getLastSearchResultCanvasIndex = function () {
        var searchResults = this.getSearchResults();
        if (!searchResults)
            return -1;
        var lastSearchResultCanvasIndex = searchResults[searchResults.length - 1].canvasIndex;
        return lastSearchResultCanvasIndex;
    };
    FooterPanel.prototype.getLastSearchResultRectIndex = function () {
        return this.extension.getLastAnnotationRectIndex();
    };
    FooterPanel.prototype.updateNextButton = function () {
        var searchResults = this.getSearchResults();
        if (searchResults && searchResults.length) {
            if (this.isNextButtonEnabled()) {
                this.$nextResultButton.removeClass('disabled');
            }
            else {
                this.$nextResultButton.addClass('disabled');
            }
        }
    };
    FooterPanel.prototype.updatePrevButton = function () {
        var searchResults = this.getSearchResults();
        if (searchResults && searchResults.length) {
            if (this.isPreviousButtonEnabled()) {
                this.$previousResultButton.removeClass('disabled');
            }
            else {
                this.$previousResultButton.addClass('disabled');
            }
        }
    };
    FooterPanel.prototype.updatePrintButton = function () {
        var configEnabled = _edsilv_utils__WEBPACK_IMPORTED_MODULE_6__["Bools"].getBool(this.options.printEnabled, false);
        //var printService: manifesto.Service = this.extension.helper.manifest.getService(manifesto.ServiceProfile.printExtensions());
        //if (configEnabled && printService && this.extension.isOnHomeDomain()){
        if (configEnabled) {
            this.$printButton.show();
        }
        else {
            this.$printButton.hide();
        }
    };
    FooterPanel.prototype.search = function (terms) {
        this.terms = terms;
        if (this.terms === '' || this.terms === this.content.enterKeyword) {
            this.extension.showMessage(this.extension.data.config.modules.genericDialogue.content.emptyValue, function () {
                this.$searchText.focus();
            });
            return;
        }
        // blur search field
        this.$searchText.blur();
        this.showSearchSpinner();
        this.component.publish(_extensions_uv_openseadragon_extension_Events__WEBPACK_IMPORTED_MODULE_2__["Events"].SEARCH, this.terms);
    };
    FooterPanel.prototype.getSearchResultPlacemarkers = function () {
        return this.$searchResultsContainer.find('.searchResultPlacemarker');
    };
    FooterPanel.prototype.setCurrentSearchResultPlacemarker = function () {
        var placemarkers = this.getSearchResultPlacemarkers();
        placemarkers.parent().find('.current').removeClass('current');
        var $current = $('.searchResultPlacemarker[data-index="' + this.extension.helper.canvasIndex + '"]');
        $current.addClass('current');
    };
    FooterPanel.prototype.positionSearchResultPlacemarkers = function () {
        var searchResults = this.getSearchResults();
        if (!searchResults || !searchResults.length)
            return;
        // clear all existing placemarkers
        var placemarkers = this.getSearchResultPlacemarkers();
        placemarkers.remove();
        var pageWidth = this.getPageLineRatio();
        var lineTop = this.$line.position().top;
        var lineLeft = this.$line.position().left;
        var that = this;
        // for each page with a result, place a marker along the line.
        for (var i = 0; i < searchResults.length; i++) {
            var result = searchResults[i];
            var distance = result.canvasIndex * pageWidth;
            var $placemarker = $('<div class="searchResultPlacemarker" data-index="' + result.canvasIndex + '"></div>');
            $placemarker[0].ontouchstart = function (e) { that.onPlacemarkerTouchStart.call(this, that); };
            $placemarker.click(function (e) { that.onPlacemarkerClick.call(this, that); });
            $placemarker.mouseenter(function (e) { that.onPlacemarkerMouseEnter.call(this, that); });
            $placemarker.mouseleave(function (e) { that.onPlacemarkerMouseLeave.call(this, e, that); });
            this.$searchResultsContainer.append($placemarker);
            var top_1 = lineTop - $placemarker.height();
            var left = lineLeft + distance - ($placemarker.width() / 2);
            $placemarker.css({
                top: top_1,
                left: left
            });
        }
    };
    FooterPanel.prototype.onPlacemarkerTouchStart = function (that) {
        that.placemarkerTouched = true;
        //const $placemarker: JQuery = $(this);
        //const index: number = parseInt($placemarker.attr('data-index'));
        //this.component.publish(Events.VIEW_PAGE, [index]);
    };
    FooterPanel.prototype.onPlacemarkerClick = function (that) {
        if (that.placemarkerTouched)
            return;
        that.placemarkerTouched = false;
        //const $placemarker: JQuery = $(this);
        //const index: number = parseInt($placemarker.attr('data-index'));
        //this.component.publish(Events.VIEW_PAGE, [index]);
    };
    FooterPanel.prototype.onPlacemarkerMouseEnter = function (that) {
        if (that.placemarkerTouched)
            return;
        var $placemarker = $(this);
        $placemarker.addClass('hover');
        var canvasIndex = parseInt($placemarker.attr('data-index'));
        that.component.publish(_extensions_uv_openseadragon_extension_Events__WEBPACK_IMPORTED_MODULE_2__["Events"].SEARCH_PREVIEW_START, canvasIndex);
        var $placemarkers = that.getSearchResultPlacemarkers();
        var elemIndex = $placemarkers.index($placemarker[0]);
        that.currentPlacemarkerIndex = canvasIndex;
        that.$placemarkerDetails.show();
        var title = "{0} {1}";
        if (that.isPageModeEnabled()) {
            var canvas = that.extension.helper.getCanvasByIndex(canvasIndex);
            var label = manifesto_js__WEBPACK_IMPORTED_MODULE_8__["LanguageMap"].getValue(canvas.getLabel());
            if (!label && this.extension.helper.manifest) {
                label = this.extension.helper.manifest.options.defaultLabel;
            }
            if (label) {
                title = _edsilv_utils__WEBPACK_IMPORTED_MODULE_6__["Strings"].format(title, that.content.pageCaps, label);
            }
        }
        else {
            title = _edsilv_utils__WEBPACK_IMPORTED_MODULE_6__["Strings"].format(title, that.content.imageCaps, String(canvasIndex + 1));
        }
        that.$placemarkerDetailsTop.html(title);
        var searchResults = that.getSearchResults();
        if (searchResults) {
            var result = searchResults[elemIndex];
            var terms = "";
            if (that.terms) {
                terms = _edsilv_utils__WEBPACK_IMPORTED_MODULE_6__["Strings"].ellipsis(that.terms, that.options.elideDetailsTermsCount);
            }
            var instanceFoundText = that.content.instanceFound;
            var instancesFoundText = that.content.instancesFound;
            var text = '';
            if (result.rects.length === 1) {
                text = _edsilv_utils__WEBPACK_IMPORTED_MODULE_6__["Strings"].format(instanceFoundText, terms);
                that.$placemarkerDetailsBottom.html(text);
            }
            else {
                text = _edsilv_utils__WEBPACK_IMPORTED_MODULE_6__["Strings"].format(instancesFoundText, String(result.rects.length), terms);
                that.$placemarkerDetailsBottom.html(text);
            }
        }
        var pos = $placemarker.position();
        var top = pos.top - that.$placemarkerDetails.height();
        var left = pos.left;
        if (left < that.$placemarkerDetails.width() / 2) {
            left = 0 - ($placemarker.width() / 2);
        }
        else if (left > that.$line.width() - (that.$placemarkerDetails.width() / 2)) {
            left = that.$line.width() - that.$placemarkerDetails.width() + ($placemarker.width() / 2);
        }
        else {
            left -= (that.$placemarkerDetails.width() / 2);
        }
        that.$placemarkerDetails.css({
            top: top,
            left: left
        });
    };
    FooterPanel.prototype.onPlacemarkerMouseLeave = function (e, that) {
        that.component.publish(_extensions_uv_openseadragon_extension_Events__WEBPACK_IMPORTED_MODULE_2__["Events"].SEARCH_PREVIEW_FINISH);
        var $placemarker = $(this);
        var newElement = e.toElement || e.relatedTarget;
        var isChild = $(newElement).closest(that.$placemarkerDetails).length;
        if (newElement != that.$placemarkerDetails.get(0) && isChild === 0) {
            that.$placemarkerDetails.hide();
            $placemarker.removeClass('hover');
        }
    };
    FooterPanel.prototype.setPageMarkerPosition = function () {
        if (this.extension.helper.canvasIndex === null)
            return;
        // position placemarker showing current page.
        var pageLineRatio = this.getPageLineRatio();
        var lineTop = this.$line.position().top;
        var lineLeft = this.$line.position().left;
        var position = this.extension.helper.canvasIndex * pageLineRatio;
        var top = lineTop;
        var left = lineLeft + position;
        this.$pagePositionMarker.css({
            top: top,
            left: left
        });
        // if the remaining distance to the right is less than the width of the label
        // shift it to the left.
        var lineWidth = this.$line.width();
        if (left + this.$pagePositionLabel.outerWidth(true) > lineWidth) {
            left -= this.$pagePositionLabel.outerWidth(true);
            this.$pagePositionLabel.removeClass('right');
            this.$pagePositionLabel.addClass('left');
        }
        else {
            this.$pagePositionLabel.removeClass('left');
            this.$pagePositionLabel.addClass('right');
        }
        this.$pagePositionLabel.css({
            top: top,
            left: left
        });
    };
    FooterPanel.prototype.clearSearchResults = function () {
        if (!this.isSearchEnabled()) {
            return;
        }
        // clear all existing placemarkers
        var $placemarkers = this.getSearchResultPlacemarkers();
        $placemarkers.remove();
        // clear search input field.
        this.$searchText.val(this.content.enterKeyword);
        // hide pager.
        this.$searchContainer.show();
        this.$searchPagerContainer.hide();
        // set focus to search box.
        this.$searchText.focus();
    };
    FooterPanel.prototype.getPageLineRatio = function () {
        var lineWidth = this.$line.width();
        // find page/width ratio by dividing the line width by the number of pages in the book.
        if (this.extension.helper.getTotalCanvases() === 1)
            return 0;
        return lineWidth / (this.extension.helper.getTotalCanvases() - 1);
    };
    FooterPanel.prototype.canvasIndexChanged = function () {
        this.setPageMarkerPosition();
        this.setPlacemarkerLabel();
    };
    FooterPanel.prototype.settingsChanged = function () {
        this.setPlacemarkerLabel();
    };
    FooterPanel.prototype.setPlacemarkerLabel = function () {
        var displaying = this.content.displaying;
        var index = this.extension.helper.canvasIndex;
        if (this.isPageModeEnabled()) {
            var canvas = this.extension.helper.getCanvasByIndex(index);
            var label = manifesto_js__WEBPACK_IMPORTED_MODULE_8__["LanguageMap"].getValue(canvas.getLabel());
            if (!label) {
                label = this.content.defaultLabel;
            }
            var lastCanvasOrderLabel = this.extension.helper.getLastCanvasLabel(true);
            if (lastCanvasOrderLabel) {
                this.$pagePositionLabel.html(_edsilv_utils__WEBPACK_IMPORTED_MODULE_6__["Strings"].format(displaying, this.content.page, Object(_Utils__WEBPACK_IMPORTED_MODULE_5__["sanitize"])(label), Object(_Utils__WEBPACK_IMPORTED_MODULE_5__["sanitize"])(lastCanvasOrderLabel)));
            }
        }
        else {
            this.$pagePositionLabel.html(_edsilv_utils__WEBPACK_IMPORTED_MODULE_6__["Strings"].format(displaying, this.content.image, String(index + 1), this.extension.helper.getTotalCanvases().toString()));
        }
    };
    FooterPanel.prototype.isPageModeEnabled = function () {
        return this.config.options.pageModeEnabled && this.extension.getMode().toString() === _extensions_uv_openseadragon_extension_Mode__WEBPACK_IMPORTED_MODULE_4__["Mode"].page.toString() && !_edsilv_utils__WEBPACK_IMPORTED_MODULE_6__["Bools"].getBool(this.config.options.forceImageMode, false);
    };
    FooterPanel.prototype.showSearchSpinner = function () {
        this.$searchText.addClass('searching');
    };
    FooterPanel.prototype.hideSearchSpinner = function () {
        this.$searchText.removeClass('searching');
    };
    FooterPanel.prototype.displaySearchResults = function (results, terms) {
        if (!this.isSearchEnabled()) {
            return;
        }
        this.hideSearchSpinner();
        this.positionSearchResultPlacemarkers();
        // show pager.
        this.$searchContainer.hide();
        this.$searchPagerControls.css({
            'left': 0
        });
        var $info = this.$searchResultsInfo.find('.info');
        var $number = $info.find('.number');
        var $foundFor = $info.find('.foundFor');
        var $terms = $info.find('.terms');
        if (terms) {
            $info.show();
            $number.text(this.extension.getTotalAnnotationRects());
            if (results.length === 1) {
                $foundFor.html(this.content.resultFoundFor);
            }
            else {
                $foundFor.html(this.content.resultsFoundFor);
            }
            $terms.html(_edsilv_utils__WEBPACK_IMPORTED_MODULE_6__["Strings"].ellipsis(terms, this.options.elideResultsTermsCount));
            $terms.prop('title', terms);
        }
        else {
            $info.hide();
        }
        this.$searchPagerContainer.show();
        this.resize();
    };
    FooterPanel.prototype.resize = function () {
        _super.prototype.resize.call(this);
        var searchResults = this.getSearchResults();
        if (searchResults && searchResults.length) {
            this.positionSearchResultPlacemarkers();
        }
        this.setPageMarkerPosition();
        this.$searchPagerContainer.width(this.$element.width());
        var center = this.$element.width() / 2;
        // position search pager controls.
        this.$searchPagerControls.css({
            'left': center - (this.$searchPagerControls.width() / 2)
        });
        // position search input.
        this.$searchOptions.css({
            'left': center - (this.$searchOptions.outerWidth() / 2)
        });
    };
    return FooterPanel;
}(_uv_shared_module_FooterPanel__WEBPACK_IMPORTED_MODULE_3__["FooterPanel"]));



/***/ }),

/***/ "./src/modules/uv-shared-module/AnnotationResults.ts":
/*!***********************************************************!*\
  !*** ./src/modules/uv-shared-module/AnnotationResults.ts ***!
  \***********************************************************/
/*! exports provided: AnnotationResults */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnnotationResults", function() { return AnnotationResults; });
var AnnotationResults = /** @class */ (function () {
    function AnnotationResults() {
    }
    return AnnotationResults;
}());



/***/ }),

/***/ "./src/modules/uv-shared-module/AutoComplete.ts":
/*!******************************************************!*\
  !*** ./src/modules/uv-shared-module/AutoComplete.ts ***!
  \******************************************************/
/*! exports provided: AutoComplete */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AutoComplete", function() { return AutoComplete; });
/* harmony import */ var _edsilv_key_codes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @edsilv/key-codes */ "./node_modules/@edsilv/key-codes/dist-esmodule/index.js");
/* harmony import */ var _edsilv_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @edsilv/utils */ "./node_modules/@edsilv/utils/dist-esmodule/index.js");


var AutoComplete = /** @class */ (function () {
    function AutoComplete(element, autoCompleteFunc, parseResultsFunc, onSelect, delay, minChars, positionAbove, allowWords) {
        var _this = this;
        if (delay === void 0) { delay = 300; }
        if (minChars === void 0) { minChars = 2; }
        if (positionAbove === void 0) { positionAbove = false; }
        if (allowWords === void 0) { allowWords = false; }
        this._$element = element;
        this._autoCompleteFunc = autoCompleteFunc;
        this._delay = delay;
        this._minChars = minChars;
        this._onSelect = onSelect;
        this._parseResultsFunc = parseResultsFunc;
        this._positionAbove = positionAbove;
        this._allowWords = allowWords;
        // create ui.
        this._$searchResultsList = $('<ul class="autocomplete"></ul>');
        if (this._positionAbove) {
            this._$element.parent().prepend(this._$searchResultsList);
        }
        else {
            this._$element.parent().append(this._$searchResultsList);
        }
        this._$searchResultTemplate = $('<li class="result"><a href="#" tabindex="-1"></a></li>');
        // init ui.
        // callback after set period.
        var typewatch = (function () {
            var timer = 0;
            return function (cb, ms) {
                clearTimeout(timer);
                timer = setTimeout(cb, ms);
            };
        })();
        var that = this;
        this._$element.on("keydown", function (e) {
            var originalEvent = e.originalEvent;
            //that._lastKeyDownWasNavigation = that._isNavigationKeyDown(originalEvent);
            var charCode = _edsilv_utils__WEBPACK_IMPORTED_MODULE_1__["Keyboard"].getCharCode(originalEvent);
            var cancelEvent = false;
            if (charCode === _edsilv_key_codes__WEBPACK_IMPORTED_MODULE_0__["KeyDown"].LeftArrow) {
                cancelEvent = true;
            }
            else if (charCode === _edsilv_key_codes__WEBPACK_IMPORTED_MODULE_0__["KeyDown"].RightArrow) {
                cancelEvent = true;
            }
            if (cancelEvent) {
                originalEvent.cancelBubble = true;
                if (originalEvent.stopPropagation)
                    originalEvent.stopPropagation();
            }
        });
        // auto complete
        this._$element.on("keyup", function (e) {
            // if pressing enter without a list item selected
            if (!that._getSelectedListItem().length && e.keyCode === _edsilv_key_codes__WEBPACK_IMPORTED_MODULE_0__["KeyDown"].Enter) { // enter
                that._onSelect(that._getTerms());
                return;
            }
            // If there are search results
            if (that._$searchResultsList.is(':visible') && that._results.length) {
                if (e.keyCode === _edsilv_key_codes__WEBPACK_IMPORTED_MODULE_0__["KeyDown"].Enter) {
                    that._searchForItem(that._getSelectedListItem());
                }
                else if (e.keyCode === _edsilv_key_codes__WEBPACK_IMPORTED_MODULE_0__["KeyDown"].DownArrow) {
                    that._setSelectedResultIndex(1);
                    return;
                }
                else if (e.keyCode === _edsilv_key_codes__WEBPACK_IMPORTED_MODULE_0__["KeyDown"].UpArrow) {
                    that._setSelectedResultIndex(-1);
                    return;
                }
            }
            if (e.keyCode !== _edsilv_key_codes__WEBPACK_IMPORTED_MODULE_0__["KeyDown"].Enter) {
                // after a delay, show autocomplete list.
                typewatch(function () {
                    var val = that._getTerms();
                    // if there are more than x chars
                    // update the autocomplete list.
                    if (val && val.length > that._minChars && that._searchForWords(val)) {
                        that._search(val);
                    }
                    else {
                        // otherwise, hide the autocomplete list.
                        that._clearResults();
                        that._hideResults();
                    }
                }, that._delay);
            }
        });
        // hide results if clicked outside.
        $(document).on('mouseup', function (e) {
            if (_this._$searchResultsList.parent().has($(e.target)[0]).length === 0) {
                _this._clearResults();
                _this._hideResults();
            }
        });
        this._hideResults();
    }
    AutoComplete.prototype._searchForWords = function (search) {
        if (this._allowWords || !search.includes(' ')) {
            return true;
        }
        else {
            return false;
        }
    };
    AutoComplete.prototype._getTerms = function () {
        return this._$element.val().trim();
    };
    AutoComplete.prototype._setSelectedResultIndex = function (direction) {
        var nextIndex;
        if (direction === 1) {
            nextIndex = this._selectedResultIndex + 1;
        }
        else {
            nextIndex = this._selectedResultIndex - 1;
        }
        var $items = this._$searchResultsList.find('li');
        if (nextIndex < 0) {
            nextIndex = $items.length - 1;
        }
        else if (nextIndex > $items.length - 1) {
            nextIndex = 0;
        }
        this._selectedResultIndex = nextIndex;
        $items.removeClass('selected');
        var $selectedItem = $items.eq(this._selectedResultIndex);
        $selectedItem.addClass('selected');
        var top = $selectedItem.outerHeight(true) * this._selectedResultIndex;
        this._$searchResultsList.scrollTop(top);
    };
    AutoComplete.prototype._search = function (term) {
        this._results = [];
        this._clearResults();
        this._showResults();
        this._$searchResultsList.append('<li class="loading"></li>');
        this._updateListPosition();
        var that = this;
        this._autoCompleteFunc(term, function (results) {
            that._listResults(results);
        });
    };
    AutoComplete.prototype._clearResults = function () {
        this._$searchResultsList.empty();
    };
    AutoComplete.prototype._hideResults = function () {
        this._$searchResultsList.hide();
    };
    AutoComplete.prototype._showResults = function () {
        this._selectedResultIndex = -1;
        this._$searchResultsList.show();
    };
    AutoComplete.prototype._updateListPosition = function () {
        if (this._positionAbove) {
            this._$searchResultsList.css({
                'top': this._$searchResultsList.outerHeight(true) * -1
            });
        }
        else {
            this._$searchResultsList.css({
                'top': this._$element.outerHeight(true)
            });
        }
    };
    AutoComplete.prototype._listResults = function (results) {
        // get an array of strings
        this._results = this._parseResultsFunc(results);
        this._clearResults();
        if (!this._results.length) {
            // don't do this, because there still may be results for the PHRASE but not the word.
            // they won't know until they do the search.
            //this.searchResultsList.append('<li>no results</li>');
            this._hideResults();
            return;
        }
        for (var i = 0; i < this._results.length; i++) {
            var result = this._results[i];
            var $resultItem = this._$searchResultTemplate.clone();
            var $a = $resultItem.find('a');
            $a.text(result);
            this._$searchResultsList.append($resultItem);
        }
        this._updateListPosition();
        var that = this;
        this._$searchResultsList.find('li').on('click', function (e) {
            e.preventDefault();
            that._searchForItem($(this));
        });
    };
    AutoComplete.prototype._searchForItem = function ($item) {
        var term = $item.find('a').text();
        this._$element.val(term);
        this._hideResults();
        this._onSelect(term);
        this._clearResults();
        this._hideResults();
    };
    AutoComplete.prototype._getSelectedListItem = function () {
        return this._$searchResultsList.find('li.selected');
    };
    return AutoComplete;
}());



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

/***/ "./src/modules/uv-shared-module/Point.ts":
/*!***********************************************!*\
  !*** ./src/modules/uv-shared-module/Point.ts ***!
  \***********************************************/
/*! exports provided: Point */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Point", function() { return Point; });
var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    return Point;
}());



/***/ })

}]);
//# sourceMappingURL=uv-openseadragon-extension.8edda1286d45e4616055.js.map