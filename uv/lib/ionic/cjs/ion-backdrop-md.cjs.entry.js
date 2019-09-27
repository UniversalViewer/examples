'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const __chunk_1 = require('./chunk-80b0281e.js');
require('./chunk-d8847c1c.js');
const __chunk_7 = require('./chunk-ddb8d8a0.js');
const index = require('./index-e5a21441.js');

class Backdrop {
    constructor(hostRef) {
        __chunk_1.registerInstance(this, hostRef);
        this.lastClick = -10000;
        this.blocker = index.GESTURE_CONTROLLER.createBlocker({
            disableScroll: true
        });
        /**
         * If `true`, the backdrop will be visible.
         */
        this.visible = true;
        /**
         * If `true`, the backdrop will can be clicked and will emit the `ionBackdropTap` event.
         */
        this.tappable = true;
        /**
         * If `true`, the backdrop will stop propagation on tap.
         */
        this.stopPropagation = true;
        this.ionBackdropTap = __chunk_1.createEvent(this, "ionBackdropTap", 7);
    }
    componentDidLoad() {
        if (this.stopPropagation) {
            this.blocker.block();
        }
    }
    componentDidUnload() {
        this.blocker.destroy();
    }
    onTouchStart(ev) {
        this.lastClick = __chunk_7.now(ev);
        this.emitTap(ev);
    }
    onMouseDown(ev) {
        if (this.lastClick < __chunk_7.now(ev) - 2500) {
            this.emitTap(ev);
        }
    }
    emitTap(ev) {
        if (this.stopPropagation) {
            ev.preventDefault();
            ev.stopPropagation();
        }
        if (this.tappable) {
            this.ionBackdropTap.emit();
        }
    }
    render() {
        const mode = __chunk_1.getIonMode(this);
        return (__chunk_1.h(__chunk_1.Host, { tabindex: "-1", class: {
                [mode]: true,
                'backdrop-hide': !this.visible,
                'backdrop-no-tappable': !this.tappable,
            } }));
    }
    static get style() { return ":host{left:0;right:0;top:0;bottom:0;display:block;position:absolute;-webkit-transform:translateZ(0);transform:translateZ(0);contain:strict;cursor:pointer;opacity:.01;-ms-touch-action:none;touch-action:none;z-index:2}:host(.backdrop-hide){background:transparent}:host(.backdrop-no-tappable){cursor:auto}:host{background-color:var(--ion-backdrop-color,#000)}"; }
}

exports.ion_backdrop = Backdrop;
