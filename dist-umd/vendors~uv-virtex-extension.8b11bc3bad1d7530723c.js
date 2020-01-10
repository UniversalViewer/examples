(window["webpackJsonpUV"] = window["webpackJsonpUV"] || []).push([["vendors~uv-virtex-extension"],{

/***/ "./node_modules/virtex3d/dist-esmodule/CORTOFileTypeHandler.js":
/*!*********************************************************************!*\
  !*** ./node_modules/virtex3d/dist-esmodule/CORTOFileTypeHandler.js ***!
  \*********************************************************************/
/*! exports provided: CORTOFileTypeHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CORTOFileTypeHandler", function() { return CORTOFileTypeHandler; });
var CORTOFileTypeHandler = /** @class */ (function () {
    function CORTOFileTypeHandler() {
    }
    CORTOFileTypeHandler.setup = function (viewport, obj) {
        return new Promise(function (resolve) {
            var bufferGeometry = obj.geometry;
            /*            const material = new THREE.MeshStandardMaterial({vertexColors: THREE.VertexColors});
                        let geometry;
                        // Point cloud does not have face indices.
                        if (bufferGeometry.index == null) {
                            geometry = new THREE.Points(bufferGeometry, material);
                        } else {
                            bufferGeometry.computeVertexNormals();
                            geometry = new THREE.Mesh(bufferGeometry, material);
                        }
            */
            // Compute range of the geometry coordinates for proper rendering.
            bufferGeometry.computeBoundingBox();
            var sizeX = bufferGeometry.boundingBox.max.x - bufferGeometry.boundingBox.min.x;
            var sizeY = bufferGeometry.boundingBox.max.y - bufferGeometry.boundingBox.min.y;
            var sizeZ = bufferGeometry.boundingBox.max.z - bufferGeometry.boundingBox.min.z;
            var diagonalSize = Math.sqrt(sizeX * sizeX + sizeY * sizeY + sizeZ * sizeZ);
            var scale = 1.0 / diagonalSize;
            var midX = (bufferGeometry.boundingBox.min.x + bufferGeometry.boundingBox.max.x) / 2;
            var midY = (bufferGeometry.boundingBox.min.y + bufferGeometry.boundingBox.max.y) / 2;
            var midZ = (bufferGeometry.boundingBox.min.z + bufferGeometry.boundingBox.max.z) / 2;
            obj.scale.multiplyScalar(scale);
            obj.position.x = -midX * scale;
            obj.position.y = -midY * scale;
            obj.position.z = -midZ * scale;
            obj.castShadow = true;
            obj.receiveShadow = true;
            //            obj = geometry;
            viewport.objectGroup.add(obj);
            viewport.createCamera();
            resolve(obj);
        });
    };
    return CORTOFileTypeHandler;
}());



/***/ }),

/***/ "./node_modules/virtex3d/dist-esmodule/DRACOFileTypeHandler.js":
/*!*********************************************************************!*\
  !*** ./node_modules/virtex3d/dist-esmodule/DRACOFileTypeHandler.js ***!
  \*********************************************************************/
/*! exports provided: DRACOFileTypeHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DRACOFileTypeHandler", function() { return DRACOFileTypeHandler; });
var DRACOFileTypeHandler = /** @class */ (function () {
    function DRACOFileTypeHandler() {
    }
    DRACOFileTypeHandler.setup = function (viewport, obj) {
        return new Promise(function (resolve) {
            var bufferGeometry = obj;
            var material = new THREE.MeshStandardMaterial({ vertexColors: THREE.VertexColors });
            var geometry;
            // Point cloud does not have face indices.
            if (bufferGeometry.index == null) {
                geometry = new THREE.Points(bufferGeometry, material);
            }
            else {
                bufferGeometry.computeVertexNormals();
                geometry = new THREE.Mesh(bufferGeometry, material);
            }
            // Compute range of the geometry coordinates for proper rendering.
            bufferGeometry.computeBoundingBox();
            var sizeX = bufferGeometry.boundingBox.max.x - bufferGeometry.boundingBox.min.x;
            var sizeY = bufferGeometry.boundingBox.max.y - bufferGeometry.boundingBox.min.y;
            var sizeZ = bufferGeometry.boundingBox.max.z - bufferGeometry.boundingBox.min.z;
            var diagonalSize = Math.sqrt(sizeX * sizeX + sizeY * sizeY + sizeZ * sizeZ);
            var scale = 1.0 / diagonalSize;
            var midX = (bufferGeometry.boundingBox.min.x + bufferGeometry.boundingBox.max.x) / 2;
            var midY = (bufferGeometry.boundingBox.min.y + bufferGeometry.boundingBox.max.y) / 2;
            var midZ = (bufferGeometry.boundingBox.min.z + bufferGeometry.boundingBox.max.z) / 2;
            geometry.scale.multiplyScalar(scale);
            geometry.position.x = -midX * scale;
            geometry.position.y = -midY * scale;
            geometry.position.z = -midZ * scale;
            geometry.castShadow = true;
            geometry.receiveShadow = true;
            obj = geometry;
            viewport.objectGroup.add(obj);
            viewport.createCamera();
            resolve(obj);
        });
    };
    return DRACOFileTypeHandler;
}());



/***/ }),

/***/ "./node_modules/virtex3d/dist-esmodule/FileType.js":
/*!*********************************************************!*\
  !*** ./node_modules/virtex3d/dist-esmodule/FileType.js ***!
  \*********************************************************/
