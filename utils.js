function getQuerystringParameter(key, doc) {
    if (!doc) doc = window.document;
    key = key.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + key + "=([^&#]*)");
    var match = regex.exec(window.location.search);
    return(match ? decodeURIComponent(match[1].replace(/\+/g, " ")) : null);
}

function setQuerystringParameter(key, value, doc){
    if (!doc) doc = window.document;

    var kvp = updateURIKeyValuePair(doc.location.searchWithin.replace('?', ''), key, value);

    // redirects.
    window.location.search = kvp;
}

function updateURIKeyValuePair(uriSegment, key, value){

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

window.browserDetect = {
    init: function () {
        this.browser = this.searchString(this.dataBrowser) || "Other";
        this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";

        // detect IE 11
        if (this.browser == 'Explorer' && this.version == '7' && navigator.userAgent.match(/Trident/i)) {
            this.version = this.searchVersionIE();
        }
    },
    searchString: function (data) {
        for (var i = 0; i < data.length; i++) {
            var dataString = data[i].string;
            this.versionSearchString = data[i].subString;

            if (dataString.indexOf(data[i].subString) != -1) {
                return data[i].identity;
            }
        }
    },
    searchVersion: function (dataString) {
        var index = dataString.indexOf(this.versionSearchString);
        if (index == -1)
            return;
        return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
    },
    searchVersionIE: function () {
        var ua = navigator.userAgent.toString().toLowerCase(), match = /(trident)(?:.*rv:([\w.]+))?/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || ['', null, -1], ver;
        try  {
            ver = match[2].split('.')[0]; // version
        } catch (err) {
            ver = 'unknown'; //
        }
        return ver;
    },
    dataBrowser: [
        { string: navigator.userAgent, subString: "Chrome", identity: "Chrome" },
        { string: navigator.userAgent, subString: "MSIE", identity: "Explorer" },
        { string: navigator.userAgent, subString: "Trident", identity: "Explorer" },
        { string: navigator.userAgent, subString: "Firefox", identity: "Firefox" },
        { string: navigator.userAgent, subString: "Safari", identity: "Safari" },
        { string: navigator.userAgent, subString: "Opera", identity: "Opera" }
    ]
};

window.browserDetect.init();