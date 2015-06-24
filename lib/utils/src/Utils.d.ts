export declare class Size {
    width: number;
    height: number;
    constructor(width: number, height: number);
}
export declare class Bools {
    static GetBool(val: any, defaultVal: boolean): boolean;
}
export declare class Strings {
    static Ellipsis(text: string, chars: number): string;
    static HtmlDecode(encoded: string): string;
}
export declare class Numbers {
    static NumericalInput(event: JQueryKeyEventObject): boolean;
}
export declare class Dates {
    static GetTimeStamp(): number;
}
export declare class Objects {
    static ConvertToPlainObject(obj: any): any;
}
export declare class Urls {
    static GetHashParameter(key: string, doc?: Document): string;
    static SetHashParameter(key: string, value: any, doc?: Document): void;
    static GetQuerystringParameter(key: string, w?: Window): string;
    static GetQuerystringParameterFromString(key: string, querystring: string): string;
    static SetQuerystringParameter(key: string, value: any, doc?: Document): void;
    static UpdateURIKeyValuePair(uriSegment: string, key: string, value: string): string;
    static GetUrlParts(url: string): any;
    static ConvertToRelativeUrl(url: string): string;
}
export declare class Measurement {
    static FitRect(width1: number, height1: number, width2: number, height2: number): Size;
}