/*! exports provided: FileType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FileType", function() { return FileType; });
var FileType;
(function (FileType) {
    FileType["DRACO"] = "application/draco";
    FileType["CORTO"] = "application/corto";
    FileType["GLTF"] = "model/gltf+json";
    FileType["OBJ"] = "text/plain";
    FileType["PLY"] = "application/ply";
    FileType["THREEJS"] = "application/vnd.threejs+json";
})(FileType || (FileType = {}));


/***/ }),

/***/ "./node_modules/virtex3d/dist-esmodule/ObjFileTypeHandler.js":
/*!*******************************************************************!*\
  !*** ./node_modules/virtex3d/dist-esmodule/ObjFileTypeHandler.js ***!
  \*******************************************************************/
/*! exports provided: ObjFileTypeHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ObjFileTypeHandler", function() { return ObjFileTypeHandler; });
var ObjFileTypeHandler = /** @class */ (function () {
    function ObjFileTypeHandler() {
    }
    ObjFileTypeHandler.setup = function (viewport, objpath, obj) {
        return new Promise(function (resolve) {
            var imgloader = new THREE.MTLLoader();
            imgloader.setCrossOrigin(true);
            imgloader.setPath(objpath.substring(0, objpath.lastIndexOf("/") + 1));
            imgloader.load(obj.materialLibraries[0], function (materials) {
                var objLoader = new THREE.OBJLoader();
                objLoader.setMaterials(materials);
                objLoader.load(objpath, function (obj) {
                    // Compute range of the geometry coordinates for proper rendering.
                    var bufferGeometry = obj.children[0].geometry;
                    bufferGeometry.computeBoundingBox();
                    var sizeX = bufferGeometry.boundingBox.max.x - bufferGeometry.boundingBox.min.x;
                    var sizeY = bufferGeometry.boundingBox.max.y - bufferGeometry.boundingBox.min.y;
                    var sizeZ = bufferGeometry.boundingBox.max.z - bufferGeometry.boundingBox.min.z;
                    var diagonalSize = Math.sqrt(sizeX * sizeX + sizeY * sizeY + sizeZ * sizeZ);
                    var scale = 1.0 / diagonalSize;
                    var midX = (bufferGeometry.boundingBox.min.x + bufferGeometry.boundingBox.max.x) / 2;
                    var midY = (bufferGeometry.boundingBox.min.y + bufferGeometry.boundingBox.max.y) / 2;
                    var midZ = (bufferGeometry.boundingBox.min.z + bufferGeometry.boundingBox.max.z) / 2;
                    obj.scale.multiplyScalar(scale);
                    obj.position.x = -midX * scale;
                    obj.position.y = -midY * scale;
                    obj.position.z = -midZ * scale;
                    obj.castShadow = true;
                    obj.receiveShadow = true;
                    viewport.objectGroup.add(obj);
                    viewport.createCamera();
                    resolve(obj);
                }, function () {
                    //console.log("obj progress", e);
                }, function () {
                    //console.log("obj error", e);
                });
            }, function () {
                //console.log("mtl progress", e);
            }, function () {
                //console.log("mtl error", e);
            });
        });
    };
    return ObjFileTypeHandler;
}());



/***/ }),

/***/ "./node_modules/virtex3d/dist-esmodule/PLYFiletypeHandler.js":
/*!*******************************************************************!*\
  !*** ./node_modules/virtex3d/dist-esmodule/PLYFiletypeHandler.js ***!
  \*******************************************************************/
/*! exports provided: PLYFileTypeHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PLYFileTypeHandler", function() { return PLYFileTypeHandler; });
var PLYFileTypeHandler = /** @class */ (function () {
    function PLYFileTypeHandler() {
    }
    PLYFileTypeHandler.setup = function (viewport, geometry) {
        return new Promise(function (resolve) {
            var material = new THREE.PointsMaterial({ vertexColors: THREE.VertexColors });
            material.sizeAttenuation = false;
            var mesh = new THREE.Points(geometry, material);
            viewport.objectGroup.add(mesh);
            viewport.createCamera();
            resolve(mesh);
        });
    };
    return PLYFileTypeHandler;
}());



/***/ }),

/***/ "./node_modules/virtex3d/dist-esmodule/ThreeJSFileTypeHandler.js":
/*!***********************************************************************!*\
  !*** ./node_modules/virtex3d/dist-esmodule/ThreeJSFileTypeHandler.js ***!
  \***********************************************************************/
/*! exports provided: ThreeJSFileTypeHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ThreeJSFileTypeHandler", function() { return ThreeJSFileTypeHandler; });
var ThreeJSFileTypeHandler = /** @class */ (function () {
    function ThreeJSFileTypeHandler() {
    }
    ThreeJSFileTypeHandler.setup = function (viewport, obj) {
        return new Promise(function (resolve) {
            // use the three.js setting in Blender's material tab
            // if (this.options.doubleSided) {
            //     obj.traverse((child: any) => {
            //         if (child.material) child.material.side = THREE.DoubleSide;
            //     });
            // }
            viewport.objectGroup.add(obj);
            viewport.createCamera();
            resolve(obj);
        });
    };
    return ThreeJSFileTypeHandler;
}());



/***/ }),

/***/ "./node_modules/virtex3d/dist-esmodule/Viewport.js":
/*!*********************************************************!*\
  !*** ./node_modules/virtex3d/dist-esmodule/Viewport.js ***!
  \*********************************************************/
