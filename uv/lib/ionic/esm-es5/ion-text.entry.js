import { r as registerInstance, d as getIonMode, h, H as Host } from './chunk-d0403a2f.js';
import './chunk-1074393c.js';
import { c as createColorClasses } from './chunk-353a032e.js';
/**
 * @virtualProp {"ios" | "md"} mode - The mode determines which platform styles to use.
 */
var Text = /** @class */ (function () {
    function Text(hostRef) {
        registerInstance(this, hostRef);
    }
    Text.prototype.render = function () {
        var _a;
        var mode = getIonMode(this);
        return (h(Host, { class: Object.assign({}, createColorClasses(this.color), (_a = {}, _a[mode] = true, _a)) }, h("slot", null)));
    };
    Object.defineProperty(Text, "style", {
        get: function () { return ":host(.ion-color){color:var(--ion-color-base)}"; },
        enumerable: true,
        configurable: true
    });
    return Text;
}());
export { Text as ion_text };
