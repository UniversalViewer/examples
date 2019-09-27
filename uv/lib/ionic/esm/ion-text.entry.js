import { r as registerInstance, d as getIonMode, h, H as Host } from './chunk-d0403a2f.js';
import './chunk-1074393c.js';
import { c as createColorClasses } from './chunk-353a032e.js';

/**
 * @virtualProp {"ios" | "md"} mode - The mode determines which platform styles to use.
 */
class Text {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        const mode = getIonMode(this);
        return (h(Host, { class: Object.assign({}, createColorClasses(this.color), { [mode]: true }) }, h("slot", null)));
    }
    static get style() { return ":host(.ion-color){color:var(--ion-color-base)}"; }
}

export { Text as ion_text };