/*! exports provided: Viewport, Events */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Viewport", function() { return Viewport; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Events", function() { return Events; });
/* harmony import */ var _FileType__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FileType */ "./node_modules/virtex3d/dist-esmodule/FileType.js");
/* harmony import */ var _PLYFiletypeHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PLYFiletypeHandler */ "./node_modules/virtex3d/dist-esmodule/PLYFiletypeHandler.js");
/* harmony import */ var _ObjFileTypeHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ObjFileTypeHandler */ "./node_modules/virtex3d/dist-esmodule/ObjFileTypeHandler.js");
/* harmony import */ var _ThreeJSFileTypeHandler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ThreeJSFileTypeHandler */ "./node_modules/virtex3d/dist-esmodule/ThreeJSFileTypeHandler.js");
/* harmony import */ var _glTFFileTypeHandler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./glTFFileTypeHandler */ "./node_modules/virtex3d/dist-esmodule/glTFFileTypeHandler.js");
/* harmony import */ var _CORTOFileTypeHandler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./CORTOFileTypeHandler */ "./node_modules/virtex3d/dist-esmodule/CORTOFileTypeHandler.js");
/* harmony import */ var _DRACOFileTypeHandler__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./DRACOFileTypeHandler */ "./node_modules/virtex3d/dist-esmodule/DRACOFileTypeHandler.js");







