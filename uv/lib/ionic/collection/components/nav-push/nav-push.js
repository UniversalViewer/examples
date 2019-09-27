import { Host, h } from "@stencil/core";
export class NavPush {
    constructor() {
        this.push = () => {
            const nav = this.el.closest('ion-nav');
            const toPush = this.component;
            if (nav && toPush !== undefined) {
                nav.push(toPush, this.componentProps, { skipIfBusy: true });
            }
        };
    }
    render() {
        return (h(Host, { onClick: this.push }));
    }
    static get is() { return "ion-nav-push"; }
    static get properties() { return {
        "component": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "NavComponent",
                "resolved": "Function | HTMLElement | ViewController | null | string | undefined",
                "references": {
                    "NavComponent": {
                        "location": "import",
                        "path": "../../interface"
                    }
                }
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Component to navigate to"
            },
            "attribute": "component",
            "reflect": false
        },
        "componentProps": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "ComponentProps",
                "resolved": "undefined | { [key: string]: any; }",
                "references": {
                    "ComponentProps": {
                        "location": "import",
                        "path": "../../interface"
                    }
                }
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Data you want to pass to the component as props"
            }
        }
    }; }
    static get elementRef() { return "el"; }
}
