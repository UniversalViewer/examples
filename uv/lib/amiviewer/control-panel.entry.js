const h = window.amiviewer.h;

import { a as Mode } from './chunk-a9df86e6.js';

class ControlPanel {
    componentDidLoad() {
    }
    _renderDisplay() {
        if (this.display !== Mode.MESH) {
            return (h("ion-item", { id: "mode" },
                h("ion-icon", { name: "eye" }),
                h("ion-select", { id: "modeSelect", value: this.display, "ok-text": "OK", "cancel-text": "Cancel", onIonChange: (e) => this.onDisplayChanged.emit(e.detail.value) },
                    h("ion-select-option", { value: "slices" }, "Slices"),
                    h("ion-select-option", { value: "volume" }, "Volume"))));
        }
        return null;
    }
    _renderToolsToggle() {
        if (this.toolsVisible) {
            return (h("ion-item", null,
                h("ion-icon", { name: "create" }),
                h("ion-toggle", { onIonChange: (e) => this.onToolsEnabledChanged.emit(e.detail.checked) })));
        }
        return null;
    }
    _renderTools() {
        // todo: make dynamic from enum
        if (this.toolsVisible && this.toolsEnabled) {
            return (h("ion-item", null,
                h("ion-label", null, "Tool Type"),
                this.display === Mode.MESH ? (h("ion-select", { value: "annotation", "ok-text": "OK", "cancel-text": "Cancel", onIonChange: (e) => this.onToolTypeChanged.emit(e.detail.value) },
                    h("ion-select-option", { value: "annotation" }, "Annotation"))) :
                    (h("ion-select", { value: "annotation", "ok-text": "OK", "cancel-text": "Cancel", onIonChange: (e) => this.onToolTypeChanged.emit(e.detail.value) },
                        h("ion-select-option", { value: "ruler" }, "Ruler"),
                        h("ion-select-option", { value: "angle" }, "Angle"),
                        h("ion-select-option", { value: "annotation" }, "Annotation")))));
        }
        return null;
    }
    _renderOptionsToggle() {
        if (this.optionsVisible) {
            return (h("ion-item", null,
                h("ion-icon", { name: "options" }),
                h("ion-toggle", { onIonChange: (e) => this.onOptionsEnabledChanged.emit(e.detail.checked) })));
        }
        return null;
    }
    _renderOptions() {
        console.log('options visible ' + this.optionsVisible);
        if (this.optionsVisible && this.optionsEnabled) {
            switch (this.display) {
                case Mode.MESH: {
                    return h("mesh-controls", null);
                }
                case Mode.SLICES: {
                    return h("slices-controls", { "index-min": this.slicesIndexMin, "index-max": this.slicesIndexMax, index: this.slicesIndex, orientation: this.slicesOrientation, "window-width-min": this.slicesWindowWidthMin, "window-width-max": this.slicesWindowWidthMax, "window-width": this.slicesWindowWidth, "window-center-min": this.slicesWindowCenterMin, "window-center-max": this.slicesWindowCenterMax, "window-center": this.slicesWindowCenter });
                }
                case Mode.VOLUME: {
                    return h("volume-controls", { "steps-min": this.volumeStepsMin, "steps-max": this.volumeStepsMax, steps: this.volumeSteps, "window-width-min": this.volumeWindowWidthMin, "window-width-max": this.volumeWindowWidthMax, "window-width": this.volumeWindowWidth, "window-center-min": this.volumeWindowCenterMin, "window-center-max": this.volumeWindowCenterMax, "window-center": this.volumeWindowCenter, luts: this.volumeLuts });
                }
            }
        }
    }
    render() {
        return (h("div", { id: "control-panel", ref: (el) => this._container = el },
            h("ion-app", null,
                this._renderDisplay(),
                this._renderToolsToggle(),
                this._renderTools(),
                this._renderOptionsToggle(),
                this._renderOptions())));
    }
    static get is() { return "control-panel"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "display": {
            "type": String,
            "attr": "display"
        },
        "optionsEnabled": {
            "type": Boolean,
            "attr": "options-enabled"
        },
        "optionsVisible": {
            "type": Boolean,
            "attr": "options-visible"
        },
        "slicesIndex": {
            "type": Number,
            "attr": "slices-index"
        },
        "slicesIndexMax": {
            "type": Number,
            "attr": "slices-index-max"
        },
        "slicesIndexMin": {
            "type": Number,
            "attr": "slices-index-min"
        },
        "slicesOrientation": {
            "type": String,
            "attr": "slices-orientation"
        },
        "slicesWindowCenter": {
            "type": Number,
            "attr": "slices-window-center"
        },
        "slicesWindowCenterMax": {
            "type": Number,
            "attr": "slices-window-center-max"
        },
        "slicesWindowCenterMin": {
            "type": Number,
            "attr": "slices-window-center-min"
        },
        "slicesWindowWidth": {
            "type": Number,
            "attr": "slices-window-width"
        },
        "slicesWindowWidthMax": {
            "type": Number,
            "attr": "slices-window-width-max"
        },
        "slicesWindowWidthMin": {
            "type": Number,
            "attr": "slices-window-width-min"
        },
        "toolsEnabled": {
            "type": Boolean,
            "attr": "tools-enabled"
        },
        "toolsVisible": {
            "type": Boolean,
            "attr": "tools-visible"
        },
        "volumeLuts": {
            "type": String,
            "attr": "volume-luts"
        },
        "volumeSteps": {
            "type": Number,
            "attr": "volume-steps"
        },
        "volumeStepsMax": {
            "type": Number,
            "attr": "volume-steps-max"
        },
        "volumeStepsMin": {
            "type": Number,
            "attr": "volume-steps-min"
        },
        "volumeWindowCenter": {
            "type": Number,
            "attr": "volume-window-center"
        },
        "volumeWindowCenterMax": {
            "type": Number,
            "attr": "volume-window-center-max"
        },
        "volumeWindowCenterMin": {
            "type": Number,
            "attr": "volume-window-center-min"
        },
        "volumeWindowWidth": {
            "type": Number,
            "attr": "volume-window-width"
        },
        "volumeWindowWidthMax": {
            "type": Number,
            "attr": "volume-window-width-max"
        },
        "volumeWindowWidthMin": {
            "type": Number,
            "attr": "volume-window-width-min"
        }
    }; }
    static get events() { return [{
            "name": "onDisplayChanged",
            "method": "onDisplayChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "onSliceIndexChanged",
            "method": "onSliceIndexChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "onToolsEnabledChanged",
            "method": "onToolsEnabledChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "onOptionsEnabledChanged",
            "method": "onOptionsEnabledChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "onToolTypeChanged",
            "method": "onToolTypeChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "#control-panel {\n  z-index: 1;\n  width: 300px;\n  height: 340px;\n}"; }
}

class MeshControls {
    componentDidLoad() {
    }
    render() {
        return (h("ion-content", null));
    }
    static get is() { return "mesh-controls"; }
    static get encapsulation() { return "shadow"; }
    static get style() { return ""; }
}

class SlicesControls {
    render() {
        return (h("div", null,
            h("ion-item", null,
                h("ion-label", null, "Index"),
                h("ion-range", { id: "slicesIndexRange", pin: "true", min: this.indexMin, max: this.indexMax, value: this.index, onIonChange: (e) => this.onSliceIndexChanged.emit(e.detail.value) })),
            h("ion-item", null,
                h("ion-label", null, "Orientation"),
                h("ion-select", { id: "slicesOrientationSelect", value: this.orientation, "ok-text": "OK", "cancel-text": "Cancel", onIonChange: (e) => this.onSliceOrientationChanged.emit(e.detail.value) },
                    h("ion-select-option", { value: "0" }, "Coronal (x)"),
                    h("ion-select-option", { value: "1" }, "Saggital (y)"),
                    h("ion-select-option", { value: "2" }, "Axial (z)"))),
            h("ion-item", null,
                h("ion-icon", { name: "contrast" }),
                h("ion-range", { id: "slicesWindowWidthRange", pin: "true", min: this.windowWidthMin, max: this.windowWidthMax, value: this.windowWidth, onIonChange: (e) => this.onSliceWindowWidthChanged.emit(e.detail.value) })),
            h("ion-item", null,
                h("ion-icon", { name: "sunny" }),
                h("ion-range", { id: "slicesWindowCenterRange", pin: "true", min: this.windowCenterMin, max: this.windowCenterMax, value: this.windowCenter, onIonChange: (e) => this.onSliceWindowCenterChanged.emit(e.detail.value) }))));
    }
    static get is() { return "slices-controls"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "index": {
            "type": Number,
            "attr": "index"
        },
        "indexMax": {
            "type": Number,
            "attr": "index-max"
        },
        "indexMin": {
            "type": Number,
            "attr": "index-min"
        },
        "orientation": {
            "type": String,
            "attr": "orientation"
        },
        "windowCenter": {
            "type": Number,
            "attr": "window-center"
        },
        "windowCenterMax": {
            "type": Number,
            "attr": "window-center-max"
        },
        "windowCenterMin": {
            "type": Number,
            "attr": "window-center-min"
        },
        "windowWidth": {
            "type": Number,
            "attr": "window-width"
        },
        "windowWidthMax": {
            "type": Number,
            "attr": "window-width-max"
        },
        "windowWidthMin": {
            "type": Number,
            "attr": "window-width-min"
        }
    }; }
    static get events() { return [{
            "name": "onSliceIndexChanged",
            "method": "onSliceIndexChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "onSliceOrientationChanged",
            "method": "onSliceOrientationChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "onSliceWindowWidthChanged",
            "method": "onSliceWindowWidthChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "onSliceWindowCenterChanged",
            "method": "onSliceWindowCenterChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ""; }
}

class VolumeControls {
    render() {
        return (h("div", null,
            h("ion-item", null,
                h("ion-label", null, "Steps"),
                h("ion-range", { id: "volumeStepsRange", min: this.stepsMin, max: this.stepsMax, value: this.steps, pin: "true", onIonChange: (e) => this.onVolumeStepsChanged.emit(e.detail.value) })),
            h("ion-item", null,
                h("ion-icon", { name: "contrast" }),
                h("ion-range", { id: "volumeWindowWidthRange", min: this.windowWidthMin, max: this.windowWidthMax, value: this.windowWidth, pin: "true", onIonChange: (e) => this.onVolumeWindowWidthChanged.emit(e.detail.value) })),
            h("ion-item", null,
                h("ion-icon", { name: "sunny" }),
                h("ion-range", { id: "volumeWindowCenterRange", min: this.windowCenterMin, max: this.windowCenterMax, value: this.windowCenter, pin: "true", onIonChange: (e) => this.onVolumeWindowCenterChanged.emit(e.detail.value) }))));
    }
    static get is() { return "volume-controls"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "luts": {
            "type": String,
            "attr": "luts"
        },
        "steps": {
            "type": Number,
            "attr": "steps"
        },
        "stepsMax": {
            "type": Number,
            "attr": "steps-max"
        },
        "stepsMin": {
            "type": Number,
            "attr": "steps-min"
        },
        "windowCenter": {
            "type": Number,
            "attr": "window-center"
        },
        "windowCenterMax": {
            "type": Number,
            "attr": "window-center-max"
        },
        "windowCenterMin": {
            "type": Number,
            "attr": "window-center-min"
        },
        "windowWidth": {
            "type": Number,
            "attr": "window-width"
        },
        "windowWidthMax": {
            "type": Number,
            "attr": "window-width-max"
        },
        "windowWidthMin": {
            "type": Number,
            "attr": "window-width-min"
        }
    }; }
    static get events() { return [{
            "name": "onVolumeStepsChanged",
            "method": "onVolumeStepsChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "onVolumeWindowWidthChanged",
            "method": "onVolumeWindowWidthChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "onVolumeWindowCenterChanged",
            "method": "onVolumeWindowCenterChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "onVolumeLutChanged",
            "method": "onVolumeLutChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ""; }
}

export { ControlPanel, MeshControls, SlicesControls, VolumeControls };