var Viewport = /** @class */ (function () {
    function Viewport(options) {
        this._isFullscreen = false;
        this._isMouseDown = false;
        this._isMouseOver = false;
        this._mousePos = new THREE.Vector2();
        this._mousePosNorm = new THREE.Vector2(-1, -1);
        this._mousePosOnMouseDown = new THREE.Vector2();
        this._pinchStart = new THREE.Vector2();
        this._raycastObjectCache = null;
        this._targetRotation = new THREE.Vector2();
        this._targetRotationOnMouseDown = new THREE.Vector2();
        this._viewportCenter = new THREE.Vector2();
        this.options = options;
        this.options.data = Object.assign({}, this.data(), options.data);
        this._init();
        this.resize();
    }
    Viewport.prototype._init = function () {
        this._element = this.options.target;
        if (!this._element) {
            console.warn('target not found');
            return;
        }
        this._element.innerHTML = '';
        if (!Detector.webgl) {
            Detector.addGetWebGLMessage();
            this._oldie = document.querySelector('#oldie');
            this._element.appendChild(this._oldie);
            return;
        }
        this._viewport = document.createElement('div');
        this._viewport.classList.add('viewport');
        this._loading = document.createElement('div');
        this._loading.classList.add('loading');
        this._loadingBar = document.createElement('div');
        this._loadingBar.classList.add('loadingBar');
        this._loadingBarProgress = document.createElement('div');
        this._loadingBarProgress.classList.add('loadingBarProgress');
        this._spinner = document.createElement('div');
        this._spinner.classList.add('spinner');
        this._loadingBar.style.display = 'none';
        this._loadingBarProgress.style.display = 'none';
        this._spinner.style.display = 'none';
        this._element.appendChild(this._viewport);
        this._raycaster = new THREE.Raycaster();
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(this.options.data.backgroundColor);
        this.objectGroup = new THREE.Object3D();
        this.scene.add(this.objectGroup);
        this.createLights();
        this.createCamera();
        this._createRenderer();
        this._createDOMHandlers();
        this._animate();
        this._viewport.appendChild(this._loading);
        this._loading.appendChild(this._loadingBar);
        this._loading.appendChild(this._loadingBarProgress);
        this._loading.appendChild(this._spinner);
        this._loading.classList.add('beforeload');
        this._loadObject(this.options.data.file);
        // STATS //
        if (this.options.data.showStats) {
            this._stats = new Stats();
            this._stats.domElement.style.position = 'absolute';
            this._stats.domElement.style.top = '0px';
            this._viewport.appendChild(this._stats.domElement);
        }
        var canvas = this._element.querySelector('canvas');
        canvas.oncontextmenu = function () { return false; };
    };
    Viewport.prototype.data = function () {
        return {
            alpha: true,
            ambientLightColor: 0xd0d0d0,
            ambientLightIntensity: 1,
            antialias: true,
            cameraZ: 6,
            directionalLight1Color: 0xffffff,
            directionalLight1Intensity: 0.75,
            directionalLight2Color: 0x002958,
            directionalLight2Intensity: 0.5,
            doubleSided: true,
            fadeSpeed: 1750,
            far: 10000,
            file: "",
            fullscreenEnabled: true,
            maxZoom: 10,
            minZoom: 2,
            near: 0.05,
            shading: THREE.SmoothShading,
            showStats: false,
            type: _FileType__WEBPACK_IMPORTED_MODULE_0__["FileType"].OBJ,
            backgroundColor: 0x000000,
            zoomSpeed: 1,
            dracoDecoderPath: './'
        };
    };
    Viewport.prototype._animate = function () {
        this.renderer.animate(this._render.bind(this));
    };
    Viewport.prototype._onPointerRestricted = function () {
        var pointerLockElement = this.renderer.domElement;
        if (pointerLockElement && typeof (pointerLockElement.requestPointerLock) === 'function') {
            pointerLockElement.requestPointerLock();
        }
    };
    Viewport.prototype._onPointerUnrestricted = function () {
        var currentPointerLockElement = document.pointerLockElement;
        var expectedPointerLockElement = this.renderer.domElement;
        if (currentPointerLockElement && currentPointerLockElement === expectedPointerLockElement && typeof (document.exitPointerLock) === 'function') {
            document.exitPointerLock();
        }
    };
    Viewport.prototype.createLights = function () {
        // remove any existing lights
        var existingLights = this.scene.getObjectByName('lights');
        if (existingLights) {
            this.scene.remove(existingLights);
        }
        this._lightGroup = new THREE.Object3D();
        this._lightGroup.name = "lights";
        this.scene.add(this._lightGroup);
        var light1 = new THREE.DirectionalLight(this.options.data.directionalLight1Color, this.options.data.directionalLight1Intensity);
        light1.position.set(1, 1, 1);
        this._lightGroup.add(light1);
        var light2 = new THREE.DirectionalLight(this.options.data.directionalLight2Color, this.options.data.directionalLight2Intensity);
        light2.position.set(-1, -1, -1);
        this._lightGroup.add(light2);
        var ambientLight = new THREE.AmbientLight(this.options.data.ambientLightColor, this.options.data.ambientLightIntensity);
        this._lightGroup.add(ambientLight);
    };
    Viewport.prototype.createCamera = function (camera) {
        if (camera) {
            this.camera = camera;
        }
        else {
            this.camera = new THREE.PerspectiveCamera(this._getFov(), this._getAspectRatio(), this.options.data.near, this.options.data.far);
            var cameraZ = this._getCameraZ();
            this.camera.position.z = this._targetZoom = cameraZ;
        }
        this.scene.add(this.camera);
        //this.camera.updateProjectionMatrix();
    };
    Viewport.prototype._createRenderer = function () {
        this._viewport.innerHTML = '';
        this.renderer = new THREE.WebGLRenderer({
            antialias: this.options.data.antialias,
            alpha: this.options.data.alpha
        });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this._viewport.offsetWidth, this._viewport.offsetHeight);
        //(<any>this.renderer).vr.enabled = this._isVRMode;
        this._viewport.appendChild(this.renderer.domElement);
    };
    Viewport.prototype._setVRDisplay = function (vrDisplay) {
        this._vrDisplay = vrDisplay;
        this.renderer.vr.setDevice(this._vrDisplay);
        this.fire(Events.VR_AVAILABLE);
    };
    Viewport.prototype._createDOMHandlers = function () {
        var _this = this;
        if ('getVRDisplays' in navigator) {
            window.addEventListener('vrdisplayconnect', function (event) {
                _this._setVRDisplay(event.display);
            }, false);
            window.addEventListener('vrdisplaydisconnect', function () {
                _this.fire(Events.VR_UNAVAILABLE);
                _this.renderer.vr.setDevice(null);
            }, false);
            window.addEventListener('vrdisplaypresentchange', function (event) {
                console.log(event.display.isPresenting ? 'ENTER VR' : 'EXIT VR');
            }, false);
            navigator.getVRDisplays()
                .then(function (displays) {
                if (displays.length > 0) {
                    _this._setVRDisplay(displays[0]);
                }
                else {
                    _this.fire(Events.VR_UNAVAILABLE);
                }
            });
        }
        window.addEventListener('vrdisplaypointerrestricted', this._onPointerRestricted.bind(this), false);
        window.addEventListener('vrdisplaypointerunrestricted', this._onPointerUnrestricted.bind(this), false);
        if (this.options.data.fullscreenEnabled) {
            document.addEventListener('webkitfullscreenchange', function () {
                _this._fullscreenChanged();
            });
            document.addEventListener('mozfullscreenchange', function () {
                _this._fullscreenChanged();
            });
            document.addEventListener('fullscreenchange', function () {
                _this._fullscreenChanged();
            });
        }
        this._element.addEventListener('mousedown', function (e) {
            _this._onMouseDown(e);
        });
        this._element.addEventListener('mousemove', function (e) {
            _this._onMouseMove(e);
        });
        this._element.addEventListener('mouseup', function () {
            _this._onMouseUp();
        });
        this._element.addEventListener('mouseout', function () {
            _this._onMouseOut();
        });
        this._element.addEventListener('mousewheel', function (e) {
            _this._onMouseWheel(e);
        });
        this._element.addEventListener('DOMMouseScroll', function (e) {
            _this._onMouseWheel(e); // firefox
        });
        this._element.addEventListener('touchstart', function (e) {
            _this._onTouchStart(e);
        });
        this._element.addEventListener('touchmove', function (e) {
            _this._onTouchMove(e);
        });
        this._element.addEventListener('touchend', function () {
            _this._onTouchEnd();
        });
        window.addEventListener('resize', function () {
            _this.resize();
        }, false);
    };
    Viewport.prototype._loadObject = function (objectPath) {
        var _this = this;
        return new Promise(function (resolve) {
            _this._loading.classList.remove('beforeload');
            _this._loading.classList.add('duringload');
            var loader;
            switch (_this.options.data.type) {
                case _FileType__WEBPACK_IMPORTED_MODULE_0__["FileType"].DRACO:
                    loader = new THREE.DRACOLoader();
                    break;
                case _FileType__WEBPACK_IMPORTED_MODULE_0__["FileType"].CORTO:
                    loader = new THREE.CORTOLoader();
                    break;
                case _FileType__WEBPACK_IMPORTED_MODULE_0__["FileType"].GLTF:
                    loader = new THREE.GLTFLoader();
                    var dracoDecoderPath = _this.options.data.dracoDecoderPath;
                    THREE.DRACOLoader.setDecoderPath(dracoDecoderPath);
                    var dracoLoader = new THREE.DRACOLoader();
                    loader.setDRACOLoader(dracoLoader);
                    break;
                case _FileType__WEBPACK_IMPORTED_MODULE_0__["FileType"].OBJ:
                    loader = new THREE.OBJLoader();
                    break;
                case _FileType__WEBPACK_IMPORTED_MODULE_0__["FileType"].THREEJS:
                    loader = new THREE.ObjectLoader();
                    break;
                case _FileType__WEBPACK_IMPORTED_MODULE_0__["FileType"].PLY:
                    loader = new THREE.PLYLoader();
                    break;
            }
            if (loader.setCrossOrigin) {
                loader.setCrossOrigin('anonymous');
            }
            loader.load(objectPath, function (obj) {
                switch (_this.options.data.type.toString()) {
                    case _FileType__WEBPACK_IMPORTED_MODULE_0__["FileType"].DRACO.toString():
                        _DRACOFileTypeHandler__WEBPACK_IMPORTED_MODULE_6__["DRACOFileTypeHandler"].setup(_this, obj).then(function (obj) {
                            _this._loaded(obj);
                            resolve();
                        });
                        break;
                    case _FileType__WEBPACK_IMPORTED_MODULE_0__["FileType"].CORTO.toString():
                        _CORTOFileTypeHandler__WEBPACK_IMPORTED_MODULE_5__["CORTOFileTypeHandler"].setup(_this, obj).then(function (obj) {
                            _this._loaded(obj);
                            resolve();
                        });
                        break;
                    case _FileType__WEBPACK_IMPORTED_MODULE_0__["FileType"].GLTF.toString():
                        _glTFFileTypeHandler__WEBPACK_IMPORTED_MODULE_4__["glTFFileTypeHandler"].setup(_this, obj).then(function (obj) {
                            _this._loaded(obj);
                            resolve();
                        });
                        break;
                    case _FileType__WEBPACK_IMPORTED_MODULE_0__["FileType"].THREEJS.toString():
                        _ThreeJSFileTypeHandler__WEBPACK_IMPORTED_MODULE_3__["ThreeJSFileTypeHandler"].setup(_this, obj).then(function (obj) {
                            _this._loaded(obj);
                            resolve();
                        });
                        break;
                    case _FileType__WEBPACK_IMPORTED_MODULE_0__["FileType"].OBJ.toString():
                        _ObjFileTypeHandler__WEBPACK_IMPORTED_MODULE_2__["ObjFileTypeHandler"].setup(_this, objectPath, obj).then(function (obj) {
                            _this._loaded(obj);
                            resolve();
                        });
                        break;
                    case _FileType__WEBPACK_IMPORTED_MODULE_0__["FileType"].PLY.toString():
                        _PLYFiletypeHandler__WEBPACK_IMPORTED_MODULE_1__["PLYFileTypeHandler"].setup(_this, obj).then(function (obj) {
                            _this._loaded(obj);
                            resolve();
                        });
                        break;
                }
            }, function (e) {
                // e.lengthComputable is false when content is gzipped.
                // https://stackoverflow.com/questions/11127654/why-is-progressevent-lengthcomputable-false/11848934?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
                if (e.lengthComputable) {
                    _this._loadingBarVisible(true);
                    _this._spinnerVisible(false);
                    _this._loadProgress(e.loaded / e.total);
                }
                else {
                    // show a spinner
                    _this._loadingBarVisible(false);
                    _this._spinnerVisible(true);
                }
            }, function (e) {
                // error
                console.error(e);
            });
        });
    };
    Viewport.prototype._loadingBarVisible = function (visible) {
        if (visible) {
            this._loadingBar.style.display = 'block';
            this._loadingBarProgress.style.display = 'block';
        }
        else {
            this._loadingBar.style.display = 'none';
            this._loadingBarProgress.style.display = 'none';
        }
    };
    Viewport.prototype._spinnerVisible = function (visible) {
        if (visible) {
            this._spinner.style.display = 'block';
        }
        else {
            this._spinner.style.display = 'none';
        }
    };
    Viewport.prototype._loaded = function (obj) {
        // const boundingBox = new THREE.BoxHelper(this.objectGroup, new THREE.Color(0xffffff));
        // this.scene.add(boundingBox);
        // obj.children[0].transparent = true;
        // obj.children[0].material.opacity = 0.01;
        this._loading.classList.remove('duringload');
        this._loading.classList.add('afterload');
        this.fire(Events.LOADED, [obj]);
    };
    /*
    public annotate(): void {
        
        const intersects: THREE.Intersection[] = this._getObjectsIntersectingWithMouse();
        
        if (intersects.length) {

            const intersection: THREE.Intersection = intersects[0];

            // create a sphere
            const sphereGeometry: THREE.SphereGeometry = new THREE.SphereGeometry(.1);
            const sphereMaterial: THREE.MeshLambertMaterial = new THREE.MeshLambertMaterial({
                color: 0x0000ff
            });
            const sphere: THREE.Mesh = new THREE.Mesh(sphereGeometry, sphereMaterial);

            sphere.position.copy(intersection.point);

            // https://stackoverflow.com/questions/26400570/translate-a-vector-from-global-space-to-local-vector-in-three-js
            this.objectGroup.updateMatrixWorld(false);
            sphere.applyMatrix(new THREE.Matrix4().getInverse(this.objectGroup.matrixWorld));
            //this.scene.add(sphere);
            this.objectGroup.add(sphere);

            this.fire(Events.ANNOTATION_TARGET, intersection);
        }
    }
    */
    Viewport.prototype._getBoundingBox = function () {
        return new THREE.Box3().setFromObject(this.objectGroup);
    };
    // private _getBoundingWidth(): number {
    //     const target: THREE.Vector3 = new THREE.Vector3();
    //     this._getBoundingBox().getSize(target);
    //     return target.x;
    // }
    // private _getBoundingHeight(): number {
    //     const target: THREE.Vector3 = new THREE.Vector3();
    //     this._getBoundingBox().getSize(target);
    //     return target.y;
    // }
    Viewport.prototype._getBoundingMag = function () {
        var size = new THREE.Vector3();
        this._getBoundingBox().getSize(size).length();
        return size.length();
    };
    // private _getDistanceToObject(): number {
    //     return this.camera.position.distanceTo(this.objectGroup.position);
    // }
    Viewport.prototype._getCameraZ = function () {
        return this._getBoundingMag() * this.options.data.cameraZ;
    };
    Viewport.prototype._getFov = function () {
        // const width: number = this._getBoundingWidth();
        // const height: number = this._getBoundingHeight(); // todo: use getSize and update definition
        var dist = this._getCameraZ();
        var mag = this._getBoundingMag();
        //http://stackoverflow.com/questions/14614252/how-to-fit-camera-to-object
        var fov = 2 * Math.atan(mag / (2 * dist)) * (180 / Math.PI);
        //let fov: number = 2 * Math.atan((width / this._getAspectRatio()) / (2 * dist)) * (180 / Math.PI);
        return fov;
    };
    Viewport.prototype._loadProgress = function (progress) {
        var fullWidth = this._loading.offsetWidth;
        var width = Math.floor(fullWidth * progress);
        this._loadingBarProgress.style.width = String(width) + "px";
    };
    Viewport.prototype._onMouseDown = function (event) {
        event.preventDefault();
        this._isMouseDown = true;
        this._mousePosOnMouseDown.x = event.clientX - this._viewportCenter.x;
        this._targetRotationOnMouseDown.x = this._targetRotation.x;
        this._mousePosOnMouseDown.y = event.clientY - this._viewportCenter.y;
        this._targetRotationOnMouseDown.y = this._targetRotation.y;
    };
    Viewport.prototype._onMouseMove = function (event) {
        this._mousePos.x = event.clientX - this._viewportCenter.x;
        this._mousePos.y = event.clientY - this._viewportCenter.y;
        this._mousePosNorm.x = (event.clientX / this._getWidth()) * 2 - 1;
        this._mousePosNorm.y = -(event.clientY / this._getHeight()) * 2 + 1;
        if (this._isMouseDown) {
            this._targetRotation.y = this._targetRotationOnMouseDown.y + (this._mousePos.y - this._mousePosOnMouseDown.y) * 0.02;
            this._targetRotation.x = this._targetRotationOnMouseDown.x + (this._mousePos.x - this._mousePosOnMouseDown.x) * 0.02;
        }
    };
    Viewport.prototype._onMouseUp = function () {
        this._isMouseDown = false;
    };
    Viewport.prototype._onMouseOut = function () {
        this._isMouseDown = false;
    };
    Viewport.prototype._onMouseWheel = function (event) {
        event.preventDefault();
        event.stopPropagation();
        var delta = 0;
        if (event.wheelDelta !== undefined) { // WebKit / Opera / Explorer 9
            delta = event.wheelDelta;
        }
        else if (event.detail !== undefined) { // Firefox
            delta = -event.detail;
        }
        if (delta > 0) {
            this.zoomIn();
        }
        else if (delta < 0) {
            this.zoomOut();
        }
    };
    Viewport.prototype._onTouchStart = function (event) {
        var touches = event.touches;
        if (touches.length === 1) {
            this._isMouseDown = true;
            event.preventDefault();
            this._mousePosOnMouseDown.x = touches[0].pageX - this._viewportCenter.x;
            this._targetRotationOnMouseDown.x = this._targetRotation.x;
            this._mousePosOnMouseDown.y = touches[0].pageY - this._viewportCenter.y;
            this._targetRotationOnMouseDown.y = this._targetRotation.y;
        }
    };
    Viewport.prototype._onTouchMove = function (event) {
        event.preventDefault();
        event.stopPropagation();
        var touches = event.touches;
        switch (touches.length) {
            case 1: // one-fingered touch: rotate
                event.preventDefault();
                this._mousePos.x = touches[0].pageX - this._viewportCenter.x;
                this._targetRotation.x = this._targetRotationOnMouseDown.x + (this._mousePos.x - this._mousePosOnMouseDown.x) * 0.05;
                this._mousePos.y = touches[0].pageY - this._viewportCenter.y;
                this._targetRotation.y = this._targetRotationOnMouseDown.y + (this._mousePos.y - this._mousePosOnMouseDown.y) * 0.05;
                break;
            case 2: // two-fingered touch: zoom
                var dx = touches[0].pageX - touches[1].pageX;
                var dy = touches[0].pageY - touches[1].pageY;
                var distance = Math.sqrt(dx * dx + dy * dy);
                var pinchEnd = new THREE.Vector2(0, distance);
                var pinchDelta = new THREE.Vector2();
                pinchDelta.subVectors(pinchEnd, this._pinchStart);
                if (pinchDelta.y > 0) {
                    this.zoomIn();
                }
                else if (pinchDelta.y < 0) {
                    this.zoomOut();
                }
                this._pinchStart.copy(pinchEnd);
                break;
            case 3: // three-fingered touch: pan
                //var panEnd = new THREE.Vector2();
                //panEnd.set(touches[0].pageX, touches[0].pageY);
                //var panDelta = new THREE.Vector2();
                //panDelta.subVectors(panEnd, panStart);
                //
                //panCamera(panDelta.x, panDelta.y);
                //
                //panStart.copy(panEnd);
                break;
        }
    };
    Viewport.prototype._onTouchEnd = function () {
        this._isMouseDown = false;
    };
    Viewport.prototype.rotateY = function (radians) {
        var rotation = this.objectGroup.rotation.y + radians;
        this.objectGroup.rotation.y = rotation;
    };
    // private _applyTransform(): void{
    //     this.objectGroup.updateMatrix();
    //     //this.objectGroup.geometry.applyMatrix( this.objectGroup.matrix );
    //     this.objectGroup.position.set( 0, 0, 0 );
    //     this.objectGroup.rotation.set( 0, 0, 0 );
    //     this.objectGroup.scale.set( 1, 1, 1 );
    //     this.objectGroup.updateMatrix();
    // }
    Viewport.prototype._render = function () {
        // horizontal rotation
        this.rotateY((this._targetRotation.x - this.objectGroup.rotation.y) * 0.1);
        // vertical rotation
        var finalRotationY = (this._targetRotation.y - this.objectGroup.rotation.x);
        if (this.objectGroup.rotation.x <= 1 && this.objectGroup.rotation.x >= -1) {
            this.objectGroup.rotation.x += finalRotationY * 0.1;
        }
        // limit vertical rotation 
        if (this.objectGroup.rotation.x > 1) {
            this.objectGroup.rotation.x = 1;
        }
        else if (this.objectGroup.rotation.x < -1) {
            this.objectGroup.rotation.x = -1;
        }
        var zoomDelta = (this._targetZoom - this.camera.position.z) * 0.1;
        this.camera.position.z += zoomDelta;
        this._isMouseOver = this._getObjectsIntersectingWithMouse().length > 0;
        // update mouse cursor
        if (this._isMouseOver) {
            this._element.classList.add('grabbable');
        }
        else {
            this._element.classList.remove('grabbable');
        }
        if (this._isMouseDown) {
            this._element.classList.add('grabbing');
        }
        else {
            this._element.classList.remove('grabbing');
        }
        this.renderer.render(this.scene, this.camera);
    };
    Viewport.prototype._getObjectsIntersectingWithMouse = function () {
        var intersects = [];
        if (this.objectGroup.children.length) {
            // cast a ray from the mouse position
            this._raycaster.setFromCamera(this._mousePosNorm, this.camera);
            var obj = this._getRaycastObject();
            if (obj) {
                intersects = this._raycaster.intersectObject(obj);
            }
        }
        return intersects;
    };
    Viewport.prototype._getRaycastObject = function () {
        var _this = this;
        if (this._raycastObjectCache) {
            return this._raycastObjectCache;
        }
        this.objectGroup.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                _this._raycastObjectCache = child;
            }
        });
        return this._raycastObjectCache;
    };
    Viewport.prototype._getWidth = function () {
        if (this._isFullscreen) {
            return window.innerWidth;
        }
        return this._element.offsetWidth;
    };
    Viewport.prototype._getHeight = function () {
        if (this._isFullscreen) {
            return window.innerHeight;
        }
        return this._element.offsetHeight;
    };
    Viewport.prototype._getZoomSpeed = function () {
        return this._getBoundingMag() * this.options.data.zoomSpeed;
    };
    Viewport.prototype._getMaxZoom = function () {
        return this._getBoundingMag() * this.options.data.maxZoom;
    };
    Viewport.prototype._getMinZoom = function () {
        return this._getBoundingMag() * this.options.data.minZoom;
    };
    Viewport.prototype.zoomIn = function () {
        var targetZoom = this.camera.position.z - this._getZoomSpeed();
        if (targetZoom > this._getMinZoom()) {
            this._targetZoom = targetZoom;
        }
        else {
            this._targetZoom = this._getMinZoom();
        }
    };
    Viewport.prototype.zoomOut = function () {
        var targetZoom = this.camera.position.z + this._getZoomSpeed();
        if (targetZoom < this._getMaxZoom()) {
            this._targetZoom = targetZoom;
        }
        else {
            this._targetZoom = this._getMaxZoom();
        }
    };
    Viewport.prototype.enterVR = function () {
        this._vrDisplay.requestPresent([{ source: this.renderer.domElement }]);
        this.renderer.vr.enabled = true;
        this._prevCameraPosition = this.camera.position.clone();
        this._prevCameraRotation = this.camera.rotation.clone();
        this._prevObjectPosition = this.objectGroup.position.clone();
        this.objectGroup.position.z -= this._getBoundingMag();
    };
    Viewport.prototype.exitVR = function () {
        this._vrDisplay.exitPresent();
        this.renderer.vr.enabled = false;
        this.camera.position.copy(this._prevCameraPosition);
        this.camera.rotation.copy(this._prevCameraRotation);
        this.objectGroup.position.copy(this._prevObjectPosition);
    };
    Viewport.prototype.toggleVR = function () {
        if (!this._vrDisplay) {
            return;
        }
        if (this._vrDisplay.isPresenting) {
            this.exitVR();
        }
        else {
            this.enterVR();
        }
    };
    Viewport.prototype._getAspectRatio = function () {
        // if (this._isFullscreen) {
        //     return window.innerWidth / window.innerHeight;
        // } else {
        return this._viewport.offsetWidth / this._viewport.offsetHeight;
        //}
    };
    Viewport.prototype.on = function (name, callback, ctx) {
        var e = this._e || (this._e = {});
        (e[name] || (e[name] = [])).push({
            fn: callback,
            ctx: ctx
        });
    };
    Viewport.prototype.fire = function (name) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var data = [].slice.call(arguments, 1);
        var evtArr = ((this._e || (this._e = {}))[name] || []).slice();
        var i = 0;
        var len = evtArr.length;
        for (i; i < len; i++) {
            evtArr[i].fn.apply(evtArr[i].ctx, data);
        }
    };
    Viewport.prototype.enterFullscreen = function () {
        if (!this.options.data.fullscreenEnabled)
            return;
        var elem = this._viewport;
        var requestFullScreen = this._getRequestFullScreen(elem);
        if (requestFullScreen) {
            requestFullScreen.call(elem);
        }
    };
    Viewport.prototype.exitFullscreen = function () {
        var exitFullScreen = this._getExitFullScreen();
        if (exitFullScreen) {
            exitFullScreen.call(document);
        }
    };
    Viewport.prototype._getRequestFullScreen = function (elem) {
        if (elem.requestFullscreen) {
            return elem.requestFullscreen;
        }
        else if (elem.msRequestFullscreen) {
            return elem.msRequestFullscreen;
        }
        else if (elem.mozRequestFullScreen) {
            return elem.mozRequestFullScreen;
        }
        else if (elem.webkitRequestFullscreen) {
            return elem.webkitRequestFullscreen;
        }
        return false;
    };
    Viewport.prototype._getExitFullScreen = function () {
        if (document.exitFullscreen) {
            return document.exitFullscreen;
        }
        else if (document.msExitFullscreen) {
            return document.msExitFullscreen;
        }
        else if (document.mozCancelFullScreen) {
            return document.mozCancelFullScreen;
        }
        else if (document.webkitExitFullscreen) {
            return document.webkitExitFullscreen;
        }
        return false;
    };
    Viewport.prototype._fullscreenChanged = function () {
        this._isFullscreen = !this._isFullscreen;
        this.resize();
    };
    Viewport.prototype.resize = function () {
        if (this._element && this._viewport) {
            var width = this._getWidth() + "px";
            var height = this._getHeight() + "px";
            this._viewport.style.width = width;
            this._viewport.style.height = height;
            this._viewportCenter.x = this._viewport.offsetWidth / 2;
            this._viewportCenter.y = this._viewport.offsetHeight / 2;
            this.camera.aspect = this._getAspectRatio();
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(this._viewport.offsetWidth, this._viewport.offsetHeight);
            this._loading.style.left = String((this._viewportCenter.x) - (this._loading.offsetWidth / 2)) + "px";
            this._loading.style.top = String((this._viewportCenter.y) - (this._loading.offsetHeight / 2)) + "px";
        }
        else if (this._oldie) {
            this._oldie.style.left = String((this._element.offsetWidth / 2) - (this._oldie.offsetWidth / 2)) + "px";
            this._oldie.style.top = String((this._element.offsetHeight / 2) - (this._oldie.offsetHeight / 2)) + "px";
        }
    };
    return Viewport;
}());

