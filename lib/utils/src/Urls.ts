module Utils {

    export class Urls {

        static GetHashParameter(key: string, doc?: Document): string {
            if (!doc) doc = window.document;
            var regex = new RegExp("#.*[?&]" + key + "=([^&]+)(&|$)");
            var match = regex.exec(doc.location.hash);
            return(match ? decodeURIComponent(match[1].replace(/\+/g, " ")) : null);
        }

        static SetHashParameter(key: string, value: any, doc?: Document): void{
            if (!doc) doc = window.document;

            var kvp = this.UpdateURIKeyValuePair(doc.location.hash.replace('#?', ''), key, value);

            var newHash = "#?" + kvp;

            var url = doc.URL;

            // remove hash value (if present).
            var index = url.indexOf('#');

            if (index != -1) {
                url = url.substr(0, url.indexOf('#'));
            }

            doc.location.replace(url + newHash);
        }

        static GetQuerystringParameter(key: string, w?: Window): string {
            if (!w) w = window;
            return this.GetQuerystringParameterFromString(key, w.location.search);
        }

        static GetQuerystringParameterFromString(key: string, querystring: string): string {
            key = key.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
            var regex = new RegExp("[\\?&]" + key + "=([^&#]*)");
            var match = regex.exec(querystring);
            return(match ? decodeURIComponent(match[1].replace(/\+/g, " ")) : null);
        }

        static SetQuerystringParameter(key: string, value: any, doc?: Document): void{
            if (!doc) doc = window.document;

            var kvp = this.UpdateURIKeyValuePair(doc.location.hash.replace('#?', ''), key, value);

            // redirects.
            window.location.search = kvp;
        }

        static UpdateURIKeyValuePair(uriSegment: string, key: string, value: string): string{

            key = encodeURIComponent(key);
            value = encodeURIComponent(value);

            var kvp = uriSegment.split('&');

            // Array.split() returns an array with a single "" item
            // if the target string is empty. remove if present.
            if (kvp[0] == "") kvp.shift();

            var i = kvp.length;
            var x;

            // replace if already present.
            while (i--) {
                x = kvp[i].split('=');

                if (x[0] == key) {
                    x[1] = value;
                    kvp[i] = x.join('=');
                    break;
                }
            }

            // not found, so append.
            if (i < 0) {
                kvp[kvp.length] = [key, value].join('=');
            }

            return kvp.join('&');
        }

        static GetUrlParts(url: string): any {
            var a = document.createElement('a');
            a.href = url;
            return a;
        }

        static ConvertToRelativeUrl(url: string): string {
            var parts = this.GetUrlParts(url);
            var relUri = parts.pathname + parts.searchWithin;

            if (!relUri.startsWith("/")) {
                relUri = "/" + relUri;
            }

            return relUri;
        }
    }
}