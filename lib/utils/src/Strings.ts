module Utils {

    export class Strings {
        static Ellipsis(text: string, chars: number): string {
            if (text.length <= chars) return text;
            var trimmedText = text.substr(0, chars);
            var lastSpaceIndex = trimmedText.lastIndexOf(" ");
            if (lastSpaceIndex != -1){
                trimmedText = trimmedText.substr(0, Math.min(trimmedText.length, lastSpaceIndex));
            }
            return trimmedText + "&hellip;";
        }

        static HtmlDecode(encoded: string): string {
            var div = document.createElement('div');
            div.innerHTML = encoded;
            return div.firstChild.nodeValue;
        }
    }

}