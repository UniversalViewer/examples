'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const __chunk_1 = require('./chunk-80b0281e.js');
require('./chunk-d8847c1c.js');
const __chunk_5 = require('./chunk-9139efee.js');

/**
 * @virtualProp {"ios" | "md"} mode - The mode determines which platform styles to use.
 */
class Text {
    constructor(hostRef) {
        __chunk_1.registerInstance(this, hostRef);
    }
    render() {
        const mode = __chunk_1.getIonMode(this);
        return (__chunk_1.h(__chunk_1.Host, { class: Object.assign({}, __chunk_5.createColorClasses(this.color), { [mode]: true }) }, __chunk_1.h("slot", null)));
    }
    static get style() { return ":host(.ion-color){color:var(--ion-color-base)}"; }
}

exports.ion_text = Text;
