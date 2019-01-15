/*! Built with http://stenciljs.com */
const { h } = window.amiviewer;

const mapfiles = (baseurl, files) => {
    return files.map(filename => {
        if (!baseurl.endsWith('/')) {
            baseurl += '/';
        }
        return `${baseurl}${filename}`;
    });
};
const colors = {
    red: 0xff0000,
    blue: 0x0000ff,
    background: 0x000000,
};
const seriesLoader = (series) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', series, true);
        xhr.onload = () => {
            let data = JSON.parse(xhr.responseText);
            data = mapfiles(data.baseurl, data.series);
            resolve(data);
        };
        xhr.onerror = () => {
            reject();
        };
        xhr.send();
    });
};

class AMISlicesViewer {
    watchHandler() {
        this.reset();
    }
    componentDidLoad() {
        this.reset();
    }
    reset() {
        console.log("setting up ami-slices-viewer");
        this._createRenderer();
        this._scene = new THREE.Scene();
        this._createCamera();
        this._createControls();
        // Load series json
        seriesLoader(this.series).then((parsedJSON) => {
            // Load DICOM images and create AMI Helpers
            const loader = new AMI.VolumeLoader(this._container);
            loader
                .load(parsedJSON)
                .then(() => {
                const series = loader.data[0].mergeSeries(loader.data);
                const stack = series[0].stack[0];
                loader.free();
                this._stackHelper = new AMI.StackHelper(stack);
                this._stackHelper.bbox.color = colors.red;
                this._stackHelper.border.color = colors.blue;
                this._scene.add(this._stackHelper);
                // build the gui on load
                this.onViewerLoaded.emit({
                    stackHelper: this._stackHelper
                });
                // center camera and interactor to center of bounding box
                const centerLPS = this._stackHelper.stack.worldCenter();
                this._camera.lookAt(centerLPS.x, centerLPS.y, centerLPS.z);
                this._camera.updateProjectionMatrix();
                this._controls.target.set(centerLPS.x, centerLPS.y, centerLPS.z);
            })
                .catch(error => {
                console.log('DICOM load error');
                console.error(error);
            });
            this._animate();
        });
    }
    _createRenderer() {
        this._renderer = new THREE.WebGLRenderer({
            antialias: true,
        });
        this._renderer.setSize(this._container.offsetWidth, this._container.offsetHeight);
        this._renderer.setClearColor(colors.background, 1);
        this._renderer.setPixelRatio(window.devicePixelRatio);
        this._container.appendChild(this._renderer.domElement);
    }
    _createCamera() {
        this._camera = new THREE.PerspectiveCamera(45, this._container.offsetWidth / this._container.offsetHeight, 0.1, 999999);
        this._camera.position.x = 150;
        this._camera.position.y = 150;
        this._camera.position.z = 100;
    }
    _createControls() {
        this._controls = new AMI.TrackballControl(this._camera, this._container);
    }
    _animate() {
        this._render3D();
        requestAnimationFrame(() => {
            this._animate();
        });
    }
    _render3D() {
        this._controls.update();
        this._renderer.render(this._scene, this._camera);
    }
    resize() {
        this._camera.aspect = this._container.offsetWidth / this._container.offsetHeight;
        this._camera.updateProjectionMatrix();
        this._renderer.setSize(this._container.offsetWidth, this._container.offsetHeight);
    }
    render() {
        return h("div", { id: "container", ref: (el) => this._container = el });
    }
    static get is() { return "ami-slices-viewer"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "reset": {
            "method": true
        },
        "resize": {
            "method": true
        },
        "series": {
            "type": String,
            "attr": "series",
            "watchCallbacks": ["watchHandler"]
        }
    }; }
    static get events() { return [{
            "name": "onViewerLoaded",
            "method": "onViewerLoaded",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "#container {\n  background-color: #000;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n}"; }
}

var Mode;
(function (Mode) {
    Mode["SLICES"] = "slices";
    Mode["VOLUME"] = "volume";
})(Mode || (Mode = {}));

class AMIViewer {
    constructor() {
        this.mode = Mode.SLICES;
    }
    watchSeries() {
        this.reset();
    }
    watchMode() {
        this.reset();
    }
    componentDidLoad() {
        this.reset();
    }
    reset() {
        console.log("setting up ami-viewer");
        const onWindowResize = () => {
            this.resize();
        };
        window.addEventListener('resize', onWindowResize, false);
    }
    resize() {
        this._viewer.resize();
    }
    _renderViewer() {
        switch (this.mode) {
            case Mode.SLICES:
                return h("ami-slices-viewer", { ref: (el) => this._viewer = el, series: this.series });
            case Mode.VOLUME:
                return h("ami-volume-viewer", { ref: (el) => this._viewer = el, series: this.series });
        }
    }
    // depending on mode render a different viewer component
    render() {
        console.log('render');
        return this._renderViewer();
    }
    loaded(event) {
        const stackHelper = event.detail;
        switch (this.mode) {
            case Mode.SLICES:
                this.onSlicesLoaded.emit(stackHelper);
                break;
            case Mode.VOLUME:
                this.onVolumeLoaded.emit(stackHelper);
                break;
        }
    }
    static get is() { return "ami-viewer"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "mode": {
            "type": String,
            "attr": "mode",
            "watchCallbacks": ["watchMode"]
        },
        "reset": {
            "method": true
        },
        "resize": {
            "method": true
        },
        "series": {
            "type": String,
            "attr": "series",
            "watchCallbacks": ["watchSeries"]
        }
    }; }
    static get events() { return [{
            "name": "onSlicesLoaded",
            "method": "onSlicesLoaded",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "onVolumeLoaded",
            "method": "onVolumeLoaded",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get listeners() { return [{
            "name": "onViewerLoaded",
            "method": "loaded"
        }]; }
    static get style() { return ""; }
}

class AMIVolumeViewer {
    constructor() {
        this._ready = false;
        this._modified = false;
    }
    watchHandler() {
        this.reset();
    }
    componentDidLoad() {
        this.reset();
    }
    reset() {
        console.log("setting up ami-volume-viewer");
        this._createRenderer();
        this._scene = new THREE.Scene();
        this._createCamera();
        this._createControls();
        this._animate();
        // Load series json
        seriesLoader(this.series).then((parsedJSON) => {
            let loader = new AMI.VolumeLoader(this._container);
            loader
                .load(parsedJSON)
                .then(() => {
                const series = loader.data[0].mergeSeries(loader.data);
                const stack = series[0].stack[0];
                loader.free();
                this._stackHelper = new AMI.VolumeRenderingHelper(stack);
                // scene
                this._scene.add(this._stackHelper);
                // CREATE LUT
                this._lut = new AMI.LutHelper(this._lutCanvases);
                this._lut.luts = AMI.LutHelper.presetLuts();
                this._lut.lutsO = AMI.LutHelper.presetLutsO();
                // update related uniforms
                this._stackHelper.uniforms.uTextureLUT.value = this._lut.texture;
                this._stackHelper.uniforms.uLut.value = 1;
                // update camera's and interactor's target
                let centerLPS = stack.worldCenter();
                this._camera.lookAt(centerLPS.x, centerLPS.y, centerLPS.z);
                this._camera.updateProjectionMatrix();
                this._controls.target.set(centerLPS.x, centerLPS.y, centerLPS.z);
                // build the gui on load
                this.onViewerLoaded.emit({
                    stackHelper: this._stackHelper,
                    lut: this._lut,
                    modified: this._modified
                });
                // good to go
                this._ready = true;
                this._modified = true;
                // force first render
                this._render3D();
            })
                .catch(error => window.console.log(error));
        });
    }
    _createRenderer() {
        this._renderer = new THREE.WebGLRenderer({
            alpha: true,
        });
        this._renderer.setSize(this._container.offsetWidth, this._container.offsetHeight);
        this._renderer.setClearColor(colors.background, 1);
        this._renderer.setPixelRatio(window.devicePixelRatio);
        this._container.appendChild(this._renderer.domElement);
        this._renderer.domElement.addEventListener('wheel', this._onWheel.bind(this));
    }
    _onWheel() {
        if (!this._wheel) {
            this._renderer.setPixelRatio(0.1 * window.devicePixelRatio);
            this._renderer.setSize(this._container.offsetWidth, this._container.offsetHeight);
            this._wheel = Date.now();
        }
        if (Date.now() - this._wheel < 300) {
            clearTimeout(this._wheelTO);
            this._wheelTO = setTimeout(() => {
                this._renderer.setPixelRatio(0.5 * window.devicePixelRatio);
                this._renderer.setSize(this._container.offsetWidth, this._container.offsetHeight);
                this._modified = true;
                setTimeout(() => {
                    this._renderer.setPixelRatio(window.devicePixelRatio);
                    this._renderer.setSize(this._container.offsetWidth, this._container.offsetHeight);
                    this._wheel = null;
                    this._modified = true;
                }, 100);
            }, 300);
        }
        this._modified = true;
    }
    _createCamera() {
        this._camera = new THREE.PerspectiveCamera(45, this._container.offsetWidth / this._container.offsetHeight, 0.1, 100000);
        this._camera.position.x = 166;
        this._camera.position.y = -471;
        this._camera.position.z = 153;
        this._camera.up.set(-0.42, 0.86, 0.26);
    }
    _createControls() {
        this._controls = new AMI.TrackballControl(this._camera, this._container);
        this._controls.rotateSpeed = 5.5;
        this._controls.zoomSpeed = 1.2;
        this._controls.panSpeed = 0.8;
        this._controls.staticMoving = true;
        this._controls.dynamicDampingFactor = 0.3;
        this._controls.addEventListener('change', () => {
            this._modified = true;
        });
        this._controls.addEventListener('start', this._onStart.bind(this));
        this._controls.addEventListener('end', this._onEnd.bind(this));
    }
    _onStart() {
        if (this._stackHelper && this._stackHelper.uniforms && !this._wheel) {
            this._renderer.setPixelRatio(0.1 * window.devicePixelRatio);
            this._renderer.setSize(this._container.offsetWidth, this._container.offsetHeight);
            this._modified = true;
        }
    }
    _onEnd() {
        if (this._stackHelper && this._stackHelper.uniforms && !this._wheel) {
            this._renderer.setPixelRatio(0.5 * window.devicePixelRatio);
            this._renderer.setSize(this._container.offsetWidth, this._container.offsetHeight);
            this._modified = true;
            setTimeout(() => {
                this._renderer.setPixelRatio(window.devicePixelRatio);
                this._renderer.setSize(this._container.offsetWidth, this._container.offsetHeight);
                this._modified = true;
            }, 100);
        }
    }
    _animate() {
        this._render3D();
        requestAnimationFrame(() => {
            this._animate();
        });
    }
    _render3D() {
        this._controls.update();
        if (this._ready && this._modified) {
            this._renderer.render(this._scene, this._camera);
            this._modified = false;
        }
    }
    resize() {
        this._camera.aspect = this._container.offsetWidth / this._container.offsetHeight;
        this._camera.updateProjectionMatrix();
        // notify the renderer of the size change
        this._renderer.setSize(this._container.offsetWidth, this._container.offsetHeight);
        this._modified = true;
    }
    render() {
        return (h("div", null,
            h("div", { id: "my-lut-container" },
                h("div", { id: "my-lut-min" }, "0.0"),
                h("div", { id: "my-lut-canvases", ref: (el) => this._lutCanvases = el }),
                h("div", { id: "my-lut-max" }, "1.0")),
            h("div", { id: "container", ref: (el) => this._container = el })));
    }
    static get is() { return "ami-volume-viewer"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "reset": {
            "method": true
        },
        "resize": {
            "method": true
        },
        "series": {
            "type": String,
            "attr": "series",
            "watchCallbacks": ["watchHandler"]
        }
    }; }
    static get events() { return [{
            "name": "onViewerLoaded",
            "method": "onViewerLoaded",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "#container {\n  background-color: #000;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n}"; }
}

export { AMISlicesViewer as AmiSlicesViewer, AMIViewer as AmiViewer, AMIVolumeViewer as AmiVolumeViewer };
