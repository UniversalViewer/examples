module Utils.Measurement {

    export class Size{
        constructor (public width: number, public height: number){}
    }

    export class Dimensions {
        static FitRect(width1: number, height1: number, width2: number, height2: number): Size {
            var ratio1 = height1 / width1;
            var ratio2 = height2 / width2;

            var width, height, scale;

            if (ratio1 < ratio2) {
                scale = width2 / width1;
                width = width1 * scale;
                height = height1 * scale;
            }
            if (ratio2 < ratio1) {
                scale = height2 / height1;
                width = width1 * scale;
                height = height1 * scale;
            }

            return new Size(Math.floor(width), Math.floor(height));
        }
    }
}