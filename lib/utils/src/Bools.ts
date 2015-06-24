module Utils {

    export class Bools {
        static GetBool(val: any, defaultVal: boolean): boolean {
            if (val === null || typeof (val) === 'undefined'){
                return defaultVal;
            }

            return val;
        }
    }

}