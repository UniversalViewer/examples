import { ComponentInterface } from '../../stencil.core';
import { EventEmitter } from 'ionicons/dist/types/stencil.core';
export declare class Slide implements ComponentInterface {
    /** @internal */
    ionSlideChanged: EventEmitter<void>;
    componentDidLoad(): void;
    componentDidUnload(): void;
    render(): any;
}
