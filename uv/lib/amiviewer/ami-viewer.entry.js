/*! Built with http://stenciljs.com */
const { h } = window.amiviewer;

// const filenames = [
//   '36444280',
//   '36444294',
//   '36444308',
//   '36444322',
//   '36444336',
//   '36444350',
//   '36444364',
//   '36444378',
//   '36444392',
//   '36444406',
//   '36444434',
//   '36444448',
//   '36444462',
//   '36444476',
//   '36444490',
//   '36444504',
//   '36444518',
//   '36444532',
//   '36746856',
// ];
const mapfiles = (files) => files.split(',').map(filename => {
    return `https://cdn.rawgit.com/FNNDSC/data/master/dicom/adi_brain/${filename}`;
});
const colors = {
    red: 0xff0000,
    blue: 0x0000ff,
    background: 0x000000,
};

class AMIViewer {
    watchHandler() {
        this._reset();
    }
    componentDidLoad() {
        this._reset();
    }
    _reset() {
        console.log("setting up ami-viewer");
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
        });
        renderer.setSize(this._container.offsetWidth, this._container.offsetHeight);
        renderer.setClearColor(colors.background, 1);
        renderer.setPixelRatio(window.devicePixelRatio);
        this._container.appendChild(renderer.domElement);
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, this._container.offsetWidth / this._container.offsetHeight, 0.1, 1000);
        camera.position.x = 150;
        camera.position.y = 150;
        camera.position.z = 100;
        const controls = new AMI.TrackballControl(camera, this._container);
        const onWindowResize = () => {
            camera.aspect = this._container.offsetWidth / this._container.offsetHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(this._container.offsetWidth, this._container.offsetHeight);
        };
        window.addEventListener('resize', onWindowResize, false);
        // Load DICOM images and create AMI Helpers
        const loader = new AMI.VolumeLoader(this._container);
        loader
            .load(mapfiles(this.files))
            .then(() => {
            const series = loader.data[0].mergeSeries(loader.data);
            const stack = series[0].stack[0];
            loader.free();
            const stackHelper = new AMI.StackHelper(stack);
            stackHelper.bbox.color = colors.red;
            stackHelper.border.color = colors.blue;
            scene.add(stackHelper);
            // build the gui
            this.onLoaded.emit(stackHelper);
            // gui(stackHelper);
            // center camera and interactor to center of bouding box
            const centerLPS = stackHelper.stack.worldCenter();
            camera.lookAt(centerLPS.x, centerLPS.y, centerLPS.z);
            camera.updateProjectionMatrix();
            controls.target.set(centerLPS.x, centerLPS.y, centerLPS.z);
        })
            .catch(error => {
            window.console.log('oops... something went wrong...');
            window.console.log(error);
        });
        const animate = () => {
            controls.update();
            renderer.render(scene, camera);
            requestAnimationFrame(() => {
                animate();
            });
        };
        animate();
        // set up gui
    }
    render() {
        return h("div", { id: "container", ref: (el) => this._container = el });
    }
    static get is() { return "ami-viewer"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "files": {
            "type": String,
            "attr": "files",
            "watchCallbacks": ["watchHandler"]
        }
    }; }
    static get events() { return [{
            "name": "onLoaded",
            "method": "onLoaded",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "#container {\n  background-color: #000;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n}\n\n#gui-container {\n  position: fixed;\n  top: 10px;\n  right: 10px;\n  z-index: 1;\n}"; }
}

export { AMIViewer as AmiViewer };