var Events = /** @class */ (function () {
    function Events() {
    }
    //static ANNOTATION_TARGET: string = 'annotationtarget';
    Events.LOADED = 'loaded';
    Events.VR_AVAILABLE = 'vravailable';
    Events.VR_UNAVAILABLE = 'vrunavailable';
    return Events;
}());



/***/ }),

/***/ "./node_modules/virtex3d/dist-esmodule/glTFFileTypeHandler.js":
/*!********************************************************************!*\
  !*** ./node_modules/virtex3d/dist-esmodule/glTFFileTypeHandler.js ***!
  \********************************************************************/
/*! exports provided: glTFFileTypeHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "glTFFileTypeHandler", function() { return glTFFileTypeHandler; });
var glTFFileTypeHandler = /** @class */ (function () {
    function glTFFileTypeHandler() {
    }
    glTFFileTypeHandler.setup = function (viewport, gltf) {
        return new Promise(function (resolve) {
            // todo: add animation, gltf camera support e.g.
            // https://github.com/donmccurdy/three-gltf-viewer/blob/master/src/viewer.js#L183
            // allow specifying envmap? https://github.com/mrdoob/three.js/blob/dev/examples/webgl_loader_gltf.html#L92
            var obj = gltf.scene || gltf.scenes[0];
            viewport.options.data.ambientLightColor = 0xffffff;
            viewport.options.data.ambientLightIntensity = 0.5;
            viewport.options.data.directionalLight1Intensity = 1;
            viewport.options.data.directionalLight2Intensity = 0;
            // https://github.com/mrdoob/three.js/pull/12766
            viewport.renderer.gammaOutput = true;
            viewport.objectGroup.add(obj);
            viewport.createLights();
            viewport.createCamera();
            resolve(gltf);
        });
    };
    return glTFFileTypeHandler;
}());



/***/ }),

/***/ "./node_modules/virtex3d/dist-esmodule/index.js":
/*!******************************************************!*\
  !*** ./node_modules/virtex3d/dist-esmodule/index.js ***!
  \******************************************************/
/*! exports provided: Viewport, Events, FileType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Viewport__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Viewport */ "./node_modules/virtex3d/dist-esmodule/Viewport.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Viewport", function() { return _Viewport__WEBPACK_IMPORTED_MODULE_0__["Viewport"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Events", function() { return _Viewport__WEBPACK_IMPORTED_MODULE_0__["Events"]; });

/* harmony import */ var _FileType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FileType */ "./node_modules/virtex3d/dist-esmodule/FileType.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FileType", function() { return _FileType__WEBPACK_IMPORTED_MODULE_1__["FileType"]; });





/***/ })

}]);
//# sourceMappingURL=vendors~uv-virtex-extension.8b11bc3bad1d7530723c.js.map