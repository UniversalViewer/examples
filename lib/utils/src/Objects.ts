module Utils {

    export class Objects {
        static ConvertToPlainObject(obj: any): any {
            return JSON.parse(JSON.stringify(obj));
        }
    }

}