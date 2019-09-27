import { Host, h } from "@stencil/core";
export class NavPop {
    constructor() {
        this.pop = () => {
            const nav = this.el.closest('ion-nav');
            if (nav) {
                nav.pop({ skipIfBusy: true });
            }
        };
    }
    render() {
        return (h(Host, { onClick: this.pop }));
    }
    static get is() { return "ion-nav-pop"; }
    static get elementRef() { return "el"; }
}
